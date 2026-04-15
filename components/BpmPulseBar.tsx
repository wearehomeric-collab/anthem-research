// Thin accent bar pinned to the very top of the viewport, pulsing at exactly
// 112 BPM (60_000 / 112 ≈ 535.71ms per beat). A subliminal tempo signature
// that reinforces the brand claim on every screen of every V2 page without
// adding any visible content.
//
// Server component — pure CSS animation, no state, no effects. The keyframes
// are injected inline so the change is fully scoped to this component.

type Theme = "dark" | "light"

interface BpmPulseBarProps {
  theme?: Theme
}

// 60,000 ms per minute / 112 beats per minute = ~535.71 ms per beat.
// Using a string here so the value is embedded at build time in the style tag.
const PULSE_DURATION_MS = "535.71ms"

export function BpmPulseBar({ theme = "dark" }: BpmPulseBarProps) {
  const colorClass = theme === "light" ? "bg-[#1D4ED8]" : "bg-[#3B82F6]"

  return (
    <>
      <style>{`
        @keyframes bpm-pulse-112 {
          0%   { opacity: 0.35; }
          35%  { opacity: 1; }
          55%  { opacity: 0.6; }
          100% { opacity: 0.35; }
        }
        .bpm-pulse-bar {
          animation: bpm-pulse-112 ${PULSE_DURATION_MS} ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .bpm-pulse-bar { animation: none; opacity: 0.6; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className={`bpm-pulse-bar fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none ${colorClass}`}
      />
    </>
  )
}
