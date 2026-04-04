import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LANGUAGE_SELECTED_KEY = 'care-link-language-selected';

const flagKr = 'https://www.figma.com/api/mcp/asset/8b309268-334e-4be5-83d4-edfef9d99038';
const flagUs = 'https://www.figma.com/api/mcp/asset/3974a700-01af-406c-9c07-c5fa4fd08e3e';
const flagCn = 'https://www.figma.com/api/mcp/asset/a3fd73d6-bdd5-4498-8d60-69aed5527d0d';
const flagJp = 'https://www.figma.com/api/mcp/asset/83350fd1-8d85-43db-88cd-ee0a8421470f';
const flagVn = 'https://www.figma.com/api/mcp/asset/7cc922d8-da1f-42d8-9caf-a4d183c817c7';
const flagTh = 'https://www.figma.com/api/mcp/asset/bba70a11-8d32-4217-9a3a-c36ed59aa464';
const flagUz = 'https://www.figma.com/api/mcp/asset/1d83fc0b-996a-4cab-a4f3-e461484ddf60';
const imgIconLanguage = 'https://www.figma.com/api/mcp/asset/b7527806-d589-4fe9-bcf5-f66fb3772b95';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/aa145d99-e2d9-4a96-bc67-591ba64e527c';

const languages = [
  { code: 'ko', flagSrc: flagKr, countryCode: 'KR', nameKey: 'language.ko' },
  { code: 'en', flagSrc: flagUs, countryCode: 'US', nameKey: 'language.en' },
  { code: 'zh', flagSrc: flagCn, countryCode: 'CN', nameKey: 'language.zh' },
  { code: 'ja', flagSrc: flagJp, countryCode: 'JP', nameKey: 'language.ja' },
  { code: 'vi', flagSrc: flagVn, countryCode: 'VN', nameKey: 'language.vi' },
  { code: 'th', flagSrc: flagTh, countryCode: 'TH', nameKey: 'language.th' },
  { code: 'uz', flagSrc: flagUz, countryCode: 'UZ', nameKey: 'language.uz' },
] as const;

interface Props {
  onComplete: (language: string) => void;
}

export default function LanguageSelectScreen({ onComplete }: Props) {
  const { i18n, t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selected || submitting) return;
    setSubmitting(true);

    try {
      await i18n.changeLanguage(selected);
      localStorage.setItem(LANGUAGE_SELECTED_KEY, selected);
      onComplete(selected);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full justify-center bg-[#f3f4f6]">
      <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">
        <div className="flex justify-center pt-[120px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-[#f9f9fb] shadow-[0px_4px_8px_0px_rgba(209,213,219,0.5)]">
            <img src={imgIconLanguage} alt="" className="h-[40px] w-[40px]" />
          </div>
        </div>

        <div className="mt-[37px] flex flex-col items-center gap-[17px]">
          <h1 className="m-0 text-center text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827] break-keep">
            {t('language.title')}
          </h1>
          <p className="text-[18px] font-medium tracking-[-0.36px] text-[#6b7280]">{t('language.subtitle')}</p>
        </div>

        <div className="mt-[32px] flex flex-col gap-[15px] px-[36px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className={`flex h-[60px] w-full items-center rounded-[10px] px-[18px] text-left transition-colors ${
                selected === lang.code ? 'border-[1.5px] border-[#296dff] bg-white' : 'border border-[#d1d5db] bg-white'
              }`}
            >
              <div className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full">
                <img src={lang.flagSrc} alt={lang.countryCode} className="h-full w-full object-cover" />
              </div>
              <span className="ml-[12px] w-[28px] shrink-0 text-[14px] font-medium tracking-[-0.7px] text-[#374151]">
                {lang.countryCode}
              </span>
              <span className="ml-[8px] min-w-0 flex-1 break-words text-[18px] font-bold leading-[1.2] tracking-[-0.9px] text-[#111827]">
                {t(lang.nameKey)}
              </span>
              {selected === lang.code ? (
                <img src={imgIconCheck} alt={t('language.selected')} className="ml-auto h-[22px] w-[22px] shrink-0" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-center gap-[4px] px-[32px] pb-[16px]">
          <span className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">{t('language.supportPrompt')}</span>
          <button type="button" className="text-[14px] font-medium tracking-[-0.7px] text-[#2a52c7]">
            {t('language.supportAction')}
          </button>
        </div>

        <div className="px-[32px] pb-[40px]">
          <button
            type="button"
            onClick={() => void handleContinue()}
            disabled={!selected || submitting}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              selected && !submitting ? 'cursor-pointer bg-[#296dff] text-white' : 'cursor-not-allowed bg-[#f9f9fb] text-[#d1d5db]'
            }`}
          >
            {submitting ? t('common.processing') : t('common.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
