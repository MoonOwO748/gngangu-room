import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props {
  dict: Dict
  className?: string
  hideHeader?: boolean
}

export function GuideSection({ dict, className, hideHeader = false }: Props) {
  const g = dict.guide

  return (
    <section className={className ?? "scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32"}>
      {!hideHeader && (
        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {g.label}
            </p>
          </div>
          <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
            {g.title}
          </h2>
          <p className="mt-4 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
            {g.subtitle}
          </p>
        </header>
      )}

      {/* Timeline Steps Grid */}
      <div className={`relative ${hideHeader ? 'mt-0' : 'mt-10'} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
        {g.steps.map((s, idx) => (
          <div
            key={idx}
            className="glass-card relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8"
          >
            {/* Step Number Top Banner */}
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="rounded-lg px-3 py-1 text-xs font-extrabold tracking-wider"
                  style={{
                    background: 'rgba(212,149,106,0.12)',
                    color: 'var(--accent-bright)',
                    border: '1px solid rgba(212,149,106,0.2)',
                  }}
                >
                  {s.step}
                </span>
                <span className="text-2xl font-black opacity-20" style={{ color: 'var(--bone)' }}>
                  0{idx + 1}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight" style={{ color: 'var(--bone)' }}>
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
                {s.desc}
              </p>
            </div>

            {/* Bottom accent indicator */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(idx + 1) * 25}%`,
                    background: 'linear-gradient(90deg, var(--accent), var(--mauve))',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
