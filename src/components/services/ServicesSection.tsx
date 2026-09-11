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

if (typeof window !== 'undefined') {
  (window as any).ScrollTrigger = ScrollTrigger
}

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

  // Active navigation refs routed by responsive matchMedia
  const goToIndexRef = useRef<(idx: number) => void>(() => {})
  const unlockAndGoToWorkRef = useRef<() => void>(() => {})
  const unlockAndGoToHeroRef = useRef<() => void>(() => {})

  const handleNext = () => {
    if (isTransitioningRef.current) return
    if (activeIndexRef.current < SERVICES.length - 1) {
      goToIndexRef.current(activeIndexRef.current + 1)
    } else {
      unlockAndGoToWorkRef.current()
    }
  }

  const handlePrev = () => {
    if (isTransitioningRef.current) return
    if (activeIndexRef.current > 0) {
      goToIndexRef.current(activeIndexRef.current - 1)
    } else {
      unlockAndGoToHeroRef.current()
    }
  }

  const goToIndex = (index: number) => {
    goToIndexRef.current(index)
  }

  useEffect(() => {
    const container = containerRef.current
    const pinTarget = pinTargetRef.current
    if (!container || !pinTarget) return

    const mm = gsap.matchMedia()

    // =========================================================================
    // 1. DESKTOP CONFIGURATION (min-width: 1024px) - 100% PRESERVED
    // =========================================================================
    mm.add('(min-width: 1024px)', () => {
      const desktopStepOffsets = [20, 600, 1200, 1800]
      const getDesktopScrollY = (idx: number, stInstance: ScrollTrigger) => {
        const offset = desktopStepOffsets[idx] ?? idx * 600
        return stInstance.start + offset
      }

      const desktopGoToIndex = (nextIndex: number) => {
        if (nextIndex === activeIndexRef.current || isTransitioningRef.current) return
        isTransitioningRef.current = true
        setActiveIndex(nextIndex)
        activeIndexRef.current = nextIndex

        const st = stRef.current
        if (st) {
          const targetY = getDesktopScrollY(nextIndex, st)
          window.scrollTo({ top: targetY, behavior: 'instant' })
        }

        setTimeout(() => {
          isTransitioningRef.current = false
        }, 650)
      }

      const desktopUnlockToWork = () => {
        isLockedRef.current = false
        observerRef.current?.disable()
        isTransitioningRef.current = false
        const st = stRef.current
        if (st) {
          window.scrollTo({ top: st.start + 1820, behavior: 'instant' })
        }
      }

      const desktopUnlockToHero = () => {
        isLockedRef.current = false
        observerRef.current?.disable()
        isTransitioningRef.current = false
        const st = stRef.current
        if (st) {
          window.scrollTo({ top: Math.max(0, st.start - 20), behavior: 'instant' })
        }
      }

      const desktopLockSection = (initialIndex: number, targetScrollY?: number) => {
        isLockedRef.current = true
        isTransitioningRef.current = true
        setActiveIndex(initialIndex)
        activeIndexRef.current = initialIndex

        if (typeof targetScrollY === 'number') {
          window.scrollTo({ top: targetScrollY, behavior: 'instant' })
        }

        observerRef.current?.enable()

        setTimeout(() => {
          isTransitioningRef.current = false
        }, 450)
      }

      goToIndexRef.current = desktopGoToIndex
      unlockAndGoToWorkRef.current = desktopUnlockToWork
      unlockAndGoToHeroRef.current = desktopUnlockToHero

      const obs = Observer.create({
        target: window,
        type: 'wheel,touch',
        tolerance: 15,
        preventDefault: true,
        onDown: (self) => {
          if (self.isDragging) {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current > 0) {
              desktopGoToIndex(activeIndexRef.current - 1)
            } else {
              desktopUnlockToHero()
            }
          } else {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current < SERVICES.length - 1) {
              desktopGoToIndex(activeIndexRef.current + 1)
            } else {
              desktopUnlockToWork()
            }
          }
        },
        onUp: (self) => {
          if (self.isDragging) {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current < SERVICES.length - 1) {
              desktopGoToIndex(activeIndexRef.current + 1)
            } else {
              desktopUnlockToWork()
            }
          } else {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current > 0) {
              desktopGoToIndex(activeIndexRef.current - 1)
            } else {
              desktopUnlockToHero()
            }
          }
        },
      })
      obs.disable()
      observerRef.current = obs

      const st = ScrollTrigger.create({
        id: 'services-scroll-trigger-desktop',
        trigger: container,
        pin: pinTarget,
        start: 'top top',
        end: () => '+=' + (1800 + window.innerHeight),
        refreshPriority: 0,
        onEnter: (self) => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if (heroST && heroST.progress < 0.98) return
          desktopLockSection(0, self.start + 20)
        },
        onLeave: () => {
          isLockedRef.current = false
          obs.disable()
        },
        onLeaveBack: () => {
          isLockedRef.current = false
          obs.disable()
          isTransitioningRef.current = false
        },
        onUpdate: (self) => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if (heroST && heroST.progress < 0.98) return
          const currentY = self.scroll()
          const service4Y = self.start + 1800
          if (self.direction === -1 && currentY <= service4Y && !isLockedRef.current && currentY > self.start + 50) {
            desktopLockSection(SERVICES.length - 1, service4Y)
          }
        },
      })
      stRef.current = st

      return () => {
        obs.kill()
        st.kill()
        isLockedRef.current = false
        observerRef.current = null
        stRef.current = null
      }
    })

    // =========================================================================
    // 2. MOBILE / TABLET CONFIGURATION (max-width: 1023px) - DEDICATED ARCHITECTURE
    // =========================================================================
    mm.add('(max-width: 1023px)', () => {
      // Mobile travel: 400px per step -> 3 intervals = 1200px
      const mobileStepOffsets = [20, 400, 800, 1200]
      const getMobileScrollY = (idx: number, stInstance: ScrollTrigger) => {
        const offset = mobileStepOffsets[idx] ?? idx * 400
        return stInstance.start + offset
      }

      const mobileGoToIndex = (nextIndex: number) => {
        if (nextIndex === activeIndexRef.current || isTransitioningRef.current) return
        isTransitioningRef.current = true
        setActiveIndex(nextIndex)
        activeIndexRef.current = nextIndex

        const st = stRef.current
        if (st) {
          const targetY = getMobileScrollY(nextIndex, st)
          window.scrollTo({ top: targetY, behavior: 'instant' })
        }

        // 550ms cooldown swallows all touch momentum and rapid flicks
        setTimeout(() => {
          isTransitioningRef.current = false
        }, 550)
      }

      const mobileUnlockToWork = () => {
        isLockedRef.current = false
        observerRef.current?.disable()
        isTransitioningRef.current = false
        const st = stRef.current
        if (st) {
          window.scrollTo({ top: st.start + 1220, behavior: 'instant' })
        }
      }

      const mobileUnlockToHero = () => {
        isLockedRef.current = false
        observerRef.current?.disable()
        isTransitioningRef.current = false
        const st = stRef.current
        if (st) {
          window.scrollTo({ top: Math.max(0, st.start - 20), behavior: 'instant' })
        }
      }

      const mobileLockSection = (initialIndex: number, targetScrollY?: number) => {
        isLockedRef.current = true
        isTransitioningRef.current = true
        setActiveIndex(initialIndex)
        activeIndexRef.current = initialIndex

        if (typeof targetScrollY === 'number') {
          window.scrollTo({ top: targetScrollY, behavior: 'instant' })
        }

        observerRef.current?.enable()

        setTimeout(() => {
          isTransitioningRef.current = false
        }, 400)
      }

      goToIndexRef.current = mobileGoToIndex
      unlockAndGoToWorkRef.current = mobileUnlockToWork
      unlockAndGoToHeroRef.current = mobileUnlockToHero

      const obs = Observer.create({
        target: window,
        type: 'wheel,touch',
        tolerance: 20, // Tuned for touch drag threshold
        preventDefault: true,
        onDown: (self) => {
          // Touch drag down -> Backward (user wants previous service / hero)
          // Mouse wheel down -> Forward (user wants next service)
          if (self.isDragging) {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current > 0) {
              mobileGoToIndex(activeIndexRef.current - 1)
            } else {
              mobileUnlockToHero()
            }
          } else {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current < SERVICES.length - 1) {
              mobileGoToIndex(activeIndexRef.current + 1)
            } else {
              mobileUnlockToWork()
            }
          }
        },
        onUp: (self) => {
          // Touch drag up -> Forward (user wants next service / work)
          // Mouse wheel up -> Backward (user wants previous service / hero)
          if (self.isDragging) {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current < SERVICES.length - 1) {
              mobileGoToIndex(activeIndexRef.current + 1)
            } else {
              mobileUnlockToWork()
            }
          } else {
            if (!isLockedRef.current || isTransitioningRef.current) return
            if (activeIndexRef.current > 0) {
              mobileGoToIndex(activeIndexRef.current - 1)
            } else {
              mobileUnlockToHero()
            }
          }
        },
      })
      obs.disable()
      observerRef.current = obs

      const st = ScrollTrigger.create({
        id: 'services-scroll-trigger-mobile',
        trigger: container,
        pin: pinTarget,
        start: 'top top',
        end: () => '+=' + (1200 + window.innerHeight),
        refreshPriority: 0,
        onEnter: (self) => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if (heroST && heroST.progress < 0.98) return
          mobileLockSection(0, self.start + 20)
        },
        onLeave: () => {
          isLockedRef.current = false
          obs.disable()
        },
        onLeaveBack: () => {
          isLockedRef.current = false
          obs.disable()
          isTransitioningRef.current = false
        },
        onUpdate: (self) => {
          const heroST = ScrollTrigger.getById('hero-scroll-trigger')
          if (heroST && heroST.progress < 0.98) return
          const currentY = self.scroll()
          const service4Y = self.start + 1200
          if (self.direction === -1 && currentY <= service4Y && !isLockedRef.current && currentY > self.start + 50) {
            mobileLockSection(SERVICES.length - 1, service4Y)
          }
        },
      })
      stRef.current = st

      return () => {
        obs.kill()
        st.kill()
        isLockedRef.current = false
        observerRef.current = null
        stRef.current = null
      }
    })

    ScrollTrigger.refresh()

    return () => {
      mm.revert()
    }
  }, [])

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
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FAF7F2]"
      >
        {/* ========================================================================= */}
        {/* MOBILE / TABLET VERTICAL COMPOSITION (< lg) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col justify-between h-full w-full max-w-lg mx-auto px-5 sm:px-8 pt-[88px] sm:pt-[96px] pb-4 sm:pb-6">
          {/* 1. Top Section Header */}
          <div className="shrink-0 pt-1.5 sm:pt-2">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-950 mb-1">
              WHAT WE DO
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-[1.12]">
              Everything your website needs.
              <br />
              <span className="font-serif italic font-normal text-[#9E6941]">
                Nothing you don&apos;t.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1.5 line-clamp-2 sm:line-clamp-none">
              From first concept to final launch, we design and develop digital
              experiences built around your business goals.
            </p>
          </div>

          {/* 2. Mobile Active Service Block: Counter + Progress Indicator + Title + Description */}
          <div className="shrink-0 my-auto py-2 sm:py-3">
            {/* Counter & Progress Indicator */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-900 tracking-wider">
                {activeService.number}{' '}
                <span className="text-neutral-400">/ 04</span>
              </span>
              <div className="w-24 sm:w-32 h-[2px] bg-neutral-300/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-neutral-900 rounded-full origin-left"
                  style={{
                    transform: `scaleX(${Math.max(0.25, (activeIndex + 1) / SERVICES.length)})`,
                  }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>

            {/* Active Service Title & Description */}
            <div className="min-h-[60px] sm:min-h-[68px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                    {activeService.title}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed mt-0.5 max-w-md">
                    {activeService.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Large Static Laptop Visual with Dynamic Screen Content */}
          <div className="relative w-full max-w-[480px] sm:max-w-[460px] mx-auto aspect-[1429/975] shrink-0 flex items-center justify-center mt-auto pb-1 scale-[1.12] sm:scale-100 origin-bottom transition-transform duration-200">
            <div className="relative w-full h-full">
              {/* Layer 2: Dynamic Screen Content (Behind transparent bezel opening) */}
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
                      className="object-contain object-bottom pointer-events-none"
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
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (lg:flex) - 100% PRESERVED */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-col justify-between h-full w-full pt-[80px] lg:pt-[88px] pb-5 sm:pb-6">
          {/* Top Header Section */}
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 pt-2 sm:pt-3 lg:pt-4">
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
        </div>
      </section>
    </div>
  )
}
