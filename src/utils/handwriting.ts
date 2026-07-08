export interface ScoreResult {
  score: number;
  coverage: number;
  precision: number;
  hints: string[];
}

function getAlphaMask(imageData: ImageData, threshold: number): Uint8Array {
  const mask = new Uint8Array(imageData.width * imageData.height);
  const d = imageData.data;
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    mask[p] = d[i + 3] > threshold ? 1 : 0;
  }
  return mask;
}

interface MaskStats {
  count: number;
  centroid: { x: number; y: number };
  bbox: { minX: number; minY: number; maxX: number; maxY: number; w: number; h: number };
}

function maskStats(mask: Uint8Array, width: number, height: number): MaskStats | null {
  let count = 0;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let sumX = 0;
  let sumY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x]) {
        count++;
        sumX += x;
        sumY += y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (count === 0) return null;
  return {
    count,
    centroid: { x: sumX / count, y: sumY / count },
    bbox: { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY },
  };
}

function renderGlyphMasks(fontFamily: string, glyph: string, size: number) {
  const blurRadius = Math.max(4, Math.floor(size * 0.03));

  const strictCanvas = document.createElement('canvas');
  strictCanvas.width = size;
  strictCanvas.height = size;
  const sctx = strictCanvas.getContext('2d')!;
  sctx.fillStyle = '#000';
  sctx.textAlign = 'center';
  sctx.textBaseline = 'middle';
  sctx.font = `${Math.floor(size * 0.72)}px ${fontFamily}`;
  sctx.fillText(glyph, size / 2, size / 2 + size * 0.02);
  const strictMask = getAlphaMask(sctx.getImageData(0, 0, size, size), 40);

  const blurCanvas = document.createElement('canvas');
  blurCanvas.width = size;
  blurCanvas.height = size;
  const bctx = blurCanvas.getContext('2d')!;
  bctx.filter = `blur(${blurRadius}px)`;
  bctx.fillStyle = '#000';
  bctx.textAlign = 'center';
  bctx.textBaseline = 'middle';
  bctx.font = `${Math.floor(size * 0.72)}px ${fontFamily}`;
  bctx.fillText(glyph, size / 2, size / 2 + size * 0.02);
  const blurMask = getAlphaMask(bctx.getImageData(0, 0, size, size), 10);

  return { strictMask, blurMask };
}

export function scoreDrawing(
  userCanvas: HTMLCanvasElement,
  fontFamily: string,
  glyph: string,
): ScoreResult {
  const size = userCanvas.width;
  const blurRadius = Math.max(4, Math.floor(size * 0.03));
  const uctx = userCanvas.getContext('2d')!;
  const userStrict = getAlphaMask(uctx.getImageData(0, 0, size, size), 40);

  const userBlurCanvas = document.createElement('canvas');
  userBlurCanvas.width = size;
  userBlurCanvas.height = size;
  const ubctx = userBlurCanvas.getContext('2d')!;
  ubctx.filter = `blur(${blurRadius}px)`;
  ubctx.drawImage(userCanvas, 0, 0);
  const userBlur = getAlphaMask(ubctx.getImageData(0, 0, size, size), 10);

  const { strictMask: refStrict, blurMask: refBlur } = renderGlyphMasks(fontFamily, glyph, size);

  const refStats = maskStats(refStrict, size, size);
  const userStats = maskStats(userStrict, size, size);

  if (!userStats || !refStats) {
    return { score: 0, coverage: 0, precision: 0, hints: ['Draw the letter in the box first.'] };
  }

  let coverageMatches = 0;
  for (let i = 0; i < refStrict.length; i++) if (refStrict[i] && userBlur[i]) coverageMatches++;
  const coverage = coverageMatches / refStats.count;

  let precisionMatches = 0;
  for (let i = 0; i < userStrict.length; i++) if (userStrict[i] && refBlur[i]) precisionMatches++;
  const precision = precisionMatches / userStats.count;

  const score = Math.round(100 * (0.6 * coverage + 0.4 * precision));

  const hints: string[] = [];
  const refW = refStats.bbox.w || 1;
  const refH = refStats.bbox.h || 1;
  const userW = userStats.bbox.w || 1;
  const userH = userStats.bbox.h || 1;
  const sizeRatio = (userW / refW + userH / refH) / 2;
  if (sizeRatio < 0.7) hints.push('Try drawing it a bit bigger.');
  else if (sizeRatio > 1.4) hints.push('Try drawing it a bit smaller.');

  const dx = (userStats.centroid.x - refStats.centroid.x) / size;
  const dy = (userStats.centroid.y - refStats.centroid.y) / size;
  if (Math.abs(dx) > 0.08) hints.push(dx > 0 ? 'Shift it to the left.' : 'Shift it to the right.');
  if (Math.abs(dy) > 0.08) hints.push(dy > 0 ? 'Shift it up.' : 'Shift it down.');

  if (score >= 85) hints.unshift('Great shape!');
  else if (score >= 65) hints.unshift('Good — close to the reference shape.');
  else hints.unshift('Keep practicing this one.');

  return { score, coverage, precision, hints };
}
