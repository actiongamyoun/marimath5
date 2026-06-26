// js/state.js — 앱 상태 (localStorage, 기기별 독립)
// 설계 철학: 메타인지(스스로 아는지/모르는지 판단)를 데이터로 추적

const STORE_KEY = 'marimath_v1';

const DEFAULT_STATE = {
  // 온보딩
  name: '',
  grade: 6,
  onboarded: false,

  // 학습 진행
  // unitProgress: { unitId: { solved, correct, selfRated: {high, mid, low} } }
  unitProgress: {},

  // 메타인지 기록: 푼 문제마다 (맞췄나) × (자신감) 교차
  // metaLog: [{ qId, unit, correct, confidence, ts }]  confidence: 'sure'|'unsure'|'guess'
  metaLog: [],

  // 연속 학습
  streak: 0,
  lastStudyDate: '',
  todayCount: 0,
  todayDate: '',

  // 주간 목표 (스스로 정하기)
  // { weekStart, targetDays, studiedDays: [날짜...] }
  weekGoal: null,

  // 보상
  stars: 0,

  // 다시 풀 문제 (틀렸거나 찍어서 맞춘 것)
  reviewIds: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const saved = JSON.parse(raw);
    return Object.assign(structuredClone(DEFAULT_STATE), saved);
  } catch (e) {
    return structuredClone(DEFAULT_STATE);
  }
}

window.STATE = loadState();

window.saveState = function() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(window.STATE)); }
  catch (e) { console.warn('저장 실패', e); }
};

// ── 날짜 헬퍼 ──
window.todayStr = function() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
};
window.mondayStr = function() {
  const n = new Date();
  const day = n.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const m = new Date(n); m.setDate(n.getDate() + diff);
  return `${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,'0')}-${String(m.getDate()).padStart(2,'0')}`;
};

// ── 오늘 학습 기록 + 연속일 ──
window.recordStudyToday = function() {
  const st = window.STATE;
  const today = window.todayStr();

  // 오늘 카운트
  if (st.todayDate !== today) { st.todayDate = today; st.todayCount = 0; }
  st.todayCount++;

  // 연속일
  if (st.lastStudyDate !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yest = `${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}`;
    st.streak = (st.lastStudyDate === yest) ? (st.streak || 0) + 1 : 1;
    st.lastStudyDate = today;
  }

  // 주간 목표에 오늘 추가
  if (st.weekGoal && st.weekGoal.weekStart === window.mondayStr()) {
    if (!st.weekGoal.studiedDays.includes(today)) st.weekGoal.studiedDays.push(today);
  }
  window.saveState();
};

window.getTodayCount = function() {
  const st = window.STATE;
  return st.todayDate === window.todayStr() ? st.todayCount : 0;
};

// ── 문제 결과 기록 (메타인지 핵심) ──
window.recordResult = function(q, correct, confidence) {
  const st = window.STATE;

  // 단원 진행
  if (!st.unitProgress[q.unit]) st.unitProgress[q.unit] = { solved: 0, correct: 0 };
  st.unitProgress[q.unit].solved++;
  if (correct) st.unitProgress[q.unit].correct++;

  // 메타 로그
  st.metaLog.push({ qId: q.id, unit: q.unit, correct, confidence, ts: Date.now() });
  if (st.metaLog.length > 500) st.metaLog = st.metaLog.slice(-500);

  // 별: 맞으면 +2, 자신있게 맞으면 +3
  if (correct) st.stars += (confidence === 'sure' ? 3 : 2);

  // 다시 풀기: 틀렸거나 / 찍어서 맞춘 경우
  if (!correct || confidence === 'guess') {
    if (!st.reviewIds.includes(q.id)) st.reviewIds.push(q.id);
  } else {
    // 자신있게 맞춘 건 복습 목록에서 제거
    st.reviewIds = st.reviewIds.filter(id => id !== q.id);
  }
  window.saveState();
};

// ── 단원 이해도 (0~100) ──
window.unitMastery = function(unitId) {
  const p = window.STATE.unitProgress[unitId];
  if (!p || p.solved === 0) return 0;
  return Math.round(p.correct / p.solved * 100);
};

// ── 메타인지 정확도: 자신감과 실제 결과가 얼마나 일치하나 ──
// "안다고 한 게 맞고, 모른다고 한 게 틀림" = 메타인지 좋음
window.metacognitionScore = function() {
  const log = window.STATE.metaLog;
  if (log.length < 3) return null;
  let match = 0;
  log.forEach(e => {
    const confident = e.confidence === 'sure';
    // 자신있다 했는데 맞음 = 일치 / 자신없다 했는데 틀림 = 일치
    if (confident && e.correct) match++;
    else if (!confident && !e.correct) match++;
    else if (e.confidence === 'unsure') match += 0.5; // 중간은 부분 점수
  });
  return Math.round(match / log.length * 100);
};

// ── 약한 단원 찾기 (현재 학년 안에서) ──
window.weakestUnit = function() {
  const units = window.getUnitsByGrade(window.STATE.grade);
  if (units.length === 0) return window.UNITS[0];
  let weakest = units[0], lowest = 101;
  units.forEach(u => {
    const p = window.STATE.unitProgress[u.id];
    if (p && p.solved >= 2) {
      const m = window.unitMastery(u.id);
      if (m < lowest) { lowest = m; weakest = u; }
    }
  });
  return weakest;
};

// ── 주간 목표 ──
window.getWeekGoal = function() {
  const st = window.STATE;
  if (st.weekGoal && st.weekGoal.weekStart === window.mondayStr()) return st.weekGoal;
  return null;
};
window.setWeekGoal = function(targetDays) {
  window.STATE.weekGoal = {
    weekStart: window.mondayStr(),
    targetDays: targetDays,
    studiedDays: [],
  };
  window.saveState();
};
