'use client'

import React, { useEffect, useRef, useState } from 'react'

interface TickerItem {
  text: string
  tag: string
  glyph: string
}

const TICKER_ITEMS: TickerItem[] = [
  { text: 'FROM STRATEGY TO SCALE', tag: 'PROCESS', glyph: '✦' },
  { text: 'BESPOKE DESIGN SYSTEMS', tag: 'CRAFT', glyph: '●' },
  { text: 'HIGH-PERFORMANCE ARCHITECTURE', tag: 'NEXT.JS', glyph: '✦' },
  { text: 'CONVERSION-FOCUSED INTERFACES', tag: 'GROWTH', glyph: '★' },
  { text: 'PIXEL-PERFECT ENGINEERING', tag: 'PRECISION', glyph: '✦' },
  { text: 'MEASURABLE BUSINESS IMPACT', tag: 'RESULTS', glyph: '●' },
  { text: 'SCALABLE MODERN CODEBASES', tag: 'PERFORMANCE', glyph: '✦' },
  { text: 'CRAFTED FOR AMBITIOUS BRANDS', tag: 'EST. 2026', glyph: '★' },
]

export default function WorkProcessDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  // Motion physics state stored in refs to avoid re-renders during 120fps ticker
  const physics = useRef({
    x: 0,
    baseSpeed: 1.1, // Smooth, legible baseline speed (px per 60fps frame)
    targetSpeed: 1.1,
    velocity: 0,
    dragStartX: 0,
    lastDragX: 0,
    lastDragTime: 0,
    dragVelocity: 0,
    singleSetWidth: 0,
    lastScrollY: 0,
    isHovered: false,
    reducedMotion: false,
  })

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    physics.current.reducedMotion = mediaQuery.matches

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      physics.current.reducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleReducedMotion)

    // Measure track single-set width
    const measure = () => {
      if (singleSetRef.current) {
        physics.current.singleSetWidth = singleSetRef.current.offsetWidth
      }
    }
    measure()

    const resizeObserver = new ResizeObserver(() => {
      measure()
    })
    if (singleSetRef.current) {
      resizeObserver.observe(singleSetRef.current)
    }

    // Scroll listener: scrolls add momentum in the scrolling direction
    physics.current.lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - physics.current.lastScrollY
      physics.current.lastScrollY = currentScrollY

      // Add scroll velocity to marquee (faster scroll = faster marquee motion)
      if (!physics.current.reducedMotion) {
        physics.current.velocity += deltaY * 0.14
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Continuous Animation Loop (requestAnimationFrame)
    let animationFrameId: number
    let lastTime = performance.now()

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 3) // Normalized delta time (1.0 at 60fps)
      lastTime = time

      const p = physics.current

      if (!isDragging) {
        // Smoothly decay velocity back to 0
        p.velocity *= Math.pow(0.92, dt)

        // Baseline speed (slightly gentle when hovered)
        const currentBase = p.reducedMotion ? 0 : p.isHovered ? 0.7 : p.baseSpeed
        const totalStep = (currentBase + p.velocity) * dt

        p.x -= totalStep
      }

      // Seamless infinite wrapping
      if (p.singleSetWidth > 0) {
        if (p.x <= -p.singleSetWidth) {
          p.x += p.singleSetWidth
        } else if (p.x > 0) {
          p.x -= p.singleSetWidth
        }
      }

      // Apply composite hardware-accelerated transform
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${p.x}px, 0, 0)`
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      mediaQuery.removeEventListener('change', handleReducedMotion)
      resizeObserver.disconnect()
    }
  }, [isDragging])

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0) return

    setIsDragging(true)
    const p = physics.current
    p.dragStartX = e.clientX
    p.lastDragX = e.clientX
    p.lastDragTime = performance.now()
    p.dragVelocity = 0
    p.velocity = 0

    // Capture pointer
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const now = performance.now()
    const dx = e.clientX - physics.current.lastDragX
    const dt = Math.max(now - physics.current.lastDragTime, 1)

    physics.current.x += dx
    physics.current.dragVelocity = (dx / dt) * 16.67 // Convert to px/frame
    physics.current.lastDragX = e.clientX
    physics.current.lastDragTime = now
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)

    // Release momentum: transfer drag speed into physics velocity
    physics.current.velocity = -physics.current.dragVelocity * 1.2
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Safe fallback
    }
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Interactive process and craft ticker divider"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        physics.current.isHovered = true
      }}
      onMouseLeave={() => {
        physics.current.isHovered = false
      }}
      className={`relative w-full overflow-hidden bg-[#141311] border-y border-white/[0.08] select-none py-2.5 sm:py-3 lg:py-3.5 z-20 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Subtle warm ambient glow in background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(158, 105, 65, 0.15) 0%, rgba(20, 19, 17, 0) 75%)',
        }}
      />

      {/* Edge gradient fade masks for smooth infinity enter/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 lg:w-48 bg-gradient-to-r from-[#141311] via-[#141311]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 lg:w-48 bg-gradient-to-l from-[#141311] via-[#141311]/80 to-transparent z-10" />

      {/* Smooth Continuous Moving Track (3 identical duplicated sets for infinite wrap) */}
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Set 1 (measured for width calculation) */}
        <div ref={singleSetRef} className="flex shrink-0 items-center">
          {TICKER_ITEMS.map((item, idx) => (
            <TickerItemNode key={`s1-${idx}`} item={item} />
          ))}
        </div>

        {/* Set 2 (seamless continuation) */}
        <div className="flex shrink-0 items-center">
          {TICKER_ITEMS.map((item, idx) => (
            <TickerItemNode key={`s2-${idx}`} item={item} />
          ))}
        </div>

        {/* Set 3 (buffer to prevent gaps on ultra-wide / 4K displays) */}
        <div className="flex shrink-0 items-center">
          {TICKER_ITEMS.map((item, idx) => (
            <TickerItemNode key={`s3-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TickerItemNode({ item }: { item: TickerItem }) {
  return (
    <div className="flex items-center gap-5 sm:gap-7 lg:gap-8 px-4 sm:px-6 shrink-0 group">
      {/* Star / Glyph Accent */}
      <span className="text-xs sm:text-sm text-[#9E6941] transition-transform duration-300 group-hover:scale-125 group-hover:text-[#C59B73] select-none">
        {item.glyph}
      </span>

      {/* Main Phrase */}
      <span className="text-xs sm:text-[13px] lg:text-[13.5px] font-bold tracking-[0.24em] uppercase text-[#FAF7F2] group-hover:text-white transition-colors duration-200 select-none">
        {item.text}
      </span>

      {/* Micro Pill Badge */}
      <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-mono font-semibold tracking-widest text-[#D5CEC2]/75 bg-white/[0.05] border border-white/[0.09] select-none group-hover:border-[#9E6941]/40 group-hover:text-[#FAF7F2] transition-colors duration-200">
        {item.tag}
      </span>
    </div>
  )
}
