import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

function verifyToken(token: string, secret: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;
    const expectedSignature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');
    if (signature !== expectedSignature) return false;
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decodedPayload.exp && Date.now() > decodedPayload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

function response(statusCode: number, body: object): HandlerResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') return response(200, {});
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' });

  // Auth check
  const authHeader = event.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!token || !jwtSecret || !verifyToken(token, jwtSecret)) {
    return response(401, { error: 'Unauthorized' });
  }

  const deployHook = process.env.NETLIFY_DEPLOY_HOOK;
  if (!deployHook) {
    return response(500, { error: 'Deploy hook not configured' });
  }

  try {
    const res = await fetch(deployHook, { method: 'POST' });
    if (!res.ok) {
      return response(502, { error: 'Failed to trigger deploy' });
    }
    return response(200, { success: true, message: 'Deploy triggered' });
  } catch (error) {
    console.error('Deploy error:', error);
    return response(500, { error: 'Failed to trigger deploy' });
  }
};

export { handler };
