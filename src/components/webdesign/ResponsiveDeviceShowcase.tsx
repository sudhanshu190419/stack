'use client'

import React, { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  ExternalLink,
} from 'lucide-react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface ViewportConfig {
  id: DeviceType
  label: string
  badge: string
  containerMaxWidth: number
  containerHeight: number
  internalWidth: number
  internalHeight: number
  scale: number
}

const VIEWPORT_CONFIGS: Record<DeviceType, ViewportConfig> = {
  desktop: {
    id: 'desktop',
    label: 'Desktop View (1440px)',
    badge: '1440px Desktop',
    containerMaxWidth: 840,
    containerHeight: 525,
    internalWidth: 1440,
    internalHeight: 900,
    scale: 840 / 1440, // 0.5833333333333334
  },
  tablet: {
    id: 'tablet',
    label: 'Tablet View (768px)',
    badge: '768px Tablet',
    containerMaxWidth: 538,
    containerHeight: 525,
    internalWidth: 768,
    internalHeight: 750,
    scale: 538 / 768, // 0.7005208333333334
  },
  mobile: {
    id: 'mobile',
    label: 'Mobile View (375px)',
    badge: '375px Mobile',
    containerMaxWidth: 320,
    containerHeight: 525,
    internalWidth: 375,
    internalHeight: 616,
    scale: 320 / 375, // 0.8533333333333334
  },
}

export default function ResponsiveDeviceShowcase() {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop')
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)

  const currentConfig = VIEWPORT_CONFIGS[activeDevice]

  return (
    <div className="w-full">
      {/* Breakpoint Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {[
          { id: 'desktop', label: 'Desktop View (1440px)', icon: <Monitor className="w-4 h-4" /> },
          { id: 'tablet', label: 'Tablet View (768px)', icon: <Tablet className="w-4 h-4" /> },
          { id: 'mobile', label: 'Mobile View (375px)', icon: <Smartphone className="w-4 h-4" /> },
        ].map((device) => {
          const isSelected = activeDevice === device.id
          return (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id as DeviceType)}
              type="button"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              <span className={isSelected ? 'text-[#D79A6D]' : 'text-neutral-500'}>
                {device.icon}
              </span>
              <span>{device.label}</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Simulated Device Viewport with Smooth Transition */}
      <div className="relative w-full rounded-2xl border border-black/[0.09] bg-[#F5F2EC] p-4 sm:p-8 flex justify-center items-center min-h-[440px] sm:min-h-[580px] overflow-hidden">
        {/* Active Viewport Frame - smooth width reflow transition */}
        <div
          className="bg-white rounded-xl border border-black/[0.1] shadow-xl overflow-hidden transition-all duration-500 ease-in-out w-full"
          style={{
            maxWidth: `${currentConfig.containerMaxWidth}px`,
          }}
        >
          {/* Simulated Browser Address Bar */}
          <div className="px-3.5 py-2.5 bg-[#FAF8F5] border-b border-black/[0.06] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* URL Display: https://animalsathi.com/ */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10.5px] font-mono text-neutral-700 max-w-[280px] truncate shadow-2xs">
              <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
              <span className="text-neutral-400">https://</span>
              <span className="font-semibold text-neutral-900">animalsathi.com</span>
              <span className="text-neutral-400">/</span>
            </div>

            {/* Action Bar: Viewport indicator & Open Live Site */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block text-[9.5px] font-mono font-semibold text-[#9E6941] uppercase px-2 py-0.5 rounded bg-[#9E6941]/10">
                {currentConfig.badge}
              </span>

              <a
                href="https://animalsathi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-black text-white text-[10px] font-medium transition-colors shadow-2xs group"
                title="Open live https://animalsathi.com/ in a new tab"
              >
                <span className="hidden xs:inline">Open Live Site</span>
                <span className="xs:hidden">Live</span>
                <ExternalLink className="w-2.5 h-2.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Presentation Iframe Viewport Container */}
          <div
            className="relative w-full overflow-hidden bg-neutral-50 transition-all duration-500 ease-in-out"
            style={{
              height: `${currentConfig.containerHeight}px`,
            }}
          >
            {/* Loading Indicator while Iframe loads */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF7F2] text-neutral-500 z-10">
                <div className="w-7 h-7 border-2 border-[#9E6941] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs font-mono font-medium text-neutral-600">
                  Connecting to https://animalsathi.com/ ...
                </p>
              </div>
            )}

            {/* Scaled Iframe Wrapper - accurately rendered at target internal width & scaled down */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out"
              style={{
                width: `${currentConfig.internalWidth}px`,
                height: `${currentConfig.internalHeight}px`,
                transform: `scale(${currentConfig.scale})`,
                transformOrigin: 'top center',
              }}
            >
              <iframe
                src="https://animalsathi.com/"
                title="AnimalSathi Live Responsive Preview"
                loading="eager"
                onLoad={() => setIsIframeLoaded(true)}
                className="w-full h-full border-0 bg-white"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Transparent Interaction-Shield Layer - prevents scroll capture and accidental link navigation */}
            <div
              className="absolute inset-0 z-20 bg-transparent cursor-default"
              title="Interactive responsive preview for demonstration purposes. Click 'Open Live Site ↗' to browse."
            />
          </div>
        </div>
      </div>

      {/* 8 Core Responsive Principles Explained Below Viewport */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {[
          {
            title: 'Fluid Layout Grids',
            desc: 'We construct multi-column proportional layouts that seamlessly reflow from 12-column desktop frames to single-column phone viewports without horizontal scroll bugs.',
          },
          {
            title: 'Thumb-Friendly Touch Targets',
            desc: 'Interactive elements, selectors, and CTA buttons maintain a minimum 44×44px touch footprint with comfortable padding to prevent accidental taps on mobile touchscreens.',
          },
          {
            title: 'Fluid Typography Scaling',
            desc: 'Using mathematical CSS clamp() scales, headlines and body copy scale dynamically with screen width, ensuring optimal readability without jarring breakpoint jumps.',
          },
          {
            title: 'Adaptive Navigation Patterns',
            desc: 'Desktop top-bar navigation cleanly shifts into an accessible slide-out mobile drawer or bottom app-style bar with effortless thumb reach.',
          },
          {
            title: 'Responsive Art Direction',
            desc: 'Hero photography and diagrams crop and reposition across breakpoints so the focal point of the visual remains prominent on narrow vertical screens.',
          },
          {
            title: 'Proportional Whitespace',
            desc: 'Margins, paddings, and line-heights compress gracefully on handheld displays to maximize screen real estate while retaining an editorial, uncrowded feel.',
          },
          {
            title: 'Sub-Second Mobile Speeds',
            desc: 'Responsive modern WebP/AVIF images with srcset sizing ensure mobile visitors on cellular connections do not download heavy desktop image files.',
          },
          {
            title: 'Cross-Device QA Testing',
            desc: 'Every design is stress-tested on real physical Apple iOS and Android hardware across Chrome, Safari, and Firefox before entering development.',
          },
        ].map((item, idx) => (
          <div
            key={item.title}
            className="p-5 sm:p-6 rounded-xl border border-black/[0.07] bg-white flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono font-semibold text-[#9E6941] mb-2 block">
                0{idx + 1}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-neutral-950 mb-2">{item.title}</h4>
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
