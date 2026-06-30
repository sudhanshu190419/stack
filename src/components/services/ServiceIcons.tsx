'use client'

import { motion } from 'framer-motion'

const ICON_CLASS = 'w-8 h-8 text-white/80'

function BrowserIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 7h20" />
      <circle cx="5" cy="5" r="0.5" fill="currentColor" />
      <circle cx="7.5" cy="5" r="0.5" fill="currentColor" />
      <circle cx="10" cy="5" r="0.5" fill="currentColor" />
      <path d="M6 12l2 2 4-4" strokeWidth="2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <rect x="8" y="12" width="8" height="4" rx="0.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="9" cy="9" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="9" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="15" cy="9" r="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="15.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <line x1="8.5" y1="10" x2="12" y2="14" strokeWidth="0.5" />
      <line x1="15.5" y1="10" x2="12" y2="14" strokeWidth="0.5" />
      <line x1="8.5" y1="8.5" x2="15.5" y2="8.5" strokeWidth="0.3" strokeDasharray="1 1" />
    </svg>
  )
}

function AIIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="5" cy="17" r="2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="19" cy="17" r="2" fill="currentColor" fillOpacity="0.3" />
      <line x1="12" y1="7" x2="5" y2="15" strokeWidth="0.5" />
      <line x1="12" y1="7" x2="19" y2="15" strokeWidth="0.5" />
      <line x1="7" y1="17" x2="17" y2="17" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      <path d="M12 12v4" strokeWidth="2" />
      <path d="M10 14l2 2 2-2" strokeWidth="1" />
      <line x1="9" y1="22" x2="15" y2="22" strokeWidth="1" />
    </svg>
  )
}

function StrategyIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M6.5 6.5l11 11" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M17.5 6.5l-11 11" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="6.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

export const SERVICE_ICONS = [
  BrowserIcon,
  PhoneIcon,
  DesignIcon,
  AIIcon,
  CloudIcon,
  StrategyIcon,
]
