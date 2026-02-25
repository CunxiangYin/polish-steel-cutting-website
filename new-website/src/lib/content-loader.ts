/**
 * Content Loader - 构建时从 Netlify Blobs 加载数据，fallback 到本地硬编码数据
 *
 * 工作流程:
 * 1. 后台管理保存数据到 Netlify Blobs
 * 2. 触发 deploy 后，构建时本模块从 Blobs 读取最新数据
 * 3. 如果 Blobs 无数据（首次部署），使用本地默认数据
 * 4. 数据写入 .content-cache/ 供前台组件 import
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const CACHE_DIR = join(process.cwd(), '.content-cache');
const BLOBS_API = '/.netlify/functions/content';

// Netlify Blobs 在构建环境中可通过 @netlify/blobs 直接访问
async function loadFromBlobs(type: string): Promise<unknown | null> {
  // 构建环境中直接使用 @netlify/blobs SDK
  if (process.env.NETLIFY) {
    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore('site-content');
      const data = await store.get(type, { type: 'text' });
      if (data) return JSON.parse(data);
    } catch (error) {
      console.warn(`[content-loader] Failed to load '${type}' from Blobs:`, error);
    }
  }
  return null;
}

export async function loadContent<T>(type: string, fallback: T): Promise<T> {
  const blobData = await loadFromBlobs(type);
  if (blobData) {
    console.log(`[content-loader] Loaded '${type}' from Netlify Blobs`);
    return blobData as T;
  }
  console.log(`[content-loader] Using fallback data for '${type}'`);
  return fallback;
}

/**
 * 在构建时预加载所有内容并写入缓存文件
 * 供静态页面 import 使用
 */
export async function prebuildContent(): Promise<void> {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  const types = ['products', 'services', 'hero', 'about', 'images'];

  for (const type of types) {
    const data = await loadFromBlobs(type);
    if (data) {
      writeFileSync(
        join(CACHE_DIR, `${type}.json`),
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      console.log(`[prebuild] Cached '${type}' from Blobs`);
    }
  }
}
