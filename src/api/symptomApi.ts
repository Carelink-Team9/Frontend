import axios from 'axios';

export interface AlternativeDept {
  departmentName: string;
  translatedDepartmentName: string;
  confidence: number;
}

export interface DepartmentRecommendResponse {
  mainDepartment: string;
  translatedMainDepartment: string;
  mainConfidence: number;
  reason: string;
  translatedReason: string;
  doctorSummary: string;
  alternatives: AlternativeDept[];
}

export async function recommendDepartment(
  symptoms: string[],
  customDescription?: string,
): Promise<DepartmentRecommendResponse> {
  const { data } = await axios.post<DepartmentRecommendResponse>('/api/recommendations/department', {
    symptoms,
    ...(customDescription ? { customDescription } : {}),
  });
  return data;
}
