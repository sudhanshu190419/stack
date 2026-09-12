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
import WorkSection from '@/components/work/WorkSection'

export const metadata: Metadata = {
  title: 'Web Development Services — Websites Built to Work for Your Business | Stack',
  description:
    'Stack designs and develops fast, responsive, scalable custom websites for growing businesses. Engineered with Next.js, TypeScript, modern CMS platforms, and Core Web Vitals excellence.',
  alternates: {
    canonical: 'https://stack.studio/web-development',
  },
  openGraph: {
    title: 'Web Development Services — Websites Built to Work for Your Business | Stack',
    description:
      'Stack designs and develops fast, responsive, scalable custom websites for growing businesses. Engineered with Next.js, modern CMS platforms, and Core Web Vitals excellence.',
    url: 'https://stack.studio/web-development',
    siteName: 'Stack Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Services — Websites Built to Work for Your Business | Stack',
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
          name: 'Marketing & Landing Pages',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Responsive Websites',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Easy-to-Manage Websites',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Features',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Integrations',
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
    desc: 'Professional websites designed around your business, services, and customers.',
  },
  {
    title: 'Marketing & Landing Pages',
    desc: 'Focused landing pages built to promote your business, products, services, or campaigns.',
  },
  {
    title: 'Responsive Websites',
    desc: 'Websites that look and work smoothly on phones, tablets, laptops, and larger screens.',
  },
  {
    title: 'Easy-to-Manage Websites',
    desc: 'Manage your pages, images, blogs, and other content without needing a developer.',
  },
  {
    title: 'Custom Website Features',
    desc: 'Interactive features and custom experiences built specifically around your business needs.',
  },
  {
    title: 'Business Integrations',
    desc: 'Connect your website with payments, bookings, CRM systems, email, forms, and other tools you use.',
  },
]

const CAPABILITIES_DATA = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Responsive on Every Device',
    summary:
      'Your website will look and work smoothly across phones, tablets, laptops, and desktop screens.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Performance Optimization',
    summary:
      'Optimized for fast loading, smooth interactions, and a better experience for your visitors.',
  },
  {
    number: '03',
    icon: Search,
    title: 'SEO Foundations',
    summary:
      'Built with a strong SEO foundation so search engines can understand and index your website properly.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Accessible & Easy to Use',
    summary:
      'Clear layouts, readable content, keyboard-friendly navigation, and accessible interactions for more visitors.',
  },
  {
    number: '05',
    icon: Layers,
    title: 'Easy Content Management',
    summary:
      'Update your text, images, pages, and blog content without needing a developer for every small change.',
  },
  {
    number: '06',
    icon: LineChart,
    title: 'Analytics & Tracking',
    summary:
      'Understand how visitors find and use your website, with tracking set up around the actions that matter to your business.',
  },
  {
    number: '07',
    icon: Sliders,
    title: 'Business Integrations',
    summary:
      'Connect your website with forms, bookings, payments, email tools, CRM systems, and other services you use.',
  },
  {
    number: '08',
    icon: Cpu,
    title: 'Secure & Reliable Hosting',
    summary:
      'Your website is deployed on reliable infrastructure with SSL, backups, and the setup needed for a secure online presence.',
  },
]

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Discovery',
    body: 'We learn about your business, your customers, your goals, and what your website needs to achieve.',
  },
  {
    step: '02',
    title: 'Planning',
    body: 'We plan the website structure, content, features, and the best approach for building everything smoothly.',
  },
  {
    step: '03',
    title: 'Design & Review',
    body: 'We create the visual direction and page designs, then refine them with your feedback before development begins.',
  },
  {
    step: '04',
    title: 'Development',
    body: 'We turn the approved designs into a fast, responsive website and build the features your business needs.',
  },
  {
    step: '05',
    title: 'Testing & Refinement',
    body: 'We test the website across devices and browsers, fix issues, and make sure everything works as expected.',
  },
  {
    step: '06',
    title: 'Launch & Handoff',
    body: 'We take your website live, complete the final checks, and show you how to manage your website going forward.',
  },
]


const TECH_STACK = [
  {
    tech: 'Next.js',
    tagline: 'FAST, MODERN WEBSITES',
    benefit:
      'Helps create fast-loading pages and a smooth experience across your website.',
  },
  {
    tech: 'React',
    tagline: 'FLEXIBLE USER INTERFACES',
    benefit:
      'Makes it easier to build interactive website features that can grow with your business.',
  },
  {
    tech: 'TypeScript',
    tagline: 'RELIABLE DEVELOPMENT',
    benefit:
      'Helps us catch development issues early and keep your website easier to maintain.',
  },
  {
    tech: 'Tailwind CSS',
    tagline: 'CLEAN, RESPONSIVE DESIGN',
    benefit:
      'Helps us create consistent layouts that work smoothly across different screen sizes.',
  },
  {
    tech: 'Node.js',
    tagline: 'POWERFUL WEBSITE FEATURES',
    benefit:
      'Supports forms, integrations, accounts, and other features that need reliable server-side functionality.',
  },
  {
    tech: 'Headless CMS',
    tagline: 'EASY CONTENT MANAGEMENT',
    benefit:
      'Lets your team update website content without needing a developer for every change.',
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
              Websites built to<br />
              <span className="font-serif italic font-normal text-[#9E6941]">
                work for your business.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              We design and develop fast, responsive websites that look professional,
              work smoothly, and help your business grow. From the first idea to
              launch, we build every website around your goals and your customers.
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
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs text-neutral-700 font-medium">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Mobile-Friendly</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Fast &amp; Reliable</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Easy to Manage</span>
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
                  <span className="font-serif italic font-normal text-[#9E6941]">work for your business.</span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  We design and develop fast, responsive websites that look professional,
                  work smoothly, and help your business grow. From the first idea to
                  launch, we build every website around your goals and your customers.
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
                    <span>Mobile-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Fast &amp; Reliable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Easy to Manage</span>
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
                What we can build for you.
              </h2>
              <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal">
                From business websites to custom integrations, we build the web
                experiences your business needs to grow.
              </p>
              <div className="mt-5 mb-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                >
                  <span>Tell us what you need</span>
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
                  What we can build for you.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  From business websites to custom integrations, we build the web
                  experiences your business needs to grow.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Tell us what you need</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 6 Core Areas (Written for Business Owners) */}
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
                Every website we build comes with the essentials for a fast, secure, and reliable online experience — included as standard.
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
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center">
                          <IconComp className="w-3.5 h-3.5 text-[#9E6941]" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400">
                          {cap.number}
                        </span>
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
                Every website we build comes with the essentials for a fast, secure, and reliable online experience — included as standard.
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
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center">
                          <IconComp className="w-5 h-5 text-[#9E6941]" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-neutral-400">
                          {cap.number}
                        </span>
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
                From the first conversation to launch, we keep the process clear, organized, and easy to follow — with regular updates at every stage.
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
                From the first conversation to launch, we keep the process clear, organized, and easy to follow — with regular updates at every stage.
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


        {/* ─── 5. TECHNOLOGY (CLIENT-CENTRIC) ─── */}
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
                Technology built around your needs.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                We use modern, reliable technologies to build websites that are fast, flexible, secure, and easy to maintain.
              </p>

              <div className="mt-3.5 p-3 rounded-lg bg-[#FAF7F2] border border-black/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  WHAT THIS MEANS FOR YOU:
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  You get a website built on a modern foundation, without unnecessary tools or technical complexity.
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
                  Technology built around your needs.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  We use modern, reliable technologies to build websites that are
                  fast, flexible, secure, and easy to maintain.
                </p>
                <div className="mt-6 pt-6 border-t border-black/[0.06]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    WHAT THIS MEANS FOR YOU:
                  </p>
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                    You get a website built on a modern foundation, without
                    unnecessary tools or technical complexity.
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


        {/* ─── 6. WEB DEVELOPMENT VS WEBSITE BUILDER ─── */}
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


        {/* ─── 8. OUR RECENT WORK (MATCHES HOMEPAGE) ─── */}
        <WorkSection id="portfolio" />

        {/* ─── 9. FAQ SECTION ─── */}
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

        {/* ─── 10. FINAL CALL TO ACTION ─── */}
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
              Ready to build something<br />
              <span className="text-[#9E6941]">for your business?</span>
            </h2>

            <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed max-w-md mx-auto">
              Tell us what you&apos;re looking to build. Whether it&apos;s a website, online store, or mobile app, we&apos;ll help turn your idea into a polished digital experience.
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
              We usually respond within 24 hours. No obligation.
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
              Ready to build something<br />
              <span className="text-[#9E6941]">for your business?</span>
            </h2>

            {/* Body */}
            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl mx-auto">
              Tell us what you&apos;re looking to build. Whether it&apos;s a website, online store, or mobile app, we&apos;ll help turn your idea into a polished digital experience.
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
              We usually respond within 24 hours. No obligation.
            </p>
          </div>
        </section>

        {/* ─── 13. REUSED SITE FOOTER ─── */}
        <Footer />
      </main>
    </>
  )
}
