# Plan: V2 of 248 Anthems page at `/248-anthems-v2` with Elfsight player + marketing copy

## Context

The user wants a **V2** of the existing 248 Anthems landing page. V1 (`app/page.tsx`) is a 27KB scrollytelling page focused purely on the neuroscience. V2 should keep that science foundation but mix in marketing/promo copy and embed the Elfsight audio player ("The Masters - 248 Anthems", app id `6a38b85d-2e93-4765-8a0c-80415ee7b970`) so visitors can hear the product. V1 stays untouched at `/`; V2 lives at a new route `/248-anthems-v2` for side-by-side comparison.

Additional context:
- My assigned branch `claude/verify-deployment-url-y9s5W` currently contains only backend TypeScript — no Next.js site. The site lives on `claude/copy-files-new-repo-sBtvP`, and the two branches share commit `0b29a8f` as a common ancestor, so I can fast-forward-merge the site into my branch cleanly.
- The user's original URL question (`anthem-research-git-claude-77ec56-wearehomeric-collabs-projects.vercel.app`) — the `77ec56` is Vercel's hash-truncation for a long branch name, and it is almost certainly NOT this branch (this branch has no site to deploy until we finish this work). After pushing, Vercel will generate a new preview URL for `claude/verify-deployment-url-y9s5W` that can be verified against the one the user provided.

## User decisions (from AskUserQuestion)

- **V2 route**: `app/248-anthems-v2/page.tsx` → `/248-anthems-v2`
- **Base**: Copy of current `app/page.tsx` content
- **Theme**: Keep current dark theme + royal blue palette; no palette/typography changes
- **Info**: Claude drafts landing-page copy — V2 is a mix of the existing science content plus added marketing/promo info

## Existing V1 structure (to preserve and extend)

`app/page.tsx` renders in this order:
1. Hero (variant="royal") — headline, subhead, key metrics (24/8/3:1/112), `HeroWaveformVisualization`
2. Executive Summary + TableOfContents (variant="dark")
3. Section 01 "Tempo as Truth" — `TempoRatioVisualizer`, `BpmTempoComparisonSlider`
4. Section 02 "Brainwave Symphony" — `BrainwaveFrequencyChart`, `NeuralEntrainmentAnimator`
5. Section 03 "Dopamine Drive" — `InteractiveDopaminePathway`
6. Section 04 "Audio Alchemy" — `SpatialAudioWaveform`
7. Section 05 "Beyond Belief" — `ScienceToMythSpectrum`
8. `Footer`

All sections come from `components/scrollytelling/` and `components/visualizations/` — already available after the site port.

## V2 structure (new)

V2 keeps everything from V1 and **inserts three new sections** plus a small TOC addition:

1. Hero (unchanged — same headline, same metrics, same `HeroWaveformVisualization`)
2. **NEW — "Listen: The Masters 2026"** — dedicated Section that renders the Elfsight player. Short headline + one-paragraph intro + player container.
3. **NEW — "What is a 24/8 Anthem?"** — marketing/promo section introducing the product in plain language (not pure science). Explains course-specific AI-generated golf anthems personalized to a player's club distances, tee box, and strategy. 2–3 short paragraphs + a 3-up feature grid (Personalized / Course-Specific / Strategy-Tuned).
4. Executive Summary + TableOfContents (existing, extended to include the two new sections at the top of the TOC list)
5. Section 01–05 (existing science sections, untouched)
6. **NEW — "Your Anthem Awaits"** — simple CTA section: one-line pitch + copy describing the pipeline in marketing voice (course research → strategy → lyrics → music → track) + link/button placeholder.
7. Footer (existing)

### Copy to draft

**Listen section (#2)** — just enough framing around the player:
- Eyebrow: "Listen · The Masters 2026"
- Headline: "Hear the Anthems Built for Augusta"
- Body: 1–2 sentences on what the playlist is and who it's for.
- Then the Elfsight `<div>` mounted inside a container.

**"What is a 24/8 Anthem?" section (#3)** — marketing intro drawn from `CLAUDE.md`'s "What This Project Is":
- Eyebrow: "The Product"
- Headline: "Your Course. Your Strategy. Your Anthem."
- Body paragraphs covering:
  - Course-specific AI-generated songs — a different anthem for every course.
  - Personalized to the player's club yardages, tee box, and strategy type (Smart / Aggressive / Conservative / Risk-Reward).
  - Built on a research-driven pipeline: course research → hole-by-hole strategy → lyrics → music generation → QC → delivery.
- Feature grid (3 cards, reusing the existing `bg-[#0C1220] border border-[#1E3A5F] p-6` card pattern from Section 03):
  - **Personalized** — club yardages determine which hazards matter per hole.
  - **Course-Specific** — anthem built from real research on your course's layout, history, and signature holes.
  - **Strategy-Tuned** — four play styles (Smart 🧠 / Aggressive 🔥 / Conservative 🛡️ / Risk-Reward ⚖️) shape lyrical focus and vibe.

**CTA section (#6)** — promo close:
- Eyebrow: "Request Your Anthem"
- Headline: "Engineered For Your Round."
- Body: Short marketing paragraph. Optional button/link (no routing target yet — use a non-navigating `<a href="#">` placeholder with comment noting it's wired later).

## Elfsight embed approach

The user-supplied HTML:
```html
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970" data-elfsight-app-lazy></div>
```

Converted for Next.js App Router inside `app/248-anthems-v2/page.tsx`:

```tsx
"use client"
import Script from "next/script"

// ...inside the Listen section JSX:
<Script
  src="https://elfsightcdn.com/platform.js"
  strategy="afterInteractive"
/>
<div
  className="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970 mx-auto max-w-3xl"
  data-elfsight-app-lazy
/>
```

Notes:
- `class` → `className` (JSX).
- `data-elfsight-app-lazy` passes through React as a valid `data-*` attribute.
- `strategy="afterInteractive"` is the correct loader timing — Elfsight's `platform.js` scans the DOM for `.elfsight-app-*` containers after page interactive and injects the player into them.
- The page becomes a **client component** (`"use client"` at the top) because (a) it uses `next/script` inline and (b) the scrollytelling components already used by V1 include client-hook-using visualizations. V1 itself is a server component only because those subcomponents self-declare `"use client"`; V2 adding `next/script` inline doesn't require making the whole file client — `next/script` works fine in server components too. **Decision:** Leave V2 as a server component (matching V1) and rely on `next/script` directly in the JSX; this keeps parity with V1 and avoids breaking any visualization that might rely on RSC boundaries. Verify during execution — if any visualization fails, flip the file to `"use client"`.

## TOC extension

The existing `tocItems` array in V1 lists sections 01–05. In V2, prepend two new entries so the TOC reflects the extra top sections:

```ts
const tocItems = [
  { id: "listen", number: "LIVE", label: "Listen: The Masters 2026" },
  { id: "product", number: "PRO", label: "What is a 24/8 Anthem?" },
  { id: "tempo-truth", number: "01", label: "Tempo as Truth: The 3:1 Ratio & 112 BPM Advantage" },
  { id: "brainwave-symphony", number: "02", label: "Brainwave Symphony: Entraining Focus & Peak Performance" },
  { id: "dopamine-drive", number: "03", label: "Dopamine Drive: Fueling Flow & Confidence" },
  { id: "audio-alchemy", number: "04", label: "Audio Alchemy: Spatial Cues & Cognitive Anchors" },
  { id: "beyond-belief", number: "05", label: "Beyond Belief: The Science of Engineered Performance" },
]
```

Confirm `TableOfContents` component tolerates non-numeric `number` values before committing — if not, use `"00"` / `"0A"` placeholder numbers instead. I'll check `components/scrollytelling/TableOfContents.tsx` during execution.

## Execution steps

### Step 1 — Port the site into the assigned branch

```bash
git fetch origin claude/copy-files-new-repo-sBtvP
git merge --ff-only origin/claude/copy-files-new-repo-sBtvP
```

This fast-forwards `claude/verify-deployment-url-y9s5W` from `0b29a8f` → `d46e123`. No conflicts expected because my current branch tip equals the site branch's merge base.

### Step 2 — Install dependencies

```bash
pnpm install   # pnpm-lock.yaml is committed
```

Fallback: `npm install` if pnpm isn't available.

### Step 3 — Read the TOC component signature

Quick read of `components/scrollytelling/TableOfContents.tsx` to confirm the `items` prop shape (in particular whether `number` is typed as a strict string or accepts any). Adjust the new TOC entries accordingly.

### Step 4 — Create `app/248-anthems-v2/page.tsx`

- Duplicate the full contents of `app/page.tsx` into the new file.
- Update the `tocItems` array (add "Listen" and "Product" entries at the top).
- Insert the new **Listen** `<Section>` immediately after the Hero `<Section>`. Use `variant="dark"` for visual contrast against the royal hero. Add `id="listen"`. Include the `next/script` tag and the Elfsight container.
- Insert the new **"What is a 24/8 Anthem?"** `<Section>` immediately after the Listen section. Use `variant="default"`. Add `id="product"`. Include the 3-up feature grid.
- Leave sections 01–05 untouched.
- Insert the new **CTA** `<Section>` immediately before `<Footer />`. Use `variant="gradient"` for a visually distinct closing moment. Add `id="cta"`.
- Keep `export default function Page()` as the route entry.

### Step 5 — Local verification

```bash
pnpm dev
```

- Open `http://localhost:3000/248-anthems-v2` — confirm:
  - Hero renders with existing metrics + `HeroWaveformVisualization`.
  - Listen section renders, Elfsight `<div>` is in the DOM, `platform.js` loads in the Network tab, and Elfsight injects player UI into the container (check Elements panel).
  - "What is a 24/8 Anthem?" section renders with the feature grid.
  - All original Sections 01–05 still render with their visualizations.
  - CTA section renders above the footer.
  - No TypeScript or hydration errors in dev console.
- Open `http://localhost:3000/` — confirm V1 is unchanged and still renders.
- Run `pnpm build` — confirm production build passes and the new route is statically/dynamically compiled without errors.

If no browser/dev server is available in this environment, run at minimum `pnpm build` and explicitly note in the final report that visual browser verification was not performed (per `CLAUDE.md`'s "UI or frontend changes" guidance — type-checking is not feature-checking).

### Step 6 — Commit and push

Two commits for a clean history:

1. (Implicit) Fast-forward merge of `origin/claude/copy-files-new-repo-sBtvP` — no commit needed if `--ff-only` succeeds.
2. `feat: add /248-anthems-v2 with Elfsight player and marketing sections`

Push:
```bash
git push -u origin claude/verify-deployment-url-y9s5W
```

With the session's push-retry policy: up to 4 retries on network error with 2s/4s/8s/16s exponential backoff.

**Do not open a PR** — session instructions are explicit about this.

### Step 7 — Verify the deployment URL

After push:
- Check GitHub commit statuses / PR activity on the branch for the vercel[bot] deployment comment.
- Capture the preview URL Vercel assigns to `claude/verify-deployment-url-y9s5W`.
- Compare it to `anthem-research-git-claude-77ec56-wearehomeric-collabs-projects.vercel.app`. Report clearly whether it matches or differs.
- Hit the Vercel preview URL at `/248-anthems-v2` (if accessible without auth) to confirm the production build serves the new route.

## Critical files

| File | Action | Why |
|---|---|---|
| `app/248-anthems-v2/page.tsx` | **create** (duplicated from `app/page.tsx`, then modified) | The V2 route — adds Listen + Product + CTA sections and the Elfsight player |
| `components/scrollytelling/TableOfContents.tsx` | read only | Verify `items` prop shape before extending `tocItems` |
| `components/scrollytelling/Section.tsx` | read only | Confirm the `variant` values (`royal`, `dark`, `default`, `gradient`) used in V1 still exist |
| `app/page.tsx` | **unchanged** | V1 stays intact per user request |
| `app/layout.tsx` | unchanged | Already provides fonts, dark body, Analytics — inherited by V2 automatically |
| `package.json` | read only | No new dependencies needed; Elfsight is CDN-loaded via `next/script` |
| `vercel.json` | read only | `{ "framework": "nextjs" }` — Vercel auto-discovers the new route |

## Reused existing utilities/patterns

- **`Section`, `Callout`, `MetricDisplay`, `PrincipleBox`, `TableOfContents`, `Footer`** from `components/scrollytelling/` — the new V2 sections use the same primitives V1 uses, so design parity is free.
- **Card block pattern** from V1 Section 03 (`bg-[#0C1220] border border-[#1E3A5F] p-6`) — reused for the "What is a 24/8 Anthem?" feature grid so V2 visually matches V1 without introducing new tokens.
- **`next/script` with `strategy="afterInteractive"`** — built-in Next.js pattern for third-party CDN scripts; no new dependency.
- **Root `app/layout.tsx`** — provides fonts (JetBrains Mono, Space Grotesk), Google Fonts preconnects, dark theme body classes, `@vercel/analytics` — all inherited by V2.

## Verification

End-to-end test plan:

1. `pnpm install` — clean install.
2. `pnpm dev` — start dev server.
3. Navigate to `http://localhost:3000/248-anthems-v2`:
   - Hero renders.
   - Listen section: Elfsight `<div class="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970">` present; `platform.js` loaded in Network; player UI injected.
   - Product section renders with headline, copy, 3-up feature grid.
   - Original Sections 01–05 render with all visualizations working (no client-side errors).
   - CTA section renders above footer.
   - No console errors/warnings, no hydration mismatches.
4. Navigate to `http://localhost:3000/` — V1 unchanged.
5. `pnpm build` — production build passes, type-check clean.
6. Push, then after Vercel builds the preview, open the Vercel preview URL at `/248-anthems-v2` and repeat step 3 against the production build.

## Open assumptions (flag at execution time if wrong)

- **Elfsight in server component**: I'll try keeping `app/248-anthems-v2/page.tsx` as a server component (parity with V1) and use `next/script` inline. If Elfsight fails to mount, flip to `"use client"`.
- **TOC `number` values**: I'm using `"LIVE"` and `"PRO"` as non-numeric TOC markers for the two new sections. If `TableOfContents` enforces a numeric string format, I'll fall back to `"00"`/`"0A"`.
- **Marketing copy voice**: I'll draft in a voice matching V1's existing tone (direct, punchy, engineered-performance framing). If you want softer or more consumer-facing copy, it's a single JSX block to rewrite.
- **CTA target**: The CTA button has no destination yet. I'll render a placeholder `<a href="#">` with a comment flagging it as TODO so it's obvious in review.
- **Backend `src/` coexistence**: Leaving `src/` in place. Vercel builds only the Next.js app, so backend TypeScript doesn't affect the deployment.
