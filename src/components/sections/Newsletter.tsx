import { useActionState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useToastStore } from '@/stores/toast'
import { cn } from '@/lib/utils'

interface FormState {
  message: string
  type: 'idle' | 'success' | 'error'
}

export function Newsletter() {
  const showToast = useToastStore((s) => s.showToast)

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const email = formData.get('email') as string
      if (!email?.includes('@')) {
        return { message: 'Please enter a valid email address.', type: 'error' }
      }
      await new Promise((r) => setTimeout(r, 500))
      showToast('Successfully subscribed to our newsletter!', 'mail')
      return { message: `Welcome to the Inner Circle! We'll send tea wisdom to ${email}.`, type: 'success' }
    },
    { message: '', type: 'idle' }
  )

  return (
    <section className="bg-ivory-200 py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-bark-800 mb-3">
            Join the <span className="text-gold-500 italic">Inner Circle</span>
          </h3>
          <p className="text-bark-700/70 mb-8">
            Receive tea wisdom, exclusive offers, and first access to seasonal releases.
          </p>
          <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 rounded-xl border border-ivory-400 bg-white text-bark-800 text-sm placeholder:text-bark-700/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3.5 rounded-xl bg-bark-800 text-ivory-100 text-sm font-semibold tracking-wide hover:bg-bark-900 transition-all active:scale-[0.97] disabled:opacity-50"
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {state.message && (
            <p
              className={cn(
                'mt-4 text-sm',
                state.type === 'success' ? 'text-tea-600' : 'text-terra-500'
              )}
            >
              {state.message}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
