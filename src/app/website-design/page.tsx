import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  FolderSync,
  Grid,
  Layers,
  Layout,
  Palette,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import WebDesignHeroVisual from '@/components/webdesign/WebDesignHeroVisual'
import WebDesignFaqAccordion from '@/components/webdesign/WebDesignFaqAccordion'
import { WEBDESIGN_FAQ_DATA } from '@/components/webdesign/webDesignFaqData'
import DesignVsTemplateTable from '@/components/webdesign/DesignVsTemplateTable'
import ResponsiveDeviceShowcase from '@/components/webdesign/ResponsiveDeviceShowcase'
import WorkSection from '@/components/work/WorkSection'

export const metadata: Metadata = {
  title: 'Website Design & UI/UX Studio Services | Stack',
  description:
    'Stack crafts custom website designs, responsive layouts, and UI/UX systems built to establish brand credibility, communicate clearly, and turn visitors into clients.',
  alternates: {
    canonical: 'https://stack.studio/website-design',
  },
  openGraph: {
    title: 'Website Design & UI/UX Studio Services | Stack',
    description:
      'Websites designed to make the right first impression. Bespoke visual identity, intuitive UX, responsive design systems, and conversion-focused layouts.',
    url: 'https://stack.studio/website-design',
    siteName: 'Stack Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design & UI/UX Studio Services | Stack',
    description:
      'Custom website design and UI/UX systems engineered for clarity, credibility, and commercial growth. Built by Stack.',
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
      item: 'https://stack.studio',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Website Design Services',
      item: 'https://stack.studio/website-design',
    },
  ],
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Design & UI/UX Studio Services',
  serviceType: 'Website Design',
  provider: {
    '@type': 'Organization',
    name: 'Stack Studio',
    url: 'https://stack.studio',
  },
  description:
    'Strategic website design, UI/UX architecture, responsive design systems, landing page design, and website redesigns for modern businesses.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website Design Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom UI/UX Website Design',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Responsive Web Design & Mobile Layouts',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Converting Landing Page Design',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign & Brand Refresh',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Design Systems & Component Architecture',
        },
      },
    ],
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: WEBDESIGN_FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// Data Constants
const PILLARS_DATA = [
  {
    icon: ShieldCheck,
    title: 'Builds Trust',
    desc: 'Clean, professional design helps visitors feel confident in your business from the moment they arrive.',
  },
  {
    icon: Compass,
    title: 'Makes Your Message Clear',
    desc: 'A clear visual structure helps visitors quickly understand what you offer, who you serve, and why it matters.',
  },
  {
    icon: Layout,
    title: 'Easy to Navigate',
    desc: 'Simple navigation and thoughtful layouts help visitors find information without getting frustrated.',
  },
  {
    icon: Smartphone,
    title: 'Works on Every Device',
    desc: 'Your website should provide a smooth, consistent experience across phones, tablets, laptops, and desktops.',
  },
  {
    icon: Target,
    title: 'Guides Visitors to Act',
    desc: 'Clear calls to action and well-structured pages help visitors know what to do next.',
  },
  {
    icon: Sparkles,
    title: 'Looks Like Your Brand',
    desc: 'A custom visual style makes your business feel distinctive instead of looking like another template-based website.',
  },
]

const SERVICES_DATA = [
  {
    icon: Palette,
    title: 'Visual Website Design',
    desc: 'Creating clean, professional page designs that match your brand and make your business look its best.',
  },
  {
    icon: Users,
    title: 'User Experience Design',
    desc: 'Planning simple, intuitive layouts that help visitors find what they need and move through your website easily.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Web Design',
    desc: 'Designing websites that look and work smoothly across phones, tablets, laptops, and desktop screens.',
  },
  {
    icon: Target,
    title: 'Landing Page Design',
    desc: 'Creating focused pages for specific products, services, campaigns, or marketing goals.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    desc: 'Updating outdated websites with a cleaner design, better structure, and a more modern experience.',
  },
  {
    icon: Layers,
    title: 'Consistent Website Design',
    desc: 'Creating reusable visual styles for buttons, forms, layouts, typography, and other website elements.',
  },
  {
    icon: Zap,
    title: 'Clear Calls to Action',
    desc: 'Structuring pages and content so visitors clearly understand what to do next.',
  },
  {
    icon: Sparkles,
    title: 'Interactive Website Design',
    desc: 'Adding thoughtful animations and interactions that make the website feel polished without getting in the way.',
  },
]

const COST_FACTORS = [
  {
    factor: 'Number of Unique Page Templates',
    detail:
      'A 5-page marketing site requires significantly fewer unique Figma layouts than a 30-page enterprise portal with multiple service and resource templates.',
  },
  {
    factor: 'UX Research & Journey Complexity',
    detail:
      'In-depth competitor benchmarking, customer interview synthesis, and persona wireframing increase upfront strategic investment.',
  },
  {
    factor: 'Design System & Component Scale',
    detail:
      'Building an enterprise Figma component library with comprehensive variant states (hover, focus, disabled) takes more craft than simple one-off pages.',
  },
  {
    factor: 'Interactive Prototyping Depth',
    detail:
      'Clickable high-fidelity micro-interactions, responsive menu transitions, and animated tab states require additional craft and testing time.',
  },
  {
    factor: 'Custom Art Direction & Graphics',
    detail:
      'Commissioned visual diagrams, custom iconography suites, and bespoke photographic treatments require dedicated creative direction.',
  },
  {
    factor: 'Content & Copywriting Scope',
    detail:
      'Whether you supply complete finalized copy or require Stack to architect brand messaging, headlines, and value propositions.',
  },
  {
    factor: 'Number of Stakeholder Revisions',
    detail:
      'Our standard scopes include 2–3 structured revision rounds per phase. Projects requiring extensive committee reviews may expand scope.',
  },
  {
    factor: 'Development Handoff Requirements',
    detail:
      'Providing production design specs, asset slicing, and CSS token documentation for third-party in-house engineering teams.',
  },
]

const CLIENT_PARTNERS = [
  {
    title: 'Professional Services',
    desc: 'Law firms, architectural practices, financial consultancies, and executive agencies where trust, gravitas, and clarity drive high-ticket client acquisition.',
  },
  {
    title: 'Tech Startups & SaaS',
    desc: 'Fast-moving software companies needing clean product showcases, interactive feature diagrams, and high-converting signup landing pages.',
  },
  {
    title: 'Hospitality & Dining',
    desc: 'Premium restaurants, private dining clubs, and boutique hotels requiring immersive visual storytelling, atmosphere, and reservation workflows.',
  },
  {
    title: 'E-Commerce Brands',
    desc: 'Direct-to-consumer lifestyle brands looking for editorial product display, aesthetic filtering systems, and effortless checkout funnels.',
  },
  {
    title: 'Healthcare & Wellness',
    desc: 'Medical clinics, wellness studios, and specialized health practices needing reassuring visual design, patient education, and clear booking paths.',
  },
  {
    title: 'High-End Local Businesses',
    desc: 'Established regional businesses looking to stand out from generic local competitors with modern editorial credibility.',
  },
  {
    title: 'Creators & Modern Studios',
    desc: 'Design studios, production companies, and creative directors needing portfolio websites that reflect their exacting aesthetic standards.',
  },
  {
    title: 'Established Business Redesigns',
    desc: 'Companies with 5-to-10-year-old websites whose digital presence no longer matches their actual market reputation and team scale.',
  },
]


const HANDOFF_STEPS = [
  {
    icon: PenTool,
    title: 'Figma Auto-Layout & Tokens',
    desc: 'Designs are constructed using real CSS box-model principles (flexbox/grid) so layouts translate 1:1 into code without guesswork.',
  },
  {
    icon: Grid,
    title: 'Standardized Component Library',
    desc: 'Every button, badge, modal, and input is a reusable master component with defined states, reducing engineering build hours.',
  },
  {
    icon: Code2,
    title: 'Next.js & React Ready',
    desc: 'Tokenized CSS variables and typography classes map directly to Tailwind CSS or modern CSS variables for rapid production frontend code.',
  },
  {
    icon: FolderSync,
    title: 'In-House Studio Synergy',
    desc: 'Because Stack houses both design and engineering teams under one roof, there is zero disconnect between creative vision and the live website.',
  },
]

export default function WebsiteDesignPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <main className="w-full bg-[#FAF7F2] text-neutral-900 pt-[72px] lg:pt-[80px]">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="relative w-full overflow-hidden pt-4 sm:pt-6 lg:pt-12 pb-12 sm:pb-16 lg:pb-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE HERO COMPOSITION (< lg)                                            */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                WEBSITE DESIGN
              </span>
              <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
            </div>

            <h1 className="text-[32px] sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
              Websites designed for<br />
              <span className="font-serif italic font-normal text-[#9E6941]">your business.</span>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              We create modern website designs that clearly communicate your brand, make it easy for customers to find what they need, and guide them toward taking action.
            </p>

            {/* Visual Artboard Showcase */}
            <div className="my-5 sm:my-7 flex justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[400px]">
                <WebDesignHeroVisual />
              </div>
            </div>

            {/* Touch Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Website%20Design%20Project"
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-150"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                href="#design-portfolio"
                className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full border border-black/[0.12] bg-white/70 active:bg-white text-neutral-900 font-medium text-sm transition-all duration-150"
              >
                <span>See Our Work</span>
              </Link>
            </div>

            {/* Trust Meta Strip */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-y-2 text-[11px] sm:text-xs text-neutral-700 font-medium select-none">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Clear &amp; Modern Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Responsive on Every Device</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Built Around Your Brand</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP HERO COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT  */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    WEBSITE DESIGN
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Websites designed for<br />
                  <span className="font-serif italic font-normal text-[#9E6941]">your business.</span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  We create modern website designs that clearly communicate your brand, make it easy for customers to find what they need, and guide them toward taking action.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href="mailto:hello@stack.studio?subject=Start%20a%20Website%20Design%20Project"
                    className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  <Link
                    href="#design-portfolio"
                    className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-black font-medium text-sm sm:text-[15px] underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
                  >
                    <span>See Our Work</span>
                  </Link>
                </div>

                {/* Trust Meta */}
                <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Clear &amp; Modern Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Responsive on Every Device</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Built Around Your Brand</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Design Studio Artboard Visual */}
              <div className="lg:col-span-6 xl:col-span-6">
                <WebDesignHeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WEBSITE DESIGN ACTUALLY MEANS ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  BEYOND THE SURFACE
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Good website design does more than look beautiful.
              </h2>
              <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal">
                A well-designed website helps people understand your business, find what they need, trust your brand, and take the next step.
              </p>
              <div className="my-4 p-4 rounded-xl border border-black/[0.08] bg-white/70">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6941] mb-1">
                  STRATEGIC IMPACT
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Great design makes your message clearer, your business easier to understand, and it easier for visitors to become customers.
                </p>
              </div>
            </div>

            {/* 6 Core Pillars 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-5">
              {PILLARS_DATA.map((pillar) => {
                const IconComponent = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.07] bg-white flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2.5 text-[#9E6941]">
                        <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    BEYOND THE SURFACE
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-tight">
                  Good website design does more than look beautiful.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  A well-designed website helps people understand your business, find what they need, trust your brand, and take the next step.
                </p>
                <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl border border-black/[0.08] bg-white/70">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9E6941] mb-2">
                    STRATEGIC IMPACT
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Great design makes your message clearer, your business easier to understand, and it easier for visitors to become customers.
                  </p>
                </div>
              </div>

              {/* Right Column: 6 Core Pillars of Impact */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {PILLARS_DATA.map((pillar) => {
                  const IconComponent = pillar.icon
                  return (
                    <div
                      key={pillar.title}
                      className="p-5 sm:p-6 rounded-xl border border-black/[0.07] bg-white flex flex-col justify-between hover:border-black/[0.2] transition-colors"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                          <IconComponent className="w-5 h-5 text-[#9E6941]" />
                        </div>
                        <h3 className="text-base font-bold text-neutral-950 mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. OUR WEBSITE DESIGN SERVICES ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  WEBSITE DESIGN SERVICES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Website design services for your business.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                We design websites that are clear, professional, easy to use, and built around your brand, customers, and business goals.
              </p>
            </div>

            {/* 8 Services 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {SERVICES_DATA.map((service, idx) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={service.title}
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2.5 text-[#9E6941]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-[#9E6941] uppercase tracking-wider block mb-1">
                        SERVICE 0{idx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                        {service.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  WEBSITE DESIGN SERVICES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Website design services for your business.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                We design websites that are clear, professional, easy to use, and built around your brand, customers, and business goals.
              </p>
            </div>

            {/* 8 Individual Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_DATA.map((service, idx) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={service.title}
                    className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.22] transition-colors"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 text-[#9E6941]" />
                      </div>
                      <span className="text-[10.5px] font-mono font-semibold text-[#9E6941] uppercase tracking-wider block mb-1">
                        SERVICE 0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-neutral-950 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>



        {/* ─── 6. RESPONSIVE WEBSITE DESIGN ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  MULTI-DEVICE HARMONY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Responsive design across desktop, tablet, and mobile.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Over 60% of modern web traffic originates from handheld screens.
                We design fluid, adaptive layouts where typography scales smoothly,
                touch targets expand, and navigation remains effortless.
              </p>
            </div>

            <ResponsiveDeviceShowcase />
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-3xl mb-10 sm:mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  MULTI-DEVICE HARMONY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Responsive design across desktop, tablet, and mobile.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Over 60% of modern web traffic originates from handheld screens.
                We design fluid, adaptive layouts where typography scales smoothly,
                touch targets expand, and navigation remains effortless on any device.
              </p>
            </div>

            <ResponsiveDeviceShowcase />
          </div>
        </section>



        {/* ─── 9. DESIGN VS TEMPLATE ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  HONEST COMPARISON
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Custom website or template?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Both can work, but the right choice depends on your goals, budget, and how much flexibility your business needs.
              </p>
            </div>

            <DesignVsTemplateTable />
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-14">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  HONEST COMPARISON
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Custom website or template?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Both can work, but the right choice depends on your goals, budget, and how much flexibility your business needs.
              </p>
            </div>

            <DesignVsTemplateTable />
          </div>
        </section>

        {/* ─── 10. WHAT AFFECTS WEBSITE DESIGN COST ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TRANSPARENT SCOPE FACTORS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                What affects the cost of website design?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Website design pricing depends strictly on architectural scope,
                depth of UX research, and custom asset production. We provide clear,
                fixed-fee proposals based on these fundamental variables.
              </p>
            </div>

            {/* 8 Cost Factors 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {COST_FACTORS.map((item) => (
                <div
                  key={item.factor}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                      {item.factor}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-4">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TRANSPARENT SCOPE FACTORS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What affects the cost of website design?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Website design pricing depends strictly on architectural scope,
                depth of UX research, and custom asset production. We provide clear,
                fixed-fee proposals based on these fundamental variables.
              </p>
            </div>

            {/* 8 Cost Factors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COST_FACTORS.map((item) => (
                <div
                  key={item.factor}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.factor}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 11. WHO WE DESIGN FOR ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  OUR CLIENT PARTNERS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Who we design websites for.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                We partner with ambitious founders, established companies, and
                creative brands who understand that their digital storefront is
                their most valuable marketing asset.
              </p>
            </div>

            {/* 8 Client Partners 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {CLIENT_PARTNERS.map((client) => (
                <div
                  key={client.title}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                      {client.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-4">
                      {client.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  OUR CLIENT PARTNERS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Who we design websites for.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                We partner with ambitious founders, established companies, and
                creative brands who understand that their digital storefront is
                their most valuable marketing asset.
              </p>
            </div>

            {/* 8 Industry Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CLIENT_PARTNERS.map((client) => (
                <div
                  key={client.title}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {client.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {client.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 12. OUR RECENT WORK (MATCHES HOMEPAGE & WEB-DEV) ─── */}
        <div id="design-portfolio" className="sr-only" />
        <WorkSection id="portfolio" />

        {/* ─── 13. TECHNOLOGY / DESIGN HANDOFF ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  DEVELOPMENT-READY HANDOFF
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                How design seamlessly bridges into engineering.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                A design is only as good as its implementation. We don’t deliver
                static pictures that leave developers guessing—we create structured,
                component-driven design files tailored for modern web frameworks.
              </p>
            </div>

            {/* 4 Steps 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {HANDOFF_STEPS.map((step) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={step.title}
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2.5 text-[#9E6941]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-4">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-14">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  DEVELOPMENT-READY HANDOFF
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                How design seamlessly bridges into engineering.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                A design is only as good as its implementation. We don’t deliver
                static pictures that leave developers guessing—we create structured,
                component-driven design files tailored for modern web frameworks.
              </p>
            </div>

            {/* 4 Steps of Engineering Bridge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HANDOFF_STEPS.map((step) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={step.title}
                    className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 text-[#9E6941]" />
                      </div>
                      <h3 className="text-base font-bold text-neutral-950 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── 14. WEBSITE DESIGN FAQ ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  DESIGN FAQ
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Frequently asked questions about website design.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Have questions regarding timelines, revision rounds, brand
                assets, or post-design engineering? We are here to help.
              </p>
            </div>

            {/* Accordion directly beneath heading on mobile */}
            <WebDesignFaqAccordion />

            {/* Contact box placed below accordion on mobile */}
            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-[#F5F1EA]/60 shadow-xs">
              <p className="text-xs font-semibold text-neutral-900 mb-0.5">
                Have a specific design brief?
              </p>
              <p className="text-xs text-neutral-500 mb-2.5">
                Share your wireframes or current site link with our team.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=Question%20about%20Website%20Design"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] active:text-[#7d502e] transition-colors"
              >
                <span>hello@stack.studio</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column */}
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                      DESIGN FAQ
                    </span>
                    <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                    Frequently asked questions about website design.
                  </h2>
                  <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Have questions regarding timelines, revision rounds, brand
                    assets, or post-design engineering? We are here to help.
                  </p>

                  <div className="mt-6 sm:mt-8 p-5 rounded-xl border border-black/[0.08] bg-[#F5F1EA]/60">
                    <p className="text-xs font-semibold text-neutral-900 mb-1">
                      Have a specific design brief?
                    </p>
                    <p className="text-xs text-neutral-500 mb-3">
                      Share your wireframes or current site link with our team.
                    </p>
                    <a
                      href="mailto:hello@stack.studio?subject=Question%20about%20Website%20Design"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                    >
                      <span>hello@stack.studio</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Accordion */}
              <div className="lg:col-span-8">
                <WebDesignFaqAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 15. FINAL CALL TO ACTION ─── */}
        <section className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#FAF7F2] text-center overflow-hidden">
          {/* Ambient warm radial wash */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-40 blur-3xl pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(245, 230, 208, 0.8) 0%, rgba(250, 247, 242, 0) 70%)',
            }}
          />

          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden relative z-10 w-full px-5 sm:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] bg-white text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY FOR A BETTER WEBSITE?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
              Let&apos;s design something{' '}
              <span className="text-[#9E6941]">your customers remember.</span>
            </h2>

            <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal max-w-sm mx-auto">
              Tell us about your business, current website, aesthetic goals, and
              commercial requirements. We will schedule a discovery consultation
              and outline a tailored design roadmap.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 max-w-xs mx-auto">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Website%20Design%20Project"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/#work"
                className="text-neutral-900 text-sm font-medium underline underline-offset-[5px] decoration-neutral-400 py-1"
              >
                View Our Work
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-neutral-500">
              We respond within 24 hours. Fixed-fee proposals with zero obligation.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block relative z-10 max-w-3xl mx-auto px-6 sm:px-10">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/[0.08] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY FOR A BETTER WEBSITE?</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1]">
              Let&apos;s design something{' '}
              <span className="text-[#9E6941]">your customers remember.</span>
            </h2>

            {/* Body */}
            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl mx-auto">
              Tell us about your business, current website, aesthetic goals, and
              commercial requirements. We will schedule a discovery consultation
              and outline a tailored design roadmap.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Website%20Design%20Project"
                className="group inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                href="/#work"
                className="text-neutral-900 hover:text-black font-medium text-sm sm:text-base underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
              >
                View Our Work
              </Link>
            </div>

            {/* Response time */}
            <p className="mt-8 text-xs text-neutral-500">
              We respond within 24 hours. Fixed-fee proposals with zero obligation.
            </p>
          </div>
        </section>

        {/* ─── 16. REUSED SITE FOOTER ─── */}
        <Footer />
      </main>
    </>
  )
}
