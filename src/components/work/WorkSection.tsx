'use client'

import React, { useState } from 'react'
import LaptopMockup from './LaptopMockup'

interface Project {
  id: string
  number: string
  name: string
  category: string
  description: string
  tags: string[]
  imageSrc: string
  href: string
}

const PROJECTS: Project[] = [
  {
    id: 'savor',
    number: '01',
    name: 'SAVOR',
    category: 'Restaurant Website',
    description:
      'A premium restaurant experience focused on atmosphere, storytelling and reservations.',
    tags: ['Design', 'Development', 'Responsive'],
    imageSrc: '/projects/project1.png',
    href: '#',
  },
  {
    id: 'velora',
    number: '02',
    name: 'VELORA',
    category: 'E-commerce Website',
    description:
      'A modern e-commerce experience designed for style, simplicity and seamless shopping.',
    tags: ['Design', 'Development', 'E-commerce'],
    imageSrc: '/projects/project2.png',
    href: '#',
  },
  {
    id: 'mobl',
    number: '03',
    name: 'MOBL',
    category: 'Product Website',
    description:
      'A bold product website built to showcase innovation and connect with a global audience.',
    tags: ['Design', 'Development', 'Performance'],
    imageSrc: '/projects/project3.png',
    href: '#',
  },
]

export default function WorkSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : 3))
  }

  const handleNext = () => {
    setActiveSlide((prev) => (prev < 3 ? prev + 1 : 0))
  }

  return (
    <section
      id="work"
      className="relative z-20 w-full py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] text-neutral-900 border-t border-black/[0.04] shadow-[0_-20px_50px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {/* Left Heading Block */}
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#9E6941] mb-2.5">
              SELECTED WORK
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-neutral-900 tracking-tight leading-[1.12]">
              Real businesses.
              <br />
              <span className="font-serif italic font-normal text-[#9E6941]">
                Extraordinary websites.
              </span>
            </h2>
          </div>

          {/* Right Description & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center lg:items-end gap-6 lg:gap-8 max-w-xl">
            <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600">
              A selection of digital experiences designed and developed by Stack.
              From e-commerce to hospitality, we build websites that look
              exceptional and help businesses grow.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-neutral-900 bg-white/70 hover:bg-white border border-neutral-300 hover:border-neutral-400 transition-all duration-200 shadow-2xs shrink-0 self-start sm:self-auto"
            >
              View All Work
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3-Column Projects Grid with dividing lines between 01, 02, and 03 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-0 items-start mb-16 sm:mb-20">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between h-full bg-transparent ${
                index < PROJECTS.length - 1
                  ? 'lg:border-r lg:border-neutral-300/90 lg:pr-7 xl:pr-8'
                  : ''
              } ${
                index > 0
                  ? 'lg:pl-7 xl:pl-8'
                  : ''
              } ${
                index === 0
                  ? 'md:border-r md:border-neutral-300/90 md:pr-6 lg:pr-7 xl:pr-8'
                  : ''
              } ${
                index === 1
                  ? 'md:pl-6 lg:pl-7 xl:pl-8'
                  : ''
              }`}
            >
              {/* Laptop Mockup Presentation with Screen Inside */}
              <div className="mb-3 sm:mb-3.5">
                <LaptopMockup
                  imageSrc={project.imageSrc}
                  alt={`${project.name} - ${project.category}`}
                />
              </div>

              {/* Project Information */}
              <div className="flex flex-col flex-grow">
                {/* Meta details header with vertical dividing line */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-3.5">
                  <div className="pr-1 sm:pr-2">
                    <span className="text-[11px] sm:text-xs font-mono text-neutral-400 font-medium">
                      {project.number}
                    </span>
                    <h3 className="text-xl sm:text-[22px] font-bold tracking-tight text-neutral-900 mt-0.5">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-500 mt-0.5 font-medium">
                      {project.category}
                    </p>
                  </div>

                  <div className="sm:border-l sm:border-neutral-300/80 sm:pl-4 lg:pl-4.5 flex items-center">
                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-neutral-600">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Link Bar with horizontal divider line */}
                <div className="pt-3 border-t border-neutral-300/80 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium truncate">
                    {project.tags.join(' · ')}
                  </div>

                  <a
                    href={project.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black shrink-0 transition-colors"
                  >
                    View Project
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination & CTA Section */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
          {/* Carousel Navigation Arrows & Dots */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white/60 hover:bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all shadow-2xs active:scale-95"
              aria-label="Previous slide"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === idx
                    ? 'bg-neutral-900 w-2.5 h-2.5'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white/60 hover:bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all shadow-2xs active:scale-95"
              aria-label="Next slide"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Center / Bottom CTA */}
          <div className="flex flex-col items-center text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <p className="text-xs sm:text-sm text-neutral-600 mb-2.5">
              Want something like this for your business?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
            >
              Start a Project
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Spacer to balance on wide screens */}
          <div className="hidden sm:block w-32" />
        </div>
      </div>
    </section>
  )
}
