// data/units.js
// 초등 6학년 1학기 수학 단원 (2022 개정 교육과정 기반)
// 각 단원: id, name, short(짧은 이름), icon(Material Symbols), color, order

window.UNITS = [
  {
    id: 'fracdiv',
    name: '분수의 나눗셈',
    short: '분수 나눗셈',
    desc: '분수를 자연수로, 분수를 분수로 나누기',
    icon: 'pie_chart',
    color: '#14b8a6',
    order: 1,
  },
  {
    id: 'prism',
    name: '각기둥과 각뿔',
    short: '각기둥·각뿔',
    desc: '입체도형의 모서리, 꼭짓점, 면 이해하기',
    icon: 'deployed_code',
    color: '#8b7cf6',
    order: 2,
  },
  {
    id: 'decdiv',
    name: '소수의 나눗셈',
    short: '소수 나눗셈',
    desc: '소수를 자연수로 나누는 여러 방법',
    icon: 'calculate',
    color: '#38bdf8',
    order: 3,
  },
  {
    id: 'ratio',
    name: '비와 비율',
    short: '비와 비율',
    desc: '두 수를 비교하고 비율로 나타내기',
    icon: 'percent',
    color: '#fbbf24',
    order: 4,
  },
  {
    id: 'graph',
    name: '여러 가지 그래프',
    short: '그래프',
    desc: '띠그래프와 원그래프로 자료 나타내기',
    icon: 'bar_chart',
    color: '#ff6b6b',
    order: 5,
  },
  {
    id: 'volume',
    name: '직육면체의 부피와 겉넓이',
    short: '부피·겉넓이',
    desc: '직육면체와 정육면체의 부피, 겉넓이 구하기',
    icon: 'view_in_ar',
    color: '#34d399',
    order: 6,
  },
];

window.getUnit = function(id) {
  return window.UNITS.find(u => u.id === id) || null;
};
