'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  label: string
  value: number
  suffix: string
  prefix?: string
}

const STATS: Stat[] = [
  { label: 'Projects Delivered', value: 50, suffix: '+' },
  { label: 'Happy Clients', value: 20, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Client Satisfaction', value: 99, suffix: '%' },
]

function useCountUp(target: number, isActive: boolean, duration = 2): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let startTime: number | null = null
    let rafId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [target, isActive, duration])

  return count
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useCountUp(stat.value, isInView)

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-2xl sm:text-3xl font-bold text-white">
        <span className="gradient-text">
          {stat.prefix || ''}
          {count}
          {stat.suffix}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-hero-text-muted mt-1.5">
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function HeroStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
