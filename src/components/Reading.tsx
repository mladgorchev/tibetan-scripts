import { heartSutraLines } from '../data/heartSutra';
import { Dictionary } from '../i18n/translations';

interface Props {
  fontFamily: string;
  t: Dictionary;
}

export function Reading({ fontFamily, t }: Props) {
  return (
    <div className="reading">
      <h2 className="reading-title">{t.readTitle}</h2>
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
        {t.readCreditPrefix}{' '}
        <a href="https://www.lotsawahouse.org/bo/words-of-the-buddha/heart-sutra-with-extras" target="_blank" rel="noreferrer">
          Lotsawa House
        </a>
        .
      </p>
    </div>
  );
}
