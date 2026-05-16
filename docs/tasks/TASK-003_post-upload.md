# TASK-003 게시글 업로드 (3단계)

## 목표
갤러리에서 사진을 선택하면 EXIF 메타데이터를 자동 추출하여 날짜·장소를 채우고, 3단계 플로우로 게시글을 업로드한다.

## 범위
- `frontend/app/post/upload.tsx` — Step 1: 사진 선택 + EXIF 추출
- `frontend/app/post/place.tsx` — Step 2: 날짜·장소 확인 및 수정
- `frontend/app/post/memo.tsx` — Step 3: 메모 입력 + 최종 업로드
- `frontend/lib/image-metadata.ts` — EXIF 파싱 유틸
- `backend/src/routes/geocode.ts` — 역지오코딩 API
- `backend/src/routes/place.ts` — 장소 검색 API
- `db/migrations/003_posts.sql`

## 완료 조건
- [ ] 갤러리 사진 선택 시 `DateTimeOriginal` → `date_at` 자동 입력
- [ ] GPS 좌표 보유 시 `POST /geocode` 호출 → 장소명 자동 입력
- [ ] GPS 없을 시 장소 검색(`POST /place`) 직접 입력 가능
- [ ] 날짜·장소 수정 가능
- [ ] 메모 입력 (선택)
- [ ] 업로드 전 `expo-image-manipulator`로 이미지 압축
- [ ] Supabase Storage 업로드 경로: `{couple_id}/{post_id}/{filename}`
- [ ] `posts` 테이블에 데이터 저장

## 주의사항
- iOS 14+ "선택한 사진만" 권한 시 EXIF 읽기 실패 가능 → `expo-media-library`의 `getAssetInfoAsync`로 fallback
- EXIF GPS는 DMS(도분초) → 십진도 변환 필요 (`parseGps` 함수)
- 네이버 검색·지오코딩 API는 백엔드 프록시(`/place`, `/geocode`)를 통해서만 호출
- iOS `NSPhotoLibraryUsageDescription`, Android `READ_MEDIA_IMAGES` 권한 필요
