# 온라인 핸드폰 구매 사이트 - 클라우드 아키텍처 패턴 선정

## 1. 요구사항 분석 결과

### 1.1 기능적 요구사항 분석

#### 핵심 비즈니스 기능
- **가성비 점수 계산**: 다중 외부 API 연동을 통한 실시간 점수 산출
- **개인화 추천**: 사용자 가중치 기반 맞춤형 상품 추천
- **실시간 재고 관리**: 품절/재입고 상태 실시간 반영
- **복합 검색/필터링**: 다차원 조건 기반 상품 발견
- **분산 주문 처리**: 장바구니 → 결제 → 재고 차감 트랜잭션

#### 서비스 간 데이터 교환 복잡성
```
Score Service ↔ Product Service: 상품 정보 조회
Score Service ↔ 외부 API: 가격/리뷰/성능 데이터 수집
Recommendation ↔ Score: 개인화된 점수 재계산
Recommendation ↔ User: 사용자 가중치 설정
Order ↔ Product: 실시간 재고 확인 및 차감
```

### 1.2 비기능적 요구사항 분석

#### 성능 요구사항
| 기능 | 목표 지표 | 비즈니스 영향도 |
|------|-----------|-----------------|
| 가성비 점수 계산 | **5초 이내** | 핵심 차별화 기능 |
| 최신 가격 정보 | 1시간 이내 갱신 | 신뢰도 직결 |
| 검색 응답 | 2초 이내 | 사용자 경험 |
| 재고 업데이트 | 1초 이내 | 주문 정확성 |

#### 가용성 & 확장성
- **24/7 서비스 운영**: 전자상거래 특성상 다운타임 최소화 필수
- **피크 트래픽 대응**: 특가 이벤트 시 10배 트래픽 증가 대비
- **개인화 데이터 처리**: 사용자별 가중치 설정 실시간 반영

### 1.3 기술적 도전과제 (우선순위별)

#### 🔴 P1 (최우선) - 비즈니스 크리티컬

**1. 가성비 점수 계산 엔진**
- **도전과제**: 다중 외부 API 병렬 호출 후 5초 이내 점수 계산 완료
- **측정 지표**:
  - 응답 시간: 95th percentile 5초 이내
  - API 호출 성공률: 99.9% 이상
  - 외부 API 장애 시 Fallback 응답: 2초 이내

**2. 실시간 재고 관리**
- **도전과제**: 다중 사용자 동시 주문 시 정확한 재고 관리
- **측정 지표**:
  - 재고 업데이트 지연: 1초 이내
  - 재고 정확도: 99.99% (overselling 방지)
  - 동시 주문 처리: 1000 TPS

**3. 분산 트랜잭션 처리 (주문/결제)**
- **도전과제**: 장바구니 → 결제 → 재고차감 → 주문생성 트랜잭션 무결성
- **측정 지표**:
  - 트랜잭션 성공률: 99.9%
  - 실패 시 롤백 시간: 3초 이내
  - 데이터 일관성: 100% (eventual consistency 허용)

---

## 2. 패턴 선정 매트릭스 (평가표)

### 2.1 평가 기준 및 가중치
- **기능 적합성** (35%): 요구사항을 직접 해결하는 능력
- **성능 효과** (25%): 응답시간 및 처리량 개선 효과
- **운영 복잡도** (20%): 구현 및 운영의 용이성 (역점수)
- **확장성** (15%): 미래 요구사항에 대한 대응력
- **비용 효율성** (5%): 개발/운영 비용 대비 효과

### 2.2 패턴별 정량적 평가 결과

| 패턴 | 기능 적합성<br/>(35%) | 성능 효과<br/>(25%) | 운영 복잡도<br/>(20%) | 확장성<br/>(15%) | 비용 효율성<br/>(5%) | **총점** | **순위** |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Circuit Breaker** | 9 × 0.35 = 3.15 | 8 × 0.25 = 2.0 | 8 × 0.20 = 1.6 | 7 × 0.15 = 1.05 | 9 × 0.05 = 0.45 | **8.25** | **1** |
| **CQRS** | 10 × 0.35 = 3.5 | 9 × 0.25 = 2.25 | 5 × 0.20 = 1.0 | 9 × 0.15 = 1.35 | 6 × 0.05 = 0.3 | **8.4** | **2** |
| **Cache-Aside** | 8 × 0.35 = 2.8 | 9 × 0.25 = 2.25 | 8 × 0.20 = 1.6 | 8 × 0.15 = 1.2 | 9 × 0.05 = 0.45 | **8.3** | **3** |
| **API Gateway** | 9 × 0.35 = 3.15 | 7 × 0.25 = 1.75 | 8 × 0.20 = 1.6 | 9 × 0.15 = 1.35 | 8 × 0.05 = 0.4 | **8.25** | **4** |
| **Async Request-Reply** | 9 × 0.35 = 3.15 | 8 × 0.25 = 2.0 | 6 × 0.20 = 1.2 | 8 × 0.15 = 1.2 | 7 × 0.05 = 0.35 | **7.9** | **5** |
| **Publisher-Subscriber** | 8 × 0.35 = 2.8 | 8 × 0.25 = 2.0 | 7 × 0.20 = 1.4 | 9 × 0.15 = 1.35 | 7 × 0.05 = 0.35 | **7.9** | **6** |
| **Saga** | 10 × 0.35 = 3.5 | 7 × 0.25 = 1.75 | 4 × 0.20 = 0.8 | 8 × 0.15 = 1.2 | 5 × 0.05 = 0.25 | **7.5** | **7** |

### 2.3 선정 패턴 및 선정 근거

#### 🥇 1위: Circuit Breaker (8.25점)
- **적용 영역**: 외부 API 연동 (가격, 리뷰, 성능 데이터)
- **선정 근거**: 외부 API 장애 시 전체 서비스 다운 방지, 5초 응답 보장의 핵심
- **구현 방식**: resilience4j 라이브러리 활용
- **예상 효과**: 외부 API 장애율 99% → 1% 감소

#### 🥈 2위: CQRS (8.4점)
- **적용 영역**: Score 서비스 (가성비 점수 계산/조회 분리)
- **선정 근거**: 복잡한 계산 로직과 단순 조회 최적화 분리 필요
- **구현 방식**:
  - Write Model: PostgreSQL + 복잡한 계산 로직
  - Read Model: MongoDB + Redis 캐시
- **예상 효과**: 조회 성능 300% 향상, 계산 처리량 200% 증가

#### 🥉 3위: Cache-Aside (8.3점)
- **적용 영역**: 가성비 점수, 상품 정보, 사용자 가중치
- **선정 근거**: 1시간 내 동일 상품 재계산 방지, 응답시간 단축
- **구현 방식**: Redis 클러스터, Lazy Loading 전략
- **예상 효과**: 평균 응답시간 5초 → 500ms 단축

---

## 3. 서비스별 패턴 적용 설계 (Mermaid)

### 3.1 전체 아키텍처 다이어그램

```mermaid
graph TB
    %% 클라이언트 및 API Gateway
    Client[🖥️ 클라이언트<br/>Web/Mobile] --> Gateway[🚪 API Gateway<br/>- 라우팅<br/>- 인증<br/>- Rate Limiting]

    %% 주요 서비스들
    Gateway --> UserSvc[👤 User Service<br/>- 인증/인가<br/>- 개인화 설정]
    Gateway --> ProductSvc[📱 Product Service<br/>- 상품 검색<br/>- 필터링<br/>- 재고 관리]
    Gateway --> ScoreSvc[⚡ Score Service<br/>CQRS 패턴<br/>- 점수 계산 (Write)<br/>- 점수 조회 (Read)]
    Gateway --> RecoSvc[🎯 Recommendation<br/>- 개인화 추천<br/>- 추천 근거 제공]
    Gateway --> OrderSvc[🛒 Order Service<br/>Saga 패턴<br/>- 장바구니<br/>- 주문/결제]
    Gateway --> FeedSvc[📝 Feedback Service<br/>- 만족도 수집<br/>- 개선 제안]

    %% Cache Layer
    Cache[(🗄️ Redis Cache<br/>Cache-Aside 패턴<br/>- 가성비 점수<br/>- 상품 정보<br/>- 사용자 설정)]

    ProductSvc -.-> Cache
    ScoreSvc -.-> Cache
    RecoSvc -.-> Cache
    UserSvc -.-> Cache

    %% CQRS - Score Service 내부 구조
    ScoreSvc --> ScoreWrite[⚡ Score Writer<br/>- 실시간 계산<br/>- 외부 API 호출]
    ScoreSvc --> ScoreRead[📊 Score Reader<br/>- 캐시된 점수<br/>- 이력 조회]

    %% Circuit Breaker for External APIs
    ScoreWrite --> CB1[🛡️ Circuit Breaker]
    CB1 --> ExtPrice[💰 가격 API<br/>쇼핑몰들]
    CB1 --> ExtReview[⭐ 리뷰 API<br/>평점 시스템]
    CB1 --> ExtPerf[🏃 성능 API<br/>벤치마크 DB]

    %% Event-Driven Architecture
    EventBus[📡 Event Bus<br/>Publisher-Subscriber<br/>- 재고 변경<br/>- 주문 생성<br/>- 점수 업데이트]

    ProductSvc --> EventBus
    ScoreWrite --> EventBus
    OrderSvc --> EventBus
    EventBus --> RecoSvc
    EventBus --> FeedSvc

    %% Async Request-Reply for Score Calculation
    Client -.->|비동기 요청| ScoreQueue[📮 Score Queue<br/>Async Request-Reply]
    ScoreQueue -.-> ScoreWrite
    ScoreWrite -.->|계산 완료 알림| Client

    %% Databases
    UserSvc --> UserDB[(👤 User DB<br/>PostgreSQL)]
    ProductSvc --> ProductDB[(📱 Product DB<br/>PostgreSQL<br/>+ Search Index)]
    ScoreRead --> ScoreReadDB[(📊 Score Read DB<br/>MongoDB)]
    ScoreWrite --> ScoreWriteDB[(⚡ Score Write DB<br/>PostgreSQL)]
    OrderSvc --> OrderDB[(🛒 Order DB<br/>PostgreSQL)]
    FeedSvc --> FeedDB[(📝 Feedback DB<br/>PostgreSQL)]

    %% Saga Orchestrator for Order Process
    OrderSvc --> SagaOrch[🎭 Saga Orchestrator<br/>- 주문 워크플로우<br/>- 보상 트랜잭션]
    SagaOrch -.-> ProductSvc
    SagaOrch -.-> PaymentSvc[💳 Payment Service<br/>PG 연동]

    %% Monitoring & Observability
    Monitor[📈 Monitoring<br/>- Circuit Breaker 상태<br/>- Cache Hit Rate<br/>- Score 계산 시간]

    CB1 -.-> Monitor
    Cache -.-> Monitor
    ScoreWrite -.-> Monitor

    %% Styles
    classDef service fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef database fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef pattern fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef external fill:#fff3e0,stroke:#e65100,stroke-width:2px

    class UserSvc,ProductSvc,ScoreSvc,RecoSvc,OrderSvc,FeedSvc,PaymentSvc service
    class UserDB,ProductDB,ScoreReadDB,ScoreWriteDB,OrderDB,FeedDB database
    class Gateway,CB1,Cache,EventBus,SagaOrch,ScoreQueue pattern
    class ExtPrice,ExtReview,ExtPerf external
```

### 3.2 패턴별 적용 상세

#### API Gateway - 진입점 통합
- **역할**: 모든 클라이언트 요청의 단일 진입점
- **기능**: 라우팅, 인증, Rate Limiting, 로깅
- **기술 스택**: Kong API Gateway + JWT 인증
- **효과**: 횡단 관심사 분리, 클라이언트 단순화

#### CQRS - Score Service 읽기/쓰기 분리
- **Write 모델**: 복잡한 가성비 계산 로직, 외부 API 병렬 호출
- **Read 모델**: 최적화된 조회, Redis 캐시 활용, 이력 관리
- **기술 스택**: PostgreSQL(Write) + MongoDB(Read) + Redis(Cache)
- **효과**: 계산 성능과 조회 성능 독립 최적화

#### Circuit Breaker - 외부 API 안정성
- **적용 위치**: 가격/리뷰/성능 API 호출 지점
- **설정**: 연속 5회 실패 시 Open, 30초 후 Half-Open
- **기술 스택**: resilience4j + Spring Boot Actuator
- **효과**: 외부 장애 시 전체 서비스 보호, 빠른 실패 응답

#### Cache-Aside - 성능 최적화
- **캐시 대상**: 가성비 점수(1시간), 상품 정보(30분), 사용자 설정(24시간)
- **전략**: Lazy Loading, Write-Around
- **기술 스택**: Redis Cluster + Spring Cache
- **효과**: 평균 응답시간 90% 단축

---

## 4. Phase별 구현 로드맵

### 4.1 Phase 1: MVP (Minimum Viable Product) - 3개월
**목표**: 핵심 비즈니스 기능 구현으로 빠른 서비스 출시

#### 적용 패턴 (우선순위 기반)
| 패턴 | 적용 서비스 | 구현 난이도 | 비즈니스 영향 |
|------|-------------|-------------|----------------|
| **API Gateway** | 전체 | 🟢 낮음 | 🔴 필수 |
| **Cache-Aside** | Product, User | 🟢 낮음 | 🟡 중요 |
| **Circuit Breaker** | 외부 API | 🟡 중간 | 🔴 필수 |

#### 구현 일정
- **Week 1-2**: API Gateway 설정 (Kong, 기본 라우팅)
- **Week 3-6**: Product Service (검색/필터링, Redis 캐싱)
- **Week 7-8**: User Service (JWT 인증, 프로필 관리)
- **Week 9-10**: Order Service (기본 주문/결제, 동기 처리)
- **Week 11-12**: Circuit Breaker 적용 (외부 API 안정성)

#### MVP 성공 기준
- **가용성**: 99% 이상
- **응답시간**: API 평균 2초 이내
- **동시사용자**: 100명 수준 처리
- **핵심기능**: 상품검색 → 장바구니 → 주문완료 플로우

### 4.2 Phase 2: 확장 (Scale-up) - 2개월
**목표**: 차별화 기능 구현 및 성능 최적화

#### 적용 패턴
| 패턴 | 적용 서비스 | 구현 난이도 | 성능 기대효과 |
|------|-------------|-------------|---------------|
| **CQRS** | Score Service | 🔴 높음 | ⚡ 300% 조회 성능 향상 |
| **Publisher-Subscriber** | 전체 | 🟡 중간 | 📡 실시간 업데이트 |
| **Async Request-Reply** | Score Service | 🟡 중간 | ⏱️ 체감 응답시간 단축 |

#### 구현 일정
- **Week 1-4**: Score Service CQRS 구현
  - Write Model: PostgreSQL + 복잡한 계산 로직
  - Read Model: MongoDB + Redis 캐시
- **Week 3-5**: Asynchronous Request-Reply (RabbitMQ, WebSocket)
- **Week 5-6**: Event-Driven Architecture (Apache Kafka)
- **Week 7-8**: Recommendation Service (개인화 알고리즘)

#### Phase 2 성공 기준
- **가성비 계산**: 95th percentile 5초 이내
- **실시간 업데이트**: 1초 이내 반영
- **추천 정확도**: 클릭률 5% 이상
- **동시사용자**: 1,000명 수준 처리

### 4.3 Phase 3: 고도화 (Advanced) - 3개월
**목표**: 복잡한 비즈니스 요구사항 대응 및 대규모 확장

#### 적용 패턴
| 패턴 | 적용 서비스 | 구현 난이도 | 고도화 효과 |
|------|-------------|-------------|-------------|
| **Saga** | Order Service | 🔴 매우 높음 | 🔒 트랜잭션 무결성 |
| **Bulkhead** | 전체 | 🟡 중간 | 🛡️ 장애 격리 |
| **Event Sourcing** | Order Service | 🔴 매우 높음 | 📊 완벽한 감사 추적 |

#### 구현 일정
- **Week 1-6**: Saga Pattern 구현 (Orchestration 방식)
  - 주문 생성 → 재고 확인 → 결제 처리 → 배송 준비
  - 보상 트랜잭션 로직, 타임아웃/재시도 정책
- **Week 7-8**: Bulkhead Pattern (Kubernetes Resource Quotas)
- **Week 9-10**: Event Sourcing (주문 도메인)
- **Week 11-12**: Feedback Service 고도화 (AI 분석)

#### Phase 3 성공 기준
- **트랜잭션 성공률**: 99.9% 이상
- **시스템 가용성**: 99.99% (연간 52분 다운타임)
- **확장성**: 10,000 동시사용자 처리
- **데이터 일관성**: 100% (Eventual Consistency)

---

## 5. 예상 성과 지표

### 5.1 성능 개선 예상치

| 지표 | 현재 | Phase 1 | Phase 2 | Phase 3 |
|------|------|---------|---------|---------|
| **평균 응답시간** | - | 2초 | 0.8초 | 0.5초 |
| **가성비 계산 시간** | - | 8초 | 5초 | 3초 |
| **처리량 (TPS)** | - | 100 | 1,000 | 5,000 |
| **가용성** | - | 99% | 99.5% | 99.9% |
| **캐시 히트율** | - | 60% | 85% | 95% |

### 5.2 비용 절감 효과

#### 개발 생산성 향상
- **Phase 1**: 표준화된 패턴으로 개발 속도 20% 향상
- **Phase 2**: 재사용 가능한 컴포넌트로 50% 향상
- **Phase 3**: 자동화된 운영으로 30% 추가 향상

#### 인프라 비용 최적화
- **캐싱 효과**: 외부 API 호출 70% 감소 → 월 $2,000 절약
- **Circuit Breaker**: 장애 시 서비스 다운타임 90% 감소 → 기회비용 절약
- **CQRS**: 읽기 전용 인스턴스 최적화 → 월 $1,500 절약

### 5.3 개발 생산성 향상

#### 코드 예시 - Circuit Breaker 구현

```java
@Component
public class ExternalPriceApiClient {

    @CircuitBreaker(name = "price-api", fallbackMethod = "getCachedPrice")
    @Retry(name = "price-api")
    @TimeLimiter(name = "price-api")
    public CompletableFuture<PriceData> getPrice(String productId) {
        return CompletableFuture.supplyAsync(() -> {
            // 외부 가격 API 호출 로직
            return restTemplate.getForObject(
                "/api/price/" + productId,
                PriceData.class
            );
        });
    }

    public CompletableFuture<PriceData> getCachedPrice(String productId, Exception ex) {
        // Fallback: 캐시된 가격 정보 반환
        return CompletableFuture.supplyAsync(() ->
            priceCache.get(productId).orElse(PriceData.createDefault())
        );
    }
}
```

#### 구현 시 고려사항

1. **Circuit Breaker 설정**
   - Failure Rate Threshold: 50%
   - Wait Duration in Open State: 30초
   - Sliding Window Size: 10개 요청

2. **CQRS 데이터 동기화**
   - Write → Read 모델 동기화: 이벤트 기반
   - 최대 지연시간: 1초 (Eventual Consistency)
   - 충돌 해결: Last-Write-Wins 전략

3. **Saga 보상 트랜잭션**
   - 멱등성 보장: 동일 요청 재시도 안전성
   - 타임아웃 설정: 각 단계별 30초 제한
   - 모니터링: 트랜잭션 상태별 대시보드

---

## 6. 결론

### 6.1 핵심 선정 결과

온라인 핸드폰 구매 사이트를 위한 **7개 핵심 클라우드 아키텍처 패턴**이 선정되었습니다:

1. **Circuit Breaker** (1위) - 외부 API 안정성 확보
2. **CQRS** (2위) - 가성비 점수 성능 최적화
3. **Cache-Aside** (3위) - 응답시간 90% 단축
4. **API Gateway** (4위) - 통합 진입점 관리
5. **Async Request-Reply** (5위) - 사용자 경험 개선
6. **Publisher-Subscriber** (6위) - 이벤트 기반 아키텍처
7. **Saga** (7위) - 분산 트랜잭션 무결성

### 6.2 기대 효과

#### 🎯 비즈니스 성과
- **차별화 기능 구현**: 5초 이내 가성비 점수 계산 보장
- **서비스 안정성**: 99.9% 가용성으로 신뢰도 확보
- **사용자 경험**: 평균 응답시간 80% 단축

#### 💰 경제적 효과
- **개발 생산성**: 표준화된 패턴으로 50% 향상
- **운영 비용**: 인프라 최적화로 월 $3,500 절약
- **장애 비용**: Circuit Breaker로 다운타임 90% 감소

#### 🔧 기술적 성과
- **확장성**: 10,000 동시 사용자 처리 가능
- **유지보수성**: 패턴 기반 구조화로 코드 품질 향상
- **모니터링**: 각 패턴별 성능 지표 실시간 추적

### 6.3 다음 단계

1. **Phase 1 시작**: API Gateway 구축부터 시작 (2주 목표)
2. **팀 교육**: 선정된 패턴에 대한 개발팀 교육 실시
3. **프로토타입**: Score Service CQRS 패턴 PoC 구현
4. **모니터링 체계**: 각 패턴별 성능 지표 수집 시스템 구축

본 아키텍처 패턴 선정을 통해 **온라인 핸드폰 구매 사이트의 핵심 경쟁력인 가성비 점수 계산 기능을 안정적이고 빠르게 제공**할 수 있는 기술적 기반이 마련되었습니다.

---

## 참고 자료

- **유저스토리**: [design/userstory.md](../userstory.md)
- **UI/UX 설계서**: [design/uiux/uiux.md](../uiux/uiux.md)
- **클라우드 아키텍처 패턴 요약**: [claude/cloud-design-patterns.md](../../claude/cloud-design-patterns.md)

---

*작성일: 2024-MM-DD*
*작성자: 아키텍처 설계팀*
*검토자: CTO*