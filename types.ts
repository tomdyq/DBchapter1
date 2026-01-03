export interface ChapterSection {
  id: string;
  title: string;
  subTitle: string;
  overview: string;
  keyPoints: string[];
  teacherScript: string;
  studentBenefits: string;
  interactionGuide: string;
}

export enum ViewState {
  REAL_WORLD = 'REAL_WORLD',
  CONCEPTUAL = 'CONCEPTUAL',
  LOGICAL = 'LOGICAL'
}