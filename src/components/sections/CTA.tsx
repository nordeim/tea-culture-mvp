import { ShoppingBag, Gift, Truck, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const trustBadges = [
  { icon: Truck, label: 'Free Shipping $50+' },
  { icon: ShieldCheck, label: '100% Organic' },
  { icon: Leaf, label: 'Sustainably Sourced' },
  { icon: HeartHandshake, label: 'Fair Trade' },
]

export function CTA() {
  return (
    <section id="shop" className="bg-tea-600 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-10 left-10">
          <Leaf className="w-32 h-32 text-tea-200 opacity-20" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Leaf className="w-24 h-24 text-tea-200 opacity-15 rotate-45" />
        </div>
        <div className="absolute top-1/2 left-1/3">
          <Leaf className="w-16 h-16 text-tea-200 opacity-10 -rotate-12" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 text-tea-100 text-xs tracking-[0.3em] uppercase font-medium mb-4">
            <span className="w-6 h-px bg-tea-100" />
            Online Store
            <span className="w-6 h-px bg-tea-100" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-white mb-6">
            Begin Your <span className="text-gold-300 italic">Tea Journey</span>
          </h2>
          <p className="text-tea-100/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Visit our online store to explore the complete collection. From everyday brews to rare reserves —
            find the tea that speaks to your soul.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white text-bark-800 px-10 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-ivory-100 transition-all active:scale-[0.97] shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-gold-500" />
              Visit Our Store
            </a>
            <a
              href="#subscribe"
              className="inline-flex items-center gap-3 bg-transparent text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide border border-white/30 hover:bg-white/10 transition-all active:scale-[0.97]"
            >
              <Gift className="w-4 h-4 text-tea-100" />
              Gift a Subscription
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 text-tea-100/70">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4" />
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
