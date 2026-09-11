import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  CreditCard,
  Database,
  Eye,
  Filter,
  Layers,
  LineChart,
  Lock,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tag,
  Truck,
  Users,
  Zap,
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
    desc: 'Complete turnkey storefronts configured with branded design, catalog structure, payment gateways, shipping rules, and tax compliance.',
  },
  {
    title: 'Custom E-Commerce Websites',
    desc: 'Bespoke shopping experiences designed without template boundaries, tailored specifically to high-end brands and unique product lines.',
  },
  {
    title: 'E-Commerce Store Redesigns',
    desc: 'Modernizing outdated storefronts to improve conversion rates, speed up mobile purchasing, and reduce checkout drop-offs.',
  },
  {
    title: 'Product Catalog Architecture',
    desc: 'Organizing complex product lines with intuitive multi-level categories, variant selectors, custom filters, and instant search.',
  },
  {
    title: 'Subscription & Recurring Billing',
    desc: 'Seamless recurring delivery and subscription clubs configured via Shopify Subscriptions or Stripe Billing for predictable MRR.',
  },
  {
    title: 'Custom Shopping Experiences',
    desc: 'Interactive product configurators, bundle builders, and tailored gift-box workflows that increase average order value (AOV).',
  },
  {
    title: 'Responsive Mobile Commerce',
    desc: 'Mobile-first storefronts with one-tap express payments (Apple Pay, Google Pay) and touch-optimized image galleries.',
  },
  {
    title: 'Business Tool Integrations',
    desc: 'Direct synchronization with your ERP, warehouse fulfillment, CRM (Klaviyo), accounting software, and inventory management.',
  },
]

const PRINCIPLES_DATA = [
  {
    title: 'Clear Product Discovery',
    detail:
      'Predictive search and logical category filtering help shoppers locate the exact item they want within seconds.',
  },
  {
    title: 'High-Impact Product Pages',
    detail:
      'High-resolution imagery, zoom capabilities, clear pricing, variant selectors, and transparent inventory indicators.',
  },
  {
    title: 'Mobile-First Ergonomics',
    detail:
      'Sticky Add-to-Cart bars, swipeable photo carousels, and thumb-accessible navigation designed for on-the-go buying.',
  },
  {
    title: 'Sub-Second Page Speed',
    detail:
      'Fast loading times directly prevent bounce rates; every 100ms delay costs conversion and lowers organic search ranking.',
  },
  {
    title: 'Visible Trust Signals',
    detail:
      'Clear return policies, secure payment badges, verified customer reviews, and transparent delivery estimates build confidence.',
  },
  {
    title: 'Intuitive Navigation',
    detail:
      'Clean mega-menus, breadcrumb trails, and curated collection links that never leave shoppers at dead-end pages.',
  },
  {
    title: 'Frictionless Slide-Out Cart',
    detail:
      'Instant cart slide-outs with free shipping progress meters and one-click upsells without interrupting the shopping flow.',
  },
  {
    title: 'Single-Page Checkout',
    detail:
      'Minimal required form fields, auto-address completion, guest checkout options, and zero surprise shipping costs at the end.',
  },
  {
    title: 'Facet & Attribute Filters',
    detail:
      'Real-time filtering by size, color, price range, and availability without tedious page reloads.',
  },
  {
    title: 'Unmistakable Calls to Action',
    detail:
      'High-contrast, prominent primary buttons that clearly guide the shopper through each stage of the transaction.',
  },
]

const CAPABILITIES_DATA = [
  {
    iconName: 'ShoppingBag',
    title: 'Bespoke Store Design',
    desc: 'Custom UI/UX layout crafted in Figma, ensuring your store stands out from generic template competitors.',
  },
  {
    iconName: 'Tag',
    title: 'Product Display & Variants',
    desc: 'Dynamic color swatches, size selectors, real-time stock status, and downloadable product documentation.',
  },
  {
    iconName: 'Layers',
    title: 'Collections & Categories',
    desc: 'Automated and manual merchandising rules, sort-by filters, and curated seasonal campaign pages.',
  },
  {
    iconName: 'ShoppingCart',
    title: 'Cart & Checkout Funnels',
    desc: 'Slide-out carts, dynamic free-shipping threshold calculators, discount validation, and express payment buttons.',
  },
  {
    iconName: 'CreditCard',
    title: 'Global Payment Gateways',
    desc: 'Stripe, Shopify Payments, Apple Pay, Google Pay, PayPal, and flexible Buy Now Pay Later (Klarna/Afterpay) options.',
  },
  {
    iconName: 'Truck',
    title: 'Shipping & Fulfillment',
    desc: 'Real-time carrier rates (UPS/FedEx/DHL), flat-rate rules, local pickup options, and automated order tracking.',
  },
  {
    iconName: 'Package',
    title: 'Inventory & Stock Sync',
    desc: 'Multi-location inventory tracking, out-of-stock backorders, and real-time synchronization with physical POS systems.',
  },
  {
    iconName: 'Users',
    title: 'Customer Accounts',
    desc: 'Self-service customer portals for order history tracking, reordering, saved shipping addresses, and wishlist management.',
  },
  {
    iconName: 'LineChart',
    title: 'E-Commerce Analytics',
    desc: 'Enhanced e-commerce telemetry in Google Analytics 4, tracking product impressions, add-to-cart ratios, and drop-offs.',
  },
  {
    iconName: 'Sparkles',
    title: 'Marketing & CRM Integration',
    desc: 'Klaviyo email flows, abandoned cart automated sequences, Meta Pixel, and Google Merchant Center product feed sync.',
  },
  {
    iconName: 'Search',
    title: 'E-Commerce SEO Foundations',
    desc: 'Structured Product Schema (pricing, stock, ratings), canonical variant management, and optimized category hierarchy.',
  },
  {
    iconName: 'Zap',
    title: 'Performance & Edge Speed',
    desc: 'Modern WebP/AVIF image delivery, pre-rendered collections, and global CDN caching to maintain rapid browsing during peak sales.',
  },
]

function renderCapIcon(iconName: string, className = 'w-5 h-5 text-[#9E6941]') {
  switch (iconName) {
    case 'ShoppingBag':
      return <ShoppingBag className={className} />
    case 'Tag':
      return <Tag className={className} />
    case 'Layers':
      return <Layers className={className} />
    case 'ShoppingCart':
      return <ShoppingCart className={className} />
    case 'CreditCard':
      return <CreditCard className={className} />
    case 'Truck':
      return <Truck className={className} />
    case 'Package':
      return <Package className={className} />
    case 'Users':
      return <Users className={className} />
    case 'LineChart':
      return <LineChart className={className} />
    case 'Sparkles':
      return <Sparkles className={className} />
    case 'Search':
      return <Search className={className} />
    case 'Zap':
    default:
      return <Zap className={className} />
  }
}

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'Strategy & Commercial Scoping',
    body: 'We audit your catalog structure, shipping rules, payment methods, target demographics, and required third-party business integrations.',
  },
  {
    step: '02',
    title: 'UX & Store Architecture',
    body: 'We map out the shopping journey: navigation hierarchy, category taxonomy, product filtering logic, and cart-to-checkout flows.',
  },
  {
    step: '03',
    title: 'Custom Storefront Design',
    body: 'We create high-fidelity Figma mockups of the homepage, collection grids, product pages, and slide-out cart, incorporating your visual identity.',
  },
  {
    step: '04',
    title: 'Frontend & Backend Engineering',
    body: 'We develop custom Liquid themes or Next.js storefront components, configure API endpoints, and wire up payment systems.',
  },
  {
    step: '05',
    title: 'Product & Catalog Setup',
    body: 'We import product variants, SKUs, photography, sizing charts, and inventory counts, verifying formatting consistency.',
  },
  {
    step: '06',
    title: 'Rigorous Transactional QA',
    body: 'We run live test transactions on multiple mobile devices, test automated tax calculation, verify discount codes, and audit shipping rates.',
  },
  {
    step: '07',
    title: 'Launch & Team Training',
    body: 'We switch DNS, configure SSL security, verify analytics and pixel tracking, and guide your team on processing orders and updating products.',
  },
]

const CONVERSION_POINTS = [
  {
    area: 'Product Discovery',
    how: 'Visual collection headers, instant facet filters, and smart search reduce time-to-product, preventing shopper frustration.',
  },
  {
    area: 'Visual Hierarchy & Clarity',
    how: 'Uncluttered product pages lead the eye naturally from price and variant selection down to the primary Add to Cart button.',
  },
  {
    area: 'Friction-Free Mobile Cart',
    how: 'Slide-out carts show current totals, shipping thresholds, and express checkout shortcuts without navigating away from the page.',
  },
  {
    area: 'Transparent Shipping Rules',
    how: 'Displaying estimated delivery timeframes and clear return guidelines upfront eliminates surprise drop-offs on the final payment screen.',
  },
  {
    area: 'Streamlined Checkout Form',
    how: 'Auto-fill address lookup, clear error states, and guest checkout eliminate the friction of forced account creation.',
  },
  {
    area: 'Retention & Repeat Buying',
    how: 'Automated post-purchase transactional emails, easy order tracking pages, and integrated loyalty rewards encourage repeat orders.',
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

const COST_DRIVERS = [
  {
    driver: 'Catalog Size & Variants',
    detail:
      'A boutique store with 15 products takes less migration effort than a catalog with 2,000 SKUs and complex multi-attribute matrices.',
  },
  {
    driver: 'Platform Selection',
    detail:
      'Turnkey Shopify setups require lower initial configuration. Bespoke headless architectures require dedicated frontend engineering.',
  },
  {
    driver: 'Custom Storefront Design',
    detail:
      'Tailoring an approved Shopify theme is faster than producing a bespoke Figma design system with unique animations from scratch.',
  },
  {
    driver: 'ERP & Inventory Sync',
    detail:
      'Connecting to warehouse management systems or physical POS inventory requires custom API plumbing and webhook testing.',
  },
  {
    driver: 'Subscriptions & Recurring',
    detail:
      'Integrating recurring billing engines, custom customer delivery schedules, and automated renewal emails adds workflow logic.',
  },
  {
    driver: 'Legacy Data Migration',
    detail:
      'Migrating historical customer accounts, past orders, and SEO redirect maps from an older platform requires diligent QA.',
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
                  Online stores built to turn{' '}
                  <span className="font-serif italic font-normal text-[#9E6941]">browsers into buyers.</span>
                </h1>
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  Stack designs and develops modern e-commerce experiences that
                  make products easy to discover, trust, and purchase across
                  desktop and mobile. Fast load speeds, effortless navigation,
                  and friction-free checkout engineered for growth.
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
                    <span>View Our Work</span>
                    <span className="text-xs">↓</span>
                  </Link>
                </div>
                <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Frictionless Mobile Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Shopify & Custom Headless</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941]" />
                    <span>Fast Product Discovery</span>
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
              Online stores built to turn{' '}
              <span className="font-serif italic font-normal text-[#9E6941]">browsers into buyers.</span>
            </h1>

            <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-normal">
              Stack designs and develops modern e-commerce experiences that
              make products easy to discover, trust, and purchase across
              desktop and mobile. Fast load speeds and friction-free checkout.
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
                <span>View Our Work</span>
                <span className="text-xs">↓</span>
              </Link>
            </div>

            {/* Mobile Trust Strip */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-1.5 text-center text-[10.5px] text-neutral-700 font-medium">
              <div className="p-2 rounded-lg bg-white/80 border border-black/[0.04]">
                <span>Frictionless Checkout</span>
              </div>
              <div className="p-2 rounded-lg bg-white/80 border border-black/[0.04]">
                <span>Shopify & Headless</span>
              </div>
              <div className="p-2 rounded-lg bg-white/80 border border-black/[0.04]">
                <span>Fast Discovery</span>
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
                    OUR OFFERINGS
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9E6941]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-tight">
                  E-commerce experiences engineered to sell.
                </h2>
                <p className="mt-4 sm:mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                  Whether launching your first direct-to-consumer store or
                  migrating an established catalog to a modern headless
                  architecture, we tailor each storefront to your brand identity,
                  operational requirements, and commercial targets.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E6941] hover:text-[#7d502e] transition-colors"
                  >
                    <span>Discuss your store requirements</span>
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
                OUR OFFERINGS
              </span>
              <div className="w-6 h-[1.5px] bg-[#9E6941]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
              E-commerce experiences engineered to sell.
            </h2>
            <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              Turnkey Shopify setups or custom headless stores tailored to your catalog and commercial targets.
            </p>
            <div className="mt-3 mb-6">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E6941]"
              >
                <span>Discuss store requirements</span>
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

        {/* ─── 3. WHAT MAKES A GOOD E-COMMERCE WEBSITE ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  PRINCIPLES OF SUCCESS
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What makes an online store succeed?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Great e-commerce is not just about attractive visuals. It is
                about removing every microscopic point of friction between product
                curiosity and confirmed purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
              {PRINCIPLES_DATA.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-5 sm:p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#9E6941] mb-2 block">
                      #{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.detail}
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
                  PRINCIPLES OF SUCCESS
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                What makes an online store succeed?
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Removing friction between product curiosity and confirmed purchase.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PRINCIPLES_DATA.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E6941] mb-1 block">
                      #{idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. CAPABILITIES SECTION ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  FULL-STACK SCOPE
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Our complete e-commerce capabilities.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                From visual storefront branding to complex back-office
                inventory plumbing, we provide complete technical execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITIES_DATA.map((cap) => (
                <div
                  key={cap.title}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4">
                      {renderCapIcon(cap.iconName, 'w-5 h-5 text-[#9E6941]')}
                    </div>
                    <h3 className="text-base font-semibold text-neutral-950 mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {cap.desc}
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
                  FULL-STACK SCOPE
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                Our complete e-commerce capabilities.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                From storefront branding to checkout and inventory sync.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {CAPABILITIES_DATA.map((cap) => (
                <div
                  key={cap.title}
                  className="p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="w-7 h-7 rounded-md bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-2">
                      {renderCapIcon(cap.iconName, 'w-4 h-4 text-[#9E6941]')}
                    </div>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {cap.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {cap.desc}
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
                  TECHNICAL PLATFORMS
                </span>
                <div className="w-6 sm:w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Choosing the right e-commerce platform.
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-600 text-xs sm:text-base leading-relaxed">
                There is no universal best e-commerce platform. We evaluate your
                product volume, operational staff, and growth targets to select the most cost-effective and scalable foundation.
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
                A structured, milestone-driven approach that ensures your store
                is thoroughly tested, legally compliant, and ready to accept live
                transactions from day one.
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
                Our e-commerce process.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                A milestone-driven approach ensuring your store is tested and transaction-ready from day one.
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

        {/* ─── 7. CONVERSION-FOCUSED SHOPPING EXPERIENCE ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06] bg-[#F5F1EA]/50">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  REDUCING FRICTION
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Engineered for higher conversion at every step.
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Getting visitors to your store is only half the battle. We focus
                intensely on the psychological and technical details that guide
                curious shoppers into confident purchasers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {CONVERSION_POINTS.map((item) => (
                <div
                  key={item.area}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.area}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                      {item.how}
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
                  REDUCING FRICTION
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                Engineered for higher conversion.
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Guiding curious shoppers into confident purchasers with reduced friction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {CONVERSION_POINTS.map((item) => (
                <div
                  key={item.area}
                  className="p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {item.area}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.how}
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
                  Over 70% of online shopping happens on smartphones.
                </h2>
                <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  If your store is slow, clumsy, or difficult to navigate on a
                  phone, you are losing more than half of your potential sales.
                  We treat mobile not as an afterthought or secondary view, but as
                  the primary sales channel.
                </p>
                <div className="mt-6 space-y-3 text-xs sm:text-[13.5px] text-neutral-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sticky Action Bars:</strong> The Add-to-Cart button
                      remains instantly accessible regardless of page scroll depth.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>One-Tap Express Checkout:</strong> Direct Apple Pay,
                      Google Pay, and Shop Pay integration bypasses cumbersome credit
                      card typing.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>
                      <strong>Thumb-Friendly Touch Targets:</strong> Sizing
                      selectors and quantity toggles sized specifically to prevent
                      accidental mis-taps.
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-black/[0.08] bg-[#FAF7F2] space-y-4">
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Mobile Experience Standards:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Adaptive Image Quality
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Serves compressed WebP/AVIF formats formatted for retina phone screens.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Accordion Specifications
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Collapsible technical details and sizing guides prevent infinite scrolling.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Smooth Drawer Navigation
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Instant slide-in category menus with sub-collection drill-downs.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06]">
                    <span className="font-bold text-neutral-900 block mb-1">
                      Zero Accidental Zoom
                    </span>
                    <span className="text-neutral-500 leading-relaxed">
                      Input fields styled at native 16px to prevent intrusive browser auto-zooming.
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
              Over 70% of online shopping happens on smartphones.
            </h2>
            <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              We treat mobile as your primary sales channel, engineering fast load speeds and seamless checkout ergonomics.
            </p>

            <div className="mt-4 space-y-2 text-xs text-neutral-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>Sticky Action Bars:</strong> Instant Add-to-Cart access regardless of scroll.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>One-Tap Express Checkout:</strong> Apple Pay, Google Pay, and Shop Pay.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong>Thumb-Friendly Targets:</strong> Sizing toggles designed to prevent mis-taps.
                </span>
              </div>
            </div>

            {/* Mobile Standards Grid */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                <span className="font-bold text-neutral-900 block text-xs mb-1">
                  Adaptive Images
                </span>
                <span className="text-neutral-500 leading-relaxed text-[11px]">
                  Compressed WebP/AVIF formats formatted for retina screens.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                <span className="font-bold text-neutral-900 block text-xs mb-1">
                  Accordion Specs
                </span>
                <span className="text-neutral-500 leading-relaxed text-[11px]">
                  Collapsible details prevent infinite scrolling.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                <span className="font-bold text-neutral-900 block text-xs mb-1">
                  Drawer Navigation
                </span>
                <span className="text-neutral-500 leading-relaxed text-[11px]">
                  Slide-in category menus with sub-collection drill-downs.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-black/[0.06]">
                <span className="font-bold text-neutral-900 block text-xs mb-1">
                  Zero Mis-Zooming
                </span>
                <span className="text-neutral-500 leading-relaxed text-[11px]">
                  Native 16px inputs prevent annoying auto-zooms.
                </span>
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

        {/* ─── 10. WHAT AFFECTS E-COMMERCE COST ─── */}
        <section className="relative w-full py-12 sm:py-20 lg:py-24 border-b border-black/[0.06]">
          {/* DESKTOP VIEW (100% UNCHANGED) */}
          <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  BUDGET TRANSPARENCY
                </span>
                <div className="w-8 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                What determines the cost of an e-commerce website?
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Building an online store involves both visual design and transactional
                engineering. Here are the genuine commercial and technical drivers
                behind project estimates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COST_DRIVERS.map((item) => (
                <div
                  key={item.driver}
                  className="p-6 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">
                      {item.driver}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-black/[0.08] bg-[#FAF7F2] max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Ready to calculate your store investment?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Tell us about your product range, current platform, and commercial goals.
                  We provide itemized, fixed-fee proposals.
                </p>
              </div>
              <a
                href="mailto:hello@stack.studio?subject=E-Commerce%20Store%20Quote"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Request a Store Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* MOBILE VIEW (COMPACT 2-COLUMN GRID + PROPOSAL CTA) */}
          <div className="block lg:hidden px-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-800">
                  BUDGET TRANSPARENCY
                </span>
                <div className="w-6 h-[1.5px] bg-[#9E6941]" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                What affects store cost?
              </h2>
              <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Genuine technical and operational drivers behind project estimates.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {COST_DRIVERS.map((item) => (
                <div
                  key={item.driver}
                  className="p-3 rounded-xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h3 className="text-xs font-bold text-neutral-950 leading-snug mb-1">
                      {item.driver}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Quote Card */}
            <div className="mt-6 p-4 rounded-xl border border-black/[0.08] bg-[#FAF7F2] space-y-3">
              <h3 className="text-sm font-bold text-neutral-950 leading-snug">
                Ready to calculate your store investment?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Tell us about your product range and current platform. We provide itemized, fixed-fee proposals.
              </p>
              <a
                href="mailto:hello@stack.studio?subject=E-Commerce%20Store%20Quote"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#111111] active:bg-black text-white text-xs font-medium transition-colors shadow-xs"
              >
                <span>Request a Store Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
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
