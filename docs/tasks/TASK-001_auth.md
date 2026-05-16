# TASK-001 카카오 로그인

## 목표
카카오 OAuth를 통해 사용자가 로그인하고, Supabase Auth와 연동하여 세션을 관리한다.

## 범위
- `frontend/app/(auth)/login.tsx`
- `frontend/lib/kakao.ts`
- `frontend/lib/supabase.ts`
- `frontend/stores/auth.store.ts`
- `db/migrations/001_users.sql`

## 완료 조건
- [ ] 카카오 로그인 버튼 탭 → 카카오 인증 화면 이동
- [ ] 인증 성공 시 Supabase Auth에 세션 생성
- [ ] `users` 테이블에 신규 유저 자동 생성 (Supabase trigger)
- [ ] 로그인 상태 `auth.store.ts`에 저장
- [ ] 앱 재시작 시 세션 자동 복원 (AsyncStorage)
- [ ] 로그인 실패 시 에러 메시지 표시

## 주의사항
- `@react-native-kakao/core`는 네이티브 모듈 — Expo Go 불가, `expo run:ios` 필요
- `EXPO_PUBLIC_KAKAO_APP_KEY`는 클라이언트에 두어도 되나, `KAKAO_CLIENT_SECRET`은 백엔드 전용
- Supabase Auth trigger로 `users` 테이블 자동 생성 로직 필요
