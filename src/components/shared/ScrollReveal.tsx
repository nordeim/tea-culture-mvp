import { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => {
              el.classList.add('active')
            }, delay)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [delay])

  return (
    <div ref={ref} className={cn('reveal', className)} {...props}>
      {children}
    </div>
  )
}
