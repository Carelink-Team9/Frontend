import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPrescriptionResult, type PrescriptionResult } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import PrimaryButton from '../common/PrimaryButton';
import StatusMessage from '../common/StatusMessage';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconCheck = 'https://www.figma.com/api/mcp/asset/96d5cc6b-ab87-470f-bfa5-45edc20455ba';
const imgFallback = 'https://www.figma.com/api/mcp/asset/67e6e70b-a941-4a19-ab36-a6b7ae136573';
const imgIconPen = 'https://www.figma.com/api/mcp/asset/b7f878f5-9f43-4a04-a155-0e52f2144210';
const imgIconTime = 'https://www.figma.com/api/mcp/asset/7ec0c1ae-82d5-4f6b-b85f-6a7841b6e155';
const imgIconDrug = 'https://www.figma.com/api/mcp/asset/871d5b6e-2a01-4ff9-996a-2b40e50f65f7';

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function ensureUnit(value: string, unit: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  return /[가-힣a-zA-Z]/.test(trimmed) ? trimmed : `${trimmed}${unit}`;
}

function safeText(value?: string | null): string {
  if (!value || value === 'null' || value.trim() === '') return '없습니다.';
  return value;
}

export default function PrescriptionResultScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  let displayImage = result?.imageUrl ?? localPreviewUrl ?? imgFallback;
  if (displayImage.startsWith('/uploads')) displayImage = `http://localhost:8080${displayImage}`;

  const prescriptionDate = result?.createdAt ? formatDate(result.createdAt) : '-';

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          title={t('prescription.resultTitle')}
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">{t('common.step', { current: 2, total: 2 })}</span>
            </div>
          }
        />
      }
    >
      <div className="px-[32px] pb-[8px] pt-[24px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827]">{t('prescription.resultHeading')}</p>
          <img src={imgIconPen} alt="" className="h-[20px] w-[20px] shrink-0" />
        </div>
        <p className="mt-[8px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{t('prescription.resultDescription')}</p>
      </div>

      <div className="mx-[32px] mb-[20px] h-[220px] overflow-hidden rounded-[10px] bg-[#f9f9fb] shadow-inner">
        <img src={displayImage} alt={t('prescription.previewAlt')} className="h-full w-full object-contain py-[8px]" />
      </div>

      <div className="mx-[32px] mb-[20px] rounded-[10px] bg-[#eaf0ff] px-[28px] py-[22px]">
        <div className="mb-[16px] flex items-center gap-[10px]">
          <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
          <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('prescription.summary')}</p>
        </div>
        <div className="flex w-full gap-[40px]">
          <div className="flex flex-col items-start gap-[6px] text-left">
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">{t('prescription.totalDrugCount')}</p>
            <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
              {loading ? '...' : t('prescription.medicineCount', { count: result?.drugs.length ?? 0 })}
            </p>
          </div>
          <div className="flex flex-col items-start gap-[6px] text-left">
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">{t('prescription.prescribedDate')}</p>
            <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">{loading ? '...' : prescriptionDate}</p>
          </div>
        </div>
      </div>

      <p className="px-[32px] pb-[16px] text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('prescription.drugList')}</p>

      <div className="flex flex-col gap-[16px] px-[32px]">
        {loading ? (
          <StatusMessage message={t('common.loading')} className="py-[20px]" />
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
                    <p className="text-[20px] font-bold leading-[1.3] tracking-[-1px] text-[#111827]">{drug.drugName}</p>
                    {drug.originalName ? <p className="text-[12px] font-medium leading-[2] tracking-[-0.6px] text-[#888]">{drug.originalName}</p> : null}
                  </div>
                </div>

                <InfoCard title={t('prescription.dosage')} icon={imgIconTime} bgClass="bg-[#f0fdf8]">
                  <span>{t('prescription.dosage')}: {dosStr}</span>
                  <span>{t('prescription.frequency')}: {freqStr}</span>
                  <span>{t('prescription.duration')}: {durStr}</span>
                </InfoCard>
                <TextCard title={t('prescription.description')} colorClass="text-[#272727]" bgClass="bg-[#eef8ff]" value={safeText(drug.translatedContent)} />
                <TextCard title={t('prescription.sideEffects')} colorClass="text-[#e05c5c]" bgClass="bg-[#fff4f4]" value={safeText(drug.sideEffects)} />
                <TextCard title={t('prescription.precautions')} colorClass="text-[#d97706]" bgClass="bg-[#fffbea]" value={safeText(drug.precautions)} />
                <TextCard title={t('prescription.foodInteraction')} colorClass="text-[#16a34a]" bgClass="bg-[#f0fdf4]" value={safeText(drug.foodInteraction)} />
                <TextCard title={t('prescription.handwrittenNote')} colorClass="text-[#7c3aed]" bgClass="bg-[#f5f3ff]" value={safeText(drug.handwrittenNote)} />

                <div className="flex px-[20px] pb-[20px] pt-[4px]">
                  <span className="inline-flex items-center rounded-[20px] bg-[#eaf2fe] px-[12px] py-[2px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#3f66c5]">{durStr}</span>
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
          {t('prescription.retake')}
        </PrimaryButton>
        <PrimaryButton
          className="flex-1"
          onClick={() => {
            resetFlow();
            navigate('/prescriptions');
          }}
        >
          {t('common.confirm')}
        </PrimaryButton>
      </div>
    </MobileContainer>
  );
}

function InfoCard({
  title,
  icon,
  bgClass,
  children,
}: {
  title: string;
  icon: string;
  bgClass: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] px-[16px] py-[12px] text-left ${bgClass}`}>
      <div className="mb-[4px] flex items-center gap-[8px]">
        <img src={icon} alt="" className="h-[20px] w-[20px] shrink-0" />
        <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">{title}</p>
      </div>
      <div className="flex flex-col gap-[4px] pl-[28px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281]">{children}</div>
    </div>
  );
}

function TextCard({
  title,
  colorClass,
  bgClass,
  value,
}: {
  title: string;
  colorClass: string;
  bgClass: string;
  value: string;
}) {
  return (
    <div className={`mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] px-[16px] py-[12px] text-left ${bgClass}`}>
      <div className="mb-[4px] flex items-center gap-[6px]">
        <p className={`text-[14px] font-semibold tracking-[-0.7px] ${colorClass}`}>{title}</p>
      </div>
      <p className="pl-[4px] text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281]">{value}</p>
    </div>
  );
}
