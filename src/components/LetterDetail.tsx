import { Letter } from '../data/letters';

interface Props {
  letter: Letter | null;
  fontFamily: string;
  glyphOffsetEm?: number;
}

export function LetterDetail({ letter, fontFamily, glyphOffsetEm = 0 }: Props) {
  if (!letter) {
    return (
      <div className="letter-detail empty">
        <p>
          <span className="detail-hint-desktop">Select a letter from the left to see it up close.</span>
          <span className="detail-hint-mobile">Select a letter below to see it up close.</span>
        </p>
      </div>
    );
  }

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
        <div className="letter-detail-pronunciation">pronounced "{letter.pronunciation}"</div>
      </div>
    </div>
  );
}
