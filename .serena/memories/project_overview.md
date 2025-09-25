# 온라인 핸드폰 구매 사이트 프로젝트

## 프로젝트 목적
간편하게 가성비 좋은 핸드폰을 구매하고 싶은 소비자를 위한 온라인 쇼핑몰 구축

## 기술 스택
- **아키텍처**: 마이크로서비스 아키텍처
- **문서화**: PlantUML (!theme mono), OpenAPI 3.0
- **다이어그램**: Mermaid, PlantUML
- **클라우드**: 클라우드 디자인 패턴 적용
- **캐싱**: Redis 우선 전략
- **데이터베이스**: PostgreSQL
- **인증**: JWT 토큰 기반
- **프론트엔드**: React/Vue.js (모바일 최적화)
- **백엔드**: Node.js/Spring

## 팀 구성
- Product Owner: 김민수(민스) - 이커머스 기획 전문
- UX/UI Designer: 박지영(지유) - 모바일 UX 전문  
- Frontend Developer: 이준호(준스) - React/Vue.js 전문
- Backend Developer: 최은지(은지) - Node.js/Spring 전문
- Data Analyst: 정현우(현우) - 추천시스템 전문
- QA Engineer: 한소영(소영) - 자동화 테스트 전문

## 프로젝트 구조
```
/design/
├── userstory.md (유저스토리)
├── uiux/ (UI/UX 설계 및 프로토타입)
├── pattern/ (아키텍처 패턴)
├── backend/
│   ├── logical/ (논리 아키텍처)
│   └── sequence/outer/ (외부 시퀀스)
/think/ (기획 문서들)
/claude/ (가이드 및 참조 문서)
```