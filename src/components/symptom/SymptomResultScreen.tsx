import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { DepartmentRecommendResponse } from '../../api/symptomApi';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { getDepartmentDisplayLabel, getSymptomDisplayLabel, resolveSupportedLanguage } from './symptomLabels';

const imgIconCheck = 'https://www.figma.com/api/mcp/asset/805461ba-852c-4a15-b122-f60a1d8b2d8c';
const imgIconCheck1 = 'https://www.figma.com/api/mcp/asset/1e43820f-a101-4428-9dfd-26d60e5e98a1';

export default function SymptomResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const state = location.state as { symptoms?: string[]; result?: DepartmentRecommendResponse | null };
  const symptoms = state?.symptoms ?? [];
  const result = state?.result ?? null;
  const [agreed, setAgreed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const warningRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 2500);
        }
      },
      { threshold: 0.5 },
    );

    if (warningRef.current) observer.observe(warningRef.current);
    return () => observer.disconnect();
  }, []);

  const fallbackResult: DepartmentRecommendResponse = {
    mainDepartment: t('symptom.failedTitle'),
    translatedMainDepartment: '',
    mainConfidence: 0,
    reason: t('symptom.failedReason'),
    translatedReason: '',
    doctorSummary: '',
    alternatives: [],
  };

  const main = result ?? fallbackResult;
  const currentLanguage = resolveSupportedLanguage(i18n.resolvedLanguage);
  const displayMainDepartment =
    currentLanguage === 'ko'
      ? main.mainDepartment
      : main.translatedMainDepartment || getDepartmentDisplayLabel(main.mainDepartment, currentLanguage);

  return (
    <MobileContainer
      hasBottomNav={false}
      header={
        <AppHeader
          title={t('symptom.recommendTitle')}
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">{t('common.step', { current: 2, total: 3 })}</span>
            </div>
          }
        />
      }
      bottomFixedElement={
        <div className="shrink-0 bg-white px-[31px] py-[20px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            disabled={!agreed}
            onClick={() => {
              if (!agreed) return;
              navigate('/nearby-hospitals', { state: { symptoms, doctorSummary: main.doctorSummary, mainDepartment: main.mainDepartment } });
            }}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              agreed ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]' : 'cursor-not-allowed bg-[#f9f9fb] text-[#d1d5db]'
            }`}
          >
            {t('symptom.checkHospitals')}
          </button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col gap-[28px] overflow-y-auto px-[32px] py-[24px]">
        <div className="flex w-full flex-col items-start gap-[12px] rounded-[10px] bg-[#c0ffe4] px-[24px] py-[24px]">
          <div className="flex items-center gap-[10px]">
            <p className="text-left text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-[#111827]">{t('symptom.analysisDone')}</p>
            <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
          </div>
          <p className="text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#111827]">{t('symptom.analysisDescription')}</p>
        </div>

        <div className="flex w-full flex-col items-start gap-[12px]">
          <p className="text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.selectedSymptoms')}</p>
          <div className="flex w-full flex-wrap gap-[10px]">
            {symptoms.map((symptom) => (
              <div key={symptom} className="flex min-h-[35px] max-w-full items-center gap-[6px] rounded-[20px] bg-[#6b7280] px-[15px] py-[8px]">
                <span className="break-words text-[14px] font-medium leading-[1.3] tracking-[-0.7px] text-white">{getSymptomDisplayLabel(symptom, currentLanguage)}</span>
                <img src={imgIconCheck1} alt="" className="h-[8px] w-[8px]" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] -mx-[32px] bg-[#f9f9fb] py-[10px]" />

        <div className="flex w-full flex-col items-start gap-[12px]">
          <p className="text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.recommendedDepartment')}</p>
          <div className="flex w-full flex-col items-start gap-[12px] rounded-[10px] bg-[rgba(41,109,255,0.1)] px-[24px] py-[24px]">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col items-start gap-[12px]">
                <p className="text-left text-[24px] font-bold leading-[1.3] tracking-[-1.2px] text-[#111827]">{displayMainDepartment}</p>
                {currentLanguage !== 'ko' && main.mainDepartment ? <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">{main.mainDepartment}</p> : null}
                <div className="inline-flex h-[30px] items-center rounded-[10px] bg-[#296dff] px-[15px]">
                  <span className="text-[14px] font-medium tracking-[-0.7px] text-white">{t('symptom.bestMatch')}</span>
                </div>
              </div>
              <div className="flex h-[35px] items-center rounded-[20px] bg-white px-[15px]">
                <span className="text-[14px] font-medium tracking-[-0.7px] text-[#111827]">{main.mainConfidence}%</span>
              </div>
            </div>
            <p className="text-left text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#111827]">{main.translatedReason || main.reason}</p>
          </div>
        </div>

        {main.alternatives.length > 0 ? (
          <div className="flex w-full flex-col items-start gap-[12px]">
            <p className="text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.alternativeDepartments')}</p>
            <div className="flex w-full flex-col gap-[12px]">
              {main.alternatives.map((alternative) => (
                <div key={alternative.departmentName} className="flex w-full flex-col items-start gap-[12px] rounded-[10px] border border-[#d1d5db] bg-white px-[24px] py-[24px]">
                  <div className="flex w-full items-start justify-between">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-left text-[18px] font-bold leading-[1.3] tracking-[-0.9px] text-[#111827]">
                        {currentLanguage === 'ko'
                          ? alternative.departmentName
                          : alternative.translatedDepartmentName || getDepartmentDisplayLabel(alternative.departmentName, currentLanguage)}
                      </p>
                      {currentLanguage !== 'ko' && alternative.departmentName ? <p className="text-[13px] font-medium tracking-[-0.7px] text-[#6b7280]">{alternative.departmentName}</p> : null}
                    </div>
                    <div className="flex h-[35px] items-center rounded-[20px] bg-[#f3f4f6] px-[15px]">
                      <span className="text-[14px] font-medium tracking-[-0.7px] text-[#111827]">{alternative.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="relative mt-[10px]">
          <div className={`absolute left-1/2 -top-[45px] z-10 flex min-w-[210px] -translate-x-1/2 items-center justify-center rounded-[8px] bg-[#111827] px-[16px] py-[10px] shadow-lg transition-opacity duration-1000 ${showTooltip ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <span className="text-[14px] font-medium tracking-[-0.7px] text-white">{t('symptom.warningTooltip')}</span>
            <div className="absolute -bottom-[4px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rotate-45 bg-[#111827]" />
          </div>

          <label ref={warningRef} className="flex w-full cursor-pointer items-center gap-[16px] rounded-[10px] bg-[#fff6db] px-[20px] py-[24px] text-left" onClick={() => setAgreed((value) => !value)}>
            <div className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${agreed ? 'border-[#296dff] bg-[#296dff]' : 'border-[#d1d5db] bg-white'}`}>
              {agreed ? (
                <svg viewBox="0 0 16 16" fill="none" className="h-[14px] w-[14px]">
                  <path d="M3 8l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">{t('symptom.warningTitle')}</p>
              <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">{t('symptom.warningBody')}</p>
              <span className="text-[14px] font-bold tracking-[-0.8px] text-[#6b7280]">{t('symptom.warningAgree')}</span>
            </div>
          </label>
        </div>
      </div>
    </MobileContainer>
  );
}
