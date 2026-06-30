'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HeadlineProps {
  text: string
  highlightWords?: string[]
}

function HighlightedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      style={{
        background: 'linear-gradient(90deg, #6EE7FF 0%, #4F8DFF 50%, #A855F7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {word}
    </motion.span>
  )
}

function splitLine(line: string, highlightWords: string[], lineIndex: number) {
  const words = line.split(' ')
  return words.map((word, i) => {
    const cleanWord = word.replace(/[.,!?;:]$/, '')
    const isHighlighted = highlightWords.some(
      (hw) => cleanWord.toLowerCase() === hw.toLowerCase()
    )

    return (
      <span key={`w-${lineIndex}-${i}`} className="mr-[0.3em] last:mr-0">
        {isHighlighted ? (
          <HighlightedWord word={word} delay={i * 0.1} />
        ) : (
          <span className="text-white">
            {word}
          </span>
        )}
      </span>
    )
  })
}

export default function AnimatedHeadline({
  text,
  highlightWords = ['Ideas', 'Digital', 'Products'],
}: HeadlineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Split by | to support explicit line breaks in the text
  const lines = text.split('|')

  return (
    <div ref={ref} className="relative max-w-md">
      {/* Subtle glow behind the heading */}
      <div
        className="absolute -inset-8 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)',
        }}
      />

      <motion.h1
        className="relative"
        style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 92px)',
          lineHeight: 0.95,
          fontWeight: 800,
          letterSpacing: '-3px',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {lines.map((line, i) => (
          <span key={`line-${i}`} className="block">
            {splitLine(line.trim(), highlightWords, i)}
          </span>
        ))}
      </motion.h1>
    </div>
  )
}
