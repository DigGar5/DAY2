// 온라인 핸드폰 구매 사이트 - 공통 JavaScript

// 전역 상태 관리
const AppState = {
  user: null,
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
  currentPage: '',

  // 사용자 상태
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 장바구니 관리
  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.updateCartUI();
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  },

  updateCartQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  },

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  },

  updateCartUI() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getCartCount();
    cartCountElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline' : 'none';
    });
  },

  // 검색 기록
  addSearchHistory(query) {
    if (query && !this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // 최대 10개
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }
};

// 샘플 데이터
const SampleData = {
  products: [
    {
      id: 1,
      name: "Galaxy S24 Ultra",
      brand: "삼성",
      price: 1398000,
      originalPrice: 1600000,
      image: "https://images.samsung.com/kdp/goods/2024/01/17/6c3d7e3b-7d0b-4e4e-9a9c-2f1e6d7c8a9b.jpg",
      score: 92,
      grade: "우수",
      specs: {
        display: "6.8인치 Dynamic AMOLED",
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        battery: "5000mAh",
        camera: "200MP 메인"
      },
      features: ["S펜 지원", "120Hz 디스플레이", "IP68 방수"],
      inStock: true,
      discount: 13
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      brand: "애플",
      price: 1550000,
      originalPrice: 1550000,
      image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-naturaltitanium-select.jpg",
      score: 89,
      grade: "우수",
      specs: {
        display: "6.1인치 Super Retina XDR",
        processor: "A17 Pro",
        ram: "8GB",
        storage: "128GB",
        battery: "3274mAh",
        camera: "48MP 메인"
      },
      features: ["iOS 17", "Face ID", "티타늄 소재"],
      inStock: true,
      discount: 0
    },
    {
      id: 3,
      name: "갤럭시 A55",
      brand: "삼성",
      price: 449000,
      originalPrice: 549000,
      image: "https://images.samsung.com/kdp/goods/2024/03/21/a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6.jpg",
      score: 78,
      grade: "양호",
      specs: {
        display: "6.6인치 Super AMOLED",
        processor: "Exynos 1480",
        ram: "8GB",
        storage: "128GB",
        battery: "5000mAh",
        camera: "50MP 메인"
      },
      features: ["120Hz 디스플레이", "IP67 방수", "고속충전"],
      inStock: true,
      discount: 18
    },
    {
      id: 4,
      name: "iPhone 15",
      brand: "애플",
      price: 1250000,
      originalPrice: 1250000,
      image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pink-select.jpg",
      score: 85,
      grade: "우수",
      specs: {
        display: "6.1인치 Super Retina XDR",
        processor: "A16 Bionic",
        ram: "6GB",
        storage: "128GB",
        battery: "3349mAh",
        camera: "48MP 메인"
      },
      features: ["Dynamic Island", "USB-C", "세라믹 실드"],
      inStock: false,
      discount: 0
    },
    {
      id: 5,
      name: "갤럭시 Z Flip5",
      brand: "삼성",
      price: 1199000,
      originalPrice: 1399000,
      image: "https://images.samsung.com/kdp/goods/2023/07/26/z1x2y3z4-5a6b-7c8d-9e0f-g1h2i3j4k5l6.jpg",
      score: 81,
      grade: "양호",
      specs: {
        display: "6.7인치 Dynamic AMOLED (폴딩)",
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB",
        storage: "256GB",
        battery: "3700mAh",
        camera: "12MP 듀얼"
      },
      features: ["폴딩 디스플레이", "Flex Mode", "IPX8 방수"],
      inStock: true,
      discount: 14
    },
    {
      id: 6,
      name: "갤럭시 S23",
      brand: "삼성",
      price: 899000,
      originalPrice: 999000,
      image: "https://images.samsung.com/kdp/goods/2023/02/01/s1a2b3c4-5d6e-7f8g-9h0i-j1k2l3m4n5o6.jpg",
      score: 87,
      grade: "우수",
      specs: {
        display: "6.1인치 Dynamic AMOLED",
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB",
        storage: "128GB",
        battery: "3900mAh",
        camera: "50MP 트리플"
      },
      features: ["120Hz 디스플레이", "야간 모드", "무선충전"],
      inStock: true,
      discount: 10
    }
  ],

  users: [
    {
      id: 1,
      email: "user@example.com",
      name: "김철수",
      preferences: {
        priceWeight: 40,
        performanceWeight: 35,
        reviewWeight: 25
      }
    }
  ],

  reviews: [
    {
      id: 1,
      productId: 1,
      rating: 5,
      title: "정말 만족스러운 플래그십",
      content: "S펜 기능이 정말 유용하고 카메라 성능도 뛰어납니다.",
      author: "김**",
      date: "2024-01-15"
    },
    {
      id: 2,
      productId: 2,
      rating: 4,
      title: "iOS 생태계의 완성체",
      content: "앱 최적화와 성능은 최고지만 가격이 아쉽습니다.",
      author: "이**",
      date: "2024-01-20"
    }
  ],

  orders: [
    {
      id: "ORDER-2024-001",
      userId: 1,
      products: [
        { id: 1, name: "Galaxy S24 Ultra", price: 1398000, quantity: 1 }
      ],
      totalAmount: 1398000,
      status: "delivered",
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-12"
    }
  ]
};

// 유틸리티 함수들
const Utils = {
  // 숫자를 한국 통화 형식으로 변환
  formatPrice(price) {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  },

  // 할인율 계산
  calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
  },

  // 날짜 형식 변환
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  },

  // 점수에 따른 등급 반환
  getScoreGrade(score) {
    if (score >= 90) return '우수';
    if (score >= 80) return '양호';
    if (score >= 70) return '보통';
    return '개선필요';
  },

  // 점수에 따른 색상 반환
  getScoreColor(score) {
    if (score >= 90) return 'var(--success-600)';
    if (score >= 80) return 'var(--primary-600)';
    if (score >= 70) return 'var(--warning-600)';
    return 'var(--error-600)';
  },

  // 디바운스 함수
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 로컬 스토리지 래퍼
  storage: {
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch {
        return null;
      }
    },

    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key) {
      localStorage.removeItem(key);
    }
  },

  // 모달 관리
  modal: {
    show(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    },

    hide(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  },

  // Toast 알림
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    const colors = {
      success: 'var(--success-600)',
      error: 'var(--error-600)',
      warning: 'var(--warning-600)',
      info: 'var(--primary-600)'
    };

    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    // 애니메이션
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
};

// API 모의 함수들
const API = {
  // 상품 검색
  async searchProducts(query, filters = {}) {
    // 실제로는 서버 API 호출
    await this.delay(300);

    let results = SampleData.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );

    // 필터 적용
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.brands && filters.brands.length > 0) {
      results = results.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.inStockOnly) {
      results = results.filter(p => p.inStock);
    }

    // 정렬
    if (filters.sortBy === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'score') {
      results.sort((a, b) => b.score - a.score);
    }

    return { products: results, total: results.length };
  },

  // 상품 상세 정보
  async getProduct(id) {
    await this.delay(200);
    const product = SampleData.products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('상품을 찾을 수 없습니다.');

    // 리뷰 정보 추가
    const reviews = SampleData.reviews.filter(r => r.productId === product.id);
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return {
      ...product,
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    };
  },

  // 가성비 점수 계산
  async calculateValueScore(productId, userPreferences = null) {
    await this.delay(2000); // 계산 시간 시뮬레이션

    const product = SampleData.products.find(p => p.id === productId);
    if (!product) throw new Error('상품을 찾을 수 없습니다.');

    // 기본 가중치 또는 사용자 설정 가중치 사용
    const weights = userPreferences || { priceWeight: 40, performanceWeight: 35, reviewWeight: 25 };

    // 점수 계산 시뮬레이션
    const priceScore = Math.max(0, 100 - (product.price / 20000)); // 가격 점수
    const performanceScore = 85; // 성능 점수 (실제로는 벤치마크 결과 등 사용)
    const reviewScore = product.score || 80; // 리뷰 점수

    const finalScore = Math.round(
      (priceScore * weights.priceWeight / 100) +
      (performanceScore * weights.performanceWeight / 100) +
      (reviewScore * weights.reviewWeight / 100)
    );

    return {
      totalScore: Math.min(100, Math.max(0, finalScore)),
      breakdown: {
        price: Math.round(priceScore),
        performance: performanceScore,
        review: reviewScore
      },
      weights,
      grade: Utils.getScoreGrade(finalScore),
      analysis: {
        strengths: ["우수한 성능", "합리적인 가격"],
        weaknesses: ["배터리 용량", "무게"],
        comparison: "동급 제품 대비 95% 수준"
      }
    };
  },

  // 개인화 추천
  async getPersonalizedRecommendations(userPreferences) {
    await this.delay(500);

    // 사용자 선호도 기반 추천 시뮬레이션
    const recommendations = SampleData.products
      .filter(p => p.inStock)
      .slice(0, 5)
      .map(product => ({
        ...product,
        personalScore: Math.min(100, product.score + Math.random() * 10),
        reason: [
          "사용자 선호 브랜드",
          "예산 범위 내 최고 성능",
          "높은 가성비 점수"
        ][Math.floor(Math.random() * 3)]
      }))
      .sort((a, b) => b.personalScore - a.personalScore);

    return recommendations;
  },

  // 주문 생성
  async createOrder(orderData) {
    await this.delay(1000);

    const orderId = `ORDER-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const order = {
      id: orderId,
      ...orderData,
      status: 'confirmed',
      orderDate: new Date().toISOString().split('T')[0]
    };

    // 실제로는 서버에 저장
    SampleData.orders.push(order);

    return order;
  },

  // 사용자 주문 내역
  async getUserOrders(userId) {
    await this.delay(300);
    return SampleData.orders.filter(order => order.userId === userId);
  },

  // 지연 함수 (API 호출 시뮬레이션)
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// 페이지 네비게이션
const Router = {
  navigate(page, params = {}) {
    const url = new URL(window.location);
    url.pathname = `/${page}.html`;

    // 파라미터 추가
    Object.keys(params).forEach(key => {
      url.searchParams.set(key, params[key]);
    });

    window.location.href = url.toString();
  },

  getParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }
};

// 공통 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
  // 현재 페이지 설정
  AppState.currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

  // 장바구니 UI 업데이트
  AppState.updateCartUI();

  // 로그인 상태 복원
  const savedUser = Utils.storage.get('user');
  if (savedUser) {
    AppState.setUser(savedUser);
  }

  // 공통 이벤트 리스너
  setupCommonEventListeners();
});

function setupCommonEventListeners() {
  // 모든 장바구니 버튼
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.productId);
      const product = SampleData.products.find(p => p.id === productId);
      if (product) {
        AppState.addToCart(product);
        Utils.showToast('장바구니에 추가되었습니다.', 'success');
      }
    }
  });

  // 모달 닫기
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
      const modal = e.target.closest('.modal-overlay');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal-overlay');
      modals.forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.style.overflow = '';
    }
  });
}

// 전역 객체로 내보내기
window.AppState = AppState;
window.SampleData = SampleData;
window.Utils = Utils;
window.API = API;
window.Router = Router;