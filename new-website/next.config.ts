import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify 部署配置
  output: 'export',
  trailingSlash: true,
  
  // 图片优化 - Netlify 兼容配置
  images: {
    unoptimized: true, // Netlify 不支持 Next.js 图片优化
  },

  // 压缩优化
  compress: true,
  
  // 安全头将在 netlify.toml 中配置

  // 移除重复的 trailingSlash 配置
  
  // SWC minification 是默认启用的
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
