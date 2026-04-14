'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Light-theme sibling of components/scrollytelling/Section.tsx. Exists so the
// /248-anthems-v2-light A/B route has its own section wrapper without touching
// the shared Section component used by V1 and the dark V2 page.
//
// If the light theme wins the A/B, this can be consolidated back into
// Section.tsx as additional variants. If it loses, delete this file and the
// /248-anthems-v2-light route — no other file imports SectionLight.

const variantStyles: Record<string, string> = {
  default: 'bg-white',
  subtle: 'bg-[#F8FAFC]',
  panel: 'bg-[#F1F5F9]',
  hero: 'bg-white',
}

interface SectionLightProps {
  id?: string
  variant?: keyof typeof variantStyles
  fullHeight?: boolean
  className?: string
  children: React.ReactNode
}

export function SectionLight({
  id,
  variant = 'default',
  fullHeight,
  className,
  children,
}: SectionLightProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        variantStyles[variant] || variantStyles.default,
        fullHeight && 'min-h-screen',
        'px-6 md:px-12 lg:px-20 py-16 md:py-24 border-b border-[#E5E7EB]',
        'transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
