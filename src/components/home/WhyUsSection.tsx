import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

/* SVG icons matching each feature's meaning */
const featureIcons = [
  /* 01: 검증된 운영 노하우 — shield/check */
  <svg key="icon-01" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  /* 02: 노련하고 편안한 응대 — heart/handshake */
  <svg key="icon-02" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  /* 03: 투명 정찰제 — won/tag */
  <svg key="icon-03" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  /* 04: 365일 연중무휴 — clock */
  <svg key="icon-04" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  /* 05: 편리한 접근성 — map pin */
  <svg key="icon-05" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
]

const accentStyles = [
  { bg: 'rgba(212,149,106,0.07)', border: 'rgba(212,149,106,0.18)' },
  { bg: 'rgba(155,122,173,0.07)', border: 'rgba(155,122,173,0.18)' },
  { bg: 'rgba(201,123,132,0.07)', border: 'rgba(201,123,132,0.18)' },
  { bg: 'rgba(106,76,147,0.07)', border: 'rgba(106,76,147,0.18)' },
  { bg: 'rgba(212,149,106,0.07)', border: 'rgba(212,149,106,0.18)' },
]

export function WhyUsSection({ dict }: Props) {
  const w = dict.why_us

  return (
    <section className="scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {w.label}
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--bone)' }}>
          {w.title}
        </h2>
        <p className="mt-5 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {w.subtitle}
        </p>
      </header>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {w.features.map((f, i) => {
          const a = accentStyles[i % accentStyles.length]
          return (
            <div
              key={f.num}
              className={`glass-card flex flex-col gap-4 rounded-2xl p-6 md:p-8 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Icon badge */}
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: a.bg, border: `1px solid ${a.border}`, color: 'var(--accent)' }}
              >
                {featureIcons[i]}
              </span>
              <h3 className="text-lg font-bold tracking-tight md:text-xl" style={{ color: 'var(--bone)' }}>
                {f.title}
              </h3>
              <p className="max-w-[42ch] text-sm leading-relaxed md:text-[15px]" style={{ color: 'var(--bone-dim)' }}>
                {f.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
