import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import jwt from 'jsonwebtoken';

// Rate limiting (in-memory, resets on cold start)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts?: number; lockedMinutes?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    loginAttempts.set(ip, { count: 0, lastAttempt: now });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 1000 / 60);
    return { allowed: false, lockedMinutes: remainingMinutes };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    loginAttempts.set(ip, { count: 0, lastAttempt: now });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.count };
}

function recordFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now };

  record.count++;
  record.lastAttempt = now;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION;
    loginAttempts.set(ip, record);
    return { locked: true, remainingAttempts: 0 };
  }

  loginAttempts.set(ip, record);
  return { locked: false, remainingAttempts: MAX_ATTEMPTS - record.count };
}

function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

function response(statusCode: number, body: object): HandlerResponse {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return response(405, { error: 'Method not allowed' });
  }

  const ip = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return response(429, {
      success: false,
      error: `账户已锁定，请在 ${rateCheck.lockedMinutes} 分钟后重试`,
      code: 'ACCOUNT_LOCKED',
    });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { username, password, rememberMe } = body;

    if (!username || !password) {
      return response(400, { success: false, error: '请输入用户名和密码', code: 'MISSING_CREDENTIALS' });
    }

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!validUsername || !validPassword || !jwtSecret) {
      console.error('Missing environment variables for authentication');
      return response(500, { success: false, error: '服务器配置错误', code: 'CONFIG_ERROR' });
    }

    if (username === validUsername && password === validPassword) {
      clearAttempts(ip);

      const expiresIn = rememberMe ? '7d' : '24h';
      const token = jwt.sign({ sub: username, iat: Math.floor(Date.now() / 1000) }, jwtSecret, {
        expiresIn,
        algorithm: 'HS256',
      });

      const expiresInMs = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

      return response(200, { success: true, token, expiresIn: expiresInMs, username });
    }

    const failResult = recordFailedAttempt(ip);

    if (failResult.locked) {
      return response(429, {
        success: false,
        error: '登录失败次数过多，账户已锁定 15 分钟',
        code: 'ACCOUNT_LOCKED',
      });
    }

    return response(401, {
      success: false,
      error: `用户名或密码错误 (${failResult.remainingAttempts} 次尝试机会)`,
      code: 'INVALID_CREDENTIALS',
      remainingAttempts: failResult.remainingAttempts,
    });
  } catch (error) {
    console.error('Login error:', error);
    return response(500, { success: false, error: '服务器错误，请稍后再试', code: 'INTERNAL_ERROR' });
  }
};

export { handler };
