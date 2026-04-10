// ─────────────────────────────────────────────
//  CONSTANTS & STATE
// ─────────────────────────────────────────────

export const FREE_DRAG_MIN_PCT = 3;
export const FREE_DRAG_MAX_PCT = 97;
export const RESET_HOLD_MS    = 600;
export const SETTINGS_KEY     = 'lc-settings';

// ─────────────────────────────────────────────
//  FORMATIONS — one per team size
//  x/y are percentages of field width/height
//  Our team attacks upward (bottom half)
//  Opponents attack downward (top half)
// ─────────────────────────────────────────────
export const FORMATIONS = {

  // ── 7v7 · 3-3 ──────────────────────────────
  // GK + 3 defenders + 3 forwards (You = Fwd-C)
  // All our tokens y ≥ 55 · All opponent tokens y ≤ 45
  '7v7': {
    you:  { x: 50, y: 60, type: 'you',      label: 'You' }, // Fwd-C
    t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
    t2:   { x: 18, y: 78, type: 'teammate', label: 'T2' }, // Def-L
    t3:   { x: 50, y: 76, type: 'teammate', label: 'T3' }, // Def-C
    t4:   { x: 82, y: 78, type: 'teammate', label: 'T4' }, // Def-R
    t5:   { x: 20, y: 62, type: 'teammate', label: 'T5' }, // Fwd-L
    t6:   { x: 80, y: 62, type: 'teammate', label: 'T6' }, // Fwd-R
    o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
    o2:   { x: 18, y: 22, type: 'opponent', label: 'O2' }, // Def-L
    o3:   { x: 50, y: 24, type: 'opponent', label: 'O3' }, // Def-C
    o4:   { x: 82, y: 22, type: 'opponent', label: 'O4' }, // Def-R
    o5:   { x: 20, y: 38, type: 'opponent', label: 'O5' }, // Fwd-L
    o6:   { x: 50, y: 40, type: 'opponent', label: 'O6' }, // Fwd-C
    o7:   { x: 80, y: 38, type: 'opponent', label: 'O7' }, // Fwd-R
  },

  // ── 9v9 · 3-2-2 ────────────────────────────
  // GK + 3 def + 2 mid + 2 fwd + You (striker) = 9
  // All our tokens y ≥ 55 · All opponent tokens y ≤ 45
  '9v9': {
    you:  { x: 50, y: 55, type: 'you',      label: 'You' }, // Striker
    t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
    t2:   { x: 18, y: 79, type: 'teammate', label: 'T2' }, // Def-L
    t3:   { x: 50, y: 77, type: 'teammate', label: 'T3' }, // Def-C
    t4:   { x: 82, y: 79, type: 'teammate', label: 'T4' }, // Def-R
    t5:   { x: 28, y: 67, type: 'teammate', label: 'T5' }, // Mid-L
    t6:   { x: 72, y: 67, type: 'teammate', label: 'T6' }, // Mid-R
    t7:   { x: 25, y: 57, type: 'teammate', label: 'T7' }, // Fwd-L
    t8:   { x: 75, y: 57, type: 'teammate', label: 'T8' }, // Fwd-R
    o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
    o2:   { x: 18, y: 21, type: 'opponent', label: 'O2' }, // Def-L
    o3:   { x: 50, y: 23, type: 'opponent', label: 'O3' }, // Def-C
    o4:   { x: 82, y: 21, type: 'opponent', label: 'O4' }, // Def-R
    o5:   { x: 28, y: 33, type: 'opponent', label: 'O5' }, // Mid-L
    o6:   { x: 72, y: 33, type: 'opponent', label: 'O6' }, // Mid-R
    o7:   { x: 25, y: 43, type: 'opponent', label: 'O7' }, // Fwd-L
    o8:   { x: 75, y: 43, type: 'opponent', label: 'O8' }, // Fwd-R
    o9:   { x: 50, y: 45, type: 'opponent', label: 'O9' }, // Striker
  },

  // ── 11v11 · 4-3-3 ──────────────────────────
  // GK + 4 def + 3 mid + 2 fwd + You (Fwd-R) = 11
  // All our tokens y ≥ 55 · All opponent tokens y ≤ 45
  '11v11': {
    you:  { x: 75, y: 57, type: 'you',      label: 'You' }, // Fwd-R
    t1:   { x: 50, y: 91, type: 'teammate', label: 'T1'  }, // GK
    t2:   { x: 15, y: 80, type: 'teammate', label: 'T2'  }, // Def-L
    t3:   { x: 37, y: 78, type: 'teammate', label: 'T3'  }, // Def-CL
    t4:   { x: 63, y: 78, type: 'teammate', label: 'T4'  }, // Def-CR
    t5:   { x: 85, y: 80, type: 'teammate', label: 'T5'  }, // Def-R
    t6:   { x: 20, y: 67, type: 'teammate', label: 'T6'  }, // Mid-L
    t7:   { x: 50, y: 65, type: 'teammate', label: 'T7'  }, // Mid-C
    t8:   { x: 80, y: 67, type: 'teammate', label: 'T8'  }, // Mid-R
    t9:   { x: 25, y: 57, type: 'teammate', label: 'T9'  }, // Fwd-L
    t10:  { x: 50, y: 55, type: 'teammate', label: 'T10' }, // Fwd-C
    o1:   { x: 50, y:  9, type: 'opponent', label: 'O1'  }, // GK
    o2:   { x: 15, y: 20, type: 'opponent', label: 'O2'  }, // Def-L
    o3:   { x: 37, y: 22, type: 'opponent', label: 'O3'  }, // Def-CL
    o4:   { x: 63, y: 22, type: 'opponent', label: 'O4'  }, // Def-CR
    o5:   { x: 85, y: 20, type: 'opponent', label: 'O5'  }, // Def-R
    o6:   { x: 20, y: 33, type: 'opponent', label: 'O6'  }, // Mid-L
    o7:   { x: 50, y: 35, type: 'opponent', label: 'O7'  }, // Mid-C
    o8:   { x: 80, y: 33, type: 'opponent', label: 'O8'  }, // Mid-R
    o9:   { x: 25, y: 43, type: 'opponent', label: 'O9'  }, // Fwd-L
    o10:  { x: 50, y: 45, type: 'opponent', label: 'O10' }, // Fwd-C
    o11:  { x: 75, y: 43, type: 'opponent', label: 'O11' }, // Fwd-R
  },
};

// ─────────────────────────────────────────────
//  POSITION COORDS
//  Where the "You" token starts for each position
//  in each formation. Always centered (x=50) so
//  the parent can drag to the exact spot.
// ─────────────────────────────────────────────
export const POSITION_COORDS = {
  '7v7': {
    gk:  { x: 50, y: 90 },
    def: { x: 50, y: 77 },
    mid: { x: 50, y: 68 }, // between lines in 3-3
    fwd: { x: 50, y: 60 },
  },
  '9v9': {
    gk:  { x: 50, y: 90 },
    def: { x: 50, y: 77 },
    mid: { x: 50, y: 67 },
    fwd: { x: 50, y: 55 },
  },
  '11v11': {
    gk:  { x: 50, y: 91 },
    def: { x: 50, y: 78 },
    mid: { x: 50, y: 65 },
    fwd: { x: 50, y: 55 },
  },
};

// ─────────────────────────────────────────────
//  SETTINGS — persisted to localStorage
// ─────────────────────────────────────────────
export const settings = {
  kidName:      '',      // '' → render default label 'You'
  teamSize:     '7v7',   // '7v7' | '9v9' | '11v11'
  kidPosition:  'fwd',   // 'gk' | 'def' | 'mid' | 'fwd'
  showOpponents: true,
};

export function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (s?.teamSize && FORMATIONS[s.teamSize]) settings.teamSize = s.teamSize;
    if (typeof s?.kidName === 'string') settings.kidName = s.kidName;
    if (s?.kidPosition && POSITION_COORDS[settings.teamSize]?.[s.kidPosition]) {
      settings.kidPosition = s.kidPosition;
    }
    if (typeof s?.showOpponents === 'boolean') settings.showOpponents = s.showOpponents;
  } catch {}
}

export function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      kidName:       settings.kidName,
      teamSize:      settings.teamSize,
      kidPosition:   settings.kidPosition,
      showOpponents: settings.showOpponents,
    }));
  } catch {}
}

// ─────────────────────────────────────────────
//  APP STATE
// ─────────────────────────────────────────────
export const state = {
  drawMode: false,
  strokes:  [],    // [{ points: [{x:0-1, y:0-1}, ...] }] — normalized fractions
  tokens:   null,  // populated from FORMATIONS[settings.teamSize] at init
};
