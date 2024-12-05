// lib/interview-questions/index.ts
import { Question } from '@/types/interview';
import { personalityQuestions } from './personality-questions';
import { commonQuestions } from './common-questions';

interface InterviewQuestions {
  personality: Question[];
  research: Question[];
}

export const interviewQuestions: InterviewQuestions = {
  personality: personalityQuestions,
  research: commonQuestions
};