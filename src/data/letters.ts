export interface Letter {
  id: string;
  wylie: string;
  tibetan: string;
  pronunciation: string;
  group: 'consonant' | 'vowel' | 'number';
  // Register/tone class in Central (Lhasa) Tibetan: root letters that were
  // historically voiceless induce high tone, those historically voiced or
  // sonorant induce low tone. nga/nya/na/ma/ya are "naturally" low here but
  // shift to high tone when preceded by a prefix letter.
  tone?: 'high' | 'low';
}

// The 30 root consonants (gsal byed sum cu)
export const consonants: Letter[] = [
  { id: 'ka', wylie: 'ka', tibetan: 'ཀ', pronunciation: 'ka', group: 'consonant', tone: 'high' },
  { id: 'kha', wylie: 'kha', tibetan: 'ཁ', pronunciation: 'kha', group: 'consonant', tone: 'high' },
  { id: 'ga', wylie: 'ga', tibetan: 'ག', pronunciation: 'ga', group: 'consonant', tone: 'low' },
  { id: 'nga', wylie: 'nga', tibetan: 'ང', pronunciation: 'nga', group: 'consonant', tone: 'low' },
  { id: 'ca', wylie: 'ca', tibetan: 'ཅ', pronunciation: 'cha', group: 'consonant', tone: 'high' },
  { id: 'cha', wylie: 'cha', tibetan: 'ཆ', pronunciation: 'chha', group: 'consonant', tone: 'high' },
  { id: 'ja', wylie: 'ja', tibetan: 'ཇ', pronunciation: 'ja', group: 'consonant', tone: 'low' },
  { id: 'nya', wylie: 'nya', tibetan: 'ཉ', pronunciation: 'nya', group: 'consonant', tone: 'low' },
  { id: 'ta', wylie: 'ta', tibetan: 'ཏ', pronunciation: 'ta', group: 'consonant', tone: 'high' },
  { id: 'tha', wylie: 'tha', tibetan: 'ཐ', pronunciation: 'tha', group: 'consonant', tone: 'high' },
  { id: 'da', wylie: 'da', tibetan: 'ད', pronunciation: 'da', group: 'consonant', tone: 'low' },
  { id: 'na', wylie: 'na', tibetan: 'ན', pronunciation: 'na', group: 'consonant', tone: 'low' },
  { id: 'pa', wylie: 'pa', tibetan: 'པ', pronunciation: 'pa', group: 'consonant', tone: 'high' },
  { id: 'pha', wylie: 'pha', tibetan: 'ཕ', pronunciation: 'pha', group: 'consonant', tone: 'high' },
  { id: 'ba', wylie: 'ba', tibetan: 'བ', pronunciation: 'ba', group: 'consonant', tone: 'low' },
  { id: 'ma', wylie: 'ma', tibetan: 'མ', pronunciation: 'ma', group: 'consonant', tone: 'low' },
  { id: 'tsa', wylie: 'tsa', tibetan: 'ཙ', pronunciation: 'tsa', group: 'consonant', tone: 'high' },
  { id: 'tsha', wylie: 'tsha', tibetan: 'ཚ', pronunciation: 'tsha', group: 'consonant', tone: 'high' },
  { id: 'dza', wylie: 'dza', tibetan: 'ཛ', pronunciation: 'dza', group: 'consonant', tone: 'low' },
  { id: 'wa', wylie: 'wa', tibetan: 'ཝ', pronunciation: 'wa', group: 'consonant', tone: 'low' },
  { id: 'zha', wylie: 'zha', tibetan: 'ཞ', pronunciation: 'zha', group: 'consonant', tone: 'low' },
  { id: 'za', wylie: 'za', tibetan: 'ཟ', pronunciation: 'za', group: 'consonant', tone: 'low' },
  { id: "'a", wylie: "'a", tibetan: 'འ', pronunciation: 'a (soft)', group: 'consonant', tone: 'low' },
  { id: 'ya', wylie: 'ya', tibetan: 'ཡ', pronunciation: 'ya', group: 'consonant', tone: 'low' },
  { id: 'ra', wylie: 'ra', tibetan: 'ར', pronunciation: 'ra', group: 'consonant', tone: 'low' },
  { id: 'la', wylie: 'la', tibetan: 'ལ', pronunciation: 'la', group: 'consonant', tone: 'low' },
  { id: 'sha', wylie: 'sha', tibetan: 'ཤ', pronunciation: 'sha', group: 'consonant', tone: 'high' },
  { id: 'sa', wylie: 'sa', tibetan: 'ས', pronunciation: 'sa', group: 'consonant', tone: 'high' },
  { id: 'ha', wylie: 'ha', tibetan: 'ཧ', pronunciation: 'ha', group: 'consonant', tone: 'high' },
  { id: 'a', wylie: 'a', tibetan: 'ཨ', pronunciation: 'a', group: 'consonant', tone: 'high' },
];

// The traditional 8-row layout used to teach the alphabet (the "ka-kha-ga-
// nga" song), grouped by place/manner of articulation. Matches the order
// `consonants` is already defined in above.
export interface ConsonantRow {
  label: string;
  ids: string[];
}

export const consonantRows: ConsonantRow[] = [
  { label: 'Guttural', ids: ['ka', 'kha', 'ga', 'nga'] },
  { label: 'Palatal', ids: ['ca', 'cha', 'ja', 'nya'] },
  { label: 'Dental', ids: ['ta', 'tha', 'da', 'na'] },
  { label: 'Labial', ids: ['pa', 'pha', 'ba', 'ma'] },
  { label: 'Dental affricate', ids: ['tsa', 'tsha', 'dza', 'wa'] },
  { label: 'Palatal fricative', ids: ['zha', 'za', "'a", 'ya'] },
  { label: 'Liquid & sibilant', ids: ['ra', 'la', 'sha', 'sa'] },
  { label: 'Glottal', ids: ['ha', 'a'] },
];

// The four vowel signs (dbyangs bzhi), shown attached to the base letter ཀ
export const vowels: Letter[] = [
  { id: 'vowel-a', wylie: 'a (inherent)', tibetan: 'ཀ', pronunciation: 'a', group: 'vowel' },
  { id: 'vowel-i', wylie: 'i', tibetan: 'ཀི', pronunciation: 'i', group: 'vowel' },
  { id: 'vowel-u', wylie: 'u', tibetan: 'ཀུ', pronunciation: 'u', group: 'vowel' },
  { id: 'vowel-e', wylie: 'e', tibetan: 'ཀེ', pronunciation: 'e', group: 'vowel' },
  { id: 'vowel-o', wylie: 'o', tibetan: 'ཀོ', pronunciation: 'o', group: 'vowel' },
];

export const numbers: Letter[] = [
  { id: 'num-0', wylie: '0', tibetan: '༠', pronunciation: 'zero', group: 'number' },
  { id: 'num-1', wylie: '1', tibetan: '༡', pronunciation: 'one', group: 'number' },
  { id: 'num-2', wylie: '2', tibetan: '༢', pronunciation: 'two', group: 'number' },
  { id: 'num-3', wylie: '3', tibetan: '༣', pronunciation: 'three', group: 'number' },
  { id: 'num-4', wylie: '4', tibetan: '༤', pronunciation: 'four', group: 'number' },
  { id: 'num-5', wylie: '5', tibetan: '༥', pronunciation: 'five', group: 'number' },
  { id: 'num-6', wylie: '6', tibetan: '༦', pronunciation: 'six', group: 'number' },
  { id: 'num-7', wylie: '7', tibetan: '༧', pronunciation: 'seven', group: 'number' },
  { id: 'num-8', wylie: '8', tibetan: '༨', pronunciation: 'eight', group: 'number' },
  { id: 'num-9', wylie: '9', tibetan: '༩', pronunciation: 'nine', group: 'number' },
];

export const allLetters: Letter[] = [...consonants, ...vowels, ...numbers];

// Filesystem-safe, unique filename stem for each letter's audio recording.
// The 23rd consonant (id "'a", a-chung) and the 30th (id 'a', a-chen) would
// otherwise both sanitize to "a" once the apostrophe is stripped.
export function getAudioFileName(letter: Letter): string {
  if (letter.id === "'a") return 'a-chung';
  if (letter.id === 'a') return 'a-chen';
  return letter.id.replace(/[^a-z0-9-]/gi, '');
}
