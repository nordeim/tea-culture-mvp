import { Leaf, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/teagarden-misty/1920/1080.jpg"
          alt="Misty morning at a Yunnan tea garden with rows of tea bushes"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0 hidden md:block" />
        <div className="hero-overlay-mobile absolute inset-0 md:hidden" />
      </div>

      {/* Floating Tea Leaves Decoration */}
      <div className="absolute top-32 right-16 opacity-20 hidden lg:block" aria-hidden="true">
        <Leaf className="w-16 h-16 text-tea-300 leaf-float" />
      </div>
      <div className="absolute top-48 right-48 opacity-10 hidden lg:block" aria-hidden="true">
        <Leaf className="w-10 h-10 text-tea-200 leaf-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28 pt-32">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
            <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-6">
              <span className="w-8 h-px bg-gold-400" />
              Since 1892
            </span>
          </div>
          <h1
            className="animate-fade-in-up opacity-0 font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-ivory-50 leading-[1.1] tracking-tight mb-6"
            style={{ animationDelay: '400ms' }}
          >
            Where Ancient
            <br />
            <span className="text-gold-400 italic">Tea Wisdom</span>
            <br />
            Meets Modern Life
          </h1>
          <p
            className="animate-fade-in-up opacity-0 text-ivory-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            style={{ animationDelay: '600ms' }}
          >
            From the misty peaks of Yunnan to your cup — we curate the finest single-origin teas,
            honoring centuries of tradition while embracing the rhythm of contemporary living.
          </p>
          <div className="animate-fade-in-up opacity-0 flex flex-wrap gap-4" style={{ animationDelay: '800ms' }}>
            <a
              href="#collection"
              className="inline-flex items-center gap-2 bg-gold-500 text-bark-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gold-400 transition-all active:scale-[0.97]"
            >
              Explore Our Teas
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#culture"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-ivory-100 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border border-white/20 hover:bg-white/20 transition-all active:scale-[0.97]"
            >
              Tea Ceremony
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="animate-fade-in opacity-0 absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
          style={{ animationDelay: '1.2s' }}
        >
          <span className="text-ivory-400 text-[10px] tracking-[0.2em] uppercase rotate-90 mb-8">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}
