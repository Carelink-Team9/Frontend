import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
const imgVector2 = 'https://www.figma.com/api/mcp/asset/723e4b1e-44e0-42a0-9cba-a81433b9aa05';

const RADIUS_KM = 5;
const LIMIT = 20;

export default function NearbyHospitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { symptoms?: string[]; doctorSummary?: string; mainDepartment?: string } | null;
  const symptoms: string[] = state?.symptoms ?? [];
  const doctorSummary: string = state?.doctorSummary ?? '';
  const mainDepartment: string = state?.mainDepartment ?? '';
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
      .catch(() => setFetchError('병원 정보를 불러오지 못했습니다.'))
      .finally(() => setFetching(false));
  }, [lat, lng, refreshKey]);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    setFiltered(
      q
        ? hospitals.filter(
            (h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q),
          )
        : hospitals,
    );
  }, [search, hospitals]);

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          title="진료 준비하기"
          rightElement={
            <div className="flex h-[22px] items-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="text-[12px] font-medium tracking-[0.24px] text-white">STEP 3 / 4</span>
            </div>
          }
        />
      }
      bottomFixedElement={
        <div className="rounded-tl-[10px] rounded-tr-[10px] bg-white px-[32px] pb-[20px] pt-[20px] shadow-[0px_-4px_10px_0px_rgba(209,213,219,0.35)]">
          <button
            type="button"
            onClick={() => navigate('/hospital-visit-guide', { state: { symptoms, doctorSummary, mainDepartment } })}
            className="flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#296dff] shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)] transition-colors duration-300"
          >
            <span className="text-[18px] font-medium tracking-[-0.9px] text-white">진료 준비하기</span>
          </button>
        </div>
      }
    >
      {/* 타이틀 */}
      <div className="flex items-start justify-between px-[32px] pt-[24px] text-left">
        <div>
          <h1 className="text-[24px] font-semibold tracking-[-1.2px] text-[#111827]">내 근처 병원</h1>
          <p className="mt-[6px] text-[13px] font-medium tracking-[-0.5px] text-[#6b7280]">
            {`반경 ${RADIUS_KM}km  ·  최대 ${LIMIT}개`}
          </p>
          {mainDepartment && (
            <div className="mt-[8px] inline-flex items-center gap-[6px] rounded-[20px] bg-[rgba(41,109,255,0.1)] px-[12px] py-[4px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#296dff]" />
              <span className="text-[13px] font-medium tracking-[-0.6px] text-[#296dff]">
                AI 추천: {mainDepartment}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="mt-[4px] p-[4px]"
          aria-label="새로고침"
        >
          <img src={imgVector2} alt="" className="h-[20px] w-[20px]" />
        </button>
      </div>

      {/* 검색창 */}
      <div className="px-[32px] pt-[20px]">
        <div className="flex h-[52px] items-center gap-[10px] rounded-[8px] bg-[#f3f4f6] px-[15px] shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,0.02)]">
          <img src={imgIconSearch} alt="" className="h-[20px] w-[20px] shrink-0" />
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[15px] font-medium tracking-[-0.5px] text-[#111827] placeholder-[#d1d5db] outline-none"
          />
        </div>
      </div>

      <div className="mt-[20px] h-[20px] bg-[#f9f9fb]" />

      {/* 병원 목록 */}
      <div className="flex flex-col gap-[20px] px-[32px] py-[20px] text-left">
        {geoLoading || fetching ? (
          <StatusMessage message="불러오는 중..." />
        ) : geoError || fetchError ? (
          <StatusMessage message={geoError ?? fetchError ?? '오류가 발생했습니다.'} />
        ) : filtered.length === 0 ? (
          <StatusMessage message={`반경 ${RADIUS_KM}km 내 병원이 없습니다.`} />
        ) : (
          filtered.map((h) => <HospitalCard key={h.hospitalId} hospital={h} />)
        )}
      </div>
    </MobileContainer>
  );
}

function HospitalCard({ hospital: h }: { hospital: Hospital }) {
  return (
    <div className="w-full rounded-[10px] bg-[#f9f9fb] p-[20px] shadow-[0px_4px_10px_0px_#d1d5db] text-left">
      {/* 이름 + 거리 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <img src={imgIconH} alt="" className="h-[18px] w-[18px] shrink-0" />
          <span className="text-[16px] font-bold tracking-[-0.5px] text-[#111827]">{h.name}</span>
        </div>
        <span className="shrink-0 rounded-[15px] bg-[#6b7280] px-[10px] py-[3px] text-[13px] font-medium tracking-[-0.5px] text-white">
          {h.distanceKm.toFixed(2)} km
        </span>
      </div>

      {/* 진료과 태그 */}
      {h.department && (
        <div className="mt-[12px] inline-flex h-[24px] items-center rounded-[12px] bg-[#caffe8] px-[10px]">
          <span className="text-[13px] font-semibold tracking-[-0.5px] text-[#0bb980]">{h.department}</span>
        </div>
      )}

      {/* 구분선 */}
      <div className="my-[15px] h-px bg-[#d1d5db]" />

      {/* 상세 정보 */}
      <div className="flex flex-col gap-[10px]">
        {/* 주소 */}
        <div className="flex items-start gap-[8px]">
          <img src={imgVector} alt="" className="mt-[3px] h-[16px] w-[12px] shrink-0" />
          <span className="text-[14px] font-medium leading-[1.5] tracking-[-0.5px] text-[#6b7280]">{h.address}</span>
        </div>

        {/* 전화 */}
        {h.phone ? (
          <a href={`tel:${h.phone}`} className="flex items-center gap-[8px]">
            <img src={imgVector1} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#296dff]">{h.phone}</span>
          </a>
        ) : (
          <div className="flex items-center gap-[8px]">
            <img src={imgVector1} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#6b7280]">정보없음</span>
          </div>
        )}

        {/* 홈페이지 */}
        {h.homepage ? (
          <a
            href={h.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[8px]"
          >
            <img src={imgIconLink} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="truncate text-[14px] font-medium tracking-[-0.5px] text-[#296dff]">{h.homepage}</span>
          </a>
        ) : (
          <div className="flex items-center gap-[8px]">
            <img src={imgIconLink} alt="" className="h-[15px] w-[15px] shrink-0" />
            <span className="text-[14px] font-medium tracking-[-0.5px] text-[#6b7280]">정보없음</span>
          </div>
        )}
      </div>
    </div>
  );
}
