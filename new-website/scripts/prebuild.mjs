#!/usr/bin/env node
/**
 * Prebuild script - 构建前从 Netlify Blobs 拉取后台管理保存的内容
 * 更新 messages/*.json 和 site-content.json
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LOCALES = ['zh', 'en', 'th', 'vi', 'ms', 'id', 'es', 'pt'];
const LOCALE_MAP = { zh: 'zh', en: 'en', th: 'th', vi: 'vi', ms: 'ms', id: 'id', es: 'es', pt: 'pt' };

async function main() {
  if (!process.env.NETLIFY) {
    console.log('[prebuild] Not in Netlify environment, skipping Blobs fetch');
    return;
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('site-content');

    // 1. 同步 hero 数据到 messages/*.json
    const heroData = await store.get('hero', { type: 'text' }).catch(() => null);
    if (heroData) {
      const hero = JSON.parse(heroData);
      // hero 数据格式: { title: { zh: "...", en: "..." }, subtitle: { zh: "...", en: "..." }, ... }
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
    const aboutData = await store.get('about', { type: 'text' }).catch(() => null);
    if (aboutData) {
      const about = JSON.parse(aboutData);
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

    // 3. 更新 site-content.json（作为备份数据源）
    const siteContentPath = join(ROOT, 'src/data/site-content.json');
    if (existsSync(siteContentPath)) {
      const siteContent = JSON.parse(readFileSync(siteContentPath, 'utf-8'));
      let updated = false;

      if (heroData) { siteContent.hero = JSON.parse(heroData); updated = true; }
      if (aboutData) { siteContent.company = { ...siteContent.company, ...JSON.parse(aboutData) }; updated = true; }

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
