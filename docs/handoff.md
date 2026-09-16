# Handoff summary — paste this into a new Claude Code session

## What this project is
A React + TypeScript (Vite) app for learning the three Tibetan scripts —
Uchen, Ume, and Gyug Yik (Drutsa) — with letter browsing, flashcards, a
quiz, handwriting practice, and Heart Sutra reading practice.

- Repo: https://github.com/mladgorchev/tibetan-scripts (branch `main`,
  currently at commit `ae4fda4`, working tree clean, fully pushed)
- Live: https://tibetan-scripts.gorchev.me/ (Vercel, auto-deploys on push
  to `main`; needs `vercel.json` rewrite-to-index.html for client routes
  to not 404 — already in place)
- Dev: `npm run dev -- --port 3200` (or any port), `npm run build` for a
  production check, `npx tsc -b --noEmit` + `npx eslint src` before commits

## Architecture
- `src/App.tsx` — shell: header, script tabs, mode nav, react-router routes
  for `/` (Browse), `/flashcards`, `/quiz`, `/write`, `/read`. `/record` is
  a separate hidden route (`RecordBooth`, not in main nav) for
  crowdsourcing pronunciation audio recordings from contributors.
- `src/data/letters.ts` — the 30 consonants (with `tone: 'high'|'low'` per
  Central Tibetan register, and `pronunciation` reflecting actual spoken
  sound, not just the written spelling — see note below), 4 vowel signs,
  10 digits, plus `consonantRows` (the traditional 8-row ka-kha-ga-nga
  layout) and `getAudioUrl()`.
- `src/data/scripts.ts` — the 3 scripts, each with a `fontFamily` and a
  `glyphOffsetEm` (measured correction for these fonts' internal metrics
  reserving space for stacked vowel signs, which otherwise renders lone
  letters too high when flexbox-centered).
- `src/data/heartSutra.ts` — Tibetan text (Lotsawa House recension) for
  Read mode.
- `src/data/pronunciationHints.ts` — rough "sounds like ___ in Ukrainian"
  comparisons per consonant (approximate learning aids, not IPA-rigorous).
- `src/i18n/` — `LanguageContext` (React context, localStorage-persisted),
  `languages.ts`, `translations.ts` with a `Dictionary` interface that
  TypeScript enforces both `en` and `uk` implement fully (missing a
  translation is a build error). **Only English + Ukrainian exist today**
  — Bulgarian/German/Spanish/Italian were discussed but explicitly
  deferred; adding one means implementing one more `Dictionary` object.
- `src/utils/handwriting.ts` — canvas-based handwriting scoring: renders
  the reference glyph to an offscreen canvas, compares alpha-channel
  coverage/precision against the user's strokes. Returns `HintKey` enum
  values (translated in `WritePractice.tsx`), not literal strings.
- `src/components/WritePractice.tsx` — three brush techniques (Bamboo Pen,
  Fine Reed Pen: both fixed-angle chisel-nib sweeps; Ink Brush: isotropic,
  speed-driven width). Apple Pencil already works via Pointer Events
  (`pointerType: 'pen'`) — not yet using `event.pressure`, only stroke
  speed for the Ink Brush.
- `src/utils/audio.ts` + `src/components/PlayAudioButton.tsx` — playback
  helper (`playAudioUrl`) and an explicit button component. Auto-play is
  wired into: clicking a letter in Browse, flipping a flashcard to its
  answer side. Write mode has an explicit replay button (no natural
  "reveal" moment to hook into there).
- `public/audio/*.m4a` — 30 real recordings (contributed by the user),
  one per consonant, filenames matching `getAudioFileName()` (handles the
  a-chung `'a` vs a-chen `a` collision explicitly).
- `public/fonts/` — Qomolangma family (Ume: Betsu, Drutsa) via OpenPecha's
  tibetan-fonts repo. Uchen uses Google's Noto Serif Tibetan (switched
  from Qomolangma-UchenSarchen for legibility).

## Important non-obvious facts learned this project (don't re-derive)
- **ga, ja, da, ba are NOT pronounced as written** in spoken Central
  Tibetan — they're the aspirated low-tone versions of ka/ca/ta/pa (sound
  like kha/chha/tha/pha, distinguished only by tone). Already fixed in
  `letters.ts` `pronunciation` fields + explained in the tone legend UI.
  Source: https://tibetanlanguage.school/learn/standard-tibetan/unit-1/
- Tone classification (high/low) verified via web search against
  Tournadre's Central Tibetan register rules, not from memory alone.
- The `glyphOffsetEm` correction is an *average* across the 30 consonants
  per font — individual letters (especially cursive Drutsa) still vary;
  this is inherent, not a bug to chase further.
- CSS gotcha hit twice: `align-items: flex-start` on a flex row silently
  becomes the *horizontal* alignment once a mobile media query flips
  `flex-direction: column` — caused a real mobile layout bug, fixed with
  explicit `align-items: stretch` override in the breakpoint.
- `fr`-sized grid columns inside a `flex: 0 0 auto` (shrink-to-fit)
  container don't reliably size to a "normal" width — caused a squeezed-
  card bug, fixed with fixed pixel columns on desktop + fluid only in the
  mobile breakpoint where the container has a definite width.

## Deferred / roadmap (see docs/todo.md for full detail)
- Split site into **Study** (Flashcards/Quiz/Write single letters) vs.
  **Practice** (Read + a new sentence-level Write exercise) sections.
- Sentence tracing from the Heart Sutra — **ungraded**, self-assessed via
  the existing ghost-overlay technique, just wider than one glyph. User
  explicitly said no automated grading needed for this.
- Downloadable PDF of Heart Sutra sentences per script, for offline
  pen/pencil tracing.
- Apple Pencil `event.pressure` → brush width (currently unused).
- Stroke-order direction guides, sourced from native writers — could
  reuse the `/record` booth pattern (record the stroke *path* in order,
  replay as an animated guide instead of a static ghost).
- More languages for the i18n system (Bulgarian, German, Spanish,
  Italian were requested then explicitly deferred to "just Ukrainian for
  now").

## Environment quirks encountered (may or may not persist on new machine)
- Node is old (v19) relative to some packages' engine requirements —
  install commands work fine but print EBADENGINE warnings; harmless.
- The in-session browser preview tool (screenshot/click automation) was
  unavailable for the last two work sessions ("Chrome extension not
  connected") — verification fell back to `tsc -b`, `eslint`, and
  `npm run build`. Worth checking if it's available on the new machine;
  if so, resume visually verifying UI changes before considering them
  done, per this project's established practice.
- `git push` once failed with an HTTP 400 on a ~3MB push (audio files);
  fixed by `git config http.postBuffer 524288000` and retrying. Not
  necessarily a recurring issue, but if a large push fails oddly, try
  that first before assuming something is actually broken.
