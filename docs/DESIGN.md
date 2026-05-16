# 🎨 DESIGN.md — 디자인 지시문

> 커플 앨범 SNS 앱 "우리의 기록" 디자인 가이드
> Figma 작업 및 Claude 디자인 기능 사용 시 이 파일을 참고한다.

---

## 디자인 철학

### 핵심 키워드
**따뜻함 · 친밀함 · 단순함**

- 연인이 부담 없이 일상을 올리는 공간 → **완벽하지 않아도 되는 감성**
- 기록이 쌓일수록 소중해지는 느낌 → **추억 앨범 같은 온기**
- 토스처럼 쓸 때 생각 안 해도 되는 UX → **마찰 제로**

### 참고 레퍼런스
| 앱 | 참고 요소 |
|----|----------|
| **토스** | 화면 구조, 타이포그래피 위계, 버튼 스타일, 마이크로카피 |
| **비트윈** | 커플 앱 감성, 기념일 UI |
| **인스타그램** | 피드 카드 레이아웃 |
| **구글 포토** | 날짜별 그루핑, 추억 카드 |

---

## 컬러 시스템

### 브랜드 컬러
```
Primary         #D4537E    따뜻한 로즈핑크 (메인 액션, 강조)
Primary Light   #FBEAF0    연한 핑크 (배경, 태그)
Primary Dark    #993556    진한 핑크 (텍스트 on 컬러배경)
```

### 중립 컬러
```
Black           #1A1A1A    제목, 핵심 텍스트
Gray 700        #4A4A4A    본문 텍스트
Gray 400        #9E9E9E    보조 텍스트, placeholder
Gray 200        #EEEEEE    구분선, 비활성 배경
Gray 100        #F5F5F5    페이지 배경
White           #FFFFFF    카드 배경, 모달
```

### 시맨틱 컬러
```
Success         #4CAF50    완료, 연결됨
Error           #E53935    오류, 경고
Info            #2196F3    안내
```

### 사용 규칙
- Primary는 **탭 1개에 1개** — 과하게 쓰지 않는다
- 배경은 Gray 100, 카드는 White — 계층을 명확히
- 텍스트 on White: Black / Gray 700만 사용
- 텍스트 on Primary: Primary Dark (#993556) 사용

---

## 타이포그래피

### 기본 폰트
```
한글:  Pretendard
영문:  Pretendard (동일)
```

### 위계 시스템
| 용도 | Size | Weight | Color |
|------|------|--------|-------|
| 페이지 제목 | 22sp | Bold (700) | #1A1A1A |
| 섹션 제목 | 18sp | SemiBold (600) | #1A1A1A |
| 카드 제목 | 15sp | Medium (500) | #1A1A1A |
| 본문 | 14sp | Regular (400) | #4A4A4A |
| 보조 텍스트 | 12sp | Regular (400) | #9E9E9E |
| 레이블/태그 | 11sp | Medium (500) | 상황별 |

### 줄간격 (Line Height)
```
제목류:  1.3 × font-size
본문:    1.6 × font-size
```

---

## 컴포넌트 스펙

### 버튼
```
Primary Button
  - 높이: 52dp
  - 배경: #D4537E
  - 텍스트: White, 16sp, SemiBold
  - radius: 14dp
  - 상태: Default / Pressed (opacity 0.85) / Disabled (Gray 200)

Secondary Button
  - 높이: 52dp
  - 배경: #FBEAF0
  - 텍스트: #D4537E, 16sp, SemiBold
  - radius: 14dp

Ghost Button
  - 높이: 44dp
  - 배경: Transparent
  - 텍스트: #9E9E9E, 14sp, Regular
  - 테두리: 없음

Icon Button (원형)
  - 크기: 44×44dp (최소 터치 영역)
  - 배경: Gray 100
  - radius: 999 (원형)
```

### 입력 필드
```
Text Input
  - 높이: 52dp
  - 배경: Gray 100
  - 테두리: 없음 (포커스 시 Primary 1.5dp 하단 라인)
  - radius: 12dp
  - 내부 여백: 수평 16dp
  - placeholder 색: Gray 400

Search Input
  - 높이: 44dp
  - 배경: Gray 100
  - 좌측 아이콘: 검색 아이콘 (Gray 400)
  - radius: 12dp
```

### 카드 (피드)
```
Feed Card
  - 배경: White
  - 그림자: 0 2dp 8dp rgba(0,0,0,0.06)
  - radius: 16dp
  - 이미지 영역: 16:9 비율 (상단)
  - 콘텐츠 영역: 내부 여백 12dp

  구성 요소:
  ┌─────────────────────┐
  │   대표 이미지        │  ← 16:9, radius 16dp (상단만)
  ├─────────────────────┤
  │ 📍 장소명   ·  날짜  │  ← 15sp Bold / 12sp Gray
  │ 메모 한 줄           │  ← 14sp Gray 700, 1줄 truncate
  │ [태그] [태그]   ♥ 2  │  ← 태그 + 하트 반응
  └─────────────────────┘
```

### 바텀 탭
```
높이: 56dp + SafeArea
아이콘: 24×24dp
라벨: 10sp
활성 색: #D4537E
비활성 색: #9E9E9E
배경: White, 상단 구분선 Gray 200 0.5dp

탭 구성:
  피드 (home)  |  캘린더 (calendar)  |  [업로드]  |  지도 (map)  |  MY (person)
                              ↑
                      중앙 FAB 스타일 업로드 버튼
                      크기 52×52dp, Primary 색
```

### 장소 태그 칩
```
높이: 28dp
배경: #FBEAF0
텍스트: #D4537E, 12sp, Medium
좌측 아이콘: 핀 아이콘 12dp
내부 여백: 수평 10dp
radius: 999 (pill)
```

---

## 화면별 레이아웃 가이드

### 공통 여백
```
화면 가로 여백 (Side Padding): 20dp
섹션 간격:                     24dp
카드 간격:                     12dp
```

### 1. 로그인 화면
```
레이아웃: 세로 중앙 정렬, 단일 CTA
구성:
  - 상단 1/3: 앱 로고 + 슬로건
  - 중앙: 빈 공간 (여유)
  - 하단: 카카오 로그인 버튼 (카카오 브랜드 가이드 준수)

마이크로카피:
  슬로건: "우리의 모든 순간을"
  버튼: "카카오로 시작하기"
```

### 2. 커플 매칭 화면
```
레이아웃: One Page One Thing
구성:
  - 상단: 설명 텍스트 (22sp Bold)
  - 중앙: 코드 입력 필드 (큰 글씨, 중앙 정렬)
  - 하단: 
    "코드 입력하기" Primary 버튼
    "초대 링크 공유" Secondary 버튼

마이크로카피:
  제목: "연인의 코드를 입력해주세요"
  입력 placeholder: "6자리 코드"
  버튼: "연결하기"
```

### 3. 피드 화면
```
레이아웃: 스크롤 피드
구성:
  - 상단 고정: "우리 함께 N일 ♥" + 알림 아이콘
  - 피드: Feed Card 리스트 (수직 스크롤)
  - 빈 상태: 일러스트 + "첫 데이트를 기록해볼까요?"
```

### 4. 게시글 업로드 (3단계)
```
Step 1 — 사진/영상 선택
  - 상단: "어떤 순간이었나요?" (22sp Bold)
  - 그리드: 갤러리 3열 그리드
  - 하단: "다음" 버튼 (선택 시 활성화)

Step 2 — 장소 태그
  - 상단: "어디서였나요?" (22sp Bold)
  - 검색바: 네이버 장소 검색
  - 결과: 장소 리스트 (이름 + 주소)
  - 날짜 선택: "언제였나요?" 데이트피커

Step 3 — 완료
  - 미리보기 + 메모 입력 (선택)
  - "올리기" Primary 버튼
```

### 5. 캘린더 화면
```
상단: 월 네비게이터 (< 2026년 5월 >)
캘린더: 월별 그리드
  - 데이트 있는 날: Primary 점 표시
  - 오늘: Primary 배경 원

하단 리스트:
  - 선택한 날짜의 게시글 미리보기 카드들
```

### 6. 지도 화면
```
전체 화면 네이버 지도
  - 핀: Primary 색 커스텀 마커 (사진 썸네일 원형)
  - 클러스터: 핀 개수 뱃지

하단 시트 (기본 접힘):
  - 핀 선택 시 올라오는 게시글 미리보기
```

---

## 애니메이션 & 인터랙션

```
화면 전환:  수평 슬라이드 (기본) / 아래에서 위 (모달)
피드 로드:  스켈레톤 UI → 페이드인
업로드 완료: 체크 애니메이션 (0.3s ease)
하트 반응:  스케일 업 1.3 → 1.0 (bounce, 0.2s)
탭 전환:    아이콘 스케일 1.0 → 1.15 → 1.0 (0.15s)

기준: 모든 트랜지션 200~300ms, ease-out
과도한 애니메이션 금지 — 토스처럼 빠르고 절제
```

---

## 아이콘 가이드

```
스타일: Outlined (선형) 아이콘 일관 사용
크기:
  - 탭바: 24dp
  - 본문 내: 20dp
  - 인라인: 16dp

주요 아이콘 매핑:
  홈/피드       →  home (outline)
  캘린더        →  calendar (outline)
  지도          →  map-pin (outline)
  프로필        →  user (outline)
  업로드        →  plus (solid, 업로드 FAB만 solid)
  하트          →  heart (outline / solid 선택됨)
  장소 핀       →  map-pin
  카메라        →  camera
  갤러리        →  image
  알림          →  bell
```

추천 아이콘 셋: `lucide-react-native` 또는 `@expo/vector-icons` (Feather)

---

## Figma 파일 구조

```
📁 우리의 기록 — Design System
  ├── 🎨 Colors & Typography    # 토큰 정의
  ├── 🧩 Components             # 버튼, 인풋, 카드 등
  └── 📱 Screens
        ├── Auth
        │   ├── 01_Login
        │   └── 02_CoupleMatch
        ├── Main
        │   ├── 03_Feed
        │   ├── 04_Calendar
        │   └── 05_Map
        └── Post
            ├── 06_Upload_Step1
            ├── 07_Upload_Step2
            └── 08_Upload_Step3
```

---

## 디자인 체크리스트

### 화면 작업 전
- [ ] 컬러 토큰을 Figma Variables로 정의했는가?
- [ ] 공통 컴포넌트(버튼, 인풋)를 먼저 만들었는가?

### 화면 작업 중
- [ ] 한 화면에 하나의 주요 액션만 있는가? (One Page One Thing)
- [ ] 최소 터치 영역 44×44dp를 지켰는가?
- [ ] 텍스트 대비율 4.5:1 이상인가? (접근성)
- [ ] 빈 상태(Empty State)를 디자인했는가?
- [ ] 로딩 상태(Skeleton)를 디자인했는가?

### 화면 작업 후
- [ ] iOS Safe Area를 고려했는가? (상단 Status Bar, 하단 Home Indicator)
- [ ] Android에서도 테스트했는가? (폰트 크기, 여백 차이)
- [ ] 개발자 핸드오프 전 컴포넌트 명칭이 코드와 일치하는가?
