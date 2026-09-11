'use client'

import React from 'react'

interface ComparisonRow {
  factor: string
  custom: string
  template: string
  highlight?: boolean
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    factor: 'Uniqueness & Identity',
    custom:
      '100% original visual language tailored specifically to your brand positioning, typography pairings, and market differentiation.',
    template:
      'Shared layout structures used by hundreds or thousands of competing websites, often resulting in a familiar, cookie-cutter aesthetic.',
    highlight: true,
  },
  {
    factor: 'Brand & Aesthetic Control',
    custom:
      'Complete control over micro-spacing, bespoke typography scales, tailored color palettes, custom art direction, and subtle interactive moments.',
    template:
      'Restricted to the theme author’s pre-set container widths, font selections, and rigid styling options.',
  },
  {
    factor: 'User Journey & UX Control',
    custom:
      'Wireframed around how your actual target customers search, evaluate, and make decisions, removing all extraneous steps.',
    template:
      'Forced to compromise your business offerings to fit pre-built placeholder blocks and predefined content hierarchies.',
    highlight: true,
  },
  {
    factor: 'Conversion & CTA Architecture',
    custom:
      'Strategically positioned trust signals, scannable value propositions, and tailored conversion funnels engineered for your specific offer.',
    template:
      'Generic call-to-action modules that often emphasize visual filler over clear, persuasive messaging hierarchy.',
  },
  {
    factor: 'Scalability & Flexibility',
    custom:
      'Modular design system that effortlessly expands as you introduce new service lines, products, team members, or landing pages.',
    template:
      'Adding non-standard features often requires cumbersome plugin stacking, theme overrides, or breaks layout responsiveness.',
  },
  {
    factor: 'Performance & Code Cleanliness',
    custom:
      'Clean component architecture with zero bloat; only loads the exact CSS, fonts, and assets required for your specific design.',
    template:
      'Often bundles hundreds of unused theme styles, scripts, and heavyweight slider libraries that slow down load speeds.',
  },
  {
    factor: 'Cost & Timeline Profile',
    custom:
      'Higher upfront investment (typically 3–6 weeks design scope) delivering long-term brand equity, higher conversion, and zero lock-in.',
    template:
      'Lower initial financial outlay and immediate availability, but frequently incurs recurring plugin costs and replacement within 12–18 months.',
  },
  {
    factor: 'When It Makes Sense',
    custom:
      'Ideal for established businesses, high-growth startups, luxury brands, and professional services where credibility and conversions drive revenue.',
    template:
      'Practical for hobby projects, early concept validation on shoestring budgets, or micro-businesses that just need a basic digital business card.',
    highlight: true,
  },
]

export default function DesignVsTemplateTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
      <table className="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[24%]">
              Evaluation Factor
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[38%] bg-[#F2EDE4]/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                <span>Custom Website Design</span>
              </span>
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[38%]">
              <span>Template-Based Website</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
          {COMPARISON_DATA.map((row) => (
            <tr
              key={row.factor}
              className={`transition-colors ${
                row.highlight ? 'bg-amber-50/25 hover:bg-amber-50/40' : 'hover:bg-neutral-50/50'
              }`}
            >
              <td className="py-4 sm:py-5 px-5 sm:px-7 font-semibold text-neutral-950 align-top">
                {row.factor}
              </td>
              <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-800 leading-relaxed align-top bg-[#F2EDE4]/30">
                <p>{row.custom}</p>
              </td>
              <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-600 leading-relaxed align-top">
                <p>{row.template}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
