// app/interview/personality/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { personalityQuestions } from "@/lib/interview-questions/personality-questions";

const PERSONALITY_THEME = {
  primary: 'bg-violet-600',
  light: 'bg-violet-50',
  gradient: 'from-violet-500 to-purple-700',
  hover: 'hover:bg-violet-700'
};

export default function PersonalityInterviewPage() {
  return (
    <div className={`min-h-screen ${PERSONALITY_THEME.light}`}>
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${PERSONALITY_THEME.gradient} text-white py-4 px-6 fixed top-0 w-full z-10 shadow-md`}>
        <h1 className="text-xl font-bold">인성 면접</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <h2 className="text-2xl font-bold mb-6">면접 유형 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/interview/personality/values">
            <Card className={`hover:shadow-lg cursor-pointer transition-all 
              hover:border-violet-500 hover:scale-[1.02]`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900">가치관 면접</h3>
                <p className="text-sm text-gray-500 mt-2">
                  개인의 가치관과 윤리의식을 평가합니다
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-violet-600">5개의 질문</span>
                  <span className="text-sm text-gray-400">예상 소요시간: 15분</span>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/interview/personality/teamwork">
            <Card className={`hover:shadow-lg cursor-pointer transition-all 
              hover:border-violet-500 hover:scale-[1.02]`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900">팀워크 면접</h3>
                <p className="text-sm text-gray-500 mt-2">
                  협동성과 리더십을 평가합니다
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-violet-600">5개의 질문</span>
                  <span className="text-sm text-gray-400">예상 소요시간: 15분</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}