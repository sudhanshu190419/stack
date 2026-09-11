'use client'

import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

export default function OfficeMapCard() {
  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-xs flex flex-col sm:flex-row items-center gap-5">
      {/* Map Graphic Preview */}
      <div className="relative w-full sm:w-[220px] h-[130px] rounded-xl overflow-hidden bg-[#ECE8E1] border border-black/[0.06] shrink-0">
        {/* Styled SVG Map of Bengaluru */}
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 220 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base map land */}
          <rect width="220" height="130" fill="#EAE6DF" />

          {/* Park green zone */}
          <path
            d="M 10 15 C 30 10, 60 20, 50 50 C 40 70, 20 80, 10 60 Z"
            fill="#D5E4CE"
          />
          <path
            d="M 180 80 C 200 70, 215 90, 210 120 C 190 125, 175 110, 180 80 Z"
            fill="#D5E4CE"
          />

          {/* Water lake */}
          <path
            d="M 60 95 C 80 85, 100 105, 90 125 C 75 130, 60 115, 60 95 Z"
            fill="#BCD6EE"
          />

          {/* Primary & Secondary Road network */}
          <path d="M 0 45 L 220 40" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M 0 45 L 220 40" stroke="#DFDBD2" strokeWidth="2" />

          <path d="M 85 0 L 75 130" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M 85 0 L 75 130" stroke="#DFDBD2" strokeWidth="2.5" />

          <path d="M 140 0 L 160 130" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 20 0 C 40 40, 70 80, 120 130" stroke="#FFFFFF" strokeWidth="3.5" />
          <path d="M 130 50 L 220 100" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 0 100 L 60 85" stroke="#FFFFFF" strokeWidth="2" />

          {/* Secondary streets */}
          <path d="M 40 20 L 70 60" stroke="#F4F1EC" strokeWidth="1.5" />
          <path d="M 100 20 L 150 40" stroke="#F4F1EC" strokeWidth="1.5" />
          <path d="M 110 70 L 190 60" stroke="#F4F1EC" strokeWidth="1.5" />
        </svg>

        {/* Location Pin & Tooltip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 select-none">
          {/* Black Pin */}
          <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-md">
            <MapPin className="w-3.5 h-3.5 text-white fill-white" />
          </div>

          {/* Pin Label Tooltip */}
          <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-black/[0.08] shadow-sm leading-tight">
            <span className="block text-[10px] font-bold text-neutral-900">Our Office</span>
            <span className="block text-[8.5px] text-neutral-500 lowercase">bengaluru, india</span>
          </div>
        </div>
      </div>

      {/* Meet Details & CTA */}
      <div className="flex-1">
        <h4 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
          Let&apos;s Meet
        </h4>
        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-1">
          We&apos;re based in Bengaluru, but we work with clients worldwide. Whether online or in person, we&apos;re always happy to connect.
        </p>
        <div className="mt-3">
          <a
            href="https://maps.google.com/?q=Bengaluru,+Karnataka,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-black/[0.12] bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all hover:shadow-2xs active:scale-[0.98]"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
