import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { uploadPrescription } from '../../api/prescriptionApi';

const imgCharacter = 'https://www.figma.com/api/mcp/asset/60f1a3c6-3b1e-40ff-b99f-2b3cf898816d';

export default function PrescriptionLoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { file, previewUrl } = (location.state ?? {}) as { file?: File; previewUrl?: string };

  useEffect(() => {
    if (!file) {
      // 파일 없이 직접 접근한 경우 처방전 스캔 화면으로 돌려보냄
      navigate('/prescriptions/translate', { replace: true });
      return;
    }

    uploadPrescription(file)
      .then((prescriptionId) => {
        navigate('/prescriptions/result', { state: { prescriptionId, previewUrl } });
      })
      .catch(() => {
        // 업로드 실패 시 스캔 화면으로 돌아감
        navigate('/prescriptions/translate', { replace: true });
      });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MobileContainer
      header={
        <AppHeader
          title="처방전 스캔"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">
                STEP 1 / 2
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
        <img
          src={imgCharacter}
          alt="분석 중"
          className="h-[30px] w-[30px] animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
        <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
          AI가 처방전을 분석중이에요
        </p>
      </div>
    </MobileContainer>
  );
}
