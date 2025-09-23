---
command: "/develop-help"
description: "개발 작업 순서 가이드"
---

## 개발 작업 순서

### 1단계: 백킹 서비스 준비
**데이터베이스:**
- `/develop-db-guide` - 데이터베이스 설치계획서 작성
- `/develop-db-install` - 데이터베이스 설치 수행
- `/develop-db-remove` - 데이터베이스 제거 (필요시)

**Message Queue:**
- `/develop-mq-guide` - MQ 설치계획서 작성
- `/develop-mq-install` - MQ 설치 수행 (필요시)
- `/develop-mq-remove` - MQ 제거 (필요시)

### 2단계: 백엔드 개발
**명령어:**
- `/develop-dev-backend` - 백엔드 개발 수행
- `/develop-fix-backend` - 백엔드 오류 해결
- `/develop-make-run-profile` - 서비스 실행파일 작성
- `/develop-test-backend` - 백엔드 테스트 수행

### 3단계: 프론트엔드 개발
**명령어:**
- `/develop-dev-front` - 프론트엔드 개발 수행

---

📝 **참고:** 백킹 서비스부터 차례대로 구축하여 안정적인 개발 환경을 구성하세요.