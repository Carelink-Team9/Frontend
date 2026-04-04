import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { recommendDepartment } from '../../api/symptomApi';

const imgCharacter = 'https://www.figma.com/api/mcp/asset/f701f52a-f1e2-438b-99aa-d7e224d711bb';

export default function SymptomLoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const symptoms: string[] = (location.state as { symptoms?: string[] })?.symptoms ?? [];
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    recommendDepartment(symptoms)
      .then((result) => {
        navigate('/symptom-result', {
          state: { symptoms, result },
          replace: true,
        });
      })
      .catch(() => {
        // API 실패 시 빈 결과로 넘어감
        navigate('/symptom-result', {
          state: { symptoms, result: null },
          replace: true,
        });
      });
  }, []);

  return (
    <MobileContainer
      hasBottomNav={false}
      header={
        <AppHeader
          title="진료과 추천"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">STEP 2 / 3</span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
        <img
          src={imgCharacter}
          alt="분석중"
          className="h-[30px] w-[30px] animate-spin"
        />
        <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">AI가 증상을 분석중이에요</p>
      </div>
    </MobileContainer>
  );
}
