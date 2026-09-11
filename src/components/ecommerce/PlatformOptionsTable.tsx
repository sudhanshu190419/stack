'use client'

import React from 'react'
import { Check, AlertCircle } from 'lucide-react'

interface PlatformItem {
  name: string
  bestFor: string
  setupSpeed: string
  customization: string
  maintenance: string
  scalability: string
  costProfile: string
  tradeoff: string
}

const PLATFORMS: PlatformItem[] = [
  {
    name: 'Shopify (Liquid / Custom Theme)',
    bestFor: 'Direct-to-consumer brands seeking rapid launch, hosted reliability, and simple day-to-day catalog management.',
    setupSpeed: 'Fast (4–8 weeks)',
    customization: 'High for storefront; checkout modified via Shopify Plus.',
    maintenance: 'Low — Shopify manages hosting, security, and PCI compliance.',
    scalability: 'Handles millions in sales with zero server configuration.',
    costProfile: 'Moderate subscription fees + transaction rates; lower initial build cost.',
    tradeoff: 'Platform transaction fees apply unless using Shopify Payments; checkout customizations restricted on basic plans.',
  },
  {
    name: 'Custom Headless Commerce (Next.js + Shopify/BigCommerce API)',
    bestFor: 'High-growth brands and omnichannel retailers demanding sub-second page transitions, unique UX, and custom frontend logic.',
    setupSpeed: 'Moderate (10–14 weeks)',
    customization: 'Unlimited — complete control over every pixel, transition, and workflow.',
    maintenance: 'Moderate — frontend hosted on Vercel/AWS; backend managed by commerce API.',
    scalability: 'Infinite edge scalability with zero performance drops during flash sales.',
    costProfile: 'Higher initial development; lower long-term platform limitations.',
    tradeoff: 'Requires professional frontend engineers for ongoing structural feature additions.',
  },
  {
    name: 'WooCommerce (WordPress)',
    bestFor: 'Content-heavy websites, publishing hubs, and businesses already deeply committed to the WordPress ecosystem.',
    setupSpeed: 'Moderate (6–10 weeks)',
    customization: 'Full open-source code ownership and layout freedom.',
    maintenance: 'High — you manage hosting, database caching, plugin updates, and security patches.',
    scalability: 'Requires dedicated cloud hosting and caching layers to survive traffic spikes.',
    costProfile: 'Zero core license fees; costs shift to high-tier hosting and plugin subscriptions.',
    tradeoff: 'Risk of plugin conflicts, database bloat, and slower mobile speeds if not engineered with extreme discipline.',
  },
  {
    name: 'Custom Bespoke Commerce (Next.js + Stripe / Supabase)',
    bestFor: 'Bespoke subscription products, digital goods, custom configurators, or non-standard purchasing workflows.',
    setupSpeed: 'Custom (10–16 weeks)',
    customization: '100% bespoke database modeling and checkout logic.',
    maintenance: 'Engineered for low maintenance via serverless cloud architecture.',
    scalability: 'Direct serverless edge scaling with zero third-party platform limitations.',
    costProfile: 'Higher upfront build; lowest ongoing monthly platform licensing fees.',
    tradeoff: 'Inventory management and warehouse workflows must be custom configured or connected via third-party APIs.',
  },
]

export default function PlatformOptionsTable() {
  return (
    <>
      {/* ─── DESKTOP VIEW (100% UNCHANGED) ─── */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="p-6 sm:p-7 rounded-2xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-neutral-950 font-mono">
                  {platform.name}
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal mb-5">
                {platform.bestFor}
              </p>

              {/* Spec breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-black/[0.06] text-xs">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium">Timeline:</span>
                  <span className="text-neutral-900 font-semibold text-right">{platform.setupSpeed}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium">Customization:</span>
                  <span className="text-neutral-900 text-right">{platform.customization}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium">Maintenance:</span>
                  <span className="text-neutral-900 text-right">{platform.maintenance}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium">Scalability:</span>
                  <span className="text-neutral-900 text-right">{platform.scalability}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium">Cost Profile:</span>
                  <span className="text-neutral-900 text-right">{platform.costProfile}</span>
                </div>
              </div>
            </div>

            {/* Honest Trade-off Box */}
            <div className="mt-6 pt-4 border-t border-black/[0.06] bg-[#FAF7F2] -mx-6 -mb-6 p-5 sm:p-6 rounded-b-2xl">
              <div className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-neutral-900">Trade-off:</strong>{' '}
                  {platform.tradeoff}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── MOBILE VIEW (STREAMLINED PLATFORM CARDS) ─── */}
      <div className="block lg:hidden space-y-4">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-bold text-neutral-950 font-mono leading-snug">
                  {platform.name}
                </h3>
              </div>
              <span className="inline-block text-[11px] font-medium text-[#9E6941] bg-[#FAF7F2] border border-[#9E6941]/20 px-2 py-0.5 rounded mb-2">
                Timeline: {platform.setupSpeed}
              </span>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {platform.bestFor}
              </p>
            </div>

            {/* Key Specs Mobile Grid */}
            <div className="pt-3 border-t border-black/[0.06] grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
                <span className="text-neutral-400 font-medium block text-[10px]">Customization</span>
                <span className="text-neutral-900 font-medium leading-snug">{platform.customization}</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
                <span className="text-neutral-400 font-medium block text-[10px]">Scalability</span>
                <span className="text-neutral-900 font-medium leading-snug">{platform.scalability}</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
                <span className="text-neutral-400 font-medium block text-[10px]">Maintenance</span>
                <span className="text-neutral-900 font-medium leading-snug">{platform.maintenance}</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
                <span className="text-neutral-400 font-medium block text-[10px]">Cost Profile</span>
                <span className="text-neutral-900 font-medium leading-snug">{platform.costProfile}</span>
              </div>
            </div>

            {/* Trade-off */}
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-start gap-2 text-[11px] text-neutral-700 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-neutral-900">Trade-off:</strong>{' '}
                {platform.tradeoff}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
