import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Crown, CreditCard, ArrowRight, Play } from 'lucide-react'

export default function OfferSection() {
  return (
    <section
      id="offer"
      className="relative w-full bg-[#FAF7F2] text-neutral-900 overflow-hidden border-t border-black/[0.04]"
    >
      <div className="w-full pl-5 sm:pl-8 lg:pl-14 xl:pl-16 2xl:pl-20 pr-5 sm:pr-8 lg:pr-0 pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">
        {/* Top Eyebrow Bar */}
        <div
          id="offer-eyebrow"
          className="flex flex-row items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-2.5 lg:pb-2 pr-0 lg:pr-14 xl:pr-16 2xl:pr-20 max-w-[1540px]"
        >
          {/* Left: Eyebrow with fine horizontal rule */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <div className="w-6 sm:w-14 h-[1px] bg-neutral-300" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-600 select-none">
              OUR OFFER
            </span>
          </div>

          {/* Right: QUALITY -> AFFORDABLE -> REAL RESULTS (Desktop & tablet only, hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-500 select-none">
            <span>QUALITY</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>AFFORDABLE</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>REAL RESULTS</span>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-end mt-2 sm:mt-1 lg:-mt-3">
          {/* Left Column (Headline, Copy, 3 Cards, Buttons) */}
          <div className="lg:col-span-7 xl:col-span-6 2xl:col-span-6 flex flex-col justify-between max-w-3xl pr-0 lg:pr-4 xl:pr-6 translate-y-0 lg:-translate-y-3">
            <div>
              {/* Main Headline */}
              <h2 className="text-[32px] sm:text-[44px] lg:text-[56px] xl:text-[64px] font-bold text-neutral-950 tracking-tight leading-[1.08] sm:leading-[1.06]">
                A Smarter Way to
                <br />
                <span className="font-serif italic font-normal text-[#9E6941]">
                  Build Your Website.
                </span>
              </h2>

              {/* Subheadline Copy */}
              <p className="mt-2.5 sm:mt-3 text-neutral-600 text-[13px] sm:text-base lg:text-[17px] leading-relaxed max-w-xl font-normal">
                Get a professional website with clear pricing, flexible milestones and more included from day one.
              </p>

              {/* 3 Offer Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 mt-5 sm:mt-6">
                {/* Card 1: Starting Price */}
                <div className="bg-white rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 lg:p-5.5 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[#F7EEE7] text-[#9E6941] flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-xl sm:text-[25px] xl:text-[26px] font-bold text-neutral-950 tracking-tight leading-none mb-1">
                      ₹6,000+
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#9E6941] mb-2 sm:mb-2.5">
                      Starting Price
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                    Professional business websites starting from ₹6,000. Final pricing depends on your requirements.
                  </p>
                </div>

                {/* Card 2: 6 Months Free Maintenance */}
                <div className="bg-white rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 lg:p-5.5 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[#F7EEE7] text-[#9E6941] flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-xl sm:text-[25px] xl:text-[26px] font-bold text-neutral-950 tracking-tight leading-none mb-1">
                      6 Months
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#9E6941] mb-2 sm:mb-2.5">
                      Free Maintenance
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                    Basic website maintenance and support included for 6 months after launch.
                  </p>
                </div>

                {/* Card 3: 50% Payment After 50% Development */}
                <div className="bg-white rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 lg:p-5.5 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[#F7EEE7] text-[#9E6941] flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-xl sm:text-[25px] xl:text-[26px] font-bold text-neutral-950 tracking-tight leading-none mb-1">
                      50%
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#9E6941] mb-2 sm:mb-2.5 leading-snug">
                      Payment After<br />50% Development
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal">
                    No upfront payment at the beginning. Pay only after the agreed 50% development milestone is completed.
                  </p>
                </div>
              </div>

              {/* CTAs Row */}
              <div id="offer-cta-row" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mt-6 sm:mt-8 lg:mt-10">
                {/* Start Your Project Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer w-full sm:w-auto"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Watch How It Works Button */}
                <a
                  href="#process"
                  className="group inline-flex items-center justify-center sm:justify-start gap-3 py-1 sm:py-0 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-black transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-xs text-neutral-900 group-hover:scale-105 group-hover:border-black/25 transition-all">
                    <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current ml-0.5 text-neutral-900" />
                  </div>
                  <span>Watch How It Works</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Laptop On Stone Pedestal */}
          {/* Mobile: centered & scaled neatly; Desktop: attached to right edge, larger size, bottom aligned with CTA */}
          <div className="lg:col-span-5 xl:col-span-6 2xl:col-span-6 relative w-full flex items-end justify-center lg:justify-end mt-2 sm:mt-4 lg:mt-0">
            <div className="relative flex justify-center lg:justify-end w-full max-w-[440px] sm:max-w-[520px] lg:max-w-none lg:w-[114%] xl:w-[122%] 2xl:w-[128%]">
              <Image
                src="/promotion.png"
                alt="A Smarter Way to Build Your Website - StackStich"
                width={1346}
                height={1168}
                priority
                className="w-full h-auto object-contain object-center lg:object-right-bottom select-none pointer-events-none block"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
