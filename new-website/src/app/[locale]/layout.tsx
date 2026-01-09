import { notFound } from 'next/navigation';
import { locales, type Locale, defaultLocale } from '@/config/i18n';
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { TranslationProvider } from '@/contexts/TranslationContext';
import { 
  generateEnhancedMetadata, 
  generateGeoMetadata, 
  getLocalizedMetaDescription,
  generateCompanyStructuredData,
  generateProductStructuredData,
  generateBreadcrumbStructuredData,
  marketKeywords
} from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Validate locale
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  
  // Define localized metadata
  const localizedTitles = {
    zh: "深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商 | CNC等离子激光切割",
    en: "Shenzhen Punaise Mechanical Equipment Co., Ltd. - Professional Steel Cutting Equipment Manufacturer | CNC Plasma Laser Cutting",
    th: "เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล - ผู้ผลิตอุปกรณ์ตัดเหล็กแผ่นมืออาชีพ | CNC พลาสม่า เลเซอร์",
    vi: "Công ty Thiết bị Cơ khí Punaise Thâm Quyến - Nhà sản xuất thiết bị cắt tấm thép chuyên nghiệp | CNC Plasma Laser",
    ms: "Shenzhen Punaise Mechanical Equipment - Pengeluar Peralatan Pemotongan Plat Keluli Profesional | CNC Plasma Laser",
    id: "Shenzhen Punaise Mechanical Equipment - Produsen Peralatan Pemotongan Pelat Baja Profesional | CNC Plasma Laser",
    es: "Shenzhen Punaise Mechanical Equipment - Fabricante Profesional de Equipos de Corte de Placas de Acero | CNC Plasma Láser",
    pt: "Shenzhen Punaise Mechanical Equipment - Fabricante Profissional de Equipamentos de Corte de Chapas de Aço | CNC Plasma Laser",
  };

  const pageTitle = localizedTitles[validLocale];
  const pageDescription = getLocalizedMetaDescription(validLocale);
  
  // Generate enhanced metadata with all SEO features
  const enhancedMetadata = generateEnhancedMetadata(
    validLocale,
    pageTitle,
    pageDescription
  );

  // Add geo-targeting metadata
  const geoMetadata = generateGeoMetadata(validLocale);

  // Build the other metadata object safely
  const baseOtherMetadata = enhancedMetadata.other || {};
  const additionalMetadata = {
    ...geoMetadata,
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
  };

  // Combine metadata objects, ensuring proper types
  const otherMetadata: { [key: string]: string | number | (string | number)[] } = {};
  
  // Add base metadata
  Object.entries(baseOtherMetadata).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      otherMetadata[key] = value;
    }
  });
  
  // Add additional metadata
  Object.entries(additionalMetadata).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      otherMetadata[key] = value;
    }
  });

  return {
    ...enhancedMetadata,
    other: otherMetadata,
    verification: {
      google: 'your-google-site-verification', // Replace with actual verification code
      yandex: 'your-yandex-verification', // Replace with actual verification code
      yahoo: 'your-yahoo-verification', // Replace with actual verification code
      other: {
        'baidu-site-verification': 'your-baidu-verification', // For Chinese market
      },
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '16x16 32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#2563eb',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const validLocale = locale as Locale;

  // Import messages directly to avoid getRequestConfig issues
  let messages;
  try {
    switch (validLocale) {
      case 'zh':
        messages = (await import('../../../messages/zh.json')).default;
        break;
      case 'en':
        messages = (await import('../../../messages/en.json')).default;
        break;
      case 'th':
        messages = (await import('../../../messages/th.json')).default;
        break;
      case 'vi':
        messages = (await import('../../../messages/vi.json')).default;
        break;
      case 'ms':
        messages = (await import('../../../messages/ms.json')).default;
        break;
      case 'id':
        messages = (await import('../../../messages/id.json')).default;
        break;
      case 'es':
        messages = (await import('../../../messages/es.json')).default;
        break;
      case 'pt':
        messages = (await import('../../../messages/pt.json')).default;
        break;
      default:
        messages = (await import('../../../messages/zh.json')).default;
    }
  } catch (error) {
    messages = (await import('../../../messages/zh.json')).default;
  }

  // Generate structured data
  const companyStructuredData = generateCompanyStructuredData(validLocale);
  const productStructuredData = generateProductStructuredData(validLocale);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(validLocale);

  return (
    <html lang={validLocale} dir="ltr">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(companyStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//embed.tawk.to" />
        <link rel="preconnect" href="https://embed.tawk.to" />
        
        {/* Language-specific optimizations */}
        {validLocale === 'zh' && (
          <>
            <link rel="dns-prefetch" href="//baidu.com" />
            <link rel="dns-prefetch" href="//weibo.com" />
          </>
        )}
        
        {/* Tawk.to Chat Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/695496a6d5d3bd197b4d7fbd/1jdp6ovkg';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body>
        <TranslationProvider messages={messages} locale={validLocale}>
          {children}
          <Toaster />
        </TranslationProvider>
      </body>
    </html>
  );
}