import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import jwt from 'jsonwebtoken';

const VALID_TYPES = ['products', 'services', 'hero', 'about', 'images'];

function getAuthToken(event: HandlerEvent): string | null {
  const authHeader = event.headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);
  return null;
}

function verifyAuth(token: string): boolean {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return false;
  try {
    jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
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
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

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
    const token = getAuthToken(event);
    if (!token || !verifyAuth(token)) {
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
