'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from './servicesData'
import ServiceVisual from './ServiceVisual'
import ServiceCard from './ServiceCard'

gsap.registerPlugin(ScrollTrigger)

function Particles() {
  const orangeParticles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${5 + Math.random() * 35}%`,
    top: `${5 + Math.random() * 45}%`,
    size: 2 + Math.random() * 2.5,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 4,
  }))
  const blueParticles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${55 + Math.random() * 40}%`,
    top: `${40 + Math.random() * 50}%`,
    size: 2 + Math.random() * 2.5,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 4,
  }))
  const dustParticles = Array.from({ length: 15 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 1.2,
    duration: 7 + Math.random() * 6,
    delay: Math.random() * 6,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Orange particles - top-left region */}
      {orangeParticles.map((p, i) => (
        <motion.div
          key={`orange-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: 'radial-gradient(circle, rgba(249,115,22,0.6), transparent)',
            boxShadow: '0 0 6px rgba(249,115,22,0.3)',
          }}
          initial={{ opacity: 0.5 }}
          animate={{
            y: [0, -(20 + Math.random() * 25), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Blue particles - bottom-right region */}
      {blueParticles.map((p, i) => (
        <motion.div
          key={`blue-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: 'radial-gradient(circle, rgba(59,130,246,0.6), transparent)',
            boxShadow: '0 0 6px rgba(59,130,246,0.3)',
          }}
          initial={{ opacity: 0.4 }}
          animate={{
            y: [0, -(15 + Math.random() * 20), 0],
            x: [0, (Math.random() - 0.5) * 25, 0],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Tiny glowing dust - scattered */}
      {dustParticles.map((p, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)',
            boxShadow: '0 0 3px rgba(255,255,255,0.15)',
          }}
          initial={{ opacity: 0.3, scale: 0.5 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function GradientBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Slow moving orange blob - top left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Slow moving red blob - center */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.12), transparent 70%)',
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Slow moving purple blob - transition zone */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.10), transparent 70%)',
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Slow moving blue blob - bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)',
        }}
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 30, -40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute left-1/4 top-0 w-[2px] h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(249,115,22,0.05), rgba(239,68,68,0.02), transparent)',
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[45%] top-0 w-[1px] h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(239,68,68,0.03), rgba(168,85,247,0.02), transparent)',
        }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute left-[55%] top-0 w-[1px] h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(168,85,247,0.03), rgba(59,130,246,0.02), transparent)',
        }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute left-[70%] top-0 w-[2px] h-full"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.03), rgba(59,130,246,0.05))',
        }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
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
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      style={{ height: `${SERVICES.length * 40}vh`, background: '#050816' }}
    >
      {/* Premium ambient background - seamless continuation of Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base layer: deep navy/black */}
        <div className="absolute inset-0" style={{ background: '#050816' }} />

        {/* Subtle animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />

        {/* Faint vignette around edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(5,8,22,0.4) 100%)',
          }}
        />

        {/* Cinematic layered gradient lighting */}
        {/* Top-left: soft orange glow */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.15), transparent 70%)',
          }}
        />
        {/* Center: warm red ambient glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(239,68,68,0.12), transparent 70%)',
          }}
        />
        {/* Center-right: subtle purple transition between red and blue */}
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 60% 50%, rgba(168,85,247,0.08), transparent 70%)',
          }}
        />
        {/* Bottom-right: soft blue glow */}
        <div
          className="absolute -bottom-32 -right-32 w-[550px] h-[550px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 60%, rgba(59,130,246,0.14), transparent 70%)',
          }}
        />

        {/* Depth layer: subtle diagonal light sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, transparent 30%, rgba(59,130,246,0.06) 70%, rgba(59,130,246,0.10) 100%)',
          }}
        />

        {/* Soft radial light behind the illustration area */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          }}
        />

        {/* Slow moving gradient blobs */}
        <GradientBlobs />

        {/* Subtle light rays */}
        <LightRays />

        {/* Floating particles */}
        {mounted && <Particles />}
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
