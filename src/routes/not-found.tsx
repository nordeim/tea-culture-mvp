import { createFileRoute, Link } from '@tanstack/react-router'
import { Leaf, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/not-found')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory-100 px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-tea-100 flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-8 h-8 text-tea-500" />
        </div>
        <h1 className="font-display text-5xl font-bold text-bark-800 mb-4">404</h1>
        <h2 className="font-display text-xl font-semibold text-bark-700 mb-2">Page Not Found</h2>
        <p className="text-bark-700/60 max-w-md mx-auto mb-8">
          The page you are looking for may have been moved or deleted. Let us guide you back.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-bark-800 text-ivory-100 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-bark-900 transition-all active:scale-[0.97]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </section>
  )
}
