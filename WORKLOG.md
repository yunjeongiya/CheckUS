# CheckUS 프로젝트 작업 내역

## 프로젝트 정보
- **프로젝트명**: CheckUS
- **레포지토리**: https://github.com/yunjeongiya/CheckUS
- **설명**: Spring Boot 백엔드와 React 프론트엔드를 모노레포로 관리하는 검증 시스템

## 작업 내역

### 2025-05-01: 학생 프로필 관리 기능 구현
- [x] 학생 프로필 관련 엔티티 구현
  - [x] StudentProfile 엔티티 클래스 구현
  - [x] School 엔티티 클래스 구현
- [x] Repository 구현
  - [x] StudentProfileRepository 구현
  - [x] SchoolRepository 구현
- [x] 서비스 계층 구현
  - [x] StudentProfileService 구현
  - [x] SchoolService 구현
- [x] REST API 구현
  - [x] StudentProfileController 구현
  - [x] SchoolController 구현
- [x] 보안 유틸리티 구현
  - [x] SecurityUtils 클래스 구현 (사용자 권한 검사 유틸리티)
- [x] Git 브랜치 관리
  - [x] feature/student-profile 브랜치 생성 및 작업

### 2025-05-01: Spring Security 및 JWT 인증 구현
- [x] Spring Security 설정
  - [x] SecurityConfig 클래스 구현
  - [x] JWT 인증 구현
    - [x] JwtTokenProvider 클래스 구현
    - [x] JwtAuthenticationFilter 클래스 구현
    - [x] JwtAuthenticationEntryPoint 클래스 구현
  - [x] 역할 기반 권한 관리 구현
    - [x] CustomUserDetails 클래스 구현
    - [x] CustomUserDetailsService 클래스 구현
- [x] User 관련 REST API 구현
  - [x] 회원가입 API (AuthController)
  - [x] 로그인 API (AuthController)
  - [x] 사용자 정보 조회 API (AuthController)
- [x] Git 브랜치 관리 설정
  - [x] develop 브랜치 생성
  - [x] feature/spring-security-config 브랜치 생성 및 작업
  - [x] PR을 통한 작업 내역 관리

### 2025-05-01: 프로젝트 초기 설정
- [x] 프로젝트 기본 구조 설정
  - [x] 루트 레벨 `.gitignore`, `README.md`, `package.json`, `settings.gradle` 생성
  - [x] GitHub 레포지토리 생성 및 연결
- [x] 백엔드 기본 구조 설정
  - [x] Spring Boot 프로젝트 설정 (`build.gradle`)
  - [x] 애플리케이션 기본 클래스 (`CheckUsApplication.java`)
  - [x] 환경 설정 파일 (`application.yml`)
  - [x] 패키지 구조 생성 (domain, repository, service, controller 등)
  - [x] 기본 엔티티 클래스 (User, Role, Permission)
- [x] 프론트엔드 기본 구조 설정
  - [x] React 프로젝트 설정 (`package.json`, `tsconfig.json`)
  - [x] 기본 파일 구조 생성 (App.tsx, index.tsx 등)
  - [x] 컴포넌트 디렉토리 구조 구성
  - [x] API 서비스 및 인증 서비스 생성
  - [x] 기본 페이지 컴포넌트 (Login) 추가

## 향후 작업 계획

### 백엔드
- [x] User 관련 REST API 구현
  - [x] 회원가입 API
  - [x] 로그인 API
  - [x] 사용자 정보 조회 API
- [x] Spring Security 설정
  - [x] JWT 인증 구현
  - [x] 역할 기반 권한 관리 구현
- [x] 추가 엔티티 구현
  - [x] StudentProfile 엔티티
  - [x] School 엔티티
  - [ ] Class 엔티티
  - [ ] WeeklySchedule 엔티티
  - [ ] StudyTime 관련 엔티티
  - [ ] Task 관련 엔티티
- [ ] 단위 테스트 및 통합 테스트 작성

### 프론트엔드
- [ ] 라우팅 설정
  - [ ] 로그인/인증 관련 라우트
  - [ ] 역할별 라우트 (학생, 교사, 보호자)
- [ ] 컴포넌트 구현
  - [ ] 대시보드 페이지
  - [ ] 프로필 페이지
  - [ ] 학생 스케줄 관리 페이지
  - [ ] 교사 관리 페이지
  - [ ] 보호자 뷰 페이지
- [ ] 상태 관리 시스템 통합 (Context API 또는 Redux)
- [ ] 스타일링 시스템 설정 (CSS 프레임워크 선택 및 구현)

### 인프라 & 배포
- [ ] CI/CD 파이프라인 설정
- [ ] 개발/테스트/운영 환경 분리
- [ ] 데이터베이스 마이그레이션 시스템 구축

## 개발 환경
- **백엔드**: Java 17, Spring Boot 3.2.0
- **프론트엔드**: TypeScript, React 18
- **데이터베이스**: MySQL
- **빌드 도구**: Gradle, npm

## 참고사항
- `schema.sql` 파일에는 데이터베이스 스키마가 정의되어 있음
- `ERD.erd` 파일에는 ERD 다이어그램이 저장되어 있음
- 환경 변수 및 배포 관련 정보는 별도의 문서에서 관리할 예정

---

최종 업데이트: 2025-05-01 (학생 프로필 관리 기능 구현 완료)