'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const variantStyles: Record<string, string> = {
  royal: 'bg-gradient-to-b from-[#0A1628] via-[#1E3A8A]/30 to-[#05080F]',
  dark: 'bg-[#0A0E1A]',
  default: 'bg-[#05080F]',
  gradient: 'bg-gradient-to-br from-[#05080F] via-[#0C1A3A] to-[#05080F]',
}

interface SectionProps {
  id?: string
  variant?: keyof typeof variantStyles
  fullHeight?: boolean
  className?: string
  children: React.ReactNode
}

export function Section({ id, variant = 'default', fullHeight, className, children }: SectionProps) {
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
        'px-6 md:px-12 lg:px-20 py-16 md:py-24 border-b border-[#1E3A5F]/30',
        'transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
