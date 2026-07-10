export type ScriptId = 'uchen' | 'ume' | 'gyugyik';

export interface ScriptInfo {
  id: ScriptId;
  name: string;
  tibetanName: string;
  fontFamily: string;
  description: string;
  authentic: boolean;
  fontCredit?: string;
  // Vertical correction (in em, relative to the glyph's own font-size) applied
  // when a glyph is centered in a flex box. These fonts' internal ascent/descent
  // metrics reserve room for stacked vowel signs and subjoined consonants that a
  // lone letter doesn't use, so naive flexbox centering renders letters too high.
  // Value is the average optical-centering correction across the 30 consonants —
  // individual letters (especially in the cursive Drutsa font) will still vary.
  glyphOffsetEm: number;
}

export const scripts: ScriptInfo[] = [
  {
    id: 'uchen',
    name: 'Uchen',
    tibetanName: 'དབུ་ཅན།',
    fontFamily: "'Noto Serif Tibetan', 'Qomolangma-UchenSarchen', serif",
    description:
      'The formal, "headed" printed script. Used in books, scripture, and formal signage. This is the easiest script to start with and the foundation for reading the other two.',
    authentic: true,
    fontCredit: 'Noto Serif Tibetan',
    glyphOffsetEm: 0.236,
  },
  {
    id: 'ume',
    name: 'Ume',
    tibetanName: 'དབུ་མེད།',
    fontFamily: "'Qomolangma-Betsu', 'Noto Sans Tibetan', sans-serif",
    description:
      'The "headless" cursive script used for everyday handwriting and many handwritten manuscripts. Letters lose the horizontal head-stroke of Uchen and connect more fluidly.',
    authentic: true,
    fontCredit: 'Qomolangma-Betsu',
    glyphOffsetEm: 0.045,
  },
  {
    id: 'gyugyik',
    name: 'Gyug Yik (Drutsa)',
    tibetanName: 'འཁྱུག་ཡིག',
    fontFamily: "'Qomolangma-Drutsa', 'Noto Sans Tibetan', sans-serif",
    description:
      'A fast, flowing cursive style ("running script") used for quick notes, letters, and administrative documents. The most abbreviated and stylized of the three.',
    authentic: true,
    fontCredit: 'Qomolangma-Drutsa',
    glyphOffsetEm: 0.034,
  },
];

export const getScript = (id: ScriptId): ScriptInfo =>
  scripts.find((s) => s.id === id) ?? scripts[0];
