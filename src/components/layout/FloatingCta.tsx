'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'

interface FloatingCtaProps {
  lang: string
}

const labels: Record<string, { calc: string; call: string }> = {
  ko: { calc: '요금 계산기', call: '전화 문의' },
  en: { calc: 'Price Calc', call: 'Call Now' },
  ja: { calc: '見積計算', call: '電話問合せ' },
  zh: { calc: '估算计算器', call: '电话咨询' },
}

export function FloatingCta({ lang }: FloatingCtaProps) {
  const t = labels[lang] ?? labels.ko

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6 sm:gap-3">
      {/* 1. Price Calculator Floating Button */}
      <Link
        href={`/${lang}/pricing#calculator`}
        aria-label={t.calc}
        className="group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-bold shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 sm:px-4.5 sm:py-3 sm:text-sm"
        style={{
          borderColor: 'rgba(212, 149, 106, 0.35)',
          background: 'rgba(18, 18, 26, 0.88)',
          color: 'var(--bone)',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 149, 106, 0.15)',
        }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:rotate-12"
          style={{ background: 'rgba(212, 149, 106, 0.18)', color: 'var(--accent)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
          </svg>
        </div>
        <span className="tracking-tight">{t.calc}</span>
      </Link>

      {/* 2. Direct Call Floating CTA Button */}
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        aria-label={`${t.call} (${siteConfig.phone})`}
        className="group relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-extrabold shadow-2xl transition-all duration-300 hover:scale-105 sm:px-5 sm:py-3 sm:text-sm"
        style={{
          background: 'linear-gradient(135deg, #d4956a 0%, #e8b088 50%, #9b7aad 100%)',
          color: '#0a0a0e',
          boxShadow: '0 10px 25px -5px rgba(212, 149, 106, 0.5), 0 0 20px rgba(212, 149, 106, 0.3)',
        }}
      >
        {/* Pulsing Outer Glow Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-accent/40 opacity-70 blur transition-opacity group-hover:opacity-100 animate-pulse" />

        <div className="relative flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-black transition-transform group-hover:scale-110">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="font-bold tracking-tight">{t.call}</span>
          <span className="hidden font-mono text-xs opacity-90 sm:inline">({siteConfig.phone})</span>
        </div>
      </a>
    </aside>
  )
}
