import { LanguageCode } from '../i18n/languages';

// Rough, approximate cross-language pronunciation comparisons for each of the
// 30 root consonants, keyed by letter id. These are learning aids, not
// phonetically rigorous IPA equivalences — Tibetan has several sounds
// (aspiration contrasts, the velar nasal nga, the soft glottal 'a) with no
// exact match in these languages, so the hints point to the closest everyday
// reference sound.
type HintsByLanguage = Partial<Record<LanguageCode, string>>;

const hints: Record<string, HintsByLanguage> = {
  ka: { uk: 'як "к" в "кіт" (без придиху)' },
  kha: { uk: 'як "к" з придихом, на початку слова "кіт", якщо різко видихнути' },
  ga: { uk: 'те саме, що kha, але низьким тоном' },
  nga: { uk: 'як "нг" у слові "танго" (носовий звук)' },
  ca: { uk: 'як "ч" у слові "час", але без придиху, ближче до "тьа"' },
  cha: { uk: 'як "ч" у слові "час", з чітким придихом' },
  ja: { uk: 'те саме, що cha, але низьким тоном' },
  nya: { uk: 'як "нь" у слові "коньяк"' },
  ta: { uk: 'як "т" у слові "тато" (без придиху, як в українській)' },
  tha: { uk: 'як "т" з сильним придихом' },
  da: { uk: 'те саме, що tha, але низьким тоном' },
  na: { uk: 'як звичайне українське "н"' },
  pa: { uk: 'як "п" у слові "пат" (без придиху)' },
  pha: { uk: 'як "п" з сильним придихом' },
  ba: { uk: 'те саме, що pha, але низьким тоном' },
  ma: { uk: 'як звичайне українське "м"' },
  tsa: { uk: 'як "ц" у слові "цар"' },
  tsha: { uk: 'як "ц" із додатковим придихом' },
  dza: { uk: 'як "дз" у слові "дзвін", низьким тоном' },
  wa: { uk: 'як англійське "w" у "water" — не як українське "в"' },
  zha: { uk: 'як "ж" у слові "жук"' },
  za: { uk: 'як "з" у слові "зима"' },
  "'a": { uk: 'дуже м\'який, придиховий початок голосного — майже без приголосного' },
  ya: { uk: 'як "й" у слові "йти"' },
  ra: { uk: 'українське розкотисте "р"' },
  la: { uk: 'як звичайне українське "л"' },
  sha: { uk: 'як "ш" у слові "шум"' },
  sa: { uk: 'як "с" у слові "сон"' },
  ha: { uk: 'як "г" (гортанне h) у слові "хата", легше й видихом' },
  a: { uk: 'як українське "а"' },
};

export function getPronunciationHint(letterId: string, language: LanguageCode): string | null {
  if (language === 'en') return null;
  return hints[letterId]?.[language] ?? null;
}
