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
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <ErrorBoundary sectionName="Hero"><Hero /></ErrorBoundary>
      <ErrorBoundary sectionName="Philosophy"><Philosophy /></ErrorBoundary>
      <ErrorBoundary sectionName="Collection"><Collection /></ErrorBoundary>
      <ErrorBoundary sectionName="Tea Culture"><TeaCulture /></ErrorBoundary>
      <ErrorBoundary sectionName="The Leaf"><MacroFeature /></ErrorBoundary>
      <ErrorBoundary sectionName="Subscription"><Subscription /></ErrorBoundary>
      <ErrorBoundary sectionName="Testimonials"><Testimonials /></ErrorBoundary>
      <ErrorBoundary sectionName="Call to Action"><CTA /></ErrorBoundary>
      <ErrorBoundary sectionName="Newsletter"><Newsletter /></ErrorBoundary>
    </>
  )
}
