import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toast } from '@/components/shared/Toast'
import { BackToTop } from '@/components/shared/BackToTop'
import { SkipLink } from '@/components/shared/SkipLink'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <BackToTop />
    </>
  )
}
