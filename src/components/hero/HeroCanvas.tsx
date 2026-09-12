'use client'

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react'

export const TOTAL_FRAMES = 240
export const FRAMES_PER_CLIP = 60
export const TOTAL_CLIPS = 4
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

// Bounded concurrency tuning: 8 workers on desktop for high-throughput HTTP/2 streaming; 4 on mobile
const DESKTOP_MAX_CONCURRENT = 8
const MOBILE_MAX_CONCURRENT = 4

// Sliding cache window tuning
const DESKTOP_CACHE_WINDOW_BACKWARD = 50
const DESKTOP_CACHE_WINDOW_FORWARD = 70

const MOBILE_CACHE_WINDOW_BACKWARD = 20
const MOBILE_CACHE_WINDOW_FORWARD = 35

// Initial warmup frames
const DESKTOP_INITIAL_WARMUP_FRAMES = 45
const MOBILE_INITIAL_WARMUP_FRAMES = 35

export type RenderableFrame = ImageBitmap | HTMLImageElement

/**
 * Returns the public path for a given global desktop frame index (0–239)
 */
export function getFramePath(globalIndex: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(globalIndex)))
  const clipIndex = Math.floor(clamped / FRAMES_PER_CLIP) + 1
  const frameIndex = (clamped % FRAMES_PER_CLIP) + 1
  const clipStr = `clip-${clipIndex.toString().padStart(2, '0')}`
  const frameStr = `frame-${frameIndex.toString().padStart(4, '0')}.webp`
  return `/hero/${clipStr}/${frameStr}?v=2`
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
  setFrameProgress: (progress: number, isInitialSync?: boolean) => void
  getCurrentFrame: () => number
  getLastRenderedFrame: () => number
  isFinalFrameRendered: () => boolean
}

interface HeroCanvasProps {
  className?: string
  isMobile?: boolean
  onInitialFrameLoaded?: () => void
  onProgressUpdate?: (frameIndex: number, clipIndex: number) => void
  onFinalFrameRendered?: () => void
}

const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(
  function HeroCanvas(
    {
      className = '',
      isMobile: isMobileProp,
      onInitialFrameLoaded,
      onProgressUpdate,
      onFinalFrameRendered,
    },
    ref
  ) {
    const onFinalFrameRenderedRef = useRef(onFinalFrameRendered)
    useEffect(() => {
      onFinalFrameRenderedRef.current = onFinalFrameRendered
    }, [onFinalFrameRendered])

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

    // Persistent direction-aware bounded priority scheduler refs
    const priorityQueueRef = useRef<number[]>([])
    const queuedSetRef = useRef<Set<number>>(new Set())
    const activeWorkersRef = useRef<number>(0)
    const scheduleRafRef = useRef<number | null>(null)

    // Progressive idle preloader & scroll interaction tracking
    const isUserScrollingRef = useRef<boolean>(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const idlePreloadHandleRef = useRef<number | null>(null)
    const triggerIdlePreloadRef = useRef<() => void>(() => {})

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
     * Crucial: NEVER evict lastRenderedFrame or frames in the active advancing runway
     * between lastRendered and centerFrame!
     */
    const evictDistantBitmaps = useCallback((centerFrame: number, forMobile: boolean) => {
      const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
      const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = forMobile ? mobileStatus.current : desktopStatus.current

      const lastRendered =
        lastRenderedFrameRef.current === -1 ? centerFrame : lastRenderedFrameRef.current

      const minBound = Math.min(lastRendered, centerFrame)
      const maxBound = Math.max(lastRendered, centerFrame)

      const windowBackward = forMobile ? MOBILE_CACHE_WINDOW_BACKWARD : DESKTOP_CACHE_WINDOW_BACKWARD
      const windowForward = forMobile ? MOBILE_CACHE_WINDOW_FORWARD : DESKTOP_CACHE_WINDOW_FORWARD

      const minRetain = Math.max(0, minBound - windowBackward)
      const maxRetain = Math.min(total - 1, maxBound + windowForward)

      for (let i = 0; i < total; i++) {
        // NEVER evict the currently displayed frame on canvas
        if (i === lastRenderedFrameRef.current) continue

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
        if (typeof createImageBitmap === 'function' && typeof fetch === 'function') {
          try {
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const blob = await res.blob()
            const bitmap = await createImageBitmap(blob)
            return bitmap
          } catch {
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
     * Resilient Monotonic Directional Frame Renderer:
     * 1. Exact match preferred.
     * 2. Forward scroll: Clamp to the highest ready frame in (lastRendered, targetFrame].
     *    Never jump backward to an older frame while scrolling forward!
     * 3. Backward scroll: Clamp to the lowest ready frame in [targetFrame, lastRendered).
     *    Never jump forward to a newer frame while scrolling backward!
     */
    const renderFrame = useCallback(
      (targetIndex: number) => {
        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
        const status = forMobile ? mobileStatus.current : desktopStatus.current

        const clamped = Math.max(0, Math.min(total - 1, targetIndex))
        currentFrameRef.current = clamped

        const lastRendered = lastRenderedFrameRef.current
        const direction = scrollDirectionRef.current // +1 forward, -1 backward

        let frameToRender: RenderableFrame | null = null
        let renderedIndex = -1

        // 1. Exact target frame is ready!
        if (status[clamped] === STATUS_READY && cache[clamped]) {
          frameToRender = cache[clamped]
          renderedIndex = clamped
        } else if (lastRendered === -1) {
          // Initial cold start: search nearest ready frame around clamped target
          for (let offset = 0; offset < total; offset++) {
            const down = clamped - offset
            if (down >= 0 && status[down] === STATUS_READY && cache[down]) {
              frameToRender = cache[down]
              renderedIndex = down
              break
            }
            const up = clamped + offset
            if (up < total && status[up] === STATUS_READY && cache[up]) {
              frameToRender = cache[up]
              renderedIndex = up
              break
            }
          }
        } else if (direction >= 0) {
          // FORWARD SCROLLING:
          // Advance monotonically: find highest ready frame <= clamped and > lastRendered
          if (clamped > lastRendered) {
            for (let i = clamped; i > lastRendered; i--) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
            // If genuinely no newer frame is ready yet, keep lastRendered temporarily (NEVER backward jump)
            if (!frameToRender && cache[lastRendered] && status[lastRendered] === STATUS_READY) {
              frameToRender = cache[lastRendered]
              renderedIndex = lastRendered
            }
          } else {
            // Target is <= lastRendered (small forward twitch or equality)
            if (cache[clamped] && status[clamped] === STATUS_READY) {
              frameToRender = cache[clamped]
              renderedIndex = clamped
            } else if (cache[lastRendered] && status[lastRendered] === STATUS_READY) {
              frameToRender = cache[lastRendered]
              renderedIndex = lastRendered
            }
          }
        } else {
          // BACKWARD SCROLLING:
          // Retreat monotonically: find lowest ready frame >= clamped and < lastRendered
          if (clamped < lastRendered) {
            for (let i = clamped; i < lastRendered; i++) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
            // If genuinely no older frame is ready yet, keep lastRendered temporarily (NEVER forward jump)
            if (!frameToRender && cache[lastRendered] && status[lastRendered] === STATUS_READY) {
              frameToRender = cache[lastRendered]
              renderedIndex = lastRendered
            }
          } else {
            // Target is >= lastRendered during backward scroll (e.g. after a route remount, jump, or desync)
            // Resilient search: find highest ready frame <= clamped
            for (let i = clamped; i >= 0; i--) {
              if (status[i] === STATUS_READY && cache[i]) {
                frameToRender = cache[i]
                renderedIndex = i
                break
              }
            }
            // If genuinely no frame <= clamped is ready yet, preserve current valid lastRendered
            if (!frameToRender && cache[lastRendered] && status[lastRendered] === STATUS_READY) {
              frameToRender = cache[lastRendered]
              renderedIndex = lastRendered
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

          // Desktop boundary synchronization: frame 239 has been drawn to the Canvas
          if (!forMobile && renderedIndex === TOTAL_FRAMES - 1) {
            onFinalFrameRenderedRef.current?.()
          }
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
     * Pulls jobs from persistent priority queue with a strict concurrency limit (MAX_CONCURRENT_DOWNLOADS).
     */
    const drainSchedulerQueue = useCallback(() => {
      if (isDestroyedRef.current) return
      const forMobile = isMobileRef.current
      const maxWorkers = forMobile ? MOBILE_MAX_CONCURRENT : DESKTOP_MAX_CONCURRENT
      const cache = forMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = forMobile ? mobileStatus.current : desktopStatus.current

      while (
        activeWorkersRef.current < maxWorkers &&
        priorityQueueRef.current.length > 0
      ) {
        const nextIdx = priorityQueueRef.current.shift()!
        queuedSetRef.current.delete(nextIdx)

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

            // Micro-Advancement on Frame Arrival:
            // When frame nextIdx arrives, if it lies between lastRendered and current target,
            // render it immediately! This completely eliminates the 1+ second freeze on slower WAN networks.
            const current = currentFrameRef.current
            const lastRendered = lastRenderedFrameRef.current
            const dir = scrollDirectionRef.current

            // Prevent late Clip 4 redraws once desktop Hero has already rendered the final frame (239)
            if (!forMobile && lastRendered === TOTAL_FRAMES - 1 && current === TOTAL_FRAMES - 1) {
              evictDistantBitmaps(current, forMobile)
              drainSchedulerQueue()
              if (priorityQueueRef.current.length === 0 && !isUserScrollingRef.current) {
                triggerIdlePreloadRef.current()
              }
              return
            }

            const isDirectionalProgress =
              (dir >= 0 && nextIdx > lastRendered && nextIdx <= current) ||
              (dir < 0 && nextIdx < lastRendered && nextIdx >= current) ||
              nextIdx === current ||
              lastRendered === -1

            if (isDirectionalProgress) {
              scheduleRender()
            }

            // Evict distant frames to keep memory clean
            evictDistantBitmaps(current, forMobile)

            // Continue worker pump
            drainSchedulerQueue()

            // When queue empties during idle, schedule next idle preload slice
            if (priorityQueueRef.current.length === 0 && !isUserScrollingRef.current) {
              triggerIdlePreloadRef.current()
            }
          })
          .catch(() => {
            activeWorkersRef.current--
            status[nextIdx] = STATUS_ERROR
            drainSchedulerQueue()
          })
      }
    }, [evictDistantBitmaps, fetchAndDecodeFrame, scheduleRender])

    /**
     * Progressive Idle Background Preloader:
     * Continues prefetching and decoding frames ahead in the background using requestIdleCallback
     * (or setTimeout fallback) while the user is reading the Hero copy or pauses scrolling.
     * - Desktop: streams batches of 4 frames ahead across 8 workers.
     * - Mobile: conservative mode streams small batches of 2 frames across 4 workers to preserve bandwidth/battery.
     * Yields immediately if user starts scrolling (isUserScrollingRef === true).
     */
    const triggerIdlePreload = useCallback(() => {
      if (isDestroyedRef.current) return
      if (isUserScrollingRef.current) return

      const forMobile = isMobileRef.current
      const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
      const status = forMobile ? mobileStatus.current : desktopStatus.current
      const maxWorkers = forMobile ? MOBILE_MAX_CONCURRENT : DESKTOP_MAX_CONCURRENT

      // Check if there are any unrequested frames remaining
      let hasUnrequested = false
      for (let i = 1; i < total; i++) {
        if (status[i] === STATUS_UNREQUESTED && !queuedSetRef.current.has(i)) {
          hasUnrequested = true
          break
        }
      }
      if (!hasUnrequested) return

      // Don't flood queue if priority queue already has enough active work:
      // Mobile: max 2 queued items; Desktop: max 8 queued items
      const maxQueueBuffer = forMobile ? 2 : maxWorkers
      if (priorityQueueRef.current.length >= maxQueueBuffer) return

      const scheduleIdle =
        typeof window !== 'undefined' && 'requestIdleCallback' in window
          ? (cb: () => void) =>
              (window as unknown as { requestIdleCallback: (fn: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(cb, { timeout: forMobile ? 1500 : 1000 })
          : (cb: () => void) => window.setTimeout(cb, forMobile ? 100 : 60)

      if (idlePreloadHandleRef.current !== null) return

      idlePreloadHandleRef.current = scheduleIdle(() => {
        idlePreloadHandleRef.current = null
        if (isDestroyedRef.current || isUserScrollingRef.current) return

        // Conservative batch size: 2 frames on mobile; 4 on desktop
        const BATCH_SIZE = forMobile ? 2 : 4
        let count = 0
        const current = currentFrameRef.current
        const runwayAhead = forMobile ? 40 : 50
        const runwayBehind = forMobile ? 15 : 20

        // Prioritized candidate list according to runtime position:
        // 1. Critical/current frame
        // 2. Immediate forward runway (ahead of current position)
        // 3. Nearby reverse runway (behind current position)
        // 4. Distant future frames
        // 5. Distant past frames
        const candidateIndices: number[] = []

        // 1. Current frame
        if (current > 0 && current < total) {
          candidateIndices.push(current)
        }

        // 2. Immediate forward runway
        const forwardEnd = Math.min(total - 1, current + runwayAhead)
        for (let i = current + 1; i <= forwardEnd; i++) {
          candidateIndices.push(i)
        }

        // 3. Nearby reverse runway
        const backwardEnd = Math.max(1, current - runwayBehind)
        for (let i = current - 1; i >= backwardEnd; i--) {
          candidateIndices.push(i)
        }

        // 4. Distant future frames
        for (let i = forwardEnd + 1; i < total; i++) {
          candidateIndices.push(i)
        }

        // 5. Distant past frames
        for (let i = backwardEnd - 1; i >= 1; i--) {
          candidateIndices.push(i)
        }

        for (let i = 0; i < candidateIndices.length && count < BATCH_SIZE; i++) {
          const idx = candidateIndices[i]
          if (status[idx] === STATUS_UNREQUESTED && !queuedSetRef.current.has(idx)) {
            priorityQueueRef.current.push(idx)
            queuedSetRef.current.add(idx)
            count++
          }
        }

        if (count > 0) {
          drainSchedulerQueue()
        }

        // Schedule next idle batch if unrequested frames still remain
        let stillHasUnrequested = false
        for (let i = 1; i < total; i++) {
          if (status[i] === STATUS_UNREQUESTED && !queuedSetRef.current.has(i)) {
            stillHasUnrequested = true
            break
          }
        }
        if (stillHasUnrequested && !isUserScrollingRef.current) {
          triggerIdlePreload()
        }
      })
    }, [drainSchedulerQueue])

    triggerIdlePreloadRef.current = triggerIdlePreload

    /**
     * Persistent Priority Queue Maintenance:
     * Does NOT wipe the queue. Dynamically re-ranks existing and new frames according to current target.
     * Preserves the advancing runway between lastRendered and current so the canvas NEVER freezes.
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
        const lastRendered =
          lastRenderedFrameRef.current === -1 ? current : lastRenderedFrameRef.current
        const dir = scrollDirectionRef.current

        // Dynamic scoring function: higher score = earlier download
        const scoreFrame = (idx: number): number => {
          if (idx === current && lastRendered === current) return 10000

          const forwardLookahead = forMobile ? 25 : 50
          const extendedLookahead = forMobile ? 50 : 80
          const safetyBuffer = forMobile ? 6 : 15

          if (dir >= 0) {
            // FORWARD SCROLL:
            // 1. CRITICAL: Advancing runway between lastRendered and current target (inclusive of current)
            // Prioritize lastRendered + 1, lastRendered + 2, ... before distant lookahead!
            if (idx > lastRendered && idx <= current) {
              return 10000 - (idx - lastRendered) * 5
            }
            // 2. Immediate forward lookahead beyond current:
            if (idx > current && idx <= current + forwardLookahead) {
              return 9000 - (idx - current) * 30
            }
            // 3. Extended lookahead beyond current:
            if (idx > current + forwardLookahead && idx <= current + extendedLookahead) {
              return 7000 - (idx - current) * 20
            }
            // 4. Small backward safety buffer around current:
            if (idx < current && idx >= current - safetyBuffer) {
              return 5000 + (idx - current) * 50
            }
            return -1 // Too far, prune
          } else {
            // BACKWARD SCROLL:
            // 1. CRITICAL: Retreating runway from lastRendered down towards current target (inclusive of current)
            // Prioritize lastRendered - 1, lastRendered - 2, ... before distant lookbehind!
            if (idx < lastRendered && idx >= current) {
              return 10000 + (idx - lastRendered) * 5
            }
            // 2. Immediate backward lookbehind beyond current:
            if (idx < current && idx >= current - forwardLookahead) {
              return 9000 + (idx - current) * 30
            }
            // 3. Extended lookbehind:
            if (idx < current - forwardLookahead && idx >= current - extendedLookahead) {
              return 7000 + (idx - current) * 20
            }
            // 4. Small forward safety buffer:
            if (idx > current && idx <= current + safetyBuffer) {
              return 5000 - (idx - current) * 50
            }
            return -1 // Too far, prune
          }
        }

        // 1. Retain existing unrequested items in queue that still have positive priority
        const survivingQueue = priorityQueueRef.current.filter((idx) => {
          const score = scoreFrame(idx)
          return score > 0 && status[idx] === STATUS_UNREQUESTED
        })

        const activeSet = new Set<number>(survivingQueue)

        // 2. Add candidates spanning the bridge between lastRendered and current, plus lookahead
        const minBound = Math.min(lastRendered, current)
        const maxBound = Math.max(lastRendered, current)
        const forwardScan = forMobile ? 35 : 70
        const backwardScan = forMobile ? 6 : 20
        const scanStart = Math.max(0, minBound - (dir >= 0 ? backwardScan : forwardScan))
        const scanEnd = Math.min(total - 1, maxBound + (dir >= 0 ? forwardScan : backwardScan))

        for (let i = scanStart; i <= scanEnd; i++) {
          if (status[i] === STATUS_UNREQUESTED && !activeSet.has(i)) {
            const score = scoreFrame(i)
            if (score > 0) {
              survivingQueue.push(i)
              activeSet.add(i)
            }
          }
        }

        // 3. Sort descending by priority score
        survivingQueue.sort((a, b) => scoreFrame(b) - scoreFrame(a))

        priorityQueueRef.current = survivingQueue
        queuedSetRef.current = activeSet

        drainSchedulerQueue()
      })
    }, [drainSchedulerQueue])

    /**
     * Imperative scroll progress interface (0..1)
     */
    const setFrameProgress = useCallback(
      (progress: number, isInitialSync?: boolean) => {
        const forMobile = isMobileRef.current
        const total = forMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
        const clampedProgress = Math.max(0, Math.min(1, progress))
        const targetFrame = Math.min(
          total - 1,
          Math.floor(clampedProgress * (total - 0.001))
        )

        const prevFrame = currentFrameRef.current
        if (isInitialSync) {
          currentFrameRef.current = targetFrame
          scrollDirectionRef.current = targetFrame > total / 2 ? -1 : 1
        } else if (targetFrame !== prevFrame) {
          scrollDirectionRef.current = targetFrame >= prevFrame ? 1 : -1
          currentFrameRef.current = targetFrame
        }

        // Flag active user scrolling to yield idle preloader immediately (only during user interaction)
        if (!isInitialSync) {
          isUserScrollingRef.current = true
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
          scrollTimeoutRef.current = setTimeout(() => {
            isUserScrollingRef.current = false
            triggerIdlePreload()
          }, forMobile ? 400 : 350)
        }

        scheduleRender()
        requestScheduleUpdate()
      },
      [scheduleRender, requestScheduleUpdate, triggerIdlePreload]
    )

    useImperativeHandle(
      ref,
      () => ({
        setFrameProgress,
        getCurrentFrame: () => currentFrameRef.current,
        getLastRenderedFrame: () => lastRenderedFrameRef.current,
        isFinalFrameRendered: () => {
          const forMobile = isMobileRef.current
          if (forMobile) return true
          return lastRenderedFrameRef.current === TOTAL_FRAMES - 1
        },
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

      // 1. Determine restored scroll progress and anchor frame on mount
      const total = initialMobile ? MOBILE_TOTAL_FRAMES : TOTAL_FRAMES
      let initialProgress = 0
      if (typeof window !== 'undefined') {
        const heroST = (window as unknown as { ScrollTrigger?: { getById: (id: string) => { progress: number } | null } }).ScrollTrigger?.getById('hero-scroll-trigger')
        if (heroST && typeof heroST.progress === 'number') {
          initialProgress = heroST.progress
        } else {
          const travel = initialMobile ? 2500 : 3500
          initialProgress = Math.max(0, Math.min(1, window.scrollY / travel))
        }
      }

      const initialAnchor = Math.min(
        total - 1,
        Math.max(0, Math.floor(initialProgress * (total - 0.001)))
      )

      currentFrameRef.current = initialAnchor
      scrollDirectionRef.current = initialAnchor > total / 2 ? -1 : 1

      // 2. Critical Priority: Load & decode initial anchor frame immediately
      const anchorUrl = initialMobile ? getMobileFramePath(initialAnchor) : getFramePath(initialAnchor)
      const cache = initialMobile ? mobileFrameCache.current : desktopFrameCache.current
      const status = initialMobile ? mobileStatus.current : desktopStatus.current

      status[initialAnchor] = STATUS_LOADING
      fetchAndDecodeFrame(anchorUrl, initialMobile)
        .then((anchorBitmap) => {
          if (isDestroyedRef.current) {
            releaseFrame(anchorBitmap)
            return
          }
          cache[initialAnchor] = anchorBitmap
          status[initialAnchor] = STATUS_READY
          onInitialFrameLoaded?.()
          renderFrame(initialAnchor)

          // 3. Initial Warmup Runway:
          // Desktop: frames 1 to 45 (DESKTOP_INITIAL_WARMUP_FRAMES)
          // Mobile: frames 1 to 35 (MOBILE_INITIAL_WARMUP_FRAMES)
          const warmupBurst = Math.min(
            initialMobile ? MOBILE_INITIAL_WARMUP_FRAMES : DESKTOP_INITIAL_WARMUP_FRAMES,
            total - 1
          )
          const warmupQueue: number[] = []

          if (initialAnchor > total / 2) {
            // Mounted near end (e.g. Back navigation): warmup backward towards beginning
            for (let i = initialAnchor - 1; i >= Math.max(0, initialAnchor - warmupBurst); i--) {
              if (status[i] === STATUS_UNREQUESTED) {
                warmupQueue.push(i)
                queuedSetRef.current.add(i)
              }
            }
          } else {
            // Mounted near top (e.g. fresh visit): warmup forward
            for (let i = initialAnchor + 1; i <= Math.min(total - 1, initialAnchor + warmupBurst); i++) {
              if (status[i] === STATUS_UNREQUESTED) {
                warmupQueue.push(i)
                queuedSetRef.current.add(i)
              }
            }
          }

          priorityQueueRef.current = warmupQueue
          drainSchedulerQueue()

          // 4. Start progressive idle background preloader for both desktop and mobile
          triggerIdlePreload()
        })
        .catch(() => {
          status[initialAnchor] = STATUS_ERROR
        })

      return () => {
        isDestroyedRef.current = true
        if (activeRafIdRef.current) {
          cancelAnimationFrame(activeRafIdRef.current)
        }
        if (scheduleRafRef.current) {
          cancelAnimationFrame(scheduleRafRef.current)
        }
        if (idlePreloadHandleRef.current !== null) {
          if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
              idlePreloadHandleRef.current
            )
          } else {
            clearTimeout(idlePreloadHandleRef.current)
          }
          idlePreloadHandleRef.current = null
        }
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
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
    }, [fetchAndDecodeFrame, handleResize, onInitialFrameLoaded, renderFrame, drainSchedulerQueue, triggerIdlePreload])

    return (
      <div
        ref={containerRef}
        suppressHydrationWarning
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      >
        <canvas
          ref={canvasRef}
          suppressHydrationWarning
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
