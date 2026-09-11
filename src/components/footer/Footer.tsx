'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'

const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_LINKS = [
  { label: 'Website Design', href: '#services' },
  { label: 'Website Development', href: '#services' },
  { label: 'Branding', href: '#services' },
  { label: 'SEO & Growth', href: '#services' },
  { label: 'Maintenance', href: '#services' },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative w-full bg-[#FAF7F2] text-neutral-900 border-t border-black"
    >
      {/* ========================================================================= */}
      {/* MOBILE FOOTER COMPOSITION (< lg)                                          */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full px-5 sm:px-8 pt-12 pb-8">
        {/* Brand Block */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Stack Logo"
              width={233}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="mt-2 text-neutral-700 text-sm font-normal">
            Websites for what&apos;s next.
          </p>
          <p className="mt-4 text-neutral-600 text-sm leading-relaxed max-w-sm font-normal">
            We design and build modern websites that help ambitious businesses grow.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-5 text-neutral-900">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-900 hover:text-neutral-600 active:scale-95 transition-all"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-neutral-900 hover:text-neutral-600 active:scale-95 transition-all"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-neutral-900 hover:text-neutral-600 active:scale-95 transition-all"
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2-Column Links: Navigation & Services */}
        <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-black/[0.08]">
          {/* Navigation Column */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-4 select-none">
              NAVIGATION
            </h3>
            <ul className="space-y-3 text-sm">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-950 active:text-black py-0.5 block transition-colors font-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-4 select-none">
              SERVICES
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-950 active:text-black py-0.5 block transition-colors font-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Get In Touch Block */}
        <div className="mt-10 pt-8 border-t border-black/[0.08]">
          <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-3 select-none">
            GET IN TOUCH
          </h3>
          <div className="text-sm text-neutral-600 font-normal leading-relaxed">
            <p>Have a project in mind?</p>
            <p>We&apos;d love to hear about it.</p>
          </div>

          <div className="mt-4">
            <a
              href="mailto:hello@stack.studio?subject=Project%20Inquiry"
              className="group inline-flex items-center gap-2 text-base font-semibold text-[#9E6941] hover:text-[#83522e] transition-colors"
            >
              <span className="underline underline-offset-[5px] decoration-[#9E6941]/60 group-hover:decoration-[#9E6941]">
                hello@stack.studio
              </span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-normal">
                &rarr;
              </span>
            </a>
          </div>

          <div className="mt-5 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
              <span>India (Remote)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
              <span>Usually replies within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-black/[0.08] flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-800 select-none">
            <span>IDEAS</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>WEBSITES</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>GROWTH</span>
          </div>

          <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-800 select-none">
            <div className="w-6 h-[1.5px] bg-neutral-400" />
            <span>BUILT FOR BOLDER BRANDS</span>
          </div>

          <div className="text-neutral-500 text-[11px] mt-1">
            &copy; 2024 Stack. All rights reserved.
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP FOOTER COMPOSITION (>= lg) - 100% PRESERVED EXACT ORIGINAL LAYOUT */}
      {/* ========================================================================= */}
      <div className="hidden lg:block max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between pr-4">
            <div>
              {/* Brand Logo */}
              <Link href="/" className="inline-block group">
                <Image
                  src="/logo.png"
                  alt="Stack Logo"
                  width={233}
                  height={40}
                  className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
                />
              </Link>

              {/* Tagline */}
              <p className="mt-2 text-neutral-700 text-[15px] sm:text-base font-normal">
                Websites for what&apos;s next.
              </p>

              {/* Description */}
              <p className="mt-7 text-neutral-500 text-[14px] sm:text-[15px] leading-relaxed max-w-[310px] font-normal">
                We design and build modern websites that help ambitious businesses
                grow.
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-8 sm:mt-10 flex items-center gap-5 text-neutral-900">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: NAVIGATION (2 cols) */}
          <div className="lg:col-span-2 xl:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-6 select-none">
              NAVIGATION
            </h3>
            <ul className="space-y-3.5 text-[14px] sm:text-[15px]">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-950 transition-colors duration-150 font-normal block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SERVICES (3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-6 select-none">
              SERVICES
            </h3>
            <ul className="space-y-3.5 text-[14px] sm:text-[15px]">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-950 transition-colors duration-150 font-normal block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH (3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-6 select-none">
              GET IN TOUCH
            </h3>

            {/* Prompt text */}
            <div className="text-[14px] sm:text-[15px] text-neutral-600 font-normal leading-relaxed">
              <p>Have a project in mind?</p>
              <p>We&apos;d love to hear about it.</p>
            </div>

            {/* Terracotta/Brown Email Link with Arrow */}
            <div className="mt-5 sm:mt-6">
              <a
                href="mailto:hello@stack.studio?subject=Project%20Inquiry"
                className="group inline-flex items-center gap-2 text-base sm:text-[17px] font-semibold text-[#9E6941] hover:text-[#83522e] transition-colors"
              >
                <span className="underline underline-offset-[5px] decoration-[#9E6941]/60 group-hover:decoration-[#9E6941]">
                  hello@stack.studio
                </span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-normal">
                  &rarr;
                </span>
              </a>
            </div>

            {/* Location & Response Time Meta */}
            <div className="mt-6 sm:mt-7 space-y-2.5 text-[13px] sm:text-[14px] text-neutral-600">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>India (Remote)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Usually replies within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-16 sm:mt-20 lg:mt-24 border-t border-black/[0.08]" />

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-7 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-neutral-500">
          {/* Left: Copyright */}
          <div className="text-center sm:text-left text-neutral-500 text-xs">
            &copy; 2024 Stack. All rights reserved.
          </div>

          {/* Center: IDEAS -> WEBSITES -> GROWTH */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
            <span>IDEAS</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>WEBSITES</span>
            <span className="text-neutral-400 font-normal">&rarr;</span>
            <span>GROWTH</span>
          </div>

          {/* Right: Line + BUILT FOR BOLDER BRANDS */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800 select-none">
            <div className="w-8 sm:w-10 h-[1.5px] bg-neutral-400" />
            <span>BUILT FOR BOLDER BRANDS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
