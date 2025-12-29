import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    ? 'https://cute-jelly-dc03bf.netlify.app' 
    : 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="alternate" hrefLang="zh" href="https://cute-jelly-dc03bf.netlify.app/zh" />
        <link rel="alternate" hrefLang="en" href="https://cute-jelly-dc03bf.netlify.app/en" />
        <link rel="alternate" hrefLang="th" href="https://cute-jelly-dc03bf.netlify.app/th" />
        <link rel="alternate" hrefLang="vi" href="https://cute-jelly-dc03bf.netlify.app/vi" />
        <link rel="alternate" hrefLang="ms" href="https://cute-jelly-dc03bf.netlify.app/ms" />
        <link rel="alternate" hrefLang="id" href="https://cute-jelly-dc03bf.netlify.app/id" />
        <link rel="alternate" hrefLang="es" href="https://cute-jelly-dc03bf.netlify.app/es" />
        <link rel="alternate" hrefLang="pt" href="https://cute-jelly-dc03bf.netlify.app/pt" />
        <link rel="alternate" hrefLang="x-default" href="https://cute-jelly-dc03bf.netlify.app/zh" />
      </head>
      <body className="font-sans antialiased" style={{'--font-inter': inter.style.fontFamily} as any}>
        {children}
      </body>
    </html>
  );
}
