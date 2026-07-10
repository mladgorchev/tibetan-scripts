import { ConsonantRow, Letter } from '../data/letters';

interface Props {
  letters: Letter[];
  fontFamily: string;
  glyphOffsetEm?: number;
  onSelect: (letter: Letter) => void;
  selectedId?: string;
  rows?: ConsonantRow[];
}

function LetterCard({
  letter,
  fontFamily,
  glyphOffsetEm,
  active,
  onSelect,
}: {
  letter: Letter;
  fontFamily: string;
  glyphOffsetEm: number;
  active: boolean;
  onSelect: (letter: Letter) => void;
}) {
  return (
    <button className={`letter-card ${active ? 'active' : ''}`} onClick={() => onSelect(letter)}>
      {letter.tone && <span className={`letter-tone letter-tone-${letter.tone}`}>{letter.tone === 'high' ? 'H' : 'L'}</span>}
      <span
        className="letter-glyph"
        style={{ fontFamily, transform: `translateY(${glyphOffsetEm}em)` }}
      >
        {letter.tibetan}
      </span>
      <span className="letter-wylie">{letter.wylie}</span>
    </button>
  );
}

export function LetterGrid({ letters, fontFamily, glyphOffsetEm = 0, onSelect, selectedId, rows }: Props) {
  if (rows) {
    const byId = new Map(letters.map((l) => [l.id, l]));
    return (
      <div className="letter-rows">
        {rows.map((row) => {
          const rowLetters = row.ids.map((id) => byId.get(id)).filter((l): l is Letter => !!l);
          if (rowLetters.length === 0) return null;
          return (
            <div key={row.label} className="letter-row">
              <div className="letter-row-label">{row.label}</div>
              <div className="letter-row-cards">
                {rowLetters.map((l) => (
                  <LetterCard
                    key={l.id}
                    letter={l}
                    fontFamily={fontFamily}
                    glyphOffsetEm={glyphOffsetEm}
                    active={selectedId === l.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="letter-grid">
      {letters.map((l) => (
        <LetterCard
          key={l.id}
          letter={l}
          fontFamily={fontFamily}
          glyphOffsetEm={glyphOffsetEm}
          active={selectedId === l.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
