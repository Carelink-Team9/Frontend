import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
const imgOptionSelect = 'https://www.figma.com/api/mcp/asset/1af20a4a-e07e-466c-b6ea-a9502e91982f';
const imgIcon = 'https://www.figma.com/api/mcp/asset/c85970f5-a32d-4050-b504-0a9ea83851eb';
const imgX = 'https://www.figma.com/api/mcp/asset/c78de93a-e480-4b0c-afd6-ac6c4fa4464b';

const CATEGORIES = [
  { emoji: '🫁', label: '호흡 & 감기', symptoms: ['기침', '콧물', '목 통증', '숨참'] },
  { emoji: '🤕', label: '통증', symptoms: ['두통', '근육통', '관절통', '신경통'] },
  { emoji: '🤒', label: '발열 & 몸살', symptoms: ['발열', '오한', '몸살', '피로'] },
  { emoji: '🧴', label: '피부 문제', symptoms: ['발진', '진물', '가려움', '따가움'] },
  { emoji: '🫃', label: '복부 & 소화', symptoms: ['복통', '설사', '소화불량', '구토'] },
  { emoji: '😐', label: '부위별', symptoms: ['눈 통증 & 충혈', '귀 통증', '코 막힘'] },
  { emoji: '🫀', label: '가슴 & 심장', symptoms: ['가슴 통증', '두근거림', '호흡 곤란'] },
];

const ALL_SYMPTOMS = CATEGORIES.flatMap((c) => c.symptoms);

export default function SymptomInputScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [quickOpen, setQuickOpen] = useState(false);
  const [search, setSearch] = useState('');

  const toggle = (symptom: string) => {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom],
    );
  };

  const searchResults = search.trim()
    ? ALL_SYMPTOMS.filter((s) => s.includes(search.trim()))
    : [];

  const handleNext = () => {
    if (selected.length === 0) return;
    navigate('/symptom-loading', { state: { symptoms: selected } });
  };

  return (
    <MobileContainer
      hasBottomNav={false}
      header={
        <AppHeader 
          title="증상 입력"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">STEP 1 / 3</span>
            </div>
          }
        />
      }
      bottomFixedElement={
        <div className="shrink-0 bg-white px-[31px] py-[20px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`h-[60px] w-full rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
              selected.length > 0
                ? 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]'
                : 'bg-[#f9f9fb] text-[#d1d5db] cursor-not-allowed'
            }`}
          >
            진료과 추천 받기
          </button>
        </div>
      }
    >

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto">

          {/* Greeting */}
          <div className="flex flex-col items-start text-left px-[32px] pt-[30px] pb-[24px] gap-[12px]">
            <p className="text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827] break-keep">어떤 증상이 있으신가요?</p>
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">증상을 입력하거나 아래에서 선택해보세요.</p>
          </div>

          {/* Gray divider */}
          <div className="h-[20px] bg-[#f9f9fb]" />

          {/* 선택한 증상 */}
          <div className="flex flex-col items-start text-left px-[32px] pt-[20px] pb-[20px] w-full">
            <p className="mb-[12px] text-[18px] font-medium tracking-[-0.9px] text-[#111827]">선택한 증상</p>
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-[10px] w-full justify-start">
                {selected.map((s) => (
                  <div
                    key={s}
                    className="flex h-[35px] items-center gap-[6px] rounded-[20px] bg-[#296dff] px-[15px]"
                  >
                    <span className="text-[14px] font-medium tracking-[-0.7px] text-white">{s}</span>
                    <button type="button" onClick={() => toggle(s)} className="flex items-center">
                      <img src={imgX} alt="제거" className="h-[10px] w-[10px]" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px] font-medium leading-[1.5] text-[#d1d5db]">아직 선택된 증상이 없어요.</p>
            )}
          </div>

          {/* Gray divider */}
          <div className="h-[20px] bg-[#f9f9fb]" />

          {/* 빠른 증상 선택 */}
          <div className="px-[32px] pt-[20px]">
            <button
              type="button"
              onClick={() => setQuickOpen((v) => !v)}
              className="flex w-full items-center justify-between pb-[20px]"
            >
              <span className="text-[18px] font-medium tracking-[-0.9px] text-black">빠른 증상 선택</span>
              <div className={`transition-transform duration-200 ${quickOpen ? '' : 'rotate-180'}`}>
                <img src={imgOptionSelect} alt="" className="h-[22px] w-[22px]" />
              </div>
            </button>

            {quickOpen && (
              <div className="flex flex-col gap-[16px] pb-[20px]">
                {CATEGORIES.map((cat, idx) => (
                  <div key={cat.label}>
                    <div className="flex flex-wrap items-center gap-[8px]">
                      <span className="text-[14px] font-medium tracking-[-0.7px] text-black">
                        {cat.emoji}  {cat.label}
                      </span>
                      {cat.symptoms.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggle(s)}
                          className={`flex h-[35px] items-center rounded-[17.5px] border px-[10px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
                            selected.includes(s)
                              ? 'border-[#296dff] bg-[#296dff] text-white'
                              : 'border-[#111827] bg-white text-black'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {idx < CATEGORIES.length - 1 && (
                      <div className="mt-[16px] h-px bg-[#d1d5db]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gray divider */}
          <div className="h-[20px] bg-[#f9f9fb]" />

          {/* 증상 검색하기 */}
          <div className="flex flex-col items-start text-left px-[32px] pt-[20px] pb-[20px] w-full gap-[12px]">
            <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.9px] text-[#111827] break-keep">증상 검색하기</p>
            <p className="mb-[4px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">증상을 검색하시거나 직접 추가해보세요.</p>
            <div className="relative flex h-[52px] w-full items-center rounded-[8px] bg-[#f3f4f6] shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,0.02)]">
              <img src={imgIcon} alt="" className="ml-[20px] h-[20px] w-[20px] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="증상 검색"
                className="ml-[12px] flex-1 w-full bg-transparent text-[16px] font-medium tracking-[-0.8px] text-[#111827] outline-none placeholder:text-[#d1d5db]"
              />
            </div>

            {/* 검색 결과 */}
            {search.trim() && (
              <div className="mt-[12px] flex flex-wrap gap-[8px]">
                {searchResults.length > 0 ? (
                  searchResults.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { toggle(s); setSearch(''); }}
                      className={`flex h-[35px] items-center rounded-[17.5px] border px-[10px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
                        selected.includes(s)
                          ? 'border-[#296dff] bg-[#296dff] text-white'
                          : 'border-[#111827] bg-white text-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const label = search.trim();
                      if (!selected.includes(label)) setSelected((p) => [...p, label]);
                      setSearch('');
                    }}
                    className="flex h-[35px] items-center rounded-[17.5px] border border-[#296dff] bg-white px-[10px] text-[14px] font-medium tracking-[-0.7px] text-[#296dff]"
                  >
                    + "{search.trim()}" 직접 추가
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

      </div>
    </MobileContainer>
  );
}
