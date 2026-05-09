import { useToastStore } from '@/stores/toast'
import { cn } from '@/lib/utils'
import { CheckCircle, Package, Mail } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'package': Package,
  'mail': Mail,
}

export function Toast() {
  const { message, icon, isVisible } = useToastStore()
  const IconComponent = iconMap[icon] ?? CheckCircle

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-[100] transform transition-all duration-500 pointer-events-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      )}
    >
      <div className="bg-bark-800 text-ivory-100 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm">
        <IconComponent className="text-gold-400 w-5 h-5 flex-shrink-0" />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}
