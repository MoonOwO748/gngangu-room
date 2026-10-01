import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries'
import { siteConfig } from '@/config/site'

const metaByLocale: Record<string, { title: string; description: string; ogLocale: string }> = {
  ko: {
    title: '강남 하퍼 | 강남 달토 이용 안내·가격·예약',
    description: `강남 하퍼 이용을 위한 강남 달토 요금·시스템·예약 안내. 강남 도파민과 비교할 때 확인할 주대, 시간당 비용, 할인 조건을 살펴보세요. 역삼동 위치 및 문의 ${siteConfig.phone}.`,
    ogLocale: 'ko_KR',
  },
  en: {
    title: `${siteConfig.altName} Gangnam Karaoke | All-Time ₩100,000 · ₩50,000 OFF Event`,
    description: `Premium private karaoke in Yeoksam-dong, Gangnam. Base price ₩100,000 (₩50,000 OFF all-time event). 3-5 min walk from Sinnonhyeon Station. Open 365 days. Call ${siteConfig.phone}.`,
    ogLocale: 'en_US',
  },
  zh: {
    title: `${siteConfig.altName} 江南KTV官方 | 全时段酒水费10万 · 享5万韩元折扣`,
    description: `首尔江南区驿三洞私人包厢KTV。全时段酒水费10万韩元（享5万韩元折扣优惠）。新论岘站4号出口步行3-5分钟。全年365天营业。`,
    ogLocale: 'zh_CN',
  },
  ja: {
    title: `${siteConfig.altName} 江南カラオケ公式 | オールタイム飲み代10万ウォン · 5万ウォン割引`,
    description: `ソウル江南区駅三洞のプライベートルームカラオケ。オールタイム基本飲み代10万ウォン（5万ウォン割引キャンペーン適用）。新論峴駅4番出口徒歩3〜5分。年中無休。`,
    ogLocale: 'ja_JP',
  },
}

const pageDescriptions = {
  pricing: '강남 하퍼 가격을 알아볼 때 확인할 강남 달토 주대, 시간당 비용, 할인 조건과 예상 요금 계산기를 안내합니다.',
  events: '강남 하퍼 이용 전 확인할 강남 달토 할인 이벤트와 적용 조건을 안내합니다. 방문 시간과 할인 포함 여부를 확인하세요.',
  howto: '강남 하퍼 첫 방문을 위한 강남 달토 이용 방법입니다. 문의, 예약, 입장부터 요금 확인까지 순서대로 안내합니다.',
  access: '강남 하퍼 방문을 위한 강남 달토 위치와 교통 안내입니다. 서울 강남구 역삼동 604-11 위치와 방문 경로를 확인하세요.',
  faq: '강남 하퍼 이용 시 자주 묻는 질문입니다. 강남 달토 예약, 요금, 주차와 방문 전 확인할 사항을 안내합니다.',
  blog: '강남 하퍼 이용 정보와 강남 달토 소식입니다. 요금 안내, 할인 혜택과 모임 준비에 필요한 정보를 확인하세요.',
  reserve: '강남 하퍼 예약을 위한 강남 달토 문의 안내입니다. 방문 날짜, 인원과 이용 시간을 정하고 담당자에게 상담하세요.',
} as const

type PageSlug = '' | keyof typeof pageDescriptions

// Each page owns its metadata so child routes never inherit the home canonical.
export function createPageMetadata(slug: PageSlug) {
  return async ({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> => {
    const { lang } = await params
    if (!hasLocale(lang)) notFound()
    const dict = await getDictionary(lang)
    const base = siteConfig.url
    const suffix = slug ? `/${slug}` : ''
    const m = metaByLocale[lang]
    const title = !slug ? m.title : lang === 'ko'
      ? `강남 하퍼 ${dict.nav[slug]} | 강남 달토`
      : `${dict.nav[slug]} | ${siteConfig.altName}`
    const description = !slug ? m.description : lang === 'ko'
      ? pageDescriptions[slug]
      : `${dict.nav[slug]}. ${m.description}`
    const url = `${base}/${lang}${suffix}`
    return {
      title,
      description,
      keywords: lang === 'ko' ? ['강남 하퍼', '강남 도파민', '강남 달토'] : undefined,
      alternates: {
        canonical: url,
        languages: {
          ko: `${base}/ko${suffix}`,
          en: `${base}/en${suffix}`,
          'zh-CN': `${base}/zh${suffix}`,
          ja: `${base}/ja${suffix}`,
          'x-default': `${base}/ko${suffix}`,
        },
      },
      openGraph: {
        title, description, url,
        siteName: siteConfig.name,
        locale: m.ogLocale,
        type: 'website',
        images: [{ url: `${base}/hero.jpg`, alt: siteConfig.name }],
      },
      twitter: {
        card: 'summary_large_image', title, description,
        images: [`${base}/hero.jpg`],
      },
    }
  }
}
