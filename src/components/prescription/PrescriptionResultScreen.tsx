import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPrescriptionResult, type PrescriptionResult } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import PrimaryButton from '../common/PrimaryButton';
import StatusMessage from '../common/StatusMessage';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconCheck = 'https://www.figma.com/api/mcp/asset/96d5cc6b-ab87-470f-bfa5-45edc20455ba';
const imgImg1 = 'https://www.figma.com/api/mcp/asset/67e6e70b-a941-4a19-ab36-a6b7ae136573';
const imgIconPen = 'https://www.figma.com/api/mcp/asset/b7f878f5-9f43-4a04-a155-0e52f2144210';
const imgIconPen1 = 'https://www.figma.com/api/mcp/asset/d6f0881e-5da9-475d-8439-f4048811a5a1';
const imgIconTime = 'https://www.figma.com/api/mcp/asset/7ec0c1ae-82d5-4f6b-b85f-6a7841b6e155';
const imgIconDrug = 'https://www.figma.com/api/mcp/asset/871d5b6e-2a01-4ff9-996a-2b40e50f65f7';

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function ensureUnit(val: string, unit: string) {
  if (!val) return '';

  const trimmed = val.trim();
  if (/[가-힣a-zA-Z]/.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed}${unit}`;
}

export default function PrescriptionResultScreen() {
  const navigate = useNavigate();
  const prescriptionId = usePrescriptionFlowStore((state) => state.prescriptionId);
  const localPreviewUrl = usePrescriptionFlowStore((state) => state.previewUrl);
  const storedResult = usePrescriptionFlowStore((state) => state.result);
  const setResultStore = usePrescriptionFlowStore((state) => state.setResult);
  const resetFlow = usePrescriptionFlowStore((state) => state.resetFlow);

  const [result, setResult] = useState<PrescriptionResult | null>(storedResult);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!prescriptionId) {
      navigate('/prescriptions/translate', { replace: true });
      return;
    }

    if (storedResult && storedResult.prescriptionId === prescriptionId) {
      setResult(storedResult);
      setLoading(false);
      return;
    }

    fetchPrescriptionResult(prescriptionId)
      .then((nextResult) => {
        setResult(nextResult);
        setResultStore(nextResult);
      })
      .finally(() => setLoading(false));
  }, [navigate, prescriptionId, setResultStore, storedResult]);

  let displayImage = result?.imageUrl ?? localPreviewUrl ?? imgImg1;
  if (displayImage?.startsWith('/uploads')) {
    displayImage = `http://localhost:8080${displayImage}`;
  }

  const drugCount = result?.drugs.length ?? 0;
  const prescriptionDate = result?.createdAt ? formatDate(result.createdAt) : '-';

  return (
    <MobileContainer
      hasBottomNav
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
      <div className="px-[32px] pb-[8px] pt-[24px]">
        <div className="flex items-center gap-[10px]">
          <p className="break-keep text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827]">
            처방전 결과
          </p>
          <img src={imgIconPen} alt="" className="h-[20px] w-[20px] shrink-0" />
        </div>
        <p className="mt-[8px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
          업로드한 처방전을 읽고 복용 정보를 정리했습니다.
        </p>
      </div>

      <div className="mx-[32px] mb-[20px] h-[200px] overflow-hidden rounded-[10px] bg-[#d1d5db]">
        <img src={displayImage} alt="prescription" className="h-full w-full object-cover" />
      </div>

      <div className="mx-[32px] mb-[20px] rounded-[10px] bg-[#eaf0ff] px-[28px] py-[22px]">
        <div className="mb-[16px] flex items-center gap-[10px]">
          <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
          <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">처방 요약</p>
        </div>
        <div className="flex gap-[40px]">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">총 약 개수</p>
            <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
              {loading ? '...' : `${drugCount}개`}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">처방일</p>
            <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
              {loading ? '...' : prescriptionDate}
            </p>
          </div>
        </div>
      </div>

      <p className="px-[32px] pb-[16px] text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
        처방 약 목록
      </p>

      <div className="flex flex-col gap-[16px] px-[32px]">
        {loading ? (
          <StatusMessage message="불러오는 중..." className="py-[20px]" />
        ) : (
          result?.drugs.map((drug, index) => {
            const freqStr = ensureUnit(drug.frequency, '회');
            const dosStr = ensureUnit(drug.dosage, '정');
            const durStr = ensureUnit(drug.duration, '일');

            return (
              <div key={index} className="overflow-hidden rounded-[10px] border border-[#d1d5db]">
                <div className="flex items-center gap-[14px] px-[20px] pb-[14px] pt-[20px]">
                  <img src={imgIconDrug} alt="" className="h-[50px] w-[50px] shrink-0" />
                  <div className="flex flex-1 flex-col items-start gap-[4px] text-left">
                    <div className="flex w-full items-start justify-between gap-[8px]">
                      <p className="break-keep text-[20px] font-bold leading-[1.3] tracking-[-1px] text-[#111827]">
                        {drug.drugName}
                      </p>
                      <img src={imgIconPen1} alt="" className="mt-[4px] h-[20px] w-[20px] shrink-0" />
                    </div>
                    {drug.originalName ? (
                      <p className="text-[12px] font-medium leading-[2] tracking-[-0.6px] text-[#888]">
                        {drug.originalName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#f0fdf8] px-[16px] py-[12px] text-left">
                  <div className="mb-[4px] flex items-center gap-[8px]">
                    <img src={imgIconTime} alt="" className="h-[20px] w-[20px] shrink-0" />
                    <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">복용 방법</p>
                  </div>
                  <div className="flex flex-col gap-[4px] pl-[28px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281]">
                    <span>1회 투약량: {dosStr}</span>
                    <span>1일 투여 횟수: {freqStr}</span>
                    <span>총 투약 일수: {durStr}</span>
                  </div>
                </div>

                <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#eef8ff] px-[16px] py-[12px] text-left">
                  <div className="mb-[4px] flex items-center gap-[6px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">설명</p>
                  </div>
                  <p className="text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281] pl-[22px]">
                    {drug.translatedContent}
                  </p>
                </div>

                {drug.sideEffects && (
                  <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#fff4f4] px-[16px] py-[12px] text-left">
                    <div className="mb-[4px] flex items-center gap-[6px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                      <p className="text-[14px] font-semibold tracking-[-0.7px] text-[#e05c5c]">부작용</p>
                    </div>
                    <p className="text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281] pl-[22px]">{drug.sideEffects}</p>
                  </div>
                )}

                {drug.precautions && (
                  <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#fffbea] px-[16px] py-[12px] text-left">
                    <div className="mb-[4px] flex items-center gap-[6px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                      <p className="text-[14px] font-semibold tracking-[-0.7px] text-[#d97706]">주의사항</p>
                    </div>
                    <p className="text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281] pl-[22px]">{drug.precautions}</p>
                  </div>
                )}

                {drug.foodInteraction && (
                  <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#f0fdf4] px-[16px] py-[12px] text-left">
                    <div className="mb-[4px] flex items-center gap-[6px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                      <p className="text-[14px] font-semibold tracking-[-0.7px] text-[#16a34a]">음식 주의</p>
                    </div>
                    <p className="text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281] pl-[22px]">{drug.foodInteraction}</p>
                  </div>
                )}

                {drug.handwrittenNote && (
                  <div className="mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] bg-[#f5f3ff] px-[16px] py-[12px] text-left">
                    <div className="mb-[4px] flex items-center gap-[6px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      <p className="text-[14px] font-semibold tracking-[-0.7px] text-[#7c3aed]">의사 메모</p>
                    </div>
                    <p className="text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281] pl-[22px]">{drug.handwrittenNote}</p>
                  </div>
                )}

                <div className="flex px-[20px] pb-[20px] pt-[4px]">
                  <span className="inline-flex items-center rounded-[20px] bg-[#eaf2fe] px-[12px] py-[2px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#3f66c5]">
                    {durStr}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mx-[32px] mb-[32px] mt-[28px] flex gap-[10px]">
        <PrimaryButton
          variant="secondary"
          className="flex-1"
          onClick={() => {
            resetFlow();
            navigate('/prescriptions/translate');
          }}
        >
          다시 촬영
        </PrimaryButton>
        <PrimaryButton
          className="flex-1"
          onClick={() => {
            resetFlow();
            navigate('/prescriptions');
          }}
        >
          확인
        </PrimaryButton>
      </div>
    </MobileContainer>
  );
}
