'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const revealAll = () => {
      const els = document.querySelectorAll('.scroll-reveal')
      if (els.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('revealed')
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.01 } // Lower threshold for instant reveal
      )

      els.forEach((el) => {
        // If already in viewport, immediately reveal
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('revealed')
        } else {
          observer.observe(el)
        }
      })
    }

    revealAll()
    const timer = setTimeout(revealAll, 150)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
