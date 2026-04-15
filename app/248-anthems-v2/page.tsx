import Script from "next/script"
import { Section } from "@/components/scrollytelling/Section"
import { Footer } from "@/components/scrollytelling/Footer"
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
                24/8 Anthems · Performance-Engineered Golf Audio
              </div>

              <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 text-balance break-words">
                Performance.
                <br />
                <span className="text-[#3B82F6]">Engineered For Your Swing.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-[#E2E8F0] mb-12 leading-relaxed">
                Tempo-locked audio to stabilize your swing and keep you composed when it matters most.
              </p>

              <div className="flex">
                <a
                  href="#listen"
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
                  24/8 tempo model · 112 BPM · Built for Augusta
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
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-balance leading-[1.05]">
            Hear What Calm Sounds Like.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed">
            One course. One anthem. Built on the 24/8 tempo model.
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
                We build music around that ratio so your body feels the timing instead of thinking about it.
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
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-balance leading-[1.05]">
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

      {/* 07 — TESTIMONIALS */}
      <Section id="testimonials" variant="dark">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            Early Signal
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            What players feel immediately.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;I didn&apos;t think music could actually change anything — but within a
              few swings I stopped rushing everything. It just slowed me down without me
              thinking about it.&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
              On Tempo · Range Session
            </figcaption>
          </figure>

          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;Usually I speed up when it matters. With this, I felt like I had something
              to lock into. Same swing, just way more controlled.&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider">
              On Pressure · In Round
            </figcaption>
          </figure>

          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;It&apos;s not just tempo — it&apos;s weirdly how it makes you think. I
              wasn&apos;t forcing shots. I just played smarter without overanalyzing.&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider">
              On Decisions · After 9 Holes
            </figcaption>
          </figure>

          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;This isn&apos;t hype music. It actually feels like it&apos;s doing something
              to your swing.&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#10B981] uppercase tracking-wider">
              First Impression
            </figcaption>
          </figure>

          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;We played a match with it and it honestly felt unfair. One side was
              steady… the other wasn&apos;t.&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider">
              On The Edge · Match Play
            </figcaption>
          </figure>

          <figure className="bg-[#0C1220] border border-[#1E3A5F] p-6">
            <blockquote className="text-[#E2E8F0] text-xl md:text-2xl font-semibold leading-snug mb-4">
              &ldquo;Smooth showed up.
              <br />
              <span className="text-[#3B82F6]">The chaos didn&apos;t.</span>&rdquo;
            </blockquote>
            <figcaption className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
              Post-Round
            </figcaption>
          </figure>
        </div>
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

      {/* 11 — ANTHEM LINES STRIP */}
      <Section id="lines" variant="dark">
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-4">
            From The Anthems
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-balance leading-[1.05]">
            Lines that live in your head.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="border-l-4 border-[#3B82F6] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Smooth is fast.
              <br />
              <span className="text-[#3B82F6]">Don&apos;t fight the swing.</span>
            </p>
          </div>
          <div className="border-l-4 border-[#F59E0B] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Tempo or tumble.
              <br />
              <span className="text-[#F59E0B]">Choose it now.</span>
            </p>
          </div>
          <div className="border-l-4 border-[#00F0FF] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Pick your line.
              <br />
              <span className="text-[#00F0FF]">Commit or don&apos;t swing.</span>
            </p>
          </div>
          <div className="border-l-4 border-[#10B981] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Load it slow…
              <br />
              <span className="text-[#10B981]">release it free.</span>
            </p>
          </div>
          <div className="border-l-4 border-[#F59E0B] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Fairway first.
              <br />
              <span className="text-[#F59E0B]">Everything else opens up.</span>
            </p>
          </div>
          <div className="border-l-4 border-[#3B82F6] pl-6 py-3">
            <p className="text-xl md:text-2xl font-black text-white leading-snug">
              Same swing.
              <br />
              <span className="text-[#3B82F6]">Every time.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* 12 — WAITLIST */}
      <Section id="waitlist" variant="gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-balance text-center leading-[1.05]">
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
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 text-balance leading-[1.0] break-words">
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


      <Footer />
    </main>
  )
}
