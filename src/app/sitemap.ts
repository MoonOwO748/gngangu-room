import type { MetadataRoute } from 'next'
import { locales } from '@/app/[lang]/dictionaries'
import { siteConfig } from '@/config/site'

const BASE_URL = siteConfig.url

const staticPages = ['', '/rooms', '/pricing', '/events', '/menu', '/howto', '/access', '/faq', '/reserve', '/international']

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  )
}
