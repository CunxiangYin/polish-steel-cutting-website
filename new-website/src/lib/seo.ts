import { locales, type Locale } from '@/config/i18n';
import { Metadata } from 'next';

// Base URL for the website
export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://punaise-equipment.netlify.app'
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

// Market-specific keywords for each language - corrected to match actual products
export const marketKeywords: Record<Locale, string[]> = {
  zh: [
    '钢材裁切设备', '分条机', '钢卷分条生产线', '台湾荣华机械', '深圳普耐斯',
    '皮带张紧器', '液压螺母', '钢卷移动台车', '钢材加工设备', '裁切生产线',
    '钢板加工', '钢材配送中心设备', '分条机刀片', '整平辊研磨', '工业设备供应商'
  ],
  en: [
    'steel slitting line', 'slitting machine', 'steel coil processing', 'Taiwan Runghua machinery',
    'Shenzhen Punaise', 'belt tensioner', 'hydraulic nut', 'coil transfer car',
    'steel processing equipment', 'cut-to-length line', 'steel plate processing',
    'steel service center equipment', 'slitter blade', 'leveling roller grinding', 'industrial equipment supplier'
  ],
  th: [
    'เครื่องตัดแบ่งเหล็ก', 'สายการตัดเหล็กม้วน', 'อุปกรณ์แปรรูปเหล็ก', 'เครื่องจักรไต้หวันรุ่งฮั่ว',
    'เซินเจิ้นปูไนส์', 'ตัวปรับความตึงสายพาน', 'น็อตไฮดรอลิก', 'รถเข็นเหล็กม้วน',
    'สายการผลิตตัดเหล็ก', 'เครื่องตัดเหล็กแผ่น', 'อุปกรณ์ศูนย์บริการเหล็ก'
  ],
  vi: [
    'dây chuyền xả băng thép', 'máy xả cuộn thép', 'thiết bị gia công thép', 'máy móc Đài Loan Rong Hua',
    'Shenzhen Punaise', 'bộ căng đai', 'đai ốc thủy lực', 'xe chuyển cuộn thép',
    'dây chuyền cắt thép', 'thiết bị trung tâm phân phối thép'
  ],
  ms: [
    'mesin slitting keluli', 'barisan pemprosesan keluli', 'peralatan pemprosesan keluli',
    'jentera Taiwan Rong Hua', 'Shenzhen Punaise', 'pengikat tali sawat', 'nat hidraulik',
    'troli pemindahan gegelung', 'barisan pemotongan keluli', 'peralatan pusat perkhidmatan keluli'
  ],
  id: [
    'mesin slitting baja', 'jalur pemrosesan baja', 'peralatan pengolahan baja',
    'mesin Taiwan Rong Hua', 'Shenzhen Punaise', 'tensioner sabuk', 'mur hidrolik',
    'troli transfer koil', 'jalur pemotongan baja', 'peralatan pusat layanan baja'
  ],
  es: [
    'línea de corte longitudinal de acero', 'máquina cortadora de bobinas', 'equipos de procesamiento de acero',
    'maquinaria Taiwan Rong Hua', 'Shenzhen Punaise', 'tensor de correa', 'tuerca hidráulica',
    'carro de transferencia de bobinas', 'línea de corte a medida', 'equipos de centro de servicio de acero'
  ],
  pt: [
    'linha de corte longitudinal de aço', 'máquina de corte de bobinas', 'equipamentos de processamento de aço',
    'maquinário Taiwan Rong Hua', 'Shenzhen Punaise', 'tensor de correia', 'porca hidráulica',
    'carro de transferência de bobinas', 'linha de corte sob medida', 'equipamentos de centro de serviço de aço'
  ],
};

// Generate hreflang links for all languages - with trailing slash to match trailingSlash config
export function generateHreflangLinks(currentLocale: Locale, pathname: string = ''): Record<string, string> {
  const hreflangLinks: Record<string, string> = {};
  
  // Ensure pathname ends with trailing slash for consistency with trailingSlash: true
  const normalizedPath = pathname && !pathname.endsWith('/') ? `${pathname}/` : pathname || '/';
  
  locales.forEach((locale) => {
    hreflangLinks[locale] = `${baseUrl}/${locale}${normalizedPath}`;
  });
  
  hreflangLinks['x-default'] = `${baseUrl}/zh${normalizedPath}`;
  
  return hreflangLinks;
}

// Generate canonical URL - with trailing slash
export function generateCanonicalUrl(locale: Locale, pathname: string = ''): string {
  const normalizedPath = pathname && !pathname.endsWith('/') ? `${pathname}/` : pathname || '/';
  return `${baseUrl}/${locale}${normalizedPath}`;
}

// Create structured data for the company - corrected to match actual business
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
    zh: '专业从事钢材裁切设备销售与服务，提供台湾荣华分条机、裁切生产线、皮带张紧器、液压螺母等产品',
    en: 'Professional steel slitting and cut-to-length equipment supplier, offering Taiwan Runghua slitting lines, belt tensioners, hydraulic nuts and coil handling equipment',
    th: 'ผู้จัดจำหน่ายเครื่องตัดแบ่งเหล็กและอุปกรณ์แปรรูปเหล็กมืออาชีพ สายการผลิตตัดเหล็กไต้หวันรุ่งฮั่ว',
    vi: 'Nhà cung cấp chuyên nghiệp thiết bị xả băng và cắt thép, dây chuyền xả băng Đài Loan Rong Hua',
    ms: 'Pembekal profesional peralatan slitting dan pemotongan keluli, barisan slitting Taiwan Rong Hua',
    id: 'Pemasok profesional peralatan slitting dan pemotongan baja, jalur slitting Taiwan Rong Hua',
    es: 'Proveedor profesional de equipos de corte longitudinal y transversal de acero, líneas de corte Taiwan Rong Hua',
    pt: 'Fornecedor profissional de equipamentos de corte longitudinal e transversal de aço, linhas de corte Taiwan Rong Hua',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyNames[locale],
    description: descriptions[locale],
    url: `${baseUrl}/${locale}/`,
    logo: `${baseUrl}/logo-main.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '南新路1003号荔枝大厦608室',
      addressLocality: '深圳市南山区',
      addressRegion: '广东省',
      postalCode: '518052',
      addressCountry: 'CN',
    },
    telephone: '0755-26443680',
    email: '466904802@qq.com',
    foundingDate: '2005',
    industry: 'Steel Processing Equipment',
    keywords: marketKeywords[locale].join(', '),
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Steel Cutting & Slitting Equipment',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: locale === 'zh' ? '台湾荣华钢材裁切生产线' : 'Taiwan Runghua Steel Cut-to-Length Line',
            description: locale === 'zh' ? '专业钢材裁切生产线，适用于大型钢材加工配送中心' : 'Professional steel cut-to-length production line for steel service centers',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: locale === 'zh' ? '分条机及分条生产线' : 'Slitting Machine & Slitting Line',
            description: locale === 'zh' ? '高精度钢卷分条设备，台湾荣华品牌' : 'High-precision steel coil slitting equipment, Taiwan Runghua brand',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: locale === 'zh' ? '皮带张紧器与液压螺母' : 'Belt Tensioner & Hydraulic Nut',
            description: locale === 'zh' ? '钢材裁切设备专用配件' : 'Specialized accessories for steel cutting equipment',
          },
        },
      ],
    },
  };
}

// Generate product structured data - corrected to match actual products
export function generateProductStructuredData(locale: Locale) {
  const productNames = {
    slittingLine: {
      zh: '台湾荣华钢材裁切生产线',
      en: 'Taiwan Runghua Steel Cut-to-Length Line',
      th: 'สายการผลิตตัดเหล็กไต้หวันรุ่งฮั่ว',
      vi: 'Dây chuyền cắt thép Đài Loan Rong Hua',
      ms: 'Barisan Pemotongan Keluli Taiwan Rong Hua',
      id: 'Jalur Pemotongan Baja Taiwan Rong Hua',
      es: 'Línea de Corte de Acero Taiwan Rong Hua',
      pt: 'Linha de Corte de Aço Taiwan Rong Hua',
    },
    slittingMachine: {
      zh: '分条机及分条生产线',
      en: 'Slitting Machine & Slitting Line',
      th: 'เครื่องตัดแบ่งเหล็กและสายการผลิต',
      vi: 'Máy xả băng và dây chuyền xả băng',
      ms: 'Mesin Slitting dan Barisan Slitting',
      id: 'Mesin Slitting dan Jalur Slitting',
      es: 'Máquina de Corte Longitudinal y Línea',
      pt: 'Máquina de Corte Longitudinal e Linha',
    },
    accessories: {
      zh: '皮带张紧器·液压螺母·钢卷移动台车',
      en: 'Belt Tensioner · Hydraulic Nut · Coil Transfer Car',
      th: 'ตัวปรับความตึงสายพาน · น็อตไฮดรอลิก · รถเข็นเหล็กม้วน',
      vi: 'Bộ căng đai · Đai ốc thủy lực · Xe chuyển cuộn',
      ms: 'Pengikat Tali Sawat · Nat Hidraulik · Troli Gegelung',
      id: 'Tensioner Sabuk · Mur Hidrolik · Troli Transfer Koil',
      es: 'Tensor de Correa · Tuerca Hidráulica · Carro de Bobinas',
      pt: 'Tensor de Correia · Porca Hidráulica · Carro de Bobinas',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Product',
        '@id': `${baseUrl}/${locale}/#slitting-line`,
        name: productNames.slittingLine[locale],
        category: 'Steel Processing Equipment',
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
        '@id': `${baseUrl}/${locale}/#slitting-machine`,
        name: productNames.slittingMachine[locale],
        category: 'Steel Processing Equipment',
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
        '@id': `${baseUrl}/${locale}/#accessories`,
        name: productNames.accessories[locale],
        category: 'Steel Processing Equipment Accessories',
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
      item: `${baseUrl}/${locale}/`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList,
  };
}

// Enhanced metadata generation - cleaned up fake placeholders
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
      // Twitter handles removed - no verified account exists
    },
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:updated_time': new Date().toISOString(),
      // fb:app_id removed - no real Facebook App ID
      // article:publisher removed - no verified Facebook page
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
    'ICBM': '22.543096,114.057865',
    'geo.position': '22.543096;114.057865',
  };
}

// Industry-specific keywords - corrected for actual products
export const industryKeywords = {
  slitting: ['steel slitting line', 'coil slitting', 'strip cutting', 'steel coil processing', 'slitter blade'],
  cutToLength: ['cut-to-length line', 'steel plate cutting', 'leveling machine', 'steel sheet processing'],
  accessories: ['belt tensioner', 'hydraulic nut', 'coil transfer car', 'solid lubricant bar', 'rubber ring'],
  general: ['steel service center', 'steel processing', 'Taiwan Runghua', 'industrial equipment', 'steel distribution'],
};

// Generate market-specific meta descriptions - corrected
export function getLocalizedMetaDescription(locale: Locale, productType?: string): string {
  const baseDescriptions = {
    zh: '深圳普耐斯机电设备有限公司，专业从事钢材裁切设备销售与服务。提供台湾荣华分条机、裁切生产线、皮带张紧器、液压螺母等产品。自2005年起服务全球钢材加工配送中心。',
    en: 'Shenzhen Punaise Mechanical Equipment Co., Ltd. specializes in steel slitting and cut-to-length equipment. Offering Taiwan Runghua slitting lines, belt tensioners, hydraulic nuts and coil handling solutions since 2005.',
    th: 'เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล ผู้เชี่ยวชาญด้านอุปกรณ์ตัดแบ่งเหล็กและสายการผลิต จำหน่ายสายการผลิตตัดเหล็กไต้หวันรุ่งฮั่ว ตั้งแต่ปี 2005',
    vi: 'Công ty Thiết bị Cơ khí Punaise Thâm Quyến chuyên cung cấp thiết bị xả băng và cắt thép. Dây chuyền xả băng Đài Loan Rong Hua, bộ căng đai, đai ốc thủy lực từ năm 2005.',
    ms: 'Shenzhen Punaise Mechanical Equipment mengkhusus dalam peralatan slitting dan pemotongan keluli. Barisan slitting Taiwan Rong Hua, pengikat tali sawat, nat hidraulik sejak 2005.',
    id: 'Shenzhen Punaise Mechanical Equipment mengkhususkan diri dalam peralatan slitting dan pemotongan baja. Jalur slitting Taiwan Rong Hua, tensioner sabuk, mur hidrolik sejak 2005.',
    es: 'Shenzhen Punaise Mechanical Equipment se especializa en equipos de corte longitudinal y transversal de acero. Líneas de corte Taiwan Rong Hua, tensores de correa, tuercas hidráulicas desde 2005.',
    pt: 'Shenzhen Punaise Equipamentos Mecânicos especializa-se em equipamentos de corte longitudinal e transversal de aço. Linhas de corte Taiwan Rong Hua, tensores de correia, porcas hidráulicas desde 2005.',
  };

  return baseDescriptions[locale];
}
