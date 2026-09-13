'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function FloatingWhatsApp() {
  const pathname = usePathname()

  // Predefined message encoded for WhatsApp URL
  const whatsappUrl =
    "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."

  // Do not render on error or admin routes if present
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) {
    return null
  }

  return (
    <div
      className="fixed z-40 pointer-events-none flex items-center justify-end bottom-[max(18px,calc(18px+env(safe-area-inset-bottom,0px)))] right-[max(18px,calc(18px+env(safe-area-inset-right,0px)))] sm:bottom-[max(24px,calc(24px+env(safe-area-inset-bottom,0px)))] sm:right-[max(24px,calc(24px+env(safe-area-inset-right,0px)))]"
    >
      <div className="relative pointer-events-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with StackStich on WhatsApp"
          className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.35)] transition-all duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
        >
          {/* Always-Visible Label on Desktop */}
          <div
            className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-neutral-900/95 backdrop-blur-xs text-white text-[13px] font-medium tracking-normal whitespace-nowrap shadow-lg border border-white/10 hidden sm:flex items-center pointer-events-auto transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          >
            <span>Chat with us on WhatsApp</span>
            {/* Caret */}
            <span
              className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900/95 rotate-45 border-t border-r border-white/10"
              aria-hidden="true"
            />
          </div>

          {/* Official WhatsApp Brand Icon */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-white pointer-events-none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
          </svg>
        </a>
      </div>
    </div>
  )
}
