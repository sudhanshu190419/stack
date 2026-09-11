import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Fingerprint,
  Layers,
  Lock,
  MessageSquare,
  Smartphone,
  Sparkles,
  Zap,
  Bell,
  CreditCard,
  RefreshCw,
  Sliders,
  Database,
  Cloud,
  ShieldCheck,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import AppHeroVisual from '@/components/appdev/AppHeroVisual'
import AppFaqAccordion from '@/components/appdev/AppFaqAccordion'
import { APP_FAQ_DATA } from '@/components/appdev/appFaqData'
import AppVsWebComparison from '@/components/appdev/AppVsWebComparison'

export const metadata: Metadata = {
  title: 'Mobile App Development Services — iOS & Android Apps | Stack',
  description:
    'Stack designs and develops high-performance mobile applications for iOS and Android. Cross-platform React Native engineering, biometric security, offline sync, and App Store deployment.',
  alternates: {
    canonical: 'https://stack.studio/app-development',
  },
  openGraph: {
    title: 'Mobile App Development Services — iOS & Android Apps | Stack',
    description:
      'Stack designs and develops high-performance mobile applications for iOS and Android. Built around the way your customers interact with your business.',
    url: 'https://stack.studio/app-development',
    siteName: 'Stack Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Development Services — iOS & Android Apps | Stack',
    description:
      'Custom iOS and Android mobile app engineering for ambitious businesses. Built by Stack.',
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
      name: 'Mobile App Development',
      item: 'https://stack.studio/app-development',
    },
  ],
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mobile App Development Services',
  serviceType: 'Mobile Application Development',
  provider: {
    '@type': 'Organization',
    name: 'Stack Studio',
    url: 'https://stack.studio',
  },
  description:
    'Custom mobile application design and development for iOS and Android platforms. Specializing in cross-platform React Native architecture, offline synchronization, secure APIs, and App Store publishing.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile App Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iOS & Android App Engineering',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cross-Platform React Native Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile UI/UX Design & Prototyping',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'App Store & Google Play Publishing',
        },
      },
    ],
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: APP_FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// Structured Data Constants
const APP_CATEGORIES = [
  {
    title: 'Customer-Facing Apps',
    desc: 'Dedicated mobile flagships providing loyal customers with rapid account access, repeat orders, loyalty rewards, and direct support.',
  },
  {
    title: 'Internal Operations & Field Tools',
    desc: 'Custom workflows that empower field technicians, logistics drivers, and on-site staff with fast offline data logging and barcode scanning.',
  },
  {
    title: 'Booking & Scheduling Apps',
    desc: 'Mobile-first reservation engines featuring interactive calendars, real-time availability sync, automatic push alerts, and deposits.',
  },
  {
    title: 'Startup MVPs',
    desc: 'Cost-effective, rapid-to-market applications engineered on scalable foundations, allowing founders to validate user retention and raise capital.',
  },
  {
    title: 'Customer Self-Service Portals',
    desc: 'Secure mobile hubs where clients manage subscriptions, submit service requests, download invoices, and receive status updates.',
  },
  {
    title: 'Hardware & Companion Apps',
    desc: 'Mobile interfaces that connect via Bluetooth Low Energy (BLE) or Wi-Fi to configure, monitor, and control physical IoT hardware.',
  },
]

const CAPABILITIES_DATA = [
  {
    icon: Smartphone,
    title: 'Mobile UI/UX Design',
    summary:
      'Interface design built specifically for thumb ergonomics, platform-specific navigation bars, and fluid 60fps gesture animations.',
  },
  {
    icon: Layers,
    title: 'Cross-Platform Engineering',
    summary:
      'Unified React Native codebases that compile directly to native iOS and Android primitives, halving time-to-market and maintenance overhead.',
  },
  {
    icon: Fingerprint,
    title: 'Biometrics & Security',
    summary:
      'Instant authentication using Face ID, Touch ID, or Android BiometricPrompt with encrypted keychain storage for sensitive credentials.',
  },
  {
    icon: Bell,
    title: 'Push Notifications',
    summary:
      'Reliable event-triggered and broadcast messaging via APNs and Firebase, equipped with deep-linking to specific in-app views.',
  },
  {
    icon: CreditCard,
    title: 'In-App Payments',
    summary:
      'Native Apple Pay and Google Pay integration, combined with secure Stripe checkout flows for seamless mobile transactions.',
  },
  {
    icon: RefreshCw,
    title: 'Offline Data Sync',
    summary:
      'Local device database caching (SQLite / MMKV) that allows continuous app usage offline, with automatic background synchronization.',
  },
  {
    icon: Cloud,
    title: 'Backend & API Integration',
    summary:
      'High-speed REST and GraphQL API plumbing connecting your app to existing databases, web portals, and microservices.',
  },
  {
    icon: CheckCircle2,
    title: 'Store Publishing & QA',
    summary:
      'Complete management of Apple App Store Connect and Google Play Console requirements, handling compliance and reviewer updates.',
  },
]

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Discovery & Feasibility',
    body: 'We define the core user personas, map out technical constraints, evaluate hardware integration needs, and select the optimal platform architecture.',
  },
  {
    step: '02',
    title: 'Mobile UX & Interactive Flow',
    body: 'We create clickable Figma prototypes that simulate thumb interactions, screen transitions, bottom sheets, and platform-specific navigation hierarchies.',
  },
  {
    step: '03',
    title: 'Frontend & API Engineering',
    body: 'We build modular React Native components, implement state management, configure offline caching databases, and wire up secure backend endpoints.',
  },
  {
    step: '04',
    title: 'Hardware & Device Lab Testing',
    body: 'We test across real physical iOS and Android devices, verifying battery impact, poor network handling, background push alerts, and screen sizes.',
  },
  {
    step: '05',
    title: 'Beta Testing & Store Approval',
    body: 'We distribute private TestFlight and Google Play Internal builds to your team, complete store listing assets, and oversee store certification.',
  },
  {
    step: '06',
    title: 'Launch & OS Maintenance',
    body: 'We monitor production crash telemetry, verify live telemetry, and provide ongoing updates to maintain compatibility with new iOS and Android releases.',
  },
]

const USE_CASES = [
  {
    type: 'Service & Booking Platforms',
    reason:
      'Customers who schedule recurring appointments, personal training, dining reservations, or wellness visits benefit from instant one-tap booking.',
  },
  {
    type: 'High-Repeat E-Commerce',
    reason:
      'Brands with loyal customers where repeat purchasers generate the majority of revenue. An app keeps your store on their home screen.',
  },
  {
    type: 'Field Staff & Operations',
    reason:
      'Businesses with mobile workers who need to log site inspections, capture photos, record signatures, and view job sheets with or without signal.',
  },
  {
    type: 'SaaS Mobile Companions',
    reason:
      'Software platforms where users need to approve requests, check real-time metrics, receive critical alerts, or communicate on the go.',
  },
  {
    type: 'Member & Client Portals',
    reason:
      'Exclusive member networks, fitness communities, and private client portals requiring secure authentication and direct messaging.',
  },
  {
    type: 'Hardware & Device Controllers',
    reason:
      'Connected consumer electronics and industrial equipment that require Bluetooth pairing and real-time sensor dashboards.',
  },
]

const TECH_STACK = [
  {
    tech: 'React Native',
    tagline: 'Native Mobile Compilation',
    benefit:
      'Renders real native iOS and Android UI views, ensuring fluid 60fps animations and natural platform gesture response.',
  },
  {
    tech: 'TypeScript',
    tagline: 'Type-Safe Architecture',
    benefit:
      'Prevents runtime crashes by strictly validating data models, API payloads, and state transitions before code ever ships.',
  },
  {
    tech: 'Expo Framework',
    tagline: 'Streamlined Build Pipeline',
    benefit:
      'Accelerates mobile compilation, simplifies cloud build management, and enables rapid over-the-air bug fixes for critical issues.',
  },
  {
    tech: 'Node.js & Serverless APIs',
    tagline: 'Scalable Backend Plumbing',
    benefit:
      'Provides lightweight, secure microservices for authentication, push notification dispatch, and real-time database sync.',
  },
  {
    tech: 'PostgreSQL / Supabase',
    tagline: 'Reliable Cloud Database',
    benefit:
      'Enterprise-grade relational storage with built-in row-level security, real-time subscriptions, and rapid query speeds.',
  },
  {
    tech: 'NativeWind & Tailwind',
    tagline: 'Consistent Design Systems',
    benefit:
      'Maintains pixel-perfect design token parity between your mobile app interface and web platform without redundant styling.',
  },
]

const COST_FACTORS = [
  {
    factor: 'Target Platforms',
    detail:
      'Unified cross-platform development (iOS + Android) provides dramatic cost efficiencies compared to contracting two isolated native engineering teams.',
  },
  {
    factor: 'Backend & Database Architecture',
    detail:
      'Apps with existing APIs are simpler to build. If we are engineering a secure cloud backend, database schemas, and admin panels from scratch, scope expands.',
  },
  {
    factor: 'Authentication & Security',
    detail:
      'Simple email login is straightforward. Biometric Face ID/Touch ID, Apple Sign-In compliance, and enterprise single sign-on (SSO) require additional security hardening.',
  },
  {
    factor: 'In-App Purchasing vs Payment Gateways',
    detail:
      'Digital goods require Apple and Google in-app purchase systems with subscription lifecycle handling. Physical goods integrate with Stripe or Apple Pay.',
  },
  {
    factor: 'Push Notification Logic',
    detail:
      'Basic broadcast announcements are simple. Automated transactional alerts, dynamic user segmentation, and deep-link routing require custom backend triggers.',
  },
  {
    factor: 'Offline Data Synchronization',
    detail:
      'Offline-first apps require complex conflict resolution and on-device caching databases to ensure data integrity when multiple devices sync simultaneously.',
  },
  {
    factor: 'Hardware & Sensor Integration',
    detail:
      'Interfacing with Bluetooth hardware, GPS geofencing, camera scanners, or background audio playback requires lower-level mobile driver integration.',
  },
  {
    factor: 'Custom UI/UX & Micro-Interactions',
    detail:
      'High-end tactile haptics, physics-based dragging, and bespoke custom design systems take more iteration time than standardized mobile component libraries.',
  },
  {
    factor: 'App Store Submission & Maintenance',
    detail:
      'Apple and Google privacy manifest audits, annual OS compatibility upgrades, and certificate rotations represent required ongoing operational support.',
  },
]

const FEATURED_PROJECTS = [
  {
    name: 'MOBL Experience',
    type: 'Mobile Application & Companion',
    desc: 'A cross-platform mobile application engineered for live telemetry, product interaction, and seamless device synchronization.',
    image: '/projects/project3.png',
    alt: 'Mobl Mobile Application Engineering by Stack',
    tech: 'React Native',
  },
  {
    name: 'Stack Mobile Architecture',
    type: 'Cross-Platform Client Framework',
    desc: 'Our proprietary mobile engineering framework featuring modular navigation, biometric security, and offline cache synchronization.',
    image: '/app.png',
    alt: 'Stack Cross-Platform Mobile Client Architecture',
    tech: 'iOS & Android',
  },
  {
    name: 'SAVOR Mobile Booking Hub',
    type: 'Mobile-First Guest Platform',
    desc: 'A mobile-optimized culinary platform tailored for rapid on-the-go reservations, table management, and instant confirmation push alerts.',
    image: '/projects/project1.png',
    alt: 'Savor Mobile Platform by Stack',
    tech: 'Mobile Web App',
  },
]

export default function AppDevelopmentPage() {
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
        <section className="relative w-full overflow-hidden pt-3 sm:pt-4 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE HERO COMPOSITION (< lg)                                            */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            {/* Small Eyebrow */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                APP DEVELOPMENT
              </span>
              <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-[32px] sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
              Apps built around the way your customers use your{' '}
              <span className="font-serif italic font-normal text-[#9E6941]">business.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-3.5 sm:mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              We design and develop intuitive, high-performance mobile applications
              for iOS and Android that turn your ideas into seamless mobile experiences.
            </p>

            {/* Visual Asset (App phones showcase) */}
            <div className="my-5 sm:my-7 flex justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[400px]">
                <AppHeroVisual />
              </div>
            </div>

            {/* Mobile Touch-Friendly Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20App%20Project"
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-150"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                href="/#work"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black/[0.12] bg-white/70 active:bg-white text-neutral-900 font-medium text-sm transition-all duration-150"
              >
                <span>View Our Work</span>
              </Link>
            </div>

            {/* Core Capability Specifications Pill Strip */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-2 text-center select-none">
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">iOS & Android</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Native</span>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">Scalable</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Architecture</span>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">Secure &amp;</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Reliable</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP HERO COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT  */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left Column: Heading & Narrative */}
              <div className="col-span-6 2xl:col-span-6 flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    APP DEVELOPMENT
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[68px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Apps built around the way your customers use your{' '}
                  <span className="font-serif italic font-normal text-[#9E6941]">
                    business.
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-lg xl:text-xl leading-relaxed max-w-xl font-normal">
                  We design and develop intuitive, high-performance mobile
                  applications for iOS and Android that turn your ideas into seamless
                  mobile experiences.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:hello@stack.studio?subject=Start%20an%20App%20Project"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-black/[0.12] hover:border-black/[0.25] bg-transparent text-neutral-900 font-medium text-sm sm:text-base hover:bg-black/[0.02] transition-colors"
                  >
                    <span>View Our Work</span>
                  </Link>
                </div>

                {/* Service Specs Trust Strip */}
                <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/[0.08] grid grid-cols-3 gap-4 select-none">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">iOS &amp; Android</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Native</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">Scalable</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Architecture</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">Secure &amp;</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Reliable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual */}
              <div className="col-span-6 2xl:col-span-6">
                <AppHeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WE BUILD ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  WHAT WE BUILD
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Mobile applications tailored to your exact operational workflow.
              </h2>
              <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal">
                A successful mobile app is not simply a website crammed into a
                mobile wrapper. We engineer dedicated software solutions that
                leverage on-device capabilities, deliver instant response times,
                and simplify daily actions for users on the move.
              </p>
              <div className="mt-4 mb-7">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                >
                  <span>Discuss your app concept</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Compact 2-column mobile cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {APP_CATEGORIES.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.07] bg-white/75 active:bg-white flex flex-col justify-between shadow-xs transition-all duration-150"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-1.5 py-0.5 rounded inline-block mb-2">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {item.desc}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Scope Context */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    WHAT WE BUILD
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-tight">
                  Mobile applications tailored to your exact operational workflow.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  A successful mobile app is not simply a website crammed into a
                  mobile wrapper. We engineer dedicated software solutions that
                  leverage on-device capabilities, deliver instant response times,
                  and simplify daily actions for users on the move.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Discuss your app concept</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 6 App Categories */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {APP_CATEGORIES.map((item, idx) => (
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

        {/* ─── 3. CAPABILITIES GRID ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TECHNICAL CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Full-stack mobile engineering standards.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                From initial touch-screen interaction design to App Store approval
                and cloud telemetry, we handle every layer of the mobile stack.
              </p>
            </div>

            {/* Compact 2-column mobile capabilities grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {CAPABILITIES_DATA.map((cap) => {
                const IconComponent = cap.icon
                return (
                  <div
                    key={cap.title}
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs transition-colors duration-150"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2.5 text-[#9E6941]">
                        <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                        {cap.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                        {cap.summary}
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
                  TECHNICAL CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Full-stack mobile engineering standards.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                From initial touch-screen interaction design to App Store approval
                and cloud telemetry, we handle every layer of the mobile stack.
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITIES_DATA.map((cap) => {
                const IconComponent = cap.icon
                return (
                  <div
                    key={cap.title}
                    className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 text-[#9E6941]" />
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

        {/* ─── 4. PROCESS ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  DEVELOPMENT TIMELINE
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Our app development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Building a mobile app requires strict platform discipline. We
                guide you through six milestone-driven phases from concept to
                storefront feature.
              </p>
            </div>

            {/* Compact 2-column mobile process stages */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-2 py-0.5 rounded-full inline-block mb-2">
                      {stage.step}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-4">
                      {stage.body}
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
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  DEVELOPMENT TIMELINE
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Our app development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Building a mobile app requires strict platform discipline. We
                guide you through six milestone-driven phases from concept to
                storefront feature.
              </p>
            </div>

            {/* 6-Phase Grid */}
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

        {/* ─── 5. WHO IT'S FOR ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  PRACTICAL USE CASES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                When does your business need a dedicated mobile app?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Not every company needs an app. We advise clients to invest in a
                mobile application when customer convenience, repeat interactions,
                or operational efficiency make native mobile software
                demonstrably superior.
              </p>
            </div>

            {/* Compact 2-column mobile use cases */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {USE_CASES.map((item) => (
                <div
                  key={item.type}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug mb-1.5">
                      {item.type}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-4">
                      {item.reason}
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
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  PRACTICAL USE CASES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                When does your business need a dedicated mobile app?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Not every company needs an app. We advise clients to invest in a
                mobile application when customer convenience, repeat interactions,
                or operational efficiency make native mobile software
                demonstrably superior.
              </p>
            </div>

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {USE_CASES.map((item) => (
                <div
                  key={item.type}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.type}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                      {item.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. TECHNOLOGY ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  TECHNOLOGY STACK
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Proven mobile technologies that save time and eliminate technical debt.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                We specialize in modern React Native and cloud architectures.
                Instead of building two completely separate development teams
                for iOS and Android, our approach gives you a single, unified,
                high-speed codebase that runs natively across both platforms.
              </p>
            </div>

            {/* Commercial Benefits Callout Banner */}
            <div className="my-5 p-3.5 rounded-xl border border-black/[0.06] bg-[#F2EDE4]/60">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Commercial Benefits:
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                50% lower maintenance overhead, simultaneous feature
                releases on both app stores, and shared business logic with your web dashboard.
              </p>
            </div>

            {/* Compact 2-column mobile tech stack */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {TECH_STACK.map((item) => (
                <div
                  key={item.tech}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono block">
                      {item.tech}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#9E6941] tracking-tight uppercase block mt-0.5 mb-1.5">
                      {item.tagline}
                    </span>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {item.benefit}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    TECHNOLOGY STACK
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                  Proven mobile technologies that save time and eliminate technical debt.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  We specialize in modern React Native and cloud architectures.
                  Instead of building two completely separate development teams
                  for iOS and Android, our approach gives you a single, unified,
                  high-speed codebase that runs natively across both platforms.
                </p>
                <div className="mt-6 pt-6 border-t border-black/[0.06]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Commercial Benefits:
                  </p>
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                    50% lower maintenance overhead, simultaneous feature
                    releases on both app stores, and shared business logic that
                    can also power your web dashboard.
                  </p>
                </div>
              </div>

              {/* Right Column */}
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

        {/* ─── 7. APP VS WEBSITE (HONEST COMPARISON) ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STRATEGIC CLARITY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Mobile application vs. responsive website.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Before committing to an app build, it is vital to know whether a
                mobile app is truly justified. Here is an honest evaluation of
                where each medium excels.
              </p>
            </div>

            {/* Mobile Card-Based Comparison */}
            <AppVsWebComparison />
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-14">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STRATEGIC CLARITY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Mobile application vs. responsive website.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Before committing to an app build, it is vital to know whether a
                mobile app is truly justified. Here is an honest evaluation of
                where each medium excels.
              </p>
            </div>

            {/* Comparison Table Component */}
            <AppVsWebComparison />
          </div>
        </section>

        {/* ─── 8. COST FACTORS ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06]">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  REALISTIC BUDGETING
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                What influences mobile app development cost?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                App budgets vary based on engineering depth rather than arbitrary
                page counts. We provide transparent estimates rooted in concrete
                architectural specifications.
              </p>
            </div>

            {/* Compact 2-column mobile cost factors */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {COST_FACTORS.map((item, idx) => (
                <div
                  key={item.factor}
                  className="p-3.5 sm:p-4 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-1.5 py-0.5 rounded inline-block mb-1.5">
                      0{idx + 1}
                    </span>
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

            {/* Mobile Proposal CTA Banner */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-black/[0.08] bg-[#F5F1EA]/60">
              <h3 className="text-sm sm:text-base font-bold text-neutral-950 mb-1">
                Planning a mobile app for your business?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Share your feature list and commercial objectives. We provide
                honest feasibility assessments and phased budget roadmaps.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=Mobile%20App%20Estimate"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#111111] active:bg-black text-white text-xs font-medium transition-colors"
              >
                <span>Request an App Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  REALISTIC BUDGETING
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What influences mobile app development cost?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                App budgets vary based on engineering depth rather than arbitrary
                page counts. We provide transparent estimates rooted in concrete
                architectural specifications.
              </p>
            </div>

            {/* Cost Factors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COST_FACTORS.map((item) => (
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

            {/* Proposal CTA Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-black/[0.08] bg-[#F5F1EA]/50 max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Planning a mobile app for your business?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Share your feature list and commercial objectives. We provide
                  honest feasibility assessments, technology recommendations, and
                  phased budget roadmaps.
                </p>
              </div>
              <a
                href="mailto:hello@stack.studio?subject=Mobile%20App%20Estimate"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Request an App Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── 9. PORTFOLIO ─── */}
        <section
          id="app-portfolio"
          className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40"
        >
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  REAL APPLICATION WORK
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Mobile products and application ecosystems.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Explore mobile applications, companion software, and
                high-utility digital tools engineered by Stack.
              </p>
            </div>

            {/* Mobile Stacked Project Cards */}
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-xs"
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

                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#9E6941] mb-1 block">
                      {project.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 mb-1.5">
                      {project.name}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {project.desc}
                    </p>
                    <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
                      <Link
                        href="/#work"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 active:text-[#9E6941]"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {project.tech}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio link */}
            <div className="mt-6 text-center">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300"
              >
                <span>View all studio work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    REAL APPLICATION WORK
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                  Mobile products and application ecosystems.
                </h2>
                <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Explore mobile applications, companion software, and
                  high-utility digital tools engineered by Stack.
                </p>
              </div>

              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-black underline underline-offset-4 decoration-neutral-300 transition-colors"
              >
                <span>View all studio work</span>
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
                        {project.tech}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 10. FAQ SECTION ─── */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* ========================================================================= */}
          {/* MOBILE COMPOSITION (< lg)                                                 */}
          {/* ========================================================================= */}
          <div className="block lg:hidden w-full px-5 sm:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  APP DEVELOPMENT FAQ
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Frequently asked questions about app development.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Have a question regarding app stores, technical feasibility,
                or timelines? We are always happy to discuss specifics.
              </p>
            </div>

            {/* Accordion directly beneath header */}
            <AppFaqAccordion />

            {/* Contact box placed below questions on mobile */}
            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs">
              <p className="text-xs font-semibold text-neutral-900 mb-0.5">
                Have a specific app question?
              </p>
              <p className="text-xs text-neutral-500 mb-2.5">
                Speak directly with an engineering lead.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=Question%20about%20App%20Development"
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
              {/* Left Column: Heading */}
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                      APP DEVELOPMENT FAQ
                    </span>
                    <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                    Frequently asked questions about app development.
                  </h2>
                  <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Have a question regarding app stores, technical feasibility,
                    or timelines? We are always happy to discuss specifics.
                  </p>

                  <div className="mt-6 sm:mt-8 p-5 rounded-xl border border-black/[0.08] bg-white">
                    <p className="text-xs font-semibold text-neutral-900 mb-1">
                      Have a specific app question?
                    </p>
                    <p className="text-xs text-neutral-500 mb-3">
                      Speak directly with an engineering lead.
                    </p>
                    <a
                      href="mailto:hello@stack.studio?subject=Question%20about%20App%20Development"
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
                <AppFaqAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 11. FINAL CALL TO ACTION ─── */}
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
              <span>START A MOBILE PROJECT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
              Have an app idea?{' '}
              <span className="text-[#9E6941]">Let&apos;s build it.</span>
            </h2>

            <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal max-w-sm mx-auto">
              Share your mobile product goals, target audience, and feature
              wishlist. We will evaluate technical feasibility and provide a
              clear, fixed-fee roadmap.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 max-w-xs mx-auto">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20App%20Project"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/#contact"
                className="text-neutral-900 text-sm font-medium underline underline-offset-[5px] decoration-neutral-400 py-1"
              >
                Or contact us online
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-neutral-500">
              We respond within 24 hours. No obligation.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block relative z-10 max-w-3xl mx-auto px-6 sm:px-10">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/[0.08] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>START A MOBILE PROJECT</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1]">
              Have an app idea?{' '}
              <span className="text-[#9E6941]">Let&apos;s build it.</span>
            </h2>

            {/* Body */}
            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl mx-auto">
              Share your mobile product goals, target audience, and feature
              wishlist. We will evaluate technical feasibility and provide a
              clear, fixed-fee roadmap.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20App%20Project"
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

        {/* ─── 12. REUSED SITE FOOTER ─── */}
        <Footer />
      </main>
    </>
  )
}
