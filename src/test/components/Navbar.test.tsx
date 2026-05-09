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
    // Use getAllByText since links appear in both desktop and mobile menus
    expect(screen.getAllByText('Philosophy').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Collection').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tea Culture').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Subscribe').length).toBeGreaterThanOrEqual(1)
  })

  it('toggles mobile menu on button click', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    expect(screen.getByText('Visit Shop')).toBeVisible()
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    const philosophyLinks = screen.getAllByText('Philosophy')
    // Click the mobile one (last one)
    fireEvent.click(philosophyLinks[philosophyLinks.length - 1])
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })
})
