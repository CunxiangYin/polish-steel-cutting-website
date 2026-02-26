#!/usr/bin/env node
/**
 * Prebuild script - 构建前从 Netlify Blobs 拉取后台管理保存的内容
 * 更新 messages/*.json、site-content.json 和前台数据文件
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LOCALES = ['zh', 'en', 'th', 'vi', 'ms', 'id', 'es', 'pt'];

async function main() {
  if (!process.env.NETLIFY) {
    console.log('[prebuild] Not in Netlify environment, skipping Blobs fetch');
    return;
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('site-content');

    // 1. 同步 hero 数据到 messages/*.json
    const heroRaw = await store.get('hero', { type: 'text' }).catch(() => null);
    if (heroRaw) {
      const hero = JSON.parse(heroRaw);
      for (const locale of LOCALES) {
        const msgPath = join(ROOT, `messages/${locale}.json`);
        if (!existsSync(msgPath)) continue;
        const messages = JSON.parse(readFileSync(msgPath, 'utf-8'));
        let updated = false;
        if (hero.title?.[locale]) { messages.hero.title = hero.title[locale]; updated = true; }
        if (hero.subtitle?.[locale]) { messages.hero.subtitle = hero.subtitle[locale]; updated = true; }
        if (hero.slogan?.[locale]) { messages.hero.slogan = hero.slogan[locale]; updated = true; }
        if (updated) {
          writeFileSync(msgPath, JSON.stringify(messages, null, 2), 'utf-8');
          console.log(`[prebuild] Updated hero in messages/${locale}.json`);
        }
      }
    }

    // 2. 同步 about 数据到 messages/*.json
    const aboutRaw = await store.get('about', { type: 'text' }).catch(() => null);
    if (aboutRaw) {
      const about = JSON.parse(aboutRaw);
      for (const locale of LOCALES) {
        const msgPath = join(ROOT, `messages/${locale}.json`);
        if (!existsSync(msgPath)) continue;
        const messages = JSON.parse(readFileSync(msgPath, 'utf-8'));
        if (!messages.about) messages.about = {};
        let updated = false;
        if (about.description?.[locale]) { messages.about.description = about.description[locale]; updated = true; }
        if (about.mission?.[locale]) { messages.about.mission = about.mission[locale]; updated = true; }
        if (updated) {
          writeFileSync(msgPath, JSON.stringify(messages, null, 2), 'utf-8');
          console.log(`[prebuild] Updated about in messages/${locale}.json`);
        }
      }
    }

    // 3. 同步 products 数据
    const productsRaw = await store.get('products', { type: 'text' }).catch(() => null);
    if (productsRaw) {
      const adminProducts = JSON.parse(productsRaw);
      // 写入 JSON 文件供前台读取
      const outPath = join(ROOT, 'src/data/products-override.json');
      writeFileSync(outPath, JSON.stringify(adminProducts, null, 2), 'utf-8');
      console.log(`[prebuild] Wrote ${adminProducts.length} products to products-override.json`);
    }

    // 4. 同步 services 数据
    const servicesRaw = await store.get('services', { type: 'text' }).catch(() => null);
    if (servicesRaw) {
      const adminServices = JSON.parse(servicesRaw);
      const outPath = join(ROOT, 'src/data/services-override.json');
      writeFileSync(outPath, JSON.stringify(adminServices, null, 2), 'utf-8');
      console.log(`[prebuild] Wrote ${adminServices.length} services to services-override.json`);
    }

    // 5. 更新 site-content.json
    const siteContentPath = join(ROOT, 'src/data/site-content.json');
    if (existsSync(siteContentPath)) {
      const siteContent = JSON.parse(readFileSync(siteContentPath, 'utf-8'));
      let updated = false;
      if (heroRaw) { siteContent.hero = JSON.parse(heroRaw); updated = true; }
      if (aboutRaw) { siteContent.company = { ...siteContent.company, ...JSON.parse(aboutRaw) }; updated = true; }
      if (updated) {
        writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2), 'utf-8');
        console.log('[prebuild] Updated site-content.json');
      }
    }

    console.log('[prebuild] Done!');
  } catch (error) {
    console.warn('[prebuild] Error (non-fatal):', error);
    console.log('[prebuild] Will use local default data');
  }
}

main();
