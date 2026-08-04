import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function SystemSection({ dict }: Props) {
  const s = dict.system

  const icons = [
    /* 1: 정찰제 — Shield Check */
    <svg key="s-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    /* 2: 파트너 — Users */
    <svg key="s-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    /* 3: 할인 — Tag/Percent */
    <svg key="s-3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    /* 4: 주차/케어 — Car/Key */
    <svg key="s-4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  ]

  return (
    <section className="scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {s.label}
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {s.title}
        </h2>
        <p className="mt-4 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {s.subtitle}
        </p>
      </header>

      {/* System Cards Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, idx) => (
          <div
            key={idx}
            className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8"
          >
            <div>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300"
                style={{
                  background: 'rgba(212,149,106,0.1)',
                  border: '1px solid rgba(212,149,106,0.2)',
                  color: 'var(--accent)',
                }}
              >
                {icons[idx]}
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight" style={{ color: 'var(--bone)' }}>
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
                {item.desc}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--accent-bright)' }}>
              <span>SYSTEM RULE 0{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
