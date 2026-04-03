# Frontend

React 19 + Vite + TypeScript + Tailwind v4 + MUI 기반 프론트엔드입니다.

## 실행

```bash
npm install
npm run dev
```

- 개발 서버: `http://localhost:5173`

## 라우트 맵

현재 라우팅은 로그인 상태(`localStorage`의 `frontend.auth.loggedIn`)에 따라 분기됩니다.

```text
/
├─ (비로그인) WelcomeGateScreen
└─ (로그인) MainHomeScreen
   ├─ /prescriptions                -> PrescriptionListPage
   ├─ /prescriptions/translate      -> PrescriptionTranslatePage
   ├─ /symptom-input                -> SymptomInputScreen
   └─ /nearby-hospitals             -> NearbyHospitals
```

## 인증/가드 구조

- `AuthProvider`: 로그인 상태를 Context + localStorage로 관리
- `HomeRoute`: `/`에서 로그인 여부에 따라 웰컴/홈 분기
- `RequireAuth`: 보호 라우트 접근 시 비로그인이면 `/`로 리다이렉트

## 주요 파일

- `src/App.tsx`: 전체 Route 선언
- `src/context/AuthContext.tsx`: 로그인 상태 관리
- `src/components/routing/HomeRoute.tsx`: 홈 분기
- `src/components/routing/RequireAuth.tsx`: 인증 가드
- `src/components/home/MainHomeScreen.tsx`: 로그인 후 메인 홈
- `src/components/prescription/PrescriptionListPage.tsx`: 처방전 목록
- `src/components/prescription/PrescriptionTranslatePage.tsx`: 처방전 번역
- `src/components/symptom/SymptomInputScreen.tsx`: 증상 입력
- `src/components/NearbyHospitals.tsx`: 내 근처 병원
