'use client'

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react'

export const TOTAL_FRAMES = 500
export const FRAMES_PER_CLIP = 100
export const TOTAL_CLIPS = 5
export const FRAME_WIDTH = 1920
export const FRAME_HEIGHT = 1080
export const FRAME_ASPECT_RATIO = FRAME_WIDTH / FRAME_HEIGHT // 16:9 (1.7777777778)
const MAX_CONCURRENT_LOADS = 6

/**
 * Returns the public path for a given global frame index (0–499)
 * globalFrame 0–99    => /hero/clip-01/frame-0001.webp -> frame-0100.webp
 * globalFrame 100–199 => /hero/clip-02/frame-0001.webp -> frame-0100.webp
 * globalFrame 200–299 => /hero/clip-03/frame-0001.webp -> frame-0100.webp
 * globalFrame 300–399 => /hero/clip-04/frame-0001.webp -> frame-0100.webp
 * globalFrame 400–499 => /hero/clip-05/frame-0001.webp -> frame-0100.webp
 */
export function getFramePath(globalIndex: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(globalIndex)))
  const clipIndex = Math.floor(clamped / FRAMES_PER_CLIP) + 1
  const frameIndex = (clamped % FRAMES_PER_CLIP) + 1
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`
  const frameStr = `frame-${frameIndex.toString().padStart(4, '0')}.webp`
  return `/hero/${clipStr}/${frameStr}`
}

export interface HeroCanvasHandle {
  setFrameProgress: (progress: number) => void
  getCurrentFrame: () => number
}

interface HeroCanvasProps {
  className?: string
  onInitialFrameLoaded?: () => void
  onProgressUpdate?: (frameIndex: number, clipIndex: number) => void
}

const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(
  function HeroCanvas({ className = '', onInitialFrameLoaded, onProgressUpdate }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Image cache and load tracking refs (no re-renders on frame load)
    const imageCache = useRef<(HTMLImageElement | null)[]>(
      new Array(TOTAL_FRAMES).fill(null)
    )
    // 0: unrequested, 1: loading, 2: loaded, 3: error
    const loadStatus = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES))

    const activeLoads = useRef<number>(0)
    const currentFrameRef = useRef<number>(0)
    const lastRenderedFrameRef = useRef<number>(-1)
    const rafIdRef = useRef<number | null>(null)
    const isDestroyedRef = useRef<boolean>(false)

    /**
     * Draw source image to canvas:
     * - For Clip 1 (frames 0–99, cropped to 1920x848): anchored to the bottom of the hero canvas, eliminating bottom blank space.
     * - For Clips 2–5 (frames 100–499, 1920x1080): centered full-bleed cover presentation.
     */
    const drawImageToCanvas = useCallback((img: HTMLImageElement, frameIndex: number = 0) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const cw = canvas.width
      const ch = canvas.height
      if (cw === 0 || ch === 0) return

      const nw = img.naturalWidth || FRAME_WIDTH
      const nh = img.naturalHeight || 876

      ctx.fillStyle = '#FAF8F4'
      ctx.fillRect(0, 0, cw, ch)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      if (frameIndex < TOTAL_FRAMES || nh < 1000) {
        // Clips 1–5: Full width (zero left/right crop), anchored flush to the bottom edge
        const dw = cw
        const dh = Math.round(cw * (nh / nw))
        const dx = 0
        const dy = ch - dh

        ctx.drawImage(img, 0, 0, nw, nh, dx, dy, dw, dh)
      } else {
        // Clips 2–5: Centered full-bleed cover presentation
        const imgAspect = nw / nh
        const canvasAspect = cw / ch

        let sx = 0
        let sy = 0
        let sw = nw
        let sh = nh

        if (canvasAspect > imgAspect) {
          // Canvas is wider than source aspect ratio: crop symmetrical top/bottom
          sh = nw / canvasAspect
          sy = (nh - sh) / 2
          sx = 0
          sw = nw
        } else {
          // Canvas is taller than source aspect ratio: crop symmetrical left/right
          sw = nh * canvasAspect
          sx = (nw - sw) / 2
          sy = 0
          sh = nh
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
      }
    }, [])

    /**
     * Render the target frame (or the nearest loaded fallback frame)
     */
    const renderFrame = useCallback(
      (targetIndex: number) => {
        const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex))
        currentFrameRef.current = clamped

        // Find best available image: exact match preferred, otherwise nearest neighbor
        let imgToRender: HTMLImageElement | null = null
        let renderedIndex = -1

        if (loadStatus.current[clamped] === 2 && imageCache.current[clamped]) {
          imgToRender = imageCache.current[clamped]
          renderedIndex = clamped
        } else {
          // Search backwards first
          for (let i = clamped - 1; i >= 0; i--) {
            if (loadStatus.current[i] === 2 && imageCache.current[i]) {
              imgToRender = imageCache.current[i]
              renderedIndex = i
              break
            }
          }
          // If still not found, search forwards
          if (!imgToRender) {
            for (let i = clamped + 1; i < TOTAL_FRAMES; i++) {
              if (loadStatus.current[i] === 2 && imageCache.current[i]) {
                imgToRender = imageCache.current[i]
                renderedIndex = i
                break
              }
            }
          }
        }

        if (imgToRender && renderedIndex !== lastRenderedFrameRef.current) {
          drawImageToCanvas(imgToRender, renderedIndex)
          lastRenderedFrameRef.current = renderedIndex
        }

        const clipIndex = Math.floor(clamped / FRAMES_PER_CLIP) + 1
        onProgressUpdate?.(clamped, clipIndex)
      },
      [drawImageToCanvas, onProgressUpdate]
    )

    /**
     * Load a single frame with priority handling
     */
    const loadSingleFrame = useCallback(
      (index: number, onLoaded?: () => void): Promise<void> => {
        if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve()
        if (loadStatus.current[index] !== 0) {
          if (loadStatus.current[index] === 2 && onLoaded) {
            onLoaded()
          }
          return Promise.resolve()
        }

        loadStatus.current[index] = 1
        activeLoads.current++

        return new Promise<void>((resolve) => {
          const img = new Image()
          img.src = getFramePath(index)
          img.decoding = 'async'

          img.onload = () => {
            if (isDestroyedRef.current) return
            imageCache.current[index] = img
            loadStatus.current[index] = 2
            activeLoads.current = Math.max(0, activeLoads.current - 1)

            // If this loaded frame is the current frame or closest to current, draw it
            if (
              index === currentFrameRef.current ||
              lastRenderedFrameRef.current === -1
            ) {
              if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
              rafIdRef.current = requestAnimationFrame(() => {
                renderFrame(currentFrameRef.current)
              })
            }

            onLoaded?.()
            resolve()
          }

          img.onerror = () => {
            if (isDestroyedRef.current) return
            loadStatus.current[index] = 3
            activeLoads.current = Math.max(0, activeLoads.current - 1)
            resolve()
          }
        })
      },
      [renderFrame]
    )

    /**
     * Proximity-based dynamic preloader: loads frames in window around current frame
     */
    const prioritizeFramesAround = useCallback(
      (centerFrame: number) => {
        // Priority 1: Window [center - 5, center + 25]
        const start = Math.max(0, centerFrame - 5)
        const end = Math.min(TOTAL_FRAMES - 1, centerFrame + 25)

        for (let i = start; i <= end; i++) {
          if (loadStatus.current[i] === 0) {
            loadSingleFrame(i)
          }
        }
      },
      [loadSingleFrame]
    )

    /**
     * Set scroll progress (0..1) imperatively without React state re-renders
     */
    const setFrameProgress = useCallback(
      (progress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, progress))
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(clampedProgress * (TOTAL_FRAMES - 0.001))
        )

        prioritizeFramesAround(targetFrame)

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }

        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(targetFrame)
        })
      },
      [renderFrame, prioritizeFramesAround]
    )

    useImperativeHandle(
      ref,
      () => ({
        setFrameProgress,
        getCurrentFrame: () => currentFrameRef.current,
      }),
      [setFrameProgress]
    )

    /**
     * Responsive Full-Bleed Resize Handler:
     * Sizes canvas buffer precisely to the full hero container dimensions with DPR awareness.
     */
    const handleResize = useCallback(() => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const cssWidth = Math.round(rect.width)
      const cssHeight = Math.round(rect.height)

      // Cap DPR at 2 for optimal memory and 60fps rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const targetWidth = Math.round(cssWidth * dpr)
      const targetHeight = Math.round(cssHeight * dpr)

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth
        canvas.height = targetHeight
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        // Redraw current frame with centered cover calculation
        lastRenderedFrameRef.current = -1
        renderFrame(currentFrameRef.current)
      }
    }, [renderFrame])

    /**
     * Master Initialization & Progressive Background Streamer
     */
    useEffect(() => {
      isDestroyedRef.current = false
      handleResize()

      window.addEventListener('resize', handleResize, { passive: true })

      // ResizeObserver for precise container boundary tracking
      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          handleResize()
        })
        resizeObserver.observe(containerRef.current)
      }

      // 1. Critical Priority: Load frame 0 immediately
      loadSingleFrame(0, () => {
        onInitialFrameLoaded?.()
        renderFrame(0)
      })

      // 2. Initial Burst: Load frames 1 to 25 for instant smooth entry
      for (let i = 1; i <= 25; i++) {
        loadSingleFrame(i)
      }

      // 3. Progressive Background Loader: Stream remaining frames sequentially in chunks
      let isStreaming = true
      let streamIndex = 26

      const streamNextBatch = () => {
        if (!isStreaming || isDestroyedRef.current) return

        while (
          activeLoads.current < MAX_CONCURRENT_LOADS &&
          streamIndex < TOTAL_FRAMES
        ) {
          if (loadStatus.current[streamIndex] === 0) {
            loadSingleFrame(streamIndex)
          }
          streamIndex++
        }

        if (streamIndex < TOTAL_FRAMES) {
          setTimeout(streamNextBatch, 50)
        }
      }

      // Start background streaming after a brief idle delay
      const streamTimer = setTimeout(() => {
        streamNextBatch()
      }, 300)

      return () => {
        isDestroyedRef.current = true
        isStreaming = false
        clearTimeout(streamTimer)
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
        window.removeEventListener('resize', handleResize)
        if (resizeObserver) {
          resizeObserver.disconnect()
        }
      }
    }, [handleResize, loadSingleFrame, onInitialFrameLoaded, renderFrame])

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          style={{
            willChange: 'contents',
          }}
        />
      </div>
    )
  }
)

export default HeroCanvas
