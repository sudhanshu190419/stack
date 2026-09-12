'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroCanvas, {
  HeroCanvasHandle,
  TOTAL_FRAMES,
  MOBILE_TOTAL_FRAMES,
} from './HeroCanvas'
import ScrollIndicator from './ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { id: 1, range: [0, 0.25], label: 'Studio & Strategy', tag: '01' },
  { id: 2, range: [0.25, 0.5], label: 'Velora Commerce', tag: '02' },
  { id: 3, range: [0.5, 0.75], label: 'Mobl Experience', tag: '03' },
  { id: 4, range: [0.75, 1.0], label: 'Responsive Ecosystem', tag: '04' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)
  const canvasHandleRef = useRef<HeroCanvasHandle>(null)

  // Direct DOM refs for high-performance scroll updates (no React re-renders)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const chapterTextRef = useRef<HTMLSpanElement>(null)
  const frameCounterRef = useRef<HTMLSpanElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const [initialFrameReady, setInitialFrameReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isMobileRef = useRef(false)

  // Desktop Frame-Synchronized Hero Boundary Gate:
  // Holds the Hero visually full-bleed until Clip 4 (frame 239) has actually rendered to Canvas
  const isGatedRef = useRef(false)
  const savedTransformRef = useRef<string | null>(null)

  const lockHeroBoundary = useCallback(() => {
    if (isGatedRef.current) return
    const pinTarget = pinTargetRef.current
    if (!pinTarget) return

    isGatedRef.current = true
    const previousTransform = pinTarget.style.transform
    savedTransformRef.current = previousTransform

    pinTarget.style.transform = 'none'
    pinTarget.style.position = 'fixed'
    pinTarget.style.top = '0px'
    pinTarget.style.left = '0px'
    pinTarget.style.width = '100%'
    pinTarget.style.height = '100%'
    pinTarget.style.zIndex = '50'
  }, [])

  const releaseHeroBoundary = useCallback((targetScrollY?: number) => {
    if (!isGatedRef.current) return
    const pinTarget = pinTargetRef.current
    if (!pinTarget) return

    isGatedRef.current = false
    const previousTransform = savedTransformRef.current
    savedTransformRef.current = null
    pinTarget.style.transform = previousTransform || ''

    pinTarget.style.position = ''
    pinTarget.style.top = ''
    pinTarget.style.left = ''
    pinTarget.style.width = ''
    pinTarget.style.height = ''
    pinTarget.style.zIndex = ''

    if (typeof targetScrollY === 'number') {
      window.scrollTo({ top: targetScrollY, behavior: 'instant' })
    }

    const heroST = ScrollTrigger.getById('hero-scroll-trigger')
    heroST?.update()
  }, [])

  const handleFinalFrameRendered = useCallback(() => {
    if (isGatedRef.current && !isMobileRef.current) {
      const heroST = ScrollTrigger.getById('hero-scroll-trigger')
      const end = heroST ? heroST.end : 3500
      releaseHeroBoundary(end)
    }
  }, [releaseHeroBoundary])

  const updateUIOnScroll = useCallback((progress: number) => {
    // 0. Hero Copy Fade (Visible on clip-01: 100% visible initially, fades out smoothly on scroll)
    if (heroCopyRef.current) {
      if (progress < 0.15) {
        const copyOpacity = Math.max(0, 1 - progress / 0.10)
        heroCopyRef.current.style.opacity = copyOpacity.toFixed(3)
        heroCopyRef.current.style.transform = `translateY(${(-20 * (1 - copyOpacity)).toFixed(1)}px)`
        heroCopyRef.current.style.pointerEvents = copyOpacity > 0.3 ? 'auto' : 'none'
      } else {
        heroCopyRef.current.style.opacity = '0'
        heroCopyRef.current.style.pointerEvents = 'none'
      }
    }

    // 1. Scroll Indicator Fade
    if (scrollIndicatorRef.current) {
      const scrollIndOpacity = Math.max(0, 1 - progress / 0.08)
      scrollIndicatorRef.current.style.opacity = scrollIndOpacity.toFixed(3)
    }

    // 2. Cinematic HUD visibility and Chapter Updates (active from 10% to 95%)
    if (hudRef.current) {
      if (progress > 0.08 && progress < 0.95) {
        const fadeIn = Math.min(1, (progress - 0.08) / 0.05)
        const fadeOut = progress > 0.88 ? Math.max(0, 1 - (progress - 0.88) / 0.07) : 1
        hudRef.current.style.opacity = (fadeIn * fadeOut).toFixed(3)
        hudRef.current.style.pointerEvents = 'auto'
      } else {
        hudRef.current.style.opacity = '0'
        hudRef.current.style.pointerEvents = 'none'
      }
    }

    // 3. Progress Bar & Frame Counter
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`
    }

    const currentTotal = isMobileRef.current ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
    const currentFrame = Math.min(
      currentTotal,
      Math.max(1, Math.round(progress * (currentTotal - 1)) + 1)
    )
    if (frameCounterRef.current) {
      frameCounterRef.current.innerText = isMobileRef.current
        ? `${currentFrame.toString().padStart(3, '0')} / ${MOBILE_TOTAL_FRAMES}`
        : `${currentFrame.toString().padStart(3, '0')} / ${TOTAL_FRAMES}`
    }

    // 4. Chapter Name
    if (chapterTextRef.current) {
      if (isMobileRef.current) {
        if (progress < 0.5) {
          chapterTextRef.current.innerText = '01 · Studio & Strategy'
        } else {
          chapterTextRef.current.innerText = '02 · Velora Commerce'
        }
      } else {
        const activeChapter =
          CHAPTERS.find((c) => progress >= c.range[0] && progress <= c.range[1]) ||
          CHAPTERS[0]
        chapterTextRef.current.innerText = `${activeChapter.tag} · ${activeChapter.label}`
      }
    }

    // Navbar manages its own sticky and frosted glass states
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const pinTarget = pinTargetRef.current
    if (!container || !pinTarget) return

    // 1. Determine mobile breakpoint synchronously on client mount before creating ScrollTrigger
    const checkMobile = () =>
      window.innerWidth < 768 ||
      (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)

    const initialMobile = checkMobile()
    setIsMobile(initialMobile)
    isMobileRef.current = initialMobile

    const handleScrollTriggerUpdate = (self: ScrollTrigger) => {
      const progress = self.progress
      canvasHandleRef.current?.setFrameProgress(progress)
      updateUIOnScroll(progress)

      // DESKTOP ONLY: Frame-synchronized boundary gate at Hero end
      if (!isMobileRef.current) {
        const isReturningToServices =
          typeof window !== 'undefined' &&
          (sessionStorage.getItem('stack_return_to_services') === 'true' ||
            window.location.hash === '#services')

        const isAtEnd = self.scroll() >= self.end || progress >= 1.0

        if (isAtEnd && !isReturningToServices && self.scroll() <= self.end + 50) {
          const isFinalRendered = canvasHandleRef.current?.isFinalFrameRendered() ?? false
          if (!isFinalRendered) {
            // Cold start fast scroll reached end before frame 239 was rendered: activate gate
            lockHeroBoundary()
            if (self.scroll() > self.end) {
              window.scrollTo({ top: self.end, behavior: 'instant' })
            }
          } else if (isGatedRef.current) {
            // Frame 239 is rendered: release
            releaseHeroBoundary(self.end)
          }
        } else if (isGatedRef.current) {
          // User reversed scroll back into Hero or returned to downstream section: release immediately
          releaseHeroBoundary()
        }
      }
    }

    // 2. Create Hero ScrollTrigger directly with the determined mobile/desktop distance (no +=3500 initial mismatch)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'hero-scroll-trigger',
        trigger: container,
        pin: pinTarget,
        start: 'top top',
        end: initialMobile ? '+=2500' : '+=3500', // Responsive scrub length (2500px mobile for 2 clips, 3500px desktop)
        scrub: initialMobile ? true : 0.1, // 1:1 instant touch tracking on mobile, 0.1s lerp on desktop
        refreshPriority: 1,
        onUpdate: handleScrollTriggerUpdate,
      })
    }, container)

    // 3. Immediately refresh ScrollTrigger so downstream sections calculate correct pin offsets
    ScrollTrigger.refresh()
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0
    const handleResize = () => {
      // Ignore mobile URL bar height fluctuations while scrolling
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth

      const currentMobile = checkMobile()
      if (currentMobile !== isMobileRef.current) {
        setIsMobile(currentMobile)
        isMobileRef.current = currentMobile

        releaseHeroBoundary()

        const existingST = ScrollTrigger.getById('hero-scroll-trigger')
        if (existingST) existingST.kill()

        ctx.add(() => {
          ScrollTrigger.create({
            id: 'hero-scroll-trigger',
            trigger: container,
            pin: pinTarget,
            start: 'top top',
            end: currentMobile ? '+=2500' : '+=3500',
            scrub: currentMobile ? true : 0.1,
            refreshPriority: 1,
            onUpdate: handleScrollTriggerUpdate,
          })
        })
        ScrollTrigger.refresh()
      } else {
        ScrollTrigger.refresh()
      }
    }

    // Window wheel and scroll listeners for boundary lock containment
    const handleWheel = (e: WheelEvent) => {
      if (isGatedRef.current && !isMobileRef.current) {
        if (e.deltaY > 0) {
          // Prevent accumulating downward scroll overshoot while frame 239 is pending
          e.preventDefault()
        } else if (e.deltaY < 0) {
          // User is scrolling backwards up into Hero: disengage gate immediately
          releaseHeroBoundary()
        }
      }
    }

    const handleScroll = () => {
      if (isGatedRef.current && !isMobileRef.current) {
        const heroST = ScrollTrigger.getById('hero-scroll-trigger')
        if (heroST) {
          if (window.scrollY > heroST.end) {
            window.scrollTo({ top: heroST.end, behavior: 'instant' })
          } else if (window.scrollY < heroST.end) {
            releaseHeroBoundary()
          }
        }
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      releaseHeroBoundary()
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container || st.vars.id === 'hero-scroll-trigger') st.kill()
      })
      ScrollTrigger.refresh()
    }
  }, [updateUIOnScroll, lockHeroBoundary, releaseHeroBoundary])

  return (
    <div ref={containerRef} suppressHydrationWarning className="relative w-full bg-[#FAF8F4]">
      {/* Pinned Viewport Container - Full Bleed Screen */}
      <section
        ref={pinTargetRef}
        suppressHydrationWarning
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF8F4]"
      >
        {/* Full-Bleed 16:9 / 9:16 Cinematic Canvas Frame */}
        <div className="absolute inset-0 w-full h-full z-10">
          <HeroCanvas
            ref={canvasHandleRef}
            isMobile={isMobile}
            onInitialFrameLoaded={() => setInitialFrameReady(true)}
            onFinalFrameRendered={handleFinalFrameRendered}
          />
        </div>

        {/* Clip-01 Typography & CTA Overlay (Visible initially, aligns with reference image) */}
        <div
          ref={heroCopyRef}
          suppressHydrationWarning
          className="absolute inset-0 z-20 pointer-events-none flex items-start sm:items-center justify-start transition-transform duration-75"
        >
          {/* Soft Vignette Shadow for Crystal-Clear Text Legibility */}
          <div className="absolute inset-x-0 top-0 h-[48vh] sm:h-full sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[65%] lg:w-[50%] xl:w-[45%] bg-gradient-to-b from-black/80 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/65 sm:via-black/30 sm:to-transparent pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 pointer-events-auto h-full sm:h-auto flex flex-col sm:block justify-start">
            {/* Top Text Block (Eyebrow, Heading, Subtitle) */}
            <div className="max-w-[350px] xs:max-w-[370px] sm:max-w-lg lg:max-w-[420px] xl:max-w-[460px] pt-[92px] sm:pt-0 lg:pt-0 -translate-x-2 sm:-translate-x-6 lg:-translate-x-10 sm:-translate-y-7 lg:-translate-y-10">
              {/* Eyebrow */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/90 sm:text-white/80 mb-2 sm:mb-4 drop-shadow-sm">
                WEB DESIGN &amp; DEVELOPMENT
              </p>

              {/* Main Heading */}
              <h1 className="text-[29px] xs:text-[32px] sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-2.5 sm:mb-4 drop-shadow-md">
                Custom websites,
                <br />
                <span className="font-serif italic font-normal text-[#D5B28D]">
                  perfectly stitched
                </span>
                <br />
                for your business.
              </h1>

              {/* Subtitle Paragraph */}
              <p className="text-[12.5px] xs:text-[13px] sm:text-[15px] leading-relaxed text-white/85 sm:text-white/80 mb-0 sm:mb-8 max-w-[330px] sm:max-w-[380px] drop-shadow-sm">
                We design and build modern, high-performing
                <br className="hidden sm:inline" /> websites that turn first impressions into customers.
              </p>

              {/* Desktop CTA Buttons (Visible inside column on sm and above, completely unchanged) */}
              <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-3.5">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 sm:px-6.5 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-100 transition-all duration-200 shadow-md group"
                >
                  View Our Work
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-6.5 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-200 shadow-sm group"
                >
                  Start a Project
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Mobile Bottom CTA Buttons (Placed exactly below the laptop keyboard, above stone ledge) */}
            <div className="sm:hidden absolute left-5 right-5 bottom-[15%] xs:bottom-[15%] flex items-center justify-start gap-3 pointer-events-auto -translate-x-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 transition-all duration-200 shadow-md group flex-shrink-0"
              >
                View Our Work
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 transition-all duration-200 shadow-sm group flex-shrink-0"
              >
                Start a Project
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic Scrub HUD (Floating at Bottom Center) */}
        <div
          ref={hudRef}
          suppressHydrationWarning
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg px-4 py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/10 opacity-0 pointer-events-none transition-opacity duration-200 shadow-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span
              ref={chapterTextRef}
              suppressHydrationWarning
              className="text-xs font-medium text-white/90 truncate tracking-wide"
            >
              01 · Studio & Strategy
            </span>
          </div>

          {/* Mini progress bar & frame counter */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-24 sm:w-32 h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                suppressHydrationWarning
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full origin-left transition-transform duration-75"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <span
              ref={frameCounterRef}
              suppressHydrationWarning
              className="text-[10px] font-mono text-white/60 tracking-wider"
            >
              001 / 240
            </span>
          </div>
        </div>

        {/* Initial Scroll Prompt */}
        <div
          ref={scrollIndicatorRef}
          suppressHydrationWarning
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-150"
        >
          <ScrollIndicator className="text-neutral-700" />
        </div>
      </section>
    </div>
  )
}
