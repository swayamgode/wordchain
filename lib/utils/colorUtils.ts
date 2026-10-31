import { RGBColor } from '../types/colorMatch';

// Maximum Euclidean distance in RGB color space: sqrt(255^2 + 255^2 + 255^2) = ~441.67295593
export const MAX_RGB_DISTANCE = Math.sqrt(255 * 255 * 3);

/**
 * Generate a random vibrant RGB color
 */
export function generateRandomRGB(): RGBColor {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

/**
 * Convert RGB to CSS string: rgb(r, g, b)
 */
export function rgbToCss(color: RGBColor): string {
  return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
}

/**
 * Convert RGB to Hex string: #RRGGBB
 */
export function rgbToHex(color: RGBColor): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0').toUpperCase();
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

/**
 * Convert Hex string to RGB
 */
export function hexToRgb(hex: string): RGBColor | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  return null;
}

/**
 * Calculate Euclidean distance between two RGB colors
 */
export function calculateColorDistance(c1: RGBColor, c2: RGBColor): number {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Calculate match accuracy percentage: 0% to 100%
 */
export function calculateAccuracy(distance: number): number {
  const raw = Math.max(0, (1 - distance / MAX_RGB_DISTANCE) * 100);
  return Math.round(raw * 10) / 10;
}

/**
 * Calculate round points based on rank and accuracy
 */
export function calculateRoundPoints(rank: number, accuracy: number): number {
  let basePoints = 25;
  if (rank === 0) basePoints = 100;
  else if (rank === 1) basePoints = 70;
  else if (rank === 2) basePoints = 50;

  // Accuracy bonus
  let bonus = 0;
  if (accuracy >= 98) bonus = 50; // Near perfect!
  else if (accuracy >= 95) bonus = 30;
  else if (accuracy >= 90) bonus = 15;

  return basePoints + bonus;
}

/**
 * Generate a simulated AI bot guess with variance based on difficulty
 */
export function generateBotGuess(target: RGBColor, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): RGBColor {
  const maxDelta = difficulty === 'hard' ? 18 : difficulty === 'medium' ? 38 : 70;

  const nudge = (val: number) => {
    const delta = (Math.random() * 2 - 1) * maxDelta;
    return Math.max(0, Math.min(255, Math.round(val + delta)));
  };

  return {
    r: nudge(target.r),
    g: nudge(target.g),
    b: nudge(target.b),
  };
}

