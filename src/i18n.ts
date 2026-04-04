import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { th } from './locales/th';
import { uz } from './locales/uz';
import { vi } from './locales/vi';
import { zh } from './locales/zh';

const LANGUAGE_SELECTED_KEY = 'care-link-language-selected';
const SUPPORTED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'vi', 'th', 'uz'] as const;

function getInitialLanguage(): (typeof SUPPORTED_LANGUAGES)[number] {
  if (typeof window === 'undefined') return 'ko';

  const storedLanguage = window.localStorage.getItem(LANGUAGE_SELECTED_KEY)?.split('-')[0];
  if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage as (typeof SUPPORTED_LANGUAGES)[number])) {
    return storedLanguage as (typeof SUPPORTED_LANGUAGES)[number];
  }

  return 'ko';
}

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    ja: { translation: ja },
    zh: { translation: zh },
    vi: { translation: vi },
    th: { translation: th },
    uz: { translation: uz },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
