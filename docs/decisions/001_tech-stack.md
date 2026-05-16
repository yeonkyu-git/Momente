# 001 — 기술 스택 결정

## 결정 요약
커플 전용 SNS 앱 Momente의 기술 스택을 아래와 같이 결정한다.

---

## Frontend: React Native + Expo

**선택 이유**
- iOS/Android 동시 지원이 필수인데, 네이티브 대비 개발 속도가 2–3배 빠름
- Expo SDK로 카메라, 갤러리, 푸시 알림 등 네이티브 기능을 빠르게 통합 가능
- TypeScript + Expo Router v3의 파일 기반 라우팅으로 구조가 명확함

**트레이드오프**
- 카카오 SDK, 네이버 지도는 네이티브 모듈 → Expo Go 불가, EAS Build 필요
- 순수 네이티브 대비 성능 한계가 있으나 SNS 앱 수준에서는 문제 없음

---

## Backend: Node.js + Express 5

**선택 이유**
- 네이버 API(장소 검색, 역지오코딩)를 클라이언트에 직접 노출하면 시크릿 키가 유출됨
- 초대코드 생성/검증, 푸시 알림 발송 등 서버 사이드 로직이 필요
- Express는 학습 곡선이 낮고 Render 무료 플랜 배포가 즉시 가능

**트레이드오프**
- Render 무료 플랜은 비활성 시 슬립(첫 요청 ~15초 지연) — MVP 단계에서는 허용

---

## DB: Supabase (PostgreSQL)

**선택 이유**
- PostgreSQL RLS로 커플 단위 데이터 접근 제어를 DB 레벨에서 강제 가능
- Auth(카카오 OAuth), Storage(이미지), Realtime(하트 알림) 모두 내장
- 별도 서버 없이 클라이언트에서 안전하게 직접 쿼리 가능 (anon key + RLS)

**트레이드오프**
- Supabase 무료 플랜은 비활성 프로젝트 일시 정지 가능 — 초기엔 주의

---

## 상태 관리: Zustand

**선택 이유**
- Redux 대비 보일러플레이트가 적고 TypeScript 친화적
- 커플 SNS 특성상 복잡한 상태 트리가 없어 가벼운 라이브러리로 충분

---

## CSS: NativeWind v4

**선택 이유**
- Tailwind CSS 문법을 그대로 React Native에 적용 가능
- 디자인 토큰(색상, 간격)을 `tailwind.config.js` 한 곳에서 관리
- 인라인 스타일 남용 없이 일관된 UI 유지
