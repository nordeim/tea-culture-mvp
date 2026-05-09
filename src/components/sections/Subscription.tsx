import { Package, BookOpen, Gift } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useToastStore } from '@/stores/toast'
import { cn } from '@/lib/utils'

const plans = [
  {
    id: 'discovery',
    name: 'Discovery Box',
    description: '3 teas · Perfect for beginners',
    price: 29,
    popular: false,
    btnLabel: 'Start Discovery',
    btnStyle: 'border border-gold-400/40 text-gold-400 hover:bg-gold-400/10',
  },
  {
    id: 'connoisseur',
    name: 'Connoisseur Box',
    description: '4 teas · Rare & seasonal selections',
    price: 49,
    popular: true,
    btnLabel: 'Subscribe Now',
    btnStyle: 'bg-gold-500 text-bark-900 font-semibold hover:bg-gold-400 active:scale-[0.98]',
  },
  {
    id: 'master',
    name: "Master's Reserve",
    description: '5 teas · Aged & limited edition',
    price: 79,
    popular: false,
    btnLabel: 'Join the Reserve',
    btnStyle: 'border border-gold-400/40 text-gold-400 hover:bg-gold-400/10',
  },
]

const whatsInside = [
  { icon: Package, title: '3-4 Curated Teas', desc: 'Seasonal selections, enough for 30+ cups' },
  { icon: BookOpen, title: 'Tasting Journal', desc: 'Detailed notes, origin stories, brewing tips' },
  { icon: Gift, title: 'Surprise Element', desc: 'Teaware, snacks, or rare limited editions' },
]

export function Subscription() {
  const showToast = useToastStore((s) => s.showToast)

  const handleSubscribe = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (plan) {
      showToast(`Selected: ${plan.name} — $${plan.price}/mo. Redirecting to checkout...`, 'package')
    }
  }

  return (
    <section id="subscribe" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/tea-box-subscription/1920/1080.jpg"
          alt="Tea Box"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-bark-900/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
              <span className="w-6 h-px bg-gold-400" />
              Monthly Curation
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory-100 leading-tight mb-6">
              A Journey Through
              <br />
              <span className="text-gold-400 italic">Tea, Delivered</span>
            </h2>
            <p className="text-ivory-300/80 text-base leading-relaxed mb-8">
              Each month, our tea masters curate a selection of seasonal, rare, and single-origin teas —
              accompanied by tasting notes, brewing guides, and the story behind each leaf. Experience the
              world's finest teas without leaving home.
            </p>

            {/* What's Inside */}
            <div className="space-y-4 mb-10">
              {whatsInside.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-ivory-100">{item.title}</h4>
                    <p className="text-sm text-ivory-400/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="space-y-5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'backdrop-blur-lg rounded-2xl p-6 transition-all cursor-pointer group',
                  plan.popular
                    ? 'bg-gold-500/10 border border-gold-400/50 relative'
                    : 'bg-white/10 border border-white/10 hover:border-gold-400/40'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6 bg-gold-500 text-bark-900 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ivory-100">{plan.name}</h3>
                    <p className="text-sm text-ivory-400/70 mt-0.5">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-gold-400">${plan.price}</span>
                    <span className="text-ivory-400/60 text-sm">/mo</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={cn('w-full py-2.5 rounded-xl text-sm transition-all', plan.btnStyle)}
                >
                  {plan.btnLabel}
                </button>
              </div>
            ))}

            <p className="text-center text-ivory-500/60 text-xs mt-4">
              Free shipping worldwide · Cancel anytime · Gift options available
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
