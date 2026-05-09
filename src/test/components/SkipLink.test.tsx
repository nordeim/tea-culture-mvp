import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkipLink } from '@/components/shared/SkipLink'

describe('SkipLink', () => {
  it('renders a link to #main-content', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('is visually hidden by default (sr-only)', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    // sr-only applies position:absolute with clip/overflow, check it has the class
    expect(link.className).toContain('sr-only')
  })
})
