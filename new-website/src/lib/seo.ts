import { locales, type Locale } from '@/config/i18n';
import { Metadata } from 'next';

// Base URL for the website
export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://cute-jelly-dc03bf.netlify.app'
  : 'http://localhost:3000';

// Language and region mappings for better SEO
export const localeRegions: Record<Locale, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  th: 'th_TH',
  vi: 'vi_VN',
  ms: 'ms_MY',
  id: 'id_ID',
  es: 'es_ES',
  pt: 'pt_BR',
};

// Market-specific keywords for each language
export const marketKeywords: Record<Locale, string[]> = {
  zh: [
    '钢板切割设备', 'CNC切割设备', '等离子切割', '激光切割', '火焰切割', 
    '金属制造', '工业切割', '台湾荣华机械', '深圳普耐斯', '钢铁加工设备',
    '数控切割机', '钢板加工', '金属切割解决方案', '工业自动化', '制造业设备'
  ],
  en: [
    'steel plate cutting', 'CNC cutting equipment', 'plasma cutting', 'laser cutting', 
    'flame cutting', 'metal fabrication', 'industrial cutting', 'Taiwan Runghua machinery',
    'Shenzhen Punaise', 'steel processing equipment', 'CNC cutting machine', 'steel plate processing',
    'metal cutting solutions', 'industrial automation', 'manufacturing equipment'
  ],
  th: [
    'อุปกรณ์ตัดเหล็กแผ่น', 'เครื่องตัด CNC', 'ตัดพลาสม่า', 'ตัดเลเซอร์', 'ตัดเปลวไฟ',
    'การผลิตโลหะ', 'การตัดอุตสาหกรรม', 'เครื่องจักรไต้หวันรุ่งฮั่ว', 'เซินเจิ้นปูไนส์',
    'อุปกรณ์แปรรูปเหล็ก', 'เครื่องตัดซีเอ็นซี', 'โซลูชันการตัดโลหะ'
  ],
  vi: [
    'thiết bị cắt tấm thép', 'máy cắt CNC', 'cắt plasma', 'cắt laser', 'cắt khí',
    'chế tạo kim loại', 'cắt công nghiệp', 'máy móc Đài Loan Rong Hua', 'Shenzhen Punaise',
    'thiết bị gia công thép', 'máy cắt CNC', 'giải pháp cắt kim loại'
  ],
  ms: [
    'peralatan pemotongan plat keluli', 'mesin pemotong CNC', 'pemotongan plasma', 
    'pemotongan laser', 'pemotongan api', 'pembuatan logam', 'pemotongan industri',
    'jentera Taiwan Rong Hua', 'Shenzhen Punaise', 'peralatan pemprosesan keluli'
  ],
  id: [
    'peralatan pemotongan pelat baja', 'mesin pemotong CNC', 'pemotongan plasma',
    'pemotongan laser', 'pemotongan api', 'manufaktur logam', 'pemotongan industri',
    'mesin Taiwan Rong Hua', 'Shenzhen Punaise', 'peralatan pengolahan baja'
  ],
  es: [
    'equipos de corte de placas de acero', 'máquinas de corte CNC', 'corte por plasma',
    'corte por láser', 'corte por llama', 'fabricación de metales', 'corte industrial',
    'maquinaria Taiwan Rong Hua', 'Shenzhen Punaise', 'equipos de procesamiento de acero'
  ],
  pt: [
    'equipamentos de corte de chapas de aço', 'máquinas de corte CNC', 'corte por plasma',
    'corte a laser', 'corte por chama', 'fabricação de metais', 'corte industrial',
    'maquinário Taiwan Rong Hua', 'Shenzhen Punaise', 'equipamentos de processamento de aço'
  ],
};

// Generate hreflang links for all languages
export function generateHreflangLinks(currentLocale: Locale, pathname: string = ''): Record<string, string> {
  const hreflangLinks: Record<string, string> = {};
  
  // Add all language alternatives
  locales.forEach((locale) => {
    hreflangLinks[locale] = `${baseUrl}/${locale}${pathname}`;
  });
  
  // Add x-default pointing to Chinese (default locale)
  hreflangLinks['x-default'] = `${baseUrl}/zh${pathname}`;
  
  return hreflangLinks;
}

// Generate canonical URL
export function generateCanonicalUrl(locale: Locale, pathname: string = ''): string {
  return `${baseUrl}/${locale}${pathname}`;
}

// Create structured data for the company
export function generateCompanyStructuredData(locale: Locale) {
  const companyNames = {
    zh: '深圳普耐斯机电设备有限公司',
    en: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
    th: 'บริษัท เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล จำกัด',
    vi: 'Công ty TNHH Thiết bị Cơ khí Punaise Thâm Quyến',
    ms: 'Shenzhen Punaise Mechanical Equipment Sdn. Bhd.',
    id: 'PT. Shenzhen Punaise Mechanical Equipment',
    es: 'Shenzhen Punaise Mechanical Equipment S.L.',
    pt: 'Shenzhen Punaise Equipamentos Mecânicos Ltda.',
  };

  const descriptions = {
    zh: '专业从事钢板切割设备、台湾荣华分条机、等离子激光切割系统制造的企业',
    en: 'Professional manufacturer of steel cutting equipment, Taiwan Runghua slitting machines, and plasma laser cutting systems',
    th: 'ผู้ผลิตอุปกรณ์ตัดเหล็กแผ่น เครื่องจักรไต้หวันรุ่งฮั่ว และระบบตัดพลาสม่าเลเซอร์อย่างมืออาชีพ',
    vi: 'Nhà sản xuất chuyên nghiệp thiết bị cắt tấm thép, máy móc Đài Loan Rong Hua và hệ thống cắt plasma laser',
    ms: 'Pengeluar profesional peralatan pemotongan plat keluli, jentera Taiwan Rong Hua dan sistem pemotong plasma laser',
    id: 'Produsen profesional peralatan pemotongan pelat baja, mesin Taiwan Rong Hua dan sistem pemotong plasma laser',
    es: 'Fabricante profesional de equipos de corte de placas de acero, maquinaria Taiwan Rong Hua y sistemas de corte por plasma láser',
    pt: 'Fabricante profissional de equipamentos de corte de chapas de aço, maquinário Taiwan Rong Hua e sistemas de corte por plasma laser',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyNames[locale],
    description: descriptions[locale],
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo-main.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shenzhen, China',
      addressCountry: 'CN',
    },
    telephone: '+86 135-1099-2218',
    email: 'info@punaise.com',
    foundingDate: '2005',
    industry: 'Industrial Equipment Manufacturing',
    keywords: marketKeywords[locale].join(', '),
    sameAs: [
      // Add social media links when available
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Steel Cutting Equipment',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'CNC Plasma Cutting Equipment',
            description: 'Professional CNC plasma cutting machines for steel processing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Laser Cutting Equipment',
            description: 'High-precision laser cutting systems for metal fabrication',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Flame Cutting Equipment',
            description: 'Economic flame cutting solutions for thick steel plates',
          },
        },
      ],
    },
  };
}

// Generate product structured data
export function generateProductStructuredData(locale: Locale) {
  const productNames = {
    plasma: {
      zh: 'CNC等离子切割设备',
      en: 'CNC Plasma Cutting Equipment',
      th: 'อุปกรณ์ตัดพลาสม่า CNC',
      vi: 'Thiết bị cắt plasma CNC',
      ms: 'Peralatan Pemotongan Plasma CNC',
      id: 'Peralatan Pemotongan Plasma CNC',
      es: 'Equipo de Corte por Plasma CNC',
      pt: 'Equipamento de Corte por Plasma CNC',
    },
    laser: {
      zh: '激光切割设备',
      en: 'Laser Cutting Equipment',
      th: 'อุปกรณ์ตัดเลเซอร์',
      vi: 'Thiết bị cắt laser',
      ms: 'Peralatan Pemotongan Laser',
      id: 'Peralatan Pemotongan Laser',
      es: 'Equipo de Corte por Láser',
      pt: 'Equipamento de Corte a Laser',
    },
    flame: {
      zh: '火焰切割设备',
      en: 'Flame Cutting Equipment',
      th: 'อุปกรณ์ตัดเปลวไฟ',
      vi: 'Thiết bị cắt khí',
      ms: 'Peralatan Pemotongan Api',
      id: 'Peralatan Pemotongan Api',
      es: 'Equipo de Corte por Llama',
      pt: 'Equipamento de Corte por Chama',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Product',
        '@id': `${baseUrl}/${locale}#plasma-cutting`,
        name: productNames.plasma[locale],
        category: 'Industrial Equipment',
        manufacturer: {
          '@type': 'Organization',
          name: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      },
      {
        '@type': 'Product',
        '@id': `${baseUrl}/${locale}#laser-cutting`,
        name: productNames.laser[locale],
        category: 'Industrial Equipment',
        manufacturer: {
          '@type': 'Organization',
          name: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      },
      {
        '@type': 'Product',
        '@id': `${baseUrl}/${locale}#flame-cutting`,
        name: productNames.flame[locale],
        category: 'Industrial Equipment',
        manufacturer: {
          '@type': 'Organization',
          name: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      },
    ],
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(locale: Locale, pathname: string = '') {
  const homeLabels = {
    zh: '首页',
    en: 'Home',
    th: 'หน้าแรก',
    vi: 'Trang chủ',
    ms: 'Laman Utama',
    id: 'Beranda',
    es: 'Inicio',
    pt: 'Início',
  };

  const breadcrumbList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeLabels[locale],
      item: `${baseUrl}/${locale}`,
    },
  ];

  // Add more breadcrumb items based on pathname if needed
  if (pathname && pathname !== '/') {
    // This can be extended based on your routing structure
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList,
  };
}

// Enhanced metadata generation with Twitter Cards and additional OG properties
export function generateEnhancedMetadata(
  locale: Locale,
  pageTitle: string,
  pageDescription: string,
  pathname: string = '',
  imageUrl?: string
): Metadata {
  const canonicalUrl = generateCanonicalUrl(locale, pathname);
  const hreflangLinks = generateHreflangLinks(locale, pathname);
  const keywords = marketKeywords[locale];
  const ogLocale = localeRegions[locale];
  
  const defaultImageUrl = `${baseUrl}/images/punaise-cutting-equipment.jpg`;
  const finalImageUrl = imageUrl || defaultImageUrl;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(', '),
    authors: [{ name: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangLinks,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: 'Punaise Mechanical Equipment',
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: `${pageTitle} - Punaise Steel Cutting Equipment`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [finalImageUrl],
      creator: '@punaise_mech',
      site: '@punaise_mech',
    },
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:updated_time': new Date().toISOString(),
      'article:publisher': 'https://www.facebook.com/punaise',
      'fb:app_id': '1234567890', // Replace with actual Facebook App ID
    },
  };
}

// Generate geo-targeting metadata for different markets
export function generateGeoMetadata(locale: Locale) {
  const geoTargeting = {
    zh: { country: 'CN', region: 'CN-44', city: 'Shenzhen' },
    en: { country: 'US', region: 'US-CA', city: 'Global' },
    th: { country: 'TH', region: 'TH-10', city: 'Bangkok' },
    vi: { country: 'VN', region: 'VN-SG', city: 'Ho Chi Minh City' },
    ms: { country: 'MY', region: 'MY-14', city: 'Kuala Lumpur' },
    id: { country: 'ID', region: 'ID-JK', city: 'Jakarta' },
    es: { country: 'ES', region: 'ES-M', city: 'Madrid' },
    pt: { country: 'BR', region: 'BR-SP', city: 'São Paulo' },
  };

  const geo = geoTargeting[locale];
  
  return {
    'geo.country': geo.country,
    'geo.region': geo.region,
    'geo.placename': geo.city,
    'ICBM': '22.543096,114.057865', // Shenzhen coordinates for company location
    'geo.position': '22.543096;114.057865',
  };
}

// Industry-specific keywords for different cutting technologies
export const industryKeywords = {
  plasma: ['CNC plasma cutting', 'plasma torch', 'metal cutting', 'steel fabrication', 'industrial cutting'],
  laser: ['fiber laser', 'CO2 laser', 'precision cutting', 'sheet metal', 'laser technology'],
  flame: ['oxy-fuel cutting', 'thick plate cutting', 'heavy steel', 'shipbuilding', 'construction'],
  general: ['metal working', 'manufacturing', 'automation', 'Taiwan machinery', 'cutting solutions'],
};

// Generate market-specific meta descriptions
export function getLocalizedMetaDescription(locale: Locale, productType?: string): string {
  const baseDescriptions = {
    zh: '深圳普耐斯机电设备有限公司，专业从事钢板切割设备制造，提供CNC等离子、激光、火焰切割解决方案。自2005年起为全球客户提供优质设备。',
    en: 'Shenzhen Punaise Mechanical Equipment Co., Ltd. specializes in steel cutting equipment manufacturing. Professional CNC plasma, laser, flame cutting solutions since 2005.',
    th: 'เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล ผู้เชี่ยวชาญในการผลิตอุปกรณ์ตัดเหล็กแผ่น ให้บริการโซลูชันการตัด CNC พลาสม่า เลเซอร์ เปลวไฟตั้งแต่ปี 2005',
    vi: 'Công ty Thiết bị Cơ khí Punaise Thâm Quyến chuyên sản xuất thiết bị cắt tấm thép. Giải pháp cắt CNC plasma, laser, khí chuyên nghiệp từ năm 2005.',
    ms: 'Shenzhen Punaise Mechanical Equipment mengkhusus dalam pembuatan peralatan pemotongan plat keluli. Penyelesaian pemotongan CNC plasma, laser, api profesional sejak 2005.',
    id: 'Shenzhen Punaise Mechanical Equipment mengkhususkan diri dalam pembuatan peralatan pemotongan pelat baja. Solusi pemotongan CNC plasma, laser, api profesional sejak 2005.',
    es: 'Shenzhen Punaise Mechanical Equipment se especializa en fabricación de equipos de corte de placas de acero. Soluciones profesionales de corte CNC plasma, láser, llama desde 2005.',
    pt: 'Shenzhen Punaise Equipamentos Mecânicos especializa-se na fabricação de equipamentos de corte de chapas de aço. Soluções profissionais de corte CNC plasma, laser, chama desde 2005.',
  };

  return baseDescriptions[locale];
}