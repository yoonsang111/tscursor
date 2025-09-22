# 투어 스트림 (Tour Stream)

투어 상품을 검색하고 탐색할 수 있는 React 애플리케이션입니다.

## 기능

- 투어 상품 목록 표시
- 실시간 검색 기능
- 반응형 디자인
- TypeScript 지원

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

3. 브라우저에서 `http://localhost:3000` 접속

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- React Hooks

## 프로젝트 구조

```
mocktourstream/
├── components/          # React 컴포넌트
│   ├── ProductCard.tsx
│   └── SearchBar.tsx
├── mock/               # 목 데이터
│   └── products.ts
├── public/             # 정적 파일
│   └── index.html
├── src/                # 소스 코드
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
``` 