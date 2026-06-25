// api/coach.js — Vercel Serverless Function
// Claude Sonnet으로 학습 코칭 멘트 생성
// 환경변수: ANTHROPIC_API_KEY (Vercel 프로젝트 설정에 등록 필요)

const MODEL = 'claude-sonnet-4-5-20250929';

// 마리 페르소나 — 가르치지 않고 코칭하는 카피바라
const PERSONA = `너는 "마리"라는 이름의 학습 친구야. 초등학교 6학년 아이 옆에서 공부를 돕는 따뜻한 카피바라 캐릭터야.

[가장 중요한 원칙]
- 너는 절대 정답이나 푸는 방법을 알려주지 않아. 가르치는 게 아니라 코칭하는 거야.
- 아이가 "스스로" 생각하고 풀도록 동기와 방향만 줘.
- 6학년은 어린애 취급받는 걸 싫어해. 유치한 말("우와~ 대단해요!!")은 피하고, 친구처럼 자연스럽게.
- 반말로, 짧게(2~3문장). 군더더기 없이.
- 칭찬은 결과보다 "과정과 노력"에. ("끝까지 푼 게 멋져" O / "넌 천재야" X)
- 틀려도 괜찮다는 걸 알려줘. 실수는 배움의 일부야.
- 이모지는 가끔 1개 정도만.`;

function buildPrompt(type, p) {
  p = p || {};
  if (type === 'plan') {
    // 주간 목표 세울 때
    return `${PERSONA}

지금 ${p.name || '아이'}가 이번 주 공부 계획을 세우려고 해. 일주일에 ${p.targetDays || 3}일 공부하기로 정했어.
${p.weakUnit ? `요즘 "${p.weakUnit}" 단원을 좀 어려워하는 것 같아.` : ''}

이 아이가 한 주를 잘 시작하도록, 계획을 응원하는 따뜻한 한마디를 해줘. 부담 주지 말고, 스스로 정한 목표라는 걸 존중하는 느낌으로.`;
  }

  if (type === 'stuck') {
    // 한 단원에서 계속 막힐 때
    return `${PERSONA}

${p.name || '아이'}가 "${p.unitName}" 단원에서 계속 어려워하고 있어. 최근 ${p.total || 0}번 중 ${p.wrong || 0}번 틀렸어.
지금 좀 지치고 속상해 보여.

정답이나 푸는 법은 절대 알려주지 말고, 마음을 다독여줘. "틀려도 괜찮아", "잠깐 쉬어도 돼" 같은 느낌으로. 그리고 천천히 다시 도전해보자고 부드럽게 격려해줘.`;
  }

  if (type === 'reflect') {
    // 학습 후 돌아보기
    const metaLine = p.metaScore != null
      ? `오늘 아이의 메타인지(자기가 아는지 모르는지 판단하는 능력) 점수는 ${p.metaScore}점이야.`
      : '';
    return `${PERSONA}

${p.name || '아이'}가 오늘 ${p.solved || 0}문제를 풀었고, 그 중 ${p.correct || 0}문제를 맞혔어. ${metaLine}

오늘 공부를 마친 아이에게 따뜻하게 돌아봐주는 한마디를 해줘. 점수 자체보다, 스스로 끝까지 해낸 걸 인정해줘. 그리고 내일도 자연스럽게 이어가고 싶게 만들어줘. 숫자를 그대로 읊지 말고 자연스럽게.`;
  }

  return `${PERSONA}\n\n${p.name || '아이'}에게 짧은 응원 한마디 해줘.`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'no api key' });

  try {
    const { type, payload } = req.body || {};
    const prompt = buildPrompt(type, payload);

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error('[coach] API 오류', r.status, t);
      return res.status(502).json({ error: 'api error', status: r.status });
    }

    const data = await r.json();
    const msg = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    return res.status(200).json({ message: msg || '오늘도 같이 해보자!' });
  } catch (e) {
    console.error('[coach] 서버 오류', e);
    return res.status(500).json({ error: 'server error' });
  }
}
