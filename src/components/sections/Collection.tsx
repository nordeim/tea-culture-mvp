import { useState } from 'react'
import { ArrowRight, Sprout, Sun, Leaf, Snowflake } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { cn } from '@/lib/utils'

type TabId = 'by-origin' | 'by-ferment' | 'by-season'

const tabs: { id: TabId; label: string }[] = [
  { id: 'by-origin', label: 'By Origin' },
  { id: 'by-ferment', label: 'Fermentation' },
  { id: 'by-season', label: 'By Season' },
]

const originProducts = [
  {
    name: 'Yunnan Pu\'erh',
    type: 'Dark · Post-Fermented',
    dotColor: 'bg-bark-800',
    description: 'Earthy depth from ancient tea trees, 2019 vintage',
    price: '$48',
    weight: '50g · Loose Leaf',
    image: 'https://picsum.photos/seed/yunnan-puerh-tea/600/800.jpg',
  },
  {
    name: 'Longjing Dragon Well',
    type: 'Green · Unoxidized',
    dotColor: 'bg-tea-500',
    description: 'Pan-fired sweetness from Hangzhou\'s West Lake',
    price: '$62',
    weight: '40g · Loose Leaf',
    image: 'https://picsum.photos/seed/longjing-green/600/800.jpg',
  },
  {
    name: 'Wuyi Rock Oolong',
    type: 'Oolong · Semi-Oxidized',
    dotColor: 'bg-terra-400',
    description: 'Mineral complexity from Fujian\'s cliff gardens',
    price: '$55',
    weight: '45g · Loose Leaf',
    image: 'https://picsum.photos/seed/oolong-wuyi/600/800.jpg',
  },
  {
    name: 'Darjeeling First Flush',
    type: 'Black · Fully Oxidized',
    dotColor: 'bg-terra-300',
    description: 'Muscatel floral notes from Himalayan slopes',
    price: '$42',
    weight: '50g · Loose Leaf',
    image: 'https://picsum.photos/seed/darjeeling-first/600/800.jpg',
  },
]

const fermentTypes = [
  { name: 'White', oxidization: 'Delicate · 0% Oxidation', gradientFrom: 'from-tea-200', gradientTo: 'to-tea-400', teaName: 'Silver Needle', price: '$58 / 30g', delay: 0 },
  { name: 'Green', oxidization: 'Fresh · 0-5% Oxidation', gradientFrom: 'from-tea-300', gradientTo: 'to-tea-500', teaName: 'Dragon Well', price: '$62 / 40g', delay: 100 },
  { name: 'Oolong', oxidization: 'Complex · 15-70%', gradientFrom: 'from-terra-300', gradientTo: 'to-terra-500', teaName: 'Tie Guan Yin', price: '$45 / 50g', delay: 200 },
  { name: 'Black', oxidization: 'Rich · 100% Oxidation', gradientFrom: 'from-terra-400', gradientTo: 'to-bark-700', teaName: 'Lapsang Souchong', price: '$38 / 50g', delay: 300 },
  { name: 'Pu\'erh', oxidization: 'Deep · Post-Fermented', gradientFrom: 'from-bark-700', gradientTo: 'to-bark-900', teaName: 'Raw Pu\'erh 2018', price: '$72 / 50g', delay: 400 },
]

const seasons = [
  {
    name: 'Spring',
    months: 'March — May',
    icon: Sprout,
    iconBg: 'bg-tea-100',
    iconHoverBg: 'group-hover:bg-tea-200',
    iconColor: 'text-tea-600',
    labelColor: 'text-tea-600',
    description: 'First flush, delicate and vibrant. The most prized harvest of the year.',
    teas: [
      { name: 'Dragon Well', price: '$62' },
      { name: 'Bai Hao Yin Zhen', price: '$58' },
      { name: 'Shincha', price: '$54' },
    ],
  },
  {
    name: 'Summer',
    months: 'June — August',
    icon: Sun,
    iconBg: 'bg-gold-300/20',
    iconHoverBg: 'group-hover:bg-gold-300/30',
    iconColor: 'text-gold-600',
    labelColor: 'text-gold-500',
    description: 'Full-bodied and robust. Warm weather brings deeper flavor profiles.',
    teas: [
      { name: 'Darjeeling 2nd', price: '$38' },
      { name: 'Assam BOP', price: '$28' },
      { name: 'Oriental Beauty', price: '$66' },
    ],
  },
  {
    name: 'Autumn',
    months: 'September — November',
    icon: Leaf,
    iconBg: 'bg-terra-300/20',
    iconHoverBg: 'group-hover:bg-terra-300/30',
    iconColor: 'text-terra-500',
    labelColor: 'text-terra-500',
    description: 'Rich and aromatic. Cool nights concentrate complex flavors in the leaf.',
    teas: [
      { name: 'Tie Guan Yin', price: '$45' },
      { name: 'Wuyi Rock', price: '$55' },
      { name: 'Dian Hong', price: '$35' },
    ],
  },
  {
    name: 'Winter',
    months: 'December — February',
    icon: Snowflake,
    iconBg: 'bg-bark-700/10',
    iconHoverBg: 'group-hover:bg-bark-700/20',
    iconColor: 'text-bark-700',
    labelColor: 'text-bark-700/60',
    description: 'Warming and grounding. Aged teas and roasted oolongs for cozy moments.',
    teas: [
      { name: 'Ripe Pu\'erh', price: '$48' },
      { name: 'Hojicha', price: '$24' },
      { name: 'Chai Masala', price: '$22' },
    ],
  },
]

export function Collection() {
  const [activeTab, setActiveTab] = useState<TabId>('by-origin')

  return (
    <section id="collection" className="bg-ivory-50 py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-gold-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">
            <span className="w-6 h-px bg-gold-500" />
            Our Collection
            <span className="w-6 h-px bg-gold-500" />
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-bark-800 mb-4">
            Curated by <span className="text-tea-600 italic">Nature</span>
          </h2>
          <p className="text-bark-700/70 max-w-2xl mx-auto leading-relaxed">
            Explore our selection of premium teas, each telling the story of its terroir, season, and the artisan hands that crafted it.
          </p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12 border-b border-ivory-400 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 text-sm font-medium tracking-wide border-b-2 border-transparent transition-all',
                activeTab === tab.id
                  ? 'text-bark-800 border-bark-800 border-b-gold-500'
                  : 'text-bark-700/60 hover:text-bark-800'
              )}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Tab Content: By Origin */}
        {activeTab === 'by-origin' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {originProducts.map((product) => (
              <div
                key={product.name}
                className="tea-card group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-ivory-300 hover:border-gold-400 transition-all hover:shadow-lg"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="tea-card-img w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${product.dotColor}`} />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-bark-700/60 font-medium">{product.type}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-bark-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-bark-700/70 leading-relaxed mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-gold-600">{product.price}</span>
                    <span className="text-xs text-bark-700/50">{product.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: By Fermentation */}
        {activeTab === 'by-ferment' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {fermentTypes.map((type) => (
              <ScrollReveal key={type.name} delay={type.delay} className="text-center group cursor-pointer">
                <div className={`relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] bg-gradient-to-b ${type.gradientFrom} ${type.gradientTo} flex items-end justify-center`}>
                  <div className="p-6 text-white">
                    <span className="font-display text-2xl font-bold">{type.name}</span>
                    <p className="text-xs opacity-80 mt-1">{type.oxidization}</p>
                  </div>
                </div>
                <h4 className="font-display font-semibold text-bark-800">{type.teaName}</h4>
                <p className="text-sm text-gold-500 font-medium mt-1">{type.price}</p>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Tab Content: By Season */}
        {activeTab === 'by-season' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season) => (
              <div
                key={season.name}
                className="season-card group bg-white rounded-2xl p-6 border border-ivory-300 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl ${season.iconBg} flex items-center justify-center mb-4 ${season.iconHoverBg} transition-colors`}>
                  <season.icon className={`w-7 h-7 ${season.iconColor}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-bark-800 mb-1">{season.name}</h3>
                <p className={`text-xs ${season.labelColor} font-medium tracking-wide mb-3`}>{season.months}</p>
                <p className="text-sm text-bark-700/70 leading-relaxed mb-4">{season.description}</p>
                <div className="space-y-2">
                  {season.teas.map((tea) => (
                    <div key={tea.name} className="flex justify-between text-sm">
                      <span className="text-bark-700/80">{tea.name}</span>
                      <span className="text-gold-500 font-medium">{tea.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 text-gold-500 font-medium hover:text-gold-600 transition-colors group"
          >
            View Full Collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
