'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!glowRef.current) return
    const x = e.clientX
    const y = e.clientY
    glowRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        width: 300,
        height: 300,
        background:
          'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        transform: 'translate(-150px, -150px)',
        willChange: 'transform',
        transition: 'transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)',
      }}
    />
  )
}
