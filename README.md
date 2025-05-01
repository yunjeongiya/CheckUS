# CheckUS

CheckUS 프로젝트는 Spring Boot 백엔드와 React 프론트엔드를 모노레포로 관리하는 프로젝트입니다.

## 프로젝트 구조

```
CheckUS/
├── backend/          # Spring Boot 백엔드
├── frontend/         # React 프론트엔드
├── schema.sql        # 데이터베이스 스키마
├── ERD.erd           # ERD 다이어그램
└── ...
```

## 시작하기

### 백엔드 (Spring Boot)

```bash
cd backend
./gradlew bootRun
```

### 프론트엔드 (React)

```bash
cd frontend
npm install
npm start
```

## 개발 가이드라인

- 백엔드와 프론트엔드의 의존성은 각각의 디렉토리에서 독립적으로 관리합니다.
- 공통 설정이나 공유 라이브러리는 루트 레벨에서 설정합니다.
