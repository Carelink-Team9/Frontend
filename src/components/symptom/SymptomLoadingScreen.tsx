import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { recommendDepartment } from '../../api/symptomApi';

const imgCharacter = 'https://www.figma.com/api/mcp/asset/f701f52a-f1e2-438b-99aa-d7e224d711bb';

export default function SymptomLoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const state = location.state as { symptoms?: string[]; customDescription?: string } | null;
  const symptoms: string[] = state?.symptoms ?? [];
  const customDescription = state?.customDescription;
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    recommendDepartment(symptoms, customDescription)
      .then((result) => {
        navigate('/symptom-result', { state: { symptoms, customDescription, result }, replace: true });
      })
      .catch(() => {
        navigate('/symptom-result', { state: { symptoms, customDescription, result: null }, replace: true });
      });
  }, [navigate, symptoms, customDescription]);

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
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
        <img src={imgCharacter} alt="" className="h-[30px] w-[30px] animate-spin" />
        <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.analyzing')}</p>
      </div>
    </MobileContainer>
  );
}
