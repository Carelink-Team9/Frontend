import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/c10e9197-3423-44c7-9b4f-c4d4f07e3c37';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/f701f52a-f1e2-438b-99aa-d7e224d711bb';

export default function SymptomLoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const symptoms: string[] = (location.state as { symptoms?: string[] })?.symptoms ?? [];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/symptom-result', { state: { symptoms }, replace: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate, symptoms]);

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">

        {/* Header */}
        <header className="relative flex h-[70px] shrink-0 items-center justify-center border-b border-[#d1d5db] bg-white px-[32px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-[32px]"
            aria-label="뒤로가기"
          >
            <img src={imgArrowLine} alt="" className="h-[16px] w-[16px]" />
          </button>
          <span className="text-[20px] font-medium tracking-[-1px] text-[#111827]">진료과 추천</span>
          <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
            <span className="text-[12px] font-bold tracking-[-0.6px] text-white">STEP 2 / 3</span>
          </div>
        </header>

        {/* Center loading */}
        <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
          <img
            src={imgCharacter}
            alt="분석중"
            className="h-[30px] w-[30px] animate-spin"
          />
          <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">AI가 증상을 분석중이에요</p>
        </div>
      </div>
    </div>
  );
}
