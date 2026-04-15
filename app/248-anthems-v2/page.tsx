import Script from "next/script"
import { Section } from "@/components/scrollytelling/Section"
import { PrincipleBox, MetricDisplay, Callout } from "@/components/scrollytelling/Callout"
import { Footer } from "@/components/scrollytelling/Footer"
import { TempoRatioVisualizer } from "@/components/visualizations/TempoRatioVisualizer"
import { WaitlistForm } from "@/components/WaitlistForm"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* 01 — HERO */}
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
        <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="font-mono text-[0.65rem] sm:text-xs md:text-sm text-[#94A3B8] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-8">
                24/8 Anthems · Neuro-Golf Performance Audio
              </div>

              <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 text-balance break-words">
                Tee Off Like
                <br />
                <span className="text-[#3B82F6]">You Already Won.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] mb-12 leading-relaxed">
                Your course. Your bag. Locked to 112 BPM.
              </p>

              <div className="flex">
                <a
                  href="#listen"
                  className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm md:text-base transition-colors duration-200"
                >
                  <span className="font-mono">▶</span>
                  Listen Now
                </a>
              </div>
            </div>

            <div>
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
                  Generated from real club yardages · Strategy: Smart · Tempo: 112 BPM
                </div>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8] italic">
                Every line pulled from your bag, your tees, your course research.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 02 — LISTEN */}
      <Section id="listen" variant="dark">
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Listen · First Release
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-[1.05]">
            Augusta, Engineered.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            One course. One anthem. Real research. Real yardages. Locked at 112 BPM.
          </p>
        </div>

        <div className="bg-[#0C1220] border border-[#1E3A5F] p-4 md:p-6 overflow-x-auto">
          <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
          <div
            className="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970"
            data-elfsight-app-lazy
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#94A3B8] font-mono uppercase tracking-wider">
            Press play to hear the Augusta anthem
          </p>
          <a
            href="#waitlist"
            className="text-[#3B82F6] hover:text-white font-mono text-sm uppercase tracking-wider transition-colors"
          >
            Want one for your course? →
          </a>
        </div>
      </Section>

      {/* 03 — TAGLINE BREATH */}
      <Section variant="default" className="py-20 md:py-28">
        <p className="text-center font-mono text-xs sm:text-sm md:text-base text-[#94A3B8] uppercase tracking-[0.25em] sm:tracking-[0.35em] max-w-3xl mx-auto leading-relaxed">
          For serious players.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          Commissioned one round at a time.
        </p>
      </Section>

      {/* 04 — PRODUCT · YOUR COURSE. YOUR STRATEGY. YOUR ANTHEM. */}
      <Section id="product" variant="dark">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Product
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-[1.05]">
            One Course.
            <br />
            One Player.
            <br />
            <span className="text-[#3B82F6]">One Anthem.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            Not a playlist. Not workout music. A custom song — written, scored, and produced
            for the round you&apos;re about to play.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0C1220] border-l-4 border-[#3B82F6] p-6">
            <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-2">
              Personalized
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Your bag. Your lyrics.</h4>
            <p className="text-[#94A3B8] leading-relaxed">
              Your club yardages decide which hazards matter on every hole. The lyrics call
              out shots your bag can actually reach.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#F59E0B] p-6">
            <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider mb-2">
              Course-Specific
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Researched. Not generic.</h4>
            <p className="text-[#94A3B8] leading-relaxed">
              Deep AI research into the layout, signature holes, and history of your course.
              Nothing stock. Nothing recycled.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#00F0FF] p-6">
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-2">
              Strategy-Tuned
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Pick your mode. We match it.</h4>
            <p className="text-[#94A3B8] leading-relaxed">
              Smart. Aggressive. Conservative. Risk-Reward. The anthem leans into how you
              actually want to play.
            </p>
          </div>
        </div>
      </Section>

      {/* 05 — HOW IT WORKS */}
      <Section variant="default">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-balance leading-[1.05]">
            Four Steps. Zero Guesswork.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-[#1E3A5F]">
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-4">
              01 · Setup
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tell us your round.</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Course, tees, club yardages, strategy mode. Takes two minutes.
            </p>
          </div>
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#F59E0B] uppercase tracking-wider mb-4">
              02 · Research
            </div>
            <h3 className="text-xl font-bold text-white mb-3">We scout the course.</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              AI research on every hole. Hazards, winds, signature shots, history.
            </p>
          </div>
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#00F0FF] uppercase tracking-wider mb-4">
              03 · Lyrics
            </div>
            <h3 className="text-xl font-bold text-white mb-3">We write your story.</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Lyrics pulled from your actual bag. Your shots. Your decisions.
            </p>
          </div>
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#10B981] uppercase tracking-wider mb-4">
              04 · Anthem
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Locked at 112 BPM.</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Generated, QC&apos;d, delivered. Press play before you tee off.
            </p>
          </div>
        </div>
      </Section>

      {/* 06 — SCIENCE (CONDENSED) */}
      <Section id="science" variant="dark">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Science of Swagger
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8 text-balance leading-[1.0]">
            Your Brain
            <br />
            Doesn&apos;t Negotiate.
          </h2>
          <p className="text-xl text-[#E2E8F0] leading-relaxed">
            Elite golfers swing at a 3:1 tempo ratio. Amateurs don&apos;t. We fix that with 112
            BPM of engineered rhythm — and lyrics your cerebellum recognizes faster than your
            brain can overthink.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-bold text-[#3B82F6] leading-none shrink-0 w-20">
                3:1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Tempo Ratio</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  Every tour pro swings with a 3:1 backswing-to-downswing ratio. It&apos;s
                  biomechanical fact, not motivation. We bake it into every anthem.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-bold text-[#F59E0B] leading-none shrink-0 w-20">
                112
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">BPM Lock</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  112 beats per minute is the sweet spot for brainwave entrainment during
                  rhythmic motor control. Your neurons sync to the beat.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-bold text-[#00F0FF] leading-none shrink-0 w-20">
                40
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Hz Gamma</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  40 Hz gamma oscillations are the focus frequency. Predictable rhythm triggers
                  dopamine. Dopamine triggers flow. Flow triggers the swing you already own.
                </p>
              </div>
            </div>
          </div>

          <div>
            <TempoRatioVisualizer />
          </div>
        </div>

        <Callout variant="insight" className="mt-8">
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
            <span className="text-[#00F0FF] font-mono uppercase tracking-wider text-sm block mb-2">
              The Whole Story
            </span>
            The 24/8 system sits on a spectrum — part rigorous neuroscience, part brilliant
            engineering theater. Both produce measurable results.{" "}
            <a
              href="/"
              className="text-[#3B82F6] hover:text-white underline underline-offset-4 transition-colors"
            >
              Read the full research →
            </a>
          </p>
        </Callout>
      </Section>

      {/* 07 — WAITLIST */}
      <Section id="waitlist" variant="gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 text-balance text-center leading-[1.05]">
            Get On The List.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            Custom anthems are built one round at a time. Drop your details and
            we&apos;ll open a slot for you next.
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-block border border-[#1E3A5F] bg-[#0C1220]/40 px-4 sm:px-5 py-2 sm:py-3">
              <p className="font-mono text-[0.65rem] sm:text-xs text-[#94A3B8] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center">
                By invitation · Limited to 8 rounds per month
              </p>
            </div>
          </div>

          <WaitlistForm className="max-w-xl mx-auto" />

          <p className="mt-6 text-center font-mono text-xs text-[#64748B] uppercase tracking-wider">
            No spam. We text when your anthem is ready.
          </p>
        </div>
      </Section>

      {/* 08 — USE CASES */}
      <Section variant="default">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Moments
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-balance leading-[1.05]">
            Press Play When It Matters.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 hover:border-[#3B82F6] transition-colors">
            <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-3">
              Pre-Round
            </div>
            <h3 className="text-lg font-bold text-white mb-2">On the Range</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Warm up your tempo with the exact ratio your swing needs.
            </p>
          </div>
          <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 hover:border-[#F59E0B] transition-colors">
            <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider mb-3">
              Approach
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Driving to the Course</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Your anthem hits before you park. Your brain is already on the first tee.
            </p>
          </div>
          <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 hover:border-[#00F0FF] transition-colors">
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-3">
              In The Round
            </div>
            <h3 className="text-lg font-bold text-white mb-2">In Your Head on 18</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              The chorus lives rent-free until impact. That&apos;s by design.
            </p>
          </div>
          <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 hover:border-[#10B981] transition-colors">
            <div className="font-mono text-xs text-[#10B981] uppercase tracking-wider mb-3">
              After
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Driving Home Happy</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Replay the round. Replay the song. They&apos;re the same thing now.
            </p>
          </div>
        </div>
      </Section>

      {/* 09 — FINAL CTA */}
      <Section variant="gradient" className="text-center">
        <div className="max-w-4xl mx-auto py-8 md:py-16">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-6">
            Your Round · Your Tempo · Your Anthem
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 text-balance leading-[1.0] break-words">
            Ready When
            <br />
            You Tee Off.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] leading-relaxed mb-12 max-w-2xl mx-auto">
            Engineered for your round. Written for your bag. Locked to your tempo.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-8 sm:px-12 py-5 sm:py-6 text-sm sm:text-base md:text-lg transition-colors duration-200"
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
