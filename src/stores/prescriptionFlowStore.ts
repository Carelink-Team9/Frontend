import { create } from 'zustand';
import type { PrescriptionResult } from '../api/prescriptionApi';

type PrescriptionFlowStore = {
  file: File | null;
  previewUrl: string | null;
  prescriptionId: number | null;
  result: PrescriptionResult | null;
  selectFile: (file: File, previewUrl: string) => void;
  setPrescriptionId: (prescriptionId: number) => void;
  setResult: (result: PrescriptionResult | null) => void;
  resetFlow: () => void;
};

const initialState = {
  file: null,
  previewUrl: null,
  prescriptionId: null,
  result: null,
};

export const usePrescriptionFlowStore = create<PrescriptionFlowStore>((set) => ({
  ...initialState,
  selectFile: (file, previewUrl) =>
    set({
      file,
      previewUrl,
      prescriptionId: null,
      result: null,
    }),
  setPrescriptionId: (prescriptionId) => set({ prescriptionId }),
  setResult: (result) => set({ result }),
  resetFlow: () => set(initialState),
}));
