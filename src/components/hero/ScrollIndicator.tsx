'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  className?: string
  style?: React.CSSProperties
}

export default function ScrollIndicator({ className = '', style }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <span className="text-[9px] text-white/80 tracking-[0.25em] uppercase font-semibold">
        SCROLL
      </span>
      <div className="relative w-4 h-7 rounded-full border border-white/50 bg-white/5 flex items-start justify-center p-1 shadow-xs">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-white"
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
