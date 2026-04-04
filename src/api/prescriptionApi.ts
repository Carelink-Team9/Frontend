import axios from 'axios';

export interface DrugDetail {
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  translatedContent: string;
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
