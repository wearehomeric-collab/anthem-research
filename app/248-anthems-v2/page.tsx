import { Section } from "@/components/scrollytelling/Section"
import { Footer } from "@/components/scrollytelling/Footer"
import { NeuralEntrainmentAnimator } from "@/components/scrollytelling/NeuralEntrainmentAnimator"
import { BrainwaveFrequencyChart } from "@/components/visualizations/BrainwaveFrequencyChart"
import { SpatialAudioWaveform } from "@/components/visualizations/SpatialAudioWaveform"
import { BpmPulseBar } from "@/components/BpmPulseBar"
import { HearTheDifference } from "@/components/HearTheDifference"
import { StickyAudioPlayer } from "@/components/StickyAudioPlayer"
import { WaitlistForm } from "@/components/WaitlistForm"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-24">
      <BpmPulseBar theme="dark" />

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
                24/8 Anthems · 3:1 Performance Audio
              </div>

              <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 text-balance break-words">
                Performance.
                <br />
                <span className="text-[#3B82F6]">Engineered For Your Swing.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] mb-12 leading-relaxed">
                3:1 tempo-locked audio to stabilize your swing and keep you composed when it matters most.
              </p>

              <div className="flex">
                <a
                  href="#listen"
                  data-v2-play
                  className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm md:text-base transition-colors duration-200"
                >
                  <span className="font-mono">▶</span>
                  Hear The Edge
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
                  3:1 tempo model · 112 BPM · Built for Augusta
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance leading-[1.05]">
            Hear What Calm Sounds Like.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            One course. One anthem. Built on the 3:1 tempo model. Press play to pull up the
            player from the bottom of the page.
          </p>
        </div>

        <button
          type="button"
          data-v2-play
          className="group w-full text-left bg-gradient-to-br from-[#0C1220] to-[#05080F] border border-[#1E3A5F] hover:border-[#3B82F6] p-8 md:p-12 transition-colors"
        >
          <div className="flex items-center gap-6 md:gap-10">
            <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#3B82F6] group-hover:bg-[#2563EB] flex items-center justify-center transition-colors">
              <span className="font-mono text-3xl md:text-5xl text-white translate-x-0.5 md:translate-x-1">
                ▶
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[0.65rem] sm:text-xs text-[#3B82F6] uppercase tracking-[0.25em] mb-2">
                The Augusta Anthem · 112 BPM · 3:1
              </div>
              <div className="text-xl md:text-3xl font-black text-white leading-tight mb-2">
                Press play. Tee off.
              </div>
              <div className="text-sm md:text-base text-[#94A3B8]">
                Player slides up from the bottom.
              </div>
            </div>
          </div>
        </button>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#94A3B8] font-mono uppercase tracking-wider">
            One course. One anthem. Every round.
          </p>
          <a
            href="#waitlist"
            className="text-[#3B82F6] hover:text-white font-mono text-sm uppercase tracking-wider transition-colors"
          >
            Want one for your course? →
          </a>
        </div>
      </Section>

      {/* 03 — WHAT IS 24/8? */}
      <Section id="system" variant="default">
        <div className="max-w-4xl">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The System
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-10 text-balance leading-[1.0]">
            What is 24/8?
          </h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center mb-12">
            <div className="flex items-baseline gap-2 md:gap-4">
              <span className="font-mono text-7xl sm:text-8xl md:text-9xl font-black text-[#3B82F6] leading-none">24</span>
              <span className="font-mono text-5xl sm:text-6xl md:text-7xl text-[#64748B] leading-none">/</span>
              <span className="font-mono text-7xl sm:text-8xl md:text-9xl font-black text-[#F59E0B] leading-none">8</span>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-white font-semibold mb-4 leading-snug">
                A 3:1 tempo model — twenty-four units back, eight units through.
              </p>
              <p className="text-base md:text-lg text-[#94A3B8] leading-relaxed">
                We build music around the 3:1 ratio so your body feels the timing instead of
                thinking about it. 24/8 is the flagship implementation.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 border-t border-[#1E3A5F] pt-10">
            <div className="font-mono text-sm md:text-base text-[#E2E8F0] uppercase tracking-wider">
              No swing thoughts.
            </div>
            <div className="font-mono text-sm md:text-base text-[#E2E8F0] uppercase tracking-wider">
              No rushing.
            </div>
            <div className="font-mono text-sm md:text-base text-[#E2E8F0] uppercase tracking-wider">
              No panic under pressure.
            </div>
          </div>

          <p className="mt-10 text-lg md:text-xl text-[#3B82F6] font-semibold italic">
            Just rhythm, sequence, and commitment.
          </p>

          <div className="mt-12 border-l-2 border-[#F59E0B] pl-6 max-w-2xl">
            <div className="font-mono text-[0.65rem] sm:text-xs text-[#F59E0B] uppercase tracking-[0.25em] mb-2">
              More 3:1 Timings Coming
            </div>
            <p className="text-[#E2E8F0] leading-relaxed">
              24/8 is our first release. The 3:1 system supports multiple timings — each built
              for a different swing archetype. Same principle, different ratios.
            </p>
          </div>
        </div>
      </Section>

      {/* 04 — TAGLINE BREATH */}
      <Section variant="default" className="py-16 md:py-24">
        <p className="text-center font-mono text-sm sm:text-base md:text-lg text-[#94A3B8] uppercase tracking-[0.3em] sm:tracking-[0.4em]">
          Feel beats thought.
        </p>
      </Section>

      {/* 05 — COURSE ANTHEMS (FLAGSHIP PRODUCT) */}
      <Section id="product" variant="dark">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Flagship Product
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance leading-[1.05]">
            Know the course before
            <br />
            <span className="text-[#3B82F6]">you step on the tee.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            Each Course Anthem is built to match the rhythm, flow, and demands of a specific
            course. You don&apos;t just hear the layout — you feel where to be aggressive, where
            to stay patient, and how to approach every shot. It&apos;s not just strategy.
            It&apos;s timing.
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
              Deep research into the layout, signature holes, and demands of your course.
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

      {/* 06 — HOW IT WORKS (3-STEP CONCEPTUAL) */}
      <Section variant="default">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            Tempo first. Everything else follows.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#1E3A5F]">
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-4">
              01 · Built on Tempo
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Engineered around a 3:1 rhythm.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Every track is built on a 3:1 structure. 24/8 is the flagship timing.
            </p>
          </div>
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#F59E0B] uppercase tracking-wider mb-4">
              02 · Designed for Golf
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Strategy, pacing, awareness.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Each anthem blends course strategy, pacing, emotional control, and situational
              awareness into one track.
            </p>
          </div>
          <div className="bg-[#05080F] p-8">
            <div className="font-mono text-sm text-[#10B981] uppercase tracking-wider mb-4">
              03 · Felt, Not Thought
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Smoother. Smarter. Committed.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Smoother tempo. Better decisions. More committed swings. No mechanics. Just
              rhythm.
            </p>
          </div>
        </div>
      </Section>

      {/* 07 — TESTIMONIALS (horizontal scroll-snap carousel) */}
      <Section id="testimonials" variant="dark">
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Early Signal
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            What players feel immediately.
          </h2>
        </div>

        <div className="-mx-6 md:-mx-12 lg:-mx-20">
          <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-12 lg:scroll-px-20 px-6 md:px-12 lg:px-20 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#3B82F6] p-7">
              <blockquote className="text-white text-lg md:text-xl font-bold leading-snug mb-5">
                &ldquo;Within a few swings I stopped rushing everything. It just slowed me
                down without me thinking about it.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#3B82F6] uppercase tracking-wider">
                On Tempo · Range Session
              </figcaption>
            </figure>

            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#F59E0B] p-7">
              <blockquote className="text-white text-lg md:text-xl font-bold leading-snug mb-5">
                &ldquo;Usually I speed up when it matters. With this, I felt like I had
                something to lock into. Same swing, way more controlled.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#F59E0B] uppercase tracking-wider">
                On Pressure · In Round
              </figcaption>
            </figure>

            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#00F0FF] p-7">
              <blockquote className="text-white text-lg md:text-xl font-bold leading-snug mb-5">
                &ldquo;It&apos;s not just tempo — it&apos;s weirdly how it makes you think.
                I played smarter without overanalyzing.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#00F0FF] uppercase tracking-wider">
                On Decisions · After 9 Holes
              </figcaption>
            </figure>

            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#10B981] p-7">
              <blockquote className="text-white text-lg md:text-xl font-bold leading-snug mb-5">
                &ldquo;This isn&apos;t hype music. It actually feels like it&apos;s doing
                something to your swing.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#10B981] uppercase tracking-wider">
                First Impression
              </figcaption>
            </figure>

            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#F59E0B] p-7">
              <blockquote className="text-white text-lg md:text-xl font-bold leading-snug mb-5">
                &ldquo;We played a match with it and it honestly felt unfair. One side was
                steady… the other wasn&apos;t.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#F59E0B] uppercase tracking-wider">
                On The Edge · Match Play
              </figcaption>
            </figure>

            <figure className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[30%] bg-[#0C1220] border-l-4 border-[#3B82F6] p-7">
              <blockquote className="text-white text-2xl md:text-3xl font-black leading-snug mb-5">
                &ldquo;Smooth showed up.
                <br />
                <span className="text-[#3B82F6]">The chaos didn&apos;t.</span>&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[0.65rem] sm:text-xs text-[#3B82F6] uppercase tracking-wider">
                Post-Round
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="mt-6 font-mono text-[0.65rem] sm:text-xs text-[#64748B] uppercase tracking-[0.2em]">
          Swipe to read more →
        </p>
      </Section>

      {/* 08 — ENGINEERED, NOT GUESSED (AUDIO CREDIBILITY) */}
      <Section id="engineered" variant="default">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Production
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-balance leading-[1.0]">
            Engineered,
            <br />
            <span className="text-[#3B82F6]">not guessed.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            Tracks are produced within a controlled performance range. Every anthem is built
            to translate across any sound system, any swing, any course.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E3A5F] border border-[#1E3A5F]">
          <div className="bg-[#05080F] p-6 md:p-8">
            <div className="font-mono text-3xl md:text-4xl font-black text-[#3B82F6] mb-3">
              3:1
            </div>
            <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
              Tempo Ratio
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Twenty-four back, eight through. The 24/8 flagship timing.
            </p>
          </div>
          <div className="bg-[#05080F] p-6 md:p-8">
            <div className="font-mono text-3xl md:text-4xl font-black text-[#F59E0B] mb-3">
              110–114
            </div>
            <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
              BPM Range
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              The controlled performance range every track lives inside.
            </p>
          </div>
          <div className="bg-[#05080F] p-6 md:p-8">
            <div className="font-mono text-3xl md:text-4xl font-black text-[#00F0FF] mb-3">
              4/4
            </div>
            <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
              Forward Motion
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Backbeat with forward drive. Subtle sidechain for flow and timing.
            </p>
          </div>
          <div className="bg-[#05080F] p-6 md:p-8">
            <div className="font-mono text-3xl md:text-4xl font-black text-[#10B981] mb-3">
              WIDE
            </div>
            <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
              Stereo Field
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Spatial awareness baked into every mix.
            </p>
          </div>
        </div>

        <SpatialAudioWaveform className="mt-12" />
      </Section>

      {/* 08.5 — THE NEURO EDGE (entrainment + science) */}
      <Section id="neuro" variant="dark">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Neuro Edge
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-balance leading-[1.0]">
            Your brain syncs.
            <br />
            <span className="text-[#3B82F6]">You swing free.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed max-w-2xl">
            Rhythm isn&apos;t decoration — it&apos;s a direct input to the motor cortex.
            Predictable tempo triggers neural entrainment, the brain&apos;s natural tendency
            to lock onto external rhythm. When it locks, overthinking loses its grip.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <NeuralEntrainmentAnimator />
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-black text-[#3B82F6] leading-none shrink-0 w-24">
                40
                <span className="text-2xl align-top ml-1">Hz</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Gamma Lock</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  Gamma-band oscillations are the brain&apos;s focus frequency. Consistent
                  rhythmic input nudges cortical activity toward gamma coherence — the
                  signature of elite-level concentration.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-black text-[#F59E0B] leading-none shrink-0 w-24">
                3:1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Motor Timing</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  Your cerebellum recognizes 3:1 phrasing as biologically natural. That&apos;s
                  why pros swing it and amateurs don&apos;t. We hand the ratio to the body
                  directly through audio.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="font-mono text-5xl font-black text-[#10B981] leading-none shrink-0 w-24">
                DA
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Dopamine Drive</h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  Predictable rhythm releases dopamine in the reward pathway. Dopamine
                  triggers flow. Flow triggers the swing you already own — without
                  mechanics, without pressure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <BrainwaveFrequencyChart className="mb-10" />

        <HearTheDifference theme="dark" />

        <div className="border-l-2 border-[#00F0FF] pl-6 max-w-3xl mt-10">
          <p className="text-[#E2E8F0] leading-relaxed">
            <span className="font-mono text-[0.65rem] sm:text-xs text-[#00F0FF] uppercase tracking-[0.25em] block mb-2">
              The Whole Story
            </span>
            This is the part we don&apos;t oversell. The 3:1 system sits on a spectrum —
            part rigorous neuroscience, part brilliant engineering. Both produce measurable
            results.{" "}
            <a
              href="/"
              className="text-[#3B82F6] hover:text-white underline underline-offset-4 transition-colors"
            >
              Read the deep research →
            </a>
          </p>
        </div>
      </Section>

      {/* 09 — PERFORMANCE EDGE */}
      <Section id="edge" variant="dark">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Edge
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-8 text-balance leading-[1.0]">
            This isn&apos;t hype.
            <br />
            <span className="text-[#3B82F6]">It&apos;s control.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed max-w-2xl mb-10">
            Most golfers lose strokes because of rushed tempo, poor decisions, and pressure
            spikes. 24/8 Anthems reduce all three by anchoring your swing and mindset to a
            consistent rhythm.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          <div className="bg-[#0C1220] border-l-4 border-[#3B82F6] p-8">
            <p className="text-2xl md:text-3xl font-black text-white leading-tight">
              Calm is fast.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#F59E0B] p-8">
            <p className="text-2xl md:text-3xl font-black text-white leading-tight">
              Smooth is repeatable.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#00F0FF] p-8">
            <p className="text-2xl md:text-3xl font-black text-white leading-tight">
              Tempo travels.
            </p>
          </div>
        </div>
      </Section>

      {/* 10 — FOUNDER */}
      <Section id="founder" variant="default">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Why This Exists
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-10 text-balance leading-[1.05]">
            Why this exists.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            <p>
              Most golfers don&apos;t struggle because of their swing. They struggle because
              they can&apos;t repeat it under pressure.
            </p>
            <p className="font-mono text-base md:text-lg text-[#94A3B8] uppercase tracking-wider">
              Tempo breaks. Decisions rush. Confidence disappears.
            </p>
            <p>
              24/8 Anthems started with a simple idea: what if you could{" "}
              <span className="text-[#3B82F6] font-semibold">feel</span> the right timing
              instead of trying to think it through?
            </p>
            <p>
              The system is built on a 3:1 tempo model — twenty-four back, eight through —
              translated into music your body naturally syncs with.
            </p>
            <p className="text-white font-semibold">
              The goal isn&apos;t to change your swing. It&apos;s to remove everything that
              gets in the way of it.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#1E3A5F]">
            <p className="font-mono text-sm text-[#64748B] uppercase tracking-[0.3em]">
              — Gulick, Founder
            </p>
          </div>
        </div>
      </Section>

      {/* 10.5 — THE RITUAL (pre-round use-case cards) */}
      <Section id="ritual" variant="dark">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            The Ritual
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            A pre-round ritual, on loop.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            The anthem isn&apos;t background music. It&apos;s the routine that stabilizes
            your swing from the car to the 18th green.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0C1220] border-l-4 border-[#3B82F6] p-7">
            <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-3">
              01 · Lock-Screen Set
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
              Save a line. See it every time.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Pull a moment from the lyrics and drop it on your lock screen. Every glance
              is a priming cue for tempo, strategy, and commitment.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#F59E0B] p-7">
            <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider mb-3">
              02 · Walking The First Tee
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
              Press play when you grab your driver.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Your anthem hits before you&apos;re standing over the ball. Tempo is already
              loaded. Overthinking never gets a chance to show up.
            </p>
          </div>
          <div className="bg-[#0C1220] border-l-4 border-[#00F0FF] p-7">
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-3">
              03 · Loop The Round
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
              One earbud. Eighteen holes. Same song.
            </h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Same anthem from the 1st tee to the 18th green. Different swings, same
              rhythm. The chorus lives rent-free until impact.
            </p>
          </div>
        </div>
      </Section>

      {/* 11 — ANTHEM LINES (editorial typographic wall) */}
      <Section id="lines" variant="dark">
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            From The Anthems
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            Lines that live in your head.
          </h2>
          <p className="text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
            Not lyrics you forget. Commands your cerebellum rehearses before your
            conscious brain can second-guess.
          </p>
        </div>

        {/* HERO QUOTE — oversized editorial breakout */}
        <div className="mb-16 max-w-5xl">
          <div className="font-mono text-[0.65rem] text-[#3B82F6] uppercase tracking-[0.3em] mb-5">
            Track 01 · The Core
          </div>
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] text-balance">
            Smooth is fast.
            <br />
            <span className="text-[#3B82F6] italic font-bold">
              Don&apos;t fight the swing.
            </span>
          </p>
        </div>

        {/* 12-COL ASYMMETRIC GRID — mixed fills / weights / alignment */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-16">
          {/* Row 1: filled card + outlined card */}
          <figure className="md:col-span-7 bg-gradient-to-br from-[#0C1220] via-[#0C1220] to-[#F59E0B]/5 border-l-4 border-[#F59E0B] p-7 md:p-10">
            <div className="font-mono text-[0.65rem] text-[#F59E0B] uppercase tracking-[0.3em] mb-4">
              On Pressure
            </div>
            <p className="text-3xl md:text-4xl font-black text-white leading-tight">
              Tempo or tumble.{" "}
              <span className="text-[#F59E0B]">Choose it now.</span>
            </p>
          </figure>

          <figure className="md:col-span-5 border-2 border-[#00F0FF]/60 p-7 md:p-10 flex flex-col justify-between">
            <div className="font-mono text-[0.65rem] text-[#00F0FF] uppercase tracking-[0.3em] mb-4">
              On Commit
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white leading-tight italic">
              Pick your line.
              <br />
              <span className="text-[#00F0FF] not-italic font-black">
                Commit or don&apos;t swing.
              </span>
            </p>
          </figure>

          {/* Row 2: right-aligned text-only + wide gradient */}
          <figure className="md:col-span-4 py-2 md:py-6 md:text-right md:border-r-2 md:border-[#10B981]/40 md:pr-8">
            <div className="font-mono text-[0.65rem] text-[#10B981] uppercase tracking-[0.3em] mb-4">
              On Rhythm
            </div>
            <p className="text-2xl md:text-3xl font-black text-white leading-snug">
              Load it slow…
              <br />
              <span className="text-[#10B981] italic font-bold">
                release it free.
              </span>
            </p>
          </figure>

          <figure className="md:col-span-8 bg-gradient-to-r from-[#3B82F6]/15 via-[#3B82F6]/5 to-transparent border-l-4 border-[#3B82F6] p-7 md:p-10">
            <div className="font-mono text-[0.65rem] text-[#3B82F6] uppercase tracking-[0.3em] mb-4">
              On Strategy
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Fairway first.{" "}
              <span className="text-[#3B82F6]">Everything else opens up.</span>
            </p>
          </figure>
        </div>

        {/* THE CLOSER — full-width centered typographic moment */}
        <div className="pt-12 md:pt-16 border-t border-[#1E3A5F]/60">
          <div className="font-mono text-[0.65rem] text-[#F59E0B] uppercase tracking-[0.3em] mb-6 text-center">
            The Closer
          </div>
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center leading-[0.95] max-w-4xl mx-auto">
            Same swing.
            <br />
            <span className="text-[#F59E0B] italic font-bold">Every time.</span>
          </p>
        </div>
      </Section>

      {/* 12 — WAITLIST */}
      <Section id="waitlist" variant="gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance text-center leading-[1.05]">
            Request Your Course.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            Custom Course Anthems are built one round at a time. Drop your details and
            we&apos;ll open a slot for you next.
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-block border border-[#1E3A5F] bg-[#0C1220]/40 px-4 sm:px-5 py-2 sm:py-3">
              <p className="font-mono text-[0.65rem] sm:text-xs text-[#94A3B8] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center">
                By invitation · Limited to 8 rounds per month
              </p>
            </div>
          </div>

          <WaitlistForm
            className="max-w-xl mx-auto"
            buttonLabel="REQUEST YOUR COURSE"
          />

          <p className="mt-6 text-center font-mono text-xs text-[#64748B] uppercase tracking-wider">
            No spam. We text when your anthem is ready.
          </p>
        </div>
      </Section>

      {/* 13 — FINAL CTA */}
      <Section variant="gradient" className="text-center">
        <div className="max-w-4xl mx-auto py-8 md:py-16">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-6">
            Performance · Engineered · Repeatable
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 text-balance leading-[1.0] break-words">
            Tempo wins.
            <br />
            <span className="text-[#3B82F6]">Everything else follows.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] leading-relaxed mb-12 max-w-2xl mx-auto">
            Calm is fast. Smooth is repeatable. Tempo travels.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-8 sm:px-12 py-5 sm:py-6 text-sm sm:text-base md:text-lg transition-colors duration-200"
          >
            Request Your Course
            <span className="font-mono">→</span>
          </a>
        </div>
      </Section>


      {/* 13.5 — FOR TEAMS (B2B strip) */}
      <section className="border-t border-b border-[#1E3A5F]/60 bg-[#05080F] py-10 md:py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-mono text-[0.65rem] sm:text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2">
              For Teams
            </div>
            <p className="text-[#E2E8F0] text-base md:text-lg max-w-2xl leading-snug">
              For clubs, tour pros, and teaching academies — custom anthem programs for
              your players.
            </p>
          </div>
          <a
            href="mailto:hello@248anthems.com?subject=Course%20Anthem%20Program"
            className="inline-flex items-center gap-2 border border-[#1E3A5F] hover:border-[#3B82F6] text-[#E2E8F0] hover:text-white font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 transition-colors self-start md:self-auto shrink-0"
          >
            Talk To Us
            <span>→</span>
          </a>
        </div>
      </section>

      <Footer />

      <StickyAudioPlayer theme="dark" />
    </main>
  )
}
