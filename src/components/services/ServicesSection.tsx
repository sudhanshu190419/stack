'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from './servicesData'
import ServiceVisual from './ServiceVisual'
import ServiceCard from './ServiceCard'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 30

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0
              ? 'rgba(249,115,22,0.3)'
              : i % 3 === 1
                ? 'rgba(59,130,246,0.3)'
                : 'rgba(239,68,68,0.3)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 20, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
      {SERVICES.map((_, i) => (
        <div key={i} className="flex items-center gap-3 group cursor-pointer">
          <span
            className={`text-[10px] font-medium transition-all duration-500 ${
              i === activeIndex ? 'text-white/60' : 'text-white/10'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div
            className={`w-[2px] rounded-full transition-all duration-500 ${
              i === activeIndex ? 'h-8 bg-white/40' : 'h-3 bg-white/10'
            }`}
          />
        </div>
      ))}
    </div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const cards = SERVICES.length
    const scrollPerCard = 20
    const totalScroll = cards * scrollPerCard

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalScroll}%`,
      pin: pin,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const idx = Math.min(Math.floor(progress * cards), cards - 1)
        setActiveIndex(idx)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SERVICES.length * 60}vh`, background: '#050816' }}
    >
      {/* Ambient background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />
        {/* Ambient glows */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at left center, rgba(249,115,22,0.08), transparent 70%)',
          }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at right center, rgba(59,130,246,0.08), transparent 70%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(239,68,68,0.05), transparent 70%)',
          }}
        />
      </div>

      {/* Pinned container */}
      <div
        ref={pinRef}
        className="relative z-10 h-screen overflow-hidden pt-[72px] lg:pt-[85px]"
      >
        <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto">
          {/* Left column - Visual */}
          <div className="flex-1 flex items-center justify-center lg:pr-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="w-full h-full flex items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceVisual
                  serviceId={SERVICES[activeIndex].id}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column - Cards */}
          <div className="flex-1 relative flex items-center">
            <AnimatePresence mode="wait">
              {SERVICES.map(
                (service, i) =>
                  i === activeIndex && (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isActive={true}
                      index={i}
                    />
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress indicator */}
        <ProgressDots activeIndex={activeIndex} />

        {/* Section label */}
        <div className="absolute top-[calc(72px+2rem)] lg:top-[calc(85px+2rem)] left-6 lg:left-12 z-20">
          <span className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">
            Our Services
          </span>
        </div>
      </div>
    </section>
  )
}
