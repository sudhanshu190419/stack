'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CLIENTS = [
  'Stripe', 'Vercel', 'Linear', 'Figma',
  'Notion', 'Supabase', 'Railway', 'Cal.com',
]

export default function ClientLogos() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="w-full py-12">
      <motion.p
        className="text-center text-xs sm:text-sm text-hero-text-muted mb-6 sm:mb-8 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Trusted by Startups &amp; Businesses Worldwide
      </motion.p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-hero-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-hero-bg to-transparent z-10" />

        <motion.div
          className="flex gap-12 sm:gap-16 items-center"
          initial={{ x: 0 }}
          animate={isInView ? { x: ['0%', '-50%'] } : {}}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex-shrink-0 text-lg sm:text-xl font-semibold text-hero-text-dim/40 hover:text-hero-text-dim/60 transition-colors duration-300 select-none"
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
