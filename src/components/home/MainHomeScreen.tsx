import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLatestPrescription, type PrescriptionSummary } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/3bb545d2-eee1-46fe-a636-88c0cf7c6823';
const imgIconScan = 'https://www.figma.com/api/mcp/asset/501527bf-e52a-4ae1-86cd-d105655eed36';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/dd7eb3c2-8130-4e30-85b3-e7befaa0ae5c';
const imgIconBell = 'https://www.figma.com/api/mcp/asset/42a166fd-1693-4b93-a31b-8c16eaa6493d';
const imgImgFallback = 'https://www.figma.com/api/mcp/asset/6101343e-9ded-42ba-b496-5ee679b6e143';

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function resolveImageUrl(url: string | null): string {
  if (!url) return imgImgFallback;
  if (url.startsWith('/uploads')) return `http://localhost:8080${url}`;
  return url;
}

export default function MainHomeScreen() {
  const navigate = useNavigate();
  const setPrescriptionId = usePrescriptionFlowStore((s) => s.setPrescriptionId);
  const setResult = usePrescriptionFlowStore((s) => s.setResult);
  const [latest, setLatest] = useState<PrescriptionSummary | null | undefined>(undefined);

  function openPrescription(id: number) {
    setResult(null);
    setPrescriptionId(id);
    navigate('/prescriptions/result');
  }

  useEffect(() => {
    fetchLatestPrescription().then(setLatest);
  }, []);

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
          <span className="font-bold">안녕하세요, </span>
          <span className="font-medium">CareLink입니다.</span>
        </p>
      </div>

      {/* Main action buttons */}
      <div className="flex flex-col gap-[12px] px-[20px]">
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

        {/* 로딩 중 */}
        {latest === undefined && (
          <div className="flex h-[130px] items-center justify-center rounded-[10px] border border-[#d1d5db]">
            <p className="text-[14px] text-[#6b7280]">불러오는 중...</p>
          </div>
        )}

        {/* 처방전 없음 */}
        {latest === null && (
          <Link
            to="/prescriptions/translate"
            className="flex h-[130px] items-center justify-center rounded-[10px] border border-dashed border-[#d1d5db]"
          >
            <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
              처방전을 등록해보세요
            </p>
          </Link>
        )}

        {/* 최근 처방전 카드 */}
        {latest && (
          <button
            type="button"
            onClick={() => openPrescription(latest.prescriptionId)}
            className="flex h-[130px] w-full items-center gap-[24px] rounded-[10px] border border-[#d1d5db] px-[20px] text-left"
          >
            <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#f3f4f6]">
              <img
                src={resolveImageUrl(latest.imageUrl)}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = imgImgFallback; }}
              />
            </div>
            <div className="flex flex-col items-start gap-[6px] ml-[8px]">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#111827]">
                처방전
              </p>
              <p className="text-[16px] font-medium tracking-[-0.8px] text-[#6b7280]">
                {formatDate(latest.prescribedAt)}
              </p>
              <div className="flex h-[25px] items-center justify-center rounded-[20px] bg-[rgba(41,109,255,0.1)] px-[10px]">
                <span className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">
                  약 {latest.totalDrugCount}개
                </span>
              </div>
            </div>
          </button>
        )}
      </div>
    </MobileContainer>
  );
}
