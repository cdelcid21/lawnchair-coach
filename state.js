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

  '5v5': {
    // 1-2-1 shape — our team
    you:  { x: 50, y: 44, type: 'you',      label: 'You' },
    t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
    t2:   { x: 30, y: 75, type: 'teammate', label: 'T2' }, // Def-L
    t3:   { x: 70, y: 75, type: 'teammate', label: 'T3' }, // Def-R
    t4:   { x: 50, y: 60, type: 'teammate', label: 'T4' }, // Mid
    // 1-2-1 opponents
    o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
    o2:   { x: 30, y: 25, type: 'opponent', label: 'O2' }, // Def-L
    o3:   { x: 70, y: 25, type: 'opponent', label: 'O3' }, // Def-R
    o4:   { x: 50, y: 40, type: 'opponent', label: 'O4' }, // Mid
    o5:   { x: 50, y: 56, type: 'opponent', label: 'O5' }, // Fwd
  },

  '7v7': {
    // 2-3-1 shape — our team
    you:  { x: 50, y: 46, type: 'you',      label: 'You' },
    t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
    t2:   { x: 27, y: 76, type: 'teammate', label: 'T2' }, // Def-L
    t3:   { x: 73, y: 76, type: 'teammate', label: 'T3' }, // Def-R
    t4:   { x: 17, y: 62, type: 'teammate', label: 'T4' }, // Mid-L
    t5:   { x: 50, y: 61, type: 'teammate', label: 'T5' }, // Mid-C
    t6:   { x: 83, y: 62, type: 'teammate', label: 'T6' }, // Mid-R
    // 2-3-1 opponents
    o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
    o2:   { x: 27, y: 24, type: 'opponent', label: 'O2' }, // Def-L
    o3:   { x: 73, y: 24, type: 'opponent', label: 'O3' }, // Def-R
    o4:   { x: 17, y: 38, type: 'opponent', label: 'O4' }, // Mid-L
    o5:   { x: 50, y: 39, type: 'opponent', label: 'O5' }, // Mid-C
    o6:   { x: 83, y: 38, type: 'opponent', label: 'O6' }, // Mid-R
    o7:   { x: 50, y: 54, type: 'opponent', label: 'O7' }, // Fwd
  },

  '9v9': {
    // 3-3-2 shape — our team
    you:  { x: 70, y: 46, type: 'you',      label: 'You' },
    t1:   { x: 50, y: 90, type: 'teammate', label: 'T1' }, // GK
    t2:   { x: 20, y: 76, type: 'teammate', label: 'T2' }, // Def-L
    t3:   { x: 50, y: 74, type: 'teammate', label: 'T3' }, // Def-C
    t4:   { x: 80, y: 76, type: 'teammate', label: 'T4' }, // Def-R
    t5:   { x: 27, y: 61, type: 'teammate', label: 'T5' }, // Mid-L
    t6:   { x: 50, y: 59, type: 'teammate', label: 'T6' }, // Mid-C
    t7:   { x: 73, y: 61, type: 'teammate', label: 'T7' }, // Mid-R
    t8:   { x: 30, y: 46, type: 'teammate', label: 'T8' }, // Fwd-L
    // 3-3-2 opponents
    o1:   { x: 50, y: 10, type: 'opponent', label: 'O1' }, // GK
    o2:   { x: 20, y: 24, type: 'opponent', label: 'O2' }, // Def-L
    o3:   { x: 50, y: 26, type: 'opponent', label: 'O3' }, // Def-C
    o4:   { x: 80, y: 24, type: 'opponent', label: 'O4' }, // Def-R
    o5:   { x: 27, y: 39, type: 'opponent', label: 'O5' }, // Mid-L
    o6:   { x: 50, y: 41, type: 'opponent', label: 'O6' }, // Mid-C
    o7:   { x: 73, y: 39, type: 'opponent', label: 'O7' }, // Mid-R
    o8:   { x: 30, y: 54, type: 'opponent', label: 'O8' }, // Fwd-L
    o9:   { x: 70, y: 54, type: 'opponent', label: 'O9' }, // Fwd-R
  },

  '11v11': {
    // 4-3-3 shape — our team
    you:  { x: 75, y: 47, type: 'you',      label: 'You' },
    t1:   { x: 50, y: 91, type: 'teammate', label: 'T1'  }, // GK
    t2:   { x: 17, y: 78, type: 'teammate', label: 'T2'  }, // Def-L
    t3:   { x: 38, y: 76, type: 'teammate', label: 'T3'  }, // Def-CL
    t4:   { x: 62, y: 76, type: 'teammate', label: 'T4'  }, // Def-CR
    t5:   { x: 83, y: 78, type: 'teammate', label: 'T5'  }, // Def-R
    t6:   { x: 20, y: 63, type: 'teammate', label: 'T6'  }, // Mid-L
    t7:   { x: 50, y: 61, type: 'teammate', label: 'T7'  }, // Mid-C
    t8:   { x: 80, y: 63, type: 'teammate', label: 'T8'  }, // Mid-R
    t9:   { x: 25, y: 47, type: 'teammate', label: 'T9'  }, // Fwd-L
    t10:  { x: 50, y: 45, type: 'teammate', label: 'T10' }, // Fwd-C
    // 4-3-3 opponents
    o1:   { x: 50, y:  9, type: 'opponent', label: 'O1'  }, // GK
    o2:   { x: 17, y: 22, type: 'opponent', label: 'O2'  }, // Def-L
    o3:   { x: 38, y: 24, type: 'opponent', label: 'O3'  }, // Def-CL
    o4:   { x: 62, y: 24, type: 'opponent', label: 'O4'  }, // Def-CR
    o5:   { x: 83, y: 22, type: 'opponent', label: 'O5'  }, // Def-R
    o6:   { x: 20, y: 37, type: 'opponent', label: 'O6'  }, // Mid-L
    o7:   { x: 50, y: 39, type: 'opponent', label: 'O7'  }, // Mid-C
    o8:   { x: 80, y: 37, type: 'opponent', label: 'O8'  }, // Mid-R
    o9:   { x: 25, y: 53, type: 'opponent', label: 'O9'  }, // Fwd-L
    o10:  { x: 50, y: 55, type: 'opponent', label: 'O10' }, // Fwd-C
    o11:  { x: 75, y: 53, type: 'opponent', label: 'O11' }, // Fwd-R
  },
};

// ─────────────────────────────────────────────
//  SETTINGS — persisted to localStorage
// ─────────────────────────────────────────────
export const settings = {
  kidName:  '',      // '' → render default label 'You'
  teamSize: '7v7',   // '5v5' | '7v7' | '9v9' | '11v11'
};

export function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (s?.teamSize && FORMATIONS[s.teamSize]) settings.teamSize = s.teamSize;
    if (typeof s?.kidName === 'string') settings.kidName = s.kidName;
  } catch {}
}

export function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      kidName:  settings.kidName,
      teamSize: settings.teamSize,
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
