import { useEffect, useState } from 'react';
import i18n from '../i18n';

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
  loading: boolean;
}

function getGeoMessage(key: 'unsupported' | 'denied' | 'unavailable' | 'timeout', detail?: string): string {
  const lang = i18n.resolvedLanguage?.split('-')[0] ?? 'ko';

  const messages = {
    unsupported: {
      ko: '이 브라우저는 위치 정보를 지원하지 않습니다.',
      en: 'This browser does not support location services.',
      ja: 'このブラウザは位置情報に対応していません。',
      zh: '此浏览器不支持定位功能。',
      vi: 'Trình duyệt này không hỗ trợ định vị.',
      th: 'เบราว์เซอร์นี้ไม่รองรับตำแหน่งที่ตั้ง',
      uz: 'Bu brauzer joylashuv xizmatini qo‘llab-quvvatlamaydi.',
    },
    denied: {
      ko: '위치 권한이 거부되었습니다. 브라우저 설정에서 위치를 허용해 주세요.',
      en: 'Location permission was denied. Please allow location access in your browser settings.',
      ja: '位置情報の権限が拒否されました。ブラウザ設定で許可してください。',
      zh: '位置权限被拒绝，请在浏览器设置中允许定位。',
      vi: 'Quyền truy cập vị trí đã bị từ chối. Vui lòng cho phép trong cài đặt trình duyệt.',
      th: 'สิทธิ์ตำแหน่งถูกปฏิเสธ กรุณาอนุญาตตำแหน่งในตั้งค่าเบราว์เซอร์',
      uz: 'Joylashuv ruxsati rad etildi. Brauzer sozlamalarida ruxsat bering.',
    },
    unavailable: {
      ko: '현재 위치를 확인할 수 없습니다. GPS 또는 네트워크 상태를 확인해 주세요.',
      en: 'Unable to determine your current location. Please check GPS or network status.',
      ja: '現在地を確認できません。GPSまたはネットワーク状態を確認してください。',
      zh: '无法确定当前位置，请检查 GPS 或网络状态。',
      vi: 'Không thể xác định vị trí hiện tại. Vui lòng kiểm tra GPS hoặc mạng.',
      th: 'ไม่สามารถระบุตำแหน่งปัจจุบันได้ กรุณาตรวจสอบ GPS หรือเครือข่าย',
      uz: 'Joriy joylashuvni aniqlab bo‘lmadi. GPS yoki tarmoq holatini tekshiring.',
    },
    timeout: {
      ko: '위치 요청 시간이 초과되었습니다. 새로고침 후 다시 시도해 주세요.',
      en: 'The location request timed out. Refresh the page and try again.',
      ja: '位置情報の取得がタイムアウトしました。再読み込みしてもう一度お試しください。',
      zh: '定位请求超时，请刷新页面后重试。',
      vi: 'Yêu cầu vị trí đã hết thời gian. Hãy tải lại trang và thử lại.',
      th: 'คำขอตำแหน่งหมดเวลา กรุณารีเฟรชหน้าแล้วลองใหม่',
      uz: 'Joylashuv so‘rovi vaqt tugadi. Sahifani yangilang va qayta urinib ko‘ring.',
    },
  } as const;

  const fallback = {
    ko: `위치를 가져오지 못했습니다. (${detail ?? ''})`,
    en: `Failed to get location. (${detail ?? ''})`,
    ja: `位置情報を取得できませんでした。(${detail ?? ''})`,
    zh: `无法获取位置。(${detail ?? ''})`,
    vi: `Không thể lấy vị trí. (${detail ?? ''})`,
    th: `ไม่สามารถรับตำแหน่งได้ (${detail ?? ''})`,
    uz: `Joylashuvni olib bo‘lmadi. (${detail ?? ''})`,
  } as const;

  if (key in messages) {
    const messageSet = messages[key];
    return messageSet[(lang in messageSet ? lang : 'ko') as keyof typeof messageSet];
  }

  return fallback[(lang in fallback ? lang : 'ko') as keyof typeof fallback];
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
      setState({ lat: null, lng: null, error: getGeoMessage('unsupported'), loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let message: string;
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            message = getGeoMessage('denied');
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            message = getGeoMessage('unavailable');
            break;
          case GeolocationPositionError.TIMEOUT:
            message = getGeoMessage('timeout');
            break;
          default:
            message = getGeoMessage('unsupported', error.message);
        }
        setState({ lat: null, lng: null, error: message, loading: false });
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
    );
  }, []);

  return state;
}
