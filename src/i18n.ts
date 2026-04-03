import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      checking_location: '현재 위치를 확인하는 중...',
      load_failed: '병원 데이터를 불러오는 데 실패했습니다.',
      nearby_hospitals: '내 근처 병원',
      radius_limit: '반경 {{radius}}km · 최대 {{limit}}개',
      refresh: '새로고침',
      search_placeholder: '병원명 또는 주소 검색',
      no_hospitals: '주변 {{radius}}km 내 검색된 병원이 없습니다.',
      homepage: '홈페이지',
      distance: '{{dist}} km',
      department: '진료과',
      language: '한국어',
    },
  },
  en: {
    translation: {
      checking_location: 'Checking current location...',
      load_failed: 'Failed to load hospital data.',
      nearby_hospitals: 'Nearby Hospitals',
      radius_limit: 'Radius {{radius}}km · Up to {{limit}}',
      refresh: 'Refresh',
      search_placeholder: 'Search hospital name or address',
      no_hospitals: 'No hospitals found within {{radius}}km.',
      homepage: 'Homepage',
      distance: '{{dist}} km',
      department: 'Department',
      language: 'English',
    },
  },
  vi: {
    translation: {
      checking_location: 'Đang kiểm tra vị trí hiện tại...',
      load_failed: 'Không thể tải dữ liệu bệnh viện.',
      nearby_hospitals: 'Bệnh viện gần đây',
      radius_limit: 'Bán kính {{radius}}km · Tối đa {{limit}}',
      refresh: 'Làm mới',
      search_placeholder: 'Tìm kiếm tên hoặc địa chỉ bệnh viện',
      no_hospitals: 'Không tìm thấy bệnh viện nào trong vòng {{radius}}km.',
      homepage: 'Trang chủ',
      distance: '{{dist}} km',
      department: 'Khoa',
      language: 'Tiếng Việt',
    },
  },
  uz: {
    translation: {
      checking_location: 'Joriy joylashuv tekshirilmoqda...',
      load_failed: "Kasalxona ma'lumotlarini yuklab bo'lmadi.",
      nearby_hospitals: 'Yaqin atrofdagi kasalxonalar',
      radius_limit: 'Radius {{radius}}km · Maksimal {{limit}}',
      refresh: 'Yangilash',
      search_placeholder: 'Kasalxona nomi yoki manzilini qidiring',
      no_hospitals: '{{radius}}km radiusda kasalxonalar topilmadi.',
      homepage: 'Bosh sahifa',
      distance: '{{dist}} km',
      department: "Bo'lim",
      language: "O'zbek",
    },
  },
  zh: {
    translation: {
      checking_location: '正在获取当前位置...',
      load_failed: '加载医院数据失败。',
      nearby_hospitals: '附近医院',
      radius_limit: '半径 {{radius}}km · 最多 {{limit}}个',
      refresh: '刷新',
      search_placeholder: '搜索医院名称或地址',
      no_hospitals: '周边 {{radius}}km 内未找到医院。',
      homepage: '主页',
      distance: '{{dist}} km',
      department: '科室',
      language: '中文',
    },
  },
  th: {
    translation: {
      checking_location: 'กำลังตรวจสอบตำแหน่งปัจจุบัน...',
      load_failed: 'ไม่สามารถโหลดข้อมูลโรงพยาบาลได้',
      nearby_hospitals: 'โรงพยาบาลใกล้เคียง',
      radius_limit: 'รัศมี {{radius}} กม. · สูงสุด {{limit}} แห่ง',
      refresh: 'รีเฟรช',
      search_placeholder: 'ค้นหาชื่อหรือที่อยู่โรงพยาบาล',
      no_hospitals: 'ไม่พบโรงพยาบาลในรัศมี {{radius}} กม.',
      homepage: 'หน้าแรก',
      distance: '{{dist}} กม.',
      department: 'แผนก',
      language: 'ภาษาไทย',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React는 자체적으로 XSS 공격을 방어합니다
    },
  });

export default i18n;
