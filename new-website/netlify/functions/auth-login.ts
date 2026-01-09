import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';

// Simple JWT-like token generation (for demo purposes)
// In production, use a proper JWT library
function generateToken(username: string, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: username,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })).toString('base64url');

  // Simple signature (in production, use proper HMAC-SHA256)
  const signature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');

  return `${header}.${payload}.${signature}`;
}

// Rate limiting (simple in-memory for demo)
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

  // Check if locked
  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 1000 / 60);
    return { allowed: false, lockedMinutes: remainingMinutes };
  }

  // Reset if lockout expired
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

// Helper to create response with proper types
function createResponse(statusCode: number, body: object, cacheControl: string = 'no-store'): HandlerResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': cacheControl,
    },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext): Promise<HandlerResponse> => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  // Get client IP
  const ip = event.headers['x-forwarded-for'] ||
             event.headers['x-real-ip'] ||
             event.headers['client-ip'] ||
             'unknown';

  // Check rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return createResponse(429, {
      success: false,
      error: `账户已锁定，请在 ${rateCheck.lockedMinutes} 分钟后重试`,
      code: 'ACCOUNT_LOCKED'
    });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { username, password, rememberMe } = body;

    // Validate input
    if (!username || !password) {
      return createResponse(400, {
        success: false,
        error: '请输入用户名和密码',
        code: 'MISSING_CREDENTIALS'
      });
    }

    // Get credentials from environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!validUsername || !validPassword || !jwtSecret) {
      console.error('Missing environment variables for authentication');
      return createResponse(500, {
        success: false,
        error: '服务器配置错误',
        code: 'CONFIG_ERROR'
      });
    }

    // Validate credentials
    if (username === validUsername && password === validPassword) {
      // Clear failed attempts on successful login
      clearAttempts(ip);

      // Generate token
      const token = generateToken(username, jwtSecret);
      const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

      return createResponse(200, {
        success: true,
        token,
        expiresIn,
        username,
      });
    }

    // Record failed attempt
    const failResult = recordFailedAttempt(ip);

    if (failResult.locked) {
      return createResponse(429, {
        success: false,
        error: '登录失败次数过多，账户已锁定 15 分钟',
        code: 'ACCOUNT_LOCKED'
      });
    }

    return createResponse(401, {
      success: false,
      error: `用户名或密码错误 (${failResult.remainingAttempts} 次尝试机会)`,
      code: 'INVALID_CREDENTIALS',
      remainingAttempts: failResult.remainingAttempts,
    });

  } catch (error) {
    console.error('Login error:', error);
    return createResponse(500, {
      success: false,
      error: '服务器错误，请稍后再试',
      code: 'INTERNAL_ERROR'
    });
  }
};

export { handler };
