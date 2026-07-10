import { Letter } from '../data/letters';
import { Dictionary } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { getPronunciationHint } from '../data/pronunciationHints';

interface Props {
  letter: Letter | null;
  fontFamily: string;
  glyphOffsetEm?: number;
  t: Dictionary;
}

export function LetterDetail({ letter, fontFamily, glyphOffsetEm = 0, t }: Props) {
  const { language } = useLanguage();

  if (!letter) {
    return (
      <div className="letter-detail empty">
        <p>
          <span className="detail-hint-desktop">{t.letterDetailEmptyDesktop}</span>
          <span className="detail-hint-mobile">{t.letterDetailEmptyMobile}</span>
        </p>
      </div>
    );
  }

  const hint = getPronunciationHint(letter.id, language);

  return (
    <div className="letter-detail">
      <div
        className="letter-detail-glyph"
        style={{ fontFamily, transform: `translateY(${glyphOffsetEm}em)` }}
      >
        {letter.tibetan}
      </div>
      <div className="letter-detail-info">
        <div className="letter-detail-wylie">{letter.wylie}</div>
        <div className="letter-detail-pronunciation">{t.pronouncedLabel(letter.pronunciation)}</div>
        {hint && <div className="letter-detail-hint">{hint}</div>}
      </div>
    </div>
  );
}
