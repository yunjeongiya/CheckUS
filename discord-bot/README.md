# CheckUS Discord Bot 개발 문서

## 1. 프로젝트 구조

```
discord-bot/
├── commands/             # 슬래시 커맨드 정의 폴더
│   └── ping.js           # 핑 커맨드 예제
├── .gitignore            # Git 무시 파일 목록
├── deploy-commands.js    # 슬래시 커맨드 등록 스크립트
├── index.js              # 메인 봇 파일
├── package.json          # 프로젝트 설정 및 의존성
└── README.md             # 설치 및 실행 가이드
```

## 2. 기술 스택

- **Node.js**: JavaScript 런타임
- **discord.js**: 디스코드 API 상호작용 라이브러리
- **dotenv**: 환경 변수 관리
- **nodemon**: 개발 시 자동 재시작

## 3. 코어 기능 구현 현황

### 3.1. 봇 초기화 및 이벤트 처리 (`index.js`)

- 필요한 Discord.js 인텐트 설정:
  - `Guilds`: 서버 정보 접근
  - `GuildMessages`: 메시지 이벤트 접근
  - `MessageContent`: 메시지 내용 접근
  - `GuildMembers`: 멤버 정보 접근
- 봇 시작 시 콘솔 로그 출력
- 커맨드 동적 로딩 구현
- 인터랙션(슬래시 커맨드) 처리 로직
- 기본 메시지 응답 로직 (`ping` → `Pong!`)

### 3.2. 슬래시 커맨드 시스템

- 슬래시 커맨드 등록 스크립트 구현 (`deploy-commands.js`)
  - 커맨드 파일 동적 로드
  - Discord API로 커맨드 등록 
- 커맨드 구조 (`commands/ping.js`):
  - 명령어 이름과 설명 정의
  - 실행 로직 구현

### 3.3. 환경 변수

- `.env` 파일 (버전 관리에서 제외)을 통한 비밀 정보 관리:
  - `DISCORD_TOKEN`: 봇 인증 토큰
  - `CLIENT_ID`: 애플리케이션 ID
  - `GUILD_ID`: 테스트 서버 ID

## 4. 실행 방법

### 4.1. 개발 환경 설정

1. 디스코드 개발자 포털에서 봇 생성:
   - https://discord.com/developers/applications 에서 New Application
   - Bot 섹션에서 봇 추가
   - 필요한 인텐트(Privileged Gateway Intents) 활성화
   - 토큰, 애플리케이션 ID 복사

2. 환경 변수 설정:
   - `.env` 파일 생성:
     ```
     DISCORD_TOKEN=your_token_here
     CLIENT_ID=your_client_id_here
     GUILD_ID=your_guild_id_here
     ```

3. 의존성 설치:
   ```
   npm install
   ```

### 4.2. 커맨드 등록

슬래시 커맨드를 디스코드 서버에 등록:
```
node deploy-commands.js
```

### 4.3. 봇 실행

개발 모드(자동 재시작):
```
npm run dev
```

일반 실행:
```
npm start
```

## 5. 디버깅 및 모니터링

- 콘솔 로그를 통한 상태 확인
- API 에러 발생 시 오류 메시지 출력
- 커맨드 실행 시 처리 과정 추적

## 6. 다음 개발 계획

- 추가 슬래시 커맨드 구현
- 데이터베이스 연동
- 에러 처리 및 로깅 개선
- 권한 관리 시스템 추가
- 기획서 요구사항에 따른 기능 구현 