# TASK-004 피드 화면

## 목표
커플이 공유한 게시글을 최신순으로 보여주는 피드 화면을 구현한다.

## 범위
- `frontend/app/(tabs)/feed.tsx`
- `frontend/components/feed/` (FeedCard, FeedList 등)
- `frontend/stores/post.store.ts`
- `frontend/lib/supabase.ts` (posts 쿼리)

## 완료 조건
- [ ] 커플의 게시글 목록 최신순 조회 (Supabase RLS 적용 상태)
- [ ] FeedCard 컴포넌트: 이미지, 날짜, 장소명, 메모 표시
- [ ] 하트 반응 버튼 — 탭 시 토글, Supabase Realtime으로 상대방에게 반영
- [ ] 무한 스크롤 페이지네이션 (20개씩)
- [ ] 게시글 탭 시 상세 화면(`post/[id].tsx`)으로 이동
- [ ] 빈 상태 화면 (게시글 없을 때 안내 메시지)

## 주의사항
- RLS: `couple_id`가 현재 유저의 커플에 속하는 게시글만 조회됨을 확인
- 이미지 로딩은 `expo-image`의 `contentFit="cover"` + `transition` 사용
- 하트 반응은 `reactions` 테이블에 저장, Supabase Realtime으로 구독
