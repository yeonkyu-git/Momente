# 🚀 바이브 코딩 사전 셋팅 지시서

> Claude Code에게 전달하는 프로젝트 초기 셋팅 지시문
> 이 파일을 Claude Code에 붙여넣고 실행한다.

---

## 너의 역할

너는 이 프로젝트의 **시니어 PM**다.
지금부터 바이브 코딩을 시작하기 위한 **사전 환경 셋팅**을 맡아줘.
실제 기능 개발은 하지 않는다. 셋팅만 한다.

---

## 프로젝트 정보

- **앱 이름**: Momente
- **장르**: 커플 전용 비공개 SNS 앱
- **타깃**: 국내 30대 커플
- **핵심 가치**: 둘만 보는 공간, 날짜·지도로 추억 탐색

---

## 지시 사항

아래 순서대로 **하나씩 완료 확인 후 다음 단계**로 넘어가라.

---

### STEP 1 — MCP 설치 및 설정

아래 MCP를 해당 프로젝트에 순서대로 설치하고 정상 동작을 확인한다.

```
1. context7        공식 문서 실시간 참조 (최신 API 오류 방지)
2. supabase        Supabase 스키마 직접 참조
3. github          커밋/PR 자동화
```

각 MCP 설치 완료 후 **동작 확인 결과를 나에게 보고**한다.
설치 실패 시 원인과 대안을 함께 알려준다.

---

### STEP 2 — 폴더 구조 생성
- DEVELOPMENTv2.md 파일을 참조한다.


### STEP 3 — 최상위 CLAUDE.md 작성

`our-memory/CLAUDE.md` 를 아래 조건으로 작성한다.

**조건**
- 60줄 이내
- 전체 프로젝트 맥락, 기술 스택 요약
- 작업 원칙 (기능 단위, 개발은 서브에이전트 사용, 모델은 Haiku)
- Git 브랜치 전략 (`main` / `dev` / `feature/기능명`)
- 커밋 메시지 컨벤션 (`feat:` `fix:` `chore:` `docs:`)
- 보안 금지 항목 (아래 참고)
- 절대 금지 항목 명시

**보안 절대 금지 항목 (반드시 포함)**
```
- .env 파일 내 값을 코드에 하드코딩 금지
- API 키를 클라이언트 사이드에 노출 금지
- RLS 비활성화 상태로 DB 배포 금지
- console.log에 유저 개인정보 출력 금지
- SQL 문자열 직접 조합 금지 (Injection 방지)
- 인증 없이 접근 가능한 API 엔드포인트 생성 금지
- 그 외 보안에 저해되는 모든 행동 금지
```

---

### STEP 4 — 영역별 CLAUDE.md 작성

각 영역 CLAUDE.md를 60줄 이내로 작성한다.
각 파일에는 반드시 **규칙**과 **금지** 섹션이 있어야 한다.

**frontend/CLAUDE.md 포함 내용**
- 컴포넌트 작성 규칙 (함수형, arrow function, Props 타입 필수)
- NativeWind 사용 규칙
- 상태관리 규칙 (Zustand, 전역/로컬 상태 구분)
- 화면 전환 규칙 (React Navigation)
- 금지: any 타입, 인라인 스타일 남용, 하드코딩 텍스트

**backend/CLAUDE.md 포함 내용**
- API 라우트 작성 규칙 (Hono)
- 모든 엔드포인트 JWT 인증 미들웨어 필수
- 에러 핸들링 규칙 (try/catch 필수, 에러 코드 통일)
- 응답 포맷 통일 (`{ data, error, message }`)
- 금지: 인증 없는 엔드포인트, 민감 정보 로그 출력

**db/CLAUDE.md 포함 내용**
- 마이그레이션 파일 네이밍 규칙 (`001_`, `002_` 순번)
- 모든 테이블 RLS 활성화 필수
- 인덱스 작성 규칙
- 금지: RLS 없는 테이블 배포, 직접 운영 DB 수정

---

### STEP 5 — 환경변수 템플릿 작성

`.env.example` 을 아래 내용으로 작성한다.
실제 값은 절대 넣지 않는다. 키 이름과 설명만 작성한다.

```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=                # Supabase 프로젝트 URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=           # Supabase anon key (공개 가능)
SUPABASE_SERVICE_ROLE_KEY=               # Supabase service role (백엔드 전용, 절대 노출 금지)

# 카카오
EXPO_PUBLIC_KAKAO_APP_KEY=               # 카카오 앱 키 (네이티브)
KAKAO_CLIENT_SECRET=                     # 카카오 클라이언트 시크릿 (백엔드 전용)

# 네이버
EXPO_PUBLIC_NAVER_MAP_CLIENT_ID=         # 네이버 지도 클라이언트 ID
NAVER_SEARCH_CLIENT_ID=                  # 네이버 검색 API (백엔드 전용)
NAVER_SEARCH_CLIENT_SECRET=              # 네이버 검색 시크릿 (백엔드 전용)

# 백엔드 서버
JWT_SECRET=                              # JWT 서명 키 (절대 노출 금지, 32자 이상)
PORT=3000
```

---

### STEP 6 — .gitignore 작성

아래 항목을 반드시 포함한다.

```
# 환경변수 (절대 커밋 금지)
.env
.env.local
.env.production

# 의존성
node_modules/
.expo/

# 빌드 결과물
dist/
build/

# OS
.DS_Store
Thumbs.db

# 에디터
.vscode/
.idea/
```

---

### STEP 8 — docs/tasks/ 작업 지시서 작성

`docs/tasks/` 폴더 안에 기능별 작업 지시서를 작성하도록 최상위 CLAUDE.md에 규칙을 작성한다.
각 파일은 아래 형식을 따른다.

```markdown
# TASK-001 카카오 로그인

## 목표
한 줄로 이 기능이 뭔지 설명

## 범위
- 건드리는 파일 목록

## 완료 조건
- [ ] 체크리스트 형식으로 작성

## 주의사항
- 보안 관련 주의사항
- 알려진 이슈
```

6개 파일(001~006) 모두 위 형식으로 작성한다.

---

### STEP 9 — docs/decisions/ 기술 결정 기록

`docs/decisions/001_tech-stack.md` 를 최상위 CLAUDE.md에 규칙을 작성한다.
왜 이 스택을 골랐는지 간단히 기록한다.
나중에 팀원이나 미래의 나 자신이 봤을 때 이해할 수 있게.

---

### STEP 10 — 최종 보고

모든 단계 완료 후 아래 형식으로 보고한다.

```
✅ STEP 1  MCP 설치 완료 (context7, supabase, github)
✅ STEP 2  폴더 구조 생성 완료
✅ STEP 3  최상위 CLAUDE.md 작성 완료
✅ STEP 4  영역별 CLAUDE.md 작성 완료
✅ STEP 5  .env.example 작성 완료
✅ STEP 6  .gitignore 작성 완료
✅ STEP 7  DB 초기 스키마 작성 완료
✅ STEP 8  tasks/ 작업 지시서 작성 완료
✅ STEP 9  decisions/ 기록 완료

🚀 셋팅 완료. 바이브 코딩 시작 준비됨.
다음 단계: tasks/001_auth.md 를 열고 카카오 로그인부터 시작하세요.
```

---

## 전체 원칙

- 한 STEP 실패 시 멈추고 나에게 보고한다. 임의로 넘어가지 않는다.
- 모르는 부분이 있으면 추측하지 말고 나에게 질문한다.
- 파일 생성 시 실제로 내용을 채운다. 빈 파일이나 placeholder는 금지.
- 보안 관련 사항은 어떤 이유로도 타협하지 않는다.