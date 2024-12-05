// app/interview/common/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { interviewQuestions } from "@/lib/interview-questions";

const COMMON_THEME = {
  primary: 'bg-emerald-600',
  light: 'bg-emerald-50',
  gradient: 'from-emerald-500 to-emerald-700',
  hover: 'hover:bg-emerald-700'
};

export default function CommonInterviewPage() {
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
                  <span className="text-sm text-emerald-600">5개의 질문</span>
                  <span className="text-sm text-gray-400">예상 소요시간: 15분</span>
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
                  <span className="text-sm text-emerald-600">5개의 질문</span>
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