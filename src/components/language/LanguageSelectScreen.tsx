import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LANGUAGE_SELECTED_KEY = 'care-link-language-selected';

const flagKr  = 'https://www.figma.com/api/mcp/asset/8b309268-334e-4be5-83d4-edfef9d99038';
const flagUs  = 'https://www.figma.com/api/mcp/asset/3974a700-01af-406c-9c07-c5fa4fd08e3e';
const flagCn  = 'https://www.figma.com/api/mcp/asset/a3fd73d6-bdd5-4498-8d60-69aed5527d0d';
const flagJp  = 'https://www.figma.com/api/mcp/asset/83350fd1-8d85-43db-88cd-ee0a8421470f';
const flagVn  = 'https://www.figma.com/api/mcp/asset/7cc922d8-da1f-42d8-9caf-a4d183c817c7';
const flagTh  = 'https://www.figma.com/api/mcp/asset/bba70a11-8d32-4217-9a3a-c36ed59aa464';
const flagUz  = 'https://www.figma.com/api/mcp/asset/1d83fc0b-996a-4cab-a4f3-e461484ddf60';
const imgIconLanguage = 'https://www.figma.com/api/mcp/asset/b7527806-d589-4fe9-bcf5-f66fb3772b95';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/aa145d99-e2d9-4a96-bc67-591ba64e527c';

interface Language {
  code: string;
  flagSrc: string;
  countryCode: string;
  name: string;
  i18nCode: string;
}

const languages: Language[] = [
  { code: 'ko', flagSrc: flagKr, countryCode: 'KR', name: '한국어',     i18nCode: 'ko' },
  { code: 'en', flagSrc: flagUs, countryCode: 'US', name: 'English',    i18nCode: 'en' },
  { code: 'zh', flagSrc: flagCn, countryCode: 'CN', name: '中文',        i18nCode: 'zh' },
  { code: 'ja', flagSrc: flagJp, countryCode: 'JP', name: '日本語',      i18nCode: 'en' },
  { code: 'vi', flagSrc: flagVn, countryCode: 'VN', name: 'Tiếng Việt', i18nCode: 'vi' },
  { code: 'th', flagSrc: flagTh, countryCode: 'TH', name: 'ภาษาไทย',    i18nCode: 'en' },
  { code: 'uz', flagSrc: flagUz, countryCode: 'UZ', name: "O'zbek tili", i18nCode: 'en' },
];

interface Props {
  onComplete: (language: string) => void;
}

export default function LanguageSelectScreen({ onComplete }: Props) {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selected || submitting) return;

    const lang = languages.find((l) => l.code === selected);
    if (!lang) return;

    setSubmitting(true);

    try {
      await i18n.changeLanguage(lang.i18nCode);
      localStorage.setItem(LANGUAGE_SELECTED_KEY, lang.i18nCode);
      onComplete(selected);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full justify-center bg-[#f3f4f6]">
      <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">

        {/* 아이콘 */}
        <div className="flex justify-center pt-[120px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-[#f9f9fb] shadow-[0px_4px_8px_0px_rgba(209,213,219,0.5)]">
            <img src={imgIconLanguage} alt="" className="h-[40px] w-[40px]" />
          </div>
        </div>

        {/* 타이틀 */}
        <div className="mt-[37px] flex flex-col items-center gap-[17px]">
          <h1 className="m-0 text-center text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827] break-keep">
            언어를 선택하세요
          </h1>
          <p className="text-[18px] font-medium tracking-[-0.36px] text-[#6b7280]">
            Select Your Language
          </p>
        </div>

        {/* 언어 목록 */}
        <div className="mt-[32px] flex flex-col gap-[15px] px-[36px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className={`flex h-[60px] w-full items-center rounded-[10px] px-[18px] text-left transition-colors ${
                selected === lang.code
                  ? 'border-[1.5px] border-[#296dff] bg-white'
                  : 'border border-[#d1d5db] bg-white'
              }`}
            >
              <div className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full">
                <img src={lang.flagSrc} alt={lang.countryCode} className="h-full w-full object-cover" />
              </div>
              <span className="ml-[12px] w-[28px] shrink-0 text-[14px] font-medium tracking-[-0.7px] text-[#374151]">
                {lang.countryCode}
              </span>
              <span className="ml-[8px] text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
                {lang.name}
              </span>
              {selected === lang.code && (
                <img src={imgIconCheck} alt="selected" className="ml-auto h-[22px] w-[22px] shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* 하단 텍스트 */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-[4px] px-[32px] pb-[16px]">
          <span className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
            원하는 언어가 없으신가요?
          </span>
          <button type="button" className="text-[14px] font-medium tracking-[-0.7px] text-[#2a52c7]">
            언어 지원 도움 받기
          </button>
        </div>

        {/* 계속하기 버튼 */}
        <div className="px-[32px] pb-[40px]">
          <button
            type="button"
            onClick={() => { void handleContinue(); }}
            disabled={!selected || submitting}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              selected && !submitting
                ? 'bg-[#296dff] text-white cursor-pointer'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            {submitting ? '처리 중...' : '계속하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
