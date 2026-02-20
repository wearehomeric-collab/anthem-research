"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id?: string
  children: ReactNode
  className?: string
  background?: "black" | "charcoal" | "gradient"
}

export function SectionWrapper({
  id,
  children,
  className,
  background = "black",
}: SectionWrapperProps) {
  const bgClasses = {
    black: "bg-black",
    charcoal: "bg-charcoal",
    gradient: "bg-gradient-to-b from-black to-charcoal",
  }

  return (
    <section
      id={id}
      className={cn(
        "relative w-full section-padding",
        bgClasses[background],
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
