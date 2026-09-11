'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

import step1Img from '../../../public/process/step-1.png'
import step2Img from '../../../public/process/step-2.png'
import step3Img from '../../../public/process/step-3.png'
import step4Img from '../../../public/process/step-4.png'

interface ProcessStep {
  number: string
  title: string
  description: string
  imageSrc: StaticImageData | string
  imageAlt: string
  tagline: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Strategy',
    description:
      'We understand your business, goals and audience to create the right strategy.',
    imageSrc: step1Img,
    imageAlt: 'Strategy document with checklist and black fountain pen',
    tagline: 'DISCOVER  •  PLAN  •  ALIGN',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We craft clean, modern designs that reflect your brand and engage your users.',
    imageSrc: step2Img,
    imageAlt: 'UI design canvas with wireframe artboard and design token card',
    tagline: 'IDEATE  •  DESIGN  •  REFINE',
  },
  {
    number: '03',
    title: 'Develop',
    description:
      'We bring designs to life with clean, scalable and high-performance code.',
    imageSrc: step3Img,
    imageAlt: 'Dark code editor with syntax highlighting and tech stack badges',
    tagline: 'BUILD  •  TEST  •  OPTIMIZE',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    description:
      'We deploy your website and support you with ongoing improvements for long-term growth.',
    imageSrc: step4Img,
    imageAlt: 'MacBook laptop on stone displaying live website',
    tagline: 'LAUNCH  •  SUPPORT  •  SCALE',
  },
]

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-neutral-900 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 border-t border-black/[0.04]"
    >
      {/* Ambient background subtle lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.9) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        {/* Mobile / Tablet Top Bar (< lg) */}
        <div className="flex lg:hidden items-center justify-between mb-8 sm:mb-10">
          {/* Top Left: OUR PROCESS with extended rule */}
          <div className="flex items-center gap-3.5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-600 select-none">
              OUR PROCESS
            </span>
            <div className="w-14 sm:w-20 h-[1px] bg-neutral-300/90" />
          </div>

          {/* Top Right: IDEAS -> WEBSITES -> GROWTH */}
          <div className="flex items-center text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-600 select-none">
            <span>IDEAS</span>
            <span className="text-neutral-400 mx-2">→</span>
            <span>WEBSITES</span>
            <span className="text-neutral-400 mx-2">→</span>
            <span className="text-neutral-800">GROWTH</span>
          </div>
        </div>

        {/* Center Title & Subtitle Area with Desktop Aligned Headers */}
        <div className="relative w-full mb-8 sm:mb-10 lg:mb-12">
          {/* Desktop Left: OUR PROCESS aligned with 'Built with a Plan,' */}
          <div className="hidden lg:flex absolute left-0 top-[52px] xl:top-[54px] items-center gap-3.5 z-10">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-600 select-none">
              OUR PROCESS
            </span>
            <div className="w-14 sm:w-20 xl:w-24 h-[1px] bg-neutral-300/90" />
          </div>

          {/* Center Title & Subtitle Area */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-3.5">
              A STRUCTURED APPROACH
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
              Built with a Plan,
              <br />
              Designed for{' '}
              <span className="text-[#9E6941]">Growth</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-[15px] text-neutral-600 leading-relaxed max-w-xl mx-auto mt-4 sm:mt-5 font-normal">
              From strategy to scaling, we follow a proven process to build
              websites that deliver real business results.
            </p>
          </div>

          {/* Desktop Right: IDEAS -> WEBSITES -> GROWTH aligned with 'Built with a Plan,' */}
          <div className="hidden lg:flex absolute right-0 top-[52px] xl:top-[54px] items-center text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-600 select-none z-10">
            <span>IDEAS</span>
            <span className="text-neutral-400 mx-2">→</span>
            <span>WEBSITES</span>
            <span className="text-neutral-400 mx-2">→</span>
            <span className="text-neutral-800">GROWTH</span>
          </div>
        </div>

        {/* 4 Process Columns with Relative Container for Connecting Timeline */}
        <div className="relative">
          {/* Desktop Connecting Timeline Line running behind mockups */}
          <div className="hidden lg:block absolute left-0 right-0 top-[213px] -translate-y-1/2 z-0 pointer-events-none">
            {/* SVG Connecting Line with Node Dots and Arrow pointing to Step 4 */}
            <svg
              className="w-full h-8 overflow-visible"
              viewBox="0 0 1200 32"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Continuous horizontal baseline */}
              <line
                x1="60"
                y1="16"
                x2="1140"
                y2="16"
                stroke="#D6CFC4"
                strokeWidth="1.2"
              />

              {/* Node Dot between Step 1 and Step 2 */}
              <circle cx="300" cy="16" r="6" fill="#8B7B6B" />

              {/* Node Dot between Step 2 and Step 3 */}
              <circle cx="600" cy="16" r="6" fill="#8B7B6B" />

              {/* Node Dot & Arrow between Step 3 and Step 4 */}
              <circle cx="900" cy="16" r="6" fill="#8B7B6B" />
              <path
                d="M 900 16 L 960 16 M 953 11 L 960 16 L 953 21"
                stroke="#8B7B6B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 4 Step Columns Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 xl:gap-8 items-start">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full select-none"
              >
                {/* Top Text Header: Big Number, Title, Description */}
                <div className="min-h-[105px] sm:min-h-[110px] lg:min-h-[115px] flex flex-col">
                  {/* Big Number */}
                  <span className="text-4xl sm:text-[44px] lg:text-[48px] font-bold tracking-tight text-[#D5CEC2]/75 leading-none mb-1">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold text-neutral-950 tracking-tight leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 mt-1 max-w-[280px]">
                    {step.description}
                  </p>
                </div>

                {/* Visual Mockup Container aligned to the left with the text */}
                <div className="relative my-1.5 sm:my-2 w-full flex items-center justify-start">
                  <div className="relative w-full h-[155px] sm:h-[170px] lg:h-[185px] max-w-[310px] flex items-center justify-start transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
                    <Image
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      className={`object-contain object-left pointer-events-none drop-shadow-md ${
                        index === 0 ? '-translate-x-2' : ''
                      }`}
                      priority
                    />
                  </div>
                </div>

                {/* Bottom Tagline / Sub-label */}
                <div className="mt-1 sm:mt-1.5 text-left">
                  <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500/95 leading-relaxed">
                    {step.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
