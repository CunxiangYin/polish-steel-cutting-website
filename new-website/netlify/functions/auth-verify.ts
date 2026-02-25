import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import jwt from 'jsonwebtoken';

function response(statusCode: number, body: object): HandlerResponse {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return response(405, { error: 'Method not allowed' });
  }

  try {
    let token: string | undefined;

    const authHeader = event.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token && event.body) {
      const body = JSON.parse(event.body);
      token = body.token;
    }

    if (!token) {
      return response(401, { valid: false, error: 'No token provided', code: 'NO_TOKEN' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Missing JWT_SECRET environment variable');
      return response(500, { valid: false, error: '服务器配置错误', code: 'CONFIG_ERROR' });
    }

    const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] }) as jwt.JwtPayload;

    return response(200, {
      valid: true,
      username: decoded.sub,
      expiresAt: decoded.exp ? decoded.exp * 1000 : undefined,
    });
  } catch (error) {
    const isExpired = error instanceof jwt.TokenExpiredError;
    return response(401, {
      valid: false,
      error: isExpired ? '会话已过期，请重新登录' : '认证失败',
      code: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
    });
  }
};

export { handler };
