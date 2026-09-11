'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SERVICES, ServiceItem } from './servicesData'

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin)

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Tracking refs to manage state across async closures and Observer callbacks
  const activeIndexRef = useRef(0)
  activeIndexRef.current = activeIndex

  const isTransitioningRef = useRef(false)
  const isLockedRef = useRef(false)
  const observerRef = useRef<Observer | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  const getStepScrollY = useCallback((index: number, st: ScrollTrigger) => {
    // 4 services spaced 600px apart:
    // 01: 0px | 02: 600px | 03: 1200px | 04: 1800px
    // Service 04 sits at st.start + 1800px.
    // The remaining range (1800px to st.end) is window.innerHeight where Selected Work
    // rides up over the pinned Service 04 section.
    const stepOffsets = [0, 600, 1200, 1800]
    const offset = stepOffsets[index] ?? index * 600
    return st.start + offset
  }, [])

  // Transition to a specific index with a 650ms cooldown lock (ignoring residual inertia)
  const goToIndex = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || isTransitioningRef.current) return
    isTransitioningRef.current = true
    setActiveIndex(nextIndex)
    activeIndexRef.current = nextIndex

    // Synchronize the scroll position to the exact step within the pinned range
    const st = stRef.current
    if (st) {
      const targetY = getStepScrollY(nextIndex, st)
      window.scrollTo({ top: targetY, behavior: 'instant' })
    }

    // 650ms cooldown lock swallows all trackpad inertia and fast mouse-wheel ticks
    setTimeout(() => {
      isTransitioningRef.current = false
    }, 650)
  }, [getStepScrollY])

  const handleNext = () => {
    if (isTransitioningRef.current) return
    const nextIdx = Math.min(SERVICES.length - 1, activeIndexRef.current + 1)
    goToIndex(nextIdx)
  }

  const handlePrev = () => {
    if (isTransitioningRef.current) return
    const prevIdx = Math.max(0, activeIndexRef.current - 1)
    goToIndex(prevIdx)
  }

  // Natural release into Selected Work:
  // Disables Observer and unlocks the section so native scrolling allows
  // Selected Work to ride up smoothly over the pinned Service 04 section.
  const unlockAndGoToWork = useCallback(() => {
    isLockedRef.current = false
    observerRef.current?.disable()
    isTransitioningRef.current = false
  }, [])

  // Natural release up into Hero:
  // Synchronizes scroll position cleanly to the top boundary (st.start) where Hero sits directly above,
  // then disables Observer so subsequent upward scrolling naturally enters Hero.
  const unlockAndGoToHero = useCallback(() => {
    isLockedRef.current = false
    const st = stRef.current
    if (st) {
      window.scrollTo({ top: st.start, behavior: 'instant' })
    }
    observerRef.current?.disable()
    isTransitioningRef.current = false
  }, [])

  // Lock section and engage Observer
  const lockSection = useCallback((initialIndex: number, targetScrollY?: number) => {
    isLockedRef.current = true
    isTransitioningRef.current = true
    setActiveIndex(initialIndex)
    activeIndexRef.current = initialIndex

    if (typeof targetScrollY === 'number') {
      window.scrollTo({ top: targetScrollY, behavior: 'instant' })
    }

    observerRef.current?.enable()

    // 450ms buffer absorbs any leftover momentum from the previous section
    setTimeout(() => {
      isTransitioningRef.current = false
    }, 450)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const pinTarget = pinTargetRef.current
    if (!container || !pinTarget) return

    // 1. Create GSAP Observer for discrete gesture interception
    const obs = Observer.create({
      target: window,
      type: 'wheel,touch',
      tolerance: 15,
      preventDefault: true,
      onDown: () => {
        if (!isLockedRef.current || isTransitioningRef.current) return

        if (activeIndexRef.current < SERVICES.length - 1) {
          goToIndex(activeIndexRef.current + 1)
        } else {
          // At 04, release downward so Selected Work can ride above
          unlockAndGoToWork()
        }
      },
      onUp: () => {
        if (!isLockedRef.current || isTransitioningRef.current) return

        if (activeIndexRef.current > 0) {
          goToIndex(activeIndexRef.current - 1)
        } else {
          // At 01, release upward into Hero
          unlockAndGoToHero()
        }
      },
    })

    // Start disabled until section is entered
    obs.disable()
    observerRef.current = obs

    // 2. Single ScrollTrigger lifecycle:
    // Pins pinTarget for Services 01-04 (0px to 1800px) AND during the ride-over of Selected Work (1800px to 1800px + 100vh)
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: 'services-scroll-trigger',
        trigger: container,
        pin: pinTarget,
        start: () => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          return heroST ? heroST.end : 'top top'
        },
        end: () => '+=' + (1800 + window.innerHeight),
        onEnter: (self) => {
          // Safety guard: ensure the Hero pin animation has fully completed before activating ServicesSection
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if ((heroST && heroST.progress < 0.98) || self.start < 2000) {
            return
          }
          lockSection(0, self.start)
        },
        onLeave: () => {
          isLockedRef.current = false
          obs.disable()
        },
        onLeaveBack: () => {
          isLockedRef.current = false
          obs.disable()
        },
        onUpdate: (self) => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if (heroST && heroST.progress < 0.98) {
            return
          }
          const currentY = self.scroll()
          const service4Y = self.start + 1800

          // When scrolling back up into the service navigation zone (at or below Service 04):
          if (self.direction === -1 && currentY <= service4Y && !isLockedRef.current && currentY >= self.start) {
            lockSection(SERVICES.length - 1, service4Y)
          }
        },
      })
      stRef.current = st
      ScrollTrigger.refresh()
    }, container)

    return () => {
      obs.kill()
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill()
      })
    }
  }, [getStepScrollY, goToIndex, lockSection, unlockAndGoToHero, unlockAndGoToWork])

  const activeService = SERVICES[activeIndex] || SERVICES[0]

  return (
    <div
      id="services"
      ref={containerRef}
      className="relative w-full bg-[#FAF7F2] text-neutral-900 border-t border-black/[0.04] z-10"
      style={{ marginBottom: '-100vh' }}
    >
      {/* Pinned Viewport Container (Physical ScrollTrigger pinning) */}
      <section
        ref={pinTargetRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FAF7F2] pt-[68px] lg:pt-[76px] pb-5 sm:pb-6"
      >
        {/* Top Header Section */}
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 pt-1 sm:pt-2">
          {/* Main Title & Subtitle */}
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-950 mb-1.5">
              WHAT WE DO
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-900 tracking-tight leading-[1.12]">
              Everything your website needs.
              <br />
              <span className="font-serif italic font-normal text-[#9E6941]">
                Nothing you don&apos;t.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg mt-2">
              From first concept to final launch, we design and develop digital
              experiences built around your business goals.
            </p>
          </div>

          {/* Top Right Label with Divider Line */}
          <div className="hidden lg:flex items-center gap-3 self-start pt-2">
            <div className="w-10 h-[1px] bg-neutral-300" />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-neutral-500">
              MODERN WEBSITES FOR AMBITIOUS BRANDS
            </span>
          </div>
        </div>

        {/* Center Content Area */}
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 relative flex-1 flex items-center justify-between my-auto">
          {/* Left Service List */}
          <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 relative z-10 pt-2 sm:pt-3 lg:pt-4">
            <div className="flex flex-col space-y-5 sm:space-y-6 lg:space-y-7 relative">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index
                const isFirst = index === 0
                const isLast = index === SERVICES.length - 1

                return (
                  <div
                    key={service.id}
                    onClick={() => goToIndex(index)}
                    className="relative flex items-start gap-2.5 sm:gap-3.5 cursor-pointer group select-none transition-all duration-300"
                  >
                    {/* Left: Number */}
                    <div className="h-7 w-7 shrink-0 flex items-center justify-end">
                      <span
                        className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${isActive ? 'text-neutral-900 font-bold' : 'text-neutral-400'
                          }`}
                      >
                        {service.number}
                      </span>
                    </div>

                    {/* Center: Timeline Node Column with line passing through exact center of circle */}
                    <div className="relative w-6 shrink-0 h-7 flex items-center justify-center">
                      {/* Vertical line through exact center of circle */}
                      <div
                        className={`absolute left-1/2 -translate-x-[0.5px] w-[1px] bg-neutral-300/90 z-0 ${isFirst
                          ? 'top-3.5 -bottom-7 sm:-bottom-8 lg:-bottom-9'
                          : isLast
                            ? '-top-7 sm:-top-8 lg:-top-9 bottom-3.5'
                            : '-top-7 sm:-top-8 lg:-top-9 -bottom-7 sm:-bottom-8 lg:-bottom-9'
                          }`}
                      />

                      {/* Circle Dot Indicator - perfectly aligned with number and line */}
                      <div className="relative z-10 flex items-center justify-center">
                        {isActive ? (
                          <motion.div
                            layoutId="servicesActiveDot"
                            className="w-3.5 h-3.5 rounded-full bg-neutral-950 ring-2 ring-[#FAF7F2] shadow-xs"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-neutral-400 bg-[#FAF7F2] group-hover:border-neutral-600 transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Right: Title, Arrow Button, and Description */}
                    <div className="flex-1 min-w-0 pl-1.5 sm:pl-2 pr-2">
                      <div className="h-7 flex items-center justify-between gap-3">
                        <h3
                          className={`text-xl sm:text-[22px] lg:text-[24px] tracking-tight transition-all duration-300 leading-none ${isActive
                            ? 'text-neutral-950 font-bold'
                            : 'text-neutral-500 font-semibold group-hover:text-neutral-700'
                            }`}
                        >
                          {service.title}
                        </h3>

                        {/* Active Arrow Button */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="w-8 sm:w-8.5 h-8 sm:h-8.5 rounded-full border border-neutral-300 bg-white/90 shadow-2xs flex items-center justify-center text-neutral-800 shrink-0"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      {/* Description Text */}
                      <p
                        className={`text-xs sm:text-[13.5px] leading-relaxed max-w-[280px] sm:max-w-xs mt-1 transition-colors duration-300 ${isActive ? 'text-neutral-600' : 'text-neutral-400/90'
                          }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Visual Display Area (Enlarged and sticking to right edge) */}
          <div className="relative lg:absolute lg:right-0 lg:top-[48%] lg:-translate-y-[49%] flex items-center justify-end z-0 pointer-events-none lg:pointer-events-auto">
            {/* Laptop Mockup Presentation with 3-Layer Architecture */}
            <div className="relative w-auto h-[64vh] sm:h-[76vh] lg:h-[94vh] xl:h-[102vh] 2xl:h-[106vh] max-h-[calc(100vh-80px)] aspect-[1429/975] flex items-center justify-end">
              {/* Hand-drawn Style Annotation Badge & Curved Arrow placed directly beside laptop screen */}
              <div className="absolute top-[14%] left-[27%] -translate-x-full z-20 pointer-events-none hidden md:flex flex-col items-start select-none max-w-[150px] pr-2 -rotate-[7deg]">
                <span
                  className="font-cursive font-semibold text-xl sm:text-2xl lg:text-[25px] leading-[1.05] text-[#2d2d2d] tracking-wide"
                  style={{ fontFamily: 'var(--font-caveat), "Caveat", "Kalam", cursive' }}
                >
                  {activeService.annotation}
                </span>
                <svg
                  className="w-9 h-9 text-[#444444] mt-1 ml-6 rotate-[10deg]"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M8 6 C 10 22, 22 34, 40 36 M 30 30 L 40 36 L 33 42"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Layer 2: Dynamic Screen Content (Behind bezel opening) - Only this layer transitions */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeService.screenSrc}
                      alt={activeService.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      className="object-contain object-right pointer-events-none"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Layer 1 & 3: Static Laptop, Rock Table, Books, Plant & Bezel Frame on Top */}
              <div className="relative w-full h-full z-10 pointer-events-none">
                <Image
                  src="/services/base.png"
                  alt="Laptop on stone table mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-contain object-right drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Step Counter + Progress Track + Navigation Arrows */}
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between gap-6 pt-3 border-t border-black/[0.05]">
          {/* Left Step Counter & Progress Bar */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-semibold text-neutral-900 tracking-wide">
              {activeService.number} <span className="text-neutral-400">/ 04</span>
            </span>

            <div className="w-32 sm:w-44 h-[2px] bg-neutral-300/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neutral-900 rounded-full origin-left"
                style={{
                  transform: `scaleX(${Math.max(0.25, (activeIndex + 1) / SERVICES.length)})`,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500">
              SCROLL TO EXPLORE
            </span>

            <button
              onClick={handleNext}
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white/70 hover:bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all shadow-2xs active:scale-95"
              aria-label="Next service"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={handlePrev}
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white/70 hover:bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all shadow-2xs active:scale-95"
              aria-label="Previous service"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
