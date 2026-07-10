import { useMemo, useState } from 'react';
import { Letter } from '../data/letters';

interface Props {
  letters: Letter[];
  fontFamily: string;
  glyphOffsetEm?: number;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeQuestion(letters: Letter[], target: Letter) {
  const distractors = shuffle(letters.filter((l) => l.id !== target.id)).slice(0, 3);
  return shuffle([target, ...distractors]);
}

export function Quiz({ letters, fontFamily, glyphOffsetEm = 0 }: Props) {
  const [order] = useState(() => shuffle(letters));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const current = order[index];
  const options = useMemo(
    () => (current ? makeQuestion(letters, current) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current?.id],
  );

  if (finished || !current) {
    return (
      <div className="quiz quiz-done">
        <h3>
          Score: {score} / {order.length}
        </h3>
        <button
          onClick={() => {
            setIndex(0);
            setScore(0);
            setAnswered(null);
            setFinished(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  const choose = (opt: Letter) => {
    if (answered) return;
    setAnswered(opt.id);
    if (opt.id === current.id) setScore((s) => s + 1);
    setTimeout(() => {
      setAnswered(null);
      if (index + 1 >= order.length) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 700);
  };

  return (
    <div className="quiz">
      <div className="quiz-progress">
        Question {index + 1} / {order.length} &middot; Score {score}
      </div>
      <div className="quiz-prompt">
        <span className="quiz-glyph" style={{ fontFamily, transform: `translateY(${glyphOffsetEm}em)` }}>
          {current.tibetan}
        </span>
        <p>What is this letter?</p>
      </div>
      <div className="quiz-options">
        {options.map((opt) => {
          const isCorrect = opt.id === current.id;
          const isChosen = answered === opt.id;
          const cls = answered
            ? isCorrect
              ? 'correct'
              : isChosen
              ? 'incorrect'
              : ''
            : '';
          return (
            <button key={opt.id} className={`quiz-option ${cls}`} onClick={() => choose(opt)}>
              {opt.wylie}
            </button>
          );
        })}
      </div>
    </div>
  );
}
