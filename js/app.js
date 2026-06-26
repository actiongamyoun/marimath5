// js/app.js — 마리수학 메인 로직

// ── 화면 전환 ──
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');

  if (id === 'sc-home') renderHome();
  if (id === 'sc-parent') renderParent();
  if (id === 'sc-solve') {
    // 캔버스 레이아웃 확정 후 크기 잡기 (모바일 안전: 여러 번)
    requestAnimationFrame(() => requestAnimationFrame(() => window.resizeCanvas()));
    setTimeout(() => window.resizeCanvas(), 120);
    setTimeout(() => window.resizeCanvas(), 350);
  }
}
window.show = show;

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mascot = (mood, size) => window.mascotSVG ? window.mascotSVG(mood, size) : '';
// 학년 라벨: 6 → "초6", 7 → "중1"
const gradeLabel = g => g === 7 ? '중1' : `초${g}`;

// 분수 표기 변환: 텍스트의 [[a/b]] 또는 [[w_a/b]](대분수)를 세로 분수 HTML로
// 먼저 HTML 이스케이프한 뒤, 분수 토큰만 마크업으로 치환 (XSS 안전)
function renderMath(text) {
  let s = esc(text);
  // 대분수: [[2_1/3]] → 2와 1/3
  s = s.replace(/\[\[(\d+)_(\d+)\/(\d+)\]\]/g, (_, w, n, d) =>
    `<span class="mixed"><span class="whole">${w}</span><span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span></span>`);
  // 단순 분수: [[3/4]] → 세로 분수
  s = s.replace(/\[\[(\d+)\/(\d+)\]\]/g, (_, n, d) =>
    `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`);
  return s;
}
window.renderMath = renderMath;

// ════════ 온보딩 ════════
let onbGrade = null;

function initOnboard() {
  document.getElementById('onb-mascot').innerHTML = mascot('hello', 110);
  const input = document.getElementById('onb-name-input');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') onbNext(); });
}

function onbNext() {
  const input = document.getElementById('onb-name-input');
  const name = input.value.trim();
  if (!name) { input.focus(); input.style.borderColor = 'var(--coral)'; return; }
  window.STATE.name = name;
  document.getElementById('onb-name-echo').textContent = name;
  document.getElementById('onb-bubble').innerHTML = `반가워, ${esc(name)}야! 🎉<br>몇 학년인지 알려줄래?`;
  document.getElementById('onb-name').hidden = true;
  document.getElementById('onb-grade').hidden = false;
}

function onbFinish() {
  window.STATE.grade = onbGrade || 6;
  window.STATE.onboarded = true;
  window.saveState();
  show('sc-home');
}

// ════════ 홈 ════════
function renderHome() {
  const st = window.STATE;
  const name = st.name || '친구';

  document.getElementById('home-avatar').textContent = name.charAt(0);
  document.getElementById('home-name').textContent = name;
  document.getElementById('home-sub').textContent = gradeLabel(st.grade);
  document.getElementById('home-streak').textContent = st.streak || 0;
  document.getElementById('home-stars').textContent = st.stars || 0;
  document.getElementById('theme-icon').textContent =
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light_mode' : 'dark_mode';

  // 마리 인사 (상황별)
  const todayN = window.getTodayCount();
  const mEl = document.getElementById('home-mascot');
  const gEl = document.getElementById('home-greeting');
  const gsEl = document.getElementById('home-greeting-sub');
  if (todayN >= 5) {
    mEl.innerHTML = mascot('cheer', 88);
    gEl.textContent = `${name}야, 오늘 많이 했네!`;
    gsEl.textContent = '더 하고 싶으면 언제든 해도 좋아 ✨';
  } else if (todayN > 0) {
    mEl.innerHTML = mascot('wink', 88);
    gEl.textContent = `${name}야, 잘하고 있어!`;
    gsEl.textContent = '오늘 조금 더 해볼까?';
  } else {
    mEl.innerHTML = mascot('hello', 88);
    gEl.textContent = `${name}야, 안녕!`;
    gsEl.textContent = '오늘도 같이 해볼까?';
  }

  renderTodayCard();
  renderUnitList();
}

function renderTodayCard() {
  const card = document.getElementById('today-card');
  const goal = window.getWeekGoal();
  const todayN = window.getTodayCount();

  if (!goal) {
    // 주간 목표 없음 → 세우기
    card.innerHTML = `
      <div class="tc empty">
        <div class="tc-empty-text">
          <div class="tc-empty-title">이번 주 목표를 정해볼까?</div>
          <div class="tc-empty-sub">일주일에 며칠 공부할지 스스로 정해봐</div>
          <div class="tc-goal-btns">
            <button class="tc-goal-btn" data-goaldays="3">주 3일</button>
            <button class="tc-goal-btn" data-goaldays="5">주 5일</button>
            <button class="tc-goal-btn" data-goaldays="7">매일</button>
          </div>
        </div>
      </div>`;
  } else {
    const done = goal.studiedDays.length;
    const target = goal.targetDays;
    const pct = Math.min(100, Math.round(done / target * 100));
    const studiedToday = goal.studiedDays.includes(window.todayStr());
    card.innerHTML = `
      <div class="tc">
        <div class="tc-row">
          <div class="tc-label"><i class="icon">target</i> 이번 주 목표</div>
          <div class="tc-count">${done}/${target}일</div>
        </div>
        <div class="tc-bar"><div class="tc-bar-fill" style="width:${pct}%"></div></div>
        <div class="tc-foot">${
          done >= target ? '🎉 이번 주 목표 달성! 멋지다' :
          studiedToday ? '오늘 공부 완료! 내일 또 보자' :
          `목표까지 ${target - done}일 남았어`
        }</div>
      </div>`;
  }
}

function renderUnitList() {
  const list = document.getElementById('unit-list');
  list.innerHTML = '';
  const units = window.getUnitsByGrade(window.STATE.grade);
  units.forEach(u => {
    const m = window.unitMastery(u.id);
    const count = window.unitQuestionCount(u.id);
    const barColor = m < 40 ? 'var(--coral)' : m < 75 ? 'var(--amber)' : 'var(--green)';
    const item = document.createElement('div');
    item.className = 'unit-item';
    item.innerHTML = `
      <div class="unit-icon" style="background:${u.color}"><i class="icon">${u.icon}</i></div>
      <div class="unit-info">
        <div class="unit-name-row">${u.name}</div>
        <div class="unit-mastery-row">
          <div class="unit-mbar"><div class="unit-mbar-fill" style="width:${m}%;background:${barColor}"></div></div>
          <div class="unit-mpct">${m}%</div>
        </div>
      </div>
      <div class="unit-go"><i class="icon">chevron_right</i></div>`;
    item.addEventListener('click', () => startSession(u.id));
    list.appendChild(item);
  });
}

// 주간 목표 설정
function setGoal(days) {
  window.setWeekGoal(days);
  renderTodayCard();
  // 마리 코칭
  const weak = window.weakestUnit();
  openModalLoading();
  window.coach('plan', {
    name: window.STATE.name,
    targetDays: days,
    weakUnit: weak ? weak.name : null,
  }).then(msg => openModalMessage(msg, 'cheer'));
}

// ════════ 문제 풀이 세션 ════════
let session = null;
// session = { ids:[], idx, results:[{qId,correct,confidence}], mode:'normal'|'review', unitId }

function startSession(unitId) {
  const qs = window.pickSession(unitId, 5);
  if (qs.length === 0) return;
  session = { questions: qs, idx: 0, results: [], mode: 'normal', unitId };
  loadQuestion();
  show('sc-solve');
}

function startTodayStudy() {
  // 오늘 공부: 약한 단원 우선, 없으면 첫 단원
  const weak = window.weakestUnit();
  startSession(weak ? weak.id : window.UNITS[0].id);
}

function startReview() {
  const ids = window.STATE.reviewIds.slice(0, 5);
  const qs = ids.map(id => window.ALL_QUESTIONS.find(q => q.id === id)).filter(Boolean);
  if (qs.length === 0) { show('sc-home'); return; }
  session = { questions: qs, idx: 0, results: [], mode: 'review', unitId: null };
  loadQuestion();
  show('sc-solve');
}

function loadQuestion() {
  const q = session.questions[session.idx];
  const unit = window.getUnit(q.unit);
  document.getElementById('q-unit').textContent = unit ? unit.short : '';
  document.getElementById('q-level').textContent = '★'.repeat(q.level);
  document.getElementById('q-text').innerHTML = renderMath(q.q);
  document.getElementById('solve-count').textContent = `${session.idx + 1}/${session.questions.length}`;
  document.getElementById('solve-bar').style.width = `${(session.idx) / session.questions.length * 100}%`;

  // 캔버스 초기화
  window.clearCanvas();
  window.setPenMode('pen');
  document.querySelectorAll('.tool[data-tool]').forEach(t => t.classList.toggle('active', t.dataset.tool === 'pen'));
  setTimeout(() => window.resizeCanvas(), 60);
}

// "다 풀었어" → 자기확인 화면
function doneSolving() {
  show('sc-check');
  renderCheck();
}

// ════════ 자기확인 (메타인지) ════════
let currentConfidence = null;

function renderCheck() {
  const q = session.questions[session.idx];
  document.getElementById('check-mascot').innerHTML = mascot('think', 76);
  document.getElementById('check-q').innerHTML = renderMath(q.q);
  // 1단계: 자신감
  document.getElementById('check-confidence').hidden = false;
  document.getElementById('check-reveal').hidden = true;
  currentConfidence = null;
}

// 자신감 선택 → 정답 공개
function chooseConfidence(conf) {
  currentConfidence = conf;
  const q = session.questions[session.idx];
  document.getElementById('reveal-value').innerHTML = renderMath(q.answerLabel || q.answer);
  document.getElementById('check-confidence').hidden = true;
  document.getElementById('check-reveal').hidden = false;
  // 마리 표정 살짝 바꿈
  document.getElementById('check-mascot').innerHTML = mascot('hello', 76);
}

// 스스로 채점 (맞음/틀림)
function selfGrade(grade) {
  const q = session.questions[session.idx];
  const correct = grade === 'correct';
  session.results.push({ qId: q.id, correct, confidence: currentConfidence });
  window.recordResult(q, correct, currentConfidence);

  // 다음 문제 or 결과
  session.idx++;
  if (session.idx < session.questions.length) {
    loadQuestion();
    show('sc-solve');
  } else {
    finishSession();
  }
}

// ════════ 세션 결과 ════════
function finishSession() {
  window.recordStudyToday();

  const total = session.results.length;
  const correct = session.results.filter(r => r.correct).length;

  // 메타인지: 이번 세션에서 자신감-결과 일치도
  let metaMatch = 0;
  session.results.forEach(r => {
    if (r.confidence === 'sure' && r.correct) metaMatch++;
    else if (r.confidence === 'guess' && !r.correct) metaMatch++;
    else if (r.confidence === 'unsure') metaMatch += 0.5;
  });
  const metaPct = total > 0 ? Math.round(metaMatch / total * 100) : 0;

  // 화면
  const allCorrect = correct === total;
  document.getElementById('result-mascot').innerHTML = mascot(allCorrect ? 'cheer' : 'hello', 100);
  document.getElementById('result-title').textContent =
    allCorrect ? '다 맞혔어! 🎉' : correct >= total / 2 ? '잘했어!' : '끝까지 해냈어!';

  document.getElementById('result-stats').innerHTML = `
    <div class="rstat"><div class="rstat-num" style="color:var(--green)">${correct}</div><div class="rstat-lbl">맞은 문제</div></div>
    <div class="rstat"><div class="rstat-num" style="color:var(--brand)">${total}</div><div class="rstat-lbl">푼 문제</div></div>
    <div class="rstat"><div class="rstat-num" style="color:var(--amber)">+${session.results.filter(r=>r.correct).reduce((s,r)=>s+(r.confidence==='sure'?3:2),0)}</div><div class="rstat-lbl">받은 별</div></div>
  `;

  // 메타인지 피드백
  const mf = document.getElementById('meta-feedback');
  let mfText;
  if (metaPct >= 75) mfText = '자기가 아는 것과 모르는 것을 잘 알고 있어. 이게 진짜 공부 실력이야!';
  else if (metaPct >= 45) mfText = '아는 것과 모르는 걸 조금씩 구분하고 있어. 풀기 전에 "이거 자신 있나?" 생각해보면 더 좋아져.';
  else mfText = '찍기보다, 풀기 전에 "내가 이걸 아는지" 먼저 생각해보자. 그게 메타인지 힘이야.';
  mf.classList.remove('hidden');
  mf.innerHTML = `
    <div class="mf-title"><i class="icon">psychology</i> 오늘의 메타인지</div>
    <div class="mf-bar"><div class="mf-bar-fill" style="width:${metaPct}%"></div></div>
    <div class="mf-text">${mfText}</div>`;

  // 복습 버튼
  const reviewBtn = document.getElementById('review-btn');
  const hasReview = window.STATE.reviewIds.length > 0 && session.mode === 'normal';
  reviewBtn.hidden = !hasReview;

  show('sc-result');

  // AI 코칭 (조용히 받아서 표시)
  document.getElementById('result-coach').textContent = '마리가 한마디 준비 중...';
  window.coach('reflect', {
    name: window.STATE.name,
    solved: total, correct, metaScore: metaPct,
  }).then(msg => {
    document.getElementById('result-coach').textContent = msg;
  });
}

// ════════ 부모 공간 ════════
let parentGrade = null;

function renderParent() {
  const st = window.STATE;
  parentGrade = st.grade;
  const scroll = document.getElementById('parent-scroll');

  // 통계
  const totalSolved = Object.values(st.unitProgress).reduce((s, p) => s + p.solved, 0);
  const totalCorrect = Object.values(st.unitProgress).reduce((s, p) => s + p.correct, 0);
  const acc = totalSolved > 0 ? Math.round(totalCorrect / totalSolved * 100) : 0;
  const metaScore = window.metacognitionScore();

  // 단원별 진행 (현재 학년)
  let unitRows = '';
  window.getUnitsByGrade(st.grade).forEach(u => {
    const m = window.unitMastery(u.id);
    const p = st.unitProgress[u.id];
    const color = m < 40 ? 'var(--coral)' : m < 75 ? 'var(--amber)' : 'var(--green)';
    unitRows += `
      <div class="unit-prog-row">
        <div class="upr-name">${u.short}</div>
        <div class="upr-bar"><div class="upr-bar-fill" style="width:${m}%;background:${color}"></div></div>
        <div class="upr-pct">${p ? m + '%' : '-'}</div>
      </div>`;
  });

  scroll.innerHTML = `
    <div class="parent-card">
      <h3><i class="icon">person</i> 아이 정보</h3>
      <div class="pc-row">
        <label>이름</label>
        <input type="text" id="pc-name" class="pc-input" value="${esc(st.name)}" maxlength="10">
      </div>
      <div class="pc-row">
        <label>학년</label>
        <div class="pc-grades">
          <button class="pc-grade ${st.grade===6?'sel':''}" data-pgrade="6">초6</button>
          <button class="pc-grade ${st.grade===7?'sel':''}" data-pgrade="7">중1</button>
        </div>
      </div>
      <button class="btn btn-block" data-act="save-parent" style="margin-top:6px"><i class="icon">save</i> 저장</button>
    </div>

    <div class="parent-card">
      <h3><i class="icon">insights</i> 학습 현황</h3>
      <div class="parent-stat-grid">
        <div class="psg"><div class="psg-num" style="color:var(--brand)">${totalSolved}</div><div class="psg-lbl">푼 문제</div></div>
        <div class="psg"><div class="psg-num" style="color:var(--green)">${acc}%</div><div class="psg-lbl">정답률</div></div>
        <div class="psg"><div class="psg-num" style="color:var(--coral)">${st.streak||0}일</div><div class="psg-lbl">연속 학습</div></div>
        <div class="psg"><div class="psg-num" style="color:var(--violet)">${metaScore!=null?metaScore:'-'}${metaScore!=null?'점':''}</div><div class="psg-lbl">메타인지</div></div>
      </div>
    </div>

    <div class="parent-card">
      <h3><i class="icon">menu_book</i> 단원별 이해도</h3>
      ${unitRows}
    </div>

    <div class="parent-card">
      <h3><i class="icon">tips_and_updates</i> 이 앱의 철학</h3>
      <div class="parent-note">
        마리수학은 <b>정답을 알려주지 않습니다</b>. 아이가 직접 손으로 풀고, 풀기 전에 "내가 이걸 아는지" 스스로 판단하게 합니다.<br><br>
        이 <b>메타인지</b>(자신이 아는 것과 모르는 것을 구분하는 능력)가 자기주도 학습의 핵심입니다. 점수보다 <b>스스로 끝까지 해낸 과정</b>을 칭찬해 주세요.<br><br>
        틀려도 괜찮습니다. 실수는 배움의 일부이고, 마리는 아이를 혼내지 않습니다.
      </div>
    </div>
  `;
}

function saveParent() {
  const st = window.STATE;
  const name = document.getElementById('pc-name').value.trim();
  if (name) st.name = name;
  if (parentGrade) st.grade = parentGrade;
  window.saveState();
  // 피드백
  const btn = document.querySelector('[data-act="save-parent"]');
  if (btn) { btn.innerHTML = '<i class="icon">check</i> 저장됐어요'; setTimeout(() => { btn.innerHTML = '<i class="icon">save</i> 저장'; }, 1500); }
}

// ════════ 코칭 모달 ════════
function openModalLoading() {
  const modal = document.getElementById('modal');
  document.getElementById('modal-card').innerHTML = `
    <div class="modal-mascot">${mascot('think', 80)}</div>
    <div class="modal-loading">마리가 생각 중<span class="dots"><span></span><span></span><span></span></span></div>`;
  modal.classList.add('show');
}
function openModalMessage(msg, mood) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-card').innerHTML = `
    <div class="modal-mascot">${mascot(mood || 'hello', 90)}</div>
    <div class="modal-msg">${esc(msg)}</div>
    <button class="btn btn-block" data-act="close-modal">좋아!</button>`;
  modal.classList.add('show');
}
function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// ════════ 이벤트 위임 ════════
document.addEventListener('click', e => {
  // 펜 도구
  const tool = e.target.closest('.tool[data-tool]');
  if (tool) {
    document.querySelectorAll('.tool[data-tool]').forEach(t => t.classList.remove('active'));
    tool.classList.add('active');
    window.setPenMode(tool.dataset.tool);
    return;
  }
  // 온보딩 학년
  const og = e.target.closest('.onboard-grade');
  if (og) {
    document.querySelectorAll('.onboard-grade').forEach(b => b.classList.remove('sel'));
    og.classList.add('sel');
    onbGrade = parseInt(og.dataset.grade);
    document.getElementById('onb-finish').disabled = false;
    return;
  }
  // 부모 학년
  const pg = e.target.closest('.pc-grade');
  if (pg) {
    document.querySelectorAll('.pc-grade').forEach(b => b.classList.remove('sel'));
    pg.classList.add('sel');
    parentGrade = parseInt(pg.dataset.pgrade);
    return;
  }
  // 주간 목표 일수
  const gd = e.target.closest('[data-goaldays]');
  if (gd) { setGoal(parseInt(gd.dataset.goaldays)); return; }
  // 자신감
  const cb = e.target.closest('.conf-btn');
  if (cb) { chooseConfidence(cb.dataset.conf); return; }
  // 자기 채점
  const gb = e.target.closest('.grade-btn');
  if (gb) { selfGrade(gb.dataset.grade); return; }

  // 일반 액션
  const a = e.target.closest('[data-act]');
  if (!a) return;
  const act = a.dataset.act;
  switch (act) {
    case 'onb-next': onbNext(); break;
    case 'onb-finish': onbFinish(); break;
    case 'theme': window.toggleTheme(); window.updatePenColor(); renderHome(); break;
    case 'parent': show('sc-parent'); break;
    case 'parent-back': show('sc-home'); break;
    case 'save-parent': saveParent(); break;
    case 'start-study': startTodayStudy(); break;
    case 'quit-solve': if (confirm('지금 나가면 이번 문제는 저장 안 돼. 나갈까?')) show('sc-home'); break;
    case 'clear-pad': window.clearCanvas(); break;
    case 'done-solving': doneSolving(); break;
    case 'result-home': show('sc-home'); break;
    case 'start-review': startReview(); break;
    case 'close-modal': closeModal(); break;
  }
});

// ════════ 부팅 ════════
function boot() {
  window.initTheme();
  window.updatePenColor();
  window.initCanvas();
  initOnboard();
  registerSW();

  if (!window.STATE.onboarded) show('sc-onboard');
  else show('sc-home');
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', boot);
