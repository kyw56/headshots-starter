import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  MessageSquare, 
  Briefcase, 
  GraduationCap, 
  BookOpen,
  ArrowRight,
  ChevronRight,
  PlayCircle,
  Clock
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  const interviewTypes = [
    {
      title: "전공 기초 면접",
      description: "전공 지식을 검증하는 기본적인 면접 질문",
      duration: "15분",
      icon: BookOpen,
    },
    {
      title: "연구 역량 면접",
      description: "연구 경험과 방법론에 대한 심층 면접",
      duration: "20분",
      icon: GraduationCap,
    },
    {
      title: "인성 및 가치관 면접",
      description: "개인의 가치관과 조직 적합성 평가",
      duration: "25분",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold">
                GIST AI 면접 코치
              </h1>
              <p className="text-xl text-blue-100">
                AI가 제공하는 맞춤형 면접 질문과 피드백으로 
                성공적인 면접을 준비하세요.
              </p>
              <div className="flex flex-col space-y-4">
                <Link href="/login">
                  <Button className="w-full lg:w-auto" size="lg">
                    면접 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="text-blue-100">
                  <span>이미 계정이 있으신가요? </span>
                  <Link className="text-white hover:underline" href="/login">
                    로그인
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-1/2">
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="pt-4">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-semibold">실전 면접 시뮬레이션</h3>
                  <p className="text-blue-100">AI와 실시간 면접 연습</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="pt-4">
                  <Briefcase className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-semibold">전공별 맞춤 질문</h3>
                  <p className="text-blue-100">각 전공에 특화된 면접 준비</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 면접 유형 섹션 */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">면접 유형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviewTypes.map((type) => (
            <Link 
              key={type.title} 
              href={`/interview/${type.title === "전공 기초 면접" ? "major" : 
                     type.title === "연구 역량 면접" ? "research" : "personality"}`}
            >
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <type.icon className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    예상 소요시간: {type.duration}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 기능 설명 섹션 */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-8">면접 준비 과정</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전공 선택</h3>
              <p className="text-gray-600">
                GIST의 다양한 전공 중에서 선택하여 맞춤형 면접을 준비하세요
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 면접 진행</h3>
              <p className="text-gray-600">
                실제 면접과 동일한 환경에서 AI와 면접을 진행합니다
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">상세 피드백</h3>
              <p className="text-gray-600">
                답변에 대한 구체적인 피드백과 개선점을 제공받습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}