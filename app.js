import {
  state,
  DEFAULT_POSITIONS,
  FREE_DRAG_MIN_PCT,
  FREE_DRAG_MAX_PCT,
  RESET_HOLD_MS,
} from './state.js';

// ─────────────────────────────────────────────
//  ELEMENTS
// ─────────────────────────────────────────────
const appEl      = document.getElementById('app');
const fieldEl    = document.getElementById('field');
const drawCanvas = document.getElementById('draw-canvas');
const btnDraw    = document.getElementById('btn-draw');
const btnUndo    = document.getElementById('btn-undo');
const btnClear   = document.getElementById('btn-clear');
const btnReset   = document.getElementById('btn-reset');
const ctx        = drawCanvas.getContext('2d');

// ─────────────────────────────────────────────
//  TOKEN INIT & RENDER
// ─────────────────────────────────────────────
function cloneDefaults() {
  const tokens = {};
  for (const [id, pos] of Object.entries(DEFAULT_POSITIONS)) {
    tokens[id] = { ...pos };
  }
  return tokens;
}

state.tokens = cloneDefaults();

function renderTokens() {
  document.querySelectorAll('.token').forEach(el => el.remove());
  for (const [id, token] of Object.entries(state.tokens)) {
    const el = document.createElement('div');
    el.className = `token token-${token.type}`;
    el.textContent = token.label;
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
  e.stopPropagation(); // prevent field draw handler from firing
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

// Strokes store normalized fractions (0–1); convert to px for drawing
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
  if (e.target.closest('.token')) return; // tokens handle their own drag

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

// ─────────────────────────────────────────────
//  SERVICE WORKER
// ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
renderTokens();
updateToolbar();
