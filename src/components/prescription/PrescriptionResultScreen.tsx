import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPrescriptionResult, sendPrescriptionChat, type PrescriptionResult } from '../../api/prescriptionApi';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import PrimaryButton from '../common/PrimaryButton';
import StatusMessage from '../common/StatusMessage';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconCheck = 'https://www.figma.com/api/mcp/asset/96d5cc6b-ab87-470f-bfa5-45edc20455ba';
const imgFallback = 'https://www.figma.com/api/mcp/asset/67e6e70b-a941-4a19-ab36-a6b7ae136573';
const imgIconPen = 'https://www.figma.com/api/mcp/asset/b7f878f5-9f43-4a04-a155-0e52f2144210';
const imgIconTime = 'https://www.figma.com/api/mcp/asset/7ec0c1ae-82d5-4f6b-b85f-6a7841b6e155';
const imgIconDrug = 'https://www.figma.com/api/mcp/asset/871d5b6e-2a01-4ff9-996a-2b40e50f65f7';

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}


function safeText(value: string | null | undefined, fallback: string): string {
  if (!value || value === 'null' || value.trim() === '') return fallback;
  return value;
}

export default function PrescriptionResultScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const prescriptionId = usePrescriptionFlowStore((state) => state.prescriptionId);
  const localPreviewUrl = usePrescriptionFlowStore((state) => state.previewUrl);
  const storedResult = usePrescriptionFlowStore((state) => state.result);
  const setResultStore = usePrescriptionFlowStore((state) => state.setResult);
  const resetFlow = usePrescriptionFlowStore((state) => state.resetFlow);
  const [result, setResult] = useState<PrescriptionResult | null>(storedResult);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prescriptionId) {
      navigate('/prescriptions/translate', { replace: true });
      return;
    }

    if (storedResult && storedResult.prescriptionId === prescriptionId) {
      setResult(storedResult);
      setLoading(false);
      return;
    }

    fetchPrescriptionResult(prescriptionId)
      .then((nextResult) => {
        setResult(nextResult);
        setResultStore(nextResult);
      })
      .finally(() => setLoading(false));
  }, [navigate, prescriptionId, setResultStore, storedResult]);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isSending || !prescriptionId) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputText('');
    setIsSending(true);

    try {
      const answer = await sendPrescriptionChat(prescriptionId, text);
      setMessages((prev) => [...prev, { role: 'ai', text: answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: '죄송합니다. 오류가 발생했습니다.' }]);
    } finally {
      setIsSending(false);
    }
  };

  let displayImage = result?.imageUrl ?? localPreviewUrl ?? imgFallback;
  if (displayImage.startsWith('/uploads')) {
    displayImage = `http://localhost:8080${displayImage}`;
  }

  const prescriptionDate = result?.createdAt ? formatDate(result.createdAt) : '-';
  const noInfoText = t('common.noInfo');

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          title={t('prescription.resultTitle')}
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">
                {t('common.step', { current: 2, total: 2 })}
              </span>
            </div>
          }
        />
      }
    >
      <div className="px-[32px] pb-[8px] pt-[24px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-[28px] font-medium leading-[1.3] tracking-[-1.4px] text-[#111827]">
            {t('prescription.resultHeading')}
          </p>
          <img src={imgIconPen} alt="" className="h-[20px] w-[20px] shrink-0" />
        </div>
        <p className="mt-[8px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
          {t('prescription.resultDescription')}
        </p>
      </div>

      <div className="mx-[32px] mb-[20px] h-[220px] overflow-hidden rounded-[10px] bg-[#f9f9fb] shadow-inner">
        <img src={displayImage} alt={t('prescription.previewAlt')} className="h-full w-full object-contain py-[8px]" />
      </div>

      <div className="mx-[32px] mb-[20px] rounded-[10px] bg-[#eaf0ff] px-[28px] py-[22px]">
        <div className="mb-[16px] flex items-center gap-[10px]">
          <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
          <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{t('prescription.summary')}</p>
        </div>
        <div className="flex w-full gap-[40px]">
          <div className="flex flex-col items-start gap-[6px] text-left">
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
              {t('prescription.totalDrugCount')}
            </p>
            <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
              {loading ? '...' : t('prescription.medicineCount', { count: result?.drugs.length ?? 0 })}
            </p>
          </div>
          <div className="flex flex-col items-start gap-[6px] text-left">
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">
              {t('prescription.prescribedDate')}
            </p>
            <p className="text-[18px] font-bold tracking-[-0.9px] text-[#111827]">
              {loading ? '...' : prescriptionDate}
            </p>
          </div>
        </div>
      </div>

      <p className="px-[32px] pb-[16px] text-left text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
        {t('prescription.drugList')}
      </p>

      <div className="flex flex-col gap-[16px] px-[32px]">
        {loading ? (
          <StatusMessage message={t('common.loading')} className="py-[20px]" />
        ) : (
          result?.drugs.map((drug, index) => {
            const freqStr = drug.frequency || '';
            const dosStr = drug.dosage || '';
            const durStr = drug.duration || '';

            return (
              <div key={index} className="overflow-hidden rounded-[10px] border border-[#d1d5db]">
                <div className="flex items-center gap-[14px] px-[20px] pb-[14px] pt-[20px]">
                  <img src={imgIconDrug} alt="" className="h-[50px] w-[50px] shrink-0" />
                  <div className="flex flex-1 flex-col items-start gap-[4px] text-left">
                    <p className="text-[20px] font-bold leading-[1.3] tracking-[-1px] text-[#111827]">
                      {drug.drugName}
                    </p>
                    {drug.originalName ? (
                      <p className="text-[12px] font-medium leading-[2] tracking-[-0.6px] text-[#888]">
                        {drug.originalName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <InfoCard title={t('prescription.dosage')} icon={imgIconTime} bgClass="bg-[#f0fdf8]">
                  <span>{t('prescription.dosage')}: {dosStr}</span>
                  <span>{t('prescription.frequency')}: {freqStr}</span>
                  <span>{t('prescription.duration')}: {durStr}</span>
                </InfoCard>

                <TextCard
                  title={t('prescription.description')}
                  colorClass="text-[#272727]"
                  bgClass="bg-[#eef8ff]"
                  value={safeText(drug.translatedContent, noInfoText)}
                />
                <TextCard
                  title={t('prescription.sideEffects')}
                  colorClass="text-[#e05c5c]"
                  bgClass="bg-[#fff4f4]"
                  value={safeText(drug.sideEffects, noInfoText)}
                />
                <TextCard
                  title={t('prescription.precautions')}
                  colorClass="text-[#d97706]"
                  bgClass="bg-[#fffbea]"
                  value={safeText(drug.precautions, noInfoText)}
                />
                <TextCard
                  title={t('prescription.foodInteraction')}
                  colorClass="text-[#16a34a]"
                  bgClass="bg-[#f0fdf4]"
                  value={safeText(drug.foodInteraction, noInfoText)}
                />
                <TextCard
                  title={t('prescription.handwrittenNote')}
                  colorClass="text-[#7c3aed]"
                  bgClass="bg-[#f5f3ff]"
                  value={safeText(drug.handwrittenNote, noInfoText)}
                />

                <div className="flex px-[20px] pb-[20px] pt-[4px]">
                  <span className="inline-flex items-center rounded-[20px] bg-[#eaf2fe] px-[12px] py-[2px] text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#3f66c5]">
                    {durStr}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 챗봇 대화하기 버튼 */}
      <div className="relative mx-[32px] mt-[28px] mb-[10px] flex justify-center py-[20px]">
        <div className="absolute left-[-32px] right-[-32px] top-1/2 h-[1px] -translate-y-1/2 bg-[#d1d5db]"></div>
        <button
          type="button"
          onClick={() => { setMessages([{ role: 'ai', text: t('prescription.chatGreeting') }]); setChatOpen(true); }}
          className="relative z-10 flex h-[44px] items-center justify-center gap-[8px] rounded-full bg-[#6b7280] px-[24px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
          </svg>
          <span className="text-[16px] font-bold tracking-[-0.36px] text-white">{t('prescription.chatbot')}</span>
        </button>
      </div>

      <div className="mx-[32px] mb-[32px] mt-[16px] flex gap-[10px]">
        <PrimaryButton
          variant="secondary"
          className="flex-1"
          onClick={() => {
            resetFlow();
            navigate('/prescriptions/translate');
          }}
        >
          {t('prescription.retake')}
        </PrimaryButton>
        <PrimaryButton
          className="flex-1"
          onClick={() => {
            resetFlow();
            navigate('/prescriptions');
          }}
        >
          {t('common.confirm')}
        </PrimaryButton>
      </div>

      {/* 챗봇 팝업 */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-[#111827]"
            style={{ opacity: 0.8 }}
            onClick={() => setChatOpen(false)}
          />

          {/* 팝업 카드 */}
          <div className="relative z-10 flex h-[510px] w-[316px] flex-col overflow-hidden rounded-[10px] bg-white shadow-xl">
            {/* 헤더 */}
            <div className="flex h-[50px] shrink-0 items-center border-b border-[#d1d5db] px-[20px]">
              <div className="flex flex-col items-start">
                <span className="text-[14px] font-medium tracking-[-0.7px] text-[#374151]">Chat Talk</span>
                <div className="mt-[6px] h-[3px] w-[73px] rounded-[10px] bg-[#374151]" />
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="ml-auto flex h-[24px] w-[24px] items-center justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M9 1L1 9M1 1L9 9" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[16px]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-[8px] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'ai' && (
                    <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(41,109,255,0.15)] border border-[#eaf0ff]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12A8 8 0 1 1 12 4" stroke="#296dff" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx="10" cy="11" r="1.8" fill="#296dff" />
                        <circle cx="15.5" cy="11" r="1.8" fill="#296dff" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[200px] rounded-[10px] px-[12px] py-[8px] text-[12px] font-medium leading-[1.6] tracking-[-0.6px] ${
                      msg.role === 'ai'
                        ? 'bg-[#f3f4f6] text-[#111827]'
                        : 'border border-[#d1d5db] bg-white text-[#6b7280]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex items-start gap-[8px]">
                  <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(41,109,255,0.15)] border border-[#eaf0ff]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12A8 8 0 1 1 12 4" stroke="#296dff" strokeWidth="3.5" strokeLinecap="round" />
                      <circle cx="10" cy="11" r="1.8" fill="#296dff" />
                      <circle cx="15.5" cy="11" r="1.8" fill="#296dff" />
                    </svg>
                  </div>
                  <div className="rounded-[10px] bg-[#f3f4f6] px-[12px] py-[8px] text-[12px] text-[#6b7280]">...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div className="shrink-0 border-t border-[#d1d5db] px-[16px] pb-[16px] pt-[12px]">
              <div className="flex items-end gap-[8px] rounded-[10px] border border-[#d1d5db] px-[12px] py-[10px]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void handleSendMessage();
                    }
                  }}
                  placeholder={t('prescription.chatPlaceholder')}
                  rows={2}
                  className="flex-1 resize-none bg-transparent text-[12px] font-medium tracking-[-0.6px] text-[#111827] outline-none placeholder:text-[#6b7280]"
                />
                <button
                  type="button"
                  onClick={() => void handleSendMessage()}
                  disabled={!inputText.trim() || isSending}
                  className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full transition-colors ${
                    inputText.trim() && !isSending ? 'bg-[#296dff]' : 'bg-[#d1d5db]'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileContainer>
  );
}

function InfoCard({
  title,
  icon,
  bgClass,
  children,
}: {
  title: string;
  icon: string;
  bgClass: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] px-[16px] py-[12px] text-left ${bgClass}`}>
      <div className="mb-[4px] flex items-center gap-[8px]">
        <img src={icon} alt="" className="h-[20px] w-[20px] shrink-0" />
        <p className="text-[16px] font-medium tracking-[-0.8px] text-[#272727]">{title}</p>
      </div>
      <div className="flex flex-col gap-[4px] pl-[28px] text-left text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6d7281]">
        {children}
      </div>
    </div>
  );
}

function TextCard({
  title,
  colorClass,
  bgClass,
  value,
}: {
  title: string;
  colorClass: string;
  bgClass: string;
  value: string;
}) {
  return (
    <div className={`mx-[20px] mb-[8px] flex flex-col items-start rounded-[8px] px-[16px] py-[12px] text-left ${bgClass}`}>
      <div className="mb-[4px] flex items-center gap-[6px]">
        <p className={`text-[14px] font-semibold tracking-[-0.7px] ${colorClass}`}>{title}</p>
      </div>
      <p className="pl-[4px] text-[13px] font-medium leading-[1.6] tracking-[-0.6px] text-[#6d7281]">
        {value}
      </p>
    </div>
  );
}
