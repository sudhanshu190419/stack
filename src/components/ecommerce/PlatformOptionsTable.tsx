'use client'

import React from 'react'
import {
  AlertCircle,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  Layers,
} from 'lucide-react'

interface PlatformItem {
  name: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
  bestFor: string
  tradeoff: string
}

const PLATFORMS: PlatformItem[] = [
  {
    name: 'Shopify',
    icon: ShoppingBag,
    desc: 'A great choice for businesses that want to launch quickly with reliable hosting, easy store management, and a large ecosystem of e-commerce tools.',
    bestFor: 'New and growing online stores',
    tradeoff: 'Higher platform costs in exchange for simpler store management.',
  },
  {
    name: 'Custom Shopify',
    icon: SlidersHorizontal,
    desc: "A flexible option for businesses that want Shopify's e-commerce tools with a more customized storefront and customer experience.",
    bestFor: 'Established stores that need more flexibility',
    tradeoff: 'More customization usually requires additional design and development work.',
  },
  {
    name: 'WooCommerce',
    icon: Store,
    desc: 'A flexible option for businesses already using WordPress that want more control over their store, content, and customization.',
    bestFor: 'WordPress-based businesses',
    tradeoff: 'More responsibility for hosting, updates, plugins, and ongoing maintenance.',
  },
  {
    name: 'Custom E-commerce',
    icon: Layers,
    desc: 'A fully tailored solution for businesses with unique shopping experiences, workflows, or features that standard platforms cannot easily provide.',
    bestFor: 'Complex or highly customized stores',
    tradeoff: 'Higher initial development effort in exchange for greater control and flexibility.',
  },
]

export default function PlatformOptionsTable() {
  return (
    <>
      {/* ─── DESKTOP VIEW (2x2 GRID) ─── */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          return (
            <div
              key={platform.name}
              className="p-6 sm:p-7 rounded-2xl border border-black/[0.08] bg-white flex flex-col justify-between shadow-xs hover:border-black/[0.2] transition-colors duration-200"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-4 text-[#9E6941]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-2.5">
                  {platform.name}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal mb-5">
                  {platform.desc}
                </p>

                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed">
                    <span className="font-semibold text-neutral-900 shrink-0">Best For:</span>
                    <span className="text-neutral-600">{platform.bestFor}</span>
                  </div>
                </div>
              </div>

              {/* Trade-off Box */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] bg-[#FAF7F2] -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-5 sm:p-6 rounded-b-2xl">
                <div className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-neutral-900">Trade-off:</strong>{' '}
                    {platform.tradeoff}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── MOBILE VIEW ─── */}
      <div className="block lg:hidden space-y-4">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          return (
            <div
              key={platform.name}
              className="p-4 sm:p-5 rounded-xl border border-black/[0.08] bg-white shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-center mb-3 text-[#9E6941]">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-950 tracking-tight leading-snug mb-1.5">
                  {platform.name}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal mb-3">
                  {platform.desc}
                </p>

                <div className="pt-3 border-t border-black/[0.06] mb-3">
                  <div className="flex items-start gap-1.5 text-xs leading-relaxed">
                    <span className="font-semibold text-neutral-900 shrink-0">Best For:</span>
                    <span className="text-neutral-600">{platform.bestFor}</span>
                  </div>
                </div>
              </div>

              {/* Trade-off */}
              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-black/[0.06] flex items-start gap-2 text-xs text-neutral-700 leading-relaxed">
                <AlertCircle className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-neutral-900">Trade-off:</strong>{' '}
                  {platform.tradeoff}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
