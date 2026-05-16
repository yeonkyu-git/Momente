# TASK-005 캘린더 & 지도 뷰

## 목표
날짜별로 게시글을 탐색하는 캘린더 뷰와, 장소 기반으로 핀을 찍어 탐색하는 지도 뷰를 구현한다.

## 범위
- `frontend/app/(tabs)/calendar.tsx`
- `frontend/app/(tabs)/map.tsx`
- `frontend/components/map/` (MapPin, Cluster 등)
- `frontend/lib/naver-map.ts`

## 완료 조건
- [ ] **캘린더**: 게시글이 있는 날짜에 닷(dot) 표시
- [ ] **캘린더**: 날짜 탭 시 해당일 게시글 목록 하단 시트로 표시
- [ ] **지도**: 네이버 지도 렌더링 (`react-native-naver-map`)
- [ ] **지도**: 게시글의 `place_lat`, `place_lng` 기반 핀 표시
- [ ] **지도**: 핀 탭 시 게시글 썸네일 미리보기
- [ ] **지도**: 가까운 핀 클러스터링 처리
- [ ] 핀 또는 캘린더 항목 탭 시 게시글 상세로 이동

## 주의사항
- `react-native-naver-map`은 네이티브 모듈 — Expo Go 불가, `expo run:ios` 필요
- `EXPO_PUBLIC_NAVER_MAP_CLIENT_ID`는 클라이언트에 허용되는 값
- 지도 핀 데이터는 전체 게시글의 좌표만 경량 조회 (미디어 URL 등 불필요한 컬럼 제외)
