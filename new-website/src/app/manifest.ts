import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商',
    short_name: 'Punaise 普耐斯',
    description: '深圳普耐斯机电设备有限公司，专业从事钢板切割设备、台湾荣华分条机、等离子激光切割系统制造。自2005年起为客户提供优质设备解决方案。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    scope: '/',
    lang: 'zh-CN',
    dir: 'ltr',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: '普耐斯机电设备主页 - 桌面版',
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: '普耐斯机电设备主页 - 移动版',
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://cute-jelly-dc03bf.netlify.app/manifest.webmanifest',
      },
    ],
    prefer_related_applications: false,
  }
}