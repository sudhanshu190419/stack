"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const WORK_ITEMS: FocusRailItem[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A high-performance online store with real-time inventory management, AI-powered recommendations, and seamless checkout experience.",
    meta: "Web • Next.js",
    imageSrc: "/web.png",
    href: "#",
  },
  {
    id: 2,
    title: "Delivery App",
    description:
      "Cross-platform mobile app for food delivery with live tracking, smart routing, and instant push notifications.",
    meta: "Mobile • React Native",
    imageSrc: "/app.png",
    href: "#",
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description:
      "Comprehensive analytics dashboard with real-time data visualization, customizable widgets, and team collaboration features.",
    meta: "Web • React",
    imageSrc: "/web2.png",
    href: "#",
  },
  {
    id: 4,
    title: "AI Chat Assistant",
    description:
      "Intelligent customer support chatbot powered by LLMs, with context-aware responses and seamless handoff to human agents.",
    meta: "AI • OpenAI",
    imageSrc: "/ai.png",
    href: "#",
  },
  {
    id: 5,
    title: "Cloud Infrastructure",
    description:
      "Scalable cloud architecture with auto-scaling, load balancing, and comprehensive monitoring for a fintech startup.",
    meta: "Cloud • AWS",
    imageSrc: "/cloud.png",
    href: "#",
  },
  {
    id: 6,
    title: "Brand Redesign",
    description:
      "Complete UI/UX overhaul for a leading SaaS company, resulting in 40% improved user engagement and conversion rates.",
    meta: "Design • Figma",
    imageSrc: "/ux.png",
    href: "#",
  },
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress through the pinned section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigate to a specific scroll progress (used by nav buttons / keyboard)
  const scrollToProgress = useCallback((progress: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollable = container.offsetHeight - window.innerHeight;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const targetY = containerTop + progress * scrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  // Total scroll distance: one viewport height per transition
  const totalScrollHeight = (WORK_ITEMS.length - 1) * 100;

  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalScrollHeight}vh` }}>
      <div className="sticky top-0 h-screen z-40">
        <section className="relative h-full flex flex-col bg-neutral-950">
          {/* Section background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background: "#050816" }} />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: "80px 80px",
              }}
            />

            {/* Gradient orbs */}
            <div
              className="absolute -top-40 -left-40 w-[500px] h-[500px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[500px] h-[500px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 70% 70%, rgba(168,85,247,0.10), transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Section header - auto height, stays at top */}
            <div className="mx-auto max-w-7xl px-6 md:px-8 pt-8 mb-0 flex-shrink-0">
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-medium tracking-[0.2em] text-white/20 uppercase mb-4">
                  Our Work
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  Featured{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>
                <p className="mt-4 max-w-2xl text-neutral-400 text-lg">
                  A selection of websites, apps, and digital products we have designed and developed for our clients.
                </p>
              </div>
            </div>

            {/* Focus Rail - fills remaining vertical space */}
            <div className="flex-1 min-h-0">
              <FocusRail
                items={WORK_ITEMS}
                scrollProgress={scrollProgress}
                onNavigateTo={scrollToProgress}
                loop={true}
                className="h-full"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
