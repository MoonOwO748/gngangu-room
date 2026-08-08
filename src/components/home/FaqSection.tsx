'use client'
import { useState } from 'react'
import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props {
  dict: Dict
  className?: string
  hideHeader?: boolean
}

export function FaqSection({ dict, className, hideHeader = false }: Props) {
  const f = dict.faq
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={className ?? "scroll-reveal px-4 pt-16 sm:px-8 md:px-12 lg:px-16 md:pt-28 lg:pt-32"}>
      {!hideHeader && (
        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="accent-line" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {f.label}
            </p>
          </div>
          <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
            {f.title}
          </h2>
        </header>
      )}

      {/* FAQ items — card-based instead of divider-based */}
      <div className="mt-10 flex flex-col gap-3">
        {f.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border transition-all duration-300"
            style={{
              borderColor: openIndex === i ? 'rgba(212,149,106,0.2)' : 'var(--border)',
              background: openIndex === i ? 'rgba(212,149,106,0.03)' : 'var(--surface)',
            }}
          >
            <button
              type="button"
              id={`faq-btn-${i}`}
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors md:px-6 md:py-5 md:text-base"
              style={{ color: openIndex === i ? 'var(--bone)' : 'var(--bone-dim)' }}
            >
              <span className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{
                    background: openIndex === i ? 'rgba(212,149,106,0.15)' : 'rgba(255,255,255,0.05)',
                    color: 'var(--accent)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300"
                style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', color: 'var(--accent)' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openIndex === i && (
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="px-5 pb-5 pl-14 text-sm leading-relaxed md:px-6 md:pb-6 md:pl-[60px] md:text-[15px]"
                style={{ color: 'var(--bone-dim)' }}
              >
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
