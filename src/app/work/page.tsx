import React from 'react'
import type { Metadata } from 'next'
import Footer from '@/components/footer/Footer'
import WorkHeroVisual from '@/components/work/WorkHeroVisual'
import WorkFilterBar from '@/components/work/WorkFilterBar'
import FeaturedProjectSection from '@/components/work/FeaturedProjectSection'
import ProjectsGridSection from '@/components/work/ProjectsGridSection'

export const metadata: Metadata = {
  title: 'Our Work — Websites Built to Make an Impact | Stack',
  description:
    'A selection of websites, mobile apps, and digital experiences designed and developed by Stack for businesses, products, and ideas that aim higher.',
  alternates: {
    canonical: 'https://stack.studio/work',
  },
  openGraph: {
    title: 'Our Work — Websites Built to Make an Impact | Stack',
    description:
      'A selection of websites, mobile apps, and digital experiences designed and developed by Stack for businesses, products, and ideas that aim higher.',
    url: 'https://stack.studio/work',
    siteName: 'Stack Studio',
    type: 'website',
  },
}

// Structured Data Schemas
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://stack.studio',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Our Work',
      item: 'https://stack.studio/work',
    },
  ],
}

export default function WorkPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <main className="w-full bg-[#FAF7F2] text-neutral-900 pt-[72px] lg:pt-[80px]">
        {/* ─── HERO SECTION ─── */}
        <section className="relative w-full overflow-hidden pt-1 sm:pt-2 lg:pt-3 pb-0 border-b border-black/[0.06]">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
              {/* Left Column: Eyebrow, H1, Copy, Metrics (Shifted Up & Shifted Right) */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start self-start px-8 sm:pl-14 lg:pl-20 xl:pl-28 2xl:pl-36 lg:pr-6 max-w-[720px] lg:max-w-none mx-auto lg:mx-0 pt-2 sm:pt-3 lg:pt-4 pb-8 sm:pb-12">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    OUR WORK
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Websites built<br />
                  to make <span className="text-[#9E6941]">an impact.</span>
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl font-normal">
                  A selection of websites and digital experiences designed and
                  developed by Stack for businesses, products, and ideas that aim
                  higher.
                </p>

                {/* Bottom 3 Metrics Row */}
                <div className="mt-10 sm:mt-12 flex items-center gap-6 sm:gap-9 pt-4 select-none">
                  {/* Metric 1 */}
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-none">
                      5
                    </div>
                    <div className="text-xs sm:text-[13px] text-neutral-500 font-medium mt-1.5">
                      Projects
                    </div>
                  </div>

                  {/* Divider 1 */}
                  <div className="h-10 w-px bg-black/[0.1]" />

                  {/* Metric 2 */}
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-none">
                      4
                    </div>
                    <div className="text-xs sm:text-[13px] text-neutral-500 font-medium mt-1.5">
                      Industries
                    </div>
                  </div>

                  {/* Divider 2 */}
                  <div className="h-10 w-px bg-black/[0.1]" />

                  {/* Metric 3 */}
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-none">
                      100%
                    </div>
                    <div className="text-xs sm:text-[13px] text-neutral-500 font-medium mt-1.5">
                      Client Focused
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Work Hero Visual flush to right edge and grounded at the bottom */}
              <div className="lg:col-span-5 xl:col-span-5 flex justify-end items-end w-full pr-0 self-end">
                <WorkHeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ─── FILTER & CATEGORIES BAR ─── */}
        <WorkFilterBar />

        {/* ─── FEATURED PROJECT SECTION ─── */}
        <FeaturedProjectSection />

        {/* ─── PROJECTS GRID SECTION (02-06) ─── */}
        <ProjectsGridSection />

        {/* Global Footer */}
        <Footer />
      </main>
    </>
  )
}
