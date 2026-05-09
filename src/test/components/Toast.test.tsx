import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Toast } from '@/components/shared/Toast'
import { useToastStore } from '@/stores/toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useToastStore.getState().hideToast()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders hidden by default', () => {
    render(<Toast />)
    const toast = screen.getByRole('alert')
    expect(toast).toHaveClass('opacity-0')
  })

  it('becomes visible when showToast is called', () => {
    render(<Toast />)
    act(() => {
      useToastStore.getState().showToast('Test message')
    })
    const toast = screen.getByRole('alert')
    expect(toast).toHaveClass('opacity-100')
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('auto-dismisses after 3.5 seconds', () => {
    render(<Toast />)
    act(() => {
      useToastStore.getState().showToast('Auto dismiss test')
    })
    expect(screen.getByRole('alert')).toHaveClass('opacity-100')

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(screen.getByRole('alert')).toHaveClass('opacity-0')
  })

  it('cancels previous timeout on rapid successive calls', () => {
    render(<Toast />)
    act(() => {
      useToastStore.getState().showToast('First message')
    })
    expect(screen.getByText('First message')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      useToastStore.getState().showToast('Second message')
    })
    expect(screen.getByText('Second message')).toBeInTheDocument()

    // Advance past the first timeout (was 3500ms, already 1000ms elapsed)
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    // Should still be visible — second call's timeout (3500ms from call) hasn't elapsed
    expect(screen.getByRole('alert')).toHaveClass('opacity-100')

    // Advance remaining 500ms to hit the second timeout
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByRole('alert')).toHaveClass('opacity-0')
  })
})
