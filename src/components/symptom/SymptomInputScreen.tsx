import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgX = 'https://www.figma.com/api/mcp/asset/c78de93a-e480-4b0c-afd6-ac6c4fa4464b';

type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'th' | 'uz';

interface SymptomOption {
  id: string;
  value: string;
  label: Record<SupportedLanguage, string>;
}

interface SymptomCategory {
  emoji: string;
  label: string;
  symptoms: SymptomOption[];
}

export default function SymptomInputScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [quickOpen, setQuickOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const currentLanguage = useMemo<SupportedLanguage>(() => {
    const language = i18n.resolvedLanguage?.split('-')[0];
    if (language === 'en' || language === 'ja' || language === 'zh' || language === 'vi' || language === 'th' || language === 'uz') {
      return language;
    }
    return 'ko';
  }, [i18n.resolvedLanguage]);

  const categories = useMemo<SymptomCategory[]>(
    () => [
      {
        emoji: '🤧',
        label: t('symptom.category.cold'),
        symptoms: [
          { id: 'cough', value: '기침', label: { ko: '기침', en: 'Cough', ja: 'せき', zh: '咳嗽', vi: 'Ho', th: 'ไอ', uz: 'Yo‘tal' } },
          { id: 'stuffy_nose', value: '코막힘', label: { ko: '코막힘', en: 'Stuffy nose', ja: '鼻づまり', zh: '鼻塞', vi: 'Nghẹt mũi', th: 'คัดจมูก', uz: 'Burun bitishi' } },
          { id: 'sore_throat', value: '목 통증', label: { ko: '목 통증', en: 'Sore throat', ja: 'のどの痛み', zh: '喉咙痛', vi: 'Đau họng', th: 'เจ็บคอ', uz: 'Tomoq og‘rig‘i' } },
          { id: 'shortness_breath', value: '호흡곤란', label: { ko: '호흡곤란', en: 'Shortness of breath', ja: '息苦しさ', zh: '呼吸困难', vi: 'Khó thở', th: 'หายใจลำบาก', uz: 'Nafas qisishi' } },
        ],
      },
      {
        emoji: '🤕',
        label: t('symptom.category.pain'),
        symptoms: [
          { id: 'headache', value: '두통', label: { ko: '두통', en: 'Headache', ja: '頭痛', zh: '头痛', vi: 'Đau đầu', th: 'ปวดหัว', uz: 'Bosh og‘rig‘i' } },
          { id: 'muscle_pain', value: '근육통', label: { ko: '근육통', en: 'Muscle pain', ja: '筋肉痛', zh: '肌肉痛', vi: 'Đau cơ', th: 'ปวดกล้ามเนื้อ', uz: 'Mushak og‘rig‘i' } },
          { id: 'joint_pain', value: '관절통', label: { ko: '관절통', en: 'Joint pain', ja: '関節痛', zh: '关节痛', vi: 'Đau khớp', th: 'ปวดข้อ', uz: 'Bo‘g‘im og‘rig‘i' } },
          { id: 'back_pain', value: '허리통증', label: { ko: '허리통증', en: 'Back pain', ja: '腰痛', zh: '腰痛', vi: 'Đau lưng', th: 'ปวดหลัง', uz: 'Bel og‘rig‘i' } },
        ],
      },
      {
        emoji: '🤒',
        label: t('symptom.category.fever'),
        symptoms: [
          { id: 'fever', value: '발열', label: { ko: '발열', en: 'Fever', ja: '発熱', zh: '发热', vi: 'Sốt', th: 'มีไข้', uz: 'Isitma' } },
          { id: 'chills', value: '오한', label: { ko: '오한', en: 'Chills', ja: '悪寒', zh: '发冷', vi: 'Ớn lạnh', th: 'หนาวสั่น', uz: 'Qaltirash' } },
          { id: 'body_ache', value: '몸살', label: { ko: '몸살', en: 'Body aches', ja: '体のだるさ', zh: '全身酸痛', vi: 'Đau nhức người', th: 'ปวดเมื่อยตัว', uz: 'Badan og‘rig‘i' } },
          { id: 'fatigue', value: '피로감', label: { ko: '피로감', en: 'Fatigue', ja: '疲労感', zh: '疲劳', vi: 'Mệt mỏi', th: 'อ่อนเพลีย', uz: 'Charchoq' } },
        ],
      },
      {
        emoji: '🩹',
        label: t('symptom.category.skin'),
        symptoms: [
          { id: 'rash', value: '발진', label: { ko: '발진', en: 'Rash', ja: '発疹', zh: '皮疹', vi: 'Phát ban', th: 'ผื่น', uz: 'Toshma' } },
          { id: 'itching', value: '가려움', label: { ko: '가려움', en: 'Itching', ja: 'かゆみ', zh: '瘙痒', vi: 'Ngứa', th: 'คัน', uz: 'Qichishish' } },
          { id: 'redness', value: '붉어짐', label: { ko: '붉어짐', en: 'Redness', ja: '赤み', zh: '发红', vi: 'Đỏ da', th: 'รอยแดง', uz: 'Qizarish' } },
          { id: 'wound', value: '상처', label: { ko: '상처', en: 'Wound', ja: '傷', zh: '伤口', vi: 'Vết thương', th: 'บาดแผล', uz: 'Jarohat' } },
        ],
      },
      {
        emoji: '🤢',
        label: t('symptom.category.digestion'),
        symptoms: [
          { id: 'stomachache', value: '복통', label: { ko: '복통', en: 'Stomachache', ja: '腹痛', zh: '腹痛', vi: 'Đau bụng', th: 'ปวดท้อง', uz: 'Qorin og‘rig‘i' } },
          { id: 'diarrhea', value: '설사', label: { ko: '설사', en: 'Diarrhea', ja: '下痢', zh: '腹泻', vi: 'Tiêu chảy', th: 'ท้องเสีย', uz: 'Ich ketishi' } },
          { id: 'indigestion', value: '소화불량', label: { ko: '소화불량', en: 'Indigestion', ja: '消化不良', zh: '消化不良', vi: 'Khó tiêu', th: 'อาหารไม่ย่อย', uz: 'Hazm buzilishi' } },
          { id: 'vomiting', value: '구토', label: { ko: '구토', en: 'Vomiting', ja: '嘔吐', zh: '呕吐', vi: 'Nôn', th: 'อาเจียน', uz: 'Qusish' } },
        ],
      },
      {
        emoji: '👂',
        label: t('symptom.category.ent'),
        symptoms: [
          { id: 'ear_pain', value: '귀 통증', label: { ko: '귀 통증', en: 'Ear pain', ja: '耳の痛み', zh: '耳痛', vi: 'Đau tai', th: 'ปวดหู', uz: 'Quloq og‘rig‘i' } },
          { id: 'nosebleed', value: '코피', label: { ko: '코피', en: 'Nosebleed', ja: '鼻血', zh: '流鼻血', vi: 'Chảy máu mũi', th: 'เลือดกำเดา', uz: 'Burun qonashi' } },
          { id: 'ringing_ears', value: '이명', label: { ko: '이명', en: 'Ringing in ears', ja: '耳鳴り', zh: '耳鸣', vi: 'Ù tai', th: 'หูอื้อ', uz: 'Quloq shang‘illashi' } },
        ],
      },
      {
        emoji: '❤️',
        label: t('symptom.category.chest'),
        symptoms: [
          { id: 'chest_pain', value: '가슴 통증', label: { ko: '가슴 통증', en: 'Chest pain', ja: '胸の痛み', zh: '胸痛', vi: 'Đau ngực', th: 'เจ็บหน้าอก', uz: 'Ko‘krak og‘rig‘i' } },
          { id: 'palpitations', value: '심장 두근거림', label: { ko: '심장 두근거림', en: 'Palpitations', ja: '動悸', zh: '心悸', vi: 'Tim đập nhanh', th: 'ใจสั่น', uz: 'Yurak urishining tezlashishi' } },
          { id: 'breathing_problem', value: '숨참', label: { ko: '숨참', en: 'Breathing trouble', ja: '息切れ', zh: '气短', vi: 'Khó thở', th: 'หายใจติดขัด', uz: 'Nafas yetishmasligi' } },
        ],
      },
    ],
    [t],
  );

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
          <p className="text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827] break-keep">{t('symptom.heading')}</p>
          <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{t('symptom.description')}</p>
        </div>

        <div className="h-[20px] bg-[#f9f9fb]" />

        <div className="flex w-full flex-col items-start px-[32px] pb-[20px] pt-[20px] text-left">
          <p className="mb-[12px] text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('symptom.selected')}</p>
          {selected.length > 0 ? (
            <div className="flex w-full flex-wrap gap-[10px]">
              {selected.map((symptom) => (
                <div key={symptom} className="flex min-h-[35px] max-w-full items-center gap-[6px] rounded-[20px] bg-[#296dff] px-[15px] py-[8px]">
                  <span className="break-words text-[14px] font-medium leading-[1.3] tracking-[-0.7px] text-white">{symptom}</span>
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
              {categories.map((category, index) => (
                <div key={category.label}>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <span className="break-keep text-[14px] font-medium leading-[1.4] tracking-[-0.7px] text-black">
                      {category.emoji} {category.label}
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
                  {index < categories.length - 1 ? <div className="mt-[16px] h-px bg-[#d1d5db]" /> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="h-[20px] bg-[#f9f9fb]" />

        <div className="flex w-full flex-col items-start gap-[12px] px-[32px] pb-[20px] pt-[20px] text-left">
          <p className="text-[20px] font-bold leading-[1.3] tracking-[-1px] text-[#111827] break-keep">{t('symptom.customInputTitle')}</p>
          <p className="mb-[4px] text-[15px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{t('symptom.customInputDescription')}</p>
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
