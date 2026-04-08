// ─────────────────────────────────────────────
//  CONSTANTS & STATE
// ─────────────────────────────────────────────

export const FREE_DRAG_MIN_PCT = 3;
export const FREE_DRAG_MAX_PCT = 97;
export const RESET_HOLD_MS    = 600;

// Default 7v7 formation — 2-3-1 vs 2-3-1
// x/y are percentages of the field width/height
// Our team attacks upward (bottom half), opponents attack downward (top half)
export const DEFAULT_POSITIONS = {
  // ── Our team (bottom half) ──────────────────
  you:  { x: 50, y: 46, type: 'you',      label: 'You' },
  t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
  t2:   { x: 27, y: 76, type: 'teammate', label: 'T2' }, // Def-L
  t3:   { x: 73, y: 76, type: 'teammate', label: 'T3' }, // Def-R
  t4:   { x: 17, y: 62, type: 'teammate', label: 'T4' }, // Mid-L
  t5:   { x: 50, y: 61, type: 'teammate', label: 'T5' }, // Mid-C
  t6:   { x: 83, y: 62, type: 'teammate', label: 'T6' }, // Mid-R

  // ── Opponents (top half) ────────────────────
  o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
  o2:   { x: 27, y: 24, type: 'opponent', label: 'O2' }, // Def-L
  o3:   { x: 73, y: 24, type: 'opponent', label: 'O3' }, // Def-R
  o4:   { x: 17, y: 38, type: 'opponent', label: 'O4' }, // Mid-L
  o5:   { x: 50, y: 39, type: 'opponent', label: 'O5' }, // Mid-C
  o6:   { x: 83, y: 38, type: 'opponent', label: 'O6' }, // Mid-R
  o7:   { x: 50, y: 54, type: 'opponent', label: 'O7' }, // Fwd
};

export const state = {
  drawMode: false,
  strokes:  [],    // [{ points: [{x:0-1, y:0-1}, ...] }, ...]  — normalized fractions
  tokens:   null,  // populated from DEFAULT_POSITIONS clone at init
};
