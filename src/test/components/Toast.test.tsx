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
})
