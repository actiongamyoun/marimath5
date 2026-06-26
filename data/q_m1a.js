// data/q_m1a.js — 중1: 소인수분해 + 정수와 유리수
// 분수 표기 [[a/b]], 음수는 그냥 -3 으로

window.Q_factor = [
  // ── 개념/계산 ──
  {
    id: 'factor-1', unit: 'factor', level: 1, kind: 'calc',
    q: '12를 소인수분해하면? (예: 2 × 2 × 3 처럼)',
    answer: '2×2×3', answerLabel: '2 × 2 × 3 ( = 2² × 3 )',
    hint1: '가장 작은 소수 2부터 나눠봐. 12 ÷ 2 = 6, 또 나눠지면 계속 나눠.',
    hint2: '12 → 2로 두 번 나누면 3이 남아. 남은 3도 소수야.',
    think: '소인수분해는 왜 "소수"들의 곱으로만 나타낼까?',
  },
  {
    id: 'factor-2', unit: 'factor', level: 1, kind: 'calc',
    q: '다음 중 소수(prime)는 몇 개일까? → 2, 9, 11, 15, 17',
    answer: '3', answerLabel: '3개 (2, 11, 17)',
    hint1: '소수는 1과 자기 자신으로만 나누어지는 수야.',
    hint2: '9 = 3×3, 15 = 3×5 라서 소수가 아니야. 나머지를 확인해봐.',
    think: '1은 왜 소수가 아닐까?',
  },
  {
    id: 'factor-3', unit: 'factor', level: 2, kind: 'calc',
    q: '18을 소인수분해하면? (거듭제곱 없이, 예: 2 × 3 × 3)',
    answer: '2×3×3', answerLabel: '2 × 3 × 3 ( = 2 × 3² )',
    hint1: '2로 한 번 나누면 9가 남아.',
    hint2: '9는 3 × 3 이야.',
    think: '같은 소수가 여러 번 나오면 거듭제곱으로 어떻게 줄여 쓸까?',
  },
  {
    id: 'factor-4', unit: 'factor', level: 2, kind: 'calc',
    q: '12와 18의 최대공약수는?',
    answer: '6', answerLabel: '6',
    hint1: '두 수를 각각 소인수분해해봐. 12 = 2×2×3, 18 = 2×3×3.',
    hint2: '공통으로 들어있는 소인수를 곱해봐. 2와 3이 공통이야.',
    think: '최대공약수는 왜 "공통 소인수의 곱"일까?',
  },
  // ── 문장제 ──
  {
    id: 'factor-5', unit: 'factor', level: 2, kind: 'word',
    q: '사탕 12개와 초콜릿 18개를 최대한 많은 친구에게 똑같이 나눠주려고 해. 최대 몇 명에게 줄 수 있을까?',
    answer: '6', answerLabel: '6명',
    hint1: '"똑같이 나눠주는 최대 인원"은 두 수의 최대공약수야.',
    hint2: '12와 18의 공통 약수 중 가장 큰 수를 찾아봐.',
    think: '왜 이 상황이 최대공약수 문제일까? 나눠주는 의미를 생각해봐.',
  },
  {
    id: 'factor-6', unit: 'factor', level: 3, kind: 'word',
    q: '버스 A는 6분마다, 버스 B는 8분마다 출발해. 방금 동시에 출발했다면, 다음에 동시에 출발하는 건 몇 분 후일까?',
    answer: '24', answerLabel: '24분 후',
    hint1: '"다시 동시에"는 두 수의 최소공배수야.',
    hint2: '6과 8의 공배수 중 가장 작은 수를 찾아봐.',
    think: '최대공약수 문제와 최소공배수 문제는 어떻게 구분할까?',
  },
];

window.Q_integer = [
  // ── 계산 ──
  {
    id: 'integer-1', unit: 'integer', level: 1, kind: 'calc',
    q: '(+5) + (-3) 은 얼마일까?',
    answer: '2', answerLabel: '+2',
    hint1: '부호가 다른 두 수의 덧셈은, 절댓값의 차를 구해.',
    hint2: '5와 3의 차는 2. 절댓값이 큰 +5의 부호를 따라가.',
    think: '수직선에서 +5에서 왼쪽으로 3칸 가면 어디일까?',
  },
  {
    id: 'integer-2', unit: 'integer', level: 1, kind: 'calc',
    q: '(-4) + (-6) 은 얼마일까?',
    answer: '-10', answerLabel: '-10',
    hint1: '부호가 같은 두 수의 덧셈은, 절댓값을 더하고 공통 부호를 붙여.',
    hint2: '4 + 6 = 10, 둘 다 음수니까 부호는?',
    think: '음수 + 음수가 왜 더 작은 음수가 될까? 빚으로 생각해봐.',
  },
  {
    id: 'integer-3', unit: 'integer', level: 2, kind: 'calc',
    q: '(-7) - (-2) 는 얼마일까?',
    answer: '-5', answerLabel: '-5',
    hint1: '빼기는 "부호를 바꿔서 더하기"로 바꿀 수 있어.',
    hint2: '(-7) - (-2) = (-7) + (+2) 가 돼.',
    think: '뺄셈을 덧셈으로 바꾸는 규칙을 한 문장으로 말해볼래?',
  },
  {
    id: 'integer-4', unit: 'integer', level: 2, kind: 'calc',
    q: '(-3) × (+4) 는 얼마일까?',
    answer: '-12', answerLabel: '-12',
    hint1: '절댓값끼리 먼저 곱해. 3 × 4 = 12.',
    hint2: '부호가 다르면(음×양) 결과는 음수야.',
    think: '음수 × 양수가 음수인 이유를 규칙으로 기억해봐.',
  },
  {
    id: 'integer-5', unit: 'integer', level: 2, kind: 'calc',
    q: '(-2) × (-5) 는 얼마일까?',
    answer: '10', answerLabel: '+10',
    hint1: '절댓값끼리 곱하면 2 × 5 = 10.',
    hint2: '부호가 같으면(음×음) 결과는 양수야.',
    think: '음수 × 음수가 양수가 되는 건 왜일까? 규칙으로 외워두면 편해.',
  },
  // ── 문장제 ──
  {
    id: 'integer-6', unit: 'integer', level: 2, kind: 'word',
    q: '엘리베이터가 3층에서 5층 내려갔다가 다시 7층 올라갔어. 지금 몇 층일까? (지하는 음수)',
    answer: '5', answerLabel: '5층',
    hint1: '내려가는 건 음수(-), 올라가는 건 양수(+)로 식을 세워봐.',
    hint2: '3 + (-5) + (+7) 을 계산해봐.',
    think: '"내려갔다"를 왜 음수로 표현하면 편할까?',
  },
  {
    id: 'integer-7', unit: 'integer', level: 3, kind: 'word',
    q: '어제보다 기온이 3도 떨어졌고, 오늘 다시 2도 더 떨어졌어. 어제가 1도였다면 지금 기온은?',
    answer: '-4', answerLabel: '-4도',
    hint1: '떨어지는 건 음수야. 1 + (-3) + (-2) 를 세워봐.',
    hint2: '1에서 3 내려가면 -2, 거기서 2 더 내려가면?',
    think: '0도보다 낮은 온도를 음수로 나타내면 계산이 왜 편해질까?',
  },
];
