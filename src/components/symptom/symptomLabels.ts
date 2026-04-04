export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'th' | 'uz';

export interface SymptomOption {
  id: string;
  value: string;
  label: Record<SupportedLanguage, string>;
}

export interface SymptomCategory {
  emoji: string;
  labelKey: string;
  symptoms: SymptomOption[];
}

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    emoji: '🤧',
    labelKey: 'symptom.category.cold',
    symptoms: [
      { id: 'cough', value: '기침', label: { ko: '기침', en: 'Cough', ja: 'せき', zh: '咳嗽', vi: 'Ho', th: 'ไอ', uz: 'Yo‘tal' } },
      { id: 'stuffy_nose', value: '코막힘', label: { ko: '코막힘', en: 'Stuffy nose', ja: '鼻づまり', zh: '鼻塞', vi: 'Nghẹt mũi', th: 'คัดจมูก', uz: 'Burun bitishi' } },
      { id: 'sore_throat', value: '목 통증', label: { ko: '목 통증', en: 'Sore throat', ja: 'のどの痛み', zh: '喉咙痛', vi: 'Đau họng', th: 'เจ็บคอ', uz: 'Tomoq og‘rig‘i' } },
      { id: 'shortness_breath', value: '호흡곤란', label: { ko: '호흡곤란', en: 'Shortness of breath', ja: '息苦しさ', zh: '呼吸困难', vi: 'Khó thở', th: 'หายใจลำบาก', uz: 'Nafas qisishi' } },
    ],
  },
  {
    emoji: '🤕',
    labelKey: 'symptom.category.pain',
    symptoms: [
      { id: 'headache', value: '두통', label: { ko: '두통', en: 'Headache', ja: '頭痛', zh: '头痛', vi: 'Đau đầu', th: 'ปวดหัว', uz: 'Bosh og‘rig‘i' } },
      { id: 'muscle_pain', value: '근육통', label: { ko: '근육통', en: 'Muscle pain', ja: '筋肉痛', zh: '肌肉痛', vi: 'Đau cơ', th: 'ปวดกล้ามเนื้อ', uz: 'Mushak og‘rig‘i' } },
      { id: 'joint_pain', value: '관절통', label: { ko: '관절통', en: 'Joint pain', ja: '関節痛', zh: '关节痛', vi: 'Đau khớp', th: 'ปวดข้อ', uz: 'Bo‘g‘im og‘rig‘i' } },
      { id: 'back_pain', value: '허리통증', label: { ko: '허리통증', en: 'Back pain', ja: '腰痛', zh: '腰痛', vi: 'Đau lưng', th: 'ปวดหลัง', uz: 'Bel og‘rig‘i' } },
    ],
  },
  {
    emoji: '🤒',
    labelKey: 'symptom.category.fever',
    symptoms: [
      { id: 'fever', value: '발열', label: { ko: '발열', en: 'Fever', ja: '発熱', zh: '发热', vi: 'Sốt', th: 'มีไข้', uz: 'Isitma' } },
      { id: 'chills', value: '오한', label: { ko: '오한', en: 'Chills', ja: '悪寒', zh: '发冷', vi: 'Ớn lạnh', th: 'หนาวสั่น', uz: 'Qaltirash' } },
      { id: 'body_ache', value: '몸살', label: { ko: '몸살', en: 'Body aches', ja: '体のだるさ', zh: '全身酸痛', vi: 'Đau nhức người', th: 'ปวดเมื่อยตัว', uz: 'Badan og‘rig‘i' } },
      { id: 'fatigue', value: '피로감', label: { ko: '피로감', en: 'Fatigue', ja: '疲労感', zh: '疲劳', vi: 'Mệt mỏi', th: 'อ่อนเพลีย', uz: 'Charchoq' } },
    ],
  },
  {
    emoji: '🩹',
    labelKey: 'symptom.category.skin',
    symptoms: [
      { id: 'rash', value: '발진', label: { ko: '발진', en: 'Rash', ja: '発疹', zh: '皮疹', vi: 'Phát ban', th: 'ผื่น', uz: 'Toshma' } },
      { id: 'itching', value: '가려움', label: { ko: '가려움', en: 'Itching', ja: 'かゆみ', zh: '瘙痒', vi: 'Ngứa', th: 'คัน', uz: 'Qichishish' } },
      { id: 'redness', value: '붉어짐', label: { ko: '붉어짐', en: 'Redness', ja: '赤み', zh: '发红', vi: 'Đỏ da', th: 'รอยแดง', uz: 'Qizarish' } },
      { id: 'wound', value: '상처', label: { ko: '상처', en: 'Wound', ja: '傷', zh: '伤口', vi: 'Vết thương', th: 'บาดแผล', uz: 'Jarohat' } },
    ],
  },
  {
    emoji: '🤢',
    labelKey: 'symptom.category.digestion',
    symptoms: [
      { id: 'stomachache', value: '복통', label: { ko: '복통', en: 'Stomachache', ja: '腹痛', zh: '腹痛', vi: 'Đau bụng', th: 'ปวดท้อง', uz: 'Qorin og‘rig‘i' } },
      { id: 'diarrhea', value: '설사', label: { ko: '설사', en: 'Diarrhea', ja: '下痢', zh: '腹泻', vi: 'Tiêu chảy', th: 'ท้องเสีย', uz: 'Ich ketishi' } },
      { id: 'indigestion', value: '소화불량', label: { ko: '소화불량', en: 'Indigestion', ja: '消化不良', zh: '消化不良', vi: 'Khó tiêu', th: 'อาหารไม่ย่อย', uz: 'Hazm buzilishi' } },
      { id: 'vomiting', value: '구토', label: { ko: '구토', en: 'Vomiting', ja: '嘔吐', zh: '呕吐', vi: 'Nôn', th: 'อาเจียน', uz: 'Qusish' } },
    ],
  },
  {
    emoji: '👂',
    labelKey: 'symptom.category.ent',
    symptoms: [
      { id: 'ear_pain', value: '귀 통증', label: { ko: '귀 통증', en: 'Ear pain', ja: '耳の痛み', zh: '耳痛', vi: 'Đau tai', th: 'ปวดหู', uz: 'Quloq og‘rig‘i' } },
      { id: 'nosebleed', value: '코피', label: { ko: '코피', en: 'Nosebleed', ja: '鼻血', zh: '流鼻血', vi: 'Chảy máu mũi', th: 'เลือดกำเดา', uz: 'Burun qonashi' } },
      { id: 'ringing_ears', value: '이명', label: { ko: '이명', en: 'Ringing in ears', ja: '耳鳴り', zh: '耳鸣', vi: 'Ù tai', th: 'หูอื้อ', uz: 'Quloq shang‘illashi' } },
    ],
  },
  {
    emoji: '❤️',
    labelKey: 'symptom.category.chest',
    symptoms: [
      { id: 'chest_pain', value: '가슴 통증', label: { ko: '가슴 통증', en: 'Chest pain', ja: '胸の痛み', zh: '胸痛', vi: 'Đau ngực', th: 'เจ็บหน้าอก', uz: 'Ko‘krak og‘rig‘i' } },
      { id: 'palpitations', value: '심장 두근거림', label: { ko: '심장 두근거림', en: 'Palpitations', ja: '動悸', zh: '心悸', vi: 'Tim đập nhanh', th: 'ใจสั่น', uz: 'Yurak urishining tezlashishi' } },
      { id: 'breathing_problem', value: '숨참', label: { ko: '숨참', en: 'Breathing trouble', ja: '息切れ', zh: '气短', vi: 'Khó thở', th: 'หายใจติดขัด', uz: 'Nafas yetishmasligi' } },
    ],
  },
];

export function resolveSupportedLanguage(language: string | undefined): SupportedLanguage {
  const short = language?.split('-')[0];
  if (short === 'en' || short === 'ja' || short === 'zh' || short === 'vi' || short === 'th' || short === 'uz') {
    return short;
  }
  return 'ko';
}

export function getSymptomDisplayLabel(value: string, language: SupportedLanguage): string {
  for (const category of SYMPTOM_CATEGORIES) {
    const symptom = category.symptoms.find((item) => item.value === value);
    if (symptom) return symptom.label[language];
  }
  return value;
}

const DEPARTMENT_LABELS: Record<string, Record<SupportedLanguage, string>> = {
  내과: { ko: '내과', en: 'Internal Medicine', ja: '内科', zh: '内科', vi: 'Nội khoa', th: 'อายุรกรรม', uz: 'Ichki kasalliklar' },
  이비인후과: { ko: '이비인후과', en: 'ENT', ja: '耳鼻咽喉科', zh: '耳鼻喉科', vi: 'Tai mũi họng', th: 'หู คอ จมูก', uz: 'Quloq burun tomoq' },
  정형외과: { ko: '정형외과', en: 'Orthopedics', ja: '整形外科', zh: '骨科', vi: 'Chấn thương chỉnh hình', th: 'ศัลยกรรมกระดูก', uz: 'Ortopediya' },
  피부과: { ko: '피부과', en: 'Dermatology', ja: '皮膚科', zh: '皮肤科', vi: 'Da liễu', th: 'ผิวหนัง', uz: 'Dermatologiya' },
  가정의학과: { ko: '가정의학과', en: 'Family Medicine', ja: '家庭医学科', zh: '家庭医学科', vi: 'Y học gia đình', th: 'เวชศาสตร์ครอบครัว', uz: 'Oilaviy tibbiyot' },
  소아청소년과: { ko: '소아청소년과', en: 'Pediatrics', ja: '小児科', zh: '儿科', vi: 'Nhi khoa', th: 'กุมารเวช', uz: 'Pediatriya' },
  산부인과: { ko: '산부인과', en: 'Obstetrics and Gynecology', ja: '産婦人科', zh: '妇产科', vi: 'Sản phụ khoa', th: 'สูตินรีเวช', uz: 'Akusherlik va ginekologiya' },
  안과: { ko: '안과', en: 'Ophthalmology', ja: '眼科', zh: '眼科', vi: 'Nhãn khoa', th: 'จักษุแพทย์', uz: 'Oftalmologiya' },
  외과: { ko: '외과', en: 'Surgery', ja: '外科', zh: '外科', vi: 'Ngoại khoa', th: 'ศัลยกรรม', uz: 'Jarrohlik' },
  응급의학과: { ko: '응급의학과', en: 'Emergency Medicine', ja: '救急医学科', zh: '急诊医学科', vi: 'Cấp cứu', th: 'เวชศาสตร์ฉุกเฉิน', uz: 'Shoshilinch tibbiyot' },
  비뇨의학과: { ko: '비뇨의학과', en: 'Urology', ja: '泌尿器科', zh: '泌尿科', vi: 'Tiết niệu', th: 'ระบบทางเดินปัสสาวะ', uz: 'Urologiya' },
  신경과: { ko: '신경과', en: 'Neurology', ja: '神経内科', zh: '神经内科', vi: 'Thần kinh', th: 'ประสาทวิทยา', uz: 'Nevrologiya' },
  정신건강의학과: { ko: '정신건강의학과', en: 'Psychiatry', ja: '精神科', zh: '精神科', vi: 'Tâm thần', th: 'จิตเวช', uz: 'Psixiatriya' },
  치과: { ko: '치과', en: 'Dentistry', ja: '歯科', zh: '牙科', vi: 'Nha khoa', th: 'ทันตกรรม', uz: 'Stomatologiya' },
};

export function getDepartmentDisplayLabel(value: string, language: SupportedLanguage): string {
  return DEPARTMENT_LABELS[value]?.[language] ?? value;
}
