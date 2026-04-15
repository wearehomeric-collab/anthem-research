import { Section } from "@/components/scrollytelling/Section"
import { BpmPulseBar } from "@/components/BpmPulseBar"

// Hero Lab — an experimental route for comparing hero section variants
// side-by-side. Not linked from anywhere; visit /248-anthems-v2/hero-lab
// directly to scroll through and pick.
//
// Variant A is the current live hero on /248-anthems-v2.
// Variants B and C are new copy + layout ideas to test.
//
// No shared hero component — each variant is inlined here so copy and
// structure are all visible at a glance, and edits are one-file.

export default function HeroLabPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-24 bg-[#05080F]">
      <BpmPulseBar theme="dark" />

      {/* LAB INTRO */}
      <div className="border-b border-[#1E3A5F] px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[0.65rem] sm:text-xs text-[#F59E0B] uppercase tracking-[0.3em] mb-4">
            Experimental · Not Linked From Anywhere
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 text-balance leading-[1.05] font-black">
            Hero Lab.
          </h1>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed max-w-2xl">
            Three hero variants stacked vertically for comparison. Scroll down
            to see each one, then tell me which to ship.
          </p>
        </div>
      </div>

      {/* =========================== */}
      {/* VARIANT A — current live hero */}
      {/* =========================== */}
      <VariantLabel
        letter="A"
        status="Current · Live"
        h1="Performance. Engineered For Your Swing."
        notes="The one you're running right now. Statement + accent. Sample lyric card below."
      />
      <Section variant="royal" fullHeight className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)] py-16 md:py-20">
          <div className="max-w-5xl mb-14 md:mb-16">
            <div className="font-mono text-[0.65rem] sm:text-xs md:text-sm text-[#94A3B8] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-8">
              24/8 Anthems · 3:1 Performance Audio
            </div>

            <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 text-balance">
              Performance.
              <br />
              <span className="text-[#3B82F6]">Engineered For Your Swing.</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] max-w-3xl mb-12 leading-relaxed">
              3:1 tempo-locked audio to stabilize your swing and keep you
              composed when it matters most.
            </p>

            <div className="flex">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm md:text-base transition-colors duration-200"
              >
                <span className="font-mono">▶</span>
                Hear The Edge
              </a>
            </div>
          </div>

          <div className="max-w-3xl">
            <h3 className="font-mono text-xs text-[#3B82F6] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4">
              Sample Verse · Augusta National
            </h3>
            <div className="bg-gradient-to-br from-[#0C1220] to-[#05080F] border border-[#1E3A5F] p-6 sm:p-8 md:p-10">
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-[1.4] mb-6">
                &ldquo;Seven-iron to the back pin.
                <br />
                One sixty-five to carry the bunker.
                <br />
                You&apos;ve been here before.
                <br />
                <span className="text-[#3B82F6]">You already made this shot.</span>&rdquo;
              </p>
              <div className="font-mono text-xs text-[#64748B] uppercase tracking-wider">
                3:1 tempo model · 112 BPM · Built for Augusta
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================== */}
      {/* VARIANT B — Command-style    */}
      {/* =========================== */}
      <VariantLabel
        letter="B"
        status="New · Command-Style"
        h1="Don't just play your course. Own it."
        notes="Shorter, emotional, commanding. Nike-voice. Hero centered, no lyric card — pressure on a giant 3:1 numeric."
      />
      <Section variant="royal" fullHeight className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-start min-h-[calc(100vh-8rem)] py-16 md:py-20">
          <div className="max-w-5xl">
            <div className="font-mono text-[0.65rem] sm:text-xs md:text-sm text-[#F59E0B] uppercase tracking-[0.3em] sm:tracking-[0.45em] mb-10">
              Performance Audio · Built On 3:1
            </div>

            <h1 className="text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-10 text-balance">
              Don&apos;t just play
              <br />
              your course.
              <br />
              <span className="text-[#F59E0B] italic font-black">Own it.</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] max-w-2xl mb-12 leading-relaxed">
              A tempo-locked anthem for every round. Built on the 3:1 ratio
              every tour pro swings.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white hover:bg-[#F8FAFC] text-[#05080F] font-black uppercase tracking-[0.15em] px-8 py-5 text-sm md:text-base transition-colors duration-200"
              >
                <span className="font-mono">▶</span>
                Listen Now
              </a>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl sm:text-6xl font-black text-[#3B82F6] leading-none">
                  3
                </span>
                <span className="font-mono text-3xl sm:text-4xl text-[#64748B] leading-none">
                  :
                </span>
                <span className="font-mono text-5xl sm:text-6xl font-black text-[#F59E0B] leading-none">
                  1
                </span>
                <span className="font-mono text-[0.65rem] text-[#94A3B8] uppercase tracking-[0.2em] ml-3 self-center">
                  The ratio
                  <br />
                  that wins.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================== */}
      {/* VARIANT C — Paired declarative */}
      {/* =========================== */}
      <VariantLabel
        letter="C"
        status="New · Pure Brand Voice"
        h1="Tempo travels. Pressure breaks."
        notes="Two-statement brand voice, minimal. Split-screen: massive type left, single silhouette play button right. Product is the ritual."
      />
      <Section variant="royal" fullHeight className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05080F] via-[#0A1628] to-[#05080F] pointer-events-none" />
        <div className="relative z-10 min-h-[calc(100vh-8rem)] py-16 md:py-20 flex items-center">
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center w-full">
            {/* Left — massive type */}
            <div>
              <div className="font-mono text-[0.65rem] sm:text-xs md:text-sm text-[#94A3B8] uppercase tracking-[0.3em] mb-10">
                A Pre-Round Ritual · Engineered
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-10 text-balance">
                Tempo
                <br />
                travels.
                <br />
                <span className="text-[#F59E0B] italic">Pressure</span>
                <br />
                <span className="text-[#F59E0B] italic">breaks.</span>
              </h1>

              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mb-10">
                <div>
                  <div className="font-mono text-[0.65rem] text-[#3B82F6] uppercase tracking-[0.25em] mb-2">
                    What it is
                  </div>
                  <p className="text-sm md:text-base text-[#E2E8F0] leading-snug">
                    A 3:1 tempo-locked anthem built from your course, your bag,
                    your strategy.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[0.65rem] text-[#F59E0B] uppercase tracking-[0.25em] mb-2">
                    What it does
                  </div>
                  <p className="text-sm md:text-base text-[#E2E8F0] leading-snug">
                    Smoother tempo. Better decisions. More committed swings.
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.15em] px-8 py-5 text-sm md:text-base transition-colors duration-200"
              >
                <span className="font-mono">▶</span>
                Press Play
              </a>
            </div>

            {/* Right — giant circular play target */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#3B82F6]/20 blur-3xl scale-110" />
                <a
                  href="#"
                  className="group relative flex h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E3A8A] border-2 border-[#3B82F6] shadow-[0_0_60px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-transform"
                  aria-label="Play the Augusta anthem"
                >
                  <span className="font-mono text-7xl sm:text-8xl md:text-9xl text-white translate-x-2">
                    ▶
                  </span>
                  <div className="absolute -bottom-10 left-0 right-0 text-center">
                    <div className="font-mono text-[0.65rem] sm:text-xs text-[#94A3B8] uppercase tracking-[0.3em]">
                      The Augusta Anthem · 112 BPM
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CLOSER */}
      <div className="border-t border-[#1E3A5F] px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono text-[0.65rem] text-[#F59E0B] uppercase tracking-[0.3em] mb-4">
            That&apos;s all three
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6">
            Which one ships?
          </h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Pick a letter — A, B, or C — and I&apos;ll promote it to the live
            <span className="text-white"> /248-anthems-v2 </span>hero. Or tell me
            what to tweak on any of them.
          </p>
        </div>
      </div>
    </main>
  )
}

// Sticky label block that sits above each variant — so when you're scrolling
// through the lab page you always know which variant you're looking at.
function VariantLabel({
  letter,
  status,
  h1,
  notes,
}: {
  letter: string
  status: string
  h1: string
  notes: string
}) {
  return (
    <div className="sticky top-0 z-30 bg-[#F59E0B] text-[#05080F] px-6 md:px-12 lg:px-20 py-4 border-y-2 border-[#05080F]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#05080F] text-[#F59E0B] font-black text-xl md:text-2xl shrink-0">
            {letter}
          </div>
          <div className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] font-bold">
            Variant {letter} · {status}
          </div>
        </div>
        <div className="flex-1 font-bold text-sm md:text-base leading-tight truncate">
          &ldquo;{h1}&rdquo;
        </div>
        <div className="hidden lg:block text-xs opacity-80 max-w-md leading-snug">
          {notes}
        </div>
      </div>
    </div>
  )
}
