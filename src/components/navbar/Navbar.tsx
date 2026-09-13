'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'

const SERVICES_MENU = [
  {
    title: 'Web Development',
    href: '/web-development',
    description: 'Fast, responsive, custom Next.js websites built to perform.',
    badge: 'Popular',
  },
  {
    title: 'App Development',
    href: '/app-development',
    description: 'Custom iOS & Android mobile applications built with React Native.',
    badge: 'New',
  },
  {
    title: 'Web Design',
    href: '/website-design',
    description: 'Bespoke visual identity, conversion-focused UI/UX interfaces.',
  },
  {
    title: 'E-Commerce',
    href: '/ecommerce-development',
    description: 'High-converting online stores built on Shopify, Next.js & modern commerce.',
  },
]

const NAV_LINKS = [
  { label: 'Our Work', href: '/work' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getWhatsAppUrl = () => {
    if (pathname === '/web-development') {
      return "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20web%20development%20service.%20I'd%20like%20to%20discuss%20my%20project."
    }
    if (pathname === '/website-design') {
      return "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20website%20design%20service.%20I'd%20like%20to%20discuss%20a%20project."
    }
    if (pathname === '/ecommerce-development') {
      return "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20building%20an%20online%20store.%20I'd%20like%20to%20discuss%20my%20requirements."
    }
    if (pathname === '/app-development') {
      return "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20app%20development%20service.%20I'd%20like%20to%20discuss%20my%20idea."
    }
    return "https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }

  return (
    <header
      id="main-navbar"
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 border-b border-black/[0.05] shadow-xs'
          : 'bg-[#FAF7F2]/75 border-b border-black/[0.02]'
      }`}
    >
      <nav className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('stack_return_to_services')
                sessionStorage.removeItem('stack_return_service_idx')
                sessionStorage.removeItem('stack_home_scroll_y')
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center group"
          >
            <Image
              src="/logo.png"
              alt="Stack Logo"
              width={197}
              height={34}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-9">
            {/* Services Dropdown Item */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-neutral-800 hover:text-black transition-colors duration-200 py-2 cursor-pointer focus-visible:outline-none"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {/* Desktop Dropdown Popover */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full -left-4 w-[380px] pt-2 z-50"
                  >
                    <div className="p-3 rounded-2xl border border-black/[0.08] bg-[#FAF7F2]/98 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                      {/* Services List */}
                      <div className="space-y-1">
                        {SERVICES_MENU.map((service) => (
                          <Link
                            key={service.title}
                            href={service.href}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-start justify-between p-3 rounded-xl hover:bg-black/[0.04] transition-colors duration-150"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-neutral-950 group-hover:text-[#9E6941] transition-colors">
                                  {service.title}
                                </span>
                                {service.badge && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#9E6941]/10 text-[#9E6941]">
                                    {service.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-neutral-500 leading-relaxed max-w-[280px]">
                                {service.description}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 mt-1 shrink-0" />
                          </Link>
                        ))}
                      </div>

                      {/* Bottom All Services Footer */}
                      <div className="mt-2 pt-2.5 border-t border-black/[0.06] px-3 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Need custom scope?</span>
                        <Link
                          href="/#services"
                          onClick={() => setServicesOpen(false)}
                          className="font-semibold text-neutral-900 hover:text-[#9E6941] transition-colors flex items-center gap-1"
                        >
                          <span>Overview</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Desktop Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-neutral-800 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white bg-neutral-900 hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Get in Touch</span>
            <svg
              className="w-3.5 h-3.5 ml-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-9 h-9 flex items-center justify-center text-neutral-900 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                className="block w-5 h-[2px] bg-neutral-900 rounded-full"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-neutral-900 rounded-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-neutral-900 rounded-full"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden border-t border-black/5 bg-[#FAF7F2]/98 backdrop-blur-xl shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between text-base font-medium text-neutral-800 hover:text-black transition-colors py-1.5 cursor-pointer"
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                      mobileServicesOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 pr-2 py-2 space-y-2.5 border-l-2 border-[#9E6941]/30 my-1"
                    >
                      {SERVICES_MENU.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="flex items-center justify-between text-sm text-neutral-700 hover:text-neutral-950 py-1"
                          onClick={() => {
                            setMobileOpen(false)
                            setMobileServicesOpen(false)
                          }}
                        >
                          <span>{service.title}</span>
                          {service.badge && (
                            <span className="text-[10px] font-semibold bg-[#9E6941]/10 text-[#9E6941] px-2 py-0.5 rounded-full">
                              {service.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Mobile Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-base font-medium text-neutral-800 hover:text-black transition-colors py-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full text-sm font-medium text-white bg-neutral-900 hover:bg-black transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Get in Touch
                  <svg
                    className="w-3.5 h-3.5 ml-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
