import React from 'react'
import type { Metadata } from 'next'
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
  title: 'Mobile App Development Services — iOS & Android Apps | StackStich',
  description:
    'StackStich designs and develops high-performance mobile applications for iOS and Android. Cross-platform React Native engineering, biometric security, offline sync, and App Store deployment.',
  alternates: {
    canonical: 'https://www.stackstich.online/app-development',
  },
  openGraph: {
    title: 'Mobile App Development Services — iOS & Android Apps | StackStich',
    description:
      'StackStich designs and develops high-performance mobile applications for iOS and Android. Built around the way your customers interact with your business.',
    url: 'https://www.stackstich.online/app-development',
    siteName: 'StackStich',
    type: 'website',
    locale: 'en_US',
    images: ['/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Development Services — iOS & Android Apps | StackStich',
    description:
      'Custom iOS and Android mobile app engineering for ambitious businesses. Built by StackStich.',
    images: ['/hero.png'],
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
      name: 'Mobile App Development',
      item: 'https://www.stackstich.online/app-development',
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
    name: 'StackStich',
    url: 'https://www.stackstich.online',
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
    desc: 'Mobile apps that help your customers browse, buy, book, manage accounts, and stay connected with your business.',
  },
  {
    title: 'Internal Business Apps',
    desc: 'Apps that help your team manage tasks, operations, field work, and everyday business processes.',
  },
  {
    title: 'Booking & Scheduling Apps',
    desc: 'Make it easy for customers to book appointments, services, reservations, and other time-based activities.',
  },
  {
    title: 'Startup MVPs',
    desc: 'Launch a focused first version of your app to test your idea, gather feedback, and learn what your users need.',
  },
  {
    title: 'Customer Portals',
    desc: 'Give customers an easy way to manage their accounts, requests, subscriptions, orders, and updates.',
  },
  {
    title: 'Connected Apps',
    desc: 'Apps that connect with devices and other systems to monitor, control, or exchange information.',
  },
]

const CAPABILITIES_DATA = [
  {
    icon: Smartphone,
    title: 'Mobile UI/UX Design',
    summary:
      'Clear, intuitive app interfaces designed to make everyday tasks simple and enjoyable.',
  },
  {
    icon: Layers,
    title: 'Cross-Platform Development',
    summary:
      'Build for iOS and Android with a consistent experience across both platforms.',
  },
  {
    icon: Fingerprint,
    title: 'Security & User Protection',
    summary:
      'Secure login, user data, and app interactions with appropriate protection built into the experience.',
  },
  {
    icon: Bell,
    title: 'Push Notifications',
    summary:
      'Keep users informed with useful notifications for updates, reminders, orders, bookings, and other important events.',
  },
  {
    icon: CreditCard,
    title: 'In-App Payments',
    summary:
      'Accept payments securely with convenient options such as cards and supported digital wallets.',
  },
  {
    icon: RefreshCw,
    title: 'Offline & Data Sync',
    summary:
      'Let users continue using important app features even with limited connectivity, with data synced when they are back online.',
  },
  {
    icon: Cloud,
    title: 'App Integrations',
    summary:
      'Connect your app with websites, payment systems, business tools, databases, and other services you already use.',
  },
  {
    icon: CheckCircle2,
    title: 'App Store Launch & Testing',
    summary:
      'Test your app thoroughly and prepare it for release on the Apple App Store and Google Play.',
  },
]

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Discovery & Planning',
    body: 'We learn about your business, users, goals, and app requirements to create a clear plan for the project.',
  },
  {
    step: '02',
    title: 'UX & App Design',
    body: 'We plan the screens and user experience, then refine the design with your feedback before development begins.',
  },
  {
    step: '03',
    title: 'App Development',
    body: 'We turn the approved designs into a reliable mobile app with the features your business needs.',
  },
  {
    step: '04',
    title: 'Testing & Refinement',
    body: 'We test the app across different devices and real-world situations, fix issues, and refine the experience.',
  },
  {
    step: '05',
    title: 'Beta Testing & Launch Preparation',
    body: 'We prepare the app for testing, complete the required store materials, and get everything ready for release.',
  },
  {
    step: '06',
    title: 'Launch & Ongoing Updates',
    body: 'We help launch your app and provide updates and improvements as your needs and mobile platforms evolve.',
  },
]


const TECH_STACK = [
  {
    tech: 'React Native',
    tagline: 'ONE CODEBASE, TWO PLATFORMS',
    benefit:
      'Build consistent iOS and Android experiences while keeping development efficient.',
  },
  {
    tech: 'TypeScript',
    tagline: 'RELIABLE DEVELOPMENT',
    benefit:
      'Helps us catch errors early and keep your app easier to maintain.',
  },
  {
    tech: 'Expo Framework',
    tagline: 'FASTER DEVELOPMENT',
    benefit:
      'Simplifies development and testing so new features can be built and improved efficiently.',
  },
  {
    tech: 'Node.js & Serverless APIs',
    tagline: 'BACKEND & INTEGRATIONS',
    benefit:
      'Powers features such as accounts, notifications, payments, and connections to other services.',
  },
  {
    tech: 'PostgreSQL / Supabase',
    tagline: 'SECURE DATA STORAGE',
    benefit:
      "Stores and manages your app's data reliably, with the flexibility to support growing needs.",
  },
  {
    tech: 'NativeWind & Tailwind',
    tagline: 'CONSISTENT APP DESIGN',
    benefit:
      'Helps us create clean, consistent interfaces across your app and digital products.',
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
            <p className="text-[32px] sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
              Mobile apps built for<br />
              <span className="font-serif italic font-normal text-[#9E6941]">your business.</span>
            </p>

            {/* Supporting Copy */}
            <p className="mt-3.5 sm:mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
              We design and build mobile apps for iOS and Android that are easy to use, reliable, and built around your business goals.
            </p>

            {/* Visual Asset (App phones showcase) */}
            <div className="my-5 sm:my-7 flex justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[400px]">
                <AppHeroVisual />
              </div>
            </div>

            {/* Mobile Touch-Friendly Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/contact"
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-150"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#work"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black/[0.12] bg-white/70 active:bg-white text-neutral-900 font-medium text-sm transition-all duration-150"
              >
                <span>See Our Work</span>
              </Link>
            </div>

            {/* Core Capability Specifications Pill Strip */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-2 text-center select-none">
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">iOS & Android</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Built for both platforms</span>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">Easy to Use</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Clear, intuitive experiences</span>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <span className="block text-[11px] font-bold text-neutral-900 leading-tight">Secure &amp; Reliable</span>
                <span className="block text-[10px] text-neutral-500 font-normal">Built for everyday use</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP HERO COMPOSITION (>= lg)                                          */}
          {/* ========================================================================= */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left Column: Hero Visual */}
              <div className="col-span-6 2xl:col-span-6">
                <AppHeroVisual />
              </div>

              {/* Right Column: Heading & Narrative */}
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
                  Mobile apps built for<br />
                  <span className="font-serif italic font-normal text-[#9E6941]">
                    your business.
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-lg xl:text-xl leading-relaxed max-w-xl font-normal">
                  We design and build mobile apps for iOS and Android that are easy to use, reliable, and built around your business goals.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-black/[0.12] hover:border-black/[0.25] bg-transparent text-neutral-900 font-medium text-sm sm:text-base hover:bg-black/[0.02] transition-colors"
                  >
                    <span>See Our Work</span>
                  </Link>
                </div>

                {/* Service Specs Trust Strip */}
                <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/[0.08] grid grid-cols-3 gap-4 select-none">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">iOS &amp; Android</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Built for both platforms</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">Easy to Use</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Clear, intuitive experiences</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                    <div className="leading-tight">
                      <span className="block text-xs font-semibold text-neutral-800">Secure &amp; Reliable</span>
                      <span className="block text-[11px] text-neutral-500 font-normal">Built for everyday use</span>
                    </div>
                  </div>
                </div>
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
                Mobile apps built around your business.
              </h2>
              <p className="mt-3.5 text-neutral-600 text-sm leading-relaxed font-normal">
                We design and develop mobile apps that are easy to use, reliable, and built around the needs of your customers and your team.
              </p>
              <div className="mt-4 mb-7">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                >
                  <span>Tell us about your app</span>
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
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
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
                  Mobile apps built around your business.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  We design and develop mobile apps that are easy to use, reliable, and built around the needs of your customers and your team.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Tell us about your app</span>
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
                  APP CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Everything your app needs to work well.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                From design and development to testing and launch, we handle everything needed to build a reliable mobile app.
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
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
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
                  APP CAPABILITIES
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Everything your app needs to work well.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                From design and development to testing and launch, we handle everything needed to build a reliable mobile app.
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
                  DEVELOPMENT PROCESS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Our app development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                From the first idea to launch, we keep the process clear, collaborative, and easy to follow.
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
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
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
                  DEVELOPMENT PROCESS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Our app development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                From the first idea to launch, we keep the process clear, collaborative, and easy to follow.
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


        {/* ─── 5. TECHNOLOGY ─── */}
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
                Modern technology for reliable mobile apps.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                We use modern, reliable technology to build mobile apps that are easier to maintain, ready to grow, and consistent across iOS and Android.
              </p>
            </div>

            {/* Commercial Benefits Callout Banner */}
            <div className="my-5 p-3.5 rounded-xl border border-black/[0.06] bg-[#F2EDE4]/60">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                WHAT THIS MEANS FOR YOU:
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                A solid technical foundation that makes your app easier to maintain, improve, and expand over time.
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
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
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
                  Modern technology for reliable mobile apps.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  We use modern, reliable technology to build mobile apps that are easier to maintain, ready to grow, and consistent across iOS and Android.
                </p>
                <div className="mt-6 pt-6 border-t border-black/[0.06]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    WHAT THIS MEANS FOR YOU:
                  </p>
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                    A solid technical foundation that makes your app easier to maintain, improve, and expand over time.
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

        {/* ─── 6. APP VS WEBSITE (HONEST COMPARISON) ─── */}
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
                Do you need an app or a website?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
                Not every business needs a mobile app. We help you choose the right option based on how your customers use your business.
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
                Do you need an app or a website?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Not every business needs a mobile app. We help you choose the right option based on how your customers use your business.
              </p>
            </div>

            {/* Comparison Table Component */}
            <AppVsWebComparison />
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
                href="mailto:contact@stackstich.online?subject=Question%20about%20App%20Development"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] active:text-[#7d502e] transition-colors"
              >
                <span>contact@stackstich.online</span>
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
                      href="mailto:contact@stackstich.online?subject=Question%20about%20App%20Development"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                    >
                      <span>contact@stackstich.online</span>
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20app%20development%20service.%20I'd%20like%20to%20discuss%20my%20idea."
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 text-sm font-medium underline underline-offset-[5px] decoration-neutral-400 py-1"
              >
                Or contact us online
              </a>
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
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20app%20development%20service.%20I'd%20like%20to%20discuss%20my%20idea."
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-black font-medium text-sm sm:text-base underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
              >
                Or contact us online
              </a>
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
