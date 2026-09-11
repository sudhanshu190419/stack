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
    <div className="w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
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
  )
}
