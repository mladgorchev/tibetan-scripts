import { Letter } from '../data/letters';

interface Props {
  letters: Letter[];
  fontFamily: string;
  glyphOffsetEm?: number;
  onSelect: (letter: Letter) => void;
  selectedId?: string;
}

export function LetterGrid({ letters, fontFamily, glyphOffsetEm = 0, onSelect, selectedId }: Props) {
  return (
    <div className="letter-grid">
      {letters.map((l) => (
        <button
          key={l.id}
          className={`letter-card ${selectedId === l.id ? 'active' : ''}`}
          onClick={() => onSelect(l)}
        >
          <span
            className="letter-glyph"
            style={{ fontFamily, transform: `translateY(${glyphOffsetEm}em)` }}
          >
            {l.tibetan}
          </span>
          <span className="letter-wylie">{l.wylie}</span>
        </button>
      ))}
    </div>
  );
}
