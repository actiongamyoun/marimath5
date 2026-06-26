// data/q_m1b.js — 중1: 문자와 식 + 일차방정식

window.Q_letter = [
  // ── 개념/계산 ──
  {
    id: 'letter-1', unit: 'letter', level: 1, kind: 'calc',
    q: 'a × 3 을 곱셈 기호 없이 간단히 쓰면?',
    answer: '3a', answerLabel: '3a',
    hint1: '문자와 수의 곱은 곱셈 기호를 생략하고, 수를 문자 앞에 써.',
    hint2: '3과 a를 붙여 쓰면 돼. 수가 앞이야.',
    think: '왜 "a3"이 아니라 "3a"로 쓰기로 약속했을까?',
  },
  {
    id: 'letter-2', unit: 'letter', level: 1, kind: 'calc',
    q: 'x × x 를 간단히 쓰면?',
    answer: 'x²', answerLabel: 'x² (x의 제곱)',
    hint1: '같은 문자의 곱은 거듭제곱으로 나타내.',
    hint2: 'x를 두 번 곱했으니 x의 2제곱이야.',
    think: 'x × x × x 는 어떻게 쓸까?',
  },
  {
    id: 'letter-3', unit: 'letter', level: 2, kind: 'calc',
    q: 'x = 2 일 때, 3x + 1 의 값은?',
    answer: '7', answerLabel: '7',
    hint1: 'x 자리에 2를 대입해봐. 3 × 2 + 1.',
    hint2: '3 × 2 = 6, 거기에 1을 더하면?',
    think: '문자에 수를 넣는 것을 "대입"이라고 해. 왜 유용할까?',
  },
  {
    id: 'letter-4', unit: 'letter', level: 2, kind: 'calc',
    q: '2x + 3x 를 간단히 하면?',
    answer: '5x', answerLabel: '5x',
    hint1: '같은 문자끼리(동류항) 모을 수 있어.',
    hint2: '2x와 3x는 x가 같으니, 계수 2와 3을 더해.',
    think: '2x + 3y 는 왜 더 간단히 못 할까?',
  },
  // ── 문장제 ──
  {
    id: 'letter-5', unit: 'letter', level: 2, kind: 'word',
    q: '한 개에 500원인 사탕을 x개 샀어. 전체 가격을 x를 써서 식으로 나타내봐.',
    answer: '500x', answerLabel: '500x (원)',
    hint1: '한 개 가격 × 개수 = 전체 가격이야.',
    hint2: '500과 x를 곱하면 돼. 곱셈 기호는 생략.',
    think: '개수를 문자 x로 두면 어떤 점이 편할까?',
  },
  {
    id: 'letter-6', unit: 'letter', level: 3, kind: 'word',
    q: '나이가 13살인 형보다 x살 어린 동생의 나이를 식으로 나타내봐.',
    answer: '13-x', answerLabel: '(13 - x) 살',
    hint1: '"~보다 어리다"는 빼기야.',
    hint2: '형 나이 13에서 x를 빼면 돼.',
    think: 'x가 5라면 동생은 몇 살일까? 식에 넣어 확인해봐.',
  },
];

window.Q_equation = [
  // ── 계산 ──
  {
    id: 'equation-1', unit: 'equation', level: 1, kind: 'calc',
    q: 'x + 3 = 7 일 때, x 는?',
    answer: '4', answerLabel: 'x = 4',
    hint1: '양변에서 같은 수를 빼도 등식은 유지돼. 양변에서 3을 빼봐.',
    hint2: 'x = 7 - 3 이 되겠지.',
    think: '"양변에 같은 일을 한다"는 등식의 성질을 떠올려봐.',
  },
  {
    id: 'equation-2', unit: 'equation', level: 1, kind: 'calc',
    q: '2x = 10 일 때, x 는?',
    answer: '5', answerLabel: 'x = 5',
    hint1: '양변을 같은 수로 나눠도 등식은 유지돼. 양변을 2로 나눠봐.',
    hint2: 'x = 10 ÷ 2.',
    think: 'x 앞의 2를 없애려면 어떤 연산을 해야 할까?',
  },
  {
    id: 'equation-3', unit: 'equation', level: 2, kind: 'calc',
    q: '2x + 1 = 9 일 때, x 는?',
    answer: '4', answerLabel: 'x = 4',
    hint1: '먼저 양변에서 1을 빼서 2x = 8 을 만들어.',
    hint2: '2x = 8 이면 양변을 2로 나눠.',
    think: '왜 더하기를 먼저 없애고, 곱하기를 나중에 없앨까?',
  },
  {
    id: 'equation-4', unit: 'equation', level: 2, kind: 'calc',
    q: '3x - 2 = x + 6 일 때, x 는?',
    answer: '4', answerLabel: 'x = 4',
    hint1: 'x항은 왼쪽으로, 숫자는 오른쪽으로 모아봐.',
    hint2: '양변에서 x를 빼면 2x - 2 = 6. 그 다음 +2, ÷2.',
    think: '문자를 한쪽으로 모으는 것을 "이항"이라고 해. 부호는 어떻게 될까?',
  },
  // ── 문장제 ──
  {
    id: 'equation-5', unit: 'equation', level: 2, kind: 'word',
    q: '어떤 수에 4를 더했더니 11이 됐어. 어떤 수는? (방정식으로 풀어봐)',
    answer: '7', answerLabel: '7',
    hint1: '어떤 수를 x로 두고 식을 세워봐. x + 4 = 11.',
    hint2: '양변에서 4를 빼면 x를 구할 수 있어.',
    think: '"어떤 수"를 x로 두는 게 왜 문제를 쉽게 만들까?',
  },
  {
    id: 'equation-6', unit: 'equation', level: 3, kind: 'word',
    q: '연필 한 자루 가격의 3배에 500원을 더하면 2000원이야. 연필 한 자루는 얼마일까?',
    answer: '500', answerLabel: '500원',
    hint1: '연필 가격을 x로 두면 3x + 500 = 2000 이야.',
    hint2: '양변에서 500을 빼고, 3으로 나눠봐.',
    think: '문장을 식으로 바꿀 때 "3배", "더하면"을 각각 어떤 기호로 옮겼어?',
  },
];
