'use client'

import { useState } from 'react'
import type { getDictionary } from '@/app/[lang]/dictionaries'

type Dict = Awaited<ReturnType<typeof getDictionary>>

interface Props { dict: Dict }

export function PricingSection({ dict }: Props) {
  const p = dict.pricing

  // Calculator State
  const [people, setPeople] = useState<number>(2)
  const [isEarly, setIsEarly] = useState<boolean>(true) // 9시 이전 5만원 할인
  const [partnerType, setPartnerType] = useState<'girl' | 'boy' | 'none'>('girl')
  const [hours, setHours] = useState<number>(2)

  // Pricing constants
  const baseLiquorPrice = isEarly ? 100000 : 150000
  const roomFee = 50000

  // Calculate TC Total
  let tcTotal = 0
  if (partnerType === 'girl') {
    // 첫 타임 12만원, 이후 연장 타임당 15만원
    const girlRatePerPerson = 120000 + (hours > 1 ? (hours - 1) * 150000 : 0)
    tcTotal = girlRatePerPerson * Math.max(1, people)
  } else if (partnerType === 'boy') {
    // 선수 TC 7만원/T
    tcTotal = 70000 * hours * Math.max(1, people)
  }

  // Total estimated price
  const estimatedTotal = baseLiquorPrice + tcTotal + roomFee

  return (
    <section className="scroll-reveal px-3 pt-16 sm:px-5 md:pt-28 lg:pt-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="accent-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {p.label}
          </p>
        </div>
        <h2 className="mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-5xl" style={{ color: 'var(--bone)' }}>
          {p.title}
        </h2>
        <p className="mt-4 max-w-[33em] text-sm leading-relaxed md:text-base" style={{ color: 'var(--bone-dim)' }}>
          {p.subtitle}
        </p>
      </header>

      {/* Main Pricing Cards Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Base Liquor */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8" style={{ background: 'rgba(212,149,106,0.06)', borderColor: 'rgba(212,149,106,0.2)' }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{p.base}</span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--bone)' }}>₩{p.base_price}</span>
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--bone-dim)' }}>위스키 + 안주 + 음료 세트</p>
          </div>
          <span className="mt-4 text-xs font-medium" style={{ color: 'var(--accent-bright)' }}>9시 전 방문 시 ₩100,000</span>
        </div>

        {/* Early Discount */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--mauve)' }}>{p.discount}</span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--bone)' }}>-₩50,000</span>
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--bone-dim)' }}>오후 9시 이전 방문 시 적용</p>
          </div>
          <span className="mt-4 text-xs font-medium" style={{ color: 'var(--bone-dim)' }}>기본 주대 ₩50,000 할인</span>
        </div>

        {/* Female TC */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{p.tc_girl}</span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--bone)' }}>₩120,000</span>
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--bone-dim)' }}>연장 ₩150,000 / T</p>
          </div>
          <span className="mt-4 text-xs font-medium" style={{ color: 'var(--accent-bright)' }}>첫타임 ₩120,000 / 연장 ₩150,000</span>
        </div>

        {/* Male Host TC / Room Fee */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-6 md:p-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--mauve)' }}>{p.tc_boy}</span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--bone)' }}>₩70,000 / T</span>
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--bone-dim)' }}>선수 ₩70,000/T · RT 룸비 ₩50,000</p>
          </div>
          <span className="mt-4 text-xs font-medium" style={{ color: 'var(--bone-dim)' }}>정찰제 운영</span>
        </div>
      </div>

      {/* Interactive Live Price Calculator */}
      <div className="glass-card mt-10 rounded-3xl p-6 md:p-10" style={{ borderColor: 'rgba(212,149,106,0.25)', background: 'linear-gradient(145deg, rgba(26,26,34,0.95), rgba(19,19,24,0.95))' }}>
        <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div>
            <h3 className="text-xl font-bold tracking-tight md:text-2xl" style={{ color: 'var(--bone)' }}>
              {p.calculator_title}
            </h3>
            <p className="mt-1 text-xs md:text-sm" style={{ color: 'var(--bone-dim)' }}>
              인원수, 방문 시간대, 파트너 및 이용 시간을 조절하여 예상 비용을 실시간으로 확인해보세요.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ borderColor: 'rgba(212,149,106,0.3)', color: 'var(--accent-bright)', background: 'rgba(212,149,106,0.1)' }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            실시간 연산중
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Form Inputs (Expanded & Balanced Layout) */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-7">
            {/* 1. Visit Time Slot */}
            <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                1. {p.calc_time_slot}
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsEarly(true)}
                  className={`rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${isEarly ? 'border-accent bg-accent/15 text-bone' : 'border-white/10 bg-white/5 text-bone-dim'}`}
                >
                  <p className="font-bold">{p.calc_early}</p>
                  <p className="mt-1 text-[11px] opacity-75">주대 ₩100,000 적용</p>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEarly(false)}
                  className={`rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${!isEarly ? 'border-accent bg-accent/15 text-bone' : 'border-white/10 bg-white/5 text-bone-dim'}`}
                >
                  <p className="font-bold">{p.calc_normal}</p>
                  <p className="mt-1 text-[11px] opacity-75">주대 ₩150,000 적용</p>
                </button>
              </div>
            </div>

            {/* 2. Guest Count & Hours */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-4 sm:p-5 flex flex-col justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  2. {p.calc_people} ({people}명)
                </label>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="h-2 flex-1 accent-amber-600 rounded-lg cursor-pointer bg-white/10"
                  />
                  <span className="w-14 shrink-0 rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-bold">{people}명</span>
                </div>
              </div>

              <div className="rounded-2xl border p-4 sm:p-5 flex flex-col justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  3. {p.calc_hours} ({hours}시간 / {hours}T)
                </label>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="h-2 flex-1 accent-amber-600 rounded-lg cursor-pointer bg-white/10"
                  />
                  <span className="w-14 shrink-0 rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-bold">{hours}T</span>
                </div>
              </div>
            </div>

            {/* 3. Partner Selection */}
            <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                4. {p.calc_partner_type}
              </label>
              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPartnerType('girl')}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${partnerType === 'girl' ? 'border-accent bg-accent/15 text-bone' : 'border-white/10 bg-white/5 text-bone-dim'}`}
                >
                  {p.calc_partner_girl}
                </button>
                <button
                  type="button"
                  onClick={() => setPartnerType('boy')}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${partnerType === 'boy' ? 'border-accent bg-accent/15 text-bone' : 'border-white/10 bg-white/5 text-bone-dim'}`}
                >
                  {p.calc_partner_boy}
                </button>
                <button
                  type="button"
                  onClick={() => setPartnerType('none')}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${partnerType === 'none' ? 'border-accent bg-accent/15 text-bone' : 'border-white/10 bg-white/5 text-bone-dim'}`}
                >
                  {p.calc_partner_none}
                </button>
              </div>
            </div>
          </div>

          {/* Result Output Card (Full height stretch) */}
          <div className="flex flex-col lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border p-6 md:p-8" style={{ borderColor: 'rgba(212,149,106,0.3)', background: 'rgba(212,149,106,0.08)' }}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>ESTIMATED TOTAL</span>
                <h4 className="mt-1 text-sm font-medium" style={{ color: 'var(--bone-dim)' }}>{p.calc_estimated_total}</h4>

                <div className="mt-5 border-t border-b py-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex justify-between text-xs py-1.5" style={{ color: 'var(--bone-dim)' }}>
                    <span>주류 (기본 세트)</span>
                    <span className="font-semibold text-bone">₩150,000</span>
                  </div>
                  {isEarly && (
                    <div className="flex justify-between text-xs py-1.5 font-semibold" style={{ color: 'var(--accent-bright)' }}>
                      <span>얼리버드 할인 (9시 이전)</span>
                      <span>-₩50,000</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs py-1.5" style={{ color: 'var(--bone-dim)' }}>
                    <span>타임비 ({partnerType === 'girl' ? '아가씨 TC' : partnerType === 'boy' ? '선수 TC' : '없음'})</span>
                    <span className="font-semibold text-bone">
                      ₩{tcTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5" style={{ color: 'var(--bone-dim)' }}>
                    <span>룸비 (RT)</span>
                    <span className="font-semibold text-bone">₩{roomFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-xs" style={{ color: 'var(--bone-dim)' }}>합계 금액</span>
                  <p className="text-3xl font-extrabold md:text-4xl" style={{ color: 'var(--accent-bright)' }}>
                    ₩{estimatedTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              <a
                href="tel:+821057043097"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-all hover:scale-[1.02] hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))', color: 'var(--ink)' }}
              >
                이 견적으로 전화 예약 문의 ➔
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-center md:text-left" style={{ color: 'var(--bone-mute)' }}>
          {p.calc_note}
        </p>
      </div>
    </section>
  )
}
