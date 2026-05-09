import { useEffect, useRef } from 'react'

/**
 * Throttled scroll event hook using requestAnimationFrame + setTimeout.
 * Prevents excessive re-renders during scroll by throttling to a specified delay.
 */
export function useThrottledScroll(callback: (scrollY: number) => void, delay = 100) {
  const rafId = useRef<number | null>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY

      if (rafId.current !== null) return

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null

        if (timeoutId.current) return

        timeoutId.current = setTimeout(() => {
          timeoutId.current = null
          callback(lastScrollY.current)
        }, delay)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [callback, delay])
}
