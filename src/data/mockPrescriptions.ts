import type { PrescriptionSummary } from '../types/prescription';

export const MOCK_PRESCRIPTIONS: PrescriptionSummary[] = [
  {
    id: 'rx-001',
    name: '감기약 처방전',
    issuedAt: '2026-04-02',
    hospitalName: '서울대학교 병원',
    doctorName: '김의사',
    medicationCount: 3,
    status: 'active',
  },
  {
    id: 'rx-002',
    name: '위장약 처방전',
    issuedAt: '2026-03-28',
    hospitalName: '서울중앙내과의원',
    doctorName: '이의사',
    medicationCount: 2,
    status: 'active',
  },
  {
    id: 'rx-003',
    name: '항생제 처방전',
    issuedAt: '2026-03-10',
    hospitalName: '강남가정의학과',
    doctorName: '박의사',
    medicationCount: 4,
    status: 'archived',
  },
];
