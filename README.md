# CheckUS

CheckUS 프로젝트는 Spring Boot 백엔드와 React 프론트엔드를 모노레포로 관리하는 교육 과제 관리 시스템입니다.

## 프로젝트 구조

```
CheckUS/
├── backend/          # Spring Boot 백엔드
├── student-mobile/         # 학생용 React 프론트엔드
├── teacher-web/      # 교사용 React 프론트엔드
├── schema.sql        # 데이터베이스 스키마
└── ...
```

## 개발 환경
- **백엔드**: Java 21, Spring Boot 3.2.0
- **프론트엔드**: TypeScript, React 18
- **데이터베이스**: MySQL
- **빌드 도구**: Gradle, npm

## 시작하기

### 백엔드 (Spring Boot)

```bash
cd backend
./gradlew bootRun
```

### 학생용 프론트엔드 (React)

```bash
cd student-mobile
npm install
npm start
```

### 교사용 프론트엔드 (React)

```bash
cd teacher-web
npm install
npm run dev
```

## 주요 기능

### 교사용 웹 (teacher-web)

1. **과제 관리 시스템**
   - 과제의 계층적 구조 관리 (카테고리 및 실제 과제)
   - 과제 유형별 분류 및 탭 기반 접근
   - 트리 구조로 과제 계층 시각화

2. **과제 생성 및 편집**
   - 상세 과제 정보 입력 (제목, 설명, 유형, 자료 등)
   - 부모-자식 관계 설정을 통한 과제 계층화

3. **일괄 과제 업로드**
   - 엑셀 파일을 통한 다수 과제 동시 업로드
   - 데이터 유효성 검사 및 미리보기
   - 템플릿 다운로드 지원

### 학생용 웹 (frontend)

*추가 예정*

## 개발 가이드라인

- 백엔드와 프론트엔드의 의존성은 각각의 디렉토리에서 독립적으로 관리합니다.
- 공통 설정이나 공유 라이브러리는 루트 레벨에서 설정합니다.
- 교사용 웹과 학생용 웹은 별도로 개발되지만, 동일한 백엔드 API를 사용합니다. 