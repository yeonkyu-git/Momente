# 🛠️ CLAUDE.md — 개발 지시문

> 커플 앨범 SNS 앱 "우리의 기록" 개발 가이드
> Claude Code가 이 파일을 읽고 프로젝트 컨텍스트를 이해한다.

---

## 프로젝트 개요

- **앱 이름**: Momente
- **장르**: 커플 전용 비공개 SNS 앱
- **타깃**: 국내 30대 커플
- **핵심 가치**: 둘만 보는 공간, 날짜·지도로 추억 탐색

---

## 기술 스택

### 프론트엔드
```
- Framework:     React Native (Expo SDK 51+)
- Language:      TypeScript (strict mode)
- Navigation:    React Navigation v6 (Stack + Tab)
- State:         Zustand
- UI:            NativeWind (Tailwind for RN) + 커스텀 컴포넌트
- Form:          React Hook Form + Zod
- Image:         expo-image, expo-image-picker, expo-media-library
- Map:           react-native-naver-map
```

### 백엔드 (BaaS)
```
- Platform:      Supabase
- Auth:          Supabase Auth + 카카오 OAuth 2.0
- Database:      PostgreSQL (Supabase)
- Storage:       Supabase Storage (이미지/영상)
- Realtime:      Supabase Realtime (알림)
```

### 외부 API
```
- 지도:          네이버 지도 SDK (react-native-naver-map)
- 장소 검색:     네이버 검색 API (장소 태그용)
- 소셜 로그인:   카카오 SDK (expo-kakao)
```

### 개발 도구
```
- Build:         Expo EAS Build
- Lint:          ESLint + Prettier
- Git:           GitHub (main/dev/feature/* 브랜치 전략)
```

---

## 폴더 구조

```
/
├── app/                        # Expo Router 파일 기반 라우팅
│   ├── (auth)/                 # 인증 전 화면
│   │   ├── login.tsx           # 카카오 로그인
│   │   └── couple-match.tsx    # 커플 매칭
│   ├── (tabs)/                 # 메인 탭 (인증 후)
│   │   ├── feed.tsx            # 피드 보기
│   │   ├── calendar.tsx        # 날짜별 보기
│   │   ├── map.tsx             # 지도 보기
│   │   └── profile.tsx         # 프로필/설정
│   ├── post/
│   │   ├── upload.tsx          # 게시글 업로드 (Step 1: 사진)
│   │   ├── place.tsx           # 장소 태그 (Step 2)
│   │   └── [id].tsx            # 게시글 상세
│   └── _layout.tsx
│
├── components/
│   ├── ui/                     # 공통 UI (Button, Input, Card...)
│   ├── feed/                   # 피드 관련 컴포넌트
│   ├── map/                    # 지도 관련 컴포넌트
│   └── post/                   # 업로드 관련 컴포넌트
│
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트
│   ├── kakao.ts                # 카카오 SDK 래퍼
│   └── naver-map.ts            # 네이버 지도 유틸
│
├── stores/
│   ├── auth.store.ts           # 인증 상태
│   ├── couple.store.ts         # 커플 정보
│   └── post.store.ts           # 게시글 상태
│
├── types/
│   └── index.ts                # 전역 타입 정의
│
├── constants/
│   ├── colors.ts               # 디자인 토큰 (색상)
│   └── layout.ts               # 여백, 폰트 사이즈
│
└── supabase/
    └── migrations/             # DB 마이그레이션 파일
```

---

## DB 스키마

```sql
-- 사용자
create table users (
  id uuid primary key references auth.users,
  kakao_id text unique,
  nickname text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- 커플
create table couples (
  id uuid primary key default gen_random_uuid(),
  user_a uuid references users not null,
  user_b uuid references users not null,
  anniversary date,
  invite_code text unique not null,
  created_at timestamptz default now()
);

-- 게시글
create table posts (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references couples not null,
  author_id uuid references users not null,
  media_urls text[] not null,        -- 이미지/영상 URL 배열
  media_types text[] not null,       -- 'image' | 'video'
  memo text,
  place_name text not null,
  place_address text,
  place_lat float8 not null,
  place_lng float8 not null,
  date_at date not null,             -- 데이트 날짜 (업로드일과 다를 수 있음)
  created_at timestamptz default now()
);

-- 반응 (하트)
create table reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts not null,
  user_id uuid references users not null,
  unique(post_id, user_id)
);

-- RLS 정책: 커플 멤버만 자신의 데이터 접근 가능
alter table posts enable row level security;
create policy "couple members only" on posts
  using (
    couple_id in (
      select id from couples
      where user_a = auth.uid() or user_b = auth.uid()
    )
  );
```

---

## 코딩 규칙

### 기본 원칙
- **TypeScript strict mode** 필수, `any` 사용 금지
- 컴포넌트는 **함수형 + arrow function** 으로 작성
- 파일명: 컴포넌트는 `PascalCase.tsx`, 유틸/훅은 `camelCase.ts`
- 모든 비동기 처리는 `try/catch` 필수
- Supabase 에러는 반드시 핸들링 후 사용자에게 toast 노출

### 컴포넌트 작성 패턴
```tsx
// ✅ 올바른 패턴
interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent = ({ title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default MyComponent;
```

### Supabase 쿼리 패턴
```ts
// ✅ 항상 에러 핸들링
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('couple_id', coupleId);

if (error) throw new Error(error.message);
return data;
```

### 상태 관리 패턴 (Zustand)
```ts
// stores/auth.store.ts
interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

---

## 디자인 토큰

```ts
// constants/colors.ts
export const colors = {
  primary: '#D4537E',       // 메인 핑크
  primaryLight: '#FBEAF0',  // 연한 핑크 (배경)
  primaryDark: '#993556',   // 진한 핑크 (텍스트)
  
  black: '#1A1A1A',
  gray900: '#2D2D2D',
  gray500: '#9E9E9E',
  gray200: '#EEEEEE',
  gray100: '#F5F5F5',
  white: '#FFFFFF',
  
  success: '#4CAF50',
  error: '#E53935',
};

// constants/layout.ts
export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
};

export const fontSize = {
  xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 24,
};

export const radius = {
  sm: 8, md: 12, lg: 16, full: 999,
};
```

---

## 화면별 구현 순서 (MVP)

### Phase 1 — 인증 
- [ ] Supabase 프로젝트 세팅 + 환경변수 구성
- [ ] 카카오 OAuth 연동 (`expo-kakao`)
- [ ] 로그인 화면 구현
- [ ] users 테이블 자동 생성 (Supabase trigger)

### Phase 2 — 커플 매칭 
- [ ] 초대 코드 생성 로직
- [ ] 커플 매칭 화면 (코드 입력)
- [ ] 기념일 설정 화면
- [ ] "함께한 N일" 홈 표시

### Phase 3 — 게시글 
- [ ] 이미지 피커 (`expo-image-picker`)
- [ ] 네이버 장소 검색 연동
- [ ] 업로드 플로우 (3단계)
- [ ] Supabase Storage 업로드
- [ ] 피드 화면 구현

### Phase 4 — 탐색 
- [ ] 캘린더 뷰 (`react-native-calendars`)
- [ ] 네이버 지도 연동
- [ ] 지도 핀 + 클러스터링
- [ ] 게시글 상세 화면

### Phase 5 — QA + 배포 
- [ ] 전체 플로우 QA
- [ ] 성능 최적화 (이미지 캐싱)
- [ ] Expo EAS Build 설정
- [ ] App Store / Play Store 제출

---

## 환경변수 (.env)

```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=

# 카카오
EXPO_PUBLIC_KAKAO_APP_KEY=

# 네이버
EXPO_PUBLIC_NAVER_MAP_CLIENT_ID=
EXPO_PUBLIC_NAVER_SEARCH_CLIENT_ID=
EXPO_PUBLIC_NAVER_SEARCH_CLIENT_SECRET=
```

---

## 자주 쓰는 명령어

```bash
# 개발 서버 실행
npx expo startㅇ

# iOS 시뮬레이터
npx expo run:ios

# Android 에뮬레이터
npx expo run:android

# EAS 빌드 (개발용)
eas build --profile development --platform all

# Supabase 마이그레이션
supabase db push

# 타입 체크
npx tsc --noEmit

# 린트
npx eslint . --fix
```

---

## 주의사항

- 네이버 지도 SDK는 **네이티브 모듈**이므로 Expo Go에서 동작하지 않는다 → `expo run:ios` 또는 EAS Build 필요
- 카카오 SDK도 동일하게 네이티브 빌드 필요ㅇ
- Supabase Storage 업로드 시 **파일 경로 규칙**: `{couple_id}/{post_id}/{filename}`
- RLS(Row Level Security)는 반드시 활성화 — 커플 외 데이터 접근 차단
- 이미지 업로드 전 **클라이언트 사이드 압축** 필수 (`expo-image-manipulator`)
