import { Link } from 'react-router-dom';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/3bb545d2-eee1-46fe-a636-88c0cf7c6823';
const imgIconScan = 'https://www.figma.com/api/mcp/asset/501527bf-e52a-4ae1-86cd-d105655eed36';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/dd7eb3c2-8130-4e30-85b3-e7befaa0ae5c';
const imgIconBell = 'https://www.figma.com/api/mcp/asset/42a166fd-1693-4b93-a31b-8c16eaa6493d';
const imgImg = 'https://www.figma.com/api/mcp/asset/6101343e-9ded-42ba-b496-5ee679b6e143';

export default function MainHomeScreen() {
  const bellButton = (
    <button type="button" aria-label="알림">
      <img src={imgIconBell} alt="" className="h-[30px] w-[30px]" />
    </button>
  );

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader 
          isHomeComponent 
          title="CareLink" 
          showBack={false} 
          rightElement={bellButton} 
        />
      }
    >

          {/* Greeting */}
          <div className="flex items-center gap-[15px] px-[32px] pt-[30px] pb-[24px]">
            <img src={imgCharacter} alt="" className="h-[30px] w-[30px] shrink-0" />
            <p className="text-[28px] tracking-[-1.4px] text-[#111827] leading-[1.3] break-keep">
              <span className="font-bold">길동 님, </span>
              <span className="font-medium">안녕하세요.</span>
            </p>
          </div>

          {/* Main action buttons */}
          <div className="flex flex-col gap-[12px] px-[20px]">
            {/* 진료과 추천 */}
            <Link
              to="/symptom-input"
              className="flex h-[130px] items-center justify-between rounded-[10px] bg-[#296dff] pl-[20px] pr-[20px]"
            >
              <div className="flex flex-col items-start text-left">
                <p className="text-[24px] font-bold tracking-[-1.2px] text-white leading-[1.3] break-keep">진료과 추천</p>
                <p className="mt-[8px] text-[14px] font-medium tracking-[-0.7px] text-white">
                  AI 가 증상을 분석하고 진료과를 알려줘요.
                </p>
              </div>
              <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-white">
                <img src={imgIconSearch} alt="" className="h-[30px] w-[30px]" />
              </div>
            </Link>

            {/* 처방전 안내 */}
            <Link
              to="/prescriptions/translate"
              className="flex h-[130px] items-center justify-between rounded-[10px] bg-[#296dff] pl-[20px] pr-[20px]"
            >
              <div className="flex flex-col items-start text-left">
                <p className="text-[24px] font-bold tracking-[-1.2px] text-white leading-[1.3] break-keep">처방전 안내</p>
                <p className="mt-[8px] text-[14px] font-medium tracking-[-0.7px] text-white">
                  AI 가 처방전을 인식하고 번역해요.
                </p>
              </div>
              <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-white">
                <img src={imgIconScan} alt="" className="h-[30px] w-[30px]" />
              </div>
            </Link>
          </div>

          {/* Section divider */}
          <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

          {/* 최근 처방전 */}
          <div className="px-[31px] pt-[14px] pb-[20px]">
            <div className="mb-[14px] flex items-center justify-between">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#111827]">최근 처방전</p>
              <Link to="/prescriptions" className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">
                전체보기
              </Link>
            </div>

            {/* Prescription card */}
            <Link
              to="/prescriptions"
              className="flex h-[130px] items-center gap-[24px] rounded-[10px] border border-[#d1d5db] px-[20px]"
            >
              <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[8px] bg-[#f3f4f6]">
                <img src={imgImg} alt="" className="h-[46px] w-[46px] object-contain" />
              </div>
              <div className="flex flex-col items-start text-left gap-[6px] ml-[8px]">
                <p className="text-[20px] font-medium tracking-[-1px] text-[#111827]">감기약 처방전</p>
                <p className="text-[16px] font-medium tracking-[-0.8px] text-[#6b7280]">2026.03.20</p>
                <div className="flex h-[25px] w-[57px] items-center justify-center rounded-[20px] bg-[rgba(41,109,255,0.1)]">
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">약 3개</span>
                </div>
              </div>
            </Link>
          </div>
    </MobileContainer>
  );
}
