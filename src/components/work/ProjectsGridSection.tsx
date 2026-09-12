'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export interface GridProject {
  id: string
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  badgeType: 'live' | 'preview'
  actionText: string
  href: string
  imageSrc: string
  imageAlt: string
}

const ROW_ONE_PROJECTS: GridProject[] = [
  {
    id: 'edjoys',
    number: '02',
    title: 'Edjoys',
    category: 'Education Platform',
    description:
      'A modern education platform designed to make learning simple, engaging, and accessible.',
    tags: ['Design', 'Development', 'Education'],
    badgeType: 'live',
    actionText: 'View Live Site',
    href: 'https://edjoys.com/',
    imageSrc: '/work/project2.png',
    imageAlt: 'Edjoys Education Platform by Stack',
  },
  {
    id: 'animalsathi',
    number: '03',
    title: 'Animalsathi',
    category: 'Animal Care Platform',
    description:
      'A digital platform connecting pet owners with veterinary care, services, and support.',
    tags: ['Design', 'Development', 'Platform'],
    badgeType: 'preview',
    actionText: 'View Project',
    href: 'https://animalsathi.com/',
    imageSrc: '/work/project3.png',
    imageAlt: 'Animalsathi Animal Care Platform by Stack',
  },
]

const ROW_TWO_PROJECTS: GridProject[] = [
  {
    id: 'prepmate',
    number: '04',
    title: 'PrepMate',
    category: 'EdTech Platform',
    description:
      'A mock test platform designed to help students prepare smarter and perform better.',
    tags: ['Design', 'Development', 'Platform'],
    badgeType: 'preview',
    actionText: 'View Project',
    href: 'https://animalsathi.com/',
    imageSrc: '/work/project4.png',
    imageAlt: 'PrepMate EdTech Platform by Stack',
  },
  {
    id: 'nexora',
    number: '05',
    title: 'Nexora',
    category: 'Architecture Website',
    description:
      'A clean and modern website for an architecture studio focused on timeless design.',
    tags: ['Design', 'Development', 'Responsive'],
    badgeType: 'preview',
    actionText: 'View Project',
    href: 'https://animalsathi.com/',
    imageSrc: '/work/project5.png',
    imageAlt: 'Nexora Architecture Website by Stack',
  },
]

function ProjectCard({ project }: { project: GridProject }) {
  return (
    <article className="group flex flex-col justify-between">
      {/* Top Image Card Container */}
      <div className="relative w-full aspect-[16/11] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#ECE8E1] border border-black/[0.07] shadow-xs">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          quality={92}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Top-Left: Project Number */}
        <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 select-none">
          <span className="text-sm sm:text-lg font-bold text-neutral-900 tracking-tight">
            {project.number}
          </span>
        </div>

        {/* Top-Right: Status Badge */}
        <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 select-none">
          {project.badgeType === 'live' ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9.5px] sm:text-[11px] font-semibold text-neutral-900 tracking-wider uppercase">
                LIVE SITE
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="text-[9.5px] sm:text-[11px] font-semibold text-neutral-600 tracking-wider uppercase">
                PROJECT PREVIEW
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Details Below Image */}
      <div className="mt-4 sm:mt-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-lg sm:text-2xl font-bold text-neutral-950 tracking-tight group-hover:text-[#9E6941] transition-colors">
            {project.title}
          </h3>

          {/* Subtitle / Category */}
          <div className="text-xs sm:text-[15px] font-medium text-neutral-500 mt-1">
            {project.category}
          </div>

          {/* Description */}
          <p className="mt-2 sm:mt-2.5 text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal">
            {project.description}
          </p>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-white text-neutral-700 border border-black/[0.06] shadow-2xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between mt-4 sm:mt-6 pt-1">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-950 group-hover:text-[#9E6941] transition-colors"
          >
            <span>{project.actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.actionText} for ${project.title}`}
            className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/[0.12] group-hover:border-black/[0.3] group-hover:bg-white bg-transparent flex items-center justify-center text-neutral-700 group-hover:text-neutral-950 transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsGridSection() {
  return (
    <section className="w-full bg-[#FAF7F2] pb-16 sm:pb-28 pt-2 sm:pt-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1700px] mx-auto">
        {/* Row 1: 2-Column Projects Grid (02, 03) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-9 lg:gap-10">
          {ROW_ONE_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Row 2: 2-Column Projects Grid (04, 05) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-9 lg:gap-10 mt-8 sm:mt-9 md:mt-14 lg:mt-18">
          {ROW_TWO_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
