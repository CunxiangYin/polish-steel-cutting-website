/**
 * Image cropping utility functions
 */

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropPreset {
  aspect: number | null;
  label: string;
  size: string;
  recommendedWidth: number;
  recommendedHeight: number;
}

// Preset aspect ratios for different image categories
export const CROP_PRESETS: Record<string, CropPreset> = {
  products: {
    aspect: 1,
    label: '产品图 (1:1)',
    size: '800x800',
    recommendedWidth: 800,
    recommendedHeight: 800,
  },
  hero: {
    aspect: 16 / 9,
    label: '横幅图 (16:9)',
    size: '1920x1080',
    recommendedWidth: 1920,
    recommendedHeight: 1080,
  },
  about: {
    aspect: 4 / 3,
    label: '关于页 (4:3)',
    size: '1200x900',
    recommendedWidth: 1200,
    recommendedHeight: 900,
  },
  services: {
    aspect: 3 / 2,
    label: '服务图 (3:2)',
    size: '900x600',
    recommendedWidth: 900,
    recommendedHeight: 600,
  },
  other: {
    aspect: null,
    label: '自由裁剪',
    size: '自定义',
    recommendedWidth: 0,
    recommendedHeight: 0,
  },
};

/**
 * Create an image element from a source URL
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

/**
 * Get the cropped image as a Blob
 */
export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: CropArea,
  mimeType: string = 'image/jpeg',
  quality: number = 0.92
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to the cropped area size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return as blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Get the cropped image resized to recommended dimensions
 */
export async function getCroppedAndResizedImage(
  imageSrc: string,
  pixelCrop: CropArea,
  targetWidth: number,
  targetHeight: number,
  mimeType: string = 'image/jpeg',
  quality: number = 0.92
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to target dimensions
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // Enable smooth scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw the cropped and resized image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  // Return as blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Get MIME type from file or use default
 */
export function getMimeType(file: File | null, defaultType: string = 'image/jpeg'): string {
  if (!file) return defaultType;

  // Map common types
  const typeMap: Record<string, string> = {
    'image/jpeg': 'image/jpeg',
    'image/jpg': 'image/jpeg',
    'image/png': 'image/png',
    'image/webp': 'image/webp',
    'image/gif': 'image/gif',
  };

  return typeMap[file.type] || defaultType;
}

/**
 * Get file extension from MIME type
 */
export function getExtensionFromMime(mimeType: string): string {
  const extMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };

  return extMap[mimeType] || 'jpg';
}
