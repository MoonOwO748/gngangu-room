import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import Link from 'next/link'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function ReservePage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="px-4 py-16 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
          RESERVATION
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {dict.cta.title}
        </h1>
        <p className="mt-5 text-sm md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {dict.cta.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href="tel:+821057043097"
            className="flex items-center justify-center gap-3 rounded-2xl py-5 text-base font-semibold transition-all hover:brightness-105"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {dict.cta.call} — 010-5704-3097
          </a>

          <div
            className="rounded-2xl border p-6 text-center text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--bone-dim)' }}
          >
            {lang === 'ko' ? '온라인 예약 폼은 준비 중입니다. 전화로 문의해주세요.' :
             lang === 'en' ? 'Online form coming soon. Please call us.' :
             lang === 'zh' ? '在线预订表格即将上线，请电话联系。' :
             '온라인 予約フォームは準備中です。お電話でお問い合わせください。'}
          </div>

          <Link
            href={`/${lang}`}
            className="text-center text-sm transition-colors hover:text-bone"
            style={{ color: 'var(--bone-dim)' }}
          >
            ← {lang === 'ko' ? '홈으로' : lang === 'en' ? 'Back to Home' : lang === 'zh' ? '返回首页' : 'ホームへ戻る'}
          </Link>
        </div>
      </div>
    </div>
  )
}
