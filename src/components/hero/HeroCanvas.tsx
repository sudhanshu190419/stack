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

export const MOBILE_TOTAL_FRAMES = 100
export const MOBILE_FRAME_WIDTH = 1080
export const MOBILE_FRAME_HEIGHT = 1920
export const MOBILE_FRAME_ASPECT_RATIO = MOBILE_FRAME_WIDTH / MOBILE_FRAME_HEIGHT // 9:16 (0.5625)

/**
 * Returns the public path for a given global desktop frame index (0–499)
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

/**
 * Returns the public path for a given mobile frame index (0–99)
 * Maps 0..99 => /hero_mobile/clip-01/frame-001.png -> frame-100.png
 */
export function getMobileFramePath(index: number): string {
  const clamped = Math.max(0, Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(index)))
  const frameIndex = clamped + 1
  const frameStr = `frame-${frameIndex.toString().padStart(3, '0')}.png`
  return `/hero_mobile/clip-01/${frameStr}`
}

export interface HeroCanvasHandle {
  setFrameProgress: (progress: number) => void
  getCurrentFrame: () => number
}

interface HeroCanvasProps {
  className?: string
  isMobile?: boolean
  onInitialFrameLoaded?: () => void
  onProgressUpdate?: (frameIndex: number, clipIndex: number) => void
}

const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(
  function HeroCanvas(
    { className = '', isMobile: isMobileProp, onInitialFrameLoaded, onProgressUpdate },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Dedicated image caches and load tracking (no React re-renders)
    const desktopImageCache = useRef<(HTMLImageElement | null)[]>(
      new Array(TOTAL_FRAMES).fill(null)
    )
    const desktopLoadStatus = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES))

    const mobileImageCache = useRef<(HTMLImageElement | null)[]>(
      new Array(MOBILE_TOTAL_FRAMES).fill(null)
    )
    const mobileLoadStatus = useRef<Uint8Array>(new Uint8Array(MOBILE_TOTAL_FRAMES))

    const currentFrameRef = useRef<number>(0)
    const lastRenderedFrameRef = useRef<number>(-1)
    const lastRenderedMobileRef = useRef<boolean | null>(null)
    const isMobileRef = useRef<boolean>(false)
    const rafIdRef = useRef<number | null>(null)
    const isDestroyedRef = useRef<boolean>(false)

    /**
     * Draw source image to canvas:
     * - Mobile: 1080x1920 (9:16 aspect ratio).
     *   Strict requirement: Do not stretch or crop mobile frames.
     *   Anchored flush to the bottom edge with proportional width, or centered if wide.
     * - Desktop:
     *   - Clips 1–5: Full width, flush bottom.
     *   - Clips 2–5: Centered full-bleed cover.
     */
    const drawImageToCanvas = useCallback(
      (img: HTMLImageElement, frameIndex: number = 0, forMobile: boolean = false) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return

        const cw = canvas.width
        const ch = canvas.height
        if (cw === 0 || ch === 0) return

        const nw = img.naturalWidth || (forMobile ? MOBILE_FRAME_WIDTH : FRAME_WIDTH)
        const nh = img.naturalHeight || (forMobile ? MOBILE_FRAME_HEIGHT : 876)

        ctx.fillStyle = '#FAF8F4'
        ctx.fillRect(0, 0, cw, ch)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        if (forMobile) {
          // MOBILE CONTAIN LOGIC (Zero stretch, Zero crop)
          const imgAspect = nw / nh // 1080 / 1920 = 0.5625
          const canvasAspect = cw / ch

          let dw: number
          let dh: number
          let dx: number
          let dy: number

          if (canvasAspect > imgAspect) {
            // Canvas is wider than 9:16 (tablet/landscape phone):
            // Fill vertical height completely, center horizontally
            dh = ch
            dw = Math.round(ch * imgAspect)
            dx = Math.round((cw - dw) / 2)
            dy = 0
          } else {
            // Canvas is narrower/taller than 9:16 (standard smartphone portrait):
            // Fill full screen width, anchor flush to bottom so podium is grounded
            dw = cw
            dh = Math.round(cw / imgAspect)
            dx = 0
            dy = ch - dh
          }

          ctx.drawImage(img, 0, 0, nw, nh, dx, dy, dw, dh)
          return
        }

        // DESKTOP LOGIC (Completely preserved)
        if (frameIndex < TOTAL_FRAMES || nh < 1000) {
          // Full width (zero left/right crop), anchored flush to the bottom edge
          const dw = cw
          const dh = Math.round(cw * (nh / nw))
          const dx = 0
          const dy = ch - dh

          ctx.drawImage(img, 0, 0, nw, nh, dx, dy, dw, dh)
        } else {
          // Centered full-bleed cover presentation
          const imgAspect = nw / nh
          const canvasAspect = cw / ch

          let sx = 0
          let sy = 0
          let sw = nw
          let sh = nh

          if (canvasAspect > imgAspect) {
            sh = nw / canvasAspect
            sy = (nh - sh) / 2
            sx = 0
            sw = nw
          } else {
            sw = nh * canvasAspect
            sx = (nw - sw) / 2
            sy = 0
            sh = nh
          }

          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
        }
      },
      []
    )

    /**
     * Render the target frame (or the nearest loaded fallback frame)
     */
    const renderFrame = useCallback(
      (targetIndex: number) => {
        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const cache = forMobile ? mobileImageCache.current : desktopImageCache.current
        const status = forMobile ? mobileLoadStatus.current : desktopLoadStatus.current

        const clamped = Math.max(0, Math.min(total - 1, targetIndex))
        currentFrameRef.current = clamped

        // Find best available image: exact match preferred, otherwise nearest neighbor
        let imgToRender: HTMLImageElement | null = null
        let renderedIndex = -1

        if (status[clamped] === 2 && cache[clamped]) {
          imgToRender = cache[clamped]
          renderedIndex = clamped
        } else {
          // Search backwards first
          for (let i = clamped - 1; i >= 0; i--) {
            if (status[i] === 2 && cache[i]) {
              imgToRender = cache[i]
              renderedIndex = i
              break
            }
          }
          // If still not found, search forwards
          if (!imgToRender) {
            for (let i = clamped + 1; i < total; i++) {
              if (status[i] === 2 && cache[i]) {
                imgToRender = cache[i]
                renderedIndex = i
                break
              }
            }
          }
        }

        if (
          imgToRender &&
          (renderedIndex !== lastRenderedFrameRef.current ||
            lastRenderedMobileRef.current !== forMobile)
        ) {
          drawImageToCanvas(imgToRender, renderedIndex, forMobile)
          lastRenderedFrameRef.current = renderedIndex
          lastRenderedMobileRef.current = forMobile
        }

        const clipIndex = forMobile ? 1 : Math.floor(clamped / FRAMES_PER_CLIP) + 1
        onProgressUpdate?.(clamped, clipIndex)
      },
      [drawImageToCanvas, onProgressUpdate]
    )

    /**
     * Load a single frame with priority handling and callback
     */
    const loadSingleFrame = useCallback(
      (index: number, forMobile: boolean, onLoaded?: () => void): Promise<void> => {
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const cache = forMobile ? mobileImageCache.current : desktopImageCache.current
        const status = forMobile ? mobileLoadStatus.current : desktopLoadStatus.current

        if (index < 0 || index >= total) {
          onLoaded?.()
          return Promise.resolve()
        }

        if (status[index] === 2) {
          onLoaded?.()
          return Promise.resolve()
        }

        if (status[index] === 1) {
          // In-flight
          return Promise.resolve()
        }

        status[index] = 1

        return new Promise<void>((resolve) => {
          const img = new Image()
          img.src = forMobile ? getMobileFramePath(index) : getFramePath(index)
          img.decoding = 'async'

          const finish = (isSuccess: boolean) => {
            if (isDestroyedRef.current) {
              resolve()
              onLoaded?.()
              return
            }

            if (isSuccess) {
              cache[index] = img
              status[index] = 2
            } else {
              status[index] = 3
            }

            // If this loaded frame is the current frame, or closer to the current frame than the last rendered frame, redraw!
            if (isMobileRef.current === forMobile) {
              const current = currentFrameRef.current
              const last = lastRenderedFrameRef.current
              if (
                index === current ||
                last === -1 ||
                Math.abs(index - current) < Math.abs(last - current)
              ) {
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
                rafIdRef.current = requestAnimationFrame(() => {
                  renderFrame(currentFrameRef.current)
                })
              }
            }

            resolve()
            onLoaded?.()
          }

          img.onload = () => finish(true)
          img.onerror = () => finish(false)
        })
      },
      [renderFrame]
    )

    /**
     * Persistent Multi-Worker Pool:
     * Steadily streams ALL frames in order without starvation or deadlock.
     */
    const startStreaming = useCallback(
      (forMobile: boolean) => {
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const status = forMobile ? mobileLoadStatus.current : desktopLoadStatus.current

        let nextIndex = 0
        const CONCURRENCY = 4

        const pullNext = () => {
          if (isDestroyedRef.current) return
          if (isMobileRef.current !== forMobile) return

          // Skip any frames already loaded or in-flight
          while (nextIndex < total && status[nextIndex] !== 0) {
            nextIndex++
          }

          if (nextIndex >= total) return

          const idx = nextIndex++
          loadSingleFrame(idx, forMobile, () => {
            pullNext()
          })
        }

        for (let c = 0; c < CONCURRENCY; c++) {
          pullNext()
        }
      },
      [loadSingleFrame]
    )

    /**
     * Proximity-based dynamic preloader: immediately fetches window around current frame
     */
    const prioritizeFramesAround = useCallback(
      (centerFrame: number, forMobile: boolean) => {
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const status = forMobile ? mobileLoadStatus.current : desktopLoadStatus.current

        // High-priority window: [center - 5, center + 25]
        const start = Math.max(0, centerFrame - 5)
        const end = Math.min(total - 1, centerFrame + 25)

        for (let i = start; i <= end; i++) {
          if (status[i] === 0) {
            loadSingleFrame(i, forMobile)
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
        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const clampedProgress = Math.max(0, Math.min(1, progress))
        const targetFrame = Math.min(
          total - 1,
          Math.floor(clampedProgress * (total - 0.001))
        )

        prioritizeFramesAround(targetFrame, forMobile)

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

      const detectedMobile =
        typeof isMobileProp === 'boolean'
          ? isMobileProp
          : window.innerWidth < 768 ||
            (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)

      const modeChanged = isMobileRef.current !== detectedMobile
      isMobileRef.current = detectedMobile

      if (canvas.width !== targetWidth || canvas.height !== targetHeight || modeChanged) {
        canvas.width = targetWidth
        canvas.height = targetHeight
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        if (modeChanged) {
          // Preload initial frames for the newly active mode
          loadSingleFrame(0, detectedMobile, () => {
            renderFrame(0)
          })
          const burst = detectedMobile ? 25 : 25
          for (let i = 1; i <= burst; i++) {
            loadSingleFrame(i, detectedMobile)
          }
          startStreaming(detectedMobile)
        }

        lastRenderedFrameRef.current = -1
        renderFrame(currentFrameRef.current)
      }
    }, [isMobileProp, loadSingleFrame, renderFrame, startStreaming])

    /**
     * Synchronize with isMobileProp changes from parent
     */
    useEffect(() => {
      if (typeof isMobileProp === 'boolean' && isMobileProp !== isMobileRef.current) {
        isMobileRef.current = isMobileProp
        loadSingleFrame(0, isMobileProp, () => {
          renderFrame(0)
        })
        const burst = isMobileProp ? 25 : 25
        for (let i = 1; i <= burst; i++) {
          loadSingleFrame(i, isMobileProp)
        }
        startStreaming(isMobileProp)
        lastRenderedFrameRef.current = -1
        renderFrame(currentFrameRef.current)
      }
    }, [isMobileProp, loadSingleFrame, renderFrame, startStreaming])

    /**
     * Master Initialization & Multi-Worker Streamer
     */
    useEffect(() => {
      isDestroyedRef.current = false
      const initialMobile =
        typeof isMobileProp === 'boolean'
          ? isMobileProp
          : typeof window !== 'undefined' &&
            (window.innerWidth < 768 ||
              (window.innerWidth < 1024 && window.innerHeight > window.innerWidth))

      isMobileRef.current = initialMobile
      handleResize()

      window.addEventListener('resize', handleResize, { passive: true })

      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          handleResize()
        })
        resizeObserver.observe(containerRef.current)
      }

      // 1. Critical Priority: Load frame 0 immediately
      loadSingleFrame(0, initialMobile, () => {
        onInitialFrameLoaded?.()
        renderFrame(0)
      })

      // 2. Initial Burst: Load frames 1 to 25 for instant smooth entry
      const burst = initialMobile ? 25 : 25
      for (let i = 1; i <= burst; i++) {
        loadSingleFrame(i, initialMobile)
      }

      // 3. Worker Streamer: Asynchronously stream all remaining frames
      startStreaming(initialMobile)

      return () => {
        isDestroyedRef.current = true
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
        window.removeEventListener('resize', handleResize)
        if (resizeObserver) {
          resizeObserver.disconnect()
        }
      }
    }, [handleResize, isMobileProp, loadSingleFrame, onInitialFrameLoaded, renderFrame, startStreaming])

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
