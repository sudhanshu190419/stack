'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
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
  { id: 1, range: [0, 0.2], label: 'Studio & Strategy', tag: '01' },
  { id: 2, range: [0.2, 0.4], label: 'Velora Commerce', tag: '02' },
  { id: 3, range: [0.4, 0.6], label: 'Mobl Experience', tag: '03' },
  { id: 4, range: [0.6, 0.8], label: 'Savor Platform', tag: '04' },
  { id: 5, range: [0.8, 1.0], label: 'Responsive Ecosystem', tag: '05' },
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

  useEffect(() => {
    const handleCheckMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)
      setIsMobile(mobile)
      isMobileRef.current = mobile
    }
    handleCheckMobile()
    window.addEventListener('resize', handleCheckMobile, { passive: true })
    return () => window.removeEventListener('resize', handleCheckMobile)
  }, [])

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
        ? `${currentFrame.toString().padStart(3, '0')} / 100`
        : `${currentFrame.toString().padStart(3, '0')} / 500`
    }

    // 4. Chapter Name
    if (chapterTextRef.current) {
      if (isMobileRef.current) {
        chapterTextRef.current.innerText = '01 · Studio & Strategy'
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

    // Create GSAP ScrollTrigger pinning the hero across the continuous sequence
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: pinTarget,
        start: 'top top',
        end: isMobile ? '+=2500' : '+=3500', // Responsive scrub length
        scrub: 0.1, // Smooth, immediate scrubbing without sluggish easing
        onUpdate: (self) => {
          const progress = self.progress
          canvasHandleRef.current?.setFrameProgress(progress)
          updateUIOnScroll(progress)
        },
      })
    }, container)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill()
      })
    }
  }, [isMobile, updateUIOnScroll])

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Pinned Viewport Container - Full Bleed Screen */}
      <section
        ref={pinTargetRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF8F4]"
      >
        {/* Full-Bleed 16:9 / 9:16 Cinematic Canvas Frame */}
        <div className="absolute inset-0 w-full h-full z-10">
          <HeroCanvas
            ref={canvasHandleRef}
            isMobile={isMobile}
            onInitialFrameLoaded={() => setInitialFrameReady(true)}
          />
        </div>

        {/* Clip-01 Typography & CTA Overlay (Visible initially, aligns with reference image) */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-start transition-transform duration-75"
        >
          {/* Soft Left Vignette Shadow for Crystal-Clear Text Legibility */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[50%] xl:w-[45%] bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 pointer-events-auto">
            <div className="max-w-lg lg:max-w-[420px] xl:max-w-[460px] pt-12 sm:pt-16 lg:pt-0">
              {/* Eyebrow */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/80 mb-3 sm:mb-4 drop-shadow-sm">
                WEB DESIGN &amp; DEVELOPMENT
              </p>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white tracking-tight leading-[1.12] mb-3.5 sm:mb-4 drop-shadow-md">
                Websites that
                <br />
                make businesses
                <br />
                <span className="font-serif italic font-normal text-[#D5B28D]">
                  stand out.
                </span>
              </h1>

              {/* Subtitle Paragraph */}
              <p className="text-sm sm:text-[15px] leading-relaxed text-white/80 mb-6 sm:mb-8 max-w-[380px] drop-shadow-sm">
                We design and build modern, high-performing
                <br />
                websites that turn first impressions into customers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
                <a
                  href="#work"
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
                </a>
                <a
                  href="#contact"
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
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Scrub HUD (Floating at Bottom Center) */}
        <div
          ref={hudRef}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg px-4 py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/10 opacity-0 pointer-events-none transition-opacity duration-200 shadow-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span
              ref={chapterTextRef}
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
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full origin-left transition-transform duration-75"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <span
              ref={frameCounterRef}
              className="text-[10px] font-mono text-white/60 tracking-wider"
            >
              001 / 500
            </span>
          </div>
        </div>

        {/* Initial Scroll Prompt */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-150"
        >
          <ScrollIndicator className="text-neutral-700" />
        </div>
      </section>
    </div>
  )
}
