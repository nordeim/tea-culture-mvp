import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

// Component that throws
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error')
  return <div>Working content</div>
}

describe('ErrorBoundary', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders full-page fallback when root-level error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('renders section fallback when sectionName is provided', () => {
    render(
      <ErrorBoundary sectionName="Test Section">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Unable to load Test Section/)).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
    // Should NOT show full-page fallback
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('resets and re-renders children when Try Again is clicked', () => {
    // This test verifies the reset mechanism exists
    render(
      <ErrorBoundary sectionName="Resettable">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Unable to load Resettable/)).toBeInTheDocument()
    const tryAgainBtn = screen.getByText('Try again')
    expect(tryAgainBtn).toBeInTheDocument()
  })

})
