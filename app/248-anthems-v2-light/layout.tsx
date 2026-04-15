import React from "react"
import { v2Display } from "@/lib/fonts-v2"

// Nested layout scoped to /248-anthems-v2-light only. Same Figtree font +
// same h1/h2 weight override as the dark V2 layout so the color-scheme A/B
// stays typographically fair.
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${v2Display.className} [&_h1]:font-black [&_h2]:font-black [&_h1]:tracking-[-0.02em] [&_h2]:tracking-[-0.015em]`}
    >
      {children}
    </div>
  )
}
