import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  Smartphone,
  Layers,
  Database,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  Lock,
  LayoutGrid,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'MOBL Case Study — E-commerce & Tech Accessories Platform | StackStich',
  description:
    'A case study on how StackStich designed and engineered MOBL, a modern e-commerce platform for premium mobile accessories, audio hardware, and tactile tech featuring Supabase atomic checkout and GSAP motion.',
  alternates: {
    canonical: 'https://www.stackstich.online/work/mobl',
  },
  openGraph: {
    title: 'MOBL Case Study — E-commerce & Tech Accessories Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered MOBL, a high-performance e-commerce platform for premium mobile accessories and tech essentials.',
    url: 'https://www.stackstich.online/work/mobl',
    siteName: 'StackStich',
    type: 'article',
    images: [
      {
        url: '/work/project3.png',
        width: 1200,
        height: 630,
        alt: 'MOBL Case Study by StackStich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOBL Case Study — E-commerce & Tech Accessories Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered MOBL, a high-performance e-commerce platform for premium mobile accessories.',
    images: ['/work/project3.png'],
  },
}

// Structured Data Schemas
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.stackstich.online',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Our Work',
      item: 'https://www.stackstich.online/work',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'MOBL Case Study',
      item: 'https://www.stackstich.online/work/mobl',
    },
  ],
}

const TECH_GROUPS = [
  {
    category: 'Frontend & Storefront',
    icon: ShoppingBag,
    description: 'Next.js 16 App Router application with React 19 and Tailwind CSS v4.',
    stack: [
      { name: 'Next.js 16', role: 'App Router & Incremental Static Regeneration' },
      { name: 'React 19 & TypeScript', role: 'Component System & Type Contracts' },
      { name: 'Tailwind CSS v4', role: 'Mineral Sand & Terracotta Design Tokens' },
      { name: 'Lucide React', role: 'Clean Minimal Outline Iconography' },
    ],
  },
  {
    category: 'Motion & Interactivity',
    icon: Sparkles,
    description: 'Scroll-driven hardware sequences and tactile micro-animations.',
    stack: [
      { name: 'GSAP 3.15', role: 'Timeline Animation & ScrollTrigger' },
      { name: 'Canvas Frame Sequences', role: 'Interactive 360° Hardware Reveals' },
      { name: 'React Compiler', role: 'Optimized Zero-Overhead Re-renders' },
      { name: 'Reduced Motion Engine', role: 'Accessible Fallbacks for Motion Queries' },
    ],
  },
  {
    category: 'Backend & Database',
    icon: Database,
    description: 'Supabase PostgreSQL database with Row-Level Security and atomic stock decrement.',
    stack: [
      { name: 'Supabase PostgreSQL', role: 'Relational Catalog & Order Database' },
      { name: 'Row-Level Security (RLS)', role: 'Secure Multi-Role Access Control' },
      { name: 'PL/pgSQL Functions', role: 'Atomic Stock Decrement & Concurrency Guard' },
      { name: 'Supabase SSR & Auth', role: 'Server-Side Sessions & Admin Authentication' },
    ],
  },
  {
    category: 'Operations & Management',
    icon: SlidersHorizontal,
    description: 'Complete admin workspace for catalog, orders, and customer tracking.',
    stack: [
      { name: 'Admin Dashboard', role: 'Product, Category & Order Fulfillment Suite' },
      { name: 'Supabase Storage', role: 'Product Imagery & Multi-Angle Assets' },
      { name: 'Server Actions', role: 'Secure Server-Side Mutation Pipelines' },
      { name: 'Vercel Platform', role: 'Global Edge Network Deployment' },
    ],
  },
]

const SHOPPING_JOURNEY = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Interactive scroll-driven hero sequence introduces signature audio and hardware.',
  },
  {
    step: '02',
    title: 'Explore',
    desc: 'Faceted category navigation across Audio, Charging, Mobile, and Daily Accessories.',
  },
  {
    step: '03',
    title: 'Choose',
    desc: 'Rich product detail pages with multi-angle galleries, live stock badges, and specs.',
  },
  {
    step: '04',
    title: 'Cart',
    desc: 'Persistent client-side cart drawer with real-time subtotal calculations.',
  },
  {
    step: '05',
    title: 'Checkout',
    desc: 'Server-action checkout with atomic database stock deduction and order confirmation.',
  },
]


export default function MoblCaseStudyPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <main className="w-full bg-[#FAF7F2] text-neutral-900 pt-[72px] lg:pt-[80px]">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="relative w-full overflow-hidden pt-6 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Top Navigation Row: Back Link & Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to Our Work</span>
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-neutral-900 tracking-wider uppercase">
                  LIVE PROJECT
                </span>
              </div>
            </div>

            {/* Editorial Title & Category */}
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#CA6B43] uppercase tracking-wider">
                  03 • CASE STUDY
                </span>
                <div className="w-10 sm:w-14 h-[1.5px] bg-[#CA6B43]" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                  E-commerce & Tech Accessories Platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08] mb-5 sm:mb-6">
                A focused digital storefront for premium mobile essentials and tactile tech.
              </h1>

              <p className="text-neutral-600 text-sm sm:text-lg lg:text-[19px] leading-relaxed max-w-3xl font-normal mb-8 sm:mb-10">
                StackStich designed and engineered MOBL as a modern, high-conversion e-commerce platform—combining scroll-driven hardware storytelling, instant category filtering, Supabase atomic inventory management, and a streamlined mobile shopping flow.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
                <a
                  href="https://mobile-accessories-xi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Link
                  href="/work"
                  className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>Back to Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Visual (project3.png) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-lg">
              <Image
                src="/work/project3.png"
                alt="MOBL E-commerce Platform Storefront Interface by StackStich"
                fill
                priority
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#CA6B43] animate-pulse" />
                  <span>Next.js 16 Storefront + Supabase Atomic Backend</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. PROJECT OVERVIEW & METADATA ─── */}
        <section className="w-full py-14 sm:py-20 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Eyebrow + Narrative */}
              <div className="lg:col-span-5">
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                  PROJECT OVERVIEW
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-tight mb-4">
                  Tactile hardware.<br />
                  Frictionless commerce.
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  MOBL is a direct-to-consumer e-commerce brand curating high-grade daily mobile accessories, hybrid noise-cancelling audio, GaN fast charging, and tactile mobile devices.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mt-3">
                  StackStich engineered the complete digital commerce solution from the ground up—combining editorial typography, interactive frame-based scroll animations, and a secure Supabase backend with race-condition-free stock deduction.
                </p>
              </div>

              {/* Right Column: Editorial Metadata Bento Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Client</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">MOBL</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Mobile Accessories</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Industry</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Consumer Tech</div>
                  <div className="text-xs text-neutral-500 mt-0.5">DTC Hardware & Audio</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Platforms</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Web (Mobile-First)</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Responsive Storefront</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Services</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Full-Stack Commerce</div>
                  <div className="text-xs text-neutral-500 mt-0.5">UI/UX · Web · Backend</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Status</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Live Project</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">Production Storefront</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Core Tech</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Next.js 16 · Supabase</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Tailwind v4 · GSAP · RLS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. THE OBJECTIVE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                THE OBJECTIVE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                When clarity drives commerce.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The mobile accessories market is saturated with generic, cluttered product grids. MOBL needed a distinct digital identity that elevated essential everyday hardware into a premium, tactile experience.
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Tactile Product Storytelling
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Showcase engineering details—from 11mm graphene drivers to 65W GaN thermal dissipation—through interactive scroll animations rather than dense spec tables.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Zero-Friction Discovery
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Organize an evolving multi-category hardware catalog into intuitive category tracks with live filtering, instant search, and instant cart drawer triggers.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Bulletproof Inventory Engine
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Protect against overselling during high-demand product drops through PostgreSQL atomic decrement functions and server-verified checkout actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. THE SHOPPING EXPERIENCE JOURNEY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                THE SHOPPING EXPERIENCE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                From interactive discovery to atomic checkout.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                A seamless 5-stage customer journey crafted to convert casual visitors into confident buyers with minimal cognitive load.
              </p>
            </div>

            {/* 5-Step Visual Journey */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
              {SHOPPING_JOURNEY.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-[22px] bg-[#FAF7F2] border border-black/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#CA6B43]">
                        STAGE {item.step}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#CA6B43]" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-xs leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. WHAT WE BUILT (CORE CAPABILITIES) ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                WHAT WE BUILT
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A complete commerce and catalog ecosystem.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                StackStich engineered both the customer-facing storefront and the backend operational tools required to manage inventory, fulfill orders, and scale the product catalog.
              </p>
            </div>

            {/* 6 Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* 1 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Scroll Hardware Storytelling
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Interactive GSAP frame-by-frame image sequences for flagship products like the Aura Earbuds and Mobl Air X1 drone, revealing internal architecture on scroll.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Faceted Product Catalog
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Instant category filtering, search, and sorting with ISR caching ensuring sub-second catalog navigation across Audio, Charging, Mobile, and Accessories.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Product Detail Experience
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Multi-angle image galleries, technical spec badges, live stock availability indicators, customer review ratings, and quick-add actions.
                </p>
              </div>

              {/* 4 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Atomic Stock Deduction
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  PostgreSQL PL/pgSQL stored procedures enforcing atomic stock decrements inside database transactions to eliminate race conditions during high-volume sales.
                </p>
              </div>

              {/* 5 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Full Admin Management Suite
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Protected administrative workspace with Supabase Auth for product creation, category management, order fulfillment tracking, and customer history.
                </p>
              </div>

              {/* 6 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center mb-5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Mobile-First Thumb Experience
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Engineered specifically for smartphone shopping with bottom-sheet cart drawers, sticky checkout bars, and touch-optimized gallery swiping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. WEBSITE SCREENSHOTS & STOREFRONT SHOWCASE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                STOREFRONT INTERFACE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Designed for seamless discovery.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                High-resolution interface captures from the live MOBL digital platform, showcasing the interactive hardware hero, faceted product catalog, category discovery tracks, and mobile-optimized checkout.
              </p>
            </div>

            {/* Gallery Layout */}
            <div className="space-y-6 sm:space-y-8">
              {/* 1. Large Hero Storefront (hero_web.png) */}
              <div className="relative aspect-[1883/955] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-sm group">
                <Image
                  src="/case_study/project3/hero_web.png"
                  alt="MOBL Storefront Primary Desktop Interface"
                  fill
                  quality={95}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                  Primary Desktop Storefront
                </div>
              </div>

              {/* 2. Two-Image Split: Shop Catalog & Category Journey */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Shop Catalog (shop.png) */}
                <div className="relative aspect-[1882/961] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project3/shop.png"
                    alt="MOBL Shop Catalog and Faceted Filter Interface"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Faceted Shop & Filter Interface
                  </div>
                </div>

                {/* Category Journey (category.png) */}
                <div className="relative aspect-[1890/966] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project3/category.png"
                    alt="MOBL Category Discovery and Hardware Navigation"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Category Discovery & Hardware Tracks
                  </div>
                </div>
              </div>

              {/* 3. Interactive Hardware Feature Showcase (drone.png) */}
              <div className="relative aspect-[1880/956] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                <Image
                  src="/case_study/project3/drone.png"
                  alt="MOBL Interactive Hardware Showcase and 4K Aerial Drone Feature"
                  fill
                  quality={92}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                  Interactive Hardware Showcase — Mobl Air X1
                </div>
              </div>

              {/* 4. Mobile Experience Showcase (hero_mob.png) */}
              <div className="rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 bg-[#FAF7F2] border border-black/[0.08] shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
                <div className="max-w-xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] shadow-2xs mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CA6B43]" />
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-900 tracking-wider uppercase">
                      Mobile Experience
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mb-3">
                    Touch-Optimized Mobile Storefront
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                    The complete MOBL shopping journey adapted effortlessly for smartphone viewports—featuring smooth thumb-zone navigation, bottom-sheet cart drawers, and instant server-action checkout without horizontal overflow.
                  </p>
                </div>

                <div className="relative w-[240px] sm:w-[280px] lg:w-[300px] aspect-[424/848] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.12)] border border-black/[0.1] bg-[#17181D] shrink-0">
                  <Image
                    src="/case_study/project3/hero_mob.png"
                    alt="MOBL Mobile Storefront and Touch-Optimized Interface"
                    fill
                    quality={95}
                    className="object-cover object-top"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. DESIGN SYSTEM & VISUAL IDENTITY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                DESIGN SYSTEM
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Mineral tones tailored for modern hardware.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The visual identity pairs warm sand backgrounds with deep charcoal text and vibrant terracotta accents, creating an understated aesthetic that lets the product photography shine.
              </p>
            </div>

            {/* Color Palette Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-5 rounded-[22px] bg-[#CA6B43] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-200">Brand Primary</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Terracotta Accent</div>
                  <div className="text-xs font-mono text-orange-100">#CA6B43 • #EA580C</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#17181D] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Typography</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Charcoal Slate</div>
                  <div className="text-xs font-mono text-slate-300">#17181D • #27272A</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#ECE8E1] text-neutral-900 border border-black/[0.08] shadow-2xs flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">Surface Base</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Mineral Sand</div>
                  <div className="text-xs font-mono text-neutral-600">#F8F7F2 • #ECE8E1</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#D97706] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-200">Status & Badges</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Amber Signature</div>
                  <div className="text-xs font-mono text-amber-100">#D97706 • #F59E0B</div>
                </div>
              </div>
            </div>

            {/* Design Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Restrained Hierarchy</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Generous negative space and subtle container borders keep the focus on physical product form factors without visual noise.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">High-Contrast Badging</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Distinct pill badges for BESTSELLER, NEW, SIGNATURE, and EDITION clearly signal product status across category grids.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Tactile Button Feedback</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Interactive state transitions, fluid drawer animations, and haptic-style cart feedback create an engaging shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. TECHNICAL ARCHITECTURE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                TECHNICAL ARCHITECTURE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Modern full-stack commerce architecture.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Engineered with Next.js 16 App Router on the frontend and Supabase PostgreSQL on the backend, combining fast static edge caching with secure transactional mutations.
              </p>
            </div>

            {/* 4 Technology Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {TECH_GROUPS.map((group) => {
                const IconComponent = group.icon
                return (
                  <div
                    key={group.category}
                    className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#CA6B43] flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                            {group.category}
                          </h3>
                          <p className="text-xs text-neutral-500 font-normal">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        {group.stack.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/[0.04]"
                          >
                            <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">
                              {item.name}
                            </span>
                            <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                              {item.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── 9. OBSERVABLE OUTCOMES ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-2.5">
                THE RESULT
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A streamlined, high-trust storefront.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                By combining interactive hardware storytelling, frictionless discovery, and a rock-solid transactional backend, MOBL delivers a modern e-commerce experience tailored for tech essentials.
              </p>
            </div>

            {/* 4 Observable Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#CA6B43] mb-4">01 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Accelerated Discovery
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Faceted filtering and structured category tracks allow shoppers to reach their desired accessory in fewer than three clicks.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#CA6B43] mb-4">02 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Zero-Friction Checkout
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Dynamic cart drawer and atomic server-action checkout eliminate page reloads and protect stock accuracy.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#CA6B43] mb-4">03 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Tactile Brand Presence
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Scroll-driven 360° sequences elevate product perception and differentiate MOBL from commodity accessory retailers.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#CA6B43] mb-4">04 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Scalable Operations
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Integrated Supabase admin suite enables real-time product publishing, category editing, and order fulfillment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. NEXT PROJECT & GLOBAL CTA ─── */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Next Project Teaser (04 - TripleOne) */}
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-24">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CA6B43] uppercase tracking-wider mb-2">
                  <span>NEXT PROJECT</span>
                  <span>•</span>
                  <span>04</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  TripleOne
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  Travel & Stay Booking
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
                  A modern accommodation platform designed to help travelers discover, compare, and book comfortable stays with ease.
                </p>
              </div>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-xs transition-colors self-start md:self-auto shrink-0"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* StackStich Main Consultation CTA */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#CA6B43] mb-3">
                LET’S WORK TOGETHER
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.08] mb-6">
                Have an ambitious product in mind?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-normal">
                Let&apos;s build something people remember. Tell us what you&apos;re creating and we&apos;ll help turn it into a high-impact digital experience.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://wa.me/918860979255?text=Hi%20StackStich,%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>View Our Work</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </main>
    </>
  )
}
