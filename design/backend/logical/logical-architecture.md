# 온라인 핸드폰 구매 사이트 - 논리 아키텍처 설계서

## 개요

### 설계 원칙
본 논리 아키텍처는 다음 원칙을 기반으로 설계되었습니다:

- **유저스토리 기반**: 정의된 유저스토리와 1:1 매칭하여 불필요한 추가 설계 방지
- **클라우드 아키텍처 패턴 적용**: Circuit Breaker, CQRS, Cache-Aside 등 선정된 패턴 적용
- **마이크로서비스 독립성**: 서비스별 독립 배포 및 확장성 보장
- **성능 우선**: 5초 이내 가성비 점수 계산 등 핵심 성능 요구사항 충족

### 핵심 컴포넌트 정의

#### 1. **API Gateway** - 통합 진입점
- **역할**: 모든 클라이언트 요청의 단일 진입점
- **기능**: 라우팅, 인증, Rate Limiting, 로깅
- **적용 패턴**: API Gateway 패턴

#### 2. **서비스 계층**
- **Product Service**: 상품 검색, 필터링, 재고 관리
- **Score Service**: 가성비 점수 계산 (CQRS 패턴 적용)
- **User Service**: 인증/인가, 개인화 설정
- **Recommendation Service**: 개인화 추천 엔진
- **Order Service**: 주문/결제 처리 (Saga 패턴 적용)
- **Feedback Service**: 피드백 수집 및 분석

#### 3. **데이터 계층**
- **캐시 계층**: Redis 클러스터 (Cache-Aside 패턴)
- **데이터베이스**: 서비스별 독립 데이터베이스 (Database per Service)
- **메시지 큐**: 비동기 처리 및 이벤트 드리븐 아키텍처

#### 4. **외부 통합 계층**
- **외부 API**: 가격, 리뷰, 성능 정보 수집
- **Circuit Breaker**: 외부 API 장애 격리
- **PG 연동**: 결제 게이트웨이 통합

---

## 서비스 아키텍처

### 서비스별 책임

#### 📱 Product Service
**핵심 책임**:
- 상품 검색 및 필터링 (UFR-PROD-010, UFR-PROD-020)
- 실시간 재고 확인 (UFR-PROD-030)
- 상품 상세 정보 제공 (UFR-PROD-040)

**데이터 관리**:
- 상품 카탈로그 (상품명, 사양, 이미지)
- 실시간 재고 수량
- 상품 카테고리 및 브랜드 정보

#### ⚡ Score Service (핵심 차별화)
**핵심 책임**:
- 가성비 점수 자동 계산 (UFR-SCOR-010)
- 실시간 정보 반영 (UFR-SCOR-020)
- 점수 상세 분석 제공 (UFR-SCOR-030)
- 점수 이력 관리 (UFR-SCOR-040)

**CQRS 패턴 적용**:
- **Write Model**: 복잡한 계산 로직, 외부 API 호출
- **Read Model**: 최적화된 조회, 캐시 활용

#### 👤 User Service
**핵심 책임**:
- 사용자 인증/인가 (UFR-USER-010, UFR-USER-020)
- 개인화 가중치 설정 (UFR-USER-030)
- 사용자 프로필 관리

**보안 관리**:
- JWT 기반 인증
- 소셜 로그인 통합
- 개인정보 보호

#### 🎯 Recommendation Service
**핵심 책임**:
- 개인화 상품 추천 (UFR-RECO-010)
- 추천 근거 투명성 제공 (UFR-RECO-020)
- 고득점 필터링 (UFR-RECO-030)

**추천 알고리즘**:
- 사용자 가중치 기반 점수 재계산
- 선호도 분석 및 매칭
- 실시간 추천 업데이트

#### 🛒 Order Service
**핵심 책임**:
- 장바구니 관리 (UFR-ORDE-010, UFR-ORDE-020)
- 주문/결제 처리 (UFR-ORDE-030)
- 주문 내역 관리 (UFR-ORDE-040)

**Saga 패턴 적용**:
- 분산 트랜잭션 무결성 보장
- 보상 트랜잭션 로직
- 주문 상태 관리

#### 📝 Feedback Service
**핵심 책임**:
- 사용자 만족도 평가 (UFR-FEED-010)
- 개선 제안 수집 (UFR-FEED-020)
- 피드백 분석 (AFR-FEED-010)
- 알고리즘 개선 (AFR-FEED-020)

### 서비스 간 통신 전략

#### 동기 통신 (실시간 응답 필요)
- **API Gateway ↔ 모든 서비스**: REST API 호출
- **Recommendation → Score**: 개인화된 점수 계산 요청
- **Order → Product**: 실시간 재고 확인
- **Score → 외부 API**: 가격/리뷰/성능 정보 수집

#### 비동기 통신 (이벤트 드리븐)
- **Score Service**: 점수 계산 완료 이벤트 발행
- **Product Service**: 재고 변경 이벤트 발행
- **Order Service**: 주문 상태 변경 이벤트 발행
- **Event Bus**: Apache Kafka 기반 이벤트 스트리밍

#### 캐시 우선 전략 (Cache-Aside 패턴)
- **가성비 점수**: 1시간 캐시 (동일 상품 재계산 방지)
- **상품 정보**: 30분 캐시 (검색 성능 향상)
- **사용자 설정**: 24시간 캐시 (개인화 성능 향상)

---

## 주요 사용자 플로우

### 1. 가성비 기반 상품 검색 플로우
```
사용자 → API Gateway → Product Service (검색)
                   → Score Service (점수 계산)
                   → Cache (점수 저장)
                   → 사용자 (결과 반환)
```

**성능 목표**:
- 첫 검색: 5초 이내 (외부 API 포함)
- 캐시 히트: 500ms 이내

### 2. 개인화 추천 플로우
```
사용자 → API Gateway → User Service (가중치 조회)
                   → Recommendation Service
                   → Score Service (개인화 점수)
                   → Cache (결과 캐싱)
                   → 사용자 (추천 목록)
```

**성능 목표**: 2초 이내 완료

### 3. 주문 처리 플로우 (Saga 패턴)
```
사용자 → API Gateway → Order Service (주문 시작)
                   → Product Service (재고 확인)
                   → Payment Service (결제 처리)
                   → Product Service (재고 차감)
                   → Order Service (주문 완료)
                   → Event Bus (주문 이벤트)
```

**무결성 보장**: 각 단계별 보상 트랜잭션 준비

---

## 데이터 흐름 및 캐싱 전략

### 데이터 흐름 패턴

#### 1. Score Service CQRS 데이터 흐름
```
외부 API → Score Writer → Score Write DB (PostgreSQL)
                      → Event Bus → Score Reader → Score Read DB (MongoDB)
                                               → Redis Cache
```

#### 2. 실시간 재고 데이터 흐름
```
Order Service → Product Service → Product DB (재고 차감)
                               → Event Bus → Recommendation Service (재고 업데이트)
```

### 캐싱 전략 (Cache-Aside 패턴)

#### 캐시 계층별 TTL 설정
| 데이터 유형 | TTL | 갱신 전략 | 목적 |
|-------------|-----|-----------|------|
| 가성비 점수 | 1시간 | Lazy Loading | 외부 API 호출 최소화 |
| 상품 정보 | 30분 | Write-Around | 검색 성능 향상 |
| 사용자 설정 | 24시간 | Write-Through | 개인화 성능 향상 |
| 재고 정보 | 1분 | Write-Behind | 실시간성과 성능 균형 |

#### 캐시 무효화 전략
- **점수 업데이트 시**: 해당 상품 점수 캐시 즉시 무효화
- **재고 변경 시**: 해당 상품 재고 캐시 즉시 무효화
- **사용자 설정 변경 시**: 해당 사용자 캐시 즉시 무효화

---

## 확장성 및 성능 고려사항

### 성능 목표 및 최적화 전략

#### 핵심 성능 지표
| 기능 | 목표 성능 | 최적화 방법 |
|------|-----------|-------------|
| 가성비 점수 계산 | 5초 이내 | CQRS + Circuit Breaker + 병렬 처리 |
| 상품 검색 | 2초 이내 | Cache-Aside + 검색 인덱스 |
| 개인화 추천 | 2초 이내 | 사전 계산 + 캐시 활용 |
| 주문 처리 | 3초 이내 | Saga 패턴 + 비동기 처리 |

#### 확장성 설계

**수평 확장 전략**:
- **Stateless 서비스**: 모든 서비스를 무상태로 설계
- **Database Sharding**: 상품 ID 기반 샤딩 (확장 시)
- **Cache Clustering**: Redis Cluster 모드 사용
- **Load Balancing**: 서비스별 독립적 로드밸런서

**수직 확장 포인트**:
- **Score Service**: CPU 집약적 계산 최적화
- **Product Service**: 메모리 기반 검색 인덱스
- **Cache Layer**: 메모리 용량 확장

### 병목점 분석 및 대응

#### 예상 병목점
1. **외부 API 호출 지연**: Circuit Breaker + Timeout 설정
2. **Score 계산 복잡도**: CQRS Write 모델 최적화
3. **동시 주문 처리**: Saga 패턴 + 큐 기반 처리
4. **검색 성능**: 검색 엔진 (Elasticsearch) 도입 고려

#### 성능 모니터링
- **응답 시간**: 95th percentile 기준 모니터링
- **캐시 히트율**: 서비스별 목표 히트율 설정
- **외부 API 성공률**: Circuit Breaker 상태 모니터링
- **동시 사용자 수**: 실시간 부하 모니터링

---

## 보안 고려사항

### 인증 및 인가

#### JWT 기반 인증 체계
```
클라이언트 → API Gateway → User Service (인증)
                        → JWT 토큰 발급
         ← API Gateway ← JWT 토큰 반환
```

#### 서비스 간 인증
- **Service Mesh**: Istio 기반 mTLS 통신
- **API Key**: 내부 서비스 간 API 키 인증
- **Role-Based Access**: 사용자 역할별 접근 제어

### 데이터 보호

#### 개인정보 보호
- **개인정보 암호화**: 사용자 정보 AES-256 암호화
- **PII 마스킹**: 로그에서 개인정보 마스킹
- **GDPR 준수**: 개인정보 삭제 요청 처리

#### 결제 보안
- **PCI DSS 준수**: 결제 정보 비저장 원칙
- **PG 연동 보안**: HTTPS + API 키 관리
- **트랜잭션 무결성**: Saga 패턴 보안 강화

### API 보안
- **Rate Limiting**: 서비스별 요청 제한
- **DDoS 방지**: API Gateway 수준 방어
- **Input Validation**: 모든 입력 데이터 검증
- **OWASP Top 10**: 보안 취약점 대응

---

## 모니터링 및 관찰성

### 로깅 전략
- **구조화 로깅**: JSON 형태 로그 포맷
- **분산 추적**: Jaeger를 통한 트랜잭션 추적
- **중앙집중 로깅**: ELK 스택 기반 로그 수집

### 메트릭 수집
- **비즈니스 메트릭**: 가성비 점수 계산 횟수, 추천 클릭률
- **기술 메트릭**: 응답 시간, 에러율, 캐시 히트율
- **인프라 메트릭**: CPU, 메모리, 네트워크 사용률

### 알림 및 대응
- **SLA 기반 알림**: 성능 목표 미달 시 즉시 알림
- **Circuit Breaker 상태**: 외부 API 장애 감지 및 알림
- **용량 알림**: 리소스 사용률 80% 초과 시 알림

---

## 배포 및 운영 전략

### 컨테이너화
- **Docker**: 모든 서비스 컨테이너화
- **Kubernetes**: 오케스트레이션 및 자동 확장
- **Helm Charts**: 배포 템플릿 관리

### CI/CD 파이프라인
- **GitOps**: ArgoCD 기반 배포 자동화
- **Blue-Green 배포**: 무중단 배포 전략
- **Canary 배포**: 점진적 배포로 위험 최소화

### 재해 복구
- **다중 가용 영역**: Multi-AZ 배포
- **데이터 백업**: 자동 백업 및 복구 절차
- **장애 시나리오**: 서비스별 장애 대응 플레이북

---

## 기술 스택 선정

### Backend 서비스
- **Language**: Java 17 (Spring Boot 3.x)
- **Framework**: Spring Cloud Gateway, Spring Security
- **Database**: PostgreSQL (주 데이터), MongoDB (Read 모델)
- **Cache**: Redis Cluster
- **Message Queue**: Apache Kafka

### 인프라 및 운영
- **Container**: Docker + Kubernetes
- **Service Mesh**: Istio
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **APM**: Jaeger (분산 추적)

### DevOps 도구
- **CI/CD**: Jenkins + ArgoCD
- **IaC**: Terraform
- **Configuration**: Kubernetes ConfigMap + Secret
- **Security**: Vault (시크릿 관리)

---

## 마이그레이션 및 구현 계획

### Phase 1: Core Services (3개월)
- API Gateway + User Service (인증 기반)
- Product Service (기본 검색/필터링)
- 기본 Cache-Aside 패턴 적용

### Phase 2: Differentiation (2개월)
- Score Service (CQRS 패턴 적용)
- Circuit Breaker (외부 API 안정성)
- Recommendation Service (기본 추천)

### Phase 3: Advanced Features (3개월)
- Order Service (Saga 패턴)
- Feedback Service (분석 기능)
- 고도화된 모니터링 및 알림

### 성공 기준
- **가용성**: 99.9% 이상
- **성능**: 핵심 기능별 목표 응답시간 달성
- **확장성**: 10,000 동시 사용자 처리 가능
- **보안**: 주요 보안 취약점 Zero

---

*작성일: 2024-12-25*
*작성자: Backend Architecture Team (은지)*
*버전: v1.0*