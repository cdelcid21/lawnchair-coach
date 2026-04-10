import {
  state, settings, FORMATIONS, DEFAULT_POSITION,
  FREE_DRAG_MIN_PCT, FREE_DRAG_MAX_PCT, RESET_HOLD_MS,
  loadSettings, saveSettings,
} from './state.js';

// ─────────────────────────────────────────────
//  ELEMENTS
// ─────────────────────────────────────────────
const appEl          = document.getElementById('app');
const fieldEl        = document.getElementById('field');
const drawCanvas     = document.getElementById('draw-canvas');
const btnDraw        = document.getElementById('btn-draw');
const btnUndo        = document.getElementById('btn-undo');
const btnClear       = document.getElementById('btn-clear');
const btnReset       = document.getElementById('btn-reset');
const btnSettings     = document.getElementById('btn-settings');
const settingsOverlay = document.getElementById('settings-overlay');
const settingsSheet   = document.getElementById('settings-sheet');
const inputKidName    = document.getElementById('input-kid-name');
const teamSizeGrid    = document.getElementById('team-size-grid');
const posGrid         = document.getElementById('pos-grid');
const toggleOpponents = document.getElementById('toggle-opponents');
const btnDone         = document.getElementById('btn-settings-done');
const ctx            = drawCanvas.getContext('2d');

// ─────────────────────────────────────────────
//  TOKEN INIT & RENDER
// ─────────────────────────────────────────────
function cloneDefaults() {
  const { slots, opponents } = FORMATIONS[settings.teamSize];
  const tokens = {};

  // Our team: the selected slot becomes "you", all others become teammates
  for (const slot of slots) {
    if (slot.key === settings.kidPosition) {
      tokens.you = { x: slot.x, y: slot.y, type: 'you', label: 'You' };
    } else {
      tokens[slot.key] = { x: slot.x, y: slot.y, type: 'teammate', label: slot.label };
    }
  }

  // Opponents
  for (const opp of opponents) {
    tokens[opp.key] = { x: opp.x, y: opp.y, type: 'opponent', label: opp.label };
  }

  return tokens;
}

function youLabel() {
  return settings.kidName.trim() || 'You';
}

function renderTokens() {
  document.querySelectorAll('.token').forEach(el => el.remove());
  for (const [id, token] of Object.entries(state.tokens)) {
    const el = document.createElement('div');
    el.className = `token token-${token.type}`;
    if (token.type === 'opponent' && !settings.showOpponents) {
      el.classList.add('token-hidden');
    }
    el.textContent = id === 'you' ? youLabel() : token.label;
    el.dataset.id = id;
    el.style.left = token.x + '%';
    el.style.top  = token.y + '%';
    el.addEventListener('touchstart', onTokenTouchStart, { passive: false });
    fieldEl.appendChild(el);
  }
}

// ─────────────────────────────────────────────
//  TOKEN DRAG
// ─────────────────────────────────────────────
let dragging = null;

function onTokenTouchStart(e) {
  e.preventDefault();
  e.stopPropagation();
  const tokenEl = e.currentTarget;
  const id = tokenEl.dataset.id;
  dragging = { id, el: tokenEl };
  tokenEl.classList.add('dragging');

  function onMove(ev) {
    ev.preventDefault();
    if (!dragging) return;
    const t = ev.touches[0];
    const rect = fieldEl.getBoundingClientRect();
    const x = Math.max(FREE_DRAG_MIN_PCT, Math.min(FREE_DRAG_MAX_PCT,
      ((t.clientX - rect.left) / rect.width)  * 100));
    const y = Math.max(FREE_DRAG_MIN_PCT, Math.min(FREE_DRAG_MAX_PCT,
      ((t.clientY - rect.top)  / rect.height) * 100));
    state.tokens[id].x = x;
    state.tokens[id].y = y;
    dragging.el.style.left = x + '%';
    dragging.el.style.top  = y + '%';
  }

  function onEnd() {
    if (dragging) dragging.el.classList.remove('dragging');
    dragging = null;
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onEnd);
  }

  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend',  onEnd);
}

// ─────────────────────────────────────────────
//  CANVAS HELPERS
// ─────────────────────────────────────────────
function resizeCanvas() {
  drawCanvas.width  = fieldEl.offsetWidth;
  drawCanvas.height = fieldEl.offsetHeight;
  applyCtxStyles();
  redrawStrokes();
}

function applyCtxStyles() {
  ctx.strokeStyle = 'rgba(255,255,255,0.88)';
  ctx.lineWidth   = 4;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
}

function clearCanvas() {
  ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function fracToPx(frac) {
  return { x: frac.x * drawCanvas.width, y: frac.y * drawCanvas.height };
}

function redrawStrokes() {
  clearCanvas();
  applyCtxStyles();
  for (const stroke of state.strokes) {
    if (stroke.points.length < 2) continue;
    const first = fracToPx(stroke.points[0]);
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < stroke.points.length; i++) {
      const pt = fracToPx(stroke.points[i]);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }
}

function touchToFrac(touch) {
  const r = fieldEl.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(1, (touch.clientX - r.left) / r.width)),
    y: Math.max(0, Math.min(1, (touch.clientY - r.top)  / r.height)),
  };
}

// ─────────────────────────────────────────────
//  DRAW MODE
// ─────────────────────────────────────────────
function enterDrawMode() {
  state.drawMode = true;
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  drawCanvas.style.display = 'block';
  appEl.classList.add('draw-mode-active');
  btnDraw.classList.add('active');
}

function exitDrawMode() {
  state.drawMode = false;
  window.removeEventListener('resize', resizeCanvas);
  drawCanvas.style.display = 'none';
  appEl.classList.remove('draw-mode-active');
  btnDraw.classList.remove('active');
}

btnDraw.addEventListener('click', () => {
  state.drawMode ? exitDrawMode() : enterDrawMode();
});

btnClear.addEventListener('click', () => {
  state.strokes = [];
  clearCanvas();
  updateToolbar();
});

btnUndo.addEventListener('click', () => {
  if (!state.strokes.length) return;
  state.strokes.pop();
  redrawStrokes();
  updateToolbar();
});

function updateToolbar() {
  const hasStrokes = state.strokes.length > 0;
  btnUndo.disabled  = !hasStrokes;
  btnClear.disabled = !hasStrokes;
}

// ─────────────────────────────────────────────
//  FREEHAND DRAWING
// ─────────────────────────────────────────────
fieldEl.addEventListener('touchstart', e => {
  if (!state.drawMode) return;
  if (e.target.closest('.token')) return;

  e.preventDefault();
  const stroke = { points: [] };
  const startFrac = touchToFrac(e.touches[0]);
  stroke.points.push(startFrac);

  const startPx = fracToPx(startFrac);
  ctx.beginPath();
  ctx.moveTo(startPx.x, startPx.y);

  function onDrawMove(ev) {
    ev.preventDefault();
    const frac = touchToFrac(ev.touches[0]);
    stroke.points.push(frac);
    const px = fracToPx(frac);
    ctx.lineTo(px.x, px.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px.x, px.y);
  }

  function onDrawEnd() {
    if (stroke.points.length > 1) {
      state.strokes.push(stroke);
      updateToolbar();
    }
    document.removeEventListener('touchmove', onDrawMove);
    document.removeEventListener('touchend',  onDrawEnd);
  }

  document.addEventListener('touchmove', onDrawMove, { passive: false });
  document.addEventListener('touchend',  onDrawEnd);
}, { passive: false });

// ─────────────────────────────────────────────
//  RESET (long-press)
// ─────────────────────────────────────────────
let resetTimer = null;

btnReset.addEventListener('touchstart', e => {
  e.preventDefault();
  btnReset.classList.add('hold-active');
  resetTimer = setTimeout(() => {
    resetTimer = null;
    doReset();
  }, RESET_HOLD_MS);
}, { passive: false });

function cancelReset() {
  if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
  btnReset.classList.remove('hold-active');
}
btnReset.addEventListener('touchend',    cancelReset);
btnReset.addEventListener('touchcancel', cancelReset);

function doReset() {
  btnReset.classList.remove('hold-active');
  btnReset.classList.add('flash');
  setTimeout(() => btnReset.classList.remove('flash'), 300);

  state.tokens = cloneDefaults();
  state.strokes = [];
  clearCanvas();
  if (state.drawMode) exitDrawMode();
  renderTokens();
  updateToolbar();
}

// Rebuild tokens only (keeps strokes) — used when only position changes
function rebuildTokens() {
  state.tokens = cloneDefaults();
  renderTokens();
}

// ─────────────────────────────────────────────
//  SETTINGS SHEET
// ─────────────────────────────────────────────
function openSettings() {
  inputKidName.value = settings.kidName;
  updateSizeBtns();
  renderPosGrid();
  toggleOpponents.checked = settings.showOpponents;
  settingsOverlay.classList.add('open');
  settingsSheet.classList.add('open');
}

function closeSettings() {
  settingsOverlay.classList.remove('open');
  settingsSheet.classList.remove('open');
}

function updateSizeBtns() {
  teamSizeGrid.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === settings.teamSize);
  });
}

function renderPosGrid() {
  const { slots } = FORMATIONS[settings.teamSize];
  posGrid.innerHTML = '';
  for (const slot of slots) {
    const btn = document.createElement('button');
    btn.className = 'size-btn' + (slot.key === settings.kidPosition ? ' active' : '');
    btn.dataset.pos = slot.key;
    btn.textContent = slot.name;
    posGrid.appendChild(btn);
  }
}

btnSettings.addEventListener('click', openSettings);
btnDone.addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', closeSettings);

// Kid's name — update token label in real time
inputKidName.addEventListener('input', () => {
  settings.kidName = inputKidName.value.slice(0, 6);
  saveSettings();
  const youEl = fieldEl.querySelector('.token-you');
  if (youEl) youEl.textContent = youLabel();
});

// Team size — reset field when changed
teamSizeGrid.addEventListener('click', e => {
  const btn = e.target.closest('.size-btn');
  if (!btn) return;
  const size = btn.dataset.size;
  if (size === settings.teamSize) return;
  settings.teamSize = size;
  // If current position slot doesn't exist in new formation, reset to default
  const newSlots = FORMATIONS[size].slots;
  if (!newSlots.find(s => s.key === settings.kidPosition)) {
    settings.kidPosition = DEFAULT_POSITION[size];
  }
  saveSettings();
  updateSizeBtns();
  renderPosGrid();
  doReset();
});

// Kid's position — rebuild tokens (keeps drawings)
posGrid.addEventListener('click', e => {
  const btn = e.target.closest('.size-btn');
  if (!btn) return;
  const pos = btn.dataset.pos;
  if (pos === settings.kidPosition) return;
  settings.kidPosition = pos;
  saveSettings();
  renderPosGrid();
  rebuildTokens();
});

// Show/hide opponents
toggleOpponents.addEventListener('change', () => {
  settings.showOpponents = toggleOpponents.checked;
  saveSettings();
  document.querySelectorAll('.token-opponent').forEach(el => {
    el.classList.toggle('token-hidden', !settings.showOpponents);
  });
});

// ─────────────────────────────────────────────
//  SERVICE WORKER
// ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
loadSettings();
state.tokens = cloneDefaults();
renderTokens();
updateToolbar();
