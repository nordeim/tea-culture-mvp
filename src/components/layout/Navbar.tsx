import { useState, useEffect, useCallback, useRef } from 'react'
import { Leaf, ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#collection', label: 'Collection' },
  { href: '#culture', label: 'Tea Culture' },
  { href: '#subscribe', label: 'Subscribe' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  // Close on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled && 'bg-ivory-50/95 backdrop-blur-xl shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-tea-500 flex items-center justify-center group-hover:bg-tea-600 transition-colors">
              <Leaf className="text-ivory-100 w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold tracking-wide text-bark-800">茶源</span>
              <span className="font-display text-xs block tracking-[0.25em] text-gold-500 -mt-0.5">CHA YUAN</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-bark-700 hover:text-gold-500 transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#shop"
              className="relative inline-flex items-center gap-2 bg-bark-800 text-ivory-100 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-bark-900 transition-all active:scale-[0.97]"
            >
              <ShoppingBag className="text-gold-400 w-4 h-4" />
              Shop
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-ivory-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-bark-800" />
            ) : (
              <Menu className="w-5 h-5 text-bark-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal={isMobileMenuOpen}
        aria-label="Navigation menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          'md:hidden bg-ivory-50/95 backdrop-blur-xl border-t border-ivory-300 overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        {...(!isMobileMenuOpen ? { inert: true } : {})}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-bark-700 py-2 hover:text-gold-500 transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#shop"
            className="inline-flex items-center gap-2 bg-bark-800 text-ivory-100 px-6 py-3 rounded-full text-sm font-medium mt-2"
            onClick={closeMobileMenu}
          >
            <ShoppingBag className="text-gold-400 w-4 h-4" />
            Visit Shop
          </a>
        </div>
      </div>
    </nav>
  )
}
