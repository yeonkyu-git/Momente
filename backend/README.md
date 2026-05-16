# Momente Backend

Express 5 + TypeScript 기반 Momente 백엔드 서버

## 요구 환경

- Node.js 20 LTS 이상

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (핫 리로드)
npm run dev

# 타입 체크
npm run typecheck

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start
```

## 환경변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성하세요.

```bash
cp .env.example .env
```

필수 변수:
- `PORT`: 서버 포트 (기본값: 3000)
- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role 키

선택 변수 (외부 API 연동):
- `NAVER_MAP_CLIENT_ID`, `NAVER_MAP_CLIENT_SECRET`: 네이버 지도 API
- `NAVER_SEARCH_CLIENT_ID`, `NAVER_SEARCH_CLIENT_SECRET`: 네이버 검색 API

외부 API 키가 미발급 상태라면 헬스체크(`GET /health`)만 동작합니다.

## API 응답 포맷

모든 API 응답은 통일된 포맷을 사용합니다.

```json
{
  "data": { ... },
  "error": null,
  "message": "ok"
}
```

에러 응답:

```json
{
  "data": null,
  "error": "ERROR_CODE",
  "message": "에러 설명"
}
```

## 구조

```
src/
├── index.ts              # 앱 진입점
├── middleware/
│   ├── auth.ts           # Supabase JWT 검증
│   └── error.ts          # 에러 핸들링
├── routes/               # API 라우트 (예정)
│   ├── place.ts          # 네이버 장소 검색
│   ├── geocode.ts        # 역지오코딩
│   ├── invite.ts         # 초대코드
│   └── push.ts           # 푸시 알림
└── lib/
    ├── supabase.ts       # Supabase 클라이언트
    └── naver.ts          # 네이버 API 클라이언트
```

## 참고

- 모든 라우트는 Supabase JWT 인증을 필요로 합니다. (헬스체크 제외)
- 환경변수는 `.env`에만 저장하며, 절대 코드에 하드코딩하지 않습니다.
- 시크릿 키는 응답에 포함되지 않습니다.
