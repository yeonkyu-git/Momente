# TASK-006 프로필 & 푸시 알림

## 목표
프로필/설정 화면을 구현하고, 상대방이 하트 반응 시 푸시 알림을 발송하는 기능을 추가한다.

## 범위
- `frontend/app/(tabs)/profile.tsx`
- `backend/src/routes/push.ts`
- `frontend/lib/supabase.ts` (users 업데이트)

## 완료 조건
- [ ] 프로필 화면: 닉네임, 아바타 표시 및 수정 가능
- [ ] 기념일 표시 및 수정 가능
- [ ] "함께한 N일" 표시
- [ ] 로그아웃 버튼 (Supabase Auth 세션 종료)
- [ ] `expo-notifications`로 푸시 토큰 등록, `users.push_token` 저장
- [ ] 하트 반응 시 `POST /push` 호출 → 상대방에게 Expo Push 알림 발송
- [ ] 알림 수신 시 해당 게시글 상세로 딥링크

## 주의사항
- iOS는 푸시 알림 권한 요청 UI가 반드시 필요 (거부 시 graceful degradation)
- `expo-server-sdk`는 백엔드에서만 사용 — 클라이언트에서 직접 Expo Push API 호출 금지
- 로그아웃 시 `push_token` DB에서 삭제 (불필요한 알림 방지)
