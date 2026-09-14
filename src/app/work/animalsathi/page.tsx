import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Bell,
  HeartHandshake,
  Activity,
  Calendar,
  Layers,
  Smartphone,
  Globe,
  Database,
  Radio,
  Clock,
  Compass,
  CheckCircle2,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  Users,
  CreditCard,
  Building2,
  Share2,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Animalsathi Case Study — Animal Rescue & Care Platform | StackStich',
  description:
    'A case study on how StackStich designed and engineered Animalsathi across web and mobile, connecting emergency roadside animal rescue, proximity volunteer alerts, and veterinary care through a shared real-time platform.',
  alternates: {
    canonical: 'https://www.stackstich.online/work/animalsathi',
  },
  openGraph: {
    title: 'Animalsathi Case Study — Animal Rescue & Care Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered Animalsathi across web and mobile, connecting emergency animal rescue, volunteer alerts, and veterinary care.',
    url: 'https://www.stackstich.online/work/animalsathi',
    siteName: 'StackStich',
    type: 'article',
    images: [
      {
        url: '/work/project2.png',
        width: 1200,
        height: 630,
        alt: 'Animalsathi Case Study by StackStich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animalsathi Case Study — Animal Rescue & Care Platform | StackStich',
    description:
      'A case study on how StackStich designed and engineered Animalsathi across web and mobile for animal rescue and care.',
    images: ['/work/project2.png'],
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
      name: 'Animalsathi Case Study',
      item: 'https://www.stackstich.online/work/animalsathi',
    },
  ],
}

const TECH_GROUPS = [
  {
    category: 'Web Platform',
    icon: Globe,
    description: 'High-performance Next.js 16 App Router application for public discovery, booking, and operations.',
    stack: [
      { name: 'Next.js 16', role: 'App Router & Static Generation' },
      { name: 'React 19 & TypeScript', role: 'Type-Safe Component Architecture' },
      { name: 'Tailwind CSS', role: 'Responsive Rescue Design Tokens' },
      { name: 'Leaflet & React-Leaflet', role: 'Interactive Spatial Maps' },
      { name: 'Framer Motion & GSAP', role: 'Micro-Interactions & Fluid Motion' },
      { name: 'Lenis', role: 'Smooth Inertial Scrolling' },
    ],
  },
  {
    category: 'Mobile Field App',
    icon: Smartphone,
    description: 'Cross-platform React Native field tool built for rapid 1-tap SOS reporting and instant notifications.',
    stack: [
      { name: 'React Native 0.81', role: 'Cross-Platform Native Engine' },
      { name: 'React Navigation', role: 'Fluid Stack & Bottom Tab Navigation' },
      { name: 'React Native Maps', role: 'Live Radar & Color-Coded Triage Pins' },
      { name: 'Notifee & FCM', role: 'Critical Emergency Siren Push Channels' },
      { name: 'Geolocation Service', role: 'High-Accuracy GPS Coordinate Resolution' },
      { name: 'Image Resizer & Picker', role: 'Rapid On-Device Photo Compression' },
    ],
  },
  {
    category: 'Cloud & Data Core',
    icon: Database,
    description: 'Unified real-time Firebase backend keeping web dashboards and mobile responders synchronized.',
    stack: [
      { name: 'Firebase Firestore', role: 'Real-Time NoSQL Case Database' },
      { name: 'Geofire Spatial Engine', role: 'Sub-7km Proximity Bounding Queries' },
      { name: 'Cloud Functions', role: 'Automated Push Dispatch & PDF Generation' },
      { name: 'Firebase Storage', role: 'Incident Imagery & Verification Docs' },
      { name: 'Firebase Auth', role: 'Phone OTP & Google Authentication' },
    ],
  },
  {
    category: 'Integrations & Services',
    icon: Radio,
    description: 'Commercial and communication integrations powering verified care and transactions.',
    stack: [
      { name: 'Razorpay Gateway', role: 'Crowdfunding & Pet Store Payments' },
      { name: 'Nodemailer API', role: 'Volunteer & Clinic Verification Emails' },
      { name: 'Shiprocket Connect', role: 'Merchant Logistics & Order Dispatch' },
      { name: 'Lucide Icons', role: 'Consistent Geometric Iconography' },
    ],
  },
]

const RESCUE_PIPELINE = [
  {
    step: '01',
    title: 'Spot Incident',
    desc: 'Citizen encounters an injured or distressed animal on the road.',
  },
  {
    step: '02',
    title: 'Capture & Geocode',
    desc: 'Takes a photo; device locks exact GPS coordinates and computes 9-character geohash.',
  },
  {
    step: '03',
    title: 'Broadcast SOS',
    desc: 'Selects severity (Critical / High / Medium) and submits emergency alert.',
  },
  {
    step: '04',
    title: 'Proximity Dispatch',
    desc: 'Cloud Functions trigger high-priority push siren to registered volunteers within 7km.',
  },
  {
    step: '05',
    title: 'Volunteer Responds',
    desc: 'Nearby responder opens live map, navigates to scene, and marks case as En Route.',
  },
  {
    step: '06',
    title: 'Live Case Resolution',
    desc: 'Animal is transported to clinic; status updates in real time to Under Treatment & Resolved.',
  },
]

const VET_CARE_STEPS = [
  {
    step: '01',
    title: 'Discover Clinics',
    desc: 'Browse verified veterinary hospitals, emergency centers, and NGO shelters sorted by distance.',
  },
  {
    step: '02',
    title: 'Compare Services',
    desc: 'Review 24/7 emergency availability, doctor specializations, facility badges, and ratings.',
  },
  {
    step: '03',
    title: 'Select Slot',
    desc: 'Pick consultation dates, doctor slots, or request urgent emergency walk-in coordination.',
  },
  {
    step: '04',
    title: 'Add Pet Profile',
    desc: 'Attach digital pet health records, vaccination history, and specific symptom notes.',
  },
  {
    step: '05',
    title: 'Confirm Booking',
    desc: 'Receive immediate booking confirmation and automated appointment reminders.',
  },
]

export default function AnimalsathiCaseStudyPage() {
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
                <span className="text-xs sm:text-sm font-mono font-bold text-[#EA580C] uppercase tracking-wider">
                  02 • CASE STUDY
                </span>
                <div className="w-10 sm:w-14 h-[1.5px] bg-[#EA580C]" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                  Animal Rescue & Care Ecosystem
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08] mb-5 sm:mb-6">
                A connected digital platform for animal rescue, care, and community support.
              </h1>

              <p className="text-neutral-600 text-sm sm:text-lg lg:text-[19px] leading-relaxed max-w-3xl font-normal mb-8 sm:mb-10">
                StackStich designed and engineered Animalsathi across web and mobile, connecting emergency reporting, nearby responder alerts, veterinary discovery, community features, and commerce through a shared real-time platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
                <a
                  href="https://animalsathi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="#mobile-experience"
                  className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3.5 rounded-full border border-black/[0.1] shadow-2xs transition-colors"
                >
                  <span>View App Experience</span>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </a>
              </div>
            </div>

            {/* Hero Dual-Device Mockup (project2.png) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#E7E2D9] border border-black/[0.08] shadow-lg">
              <Image
                src="/work/project2.png"
                alt="Animalsathi Web Platform on Laptop and Mobile Application on Smartphone by StackStich"
                fill
                priority
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
                  <span>Dual Surface: Next.js Web Hub + React Native Field App</span>
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
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                  PROJECT OVERVIEW
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-tight mb-4">
                  One product.<br />
                  Two connected experiences.
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  Animalsathi is a connected digital emergency rescue and animal-care ecosystem built to bridge roadside animal emergencies with veterinary discovery, volunteer coordination, community support, and pet-care services.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mt-3">
                  Rather than treating web and mobile as siloed assets, StackStich engineered them around a unified real-time cloud backbone—allowing citizens on streets to broadcast live emergencies while clinics, NGOs, and pet parents coordinate seamlessly.
                </p>
              </div>

              {/* Right Column: Editorial Metadata Bento Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Client</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Animalsathi</div>
                  <div className="text-xs text-neutral-500 mt-0.5">PawSOS Network</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Industry</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Animal Rescue & Care</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Healthcare & Social Impact</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Platforms</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Web · iOS · Android</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Cross-Platform Sync</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Services</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Full-Stack Ecosystem</div>
                  <div className="text-xs text-neutral-500 mt-0.5">UI/UX · Web · App · Cloud</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Status</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Live Project</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">Production-Ready</div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold mb-1">Core Tech</div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">Next.js · React Native</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Firebase · Maps · Razorpay</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. THE CHALLENGE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                THE CHALLENGE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                When every minute matters.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Roadside animal emergencies can be difficult to coordinate because citizens, nearby responders, NGOs, and veterinary services do not always share the same information or communication channel.
              </p>
            </div>

            {/* 3 Friction Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Fragmented Communication
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Emergency reports traditionally get lost in unstructured messaging groups without accurate GPS coordinates, animal severity classification, or responder accountability.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Location Uncertainty
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Vague street descriptions cause critical delays. Rescuers need exact spatial coordinates and distance calculations to navigate directly to the distressed animal.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2">
                  Disconnected Healthcare
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Beyond emergency rescue, everyday pet owners struggle to find verified 24/7 veterinary hospitals, book consultations, and coordinate social pet activities in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. CONNECTED ECOSYSTEM ARCHITECTURE ─── */}
        <section id="connected-ecosystem" className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#0F172A] text-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#F97316] mb-2.5">
                CONNECTED ECOSYSTEM
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                From one tap to coordinated action.
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Animalsathi unites two specialized digital surfaces with a shared cloud core, turning any smartphone into an immediate rescue beacon while providing organizations with an operational command hub.
              </p>
            </div>

            {/* Architecture Ecosystem Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Web Hub Card */}
              <div className="lg:col-span-4 rounded-[28px] p-6 sm:p-8 bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-mono font-bold mb-4">
                    <Globe className="w-3.5 h-3.5" />
                    <span>WEB PLATFORM</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Public Hub & Operations
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Next.js App Router portal designed for public discovery, organization onboarding, veterinary clinic management, and pet parent services.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>NGO & Clinic Onboarding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Veterinary Appointment Booking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Digital Volunteer ID Generator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Pet Store & Merchant Dashboard</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                  Surface: pawsos-web
                </div>
              </div>

              {/* Central Shared Core Card */}
              <div className="lg:col-span-4 rounded-[28px] p-6 sm:p-8 bg-gradient-to-b from-[#EA580C]/20 to-slate-900 border border-[#EA580C]/40 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA580C]/20 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/30 text-amber-300 text-xs font-mono font-bold mb-4">
                    <Database className="w-3.5 h-3.5" />
                    <span>SHARED CLOUD CORE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Real-Time Spatial Engine
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Unified Firebase Firestore database and Geofire bounding algorithms synchronizing data between web and mobile instantly.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                      <div className="text-xs font-bold text-amber-400 mb-0.5">Geohash Proximity Engine</div>
                      <div className="text-[11px] text-slate-400">Calculates spatial bounds to trigger alerts to volunteers within 7km.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                      <div className="text-xs font-bold text-amber-400 mb-0.5">Real-Time Firestore Sync</div>
                      <div className="text-[11px] text-slate-400">Instant case triage updates visible on both web dashboard and mobile radar.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                      <div className="text-xs font-bold text-amber-400 mb-0.5">Cloud Functions Dispatch</div>
                      <div className="text-[11px] text-slate-400">FCM push broadcast pipeline with custom emergency alarm sound overrides.</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-amber-400/80">
                  Shared: Firestore · Auth · Storage · FCM
                </div>
              </div>

              {/* Mobile App Card */}
              <div className="lg:col-span-4 rounded-[28px] p-6 sm:p-8 bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-400 text-xs font-mono font-bold mb-4">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>MOBILE FIELD APP</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Real-Time Field Tool
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    React Native mobile client engineered for citizens and field rescuers operating in urgent roadside rescue environments.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>1-Tap SOS with Camera & GPS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>High-Priority Siren Push Alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Interactive Live Google Map Radar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Case Crowdfunding & Razorpay</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                  Surface: pawsos-app (React Native)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. THE WEB PLATFORM DEEP DIVE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                THE WEB PLATFORM
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                The operational and community hub.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The web platform provides a structured, full-featured workspace for veterinary clinics, animal welfare organizations, registered volunteers, and pet parents.
              </p>
            </div>

            {/* 4 Web Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* Module 1 */}
              <div className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#EA580C]">01 / RESCUE & EMERGENCY</span>
                    <ShieldAlert className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                    Web SOS Incident Reporting
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Allows any citizen without the mobile app to report an animal emergency via desktop or browser. Captures browser geolocation, photo uploads, injury severity tags, and automatically commits to the Firestore spatial broadcast queue.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span>Route: /report</span>
                </div>
              </div>

              {/* Module 2 */}
              <div className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#EA580C]">02 / HEALTHCARE</span>
                    <Stethoscope className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                    Veterinary Directory & Booking
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Interactive Leaflet map directory featuring verified clinics, hospitals, and specialists. Pet owners can filter by proximity, emergency walk-in availability, doctor qualifications, and book consultation slots directly online.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span>Routes: /vets · /vet-appointments</span>
                </div>
              </div>

              {/* Module 3 */}
              <div className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#EA580C]">03 / COMMUNITY & VOLUNTEERS</span>
                    <Users className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                    Volunteer ID & Playdate Hub
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Streamlined rescuer onboarding that generates downloadable digital Volunteer ID cards with QR codes. Includes a community meetup portal for coordinating neighborhood dog walks, pet playdates, and adoption drives.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span>Routes: /volunteer-form · /playdate</span>
                </div>
              </div>

              {/* Module 4 */}
              <div className="p-8 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#EA580C]">04 / COMMERCE & OPERATIONS</span>
                    <ShoppingBag className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                    Marketplace & Merchant Dashboards
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Complete pet e-commerce experience with Razorpay checkout, product comparisons, and order tracking. Features dedicated seller portals for inventory management and organization dashboards for managing rescue caseloads.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span>Routes: /shop · /organization/dashboard · /seller-dashboard</span>
                </div>
              </div>
            </div>

            {/* Visual Web Showcase Grid */}
            <div className="space-y-6 sm:space-y-8 mt-12 sm:mt-16">
              {/* 1. Large Web Hero (hero_web.png) */}
              <div className="relative aspect-[1887/957] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#ECE8E1] border border-black/[0.08] shadow-sm group">
                <Image
                  src="/case_study/project2/hero_web.png"
                  alt="Animalsathi Web Platform Primary Desktop Interface"
                  fill
                  quality={95}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                  Primary Desktop Web Platform
                </div>
              </div>

              {/* 2. Two-Image Split: Rescue Ecosystem & Community Playdates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Ecosystem & How it Works (ecosystem.png) */}
                <div className="relative aspect-[1881/958] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project2/ecosystem.png"
                    alt="Animalsathi Rescue Workflow and Volunteer Network"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Rescue Workflow & Volunteer Coordination
                  </div>
                </div>

                {/* Playdate Community (playdate.png) */}
                <div className="relative aspect-[1884/964] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                  <Image
                    src="/case_study/project2/playdate.png"
                    alt="Animalsathi Pet Playdates and Community Social Hub"
                    fill
                    quality={92}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                    Pet Playdates & Community Social Hub
                  </div>
                </div>
              </div>

              {/* 3. Shop & Supplies Portal (shop.png) */}
              <div className="relative aspect-[1873/952] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-2xs group">
                <Image
                  src="/case_study/project2/shop.png"
                  alt="Animalsathi Pet Care Supplies and Marketplace"
                  fill
                  quality={92}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold select-none shadow-xs">
                  Pet Care Supplies & Marketplace
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. THE MOBILE APP DEEP DIVE ─── */}
        <section id="mobile-experience" className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                THE MOBILE APP
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A field tool built for moments that cannot wait.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The React Native mobile client was built for extreme operational clarity. Designed for citizens encountering roadside distress, it prioritizes immediate action over complex navigation.
              </p>
            </div>

            {/* 6 Mobile Features Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* 1 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center mb-4">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">1-Tap Emergency SOS</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Instant camera launch, automated GPS coordinate locking, animal category selection (Dog, Cat, Cow, Bird), and severity classification.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Nearby Emergency Alerts</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Notifee-powered high-priority siren notifications alerting registered volunteers within 7km of an active roadside incident.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Live Rescue Map Radar</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Full-screen Google Map interface displaying color-coded emergency pins (Critical, High, Medium) with real-time distance calculations.
                </p>
              </div>

              {/* 4 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Real-Time Case Tracking</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Live timeline updates tracking incident progress from Reported $\to$ Rescuer Assigned $\to$ Under Treatment $\to$ Resolved.
                </p>
              </div>

              {/* 5 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Nearby Help & 1-Tap Call</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Emergency directory connecting users directly with nearby animal shelters, ambulances, and NGOs via native phone dialers.
                </p>
              </div>

              {/* 6 */}
              <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.07] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Case Crowdfunding</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Verified medical treatment donation campaigns with real-time fund tracking and seamless in-app Razorpay contribution flows.
                </p>
              </div>
            </div>

            {/* Mobile App Screen Showcase Trio */}
            <div className="rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 bg-white border border-black/[0.08] shadow-xs">
              <div className="max-w-2xl text-left mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-black/[0.06] shadow-2xs mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  <span className="text-[10px] sm:text-xs font-bold text-neutral-900 tracking-wider uppercase">
                    Field Operational Screens
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mb-3">
                  Optimized for Fast-Paced Field Action
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                  Live UI screens from the React Native mobile application—built with 1-tap SOS camera reporting, background GPS locking, severity classification, and interactive proximity maps.
                </p>
              </div>

              {/* 3-Phone Screen Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center">
                {/* 1. App Home (app_home.png) */}
                <div className="flex flex-col items-center w-full max-w-[280px]">
                  <div className="relative w-full aspect-[346/754] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-black/[0.1] bg-[#0F172A] group">
                    <Image
                      src="/case_study/project2/app_home.png"
                      alt="Animalsathi Mobile App Home Dashboard"
                      fill
                      quality={95}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 280px, 33vw"
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600 mt-3.5 text-center">
                    Home Dashboard & Radar
                  </span>
                </div>

                {/* 2. App SOS (app_sos.png) */}
                <div className="flex flex-col items-center w-full max-w-[280px]">
                  <div className="relative w-full aspect-[352/762] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-black/[0.1] bg-[#0F172A] group">
                    <Image
                      src="/case_study/project2/app_sos.png"
                      alt="Animalsathi Mobile 1-Tap SOS Incident Reporter"
                      fill
                      quality={95}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 280px, 33vw"
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600 mt-3.5 text-center">
                    1-Tap SOS Incident Reporter
                  </span>
                </div>

                {/* 3. App Map (app_map.png) */}
                <div className="flex flex-col items-center w-full max-w-[280px]">
                  <div className="relative w-full aspect-[350/750] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-black/[0.1] bg-[#0F172A] group">
                    <Image
                      src="/case_study/project2/app_map.png"
                      alt="Animalsathi Mobile Live Proximity Map"
                      fill
                      quality={95}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 280px, 33vw"
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600 mt-3.5 text-center">
                    Interactive Proximity Map Radar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. THE RESCUE TIMELINE FLOW ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                THE RESCUE FLOW
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                From street-side discovery to coordinated response.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                A step-by-step visual pipeline illustrating how Animalsathi connects an emergency report to active on-ground medical care.
              </p>
            </div>

            {/* 6-Step Visual Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {RESCUE_PIPELINE.map((item) => (
                <div
                  key={item.step}
                  className="p-6 sm:p-7 rounded-[24px] bg-[#FAF7F2] border border-black/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#EA580C]">
                        PHASE {item.step}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. VETERINARY & EVERYDAY CARE FLOW ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                EVERYDAY CARE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Emergency rescue is only the beginning.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                Animalsathi extends beyond emergency rescue into everyday animal healthcare, giving pet owners a trusted pathway to clinic discovery and appointment scheduling.
              </p>
            </div>

            {/* 5-Step Horizontal Pathway */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
              {VET_CARE_STEPS.map((stepItem, idx) => (
                <div
                  key={stepItem.step}
                  className="p-5 sm:p-6 rounded-[22px] bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-neutral-400 mb-3">
                      STEP {stepItem.step}
                    </div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-neutral-600 text-xs leading-relaxed font-normal">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 9. DESIGN SYSTEM & VISUAL IDENTITY ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                DESIGN SYSTEM
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                Designed for urgency without losing trust.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                The visual language balances emergency response clarity with a warm, accessible aesthetic for everyday pet parents and organizations.
              </p>
            </div>

            {/* Color Palette Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-5 rounded-[22px] bg-[#EA580C] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-200">Primary Rescue</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Amber / Orange</div>
                  <div className="text-xs font-mono text-orange-100">#F97316 • #EA580C</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#DC2626] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-red-200">Critical Triage</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Emergency Red</div>
                  <div className="text-xs font-mono text-red-100">#EF4444 • #DC2626</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#059669] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-200">Active / Resolved</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Success Green</div>
                  <div className="text-xs font-mono text-emerald-100">#10B981 • #059669</div>
                </div>
              </div>

              <div className="p-5 rounded-[22px] bg-[#0F172A] text-white shadow-sm flex flex-col justify-between h-36 sm:h-40">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Deep Contrast</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Charcoal Slate</div>
                  <div className="text-xs font-mono text-slate-400">#0F172A • #1E293B</div>
                </div>
              </div>
            </div>

            {/* UI Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF7F2] border border-black/[0.06]">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">High-Contrast Triage</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Emergency cases use clear, universally recognizable color-coded badges so responders immediately know severity at a glance.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF7F2] border border-black/[0.06]">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Pulsating Status Indicators</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Live pulse animations reassure reporters that their SOS broadcast is actively circulating across nearby volunteer networks.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF7F2] border border-black/[0.06]">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2">Tactile Glassmorphism</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Subtle frosted glass overlays on maps and mobile drawers maintain context while offering rapid interaction triggers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. TECHNICAL ARCHITECTURE ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                TECHNICAL ARCHITECTURE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A shared real-time core behind web and mobile.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                By maintaining a unified Firebase data architecture, every roadside report, appointment booking, and triage update is synchronized across web and mobile without latency.
              </p>
            </div>

            {/* 4 Technology Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {TECH_GROUPS.map((group) => {
                const IconComponent = group.icon
                return (
                  <div
                    key={group.category}
                    className="p-8 rounded-[28px] bg-white border border-black/[0.07] shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center">
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
                            className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.04]"
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

        {/* ─── 11. OBSERVABLE OUTCOMES ─── */}
        <section className="w-full py-16 sm:py-24 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2.5">
                THE RESULT
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
                A connected experience for faster, clearer action.
              </h2>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                By uniting emergency reporting, spatial volunteer dispatch, veterinary appointment booking, and community commerce into one cohesive ecosystem, Animalsathi delivers a complete digital platform for animal welfare.
              </p>
            </div>

            {/* 4 Observable Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#EA580C] mb-4">01 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Connected Ecosystem
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Web portal and mobile app operate against the same real-time cloud backbone, eliminating data silos between citizens, volunteers, and clinics.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#EA580C] mb-4">02 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Low-Friction Reporting
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    SOS reporting combines device GPS, photo capture, and severity tags in a single screen, minimizing delay during critical roadside incidents.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#EA580C] mb-4">03 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Unified Care Discovery
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Pet owners can discover verified veterinary clinics, emergency hospitals, and shelters by distance and schedule appointments online.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-[24px] p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#EA580C] mb-4">04 / OUTCOME</div>
                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                    Operational Visibility
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Responders and welfare organizations have live visibility into active cases with real-time triage tracking and digital rescuer identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. NEXT PROJECT & GLOBAL CTA ─── */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            {/* Next Project Teaser (03 - Mobl) */}
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#FAF7F2] border border-black/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-24">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EA580C] uppercase tracking-wider mb-2">
                  <span>NEXT PROJECT</span>
                  <span>•</span>
                  <span>03</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  Mobl
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  E-commerce Website
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
                  A modern e-commerce store for discovering and shopping mobile accessories with ease.
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
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">
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
