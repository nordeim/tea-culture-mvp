import { Mountain, Heart, Leaf, Globe } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const values = [
  {
    icon: Mountain,
    title: 'Single Origin',
    description: 'Sourced from one garden, one season',
    bg: 'bg-tea-100',
    color: 'text-tea-600',
  },
  {
    icon: Heart,
    title: 'Hand Crafted',
    description: 'Traditional processing methods',
    bg: 'bg-terra-300/20',
    color: 'text-terra-500',
  },
  {
    icon: Leaf,
    title: 'Organic',
    description: 'Certified organic cultivation',
    bg: 'bg-gold-300/20',
    color: 'text-gold-600',
  },
  {
    icon: Globe,
    title: 'Sustainable',
    description: 'Eco-conscious from farm to cup',
    bg: 'bg-tea-100',
    color: 'text-tea-600',
  },
]

export function Philosophy() {
  return (
    <section id="philosophy" className="paper-texture py-24 md:py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-40" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-tea-200/20 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/seed/tea-ceremony-zen/800/1000.jpg"
                alt="Tea Ceremony"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bark-900/30 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-ivory-50 rounded-2xl p-5 shadow-lg border border-ivory-300">
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-gold-500">130+</span>
                <p className="text-xs text-bark-700 mt-1 tracking-wide">Years of Heritage</p>
              </div>
            </div>
            {/* Steam Effect */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="w-1 h-8 bg-gradient-to-t from-transparent to-white/40 rounded-full steam" />
              <div className="w-1 h-6 bg-gradient-to-t from-transparent to-white/30 rounded-full steam-delayed" />
              <div className="w-1 h-7 bg-gradient-to-t from-transparent to-white/35 rounded-full steam-delayed-2" />
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="inline-flex items-center gap-2 text-gold-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">
              <span className="w-6 h-px bg-gold-500" />
              Our Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-bark-800 leading-tight mb-6">
              Rooted in Tradition,
              <br />
              <span className="text-tea-600 italic">Steeped in Mindfulness</span>
            </h2>
            <p className="text-bark-700/80 text-base leading-relaxed mb-6">
              At Cha Yuan, we believe tea is more than a beverage — it is a meditation, a bridge between past
              and present. Each leaf is hand-selected from heritage gardens where terroir speaks through flavor.
            </p>
            <p className="text-bark-700/80 text-base leading-relaxed mb-8">
              Our master tea artisans, following traditions passed through five generations, ensure that every
              batch carries the soul of its origin — from the rolling hills of Fujian to the ancient forests of
              Yunnan.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${value.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <value.icon className={`w-5 h-5 ${value.color}`} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-bark-800">{value.title}</h4>
                    <p className="text-xs text-bark-700/70 mt-1 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
