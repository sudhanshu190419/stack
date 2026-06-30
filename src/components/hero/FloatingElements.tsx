'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface TechIcon {
  name: string
  icon: React.ReactNode
  x: number
  y: number
  rotation: number
  floatDuration: number
  floatDelay: number
  size: number
  glowColor: string
}

interface IconDef {
  name: string
  color: string
  icon: React.ReactNode
}

const ICONS: IconDef[] = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.002L9.219 7.2H7.2v9.596h1.94V9.251l6.645 9.973c.493.044.992.076 1.497.076zM17.02 7.2h-1.94v9.596h1.94V7.2z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.435.153l-9.37 5.43c-.35.2-.565.575-.565.985v10.864c0 .41.215.785.565.985l9.37 5.43c.35.2.78.2 1.13 0l9.37-5.43c.35-.2.565-.575.565-.985V6.568c0-.41-.215-.785-.565-.985L12.565.153c-.35-.2-.78-.2-1.13 0zm.565 2.036l7.91 4.58-3.41 1.98-4.5-2.6-4.5 2.6-3.41-1.98 7.91-4.58zm-8.59 6.636l2.61 1.51v3.03l1.77 1.02v-3.03l2.61-1.51v-3.04l-2.61 1.51-1.77 1.02-2.61-1.51v3.04zm9.73 0l-2.61 1.51v3.03l-1.77 1.02v-3.03l-2.61-1.51v-3.04l2.61 1.51 1.77 1.02 2.61-1.51v3.04zm1.39 6.75l-1.77 1.02 1.77 1.02 1.77-1.02-1.77-1.02z" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M3.89 15.67L6.255 1.52a.41.41 0 0 1 .745-.167l2.925 4.56-4.035 9.757zm10.848-4.244L13.83 5.97l-2.47-3.854a.42.42 0 0 0-.72 0L5.49 14.196l9.248-4.77zm.832 1.418l-4.21 7.156 8.616-3.65a.42.42 0 0 0 .245-.415l-.31-2.038-4.34-1.053zM3.183 17.788l3.554 4.625a.83.83 0 0 0 .95.28l13.77-5.376a.83.83 0 0 0 .5-.765l-.296-3.626-18.478 4.862z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.9 22.585c-.366 0-.607-.2-.732-.507l-3.372-8.56H4.59c-.558 0-.605-.356-.399-.641l6.634-9.831c.157-.233.384-.362.62-.362.365 0 .606.2.731.507l3.372 8.56h3.207c.557 0 .605.356.399.641l-6.634 9.831c-.157.233-.384.362-.62.362z" />
      </svg>
    ),
  },
  {
    name: 'Database',
    color: '#6366f1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    name: 'Cloud',
    color: '#38bdf8',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    name: 'AI',
    color: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7.02 7.02 0 0 1 17 21h-4a7 7 0 0 1-7-7H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
]

const POSITIONS = [
  { x: 10, y: 10 }, { x: 45, y: 5 }, { x: 75, y: 15 },
  { x: 5, y: 45 }, { x: 80, y: 40 }, { x: 20, y: 70 },
  { x: 55, y: 75 }, { x: 85, y: 70 },
] as const

function generateFloatingIcons(): TechIcon[] {
  return ICONS.map((def, i) => ({
    name: def.name,
    icon: def.icon,
    glowColor: def.color,
    x: POSITIONS[i % POSITIONS.length].x,
    y: POSITIONS[i % POSITIONS.length].y,
    rotation: Math.random() * 20 - 10,
    floatDuration: 6 + Math.random() * 4,
    floatDelay: Math.random() * 3,
    size: 20 + Math.random() * 8,
  }))
}

export default function FloatingElements() {
  const icons = useMemo(() => generateFloatingIcons(), [])

  return (
    <>
      {icons.map((icon) => (
        <motion.div
          key={icon.name}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: icon.size,
            height: icon.size,
            color: icon.glowColor,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, icon.x > 50 ? -8 : 8, 0],
            rotate: [icon.rotation, icon.rotation + 5, icon.rotation],
          }}
          transition={{
            duration: icon.floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.floatDelay,
          }}
          whileHover={{ scale: 1.3 }}
        >
          <div
            className="w-full h-full drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${icon.glowColor}40)`,
            }}
            aria-hidden="true"
          >
            {icon.icon}
          </div>

          {/* Glow ring behind icon */}
          <div
            className="absolute inset-[-4px] rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${icon.glowColor} 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}
