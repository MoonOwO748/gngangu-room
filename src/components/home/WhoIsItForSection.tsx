import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function WhoIsItForSection({ dict }: Props) {
  const w = dict.who_is_it_for

  const targetIcons = [
    // 1. Business VIP (Briefcase Icon)
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>,

    // 2. Company Dinners & After-Parties (Wine Glasses Icon)
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 22h8"/>
      <path d="M12 15v7"/>
      <path d="M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5z"/>
      <line x1="7" y1="9" x2="17" y2="9"/>
    </svg>,

    // 3. Birthdays & Celebrations (Sparkle Icon)
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>,

    // 4. Solo Visits & Guests (Glass Icon)
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h14l-1.5 14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2L5 4z"/>
      <line x1="5" y1="10" x2="19" y2="10"/>
    </svg>,
  ]

  return (
    <section className="scroll-reveal px-3 pt-16 sm:px-5 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {w.label}
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {w.title}
        </h2>
        <p className="mt-4 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {w.subtitle}
        </p>
      </header>

      {/* Target Cards Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {w.targets.map((t, idx) => (
          <div
            key={idx}
            className="glass-card group flex flex-col rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent)' }}
              >
                {targetIcons[idx]}
              </span>
              {idx === 0 && (
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  RECOMMENDED
                </span>
              )}
            </div>

            <h3 className="mt-5 text-lg font-bold tracking-tight" style={{ color: 'var(--bone)' }}>
              {t.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
