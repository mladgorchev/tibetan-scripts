import { Letter } from '../data/letters';

interface Props {
  letters: Letter[];
  fontFamily: string;
  onSelect: (letter: Letter) => void;
  selectedId?: string;
}

export function LetterGrid({ letters, fontFamily, onSelect, selectedId }: Props) {
  return (
    <div className="letter-grid">
      {letters.map((l) => (
        <button
          key={l.id}
          className={`letter-card ${selectedId === l.id ? 'active' : ''}`}
          onClick={() => onSelect(l)}
        >
          <span className="letter-glyph" style={{ fontFamily }}>
            {l.tibetan}
          </span>
          <span className="letter-wylie">{l.wylie}</span>
        </button>
      ))}
    </div>
  );
}
