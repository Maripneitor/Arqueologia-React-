// src/setupTests.js
import '@testing-library/jest-dom';

// Mock para IntersectionObserver (necesario para Framer Motion y componentes que usan whileInView)
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
}

// Mock para scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});

// Mock para matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Asignar el mock a window
window.IntersectionObserver = MockIntersectionObserver;

// Mock para Swiper (si es necesario en pruebas futuras)
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
  Autoplay: () => null,
  EffectFade: () => null,
}));