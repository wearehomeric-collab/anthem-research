import Script from "next/script"
import { SectionLight as Section } from "@/components/SectionLight"
import { Footer } from "@/components/scrollytelling/Footer"
import { WaitlistForm } from "@/components/WaitlistForm"

// Light-theme A/B candidate for /248-anthems-v2.
// White background + orange/blue/gray/black palette.
// Same copy as the dark page; only tokens and structural simplifications differ.
// If this variant is rejected, delete this file + components/SectionLight.tsx.

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#374151]">
      {/* 01 — HERO */}
      <Section variant="hero" fullHeight className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
          <div className="font-mono text-[0.65rem] sm:text-xs md:text-sm text-[#6B7280] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-8">
            24/8 Anthems · Neuro-Golf Performance Audio
          </div>

          <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#0B0B0F] mb-8 max-w-5xl text-balance break-words">
            Play Your Course.
            <br />
            <span className="text-[#1D4ED8]">Own Your Tempo.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#374151] max-w-2xl mb-12 leading-relaxed">
            Custom anthems. Your clubs. Your strategy. Locked to the tempo pros swing at.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-3 bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm md:text-base transition-colors duration-200"
            >
              Commission Your Anthem
              <span className="font-mono">→</span>
            </a>
            <a
              href="#listen"
              className="inline-flex items-center gap-3 border border-[#0B0B0F] hover:bg-[#0B0B0F] hover:text-white text-[#0B0B0F] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm md:text-base transition-colors duration-200"
            >
              <span className="font-mono">▶</span>
              Listen to Augusta
            </a>
          </div>
        </div>
      </Section>

      {/* 02 — LISTEN */}
      <Section id="listen" variant="subtle">
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-xs text-[#1D4ED8] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Listen · First Release
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0B0B0F] mb-6 text-balance leading-[1.05]">
            Augusta, Engineered.
          </h2>
          <p className="text-lg md:text-xl text-[#374151] leading-relaxed">
            One course. One anthem. Real research. Real yardages. Locked at 112 BPM.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-4 md:p-6 overflow-x-auto">
          <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
          <div
            className="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970"
            data-elfsight-app-lazy
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] font-mono uppercase tracking-wider">
            Press play to hear the Augusta anthem
          </p>
          <a
            href="#waitlist"
            className="text-[#1D4ED8] hover:text-[#0B0B0F] font-mono text-sm uppercase tracking-wider transition-colors"
          >
            Want one for your course? →
          </a>
        </div>
      </Section>

      {/* 03 — SOCIAL PROOF STRIP */}
      <Section variant="default" className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-[#1D4ED8] mb-2">
              1,200+
            </div>
            <div className="text-xs md:text-sm text-[#6B7280] uppercase tracking-wider">
              Anthems Built
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-[#EA580C] mb-2">
              43
            </div>
            <div className="text-xs md:text-sm text-[#6B7280] uppercase tracking-wider">
              Courses Mapped
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-[#1D4ED8] mb-2">
              4
            </div>
            <div className="text-xs md:text-sm text-[#6B7280] uppercase tracking-wider">
              Strategy Modes
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-[#0B0B0F] mb-2">
              112
            </div>
            <div className="text-xs md:text-sm text-[#6B7280] uppercase tracking-wider">
              BPM Locked
            </div>
          </div>
        </div>
        <p className="mt-10 text-center font-mono text-[0.65rem] sm:text-xs text-[#6B7280] uppercase tracking-[0.2em] sm:tracking-[0.3em] break-words">
          Built for courses like Augusta · Pebble Beach · St Andrews · Bethpage Black
        </p>
      </Section>

      {/* 04 — PRODUCT */}
      <Section id="product" variant="subtle">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#EA580C] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Product
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0B0B0F] mb-6 text-balance leading-[1.05]">
            One Course.
            <br />
            One Player.
            <br />
            <span className="text-[#1D4ED8]">One Anthem.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#374151] leading-relaxed">
            Not a playlist. Not workout music. A custom song — written, scored, and produced
            for the round you&apos;re about to play.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-mono text-xs text-[#1D4ED8] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4">
              Sample Verse · Augusta National
            </h3>
            <div className="bg-[#F1F5F9] border-l-4 border-[#EA580C] p-6 sm:p-8 md:p-10">
              <p className="text-xl sm:text-2xl md:text-3xl text-[#0B0B0F] font-semibold leading-[1.4] mb-6">
                &ldquo;Seven-iron to the back pin.
                <br />
                One sixty-five to carry the bunker.
                <br />
                You&apos;ve been here before.
                <br />
                <span className="text-[#1D4ED8]">You already made this shot.</span>&rdquo;
              </p>
              <div className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">
                Generated from real club yardages · Strategy: Smart · Tempo: 112 BPM
              </div>
            </div>
            <p className="mt-4 text-sm text-[#6B7280] italic">
              Every line pulled from your bag, your tees, your course research.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white border-l-4 border-[#1D4ED8] p-6 shadow-sm">
              <div className="font-mono text-xs text-[#1D4ED8] uppercase tracking-wider mb-2">
                Personalized
              </div>
              <h4 className="text-xl font-bold text-[#0B0B0F] mb-2">Your bag. Your lyrics.</h4>
              <p className="text-[#6B7280] leading-relaxed">
                Your club yardages decide which hazards matter on every hole. The lyrics call
                out shots your bag can actually reach.
              </p>
            </div>
            <div className="bg-white border-l-4 border-[#EA580C] p-6 shadow-sm">
              <div className="font-mono text-xs text-[#EA580C] uppercase tracking-wider mb-2">
                Course-Specific
              </div>
              <h4 className="text-xl font-bold text-[#0B0B0F] mb-2">Researched. Not generic.</h4>
              <p className="text-[#6B7280] leading-relaxed">
                Deep AI research into the layout, signature holes, and history of your course.
                Nothing stock. Nothing recycled.
              </p>
            </div>
            <div className="bg-white border-l-4 border-[#0B0B0F] p-6 shadow-sm">
              <div className="font-mono text-xs text-[#0B0B0F] uppercase tracking-wider mb-2">
                Strategy-Tuned
              </div>
              <h4 className="text-xl font-bold text-[#0B0B0F] mb-2">Pick your mode. We match it.</h4>
              <p className="text-[#6B7280] leading-relaxed">
                Smart. Aggressive. Conservative. Risk-Reward. The anthem leans into how you
                actually want to play.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 — HOW IT WORKS */}
      <Section variant="default">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#EA580C] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0B0F] mb-6 text-balance leading-[1.05]">
            Four Steps. Zero Guesswork.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-[#E5E7EB] border border-[#E5E7EB]">
          <div className="bg-white p-8">
            <div className="font-mono text-sm text-[#1D4ED8] uppercase tracking-wider mb-4">
              01 · Setup
            </div>
            <h3 className="text-xl font-bold text-[#0B0B0F] mb-3">Tell us your round.</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Course, tees, club yardages, strategy mode. Takes two minutes.
            </p>
          </div>
          <div className="bg-white p-8">
            <div className="font-mono text-sm text-[#EA580C] uppercase tracking-wider mb-4">
              02 · Research
            </div>
            <h3 className="text-xl font-bold text-[#0B0B0F] mb-3">We scout the course.</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              AI research on every hole. Hazards, winds, signature shots, history.
            </p>
          </div>
          <div className="bg-white p-8">
            <div className="font-mono text-sm text-[#1D4ED8] uppercase tracking-wider mb-4">
              03 · Lyrics
            </div>
            <h3 className="text-xl font-bold text-[#0B0B0F] mb-3">We write your story.</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Lyrics pulled from your actual bag. Your shots. Your decisions.
            </p>
          </div>
          <div className="bg-white p-8">
            <div className="font-mono text-sm text-[#0B0B0F] uppercase tracking-wider mb-4">
              04 · Anthem
            </div>
            <h3 className="text-xl font-bold text-[#0B0B0F] mb-3">Locked at 112 BPM.</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Generated, QC&apos;d, delivered. Press play before you tee off.
            </p>
          </div>
        </div>
      </Section>

      {/* 06 — SCIENCE (CONDENSED, single column, no viz) */}
      <Section id="science" variant="subtle">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#EA580C] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Science of Swagger
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0B0B0F] mb-8 text-balance leading-[1.0]">
            Your Brain
            <br />
            Doesn&apos;t Negotiate.
          </h2>
          <p className="text-lg md:text-xl text-[#374151] leading-relaxed">
            Elite golfers swing at a 3:1 tempo ratio. Amateurs don&apos;t. We fix that with 112
            BPM of engineered rhythm — and lyrics your cerebellum recognizes faster than your
            brain can overthink.
          </p>
        </div>

        <div className="max-w-3xl space-y-8 mb-12">
          <div className="flex gap-6">
            <div className="font-mono text-5xl font-bold text-[#1D4ED8] leading-none shrink-0 w-20">
              3:1
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B0B0F] mb-2">Tempo Ratio</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Every tour pro swings with a 3:1 backswing-to-downswing ratio. It&apos;s
                biomechanical fact, not motivation. We bake it into every anthem.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="font-mono text-5xl font-bold text-[#EA580C] leading-none shrink-0 w-20">
              112
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B0B0F] mb-2">BPM Lock</h3>
              <p className="text-[#6B7280] leading-relaxed">
                112 beats per minute is the sweet spot for brainwave entrainment during
                rhythmic motor control. Your neurons sync to the beat.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="font-mono text-5xl font-bold text-[#0B0B0F] leading-none shrink-0 w-20">
              40
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B0B0F] mb-2">Hz Gamma</h3>
              <p className="text-[#6B7280] leading-relaxed">
                40 Hz gamma oscillations are the focus frequency. Predictable rhythm triggers
                dopamine. Dopamine triggers flow. Flow triggers the swing you already own.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#EA580C] p-6 md:p-8">
          <p className="text-lg md:text-xl text-[#0B0B0F] font-medium leading-relaxed">
            <span className="text-[#EA580C] font-mono uppercase tracking-wider text-sm block mb-2">
              The Whole Story
            </span>
            The 24/8 system sits on a spectrum — part rigorous neuroscience, part brilliant
            engineering theater. Both produce measurable results.{" "}
            <a
              href="/"
              className="text-[#1D4ED8] hover:text-[#0B0B0F] underline underline-offset-4 transition-colors"
            >
              Read the full research →
            </a>
          </p>
        </div>
      </Section>

      {/* 07 — WAITLIST */}
      <Section id="waitlist" variant="panel">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#EA580C] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4 text-center">
            Limited Slots · Masters Season
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0B0B0F] mb-6 text-balance text-center leading-[1.05]">
            Get On The List.
          </h2>
          <p className="text-lg md:text-xl text-[#374151] leading-relaxed mb-10 text-center max-w-2xl mx-auto">
            Custom anthems are built one round at a time. Drop your details and we&apos;ll
            open a slot for you next.
          </p>

          <WaitlistForm theme="light" className="max-w-xl mx-auto" />

          <p className="mt-6 text-center font-mono text-xs text-[#6B7280] uppercase tracking-wider">
            No spam. We text when your anthem is ready.
          </p>
        </div>
      </Section>

      {/* 08 — USE CASES */}
      <Section variant="default">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#1D4ED8] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Moments
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0B0F] mb-6 text-balance leading-[1.05]">
            Press Play When It Matters.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E5E7EB] p-6 hover:border-[#1D4ED8] transition-colors">
            <div className="font-mono text-xs text-[#1D4ED8] uppercase tracking-wider mb-3">
              Pre-Round
            </div>
            <h3 className="text-lg font-bold text-[#0B0B0F] mb-2">On the Range</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Warm up your tempo with the exact ratio your swing needs.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] p-6 hover:border-[#EA580C] transition-colors">
            <div className="font-mono text-xs text-[#EA580C] uppercase tracking-wider mb-3">
              Approach
            </div>
            <h3 className="text-lg font-bold text-[#0B0B0F] mb-2">Driving to the Course</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Your anthem hits before you park. Your brain is already on the first tee.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] p-6 hover:border-[#1D4ED8] transition-colors">
            <div className="font-mono text-xs text-[#1D4ED8] uppercase tracking-wider mb-3">
              In The Round
            </div>
            <h3 className="text-lg font-bold text-[#0B0B0F] mb-2">In Your Head on 18</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              The chorus lives rent-free until impact. That&apos;s by design.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] p-6 hover:border-[#0B0B0F] transition-colors">
            <div className="font-mono text-xs text-[#0B0B0F] uppercase tracking-wider mb-3">
              After
            </div>
            <h3 className="text-lg font-bold text-[#0B0B0F] mb-2">Driving Home Happy</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Replay the round. Replay the song. They&apos;re the same thing now.
            </p>
          </div>
        </div>
      </Section>

      {/* 09 — FINAL CTA */}
      <Section variant="panel" className="text-center">
        <div className="max-w-4xl mx-auto py-8 md:py-16">
          <div className="font-mono text-xs text-[#EA580C] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-6">
            Your Round · Your Tempo · Your Anthem
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#0B0B0F] mb-8 text-balance leading-[1.0] break-words">
            Ready When
            <br />
            You Tee Off.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#374151] leading-relaxed mb-12 max-w-2xl mx-auto">
            Engineered for your round. Written for your bag. Locked to your tempo.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-8 sm:px-12 py-5 sm:py-6 text-sm sm:text-base md:text-lg transition-colors duration-200"
          >
            Get My Anthem
            <span className="font-mono">→</span>
          </a>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
