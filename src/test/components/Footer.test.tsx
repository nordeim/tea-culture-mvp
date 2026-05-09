import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />)
    expect(screen.getByText('茶源')).toBeInTheDocument()
    expect(screen.getByText('CHA YUAN')).toBeInTheDocument()
  })

  it('renders shop links', () => {
    render(<Footer />)
    expect(screen.getByText('All Teas')).toBeInTheDocument()
    expect(screen.getByText('Teaware')).toBeInTheDocument()
    expect(screen.getByText('Gift Sets')).toBeInTheDocument()
  })

  it('renders learn links', () => {
    render(<Footer />)
    expect(screen.getByText('Brewing Guides')).toBeInTheDocument()
    expect(screen.getByText('Tea Types 101')).toBeInTheDocument()
  })

  it('renders company links', () => {
    render(<Footer />)
    expect(screen.getByText('Our Story')).toBeInTheDocument()
    expect(screen.getByText('Sustainability')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders social media links with aria-labels', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    expect(screen.getByText('Privacy')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Returns')).toBeInTheDocument()
  })

  it('renders heritage description', () => {
    render(<Footer />)
    expect(screen.getByText(/ancient tea wisdom/)).toBeInTheDocument()
  })
})
