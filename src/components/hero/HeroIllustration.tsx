'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import FloatingElements from './FloatingElements'

interface Node {
  id: number
  x: number
  y: number
  label: string
}

const NODES: Node[] = [
  { id: 1, x: 30, y: 25, label: 'API' },
  { id: 2, x: 70, y: 20, label: 'DB' },
  { id: 3, x: 20, y: 60, label: 'UI' },
  { id: 4, x: 60, y: 65, label: 'Auth' },
  { id: 5, x: 80, y: 55, label: 'AI' },
  { id: 6, x: 45, y: 40, label: 'Cloud' },
]

const EDGES: [number, number][] = [
  [1, 2], [1, 3], [1, 6],
  [2, 5], [2, 4],
  [3, 4], [3, 6],
  [4, 5], [5, 6],
]

function GridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#smallGrid)" />
    </svg>
  )
}

function CodeSnippet() {
  const code = `const app = createApp();
app.use(analytics);
app.use(auth);
app.mount('#root');`
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const progressRef = useRef({ value: 0 })
  const animRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    let mounted = true

    const runTyping = async () => {
      progressRef.current.value = 0
      setCursorVisible(true)

      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule

      animRef.current = gsap.to(progressRef.current, {
        value: code.length,
        duration: code.length * 0.035,
        ease: 'none',
        onUpdate: () => {
          if (!mounted) return
          const currentLength = Math.floor(progressRef.current.value)
          setDisplayed(code.slice(0, currentLength))
        },
        onComplete: () => {
          if (!mounted) return
          setDisplayed(code)
          setTimeout(() => {
            if (mounted) setCursorVisible(false)
          }, 3000)
        },
      })
    }

    runTyping()

    return () => {
      mounted = false
      animRef.current?.kill()
    }
  }, [])

  return (
    <motion.div
      className="glass-strong rounded-xl p-3 sm:p-4 w-full max-w-[200px] sm:max-w-[240px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
    >
      <div className="flex gap-1.5 mb-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <pre className="text-[10px] sm:text-[11px] leading-relaxed text-hero-text-muted font-mono">
        <code>{displayed}</code>
        {cursorVisible && (
          <span className="inline-block w-[2px] h-[13px] bg-hero-accent ml-0.5 animate-cursor-blink align-text-top" />
        )}
      </pre>
    </motion.div>
  )
}

function PhoneMockup() {
  return (
    <motion.div
      className="absolute -right-[5%] sm:right-[5%] top-[5%] sm:top-[10%] z-10 animate-float-medium"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
    >
      {/* Phone body */}
      <div className="relative w-[50px] sm:w-[60px] h-[100px] sm:h-[120px] rounded-[14px] sm:rounded-[18px] glass-strong overflow-hidden">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[20px] h-[4px] bg-black/80 rounded-full z-10" />
        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[11px] sm:rounded-[15px] overflow-hidden bg-gradient-to-b from-indigo-500/20 to-purple-500/10 p-1.5 flex flex-col gap-1">
          {/* App dots */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-1">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="w-[6px] sm:w-[7px] aspect-square rounded-full"
                  style={{
                    background: i % 2 === 0
                      ? `rgba(99, 102, 241, ${0.2 + j * 0.15})`
                      : `rgba(168, 85, 247, ${0.2 + j * 0.15})`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-purple-500/20 blur-xl rounded-full" />
    </motion.div>
  )
}

function DashboardCard({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute glass rounded-xl p-2.5 sm:p-3 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 150, damping: 12 }}
    >
      {/* Card header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-hero-success" />
        <div className="w-12 h-1.5 rounded-full bg-hero-card-border" />
      </div>
      {/* Card bars */}
      <div className="flex gap-1 items-end">
        {[30, 50, 40, 70, 55, 80, 60].slice(0, 5).map((h, i) => (
          <div
            key={i}
            className="w-2 sm:w-3 rounded-t-sm"
            style={{
              height: h / 2,
              background: `linear-gradient(to top, rgba(99,102,241,0.5), rgba(168,85,247,0.3))`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function LaptopMockup() {
  return (
    <motion.div
      className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Screen */}
      <div className="glass-strong rounded-xl overflow-hidden aspect-[4/3] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10" />

        {/* Screen content */}
        <div className="relative p-3 sm:p-4 flex flex-col gap-2 h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-hero-accent" />
              <span className="text-[9px] sm:text-[10px] text-hero-text-dim font-medium">dashboard</span>
            </div>
            <div className="flex gap-1">
              {['w-8', 'w-6', 'w-4'].map((w, i) => (
                <div key={i} className={`${w} h-1.5 rounded-full bg-hero-card-border`} />
              ))}
            </div>
          </div>

          {/* Chart bars */}
          <div className="flex-1 flex items-end gap-1.5 sm:gap-2 pb-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  background: `linear-gradient(to top, rgba(99,102,241,0.6), rgba(168,85,247,0.4))`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              />
            ))}
          </div>

          {/* Bottom labels */}
          <div className="flex gap-1.5 sm:gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="flex-1 text-center text-[7px] sm:text-[8px] text-hero-text-dim">
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-indigo-500/20 blur-2xl rounded-full" />
      </div>

      {/* Stand */}
      <div className="mx-auto w-[40%] h-2 bg-hero-card-border rounded-b-lg" />
    </motion.div>
  )
}

function NodeConnection() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {EDGES.map(([fromId, toId], i) => {
        const from = NODES.find((n) => n.id === fromId)
        const to = NODES.find((n) => n.id === toId)
        if (!from || !to) return null

        return (
          <motion.line
            key={`edge-${i}`}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="rgba(99, 102, 241, 0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.08, ease: 'easeInOut' }}
          />
        )
      })}
    </svg>
  )
}

function MiniNodes() {
  return (
    <>
      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex items-center justify-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.8 + i * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.3 }}
        >
          <div className="w-2 h-2 rounded-full bg-hero-accent shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-hero-text-dim whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}
    </>
  )
}

export default function HeroIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { normalizedX, normalizedY } = useMousePosition()

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] sm:min-h-[500px]">
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isInView
            ? `translate3d(${normalizedX * 8}px, ${normalizedY * 8}px, 0)`
            : 'none',
          transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        {/* Grid background */}
        <GridPattern />

        {/* Laptop mockup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <LaptopMockup />
        </div>

        {/* Phone mockup */}
        <PhoneMockup />

        {/* Floating dashboard cards */}
        <DashboardCard
          delay={1.6}
          className="top-[60%] left-[5%] sm:left-[10%] w-[70px] sm:w-[90px] animate-float-slow"
        />
        <DashboardCard
          delay={1.8}
          className="top-[30%] right-[2%] sm:right-[5%] w-[60px] sm:w-[80px] animate-float-medium"
        />

        {/* Code snippet */}
        <div className="absolute top-[8%] right-[5%] sm:right-[10%]">
          <CodeSnippet />
        </div>

        {/* Network nodes */}
        <div className="absolute inset-0">
          <NodeConnection />
          <MiniNodes />
        </div>

        {/* Floating tech icons */}
        <FloatingElements />

        {/* Rotating ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-hero-accent/10 animate-rotate-ring"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-hero-accent/5 animate-rotate-ring-reverse"
        />
      </motion.div>
    </div>
  )
}
