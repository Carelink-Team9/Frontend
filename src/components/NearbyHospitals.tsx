import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyHospitals } from '../api/hospitalApi';
import type { Hospital } from '../types/hospital';
import MobileContainer from './layout/MobileContainer';
import AppHeader from './layout/AppHeader';
import StatusMessage from './common/StatusMessage';

const imgIconSearch = 'https://www.figma.com/api/mcp/asset/5ae4fa48-582e-4f97-9adc-25f2643b7729';
const imgIconH = 'https://www.figma.com/api/mcp/asset/957eed91-6dfa-497a-b4d8-09b44d4e0929';
const imgVector = 'https://www.figma.com/api/mcp/asset/0096cd99-2e63-4a70-83be-f977206ceaad';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/4c87356a-d113-46fa-ac34-b46ac0e20802';
const imgIconLink = 'https://www.figma.com/api/mcp/asset/80c8b75d-2219-4c9c-b75e-18b0c079822b';
const imgRefresh = 'https://www.figma.com/api/mcp/asset/723e4b1e-44e0-42a0-9cba-a81433b9aa05';

const RADIUS_KM = 5;
const LIMIT = 20;

export default function NearbyHospitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const state = location.state as { symptoms?: string[]; doctorSummary?: string; mainDepartment?: string } | null;
  const symptoms = state?.symptoms ?? [];
  const doctorSummary = state?.doctorSummary ?? '';
  const mainDepartment = state?.mainDepartment ?? '';
  const { lat, lng, error: geoError, loading: geoLoading } = useGeolocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filtered, setFiltered] = useState<Hospital[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!lat || !lng) return;
    setFetching(true);
    setFetchError(null);

    fetchNearbyHospitals(lat, lng, RADIUS_KM, LIMIT, mainDepartment || undefined)
      .then((data) => {
        setHospitals(data);
        setFiltered(data);
      })
      .catch(() => setFetchError(t('hospitals.fetchFailed')))
      .finally(() => setFetching(false));
  }, [lat, lng, mainDepartment, refreshKey, t]);

  useEffect(() => {
    const query = search.trim().toLowerCase();
    setFiltered(
      query
        ? hospitals.filter((hospital) => hospital.name.toLowerCase().includes(query) || hospital.address.toLowerCase().includes(query))
        : hospitals,
    );
  }, [hospitals, search]);

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          title={t('hospitals.prepareVisit')}
          rightElement={
            <div className="flex h-[22px] items-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="text-[12px] font-medium tracking-[0.24px] text-white">{t('common.step', { current: 3, total: 4 })}</span>
            </div>
          }
        />
      }
      bottomFixedElement={
        <div className="rounded-tl-[10px] rounded-tr-[10px] bg-white px-[32px] pb-[20px] pt-[20px] shadow-[0px_-4px_10px_0px_rgba(209,213,219,0.35)]">
          <button
            type="button"
            onClick={() => navigate('/hospital-visit-guide', { state: { symptoms, doctorSummary, mainDepartment } })}
            className="flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#296dff] shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]"
          >
            <span className="text-[18px] font-medium tracking-[-0.9px] text-white">{t('hospitals.prepareVisit')}</span>
          </button>
        </div>
      }
    >
      <div className="flex items-start justify-between px-[32px] pt-[24px] text-left">
        <div>
          <h1 className="text-[24px] font-semibold tracking-[-1.2px] text-[#111827]">{t('hospitals.title')}</h1>
          <p className="mt-[6px] text-[13px] font-medium tracking-[-0.5px] text-[#6b7280]">{t('hospitals.radiusLimit', { radius: RADIUS_KM, limit: LIMIT })}</p>
          {mainDepartment ? (
            <div className="mt-[8px] inline-flex items-center gap-[6px] rounded-[20px] bg-[rgba(41,109,255,0.1)] px-[12px] py-[4px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#296dff]" />
              <span className="text-[13px] font-medium tracking-[-0.6px] text-[#296dff]">{t('hospitals.aiRecommendation', { department: mainDepartment })}</span>
            </div>
          ) : null}
        </div>
        <button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="mt-[4px] p-[4px]" aria-label={t('common.refresh')}>
          <img src={imgRefresh} alt="" className="h-[20px] w-[20px]" />
        </button>
      </div>

      <div className="px-[32px] pt-[20px]">
        <div className="flex h-[52px] items-center gap-[10px] rounded-[8px] bg-[#f3f4f6] px-[15px] shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,0.02)]">
          <img src={imgIconSearch} alt="" className="h-[20px] w-[20px] shrink-0" />
          <input
            type="text"
            placeholder={t('hospitals.searchPlaceholder')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="flex-1 bg-transparent text-[15px] font-medium tracking-[-0.5px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>
      </div>

      <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

      <div className="flex flex-col gap-[20px] px-[32px] py-[20px] text-left">
        {geoLoading || fetching ? (
          <StatusMessage message={t('common.loading')} />
        ) : geoError || fetchError ? (
          <StatusMessage message={geoError ?? fetchError ?? t('hospitals.fetchFailed')} />
        ) : filtered.length === 0 ? (
          <StatusMessage message={t('hospitals.empty', { radius: RADIUS_KM })} />
        ) : (
          filtered.map((hospital) => <HospitalCard key={hospital.hospitalId} hospital={hospital} />)
        )}
      </div>
    </MobileContainer>
  );
}

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-[10px] bg-[#f9f9fb] p-[20px] text-left shadow-[0px_4px_10px_0px_#d1d5db]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <img src={imgIconH} alt="" className="h-[18px] w-[18px] shrink-0" />
          <span className="text-[16px] font-bold tracking-[-0.5px] text-[#111827]">{hospital.name}</span>
        </div>
        <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[13px] font-medium tracking-[-0.5px] text-white">{hospital.distanceKm.toFixed(2)} km</span>
      </div>

      {hospital.department ? (
        <div className="mt-[12px] inline-flex h-[24px] items-center rounded-[12px] bg-[#caffe8] px-[10px]">
          <span className="text-[13px] font-semibold tracking-[-0.5px] text-[#0bb980]">{hospital.department}</span>
        </div>
      ) : null}

      <div className="my-[15px] h-px bg-[#d1d5db]" />

      <div className="flex flex-col gap-[10px]">
        <div className="flex items-start gap-[8px]">
          <img src={imgVector} alt="" className="mt-[3px] h-[16px] w-[12px] shrink-0" />
          <span className="text-[14px] font-medium leading-[1.5] tracking-[-0.5px] text-[#6b7280]">{hospital.address}</span>
        </div>

        {hospital.phone ? (
          <a href={`tel:${hospital.phone}`} className="flex items-center gap-[8px]">
            <img src={imgVector1} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#296dff]">{hospital.phone}</span>
          </a>
        ) : (
          <div className="flex items-center gap-[8px]">
            <img src={imgVector1} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#6b7280]">{t('hospitals.phoneUnavailable')}</span>
          </div>
        )}

        {hospital.homepage ? (
          <a href={hospital.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px]">
            <img src={imgIconLink} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="truncate text-[14px] font-medium tracking-[-0.5px] text-[#296dff]">{hospital.homepage}</span>
          </a>
        ) : (
          <div className="flex items-center gap-[8px]">
            <img src={imgIconLink} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#6b7280]">{t('hospitals.websiteUnavailable')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
