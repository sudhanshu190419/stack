'use client'

import React from 'react'
import {
  Palette,
  SlidersHorizontal,
  Users,
  MousePointerClick,
  RefreshCw,
  Clock,
  Target,
  Check,
  Minus,
  type LucideIcon,
} from 'lucide-react'

interface ComparisonRow {
  factor: string
  icon: LucideIcon
  custom: string
  template: string
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    factor: 'Design & Brand',
    icon: Palette,
    custom:
      'Designed around your brand, style, and business rather than a pre-made layout.',
    template:
      'Starts with an existing design that can be customized within the template\'s options.',
  },
  {
    factor: 'Flexibility',
    icon: SlidersHorizontal,
    custom:
      'Layouts and features can be designed around exactly what your business needs.',
    template:
      'Works well within the features and structure provided by the chosen template.',
  },
  {
    factor: 'User Experience',
    icon: Users,
    custom:
      'The structure and navigation can be planned around your customers and the information they need.',
    template:
      'User flows are generally adapted to the existing template structure.',
  },
  {
    factor: 'Calls to Action',
    icon: MousePointerClick,
    custom:
      'Page layouts can be structured around your specific goals, such as enquiries, bookings, sales, or sign-ups.',
    template:
      'Calls to action are usually placed within the template\'s existing page structure.',
  },
  {
    factor: 'Future Changes',
    icon: RefreshCw,
    custom:
      'Built with your future needs in mind, making it easier to extend the design as your business evolves.',
    template:
      'New requirements may depend on available template features, plugins, and customization options.',
  },
  {
    factor: 'Cost & Time',
    icon: Clock,
    custom:
      'Usually requires more planning and design time, making it a larger initial investment.',
    template:
      'Typically offers a faster and lower-cost way to get started.',
  },
  {
    factor: 'Best For',
    icon: Target,
    custom:
      'Businesses that want a distinctive brand experience and more control over the final website.',
    template:
      'Businesses that need a simple website quickly and have straightforward requirements.',
  },
]

export default function DesignVsTemplateTable() {
  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE COMPARISON COMPOSITION (< lg) - CLEAN CARD COMPARISON              */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full space-y-3">
        {COMPARISON_DATA.map((row, idx) => {
          const Icon = row.icon
          return (
            <div
              key={row.factor}
              className="p-4 rounded-xl border border-black/[0.08] bg-white shadow-xs"
            >
              {/* Factor Title */}
              <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-black/[0.05]">
                <span className="text-[10px] font-mono font-bold text-[#9E6941] bg-[#9E6941]/10 px-1.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <Icon className="w-4 h-4 text-[#9E6941] shrink-0" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-neutral-950">
                  {row.factor}
                </h3>
              </div>

              {/* Comparison stacked blocks */}
              <div className="space-y-2">
                {/* Custom Website Block */}
                <div className="p-3 rounded-lg bg-[#F5F1EA]/80 border border-[#9E6941]/20">
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941]" />
                    <span>Custom Website Design</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#9E6941] shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                      {row.custom}
                    </p>
                  </div>
                </div>

                {/* Template Block */}
                <div className="p-3 rounded-lg bg-neutral-50/80 border border-black/[0.05]">
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    <span>Template-Based Website</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {row.template}
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
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[26%]">
                EVALUATION FACTOR
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[37%] bg-[#F2EDE4]/70">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                  <span>CUSTOM WEBSITE DESIGN</span>
                </span>
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[37%]">
                <span>TEMPLATE-BASED WEBSITE</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
            {COMPARISON_DATA.map((row) => {
              const Icon = row.icon
              return (
                <tr
                  key={row.factor}
                  className="transition-colors hover:bg-neutral-50/50"
                >
                  <td className="py-4 sm:py-5 px-5 sm:px-7 font-semibold text-neutral-950 align-top">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-[18px] h-[18px] text-[#9E6941] shrink-0" strokeWidth={1.5} />
                      <span>{row.factor}</span>
                    </div>
                  </td>
                  <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-800 leading-relaxed align-top bg-[#F2EDE4]/30">
                    <p>{row.custom}</p>
                  </td>
                  <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-600 leading-relaxed align-top">
                    <p>{row.template}</p>
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

