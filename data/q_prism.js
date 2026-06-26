// data/q_prism.js — 각기둥과 각뿔 + 그래프 + 부피·겉넓이
// 각 단원에 계산/개념 + 문장제를 섞어 구성

window.Q_prism = [
  // ── 개념 ──
  {
    id: 'prism-1', unit: 'prism', level: 1, kind: 'calc',
    q: '삼각기둥의 면은 모두 몇 개일까?',
    answer: '5', answerLabel: '5개',
    hint1: '각기둥은 위아래에 똑같은 면(밑면)이 2개 있어.',
    hint2: '밑면 2개에, 옆을 둘러싼 면(옆면) 3개를 더해봐.',
    think: '밑면의 모양과 옆면의 개수 사이에 어떤 관계가 있을까?',
  },
  {
    id: 'prism-2', unit: 'prism', level: 1, kind: 'calc',
    q: '사각기둥의 모서리는 모두 몇 개일까?',
    answer: '12', answerLabel: '12개',
    hint1: '밑면(사각형)의 모서리는 위아래 각각 4개씩이야.',
    hint2: '위 4개 + 아래 4개 + 기둥을 세운 옆 모서리 4개를 더해봐.',
    think: '밑면이 오각형이면 모서리는 몇 개가 될지 같은 방법으로 생각해봐.',
  },
  {
    id: 'prism-3', unit: 'prism', level: 2, kind: 'calc',
    q: '삼각뿔의 꼭짓점은 모두 몇 개일까?',
    answer: '4', answerLabel: '4개',
    hint1: '각뿔은 밑면이 1개이고, 위로 한 점에 모여.',
    hint2: '밑면(삼각형)의 꼭짓점 3개 + 맨 위의 뾰족한 점 1개.',
    think: '각기둥과 각뿔은 꼭짓점을 세는 방법이 어떻게 다를까?',
  },
  {
    id: 'prism-4', unit: 'prism', level: 2, kind: 'calc',
    q: '오각기둥의 꼭짓점은 모두 몇 개일까?',
    answer: '10', answerLabel: '10개',
    hint1: '밑면이 오각형이니 꼭짓점이 5개씩이야.',
    hint2: '위 5개 + 아래 5개.',
    think: '밑면의 변의 수와 꼭짓점 수의 관계를 식으로 만들 수 있을까?',
  },

  // ── 문장제 ──
  {
    id: 'prism-5', unit: 'prism', level: 2, kind: 'word',
    q: '어떤 각기둥의 면이 모두 7개야. 이 각기둥의 밑면은 몇 각형일까?',
    answer: '5', answerLabel: '오각형 (5)',
    hint1: '각기둥의 면 = 밑면 2개 + 옆면. 옆면 수는 밑면의 변의 수와 같아.',
    hint2: '전체 면에서 밑면 2개를 빼면 옆면 수가 나와. 옆면 수가 곧 밑면의 변의 수야.',
    think: '거꾸로 생각하기: 면의 수에서 밑면 모양을 알아내는 과정을 정리해봐.',
  },
  {
    id: 'prism-6', unit: 'prism', level: 3, kind: 'word',
    q: '민수가 만든 각뿔의 꼭짓점이 6개야. 이 각뿔의 밑면은 몇 각형일까?',
    answer: '5', answerLabel: '오각형 (5)',
    hint1: '각뿔의 꼭짓점 = 밑면의 꼭짓점 + 맨 위 1개.',
    hint2: '전체 꼭짓점에서 맨 위 1개를 빼면 밑면의 꼭짓점 수가 나와.',
    think: '각뿔과 각기둥은 같은 "밑면 모양"이라도 꼭짓점 수가 다른 이유는?',
  },
];

window.Q_graph = [
  // ── 개념 ──
  {
    id: 'graph-1', unit: 'graph', level: 1, kind: 'calc',
    q: '띠그래프 전체는 몇 %를 나타낼까?',
    answer: '100', answerLabel: '100%',
    hint1: '띠그래프는 전체를 하나의 띠로 보고 부분을 나눠.',
    hint2: '전체는 항상 가득 찬 100% 야.',
    think: '각 부분의 백분율을 모두 더하면 얼마가 되어야 할까?',
  },
  {
    id: 'graph-2', unit: 'graph', level: 1, kind: 'calc',
    q: '원그래프에서 한 항목이 전체의 [[1/4]]을 차지하면 몇 %일까?',
    answer: '25', answerLabel: '25%',
    hint1: '분수를 백분율로 바꿔봐.',
    hint2: '분수에 100을 곱하면 백분율이 돼.',
    think: '원그래프에서 [[1/4]]은 원의 각도로 몇 도일까?',
  },
  {
    id: 'graph-3', unit: 'graph', level: 2, kind: 'calc',
    q: '어떤 항목이 30%, 다른 항목이 45%야. 나머지 한 항목은 몇 %일까?',
    answer: '25', answerLabel: '25%',
    hint1: '전체가 100%라는 걸 기억해.',
    hint2: '100에서 이미 나온 백분율들을 빼봐.',
    think: '비어 있는 부분을 구할 때 왜 전체에서 빼면 될까?',
  },

  // ── 문장제 ──
  {
    id: 'graph-4', unit: 'graph', level: 2, kind: 'word',
    q: '40명에게 좋아하는 운동을 물었더니 25%가 축구라고 했어. 축구를 좋아하는 학생은 몇 명일까?',
    answer: '10', answerLabel: '10명',
    hint1: '25%는 비율로 [[1/4]]이야. 전체에서 그만큼을 구해봐.',
    hint2: '전체 40명에 0.25를 곱하거나, 40의 [[1/4]]을 구해봐.',
    think: '백분율로 실제 인원을 구할 때 어떤 계산을 했어?',
  },
  {
    id: 'graph-5', unit: 'graph', level: 3, kind: 'word',
    q: '띠그래프에서 A 항목이 전체의 20%이고 학생 수로는 8명이야. 조사한 전체 학생은 몇 명일까?',
    answer: '40', answerLabel: '40명',
    hint1: '20%가 8명이라는 걸 이용해. 1%는 몇 명일까?',
    hint2: '8명이 20%니까, 1%에 해당하는 인원을 먼저 구한 뒤 100배 해봐.',
    think: '부분과 백분율을 알 때 전체를 구하는 방법을 정리해봐.',
  },
];

window.Q_volume = [
  // ── 계산 ──
  {
    id: 'volume-1', unit: 'volume', level: 1, kind: 'calc',
    q: '가로 2, 세로 3, 높이 4 인 직육면체의 부피는? (단위 생략)',
    answer: '24', answerLabel: '24',
    hint1: '직육면체의 부피 = 가로 × 세로 × 높이 야.',
    hint2: '2 × 3 × 4 를 계산해봐.',
    think: '부피의 단위는 왜 세제곱(㎤)을 쓸까?',
  },
  {
    id: 'volume-2', unit: 'volume', level: 1, kind: 'calc',
    q: '한 모서리가 5 인 정육면체의 부피는?',
    answer: '125', answerLabel: '125',
    hint1: '정육면체는 가로·세로·높이가 모두 같아.',
    hint2: '5 × 5 × 5 를 계산해봐.',
    think: '정육면체 부피를 한 번에 구하는 식으로 쓸 수 있을까?',
  },
  {
    id: 'volume-3', unit: 'volume', level: 2, kind: 'calc',
    q: '한 모서리가 3 인 정육면체의 겉넓이는?',
    answer: '54', answerLabel: '54',
    hint1: '정육면체는 똑같은 정사각형 면이 6개야.',
    hint2: '면 하나의 넓이 3×3=9, 면이 6개니까 9 × 6.',
    think: '겉넓이와 부피는 무엇이 다를까? 단위도 생각해봐.',
  },
  {
    id: 'volume-4', unit: 'volume', level: 3, kind: 'calc',
    q: '가로 5, 세로 3, 높이 2 인 직육면체의 겉넓이는?',
    answer: '62', answerLabel: '62',
    hint1: '마주 보는 면이 3쌍이야: (가로×세로), (가로×높이), (세로×높이).',
    hint2: '세 종류 면의 넓이를 더한 뒤 2배를 해봐.',
    think: '왜 세 가지 면을 구하고 2배를 할까? 직육면체를 펼쳐서 떠올려봐.',
  },

  // ── 문장제 ──
  {
    id: 'volume-5', unit: 'volume', level: 2, kind: 'word',
    q: '가로 4 cm, 세로 4 cm, 높이 2 cm 인 상자에 물을 가득 채우면 물의 부피는 몇 ㎤일까?',
    answer: '32', answerLabel: '32 ㎤',
    hint1: '물이 가득 찬 부피는 상자의 부피와 같아. 가로 × 세로 × 높이.',
    hint2: '밑면(4×4)을 먼저 구하고 높이 2를 곱해봐.',
    think: '"밑면의 넓이 × 높이"로도 부피를 구할 수 있는 이유는?',
  },
  {
    id: 'volume-6', unit: 'volume', level: 3, kind: 'word',
    q: '부피가 27 ㎤인 정육면체 모양 주사위가 있어. 이 주사위의 한 모서리는 몇 cm 일까?',
    answer: '3', answerLabel: '3 cm',
    hint1: '거꾸로 생각하기: 어떤 수를 세 번 곱하면 27이 될까?',
    hint2: '□ × □ × □ = 27. 같은 수 세 개의 곱이 27인 수를 찾아봐.',
    think: '부피에서 모서리를 거꾸로 찾는 과정을 말로 설명해봐.',
  },
];
