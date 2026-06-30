'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.5 }}
    >
      <span className="text-[10px] text-hero-text-dim tracking-widest uppercase font-medium">
        Scroll
      </span>
      <div className="relative w-5 h-8 rounded-full border border-hero-text-dim/30 flex items-start justify-center p-1.5">
        <motion.div
          className="w-1 h-2 rounded-full bg-hero-accent"
          animate={{
            y: [0, 12, 0],
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
