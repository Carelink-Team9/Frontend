export type PrescriptionStatus = 'active' | 'archived';

export interface PrescriptionSummary {
  id: string;
  name: string;
  issuedAt: string;
  hospitalName: string;
  doctorName: string;
  medicationCount: number;
  status: PrescriptionStatus;
}
