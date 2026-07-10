import { useEffect, useRef, useState } from 'react';
import { Letter } from '../data/letters';
import { scoreDrawing, ScoreResult } from '../utils/handwriting';

interface Props {
  letters: Letter[];
  fontFamily: string;
  glyphOffsetEm?: number;
}

const CANVAS_SIZE = 300;
const INK_COLOR = '#211509';

type BrushId = 'bamboo' | 'reed' | 'brush';

interface ChiselBrushConfig {
  kind: 'chisel';
  label: string;
  angleDeg: number;
  length: number;
  minFactor: number;
  taperDistance: number;
}

interface RoundBrushConfig {
  kind: 'round';
  label: string;
  minWidth: number;
  maxWidth: number;
  taperDistance: number;
  speedSensitivity: number;
  minSpeedFactor: number;
}

type BrushConfig = ChiselBrushConfig | RoundBrushConfig;

// Three tools, two real techniques. Bamboo Pen and Fine Reed Pen are both
// a chisel-edge nib swept at a fixed angle — ink comes out thick or thin
// depending on travel direction, like a real cut bamboo/reed pen (broad
// cut for Uchen, narrower sharper cut historically used for fast Ume/
// Drutsa cursive). Ink Brush is a softer, isotropic brush whose width
// responds to stroke speed instead of direction — closer to how a paint
// brush behaves, offered as a stylistic option rather than a historically
// documented tool for these scripts.
const BRUSHES: Record<BrushId, BrushConfig> = {
  bamboo: {
    kind: 'chisel',
    label: 'Bamboo Pen',
    angleDeg: -12,
    length: 17,
    minFactor: 0.28,
    taperDistance: 26,
  },
  reed: {
    kind: 'chisel',
    label: 'Fine Reed Pen',
    angleDeg: -25,
    length: 9,
    minFactor: 0.22,
    taperDistance: 14,
  },
  brush: {
    kind: 'round',
    label: 'Ink Brush',
    minWidth: 3,
    maxWidth: 15,
    taperDistance: 18,
    speedSensitivity: 0.55,
    minSpeedFactor: 0.25,
  },
};

const BRUSH_ORDER: BrushId[] = ['bamboo', 'brush', 'reed'];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WritePractice({ letters, fontFamily, glyphOffsetEm = 0 }: Props) {
  const [order, setOrder] = useState(() => shuffle(letters));
  const [index, setIndex] = useState(0);
  const [showGhost, setShowGhost] = useState(true);
  const [brushId, setBrushId] = useState<BrushId>('bamboo');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeDistanceRef = useRef(0);
  const lastMetricRef = useRef(0);
  const lastTimeRef = useRef(0);
  const brushRef = useRef<BrushConfig>(BRUSHES[brushId]);

  brushRef.current = BRUSHES[brushId];

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
    const pos = getPos(e);
    lastPointRef.current = pos;
    strokeDistanceRef.current = 0;
    lastTimeRef.current = e.timeStamp;

    const cfg = brushRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = INK_COLOR;

    if (cfg.kind === 'chisel') {
      lastMetricRef.current = cfg.minFactor;
      const half = (cfg.length * cfg.minFactor) / 2;
      const angle = (cfg.angleDeg * Math.PI) / 180;
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, half, half * 0.7, angle, 0, Math.PI * 2);
      ctx.fill();
    } else {
      lastMetricRef.current = cfg.minWidth * 0.3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, cfg.minWidth * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    const last = lastPointRef.current ?? pos;
    const cfg = brushRef.current;

    const segmentLength = Math.hypot(pos.x - last.x, pos.y - last.y);
    if (segmentLength < 0.5) return;

    const dt = Math.max(1, e.timeStamp - lastTimeRef.current);
    lastTimeRef.current = e.timeStamp;
    strokeDistanceRef.current += segmentLength;
    const taperFactor = Math.min(1, strokeDistanceRef.current / cfg.taperDistance);

    ctx.fillStyle = INK_COLOR;

    if (cfg.kind === 'chisel') {
      const factor = cfg.minFactor + (1 - cfg.minFactor) * taperFactor;
      const angle = (cfg.angleDeg * Math.PI) / 180;
      const vec = { x: Math.cos(angle), y: Math.sin(angle) };
      const halfStart = (cfg.length * lastMetricRef.current) / 2;
      const halfEnd = (cfg.length * factor) / 2;

      ctx.beginPath();
      ctx.moveTo(last.x + vec.x * halfStart, last.y + vec.y * halfStart);
      ctx.lineTo(pos.x + vec.x * halfEnd, pos.y + vec.y * halfEnd);
      ctx.lineTo(pos.x - vec.x * halfEnd, pos.y - vec.y * halfEnd);
      ctx.lineTo(last.x - vec.x * halfStart, last.y - vec.y * halfStart);
      ctx.closePath();
      ctx.fill();

      lastMetricRef.current = factor;
    } else {
      const speed = segmentLength / dt; // px per ms
      const speedFactor = Math.min(1, Math.max(cfg.minSpeedFactor, 1 - speed * cfg.speedSensitivity));
      const factor = taperFactor * speedFactor;
      const widthEnd = cfg.minWidth + (cfg.maxWidth - cfg.minWidth) * factor;
      const widthStart = lastMetricRef.current;

      const steps = Math.max(1, Math.ceil(segmentLength / 2));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const r = (widthStart + (widthEnd - widthStart) * t) / 2;
        const x = last.x + (pos.x - last.x) * t;
        const y = last.y + (pos.y - last.y) * t;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      lastMetricRef.current = widthEnd;
    }

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

      <div className="brush-selector">
        {BRUSH_ORDER.map((id) => (
          <button
            key={id}
            className={brushId === id ? 'active' : ''}
            onClick={() => setBrushId(id)}
          >
            {BRUSHES[id].label}
          </button>
        ))}
      </div>

      <div className="write-canvas-wrap">
        {showGhost && (
          <div
            className="write-ghost"
            style={{ fontFamily, transform: `translateY(${glyphOffsetEm}em)` }}
          >
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
