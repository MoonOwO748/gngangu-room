import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function WhoIsItForSection({ dict }: Props) {
  const w = dict.who_is_it_for

  const targetIcons = ['💼', '🥂', '🎉', '🥃']

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
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.05)' }}>
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
