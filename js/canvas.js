// js/canvas.js — 펜 필기 캔버스 (스스로 손으로 푸는 공간)
// 포인터 이벤트 기반, 모바일/태블릿/데스크탑 모두 대응

let cvs, ctx, drawing = false, last = null;
let penColor = '#1a2530';
let penMode = 'pen'; // 'pen' | 'eraser'
let strokes = []; // undo용

window.initCanvas = function() {
  cvs = document.getElementById('pad');
  if (!cvs) return;
  ctx = cvs.getContext('2d');

  // 포인터 이벤트 (마우스+터치+펜 통합)
  cvs.addEventListener('pointerdown', onDown);
  cvs.addEventListener('pointermove', onMove);
  cvs.addEventListener('pointerup', onUp);
  cvs.addEventListener('pointercancel', onUp);
  cvs.addEventListener('pointerleave', onUp);

  // 터치 스크롤 방지 (그릴 때)
  cvs.style.touchAction = 'none';

  window.addEventListener('resize', () => window.resizeCanvas());
};

window.resizeCanvas = function() {
  if (!cvs) return;
  const wrap = cvs.parentElement;
  if (!wrap) return;
  const rect = wrap.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return; // 아직 레이아웃 안 됨

  const dpr = window.devicePixelRatio || 1;
  // 기존 그림 보존
  const prev = (cvs.width && cvs.height) ? ctx.getImageData(0, 0, cvs.width, cvs.height) : null;

  cvs.width = rect.width * dpr;
  cvs.height = rect.height * dpr;
  cvs.style.width = rect.width + 'px';
  cvs.style.height = rect.height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (prev) { try { ctx.putImageData(prev, 0, 0); } catch (e) {} }
};

function pos(e) {
  const r = cvs.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function onDown(e) {
  e.preventDefault();
  drawing = true;
  last = pos(e);
  cvs.setPointerCapture && cvs.setPointerCapture(e.pointerId);
}

function onMove(e) {
  if (!drawing) return;
  e.preventDefault();
  const p = pos(e);
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(p.x, p.y);
  if (penMode === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 22;
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 3;
    ctx.strokeStyle = penColor;
  }
  ctx.stroke();
  last = p;
}

function onUp(e) {
  if (!drawing) return;
  drawing = false;
  last = null;
}

window.clearCanvas = function() {
  if (!cvs || !ctx) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.restore();
};

window.setPenMode = function(mode) {
  penMode = mode;
};

// 다크모드 대응: 펜 색을 테마에 맞게
window.updatePenColor = function() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  penColor = dark ? '#eef3f7' : '#1a2530';
};
