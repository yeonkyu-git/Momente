# Backend — 작업 규칙

## API 라우트 작성 규칙 (Express 5)
- 모든 라우트는 `src/routes/` 하위에 파일로 분리한다.
- 파일명: `camelCase.ts` (예: `place.ts`, `geocode.ts`)
- 모든 라우트는 Express Router를 사용하고 `index.ts`에서 마운트한다.

```ts
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    // 로직
    res.json({ data: result, error: null, message: 'ok' });
  } catch (err) {
    next(err);
  }
});

export default router;
```

## 인증 규칙
- 모든 엔드포인트에 `middleware/auth.ts` (Supabase JWT 검증) 미들웨어를 적용한다.
- 공개 엔드포인트는 절대 만들지 않는다.

## 에러 핸들링 규칙
- 모든 비동기 로직은 `try/catch`로 감싼다.
- 에러는 `next(err)`로 넘겨 `middleware/error.ts`에서 일괄 처리한다.

## 응답 포맷 (통일)
```ts
// 성공
res.json({ data: result, error: null, message: 'ok' });
// 실패
res.status(400).json({ data: null, error: 'ERROR_CODE', message: '설명' });
```

## 금지
- 인증 없는 엔드포인트 생성 금지
- `console.log`에 유저 개인정보·토큰 출력 금지
- `SUPABASE_SERVICE_ROLE_KEY` 등 시크릿을 응답에 포함 금지
- SQL 문자열 직접 조합 금지 (Supabase SDK 메서드 사용)
