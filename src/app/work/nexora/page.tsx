import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Wand2,
  LineChart,
  Shield,
  ArrowUpRight,
  CheckCircle2,
  Database,
  SlidersHorizontal,
  LayoutGrid,
  Code2,
  Smartphone,
  Cpu,
  Monitor,
  Briefcase,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Nexora Case Study — Creative Agency Website | StackStich',
  description:
    'A case study on how StackStich designed and engineered Nexora, a modern creative agency website featuring holographic glass aesthetics, horizontal service tracks, and an interactive portfolio showcase.',
  alternates: {
    canonical: 'https://www.stackstich.online/work/nexora',
  },
  openGraph: {
    title: 'Nexora Case Study — Creative Agency Website | StackStich',
    description:
      'A case study on how StackStich designed and engineered Nexora, a modern agency website built to showcase services, build trust, and convert clients.',
    url: 'https://www.stackstich.online/work/nexora',
    siteName: 'StackStich',
    type: 'article',
    images: [
      {
        url: '/work/project5.png',
        width: 1200,
        height: 630,
        alt: 'Nexora Case Study by StackStich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexora Case Study — Creative Agency Website | StackStich',
    description:
      'A case study on how StackStich designed and engineered Nexora, a modern creative agency platform.',
    images: ['/work/project5.png'],
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
      name: 'Nexora Case Study',
      item: 'https://www.stackstich.online/work/nexora',
    },
  ],
}

const TECH_GROUPS = [
  {
    category: 'Frontend & Architecture',
    icon: Code2,
    description: 'Modern component-driven architecture built for speed and responsive fluidity.',
    stack: [
      { name: 'React 19 & TypeScript', role: 'Component System & Type Contracts' },
      { name: 'Vite 8 & App Shell', role: 'Sub-Second HMR & Optimized Bundling' },
      { name: 'Tailwind CSS v3/v4', role: 'Dark Space & Glassmorphism Design Tokens' },
      { name: 'Lucide & Material Symbols', role: 'Clean Technical & Interface Icons' },
    ],
  },
  {
    category: 'Motion & Interactive UI',
    icon: Sparkles,
    description: 'Hardware-accelerated horizontal scroll tracks and 3D floating cards.',
    stack: [
      { name: 'Framer Motion 12', role: 'Scroll-Triggered Reveals & Sticky Tracks' },
      { name: 'Interactive Accordions', role: 'Dynamic Image Expanding Components' },
      { name: 'Parallax Layer Engine', role: 'Multi-Depth 3D Card Floating Transitions' },
      { name: 'Reduced Motion Guard', role: 'Accessible Motion Preferences Fallback' },
    ],
  },
  {
    category: 'Design & Visual System',
    icon: Layers,
    description: 'Holographic glassmorphism paired with deep obsidian background contrasts.',
    stack: [
      { name: 'Glassmorphism Layers', role: 'Multi-Stage Backdrop Blur (24px to 30px)' },
      { name: 'Electric Cyan Accents', role: 'Vibrant Primary Glow Highlights (#74F5FF)' },
      { name: 'Radial Gradient Masks', role: 'Smooth Atmospheric Light Diffusion' },
      { name: 'Typography Stack', role: 'Technical Monospace & Modern Sans Headings' },
    ],
  },
  {
    category: 'Conversion & Lead Funnel',
    icon: SlidersHorizontal,
    description: 'Streamlined inquiry flows, scope configurators, and portfolio metrics.',
    stack: [
      { name: 'Contact Form Hooks', role: 'Client-Side Validation & State Handling' },
      { name: 'Service Taxonomy', role: 'Structured 6-Pillar Capability Classification' },
      { name: 'Portfolio Metrics', role: 'Evidence-Based Client Outcome Badges' },
      { name: 'Consultation Pipeline', role: 'High-Impact Discovery Call Routing' },
    ],
  },
]

const CLIENT_JOURNEY = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'High-impact 3D holographic hero establishing immediate design authority and 0.2ms latency.',
  },
  {
    step: '02',
    title: 'Capabilities',
    desc: 'Interactive accordion and horizontal scroll track demonstrating 6 core service disciplines.',
  },
  {
    step: '03',
    title: 'Portfolio',
    desc: 'Curated enterprise case studies showcasing fintech analytics, SaaS clouds, and commerce platforms.',
  },
  {
    step: '04',
    title: 'Process',
    desc: 'Transparent 4-stage delivery timeline building trust and setting clear client expectations.',
  },
  {
    step: '05',
    title: 'Consultation',
    desc: 'Direct consultation funnel turning qualified visitors into active client project inquiries.',
  },
]

const SERVICES = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Premium Websites That Build Trust',
    description: 'Modern high-converting websites designed to attract customers, build credibility, and grow your business online.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Modern App & Dashboard Design',
    description: 'Beautiful mobile apps and business dashboards designed for smooth experiences and easy user interaction.',
  },
  {
    number: '03',
    icon: Wand2,
    title: 'Fast & Scalable Development',
    description: 'High-performance websites and applications built for speed, security, and future business growth.',
  },
  {
    number: '04',
    icon: LineChart,
    title: 'Growth & Performance Optimization',
    description: 'We improve speed, user experience, and conversion performance to help your business grow faster.',
  },
  {
    number: '05',
    icon: Shield,
    title: 'Reliable & Secure Solutions',
    description: 'Secure, stable, and professionally managed digital systems you can trust for long-term business operations.',
  },
  {
    number: '06',
    icon: ArrowUpRight,
    title: 'Digital Strategy & Consultation',
    description: 'We help businesses plan the right digital solutions, features, and user experiences before development starts.',
  },
]

const PORTFOLIO_PROJECTS = [
  {
    title: 'Helio Finance Suite',
    subtitle: 'CFO-grade analytics and reporting platform for global financial teams.',
    tag: 'Fintech Platform',
    image: '/work/nexora/portfolio-dashboard.webp',
    metric: '34% faster time-to-insights',
  },
  {
    title: 'Atlas Commerce Cloud',
    subtitle: 'Headless e-commerce infrastructure with cinematic product storytelling.',
    tag: 'E-commerce Platform',
    image: '/work/nexora/portfolio-team.webp',
    metric: '2.1x conversion lift',
  },
  {
    title: 'Nova Operations',
    subtitle: 'Enterprise workflow automation platform with AI-assisted routing.',
    tag: 'SaaS Platform',
    image: '/work/nexora/portfolio-dev.webp',
    metric: '78% fewer manual steps',
  },
]

export default function NexoraCaseStudyPage() {
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
                  05 • CASE STUDY
                </span>
                <div className="w-10 sm:w-14 h-[1.5px] bg-[#9E6941]" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                  Creative Agency Website
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08] mb-5 sm:mb-6">
                A modern agency website designed to showcase services, build trust, and convert clients.
              </h1>

              <p className="text-neutral-600 text-sm sm:text-lg lg:text-[19px] leading-relaxed max-w-3xl font-normal mb-8 sm:mb-10">
                StackStich designed and engineered Nexora as a forward-looking digital brand platform—combining holographic glass aesthetics, horizontal service tracks, interactive capability accordions, and a structured 4-phase delivery framework.
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
                  href="#agency-architecture"
                  className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>View Architecture</span>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </a>
              </div>
            </div>

            {/* Hero Visual (project5.png) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-lg">
              <Image
                src="/work/project5.png"
                alt="Nexora Creative Agency Website Platform Interface by StackStich"
                fill
                priority
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#74F5FF] animate-pulse" />
                  <span>Holographic 3D Glass UI + Framer Motion Service Tracks</span>
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
                  Visual authority.<br />
                  Measurable outcomes.
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  Nexora is a high-end digital design and engineering agency dedicated to crafting premium websites, enterprise SaaS dashboards, and digital product experiences for ambitious brands.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mt-3">
                  StackStich engineered the entire digital presence—featuring floating 3D glass layers, horizontal scroll service corridors, interactive capability accordions, and a transparent delivery process that builds client conviction before the first call.
                </p>
              </div>

              {/* Right Column: Editorial Metadata Bento Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Client</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Nexora</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Creative Agency</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Industry</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Digital Services</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Design & Development</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Platforms</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Web (Mobile-First)</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Brand Platform</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Services</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Full-Stack Platform</div>
                  <div className="text-xs text-neutral-500 mt-0.5">UI/UX · Motion · Dev</div>
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
                  <div className="text-sm sm:text-base font-bold text-neutral-950">React 19 · Motion</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Tailwind · Glass UI · TS</div>
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
                When digital presence becomes a competitive advantage.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Modern B2B clients evaluate agencies based on the craft of their own website. Nexora needed a platform that radiated technical excellence, design sophistication, and operational transparency.
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Immediate Design Authority
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Floating 3D glass cards, holographic gradient diffusions, and low-latency system badges demonstrate advanced engineering capability at first glance.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Interactive Service Discovery
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Horizontal scroll tracks and dynamic image accordions let prospective clients explore AI agents, custom platforms, and performance roadmaps interactively.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Predictable Delivery Process
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  A structured 4-step timeline—from discovery workshops to experience architecture, design systems, and launch—eliminates client uncertainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. THE CLIENT JOURNEY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                THE CLIENT JOURNEY
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                From first impression to signed partnership.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                A 5-stage conversion architecture engineered to guide enterprise prospects through capabilities, proof points, and project initiation.
              </p>
            </div>

            {/* 5-Step Visual Journey */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
              {CLIENT_JOURNEY.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-[22px] bg-[#FAF7F2] border border-black/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#0284C7]">
                        STAGE {item.step}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
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
        <section id="agency-architecture" className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                PLATFORM CAPABILITIES
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Crafted for impact and conversion.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                StackStich built the Nexora platform with modular components, fluid scroll animations, and an interactive portfolio showcase.
              </p>
            </div>

            {/* 6 Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* 1 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Holographic 3D Hero UI
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Multi-layered glass cards with live latency badges, code syntax panels, and radial glow effects that position Nexora as a premier technical partner.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Horizontal Scroll Tracks
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Framer Motion sticky viewport corridors allowing seamless horizontal exploration of service capabilities without disrupting vertical page flow.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Interactive Image Accordions
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Expandable visual containers showcasing AI agents, generative visual systems, and conversational RAG interfaces with smooth spring animations.
                </p>
              </div>

              {/* 4 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Evidence-Based Case Cards
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Project showcases pairing high-resolution UI previews with concrete performance metrics (e.g. 34% faster insights, 2.1x conversion lift).
                </p>
              </div>

              {/* 5 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  4-Stage Delivery System
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Structured timeline cards detailing discovery workshops, experience architecture, design system engineering, and production launch QA.
                </p>
              </div>

              {/* 6 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">
                  Responsive Multi-Device Layout
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Tailored adaptations ensuring high-impact visuals collapse cleanly into touch-friendly vertical stacks on mobile viewports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. SERVICE PILLARS SHOWCASE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
                SERVICE DISCIPLINES
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Comprehensive digital capabilities.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                From brand identity and high-converting websites to complex SaaS dashboards and performance optimization, Nexora covers the full product lifecycle.
              </p>
            </div>

            {/* 6 Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {SERVICES.map((s) => {
                const IconComp = s.icon
                return (
                  <div
                    key={s.title}
                    className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.06] text-[#0284C7] flex items-center justify-center shadow-2xs">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#0284C7]">
                          {s.number}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-950 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {s.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>Enterprise Ready</span>
                      <ArrowRight className="w-4 h-4 text-[#0284C7] transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Featured Work / Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {PORTFOLIO_PROJECTS.map((proj) => (
                <div
                  key={proj.title}
                  className="rounded-[28px] overflow-hidden bg-[#FAF7F2] border border-black/[0.07] shadow-2xs group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#151110]">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      quality={92}
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold select-none">
                      {proj.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="inline-block text-[11px] font-mono font-bold text-[#0284C7] mb-1">
                      {proj.metric}
                    </div>
                    <h4 className="text-lg font-bold text-neutral-950 mb-1">
                      {proj.title}
                    </h4>
                    <p className="text-neutral-600 text-xs leading-relaxed font-normal">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>
              ))}
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
                Deep space obsidian and electric cyan.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The visual identity pairs dark obsidian backdrops with holographic glass cards and electric cyan accents, creating a futuristic yet credible atmosphere for enterprise decision-makers.
              </p>
            </div>

            {/* Color Palette Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-5 rounded-[22px] bg-[#74F5FF] text-neutral-950 shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-900">Brand Primary</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Electric Cyan</div>
                  <div className="text-xs font-mono text-cyan-950">#74F5FF • #00E5FF</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#0A0D14] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Background Base</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Deep Obsidian</div>
                  <div className="text-xs font-mono text-slate-300">#0A0D14 • #111622</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#FAF7F2] text-neutral-900 border border-black/[0.08] shadow-2xs flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">Surface Base</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Mineral Sand</div>
                  <div className="text-xs font-mono text-neutral-600">#FAF7F2 • #EDE7DF</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#CA6B43] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-200">Warm Accent</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Terracotta Gold</div>
                  <div className="text-xs font-mono text-orange-100">#CA6B43 • #9E6941</div>
                </div>
              </div>
            </div>

            {/* Design Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Multi-Depth Glassmorphism</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Layered backdrop blur filters (24px to 30px) create depth and physical hierarchy, highlighting live latency metrics and code panels.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Atmospheric Light Diffusion</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Radial gradients and subtle cyan glow halos draw focus to high-priority calls to action and capability indicators.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Technical Micro-Typography</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Monospace labels, sub-second latency tags, and structured step indicators establish a rigorous, engineering-led brand posture.
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
                Engineered for speed, motion, and scale.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Combining React 19 component trees, Framer Motion 12 hardware acceleration, and modern CSS glass tokens for zero-jank interactive storytelling.
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
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center">
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
                A high-conversion agency platform.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                By uniting 3D holographic storytelling, interactive capability corridors, and transparent delivery workflows, Nexora establishes immediate authority in the creative digital services market.
              </p>
            </div>

            {/* 4 Observable Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#0284C7] mb-4">01 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Visual Authority
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Floating glass architecture and low-latency metrics set a high standard of digital craft.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#0284C7] mb-4">02 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Structured Inquiries
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Faceted service taxonomy helps prospective clients pre-qualify and select scope parameters.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#0284C7] mb-4">03 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Predictable Delivery
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    The 4-stage process model clearly outlines milestones, reducing onboarding friction.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#0284C7] mb-4">04 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Modular Scale
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Reusable component architecture allows adding new case studies, accordions, and offerings rapidly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. NEXT PROJECT & GLOBAL CTA ─── */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Next Project Teaser (01 - Edjoys) */}
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-24">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9E6941] uppercase tracking-wider mb-2">
                  <span>FEATURED PROJECT</span>
                  <span>•</span>
                  <span>01</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  Edjoys
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  International Education Platform
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
                  A modern education platform connecting learners with experiential global exchange programs across Japan, India, Switzerland, France, and Australia.
                </p>
              </div>

              <Link
                href="/work/edjoys"
                className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-xs transition-colors self-start md:self-auto shrink-0"
              >
                <span>View Case Study</span>
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
