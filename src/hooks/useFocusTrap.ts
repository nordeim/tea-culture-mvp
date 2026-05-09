import { useEffect } from 'react'

/**
 * Traps focus within a container (for modals, dialogues, mobile menus).
 * When the container is active, Tab cycles within; closing restores focus to trigger.
 */
export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement | null> | null,
  triggerRef?: React.RefObject<HTMLElement | null> | null
) {
  useEffect(() => {
    if (!isActive || !containerRef?.current) return

    const savedTrigger = triggerRef?.current ?? (document.activeElement as HTMLElement)
    const container = containerRef.current

    const getFocusable = (): HTMLElement[] => {
      const candidates = container.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      return Array.from(candidates).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      )
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container) return
      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement

      if (e.shiftKey) {
        if (active === first || !focusable.includes(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !focusable.includes(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    // Focus first element on open
    const firstFocus = getFocusable()[0]
    if (firstFocus) {
      firstFocus.focus()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to trigger element when closed
      savedTrigger?.focus()
    }
  }, [isActive, containerRef, triggerRef])
}
