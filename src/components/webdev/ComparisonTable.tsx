'use client'

import React from 'react'
import {
  Check,
  Minus,
  Gauge,
  SlidersHorizontal,
  Palette,
  Search,
  ShieldCheck,
  TrendingUp,
  Target,
  type LucideIcon,
} from 'lucide-react'

interface ComparisonRow {
  feature: string
  custom: string
  builder: string
  icon: LucideIcon
  highlight?: boolean
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Speed & Performance',
    icon: Gauge,
    custom:
      'Built with performance in mind, with optimized assets and clean implementation.',
    builder:
      'Performance depends on the platform, template, apps, and integrations used.',
  },
  {
    feature: 'Custom Features',
    icon: SlidersHorizontal,
    custom:
      'Custom features and workflows can be built around your requirements.',
    builder:
      'Usually limited to available templates, plugins, and platform features.',
  },
  {
    feature: 'Design',
    icon: Palette,
    custom: 'Designed specifically around your brand and business goals.',
    builder: 'Often starts from pre-built layouts and templates.',
  },
  {
    feature: 'SEO',
    icon: Search,
    custom:
      "Full control over the site's structure, content, metadata, and technical SEO.",
    builder: 'SEO options vary depending on the platform and plan.',
  },
  {
    feature: 'Ownership & Flexibility',
    icon: ShieldCheck,
    custom:
      'Your website is built specifically for you, with greater control over the code and hosting.',
    builder: "More dependent on the platform's ecosystem and rules.",
  },
  {
    feature: 'Growth',
    icon: TrendingUp,
    custom: 'Can be extended as your business and requirements grow.',
    builder:
      'Scaling may depend on platform capabilities, apps, and plan limitations.',
  },
  {
    feature: 'Best For',
    icon: Target,
    custom:
      'Businesses that want a unique, flexible website built around their needs.',
    builder: 'Businesses looking for a faster, simpler starting point.',
  },
]

export default function ComparisonTable() {
  return (
    <>
      {/* ─── MOBILE COMPARISON CARDS (< lg) ─── */}
      <div className="block lg:hidden space-y-3.5">
        {COMPARISON_DATA.map((row) => {
          const IconComp = row.icon
          return (
            <div
              key={row.feature}
              className={`p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs ${
                row.highlight ? 'ring-1 ring-[#9E6941]/30 bg-amber-50/10' : ''
              }`}
            >
              <div className="flex items-start gap-2.5 mb-3">
                <IconComp
                  className="w-[18px] h-[18px] text-[#9E6941] shrink-0 mt-0.5"
                  strokeWidth={1.75}
                />
                <h3 className="text-sm font-bold text-neutral-950 leading-snug">
                  {row.feature}
                </h3>
              </div>

              <div className="space-y-2">
                {/* Stack Build */}
                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#9E6941]/20">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-950 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                    <span>STACK CUSTOM BUILD</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-neutral-800 leading-relaxed font-medium">
                    <Check className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                    <span>{row.custom}</span>
                  </div>
                </div>

                {/* Website Builder */}
                <div className="p-3 rounded-lg bg-neutral-50/80 border border-black/[0.05]">
                  <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    WEBSITE BUILDER / TEMPLATE
                  </div>
                  <div className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                    <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{row.builder}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── DESKTOP TABLE (lg+) ─── */}
      <div className="hidden lg:block w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[620px] table-fixed">
          <thead>
            <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[30%]">
                CRITERIA
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[35%] bg-[#F2EDE4]/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                  <span>STACK CUSTOM BUILD</span>
                </span>
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[35%]">
                WEBSITE BUILDER / TEMPLATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
            {COMPARISON_DATA.map((row) => {
              const IconComp = row.icon
              return (
                <tr
                  key={row.feature}
                  className={`h-[100px] transition-colors hover:bg-neutral-50/70 ${
                    row.highlight ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <td className="py-3.5 sm:py-4 px-5 sm:px-7 font-semibold text-neutral-900 align-top">
                    <div className="flex items-start gap-2.5">
                      <IconComp
                        className="w-[18px] h-[18px] text-[#9E6941] shrink-0 mt-0.5"
                        strokeWidth={1.75}
                      />
                      <span className="leading-snug">{row.feature}</span>
                    </div>
                  </td>
                  <td className="py-3.5 sm:py-4 px-5 sm:px-7 text-neutral-800 bg-[#F2EDE4]/30 align-top leading-relaxed font-medium">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                      <span>{row.custom}</span>
                    </div>
                  </td>
                  <td className="py-3.5 sm:py-4 px-5 sm:px-7 text-neutral-500 align-top leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Minus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{row.builder}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
