export interface SymptomCategory {
  id: string;
  label: string;
  symptoms: readonly string[];
}

/** Figma 노드 4:66「빠른 증상 선택」카테고리·칩 순서 */
export const SYMPTOM_CATEGORIES: readonly SymptomCategory[] = [
  {
    id: 'resp',
    label: '🫁  호흡 & 감기',
    symptoms: ['기침', '콧물', '목 통증', '숨참'],
  },
  {
    id: 'pain',
    label: '🤕  통증',
    symptoms: ['두통', '근육통', '관절통', '신경통'],
  },
  {
    id: 'fever',
    label: '🤒  발열 & 몸살',
    symptoms: ['발열', '오한', '몸살', '피로'],
  },
  {
    id: 'skin',
    label: '🧴  피부 문제',
    symptoms: ['발진', '진물', '가려움', '따가움'],
  },
  {
    id: 'abdomen',
    label: '🫃 복부 & 소화',
    symptoms: ['복통', '설사', '소화불량', '구토'],
  },
  {
    id: 'body',
    label: '😐  부위별',
    symptoms: ['눈 통증  & 충혈', '귀 통증', '코 막힘'],
  },
  {
    id: 'chest',
    label: '🫀  가슴 & 심장',
    symptoms: ['가슴 통증', '두근 거림', '호흡 곤란'],
  },
] as const;

export function allSymptomLabels(): string[] {
  return SYMPTOM_CATEGORIES.flatMap((c) => [...c.symptoms]);
}
