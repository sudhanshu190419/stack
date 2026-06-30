'use client'

import { motion } from 'framer-motion'

interface ServiceVisualProps {
  serviceId: number
  isActive: boolean
}

function BrowserVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-72 h-52 rounded-xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-6 bg-white/5 flex items-center px-3 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 h-2 w-16 rounded bg-white/5" />
        </div>
        <div className="p-3 space-y-2">
          {[60, 80, 45, 70, 90].map((w, i) => (
            <motion.div
              key={i}
              className="h-2 rounded bg-gradient-to-r from-orange-500/40 via-red-500/40 to-rose-500/40"
              style={{ width: `${w}%` }}
              animate={isActive ? { width: `${w}%`, opacity: 1 } : { width: `${w * 0.6}%`, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          ))}
        </div>
        {isActive && (
          <motion.div
            className="absolute -top-3 -right-3 w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.2), transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
      {isActive && (
        <>
          <motion.div className="absolute w-20 h-20 rounded-full bg-orange-500/5 blur-2xl -top-4 -left-4" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} />
          <motion.div className="absolute w-16 h-16 rounded-full bg-rose-500/5 blur-2xl -bottom-2 -right-2" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 3.5, repeat: Infinity }} />
        </>
      )}
    </div>
  )
}

function PhoneVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-32 h-56 rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.85, opacity: 0.4, y: 10 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-4 bg-white/5 flex items-center justify-center">
          <span className="w-8 h-1 rounded-full bg-white/10" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-3 w-20 rounded bg-rose-500/20 mx-auto" />
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-lg bg-white/5"
                animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              />
            ))}
          </div>
          <div className="h-2 w-full rounded bg-white/5 mt-2" />
          <div className="h-2 w-3/4 rounded bg-white/5" />
        </div>
      </motion.div>
      {isActive && (
        <motion.div className="absolute w-24 h-24 rounded-full bg-rose-500/5 blur-3xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      )}
    </div>
  )
}

function DesignVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-64 h-48"
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { rotate: -8, x: -20, y: -10, w: '70%', h: '60%', delay: 0 },
          { rotate: 4, x: 15, y: 5, w: '65%', h: '55%', delay: 0.1 },
          { rotate: -2, x: -5, y: 25, w: '75%', h: '50%', delay: 0.2 },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl overflow-hidden"
            style={{
              width: card.w,
              height: card.h,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              left: '50%',
              top: '50%',
            }}
            animate={isActive ? { x: `calc(-50% + ${card.x}px)`, y: `calc(-50% + ${card.y}px)`, rotate: card.rotate } : { x: '-50%', y: '-50%', rotate: 0 }}
            transition={{ duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-3 space-y-1.5">
              <div className="h-1.5 w-12 rounded bg-purple-500/30" />
              <div className="h-1 w-full rounded bg-white/5" />
              <div className="h-1 w-3/4 rounded bg-white/5" />
              <div className="flex gap-1 mt-2">
                <div className="h-3 w-3 rounded-full bg-purple-500/20" />
                <div className="h-3 w-3 rounded-full bg-indigo-500/20" />
                <div className="h-3 w-3 rounded-full bg-blue-500/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {isActive && (
        <motion.div className="absolute w-32 h-32 rounded-full bg-purple-500/5 blur-3xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 5, repeat: Infinity }} />
      )}
    </div>
  )
}

function AIVisual({ isActive }: { isActive: boolean }) {
  const nodes = [
    { x: '50%', y: '20%' },
    { x: '25%', y: '50%' },
    { x: '75%', y: '50%' },
    { x: '50%', y: '80%' },
    { x: '35%', y: '35%' },
    { x: '65%', y: '35%' },
  ]
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [2, 5], [4, 3], [5, 3], [4, 5]]

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {edges.map(([i, j], e) => (
          <motion.line
            key={e}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="rgba(59,130,246,0.15)"
            strokeWidth="1"
            animate={isActive ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0.1 }}
            transition={{ duration: 2, repeat: Infinity, delay: e * 0.2 }}
          />
        ))}
      </svg>
      <div className="relative w-48 h-48">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: node.x,
              top: node.y,
              background: 'radial-gradient(circle, rgba(59,130,246,0.6), rgba(6,182,212,0.3))',
              boxShadow: '0 0 12px rgba(59,130,246,0.3)',
            }}
            animate={isActive ? { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] } : { scale: 0.8, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <motion.div
          className="absolute w-16 h-16 rounded-full blur-2xl"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)' }}
          animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 0.8 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

function CloudVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-48">
        {[
          { x: '50%', y: '25%', w: 60, h: 36, label: 'API' },
          { x: '20%', y: '55%', w: 52, h: 40, label: 'DB' },
          { x: '80%', y: '55%', w: 52, h: 40, label: 'Cache' },
          { x: '35%', y: '75%', w: 48, h: 32, label: 'Auth' },
          { x: '65%', y: '75%', w: 48, h: 32, label: 'CDN' },
        ].map((box, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              width: box.w,
              height: box.h,
              left: box.x,
              top: box.y,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="text-[8px] font-medium text-white/50">{box.label}</span>
          </motion.div>
        ))}
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {[
            [0, 1], [0, 2], [1, 3], [2, 4],
          ].map(([i, j], e) => {
            const from = [{ x: 50, y: 25 }, { x: 20, y: 55 }, { x: 80, y: 55 }, { x: 35, y: 75 }, { x: 65, y: 75 }][i]
            const to = [{ x: 50, y: 25 }, { x: 20, y: 55 }, { x: 80, y: 55 }, { x: 35, y: 75 }, { x: 65, y: 75 }][j]
            return (
              <motion.line
                key={e}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="rgba(20,184,166,0.12)"
                strokeWidth="1"
                strokeDasharray="4 3"
                animate={isActive ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0.1 }}
                transition={{ duration: 2, repeat: Infinity, delay: e * 0.3 }}
              />
            )
          })}
        </svg>
        {isActive && (
          <motion.div className="absolute w-28 h-28 rounded-full bg-emerald-500/5 blur-3xl" style={{ left: '30%', top: '40%' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} />
        )}
      </div>
    </div>
  )
}

function StrategyVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-64 h-44 rounded-xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-6 bg-white/5 flex items-center px-3">
          <span className="text-[9px] font-medium text-white/40">Analytics</span>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex gap-2">
            {[35, 55, 45, 70, 60, 80].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, background: 'linear-gradient(to top, rgba(245,158,11,0.3), rgba(239,68,68,0.15))' }}
                animate={isActive ? { height: `${h}%`, opacity: 1 } : { height: `${h * 0.6}%`, opacity: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded bg-emerald-500/20 animate-pulse" />
              <div className="h-1 w-3/4 rounded bg-white/5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded bg-amber-500/20" />
              <div className="h-1 w-3/4 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </motion.div>
      {isActive && (
        <motion.div className="absolute w-20 h-20 rounded-full bg-amber-500/5 blur-3xl -top-2 right-4" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 3.5, repeat: Infinity }} />
      )}
    </div>
  )
}

export default function ServiceVisual({ serviceId, isActive }: ServiceVisualProps) {
  const visuals = [BrowserVisual, PhoneVisual, DesignVisual, AIVisual, CloudVisual, StrategyVisual]
  const VisualComponent = visuals[serviceId - 1] || BrowserVisual
  return (
    <div className="relative w-full h-full">
      <VisualComponent isActive={isActive} />
    </div>
  )
}
