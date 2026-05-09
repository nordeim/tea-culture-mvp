import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { Philosophy } from '@/components/sections/Philosophy'
import { Collection } from '@/components/sections/Collection'
import { TeaCulture } from '@/components/sections/TeaCulture'
import { MacroFeature } from '@/components/sections/MacroFeature'
import { Subscription } from '@/components/sections/Subscription'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { Newsletter } from '@/components/sections/Newsletter'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Collection />
      <TeaCulture />
      <MacroFeature />
      <Subscription />
      <Testimonials />
      <CTA />
      <Newsletter />
    </>
  )
}
