'use client'

import React from 'react'
import { Check, Minus } from 'lucide-react'

interface DimensionRow {
  dimension: string
  ecommerce: string
  business: string
  highlight?: boolean
}

const DIMENSIONS: DimensionRow[] = [
  {
    dimension: 'Primary Conversion Objective',
    ecommerce: 'Direct transactional revenue: customers select products, enter payment details, and complete purchase online.',
    business: 'Lead generation & relationship building: visitors book consultations, call, or request proposals.',
    highlight: true,
  },
  {
    dimension: 'Technical Architecture',
    ecommerce: 'Complex state machine: catalog filtering, dynamic inventory tracking, tax calculation, shipping engines, and cart persistence.',
    business: 'Informational architecture: service showcases, case studies, team profiles, and lead intake forms.',
  },
  {
    dimension: 'Security & Compliance',
    ecommerce: 'Strict PCI DSS compliance, encrypted payment tokenization, customer account security, and GDPR/CCPA transaction logging.',
    business: 'Standard SSL encryption, secure form processing, spam prevention, and privacy policy compliance.',
  },
  {
    dimension: 'Operational Complexity',
    ecommerce: 'High: requires continuous inventory sync, order fulfillment, shipping label generation, returns, and customer service.',
    business: 'Low to moderate: inbound inquiries routed to your sales inbox or CRM pipeline for manual follow-up.',
    highlight: true,
  },
  {
    dimension: 'Search Engine Strategy',
    ecommerce: 'High volume of long-tail product queries, category hierarchy optimization, and Google Merchant Center product feeds.',
    business: 'High-intent commercial keywords, local SEO, localized service queries, and thought leadership articles.',
  },
  {
    dimension: 'When It Makes Sense',
    ecommerce: 'You sell physical products, standardized digital downloads, or self-service subscriptions that do not require sales negotiation.',
    business: 'You sell custom high-ticket services, consultancies, enterprise contracts, or bespoke solutions requiring a discovery conversation.',
  },
]

export default function EcomVsBizTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white shadow-xs">
      <table className="w-full text-left border-collapse min-w-[620px]">
        <thead>
          <tr className="border-b border-black/[0.08] bg-[#F9F7F3]">
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 w-[28%]">
              Evaluation Factor
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 w-[36%] bg-[#F2EDE4]/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9E6941]" />
                <span>E-Commerce Website</span>
              </span>
            </th>
            <th className="py-4 sm:py-5 px-5 sm:px-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 w-[36%]">
              Standard Business Website
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06] text-xs sm:text-[13.5px]">
          {DIMENSIONS.map((row) => (
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
                  <span>{row.ecommerce}</span>
                </div>
              </td>
              <td className="py-4 sm:py-5 px-5 sm:px-7 text-neutral-500 align-top leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Minus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{row.business}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
