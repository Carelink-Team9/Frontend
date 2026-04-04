import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onComplete: (name: string) => Promise<void>;
}

export default function NameInputScreen({ onComplete }: Props) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length > 0 && !submitting;

  const copy = {
    title: {
      ko: '이름을 알려주세요.',
      en: 'Tell us your name.',
      ja: 'お名前を教えてください。',
      zh: '请告诉我们您的名字。',
      vi: 'Hãy cho chúng tôi biết tên của bạn.',
      th: 'กรุณาบอกชื่อของคุณ',
      uz: 'Ismingizni ayting.',
    },
    description: {
      ko: '서비스에서 사용할 이름이에요. 언제든지 변경할 수 있어요.',
      en: 'This is the name used in the service. You can change it anytime.',
      ja: 'サービスで使う名前です。いつでも変更できます。',
      zh: '这是您在服务中使用的名字，之后可以随时修改。',
      vi: 'Đây là tên sẽ được dùng trong dịch vụ. Bạn có thể đổi bất cứ lúc nào.',
      th: 'ชื่อนี้จะใช้ในบริการ และสามารถเปลี่ยนได้ตลอดเวลา',
      uz: 'Bu xizmatda ishlatiladigan ism. Uni istalgan payt o‘zgartirishingiz mumkin.',
    },
    label: {
      ko: '이름',
      en: 'Name',
      ja: '名前',
      zh: '姓名',
      vi: 'Tên',
      th: 'ชื่อ',
      uz: 'Ism',
    },
    placeholder: {
      ko: '이름',
      en: 'Name',
      ja: '名前',
      zh: '姓名',
      vi: 'Tên',
      th: 'ชื่อ',
      uz: 'Ism',
    },
    submit: {
      ko: '시작하기',
      en: 'Start',
      ja: 'はじめる',
      zh: '开始',
      vi: 'Bắt đầu',
      th: 'เริ่มต้น',
      uz: 'Boshlash',
    },
  } as const;

  const currentLanguage = i18n.resolvedLanguage?.split('-')[0] ?? 'ko';
  const lang = (['ko', 'en', 'ja', 'zh', 'vi', 'th', 'uz'].includes(currentLanguage) ? currentLanguage : 'ko') as keyof typeof copy.title;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onComplete(name.trim());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full justify-center bg-[#f3f4f6]">
      <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">
        <div className="px-[23px] pt-[160px] text-center">
          <h1 className="break-keep text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111]">{copy.title[lang]}</h1>
          <p className="mt-[12px] break-keep text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">{copy.description[lang]}</p>
        </div>

        <div className="mt-[32px] border-b border-t border-[#ecedf0] bg-[#fcfdfd] px-[20px] py-[20px]">
          <label className="block text-[16px] font-medium tracking-[-0.8px] text-[#111]">{copy.label[lang]}</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void handleSubmit();
            }}
            placeholder={copy.placeholder[lang]}
            maxLength={20}
            className="mt-[8px] h-[50px] w-full rounded-[8px] border border-[#d1d5db] bg-white px-[16px] text-[16px] font-medium tracking-[-0.8px] text-[#111] placeholder-[#d1d5db] outline-none focus:border-[#296dff]"
          />
        </div>

        <div className="mt-auto px-[32px] pb-[40px]">
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              canSubmit ? 'cursor-pointer bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]' : 'cursor-not-allowed bg-[#f9f9fb] text-[#d1d5db]'
            }`}
          >
            {submitting ? t('common.processing') : copy.submit[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
