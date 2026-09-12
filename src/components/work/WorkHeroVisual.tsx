'use client'

import React from 'react'
import Image from 'next/image'

export default function WorkHeroVisual() {
  return (
    <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] xl:max-w-[540px] mx-auto lg:ml-auto lg:mr-0">
      {/* Ambient warm radial glow */}
      <div
        className="absolute -inset-2 sm:-inset-10 rounded-full opacity-40 blur-3xl pointer-events-none -z-10 select-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(224, 195, 168, 0.45) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Primary 3D Visual Asset: work/hero.png */}
      <div className="relative w-full aspect-[1312/1199] transition-transform duration-700 hover:scale-[1.015]">
        <Image
          src="/work/work-hero.png"
          alt="Stack Selected Work — Turning Ideas Into Real Digital Experiences"
          fill
          priority
          quality={95}
          className="object-contain object-right-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />

        {/* Handwritten Script Callout: Ideas into Real Experiences (Top-Left of Right Image, Shifted Right) */}
        <div className="absolute top-1 sm:top-2 lg:top-3 left-6 sm:left-12 lg:left-16 xl:left-20 z-20 text-left select-none pointer-events-none">
          <div className="font-handwriting text-base sm:text-xl lg:text-[26px] leading-[1.05] text-[#9E6941] font-medium rotate-[-2deg] drop-shadow-2xs">
            Ideas<br />
            into<br />
            Real<br />
            Experiences
          </div>
          <svg
            className="w-6 sm:w-8 lg:w-9 h-4 sm:h-6 lg:h-7 text-[#9E6941] mt-1 ml-1 sm:ml-2 rotate-[-4deg]"
            viewBox="0 0 44 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 6 6 C 16 10, 26 20, 36 22"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M 28 17 L 36 22 L 30 28"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
