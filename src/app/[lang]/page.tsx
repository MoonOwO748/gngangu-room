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
      <SystemSection dict={dict} />
      <WhyUsSection dict={dict} />
      <GuideSection dict={dict} />
      <WhoIsItForSection dict={dict} />
      <PricingSection dict={dict} />
      <ReviewsSection dict={dict} />
      <FaqSection dict={dict} />
      <CtaSection dict={dict} lang={lang} />
    </>
  )
}
