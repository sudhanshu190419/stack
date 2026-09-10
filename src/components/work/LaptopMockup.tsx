'use client'

import React from 'react'
import Image from 'next/image'

interface LaptopMockupProps {
  imageSrc: string
  alt: string
  className?: string
}

export default function LaptopMockup({ imageSrc, alt, className = '' }: LaptopMockupProps) {
  return (
    <div className={`relative w-[112%] -left-[6%] select-none transition-all duration-500 ease-out group-hover:-translate-y-2 ${className}`}>
      {/* Laptop Presentation Container */}
      <div className="relative w-full aspect-[1500/860] overflow-visible">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain object-bottom drop-shadow-sm transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:drop-shadow-lg"
          priority
        />
      </div>

      {/* Subtle Natural Contact Shadow Underneath */}
      <div className="w-[88%] h-3 mx-auto bg-black/15 blur-md rounded-full -mt-1 transition-all duration-500 ease-out group-hover:bg-black/25 group-hover:scale-x-105 group-hover:blur-lg" />
    </div>
  )
}
