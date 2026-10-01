import { createPageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import AccessPageClient from './AccessPageClient'

export const generateMetadata = createPageMetadata('access')

interface Props {
  params: Promise<{ lang: string }>
}

export default async function AccessPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return <AccessPageClient dict={dict} lang={lang} />
}
