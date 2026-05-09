import { Flame, Eye, BookOpen, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const cultureCards = [
  {
    title: 'Brewing Methods',
    description: 'Master the gongfu cha style, learn water temperatures, and discover the perfect steeping times for each tea type.',
    icon: Flame,
    iconBg: 'bg-gold-500/20',
    iconColor: 'text-gold-400',
    image: 'https://picsum.photos/seed/tea-brewing-pour/600/800.jpg',
  },
  {
    title: 'Tasting Notes',
    description: 'Develop your palate with our sensory guide — from visual appreciation to the lingering aftertaste (hui gan).',
    icon: Eye,
    iconBg: 'bg-tea-500/20',
    iconColor: 'text-tea-400',
    image: 'https://picsum.photos/seed/tea-tasting-ceremony/600/800.jpg',
    delay: 150,
  },
  {
    title: 'History & Lore',
    description: 'Journey through 5,000 years of tea — from Shennong\'s legendary discovery to the Silk Road tea trade.',
    icon: BookOpen,
    iconBg: 'bg-terra-400/20',
    iconColor: 'text-terra-300',
    image: 'https://picsum.photos/seed/tea-history-ancient/600/800.jpg',
    delay: 300,
  },
]

const tempGuide = [
  { temp: '80°C', label: 'Green Tea' },
  { temp: '95°C', label: 'Oolong Tea' },
  { temp: '100°C', label: 'Black & Pu\'erh' },
  { temp: '75°C', label: 'White Tea' },
]

export function TeaCulture() {
  return (
    <section id="culture" className="bg-bark-800 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tea-900/30 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
            <span className="w-6 h-px bg-gold-400" />
            Tea Culture
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory-100 mb-4">
            The Art of <span className="text-gold-400 italic">Slow Tea</span>
          </h2>
          <p className="text-ivory-400/70 max-w-2xl mx-auto leading-relaxed">
            Discover the rituals, wisdom, and meditative practices that transform a simple cup into a moment of profound presence.
          </p>
        </ScrollReveal>

        {/* Culture Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cultureCards.map((card) => (
            <ScrollReveal key={card.title} delay={card.delay ?? 0} className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bark-900/90 via-bark-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} backdrop-blur flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ivory-100 mb-2">{card.title}</h3>
                <p className="text-ivory-300/80 text-sm leading-relaxed mb-4">{card.description}</p>
                <span className="inline-flex items-center gap-1 text-gold-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Quick Guide Strip */}
        <ScrollReveal className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {tempGuide.map((item) => (
            <div key={item.temp} className="text-center p-6 rounded-xl border border-white/10 bg-white/5">
              <span className="font-display text-3xl font-bold text-gold-400">{item.temp}</span>
              <p className="text-ivory-400/70 text-sm mt-2">{item.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
