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
  Clock,
  User2,
  Brain
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
      title: "전공 면접",
      description: "학과별 전공 지식을 평가하는 심층 면접",
      duration: "20분",
      icon: GraduationCap,
      route: "major",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "인성 면접",
      description: "가치관, 윤리의식, 협동성 등을 평가하는 면접",
      duration: "15분",
      icon: User2,
      route: "personality",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "일반 면접",
      description: "자기소개, 지원동기 등 기본적인 면접",
      duration: "15분",
      icon: MessageSquare,
      route: "common",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold">
                GIST AI 면접
              </h1>
              <p className="text-xl text-blue-100">
                AI와 함께하는 맞춤형 면접 연습으로 
                성공적인 면접을 준비하세요.
              </p>
              <div className="flex flex-col space-y-4">
                <Link href="/login">
                  <Button className="w-full lg:w-auto bg-white text-blue-600 hover:bg-blue-50" size="lg">
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
                  <Brain className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-semibold">AI 기반 답변 분석</h3>
                  <p className="text-blue-100">실시간 피드백과 평가</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="pt-4">
                  <GraduationCap className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-semibold">맞춤형 면접 질문</h3>
                  <p className="text-blue-100">전공별/유형별 특화 질문</p>
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
              href={`/interview/${type.route}`}
            >
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className={`${type.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <type.icon className={`h-6 w-6 ${type.color}`} />
                  </div>
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
          <h2 className="text-3xl font-bold mb-8">AI 면접 준비 과정</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">면접 유형 선택</h3>
              <p className="text-gray-600">
                전공, 인성, 일반 면접 중 원하는 유형을 선택하세요
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 면접관과 대화</h3>
              <p className="text-gray-600">
                실제 면접과 유사한 환경에서 AI와 대화를 진행합니다
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">즉각적인 피드백</h3>
              <p className="text-gray-600">
                답변에 대한 점수와 구체적인 개선점을 제공받습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}