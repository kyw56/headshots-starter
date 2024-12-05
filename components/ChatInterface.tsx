// components/ChatInterface.tsx
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/interview";
import { INTERVIEW_THEMES } from "@/types/interview";

interface ChatInterfaceProps {
 initialMessage: string;
 questions: { content: string }[];
 type: 'major' | 'personality' | 'common';
}

export function ChatInterface({ initialMessage, questions, type }: ChatInterfaceProps) {
 const [messages, setMessages] = useState<Message[]>([]);
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [userInput, setUserInput] = useState('');
 const [isEvaluating, setIsEvaluating] = useState(false);
 const messagesEndRef = useRef<null | HTMLDivElement>(null);
 const theme = INTERVIEW_THEMES[type];

 useEffect(() => {
   if (messages.length === 0) {
     setMessages([
       {
         role: 'assistant',
         content: initialMessage
       },
       {
         role: 'assistant',
         content: questions[0].content
       }
     ]);
   }
   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [initialMessage, messages.length, questions]);

 const handleSubmit = async () => {
   if (!userInput.trim() || isEvaluating) return;
   
   try {
     setIsEvaluating(true);
     
     const userMessage: Message = {
       role: 'user',
       content: userInput.trim()
     };
     setMessages(prev => [...prev, userMessage]);

     const response = await fetch(`/api/evaluate-${type}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         question: questions[currentQuestion].content,
         answer: userInput.trim()
       }),
     });

     if (!response.ok) {
       throw new Error('API 응답 오류');
     }

     const result = await response.json();
     
     setMessages(prev => [...prev, {
       role: 'assistant',
       content: result.feedback
     }]);

     setTimeout(() => {
       if (currentQuestion < questions.length - 1) {
         setMessages(prev => [...prev, {
           role: 'assistant',
           content: questions[currentQuestion + 1].content
         }]);
         setCurrentQuestion(prev => prev + 1);
       } else {
         setMessages(prev => [...prev, {
           role: 'assistant',
           content: "면접이 종료되었습니다. 수고하셨습니다!"
         }]);
       }
       setUserInput('');
       setIsEvaluating(false);
     }, 2000);

   } catch (error) {
     console.error('Error:', error);
     setMessages(prev => [...prev, {
       role: 'assistant',
       content: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.'
     }]);
     setIsEvaluating(false);
   }
 };

 return (
   <div className={`flex flex-col h-screen ${theme.light}`}>
     {/* 헤더 */}
     <div className={`bg-gradient-to-r ${theme.gradient} text-white py-4 px-6 shadow-md`}>
       <h1 className="text-xl font-bold">
         {type === 'major' ? '전공 면접' : 
          type === 'personality' ? '인성 면접' : '일반 면접'}
       </h1>
     </div>

     {/* 채팅 메시지 영역 */}
     <div className="flex-1 overflow-y-auto p-4 space-y-4">
       {messages.map((message, index) => (
         <div
           key={index}
           className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
         >
           <div
             className={`max-w-[80%] p-4 rounded-lg ${
               message.role === 'assistant'
                 ? 'bg-white shadow-sm'
                 : `${theme.primary} text-white`
             }`}
           >
             {message.content}
           </div>
         </div>
       ))}
       <div ref={messagesEndRef} />
     </div>

     {/* 입력 영역 */}
     <div className="border-t bg-white p-4">
       <div className="flex gap-4">
         <textarea
           value={userInput}
           onChange={(e) => setUserInput(e.target.value)}
           placeholder="답변을 입력하세요..."
           className={`flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 
             ${theme.primary.replace('bg-', 'focus:ring-')}`}
           rows={3}
           disabled={isEvaluating}
         />
         <Button
           onClick={handleSubmit}
           disabled={isEvaluating || !userInput.trim()}
           className={`${theme.primary} text-white ${theme.hover} disabled:opacity-50`}
         >
           {isEvaluating ? '평가 중...' : '답변 제출'}
         </Button>
       </div>
     </div>
   </div>
 );
}