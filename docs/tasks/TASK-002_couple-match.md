# TASK-002 커플 매칭

## 목표
초대코드를 생성하고 상대방이 입력하면 커플로 연결되는 매칭 기능을 구현한다.

## 범위
- `frontend/app/(auth)/couple-match.tsx`
- `frontend/stores/couple.store.ts`
- `backend/src/routes/invite.ts`
- `db/migrations/002_couples.sql`

## 완료 조건
- [ ] 내 초대코드 생성 및 화면 표시 (복사 버튼 포함)
- [ ] 상대방 초대코드 입력 필드 및 확인 버튼
- [ ] `POST /invite/generate` — 초대코드 생성 API (JWT 인증 필수)
- [ ] `POST /invite/verify` — 코드 검증 및 커플 테이블 생성 API
- [ ] 매칭 성공 시 기념일 설정 화면으로 이동
- [ ] 매칭 완료 후 `couple.store.ts`에 couple 정보 저장

## 주의사항
- 초대코드는 1회용 — 매칭 완료 후 무효화 처리 필요
- 이미 커플 연결된 유저는 재매칭 불가 처리
- `backend/src/routes/invite.ts`에서만 초대코드 생성/검증 (클라이언트 직접 DB 접근 금지)
