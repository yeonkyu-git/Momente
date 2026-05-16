# Momente Frontend

React Native + Expo 기반 커플 전용 비공개 SNS 앱 프론트엔드.

## 요구 환경

- Node.js 20 이상
- npm 또는 yarn
- Expo CLI (`npm install -g expo-cli`)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# iOS 시뮬레이터 실행 (EAS Build 필요)
npm run ios

# Android 에뮬레이터 실행 (EAS Build 필요)
npm run android

# 웹 개발
npm run web

# TypeScript 타입 체크
npm run typecheck
```

## 환경 변수 설정

1. `.env.example`을 복사하여 `.env` 파일 생성:
   ```bash
   cp .env.example .env
   ```

2. Supabase, 카카오, 네이버 API 키 입력

## 디렉토리 구조

```
frontend/
├── app/                   # Expo Router 파일 기반 라우팅
│   ├── auth/             # 로그인, 커플 매칭
│   ├── post/             # 게시글 업로드
│   ├── tabs/             # 탭 네비게이션 (피드, 캘린더, 지도, 프로필)
│   ├── _layout.tsx       # 루트 레이아웃
│   └── index.tsx         # 홈 화면
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── ui/              # Button, Input 등 기본 컴포넌트
│   ├── feed/            # 피드 관련 컴포넌트
│   ├── map/             # 지도 관련 컴포넌트
│   └── post/            # 게시글 관련 컴포넌트
├── lib/                  # 유틸리티 및 서비스 클라이언트
│   ├── supabase.ts      # Supabase DB/Storage/Auth 클라이언트
│   └── api.ts           # Express 백엔드 호출 클라이언트
├── stores/               # Zustand 전역 상태 관리
│   ├── auth.store.ts
│   ├── couple.store.ts
│   └── post.store.ts
├── types/                # TypeScript 타입 정의
│   └── index.ts
├── constants/            # 상수 (색상, 문자열)
│   ├── colors.ts
│   └── strings.ts
├── global.css            # Tailwind CSS 기본 스타일
├── tailwind.config.js    # Tailwind/NativeWind 설정
├── app.json              # Expo 설정
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## 기술 스택

- **Framework**: React Native + Expo SDK 51
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router v3
- **State Management**: Zustand
- **Styling**: NativeWind v4 (Tailwind CSS)
- **Form & Validation**: React Hook Form + Zod
- **Database & Auth**: Supabase
- **Image Processing**: expo-image-picker, expo-image-manipulator
- **Notifications**: expo-notifications

## 개발 가이드

- **컴포넌트**: `components/` 하위 함수형 컴포넌트 작성
- **스타일**: NativeWind className 사용 (인라인 style 금지)
- **상태 관리**: 전역 상태는 `stores/` Zustand, 로컬 상태는 useState
- **라우팅**: `app/` 디렉토리 파일 기반
- **타입**: 모든 함수/컴포넌트에 명시적 타입 지정 (any 금지)

## Phase 0 상태

현재는 **Expo Go** 호환 상태입니다.

- 부트스트랩 완료
- NativeWind 설정 완료
- Supabase 클라이언트 준비
- 임시 홈 화면 구현

## Phase 1 이후

TASK-001 (카카오 로그인)과 TASK-005 (네이버 지도) 추가 후 **EAS Build** 필요.

## 주의사항

- `.env`에는 공개 키만 저장 (`EXPO_PUBLIC_` prefix)
- 시크릿 키는 백엔드 `.env`에만 저장
- 모든 사용자 노출 텍스트는 `constants/strings.ts`에서 관리
- 타입스크립트 strict mode 준수
- RLS 정책 설정 필수
