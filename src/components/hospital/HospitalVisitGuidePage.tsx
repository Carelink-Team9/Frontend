import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';
import { getDepartmentDisplayLabel, getSymptomDisplayLabel, resolveSupportedLanguage } from '../symptom/symptomLabels';

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

type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'th' | 'uz';

type Localized = Record<SupportedLanguage, string>;

function localized(language: SupportedLanguage, copy: Localized): string {
  return copy[language];
}

export default function HospitalVisitGuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = useMemo(() => resolveSupportedLanguage(i18n.resolvedLanguage), [i18n.resolvedLanguage]);
  const state = location.state as { symptoms?: string[]; doctorSummary?: string; mainDepartment?: string } | null;
  const symptoms = state?.symptoms ?? [];
  const doctorSummary = state?.doctorSummary ?? '';
  const mainDepartment = state?.mainDepartment ?? '';
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const copy = {
    title: { ko: '병원 방문 전 안내', en: 'Before visiting the hospital', ja: '病院に行く前の案内', zh: '就诊前 안내', vi: 'Hướng dẫn trước khi đến bệnh viện', th: 'คำแนะนำก่อนไปโรงพยาบาล', uz: 'Shifoxonaga borishdan oldingi yo‘riqnoma' },
    summary: { ko: '증상 요약', en: 'Symptom summary', ja: '症状の要約', zh: '症状摘要', vi: 'Tóm tắt triệu chứng', th: 'สรุปอาการ', uz: 'Simptom xulosasi' },
    cardTitle: { ko: '내 증상 요약 카드', en: 'My symptom summary card', ja: '症状要約カード', zh: '我的症状摘要卡', vi: 'Thẻ tóm tắt triệu chứng', th: 'การ์ดสรุปอาการของฉัน', uz: 'Mening simptom kartam' },
    cardFooter: { ko: '이 카드는 AI 증상 분석 결과이며 의료 진단을 대체하지 않습니다.', en: 'This card is based on AI symptom analysis and does not replace medical diagnosis.', ja: 'このカードはAIの症状分析結果であり、医療診断に代わるものではありません。', zh: '此卡片基于 AI 症状分析结果，不能替代医疗诊断。', vi: 'Thẻ này dựa trên kết quả phân tích triệu chứng bằng AI và không thay thế chẩn đoán y khoa.', th: 'การ์ดนี้อ้างอิงจากการวิเคราะห์อาการด้วย AI และไม่สามารถใช้แทนการวินิจฉัยทางการแพทย์ได้', uz: 'Bu karta AI simptom tahliliga asoslangan bo‘lib, tibbiy tashxis o‘rnini bosa olmaydi.' },
    preparations: { ko: '준비물', en: 'What to prepare', ja: '準備するもの', zh: '准备物品', vi: 'Chuẩn bị', th: 'สิ่งที่ควรเตรียม', uz: 'Tayyorlab borish kerak bo‘lgan narsalar' },
    hospitalFlow: { ko: '병원 이용 방법', en: 'Hospital flow', ja: '病院の流れ', zh: '医院流程', vi: 'Quy trình bệnh viện', th: 'ขั้นตอนในโรงพยาบาล', uz: 'Shifoxona jarayoni' },
    checklist: { ko: '꼭 확인하세요', en: 'Important checklist', ja: '必ず確認してください', zh: '请务必确认', vi: 'Những điều cần lưu ý', th: 'สิ่งที่ต้องตรวจสอบ', uz: 'Albatta tekshiring' },
    save: { ko: '이미지로 저장하기', en: 'Save as image', ja: '画像で保存', zh: '保存为图片', vi: 'Lưu thành ảnh', th: 'บันทึกเป็นรูปภาพ', uz: 'Rasm sifatida saqlash' },
    saving: { ko: '저장 중...', en: 'Saving...', ja: '保存中...', zh: '保存中...', vi: 'Đang lưu...', th: 'กำลังบันทึก...', uz: 'Saqlanmoqda...' },
    steps: [
      { icon: imgCheckin, label: { ko: '접수', en: 'Check-in', ja: '受付', zh: '挂号', vi: 'Đăng ký', th: 'ลงทะเบียน', uz: 'Ro‘yxatdan o‘tish' } },
      { icon: imgWait, label: { ko: '대기', en: 'Wait', ja: '待機', zh: '等待', vi: 'Chờ', th: 'รอ', uz: 'Kutish' } },
      { icon: imgConsult, label: { ko: '진료', en: 'Consultation', ja: '診療', zh: '问诊', vi: 'Khám', th: 'ตรวจ', uz: 'Ko‘rik' } },
      { icon: imgPaymentStep, label: { ko: '수납', en: 'Payment', ja: '会計', zh: '缴费', vi: 'Thanh toán', th: 'ชำระเงิน', uz: 'To‘lov' } },
      { icon: imgPharmacy, label: { ko: '약국', en: 'Pharmacy', ja: '薬局', zh: '药房', vi: 'Nhà thuốc', th: 'ร้านยา', uz: 'Dorixona' } },
    ],
  } as const;

  const preparationCards = [
    {
      icon: imgIdCard,
      title: { ko: '신분증', en: 'ID card', ja: '身分証', zh: '身份证件', vi: 'Giấy tờ tùy thân', th: 'บัตรประจำตัว', uz: 'Shaxsni tasdiqlovchi hujjat' },
      badge: { ko: '필수', en: 'Required', ja: '必須', zh: '必需', vi: 'Bắt buộc', th: 'จำเป็น', uz: 'Majburiy' },
      body: { ko: '외국인등록증 또는 여권 중 1개를 준비해 주세요.', en: 'Bring either your residence card or passport.', ja: '在留カードまたはパスポートのどちらかを用意してください。', zh: '请准备外国人登录证或护照其中之一。', vi: 'Hãy chuẩn bị thẻ cư trú hoặc hộ chiếu.', th: 'กรุณาเตรียมบัตรต่างด้าวหรือหนังสือเดินทางอย่างใดอย่างหนึ่ง', uz: 'Yashash kartasi yoki pasportdan birini olib keling.' },
    },
    {
      icon: imgPayment,
      title: { ko: '결제 수단', en: 'Payment method', ja: '支払い手段', zh: '支付方式', vi: 'Phương thức thanh toán', th: 'วิธีชำระเงิน', uz: 'To‘lov usuli' },
      badge: { ko: '필수', en: 'Required', ja: '必須', zh: '必需', vi: 'Bắt buộc', th: 'จำเป็น', uz: 'Majburiy' },
      body: { ko: '해외카드가 제한될 수 있으니 현금도 함께 준비하면 좋습니다.', en: 'Foreign cards may be limited, so it is helpful to bring some cash as well.', ja: '海外カードが使えない場合もあるので、現金も用意すると安心です。', zh: '海外银行卡可能受限，建议同时准备一些现金。', vi: 'Thẻ quốc tế có thể bị hạn chế, vì vậy nên mang theo tiền mặt.', th: 'บัตรต่างประเทศอาจใช้ไม่ได้บางแห่ง ควรเตรียมเงินสดด้วย', uz: 'Xorijiy kartalar cheklanishi mumkin, shuning uchun naqd pul ham olib kelgan ma’qul.' },
    },
    {
      icon: imgInsurance,
      title: { ko: '보험 서류', en: 'Insurance documents', ja: '保険書類', zh: '保险文件', vi: 'Giấy tờ bảo hiểm', th: 'เอกสารประกัน', uz: 'Sug‘urta hujjatlari' },
      badge: { ko: '선택', en: 'Optional', ja: '任意', zh: '可选', vi: 'Tùy chọn', th: 'ทางเลือก', uz: 'Ixtiyoriy' },
      body: { ko: '보험 관련 서류가 있으면 진료비 처리에 도움이 됩니다.', en: 'Insurance documents can help with payment and reimbursement.', ja: '保険書類があると支払いや請求に役立ちます。', zh: '如有保险文件，将有助于费用处理。', vi: 'Giấy tờ bảo hiểm sẽ giúp ích cho việc thanh toán và hoàn phí.', th: 'เอกสารประกันจะช่วยเรื่องการชำระเงินและการเบิกค่าใช้จ่าย', uz: 'Sug‘urta hujjatlari to‘lov va qoplama jarayonida yordam beradi.' },
    },
    {
      icon: imgMedicine,
      title: { ko: '복용 중인 약', en: 'Current medication', ja: '服用中の薬', zh: '正在服用的药', vi: 'Thuốc đang dùng', th: 'ยาที่กำลังใช้อยู่', uz: 'Hozir ichayotgan dorilar' },
      badge: { ko: '선택', en: 'Optional', ja: '任意', zh: '可选', vi: 'Tùy chọn', th: 'ทางเลือก', uz: 'Ixtiyoriy' },
      body: { ko: '현재 복용 중인 약이나 처방전이 있다면 함께 보여주세요.', en: 'If you are currently taking medicine, show it together with the prescription.', ja: '現在飲んでいる薬や処方箋があれば一緒に見せてください。', zh: '如果正在服药，请一并出示药物或处方。', vi: 'Nếu đang dùng thuốc, hãy mang theo và cho bác sĩ xem.', th: 'หากกำลังใช้ยาอยู่ ให้นำมาหรือแสดงให้แพทย์ดูด้วย', uz: 'Agar hozir dori ichayotgan bo‘lsangiz, uni yoki retseptini ko‘rsating.' },
    },
  ] as const;

  const alerts = [
    { icon: imgEmergency, title: { ko: '응급 상황', en: 'Emergency', ja: '緊急時', zh: '紧急情况', vi: 'Trường hợp khẩn cấp', th: 'กรณีฉุกเฉิน', uz: 'Favqulodda holat' }, body: { ko: '증상이 심하거나 위험하다고 느껴지면 바로 응급실로 가세요.', en: 'If symptoms feel severe or dangerous, go to the emergency room immediately.', ja: '症状が重い、危険だと感じたらすぐ救急外来へ行ってください。', zh: '如果症状严重或感觉危险，请立即前往急诊室。', vi: 'Nếu triệu chứng nghiêm trọng hoặc nguy hiểm, hãy đến phòng cấp cứu ngay.', th: 'หากอาการรุนแรงหรือรู้สึกอันตราย ให้ไปห้องฉุกเฉินทันที', uz: 'Agar alomatlar og‘ir yoki xavfli bo‘lsa, darhol shoshilinch bo‘limga boring.' }, bg: 'bg-[#fef2f2] border-[#ffc9c9]', iconBg: 'bg-[#e7000b]', titleClass: 'text-[#82181a]', bodyClass: 'text-[#9f0712]' },
    { icon: imgAllergy, title: { ko: '약 알레르기', en: 'Drug allergy', ja: '薬アレルギー', zh: '药物过敏', vi: 'Dị ứng thuốc', th: 'แพ้ยา', uz: 'Dori allergiyasi' }, body: { ko: '약 알레르기가 있다면 반드시 의사에게 알려주세요.', en: 'If you have a drug allergy, make sure to tell the doctor.', ja: '薬のアレルギーがあれば必ず医師に伝えてください。', zh: '如果有药物过敏，请务必告诉医生。', vi: 'Nếu bạn dị ứng thuốc, hãy chắc chắn báo cho bác sĩ.', th: 'หากคุณแพ้ยา ต้องแจ้งแพทย์ทุกครั้ง', uz: 'Agar doriga allergiyangiz bo‘lsa, albatta shifokorga ayting.' }, bg: 'bg-[#fff7ed] border-[#ffd6a8]', iconBg: 'bg-[#ff6900]', titleClass: 'text-[#7e2a0c]', bodyClass: 'text-[#9f2d00]' },
    { icon: imgDisease, title: { ko: '기존 질환', en: 'Medical history', ja: '持病', zh: '既往疾病', vi: 'Bệnh nền', th: 'โรคประจำตัว', uz: 'Oldingi kasalliklar' }, body: { ko: '당뇨, 고혈압 등 기존 질환이 있다면 꼭 알려주세요.', en: 'Tell the doctor about any chronic conditions such as diabetes or high blood pressure.', ja: '糖尿病や高血圧など持病があれば必ず伝えてください。', zh: '如有糖尿病、高血压等基础疾病，请务必告知。', vi: 'Hãy báo cho bác sĩ nếu bạn có bệnh nền như tiểu đường hoặc cao huyết áp.', th: 'หากมีโรคประจำตัว เช่น เบาหวานหรือความดันโลหิตสูง กรุณาแจ้งแพทย์', uz: 'Qandli diabet yoki yuqori qon bosimi kabi kasalliklaringiz bo‘lsa, aytib qo‘ying.' }, bg: 'bg-[#faf5ff] border-[#e9d4ff]', iconBg: 'bg-[#9810fa]', titleClass: 'text-[#59168b]', bodyClass: 'text-[#6e11b0]' },
  ] as const;

  const tips = [
    { icon: '✓', title: { ko: '처음 방문하는 병원이라면', en: 'If this is your first visit', ja: '初めて行く病院なら', zh: '如果是第一次就诊', vi: 'Nếu đây là lần đầu đến bệnh viện', th: 'หากเป็นการไปโรงพยาบาลครั้งแรก', uz: 'Agar birinchi marta borayotgan bo‘lsangiz' }, body: { ko: '외국인 진료 가능 여부를 미리 확인하세요.', en: 'Check in advance whether foreign-language support is available.', ja: '外国人対応が可能か事前に確認してください。', zh: '请提前确认是否支持外国人诊疗。', vi: 'Hãy kiểm tra trước xem bệnh viện có hỗ trợ người nước ngoài hay không.', th: 'ตรวจสอบล่วงหน้าว่าโรงพยาบาลรองรับชาวต่างชาติหรือไม่', uz: 'Chet elliklar uchun xizmat bor-yo‘qligini oldindan tekshiring.' } },
    { icon: '⏰', title: { ko: '대기 시간이 길 수 있어요', en: 'Waiting may take time', ja: '待ち時間が長い場合があります', zh: '等待时间可能较长', vi: 'Thời gian chờ có thể lâu', th: 'อาจใช้เวลารอนาน', uz: 'Kutish uzoq bo‘lishi mumkin' }, body: { ko: '여유 있게 방문하는 것이 좋아요.', en: 'It is better to plan with extra time.', ja: '時間に余裕を持って訪問しましょう。', zh: '建议预留充足时间。', vi: 'Bạn nên đi sớm và dành thêm thời gian.', th: 'ควรเผื่อเวลาในการไป', uz: 'Vaqtni kengroq rejalashtirgan ma’qul.' } },
    { icon: '📍', title: { ko: '언어 지원 여부와 주소를 확인하세요', en: 'Check language support and address', ja: '言語対応と住所を確認してください', zh: '确认语言支持和地址', vi: 'Kiểm tra hỗ trợ ngôn ngữ và địa chỉ', th: 'ตรวจสอบการรองรับภาษาและที่อยู่', uz: 'Til yordami va manzilni tekshiring' }, body: { ko: '병원 이름과 주소를 메모해 두면 도움이 됩니다.', en: 'Writing down the hospital name and address helps.', ja: '病院名と住所をメモしておくと安心です。', zh: '记下医院名称和地址会更方便。', vi: 'Ghi lại tên và địa chỉ bệnh viện sẽ hữu ích hơn.', th: 'จดชื่อและที่อยู่ของโรงพยาบาลไว้จะช่วยได้', uz: 'Shifoxona nomi va manzilini yozib qo‘ysangiz foydali bo‘ladi.' } },
  ] as const;

  const handleSave = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2, skipFonts: true });

      if (navigator.share && navigator.canShare) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'carelink-symptom.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `${localized(language, copy.cardTitle)} - CareLink` });
          return;
        }
      }

      const link = document.createElement('a');
      link.download = 'carelink-symptom.png';
      link.href = dataUrl;
      link.click();
    } catch {
      // no-op
    } finally {
      setSaving(false);
      navigate('/');
    }
  };

  return (
    <MobileContainer header={<AppHeader title={localized(language, copy.title)} />}>
      <div className="flex flex-col gap-[32px] px-[24px] pb-[40px] pt-[24px] text-left">
        {(doctorSummary || symptoms.length > 0) ? (
          <section>
            <h2 className="mb-[12px] text-[15px] font-bold leading-[1.4] break-keep text-black">0. {localized(language, copy.summary)}</h2>
            <div ref={cardRef} className="overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-sm">
              <div className="bg-[#296dff] px-[20px] py-[20px]">
                <div className="flex items-center justify-between gap-[12px]">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-[0.5px] text-[rgba(255,255,255,0.8)]">CARELINK</p>
                    <p className="mt-[4px] break-keep text-[20px] font-bold leading-[1.3] tracking-[-0.5px] text-white">{localized(language, copy.cardTitle)}</p>
                  </div>
                  {mainDepartment ? (
                    <div className="rounded-[20px] bg-[rgba(255,255,255,0.2)] px-[14px] py-[6px]">
                      <p className="text-[14px] font-bold text-white">{getDepartmentDisplayLabel(mainDepartment, language)}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="bg-[#f8f9fb] px-[20px] py-[28px]">
                {doctorSummary ? (
                  <p className="break-keep text-[16px] font-medium leading-[1.7] tracking-[-0.3px] text-[#374151]">{doctorSummary}</p>
                ) : (
                  <div className="flex flex-col gap-[10px]">
                    {symptoms.map((symptom, index) => (
                      <p key={index} className="break-keep text-[16px] font-medium leading-[1.7] tracking-[-0.3px] text-[#374151]">
                        {getSymptomDisplayLabel(symptom, language)}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-[#e5e7eb] bg-[#f8f9fb] px-[20px] pb-[20px] pt-[16px]">
                <p className="text-center text-[12px] font-medium tracking-[-0.2px] text-[#9ca3af]">{localized(language, copy.cardFooter)}</p>
              </div>
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="mb-[16px] text-[15px] font-bold leading-[1.4] break-keep text-black">1. {localized(language, copy.preparations)}</h2>
          <div className="flex flex-col gap-[16px]">
            {preparationCards.map((card, index) => (
              <div key={index} className="rounded-[12px] border border-[#296dff] bg-white p-[16px]">
                <div className="mb-[12px] flex items-center gap-[8px]">
                  <img src={card.icon} alt="" className="h-[20px] w-[20px]" />
                  <span className="text-[16px] font-semibold leading-[1.3] break-keep text-[#0a0a0a]">{localized(language, card.title)}</span>
                  <span className={`rounded-full px-[8px] py-[2px] text-[10px] font-semibold ${index < 2 ? 'bg-[#ffe2e2] text-[#c10007]' : 'bg-[#f3f4f6] text-[#4a5565]'}`}>
                    {localized(language, card.badge)}
                  </span>
                </div>
                <p className="text-[12px] leading-[1.8] text-[#4a5565]">{localized(language, card.body)}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#e5e7eb]" />

        <section>
          <h2 className="mb-[20px] text-[15px] font-bold leading-[1.4] break-keep text-black">2. {localized(language, copy.hospitalFlow)}</h2>
          <div className="relative mb-[24px] flex items-start justify-between">
            <div className="absolute left-[24px] right-[24px] top-[24px] h-[2px] bg-[#e5e7eb]" />
            <div className="absolute left-[24px] top-[24px] h-[2px] w-[72%] bg-[#155dfc]" />
            {copy.steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center gap-[8px]">
                <div className={`flex h-[48px] w-[48px] items-center justify-center rounded-full shadow-md ${index < 4 ? 'bg-[#155dfc]' : 'border border-[#d1d5dc] bg-white'}`}>
                  <img src={step.icon} alt="" className="h-[24px] w-[24px]" />
                </div>
                <span className="text-center text-[10px] font-semibold text-[#101828]">{localized(language, step.label)}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] border border-[#fee685] bg-[#fffbeb] px-[16px] py-[20px]">
            <p className="mb-[8px] text-[13px] font-semibold leading-[1.4] break-keep text-[#7b3306]">
              {localized(language, {
                ko: '약은 병원 밖 약국에서 받습니다.',
                en: 'Medicines are collected at a pharmacy outside the hospital.',
                ja: '薬は病院の外にある薬局で受け取ります。',
                zh: '药物通常需要在医院外的药房领取。',
                vi: 'Thuốc thường được nhận tại nhà thuốc bên ngoài bệnh viện.',
                th: 'ยามักรับที่ร้านยานอกโรงพยาบาล',
                uz: 'Dorilar odatda shifoxona tashqarisidagi dorixonadan olinadi.',
              })}
            </p>
            <p className="text-[11px] leading-[1.8] text-[#973c00]">
              {localized(language, {
                ko: '수납 후 처방전을 받고 약국으로 이동하면 됩니다.',
                en: 'After payment, take the prescription and go to the pharmacy.',
                ja: '会計後に処方箋を受け取り、薬局へ移動してください。',
                zh: '缴费后领取处方，再前往药房即可。',
                vi: 'Sau khi thanh toán, nhận đơn thuốc rồi đến nhà thuốc.',
                th: 'หลังชำระเงิน รับใบสั่งยาแล้วไปที่ร้านยา',
                uz: 'To‘lovdan keyin retseptni olib dorixonaga boring.',
              })}
            </p>
          </div>
        </section>

        <div className="h-px bg-[#e5e7eb]" />

        <section>
          <h2 className="mb-[16px] text-[20px] font-bold leading-[1.3] break-keep text-[#0a0a0a]">3. {localized(language, copy.checklist)}</h2>
          <div className="flex flex-col gap-[12px]">
            {alerts.map((alert, index) => (
              <div key={index} className={`rounded-[14px] border px-[14px] py-[14px] ${alert.bg}`}>
                <div className="flex items-start gap-[12px]">
                  <div className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] ${alert.iconBg}`}>
                    <img src={alert.icon} alt="" className="h-[20px] w-[20px]" />
                  </div>
                  <div>
                    <p className={`mb-[4px] text-[12px] font-semibold leading-[1.4] break-keep ${alert.titleClass}`}>{localized(language, alert.title)}</p>
                    <p className={`text-[10px] leading-[1.8] break-keep ${alert.bodyClass}`}>{localized(language, alert.body)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[16px] flex flex-col gap-[12px] rounded-[14px] border border-[#dbeafe] bg-white px-[14px] py-[16px]">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-[10px]">
                <div className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#296dff] text-[10px] font-bold text-[#296dff]">
                  {tip.icon}
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[10px] font-semibold leading-[1.4] break-keep text-[#4a5565]">{localized(language, tip.title)}</p>
                  <p className="text-[10px] leading-[1.5] text-[#6a7282]">{localized(language, tip.body)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[16px] rounded-[14px] border border-[#bedbff] bg-[#eff6ff] px-[14px] py-[14px]">
            <div className="flex items-start gap-[12px]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[#155dfc]">
                <img src={imgTip} alt="" className="h-[20px] w-[20px]" />
              </div>
              <div className="flex min-h-[40px] flex-col justify-center">
                <p className="mb-[2px] text-[12px] font-bold text-[#1c398e]">TIP</p>
                <p className="text-[10px] leading-[1.6] text-[#193cb8]">
                  {localized(language, {
                    ko: '원활한 소통을 위해 번역 앱을 미리 켜두면 도움이 됩니다.',
                    en: 'Keeping a translation app ready can help with communication.',
                    ja: '円滑なコミュニケーションのために翻訳アプリを準備しておくと便利です。',
                    zh: '提前准备翻译应用会更方便沟通。',
                    vi: 'Chuẩn bị sẵn ứng dụng dịch sẽ giúp giao tiếp dễ dàng hơn.',
                    th: 'การเตรียมแอปแปลภาษาไว้ล่วงหน้าจะช่วยให้สื่อสารได้ง่ายขึ้น',
                    uz: 'Oldindan tarjima ilovasini tayyorlab qo‘ysangiz, muloqot osonroq bo‘ladi.',
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {(doctorSummary || symptoms.length > 0) ? (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-[60px] w-full rounded-[30px] bg-[#296dff] text-[18px] font-bold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] transition-opacity disabled:opacity-60"
          >
            {saving ? localized(language, copy.saving) : localized(language, copy.save)}
          </button>
        ) : null}
      </div>
    </MobileContainer>
  );
}
