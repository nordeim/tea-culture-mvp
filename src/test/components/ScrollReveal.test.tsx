import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

describe('ScrollReveal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders children wrapped in reveal class', () => {
    const { container } = render(<ScrollReveal>Test content</ScrollReveal>)
    const revealDiv = container.querySelector('.reveal')
    expect(revealDiv).toBeInTheDocument()
    expect(revealDiv).toHaveTextContent('Test content')
  })

  it('adds active class when IntersectionObserver fires (no delay)', () => {
    const { container } = render(<ScrollReveal>Content</ScrollReveal>)
    const revealDiv = container.querySelector('.reveal')!
    // Mock IO fires synchronously, setTimeout(fn, undefined) = setTimeout(fn, 0)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(revealDiv).toHaveClass('active')
  })

  it('adds active class after specified delay', () => {
    const { container } = render(<ScrollReveal delay={200}>Delayed content</ScrollReveal>)
    const revealDiv = container.querySelector('.reveal')!

    // Should not have active class before delay
    expect(revealDiv).not.toHaveClass('active')

    // Advance past the delay
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(revealDiv).toHaveClass('active')
  })

  it('applies custom className alongside reveal', () => {
    const { container } = render(<ScrollReveal className="custom-class">Content</ScrollReveal>)
    const revealDiv = container.querySelector('.reveal')!
    expect(revealDiv).toHaveClass('reveal')
    expect(revealDiv).toHaveClass('custom-class')
  })
})
