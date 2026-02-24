import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Shenzhen Punaise Mechanical Equipment Co., Ltd.",
  description: "Professional steel cutting equipment manufacturer",
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://punaise-equipment.netlify.app' 
    : 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://punaise-equipment.netlify.app' 
    : 'http://localhost:3000';

  // Structured Data JSON-LD
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "深圳普耐斯机电设备有限公司",
    "alternateName": "Shenzhen Punaise Mechanical Equipment Co., Ltd.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo-main.svg`,
    "image": `${baseUrl}/logo-main.svg`,
    "description": "专业从事钢材裁切设备销售与服务，提供台湾荣华分条机、裁切生产线、皮带张紧器、液压螺母等产品。自2005年起服务全球钢材加工配送中心。",
    "foundingDate": "2005",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "深圳市",
      "addressRegion": "广东省", 
      "addressCountry": "CN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-755-26443680",
      "email": "466904802@qq.com",
      "contactType": "customer service",
      "availableLanguage": ["zh", "en", "th", "vi", "ms", "id", "es", "pt"]
    },
    "sameAs": [
      // TODO: Add real social media links when available
    ],
    "areaServed": [
      "CN", "TH", "VN", "MY", "ID", "ES", "PT", "US", "CA", "AU"
    ],
    "knowsAbout": [
      "钢材裁切设备", "分条机", "钢卷分条生产线", "裁切生产线",
      "皮带张紧器", "液压螺母", "台湾荣华机械", "钢材加工设备"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "钢材裁切设备产品目录",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "台湾荣华钢材裁切生产线",
            "description": "专业钢材裁切生产线，适用于大型钢材加工配送中心"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "分条机及分条生产线",
            "description": "高精度钢卷分条设备，台湾荣华品牌"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "皮带张紧器与液压螺母",
            "description": "钢材裁切设备专用配件，日本JDC公司专利产品"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "深圳普耐斯机电设备有限公司",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["zh-CN", "en-US", "th-TH", "vi-VN", "ms-MY", "id-ID", "es-ES", "pt-BR"],
    "isAccessibleForFree": true
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="alternate" hrefLang="zh" href="https://punaise-equipment.netlify.app/zh/" />
        <link rel="alternate" hrefLang="en" href="https://punaise-equipment.netlify.app/en/" />
        <link rel="alternate" hrefLang="th" href="https://punaise-equipment.netlify.app/th/" />
        <link rel="alternate" hrefLang="vi" href="https://punaise-equipment.netlify.app/vi/" />
        <link rel="alternate" hrefLang="ms" href="https://punaise-equipment.netlify.app/ms/" />
        <link rel="alternate" hrefLang="id" href="https://punaise-equipment.netlify.app/id/" />
        <link rel="alternate" hrefLang="es" href="https://punaise-equipment.netlify.app/es/" />
        <link rel="alternate" hrefLang="pt" href="https://punaise-equipment.netlify.app/pt/" />
        <link rel="alternate" hrefLang="x-default" href="https://punaise-equipment.netlify.app/zh/" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased" style={{'--font-inter': inter.style.fontFamily} as any}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
