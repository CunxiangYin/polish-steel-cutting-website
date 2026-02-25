import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify 部署配置
  output: 'export',
  trailingSlash: true,
  
  // 图片优化配置
  images: {
    unoptimized: true, // Netlify 不支持 Next.js 图片优化
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 1 day
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'punaise-equipment.netlify.app',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 压缩优化
  compress: true,
  
  // 注意：安全头配置在静态导出中无效，需要在netlify.toml中配置
  // Turbopack disabled for WASM compatibility
  // turbopack: {},
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-accordion'
    ],
  },

  // TypeScript 配置
  typescript: {
    // 在生产构建时忽略TypeScript错误（谨慎使用）
    ignoreBuildErrors: false,
  },

  // Note: ESLint configuration moved to eslint.config.mjs

  // 环境变量
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NODE_ENV === 'production' 
      ? 'https://punaise-equipment.netlify.app'
      : 'http://localhost:3000',
  },

  // 注意：redirects 和 rewrites 在静态导出中无效，需要在netlify.toml中配置
};

export default nextConfig;
