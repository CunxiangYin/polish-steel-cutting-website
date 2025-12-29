import { locales, defaultLocale } from '@/config/i18n'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://cute-jelly-dc03bf.netlify.app'
  : 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages that exist for each locale
  const staticPages = [
    '', // root page
  ]

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add default locale entries (without locale prefix)
  staticPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/${defaultLocale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => {
            acc[locale] = `${baseUrl}/${locale}${page}`
            return acc
          },
          {} as Record<string, string>
        ),
      },
    })
  })

  // Add entries for all other locales
  locales.filter(locale => locale !== defaultLocale).forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 0.9 : 0.7,
        alternates: {
          languages: locales.reduce(
            (acc, loc) => {
              acc[loc] = `${baseUrl}/${loc}${page}`
              return acc
            },
            {} as Record<string, string>
          ),
        },
      })
    })
  })

  // Add root redirect to default locale
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  })

  return sitemapEntries
}