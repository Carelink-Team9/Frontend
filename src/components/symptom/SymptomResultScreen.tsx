import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const imgArrowLine = 'https://www.figma.com/api/mcp/asset/f5163a49-87da-40c5-831f-a327553888ca';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/805461ba-852c-4a15-b122-f60a1d8b2d8c';
const imgIconCheck1 = 'https://www.figma.com/api/mcp/asset/1e43820f-a101-4428-9dfd-26d60e5e98a1';

export default function SymptomResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const symptoms: string[] = (location.state as { symptoms?: string[] })?.symptoms ?? ['두통', '발열'];
  const [agreed, setAgreed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const warningRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 화면에 절반 이상 보이고, 아직 한 번도 띄우지 않았을 때
        if (entry.isIntersecting && !hasScrolled) {
          setShowTooltip(true);
          setHasScrolled(true);

          // 2.5초 뒤에 자동으로 투명도 0으로 사라짐
          setTimeout(() => {
            setShowTooltip(false);
          }, 2500);
        }
      },
      { threshold: 0.5 }
    );

    if (warningRef.current) {
      observer.observe(warningRef.current);
    }

    return () => observer.disconnect();
  }, [hasScrolled]);

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

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-[20px] py-[24px] gap-[28px]">

          {/* AI 분석 완료 카드 */}
          <div className="flex flex-col items-start rounded-[10px] bg-[#c0ffe4] px-[24px] py-[24px] gap-[12px] w-full">
            <div className="flex items-center gap-[10px]">
              <p className="text-left text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-[#111827] break-keep">AI 분석 완료</p>
              <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
            </div>
            <p className="text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#111827]">
              입력하신 증상을 분석했습니다. 가장 적합한 진료과를 확인하세요.
            </p>
          </div>

          {/* 선택된 증상 */}
          <div className="flex flex-col items-start gap-[12px] w-full">
            <p className="text-left text-[18px] font-medium leading-[1.3] tracking-[-0.9px] text-[#111827] break-keep">선택된 증상</p>
            <div className="flex flex-wrap gap-[10px] w-full justify-start">
              {symptoms.map((s) => (
                <div
                  key={s}
                  className="flex h-[35px] items-center gap-[6px] rounded-[20px] bg-[#6b7280] px-[15px]"
                >
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-white">{s}</span>
                  <img src={imgIconCheck1} alt="" className="h-[8px] w-[8px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Gray divider */}
          <div className="h-[1px] -mx-[20px] bg-[#f9f9fb] py-[10px]" />

          {/* AI 추천 진료과 */}
          <div className="flex flex-col items-start gap-[12px] w-full">
            <p className="text-left text-[18px] font-medium leading-[1.3] tracking-[-0.9px] text-[#111827] break-keep">AI 추천 진료과</p>

            {/* 내과 - 주요 */}
            <div className="flex flex-col items-start gap-[12px] w-full rounded-[10px] bg-[rgba(41,109,255,0.1)] px-[24px] py-[24px]">
              <div className="flex w-full items-start justify-between">
                <div className="flex flex-col items-start gap-[12px]">
                  <p className="text-left text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-[#111827] break-keep">내과</p>
                  <div className="inline-flex h-[30px] items-center rounded-[10px] bg-[#296dff] px-[15px]">
                    <span className="text-[14px] font-medium tracking-[-0.7px] text-white">최적 매칭</span>
                  </div>
                </div>
                <div className="flex h-[35px] items-center rounded-[20px] bg-white px-[15px]">
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-[#111827]">85%</span>
                </div>
              </div>
              <p className="text-left text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#111827]">
                두통과 발열 증상은 일반적으로<br />내과 진료가 필요합니다.
              </p>
              <p className="text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
                감기, 독감 등 일반적인 내과 질환으로 보입니다.
              </p>
            </div>
          </div>

          {/* 대안 진료과 */}
          <div className="flex flex-col items-start gap-[12px] w-full">
            <p className="text-left text-[18px] font-medium leading-[1.3] tracking-[-0.9px] text-[#111827] break-keep">대안 진료과</p>
            <div className="flex flex-col items-start gap-[12px] w-full rounded-[10px] border border-[#d1d5db] bg-white px-[24px] py-[24px]">
              <div className="flex w-full items-start justify-between">
                <p className="text-left text-[18px] font-bold leading-[1.3] tracking-[-0.9px] text-[#111827] break-keep">신경과</p>
                <div className="flex h-[35px] items-center rounded-[20px] bg-[#f3f4f6] px-[15px]">
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-[#111827]">60%</span>
                </div>
              </div>
              <p className="text-left text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
                지속적인 두통의 경우 신경과 전문의 상담이 도움될 수 있습니다.
              </p>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="relative mt-[10px]">
            {/* 팝업 툴팁 */}
            <div
              className={`absolute left-1/2 -top-[45px] z-10 flex min-w-[210px] -translate-x-1/2 items-center justify-center rounded-[8px] bg-[#111827] px-[16px] py-[10px] shadow-lg transition-opacity duration-1000 ${
                showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <span className="text-[14px] font-medium tracking-[-0.7px] text-white">
                주의사항을 읽고 체크해주세요
              </span>
              {/* 말풍선 말꼬리 */}
              <div className="absolute -bottom-[4px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rotate-45 bg-[#111827]" />
            </div>

            <label
              ref={warningRef}
              className="flex w-full cursor-pointer items-center gap-[16px] rounded-[10px] bg-[#fff6db] px-[20px] py-[24px] text-left"
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
              <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">주의사항</p>
              <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
                해당 안내는 증상 기반의 진료과 추천 정보이며,<br />의료적 진단이나 치료를 대체하지 않습니다.
              </p>
              <span className="text-[14px] font-bold tracking-[-0.8px] text-[#6b7280]">
                네, 주의 사항을 확인했습니다.
              </span>
            </div>
          </label>
        </div>

          <div className="h-[4px]" />
        </div>

        {/* Bottom action button */}
        <div className="shrink-0 bg-white px-[31px] py-[20px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            disabled={!agreed}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors duration-300 ${
              agreed
                ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            진료 준비하기
          </button>
        </div>
      </div>
    </div>
  );
}
