import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BackToTop } from '@/components/shared/BackToTop'

describe('BackToTop', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('is hidden when page is at top', () => {
    render(<BackToTop />)
    const button = screen.getByLabelText('Back to top')
    expect(button).toHaveClass('opacity-0')
    expect(button).toHaveClass('pointer-events-none')
  })

  it('becomes visible when scrolled past 600px', () => {
    render(<BackToTop />)
    const button = screen.getByLabelText('Back to top')

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 700, writable: true })
    act(() => {
      fireEvent.scroll(window)
    })

    expect(button).toHaveClass('opacity-100')
    expect(button).not.toHaveClass('pointer-events-none')
  })

  it('calls scrollTo with smooth behavior when clicked', () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy

    render(<BackToTop />)
    const button = screen.getByLabelText('Back to top')

    fireEvent.click(button)
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('has correct aria-label', () => {
    render(<BackToTop />)
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument()
  })
})
