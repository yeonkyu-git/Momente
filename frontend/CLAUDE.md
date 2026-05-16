# Frontend — 작업 규칙

## 컴포넌트 작성 규칙
- 함수형 컴포넌트 + arrow function 형식으로 작성한다.
- Props 타입은 반드시 interface로 선언한다.
- 파일명: 컴포넌트는 `PascalCase.tsx`, 유틸/훅은 `camelCase.ts`

```tsx
interface Props {
  label: string;
  onPress: () => void;
}

const Button = ({ label, onPress }: Props) => { ... };
export default Button;
```

## NativeWind 사용 규칙
- 스타일은 `className` prop으로만 작성한다.
- 커스텀 컬러는 `tailwind.config.js`에 정의된 토큰을 사용한다.
- 반응형 레이아웃은 `flex` + `gap-*` 조합으로 처리한다.

## 상태 관리 규칙 (Zustand)
- 전역 상태는 `stores/` 하위 store 파일로 관리한다.
- 컴포넌트 로컬 상태는 `useState`로 처리한다.
- store 파일명: `{도메인}.store.ts`

## 화면 전환 규칙 (Expo Router v3)
- 라우팅은 `app/` 디렉터리 파일 기반으로만 처리한다.
- 이동: `router.push()`, 교체: `router.replace()`, 뒤로: `router.back()`

## 금지
- `any` 타입 사용 금지
- 인라인 스타일(`style={{...}}`) 남용 금지 — className 사용
- 하드코딩 텍스트 금지 — `constants/` 또는 변수로 분리
- `EXPO_PUBLIC_` 없는 시크릿 키를 클라이언트에 두는 것 금지
