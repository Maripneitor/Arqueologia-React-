// src/setupTests.js - VERSIÓN MÍNIMA Y FUNCIONAL
import '@testing-library/jest-dom';

// Mock básico para IntersectionObserver
class MockIntersectionObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock básico para Framer Motion (sin crear elementos React manualmente)
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('div', { ...props, ref }, children)
      ),
      header: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('header', { ...props, ref }, children)
      ),
      h1: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('h1', { ...props, ref }, children)
      ),
      h2: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('h2', { ...props, ref }, children)
      ),
      h3: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('h3', { ...props, ref }, children)
      ),
      p: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('p', { ...props, ref }, children)
      ),
      section: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('section', { ...props, ref }, children)
      ),
      button: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('button', { ...props, ref }, children)
      ),
    },
    AnimatePresence: ({ children }) => children,
    useScroll: () => ({
      scrollY: {
        current: 0,
      },
    }),
    useMotionValueEvent: vi.fn(),
  };
});