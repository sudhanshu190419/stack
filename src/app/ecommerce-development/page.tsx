import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import EcomHeroVisual from '@/components/ecommerce/EcomHeroVisual'
import EcomFaqAccordion from '@/components/ecommerce/EcomFaqAccordion'
import { ECOM_FAQ_DATA } from '@/components/ecommerce/ecomFaqData'
import PlatformOptionsTable from '@/components/ecommerce/PlatformOptionsTable'
import EcomVsBizTable from '@/components/ecommerce/EcomVsBizTable'

export const metadata: Metadata = {
  title: 'E-Commerce Website Development Services | Stack',
  description:
    'Stack designs and develops high-converting, fast, and scalable online stores. Custom Shopify, headless commerce, mobile checkout optimization, and technical e-commerce SEO.',
  alternates: {
    canonical: 'https://stack.studio/ecommerce-development',
  },
  openGraph: {
    title: 'E-Commerce Website Development Services | Stack',
    description:
      'Online stores built to turn browsers into buyers. Stack designs and develops modern e-commerce experiences across desktop and mobile.',
    url: 'https://stack.studio/ecommerce-development',
    siteName: 'Stack Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Website Development Services | Stack',
    description:
      'High-converting online stores and custom e-commerce architecture. Built by Stack.',
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
      name: 'E-Commerce Development Services',
      item: 'https://stack.studio/ecommerce-development',
    },
  ],
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'E-Commerce Website Development Services',
  serviceType: 'E-Commerce Development',
  provider: {
    '@type': 'Organization',
    name: 'Stack Studio',
    url: 'https://stack.studio',
  },
  description:
    'Design, engineering, and optimization of custom online stores, Shopify platforms, headless commerce systems, and conversion-focused checkout funnels.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'E-Commerce Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Online Store Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Shopify Storefront Design & Architecture',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Headless E-Commerce Engineering',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile E-Commerce & Checkout Optimization',
        },
      },
    ],
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ECOM_FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// ─── SHARED DATA CONSTANTS ───
const OFFERINGS_DATA = [
  {
    title: 'New Online Stores',
    desc: 'Complete online stores built around your products, brand, and customers.',
  },
  {
    title: 'Custom E-commerce Websites',
    desc: 'Unique shopping experiences designed around your brand and how your customers shop.',
  },
  {
    title: 'E-commerce Redesigns',
    desc: 'Modernize an existing store with a cleaner design, better structure, and easier shopping experience.',
  },
  {
    title: 'Product Catalogs',
    desc: 'Organize products into clear categories with useful search, filters, and product options.',
  },
  {
    title: 'Subscriptions & Recurring Payments',
    desc: 'Set up subscription-based products and recurring payments for businesses that sell on a repeat basis.',
  },
  {
    title: 'Custom Shopping Features',
    desc: 'Build useful shopping features such as product bundles, custom options, wish lists, and other tailored experiences.',
  },
  {
    title: 'Mobile-Friendly Commerce',
    desc: 'Create a smooth shopping experience that works naturally across phones, tablets, and desktop.',
  },
  {
    title: 'Business Integrations',
    desc: 'Connect your store with payments, shipping, inventory, CRM, email, and other tools your business uses.',
  },
]



const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Discovery & Planning',
    body: 'We learn about your products, customers, goals, and store requirements to create a clear plan for the project.',
  },
  {
    step: '02',
    title: 'Shopping Experience',
    body: 'We plan the store structure, navigation, categories, product pages, and checkout experience so customers can shop easily.',
  },
  {
    step: '03',
    title: 'Store Design',
    body: 'We create the visual design for your store and refine it with your feedback before development begins.',
  },
  {
    step: '04',
    title: 'Store Development',
    body: 'We build the store, add the features you need, and connect the services required to run your business.',
  },
  {
    step: '05',
    title: 'Product & Catalog Setup',
    body: 'We organize your products, categories, images, prices, and other store content so everything is ready for launch.',
  },
  {
    step: '06',
    title: 'Testing & Refinement',
    body: 'We test browsing, cart, checkout, payments, and the store experience across different devices before launch.',
  },
  {
    step: '07',
    title: 'Launch & Training',
    body: 'We take your store live, complete the final checks, and show your team how to manage products, orders, and store content.',
  },
]



const SEO_CARDS = [
  {
    title: 'Structured Product Schema',
    desc: 'JSON-LD Product, Offer, and AggregateRating markup enabling Google rich snippets showing price, stock, and star ratings.',
  },
  {
    title: 'Canonical URL Hierarchy',
    desc: 'Correct canonical tag configuration preventing duplicate content penalties caused by multi-category product links.',
  },
  {
    title: 'Clean Category Taxonomy',
    desc: 'Crawlable, logical breadcrumbs and breadcrumb schema that guide search spiders and shoppers through your collection tree.',
  },
  {
    title: 'Image Alt Text & Compression',
    desc: 'Descriptive alt text and automated WebP compression ensuring products rank prominently on Google Image Search.',
  },
]



const PORTFOLIO_PROJECTS = [
  {
    name: 'VELORA',
    type: 'E-Commerce Platform',
    desc: 'A modern direct-to-consumer store engineered for style, rapid product browsing, simplified filtering, and seamless checkout.',
    image: '/projects/project2.png',
    alt: 'Velora Modern E-Commerce Platform Design & Development by Stack',
    platform: 'Shopify Architecture',
  },
  {
    name: 'MOBL',
    type: 'Direct-to-Consumer Hardware Store',
    desc: 'A high-performance product website featuring interactive product specifications, accessory bundling, and global payment checkout.',
    image: '/projects/project3.png',
    alt: 'Mobl Product & Commerce Engineering by Stack',
    platform: 'Custom Headless',
  },
  {
    name: 'SAVOR',
    type: 'Culinary Commerce & Guest Platform',
    desc: 'A premium culinary platform combining atmosphere, digital merchandise sales, private dining booking, and table reservations.',
    image: '/projects/project1.png',
    alt: 'Savor Digital Experience by Stack',
    platform: 'Custom Web Commerce',
  },
]

export default function EcommerceDevelopmentPage() {
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
        <section className="relative w-full overflow-hidden pt-6 sm:pt-12 lg:pt-16 pb-10 sm:pb-18 lg:pb-24 border-b border-black/[0.06]">
          {/* DESKTOP HERO (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
              <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1">
                <EcomHeroVisual />
              </div>
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    E-COMMERCE DEVELOPMENT
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Online stores built for<br />
                  <span className="font-serif italic font-normal text-[#9E6941]">your business.</span>
                </h1>
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  We design and build modern online stores that make it easy for customers to discover products, shop confidently, and complete their purchase on any device.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href="mailto:hello@stack.studio?subject=Start%20an%20E-Commerce%20Project"
                    className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="#ecom-portfolio"
                    className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-black font-medium text-sm sm:text-[15px] underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
                  >
                    <span>See Our Work</span>
                  </Link>
                </div>
                <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Easy Shopping Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Mobile-Friendly Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE HERO (TOUCH-FIRST STREAMLINED) */}
          <div className="block lg:hidden px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                E-COMMERCE DEVELOPMENT
              </span>
              <div className="w-8 h-[1.5px] bg-[#9E6941]" />
            </div>

            <h1 className="text-[32px] sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
              Online stores built for<br />
              <span className="font-serif italic font-normal text-[#9E6941]">your business.</span>
            </h1>

            <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
              We design and build modern online stores that make it easy for customers to discover products, shop confidently, and complete their purchase on any device.
            </p>

            {/* Mobile Hero Visual */}
            <div className="my-5">
              <EcomHeroVisual />
            </div>

            {/* Mobile Actions Stack */}
            <div className="space-y-2.5">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20E-Commerce%20Project"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="#ecom-portfolio"
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full border border-black/[0.1] bg-white text-neutral-900 font-medium text-sm active:bg-neutral-50 transition-colors"
              >
                <span>See Our Work</span>
              </Link>
            </div>

            {/* Mobile Trust Strip */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-y-2 text-[11px] sm:text-xs text-neutral-700 font-medium select-none">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Easy Shopping Experience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Mobile-Friendly Store</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WE BUILD (OFFERINGS) ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    OUR E-COMMERCE SERVICES
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-tight">
                  Online stores built for your business.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  We design and build online stores that make it easy for customers to discover products, shop confidently, and complete purchases across every device.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Tell us about your store</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {OFFERINGS_DATA.map((item, idx) => (
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

          {/* MOBILE VIEW (COMPACT 2-COLUMN GRID) */}
          <div className="block lg:hidden px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                OUR E-COMMERCE SERVICES
              </span>
              <div className="w-6 h-[1.5px] bg-[#9E6941]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
              Online stores built for your business.
            </h2>
            <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              We design and build online stores that make it easy for customers to discover products, shop confidently, and complete purchases across every device.
            </p>
            <div className="mt-3 mb-6">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941]"
              >
                <span>Tell us about your store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {OFFERINGS_DATA.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl border border-black/[0.07] bg-white flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E6941] mb-1 block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ─── 5. PLATFORM OPTIONS & TRADE-OFFS ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  CHOOSING THE RIGHT PLATFORM
                </span>
                <div className="w-6 sm:w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Choosing the right e-commerce platform.
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-600 text-xs sm:text-base leading-relaxed">
                There is no one-size-fits-all solution. We help you choose the right platform based on your products, budget, features, and plans for growth.
              </p>
            </div>

            {/* Platform Comparison Cards */}
            <PlatformOptionsTable />
          </div>
        </section>

        {/* ─── 6. OUR E-COMMERCE PROCESS ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  METHODOLOGY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Our e-commerce development process.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                From planning and design to testing and launch, we keep the process clear, organized, and focused on building a store that works for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white relative flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#9E6941] tracking-tight block mb-3 font-mono">
                      {stage.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {stage.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW (COMPACT 2-COLUMN GRID) */}
          <div className="block lg:hidden px-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  METHODOLOGY
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                Our e-commerce development process.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                From planning and design to testing and launch, we keep the process clear, organized, and focused on building a store that works for your business.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PROCESS_STAGES.map((stage, idx) => (
                <div
                  key={stage.step}
                  className={`p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs ${
                    idx === PROCESS_STAGES.length - 1 ? 'col-span-2' : ''
                  }`}
                >
                  <div>
                    <span className="text-lg font-black text-[#9E6941] tracking-tight block mb-1 font-mono">
                      {stage.step}
                    </span>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {stage.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ─── 8. MOBILE E-COMMERCE ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    MOBILE-FIRST COMMERCE
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                  Your online store needs to work beautifully on mobile.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  For many customers, their phone is the first place they discover and shop from your store. We design mobile experiences that are simple to browse, easy to navigate, and built to make checkout straightforward.
                </p>
                <div className="mt-6 space-y-3 text-xs sm:text-[13.5px] text-neutral-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>Easy Navigation:</strong> Clear menus, categories, and product pages that help customers find what they need quickly.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>Simple Checkout:</strong> A focused checkout experience with convenient payment options and as few unnecessary steps as possible.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>Touch-Friendly Design:</strong> Buttons, filters, product options, and other controls designed to work comfortably on smaller screens.
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-black/[0.08] bg-[#FAF7F2] space-y-4">
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Mobile Experience
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Fast &amp; Clear
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Optimized images and layouts for a smooth mobile browsing experience.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Easy to Browse
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Simple menus, categories, search, and filters that work naturally on smaller screens.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Comfortable to Use
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Touch-friendly controls and readable content throughout the store.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Simple Checkout
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      A focused purchasing experience designed to reduce unnecessary steps.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (STREAMLINED STACK) */}
          <div className="block lg:hidden px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                MOBILE-FIRST COMMERCE
              </span>
              <div className="w-6 h-[1.5px] bg-[#9E6941]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
              Your online store needs to work beautifully on mobile.
            </h2>
            <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              For many customers, their phone is the first place they discover and shop from your store. We design mobile experiences that are simple to browse, easy to navigate, and built to make checkout straightforward.
            </p>

            <div className="mt-4 space-y-2 text-xs text-neutral-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>Easy Navigation:</strong> Clear menus, categories, and product pages that help customers find what they need quickly.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>Simple Checkout:</strong> A focused checkout experience with convenient payment options and as few unnecessary steps as possible.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>Touch-Friendly Design:</strong> Buttons, filters, product options, and other controls designed to work comfortably on smaller screens.
                </span>
              </div>
            </div>

            {/* Mobile Standards Grid */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-neutral-950 mb-2">
                Mobile Experience
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                  <span className="font-bold text-neutral-900 block text-xs mb-1">
                    Fast &amp; Clear
                  </span>
                  <span className="text-neutral-500 leading-relaxed text-[11px]">
                    Optimized images and layouts for a smooth mobile browsing experience.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                  <span className="font-bold text-neutral-900 block text-xs mb-1">
                    Easy to Browse
                  </span>
                  <span className="text-neutral-500 leading-relaxed text-[11px]">
                    Simple menus, categories, search, and filters that work naturally on smaller screens.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                  <span className="font-bold text-neutral-900 block text-xs mb-1">
                    Comfortable to Use
                  </span>
                  <span className="text-neutral-500 leading-relaxed text-[11px]">
                    Touch-friendly controls and readable content throughout the store.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                  <span className="font-bold text-neutral-900 block text-xs mb-1">
                    Simple Checkout
                  </span>
                  <span className="text-neutral-500 leading-relaxed text-[11px]">
                    A focused purchasing experience designed to reduce unnecessary steps.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. SEO FOR E-COMMERCE ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  SEARCH VISIBILITY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Search engine optimization built for catalog scale.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                E-commerce SEO requires strict technical hygiene. Unlike simple
                blogs, online stores feature thousands of variant combinations,
                faceted filters, and pagination that can easily confuse search
                engine spiders if not architected with care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SEO_CARDS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW (COMPACT 2-COLUMN GRID) */}
          <div className="block lg:hidden px-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  SEARCH VISIBILITY
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                SEO built for catalog scale.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Strict technical hygiene for variant combinations, facet filters, and pagination.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SEO_CARDS.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ─── 11. E-COMMERCE VS REGULAR BUSINESS WEBSITE ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/40">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-14">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  STRATEGIC COMPARISON
                </span>
                <div className="w-6 sm:w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                E-commerce store vs. standard business website.
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-600 text-xs sm:text-base leading-relaxed">
                Not every business should immediately launch a transactional store.
                Here is a practical comparison to clarify which website
                architecture fits your commercial model.
              </p>
            </div>

            {/* Comparison Table / Mobile Cards */}
            <EcomVsBizTable />
          </div>
        </section>

        {/* ─── 12. REAL PORTFOLIO ─── */}
        <section
          id="ecom-portfolio"
          className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]"
        >
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                    REAL STORE WORK
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                  E-commerce and transactional platforms by Stack.
                </h2>
                <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Real client platforms designed and developed for direct
                  digital purchasing, merchandising, and product engagement.
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {PORTFOLIO_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="group flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-xs hover:border-black/[0.25] transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden border-b border-black/[0.06]">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 450px"
                    />
                  </div>

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
                        {project.platform}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW (STACKED PORTFOLIO CARDS) */}
          <div className="block lg:hidden px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                REAL STORE WORK
              </span>
              <div className="w-6 h-[1.5px] bg-[#9E6941]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
              E-commerce platforms by Stack.
            </h2>
            <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Real client platforms designed and developed for direct digital purchasing.
            </p>
            <div className="mt-3 mb-6">
              <Link
                href="/#work"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300"
              >
                <span>View all studio work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_PROJECTS.map((project) => (
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
                      <h3 className="text-base font-bold text-neutral-950 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                        {project.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                      <Link
                        href="/#work"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10.5px] font-mono text-neutral-400">
                        {project.platform}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 13. FAQ SECTION ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                      E-COMMERCE FAQ
                    </span>
                    <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight">
                    Frequently asked questions about online stores.
                  </h2>
                  <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Have questions regarding checkout systems, platforms, or
                    product migrations? We are ready to help.
                  </p>

                  <div className="mt-6 sm:mt-8 p-5 rounded-xl border border-black/[0.08] bg-white">
                    <p className="text-xs font-semibold text-neutral-900 mb-1">
                      Need tailored advice for your store?
                    </p>
                    <p className="text-xs text-neutral-500 mb-3">
                      Discuss your product catalog with our team.
                    </p>
                    <a
                      href="mailto:hello@stack.studio?subject=Question%20about%20E-Commerce"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                    >
                      <span>hello@stack.studio</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <EcomFaqAccordion />
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (STACKED FAQ + CONTACT CARD) */}
          <div className="block lg:hidden px-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  E-COMMERCE FAQ
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
                Frequently asked questions.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Common questions regarding platforms, checkout, and timelines.
              </p>
            </div>

            <EcomFaqAccordion />

            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-white">
              <p className="text-xs font-bold text-neutral-900 mb-1">
                Need tailored advice for your store?
              </p>
              <p className="text-xs text-neutral-500 mb-2">
                Discuss your product catalog with our team.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=Question%20about%20E-Commerce"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E6941]"
              >
                <span>hello@stack.studio</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── 14. FINAL CALL TO ACTION ─── */}
        <section className="relative w-full py-14 sm:py-24 lg:py-32 bg-[#FAF7F2] text-center overflow-hidden">
          {/* Ambient warm radial wash */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-40 blur-3xl pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(245, 230, 208, 0.8) 0%, rgba(250, 247, 242, 0) 70%)',
            }}
          />

          {/* DESKTOP CTA (100% UNCHANGED) */}
          <div className="hidden lg:block relative z-10 max-w-3xl mx-auto px-6 sm:px-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/[0.08] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY TO SELL ONLINE?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1]">
              Let&apos;s build an online store{' '}
              <span className="text-[#9E6941]">people want to use.</span>
            </h2>

            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl mx-auto">
              Tell us about your products, target audience, preferred platform,
              and growth targets. We will schedule a discovery conversation and
              provide a clear, fixed-price proposal.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20E-Commerce%20Project"
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

            <p className="mt-8 text-xs text-neutral-500">
              We respond within 24 hours. No obligation.
            </p>
          </div>

          {/* MOBILE CTA (STREAMLINED TOUCH ACTIONS) */}
          <div className="block lg:hidden relative z-10 px-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/[0.08] bg-white text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-800 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>READY TO SELL ONLINE?</span>
            </div>

            <h2 className="text-3xl font-bold text-neutral-950 tracking-tight leading-[1.15]">
              Let&apos;s build an online store{' '}
              <span className="text-[#9E6941]">people want to use.</span>
            </h2>

            <p className="mt-3 text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Tell us about your products and goals. We will provide a clear, itemized proposal within 24 hours.
            </p>

            <div className="mt-6 space-y-2.5 max-w-xs mx-auto">
              <a
                href="mailto:hello@stack.studio?subject=Start%20an%20E-Commerce%20Project"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111111] active:bg-black text-white font-medium text-sm shadow-sm transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/#contact"
                className="block text-center text-xs text-neutral-800 underline underline-offset-4 decoration-neutral-300 py-1"
              >
                Or contact us online
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-neutral-500">
              We respond within 24 hours. No obligation.
            </p>
          </div>
        </section>

        {/* ─── 15. REUSED SITE FOOTER ─── */}
        <Footer />
      </main>
    </>
  )
}
