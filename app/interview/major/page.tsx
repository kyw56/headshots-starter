// app/interview/major/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { majorData } from "@/lib/interview-data";

const MAJOR_THEME = {
 primary: 'bg-blue-600',
 light: 'bg-blue-50',
 gradient: 'from-blue-500 to-blue-700',
 hover: 'hover:bg-blue-700'
};

export default function MajorInterviewPage() {
 return (
   <div className={`min-h-screen ${MAJOR_THEME.light}`}>
     {/* 헤더 */}
     <div className={`bg-gradient-to-r ${MAJOR_THEME.gradient} text-white py-4 px-6 fixed top-0 w-full z-10 shadow-md`}>
       <h1 className="text-xl font-bold">전공 면접</h1>
     </div>

     <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
       <h2 className="text-2xl font-bold mb-6">학과 선택</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {Object.entries(majorData).map(([id, major]) => (
           <Link key={id} href={`/interview/major/${id}`}>
             <Card className={`hover:shadow-lg cursor-pointer transition-all 
               hover:border-blue-500 hover:scale-[1.02]`}>
               <CardContent className="p-6">
                 <h3 className="text-lg font-medium text-gray-900">{major.name}</h3>
                 <p className="text-sm text-gray-500 mt-2">
                   전공 지식 및 기초 과학 역량을 평가합니다
                 </p>
                 <div className="flex items-center justify-between mt-4">
                   <span className="text-sm text-blue-600">
                     {major.questions?.length || 0}개의 질문
                   </span>
                   <span className="text-sm text-gray-400">
                     예상 소요시간: 20분
                   </span>
                 </div>
               </CardContent>
             </Card>
           </Link>
         ))}
       </div>
     </div>
   </div>
 );
}