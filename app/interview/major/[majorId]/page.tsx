"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { majorData } from "@/lib/interview-data";

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

type Feedback = {
  score: number;
  feedback: string;
  encouragement: string;
};

type EvaluateResponse = {
  score: number;
  feedback: string;
  encouragement: string;
};

export default function MajorInterviewSession() {
  const params = useParams();
  const majorId = params.majorId as string;
  const major = majorData[majorId as keyof typeof majorData];
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (major && major.questions && major.questions.length > 0 && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `안녕하세요! ${major.name} 면접을 시작하겠습니다.\n\n${major.questions[0]}`
        }
      ]);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [major, messages.length]);

  const handleSubmit = async () => {
    if (!userInput.trim() || isEvaluating) return;
    
    try {
      setIsEvaluating(true);
      
      const userMessage: Message = { 
        role: 'user', 
        content: userInput.trim() 
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: major.questions[currentQuestion],
          answer: userInput.trim(),
          major: major.name,
        }),
      });

      if (!response.ok) {
        throw new Error('API 응답 오류');
      }

      const result: EvaluateResponse = await response.json();
      
      setFeedback({
        score: result.score,
        feedback: result.feedback,
        encouragement: result.encouragement
      });

      setTimeout(() => {
        setFeedback(null);
        if (currentQuestion < major.questions.length - 1) {
          const nextQuestion: Message = {
            role: 'assistant',
            content: major.questions[currentQuestion + 1]
          };
          setMessages(prev => [...prev, nextQuestion]);
          setCurrentQuestion(prev => prev + 1);
        } else {
          const endMessage: Message = {
            role: 'assistant',
            content: "면접이 종료되었습니다. 수고하셨습니다!"
          };
          setMessages(prev => [...prev, endMessage]);
        }
        setUserInput('');
        setIsEvaluating(false);
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '죄송합니다. 답변 평가 중 오류가 발생했습니다. 다시 시도해 주세요.'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsEvaluating(false);
      setUserInput('');
    }
  };

  if (!major) {
    return <div className="p-4">잘못된 학과가 선택되었습니다.</div>;
  }

  return (
    <div className={`min-h-screen ${major.lightColor}`}>
      <div className={`bg-white border-b shadow-sm py-4 px-6 fixed top-0 w-full z-10`}>
        <h1 className={`text-xl font-bold ${major.buttonColor} text-black`}>
          {major.name} 면접
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-8">
        <div className="bg-white rounded-lg shadow-lg p-4 min-h-[70vh] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-900'  // assistant(시스템) 메시지
                    : 'bg-indigo-600 text-white'   // user(사용자) 메시지
                } whitespace-pre-wrap`}
              >
                {message.content}
              </div>
            </div>
          ))}

            {feedback && (
              <div className={`mt-4 p-4 rounded-lg ${
                feedback.score >= 4 ? 'bg-green-50 border border-green-200 text-green-800' :
                feedback.score >= 3 ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' :
                'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="font-bold mb-2">
                  {feedback.score >= 4 ? '훌륭한 답변입니다!' :
                   feedback.score >= 3 ? '좋은 답변입니다.' :
                   '보완이 필요한 답변입니다.'}
                  <span className="ml-2">({feedback.score}/5)</span>
                </div>
                <p className="mb-2">{feedback.feedback}</p>
                <p className="text-sm italic">{feedback.encouragement}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <textarea
              className="flex-1 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="답변을 입력하세요..."
              rows={3}
              disabled={isEvaluating}
            />
            <Button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm px-4 py-2"
              disabled={isEvaluating || !userInput.trim()}
            >
              {isEvaluating ? '평가 중...' : '답변 제출'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}