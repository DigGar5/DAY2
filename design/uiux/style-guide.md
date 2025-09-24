# 온라인 핸드폰 구매 사이트 - 스타일 가이드

## 1. 브랜드 아이덴티티

### 디자인 컨셉
**"Smart Choice" - 똑똑한 선택을 돕는 직관적인 디자인**

#### 핵심 가치
- **투명성**: 모든 가격과 성능 정보를 명확하고 투명하게 제공
- **신뢰성**: 객관적인 점수 시스템으로 믿을 수 있는 정보 제공
- **효율성**: 빠르고 쉬운 비교 및 구매 경험
- **개인화**: 사용자별 맞춤 추천과 설정

#### 디자인 철학
- 깔끔하고 모던한 UI로 정보 가독성 극대화
- 데이터 시각화를 통한 명확한 비교 정보 제공
- 모바일 퍼스트 접근으로 언제 어디서나 편리한 사용
- 직관적인 인터페이스로 학습 비용 최소화

---

## 2. 디자인 원칙

### 정보 우선순위
1. **가성비 점수**가 가장 눈에 띄게 표시
2. **가격 정보**는 명확하고 비교하기 쉽게 제시
3. **핵심 사양**만 요약하여 빠른 판단 지원
4. **부가 정보**는 필요시 접근 가능하도록 계층화

### 사용성 원칙
- **3-Click 법칙**: 원하는 정보까지 최대 3번의 클릭
- **일관성**: 동일한 요소는 모든 페이지에서 동일한 위치/모양
- **피드백**: 모든 사용자 액션에 즉각적인 반응 제공
- **복구 가능성**: 실수를 쉽게 되돌릴 수 있는 안전망 제공

### 시각적 원칙
- **명확한 시각 계층**: 크기, 색상, 위치로 중요도 구분
- **충분한 여백**: 정보 간 명확한 구분과 읽기 편의성
- **색상의 의미**: 색상만으로도 상태와 의미 전달
- **아이콘 활용**: 국제적으로 이해되는 심볼 사용

---

## 3. 컬러 시스템

### Primary Colors
```css
/* Primary Blue - 신뢰감과 안정성 */
--primary-50: #EFF6FF
--primary-100: #DBEAFE
--primary-200: #BFDBFE
--primary-300: #93C5FD
--primary-400: #60A5FA
--primary-500: #3B82F6  /* Main Primary */
--primary-600: #2563EB
--primary-700: #1D4ED8
--primary-800: #1E40AF
--primary-900: #1E3A8A
```

### Secondary Colors
```css
/* Orange - 포인트 및 액션 */
--secondary-50: #FFF7ED
--secondary-100: #FFEDD5
--secondary-200: #FED7AA
--secondary-300: #FDBA74
--secondary-400: #FB923C
--secondary-500: #F97316  /* Main Secondary */
--secondary-600: #EA580C
--secondary-700: #C2410C
--secondary-800: #9A3412
--secondary-900: #7C2D12
```

### Status Colors
```css
/* Success - 좋은 가성비, 재고 있음 */
--success-50: #F0FDF4
--success-500: #22C55E
--success-600: #16A34A

/* Warning - 주의 필요, 재고 부족 */
--warning-50: #FFFBEB
--warning-500: #EAB308
--warning-600: #CA8A04

/* Error - 오류, 재고 없음 */
--error-50: #FEF2F2
--error-500: #EF4444
--error-600: #DC2626

/* Info - 정보 제공 */
--info-50: #F0F9FF
--info-500: #06B6D4
--info-600: #0891B2
```

### Gray Scale
```css
/* Gray - 텍스트 및 배경 */
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-200: #E5E7EB
--gray-300: #D1D5DB
--gray-400: #9CA3AF
--gray-500: #6B7280
--gray-600: #4B5563
--gray-700: #374151
--gray-800: #1F2937
--gray-900: #111827
```

### 색상 사용 가이드
- **Primary Blue**: 메인 브랜드 색상, CTA 버튼, 링크
- **Secondary Orange**: 중요한 액션, 알림, 강조 요소
- **Success Green**: 가성비 우수 표시, 성공 메시지
- **Warning Yellow**: 주의사항, 재고 부족 알림
- **Error Red**: 오류 메시지, 위험 알림
- **Gray**: 텍스트, 배경, 보더

---

## 4. 타이포그래피

### 폰트 패밀리
```css
/* Primary Font - 한글 */
--font-korean: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

/* Secondary Font - 영문/숫자 */
--font-english: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

/* Monospace - 가격, 점수 */
--font-mono: 'JetBrains Mono', 'Monaco', 'Cascadia Code', monospace
```

### 폰트 크기
```css
/* Display - 메인 제목 */
--text-4xl: 36px  /* 2.25rem */
--text-3xl: 30px  /* 1.875rem */
--text-2xl: 24px  /* 1.5rem */

/* Heading - 섹션 제목 */
--text-xl: 20px   /* 1.25rem */
--text-lg: 18px   /* 1.125rem */

/* Body - 본문 */
--text-base: 16px /* 1rem - 기본 */
--text-sm: 14px   /* 0.875rem */

/* Caption - 부가 정보 */
--text-xs: 12px   /* 0.75rem */
```

### 행간 (Line Height)
```css
--leading-tight: 1.25    /* 제목용 */
--leading-normal: 1.5    /* 본문용 - 기본 */
--leading-relaxed: 1.625 /* 긴 텍스트용 */
```

### 폰트 굵기
```css
--font-light: 300     /* 부가 정보 */
--font-normal: 400    /* 일반 텍스트 */
--font-medium: 500    /* 강조 텍스트 */
--font-semibold: 600  /* 제목 */
--font-bold: 700      /* 중요 정보 */
```

---

## 5. 간격 시스템

### 기본 단위
```css
--space-1: 4px    /* 0.25rem */
--space-2: 8px    /* 0.5rem */
--space-3: 12px   /* 0.75rem */
--space-4: 16px   /* 1rem - 기본 단위 */
--space-5: 20px   /* 1.25rem */
--space-6: 24px   /* 1.5rem */
--space-8: 32px   /* 2rem */
--space-10: 40px  /* 2.5rem */
--space-12: 48px  /* 3rem */
--space-16: 64px  /* 4rem */
--space-20: 80px  /* 5rem */
```

### 컴포넌트별 간격
- **버튼 내부**: 12px (상하) × 24px (좌우)
- **카드 내부**: 16px ~ 24px
- **컴포넌트 간**: 16px ~ 32px
- **섹션 간**: 48px ~ 64px
- **페이지 여백**: 16px (모바일) / 24px (태블릿) / 32px (데스크톱)

---

## 6. 컴포넌트 스타일

### 버튼
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-600);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-700);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--primary-600);
  border: 1px solid var(--primary-600);
  /* 나머지 속성은 primary와 동일 */
}

/* Button Sizes */
.btn-sm { padding: 8px 16px; font-size: 14px; }
.btn-md { padding: 12px 24px; font-size: 16px; }
.btn-lg { padding: 16px 32px; font-size: 18px; }
```

### 카드
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

### 입력 필드
```css
.input {
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input.error {
  border-color: var(--error-500);
}
```

---

## 7. 반응형 브레이크포인트

### 브레이크포인트 정의
```css
/* Mobile First 접근 */
--breakpoint-sm: 640px    /* Small devices */
--breakpoint-md: 768px    /* Medium devices */
--breakpoint-lg: 1024px   /* Large devices */
--breakpoint-xl: 1280px   /* Extra large devices */
--breakpoint-2xl: 1536px  /* 2X large devices */
```

### 그리드 시스템
- **Mobile (< 768px)**: 1열 레이아웃
- **Tablet (768px ~ 1023px)**: 2열 레이아웃
- **Desktop (≥ 1024px)**: 3열 레이아웃

### 컨테이너 크기
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; padding: 0 32px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

---

## 8. 대상 서비스 특화 컴포넌트

### 가성비 점수 표시
```css
.score-display {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.score-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    var(--primary-500) 0deg,
    var(--primary-500) calc(var(--score) * 3.6deg),
    var(--gray-200) calc(var(--score) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-number {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-700);
}

.score-grade {
  font-size: 12px;
  color: var(--gray-600);
  margin-top: 4px;
}
```

### 상품 비교 카드
```css
.product-compare-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  background: white;
}

.product-compare-score {
  min-width: 80px;
  text-align: center;
}

.product-compare-info {
  flex: 1;
}

.product-compare-price {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--gray-900);
}
```

### 필터 패널
```css
.filter-panel {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--gray-200);
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.filter-title {
  font-weight: 600;
  margin-bottom: 12px;
}
```

### 추천 배지
```css
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.badge-best {
  background: var(--error-100);
  color: var(--error-700);
}

.badge-value {
  background: var(--success-100);
  color: var(--success-700);
}

.badge-new {
  background: var(--info-100);
  color: var(--info-700);
}
```

---

## 9. 인터랙션 패턴

### 애니메이션 지속시간
```css
--duration-fast: 0.15s     /* 버튼 피드백 */
--duration-normal: 0.2s    /* 일반 호버 */
--duration-slow: 0.3s      /* 페이지 전환 */
```

### 이징 함수
```css
--ease-out: cubic-bezier(0.25, 0.8, 0.25, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### 호버 효과
- **버튼**: 색상 변경 + 1px 상승
- **카드**: 그림자 증가 + 2px 상승
- **링크**: 색상 변경 + 밑줄
- **이미지**: 확대 효과 (transform: scale(1.05))

### 클릭/탭 효과
- **버튼**: 0.95 스케일 + 리플 이펙트
- **카드**: 0.98 스케일
- **아이콘**: 0.9 스케일 + 회전

### 로딩 상태
- **스켈레톤 UI**: 콘텐츠 로딩 중
- **스피너**: 액션 처리 중
- **프로그레스 바**: 진행률 표시

---

## 10. 변경 이력

### v1.0 (2024-XX-XX)
- 초기 스타일 가이드 작성
- 핸드폰 가성비 구매 사이트 특화 디자인 시스템 구축
- 브랜드 아이덴티티 "Smart Choice" 컨셉 정립
- 가성비 점수 표시 등 서비스 특화 컴포넌트 정의
- 반응형 및 접근성 고려한 디자인 원칙 수립

---

## 부록: 개발 가이드

### CSS 변수 사용법
```css
/* 루트에서 변수 정의 */
:root {
  --primary-500: #3B82F6;
  /* 기타 변수들... */
}

/* 컴포넌트에서 사용 */
.button {
  background-color: var(--primary-500);
}
```

### 다크모드 준비
```css
@media (prefers-color-scheme: dark) {
  :root {
    --gray-50: #111827;
    --gray-900: #F9FAFB;
    /* 색상 반전 */
  }
}
```

### 접근성 고려사항
- 색상 대비비 최소 4.5:1 준수
- 포커스 표시 명확화
- 의미있는 alt 텍스트 제공
- 키보드 네비게이션 지원