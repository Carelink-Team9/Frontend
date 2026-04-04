import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { uploadPrescription } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgCharacter = 'https://www.figma.com/api/mcp/asset/60f1a3c6-3b1e-40ff-b99f-2b3cf898816d';

export default function PrescriptionLoadingScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const file = usePrescriptionFlowStore((state) => state.file);
  const setPrescriptionId = usePrescriptionFlowStore((state) => state.setPrescriptionId);
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    if (!file) {
      navigate('/prescriptions/translate', { replace: true });
      return;
    }

    uploadPrescription(file)
      .then((prescriptionId) => {
        setPrescriptionId(prescriptionId);
        navigate('/prescriptions/result');
      })
      .catch(() => {
        navigate('/prescriptions/translate', { replace: true });
      });
  }, [file, navigate, setPrescriptionId]);

  return (
    <MobileContainer
      header={
        <AppHeader
          title={t('prescription.scanTitle')}
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">{t('common.step', { current: 1, total: 2 })}</span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
        <img src={imgCharacter} alt="" className="h-[30px] w-[30px] animate-spin" style={{ animationDuration: '1.2s' }} />
        <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('prescription.loadingMessage')}</p>
      </div>
    </MobileContainer>
  );
}
