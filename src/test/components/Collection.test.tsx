import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Collection } from '@/components/sections/Collection'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}))

describe('Collection', () => {
  it('renders the section header', () => {
    render(<Collection />)
    expect(screen.getByText(/Curated by/)).toBeInTheDocument()
  })

  it('shows By Origin tab content by default', () => {
    render(<Collection />)
    expect(screen.getByText('Yunnan Pu\'erh')).toBeInTheDocument()
    expect(screen.getByText('Longjing Dragon Well')).toBeInTheDocument()
  })

  it('switches to Fermentation tab on click', () => {
    render(<Collection />)
    const fermentTab = screen.getByText('Fermentation')
    fireEvent.click(fermentTab)
    expect(screen.getByText('White')).toBeInTheDocument()
    expect(screen.getByText('Silver Needle')).toBeInTheDocument()
  })

  it('switches to By Season tab on click', () => {
    render(<Collection />)
    const seasonTab = screen.getByText('By Season')
    fireEvent.click(seasonTab)
    expect(screen.getByText('Spring')).toBeInTheDocument()
    expect(screen.getByText('Summer')).toBeInTheDocument()
    expect(screen.getByText('Autumn')).toBeInTheDocument()
    expect(screen.getByText('Winter')).toBeInTheDocument()
  })

  it('returns to origin tab when clicked again', () => {
    render(<Collection />)
    fireEvent.click(screen.getByText('Fermentation'))
    expect(screen.getByText('White')).toBeInTheDocument()
    fireEvent.click(screen.getByText('By Origin'))
    expect(screen.getByText('Yunnan Pu\'erh')).toBeInTheDocument()
  })

  it('has correct ARIA roles on tabs', () => {
    render(<Collection />)
    const tablist = screen.getByRole('tablist')
    expect(tablist).toBeInTheDocument()

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('has correct tabIndex on tabs (roving tabindex)', () => {
    render(<Collection />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    expect(tabs[2]).toHaveAttribute('tabindex', '-1')
  })

  it('product cards have role="link" and tabIndex', () => {
    render(<Collection />)
    const cards = screen.getAllByRole('link')
    // At least the product cards should have role="link"
    const productCards = cards.filter(c => c.getAttribute('tabindex') === '0')
    expect(productCards.length).toBeGreaterThan(0)
  })

  it('tab panels have correct role and aria-labelledby', () => {
    render(<Collection />)
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-by-origin')
  })
})
