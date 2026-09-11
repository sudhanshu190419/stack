'use client'

import React from 'react'
import { Check, Minus } from 'lucide-react'

interface ComparisonRow {
  feature: string
  custom: string
  builder: string
  highlight?: boolean
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Core Web Vitals & Speed',
    custom: 'Sub-second load times, lightweight code bundles, 95+ PageSpeed scores.',
    builder: 'Heavy generic runtime scripts, slower mobile render, average 40-65 scores.',
    highlight: true,
  },
  {
    feature: 'Custom Workflows & Features',
    custom: 'Unlimited flexibility: bespoke calculators, custom APIs, custom database logic.',
    builder: 'Strictly limited to pre-packaged app store plugins and template blocks.',
  },
  {
    feature: 'Design Uniqueness & Craft',
    custom: '100% tailored to your brand identity with zero template limitations.',
    builder: 'Constrained by grid templates used by thousands of other businesses.',
  },
  {
    feature: 'Search Engine Optimization (SEO)',
    custom: 'Full technical SEO control: semantic hierarchy, custom schema, SSR, clean URLs.',
    builder: 'Basic on-page SEO; difficult to modify server responses or technical metadata.',
    highlight: true,
  },
  {
    feature: 'Platform Lock-In & Ownership',
    custom: 'You own 100% of your codebase and assets. Can be hosted anywhere without penalty.',
    builder: 'Locked inside proprietary closed ecosystem. Cannot export code or migrate easily.',
  },
  {
    feature: 'Scalability & Traffic Spikes',
    custom: 'Global edge deployment (CDN) handling high traffic with zero performance drops.',
    builder: 'Shared hosting resources that frequently slow down during peak usage.',
  },
  {
    feature: 'Initial Investment & Best Fit',
    custom: 'Higher upfront investment; optimal for established brands, scale-ups, and serious ventures.',
    builder: 'Low upfront cost; great for micro-budgets, hobby sites, and temporary personal tests.',
  },
]

export default function ComparisonTable() {
  return (
    <>
      {/* ─── MOBILE COMPARISON CARDS (< lg) ─── */}
      <div className="block lg:hidden space-y-3.5">
        {COMPARISON_DATA.map((row) => (
          <div
            key={row.feature}
            className={`p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs ${
              row.highlight ? 'ring-1 ring-[#9E6941]/30 bg-amber-50/10' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-neutral-950">
                {row.feature}
              </h3>
              {row.highlight && (
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#9E6941]/10 text-[#9E6941] shrink-0">
                  Key Advantage
                </span>
              )}
            </div>

            <div className="space-y-2">
              {/* Stack Build */}
              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#9E6941]/20">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-950 uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                  <span>Stack Custom Build</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-800 leading-relaxed font-medium">
                  <Check className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                  <span>{row.custom}</span>
                </div>
              </div>

              {/* Website Builder */}
              <div className="p-3 rounded-lg bg-neutral-50/80 border border-black/[0.05]">
                <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Website Builder / Template
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                  <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{row.builder}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── DESKTOP TABLE (lg+) - 100% UNCHANGED ─── */}
      <div className="hidden lg:block w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[30%]">
                Criteria
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[35%] bg-[#F2EDE4]/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                  <span>Stack Custom Build</span>
                </span>
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[35%]">
                Website Builder / Template
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
            {COMPARISON_DATA.map((row) => (
              <tr
                key={row.feature}
                className={`transition-colors hover:bg-neutral-50/70 ${
                  row.highlight ? 'bg-amber-50/20' : ''
                }`}
              >
                <td className="py-4 sm:py-5 px-5 sm:px-7 font-semibold text-neutral-900 align-top">
                  {row.feature}
                </td>
                <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-800 bg-[#F2EDE4]/30 align-top leading-relaxed font-medium">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>{row.custom}</span>
                  </div>
                </td>
                <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-500 align-top leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <Minus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{row.builder}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
