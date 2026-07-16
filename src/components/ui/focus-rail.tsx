"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  /** When provided, drives card animation directly from scroll progress (0–1) */
  scrollProgress?: number;
  /** Callback to navigate to a specific scrollProgress (used by buttons/keyboard) */
  onNavigateTo?: (progress: number) => void;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z) – used only in non-scroll mode
 */
const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * TAP_SPRING kept for the info panel text animation (same as before)
 */
const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 450,
  damping: 18,
  mass: 1,
};

/**
 * Compute visual transforms for a card at a given float offset from center.
 */
function cardTransforms(dist: number) {
  const absDist = Math.abs(dist);
  return {
    x: dist * 400,
    z: -absDist * 180,
    scale: Math.max(0.6, 1 - absDist * 0.15),
    rotateY: dist * -20,
    opacity: Math.max(0.05, 1 - absDist * 0.45),
    blur: absDist * 6,
    brightness: Math.max(0.3, 1 - absDist * 0.35),
  };
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  scrollProgress,
  onNavigateTo,
}: FocusRailProps) {
  const count = items.length;

  // --- Determine active index ---
  const isScrollDriven = scrollProgress !== undefined;
  // We always keep an internal active state for non-scroll mode / as a fallback
  const [internalActive, setInternalActive] = React.useState(initialIndex);

  // Effective active index
  const activeIndex = isScrollDriven
    ? Math.round(scrollProgress * (count - 1))
    : wrap(0, count, internalActive);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (isScrollDriven && onNavigateTo) {
      const step = 1 / (count - 1);
      const next = Math.max(0, (scrollProgress ?? 0) - step);
      onNavigateTo(next);
    } else if (!isScrollDriven) {
      if (!loop && internalActive === 0) return;
      setInternalActive((p) => p - 1);
    }
  }, [isScrollDriven, onNavigateTo, scrollProgress, count, loop, internalActive]);

  const handleNext = React.useCallback(() => {
    if (isScrollDriven && onNavigateTo) {
      const step = 1 / (count - 1);
      const next = Math.min(1, (scrollProgress ?? 0) + step);
      onNavigateTo(next);
    } else if (!isScrollDriven) {
      if (!loop && internalActive === count - 1) return;
      setInternalActive((p) => p + 1);
    }
  }, [isScrollDriven, onNavigateTo, scrollProgress, count, loop, internalActive]);

  // --- MOUSE WHEEL / TRACKPAD (only in non-scroll mode) ---
  const lastWheelTime = React.useRef<number>(0);
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      if (isScrollDriven) return; // let native scroll work
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev, isScrollDriven]
  );

  // --- Autoplay (only in non-scroll mode) ---
  const [isHovering, setIsHovering] = React.useState(false);
  React.useEffect(() => {
    if (isScrollDriven || !autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [isScrollDriven, autoPlay, isHovering, handleNext, interval]);

  // --- Keyboard navigation ---
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- Info / background key for AnimatePresence ---
  const infoKey = activeItem?.id ?? "none";

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none",
        !isScrollDriven && "h-[620px]",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${infoKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeItem.imageSrc}
              alt=""
              fill
              className="object-cover blur-3xl saturate-200"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER – drag disabled in scroll-driven mode */}
        <motion.div
          className="relative mx-auto flex w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          style={{ height: "420px" }}
          drag={isScrollDriven ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={
            isScrollDriven
              ? undefined
              : (_e, { offset, velocity }) => {
                  const swipePower = (offset: number, velocity: number) =>
                    Math.abs(offset) * velocity;
                  const swipe = swipePower(offset.x, velocity.x);
                  const confidence = 10000;
                  if (swipe < -confidence) handleNext();
                  else if (swipe > confidence) handlePrev();
                }
          }
        >
          {isScrollDriven
            ? /* --- SCROLL-DRIVEN RENDERING --- */
              items.map((item, index) => {
                const dist = index - scrollProgress! * (count - 1);
                if (Math.abs(dist) > 2.5) return null;
                const tf = cardTransforms(dist);
                const isCenter = Math.abs(dist) < 0.5;
                return (
                  <motion.div
                    key={item.id}
                    className={cn(
                      "absolute w-[340px] md:w-[420px] aspect-[16/10] rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl transition-shadow duration-300 overflow-hidden",
                      isCenter ? "z-20 shadow-white/10" : "z-10"
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{
                      x: tf.x,
                      z: tf.z,
                      scale: tf.scale,
                      rotateY: tf.rotateY,
                      opacity: tf.opacity,
                      filter: `blur(${tf.blur}px) brightness(${tf.brightness})`,
                    }}
                    transition={{ duration: 0.05 }}
                    onClick={() => {
                      // Clicking a non-center card jumps to it
                      if (onNavigateTo) {
                        const targetProgress = index / (count - 1);
                        onNavigateTo(targetProgress);
                      }
                    }}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover pointer-events-none"
                      unoptimized
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
                  </motion.div>
                );
              })
            : /* --- ORIGINAL CAROUSEL RENDERING --- */
              (() => {
                const visibleIndices = [-2, -1, 0, 1, 2];
                return visibleIndices.map((offset) => {
                  const absIndex = internalActive + offset;
                  const index = wrap(0, count, absIndex);
                  const item = items[index];
                  if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                  const isCenter = offset === 0;
                  const dist = Math.abs(offset);
                  const xOffset = offset * 400;
                  const zOffset = -dist * 180;
                  const scale = isCenter ? 1 : 0.85;
                  const rotateY = offset * -20;
                  const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
                  const blur = isCenter ? 0 : dist * 6;
                  const brightness = isCenter ? 1 : 0.5;

                  return (
                    <motion.div
                      key={absIndex}
                      className={cn(
                        "absolute w-[340px] md:w-[420px] aspect-[16/10] rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl transition-shadow duration-300 overflow-hidden",
                        isCenter ? "z-20 shadow-white/10" : "z-10"
                      )}
                      style={{ transformStyle: "preserve-3d" }}
                      initial={false}
                      animate={{
                        x: xOffset,
                        z: zOffset,
                        scale,
                        rotateY,
                        opacity,
                        filter: `blur(${blur}px) brightness(${brightness})`,
                      }}
                      transition={{
                        scale: TAP_SPRING,
                        x: BASE_SPRING,
                        z: BASE_SPRING,
                        rotateY: BASE_SPRING,
                        opacity: BASE_SPRING,
                        filter: BASE_SPRING,
                      }}
                      onClick={() => {
                        if (offset !== 0)
                          setInternalActive((p) => p + offset);
                      }}
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover pointer-events-none"
                        unoptimized
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
                    </motion.div>
                  );
                });
              })()}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-4 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row pointer-events-auto">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-0 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${infoKey}`}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-md text-neutral-400">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center text-xs font-mono text-neutral-500">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <Link
                href={activeItem.href}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              >
                View Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
