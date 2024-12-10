import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, answer, type } = await req.json();
    
    // 요청 데이터 로깅
    console.log('Request data:', { question, answer, type });

    // 면접 유형에 따른 시스템 메시지 설정
    let systemContent = '';
    
    // type이 문자열이고 유효한 값인지 확인
    const interviewType = typeof type === 'string' ? type : 'major';
    
    if (interviewType.includes('personality')) {
      systemContent = `당신은 인성 면접관입니다. 학생의 답변을 다음 기준으로 평가해 주세요:

1. 가치관 명확성
- 개인의 가치관과 신념의 명확한 표현
- 경험을 통한 가치관 형성 과정
- 실천 의지와 구체성

2. 성찰능력
- 자기이해의 깊이
- 경험에서의 학습과 성장
- 개선의지와 발전가능성

3. 의사소통능력
- 명확한 표현과 논리적 전달
- 경청과 이해의 태도
- 감정과 생각의 균형적 표현

4. 협업역량
- 팀워크와 리더십 경험
- 갈등해결 능력
- 공동체 의식`;
    } else if (interviewType.includes('common')) {
      systemContent = `당신은 일반 면접관입니다. 학생의 답변을 다음 기준으로 평가해 주세요:

1. 학업 열정
- 학업에 대한 진정성
- 구체적인 학업 계획
- 자기주도적 학습 능력

2. 발전 가능성
- 성장 마인드셋
- 도전 정신
- 문제해결 능력

3. 전문성 개발
- 관심 분야에 대한 이해도
- 자기계발 노력
- 미래 비전의 구체성

4. 사회적 책임감
- 공동체 의식
- 윤리적 판단력
- 사회 기여 의지`;
    } else {
      systemContent = `당신은 전공 면접관입니다. 학생의 답변을 다음 기준으로 평가해 주세요:

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
- 다양한 관점에서의 분석`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: `질문: ${question}\n답변: ${answer}\n\n다음 형식의 JSON으로 평가해주세요:
{
  "score": 1-5 사이의 점수 (1: 매우 미흡, 2: 미흡, 3: 보통, 4: 우수, 5: 매우 우수),
  "feedback": "각 평가 기준별 구체적인 피드백과 개선점",
  "encouragement": "학생의 발전을 위한 건설적인 조언과 격려의 말"
}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    console.log('OpenAI response:', content);

    let parsedContent;
    try {
      parsedContent = JSON.parse(content || '{}');
      console.log('Parsed content:', parsedContent);

      if (!parsedContent.score || !parsedContent.feedback || !parsedContent.encouragement) {
        throw new Error('Invalid response format');
      }
    } catch (e) {
      console.error('JSON parsing error:', e);
      return NextResponse.json({
        score: 3,
        feedback: "답변 처리 중 일시적인 오류가 발생했습니다.",
        encouragement: "잠시 후 다시 시도해 주세요.",
        error: process.env.NODE_ENV === 'development' ? content : undefined
      });
    }

    return NextResponse.json(parsedContent);
  } catch (error: any) {
    console.error('API error details:', error);
    
    return NextResponse.json({
      score: 3,
      feedback: "면접관이 답변을 검토중입니다.",
      encouragement: "잠시 후 다시 시도해 주세요.",
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}