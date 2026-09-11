'use client'

import React from 'react'
import Image from 'next/image'

export default function EcomHeroVisual() {
  return (
    <div className="relative w-full max-w-[780px] lg:max-w-none mx-auto">
      {/* Ambient warm radial glow */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-full opacity-40 blur-3xl pointer-events-none -z-10 select-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(224, 195, 168, 0.45) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Primary 3D Visual Asset: ecom.png */}
      <div className="relative w-full aspect-[1536/1024] transition-transform duration-700 hover:scale-[1.015]">
        <Image
          src="/services/ecom.png"
          alt="Stack E-Commerce Storefront Development — Modern, Fast, and High-Converting Online Shopping Experiences"
          fill
          priority
          quality={95}
          className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 780px"
        />
      </div>
    </div>
  )
}

