import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function AboutSection({ dict }: Props) {
  const a = dict.about

  const stats = [
    { value: '60+', label: '프라이빗 룸', desc: '대형 단체룸 & 소형 룸 완비' },
    { value: '200+', label: '일평균 출근', desc: '풍부하고 다양한 파트너 스태프' },
    { value: '10년+', label: '베테랑 매니저', desc: '스타일·이상형 1:1 맞춤 케어' },
  ]

  return (
    <section className="scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      <div className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-12 lg:p-14">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'var(--accent)' }}
        />

        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {a.label}
          </p>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="text-[2.25rem] font-black leading-[1.08] tracking-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
            {a.title}
          </h2>
          <span className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold shrink-0" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.1)', color: 'var(--accent-bright)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            삼정호텔 (역삼동 604-11)
          </span>
        </div>

        {/* 3 Key Stats Row (Big Numbers Layout) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="rounded-2xl border p-5 md:p-6"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'linear-gradient(145deg, rgba(26,26,34,0.7), rgba(19,19,24,0.85))',
              }}
            >
              <p className="text-3xl font-black md:text-4xl" style={{ color: 'var(--accent-bright)' }}>
                {st.value}
              </p>
              <h3 className="mt-2 text-sm font-bold tracking-tight" style={{ color: 'var(--bone)' }}>
                {st.label}
              </h3>
              <p className="mt-1 text-xs" style={{ color: 'var(--bone-dim)' }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Structured Content Grid (2 Columns formatted readable text) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <h4 className="flex items-center gap-2 text-base font-bold" style={{ color: 'var(--bone)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }} aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              강남 대표 하이퍼블릭 공간
            </h4>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              {a.desc1}
            </p>
          </div>

          <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <h4 className="flex items-center gap-2 text-base font-bold" style={{ color: 'var(--bone)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }} aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              1:1 디테일 맞춤 서비스
            </h4>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              {a.desc2}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
