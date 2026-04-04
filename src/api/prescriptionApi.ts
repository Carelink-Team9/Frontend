import axios from 'axios';

export interface PrescriptionSummary {
  prescriptionId: number;
  totalDrugCount: number;
  prescribedAt: string;
  imageUrl: string | null;
}

export interface DrugDetail {
  drugName: string;
  originalName: string | null;
  dosage: string;
  frequency: string;
  duration: string;
  translatedContent: string;
  sideEffects: string | null;
  precautions: string | null;
  foodInteraction: string | null;
  handwrittenNote: string | null;
}

export interface PrescriptionResult {
  prescriptionId: number;
  createdAt: string;
  imageUrl: string | null;
  drugs: DrugDetail[];
}

/**
 * 처방전 이미지를 업로드하고 AI 분석을 시작합니다.
 * @returns 생성된 prescriptionId
 */
export async function uploadPrescription(file: File): Promise<number> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.post<number>('/api/prescriptions/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}

/**
 * 분석이 완료된 처방전 결과를 조회합니다.
 */
export async function fetchPrescriptionResult(prescriptionId: number): Promise<PrescriptionResult> {
  const { data } = await axios.get<PrescriptionResult>(`/api/prescriptions/${prescriptionId}`);
  return data;
}

/**
 * 처방전 전체 목록을 최신순으로 조회합니다.
 */
export async function fetchPrescriptionHistory(): Promise<PrescriptionSummary[]> {
  const { data } = await axios.get<PrescriptionSummary[]>('/api/prescriptions/history');
  return data;
}

/**
 * 가장 최근 처방전 1건을 조회합니다 (홈 화면용).
 * 처방전이 없으면 null을 반환합니다.
 */
export async function fetchLatestPrescription(): Promise<PrescriptionSummary | null> {
  try {
    const { data } = await axios.get<PrescriptionSummary>('/api/prescriptions/latest');
    return data;
  } catch {
    return null;
  }
}
