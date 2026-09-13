'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ctaMockup from '../../../public/cta.png'

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-neutral-900 pt-16 sm:pt-20 lg:pt-24 pb-0 border-t border-black/[0.05]"
    >
      {/* Ambient warm lighting & architectural shadow wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft sun spotlight behind tablet & vase */}
        <div
          className="absolute right-0 top-0 w-[800px] h-[700px] opacity-70"
          style={{
            background:
              'radial-gradient(circle at 75% 35%, rgba(245, 230, 208, 0.5) 0%, rgba(250, 247, 242, 0) 70%)',
          }}
        />

        {/* Subtle leaf shadow silhouettes (soft dappled light effect) */}
        <div
          className="absolute right-12 top-6 w-96 h-80 opacity-[0.08] blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, #5a4a32 0%, transparent 80%)',
            transform: 'rotate(-25deg)',
          }}
        />
      </div>

      {/* Main Content: Dedicated Mobile (< lg) and Desktop (>= lg) Branches */}
      <div className="relative z-10 w-full">
        {/* ========================================================================= */}
        {/* MOBILE & TABLET COMPOSITION (< lg)                                        */}
        {/* ========================================================================= */}
        <div className="block lg:hidden w-full px-5 sm:px-8 pt-2 pb-0">
          {/* Eyebrow with horizontal line */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
              LET&apos;S WORK TOGETHER
            </span>
            <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]/40" />
          </div>

          {/* Main Headline */}
          <h2 className="text-[28px] sm:text-4xl font-bold text-neutral-950 tracking-tight leading-[1.12]">
            Ready to build something{' '}
            <span className="block text-[#9E6941] font-bold">
              for your business?
            </span>
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-4 sm:mt-5 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
            Tell us what you need. From websites and online stores to mobile apps,
            we&apos;ll help turn your idea into a digital product that works for
            your business.
          </p>

          {/* Tablet Mockup & Handwritten Note on Mobile */}
          <div className="relative mt-6 sm:mt-8 w-full flex flex-col items-center overflow-visible">
            {/* Handwritten Note and Curved Arrow safely inside viewport */}
            <div className="relative z-20 self-start pl-2 sm:pl-5 mb-[-8px] select-none pointer-events-none">
              <div className="font-cursive text-lg sm:text-xl leading-[1.1] text-neutral-800 -rotate-[6deg] tracking-wide whitespace-nowrap">
                <p>Same ideas.</p>
                <p className="mt-0.5">Bigger opportunities.</p>
              </div>
              <div className="ml-7 mt-1 -rotate-[2deg]">
                <svg
                  className="w-9 h-11 text-neutral-800"
                  viewBox="0 0 65 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2 C6 24, 18 46, 52 58"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M38 48 L52 58 L37 63"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Tablet Mockup Image */}
            <div className="relative w-full max-w-[440px] sm:max-w-[500px]">
              <Image
                src={ctaMockup}
                alt="StackStich Website Mockup on Tablet and Modern Web Books"
                priority
                quality={95}
                className="w-full h-auto object-contain object-bottom drop-shadow-xl select-none"
              />
            </div>
          </div>

          {/* CTA Buttons Row - Placed directly below the image */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href="https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 hover:text-black font-medium text-sm underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
            >
              Or just say hello
            </a>
          </div>

          {/* Trust Features Row - Placed below the buttons with dividers, matching desktop */}
          <div className="mt-7 pt-5 border-t border-neutral-200/80 pb-14 sm:pb-16 flex items-center justify-between text-[10px] min-[360px]:text-[11px] min-[390px]:text-xs text-neutral-700 font-medium">
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#9E6941] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>Fast Response</span>
            </div>

            <div className="h-3 w-[1px] bg-neutral-300 shrink-0" />

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#9E6941] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span>Clear Communication</span>
            </div>

            <div className="h-3 w-[1px] bg-neutral-300 shrink-0" />

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#9E6941] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>No Obligations</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP COMPOSITION (lg:grid) - 100% PRESERVED EXACT ORIGINAL LAYOUT      */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-4 xl:gap-6 items-end">
          {/* Left Column: Heading, Copy, Buttons, Trust Badges */}
          <div className="col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col justify-between pt-2 pb-16 z-10 pl-14 xl:pl-16 2xl:pl-[calc(max(5rem,(100vw-1560px)/2+5rem))] pr-4">
            {/* Top Eyebrow with horizontal line */}
            <div className="flex items-center gap-3.5 mb-8">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                LET&apos;S WORK TOGETHER
              </span>
              <div className="w-14 sm:w-20 h-[1.5px] bg-neutral-300" />
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
              Ready to build something{' '}
              <span className="block text-[#9E6941] font-bold">
                for your business?
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className="mt-6 text-neutral-600 text-lg leading-relaxed max-w-lg font-normal">
              Tell us what you need. From websites and online stores to mobile apps,
              we&apos;ll help turn your idea into a digital product that works for
              your business.
            </p>

            {/* CTA Buttons Row */}
            <div className="mt-10 flex flex-wrap items-center gap-7">
              {/* Primary Pill Button */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-[15px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              {/* Secondary Underlined Text Link */}
              <a
                href="https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-black font-medium text-[15px] underline underline-offset-[6px] decoration-neutral-400 hover:decoration-neutral-950 transition-colors duration-150"
              >
                Or just say hello
              </a>
            </div>

            {/* Trust Features Row (3 items separated by subtle vertical dividers) */}
            <div className="mt-20 pt-6 border-t border-neutral-200/70 flex flex-wrap items-center gap-y-3 gap-x-7 text-[13px] text-neutral-700 font-medium">
              {/* Item 1: Fast Response */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-900 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Fast Response</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-[1px] bg-neutral-300" />

              {/* Item 2: Clear Communication */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-900 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span>Clear Communication</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-[1px] bg-neutral-300" />

              {/* Item 3: No Obligations */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-900 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>No Obligations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tablet on Books Mockup sticking completely to the right edge */}
          <div className="col-span-6 xl:col-span-6 2xl:col-span-6 relative flex flex-col justify-end items-end pr-0 mr-0 overflow-visible">
            {/* Mockup Container sized to the image */}
            <div className="relative w-full max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px] flex justify-end items-end pr-0 mr-0">
              {/* Handwritten Note and Hand-drawn Arrow (shifted a little to the right) */}
              <div className="absolute left-[-65px] xl:left-[-40px] top-[22%] xl:top-[23%] z-20 pointer-events-none select-none">
                {/* Handwritten text */}
                <div className="font-cursive text-2xl lg:text-[26px] leading-[1.1] text-neutral-800 -rotate-[8deg] tracking-wide whitespace-nowrap">
                  <p>Same ideas.</p>
                  <p className="mt-0.5">Bigger opportunities.</p>
                </div>

                {/* Hand-sketched arrow curving down and right toward the tablet */}
                <div className="ml-14 mt-2 -rotate-[3deg]">
                  <svg
                    className="w-14 h-16 text-neutral-800"
                    viewBox="0 0 65 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 2 C6 24, 18 46, 52 58"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M38 48 L52 58 L37 63"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* High-res Tablet Mockup (public/cta.png) flush to the right */}
              <Image
                src={ctaMockup}
                alt="StackStich Website Mockup on Tablet and Modern Web Books"
                priority
                quality={95}
                className="w-full h-auto object-contain object-right-bottom drop-shadow-xl select-none"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
