'use client'

import React from 'react'
import { Check, Minus } from 'lucide-react'

interface ComparisonRow {
  dimension: string
  app: string
  web: string
  highlight?: boolean
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Primary Customer Intent',
    app: 'High-frequency utility, repeat actions, personalized accounts, and daily active use.',
    web: 'Initial discovery, search queries, broad brand awareness, and one-off research.',
    highlight: true,
  },
  {
    dimension: 'Device Hardware Access',
    app: 'Deep native integration with biometrics (Face ID/Touch ID), camera, Bluetooth, GPS, and sensors.',
    web: 'Limited browser sandbox; restricted access to background sensors and hardware peripherals.',
  },
  {
    dimension: 'User Retention & Notifications',
    app: 'Direct home screen placement with targeted, high-delivery push notifications and badges.',
    web: 'Relies on email, SMS, or optional browser notifications which have lower engagement rates.',
    highlight: true,
  },
  {
    dimension: 'Offline Functionality',
    app: 'Reliable local data storage and background queues that work without an active internet connection.',
    web: 'Requires steady connectivity; offline caching is possible via Service Workers but limited.',
  },
  {
    dimension: 'Distribution & Discovery',
    app: 'Published through Apple App Store and Google Play Store; requires download commitment.',
    web: 'Instant access via any browser; discovered directly through Google Search (SEO) and web links.',
  },
  {
    dimension: 'Friction to First Interaction',
    app: 'Higher initial barrier: user must download, install, and grant permissions before first use.',
    web: 'Zero friction: visitor clicks a link and is immediately viewing your content or catalog.',
  },
  {
    dimension: 'Best Initial Decision',
    app: 'Ideal when customers interact with your brand multiple times per week or require native device tools.',
    web: 'Ideal for establishing digital presence, validating early concepts, and driving inbound search leads.',
  },
]

export default function AppVsWebComparison() {
  return (
    <div className="w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
      <table className="w-full text-left border-collapse min-w-[620px]">
        <thead>
          <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[28%]">
              Factor
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[36%] bg-[#F2EDE4]/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                <span>Mobile Application</span>
              </span>
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[36%]">
              Responsive Website
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
          {COMPARISON_ROWS.map((row) => (
            <tr
              key={row.dimension}
              className={`transition-colors hover:bg-neutral-50/70 ${
                row.highlight ? 'bg-amber-50/20' : ''
              }`}
            >
              <td className="py-4 sm:py-5 px-5 sm:px-7 font-semibold text-neutral-900 align-top">
                {row.dimension}
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
          ))}
        </tbody>
      </table>
    </div>
  )
}
