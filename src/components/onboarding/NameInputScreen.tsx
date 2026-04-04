import { useState } from 'react';

interface Props {
  onComplete: (name: string) => Promise<void>;
}

export default function NameInputScreen({ onComplete }: Props) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length > 0 && !submitting;

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

        {/* 타이틀 영역 */}
        <div className="px-[23px] pt-[160px]">
          <h1 className="text-[28px] font-medium tracking-[-1.4px] text-[#111]">
            이름을 알려주세요.
          </h1>
          <p className="mt-[12px] text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
            서비스에서 사용할 이름이에요. 언제든지 변경할 수 있어요.
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="mt-[32px] border-t border-b border-[#ecedf0] bg-[#fcfdfd] px-[20px] py-[20px]">
          <label className="block text-[16px] font-medium tracking-[-0.8px] text-[#111]">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void handleSubmit(); }}
            placeholder="이름"
            maxLength={20}
            className="mt-[8px] h-[50px] w-full rounded-[8px] border border-[#d1d5db] bg-white px-[16px] text-[16px] font-medium tracking-[-0.8px] text-[#111] placeholder-[#d1d5db] outline-none focus:border-[#296dff]"
          />
        </div>

        {/* 시작하기 버튼 */}
        <div className="mt-auto px-[32px] pb-[40px]">
          <button
            type="button"
            onClick={() => { void handleSubmit(); }}
            disabled={!canSubmit}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              canSubmit
                ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)] cursor-pointer'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            {submitting ? '처리 중...' : '시작하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
