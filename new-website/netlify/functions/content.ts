import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const VALID_TYPES = ['products', 'services', 'hero', 'about', 'images'];

function verifyToken(token: string, secret: string): { valid: boolean; payload?: Record<string, unknown> } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    const [header, payload, signature] = parts;
    const expectedSignature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');
    if (signature !== expectedSignature) return { valid: false };
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decodedPayload.exp && Date.now() > decodedPayload.exp) return { valid: false };
    return { valid: true, payload: decodedPayload };
  } catch {
    return { valid: false };
  }
}

function getAuthToken(event: HandlerEvent): string | null {
  const authHeader = event.headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);
  return null;
}

function response(statusCode: number, body: object): HandlerResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  // Extract content type from path: /api/content/:type
  const pathParts = event.path.replace(/^\/\.netlify\/functions\/content\/?/, '').split('/').filter(Boolean);
  const contentType = pathParts[0];

  if (!contentType || !VALID_TYPES.includes(contentType)) {
    return response(400, { error: `Invalid content type. Valid types: ${VALID_TYPES.join(', ')}` });
  }

  const store = getStore('site-content');

  if (event.httpMethod === 'GET') {
    try {
      const data = await store.get(contentType, { type: 'text' });
      if (!data) {
        return response(404, { error: 'Content not found', type: contentType });
      }
      return response(200, { type: contentType, data: JSON.parse(data) });
    } catch (error) {
      console.error('Error reading content:', error);
      return response(500, { error: 'Failed to read content' });
    }
  }

  if (event.httpMethod === 'PUT') {
    // Require auth for writes
    const token = getAuthToken(event);
    const jwtSecret = process.env.JWT_SECRET;
    if (!token || !jwtSecret || !verifyToken(token, jwtSecret).valid) {
      return response(401, { error: 'Unauthorized' });
    }

    try {
      const body = JSON.parse(event.body || '{}');
      const data = body.data;
      if (data === undefined) {
        return response(400, { error: 'Missing data field' });
      }
      await store.set(contentType, JSON.stringify(data));
      return response(200, { success: true, type: contentType });
    } catch (error) {
      console.error('Error saving content:', error);
      return response(500, { error: 'Failed to save content' });
    }
  }

  return response(405, { error: 'Method not allowed' });
};

export { handler };
