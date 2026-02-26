import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import jwt from 'jsonwebtoken';

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

function verifyAuth(event: HandlerEvent): boolean {
  const authHeader = event.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!token || !jwtSecret) return false;
  try {
    jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return response(200, {});
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' });

  if (!verifyAuth(event)) {
    return response(401, { error: 'Unauthorized' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { fileName, fileData, contentType, category } = body;

    if (!fileName || !fileData) {
      return response(400, { error: 'Missing fileName or fileData' });
    }

    // fileData is base64 encoded
    const buffer = Buffer.from(fileData, 'base64');

    // Max 5MB
    if (buffer.length > 5 * 1024 * 1024) {
      return response(400, { error: '文件大小不能超过 5MB' });
    }

    // Validate content type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (contentType && !allowedTypes.includes(contentType)) {
      return response(400, { error: '不支持的图片格式' });
    }

    // Store in Netlify Blobs
    const store = getStore('site-images');
    const blobKey = `${category || 'other'}/${fileName}`;

    await store.set(blobKey, buffer.toString('base64'), {
      metadata: {
        contentType: contentType || 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        originalName: fileName,
      },
    });

    // The image will be served via a separate function or during build
    const imagePath = `/api/image/${blobKey}`;

    return response(200, {
      success: true,
      path: imagePath,
      blobKey,
      size: buffer.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return response(500, { error: '上传失败' });
  }
};

export { handler };
