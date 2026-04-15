import React from "react"
import { v2Display } from "@/lib/fonts-v2"

// Nested layout scoped to /248-anthems-v2 only.
// - Swaps the default font to Figtree (rounder + bolder at every weight)
// - Forces h1/h2 to font-black (900) via an arbitrary descendant selector
//   on the wrapper, so the major headlines deliver the "bolder" ask without
//   touching every h1/h2 className across the page. The specificity of
//   `.wrapper h1` (class+type) beats a direct `.font-bold` on h1 (class),
//   so `font-black` wins the cascade.
// V1 at `/` is unaffected — still Space Grotesk.
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
