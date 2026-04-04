import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPrescriptionHistory, type PrescriptionSummary } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import StatusMessage from '../common/StatusMessage';

const imgIcon = 'https://www.figma.com/api/mcp/asset/78067cee-8a68-4c06-8069-be06801b481d';
const imgFallback = 'https://www.figma.com/api/mcp/asset/b33bd690-f1f8-4c7a-a7fa-4ad41fd2d38e';

type Filter = 'all' | 'thisMonth' | 'lastMonth';

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function matchesFilter(isoString: string, filter: Filter): boolean {
  if (filter === 'all') return true;

  const now = new Date();
  const date = new Date(isoString);
  if (filter === 'thisMonth') {
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }

  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
}

function resolveImageUrl(url: string | null): string {
  if (!url) return imgFallback;
  if (url.startsWith('/uploads')) return url;
  return url;
}

export default function PrescriptionListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setPrescriptionId = usePrescriptionFlowStore((state) => state.setPrescriptionId);
  const setResult = usePrescriptionFlowStore((state) => state.setResult);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [prescriptions, setPrescriptions] = useState<PrescriptionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrescriptionHistory()
      .then(setPrescriptions)
      .catch(() => setError(t('prescription.loadFailed')))
      .finally(() => setLoading(false));
  }, [t]);

  const openPrescription = (id: number) => {
    setResult(null);
    setPrescriptionId(id);
    navigate('/prescriptions/result');
  };

  const filtered = prescriptions.filter((prescription) => {
    if (!matchesFilter(prescription.prescribedAt, filter)) return false;
    if (!search.trim()) return true;
    return formatDate(prescription.prescribedAt).includes(search);
  });

  const filters: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: t('common.all') },
    { key: 'thisMonth', label: t('common.thisMonth') },
    { key: 'lastMonth', label: t('common.lastMonth') },
  ];

  return (
    <MobileContainer hasBottomNav header={<AppHeader title={t('prescription.listTitle')} />}>
      <div className="flex justify-center px-[31px] pt-[20px]">
        <div className="relative flex h-[52px] w-full items-center rounded-[8px] bg-[#f3f4f6] shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,0.02)]">
          <img src={imgIcon} alt="" className="ml-[20px] h-[20px] w-[20px] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('prescription.searchPlaceholder')}
            className="ml-[12px] flex-1 bg-transparent text-[16px] font-medium tracking-[-0.8px] text-[#111827] outline-none placeholder:text-[#d1d5db]"
          />
        </div>
      </div>

      <div className="mt-[20px] h-[20px] w-full bg-[#f9f9fb]" />

      <div className="flex gap-[10px] px-[31px] pt-[20px]">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`flex h-[35px] items-center justify-center rounded-[20px] border px-[15px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
              filter === item.key ? 'border-[#296dff] bg-[#296dff] text-white' : 'border-[#d1d5db] bg-white text-[#111827]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-[10px] px-[31px] py-[20px]">
        {loading ? (
          <StatusMessage message={t('common.loading')} className="py-[20px]" />
        ) : error ? (
          <StatusMessage message={error} className="py-[20px]" />
        ) : filtered.length === 0 ? (
          <p className="mt-[40px] text-[14px] text-[#6b7280]">{t('prescription.empty')}</p>
        ) : (
          filtered.map((prescription) => (
            <button
              key={prescription.prescriptionId}
              type="button"
              onClick={() => openPrescription(prescription.prescriptionId)}
              className="flex h-[130px] w-full items-center gap-[24px] rounded-[10px] border border-[#d1d5db] bg-white px-[20px] text-left"
            >
              <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#f9f9fb]">
                <img
                  src={resolveImageUrl(prescription.imageUrl)}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = imgFallback;
                  }}
                />
              </div>

              <div className="ml-[8px] flex flex-col items-start gap-[4px]">
                <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('prescription.recordLabel')}</p>
                <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">{formatDate(prescription.prescribedAt)}</p>
                <div className="flex h-[25px] items-center justify-center rounded-[20px] bg-[rgba(41,109,255,0.1)] px-[10px]">
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">{t('prescription.medicineCount', { count: prescription.totalDrugCount })}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </MobileContainer>
  );
}
