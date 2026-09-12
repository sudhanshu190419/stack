'use client'

import React from 'react'
import {
  Check,
  Minus,
  Users,
  Smartphone,
  Bell,
  WifiOff,
  MousePointerClick,
  Target,
  type LucideIcon,
} from 'lucide-react'

interface ComparisonRow {
  dimension: string
  icon: LucideIcon
  app: string
  web: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Customer Usage',
    icon: Users,
    app: 'Best when customers use your service regularly or return frequently.',
    web: 'Great for first-time visitors, information, and occasional visits.',
  },
  {
    dimension: 'Device Features',
    icon: Smartphone,
    app: 'Can make use of features such as camera, location, notifications, and other device capabilities.',
    web: 'Can access many browser features without requiring an installation.',
  },
  {
    dimension: 'Notifications',
    icon: Bell,
    app: 'Supports direct push notifications and reminders.',
    web: 'Primarily communicates through the website, email, or other channels.',
  },
  {
    dimension: 'Offline Use',
    icon: WifiOff,
    app: 'Can support selected features when an internet connection is limited or unavailable.',
    web: 'Offline capabilities depend on the browser and how the website is built.',
  },
  {
    dimension: 'Getting Started',
    icon: MousePointerClick,
    app: 'Requires users to download and install the app.',
    web: 'Users can open the website immediately from a link or search result.',
  },
  {
    dimension: 'Best For',
    icon: Target,
    app: 'Businesses with frequent repeat usage, customer accounts, or app-specific features.',
    web: 'Businesses focused on visibility, information, leads, bookings, or online sales.',
  },
]

export default function AppVsWebComparison() {
  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE COMPARISON COMPOSITION (< lg) - CLEAN CARD COMPARISON              */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full space-y-3">
        {COMPARISON_ROWS.map((row, idx) => {
          const Icon = row.icon
          return (
            <div
              key={row.dimension}
              className="p-4 rounded-xl border border-black/[0.08] bg-white"
            >
              {/* Factor Title */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/[0.05]">
                <span className="text-[10px] font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-1.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <Icon className="w-4 h-4 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-neutral-950">
                  {row.dimension}
                </h3>
              </div>

              {/* Mobile App vs Responsive Website side-by-side / stacked blocks */}
              <div className="space-y-2">
                {/* App Block */}
                <div className="p-3 rounded-lg bg-[#F5F1EA]/80 border border-[#9E6941]/20">
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941]" />
                    <span>Mobile Application</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                      {row.app}
                    </p>
                  </div>
                </div>

                {/* Web Block */}
                <div className="p-3 rounded-lg bg-neutral-50/80 border border-black/[0.05]">
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    <span>Responsive Website</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {row.web}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP COMPARISON COMPOSITION (>= lg) - 100% PRESERVED EXACT TABLE       */}
      {/* ========================================================================= */}
      <div className="hidden lg:block w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[28%]">
                FACTOR
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[36%] bg-[#F2EDE4]/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                  <span>MOBILE APPLICATION</span>
                </span>
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[36%]">
                RESPONSIVE WEBSITE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
            {COMPARISON_ROWS.map((row) => {
              const Icon = row.icon
              return (
                <tr
                  key={row.dimension}
                  className="transition-colors hover:bg-neutral-50/70"
                >
                  <td className="py-4 sm:py-5 px-5 sm:px-7 font-semibold text-neutral-900 align-top">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-[18px] h-[18px] text-[#9E6941] shrink-0" strokeWidth={1.5} />
                      <span>{row.dimension}</span>
                    </div>
                  </td>
                  <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-800 bg-[#F2EDE4]/30 align-top leading-relaxed font-medium">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                      <span>{row.app}</span>
                    </div>
                  </td>
                  <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-500 align-top leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Minus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{row.web}</span>
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
