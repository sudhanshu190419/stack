import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  Compass,
  Building2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Layers,
  Database,
  SlidersHorizontal,
  CheckCircle2,
  Home as HomeIcon,
  Waves,
  Mountain,
  Building,
  TentTree,
  Umbrella,
  Sprout,
  Heart,
  Search,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'TripleOne Case Study — Travel & Stay Booking Platform | StackStich',
  description:
    'A case study on how StackStich designed and engineered TripleOne, a modern travel accommodation platform for discovering, comparing, and booking verified stays with real-time date filtering and host management.',
  alternates: {
    canonical: 'https://www.stackstich.online/work/tripleone',
  },
  openGraph: {
    title: 'TripleOne Case Study — Travel & Stay Booking Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered TripleOne, a modern travel accommodation platform for discovering and booking verified stays.',
    url: 'https://www.stackstich.online/work/tripleone',
    siteName: 'StackStich',
    type: 'article',
    images: [
      {
        url: '/work/project4.png',
        width: 1200,
        height: 630,
        alt: 'TripleOne Case Study by StackStich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripleOne Case Study — Travel & Stay Booking Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered TripleOne for travel accommodation discovery and booking.',
    images: ['/work/project4.png'],
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
      name: 'TripleOne Case Study',
      item: 'https://www.stackstich.online/work/tripleone',
    },
  ],
}

const TECH_GROUPS = [
  {
    category: 'Frontend & App Router',
    icon: Building2,
    description: 'Next.js 16 App Router application with React 19 and Tailwind CSS v4.',
    stack: [
      { name: 'Next.js 16', role: 'App Router & Server Component Architecture' },
      { name: 'React 19 & TypeScript', role: 'Type-Safe Property & Booking State' },
      { name: 'Tailwind CSS v4', role: 'Warm Linen & Terracotta Hospitality Tokens' },
      { name: 'Lucide React', role: 'Clean Architectural Iconography' },
    ],
  },
  {
    category: 'Interactive UI & Touch Motion',
    icon: Sparkles,
    description: 'Touch-optimized carousels, date range pickers, and micro-animations.',
    stack: [
      { name: 'Swiper 12', role: 'Touch & Gesture Property Image Carousels' },
      { name: 'React Day Picker & Date-fns', role: 'Dynamic Calendar Range Engine' },
      { name: 'Lottie React', role: 'Interactive Hospitality Micro-Animations' },
      { name: 'CVA & Tailwind Merge', role: 'Dynamic UI Variant Management' },
    ],
  },
  {
    category: 'Backend & Data Core',
    icon: Database,
    description: 'Firebase Firestore database powering properties, taxonomies, and host profiles.',
    stack: [
      { name: 'Firebase Firestore', role: 'Real-Time Property & Review Store' },
      { name: 'Taxonomy Engine', role: 'Location & Stay-Type Classification' },
      { name: 'Availability Calendar Guard', role: 'Blocked Date & Reservation Logic' },
      { name: 'Firebase Auth', role: 'Secure Host & Admin Authentication' },
    ],
  },
  {
    category: 'Host & Admin Workspace',
    icon: SlidersHorizontal,
    description: 'Administrative suite for listing management, availability, and settings.',
    stack: [
      { name: 'Property Manager', role: 'Full CRUD Property & Pricing Suite' },
      { name: 'Availability Blocker', role: 'Date Lockout & Booking Management' },
      { name: 'Taxonomy & Carousel Admin', role: 'Dynamic Category & Hero Curation' },
      { name: 'Image Pipeline (Sharp)', role: 'Optimized Image Delivery & Storage' },
    ],
  },
]

const BOOKING_JOURNEY = [
  {
    step: '01',
    title: 'Search',
    desc: 'Sticky multi-field engine filtering by destination, check-in/out dates, and guest count.',
  },
  {
    step: '02',
    title: 'Filter',
    desc: 'Category bar across Beachfront, Mountain Chalets, City Lofts, Cabins, and Luxury Villas.',
  },
  {
    step: '03',
    title: 'Explore',
    desc: 'Touch-enabled property cards with Swiper photo galleries, transparent pricing, and ratings.',
  },
  {
    step: '04',
    title: 'Inspect',
    desc: 'Rich detail pages featuring photo grids, verified amenity badges, and host check-in rules.',
  },
  {
    step: '05',
    title: 'Reserve',
    desc: 'Real-time booking card calculating total nights, service fees, and instant reservation confirmation.',
  },
]

const STAY_CATEGORIES = [
  {
    name: 'Villas & Estates',
    tagline: 'Private Pools & Luxury Living',
    desc: 'Spacious multi-bedroom sanctuaries with private swimming pools, gardens, and premium amenities.',
    icon: Building2,
    gradient: 'from-[#F0D8C8] to-[#DCC0A8]',
  },
  {
    name: 'Mountain Chalets',
    tagline: 'Alpine Escapes & Hot Tubs',
    desc: 'Secluded timber lodges nestled in high-altitude corridors with panoramic valley views.',
    icon: Mountain,
    gradient: 'from-[#D4E2C8] to-[#BACED0]',
  },
  {
    name: 'Beachfront Bungalows',
    tagline: 'Oceanfront Access & Sunsets',
    desc: 'Direct coast access retreats with open-air terraces and coastal breeze design.',
    icon: Waves,
    gradient: 'from-[#C8E8E0] to-[#A8D4CB]',
  },
  {
    name: 'Cabins & Forest Stays',
    tagline: 'Nature Immersion & Fireplaces',
    desc: 'Rustic cedar cabins surrounded by ancient forest canopies with modern comforts.',
    icon: TentTree,
    gradient: 'from-[#EAD8C0] to-[#D4BFA0]',
  },
]

export default function TripleOneCaseStudyPage() {
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
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                <span className="text-[10px] sm:text-xs font-bold text-neutral-800 tracking-wider uppercase">
                  PROJECT PREVIEW
                </span>
              </div>
            </div>

            {/* Editorial Title & Category */}
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#9E6941] uppercase tracking-wider">
                  04 • CASE STUDY
                </span>
                <div className="w-10 sm:w-14 h-[1.5px] bg-[#9E6941]" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                  Travel & Stay Booking Platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08] mb-5 sm:mb-6">
                A modern accommodation platform designed for effortless stay discovery and booking.
              </h1>

              <p className="text-neutral-600 text-sm sm:text-lg lg:text-[19px] leading-relaxed max-w-3xl font-normal mb-8 sm:mb-10">
                StackStich designed and engineered TripleOne as a high-trust travel accommodation platform—combining sticky multi-field search, real-time date availability, verified amenity taxonomies, and an intuitive property management suite.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
                <Link
                  href="/work"
                  className="cursor-pointer inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  <span>Explore More Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#platform-architecture"
                  className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>View Architecture</span>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </a>
              </div>
            </div>

            {/* Hero Visual (project4.png) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-lg">
              <Image
                src="/work/project4.png"
                alt="TripleOne Travel and Stay Booking Platform Interface by StackStich"
                fill
                priority
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941] animate-pulse" />
                  <span>Next.js 16 Stay Discovery + Firebase Cloud Infrastructure</span>
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
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                  PROJECT OVERVIEW
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-tight mb-4">
                  Curated stays.<br />
                  Frictionless reservations.
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  TripleOne is a modern stay booking platform created to connect discerning travelers with vetted holiday homes, secluded villas, mountain cabins, and boutique city lofts.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mt-3">
                  StackStich engineered the entire digital experience—from the intuitive sticky search bar and date-range calendar engine to an administrative control center for hosts to manage room availability and property taxonomies.
                </p>
              </div>

              {/* Right Column: Editorial Metadata Bento Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Client</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">TripleOne</div>
                  <div className="text-xs text-neutral-500 mt-0.5">StayFinder Network</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Industry</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Travel & Hospitality</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Vacation Stays & Rentals</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Platforms</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Web (Mobile-First)</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Responsive Platform</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Services</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Full-Stack Platform</div>
                  <div className="text-xs text-neutral-500 mt-0.5">UI/UX · Search · Admin</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Status</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-400" />
                    <span>Project Preview</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">Full Codebase Verified</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Core Tech</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Next.js 16 · Firebase</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Swiper · Date-fns · Tailwind</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. THE OBJECTIVE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                THE OBJECTIVE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                When finding a stay feels effortless.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Travelers frequently experience frustration from misleading property photos, hidden booking fees, and cumbersome calendar selectors. TripleOne was conceived to restore trust and simplicity to holiday booking.
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Verified Stay Integrity
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Every property is structured with transparent amenities, real check-in policies, verified guest reviews, and high-fidelity multi-image galleries.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Dynamic Multi-Field Search
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  A sticky top search engine that combines destination matching, interactive date-range calendar selection, and stay category dropdowns in a single unified bar.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Frictionless Reservation
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Instant price calculation factoring night counts, guest limits, and transparent cleaning fees with one-tap WhatsApp and phone contact triggers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. THE BOOKING JOURNEY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                THE BOOKING JOURNEY
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                From destination search to confirmed stay.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                A streamlined 5-step pathway engineered to minimize booking friction across desktop and smartphone screens.
              </p>
            </div>

            {/* 5-Step Visual Journey */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
              {BOOKING_JOURNEY.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-[22px] bg-[#FAF7F2] border border-black/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#9E6941]">
                        STAGE {item.step}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
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

        {/* ─── 5. WHAT WE BUILT (CAPABILITY MODULES) ─── */}
        <section id="platform-architecture" className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                PLATFORM CAPABILITIES
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Full-stack discovery and host management.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                TripleOne integrates high-speed guest exploration with an end-to-end administration panel for property onboarding, date blackout calendars, and listing curation.
              </p>
            </div>

            {/* 6 Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* 1 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Sticky Multi-Field Search
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Persistent top navigation search bar incorporating destination typeahead, dual-date check-in/out calendars, and stay category selectors.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Taxonomy & Category Filter
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Curated stay filters across Beachfront, Mountain, City Lofts, Cabins, Villas, Islands, and Farm stays with gradient badges and instant count updates.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Swiper Touch Carousels
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Fluid, gesture-responsive image carousels allowing travelers to preview property interiors directly from catalog grids without opening new tabs.
                </p>
              </div>

              {/* 4 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Date Range Calendar Engine
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Powered by React Day Picker and Date-fns, preventing double-booking by locking out reserved dates and enforcing check-in/out guidelines.
                </p>
              </div>

              {/* 5 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Verified Amenity Index
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Standardized amenity matrices for high-speed Wi-Fi, private pools, dedicated workspaces, air conditioning, and complimentary parking.
                </p>
              </div>

              {/* 6 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center mb-5">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Host & Admin Workspace
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Secure dashboard for listing creation, pricing overrides, custom taxonomy management, and real-time availability calendar blocking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. STAY CATEGORIES SHOWCASE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                CURATED COLLECTIONS
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Designed for every travel style.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Whether travelers seek cliffside pool villas in Greece or tranquil cedar cabins in California, TripleOne organizes stays into distinct experiential categories.
              </p>
            </div>

            {/* 4 Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {STAY_CATEGORIES.map((cat) => {
                const IconComp = cat.icon
                return (
                  <div
                    key={cat.name}
                    className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#E8DDD2] text-[#7F4A2D] flex items-center justify-center">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#9E6941] uppercase tracking-wider">
                          {cat.tagline}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-neutral-950 mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>Verified Properties Available</span>
                      <ArrowRight className="w-4 h-4 text-[#9E6941] transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── 7. DESIGN SYSTEM & VISUAL IDENTITY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                DESIGN SYSTEM
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Warm linen palettes and tactile typography.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The visual language balances the timeless elegance of classic hospitality with the clean structure of modern digital product design.
              </p>
            </div>

            {/* Color Palette Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-5 rounded-[22px] bg-[#E07B54] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-200">Brand Primary</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Terracotta Sand</div>
                  <div className="text-xs font-mono text-orange-100">#E07B54 • #F4D7C7</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#151110] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Typography</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Charcoal Slate</div>
                  <div className="text-xs font-mono text-slate-300">#151110 • #241E1B</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#FCF7F0] text-neutral-900 border border-black/[0.08] shadow-2xs flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">Surface Base</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Cream Linen</div>
                  <div className="text-xs font-mono text-neutral-600">#FCF7F0 • #EDE7DF</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#10B981] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-200">Verified Badge</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Emerald Trust</div>
                  <div className="text-xs font-mono text-emerald-100">#10B981 • #059669</div>
                </div>
              </div>
            </div>

            {/* Design Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Editorial Serif Elegance</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Cormorant Garamond headers paired with clean sans-serif body copy impart a luxury magazine quality to every property listing.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Tactile Card Elevation</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Generous 24px corner radiuses and subtle border shadows create a physical, inviting feel reminiscent of luxury boutique stationery.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Transparent Pricing</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Clear per-night pricing and total trip cost breakdowns eliminate hidden fee surprises during final reservation confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. TECHNICAL ARCHITECTURE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                TECHNICAL ARCHITECTURE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                High-performance Next.js 16 stack.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Architected with Next.js 16 App Router on the frontend and Firebase Firestore on the backend, ensuring instant property indexing and real-time host calendar sync.
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
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#9E6941] flex items-center justify-center">
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
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                THE RESULT
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A seamless, high-trust stay platform.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                By uniting sticky multi-field search, fluid touch carousels, and a robust administrative backend, TripleOne delivers an elevated travel booking experience.
              </p>
            </div>

            {/* 4 Observable Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">01 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Accelerated Discovery
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Sticky search and categorized taxonomies allow guests to locate their preferred accommodation in seconds.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">02 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Transparent Pricing
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Real-time date calculators present all-in nightly rates without hidden fees at checkout.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">03 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Touch-First Browsing
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Swiper image carousels and compact search bars offer a responsive booking experience across smartphones and tablets.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">04 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Scalable Host Admin
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Integrated management dashboard allows instant property additions, date blackout locks, and location curation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. NEXT PROJECT & GLOBAL CTA ─── */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Next Project Teaser (05 - Nexora) */}
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-24">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9E6941] uppercase tracking-wider mb-2">
                  <span>NEXT PROJECT</span>
                  <span>•</span>
                  <span>05</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  Nexora
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  Creative Agency Website
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
                  A modern agency website designed to showcase services, build trust, and turn visitors into potential clients.
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
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-3">
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
