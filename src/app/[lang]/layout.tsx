import { notFound } from 'next/navigation'
import { Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_JP } from 'next/font/google'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}
import { hasLocale, locales, getDictionary } from './dictionaries'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingCta } from '@/components/layout/FloatingCta'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const notoKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-kr', display: 'swap' })
const notoSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-sc', display: 'swap' })
const notoJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-noto-jp', display: 'swap' })


import { siteConfig } from '@/config/site'

const BASE_URL = siteConfig.url

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: siteConfig.name,
        alternateName: siteConfig.altName,
        inLanguage: ['ko', 'en', 'zh-CN', 'ja'],
      },
      {
        '@type': 'NightClub',
        '@id': `${BASE_URL}/#business`,
        name: siteConfig.name,
        alternateName: [siteConfig.altName, siteConfig.name, 'Gangnam Karaoke', '江南KTV', '江南カラオケ'],
        url: BASE_URL,
        telephone: siteConfig.phoneTel,
        image: `${BASE_URL}/hero.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '역삼동 604-11',
          addressLocality: '강남구',
          addressRegion: '서울',
          postalCode: '06234',
          addressCountry: 'KR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 37.4979, longitude: 127.0276 },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '18:00', closes: '15:00',
          },
        ],
        priceRange: '₩100,000~',
        inLanguage: ['ko', 'en', 'zh-CN', 'ja'],
      },
    ],
  }

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className={`flex min-h-screen flex-col bg-ink text-bone ${notoKR.variable} ${notoSC.variable} ${notoJP.variable}`}>
        <ScrollReveal />
        <div className="sticky top-0 z-50">
          <AnnouncementBar dict={dict} lang={lang} />
          <Header dict={dict} lang={lang} />
        </div>
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Footer dict={dict} lang={lang} />
        <FloatingCta lang={lang} />
      </body>
    </html>
  )
}
