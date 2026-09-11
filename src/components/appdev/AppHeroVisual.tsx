'use client'

import React from 'react'
import Image from 'next/image'

export default function AppHeroVisual() {
  return (
    <div className="relative w-full max-w-[760px] lg:max-w-none mx-auto">
      {/* Ambient warm radial glow */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-full opacity-40 blur-3xl pointer-events-none -z-10 select-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(224, 195, 168, 0.45) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Primary 3D Visual Asset: app-dev.png */}
      <div className="relative w-full aspect-[1371/1147] transition-transform duration-700 hover:scale-[1.015]">
        <Image
          src="/services/app-dev.png"
          alt="Stack Mobile App Development System — Native iOS & Android, Clean Code, and Scalable Architecture"
          fill
          priority
          quality={95}
          className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 760px"
        />
      </div>
    </div>
  )
}
