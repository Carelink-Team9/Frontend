import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchLatestPrescription, type PrescriptionSummary } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/3bb545d2-eee1-46fe-a636-88c0cf7c6823';
const imgIconScan = 'https://www.figma.com/api/mcp/asset/501527bf-e52a-4ae1-86cd-d105655eed36';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/dd7eb3c2-8130-4e30-85b3-e7befaa0ae5c';
const imgIconBell = 'https://www.figma.com/api/mcp/asset/42a166fd-1693-4b93-a31b-8c16eaa6493d';
const imgFallback = 'https://www.figma.com/api/mcp/asset/6101343e-9ded-42ba-b496-5ee679b6e143';

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function resolveImageUrl(url: string | null): string {
  if (!url) return imgFallback;
  if (url.startsWith('/uploads')) return `http://localhost:8080${url}`;
  return url;
}

export default function MainHomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setPrescriptionId = usePrescriptionFlowStore((state) => state.setPrescriptionId);
  const setResult = usePrescriptionFlowStore((state) => state.setResult);
  const [latest, setLatest] = useState<PrescriptionSummary | null | undefined>(undefined);

  useEffect(() => {
    fetchLatestPrescription().then(setLatest).catch(() => setLatest(null));
  }, []);

  const openPrescription = (id: number) => {
    setResult(null);
    setPrescriptionId(id);
    navigate('/prescriptions/result');
  };

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          isHomeComponent
          title={t('common.appName')}
          showBack={false}
          rightElement={
            <button type="button" aria-label={t('home.notifications')}>
              <img src={imgIconBell} alt="" className="h-[30px] w-[30px]" />
            </button>
          }
        />
      }
    >
      <div className="flex items-center gap-[15px] px-[32px] pb-[24px] pt-[30px]">
        <img src={imgCharacter} alt="" className="h-[30px] w-[30px] shrink-0" />
        <p className="text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827] break-keep">
          <span className="font-bold">{t('home.greeting').split(',')[0]}, </span>
          <span>{t('common.appName')}</span>
        </p>
      </div>

      <div className="flex flex-col gap-[12px] px-[20px]">
        <Link to="/symptom-input" className="flex h-[130px] items-center justify-between gap-[14px] rounded-[10px] bg-[#296dff] px-[20px]">
          <div className="min-w-0 flex-1 text-left">
            <p className="break-keep text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-white">{t('home.symptomTitle')}</p>
            <p className="mt-[8px] break-words text-[14px] font-medium leading-[1.4] tracking-[-0.7px] text-white">{t('home.symptomDescription')}</p>
          </div>
          <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-white">
            <img src={imgIconSearch} alt="" className="h-[30px] w-[30px]" />
          </div>
        </Link>

        <Link to="/prescriptions/translate" className="flex h-[130px] items-center justify-between gap-[14px] rounded-[10px] bg-[#296dff] px-[20px]">
          <div className="min-w-0 flex-1 text-left">
            <p className="break-keep text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-white">{t('home.prescriptionTitle')}</p>
            <p className="mt-[8px] break-words text-[14px] font-medium leading-[1.4] tracking-[-0.7px] text-white">{t('home.prescriptionDescription')}</p>
          </div>
          <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-white">
            <img src={imgIconScan} alt="" className="h-[30px] w-[30px]" />
          </div>
        </Link>
      </div>

      <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

      <div className="px-[31px] pb-[20px] pt-[14px]">
        <div className="mb-[14px] flex items-center justify-between">
          <p className="text-[20px] font-medium tracking-[-1px] text-[#111827]">{t('home.recentPrescription')}</p>
          <Link to="/prescriptions" className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">
            {t('home.viewAll')}
          </Link>
        </div>

        {latest === undefined ? (
          <div className="flex h-[130px] items-center justify-center rounded-[10px] border border-[#d1d5db]">
            <p className="text-[14px] text-[#6b7280]">{t('common.loading')}</p>
          </div>
        ) : latest === null ? (
          <Link to="/prescriptions/translate" className="flex h-[130px] items-center justify-center rounded-[10px] border border-dashed border-[#d1d5db]">
            <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">{t('home.emptyPrescription')}</p>
          </Link>
        ) : (
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
                onError={(event) => {
                  event.currentTarget.src = imgFallback;
                }}
              />
            </div>
            <div className="ml-[8px] flex flex-col items-start gap-[6px]">
              <p className="text-[20px] font-medium tracking-[-1px] text-[#111827]">{t('home.prescriptionLabel')}</p>
              <p className="text-[16px] font-medium tracking-[-0.8px] text-[#6b7280]">{formatDate(latest.prescribedAt)}</p>
              <div className="flex h-[25px] items-center justify-center rounded-[20px] bg-[rgba(41,109,255,0.1)] px-[10px]">
                <span className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">
                  {t('home.medicineCount', { count: latest.totalDrugCount })}
                </span>
              </div>
            </div>
          </button>
        )}
      </div>
    </MobileContainer>
  );
}
