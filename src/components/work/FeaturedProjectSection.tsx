'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const FEATURED_PROJECT = {
  number: '01',
  title: 'Mobl',
  subtitle: 'E-commerce Website',
  description:
    'A modern e-commerce store for discovering and shopping mobile accessories with ease.',
  tags: ['Design', 'Development', 'E-commerce'],
  liveUrl: 'https://mobile-accessories-xi.vercel.app/',
  caseStudyUrl: '#case-study',
  imageSrc: '/work/project1.png',
  imageAlt: 'Mobl E-commerce Website by Stack',
}

export default function FeaturedProjectSection() {
  const project = FEATURED_PROJECT

  return (
    <section className="w-full bg-[#FAF7F2] pb-12 sm:pb-24 pt-2 sm:pt-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1700px] mx-auto">
        {/* Main Featured Project Card */}
        <div className="w-full bg-white rounded-[20px] sm:rounded-[32px] border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Project Overview & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between p-5 sm:p-9 lg:p-11 xl:p-12 bg-white border-b lg:border-b-0 lg:border-r border-black/[0.06]">
            <div>
              {/* Eyebrow with Terracotta Dot */}
              <div className="flex items-center gap-2 mb-3 sm:mb-6">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 select-none">
                  FEATURED PROJECT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941]" />
              </div>

              {/* Project Number */}
              <div className="text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#BFA188] mb-0.5 sm:mb-1 font-serif tracking-tight select-none">
                {project.number}
              </div>

              {/* Project Headline / Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-neutral-950 tracking-tight leading-[1.05]">
                {project.title}
              </h2>

              {/* Category / Subtitle */}
              <div className="text-base sm:text-xl font-medium text-[#8C5D38] mt-1 sm:mt-1.5">
                {project.subtitle}
              </div>

              {/* Supporting Description */}
              <p className="mt-3 sm:mt-5 text-neutral-600 text-xs sm:text-[15px] leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#FAF7F2] text-neutral-700 border border-black/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 sm:mt-12 pt-2 sm:pt-4 flex flex-row items-center gap-2.5 sm:gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-colors"
              >
                <span>View Live Site</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={project.caseStudyUrl}
                className="cursor-pointer bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full border border-black/[0.12] flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                View Case Study
              </a>
            </div>
          </div>

          {/* Right Column: Full Scene Photographic Mockup (/work/project1.png) */}
          <div className="lg:col-span-7 xl:col-span-8 relative aspect-[16/11] xs:aspect-[16/10] sm:aspect-auto sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px] w-full overflow-hidden bg-[#E8E2D8]">
            <Image
              src="/work/project1.png"
              alt="VELORA E-commerce Website by Stack"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />

            {/* Top-Right: Live Site Pill Badge */}
            <div className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 z-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm select-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-neutral-900 tracking-wide uppercase">
                  LIVE SITE
                </span>
              </div>
            </div>

            {/* Bottom-Right: Project Counter */}
            <div className="absolute bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-20 select-none">
              <span className="text-[11px] sm:text-[13px] font-mono font-medium text-neutral-700 bg-white/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-black/[0.04] shadow-2xs">
                {project.number} / 05
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
