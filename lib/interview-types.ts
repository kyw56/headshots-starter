import { InterviewType, InterviewData } from '@/types/interview';

export const interviewTypes: Record<InterviewType, InterviewData> = {
    major: {
      name: '전공 면접',
      description: '학과별 전공 지식을 평가하는 심층 면접',
      icon: 'academic',
      route: '/major'
    },
    personality: {
      name: '인성 면접',
      description: '가치관, 윤리의식, 협동성 등을 평가하는 면접',
      icon: 'person',
      route: '/personality'
    },
    common: {
      name: '일반 면접',
      description: '기본적인 자기소개와 지원 동기 등을 평가하는 면접',
      icon: 'chat',
      route: '/common'
    }
  };