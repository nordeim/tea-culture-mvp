import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}))

describe('Navbar', () => {
  it('renders the logo with brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('茶源')).toBeInTheDocument()
    expect(screen.getByText('CHA YUAN')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Navbar />)
    expect(screen.getAllByText('Philosophy').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Collection').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tea Culture').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Subscribe').length).toBeGreaterThanOrEqual(1)
  })

  it('toggles mobile menu on button click', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    expect(screen.getByText('Visit Shop')).toBeInTheDocument()
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    const philosophyLinks = screen.getAllByText('Philosophy')
    fireEvent.click(philosophyLinks[philosophyLinks.length - 1])
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('closes mobile menu on Escape key', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('has aria-expanded on mobile menu button', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('has aria-controls pointing to mobile menu', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  it('mobile menu has aria-modal when open', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    const menu = document.getElementById('mobile-menu')
    expect(menu).toHaveAttribute('aria-modal', 'true')
  })
})
