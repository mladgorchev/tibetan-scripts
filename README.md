# Learn Tibetan Scripts

A small React + TypeScript app for learning the three main Tibetan scripts:

- **Uchen** (དབུ་ཅན།) — the formal, "headed" printed script
- **Ume** (དབུ་མེད།) — the "headless" cursive handwriting script
- **Gyug Yik / Drutsa** (འཁྱུག་ཡིག) — the fast, flowing running script

## Features

- Browse the 30 root consonants, the 4 vowel signs, and numerals in any of the three scripts
- Flashcard practice mode
- Multiple-choice quiz mode

## Fonts

Letters are rendered with the Qomolangma font family (Yalasoo), sourced from the
[OpenPecha tibetan-fonts](https://github.com/OpenPecha/tibetan-fonts) collection:

- Uchen: `Qomolangma-UchenSarchen`
- Ume: `Qomolangma-Betsu`
- Gyug Yik / Drutsa: `Qomolangma-Drutsa`

Font files live in `public/fonts/`.

## Development

```bash
npm install
npm run dev
```
