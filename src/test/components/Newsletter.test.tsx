import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Newsletter } from '@/components/sections/Newsletter'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}))

describe('Newsletter', () => {
  it('renders the form with email input and submit button', () => {
    render(<Newsletter />)
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument()
    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Newsletter />)
    expect(screen.getByText(/Inner Circle/)).toBeInTheDocument()
  })

  it('shows confirmation message after valid email submission', async () => {
    render(<Newsletter />)
    const input = screen.getByPlaceholderText('Your email address')
    const button = screen.getByText('Subscribe')

    fireEvent.change(input, { target: { value: 'test@example.com' } })

    await act(async () => {
      fireEvent.click(button)
    })

    // Wait for the async action to complete
    await screen.findByText(/Welcome to the Inner Circle/)
  })
})
