'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  driftX: number
  driftY: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
    driftX: (Math.random() - 0.5) * 30,
    driftY: (Math.random() - 0.5) * 30,
  }))
}

export default function ParticleLayer({ count = 60 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() => generateParticles(count), [mounted, count])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {mounted && (
        <motion.div className="absolute inset-0" style={{ opacity }}>
          {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              background: p.size > 2
                ? 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 100%)'
                : 'rgba(148, 163, 184, 0.4)',
              boxShadow: p.size > 2
                ? '0 0 6px rgba(99, 102, 241, 0.2)'
                : 'none',
            }}
            animate={{
              y: [0, p.driftY, 0],
              x: [0, p.driftX, 0],
              scale: [1, p.size > 2 ? 1.5 : 1.2, 1],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
          ))}
        </motion.div>
      )}
    </div>
  )
}
