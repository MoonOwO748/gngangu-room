import type { PageProps } from 'next/types'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from './dictionaries'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { SystemSection } from '@/components/home/SystemSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { GuideSection } from '@/components/home/GuideSection'
import { WhoIsItForSection } from '@/components/home/WhoIsItForSection'
import { PricingSection } from '@/components/home/PricingSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaSection } from '@/components/home/CtaSection'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
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
      <FaqSection dict={dict} />
      <CtaSection dict={dict} lang={lang} />
    </>
  )
}
