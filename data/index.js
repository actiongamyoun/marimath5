// data/index.js — 모든 문제를 합치고 조회 함수 제공
window.ALL_QUESTIONS = [].concat(
  window.Q_fracdiv || [],
  window.Q_prism || [],
  window.Q_decdiv || [],
  window.Q_ratio || [],
  window.Q_graph || [],
  window.Q_volume || [],
  // 중1
  window.Q_factor || [],
  window.Q_integer || [],
  window.Q_letter || [],
  window.Q_equation || []
);

// 단원별 문제
window.getQuestionsByUnit = function(unitId) {
  return window.ALL_QUESTIONS.filter(q => q.unit === unitId);
};

// 단원의 문제 수
window.unitQuestionCount = function(unitId) {
  return window.getQuestionsByUnit(unitId).length;
};

// 한 세션용 문제 뽑기 — 계산과 문장제를 섞어서, 쉬운 것부터
window.pickSession = function(unitId, n) {
  n = n || 5;
  const all = window.getQuestionsByUnit(unitId).slice();
  const calc = all.filter(q => q.kind !== 'word').sort((a, b) => a.level - b.level);
  const word = all.filter(q => q.kind === 'word').sort((a, b) => a.level - b.level);

  // 계산:문장제를 번갈아 섞기 (대략 반반)
  const mixed = [];
  let i = 0, j = 0;
  while (mixed.length < n && (i < calc.length || j < word.length)) {
    if (i < calc.length) mixed.push(calc[i++]);
    if (mixed.length >= n) break;
    if (j < word.length) mixed.push(word[j++]);
  }
  // 부족하면 남은 것 채우기
  if (mixed.length < n) {
    all.filter(q => !mixed.includes(q)).forEach(q => { if (mixed.length < n) mixed.push(q); });
  }
  // 전체적으로 난이도 순 정렬 (계산/문장제 섞인 채로)
  return mixed.slice(0, n).sort((a, b) => a.level - b.level);
};

// 정답 채점 (사용자가 입력한 답 vs 정답)
// 분수 표기, 공백, 단위 등을 관대하게 비교
window.checkAnswer = function(userInput, question) {
  if (!userInput) return false;
  const norm = s => String(s)
    .replace(/\s/g, '')
    .replace(/[은는이가을를]/g, '')
    .replace(/명|개|병|원|점|cm|㎝|m|L|도/gi, '')
    .replace(/%/g, '')
    .replace(/[()]/g, '')
    .toLowerCase();

  const ans = norm(question.answer);
  let inp = norm(userInput);

  // 분수 동치 비교: a/b 형태면 약분해서 비교
  const toFrac = s => {
    const m = s.match(/^(\d+)\/(\d+)$/);
    if (!m) return null;
    return [parseInt(m[1]), parseInt(m[2])];
  };
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const reduceFrac = f => { if (!f) return null; const g = gcd(f[0], f[1]) || 1; return [f[0]/g, f[1]/g]; };

  const af = reduceFrac(toFrac(ans));
  const inf = reduceFrac(toFrac(inp));
  if (af && inf) return af[0] === inf[0] && af[1] === inf[1];

  // 분수 vs 소수/정수 동치 (예: 6/3 == 2)
  const fracVal = s => { const f = toFrac(s); return f ? f[0] / f[1] : (isNaN(parseFloat(s)) ? null : parseFloat(s)); };
  const av = fracVal(ans), iv = fracVal(inp);
  if (av !== null && iv !== null) return Math.abs(av - iv) < 1e-9;

  // 그 외 문자열 일치
  return ans === inp;
};
