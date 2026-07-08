export interface Letter {
  id: string;
  wylie: string;
  tibetan: string;
  pronunciation: string;
  group: 'consonant' | 'vowel' | 'number';
}

// The 30 root consonants (gsal byed sum cu)
export const consonants: Letter[] = [
  { id: 'ka', wylie: 'ka', tibetan: 'ཀ', pronunciation: 'ka', group: 'consonant' },
  { id: 'kha', wylie: 'kha', tibetan: 'ཁ', pronunciation: 'kha', group: 'consonant' },
  { id: 'ga', wylie: 'ga', tibetan: 'ག', pronunciation: 'ga', group: 'consonant' },
  { id: 'nga', wylie: 'nga', tibetan: 'ང', pronunciation: 'nga', group: 'consonant' },
  { id: 'ca', wylie: 'ca', tibetan: 'ཅ', pronunciation: 'cha', group: 'consonant' },
  { id: 'cha', wylie: 'cha', tibetan: 'ཆ', pronunciation: 'chha', group: 'consonant' },
  { id: 'ja', wylie: 'ja', tibetan: 'ཇ', pronunciation: 'ja', group: 'consonant' },
  { id: 'nya', wylie: 'nya', tibetan: 'ཉ', pronunciation: 'nya', group: 'consonant' },
  { id: 'ta', wylie: 'ta', tibetan: 'ཏ', pronunciation: 'ta', group: 'consonant' },
  { id: 'tha', wylie: 'tha', tibetan: 'ཐ', pronunciation: 'tha', group: 'consonant' },
  { id: 'da', wylie: 'da', tibetan: 'ད', pronunciation: 'da', group: 'consonant' },
  { id: 'na', wylie: 'na', tibetan: 'ན', pronunciation: 'na', group: 'consonant' },
  { id: 'pa', wylie: 'pa', tibetan: 'པ', pronunciation: 'pa', group: 'consonant' },
  { id: 'pha', wylie: 'pha', tibetan: 'ཕ', pronunciation: 'pha', group: 'consonant' },
  { id: 'ba', wylie: 'ba', tibetan: 'བ', pronunciation: 'ba', group: 'consonant' },
  { id: 'ma', wylie: 'ma', tibetan: 'མ', pronunciation: 'ma', group: 'consonant' },
  { id: 'tsa', wylie: 'tsa', tibetan: 'ཙ', pronunciation: 'tsa', group: 'consonant' },
  { id: 'tsha', wylie: 'tsha', tibetan: 'ཚ', pronunciation: 'tsha', group: 'consonant' },
  { id: 'dza', wylie: 'dza', tibetan: 'ཛ', pronunciation: 'dza', group: 'consonant' },
  { id: 'wa', wylie: 'wa', tibetan: 'ཝ', pronunciation: 'wa', group: 'consonant' },
  { id: 'zha', wylie: 'zha', tibetan: 'ཞ', pronunciation: 'zha', group: 'consonant' },
  { id: 'za', wylie: 'za', tibetan: 'ཟ', pronunciation: 'za', group: 'consonant' },
  { id: "'a", wylie: "'a", tibetan: 'འ', pronunciation: 'a (soft)', group: 'consonant' },
  { id: 'ya', wylie: 'ya', tibetan: 'ཡ', pronunciation: 'ya', group: 'consonant' },
  { id: 'ra', wylie: 'ra', tibetan: 'ར', pronunciation: 'ra', group: 'consonant' },
  { id: 'la', wylie: 'la', tibetan: 'ལ', pronunciation: 'la', group: 'consonant' },
  { id: 'sha', wylie: 'sha', tibetan: 'ཤ', pronunciation: 'sha', group: 'consonant' },
  { id: 'sa', wylie: 'sa', tibetan: 'ས', pronunciation: 'sa', group: 'consonant' },
  { id: 'ha', wylie: 'ha', tibetan: 'ཧ', pronunciation: 'ha', group: 'consonant' },
  { id: 'a', wylie: 'a', tibetan: 'ཨ', pronunciation: 'a', group: 'consonant' },
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
