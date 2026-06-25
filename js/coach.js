// js/coach.js — 앱에서 /api/coach 호출 (폴백 내장)

const FALLBACK = {
  plan: [
    '좋아, 이번 주 목표를 정했네! 무리하지 말고 하루에 조금씩 해보자.',
    '스스로 계획을 세운 게 멋져. 천천히 가도 괜찮아 🌱',
  ],
  stuck: [
    '괜찮아, 틀려도 돼! 잠깐 쉬었다가 다시 해볼까?',
    '어려운 건 원래 시간이 좀 걸리는 거야. 천천히 가자 🌱',
    '여기까지 온 것도 대단해. 한 번 더 차근차근 도전해보자.',
  ],
  reflect: [
    '오늘도 끝까지 해냈네. 그게 제일 중요한 거야 ✨',
    '맞고 틀리고보다, 스스로 풀어본 게 멋져. 내일 또 보자!',
    '꾸준히 하는 네가 정말 멋져. 오늘 푼 만큼 실력이 쌓였어.',
  ],
  default: ['오늘도 같이 해보자!'],
};

function pick(type) {
  const a = FALLBACK[type] || FALLBACK.default;
  return a[Math.floor(Math.random() * a.length)];
}

// 항상 성공하는 코칭 요청 (실패 시 폴백)
window.coach = async function(type, payload) {
  if (location.protocol === 'file:') return pick(type);
  try {
    const r = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload: payload || {} }),
    });
    if (!r.ok) throw new Error('coach ' + r.status);
    const d = await r.json();
    return (d && d.message) ? d.message : pick(type);
  } catch (e) {
    console.warn('[coach] 폴백', e.message);
    return pick(type);
  }
};
