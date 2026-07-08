import { heartSutraLines } from '../data/heartSutra';

interface Props {
  fontFamily: string;
}

export function Reading({ fontFamily }: Props) {
  return (
    <div className="reading">
      <h2 className="reading-title">The Heart Sutra</h2>
      <p className="reading-subtitle">
        བཅོམ་ལྡན་འདས་མ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་སྙིང་པོ
      </p>
      <div className="reading-lines">
        {heartSutraLines.map((line) => (
          <p key={line.id} className="reading-line" style={{ fontFamily }}>
            {line.tibetan}
          </p>
        ))}
      </div>
      <p className="reading-credit">
        Tibetan text: the traditional recension published by{' '}
        <a href="https://www.lotsawahouse.org/bo/words-of-the-buddha/heart-sutra-with-extras" target="_blank" rel="noreferrer">
          Lotsawa House
        </a>
        .
      </p>
    </div>
  );
}
