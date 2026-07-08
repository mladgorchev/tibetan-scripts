import { Letter } from '../data/letters';

interface Props {
  letter: Letter | null;
  fontFamily: string;
}

export function LetterDetail({ letter, fontFamily }: Props) {
  if (!letter) {
    return (
      <div className="letter-detail empty">
        <p>Select a letter above to see it up close.</p>
      </div>
    );
  }

  return (
    <div className="letter-detail">
      <div className="letter-detail-glyph" style={{ fontFamily }}>
        {letter.tibetan}
      </div>
      <div className="letter-detail-info">
        <div className="letter-detail-wylie">{letter.wylie}</div>
        <div className="letter-detail-pronunciation">pronounced "{letter.pronunciation}"</div>
      </div>
    </div>
  );
}
