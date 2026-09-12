'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      // Check if we are returning to the Services ("What We Do") section on the homepage
      const isReturningToServices =
        pathname === '/' &&
        (sessionStorage.getItem('stack_return_to_services') === 'true' ||
          window.location.hash === '#services')

      if (isReturningToServices) {
        // Do not reset scroll to top — let ServicesSection restore to the What We Do section
        return
      }

      const isServicePage =
        pathname === '/website-design' ||
        pathname === '/web-development' ||
        pathname === '/ecommerce-development' ||
        pathname === '/app-development'

      if (pathname !== '/' && !isServicePage) {
        sessionStorage.removeItem('stack_return_to_services')
        sessionStorage.removeItem('stack_return_service_idx')
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname])

  return null
}
