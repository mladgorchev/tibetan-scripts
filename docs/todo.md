# Roadmap / ideas for later

Not scheduled — captured here so they don't get lost.

## Study vs. Practice split
Divide the app into two top-level sections instead of one flat nav:
- **Study**: Flashcards, Quiz, Write (single letters) — the existing letter-learning tools.
- **Practice**: Read, and a new sentence-level Write exercise.

## Sentence tracing from the Heart Sutra (Practice)
Pull short phrases/sentences from the existing Heart Sutra data and let the
user trace them with the ghost-overlay technique already built for single
letters, just wider (a line of text instead of one glyph).
- No automated grading — self-assessment only (the person can see for
  themselves whether it matches). This avoids the hard problem of
  segmenting freehand cursive into individual letters for scoring.

## Downloadable PDF tracing sheets
Let users download a PDF of Heart Sutra sentences (per script — Uchen/Ume/
Drutsa) formatted for tracing offline with a real pen or pencil, not just
on-screen.

## Apple Pencil pressure sensitivity
Pointer Events already support Apple Pencil on iPad (shows up as
`pointerType: 'pen'`) — drawing already works today. Not yet used:
`event.pressure` to drive brush width, currently only the Ink Brush uses
stroke *speed*. Small upgrade, not a blocker.

## Stroke-order direction guides
Show the direction/order strokes are written in, per script. Needs native
speaker input to get right — don't guess, especially for Ume and Drutsa
where cursive stroke order is much less documented than Uchen.
Could reuse the `/record` audio booth pattern: a contributor page where a
native writer traces each letter stroke-by-stroke, and we replay that
recorded path as an animated guide instead of a static ghost.
