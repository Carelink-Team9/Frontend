import { useNavigate } from 'react-router-dom';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import BottomNav from '../layout/BottomNav';

const imgIconCheck = 'https://www.figma.com/api/mcp/asset/96d5cc6b-ab87-470f-bfa5-45edc20455ba';
const imgImg1 = 'https://www.figma.com/api/mcp/asset/67e6e70b-a941-4a19-ab36-a6b7ae136573';
const imgIconPen = 'https://www.figma.com/api/mcp/asset/b7f878f5-9f43-4a04-a155-0e52f2144210';
const imgIconPen1 = 'https://www.figma.com/api/mcp/asset/d6f0881e-5da9-475d-8439-f4048811a5a1';
const imgIconTime = 'https://www.figma.com/api/mcp/asset/7ec0c1ae-82d5-4f6b-b85f-6a7841b6e155';
const imgIconCaution = 'https://www.figma.com/api/mcp/asset/5d6e7547-548b-4801-a07c-041da7a52f27';
const imgIconCaution1 = 'https://www.figma.com/api/mcp/asset/683f8e12-4765-4b81-8343-e504b53db513';
const imgIconDrug = 'https://www.figma.com/api/mcp/asset/871d5b6e-2a01-4ff9-996a-2b40e50f65f7';

interface Drug {
  id: string;
  name: string;
  englishName: string;
  howTo: string;
  caution: string;
  days: string;
  cautionIcon: string;
}

const drugs: Drug[] = [
  {
    id: '1',
    name: '타이레놀정 500mg',
    englishName: 'Tylenol 500mg',
    howTo: '1회 1정, 1일 3회',
    caution: '공복 복용 가능, 과량 복용 시 간 손상 위험',
    days: '3일분',
    cautionIcon: imgIconCaution,
  },
  {
    id: '2',
    name: '아모시실린캡슐 250mg',
    englishName: 'Amoxicillin Cap 250mg',
    howTo: '1회 1정, 1일 3회',
    caution: '식후 30분 복용, 알레르기 주의',
    days: '7일분',
    cautionIcon: imgIconCaution1,
  },
];

export default function PrescriptionResultScreen() {
  const navigate = useNavigate();

  return (
    <MobileContainer
      header={
        <AppHeader
          title="처방전 번역 결과"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">
                STEP 2 / 2
              </span>
            </div>
          }
        />
      }
    >
      {/* ─── 처방전 제목 영역 ─── */}
      <div className="px-[32px] pt-[24px] pb-[8px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-[28px] font-medium tracking-[-1.4px] text-[#111827] break-keep leading-[1.3]">
            감기약 처방전
          </p>
          <img src={imgIconPen} alt="수정" className="h-[20px] w-[20px] shrink-0" />
        </div>
        <p className="mt-[8px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
          처방전을 선택한 언어로 쉽게 이해할 수 있게 번역해드려요.
        </p>
      </div>

      {/* ─── 처방전 이미지 ─── */}
      <div className="mx-[32px] mb-[20px] h-[200px] overflow-hidden rounded-[10px] bg-[#d1d5db]">
        <img src={imgImg1} alt="처방전" className="h-full w-full object-cover" />
      </div>

      {/* ─── 처방 요약 카드 ─── */}
      <div className="mx-[32px] mb-[20px] rounded-[10px] bg-[#eaf0ff] px-[28px] py-[22px]">
        <div className="mb-[16px] flex items-center gap-[10px]">
          <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
          <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">처방 요약</p>
        </div>
        <div className="flex gap-[40px]">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">총 약 개수</p>
            <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">2개</p>
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">처방일</p>
            <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">2026.03.20</p>
          </div>
        </div>
      </div>

      {/* ─── 다시 촬영 + 저장 버튼 ─── */}
      <div className="mx-[32px] mb-[4px] flex gap-[10px]">
        <button
          type="button"
          onClick={() => navigate('/prescriptions/translate')}
          className="flex h-[60px] flex-1 items-center justify-center rounded-[10px] border-[1.5px] border-[#d1d5db] text-[18px] font-medium tracking-[-0.9px] text-[#111827]"
        >
          다시 촬영
        </button>
        <button
          type="button"
          className="flex h-[60px] flex-1 items-center justify-center rounded-[10px] bg-[#296dff] text-[18px] font-medium tracking-[-0.9px] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]"
        >
          저장
        </button>
      </div>

      {/* ─── BottomNav (스크롤 안에 포함) ─── */}
      <BottomNav />

      {/* ─── 처방 약 목록 ─── */}
      <p className="px-[32px] pt-[24px] pb-[16px] text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
        처방 약 목록
      </p>

      <div className="flex flex-col gap-[16px] px-[32px]">
        {drugs.map((drug) => (
          <div key={drug.id} className="overflow-hidden rounded-[10px] border border-[#d1d5db]">
            {/* 약 이름 */}
            <div className="flex items-center gap-[14px] px-[20px] pb-[14px] pt-[20px]">
              <img src={imgIconDrug} alt="" className="h-[50px] w-[50px] shrink-0" />
              <div className="flex flex-1 flex-col gap-[4px]">
                <div className="flex items-start justify-between gap-[8px]">
                  <p className="text-[20px] font-bold tracking-[-1px] text-[#111827] break-keep leading-[1.3]">
                    {drug.name}
                  </p>
                  <img src={imgIconPen1} alt="수정" className="mt-[4px] h-[20px] w-[20px] shrink-0" />
                </div>
                <p className="text-[12px] font-medium leading-[2] tracking-[-0.6px] text-[#888]">
                  {drug.englishName}
                </p>
              </div>
            </div>

            {/* 복용 방법 */}
            <div className="mx-[20px] mb-[8px] rounded-[8px] bg-[#f0fdf8] px-[16px] py-[12px]">
              <div className="mb-[4px] flex items-center gap-[8px]">
                <img src={imgIconTime} alt="" className="h-[20px] w-[20px] shrink-0" />
                <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">복용 방법</p>
              </div>
              <p className="pl-[28px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281]">
                {drug.howTo}
              </p>
            </div>

            {/* 주의사항 */}
            <div className="mx-[20px] mb-[14px] rounded-[8px] bg-[#fff4f3] px-[16px] py-[12px]">
              <div className="mb-[4px] flex items-center gap-[8px]">
                <img src={drug.cautionIcon} alt="" className="h-[20px] w-[20px] shrink-0" />
                <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">주의사항</p>
              </div>
              <p className="pl-[28px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281]">
                {drug.caution}
              </p>
            </div>

            {/* 투여일수 배지 */}
            <div className="px-[20px] pb-[20px]">
              <span className="inline-flex items-center rounded-[20px] bg-[#eaf2fe] px-[12px] py-[2px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#3f66c5]">
                {drug.days}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── 원하는 약이 없나요? ─── */}
      <p className="mt-[28px] text-center text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
        원하는 약이 없나요?
      </p>
      <div className="mx-[32px] mt-[16px] mb-[32px] flex gap-[10px]">
        <button
          type="button"
          className="flex h-[60px] flex-1 items-center justify-center rounded-[10px] border border-[#d1d5db] text-[18px] font-medium tracking-[-0.9px] text-[#111827]"
        >
          직접 입력
        </button>
        <button
          type="button"
          className="flex h-[60px] flex-1 items-center justify-center rounded-[10px] border border-[#d1d5db] text-[18px] font-medium tracking-[-0.9px] text-[#111827]"
        >
          알약 검색
        </button>
      </div>
    </MobileContainer>
  );
}
