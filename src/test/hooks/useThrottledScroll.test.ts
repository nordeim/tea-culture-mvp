import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useThrottledScroll } from '@/hooks/useThrottledScroll'

describe('useThrottledScroll', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      return window.setTimeout(cb, 16)
    })
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      window.clearTimeout(id)
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('calls callback after throttle delay', () => {
    const callback = vi.fn()
    renderHook(() => useThrottledScroll(callback, 100))

    // Simulate scroll
    window.dispatchEvent(new Event('scroll'))
    expect(callback).not.toHaveBeenCalled()

    // Advance past rAF (16ms) + throttle delay (100ms)
    vi.advanceTimersByTime(120)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('throttles multiple rapid scrolls to single callback', () => {
    const callback = vi.fn()
    renderHook(() => useThrottledScroll(callback, 100))

    // Simulate 5 rapid scrolls
    for (let i = 0; i < 5; i++) {
      window.dispatchEvent(new Event('scroll'))
    }

    // Should only call once after rAF + throttle delay
    vi.advanceTimersByTime(120)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('receives latest scrollY value', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    const callback = vi.fn()
    renderHook(() => useThrottledScroll(callback, 50))

    window.dispatchEvent(new Event('scroll'))
    vi.advanceTimersByTime(70)

    expect(callback).toHaveBeenCalledWith(500)
  })

  it('does not call callback if unmounted before delay', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => useThrottledScroll(callback, 100))

    window.dispatchEvent(new Event('scroll'))
    unmount()
    vi.advanceTimersByTime(100)

    expect(callback).not.toHaveBeenCalled()
  })
})
