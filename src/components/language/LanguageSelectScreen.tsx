import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

export const LANGUAGE_SELECTED_KEY = 'care-link-language-selected';

const flagKr = 'https://www.figma.com/api/mcp/asset/0d9fdf68-40e8-4d70-8d4b-cd0ab70601d1';
const flagUs = 'https://www.figma.com/api/mcp/asset/be956d5d-d883-4c7d-aecb-d39285ca8ef4';
const flagCn = 'https://www.figma.com/api/mcp/asset/ec9bb864-a524-48b5-bcc3-a4d91f24d5cb';
const flagJp = 'https://www.figma.com/api/mcp/asset/71ad7aa7-077d-4d6e-b16c-07897206cc0e';
const flagVn = 'https://www.figma.com/api/mcp/asset/ace4c855-85f4-4830-818c-1520cffe75a7';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/aa145d99-e2d9-4a96-bc67-591ba64e527c';

interface Language {
  code: string;
  flagSrc: string;
  countryCode: string;
  name: string;
  i18nCode: string;
}

const languages: Language[] = [
  { code: 'ko', flagSrc: flagKr, countryCode: 'KR', name: '한국어', i18nCode: 'ko' },
  { code: 'en', flagSrc: flagUs, countryCode: 'US', name: 'English', i18nCode: 'en' },
  { code: 'zh', flagSrc: flagCn, countryCode: 'CN', name: '中文', i18nCode: 'zh' },
  { code: 'ja', flagSrc: flagJp, countryCode: 'JP', name: '日本語', i18nCode: 'en' },
  { code: 'vi', flagSrc: flagVn, countryCode: 'VN', name: 'Tiếng Việt', i18nCode: 'vi' },
];

interface Props {
  onComplete: () => void;
}

export default function LanguageSelectScreen({ onComplete }: Props) {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    const lang = languages.find((l) => l.code === selected)!;
    i18n.changeLanguage(lang.i18nCode);
    localStorage.setItem(LANGUAGE_SELECTED_KEY, lang.i18nCode);
    onComplete();
  };

  return (
    <div className="flex min-h-svh w-full justify-center bg-[#F3F4F6]">
      <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">
        {/* Language icon */}
        <div className="flex justify-center pt-[120px]">
          <div className="flex items-center justify-center w-[60px] h-[60px] rounded-[10px] bg-[#f9f9fb] shadow-[0px_4px_8px_0px_rgba(209,213,219,0.5)]">
            <LanguageIcon sx={{ fontSize: 40, color: '#374151' }} />
          </div>
        </div>

        {/* Title */}
        <div className="mt-[37px] flex flex-col items-center gap-[17px]">
          <h1 className="m-0 text-[28px] font-medium tracking-[-1.4px] text-[#111827]">
            언어를 선택하세요
          </h1>
          <p className="text-[18px] font-medium tracking-[-0.36px] text-[#6b7280]">
            Select Your Language
          </p>
        </div>

        {/* Language list */}
        <div className="mt-[44px] flex flex-col gap-[15px] px-[36px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className={`flex items-center h-[60px] w-full rounded-[10px] px-[18px] transition-colors text-left ${
                selected === lang.code
                  ? 'border-[1.5px] border-[#296dff] bg-white'
                  : 'border border-[#d1d5db] bg-white'
              }`}
            >
              <div className="w-[42px] h-[42px] rounded-full overflow-hidden shrink-0">
                <img src={lang.flagSrc} alt={lang.countryCode} className="w-full h-full object-cover" />
              </div>
              <span className="ml-[12px] text-[14px] font-medium tracking-[-0.7px] text-[#374151] w-[28px] shrink-0">
                {lang.countryCode}
              </span>
              <span className="ml-[8px] text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
                {lang.name}
              </span>
              {selected === lang.code && (
                <img src={imgIconCheck} alt="선택됨" className="ml-auto h-[22px] w-[22px] shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer help text */}
        <div className="mt-auto flex items-center justify-center gap-[4px] pb-[16px] px-[32px] flex-wrap">
          <span className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
            원하는 언어가 없으신가요?
          </span>
          <button type="button" className="text-[14px] font-medium tracking-[-0.7px] text-[#2a52c7]">
            언어 지원 도움 받기
          </button>
        </div>

        {/* Continue button */}
        <div className="pb-[40px] px-[32px]">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full h-[60px] rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              selected
                ? 'bg-[#296dff] text-white cursor-pointer'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
