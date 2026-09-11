import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  ExternalLink,
  Code2,
  Sliders,
  Database,
  LineChart,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import HeroVisual from '@/components/webdev/HeroVisual'
import FaqAccordion from '@/components/webdev/FaqAccordion'
import { FAQ_DATA } from '@/components/webdev/faqData'
import ComparisonTable from '@/components/webdev/ComparisonTable'

export const metadata: Metadata = {
  title: 'Web Development Services — Websites Built to Perform | Stack',
  description:
    'Stack designs and develops fast, responsive, scalable custom websites for growing businesses. Engineered with Next.js, TypeScript, modern CMS platforms, and Core Web Vitals excellence.',
  alternates: {
    canonical: 'https://stack.studio/web-development',
  },
  openGraph: {
    title: 'Web Development Services — Websites Built to Perform | Stack',
    description:
      'Stack designs and develops fast, responsive, scalable custom websites for growing businesses. Engineered with Next.js, modern CMS platforms, and Core Web Vitals excellence.',
    url: 'https://stack.studio/web-development',
    siteName: 'Stack Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Services — Websites Built to Perform | Stack',
    description:
      'Fast, responsive, and scalable custom websites for modern businesses. Built by Stack.',
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
      name: 'Web Development Services',
      item: 'https://stack.studio/web-development',
    },
  ],
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Web Development Services',
  serviceType: 'Web Development',
  provider: {
    '@type': 'Organization',
    name: 'Stack Studio',
    url: 'https://stack.studio',
  },
  description:
    'Design and development of custom, responsive, high-performance web applications, marketing websites, and CMS-powered platforms.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Business Websites',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Responsive Frontend Engineering',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performance & Core Web Vitals Optimization',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CMS Architecture & Integration',
        },
      },
    ],
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const SCOPE_ITEMS = [
  {
    title: 'Custom Business Websites',
    desc: 'Tailored digital flagships built to communicate credibility, present your services clearly, and convert prospective clients.',
  },
  {
    title: 'Marketing & Landing Pages',
    desc: 'High-converting campaign landing pages optimized for search visibility, targeted paid traffic, and fast lead generation.',
  },
  {
    title: 'Responsive Cross-Device Layouts',
    desc: 'Fluid user interfaces designed to look sharp, load quickly, and function intuitively on phones, tablets, and large displays.',
  },
  {
    title: 'CMS-Powered Content Hubs',
    desc: 'Intuitive publishing setups that let your marketing team edit text, upload media, and launch blog posts without engineering help.',
  },
  {
    title: 'Custom Frontend Development',
    desc: 'Clean, modern interfaces engineered using React and Next.js, eliminating legacy bloat and sluggish script execution.',
  },
  {
    title: 'API & Third-Party Integrations',
    desc: 'Direct connections to your CRM, booking engines, payment gateways (Stripe), email providers, and custom databases.',
  },
  {
    title: 'Performance & Speed Optimization',
    desc: 'Fine-tuned asset loading and server-side rendering that achieve top Google Core Web Vitals scores and reduce bounce rates.',
  },
  {
    title: 'Deployment, DNS & Launch',
    desc: 'Thorough pre-flight checks, secure domain setup, automated SSL, and cloud deployment with zero business disruption.',
  },
]

const CAPABILITIES_DATA = [
  {
    icon: Smartphone,
    title: 'Responsive Development',
    summary:
      'Pixel-precise layouts that adapt dynamically to any viewport. No broken horizontal scrolls, no illegible text on mobile.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    summary:
      'Optimized image compression, clean code splitting, and sub-second initial load times that keep visitors engaged.',
  },
  {
    icon: Search,
    title: 'SEO Foundations',
    summary:
      'Semantic HTML5 structure, structured metadata, canonical tags, automated XML sitemaps, and robots.txt setup.',
  },
  {
    icon: ShieldCheck,
    title: 'Accessibility (a11y)',
    summary:
      'High-contrast color palettes, accessible focus states, keyboard navigation support, and clean ARIA labels.',
  },
  {
    icon: Layers,
    title: 'Modern CMS Setup',
    summary:
      'A user-friendly visual editor configured around your exact content structure so your team can make updates without risk.',
  },
  {
    icon: LineChart,
    title: 'Analytics & Tracking',
    summary:
      'Complete integration with Google Analytics 4, Plausible, or PostHog, including custom conversion event triggers.',
  },
  {
    icon: Sliders,
    title: 'Third-Party Integrations',
    summary:
      'Seamless wiring with booking forms, newsletter subscriptions, payment gateways, and CRM lead capture.',
  },
  {
    icon: Cpu,
    title: 'Edge Deployment',
    summary:
      'Global cloud deployment on fast edge networks (Vercel/AWS) with automated backup, SSL encryption, and high uptime.',
  },
]

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Discovery',
    body: 'We study your business model, target market, audience pain points, and current technical assets to define clear requirements and measurable KPIs.',
  },
  {
    step: '02',
    title: 'Planning & Architecture',
    body: 'We establish the sitemap, determine content hierarchy, select the right CMS configuration, and produce interactive wireframes to validate layout flow.',
  },
  {
    step: '03',
    title: 'Design & Prototyping',
    body: 'We design bespoke desktop and mobile Figma prototypes, applying your brand identity with typography, responsive spacing, and micro-interactions.',
  },
  {
    step: '04',
    title: 'Production Development',
    body: 'We turn approved designs into clean, modular code using Next.js and Tailwind CSS, wire up the CMS, and integrate all required third-party APIs.',
  },
  {
    step: '05',
    title: 'Rigorous Testing & QA',
    body: 'We execute comprehensive cross-browser testing, mobile device audits, form validation checks, accessibility reviews, and Core Web Vitals speed tuning.',
  },
  {
    step: '06',
    title: 'Launch & Handoff',
    body: 'We deploy to production, verify DNS and SSL certificates, test analytics and sitemap indexing, and train your team on day-to-day content updates.',
  },
]

const AUDIENCE_SECTORS = [
  {
    sector: 'Startups & Ventures',
    summary:
      'Fast-moving founders who need a polished digital front to build credibility with investors and convert early adopters.',
  },
  {
    sector: 'Professional Services',
    summary:
      'Law firms, accounting practices, and consultancies where professional reputation and high-trust lead capture are critical.',
  },
  {
    sector: 'Hospitality & Restaurants',
    summary:
      'Venues and dining groups requiring atmospheric visual storytelling, seamless menu viewing, and reservation bookings.',
  },
  {
    sector: 'SaaS & Tech Products',
    summary:
      'Software companies needing clear product storytelling, feature breakdowns, transparent pricing tables, and demo requests.',
  },
  {
    sector: 'Agencies & Studios',
    summary:
      'Creative firms and marketing agencies that require bespoke case studies, interactive project showcases, and editorial flair.',
  },
  {
    sector: 'E-Commerce Brands',
    summary:
      'Direct-to-consumer businesses needing fast, distraction-free product discovery, custom filtering, and high-converting checkout.',
  },
  {
    sector: 'Local Businesses',
    summary:
      'High-quality local contractors, clinics, and specialists that want to outperform competitors on Google Search.',
  },
  {
    sector: 'Established Rebuilds',
    summary:
      'Companies with slow, legacy WordPress sites that need a clean modernization without losing hard-earned SEO authority.',
  },
]

const TECH_STACK = [
  {
    tech: 'Next.js',
    tagline: 'Server-Side Rendering & Speed',
    benefit:
      'Provides pre-rendered HTML for instant search engine indexing and lightning-fast page changes without jarring full-page refreshes.',
  },
  {
    tech: 'React',
    tagline: 'Component-Driven Architecture',
    benefit:
      'Enables modular, reusable user interface components that reduce development time, prevent styling bugs, and scale cleanly.',
  },
  {
    tech: 'TypeScript',
    tagline: 'Type-Safe Reliability',
    benefit:
      'Catches errors before code reaches production, resulting in higher application stability, fewer bugs, and easier future updates.',
  },
  {
    tech: 'Tailwind CSS',
    tagline: 'Ultra-Lean Styling',
    benefit:
      'Generates only the CSS your site actually uses, eliminating heavy stylesheet bloat and ensuring fast mobile rendering.',
  },
  {
    tech: 'Node.js',
    tagline: 'High-Throughput Backend',
    benefit:
      'Powers serverless API routes, form processing, secure authentication, and real-time data sync with high performance.',
  },
  {
    tech: 'Headless CMS',
    tagline: 'Effortless Publishing',
    benefit:
      'Separates content management from code, allowing non-technical staff to publish updates safely without risking site downtime.',
  },
]

const PERFORMANCE_METRICS = [
  {
    metric: 'LCP',
    title: 'Largest Contentful Paint',
    what: 'How fast the main headline and hero visual become visible.',
    how: 'We optimize critical render paths, pre-load essential typography, and serve modern WebP/AVIF images to achieve sub-second LCP.',
  },
  {
    metric: 'INP',
    title: 'Interaction to Next Paint',
    what: 'How instantaneously buttons, toggles, and menus respond when clicked.',
    how: 'We eliminate long JavaScript execution bottlenecks so user taps and clicks yield instant visual feedback with zero perceptible delay.',
  },
  {
    metric: 'CLS',
    title: 'Cumulative Layout Shift',
    what: 'How stable the page layout remains as images and fonts load.',
    how: 'We enforce explicit aspect ratios on all media and reserve font display space, eliminating frustrating content jumping.',
  },
  {
    metric: 'IMG',
    title: 'Modern Image Optimization',
    what: 'Serving right-sized images for each individual screen.',
    how: 'Images are automatically compressed and delivered in next-gen formats, reducing mobile page weight by up to 70%.',
  },
  {
    metric: 'CODE',
    title: 'Clean, Unbloated Architecture',
    what: 'Zero redundant plugins, unused scripts, or bloated libraries.',
    how: 'By writing clean custom components, we avoid the 40+ third-party scripts typical of WordPress themes, saving battery and bandwidth.',
  },
  {
    metric: 'SEO',
    title: 'Technical Search Architecture',
    what: 'Ensuring search spiders can parse and index every word.',
    how: 'Server-side rendered HTML guarantees search engines see clean content immediately without relying on client JavaScript execution.',
  },
]

const COST_DRIVERS = [
  {
    factor: 'Page Count & Content Depth',
    detail:
      'A focused 5-page marketing site requires significantly less architectural effort than a 30-page corporate hub with distinct layout templates.',
  },
  {
    factor: 'Design Complexity & Craft',
    detail:
      'Bespoke editorial layouts with interactive visual storytelling require custom Figma design systems compared to standardized structures.',
  },
  {
    factor: 'Content Management Architecture',
    detail:
      'Configuring a simple blog requires minimal setup. Tailoring an enterprise headless CMS with multiple content models requires custom schema modeling.',
  },
  {
    factor: 'Third-Party & API Integrations',
    detail:
      'Basic contact forms are simple. Secure integration with CRM pipelines, real-time inventory systems, or custom API endpoints adds engineering depth.',
  },
  {
    factor: 'E-Commerce & Transactions',
    detail:
      'Implementing payment gateways, variant selectors, multi-currency support, shipping rules, and tax compliance expands development scope.',
  },
  {
    factor: 'Custom Interactivity & Micro-Motion',
    detail:
      'Interactive product configurators, calculators, and fluid scroll-linked animations require careful mathematical physics and performance tuning.',
  },
  {
    factor: 'Content Migration & SEO Preservation',
    detail:
      'Migrating hundreds of existing blog posts, images, and customer accounts while safeguarding organic rankings with 301 redirects requires diligent QA.',
  },
  {
    factor: 'Security & Compliance Needs',
    detail:
      'GDPR/CCPA compliant cookie consent, custom access roles, multi-factor authentication, and data privacy hardening increase configuration time.',
  },
  {
    factor: 'Ongoing Support & SLA',
    detail:
      'Post-launch agreements, scheduled performance reviews, continuous dependency upgrades, and prioritized bug fixes provide ongoing peace of mind.',
  },
]

const FEATURED_PROJECTS = [
  {
    name: 'SAVOR',
    type: 'Restaurant Website',
    desc: 'A premium culinary platform focused on atmosphere, storytelling, and effortless online table reservations.',
    image: '/projects/project1.png',
    alt: 'Savor Restaurant Website Design & Development by Stack',
  },
  {
    name: 'VELORA',
    type: 'E-Commerce Platform',
    desc: 'A modern direct-to-consumer store built for fast product browsing, simplified filtering, and higher conversion.',
    image: '/projects/project2.png',
    alt: 'Velora E-Commerce Store Design & Development by Stack',
  },
  {
    name: 'MOBL',
    type: 'Product & Tech Website',
    desc: 'A bold, high-performance product website engineered to showcase hardware innovation and engage global customers.',
    image: '/projects/project3.png',
    alt: 'Mobl Product Website Engineering by Stack',
  },
]

export default function WebDevelopmentPage() {
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
        <section className="relative w-full overflow-hidden pt-4 sm:pt-6 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE HERO COMPOSITION (< lg)                                            */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            {/* Small Eyebrow */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                WEB DEVELOPMENT
              </span>
              <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
              Websites built to{' '}
              <span className="font-serif italic font-normal text-[#9E6941]">
                perform.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              Stack designs and develops fast, responsive, scalable websites for
              businesses that want a stronger online presence. Every site is
              custom-engineered for sub-second speeds, intuitive usability, and
              measurable growth.
            </p>

            {/* Visual Asset: Sized and centered with annotation */}
            <div className="mt-6 mb-3 w-full max-w-[380px] sm:max-w-[440px] mx-auto">
              <HeroVisual />
            </div>

            {/* Mobile Actions Stack */}
            <div className="mt-5 space-y-2.5">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Web%20Project"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="#portfolio"
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full border border-black/[0.1] bg-white text-neutral-900 font-medium text-sm active:bg-neutral-50 transition-colors"
              >
                <span>View Our Work</span>
                <span className="text-xs">↓</span>
              </Link>
            </div>

            {/* Quick Trust Meta */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-x-4 text-xs text-neutral-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Mobile-First Responsive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Custom Next.js & CMS</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* DESKTOP HERO COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT  */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-12 gap-8 xl:gap-14 items-center">
              {/* Left Column: Eyebrow, H1, Copy, CTAs */}
              <div className="col-span-6 flex flex-col justify-center">
                {/* Small Eyebrow */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    WEB DEVELOPMENT
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Websites built to<br />
                  <span className="font-serif italic font-normal text-[#9E6941]">perform.</span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  Stack designs and develops fast, responsive, scalable websites
                  for businesses that want a stronger online presence. Every site
                  is custom-engineered for sub-second speeds, intuitive usability,
                  and measurable growth.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href="mailto:hello@stack.studio?subject=Start%20a%20Web%20Project"
                    className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  <Link
                    href="#portfolio"
                    className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-black font-medium text-sm sm:text-[15px] underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
                  >
                    <span>View Our Work</span>
                    <span className="text-xs">↓</span>
                  </Link>
                </div>

                {/* Quick Trust Meta */}
                <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Mobile-First Responsive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Core Web Vitals Optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Custom Next.js & CMS Solutions</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Refined Hero Visual */}
              <div className="col-span-6">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. INTRO / WHAT WE DO ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE SCOPE COMPOSITION (< lg)                                           */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            {/* Heading & Context */}
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  OUR SCOPE
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Everything required to bring your digital presence to life.
              </h2>
              <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal">
                We don&apos;t just write code; we solve commercial challenges.
                Whether you need a brand-new marketing platform or a complete
                technical overhaul, our web development service handles the full
                lifecycle from architecture to post-launch support.
              </p>
              <div className="mt-5 mb-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                >
                  <span>Discuss your project requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Compact, Polished Mobile Scope Cards */}
            <div className="flex flex-col gap-3">
              {SCOPE_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border border-black/[0.07] bg-white/75 active:bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-1.5 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-neutral-950 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pl-0.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP SCOPE COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Heading & Context */}
              <div className="col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    OUR SCOPE
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-tight">
                  Everything required to bring your digital presence to life.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  We don&apos;t just write code; we solve commercial challenges.
                  Whether you need a brand-new marketing platform or a complete
                  technical overhaul, our web development service handles the full
                  lifecycle from architecture to post-launch support.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Discuss your project requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 8 Core Areas (Written for Business Owners) */}
              <div className="col-span-7 grid grid-cols-2 gap-6 sm:gap-7">
                {SCOPE_ITEMS.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-5 sm:p-6 rounded-xl border border-black/[0.07] bg-white/70 hover:bg-white transition-all duration-200"
                  >
                    <span className="text-[11px] font-mono font-semibold text-[#9E6941] mb-2 block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-neutral-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. WHAT YOU GET (CAPABILITIES GRID) ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STANDARD CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                What you get with every website.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                We believe core standards like speed, security, and responsive craft should not be expensive add-ons. Here is what comes standard in every project we build.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {CAPABILITIES_DATA.map((cap) => {
                const IconComp = cap.icon
                return (
                  <div
                    key={cap.title}
                    className="p-3.5 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2.5">
                        <IconComp className="w-3.5 h-3.5 text-[#9E6941]" />
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-semibold text-neutral-950 mb-1 leading-snug">
                        {cap.title}
                      </h3>
                      <p className="text-[11px] text-neutral-600 leading-snug font-normal">
                        {cap.summary}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STANDARD CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What you get with every website.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                We believe core standards like speed, security, and responsive
                craft should not be expensive add-ons. Here is what comes standard
                in every project we build.
              </p>
            </div>

            {/* 8 Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITIES_DATA.map((cap) => {
                const IconComp = cap.icon
                return (
                  <div
                    key={cap.title}
                    className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                        <IconComp className="w-5 h-5 text-[#9E6941]" />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-950 mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                        {cap.summary}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── 4. OUR DEVELOPMENT PROCESS ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STEP-BY-STEP
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Our development process.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Structured, transparent, and collaborative. We guide you through each stage with clear milestones and no technical jargon.
              </p>
            </div>

            <div className="space-y-3">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-4 rounded-xl border border-black/[0.08] bg-white relative flex gap-3.5 items-start shadow-xs"
                >
                  <span className="text-base font-black text-[#9E6941] tracking-tight shrink-0 font-mono px-2 py-1 rounded bg-[#FAF7F2] border border-black/[0.06]">
                    {stage.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-950 mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {stage.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STEP-BY-STEP
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Our development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Structured, transparent, and collaborative. We guide you through
                each stage with clear milestones, regular progress reviews, and no
                technical jargon.
              </p>
            </div>

            {/* 6-Stage Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-6 sm:p-7 rounded-xl border border-black/[0.08] bg-white relative flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#9E6941] tracking-tight block mb-3 font-mono">
                      {stage.step}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-950 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed">
                      {stage.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. BUILT FOR REAL BUSINESSES ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  AUDIENCE & FIT
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Built for businesses with real commercial goals.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                We do not build vanity projects or template clones. Our web development services are engineered for organisations where digital trust and lead quality directly impact the bottom line.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {AUDIENCE_SECTORS.map((item) => (
                <div
                  key={item.sector}
                  className="p-3.5 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-neutral-950 mb-1 leading-snug">
                      {item.sector}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-snug font-normal">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  AUDIENCE & FIT
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Built for businesses with real commercial goals.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                We do not build vanity projects or template clones. Our web
                development services are engineered for organisations where
                digital trust, reliability, and lead quality directly impact the
                bottom line.
              </p>
            </div>

            {/* Audience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {AUDIENCE_SECTORS.map((item) => (
                <div
                  key={item.sector}
                  className="p-5 sm:p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.sector}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. TECHNOLOGY (CLIENT-CENTRIC) ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TECHNOLOGY STACK
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Modern tools chosen for real business advantages.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                We don&apos;t chase fleeting software trends. We build exclusively with modern, battle-tested technologies that deliver measurable business outcomes.
              </p>

              <div className="mt-3.5 p-3 rounded-lg bg-[#FAF7F2] border border-black/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  What this means for your business:
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Zero reliance on fragile third-party plugins, instant page transitions, and clean code that any competent engineer can maintain for years to come.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {TECH_STACK.map((item) => (
                <div
                  key={item.tech}
                  className="p-3.5 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-sm font-bold text-neutral-950 font-mono block">
                      {item.tech}
                    </span>
                    <span className="text-[10px] font-semibold text-[#9E6941] tracking-wide uppercase block mt-0.5 mb-1.5">
                      {item.tagline}
                    </span>
                    <p className="text-[11px] text-neutral-600 leading-snug font-normal">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    TECHNOLOGY STACK
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                  Modern tools chosen for real business advantages.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  We don&apos;t chase fleeting software trends. We build
                  exclusively with modern, battle-tested technologies that deliver
                  measurable business outcomes: faster load times, superior
                  search indexing, rock-solid security, and low ongoing maintenance
                  costs.
                </p>
                <div className="mt-6 pt-6 border-t border-black/[0.06]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    What this means for your business:
                  </p>
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                    Zero reliance on fragile third-party page builder plugins,
                    instant page transitions, and clean code that any competent
                    engineer can maintain for years to come.
                  </p>
                </div>
              </div>

              {/* Right Column: Key Technologies Stack Uses */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {TECH_STACK.map((item) => (
                  <div
                    key={item.tech}
                    className="p-5 sm:p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-neutral-950 font-mono">
                          {item.tech}
                        </span>
                        <span className="text-[11px] font-semibold text-[#9E6941] tracking-wide uppercase">
                          {item.tagline}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                        {item.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. WEBSITE PERFORMANCE & CORE WEB VITALS ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  ENGINEERING RIGOR
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Website performance is not a luxury — it is your bottom line.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Google explicitly penalizes sluggish websites, and over 50% of mobile visitors abandon pages that take longer than 3 seconds to load. We treat performance as a foundational engineering requirement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERFORMANCE_METRICS.map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-black/[0.08] text-[11px] font-mono font-bold text-neutral-900">
                        {item.metric}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Target: Top 10%
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 mb-2 font-normal">
                      {item.what}
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-normal pt-2 border-t border-black/[0.05]">
                      {item.how}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  ENGINEERING RIGOR
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Website performance is not a luxury — it is your bottom line.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Google explicitly penalizes sluggish websites, and over 50% of
                mobile visitors abandon pages that take longer than 3 seconds to
                load. We treat performance as a foundational engineering requirement.
              </p>
            </div>

            {/* Performance Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {PERFORMANCE_METRICS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#FAF7F2] border border-black/[0.08] text-xs font-mono font-bold text-neutral-900">
                        {item.metric}
                      </span>
                      <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Target: Top 10%
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-950 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mb-3 font-normal">
                      {item.what}
                    </p>
                    <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal pt-3 border-t border-black/[0.05]">
                      {item.how}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. WEB DEVELOPMENT VS WEBSITE BUILDER ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  HONEST COMPARISON
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Custom web development vs. website builders.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Platforms like Wix, Squarespace, and basic WordPress themes have their place. But as soon as your website becomes a primary commercial sales engine, generic builders quickly become an expensive ceiling.
              </p>
            </div>

            <ComparisonTable />
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-14">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  HONEST COMPARISON
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Custom web development vs. website builders.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Platforms like Wix, Squarespace, and basic WordPress themes have
                their place. If you are validating an unproven hobby idea with no
                budget, a builder is often the right first step. But as soon as
                your website becomes a primary commercial sales engine, generic
                builders quickly become an expensive ceiling.
              </p>
            </div>

            {/* Comparison Table */}
            <ComparisonTable />
          </div>
        </section>

        {/* ─── 9. WHAT AFFECTS WEBSITE DEVELOPMENT COST ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TRANSPARENT PRICING DRIVERS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                What actually determines website development cost?
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Agencies that quote flat rates before understanding your requirements either cut corners or overcharge. Real development pricing is determined by scope, technical complexity, and commercial requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COST_DRIVERS.map((item, idx) => (
                <div
                  key={item.factor}
                  className="p-3.5 rounded-xl border border-black/[0.07] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-xs sm:text-[13px] font-bold text-neutral-950">
                        {item.factor}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold text-[#9E6941]">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Quote Guidance Box */}
            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col gap-3.5 shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-neutral-950 mb-1">
                  Need an accurate estimate for your website?
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Tell us about your project scope, timeline, and goals. We provide clear, transparent, fixed-fee proposals with zero hidden fees.
                </p>
              </div>
              <a
                href="mailto:hello@stack.studio?subject=Request%20a%20Quote"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-medium transition-colors"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TRANSPARENT PRICING DRIVERS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What actually determines website development cost?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Agencies that quote flat rates before understanding your
                requirements either cut corners or overcharge. Real development
                pricing is determined by scope, technical complexity, and
                commercial requirements.
              </p>
            </div>

            {/* Cost Drivers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COST_DRIVERS.map((item) => (
                <div
                  key={item.factor}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.factor}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Guidance Box */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-black/[0.08] bg-white max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Need an accurate estimate for your website?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Tell us about your project scope, timeline, and goals. We
                  provide clear, transparent, fixed-fee proposals with zero
                  hidden fees.
                </p>
              </div>
              <a
                href="mailto:hello@stack.studio?subject=Request%20a%20Quote"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── 10. REAL PORTFOLIO ─── */}
        <section
          id="portfolio"
          className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]"
        >
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  FEATURED WORK
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Real projects engineered by Stack.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Explore websites we have designed and developed for ambitious clients across hospitality, commerce, and consumer tech.
              </p>
              <div className="mt-3">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300"
                >
                  <span>Explore all case studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {FEATURED_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-black/[0.08] bg-white overflow-hidden shadow-xs"
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden border-b border-black/[0.06]">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#9E6941] mb-1 block">
                        {project.type}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-950 mb-1.5">
                        {project.name}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
                      <Link
                        href="/#work"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-[#9E6941] transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Next.js
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    FEATURED WORK
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                  Real projects engineered by Stack.
                </h2>
                <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Explore websites we have designed and developed for ambitious
                  clients across hospitality, commerce, and consumer tech.
                </p>
              </div>

              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-black underline underline-offset-4 decoration-neutral-300 transition-colors"
              >
                <span>Explore all case studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Real Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {FEATURED_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="group flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-xs hover:border-black/[0.25] transition-all duration-300"
                >
                  {/* Real Project Image */}
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden border-b border-black/[0.06]">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#9E6941] mb-2 block">
                        {project.type}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-950 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-center justify-between">
                      <Link
                        href="/#work"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:text-[#9E6941] transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Next.js
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 11. FAQ SECTION ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* MOBILE (< lg) */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  QUESTIONS & ANSWERS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
                Frequently asked questions.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Have a question that isn&apos;t covered here? Feel free to reach out directly. We respond to all inquiries within one business day.
              </p>
            </div>

            <FaqAccordion />

            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs">
              <p className="text-xs font-semibold text-neutral-900 mb-1">
                Have a specific question?
              </p>
              <p className="text-xs text-neutral-500 mb-2.5">
                We are always happy to discuss technical requirements.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=Question%20about%20Web%20Development"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
              >
                <span>hello@stack.studio</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Heading */}
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                      QUESTIONS & ANSWERS
                    </span>
                    <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                    Frequently asked questions.
                  </h2>
                  <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Have a question that isn&apos;t covered here? Feel free to
                    reach out directly. We respond to all inquiries within one
                    business day.
                  </p>

                  <div className="mt-6 sm:mt-8 p-5 rounded-xl border border-black/[0.08] bg-white">
                    <p className="text-xs font-semibold text-neutral-900 mb-1">
                      Have a specific question?
                    </p>
                    <p className="text-xs text-neutral-500 mb-3">
                      We are always happy to discuss technical requirements.
                    </p>
                    <a
                      href="mailto:hello@stack.studio?subject=Question%20about%20Web%20Development"
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
                <FaqAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. FINAL CALL TO ACTION ─── */}
        <section className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#FAF7F2] text-center overflow-hidden">
          {/* Subtle warm center radial wash */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-40 blur-3xl pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(245, 230, 208, 0.8) 0%, rgba(250, 247, 242, 0) 70%)',
            }}
          />

          {/* MOBILE (< lg) */}
          <div className="relative z-10 block lg:hidden w-full px-5 sm:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] bg-white text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-800 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>START A CONVERSATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
              Ready to build your <span className="text-[#9E6941]">website?</span>
            </h2>

            <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed max-w-md mx-auto">
              Tell us about your project, timeline, and commercial goals. We will
              schedule a brief discovery call and provide a transparent,
              fixed-price proposal.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Web%20Project"
                className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/#contact"
                className="text-neutral-900 hover:text-black font-medium text-sm underline underline-offset-[5px] decoration-neutral-400 transition-colors"
              >
                Or contact us online
              </Link>
            </div>

            <p className="mt-6 text-xs text-neutral-500">
              We respond within 24 hours. No obligation.
            </p>
          </div>

          {/* DESKTOP (lg+) - 100% UNCHANGED */}
          <div className="relative z-10 hidden lg:block max-w-3xl mx-auto px-6 sm:px-10">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/[0.08] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>START A CONVERSATION</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1]">
              Ready to build your <span className="text-[#9E6941]">website?</span>
            </h2>

            {/* Body */}
            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl mx-auto">
              Tell us about your project, timeline, and commercial goals. We will
              schedule a brief discovery call and provide a transparent,
              fixed-price proposal.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@stack.studio?subject=Start%20a%20Web%20Project"
                className="group inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                href="/#contact"
                className="text-neutral-900 hover:text-black font-medium text-sm sm:text-base underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
              >
                Or contact us online
              </Link>
            </div>

            {/* Meta response notice */}
            <p className="mt-8 text-xs text-neutral-500">
              We respond within 24 hours. No obligation.
            </p>
          </div>
        </section>

        {/* ─── 13. REUSED SITE FOOTER ─── */}
        <Footer />
      </main>
    </>
  )
}
