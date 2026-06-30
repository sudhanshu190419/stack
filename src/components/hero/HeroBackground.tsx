'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ background: '#050816' }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: bgY }}
      >
        <div className="relative w-full h-full max-w-[1536px] max-h-[1024px]">
          <Image
            src="/hero.png"
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </motion.div>
    </div>
  )
}
