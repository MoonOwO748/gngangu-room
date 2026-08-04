import { getCustomerReviews } from '@/lib/wordpress'
import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export async function ReviewsSection({ dict }: Props) {
  const reviews = await getCustomerReviews()

  return (
    <section className="scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            CUSTOMER REVIEWS
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          달토를 다녀가신 고객님들의 리얼 후기
        </h2>
        <p className="mt-4 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
          비즈니스 접대부터 단체 회식, 생일 파티까지. 달토의 정찰제 서비스와 노련한 1:1 케어에 만족하신 실제 고객 후기입니다.
        </p>
      </header>

      {/* Reviews Grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-xs leading-relaxed md:text-sm" style={{ color: 'var(--bone-dim)' }}>
                "{rev.content}"
              </p>
            </div>

            {/* Author info */}
            <div className="mt-6 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--bone)' }}>{rev.authorName}</p>
                  <p className="text-[11px]" style={{ color: 'var(--bone-mute)' }}>{rev.date}</p>
                </div>
                {rev.visitType && (
                  <span
                    className="rounded-lg px-2.5 py-1 text-[10px] font-bold"
                    style={{
                      background: 'rgba(212,149,106,0.12)',
                      color: 'var(--accent-bright)',
                      border: '1px solid rgba(212,149,106,0.2)',
                    }}
                  >
                    {rev.visitType}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
