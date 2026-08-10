import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../dictionaries'
import { FaqSection } from '@/components/home/FaqSection'
import { siteConfig } from '@/config/site'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-12 lg:px-16 md:py-16">
      {/* Page Header Hero */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-[250px] w-[250px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'var(--mauve)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-8 h-[180px] w-[180px] rounded-full opacity-15 blur-[60px]"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {dict.faq.label}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {dict.faq.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {lang === 'ko' ? '궁금한 점이 있으시면 먼저 확인해 보세요. 여기에 없는 질문은 전화로 편하게 문의해 주세요.' :
             lang === 'en' ? 'Check here first for answers. For anything else, feel free to call us.' :
             lang === 'zh' ? '如有疑问请先查看。如未找到答案，欢迎致电咨询。' :
             'まずはこちらをご確認ください。ここにない質問はお気軽にお電話ください。'}
          </p>
        </div>
      </section>

      {/* FAQ Accordion — reuse FaqSection from home */}
      <section className="mt-12 md:mt-16">
        <FaqSection dict={dict} className="w-full" hideHeader />
      </section>

      {/* Additional Contact CTA */}
      <section
        className="glass-card mt-16 overflow-hidden rounded-3xl p-8 text-center md:mt-20 md:p-12"
        style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'linear-gradient(135deg, rgba(212,149,106,0.08), rgba(155,122,173,0.08))' }}
      >
        <h2 className="text-2xl font-extrabold md:text-4xl" style={{ color: 'var(--bone)' }}>
          {lang === 'ko' ? '원하시는 답변을 찾지 못하셨나요?' :
           lang === 'en' ? "Didn't find what you're looking for?" :
           lang === 'zh' ? '没有找到您想要的答案？' :
           'お探しの回答が見つかりませんか？'}
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--bone-dim)' }}>
          {dict.cta.subtitle}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-all hover:scale-[1.02] hover:brightness-110 sm:min-w-[180px]"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))',
              color: 'var(--ink)',
              boxShadow: '0 8px 24px -8px rgba(212,149,106,0.35)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {siteConfig.phone}
          </a>
          <Link
            href={`/${lang}/reserve`}
            className="inline-flex items-center justify-center rounded-xl border px-8 py-4 text-sm font-medium transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 sm:min-w-[180px]"
            style={{ borderColor: 'var(--border)', color: 'var(--bone)' }}
          >
            {dict.cta.online} ➔
          </Link>
        </div>
      </section>
    </main>
  )
}
