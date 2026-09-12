'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()
  const isPopStateRef = useRef(false)
  const currentPathRef = useRef(pathname)

  // 1. Listen for popstate (browser back/forward navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const onPopState = () => {
      isPopStateRef.current = true
    }

    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  // 2. Track scroll position continuously on the active page
  useEffect(() => {
    if (typeof window === 'undefined') return
    currentPathRef.current = pathname

    const saveScroll = () => {
      // If the browser URL path has already switched during navigation, don't corrupt old page's scroll!
      if (window.location.pathname !== pathname) return

      const scrollY = window.scrollY
      if (pathname === '/') {
        sessionStorage.setItem('stack_home_scroll_y', String(scrollY))

        // When user scrolls downstream into Work/Process or upstream into Hero,
        // clear the Services return flag so the exact section (Work or Hero) is restored on Back
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
        const servicesEnd = isDesktop ? 6900 : 4300
        const servicesStart = isDesktop ? 3500 : 2500
        if (scrollY > servicesEnd || scrollY < servicesStart) {
          sessionStorage.removeItem('stack_return_to_services')
          sessionStorage.removeItem('stack_return_service_idx')
        }
      } else {
        sessionStorage.setItem('stack_scroll_' + pathname, String(scrollY))
      }
    }

    window.addEventListener('scroll', saveScroll, { passive: true })
    return () => {
      // Do NOT call saveScroll() in cleanup as the DOM scroll has already been clamped/reset by Next.js
      window.removeEventListener('scroll', saveScroll)
    }
  }, [pathname])

  // 3. Handle route transitions
  useEffect(() => {
    if (typeof window === 'undefined') return

    const wasPopState = isPopStateRef.current
    isPopStateRef.current = false // Reset popstate flag for next transition

    if (wasPopState) {
      // BROWSER BACK / FORWARD NAVIGATION
      if (pathname === '/') {
        const isReturningToServices =
          sessionStorage.getItem('stack_return_to_services') === 'true' ||
          window.location.hash === '#services'

        if (isReturningToServices) {
          // Yield scroll handling to ServicesSection's restoreToServicesIfNeeded()
          return
        }

        const savedHomeYStr = sessionStorage.getItem('stack_home_scroll_y')
        if (savedHomeYStr !== null) {
          const savedHomeY = parseFloat(savedHomeYStr)
          if (!isNaN(savedHomeY) && savedHomeY > 0) {
            window.scrollTo({ top: savedHomeY, behavior: 'instant' })
            document.documentElement.scrollTop = savedHomeY
            document.body.scrollTop = savedHomeY

            requestAnimationFrame(() => {
              window.scrollTo({ top: savedHomeY, behavior: 'instant' })
              document.documentElement.scrollTop = savedHomeY
              document.body.scrollTop = savedHomeY
            })

            setTimeout(() => {
              window.scrollTo({ top: savedHomeY, behavior: 'instant' })
              document.documentElement.scrollTop = savedHomeY
              document.body.scrollTop = savedHomeY
            }, 60)
            return
          }
        }
      } else {
        // Navigating back to another page (e.g. /work, /contact, etc.)
        const savedPageYStr = sessionStorage.getItem('stack_scroll_' + pathname)
        if (savedPageYStr !== null) {
          const savedPageY = parseFloat(savedPageYStr)
          if (!isNaN(savedPageY) && savedPageY > 0) {
            window.scrollTo({ top: savedPageY, behavior: 'instant' })
            document.documentElement.scrollTop = savedPageY
            document.body.scrollTop = savedPageY

            requestAnimationFrame(() => {
              window.scrollTo({ top: savedPageY, behavior: 'instant' })
              document.documentElement.scrollTop = savedPageY
              document.body.scrollTop = savedPageY
            })

            setTimeout(() => {
              window.scrollTo({ top: savedPageY, behavior: 'instant' })
              document.documentElement.scrollTop = savedPageY
              document.body.scrollTop = savedPageY
            }, 60)
            return
          }
        }
      }
      // If no saved scroll on popstate, fallback to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      return
    }

    // FORWARD LINK CLICK NAVIGATION
    // If user clicked an anchor hash link on homepage (e.g. /#services or /#process), do not reset to 0
    if (pathname === '/' && window.location.hash) {
      return
    }

    // On forward navigation to a new page, start at top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}
