# CareLink Frontend - Architecture & UI Guide

이 문서는 CareLink 프로젝트의 프론트엔드 구조와 개발 컨벤션을 설명하기 위해 작성되었습니다. 새로 합류하는 개발자나 참조하는 AI 어시스턴트가 프로젝트의 현황과 스타일링 규칙을 한눈에 파악하고 개발을 이어나갈 수 있도록 돕습니다.

## 🛠 Tech Stack
- **Framework**: React 19 + Vite + TypeScript
- **Styling**: TailwindCSS v4, Vanilla CSS (`index.css`)
- **UI Components**: Material UI (MUI), Font: SUIT(기본)

## 📁 주요 디렉토리 및 파일 구조

```text
src/
├── App.tsx                     # 전체 최상위 라우트 선언
├── index.css                   # Tailwind Import 및 전역 CSS 설정
├── main.tsx                    # 애플리케이션 진입점
├── i18n.ts                     # 다국어 번역 설정 (react-i18next)
├── context/
│   └─ AuthContext.tsx          # 로그인(Session) 상태 관리 컨텍스트
└── components/
    ├── routing/
    │   ├── HomeRoute.tsx       # 스플래시 -> 언어선택 -> 홈 분기 라우트
    │   └── RequireAuth.tsx     # 인증된 사용자만 접근할 수 있도록 막는 라우트 가드
    ├── splash/
    │   └── SplashScreen.tsx    # 앱 최초 진입 시 보이는 로딩 스플래시 창 (1.8초)
    ├── language/
    │   └── LanguageSelectScreen.tsx # 최초 언어 선택 (이후 i18n/Auth 상태로 저장)
    ├── home/
    │   └── MainHomeScreen.tsx  # 로그인 후 메인 홈 화면
    ├── mypage/
    │   └── MyPageScreen.tsx    # 마이페이지 (로그아웃 기능)
    ├── symptom/
    │   ├── SymptomInputScreen.tsx  # 증상 입력 화면
    │   ├── SymptomLoadingScreen.tsx# AI 증상 분석 로딩 화면
    │   └── SymptomResultScreen.tsx # AI 분석 진료과 추천 결과 화면
    ├── prescription/
    │   ├── PrescriptionListPage.tsx      # 최근 처방전 목록
    │   └── PrescriptionTranslatePage.tsx # 처방전 인식 및 번역 화면
    └── layout/                     # 공통 레이아웃 컴포넌트 폴더
```

## 🔄 애플리케이션 플로우 (라우트 분기 과정)

1. **최초 진입 (`/`)**
   - `HomeRoute.tsx`가 가장 먼저 렌더링을 시작합니다.
   - `sessionStorage`를 확인해 한 번도 띄우지 않았다면 **1.8초간 스플래시 창**을 보여줍니다.
   - 이후 로그인 여부(`isLoggedIn`)를 체크하여 로그인이 되어있지 않다면 `LanguageSelectScreen`으로 이동, 로그인이 되어 있다면 `MainHomeScreen`으로 분기합니다.
2. **페이지 이동 (보호된 라우트)**
   - 앱 내부의 주요 서비스 (`/symptom-input`, `/prescriptions` 등)는 `<RequireAuth>` 로 래핑되어 있어 로그인되지 않은 유저의 직접 접근을 차단합니다.
   - 뒤로 가기, 홈 이동 등은 앱 헤더(Header)의 `navigate(-1)`, `navigate('/')` 버튼으로 처리됩니다.

## 🎨 UI/UX 컴포넌트 개발 및 스타일링 규칙 (매우 중요!)

CareLink 사용자들은 모바일 화면 사이즈를 기본으로 사용합니다. 데스크탑이나 타 기기에서도 깨지지 않는 UI를 위해 아래의 레이아웃 규칙을 반드시 지켜야 합니다.

### 1. 반응형 컨테이너 중앙 정렬 가이드
모든 `Screen`이나 `Page` 컴포넌트의 최상단 `div`는 회색 배경(`bg-[#F3F4F6]`)을 깔고 중앙 정렬된 모바일 화면 크기의 흰 배경 컨테이너를 가집니다.
```tsx
<div className="flex min-h-svh w-full justify-center bg-[#F3F4F6]">
  <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white">
    {/* 내부에 header, content 요소들 삽입 */}
  </div>
</div>
```

### 2. 컴포넌트 내부 정렬 통일
이전에 정렬이 섞여 있던 문제를 해결하고 통일성 있는 UI를 구성했습니다.
- 모든 리스트, 추천 내역(Box), 입력 폼 텍스트 요소들은 **왼쪽 정렬**(`flex-col items-start`, `text-left`)을 기본으로 합니다. 
- 단, 최상단 헤더(Header)의 페이지명은 중앙 정렬, 상단 뒤로가기 화살표(`<img src={imgArrowLine}/>`) 아이콘 컴포넌트는 `absolute left-[32px]` 에 두어 통일합니다.

### 3. 큰 텍스트 (타이틀, 헤더)의 렌더링 깨짐 방지 정책
상단 제목(`text-[24px]`~`text-[28px]`, 예: "언어를 선택하세요", "어떤 증상이 있으신가요?") 텍스트는 데스크탑 등 화면이 유동적으로 바뀔 때 줄바꿈(Wrap) 현상이 일어나면 위아래 텍스트가 겹치거나 지저분해지는 이슈가 발생할 수 있습니다. **타이틀 UI를 신규 생성할 때는 아래 2개의 CSS 조합을 필수로 넣어주세요.**
- `break-keep`: 단어가 끊어지며 줄바꿈되지 않게 단어 단위로 넘어가게 만듦.
- `leading-[1.3]`: 줄 간격을 확보하여 혹시라도 2줄로 줄바꿈 시, 렌더링 된 텍스트끼리 위아래로 겹치는 UI 버그를 사전에 차단합니다.

### 4. 팝업, 툴팁 Nudge UI
- Intersection Observer를 활용하여 유저가 스크롤하여 특정 영역에 닿으면(threshold: 0.5 등) State를 통해 알림 말풍선을 보여줍니다.
- 알림이 나타났다면 `setTimeout`을 통해 2~3초 뒤 `opacity-0 pointer-events-none`을 주어 트랜지션 애니메이션과 함께 자연스럽게 스르르 사라지게 하는 방식을 취합니다. 

## 🚀 로컬 개발 진행 방법

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (Vite)
npm run dev
```

*※ Vite CSS Build 주의: `index.css`를 수정할 때 외부 URL을 임포트하는 `@import url(...)` 코드는 반드시 상단(`@import 'tailwindcss'` 앞)에 위치해야 CSS 빌드 오류가 발생하지 않습니다.*
