import { SectionWrapper } from "@/components/scrollytelling/section-wrapper"
import { SectionHeader } from "@/components/scrollytelling/section-header"
import { PrincipleBox } from "@/components/scrollytelling/principle-box"
import { CalloutBox } from "@/components/scrollytelling/callout-box"
import { MetricCard } from "@/components/scrollytelling/metric-card"
import { Footer } from "@/components/scrollytelling/footer"
import { HeroWaveformVisualization } from "@/components/scrollytelling/hero-waveform-visualization"
import { TempoRatioVisualizer } from "@/components/tempo-ratio-visualizer"
import { BpmTempoComparisonSlider } from "@/components/interactive/bpm-tempo-comparison-slider"
import { BrainwaveFrequencyChart } from "@/components/visualizations/brainwave-frequency-chart"
import { NeuralEntrainmentAnimator } from "@/components/scrollytelling/neural-entrainment-animator"
import { InteractiveDopaminePathway } from "@/components/scrollytelling/interactive-dopamine-pathway"
import { SpatialAudioWaveform } from "@/components/scrollytelling/spatial-audio-waveform"
import { ScienceToMythSpectrum } from "@/components/scrollytelling/science-to-myth-spectrum"

export default function NeuroGolfReport() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-black to-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          {/* Eyebrow */}
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-cream-dark">
            Neuro-Golf Performance Audio
          </p>

          {/* Main Headline */}
          <h1 className="text-balance text-center font-sans text-4xl font-bold text-cream-light sm:text-5xl lg:text-6xl xl:text-7xl">
            The 24/8 Anthem:{" "}
            <span className="text-orange">Your Brain Doesn&apos;t Negotiate</span>
          </h1>

          {/* Subhead */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-cream-dark sm:text-xl">
            This isn&apos;t workout music. This isn&apos;t a motivational podcast. This is{" "}
            <strong className="text-orange">neuro-golf performance audio</strong>—engineered
            to hijack your motor timing, entrain your brainwaves, and install
            professional-level tempo into your swing mechanics.
          </p>

          {/* Key Metrics Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border-l-4 border-orange bg-charcoal p-5 sm:p-6">
              <div className="font-sans text-4xl font-bold text-orange sm:text-5xl">24</div>
              <div className="mt-1 font-mono text-xs text-cream-dark sm:text-sm">Frames Backswing</div>
            </div>
            <div className="rounded-xl border-l-4 border-orange bg-charcoal p-5 sm:p-6">
              <div className="font-sans text-4xl font-bold text-orange sm:text-5xl">8</div>
              <div className="mt-1 font-mono text-xs text-cream-dark sm:text-sm">Frames Downswing</div>
            </div>
            <div className="rounded-xl border-l-4 border-orange-dark bg-charcoal p-5 sm:p-6">
              <div className="font-sans text-4xl font-bold text-orange-dark sm:text-5xl">3:1</div>
              <div className="mt-1 font-mono text-xs text-cream-dark sm:text-sm">Pro Tempo Ratio</div>
            </div>
            <div className="rounded-xl border-l-4 border-terra-cotta bg-charcoal p-5 sm:p-6">
              <div className="font-sans text-4xl font-bold text-terra-cotta sm:text-5xl">112</div>
              <div className="mt-1 font-mono text-xs text-cream-dark sm:text-sm">BPM Precision</div>
            </div>
          </div>

          {/* Hero Waveform Visualization */}
          <div className="mt-12">
            <HeroWaveformVisualization />
          </div>
        </div>
      </section>

      {/* Executive Summary / Table of Contents */}
      <SectionWrapper background="charcoal">
        <SectionHeader
          title="The Science of Swing"
          subtitle="The name tells you everything: 24 frames backswing, 8 frames downswing. A 3:1 ratio locked at 112 BPM. The exact temporal structure your basal ganglia craves for automated, repeatable movement."
        />

        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-cream-dark">
          This report breaks down the neuroscience, biomechanics, and audio engineering
          that makes 24/8 Anthems a new category: performance audio that doesn&apos;t
          motivate—it <em className="text-cream-light">entrains</em>.
        </p>

        {/* Table of Contents */}
        <nav className="grid gap-3" aria-label="Table of Contents">
          <a
            href="#section-1"
            className="group flex items-center gap-4 rounded-xl border-l-4 border-orange bg-charcoal-light p-5 transition-all hover:bg-charcoal-lighter hover:translate-x-1 cursor-pointer"
          >
            <span className="font-mono text-sm font-bold text-orange">01</span>
            <span className="font-sans text-base text-cream-light group-hover:text-cream sm:text-lg">
              Tempo as Truth: The 3:1 Ratio & 112 BPM Advantage
            </span>
          </a>
          <a
            href="#section-2"
            className="group flex items-center gap-4 rounded-xl border-l-4 border-orange bg-charcoal-light p-5 transition-all hover:bg-charcoal-lighter hover:translate-x-1 cursor-pointer"
          >
            <span className="font-mono text-sm font-bold text-orange">02</span>
            <span className="font-sans text-base text-cream-light group-hover:text-cream sm:text-lg">
              Brainwave Symphony: Entraining Focus & Peak Performance
            </span>
          </a>
          <a
            href="#section-3"
            className="group flex items-center gap-4 rounded-xl border-l-4 border-orange-dark bg-charcoal-light p-5 transition-all hover:bg-charcoal-lighter hover:translate-x-1 cursor-pointer"
          >
            <span className="font-mono text-sm font-bold text-orange-dark">03</span>
            <span className="font-sans text-base text-cream-light group-hover:text-cream sm:text-lg">
              Dopamine Drive: Fueling Flow & Confidence
            </span>
          </a>
          <a
            href="#section-4"
            className="group flex items-center gap-4 rounded-xl border-l-4 border-terra-cotta bg-charcoal-light p-5 transition-all hover:bg-charcoal-lighter hover:translate-x-1 cursor-pointer"
          >
            <span className="font-mono text-sm font-bold text-terra-cotta">04</span>
            <span className="font-sans text-base text-cream-light group-hover:text-cream sm:text-lg">
              Audio Alchemy: Spatial Cues & Cognitive Anchors
            </span>
          </a>
          <a
            href="#section-5"
            className="group flex items-center gap-4 rounded-xl border-l-4 border-orange bg-charcoal-light p-5 transition-all hover:bg-charcoal-lighter hover:translate-x-1 cursor-pointer"
          >
            <span className="font-mono text-sm font-bold text-orange">05</span>
            <span className="font-sans text-base text-cream-light group-hover:text-cream sm:text-lg">
              Beyond Belief: The Science of Engineered Performance
            </span>
          </a>
        </nav>
      </SectionWrapper>

      {/* Section 1: Tempo as Truth */}
      <div id="section-1" className="scroll-mt-16" />
      <SectionWrapper background="black">
        <SectionHeader
          sectionNumber="01"
          eyebrow="Motor Control"
          title="Tempo as Truth: The 3:1 Ratio & 112 BPM Advantage"
          accentColor="orange"
        />

        <div className="prose prose-lg max-w-none">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            The 3:1 Ratio: Non-Negotiable Motor Control
          </h3>
          <p className="mt-4 text-cream-dark leading-relaxed">
            Elite golfers swing with approximately a 3:1 backswing:downswing timing ratio.
            Tour professionals operate at 60–75 BPM, while amateurs often fall below 40 BPM.
            This isn&apos;t preference—it&apos;s biomechanics.
          </p>
        </div>

        <PrincipleBox
          title="Tempo as Truth"
          quote="Your cerebellum doesn't care about your feelings. It cares about timing."
          variant="highlight"
        />

        <TempoRatioVisualizer />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <MetricCard value="3:1" label="Pro Tempo Ratio" status="good" />
          <MetricCard value="60–75" label="Tour Pro BPM" status="neutral" />
          <MetricCard value="<40" label="Amateur BPM" status="warning" />
        </div>

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            112 BPM: The Math Behind the Tempo
          </h3>
          <p className="mt-4 text-cream-dark leading-relaxed">
            112 BPM at 4 beats per measure equals 448 micro-ticks of granular timing
            resolution. This precision creates a scaffold for your motor system to lock onto.
          </p>
        </div>

        <PrincipleBox
          title="Frames, Not Seconds"
          quote="Quantized movement. Math meets muscle."
        />

        <div className="mt-8">
          <BpmTempoComparisonSlider />
        </div>

        <CalloutBox type="insight" title="Brain-Muscle Interface">
          Not metaphor. Mechanism. The 24/8 Anthem doesn&apos;t motivate you to swing better.
          It entrains your brain to the timing signature of elite performance.
        </CalloutBox>
      </SectionWrapper>

      {/* Section 2: Brainwave Symphony */}
      <div id="section-2" className="scroll-mt-16" />
      <SectionWrapper background="charcoal">
        <SectionHeader
          sectionNumber="02"
          eyebrow="Neural Science"
          title="Brainwave Symphony: Entraining Focus & Peak Performance"
          accentColor="orange"
        />

        <div className="prose prose-lg max-w-none">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            Your Brain is an Orchestra. We&apos;re Conducting.
          </h3>
          <p className="mt-4 text-cream-dark leading-relaxed">
            Your brain oscillates at multiple frequencies simultaneously—Delta (0.5–4 Hz) for
            deep sleep, Theta (4–8 Hz) for creativity, Alpha (8–12 Hz) for relaxation,
            Beta (12–30 Hz) for active thinking, and Gamma (30–100 Hz) for peak cognitive binding.
          </p>
        </div>

        <BrainwaveFrequencyChart />

        <NeuralEntrainmentAnimator className="mt-6" />

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            Entrainment: Neural Lockstep
          </h3>
          <p className="mt-4 text-cream-dark leading-relaxed">
            External rhythmic cues can synchronize neural firing. Research shows synchronization
            between 10–40 Hz produces the strongest effects. The 24/8 Anthem operates in this
            sweet spot, driving your neurons into lockstep with elite timing patterns.
          </p>
        </div>

        <CalloutBox type="principle" title="40Hz Gamma: The Focus Frequency">
          Heightened attention, perceptual binding, peak cognitive performance.
          This is the frequency of flow states and elite athletic focus.
        </CalloutBox>
      </SectionWrapper>

      {/* Section 3: Dopamine Drive */}
      <div id="section-3" className="scroll-mt-16" />
      <SectionWrapper background="black">
        <SectionHeader
          sectionNumber="03"
          eyebrow="Neurochemistry"
          title="Dopamine Drive: Fueling Flow & Confidence"
          accentColor="orange-dark"
        />

        <p className="max-w-3xl text-lg text-cream-dark leading-relaxed">
          Anticipation is key. Predictable rhythmic structure at 112 BPM drives mesolimbic
          dopamine release. The research is clear: predictability matters more than pleasure.
          Your brain rewards what it can predict—and then execute.
        </p>

        <div className="mt-8">
          <InteractiveDopaminePathway />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <MetricCard value="+48%" label="Positive Affect Increase" status="good" />
          <MetricCard value="α/β ↑" label="Flow State Marker (Upper Alpha & Beta Power)" status="neutral" />
        </div>

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            The Flow Equation
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Rhythmic Predictability",
                description: "Consistent tempo scaffolds motor timing, reducing cognitive load.",
              },
              {
                title: "Spatial Audio Cues",
                description: "Stereo positioning forces spatial awareness integration.",
              },
              {
                title: "Lyrical Cognitive Anchors",
                description: "Procedural memory hooks that encode swing mechanics.",
              },
            ].map((tile) => (
              <div
                key={tile.title}
                className="rounded-xl border border-charcoal-light bg-charcoal p-6 transition-all hover:border-orange-dark/50 cursor-default"
              >
                <h4 className="font-sans text-lg font-bold text-orange-dark">{tile.title}</h4>
                <p className="mt-2 text-sm text-cream-dark leading-relaxed">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Section 4: Audio Alchemy */}
      <div id="section-4" className="scroll-mt-16" />
      <SectionWrapper background="charcoal">
        <SectionHeader
          sectionNumber="04"
          eyebrow="Sound Engineering"
          title="Audio Alchemy: Spatial Cues & Cognitive Anchors"
          accentColor="terra-cotta"
        />

        <h3 className="font-sans text-2xl font-bold text-cream-light">
          Beyond Sound Design
        </h3>
        <p className="mt-4 max-w-3xl text-cream-dark leading-relaxed">
          Call-and-response patterns function as motor sequencing reinforcement. Spatial audio
          design forces your brain to track position, timing, and sequence. Lyrics serve as
          procedural memory hooks—verbal anchors that encode movement patterns into long-term storage.
        </p>

        <PrincipleBox
          title="Engineered Flow"
          quote="The system doesn't motivate flow—it manufactures the conditions where flow becomes inevitable."
          variant="highlight"
        />

        <SpatialAudioWaveform />

        <CalloutBox type="insight" title="Neuro-Golf Mechanics With Swagger">
          Math meets muscle. Your swing doesn&apos;t feel faster—it feels inevitable.
        </CalloutBox>
      </SectionWrapper>

      {/* Section 5: Beyond Belief */}
      <div id="section-5" className="scroll-mt-16" />
      <SectionWrapper background="black">
        <SectionHeader
          sectionNumber="05"
          eyebrow="Evidence & Engineering"
          title="Beyond Belief: The Science of Engineered Performance"
          accentColor="orange"
        />

        <p className="max-w-3xl text-lg text-cream-dark leading-relaxed">
          The 24/8 system sits on a spectrum between rigorous neuroscience and engineering theater.
          Both produce measurable results. The question isn&apos;t which is &ldquo;real&rdquo;—it&apos;s how they synergize.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-orange/30 bg-charcoal p-6">
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-orange">
              Where the Science is Bulletproof
            </h4>
            <ul className="space-y-3">
              {["Motor timing consistency (cerebellar entrainment)", "Brainwave entrainment (auditory-driven synchronization)", "Dopamine-anticipation link (predictive reward circuits)", "3:1 ratio (biomechanical optimum)"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream-dark">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-terra-cotta/30 bg-charcoal p-6">
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-terra-cotta">
              Where Engineering Becomes Art
            </h4>
            <ul className="space-y-3">
              {["448 micro-ticks (poetic precision)", "Call-and-response anchors (ritual reinforcement)", 'The "Anthem" framing (belief amplification)'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream-dark">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terra-cotta" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ScienceToMythSpectrum />

        <div className="mt-12">
          <h3 className="font-sans text-2xl font-bold text-cream-light">
            The Power of Engineered Belief
          </h3>
          <p className="mt-4 max-w-3xl text-cream-dark leading-relaxed">
            Placebo effects produce real physiological changes. Rituals reduce anxiety and
            increase confidence. This isn&apos;t weakness—it&apos;s how brains work.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <MetricCard value="Moderate" label="Placebo Effect Size" status="good" />
          <MetricCard value="Physical + Mental" label="Ritual Impact" status="neutral" />
        </div>

        {/* The 24/8 Revelation Box */}
        <div className="mt-12 rounded-2xl border-2 border-orange bg-gradient-to-br from-orange/10 via-transparent to-terra-cotta/10 p-8">
          <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-orange">
            The 24/8 Revelation
          </h4>
          <p className="text-xl font-bold text-cream-light leading-relaxed">
            It works because the foundational science is real <span className="text-orange">AND</span>{" "}
            engineered belief amplifies those effects.
          </p>
        </div>

        {/* Closing Lines */}
        <div className="mt-16 border-t border-charcoal-light pt-12 text-center">
          <p className="font-sans text-2xl font-bold text-cream-light sm:text-3xl">
            Welcome to neuro-golf performance audio.
          </p>
          <p className="mt-4 text-lg text-cream-dark">
            Where it works because the science is real{" "}
            <span className="text-orange">AND</span> the story makes you believe.
          </p>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  )
}
