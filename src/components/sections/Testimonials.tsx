import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const testimonials = [
  {
    name: 'Sophia Lin',
    role: 'Tea Enthusiast',
    location: 'Vancouver',
    initials: 'SL',
    avatarBg: 'bg-tea-100',
    avatarText: 'text-tea-700',
    quote: 'The Connoisseur Box has become my monthly ritual. Every selection is a revelation — I\'ve discovered teas I never knew existed. The tasting notes are poetry.',
  },
  {
    name: 'Marcus Kim',
    role: 'Executive Chef',
    location: 'London',
    initials: 'MK',
    avatarBg: 'bg-terra-300/20',
    avatarText: 'text-terra-600',
    quote: 'As a chef, I appreciate the nuance and quality. Their Wuyi Rock Oolong is the finest I\'ve tasted outside of China. Exceptional sourcing and care in every package.',
  },
  {
    name: 'Emma Wright',
    role: 'Writer',
    location: 'Portland',
    initials: 'EW',
    avatarBg: 'bg-gold-300/20',
    avatarText: 'text-gold-600',
    quote: 'I gifted the Discovery Box to my mother — she now calls it her \'monthly meditation.\' The presentation is beautiful, the teas are transformative. We\'re both hooked.',
  },
]

export function Testimonials() {
  return (
    <section className="paper-texture py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-gold-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">
            <span className="w-6 h-px bg-gold-500" />
            Testimonials
            <span className="w-6 h-px bg-gold-500" />
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-bark-800">
            From Our <span className="text-tea-600 italic">Community</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-ivory-300 hover:border-gold-300 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-bark-700/80 text-sm leading-relaxed mb-6 italic font-serif">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center`}>
                  <span className={`font-display text-sm font-semibold ${t.avatarText}`}>{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-bark-800">{t.name}</p>
                  <p className="text-xs text-bark-700/50">{t.role}, {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
