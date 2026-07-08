import { useEffect, useRef, useState } from 'react';
import { Letter } from '../data/letters';
import { scoreDrawing, ScoreResult } from '../utils/handwriting';

interface Props {
  letters: Letter[];
  fontFamily: string;
}

const CANVAS_SIZE = 300;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WritePractice({ letters, fontFamily }: Props) {
  const [order, setOrder] = useState(() => shuffle(letters));
  const [index, setIndex] = useState(0);
  const [showGhost, setShowGhost] = useState(true);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const current = order[index];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getPos(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    const last = lastPointRef.current ?? pos;
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPointRef.current = pos;
  };

  const endStroke = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    clearCanvas();
    setResult(null);
  };

  const handleCheck = () => {
    const canvas = canvasRef.current;
    if (!canvas || !current) return;
    const res = scoreDrawing(canvas, fontFamily, current.tibetan);
    setResult(res);
  };

  const goto = (newIndex: number) => {
    setIndex((newIndex + order.length) % order.length);
  };

  const restart = () => {
    setOrder(shuffle(letters));
    setIndex(0);
  };

  if (!current) return null;

  return (
    <div className="write-practice">
      <div className="write-progress">
        {index + 1} / {order.length} &middot; {current.wylie}
      </div>

      <div className="write-canvas-wrap">
        {showGhost && (
          <div className="write-ghost" style={{ fontFamily }}>
            {current.tibetan}
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="write-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          onPointerCancel={endStroke}
        />
      </div>

      <label className="write-ghost-toggle">
        <input type="checkbox" checked={showGhost} onChange={(e) => setShowGhost(e.target.checked)} />
        Show reference letter
      </label>

      <div className="write-controls">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleCheck}>Check</button>
        <button onClick={() => goto(index - 1)}>Prev</button>
        <button onClick={() => goto(index + 1)}>Next</button>
        <button onClick={restart}>Shuffle / Restart</button>
      </div>

      {result && (
        <div className={`write-result ${result.score >= 65 ? 'good' : 'low'}`}>
          <div className="write-score">{result.score}%</div>
          <ul>
            {result.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
