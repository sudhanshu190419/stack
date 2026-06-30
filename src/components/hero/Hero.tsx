'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroBackground from './HeroBackground'
import ParticleLayer from './ParticleLayer'
import AnimatedHeadline from './AnimatedHeadline'
import HeroButtons from './HeroButtons'

import ScrollIndicator from './ScrollIndicator'
import CursorGlow from './CursorGlow'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -40])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Badge text animation
  const badgeWords = ['🚀', 'Building', 'Digital', 'Products', 'That', 'Scale']

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col overflow-hidden pt-[72px] lg:pt-[85px]"
    >
      {/* Background layers */}
      <HeroBackground />
      <ParticleLayer count={50} />

      {/* Continuous dark overlay from viewport top to hero bottom */}
      <div className="absolute left-0 top-0 h-full w-full lg:w-3/5 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none z-[5]" />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col"
        style={{ opacity, scale, y }}
      >
        <div className="flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-0 lg:pb-8 gap-8 lg:gap-16">
          {/* Left side - Content */}
          {mounted && (
            <div className="relative flex-1 flex flex-col justify-center max-w-xl mx-auto lg:mx-0">
              {/* Animated badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8 w-fit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(99,102,241,0.4)' }}
              >
                <span className="flex gap-1">
                  {badgeWords.map((word, i) => (
                    <motion.span
                      key={i}
                      className="text-[11px] sm:text-xs font-medium text-white/90"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-hero-success animate-glow-pulse" />
              </motion.div>

              {/* Headline */}
              <AnimatedHeadline
                text="Turning Bold|Ideas Into|Digital Products."
                highlightWords={['Digital', 'Products']}
              />

              {/* Supporting text */}
              <motion.p
                className="mt-6 sm:mt-8"
                style={{
                  maxWidth: '550px',
                  lineHeight: 1.8,
                  color: '#E5E7EB',
                  fontSize: '20px',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                From strategy and design to development and launch, we create
                fast, scalable, and beautiful software that helps businesses
                grow.
              </motion.p>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8">
                <HeroButtons />
              </div>
            </div>
          )}

        </div>



        {/* Live status badge */}
        <motion.div
          className="absolute top-24 sm:top-28 right-4 sm:right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-hero-success/10 border border-hero-success/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-hero-success animate-glow-pulse" />
          <span className="text-[10px] sm:text-xs text-hero-success font-medium">
            Available for work
          </span>
        </motion.div>
      </motion.div>

      {/* Cursor glow */}
      <CursorGlow />

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
