import { Figtree } from "next/font/google"

// Font for the /248-anthems-v2 + /248-anthems-v2-light marketing pages.
// Scoped via nested route layouts so V1 at `/` stays on Space Grotesk.
//
// Figtree: geometric sans with rounded terminals — bolder-looking than
// Space Grotesk at the same weight, more premium/cinematic feel at 800/900.
// Free via Google Fonts. Swap by changing this one import.
export const v2Display = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-v2-display",
})
