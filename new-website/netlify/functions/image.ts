import type { Handler, HandlerResponse } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  // Extract image path: /api/image/products/xxx.jpg → products/xxx.jpg
  const imagePath = event.path.replace(/^\/\.netlify\/functions\/image\/?/, '').replace(/^\/api\/image\/?/, '');

  if (!imagePath) {
    return { statusCode: 400, body: 'Missing image path' };
  }

  try {
    const store = getStore('site-images');
    const blob = await store.getWithMetadata(imagePath, { type: 'text' });

    if (!blob || !blob.data) {
      return { statusCode: 404, body: 'Image not found' };
    }

    const contentType = (blob.metadata?.contentType as string) || 'image/jpeg';
    const base64Data = blob.data as string;
    const buffer = Buffer.from(base64Data, 'base64');

    const resp: HandlerResponse = {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': buffer.length.toString(),
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };

    return resp;
  } catch (error) {
    console.error('Image serve error:', error);
    return { statusCode: 500, body: 'Failed to load image' };
  }
};

export { handler };
