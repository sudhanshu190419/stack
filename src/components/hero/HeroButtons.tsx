'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
}

function MagneticButton({
  children,
  variant,
  href,
  onClick,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3
      setPosition({ x, y })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setIsHovering(false)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 800)
    onClick?.()
    if (!href || href === '#') {
      e.preventDefault()
    }
  }, [onClick, href])

  const baseStyles =
    'relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 magnetic-btn'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40',
    secondary:
      'glass text-hero-text hover:bg-hero-card-hover hover:border-hero-accent/30',
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${isHovering ? 'scale-[1.02]' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovering
          ? 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)'
          : 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ripple container */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
            width: 16,
            height: 16,
            animation: 'ripple 0.8s ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2 px-6 py-3.5">
        {children}
      </span>

      {/* Animated gradient border for secondary */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))',
          }}
          animate={isHovering ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.a>
  )
}

const TRUST_ITEMS = [
  'Mobile Apps',
  'Web Platforms',
  'AI Integrations',
  'UI/UX Design',
  'Cloud Solutions',
]

export default function HeroButtons() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="space-y-6">
      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <MagneticButton variant="primary" href="#">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Book Free Consultation
        </MagneticButton>
        <MagneticButton variant="secondary" href="#">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          View Our Work
        </MagneticButton>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        className="flex flex-wrap gap-x-5 gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        {TRUST_ITEMS.map((item, i) => (
          <motion.span
            key={item}
            className="inline-flex items-center gap-1.5 text-xs text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.6 + i * 0.08 }}
          >
            <svg
              className="w-3.5 h-3.5 text-hero-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
