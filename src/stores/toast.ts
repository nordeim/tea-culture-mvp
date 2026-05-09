import { create } from 'zustand'

let timeoutId: ReturnType<typeof setTimeout> | null = null

interface ToastState {
  message: string
  icon: string
  isVisible: boolean
  showToast: (message: string, icon?: string) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  icon: 'check-circle',
  isVisible: false,
  showToast: (message: string, icon = 'check-circle') => {
    if (timeoutId) clearTimeout(timeoutId)
    set({ message, icon, isVisible: true })
    timeoutId = setTimeout(() => {
      set({ isVisible: false })
      timeoutId = null
    }, 3500)
  },
  hideToast: () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = null
    set({ isVisible: false })
  },
}))
