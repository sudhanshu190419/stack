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
export const FRAME_ASPECT_RATIO = FRAME_WIDTH / FRAME_HEIGHT // 16:9

export const MOBILE_TOTAL_FRAMES = 200
export const MOBILE_FRAMES_PER_CLIP = 100
export const MOBILE_TOTAL_CLIPS = 2
export const MOBILE_FRAME_WIDTH = 1080
export const MOBILE_FRAME_HEIGHT = 1920
export const MOBILE_FRAME_ASPECT_RATIO = MOBILE_FRAME_WIDTH / MOBILE_FRAME_HEIGHT // 9:16

// Frame load / decode status flags
const STATUS_UNREQUESTED = 0
const STATUS_LOADING = 1
const STATUS_READY = 2
const STATUS_ERROR = 3

// Bounded concurrency & sliding cache window tuning
const MAX_CONCURRENT_DOWNLOADS = 4
const CACHE_WINDOW_BACKWARD = 30
const CACHE_WINDOW_FORWARD = 45

export type RenderableFrame = ImageBitmap | HTMLImageElement

/**
 * Returns the public path for a given global desktop frame index (0–499)
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
 * Returns the public path for a given mobile frame index (0–199)
 */
export function getMobileFramePath(globalIndex: number): string {
  const clamped = Math.max(0, Math.min(MOBILE_TOTAL_FRAMES - 1, Math.floor(globalIndex)))
  const clipIndex = Math.floor(clamped / MOBILE_FRAMES_PER_CLIP) + 1
  const frameIndex = (clamped % MOBILE_FRAMES_PER_CLIP) + 1
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`
  const frameStr = `frame-${frameIndex.toString().padStart(3, '0')}.webp`
  return `/hero_mobile/${clipStr}/${frameStr}`
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

    // Decoded bitmap caches (only active sliding window retained in uncompressed memory)
    const desktopFrameCache = useRef<(RenderableFrame | null)[]>(
      new Array(TOTAL_FRAMES).fill(null)
    )
    const desktopStatus = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES))

    const mobileFrameCache = useRef<(RenderableFrame | null)[]>(
      new Array(MOBILE_TOTAL_FRAMES).fill(null)
    )
    const mobileStatus = useRef<Uint8Array>(new Uint8Array(MOBILE_TOTAL_FRAMES))

    // Animation & rendering tracking refs
    const currentFrameRef = useRef<number>(0)
    const lastRenderedFrameRef = useRef<number>(-1)
    const lastRenderedMobileRef = useRef<boolean | null>(null)
    const isMobileRef = useRef<boolean>(false)
    const scrollDirectionRef = useRef<number>(1) // +1 forward, -1 backward
    const activeRafIdRef = useRef<number | null>(null)
    const isDestroyedRef = useRef<boolean>(false)

    // Direction-aware bounded priority scheduler refs
    const priorityQueueRef = useRef<number[]>([])
    const activeWorkersRef = useRef<number>(0)
    const scheduleRafRef = useRef<number | null>(null)

    /**
     * Helper: safely release an uncompressed frame bitmap from GPU memory
     */
    const releaseFrame = (frame: RenderableFrame | null) => {
      if (!frame) return
      if (typeof ImageBitmap !== 'undefined' && frame instanceof ImageBitmap) {
        try {
          frame.close()
        } catch {
          // ignore
        }
      }
    }

    /**
     * Evict distant decoded bitmaps outside the active sliding window.
     * Keeps lightweight status and browser HTTP cache intact while freeing hundreds of MBs of VRAM.
     */
    const evictDistantBitmaps = useCallback((centerFrame: number, forMobile: boolean) => {
      const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
      const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = forMobile ? mobileStatus.current : desktopStatus.current

      const minRetain = Math.max(0, centerFrame - CACHE_WINDOW_BACKWARD)
      const maxRetain = Math.min(total - 1, centerFrame + CACHE_WINDOW_FORWARD)

      for (let i = 0; i < total; i++) {
        if ((i < minRetain || i > maxRetain) && cache[i]) {
          releaseFrame(cache[i])
          cache[i] = null
          // Reset to unrequested so if the user scrubs back, it re-fetches instantly from browser HTTP cache
          status[i] = STATUS_UNREQUESTED
        }
      }
    }, [])

    /**
     * Off-thread image download and decode pipeline:
     * 1. Uses fetch + createImageBitmap for true off-thread GPU-ready decoding without main-thread blocking.
     * 2. Fallback to HTMLImageElement + await img.decode() if createImageBitmap is unsupported.
     */
    const fetchAndDecodeFrame = useCallback(
      async (url: string, forMobile: boolean): Promise<RenderableFrame> => {
        // Attempt modern off-thread createImageBitmap
        if (typeof createImageBitmap === 'function' && typeof fetch === 'function') {
          try {
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const blob = await res.blob()
            const bitmap = await createImageBitmap(blob)
            return bitmap
          } catch (fetchErr) {
            // If primary mobile webp fails, try png fallback
            if (forMobile && url.endsWith('.webp')) {
              try {
                const pngRes = await fetch(url.replace(/\.webp$/, '.png'))
                if (pngRes.ok) {
                  const pngBlob = await pngRes.blob()
                  return await createImageBitmap(pngBlob)
                }
              } catch {
                // fall through to Image fallback
              }
            }
          }
        }

        // Safe fallback: HTMLImageElement with async decoding
        return new Promise<RenderableFrame>((resolve, reject) => {
          const img = new Image()
          img.decoding = 'async'

          const tryFallbackPng = () => {
            if (forMobile && url.endsWith('.webp')) {
              const fallbackImg = new Image()
              fallbackImg.decoding = 'async'
              fallbackImg.onload = async () => {
                if ('decode' in fallbackImg) {
                  try {
                    await fallbackImg.decode()
                  } catch {
                    // Ignore decode failure
                  }
                }
                resolve(fallbackImg)
              }
              fallbackImg.onerror = (e) => reject(e)
              fallbackImg.src = url.replace(/\.webp$/, '.png')
            } else {
              reject(new Error(`Failed to load frame image: ${url}`))
            }
          }

          img.onload = async () => {
            if ('decode' in img) {
              try {
                await img.decode()
              } catch {
                // Ignore decode failure, image is loaded
              }
            }
            resolve(img)
          }

          img.onerror = () => tryFallbackPng()
          img.src = url
        })
      },
      []
    )

    /**
     * Draw decoded frame to canvas with preserved layout geometry:
     * - Mobile: 1080x1920 (9:16) contain logic, zero stretch/crop.
     * - Desktop: 1920x876 (or 872) full width, anchored flush bottom.
     */
    const drawFrameToCanvas = useCallback(
      (frame: RenderableFrame, frameIndex: number = 0, forMobile: boolean = false) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return

        const cw = canvas.width
        const ch = canvas.height
        if (cw === 0 || ch === 0) return

        const nw =
          'width' in frame
            ? frame.width
            : (frame as HTMLImageElement).naturalWidth || (forMobile ? MOBILE_FRAME_WIDTH : FRAME_WIDTH)
        const nh =
          'height' in frame
            ? frame.height
            : (frame as HTMLImageElement).naturalHeight || (forMobile ? MOBILE_FRAME_HEIGHT : 876)

        ctx.fillStyle = '#FAF8F4'
        ctx.fillRect(0, 0, cw, ch)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        if (forMobile) {
          // MOBILE CONTAIN LOGIC (Zero stretch, Zero crop, unified scale and anchor across clips)
          const refAspect = 926 / 1920
          const canvasAspect = cw / ch

          let dw: number
          let dh: number
          let dx: number
          let dy: number

          if (canvasAspect > refAspect) {
            dh = ch
            const scale = ch / 1920
            dw = Math.round(nw * scale)
            dx = Math.round((cw - dw) / 2)
            dy = 0
          } else {
            const scale = cw / 926
            dw = Math.round(nw * scale)
            dh = Math.round(nh * scale)
            dx = Math.round((cw - dw) / 2)
            dy = ch - dh
          }

          ctx.drawImage(frame, 0, 0, nw, nh, dx, dy, dw, dh)
          return
        }

        // DESKTOP LOGIC (Completely preserved)
        if (frameIndex < TOTAL_FRAMES || nh < 1000) {
          // Full width, anchored flush to the bottom edge
          const dw = cw
          const dh = Math.round(cw * (nh / nw))
          const dx = 0
          const dy = ch - dh

          ctx.drawImage(frame, 0, 0, nw, nh, dx, dy, dw, dh)
        } else {
          // Centered cover presentation fallback
          const imgAspect = nw / nh
          const canvasAspect = cw / ch

          let sx = 0
          let sy = 0
          let sw = nw
          let sh = nh

          if (canvasAspect > imgAspect) {
            sh = nw / canvasAspect
            sy = (nh - sh) / 2
          } else {
            sw = nh * canvasAspect
            sx = (nw - sw) / 2
          }

          ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, cw, ch)
        }
      },
      []
    )

    /**
     * Render the target frame (or closest available decoded fallback frame)
     */
    const renderFrame = useCallback(
      (targetIndex: number) => {
        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
        const status = forMobile ? mobileStatus.current : desktopStatus.current

        const clamped = Math.max(0, Math.min(total - 1, targetIndex))
        currentFrameRef.current = clamped

        // 1. Exact match preferred
        let frameToRender: RenderableFrame | null = null
        let renderedIndex = -1

        if (status[clamped] === STATUS_READY && cache[clamped]) {
          frameToRender = cache[clamped]
          renderedIndex = clamped
        } else {
          // 2. Intelligent direction-biased nearest neighbor search
          const direction = scrollDirectionRef.current
          if (direction >= 0) {
            // Forward scrub: look backward first to prevent jumping ahead into unrevealed sequence
            for (let i = clamped - 1; i >= Math.max(0, clamped - 30); i--) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
            if (!frameToRender) {
              for (let i = clamped + 1; i < Math.min(total, clamped + 15); i++) {
                if (status[i] === STATUS_READY && cache[i]) {
                  frameToRender = cache[i]
                  renderedIndex = i
                  break
                }
              }
            }
          } else {
            // Backward scrub: look forward first
            for (let i = clamped + 1; i < Math.min(total, clamped + 30); i++) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
            if (!frameToRender) {
              for (let i = clamped - 1; i >= Math.max(0, clamped - 15); i--) {
                if (status[i] === STATUS_READY && cache[i]) {
                  frameToRender = cache[i]
                  renderedIndex = i
                  break
                }
              }
            }
          }

          // Ultimate fallback to frame 0 or any available frame if cold
          if (!frameToRender) {
            for (let i = 0; i < total; i++) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
          }
        }

        // Draw only if frame actually changed
        if (
          frameToRender &&
          (renderedIndex !== lastRenderedFrameRef.current ||
            lastRenderedMobileRef.current !== forMobile)
        ) {
          drawFrameToCanvas(frameToRender, renderedIndex, forMobile)
          lastRenderedFrameRef.current = renderedIndex
          lastRenderedMobileRef.current = forMobile
        }

        const clipIndex = forMobile
          ? Math.floor(clamped / MOBILE_FRAMES_PER_CLIP) + 1
          : Math.floor(clamped / FRAMES_PER_CLIP) + 1
        onProgressUpdate?.(clamped, clipIndex)
      },
      [drawFrameToCanvas, onProgressUpdate]
    )

    /**
     * Schedule a single RAF render (cancels any pending frame to avoid backlog)
     */
    const scheduleRender = useCallback(() => {
      if (activeRafIdRef.current) {
        cancelAnimationFrame(activeRafIdRef.current)
      }
      activeRafIdRef.current = requestAnimationFrame(() => {
        activeRafIdRef.current = null
        renderFrame(currentFrameRef.current)
      })
    }, [renderFrame])

    /**
     * Direction-Aware Bounded Priority Scheduler:
     * Pulls jobs from priorityQueue with a strict concurrency limit (MAX_CONCURRENT_DOWNLOADS).
     */
    const drainSchedulerQueue = useCallback(() => {
      if (isDestroyedRef.current) return
      const forMobile = isMobileRef.current
      const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = forMobile ? mobileStatus.current : desktopStatus.current

      while (
        activeWorkersRef.current < MAX_CONCURRENT_DOWNLOADS &&
        priorityQueueRef.current.length > 0
      ) {
        const nextIdx = priorityQueueRef.current.shift()!

        // Skip if already in flight or already decoded
        if (status[nextIdx] !== STATUS_UNREQUESTED) continue

        status[nextIdx] = STATUS_LOADING
        activeWorkersRef.current++

        const frameUrl = forMobile ? getMobileFramePath(nextIdx) : getFramePath(nextIdx)

        fetchAndDecodeFrame(frameUrl, forMobile)
          .then((decodedFrame) => {
            activeWorkersRef.current--
            if (isDestroyedRef.current) {
              releaseFrame(decodedFrame)
              return
            }

            cache[nextIdx] = decodedFrame
            status[nextIdx] = STATUS_READY

            // Redraw Protection:
            // Only redraw if this loaded frame is the current target, OR is closer to current target than what's on screen,
            // AND within 2 frames of current position (avoids retroactive jumping back to stale frames!).
            const current = currentFrameRef.current
            const lastRendered = lastRenderedFrameRef.current
            const distFromCurrent = Math.abs(nextIdx - current)

            if (
              nextIdx === current ||
              (distFromCurrent <= 2 &&
                (lastRendered === -1 || distFromCurrent < Math.abs(lastRendered - current)))
            ) {
              scheduleRender()
            }

            // Evict distant frames to keep memory small and prevent Skia texture purging
            evictDistantBitmaps(current, forMobile)

            // Continue worker pump
            drainSchedulerQueue()
          })
          .catch(() => {
            activeWorkersRef.current--
            status[nextIdx] = STATUS_ERROR
            drainSchedulerQueue()
          })
      }
    }, [evictDistantBitmaps, fetchAndDecodeFrame, scheduleRender])

    /**
     * Coalesced Schedule Update:
     * Builds prioritized frame list based on scroll direction & position, then triggers scheduler.
     */
    const requestScheduleUpdate = useCallback(() => {
      if (scheduleRafRef.current) return

      scheduleRafRef.current = requestAnimationFrame(() => {
        scheduleRafRef.current = null
        if (isDestroyedRef.current) return

        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const status = forMobile ? mobileStatus.current : desktopStatus.current
        const current = currentFrameRef.current
        const direction = scrollDirectionRef.current

        const newQueue: number[] = []

        // 1. Current frame has highest priority if not ready
        if (status[current] === STATUS_UNREQUESTED) {
          newQueue.push(current)
        }

        if (direction >= 0) {
          // Forward scroll: prioritize forward window, then small backward buffer
          for (let i = current + 1; i <= Math.min(total - 1, current + 25); i++) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
          for (let i = current - 1; i >= Math.max(0, current - 6); i--) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
          // Secondary lookahead
          for (let i = current + 26; i <= Math.min(total - 1, current + 50); i++) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
        } else {
          // Backward scroll: prioritize backward window, then small forward buffer
          for (let i = current - 1; i >= Math.max(0, current - 25); i--) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
          for (let i = current + 1; i <= Math.min(total - 1, current + 6); i++) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
          // Secondary lookbehind
          for (let i = current - 26; i >= Math.max(0, current - 50); i--) {
            if (status[i] === STATUS_UNREQUESTED) newQueue.push(i)
          }
        }

        priorityQueueRef.current = newQueue
        drainSchedulerQueue()
      })
    }, [drainSchedulerQueue])

    /**
     * Imperative scroll progress interface (0..1)
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

        const prevFrame = currentFrameRef.current
        if (targetFrame !== prevFrame) {
          scrollDirectionRef.current = targetFrame >= prevFrame ? 1 : -1
          currentFrameRef.current = targetFrame
        }

        scheduleRender()
        requestScheduleUpdate()
      },
      [scheduleRender, requestScheduleUpdate]
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
     * Responsive Canvas Resize Handler:
     * Caps DPR to prevent allocating a massive 3840px / 2880px backing buffer for 1920px source assets.
     */
    const handleResize = useCallback(() => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const cssWidth = Math.round(rect.width)
      const cssHeight = Math.round(rect.height)

      const detectedMobile =
        typeof isMobileProp === 'boolean'
          ? isMobileProp
          : window.innerWidth < 768 ||
            (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)

      const modeChanged = isMobileRef.current !== detectedMobile
      isMobileRef.current = detectedMobile

      // Cap DPR and cap internal buffer width to source asset resolution (1920 desktop, 1080 mobile)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const maxSourceWidth = detectedMobile ? MOBILE_FRAME_WIDTH : FRAME_WIDTH
      const targetWidth = Math.min(Math.round(cssWidth * dpr), Math.max(cssWidth, maxSourceWidth))
      const targetHeight = Math.round(cssHeight * (targetWidth / cssWidth))

      if (canvas.width !== targetWidth || canvas.height !== targetHeight || modeChanged) {
        canvas.width = targetWidth
        canvas.height = targetHeight
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        lastRenderedFrameRef.current = -1
        renderFrame(currentFrameRef.current)
      }
    }, [isMobileProp, renderFrame])

    /**
     * Synchronize with isMobileProp changes
     */
    useEffect(() => {
      if (typeof isMobileProp === 'boolean' && isMobileProp !== isMobileRef.current) {
        isMobileRef.current = isMobileProp
        lastRenderedFrameRef.current = -1
        handleResize()
        requestScheduleUpdate()
      }
    }, [isMobileProp, handleResize, requestScheduleUpdate])

    /**
     * Master Initialization
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

      // 1. Critical Priority: Load & decode frame 0 immediately
      const frame0Url = initialMobile ? getMobileFramePath(0) : getFramePath(0)
      const cache = initialMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = initialMobile ? mobileStatus.current : desktopStatus.current

      status[0] = STATUS_LOADING
      fetchAndDecodeFrame(frame0Url, initialMobile)
        .then((f0) => {
          if (isDestroyedRef.current) {
            releaseFrame(f0)
            return
          }
          cache[0] = f0
          status[0] = STATUS_READY
          onInitialFrameLoaded?.()
          renderFrame(0)

          // 2. Controlled forward warmup: enqueue frames 1 to 12 (NO 30-request mount storm)
          const warmupBurst = Math.min(12, (initialMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES) - 1)
          const warmupQueue: number[] = []
          for (let i = 1; i <= warmupBurst; i++) {
            if (status[i] === STATUS_UNREQUESTED) warmupQueue.push(i)
          }
          priorityQueueRef.current = warmupQueue
          drainSchedulerQueue()
        })
        .catch(() => {
          status[0] = STATUS_ERROR
        })

      return () => {
        isDestroyedRef.current = true
        if (activeRafIdRef.current) {
          cancelAnimationFrame(activeRafIdRef.current)
        }
        if (scheduleRafRef.current) {
          cancelAnimationFrame(scheduleRafRef.current)
        }
        window.removeEventListener('resize', handleResize)
        if (resizeObserver) {
          resizeObserver.disconnect()
        }

        // Release all active GPU bitmaps
        desktopFrameCache.current.forEach((f) => releaseFrame(f))
        desktopFrameCache.current.fill(null)
        mobileFrameCache.current.forEach((f) => releaseFrame(f))
        mobileFrameCache.current.fill(null)
      }
    }, [fetchAndDecodeFrame, handleResize, onInitialFrameLoaded, renderFrame, drainSchedulerQueue])

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
