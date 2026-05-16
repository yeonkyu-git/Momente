# 🛠️ DEVELOPMENT.md — 개발 지시문

> 커플 앨범 SNS 앱 **Momente** 개발 가이드  
> Claude Code가 이 파일을 읽고 프로젝트 컨텍스트를 이해한다.

---

## 프로젝트 개요

- **앱 이름**: Momente
- **장르**: 커플 전용 비공개 SNS 앱
- **타깃**: 국내 30대 커플
- **핵심 가치**: 둘만 보는 공간, 날짜·지도로 추억 탐색

---

## 아키텍처 레이어

```
┌────────────────────────────────────────┐
│          Frontend  (frontend/)         │
│  React Native + Expo + TypeScript      │
│  UI, 상태 관리, 라우팅                  │
└───────────────┬────────────────────────┘
                │ HTTPS REST
┌───────────────▼────────────────────────┐
│          Backend  (backend/)           │
│  Node.js + Express + TypeScript        │
│  비즈니스 로직, 외부 API 프록시          │
│  ─ 네이버 장소 검색 / 역지오코딩 프록시  │
│  ─ 초대코드 생성                        │
│  ─ 푸시 알림 발송                       │
└───────────────┬────────────────────────┘
                │ Supabase SDK / SQL
┌───────────────▼────────────────────────┐
│               DB  (db/)               │
│  PostgreSQL (Supabase)                 │
│  Storage · Auth · Realtime             │
└────────────────────────────────────────┘
```

> **Supabase 역할 범위**: DB / 파일 스토리지 / 인증(카카오 OAuth) / 실시간 이벤트  
> 비즈니스 로직과 외부 API 연동은 Express 서버에서만 처리한다.

---

## 기술 스택

### Frontend (`frontend/`)

```
Framework:     React Native (Expo SDK 51+)
Language:      TypeScript (strict mode)
Navigation:    Expo Router v3 (파일 기반 라우팅)
State:         Zustand
CSS:           NativeWind v4 (Tailwind CSS for React Native)
UI Kit:        커스텀 컴포넌트 (NativeWind 기반)
Form:          React Hook Form + Zod
Image:         expo-image, expo-image-picker (exif: true), expo-media-library
Image Edit:    expo-image-manipulator (업로드 전 압축)
Map:           react-native-naver-map
Kakao 로그인:  @react-native-kakao/core (네이티브 빌드 필요)
Push:          expo-notifications
```

### Backend (`backend/`)

```
Runtime:       Node.js 20 LTS
Framework:     Express 5
Language:      TypeScript
주요 패키지:
  - axios           (네이버 API 호출)
  - zod             (요청 파라미터 검증)
  - @supabase/supabase-js
  - expo-server-sdk (Expo 푸시 알림)
  - helmet          (보안 헤더)
  - cors

배포:          Render (GitHub 자동 배포, 무료 플랜)
```

### DB (`db/`)

```
Database:      PostgreSQL (Supabase)
Auth:          Supabase Auth + 카카오 OAuth 2.0
Storage:       Supabase Storage (이미지/영상)
Realtime:      Supabase Realtime (하트 반응 알림)
보안:          RLS (Row Level Security) — 커플 단위 접근 제어
```

### 외부 API (Backend에서만 호출)

```
네이버 장소 검색:   네이버 검색 API  → backend/src/routes/place.ts
네이버 역지오코딩:  네이버 Maps API  → backend/src/routes/geocode.ts
푸시 알림:         Expo Push API    → backend/src/routes/push.ts
```

### 개발 도구

```
Build:         Expo EAS Build (앱), tsc (서버)
Lint:          ESLint + Prettier
Git:           GitHub (main / dev / feature/* 브랜치 전략)
DB 관리:       Supabase CLI
```

---

## 폴더 구조

```
/                                      # 모노레포 루트
│
├── frontend/                          # ─── Frontend ─────────────────────
│   ├── app/                           # Expo Router 파일 기반 라우팅
│   │   ├── (auth)/
│   │   │   ├── login.tsx              # 카카오 로그인
│   │   │   └── couple-match.tsx       # 커플 매칭
│   │   ├── (tabs)/
│   │   │   ├── feed.tsx               # 피드
│   │   │   ├── calendar.tsx           # 날짜별 보기
│   │   │   ├── map.tsx                # 지도 보기
│   │   │   └── profile.tsx            # 프로필/설정
│   │   ├── post/
│   │   │   ├── upload.tsx             # Step 1: 사진 선택 + 메타데이터 추출
│   │   │   ├── place.tsx              # Step 2: 장소/날짜 확인 및 수정
│   │   │   ├── memo.tsx               # Step 3: 메모 입력 + 최종 업로드
│   │   │   └── [id].tsx               # 게시글 상세
│   │   └── _layout.tsx
│   │
│   ├── components/
│   │   ├── ui/                        # Button, Input, Card... (NativeWind)
│   │   ├── feed/
│   │   ├── map/
│   │   └── post/
│   │
│   ├── lib/
│   │   ├── supabase.ts                # Supabase 클라이언트 (DB/Storage/Auth)
│   │   ├── api.ts                     # Express 서버 호출 클라이언트
│   │   ├── kakao.ts                   # 카카오 SDK 래퍼
│   │   ├── naver-map.ts               # 네이버 지도 유틸
│   │   └── image-metadata.ts          # EXIF 메타데이터 추출 유틸
│   │
│   ├── stores/
│   │   ├── auth.store.ts
│   │   ├── couple.store.ts
│   │   └── post.store.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── colors.ts                  # Tailwind 커스텀 컬러 토큰
│   │   └── layout.ts
│   │
│   ├── tailwind.config.js             # NativeWind / Tailwind 설정
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                           # ─── Backend ──────────────────────
│   ├── src/
│   │   ├── index.ts                   # 서버 진입점
│   │   ├── routes/
│   │   │   ├── place.ts               # 네이버 장소 검색 프록시
│   │   │   ├── geocode.ts             # GPS → 장소명 (역지오코딩)
│   │   │   ├── invite.ts              # 초대코드 생성/검증
│   │   │   └── push.ts               # 푸시 알림 발송
│   │   ├── middleware/
│   │   │   ├── auth.ts                # Supabase JWT 검증
│   │   │   └── error.ts
│   │   └── lib/
│   │       ├── supabase.ts            # 서버용 Supabase 클라이언트 (service role)
│   │       └── naver.ts               # 네이버 API 공통 클라이언트
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                           # 서버 전용 시크릿 (절대 커밋 금지)
│
├── db/                                # ─── DB ───────────────────────────
│   ├── migrations/
│   │   ├── 001_users.sql
│   │   ├── 002_couples.sql
│   │   ├── 003_posts.sql
│   │   └── 004_reactions.sql
│   ├── seed.sql
│   └── config.toml
│
└── docs/
    ├── DEVELOPMENT.md
    └── DESIGN.md
```

---

## 사진 메타데이터 자동 입력

사진 선택 시 EXIF 데이터에서 **촬영 날짜**와 **GPS 좌표**를 자동으로 추출한다.  
추출한 값으로 날짜와 장소를 미리 채워 사용자 입력을 최소화한다.

### 추출 항목

| EXIF 필드 | 추출 값 | 사용처 |
|-----------|---------|--------|
| `DateTimeOriginal` | 촬영 날짜/시각 | date_at 자동 입력 |
| `GPSLatitude` + `GPSLatitudeRef` | 위도 (십진도) | 역지오코딩 → 장소명 |
| `GPSLongitude` + `GPSLongitudeRef` | 경도 (십진도) | 역지오코딩 → 장소명 |

### 흐름

```
[갤러리에서 사진 선택]
         ↓
expo-image-picker (exif: true)
         ↓
   EXIF 파싱
   ├── DateTimeOriginal  →  date_at 자동 입력 (수정 가능)
   └── GPS 좌표 확보
         ↓
   GPS 좌표가 있는 경우
   → POST /geocode (Express 서버)
   → 네이버 역지오코딩 API 호출
   → 장소명 + 주소 반환
   → Step 2 장소 필드 자동 입력 (수정 가능)
         ↓
   GPS 좌표가 없는 경우
   → 장소 필드 비워두고 사용자가 직접 검색
```

### 구현: `frontend/lib/image-metadata.ts`

```ts
import * as ImagePicker from 'expo-image-picker';

export interface ImageMetadata {
  takenAt: Date | null;       // 촬영 날짜 (EXIF DateTimeOriginal)
  latitude: number | null;    // GPS 위도 (십진도)
  longitude: number | null;   // GPS 경도 (십진도)
}

export async function pickImageWithMetadata(): Promise<{
  uri: string;
  metadata: ImageMetadata;
} | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    exif: true,               // EXIF 메타데이터 포함 요청
  });

  if (result.canceled) return null;

  const asset = result.assets[0];
  const exif = asset.exif as Record<string, unknown> | undefined;

  return {
    uri: asset.uri,
    metadata: {
      takenAt: parseExifDate(exif?.DateTimeOriginal as string),
      latitude: parseGps(exif?.GPSLatitude, exif?.GPSLatitudeRef as string),
      longitude: parseGps(exif?.GPSLongitude, exif?.GPSLongitudeRef as string),
    },
  };
}

// EXIF 포맷 "2024:12:25 14:30:00" → Date 객체
function parseExifDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const normalized = raw.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d;
}

// DMS(도분초) → 십진도 변환
function parseGps(dms: unknown, ref: string | undefined): number | null {
  if (!Array.isArray(dms) || dms.length !== 3) return null;
  const [deg, min, sec] = dms as number[];
  let decimal = deg + min / 60 + sec / 3600;
  if (ref === 'S' || ref === 'W') decimal *= -1;
  return decimal;
}
```

### 역지오코딩 라우트: `backend/src/routes/geocode.ts`

```ts
import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { lat, lng } = req.query as { lat: string; lng: string };

    const { data } = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
      {
        params: { coords: `${lng},${lat}`, output: 'json', orders: 'addr,roadaddr' },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAP_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.NAVER_MAP_CLIENT_SECRET,
        },
      }
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
```

---

## DB 스키마

```sql
-- 사용자
create table users (
  id         uuid primary key references auth.users,
  kakao_id   text unique,
  nickname   text not null,
  avatar_url text,
  push_token text,
  created_at timestamptz default now()
);

-- 커플
create table couples (
  id          uuid primary key default gen_random_uuid(),
  user_a      uuid references users not null,
  user_b      uuid references users not null,
  anniversary date,
  invite_code text unique not null,
  created_at  timestamptz default now()
);

-- 게시글
create table posts (
  id            uuid primary key default gen_random_uuid(),
  couple_id     uuid references couples not null,
  author_id     uuid references users not null,
  media_urls    text[] not null,
  media_types   text[] not null,       -- 'image' | 'video'
  memo          text,
  place_name    text not null,
  place_address text,
  place_lat     float8 not null,
  place_lng     float8 not null,
  date_at       date not null,         -- 데이트 날짜 (EXIF 또는 사용자 입력)
  taken_at      timestamptz,           -- EXIF 원본 촬영 시각
  created_at    timestamptz default now()
);

-- 반응 (하트)
create table reactions (
  id      uuid primary key default gen_random_uuid(),
  post_id uuid references posts not null,
  user_id uuid references users not null,
  unique(post_id, user_id)
);

-- RLS: 커플 멤버만 접근
alter table posts enable row level security;
create policy "couple members only" on posts
  using (
    couple_id in (
      select id from couples
      where user_a = auth.uid() or user_b = auth.uid()
    )
  );

alter table reactions enable row level security;
create policy "couple members only" on reactions
  using (
    post_id in (
      select id from posts where couple_id in (
        select id from couples
        where user_a = auth.uid() or user_b = auth.uid()
      )
    )
  );
```

---

## NativeWind 설정

### `frontend/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#D4537E',
        'primary-light': '#FBEAF0',
        'primary-dark': '#993556',
      },
    },
  },
};
```

### 컴포넌트 사용 예시

```tsx
// components/ui/Button.tsx
interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onPress, variant = 'primary' }: Props) => (
  <Pressable
    onPress={onPress}
    className={`h-[52px] rounded-[14px] items-center justify-center ${
      variant === 'primary' ? 'bg-primary' : 'bg-primary-light'
    }`}
  >
    <Text
      className={`text-base font-semibold ${
        variant === 'primary' ? 'text-white' : 'text-primary'
      }`}
    >
      {label}
    </Text>
  </Pressable>
);
```

---

## 환경변수

### `frontend/.env` — 클라이언트 (공개 가능한 값만)

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_KAKAO_APP_KEY=
EXPO_PUBLIC_NAVER_MAP_CLIENT_ID=      # 지도 렌더링용 (공개 가능)
EXPO_PUBLIC_API_BASE_URL=             # Express 서버 URL
```

### `backend/.env` — 서버 전용 (절대 클라이언트에 두지 않음)

```bash
PORT=3000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# 네이버 API Secret
NAVER_MAP_CLIENT_ID=
NAVER_MAP_CLIENT_SECRET=
NAVER_SEARCH_CLIENT_ID=
NAVER_SEARCH_CLIENT_SECRET=
```

> **규칙**: `EXPO_PUBLIC_` prefix가 붙으면 앱 번들에 그대로 노출된다.  
> Secret 키는 반드시 `backend/.env`에만 두고 Express 서버에서만 사용한다.

---

## 코딩 규칙

### 공통

- TypeScript strict mode, `any` 금지
- 모든 비동기 처리 `try/catch` 필수
- 파일명: 컴포넌트 `PascalCase.tsx`, 유틸/훅/라우트 `camelCase.ts`

### Frontend → 서버 API 호출 (`frontend/lib/api.ts`)

```ts
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function reverseGeocode(lat: number, lng: number) {
  const res = await fetch(`${BASE_URL}/geocode?lat=${lat}&lng=${lng}`);
  if (!res.ok) throw new Error('역지오코딩 실패');
  return res.json();
}

export async function searchPlace(query: string) {
  const res = await fetch(`${BASE_URL}/place?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('장소 검색 실패');
  return res.json();
}
```

### Supabase 쿼리 패턴

```ts
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('couple_id', coupleId);

if (error) throw new Error(error.message);
return data;
```

### Express 라우트 패턴

```ts
router.get('/place', async (req, res, next) => {
  try {
    const { query } = req.query as { query: string };
    // 네이버 API 호출 ...
    res.json(result);
  } catch (err) {
    next(err);
  }
});
```

### Zustand 상태 패턴

```ts
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

## 화면별 구현 순서 (MVP)

### Phase 1 — 인증

- [ ] Supabase 프로젝트 세팅
- [ ] `@react-native-kakao/core` 카카오 OAuth 연동
- [ ] 로그인 화면
- [ ] users 테이블 자동 생성 (Supabase Auth trigger)

### Phase 2 — 커플 매칭

- [ ] `backend/src/routes/invite.ts` — 초대코드 생성/검증 API
- [ ] 커플 매칭 화면 (코드 입력)
- [ ] 기념일 설정 화면
- [ ] "함께한 N일" 홈 표시

### Phase 3 — 게시글 (메타데이터 포함)

- [ ] `frontend/lib/image-metadata.ts` — EXIF 추출 유틸
- [ ] `backend/src/routes/geocode.ts` — 역지오코딩 API
- [ ] `backend/src/routes/place.ts` — 장소 검색 API
- [ ] 업로드 3단계 화면:
  - Step 1: 사진 선택 → 촬영 날짜 + GPS 좌표 추출
  - Step 2: 날짜·장소 자동 입력 확인 (수정 가능)
  - Step 3: 메모 + 업로드
- [ ] Supabase Storage 업로드
- [ ] 피드 화면

### Phase 4 — 탐색

- [ ] 캘린더 뷰 (`react-native-calendars`)
- [ ] 네이버 지도 + 핀 + 클러스터링
- [ ] 게시글 상세 화면

### Phase 5 — QA + 배포

- [ ] 전체 플로우 QA
- [ ] 성능 최적화 (이미지 캐싱, 압축)
- [ ] Render 배포 (backend) + Expo EAS Build (frontend)
- [ ] App Store / Play Store 제출

---

## 자주 쓰는 명령어

```bash
# Frontend 개발 서버
cd frontend && npx expo start

# iOS 시뮬레이터 (네이티브 모듈 포함)
cd frontend && npx expo run:ios

# Backend 개발 서버
cd backend && npm run dev

# EAS 빌드 (개발용)
cd frontend && eas build --profile development --platform all

# Supabase 로컬 개발
supabase start
supabase db push

# 타입 체크
cd frontend && npx tsc --noEmit
cd backend && npx tsc --noEmit

# 린트
npx eslint . --fix
```

---

## 주의사항

- 네이버 지도 SDK · 카카오 SDK는 네이티브 모듈 → Expo Go 불가, `expo run:ios` / EAS Build 필요
- Supabase Storage 업로드 경로: `{couple_id}/{post_id}/{filename}`
- RLS는 모든 테이블에 반드시 활성화
- 이미지 업로드 전 클라이언트 사이드 압축 필수 (`expo-image-manipulator`)
- EXIF GPS 좌표는 DMS(도분초) → 십진도 변환 필요 (`parseGps` 함수 사용)
- iOS `NSPhotoLibraryUsageDescription`, Android `READ_MEDIA_IMAGES` 권한 필요
- iOS 14+ "선택한 사진만" 권한 시 EXIF 읽기 실패 가능 → `expo-media-library`의 `getAssetInfoAsync`로 fallback
- Render 무료 플랜은 비활성 시 서버 슬립 (첫 요청 ~15초 지연) — MVP 단계에서는 허용 범위
