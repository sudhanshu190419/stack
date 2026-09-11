'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ECOM_FAQ_DATA } from './ecomFaqData'

export default function EcomFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {ECOM_FAQ_DATA.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={item.question} className="py-5 sm:py-6 transition-colors">
            <button
              onClick={() => toggleItem(idx)}
              type="button"
              className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
              aria-expanded={isOpen}
              aria-controls={`ecom-faq-answer-${idx}`}
              id={`ecom-faq-question-${idx}`}
            >
              <span className="text-base sm:text-lg font-semibold text-neutral-950 group-hover:text-[#9E6941] transition-colors pr-2">
                {item.question}
              </span>
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/[0.08] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-neutral-950 text-white' : 'bg-white text-neutral-700 group-hover:border-neutral-400'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={`ecom-faq-answer-${idx}`}
                role="region"
                aria-labelledby={`ecom-faq-question-${idx}`}
                className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl pr-4 animate-in fade-in duration-200"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
