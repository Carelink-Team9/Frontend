import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgImg = 'https://www.figma.com/api/mcp/asset/e963a835-6155-4692-9f3b-8e8ae7b223c7';
const imgCamera = 'https://www.figma.com/api/mcp/asset/dbb0eba5-edfc-4203-a001-3356b6a0d38f';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/906017f2-f3ac-43e8-81d7-b66112bd99cd';

export default function PrescriptionTranslatePage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader 
          title="처방전 번역"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">
                STEP 1 / 3
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-col gap-[20px] px-[20px] py-[20px]">

          {/* Info card */}
          <div className="flex h-[130px] items-center gap-[18px] rounded-[10px] border border-[#d1d5db] px-[24px]">
            <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[8px] bg-[#f9f9fb]">
              <img src={imgImg} alt="" className="h-[46px] w-[46px] object-contain" />
            </div>
            <div className="flex flex-col items-start text-left gap-[6px]">
              <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">처방전을 스캔하세요</p>
              <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
                AI가 처방전을 분석하여 약 정보와<br />복용방법을 번역해드립니다.
              </p>
            </div>
          </div>

          {/* Camera scan area */}
          <div className="flex h-[228px] items-center justify-center rounded-[15px] border-[3px] border-dashed border-[#e6e7eb]">
            <div className="flex h-[122px] w-[136px] items-center justify-center rounded-[15px] border border-[#c9d9ed] bg-[#eaf5f9]">
              <img src={imgCamera} alt="카메라" className="h-[61px] w-[63px]" />
            </div>
          </div>

          {/* Warning box */}
          <label
            className="flex w-full cursor-pointer items-center gap-[16px] rounded-[10px] bg-[#fff6db] px-[20px] py-[22px] text-left"
            onClick={() => setAgreed((v) => !v)}
          >
            <div
              className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                agreed ? 'border-[#296dff] bg-[#296dff]' : 'border-[#d1d5db] bg-white'
              }`}
            >
              {agreed && (
                <svg viewBox="0 0 16 16" fill="none" className="h-[14px] w-[14px]">
                  <path d="M3 8l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <div className="flex flex-col items-start gap-[8px]">
              <div className="flex items-center gap-[10px]">
                <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
                <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">주의사항</p>
              </div>
              <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
                해당 안내는 증상 기반의 진료과 추천 정보이며,<br />의료적 진단이나 치료를 대체하지 않습니다.
              </p>
              <span className="text-[14px] font-bold tracking-[-0.8px] text-[#6b7280]">
                네, 주의 사항을 확인했습니다.
              </span>
            </div>
          </label>

          {/* Next button */}
          <button
            type="button"
            disabled={!agreed}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              agreed
                ? 'bg-[#296dff] text-white cursor-pointer'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            다음
          </button>
      </div>
    </MobileContainer>
  );
}
