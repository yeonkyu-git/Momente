# Momente — 프로젝트 컨텍스트

## 프로젝트 개요
- **앱 이름**: Momente | 커플 전용 비공개 SNS 앱
- **타깃**: 국내 30대 커플 | 핵심 가치: 둘만 보는 공간, 날짜·지도로 추억 탐색

## 기술 스택
- **Frontend**: React Native + Expo SDK 51 + TypeScript (strict) + Expo Router v3 + Zustand + NativeWind v4
- **Backend**: Node.js 20 + Express 5 + TypeScript (Render 배포)
- **DB**: PostgreSQL (Supabase) + Auth + Storage + Realtime
- **외부 API**: 네이버 장소검색·역지오코딩, 카카오 OAuth, Expo Push

## 작업 원칙
- 기능 단위로 작업한다. 한 번에 하나의 feature만 건드린다.
- 개발 작업은 서브에이전트를 사용한다. 모델은 Haiku를 사용하며, frontend/, backend/, db/ 아래에 CLAUDE.md 지시문을 서브에이전트에게 참조하게 한다.
- UIUX 디자인은 design아래의 이미지를 참조하여, 프론트 엔드 서브에이전트에게 명확히 지시한다.
- 새 기능은 반드시 `docs/tasks/TASK-NNN_기능명.md`를 먼저 작성한다.
- 기술 결정은 `docs/decisions/NNN_제목.md`에 기록한다.
- 사용자의 의사결정 또는 작업이 필요한 경우 멈추고 사용자에게 질의한다.

## Git 브랜치 전략
- `main` — 배포 가능한 상태만 병합
- `dev` — 개발 통합 브랜치
- `feature/기능명` — 기능 단위 브랜치 (dev에서 분기, dev로 PR)

## 커밋 메시지 컨벤션
```
feat:  새 기능
fix:   버그 수정
chore: 설정·의존성·잡무
docs:  문서 변경
```

## 보안 절대 금지
- `.env` 파일 내 값을 코드에 하드코딩 금지
- API 키를 클라이언트 사이드에 노출 금지
- RLS 비활성화 상태로 DB 배포 금지
- `console.log`에 유저 개인정보 출력 금지
- SQL 문자열 직접 조합 금지 (Injection 방지)
- 인증 없이 접근 가능한 API 엔드포인트 생성 금지

## 절대 금지
- `any` 타입 사용 금지
- 빈 파일 또는 placeholder 파일 생성 금지
- 인라인 스타일 남용 금지 (NativeWind className 사용)
- 하드코딩 텍스트 금지 (상수 또는 i18n 처리)
