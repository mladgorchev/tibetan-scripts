import { ScriptId } from '../data/scripts';
import { LanguageCode } from './languages';

export interface Dictionary {
  appTitle: string;
  scriptDescriptions: Record<ScriptId, string>;
  renderedWithFont: (font: string) => string;

  navBrowse: string;
  navFlashcards: string;
  navQuiz: string;
  navWrite: string;
  navRead: string;

  filterConsonants: (count: number) => string;
  filterVowels: string;
  filterNumbers: string;

  rowLabels: Record<string, string>;

  toneLegendIntro: string;
  toneHigh: string;
  toneLow: string;
  toneLegendNoteNasals: string;
  toneLegendNoteVoiced: string;

  letterDetailEmptyDesktop: string;
  letterDetailEmptyMobile: string;
  pronouncedLabel: (pronunciation: string) => string;

  flashcardProgress: (i: number, n: number) => string;
  flashcardHint: string;
  prev: string;
  next: string;
  shuffleRestart: string;

  quizProgress: (i: number, n: number, score: number) => string;
  quizQuestion: string;
  quizScoreFinal: (score: number, total: number) => string;
  tryAgain: string;

  writeProgress: (i: number, n: number, wylie: string) => string;
  brushBamboo: string;
  brushInk: string;
  brushReed: string;
  showReferenceLetter: string;
  clear: string;
  check: string;
  writeHintGreat: string;
  writeHintGood: string;
  writeHintKeepPracticing: string;
  writeHintBigger: string;
  writeHintSmaller: string;
  writeHintShiftLeft: string;
  writeHintShiftRight: string;
  writeHintShiftUp: string;
  writeHintShiftDown: string;
  writeHintDrawFirst: string;

  readTitle: string;
  readCreditPrefix: string;

  footerPrefix: string;
  footerSuffix: string;
}

const en: Dictionary = {
  appTitle: 'Learn Tibetan Scripts',
  scriptDescriptions: {
    uchen:
      'The formal, "headed" printed script. Used in books, scripture, and formal signage. This is the easiest script to start with and the foundation for reading the other two.',
    ume: 'The "headless" cursive script used for everyday handwriting and many handwritten manuscripts. Letters lose the horizontal head-stroke of Uchen and connect more fluidly.',
    gyugyik:
      'A fast, flowing cursive style ("running script") used for quick notes, letters, and administrative documents. The most abbreviated and stylized of the three.',
  },
  renderedWithFont: (font) => `Rendered with the ${font} font.`,

  navBrowse: 'Browse',
  navFlashcards: 'Flashcards',
  navQuiz: 'Quiz',
  navWrite: 'Write',
  navRead: 'Read',

  filterConsonants: (count) => `Consonants (${count})`,
  filterVowels: 'Vowels',
  filterNumbers: 'Numbers',

  rowLabels: {
    Guttural: 'Guttural',
    Palatal: 'Palatal',
    Dental: 'Dental',
    Labial: 'Labial',
    'Dental affricate': 'Dental affricate',
    'Palatal fricative': 'Palatal fricative',
    'Liquid & sibilant': 'Liquid & sibilant',
    Glottal: 'Glottal',
  },

  toneLegendIntro: 'Laid out in the traditional 8 rows by place of articulation.',
  toneHigh: 'High tone',
  toneLow: 'Low tone',
  toneLegendNoteNasals:
    'nga, nya, na, ma and ya are naturally low tone but shift to high tone when preceded by a prefix letter.',
  toneLegendNoteVoiced:
    'ga, ja, da and ba are no longer pronounced as voiced consonants in spoken Central Tibetan — they sound like the aspirated, low-tone versions of ka/ca/ta/pa (i.e. kha, chha, tha, pha), distinguished from kha/chha/tha/pha only by tone, not sound.',

  letterDetailEmptyDesktop: 'Select a letter from the left to see it up close.',
  letterDetailEmptyMobile: 'Select a letter below to see it up close.',
  pronouncedLabel: (p) => `pronounced "${p}"`,

  flashcardProgress: (i, n) => `${i} / ${n}`,
  flashcardHint: 'Click the card to flip it',
  prev: 'Prev',
  next: 'Next',
  shuffleRestart: 'Shuffle / Restart',

  quizProgress: (i, n, score) => `Question ${i} / ${n} · Score ${score}`,
  quizQuestion: 'What is this letter?',
  quizScoreFinal: (score, total) => `Score: ${score} / ${total}`,
  tryAgain: 'Try again',

  writeProgress: (i, n, wylie) => `${i} / ${n} · ${wylie}`,
  brushBamboo: 'Bamboo Pen',
  brushInk: 'Ink Brush',
  brushReed: 'Fine Reed Pen',
  showReferenceLetter: 'Show reference letter',
  clear: 'Clear',
  check: 'Check',
  writeHintGreat: 'Great shape!',
  writeHintGood: 'Good — close to the reference shape.',
  writeHintKeepPracticing: 'Keep practicing this one.',
  writeHintBigger: 'Try drawing it a bit bigger.',
  writeHintSmaller: 'Try drawing it a bit smaller.',
  writeHintShiftLeft: 'Shift it to the left.',
  writeHintShiftRight: 'Shift it to the right.',
  writeHintShiftUp: 'Shift it up.',
  writeHintShiftDown: 'Shift it down.',
  writeHintDrawFirst: 'Draw the letter in the box first.',

  readTitle: 'The Heart Sutra',
  readCreditPrefix: 'Tibetan text: the traditional recension published by',

  footerPrefix: 'Uchen: Noto Serif Tibetan (Google Fonts). Ume & Drutsa: Qomolangma family (Yalasoo), via the',
  footerSuffix: 'collection.',
};

const uk: Dictionary = {
  appTitle: 'Вивчайте тибетську писемність',
  scriptDescriptions: {
    uchen:
      'Формальне, «головате» друковане письмо. Використовується в книгах, священних текстах та офіційних написах. Це найлегше письмо для початку вивчення і основа для читання двох інших.',
    ume: 'Курсивне «безголове» письмо, яке використовується у повсякденному письмі та багатьох рукописах. Літери втрачають горизонтальну верхню риску Учена і з\'єднуються плавніше.',
    gyugyik:
      'Швидкий, плинний курсивний стиль («скорописне письмо»), який використовується для нотаток, листів та адміністративних документів. Найбільш скорочений і стилізований з трьох.',
  },
  renderedWithFont: (font) => `Відображено шрифтом ${font}.`,

  navBrowse: 'Огляд',
  navFlashcards: 'Картки',
  navQuiz: 'Вікторина',
  navWrite: 'Письмо',
  navRead: 'Читання',

  filterConsonants: (count) => `Приголосні (${count})`,
  filterVowels: 'Голосні',
  filterNumbers: 'Числа',

  rowLabels: {
    Guttural: 'Гортанні',
    Palatal: 'Піднебінні',
    Dental: 'Зубні',
    Labial: 'Губні',
    'Dental affricate': 'Зубні африкати',
    'Palatal fricative': 'Піднебінні фрикативні',
    'Liquid & sibilant': 'Плавні та шиплячі',
    Glottal: 'Гортанні (глоткові)',
  },

  toneLegendIntro: 'Розташовано у традиційних 8 рядках за місцем артикуляції.',
  toneHigh: 'Високий тон',
  toneLow: 'Низький тон',
  toneLegendNoteNasals:
    'nga, nya, na, ma та ya за природою мають низький тон, але переходять у високий тон, коли перед ними стоїть префіксальна літера.',
  toneLegendNoteVoiced:
    'ga, ja, da та ba більше не вимовляються як дзвінкі приголосні в розмовній центральнотибетській мові — вони звучать як придихові, низькотональні версії ka/ca/ta/pa (тобто kha, chha, tha, pha), відрізняючись від kha/chha/tha/pha лише тоном, а не звуком.',

  letterDetailEmptyDesktop: 'Виберіть літеру зліва, щоб роздивитися її зблизька.',
  letterDetailEmptyMobile: 'Виберіть літеру нижче, щоб роздивитися її зблизька.',
  pronouncedLabel: (p) => `вимовляється як «${p}»`,

  flashcardProgress: (i, n) => `${i} / ${n}`,
  flashcardHint: 'Натисніть на картку, щоб перевернути її',
  prev: 'Назад',
  next: 'Далі',
  shuffleRestart: 'Перемішати / Почати заново',

  quizProgress: (i, n, score) => `Питання ${i} / ${n} · Рахунок ${score}`,
  quizQuestion: 'Що це за літера?',
  quizScoreFinal: (score, total) => `Рахунок: ${score} / ${total}`,
  tryAgain: 'Спробувати ще раз',

  writeProgress: (i, n, wylie) => `${i} / ${n} · ${wylie}`,
  brushBamboo: 'Бамбукове перо',
  brushInk: 'Чорнильний пензель',
  brushReed: 'Тонке очеретяне перо',
  showReferenceLetter: 'Показати зразок літери',
  clear: 'Очистити',
  check: 'Перевірити',
  writeHintGreat: 'Чудова форма!',
  writeHintGood: 'Добре — близько до зразка.',
  writeHintKeepPracticing: 'Продовжуйте тренувати цю літеру.',
  writeHintBigger: 'Спробуйте намалювати трохи більше.',
  writeHintSmaller: 'Спробуйте намалювати трохи менше.',
  writeHintShiftLeft: 'Зсуньте вліво.',
  writeHintShiftRight: 'Зсуньте вправо.',
  writeHintShiftUp: 'Зсуньте вгору.',
  writeHintShiftDown: 'Зсуньте вниз.',
  writeHintDrawFirst: 'Спочатку намалюйте літеру в рамці.',

  readTitle: 'Сутра Серця',
  readCreditPrefix: 'Тибетський текст: традиційна редакція, опублікована',

  footerPrefix: 'Учен: Noto Serif Tibetan (Google Fonts). Уме та Друца: родина шрифтів Qomolangma (Yalasoo), через',
  footerSuffix: 'колекцію.',
};

export const translations: Record<LanguageCode, Dictionary> = { en, uk };
