import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

// Figma asset URLs (valid 7 days)
const imgIdCard = 'https://www.figma.com/api/mcp/asset/78154ee8-386b-4215-972c-8b7c9f9375fd';
const imgPayment = 'https://www.figma.com/api/mcp/asset/9b8107e5-7f47-40b8-901f-de740ddb99fd';
const imgInsurance = 'https://www.figma.com/api/mcp/asset/909f2845-d3bb-4d7c-8653-1c76d84e623a';
const imgMedicine = 'https://www.figma.com/api/mcp/asset/a9354b2f-6218-4885-a669-cfe73edae97a';
const imgCheckin = 'https://www.figma.com/api/mcp/asset/e72674bf-0502-4d82-bcdf-29548248b32f';
const imgWait = 'https://www.figma.com/api/mcp/asset/9eed2eb1-657c-4df7-a68d-3466dc825674';
const imgConsult = 'https://www.figma.com/api/mcp/asset/c5aa3dee-2ba6-4fde-ab3c-9f068f3acce3';
const imgPaymentStep = 'https://www.figma.com/api/mcp/asset/1e4c280c-bac0-4e5c-a380-a23184e01635';
const imgPharmacy = 'https://www.figma.com/api/mcp/asset/1303dab3-fb51-4ffa-85ad-1d2b1d801934';
const imgEmergency = 'https://www.figma.com/api/mcp/asset/72a0b1b8-c226-4efe-a596-c746902b0036';
const imgAllergy = 'https://www.figma.com/api/mcp/asset/9b1fe4eb-923f-4c23-859f-efed9c70dc0b';
const imgDisease = 'https://www.figma.com/api/mcp/asset/342a6c7d-4425-485b-952c-6e9241962596';
const imgTip = 'https://www.figma.com/api/mcp/asset/e19ada77-49ef-4841-8899-788da92828a0';

export default function HospitalVisitGuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { symptoms?: string[]; doctorSummary?: string; mainDepartment?: string } | null;
  const symptoms: string[] = state?.symptoms ?? [];
  const doctorSummary: string = state?.doctorSummary ?? '';
  const mainDepartment: string = state?.mainDepartment ?? '';
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2, skipFonts: true });

      // Web Share API 지원 시 공유, 아니면 다운로드
      if (navigator.share && navigator.canShare) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'carelink-symptom.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: '내 증상 요약 카드 - CareLink' });
          return;
        }
      }

      // 폴백: 다운로드
      const link = document.createElement('a');
      link.download = 'carelink-symptom.png';
      link.href = dataUrl;
      link.click();
    } catch {
      // 저장 실패 시 무시
    } finally {
      setSaving(false);
      navigate('/');
    }
  };

  return (
    <MobileContainer header={<AppHeader title="병원 방문 전 안내" />}>
      <div className="flex flex-col gap-[32px] px-[24px] py-[24px] pb-[40px] text-left">

        {/* 0. 증상 요약 */}
        {(doctorSummary || symptoms.length > 0) && (
          <section>
            <h2 className="mb-[12px] text-[15px] font-bold text-black">0. 증상 요약</h2>

            {/* 캡처 대상 카드 */}
            <div
              ref={cardRef}
              className="overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-sm"
            >
              {/* 카드 헤더 */}
              <div className="bg-[#296dff] px-[20px] py-[20px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.5px] text-[rgba(255,255,255,0.8)]">CARELINK</p>
                    <p className="mt-[4px] text-[20px] font-bold tracking-[-0.5px] text-white">내 증상 요약 카드</p>
                  </div>
                  {mainDepartment && (
                    <div className="rounded-[20px] bg-[rgba(255,255,255,0.2)] px-[14px] py-[6px]">
                      <p className="text-[14px] font-bold text-white">{mainDepartment}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 카드 본문 */}
              <div className="bg-[#f8f9fb] px-[20px] py-[28px]">
                {doctorSummary ? (
                  <p className="text-[16px] leading-[1.7] tracking-[-0.3px] text-[#374151] font-medium break-keep">
                    {doctorSummary}
                  </p>
                ) : (
                  <div className="flex flex-col gap-[10px]">
                    {symptoms.map((s, i) => (
                      <p key={i} className="text-[16px] leading-[1.7] tracking-[-0.3px] text-[#374151] font-medium break-keep">
                        {s}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* 카드 푸터 */}
              <div className="border-t border-[#e5e7eb] bg-[#f8f9fb] px-[20px] pb-[20px] pt-[16px]">
                <p className="text-center text-[12px] font-medium tracking-[-0.2px] text-[#9ca3af]">
                  이 카드는 AI 증상 분석 결과이며 의료 진단을 대체하지 않습니다.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 1. 준비물 */}
        <section>
          <h2 className="mb-[16px] text-[15px] font-bold text-black">1. 준비물</h2>

          {/* 신분증 */}
          <div className="mb-[16px] rounded-[12px] border border-[#296dff] bg-white p-[16px]">
            <div className="mb-[12px] flex items-center gap-[8px]">
              <img src={imgIdCard} alt="" className="h-[20px] w-[20px]" />
              <span className="text-[16px] font-semibold text-[#0a0a0a]">신분증</span>
              <span className="rounded-full bg-[#ffe2e2] px-[8px] py-[2px] text-[10px] font-semibold text-[#c10007]">필수</span>
              <span className="text-[12px] text-[#6a7282]">ID Card</span>
            </div>
            <div className="flex gap-[12px]">
              <div className="flex flex-1 flex-col gap-[6px] rounded-[14px] border border-[#bedbff] bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] px-[14px] py-[14px]">
                <span className="text-[12px] font-semibold text-[#1447e6]">외국인등록증</span>
                <span className="text-[10px] text-[#155dfc]">ARC</span>
              </div>
              <div className="flex flex-1 flex-col gap-[6px] rounded-[14px] border border-[#ffc9c9] bg-gradient-to-br from-[#fef2f2] to-[#ffe2e2] px-[14px] py-[14px]">
                <span className="text-[12px] font-semibold text-[#c10007]">여권</span>
                <span className="text-[10px] text-[#e7000b]">Passport</span>
              </div>
            </div>
            <p className="mt-[12px] text-[10px] leading-[1.8] text-[#4a5565]">
              본인 확인을 위해 필요합니다. {'\n'}
              외국인등록증(ARC) 또는 여권 중 1개만 준비해주세요.
            </p>
          </div>

          {/* 결제 수단 */}
          <div className="mb-[16px] rounded-[12px] border border-[#296dff] bg-white p-[16px]">
            <div className="mb-[12px] flex items-center gap-[8px]">
              <img src={imgPayment} alt="" className="h-[20px] w-[20px]" />
              <span className="text-[16px] font-semibold text-[#0a0a0a]">결제 수단</span>
              <span className="rounded-full bg-[#ffe2e2] px-[8px] py-[2px] text-[10px] font-semibold text-[#c10007]">필수</span>
              <span className="text-[12px] text-[#6a7282]">Payment Method</span>
            </div>
            <div className="mb-[14px] flex items-center justify-start gap-[10px]">
              <div className="flex gap-[6px]">
                {/* VISA */}
                <div className="flex h-[36px] w-[56px] items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                  <img src="/image/1490135017-visa_82256.png" alt="VISA" className="w-[40px] object-contain" />
                </div>
                {/* Mastercard */}
                <div className="flex h-[36px] w-[56px] items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                  <img src="/image/1490135018-mastercard_82253.png" alt="MasterCard" className="w-[30px] object-contain" />
                </div>
              </div>
              <span className="text-[16px] font-bold text-[#99a1af]">+</span>
              <div className="flex gap-[4px]">
                <div className="flex h-[36px] items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-[12px] shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                  <span className="text-[12px] font-bold text-[#4b5563]">₩ KRW</span>
                </div>
              </div>
            </div>
            <p className="mt-[12px] text-[10px] leading-[1.8] text-[#4a5565]">
              병원 및 약국에서 결제 시 필요합니다.{'\n'}
              해외카드 사용이 제한될 수 있어 현금(KRW)도 함께 준비하는 것을 권장합니다.
            </p>
          </div>

          {/* 보험 서류 */}
          <div className="mb-[16px] rounded-[12px] border border-[#296dff] bg-white p-[16px]">
            <div className="mb-[12px] flex items-center gap-[8px]">
              <img src={imgInsurance} alt="" className="h-[20px] w-[20px]" />
              <span className="text-[16px] font-semibold text-[#0a0a0a]">보험 서류</span>
              <span className="rounded-full bg-[#f3f4f6] px-[8px] py-[2px] text-[10px] font-semibold text-[#4a5565]">선택</span>
              <span className="text-[12px] text-[#6a7282]">Insurance</span>
            </div>
            <div className="flex justify-center mb-[12px]">
              <div className="flex flex-col items-center justify-center w-[160px] h-[70px] rounded-[12px] bg-[#eff6ff] border border-[#bedbff]">
                <span className="text-[24px]">📄</span>
                <span className="mt-[4px] text-[12px] font-bold text-[#296dff]">Insurance Document</span>
              </div>
            </div>
            <p className="text-[10px] leading-[1.8] text-[#4a5565]">
              보험 서류가 있다면 함께 준비해 주세요.{'\n'}
              진료비 처리나 보험 청구에 도움이 됩니다.
            </p>
          </div>

          {/* 복용 중인 약 */}
          <div className="mb-[16px] rounded-[12px] border border-[#296dff] bg-white p-[16px]">
            <div className="mb-[12px] flex items-center gap-[8px]">
              <img src={imgMedicine} alt="" className="h-[20px] w-[20px]" />
              <span className="text-[16px] font-semibold text-[#0a0a0a]">복용 중인 약</span>
              <span className="rounded-full bg-[#f3f4f6] px-[8px] py-[2px] text-[10px] font-semibold text-[#4a5565]">선택</span>
              <span className="text-[12px] text-[#6a7282]">Current Medication</span>
            </div>
            <div className="flex justify-center mb-[12px]">
              <div className="relative flex flex-col items-center justify-center w-[120px] h-[100px] rounded-[8px] bg-white border border-[#e5e7eb] shadow-sm">
                <span className="text-[14px] font-bold text-[#ef4444] mb-[2px]">● PRESCRIBE</span>
                <div className="w-[80px] h-[2px] bg-[#f3f4f6] mb-[2px]"></div>
                <div className="w-[80px] h-[2px] bg-[#f3f4f6] mb-[2px]"></div>
                <div className="w-[80px] h-[2px] bg-[#f3f4f6] mb-[2px]"></div>
                <div className="w-[60px] h-[2px] bg-[#f3f4f6] mb-[2px]"></div>
                
                <div className="absolute -bottom-[10px] -right-[10px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#296dff] shadow-md border-2 border-white">
                  <span className="text-[16px] text-white">💊</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] leading-[1.8] text-[#4a5565]">
              현재 복용 중인 약이나 처방전이 있다면 가져와 주세요.{'\n'}
              의사에게 보여주면 더 정확한 진료를 받을 수 있어요.
            </p>
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-px bg-[#e5e7eb]" />

        {/* 2. 병원 이용 방법 */}
        <section>
          <h2 className="mb-[20px] text-[15px] font-bold text-black">2. 병원 이용 방법</h2>

          {/* 플로우 */}
          <div className="relative mb-[24px] flex items-start justify-between">
            {/* 진행선 */}
            <div className="absolute left-[24px] right-[24px] top-[24px] h-[2px] bg-[#e5e7eb]" />
            <div className="absolute left-[24px] top-[24px] h-[2px] w-[72%] bg-[#155dfc]" />

            {[
              { icon: imgCheckin, label: '접수', sub: 'Check-in', active: true },
              { icon: imgWait, label: '대기', sub: 'Wait', active: true },
              { icon: imgConsult, label: '진료', sub: 'Consultation', active: true },
              { icon: imgPaymentStep, label: '수납', sub: 'Payment', active: true },
              { icon: imgPharmacy, label: '약국', sub: 'Pharmacy', active: false },
            ].map((step) => (
              <div key={step.label} className="relative flex flex-col items-center gap-[8px]">
                <div
                  className={`flex h-[48px] w-[48px] items-center justify-center rounded-full shadow-md ${
                    step.active ? 'bg-[#155dfc]' : 'border border-[#d1d5dc] bg-white'
                  }`}
                >
                  <img src={step.icon} alt={step.label} className="h-[24px] w-[24px]" />
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[12px] font-semibold ${step.active ? 'text-[#101828]' : 'text-[#4a5565]'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#6a7282]">{step.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 약 안내 박스 */}
          <div className="relative rounded-[16px] border border-[#fee685] bg-[#fffbeb] px-[16px] pb-[16px] pt-[28px]">
            <div className="absolute -top-[18px] left-1/2 flex h-[36px] w-[36px] -translate-x-1/2 items-center justify-center rounded-full border border-[#ffd230] bg-[#fef3c6]">
              <span className="text-[16px]">⚠️</span>
            </div>
            <div className="mb-[12px] flex items-start gap-[12px]">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#fee685]">
                <span className="text-[16px]">⚠️</span>
              </div>
              <div>
                <p className="mb-[4px] text-[12px] font-semibold text-[#7b3306]">약은 병원 밖에서 받아요!</p>
                <p className="text-[10px] leading-[1.8] text-[#973c00]">
                  약은 병원 안에서 주지 않아요. 수납 후 처방전을 받아서 병원 밖의{' '}
                  <strong>약국(Pharmacy)</strong>에 가야 해요.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[8px]">
              <div className="h-[3px] flex-1 rounded bg-[#ffd230]" />
              <span className="text-[12px] font-semibold text-[#7b3306]">수납</span>
              <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#ffb900] bg-white">
                <span className="text-[14px]">→</span>
              </div>
              <span className="text-[12px] font-semibold text-[#7b3306]">약국</span>
              <div className="h-[3px] flex-1 rounded bg-[#ffd230]" />
            </div>
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-px bg-[#e5e7eb]" />

        {/* 3. 꼭 확인하세요 */}
        <section>
          <h2 className="mb-[16px] text-[20px] font-bold text-[#0a0a0a]">3. 꼭 확인하세요</h2>

          <div className="flex flex-col gap-[12px]">
            {/* 응급 상황 */}
            <div className="rounded-[14px] border border-[#ffc9c9] bg-[#fef2f2] px-[14px] py-[14px]">
              <div className="flex items-start gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[#e7000b]">
                  <img src={imgEmergency} alt="" className="h-[20px] w-[20px]" />
                </div>
                <div>
                  <p className="mb-[4px] text-[12px] font-semibold text-[#82181a]">응급 상황</p>
                  <p className="text-[10px] leading-[1.8] text-[#9f0712]">
                    증상이 심하거나 위험하다고 느껴지면{'\n'}
                    바로 응급실(Emergency Room)로 가세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 약 알러지 */}
            <div className="rounded-[14px] border border-[#ffd6a8] bg-[#fff7ed] px-[14px] py-[14px]">
              <div className="flex items-start gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[#ff6900]">
                  <img src={imgAllergy} alt="" className="h-[20px] w-[20px]" />
                </div>
                <div>
                  <p className="mb-[4px] text-[12px] font-semibold text-[#7e2a0c]">약 알러지</p>
                  <p className="text-[10px] leading-[1.8] text-[#9f2d00]">
                    약 알러지가 있다면 <strong>반드시 의사에게 알려주세요!</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* 기존 질환 */}
            <div className="rounded-[14px] border border-[#e9d4ff] bg-[#faf5ff] px-[14px] py-[14px]">
              <div className="flex items-start gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[#9810fa]">
                  <img src={imgDisease} alt="" className="h-[20px] w-[20px]" />
                </div>
                <div>
                  <p className="mb-[4px] text-[12px] font-semibold text-[#59168b]">기존 질환</p>
                  <p className="text-[10px] leading-[1.8] text-[#6e11b0]">
                    당뇨, 고혈압 등 <strong>기존 질환이 있다면 꼭 알려주세요.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 안내 */}
          <div className="mt-[16px] flex flex-col gap-[12px] rounded-[14px] border border-[#dbeafe] bg-white px-[14px] py-[16px]">
            <div className="flex items-start gap-[10px]">
              <div className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#296dff]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#296dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[10px] font-semibold text-[#4a5565]">처음 방문하는 병원이라면</p>
                <p className="text-[10px] text-[#6a7282]">외국인 진료 가능 여부를 미리 확인하세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-[10px]">
              <div className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#296dff]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#296dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[10px] font-semibold text-[#4a5565]">대기 시간이 길 수 있어요.</p>
                <p className="text-[10px] text-[#6a7282]">여유 있게 방문하는 것이 좋아요.</p>
              </div>
            </div>
            <div className="flex items-start gap-[10px]">
              <div className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#296dff]">
                <span className="text-[10px] font-bold text-[#296dff]">文</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[10px] font-semibold text-[#4a5565]">언어 지원 여부를 미리 확인하고</p>
                <p className="text-[10px] text-[#6a7282]">병원 이름과 주소를 메모해 두세요.</p>
              </div>
            </div>
          </div>

          {/* TIP */}
          <div className="mt-[16px] rounded-[14px] border border-[#bedbff] bg-[#eff6ff] px-[14px] py-[14px]">
            <div className="flex items-start gap-[12px]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[#155dfc]">
                <img src={imgTip} alt="" className="h-[20px] w-[20px]" />
              </div>
              <div className="flex flex-col justify-center min-h-[40px]">
                <p className="mb-[2px] text-[12px] font-bold text-[#1c398e]">TIP</p>
                <p className="text-[10px] leading-[1.6] text-[#193cb8]">
                  원활한 소통을 위해 <strong>번역 앱(Papago, Google Translate 등)</strong>을 미리 켜두시면 좋아요!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 이미지로 저장하기 버튼 */}
        {(doctorSummary || symptoms.length > 0) && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-[60px] w-full rounded-[30px] bg-[#296dff] text-[18px] font-bold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] disabled:opacity-60 transition-opacity"
          >
            {saving ? '저장 중...' : '이미지로 저장하기'}
          </button>
        )}
      </div>
    </MobileContainer>
  );
}
