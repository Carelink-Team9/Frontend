import { useState, useEffect } from 'react';
import {
  CircularProgress,
  Alert,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyHospitals } from '../api/hospitalApi';
import type { Hospital } from '../types/hospital';

const RADIUS_KM = 5;
const LIMIT = 20;

export default function NearbyHospitals() {
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
    fetchNearbyHospitals(lat, lng, RADIUS_KM, LIMIT)
      .then((data) => {
        setHospitals(data);
        setFiltered(data);
      })
      .catch(() => setFetchError('병원 데이터를 불러오는 데 실패했습니다.'))
      .finally(() => setFetching(false));
  }, [lat, lng, refreshKey]);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    setFiltered(
      q ? hospitals.filter((h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)) : hospitals,
    );
  }, [search, hospitals]);

  if (geoLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <CircularProgress size={48} />
        <Typography color="text.secondary">현재 위치를 확인하는 중...</Typography>
      </div>
    );
  }

  if (geoError) {
    return (
      <div className="max-w-lg mx-auto mt-10 px-4">
        <Alert severity="error">{geoError}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h5" fontWeight={700}>
            내 근처 병원
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-1">
            반경 {RADIUS_KM}km · 최대 {LIMIT}개
          </Typography>
        </div>
        <IconButton onClick={() => setRefreshKey((k) => k + 1)} title="새로고침">
          <RefreshIcon />
        </IconButton>
      </div>

      {/* 검색 */}
      <TextField
        fullWidth
        size="small"
        placeholder="병원명 또는 주소 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        className="mb-5"
        sx={{ mb: 3 }}
      />

      {/* 로딩 / 에러 / 결과 없음 */}
      {fetching && (
        <div className="flex justify-center py-12">
          <CircularProgress />
        </div>
      )}
      {fetchError && <Alert severity="error">{fetchError}</Alert>}
      {!fetching && !fetchError && filtered.length === 0 && (
        <Alert severity="info">주변 {RADIUS_KM}km 내 검색된 병원이 없습니다.</Alert>
      )}

      {/* 병원 카드 목록 */}
      {!fetching && filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map((h) => (
            <HospitalCard key={h.hospitalId} hospital={h} />
          ))}
        </div>
      )}
    </div>
  );
}

function HospitalCard({ hospital: h }: { hospital: Hospital }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-4">
      {/* 이름 + 거리 */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <LocalHospitalIcon fontSize="small" color="error" />
          <Typography variant="subtitle1" fontWeight={600}>
            {h.name}
          </Typography>
        </div>
        <Chip
          label={`${h.distanceKm} km`}
          size="small"
          color="primary"
          variant="outlined"
          className="shrink-0"
        />
      </div>

      {/* 진료과 */}
      {h.department && (
        <Chip label={h.department} size="small" sx={{ mb: 1.5, bgcolor: '#f3e8ff', color: '#7c3aed', border: 'none' }} />
      )}

      <Divider sx={{ my: 1 }} />

      {/* 주소 */}
      <div className="flex items-start gap-1.5 mt-2">
        <LocationOnIcon fontSize="small" className="text-gray-400 mt-0.5 shrink-0" />
        <Typography variant="body2" color="text.secondary">
          {h.address}
        </Typography>
      </div>

      {/* 전화 + 홈페이지 */}
      <div className="flex items-center justify-between mt-2">
        {h.phone ? (
          <a href={`tel:${h.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">{h.phone}</Typography>
          </a>
        ) : (
          <span />
        )}
        {h.homepage && (
          <a href={h.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-gray-500 hover:text-gray-700">
            <OpenInNewIcon fontSize="small" />
            <Typography variant="body2">홈페이지</Typography>
          </a>
        )}
      </div>
    </div>
  );
}
