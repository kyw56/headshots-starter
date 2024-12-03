// app/interview/major/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { majorData } from "@/lib/interview-data";

export default function MajorInterviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">전공 선택</h1>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(majorData).map(([id, major]) => (
          <Link key={id} href={`/interview/major/${id}`}>
            <Card className="hover:shadow-lg cursor-pointer">
              <CardContent className="p-4">
                <h2 className="text-lg font-medium">{major.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}