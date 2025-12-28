import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商",
  description: "深圳普耐斯机电设备有限公司，专业从事钢板切割设备、台湾荣华分条机、等离子激光切割系统制造。自2005年起为客户提供优质设备解决方案。",
  keywords: "钢板切割设备, CNC切割设备, 等离子切割, 激光切割, 火焰切割, 金属制造, 工业切割, 台湾荣华机械",
  authors: [{ name: "深圳普耐斯机电设备有限公司" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://punaise-equipment.com/",
    siteName: "深圳普耐斯机电设备有限公司",
    title: "深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商",
    description: "专业从事钢板切割设备制造，台湾荣华分条机代理，为金属制造行业提供优质解决方案。",
    images: [
      {
        url: "/images/punaise-cutting-equipment.jpg",
        width: 1200,
        height: 630,
        alt: "普耐斯钢板切割设备",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商",
    description: "专业从事钢板切割设备制造，台湾荣华分条机代理，为金属制造行业提供优质解决方案。",
    images: ["/images/punaise-cutting-equipment.jpg"],
  },
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
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="font-inter antialiased">
        <Layout>
          {children}
        </Layout>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
