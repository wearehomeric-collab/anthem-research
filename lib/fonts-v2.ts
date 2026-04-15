import { Onest } from "next/font/google"

// Font for the /248-anthems-v2 + /248-anthems-v2-light marketing pages.
// Scoped via nested route layouts so V1 at `/` stays on Space Grotesk.
//
// Onest: smooth humanist sans with rounded terminals. Reads bolder at 800/900
// than Figtree or Space Grotesk at the same weight, with more premium/editorial
// warmth. Free via Google Fonts. Swap by changing this one import.
export const v2Display = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-v2-display",
})
