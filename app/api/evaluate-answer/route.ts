import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, answer, major } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `당신은 ${major} 면접관입니다. 학생의 답변을 다음 기준으로 종합적으로 평가해 주세요:

1. 전문성 (전공 지식)
- 핵심 개념의 정확한 이해도
- 관련 이론과 원리의 설명 능력
- 실제 응용 사례 제시 능력

2. 논리성 (답변 구조)
- 답변의 체계적인 구성
- 인과관계의 명확한 설명
- 주장과 근거의 적절성

3. 표현력 (전달 방식)
- 설명의 명확성과 간결성
- 전문 용어의 적절한 사용
- 답변의 완성도

4. 문제 해결력
- 창의적 사고와 접근 방식
- 실현 가능한 해결책 제시
- 다양한 관점에서의 분석

특별 고려사항:
- "모르겠다" 등의 답변은 즉시 부정적으로 평가하지 말고, 솔직함을 인정하면서 개선 방향을 제시해주세요.
- 부분적으로 맞는 답변은 긍정적인 부분을 인정하고, 보완이 필요한 부분을 구체적으로 설명해주세요.
- 학생의 자신감과 성장 가능성을 고려하여 건설적인 피드백을 제공해주세요.`
        },
        {
          role: "user",
          content: `질문: ${question}
답변: ${answer}

다음 형식의 JSON으로 평가해주세요:
{
  "score": 1-5 사이의 점수 (1: 매우 미흡, 2: 미흡, 3: 보통, 4: 우수, 5: 매우 우수),
  "feedback": "각 평가 기준별 구체적인 피드백과 개선점",
  "encouragement": "학생의 발전을 위한 건설적인 조언과 격려의 말"
}`
        }
      ],
      temperature: 0.7, // 적당한 창의성을 위한 temperature 설정
      max_tokens: 1000, // 충분한 응답 길이 확보
    });

    const content = response.choices[0].message.content;
    const parsedContent = JSON.parse(content || '');

    if (!parsedContent.score || !parsedContent.feedback || !parsedContent.encouragement) {
      throw new Error('Invalid response format');
    }

    return NextResponse.json(parsedContent);
  } catch (error : any) {
    console.error('OpenAI API 에러:', error);
    
    return NextResponse.json({
      error: '답변 평가 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}