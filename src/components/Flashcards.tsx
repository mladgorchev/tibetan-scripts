import { useMemo, useState } from 'react';
import { Letter } from '../data/letters';

interface Props {
  letters: Letter[];
  fontFamily: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Flashcards({ letters, fontFamily }: Props) {
  const [order, setOrder] = useState(() => shuffle(letters));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = order[index];

  const restart = () => {
    setOrder(shuffle(letters));
    setIndex(0);
    setFlipped(false);
  };

  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % order.length);
  };

  const prev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + order.length) % order.length);
  };

  const progressLabel = useMemo(() => `${index + 1} / ${order.length}`, [index, order.length]);

  if (!current) return null;

  return (
    <div className="flashcards">
      <div className="flashcards-progress">{progressLabel}</div>
      <div className="flashcard" onClick={() => setFlipped((f) => !f)}>
        {!flipped ? (
          <span className="flashcard-glyph" style={{ fontFamily }}>
            {current.tibetan}
          </span>
        ) : (
          <div className="flashcard-answer">
            <div className="flashcard-wylie">{current.wylie}</div>
            <div className="flashcard-pronunciation">"{current.pronunciation}"</div>
          </div>
        )}
      </div>
      <p className="flashcard-hint">Click the card to flip it</p>
      <div className="flashcard-controls">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
        <button onClick={restart}>Shuffle / Restart</button>
      </div>
    </div>
  );
}
