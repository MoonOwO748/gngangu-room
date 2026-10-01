import type { MetadataRoute } from 'next'
import { locales } from '@/app/[lang]/dictionaries'
import { siteConfig } from '@/config/site'

const BASE_URL = siteConfig.url

const staticPages = ['', '/pricing', '/events', '/howto', '/access', '/faq', '/reserve', '/blog']

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      changeFrequency: (page === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  )
}
