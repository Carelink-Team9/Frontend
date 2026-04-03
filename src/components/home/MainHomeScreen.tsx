import { Link } from 'react-router-dom';

const imgMypageStroke = 'https://www.figma.com/api/mcp/asset/a16567fb-feef-4811-b5a8-486d95c85113';
const imgUnion = 'https://www.figma.com/api/mcp/asset/4ecb3741-2b9b-4405-8ce3-9bbbb098d8ac';
const imgIconHome = 'https://www.figma.com/api/mcp/asset/c8b22801-f966-46f6-9052-4fbbab01fb4f';
const imgIconPrescription = 'https://www.figma.com/api/mcp/asset/67bf53c8-6b9e-4e81-ae20-0b3b81253024';
const imgImg = 'https://www.figma.com/api/mcp/asset/6101343e-9ded-42ba-b496-5ee679b6e143';
const imgIconSearch = 'https://www.figma.com/api/mcp/asset/3bb545d2-eee1-46fe-a636-88c0cf7c6823';
const imgIconScan = 'https://www.figma.com/api/mcp/asset/501527bf-e52a-4ae1-86cd-d105655eed36';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/dd7eb3c2-8130-4e30-85b3-e7befaa0ae5c';
const imgIconBell = 'https://www.figma.com/api/mcp/asset/42a166fd-1693-4b93-a31b-8c16eaa6493d';

export default function MainHomeScreen() {

  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-[#F3F4F6]">
      <div className="flex h-svh w-full max-w-[402px] flex-col bg-white">

        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#dadada] bg-white px-[32px] h-[60px]">
          <span className="font-['SUIT',sans-serif] text-[20px] font-extrabold tracking-[-0.4px] text-[#111827]">
            CareLink
          </span>
          <button type="button" aria-label="알림">
            <img src={imgIconBell} alt="" className="h-[30px] w-[30px]" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto">

          {/* Greeting */}
          <div className="flex items-center gap-[15px] px-[32px] pt-[30px] pb-[24px]">
            <img src={imgCharacter} alt="" className="h-[30px] w-[30px] shrink-0" />
            <p className="text-[28px] tracking-[-1.4px] text-[#111827]">
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
                <p className="text-[24px] font-bold tracking-[-1.2px] text-white">진료과 추천</p>
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
                <p className="text-[24px] font-bold tracking-[-1.2px] text-white">처방전 안내</p>
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
        </div>

        {/* Bottom tab bar */}
        <nav className="flex h-[94px] shrink-0 items-start justify-around border-t border-[#dadada] bg-white pt-[10px]">
          <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgIconHome} alt="홈" className="h-[30px] w-[30px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">홈</span>
          </button>

          <Link to="/prescriptions" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgIconPrescription} alt="처방전" className="h-[30px] w-[30px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">처방전</span>
          </Link>

          <button type="button" className="flex w-[83px] flex-col items-center gap-[4px]">
            <img src={imgUnion} alt="커뮤니티" className="h-[27px] w-[27px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">커뮤니티</span>
          </button>

          <Link
            to="/mypage"
            className="flex w-[83px] flex-col items-center gap-[4px]"
          >
            <img src={imgMypageStroke} alt="마이페이지" className="h-[23px] w-[23px]" />
            <span className="text-[12px] font-medium tracking-[-0.6px] text-[#111827]">마이페이지</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
