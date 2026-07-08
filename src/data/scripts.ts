export type ScriptId = 'uchen' | 'ume' | 'gyugyik';

export interface ScriptInfo {
  id: ScriptId;
  name: string;
  tibetanName: string;
  fontFamily: string;
  description: string;
  authentic: boolean;
  fontCredit?: string;
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
  },
];

export const getScript = (id: ScriptId): ScriptInfo =>
  scripts.find((s) => s.id === id) ?? scripts[0];
