# 🏥 CareLink — AI 기반 다국어 의료 커뮤니케이션 플랫폼

> **GOORM DEEPDIVE HACKATHON 2026** | 🥈 최우수상 (2위) 수상

한국에 거주하는 외국인이 의료 이용 과정에서 겪는 **언어 장벽과 정보 접근 문제**를 해결하는 AI 의료 서비스입니다.  
진료 전(증상 분석 → 병원 안내) · 진료 후(처방전 번역 · 복약 정보) · 이후(커뮤니티)까지 의료 경험 전 과정을 하나의 흐름으로 연결합니다.

> 📽 **[시연 영상 및 상세 소개 보기 →](https://jeonggrius.vercel.app/projects/5)**

---

## 📌 프로젝트 배경

한국 체류 외국인은 언어 장벽으로 인해 증상을 제대로 설명하지 못하거나, 처방전 내용을 이해하지 못해 복약 오류가 발생하는 등 의료 이용을 포기하는 경우가 빈번합니다.  
CareLink는 이 문제를 **AI + 다국어 인터페이스**로 해결하여 외국인 의료 접근성을 향상시킵니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| **증상 기반 진료과 추천** | 증상 입력 → GPT AI가 적합한 진료과 추천 → 주변 병원 안내 |
| **처방전 번역 · 분석** | 처방전 사진 업로드 → GPT-4o Vision이 약명 · 용법 · 주의사항을 모국어로 구조화 번역 |
| **복약 히스토리 관리** | 번역 결과를 카드 형태로 저장, 이력 재확인 가능 |
| **다국어 커뮤니티** | 모국어로 작성 → 자동 번역 제공, 약/증상 기반 경험 공유 |
| **병원 찾기** | Geolocation 기반 주변 병원 검색 · 진료과 필터링 |

### 지원 언어 (7개국)
🇰🇷 한국어 · 🇺🇸 영어 · 🇯🇵 일본어 · 🇨🇳 중국어 · 🇺🇿 우즈베크어 · 🇹🇭 태국어 · 🇻🇳 베트남어

---

## 🔄 서비스 플로우

```
[언어 선택 · 세션 시작]
        │
        ▼
     [홈 화면]
        │
        ├── 증상 입력 → AI 진료과 추천 → 주변 병원 안내
        │
        ├── 처방전 촬영/업로드 → GPT-4o Vision 분석 → 번역 결과 카드 저장
        │
        └── 커뮤니티 → 다국어 게시글 · 댓글 · 자동 번역
```

---

## 🛠 기술 스택

### Frontend
| 구분 | 기술 |
|------|------|
| Framework | React 19 · TypeScript · Vite |
| Styling | Tailwind CSS v4 · Material-UI (MUI) |
| State | Zustand |
| Routing | React Router v7 |
| 다국어 | i18next · react-i18next |
| HTTP | Axios (`withCredentials` 쿠키 세션) |

### Backend / AI / Infra
| 구분 | 기술 |
|------|------|
| Server | Spring Boot |
| Database | MySQL · Redis |
| AI | GPT-4o Vision · GPT API · Google Translate API |
| External API | 건강보험심사평가원 Open API · 식품의약품안전처 e약은요 API |
| Design | Figma |

---

## 📁 프로젝트 구조

```
src/
├── api/            # Axios API 호출 레이어 (symptom / prescription / hospital / community / user)
├── components/
│   ├── common/         # 공통 컴포넌트 (PrimaryButton, StatusMessage)
│   ├── layout/         # 레이아웃 (MobileContainer, BottomNav, AppHeader)
│   ├── routing/        # 인증 가드 (HomeRoute, RequireAuth)
│   ├── symptom/        # 증상 입력 · 로딩 · 결과 화면
│   ├── prescription/   # 처방전 업로드 · 번역 · 결과 · 히스토리
│   ├── community/      # 커뮤니티 목록 · 상세 · 작성
│   └── hospital/       # 병원 찾기 · 방문 가이드
├── stores/         # Zustand 전역 상태 (authStore / prescriptionFlowStore / communityStore)
├── context/        # AuthContext — 세션 초기화 및 인증 상태 관리
├── hooks/          # useGeolocation 등 커스텀 훅
├── locales/        # 7개 언어 번역 파일 (ko / en / ja / zh / uz / th / vi)
└── types/          # TypeScript 인터페이스 정의
```

---

## 🔐 인증 및 라우팅 구조

- **세션 기반 인증**: 앱 최초 진입 시 `/api/user/session` 으로 세션 복원, 없으면 언어 선택 → 세션 생성
- `AuthProvider`: 세션 상태를 Context + 쿠키로 관리
- `HomeRoute`: 로그인 여부에 따라 WelcomeGate / 홈 분기
- `RequireAuth`: 보호 라우트 — 비로그인 시 `/` 리다이렉트

---

## ⚙️ 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드
```

> API 백엔드: `https://carelink.p-e.kr` (Spring Boot)  
> Vite dev proxy: `/api`, `/uploads` → 백엔드로 자동 전달

---

## 👥 팀 구성 (7명)

| 역할 | 인원 | 주요 담당 |
|------|------|----------|
| **팀장 · 풀스택** | 1 | 프로젝트 방향 설정, **프론트엔드 전담 개발**, API 연동 |
| **풀스택 (백엔드)** | 2 | Spring Boot 서버 개발, API 설계, GPT 연동 |
| **데이터 분석** | 2 | Mock 데이터, GPT 프롬프트 설계 · 최적화, 번역 품질 검증 |
| **디자이너** | 1 | Figma UI/UX 설계, 디자인 시스템 |
| **PM** | 1 | 서비스 기획, 기능 명세, IA 구조 설계 |

---

## 🏆 수상

**최우수상 (2위)** — GOORM DEEPDIVE HACKATHON 2026
