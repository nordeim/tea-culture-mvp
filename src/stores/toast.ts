import { create } from 'zustand'

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
    set({ message, icon, isVisible: true })
    setTimeout(() => {
      set({ isVisible: false })
    }, 3500)
  },
  hideToast: () => set({ isVisible: false }),
}))
