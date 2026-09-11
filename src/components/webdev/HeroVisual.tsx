'use client'

import React from 'react'
import Image from 'next/image'

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[760px] lg:max-w-none mx-auto">
      {/* Ambient warm radial glow */}
      <div
        className="absolute -inset-6 sm:-inset-12 rounded-full opacity-35 blur-3xl pointer-events-none -z-10 select-none"
        style={{
          background:
            'radial-gradient(ellipse at 55% 45%, rgba(224, 195, 168, 0.45) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Decorative background contour lines */}
      <svg
        className="absolute -top-10 -right-6 w-[360px] h-[280px] pointer-events-none -z-10 opacity-30 select-none hidden sm:block"
        viewBox="0 0 360 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 20 20 C 140 10, 260 60, 320 180"
          stroke="#9E6941"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 80 10 C 190 40, 280 120, 340 240"
          stroke="#9E6941"
          strokeWidth="0.8"
        />
      </svg>

      {/* Primary 3D Visual Asset: web-dev.png */}
      <div className="relative w-full aspect-[1346/1168] transition-transform duration-700 hover:scale-[1.015]">
        <Image
          src="/services/web-dev.png"
          alt="Stack Web Development System — Next.js, Core Web Vitals, and Responsive Multi-Device Architecture"
          fill
          priority
          quality={95}
          className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 760px"
        />
      </div>

      {/* Bottom device label annotation & curved arrow pointing to devices */}
      <div className="flex items-center justify-center gap-3 mt-2 sm:mt-3 select-none">
        <div className="text-center sm:text-left">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-neutral-500 uppercase block leading-tight">
            SAME EXPERIENCE
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-neutral-500 uppercase block leading-tight">
            EVERYWHERE
          </span>
        </div>
        <svg
          className="w-10 sm:w-12 h-6 text-[#9E6941]/70"
          viewBox="0 0 44 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 14 C 15 20, 28 17, 40 4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M32 4 L40 4 L40 12"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
