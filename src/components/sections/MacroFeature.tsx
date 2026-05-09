import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function MacroFeature() {
  return (
    <section className="paper-texture py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-gold-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">
              <span className="w-6 h-px bg-gold-500" />
              The Leaf
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-bark-800 leading-tight mb-6">
              Every Leaf Tells a
              <br />
              <span className="text-tea-600 italic">Story of Terroir</span>
            </h2>
            <p className="text-bark-700/80 text-base leading-relaxed mb-6">
              The shape, color, and texture of a tea leaf reveal its journey — from the soil it grew in to the
              hands that processed it. Our master blenders examine each batch under natural light, reading the
              leaf like a map of its origin.
            </p>
            <p className="text-bark-700/80 text-base leading-relaxed mb-8">
              The tight roll of a Tie Guan Yin, the silver down of a Silver Needle, the deep amber of aged
              Pu'erh — these are nature's signatures, authentic and unmistakable.
            </p>
            <a
              href="#collection"
              className="inline-flex items-center gap-2 bg-tea-600 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-tea-700 transition-all active:scale-[0.97]"
            >
              Explore Single Origins
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* Macro Image */}
          <div className="order-1 md:order-2 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/seed/tea-leaf-macro-close/800/900.jpg"
                alt="Tea Leaf Macro"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating Label */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500 font-medium">Origin</p>
              <p className="font-display text-sm font-semibold text-bark-800">Fujian, China</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
