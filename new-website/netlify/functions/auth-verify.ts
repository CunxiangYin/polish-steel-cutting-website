import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';

// Verify JWT token
function verifyToken(token: string, secret: string): { valid: boolean; payload?: Record<string, unknown>; error?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [header, payload, signature] = parts;

    // Verify signature (simple check for demo)
    const expectedSignature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Invalid signature' };
    }

    // Decode payload
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());

    // Check expiration
    if (decodedPayload.exp && Date.now() > decodedPayload.exp) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload: decodedPayload };
  } catch {
    return { valid: false, error: 'Token verification failed' };
  }
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
  // Allow both GET and POST
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    // Get token from Authorization header or body
    let token: string | undefined;

    const authHeader = event.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token && event.body) {
      const body = JSON.parse(event.body);
      token = body.token;
    }

    if (!token) {
      return createResponse(401, {
        valid: false,
        error: 'No token provided',
        code: 'NO_TOKEN'
      });
    }

    // Get JWT secret from environment
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('Missing JWT_SECRET environment variable');
      return createResponse(500, {
        valid: false,
        error: '服务器配置错误',
        code: 'CONFIG_ERROR'
      });
    }

    // Verify token
    const result = verifyToken(token, jwtSecret);

    if (!result.valid) {
      return createResponse(401, {
        valid: false,
        error: result.error === 'Token expired' ? '会话已过期，请重新登录' : '认证失败',
        code: result.error === 'Token expired' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN'
      });
    }

    return createResponse(200, {
      valid: true,
      username: result.payload?.sub,
      expiresAt: result.payload?.exp,
    });

  } catch (error) {
    console.error('Verify error:', error);
    return createResponse(500, {
      valid: false,
      error: '服务器错误',
      code: 'INTERNAL_ERROR'
    });
  }
};

export { handler };
