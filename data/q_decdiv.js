// data/q_decdiv.js — 소수의 나눗셈 + 비와 비율
// 분수 표기: [[분자/분모]]

window.Q_decdiv = [
  // ── 계산 ──
  {
    id: 'decdiv-1', unit: 'decdiv', level: 1, kind: 'calc',
    q: '8.4 ÷ 2 는 얼마일까?',
    answer: '4.2', answerLabel: '4.2',
    hint1: '소수점을 잠깐 잊고 84 ÷ 2 를 먼저 해봐.',
    hint2: '84 ÷ 2 = 42 야. 원래 8.4였으니 소수점은 어디로 갈까?',
    think: '소수점의 위치를 어떻게 정하는지 규칙을 말해볼래?',
  },
  {
    id: 'decdiv-2', unit: 'decdiv', level: 1, kind: 'calc',
    q: '6.5 ÷ 5 를 계산해봐.',
    answer: '1.3', answerLabel: '1.3',
    hint1: '65 ÷ 5 를 먼저 계산해보면 어떨까?',
    hint2: '65 ÷ 5 = 13. 6.5는 65보다 작으니 답도 그만큼 작아져.',
    think: '나누는 수가 그대로일 때, 나누어지는 수가 작아지면 답은?',
  },
  {
    id: 'decdiv-3', unit: 'decdiv', level: 2, kind: 'calc',
    q: '1.6 ÷ 4 는 얼마일까? (몫이 1보다 작아)',
    answer: '0.4', answerLabel: '0.4',
    hint1: '16 ÷ 4 = 4 를 먼저 떠올려봐.',
    hint2: '1.6은 16의 [[1/10]]이야. 그럼 몫도 4의 [[1/10]]이 되겠지.',
    think: '몫이 1보다 작을 때 일의 자리에 무엇을 써야 할까?',
  },
  {
    id: 'decdiv-4', unit: 'decdiv', level: 2, kind: 'calc',
    q: '9.36 ÷ 3 을 계산해봐.',
    answer: '3.12', answerLabel: '3.12',
    hint1: '각 자리를 차례로 나눠봐. 9 ÷ 3, 그 다음 자리...',
    hint2: '936 ÷ 3 = 312 를 구한 뒤 소수점을 맞춰봐.',
    think: '자연수의 나눗셈으로 바꿔 푸는 방법의 장점은 뭘까?',
  },
  {
    id: 'decdiv-5', unit: 'decdiv', level: 2, kind: 'calc',
    q: '7.2 ÷ 6 을 분수로 바꿔서 풀면? (소수로 답해)',
    answer: '1.2', answerLabel: '1.2',
    hint1: '7.2를 분수로 쓰면 [[72/10]] 이야.',
    hint2: '분수로 바꾼 뒤 6으로 나누고, 약분해서 다시 소수로 바꿔봐.',
    think: '소수를 분수로 바꿔 푸는 게 편할 때는 언제일까?',
  },

  // ── 문장제 ──
  {
    id: 'decdiv-6', unit: 'decdiv', level: 2, kind: 'word',
    q: '끈 14.4 m 를 4명이 똑같이 나누면, 한 사람은 몇 m 를 가질까?',
    answer: '3.6', answerLabel: '3.6 m',
    hint1: '"똑같이 나누면"은 나눗셈이야. 전체 길이를 사람 수로 나눠봐.',
    hint2: '144 ÷ 4 = 36 을 구한 뒤 소수점 위치를 생각해봐.',
    think: '답이 맞는지 거꾸로 곱해서 확인하려면 어떻게 할까?',
  },
  {
    id: 'decdiv-7', unit: 'decdiv', level: 3, kind: 'word',
    q: '주스 5.6 L 를 8명이 똑같이 나눠 마시면, 한 사람은 몇 L 를 마실까? (몫이 1보다 작아)',
    answer: '0.7', answerLabel: '0.7 L',
    hint1: '전체를 사람 수로 나눠봐. 56 ÷ 8 을 먼저 계산하면?',
    hint2: '56 ÷ 8 = 7. 5.6은 56의 [[1/10]]이니까 몫도...',
    think: '5.6을 8로 나누면 왜 1보다 작아질까? 5.6과 8을 비교해봐.',
  },
  {
    id: 'decdiv-8', unit: 'decdiv', level: 3, kind: 'word',
    q: '무게가 똑같은 사과 6개의 무게가 2.4 kg 이야. 사과 한 개의 무게는 몇 kg 일까?',
    answer: '0.4', answerLabel: '0.4 kg',
    hint1: '전체 무게를 개수로 나누면 한 개 무게가 나와.',
    hint2: '24 ÷ 6 = 4 를 구한 뒤 소수점을 맞춰봐.',
    think: '한 개의 무게에 6을 곱하면 다시 2.4가 되는지 확인해볼까?',
  },
];

window.Q_ratio = [
  // ── 계산/개념 ──
  {
    id: 'ratio-1', unit: 'ratio', level: 1, kind: 'calc',
    q: '사과 3개와 귤 5개의 비를 기호로 나타내봐. (사과 : 귤)',
    answer: '3:5', answerLabel: '3 : 5',
    hint1: '비는 기호 : 를 써서 나타내. 앞에 오는 것이 먼저야.',
    hint2: '사과가 먼저니까 3을 앞에, 귤 5를 뒤에 써봐.',
    think: '3:5 와 5:3 은 같을까, 다를까? 왜 그럴까?',
  },
  {
    id: 'ratio-2', unit: 'ratio', level: 1, kind: 'calc',
    q: '비 7 : 10 에서 기준량은 어떤 수일까?',
    answer: '10', answerLabel: '10',
    hint1: '기준량은 비교의 "기준"이 되는 수야. 기호 : 의 오른쪽을 봐.',
    hint2: ': 의 오른쪽에 있는 수가 기준량이야.',
    think: '기준량과 비교하는 양, 두 단어의 차이를 설명해볼래?',
  },
  {
    id: 'ratio-3', unit: 'ratio', level: 2, kind: 'calc',
    q: '비 3 : 4 를 비율로 나타내면? (분수로 답해)',
    answer: '3/4', answerLabel: '[[3/4]]',
    hint1: '비율 = 비교하는 양 ÷ 기준량 이야. 분수로도 쓸 수 있어.',
    hint2: '비교하는 양 3이 분자(위), 기준량 4가 분모(아래)야.',
    think: '비를 비율로 바꾸면 무엇이 편해질까?',
  },
  {
    id: 'ratio-4', unit: 'ratio', level: 2, kind: 'calc',
    q: '비율 [[1/4]] 을 백분율(%)로 나타내봐.',
    answer: '25', answerLabel: '25%',
    hint1: '백분율은 비율에 100을 곱하고 % 를 붙여.',
    hint2: '분수에 100을 곱하면 얼마일까?',
    think: '백분율이 일상에서 쓰이는 예를 하나 떠올려봐.',
  },
  {
    id: 'ratio-5', unit: 'ratio', level: 2, kind: 'calc',
    q: '0.6 을 백분율(%)로 나타내봐.',
    answer: '60', answerLabel: '60%',
    hint1: '소수도 100을 곱하면 백분율이 돼.',
    hint2: '0.6 × 100 = ?',
    think: '0.6과 60%가 같은 양이라는 게 이해돼? 왜 그럴까?',
  },

  // ── 문장제 ──
  {
    id: 'ratio-6', unit: 'ratio', level: 2, kind: 'word',
    q: '우리 반 20명 중 12명이 안경을 썼어. 안경 쓴 학생의 비율을 백분율로 나타내봐.',
    answer: '60', answerLabel: '60%',
    hint1: '먼저 비율(분수)을 만들어봐. 안경 쓴 12명이 비교하는 양, 전체 20명이 기준량이야.',
    hint2: '비율을 만든 뒤 100을 곱하면 백분율이 돼.',
    think: '비율을 구할 때 무엇을 분모(기준량)에 두어야 하는지 어떻게 판단했어?',
  },
  {
    id: 'ratio-7', unit: 'ratio', level: 3, kind: 'word',
    q: '1000원짜리 공책이 200원 할인됐어. 할인율은 몇 %일까?',
    answer: '20', answerLabel: '20%',
    hint1: '할인율은 (할인된 금액 ÷ 원래 금액) 을 백분율로 나타낸 거야.',
    hint2: '할인 금액과 원래 금액으로 비율을 만든 뒤 100을 곱해봐.',
    think: '"할인율"의 기준량은 원래 가격일까, 할인된 가격일까?',
  },
  {
    id: 'ratio-8', unit: 'ratio', level: 3, kind: 'word',
    q: '농구 경기에서 10번 슛을 던져 7번 성공했어. 성공률은 몇 %일까?',
    answer: '70', answerLabel: '70%',
    hint1: '성공률 = (성공한 횟수 ÷ 전체 횟수) 를 백분율로.',
    hint2: '7과 10으로 비율을 만든 뒤 100을 곱해봐.',
    think: '성공률이 높다는 건 비율로 보면 어떤 의미일까?',
  },
];
