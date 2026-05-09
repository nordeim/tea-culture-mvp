import { Leaf } from 'lucide-react'

const shopLinks = [
  { label: 'All Teas', href: '#' },
  { label: 'Teaware', href: '#' },
  { label: 'Gift Sets', href: '#' },
  { label: 'Subscriptions', href: '#' },
  { label: 'New Arrivals', href: '#' },
]

const learnLinks = [
  { label: 'Brewing Guides', href: '#' },
  { label: 'Tea Types 101', href: '#' },
  { label: 'Tea Ceremony', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Origin Stories', href: '#' },
]

const companyLinks = [
  { label: 'Our Story', href: '#' },
  { label: 'Sustainability', href: '#' },
  { label: 'Partner Gardens', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Wholesale', href: '#' },
]

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-bark-900 text-ivory-400 pt-20 pb-10 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-40" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-tea-500 flex items-center justify-center">
                <Leaf className="text-ivory-100 w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-ivory-100">茶源</span>
                <span className="font-display text-xs block tracking-[0.25em] text-gold-400 -mt-0.5">CHA YUAN</span>
              </div>
            </div>
            <p className="text-sm text-ivory-500 leading-relaxed mb-6">
              Where ancient tea wisdom meets modern life. Curating the world's finest teas since 1892.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-ivory-700 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-ivory-700 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-ivory-700 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-ivory-700 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-ivory-500 hover:text-gold-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5">Learn</h4>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-ivory-500 hover:text-gold-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ivory-100 tracking-wide uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-ivory-500 hover:text-gold-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-ivory-800 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory-600">&copy; 2024 Cha Yuan Tea House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-ivory-600 hover:text-gold-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
