import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { getSymptomDisplayLabel, resolveSupportedLanguage, SYMPTOM_CATEGORIES } from './symptomLabels';

const imgX = 'https://www.figma.com/api/mcp/asset/c78de93a-e480-4b0c-afd6-ac6c4fa4464b';

export default function SymptomInputScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [quickOpen, setQuickOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const currentLanguage = useMemo(() => resolveSupportedLanguage(i18n.resolvedLanguage), [i18n.resolvedLanguage]);

  const toggle = (symptom: string) => {
    setSelected((previous) => (previous.includes(symptom) ? previous.filter((item) => item !== symptom) : [...previous, symptom]));
  };

  const handleNext = () => {
    if (selected.length === 0 && !customText.trim()) return;
    const symptoms = customText.trim() ? [...selected, customText.trim()] : selected;
    navigate('/symptom-loading', { state: { symptoms } });
  };

  const canProceed = selected.length > 0 || Boolean(customText.trim());

  return (
    <MobileContainer
      hasBottomNav={false}
      header={
        <AppHeader
          title={t('symptom.inputTitle')}
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">{t('common.step', { current: 1, total: 3 })}</span>
            </div>
          }
        />
      }
      bottomFixedElement={
        <div className="shrink-0 bg-white px-[31px] py-[20px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className={`h-[60px] w-full rounded-[10px] px-[16px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              canProceed ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]' : 'cursor-not-allowed bg-[#f9f9fb] text-[#d1d5db]'
            }`}
          >
            <span className="break-words whitespace-normal leading-[1.3]">{t('symptom.next')}</span>
          </button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col items-start gap-[12px] px-[32px] pb-[24px] pt-[30px] text-left">
          <p className="break-keep text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827]">{t('symptom.heading')}</p>
          <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{t('symptom.description')}</p>
        </div>

        <div className="h-[20px] bg-[#f9f9fb]" />

        <div className="flex w-full flex-col items-start px-[32px] pb-[20px] pt-[20px] text-left">
          <p className="mb-[12px] text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.selected')}</p>
          {selected.length > 0 ? (
            <div className="flex w-full flex-wrap gap-[10px]">
              {selected.map((symptom) => (
                <div key={symptom} className="flex min-h-[35px] max-w-full items-center gap-[6px] rounded-[20px] bg-[#296dff] px-[15px] py-[8px]">
                  <span className="break-words text-[14px] font-medium leading-[1.3] tracking-[-0.7px] text-white">{getSymptomDisplayLabel(symptom, currentLanguage)}</span>
                  <button type="button" onClick={() => toggle(symptom)} className="flex shrink-0 items-center">
                    <img src={imgX} alt={t('symptom.remove')} className="h-[10px] w-[10px]" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] font-medium leading-[1.5] text-[#d1d5db]">{t('symptom.selectedEmpty')}</p>
          )}
        </div>

        <div className="h-[20px] bg-[#f9f9fb]" />

        <div className="px-[32px] pt-[20px]">
          <button type="button" onClick={() => setQuickOpen((value) => !value)} className="flex w-full items-center justify-between gap-[12px] pb-[20px]">
            <span className="min-w-0 break-keep text-[18px] font-medium tracking-[-0.9px] text-black">{t('symptom.quickPick')}</span>
            <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#296dff]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {quickOpen ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
              </svg>
            </div>
          </button>

          {quickOpen ? (
            <div className="flex flex-col gap-[16px] pb-[20px]">
              {SYMPTOM_CATEGORIES.map((category, index) => (
                <div key={category.labelKey}>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <span className="break-keep text-[14px] font-medium leading-[1.4] tracking-[-0.7px] text-black">
                      {category.emoji} {t(category.labelKey)}
                    </span>
                    {category.symptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        type="button"
                        onClick={() => toggle(symptom.value)}
                        className={`flex min-h-[35px] max-w-full items-center rounded-[17.5px] border px-[10px] py-[8px] text-left text-[14px] font-medium leading-[1.3] tracking-[-0.7px] transition-colors ${
                          selected.includes(symptom.value) ? 'border-[#296dff] bg-[#296dff] text-white' : 'border-[#111827] bg-white text-black'
                        }`}
                      >
                        <span className="break-words whitespace-normal">{symptom.label[currentLanguage]}</span>
                      </button>
                    ))}
                  </div>
                  {index < SYMPTOM_CATEGORIES.length - 1 ? <div className="mt-[16px] h-px bg-[#d1d5db]" /> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="h-[20px] bg-[#f9f9fb]" />

        <div className="flex w-full flex-col items-start gap-[12px] px-[32px] pb-[20px] pt-[20px] text-left">
          <p className="break-keep text-[20px] font-bold leading-[1.3] tracking-[-1px] text-[#111827]">{t('symptom.customInputTitle')}</p>
          <p className="text-[15px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{t('symptom.customInputDescription')}</p>
          <textarea
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
            placeholder={t('symptom.customInputPlaceholder')}
            rows={4}
            className="w-full resize-none rounded-[10px] bg-[#f3f4f6] px-[20px] py-[16px] text-[16px] font-medium tracking-[-0.8px] text-[#111827] outline-none placeholder:text-[#6b7280]"
          />
        </div>

        <div className="flex-1" />
      </div>
    </MobileContainer>
  );
}
