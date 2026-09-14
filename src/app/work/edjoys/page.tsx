import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Compass,
  Layers,
  BookOpen,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Smartphone,
  Code2,
  Box,
  MoveUpRight,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'EdJoys Case Study — International Education Platform | StackStich',
  description:
    'A case study on how StackStich designed and engineered a modern, immersive web platform for EdJoys, connecting students with global exchange programs in Japan, Switzerland, France, and beyond.',
  alternates: {
    canonical: 'https://www.stackstich.online/work/edjoys',
  },
  openGraph: {
    title: 'EdJoys Case Study — International Education Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered a modern, immersive web platform for EdJoys, connecting students with global exchange programs.',
    url: 'https://www.stackstich.online/work/edjoys',
    siteName: 'StackStich',
    type: 'article',
    images: [
      {
        url: '/work/project1.png',
        width: 1200,
        height: 630,
        alt: 'EdJoys Case Study by StackStich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdJoys Case Study — International Education Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered a modern, immersive web platform for EdJoys.',
    images: ['/work/project1.png'],
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
      name: 'EdJoys Case Study',
      item: 'https://www.stackstich.online/work/edjoys',
    },
  ],
}

const TECHNOLOGIES = [
  {
    name: 'Next.js 16',
    role: 'Application Architecture & App Router',
    tag: 'Framework',
    desc: 'Server-rendered static generation, optimized routing, and asset delivery.',
  },
  {
    name: 'React 19',
    role: 'Component Architecture',
    tag: 'Core UI',
    desc: 'Modular, reusable component systems managing interactive state and modals.',
  },
  {
    name: 'TypeScript',
    role: 'Type-Safe Data Contracts',
    tag: 'Language',
    desc: 'Structured data models for destination tracks, itineraries, and program schemas.',
  },
  {
    name: 'Tailwind CSS v4',
    role: 'Design System & Responsive Grid',
    tag: 'Styling',
    desc: 'Custom mineral green tokens, flexible typography scales, and fluid breakpoints.',
  },
  {
    name: 'Three.js & R3F',
    role: 'Spatial 3D Globe',
    tag: '3D WebGL',
    desc: 'Interactive 3D globe visualization with coordinate pin geometry and bitset land masks.',
  },
  {
    name: 'GSAP',
    role: 'Motion & Interactions',
    tag: 'Animation',
    desc: 'Performant timeline animations and scroll-driven narrative transitions.',
  },
  {
    name: 'Lenis',
    role: 'Smooth Scrolling',
    tag: 'Experience',
    desc: 'Inertial smooth scrolling physics providing a luxury editorial feel.',
  },
  {
    name: 'Lucide React',
    role: 'Iconography',
    tag: 'Assets',
    desc: 'Clean, modern geometric outline icons across UI touchpoints.',
  },
]

const DESTINATIONS = [
  {
    country: 'Japan',
    subtitle: 'Culture, Robotics & Spirit',
    motif: 'Kumiko-inspired geometric patterns & high-tech robotics focus',
    description:
      'Immersive study corridors spanning Tokyo robotics research, historic Kyoto cultural heritage, and traditional Japanese athletic discipline.',
    image: '/work/edjoys/japan.jpg',
    color: '#D97706',
  },
  {
    country: 'Switzerland',
    subtitle: 'Global Governance & Alpine Science',
    motif: 'Topographic contour patterns & Swiss precision visual language',
    description:
      'Exploration tracks focused on international diplomacy in Geneva, alpine environmental ecology, and world-standard hospitality benchmarks.',
    image: '/work/edjoys/switzerland.jpg',
    color: '#DC2626',
  },
  {
    country: 'France',
    subtitle: 'Arts, Luxury & Gastronomy',
    motif: 'Haussmann-inspired architectural geometry & Fleur-de-lis motifs',
    description:
      'Educational journeys through iconic Parisian cultural institutions, luxury fashion management houses, and French culinary arts economics.',
    image: '/work/edjoys/france.jpg',
    color: '#2563EB',
  },
  {
    country: 'India',
    subtitle: 'Heritage, Tech & Community Impact',
    motif: 'Engraving-inspired artistic motifs & living heritage patterns',
    description:
      'Connecting international learners with India’s ancient living history, vibrant digital enterprise hubs, and grassroots social impact initiatives.',
    image: '/work/edjoys/india.jpg',
    color: '#EA580C',
  },
]

export default function EdjoysCaseStudyPage() {
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

            {/* Main Header Information */}
            <div className="max-w-4xl">
              {/* Project Number & Category */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm sm:text-base font-mono font-medium text-[#9E6941]">
                  01 / 05
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-neutral-500">
                  International Education & Student Exchange
                </span>
              </div>

              {/* Title & Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-neutral-950 tracking-tight leading-[1.04] mb-4 sm:mb-6">
                EdJoys
              </h1>

              <p className="text-lg sm:text-2xl lg:text-[26px] font-medium text-[#8C5D38] leading-snug mb-4 sm:mb-6 font-serif italic">
                International Student Exchange & Experiential Learning Platform
              </p>

              <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed max-w-3xl font-normal mb-8 sm:mb-10">
                A modern, immersive web platform designed to connect students with global educational exchange programs in Japan, Switzerland, France, and beyond.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="https://edjoys.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Mockup Showcase */}
            <div className="mt-10 sm:mt-14 relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <Image
                src="/work/project1.png"
                alt="EdJoys International Student Exchange Platform Case Study by StackStich"
                fill
                priority
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
            </div>
          </div>
        </section>

        {/* ─── 2. PROJECT OVERVIEW ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left Column: Metadata Card */}
              <div className="lg:col-span-4 xl:col-span-4">
                <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-8 border border-black/[0.06] sticky top-28">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-600">
                      PROJECT OVERVIEW
                    </span>
                  </div>

                  <div className="space-y-5 text-sm">
                    <div>
                      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Client
                      </div>
                      <div className="text-base font-bold text-neutral-900 mt-0.5">
                        EdJoys
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06]">
                      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Industry
                      </div>
                      <div className="text-base font-bold text-neutral-900 mt-0.5">
                        International Education & Student Exchange
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06]">
                      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Deliverables
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {[
                          'UI/UX Design',
                          'Interactive 3D Frontend',
                          'Destination Architecture',
                          'Responsive Engineering',
                        ].map((item) => (
                          <span
                            key={item}
                            className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-white text-neutral-800 border border-black/[0.06]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06]">
                      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Status
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-neutral-900">
                          Live Website
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06]">
                      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Website
                      </div>
                      <a
                        href="https://edjoys.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8C5D38] hover:text-[#6E4221] transition-colors mt-1"
                      >
                        <span>edjoys.com</span>
                        <MoveUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Overview Narrative */}
              <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-3">
                  THE CONTEXT & SCOPE
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-[1.15] mb-6">
                  Taking learning beyond classrooms and into the world.
                </h2>

                <div className="space-y-5 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal">
                  <p>
                    EdJoys creates immersive educational journeys that take students beyond standard classrooms. StackStich designed and developed a high-performance, photography-forward digital platform that showcases global learning destinations and provides an intuitive inquiry experience for schools and families.
                  </p>
                  <p>
                    International student travel requires absolute credibility, transparent curriculum details, and unwavering reassurance regarding safety and local mentorship. The digital presence needed to bridge educational depth with experiential excitement—giving school coordinators, parents, and ambitious young learners a clear pathway from destination discovery to program consultation.
                  </p>
                  <p>
                    Through bespoke country design motifs, interactive spatial navigation, and structured storytelling, StackStich engineered a modern platform representing EdJoys’ expanding presence across Japan, Switzerland, France, India, and Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. THE DIGITAL EXPERIENCE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                EXPERIENTIAL FRAMEWORK
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                The digital experience.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Structured around three core experiential pillars that communicate how travel transforms into purposeful academic and personal evolution.
              </p>
            </div>

            {/* 3 Experience Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-[#9E6941] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-black/[0.04]">
                      01
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      PILLAR ONE
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-1">
                    EXCHANGE
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-[#8C5D38] mb-4">
                    Cultures. Ideas. Perspectives.
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    The platform highlights direct connection with local communities, historical traditions, and international peer networks—expanding students&apos; global awareness through authentic intercultural dialogue.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-[#9E6941] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-black/[0.04]">
                      02
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      PILLAR TWO
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-1">
                    EXPLORE
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-[#8C5D38] mb-4">
                    Places. People. Possibilities.
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Visitors explore destination-specific learning tracks: Tokyo robotics innovation, Swiss alpine environmental science, Parisian creative institutions, and Indian heritage enterprise.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-[#9E6941] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-black/[0.04]">
                      03
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      PILLAR THREE
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-1">
                    EVOLVE
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-[#8C5D38] mb-4">
                    Experience. Discover. Grow.
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    The narrative emphasizes lifelong outcomes: practical problem-solving skills, intercultural confidence, and an enriched vision for future academic and professional pursuits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. WHAT WE BUILT ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                  DELIVERED CAPABILITIES
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
                  What we built.
                </h2>
              </div>
              <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Four core frontend capabilities designed to combine visual excitement with clear academic transparency.
              </p>
            </div>

            {/* 4 Feature Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] hover:border-black/[0.14] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#9E6941] mb-6 shadow-2xs">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-neutral-400 mb-1">01 / FEATURE</div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-2.5">
                  Interactive 3D Globe
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  A custom interactive 3D globe allowing visitors to explore destination hubs spatially, complete with coordinate markers, geographic land masks, and fluid camera transitions.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] hover:border-black/[0.14] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#9E6941] mb-6 shadow-2xs">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-neutral-400 mb-1">02 / FEATURE</div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-2.5">
                  Bespoke Destination Design
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  Custom visual systems and cultural motifs tailored to individual destination experiences—preventing the site from feeling like a duplicated template.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] hover:border-black/[0.14] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#9E6941] mb-6 shadow-2xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-neutral-400 mb-1">03 / FEATURE</div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-2.5">
                  Structured Program Storytelling
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  Clear presentation of destinations, learning experiences, program details, and educational journeys formatted for quick comprehension by educators and families.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 sm:p-10 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] hover:border-black/[0.14] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#9E6941] mb-6 shadow-2xs">
                  <Send className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-neutral-400 mb-1">04 / FEATURE</div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mb-2.5">
                  Responsive Inquiry Experience
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  A responsive inquiry flow and quote consultation modal designed to help students, families, and schools explore specific tracks and request tailored itineraries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. DESIGN & INTERACTION ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                  VISUAL ARCHITECTURE
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight mb-6">
                  Designed around the journey.
                </h2>
                <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    The visual identity balances organic natural tones with a refined editorial aesthetic. A foundational Sea Foam background pairs with deep Mineral Green structure, duck-egg borders, and warm terracotta accents.
                  </p>
                  <p>
                    Typography pairs contemporary geometric sans-serif for UI clarity with expressive serif accents for key narrative questions and inspirational statements.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-black/[0.06]">
                    <Sparkles className="w-5 h-5 text-[#9E6941] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Floating Frosted Navigation</h4>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Fixed pill navigation with glassmorphism backdrop blur and active route tracking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-black/[0.06]">
                    <ShieldCheck className="w-5 h-5 text-[#9E6941] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Trust & Safeguarding Reassurance</h4>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Dedicated transparency blocks covering 24/7 emergency care and local coordinators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Design Grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {DESTINATIONS.map((dest) => (
                    <div
                      key={dest.country}
                      className="bg-white rounded-[24px] overflow-hidden border border-black/[0.07] shadow-2xs group flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={dest.image}
                          alt={`${dest.country} Program by EdJoys`}
                          fill
                          quality={90}
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 35vw"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                          {dest.country}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base font-bold text-neutral-950">{dest.subtitle}</h4>
                          <p className="text-xs font-mono text-[#8C5D38] mt-1">{dest.motif}</p>
                          <p className="text-xs text-neutral-600 leading-relaxed mt-2.5 font-normal">
                            {dest.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. RESPONSIVE EXPERIENCE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                MULTI-DEVICE OPTIMIZATION
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                One experience, across every screen.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Engineered from the ground up for seamless responsive adaptability—from compact smartphone touchscreens to expansive desktop monitors.
              </p>
            </div>

            {/* Desktop Mockup Feature */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.05)] mb-8">
              <Image
                src="/projects/project1.png"
                alt="EdJoys Desktop Interface Preview"
                fill
                quality={95}
                className="object-contain object-center p-4 sm:p-8"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
            </div>

            {/* 3 Responsive Tenets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-black/[0.06]">
                <Smartphone className="w-5 h-5 text-[#9E6941] mb-3" />
                <h4 className="text-base font-bold text-neutral-900 mb-1.5">Mobile First Touch UI</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Smooth drawer navigation, responsive card stacking, and tap-optimized inquiry triggers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-black/[0.06]">
                <Layers className="w-5 h-5 text-[#9E6941] mb-3" />
                <h4 className="text-base font-bold text-neutral-900 mb-1.5">Adaptive Breakpoints</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Carefully tuned layout grids preventing awkward line wrapping or horizontal overflow.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-black/[0.06]">
                <Cpu className="w-5 h-5 text-[#9E6941] mb-3" />
                <h4 className="text-base font-bold text-neutral-900 mb-1.5">Optimized Performance</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Lazy-loaded below-fold imagery and lean WebGL rendering preserving fast page load times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. TECHNOLOGY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                  ENGINEERING FOUNDATION
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
                  Technology behind the experience.
                </h2>
              </div>
              <p className="text-neutral-600 text-sm sm:text-base max-w-md leading-relaxed">
                A modern, verified technology stack combining server-side rendering performance with interactive 3D capabilities.
              </p>
            </div>

            {/* Verified Tech Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TECHNOLOGIES.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white rounded-2xl p-6 border border-black/[0.07] shadow-2xs hover:border-black/[0.14] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-neutral-600 border border-black/[0.04]">
                        {tech.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-950 tracking-tight">{tech.name}</h3>
                    <div className="text-xs font-semibold text-[#8C5D38] mt-0.5 mb-2.5">{tech.role}</div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. PROJECT GALLERY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                CURATED SHOWCASE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
                Project Gallery
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base">
                An editorial look into the actual visual moments and destination hubs engineered for EdJoys.
              </p>
            </div>

            {/* Gallery Rhythm */}
            <div className="space-y-6 sm:space-y-8">
              {/* 1. Primary Desktop Showcase (hero_web.png) */}
              <div className="relative aspect-[1917/969] w-full rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-xs group">
                <Image
                  src="/case_study/project1/hero_web.png"
                  alt="EdJoys Platform Desktop Hero & Narrative Experience"
                  fill
                  quality={95}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                  Primary Desktop Interface
                </div>
              </div>

              {/* 2. Two-Image Split: Destinations Explorer & 3D Globe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Destination Interface (destination.png) */}
                <div className="relative aspect-[1909/967] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project1/destination.png"
                    alt="EdJoys Global Destinations Portal Interface"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Destinations Portal & Track Explorer
                  </div>
                </div>

                {/* Interactive 3D Globe (globe.png) */}
                <div className="relative aspect-[1906/961] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project1/globe.png"
                    alt="EdJoys Interactive 3D Globe Visualization"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Interactive 3D Spatial Globe
                  </div>
                </div>
              </div>

              {/* 3. Two-Image Split: Switzerland & India Destination Programs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Switzerland Experience (swi.png) */}
                <div className="relative aspect-[1904/950] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project1/swi.png"
                    alt="EdJoys Switzerland Destination Program Experience"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Switzerland Destination Program
                  </div>
                </div>

                {/* India Experience (india.png) */}
                <div className="relative aspect-[1897/962] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project1/india.png"
                    alt="EdJoys India Destination Program Experience"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    India Destination Program
                  </div>
                </div>
              </div>

              {/* 4. Mobile Experience Showcase (hero_mob.png) */}
              <div className="rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 bg-[#FAF7F2] border border-black/[0.08] shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
                <div className="max-w-xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] shadow-2xs mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941]" />
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-900 tracking-wider uppercase">
                      Mobile Experience
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mb-3">
                    Touch-Optimized Mobile Navigation
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                    The complete EdJoys exchange curriculum and destination tracks adapted seamlessly for smartphone screens—featuring smooth drawer navigation, fluid card stacking, and instant quotation triggers without horizontal shifting.
                  </p>
                </div>

                <div className="relative w-[240px] sm:w-[280px] lg:w-[300px] aspect-[429/853] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.12)] border border-black/[0.1] bg-[#1C2A29] shrink-0">
                  <Image
                    src="/case_study/project1/hero_mob.png"
                    alt="EdJoys Mobile Platform and Touch Navigation Experience"
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

        {/* ─── 9. OBSERVABLE OUTCOMES ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                PROJECT DELIVERY
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Built to make the experience clearer.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                By focusing on structured content hierarchy, authentic cultural aesthetics, and intuitive inquiry pathways, the final web platform delivers a cohesive digital home for international student travel.
              </p>
            </div>

            {/* 3 Observable Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">01 / OUTCOME</div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                    Clearer Program Presentation
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    The platform presents destination experiences and educational programs in a structured visual format, allowing schools and parents to easily understand curriculum tracks.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">02 / OUTCOME</div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                    Distinctive Digital Identity
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    The custom visual language gives EdJoys a recognizable, premium presence across its global destination corridors, setting it apart in the international education sector.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#9E6941] mb-4">03 / OUTCOME</div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                    Accessible Inquiry Journey
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Visitors can move seamlessly from exploring destinations to requesting customized program itineraries through a clear, transparent inquiry flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. NEXT PROJECT & GLOBAL CTA ─── */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Next Project Teaser */}
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-24">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9E6941] uppercase tracking-wider mb-2">
                  <span>NEXT PROJECT</span>
                  <span>•</span>
                  <span>02</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  Animalsathi
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  Animal Care & Emergency Rescue Platform
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
                  Explore another digital experience designed and engineered by StackStich.
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
                Have an ambitious project in mind?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-normal">
                Tell us what you&apos;re building and we&apos;ll help turn it into a polished, high-converting digital experience.
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
