export const locales = ['zh', 'en', 'th', 'vi', 'ms', 'id', 'es', 'pt'] as const;
export const defaultLocale = 'zh' as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  es: 'Español',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  th: '🇹🇭',
  vi: '🇻🇳',
  ms: '🇲🇾',
  id: '🇮🇩',
  es: '🇪🇸',
  pt: '🇧🇷',
};