// data/units.js
// 수학 단원 (2022 개정 교육과정)
// grade: 6 = 초등 6학년, 7 = 중학교 1학년
// 각 단원: id, grade, name, short, desc, icon, color, order

window.UNITS = [
  // ════ 초등 6학년 1학기 ════
  { id: 'fracdiv', grade: 6, name: '분수의 나눗셈', short: '분수 나눗셈',
    desc: '분수를 자연수로, 분수를 분수로 나누기', icon: 'pie_chart', color: '#14b8a6', order: 1 },
  { id: 'prism', grade: 6, name: '각기둥과 각뿔', short: '각기둥·각뿔',
    desc: '입체도형의 모서리, 꼭짓점, 면 이해하기', icon: 'deployed_code', color: '#8b7cf6', order: 2 },
  { id: 'decdiv', grade: 6, name: '소수의 나눗셈', short: '소수 나눗셈',
    desc: '소수를 자연수로 나누는 여러 방법', icon: 'calculate', color: '#38bdf8', order: 3 },
  { id: 'ratio', grade: 6, name: '비와 비율', short: '비와 비율',
    desc: '두 수를 비교하고 비율로 나타내기', icon: 'percent', color: '#fbbf24', order: 4 },
  { id: 'graph', grade: 6, name: '여러 가지 그래프', short: '그래프',
    desc: '띠그래프와 원그래프로 자료 나타내기', icon: 'bar_chart', color: '#ff6b6b', order: 5 },
  { id: 'volume', grade: 6, name: '직육면체의 부피와 겉넓이', short: '부피·겉넓이',
    desc: '직육면체와 정육면체의 부피, 겉넓이 구하기', icon: 'view_in_ar', color: '#34d399', order: 6 },

  // ════ 중학교 1학년 (핵심 단원) ════
  { id: 'factor', grade: 7, name: '소인수분해', short: '소인수분해',
    desc: '소수와 합성수, 소인수분해와 최대공약수·최소공배수', icon: 'tag', color: '#0ea5e9', order: 1 },
  { id: 'integer', grade: 7, name: '정수와 유리수', short: '정수·유리수',
    desc: '음수의 등장! 부호가 있는 수의 사칙연산', icon: 'exposure', color: '#f43f5e', order: 2 },
  { id: 'letter', grade: 7, name: '문자와 식', short: '문자와 식',
    desc: '수 대신 문자로, 식을 세우고 간단히 하기', icon: 'function', color: '#a855f7', order: 3 },
  { id: 'equation', grade: 7, name: '일차방정식', short: '일차방정식',
    desc: '등식의 성질로 x의 값을 구하기', icon: 'balance', color: '#10b981', order: 4 },
];

window.getUnit = function(id) {
  return window.UNITS.find(u => u.id === id) || null;
};

// 특정 학년의 단원만 (order 순)
window.getUnitsByGrade = function(grade) {
  return window.UNITS.filter(u => u.grade === grade).sort((a, b) => a.order - b.order);
};
