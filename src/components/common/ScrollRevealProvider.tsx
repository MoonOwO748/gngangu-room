'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const handleReveal = () => {
      const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)')
      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05 }
      )

      elements.forEach((el) => observer.observe(el))
    }

    // Run immediately and after a short delay for smooth mounting
    handleReveal()
    const timer = setTimeout(handleReveal, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
