# 프로젝트 필수 명령어

## Git 작업 명령어
- `git status` - 현재 작업 상태 확인
- `git add .` - 변경사항 스테이징
- `git commit -m "메시지"` - 커밋 (한글 메시지 사용)
- `git push` - 원격 저장소에 푸시
- `git pull` - 최신 변경사항 가져오기

## 프로젝트 작업 명령어
### 기획 단계
- `/think-help` - 기획 작업 순서 가이드
- `/think-planning` - 서비스 기획
- `/think-userstory` - 유저스토리 작성

### 설계 단계  
- `/design-help` - 설계 작업 순서 가이드
- `/design-seq-outer` - 외부 시퀀스 설계
- `/design-seq-inner` - 내부 시퀀스 설계
- `/design-api` - API 설계
- `/design-class` - 클래스 설계
- `/design-data` - 데이터 설계

### 개발 단계
- `/develop-help` - 개발 작업 순서 가이드  
- `/develop-dev-backend` - 백엔드 개발
- `/develop-dev-front` - 프론트엔드 개발
- `/develop-test-backend` - 백엔드 테스트

## 문법 검사 명령어
- PlantUML 문법 검사: `check-plantuml.sh` (Mac/Linux)
- Mermaid 문법 검사: `check-mermaid.sh` (Mac/Linux)

## 유틸리티 명령어 (macOS)
- `ls -la` - 상세 파일 목록
- `find . -name "*.puml"` - 파일 검색
- `grep -r "pattern" .` - 텍스트 검색
- `cd` - 디렉토리 이동