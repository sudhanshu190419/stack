'use client'

import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    let rafId: number | null = null
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      currentX = e.clientX
      currentY = e.clientY

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const normalizedX = (currentX / window.innerWidth - 0.5) * 2
          const normalizedY = (currentY / window.innerHeight - 0.5) * 2
          setPosition({
            x: currentX,
            y: currentY,
            normalizedX,
            normalizedY,
          })
          rafId = null
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return position
}
