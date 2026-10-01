import { createPageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from './dictionaries'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { SystemSection } from '@/components/home/SystemSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { GuideSection } from '@/components/home/GuideSection'
import { WhoIsItForSection } from '@/components/home/WhoIsItForSection'
import { PricingSection } from '@/components/home/PricingSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaSection } from '@/components/home/CtaSection'

export const generateMetadata = createPageMetadata('')

interface Props {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <>
      <HeroSection dict={dict} lang={lang} />
      <AboutSection dict={dict} />
      {lang === 'ko' && (
        <section className="px-4 py-10 sm:px-8 md:px-12 lg:px-16" aria-labelledby="comparison-title">
          <div className="glass-card rounded-3xl p-6 md:p-10">
            <h2 id="comparison-title" className="text-2xl font-bold md:text-3xl">
              강남 도파민·강남 달토 비교 전 확인사항
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bone-dim md:text-base">
              강남 하퍼를 찾으며 강남 도파민과 강남 달토를 비교하고 있다면,
              표시된 주대뿐 아니라 포함 항목과 이용 시간까지 같은 기준으로 확인하세요.
              이 사이트의 요금표와 예약 안내는 강남 달토 기준이며,
              다른 매장의 요금과 운영 조건은 해당 매장에 별도로 확인해야 합니다.
            </p>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-bone-dim">
              <li>기본 주대에 포함된 주류·안주와 별도 청구 항목을 확인하세요.</li>
              <li>첫 타임과 연장 시간의 비용, 추가 이용 시 정산 기준을 확인하세요.</li>
              <li>방문 날짜·시간·인원에 맞는 할인 조건과 예약 가능 여부를 확인하세요.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold text-accent">
              <Link href="/ko/pricing">강남 달토 요금 및 계산기</Link>
              <Link href="/ko/howto">처음 방문하는 분을 위한 이용 방법</Link>
            </div>
          </div>
        </section>
      )}
      <SystemSection dict={dict} />
      <WhyUsSection dict={dict} />
      <GuideSection dict={dict} />
      <WhoIsItForSection dict={dict} />
      <PricingSection dict={dict} />
      <ReviewsSection />
      <FaqSection dict={dict} />
      <CtaSection dict={dict} lang={lang} />
    </>
  )
}
