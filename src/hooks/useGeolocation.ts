import { useState, useEffect } from 'react';

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ lat: null, lng: null, error: '이 브라우저는 GPS를 지원하지 않습니다.', loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        let message: string;
        switch (err.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            message = '위치 권한이 거부되었습니다. 브라우저 주소창 왼쪽 자물쇠 아이콘 → 위치 허용으로 변경해 주세요.';
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            message = '현재 위치를 파악할 수 없습니다. GPS 또는 네트워크 상태를 확인해 주세요.';
            break;
          case GeolocationPositionError.TIMEOUT:
            message = '위치 요청이 시간 초과되었습니다. 페이지를 새로고침 후 다시 시도해 주세요.';
            break;
          default:
            message = `위치를 가져오지 못했습니다. (${err.message})`;
        }
        setState({ lat: null, lng: null, error: message, loading: false });
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
    );
  }, []);

  return state;
}
