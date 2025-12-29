import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://cute-jelly-dc03bf.netlify.app'
  : 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}