import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThrottledScroll } from '@/hooks/useThrottledScroll'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useThrottledScroll((scrollY) => {
    setIsVisible(scrollY > 600)
  }, 100)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-bark-800 text-ivory-100 flex items-center justify-center shadow-lg hover:bg-bark-900 transition-all active:scale-[0.95]',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}
