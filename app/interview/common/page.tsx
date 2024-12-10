"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { commonQuestions } from "@/lib/interview-questions/common-questions";
import { INTERVIEW_THEMES } from "@/types/interview";

const COMMON_THEME = INTERVIEW_THEMES.common;

export default function CommonInterviewPage() {
  const methodologyQuestions = commonQuestions.filter(q => 
    q.category && ["비전", "시사인식", "학업계획", "관심분야"].includes(q.category)
  );

  const experienceQuestions = commonQuestions.filter(q => 
    q.category && ["학교생활", "도전경험", "준비성", "도전의식"].includes(q.category)
  );

  return (
    <div className={`min-h-screen ${COMMON_THEME.light}`}>
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${COMMON_THEME.gradient} text-white py-4 px-6 fixed top-0 w-full z-10 shadow-md`}>
        <h1 className="text-xl font-bold">연구 역량 면접</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <h2 className="text-2xl font-bold mb-6">연구 분야 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/interview/common/methodology">
            <Card className={`hover:shadow-lg cursor-pointer transition-all 
              hover:border-emerald-500 hover:scale-[1.02]`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900">연구 방법론</h3>
                <p className="text-sm text-gray-500 mt-2">
                  연구 설계와 방법론에 대한 이해도를 평가합니다
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-emerald-600">{methodologyQuestions.length}개의 질문</span>
                  <span className="text-sm text-gray-400">예상 소요시간: {Math.ceil(methodologyQuestions.length * 3)}분</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/interview/common/experience">
            <Card className={`hover:shadow-lg cursor-pointer transition-all 
              hover:border-emerald-500 hover:scale-[1.02]`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900">연구 경험</h3>
                <p className="text-sm text-gray-500 mt-2">
                  실제 연구 경험과 문제해결 능력을 평가합니다
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-emerald-600">{experienceQuestions.length}개의 질문</span>
                  <span className="text-sm text-gray-400">예상 소요시간: {Math.ceil(experienceQuestions.length * 3)}분</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}