import '@testing-library/jest-dom/vitest'

// Mock IntersectionObserver for jsdom
class MockIntersectionObserver {
  root = null
  rootMargin = ''
  thresholds: number[] = [0]
  scrollMargin = ''
  _callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this._callback = callback
  }

  observe() {
    this._callback(
      [{ isIntersecting: true } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  unobserve() {}
  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Mock scrollTo
window.scrollTo = () => {}
