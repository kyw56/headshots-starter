export type InterviewType = 'major' | 'personality' | 'common';

export interface InterviewData {
  name: string;
  description: string;
  icon: string;
  route: string;
  color?: string;
  bgColor?: string;
  duration?: string;
}

export interface Question {
  id: number;
  content: string;
  category?: string;
}

export interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export interface Feedback {
  score: number;
  feedback: string;
  encouragement: string;
}

export interface InterviewSession {
  type: InterviewType;
  questions: Question[];
  currentQuestion: number;
  messages: Message[];
}

export interface ThemeColors {
  primary: string;
  light: string;
  gradient: string;
  hover: string;
}

export const INTERVIEW_THEMES: Record<'major' | 'personality' | 'common', ThemeColors> = {
  major: {
    primary: 'bg-blue-600',
    light: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-700',
    hover: 'hover:bg-blue-700'
  },
  personality: {
    primary: 'bg-violet-600',
    light: 'bg-violet-50',
    gradient: 'from-violet-500 to-purple-700',
    hover: 'hover:bg-violet-700'
  },
  common: {
    primary: 'bg-emerald-600',
    light: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-emerald-700',
    hover: 'hover:bg-emerald-700'
  }
};