// ─────────────────────────────────────────────
//  CONSTANTS & STATE
// ─────────────────────────────────────────────

export const FREE_DRAG_MIN_PCT = 3;
export const FREE_DRAG_MAX_PCT = 97;
export const RESET_HOLD_MS    = 600;
export const SETTINGS_KEY     = 'lc-settings';

// ─────────────────────────────────────────────
//  FORMATIONS — one per team size
//  slots: our team's positions (one becomes "you")
//  opponents: fixed red tokens (mirrored, attack downward)
//  x/y are percentages of field width/height
// ─────────────────────────────────────────────
export const FORMATIONS = {

  // ── 7v7 · 3-3 ──────────────────────────────
  '7v7': {
    slots: [
      { key: 'gk',    x: 50, y: 90, label: 'GK',  name: 'GK'    },
      { key: 'def-l', x: 18, y: 77, label: 'D-L', name: 'Def-L' },
      { key: 'def-c', x: 50, y: 77, label: 'D-C', name: 'Def-C' },
      { key: 'def-r', x: 82, y: 77, label: 'D-R', name: 'Def-R' },
      { key: 'fwd-l', x: 18, y: 62, label: 'F-L', name: 'Fwd-L' },
      { key: 'fwd-c', x: 50, y: 62, label: 'F-C', name: 'Fwd-C' },
      { key: 'fwd-r', x: 82, y: 62, label: 'F-R', name: 'Fwd-R' },
    ],
    opponents: [
      { key: 'o1', x: 50, y: 10, label: 'O1' },
      { key: 'o2', x: 18, y: 23, label: 'O2' },
      { key: 'o3', x: 50, y: 23, label: 'O3' },
      { key: 'o4', x: 82, y: 23, label: 'O4' },
      { key: 'o5', x: 18, y: 38, label: 'O5' },
      { key: 'o6', x: 50, y: 38, label: 'O6' },
      { key: 'o7', x: 82, y: 38, label: 'O7' },
    ],
  },

  // ── 9v9 · 3-2-2 ────────────────────────────
  '9v9': {
    slots: [
      { key: 'gk',    x: 50, y: 90, label: 'GK',  name: 'GK'    },
      { key: 'def-l', x: 18, y: 79, label: 'D-L', name: 'Def-L' },
      { key: 'def-c', x: 50, y: 79, label: 'D-C', name: 'Def-C' },
      { key: 'def-r', x: 82, y: 79, label: 'D-R', name: 'Def-R' },
      { key: 'mid-l', x: 30, y: 67, label: 'M-L', name: 'Mid-L' },
      { key: 'mid-r', x: 70, y: 67, label: 'M-R', name: 'Mid-R' },
      { key: 'fwd-l', x: 30, y: 57, label: 'F-L', name: 'Fwd-L' },
      { key: 'fwd-r', x: 70, y: 57, label: 'F-R', name: 'Fwd-R' },
    ],
    opponents: [
      { key: 'o1', x: 50, y: 10, label: 'O1' },
      { key: 'o2', x: 18, y: 21, label: 'O2' },
      { key: 'o3', x: 50, y: 21, label: 'O3' },
      { key: 'o4', x: 82, y: 21, label: 'O4' },
      { key: 'o5', x: 30, y: 33, label: 'O5' },
      { key: 'o6', x: 70, y: 33, label: 'O6' },
      { key: 'o7', x: 30, y: 43, label: 'O7' },
      { key: 'o8', x: 70, y: 43, label: 'O8' },
    ],
  },

  // ── 11v11 · 4-3-3 ──────────────────────────
  '11v11': {
    slots: [
      { key: 'gk',     x: 50, y: 91, label: 'GK',   name: 'GK'     },
      { key: 'def-l',  x: 13, y: 79, label: 'D-L',  name: 'Def-L'  },
      { key: 'def-cl', x: 37, y: 79, label: 'D-CL', name: 'Def-CL' },
      { key: 'def-cr', x: 63, y: 79, label: 'D-CR', name: 'Def-CR' },
      { key: 'def-r',  x: 87, y: 79, label: 'D-R',  name: 'Def-R'  },
      { key: 'mid-l',  x: 20, y: 67, label: 'M-L',  name: 'Mid-L'  },
      { key: 'mid-c',  x: 50, y: 67, label: 'M-C',  name: 'Mid-C'  },
      { key: 'mid-r',  x: 80, y: 67, label: 'M-R',  name: 'Mid-R'  },
      { key: 'fwd-l',  x: 23, y: 57, label: 'F-L',  name: 'Fwd-L'  },
      { key: 'fwd-c',  x: 50, y: 57, label: 'F-C',  name: 'Fwd-C'  },
      { key: 'fwd-r',  x: 77, y: 57, label: 'F-R',  name: 'Fwd-R'  },
    ],
    opponents: [
      { key: 'o1',  x: 50, y:  9, label: 'O1'  },
      { key: 'o2',  x: 13, y: 21, label: 'O2'  },
      { key: 'o3',  x: 37, y: 21, label: 'O3'  },
      { key: 'o4',  x: 63, y: 21, label: 'O4'  },
      { key: 'o5',  x: 87, y: 21, label: 'O5'  },
      { key: 'o6',  x: 20, y: 33, label: 'O6'  },
      { key: 'o7',  x: 50, y: 33, label: 'O7'  },
      { key: 'o8',  x: 80, y: 33, label: 'O8'  },
      { key: 'o9',  x: 23, y: 43, label: 'O9'  },
      { key: 'o10', x: 50, y: 43, label: 'O10' },
      { key: 'o11', x: 77, y: 43, label: 'O11' },
    ],
  },
};

// Default "you" slot per team size
export const DEFAULT_POSITION = {
  '7v7':   'fwd-c',
  '9v9':   'fwd-r',
  '11v11': 'fwd-r',
};

// ─────────────────────────────────────────────
//  SETTINGS — persisted to localStorage
// ─────────────────────────────────────────────
export const settings = {
  kidName:       '',        // '' → render default label 'You'
  teamSize:      '7v7',     // '7v7' | '9v9' | '11v11'
  kidPosition:   'fwd-c',   // slot key from FORMATIONS[teamSize].slots
  showOpponents: true,
};

export function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (s?.teamSize && FORMATIONS[s.teamSize]) settings.teamSize = s.teamSize;
    if (typeof s?.kidName === 'string') settings.kidName = s.kidName;
    // Validate slot key against current team size (handles migration from old format)
    const slots = FORMATIONS[settings.teamSize].slots;
    if (s?.kidPosition && slots.find(sl => sl.key === s.kidPosition)) {
      settings.kidPosition = s.kidPosition;
    } else {
      settings.kidPosition = DEFAULT_POSITION[settings.teamSize];
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
