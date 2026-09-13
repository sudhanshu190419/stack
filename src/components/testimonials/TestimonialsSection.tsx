'use client'

import React from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  initial: string
  avatarColor: string
  textColor: string
}

const ROW_ONE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Stack restructured our entire digital presence from scratch and it finally made sense. We stopped losing prospective enterprise clients to competitors and started seeing real conversion lift.',
    name: 'Swastika Pandey',
    role: 'SALES DIRECTOR',
    company: 'Lumina Global',
    initial: 'S',
    avatarColor: 'bg-[#DCE6EE]',
    textColor: 'text-[#1E3A5F]',
  },
  {
    quote:
      'Our cost-per-lead dropped within the first month of handing our website redesign over to Stack. The reporting is transparent — they tell us what isn’t working, not just what is.',
    name: 'Riya Jain',
    role: 'LEAD MARKETING MANAGER',
    company: 'Velora Systems',
    initial: 'R',
    avatarColor: 'bg-[#F2E5D9]',
    textColor: 'text-[#8A4B20]',
  },
  {
    quote:
      'We’d burned budget with two prior agencies before finding Stack. The difference was structure and engineering rigor — clear milestones, immaculate Next.js code, and no guessing.',
    name: 'Anjali Agarwal',
    role: 'OPERATIONS LEAD',
    company: 'Stratos Group',
    initial: 'A',
    avatarColor: 'bg-[#E3EDEA]',
    textColor: 'text-[#1E5647]',
  },
  {
    quote:
      'The checkout conversion rate jumped from 1.9% to 3.5% after the new e-commerce build went live. They didn’t just build a pretty site; they engineered a revenue multiplier.',
    name: 'David Chen',
    role: 'FOUNDER & CEO',
    company: 'Artisan Collective',
    initial: 'D',
    avatarColor: 'bg-[#EAE4F2]',
    textColor: 'text-[#55307F]',
  },
  {
    quote:
      'From the strategy phase to final production launch, every delivery was razor-sharp and on schedule. The team approaches your business as if it were their own.',
    name: 'Elena Rostova',
    role: 'VP OF PRODUCT',
    company: 'Kinetic Labs',
    initial: 'E',
    avatarColor: 'bg-[#F5ECD8]',
    textColor: 'text-[#7D5214]',
  },
]

const ROW_TWO_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'What stood out was how closely they tracked qualified pipeline rather than vanity page views. Our sales team actually loves the inbound leads coming through the new landing flows.',
    name: 'Bhavana Panjabi',
    role: 'VP OF GROWTH',
    company: 'Savor Commerce',
    initial: 'B',
    avatarColor: 'bg-[#E2EAF4]',
    textColor: 'text-[#1A4275]',
  },
  {
    quote:
      'Our mobile bounce rate was cut in half within three weeks. The responsiveness and micro-interactions feel like a native application rather than a conventional website.',
    name: 'Marcus Vance',
    role: 'CO-FOUNDER',
    company: 'Modu Technologies',
    initial: 'M',
    avatarColor: 'bg-[#F4DFDF]',
    textColor: 'text-[#882424]',
  },
  {
    quote:
      'They migrated our outdated legacy catalog into a lightning-fast modern web experience with zero downtime and perfect SEO preservation. Outstanding technical capability.',
    name: 'Kavita Sharma',
    role: 'DIGITAL STRATEGY HEAD',
    company: 'Apex Logistics',
    initial: 'K',
    avatarColor: 'bg-[#E8E4F4]',
    textColor: 'text-[#482882]',
  },
  {
    quote:
      'The attention to detail and interaction craft is second to none. We’ve seen a 55% surge in booked enterprise demos since the redesign debuted.',
    name: 'Julian Berg',
    role: 'CHIEF COMMERCIAL OFFICER',
    company: 'Kinetix Software',
    initial: 'J',
    avatarColor: 'bg-[#DFECE9]',
    textColor: 'text-[#1B524A]',
  },
  {
    quote:
      'Working with Stack felt like embedding a senior design and engineering unit inside our company. Fast communication, genuine ownership, and world-class craft.',
    name: 'Sarah Lin',
    role: 'PRODUCT LEAD',
    company: 'Veloce AI',
    initial: 'S',
    avatarColor: 'bg-[#EFE8DE]',
    textColor: 'text-[#724A1D]',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-neutral-900 pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-24 lg:pb-32 border-t border-black/[0.04]"
    >
      {/* Ambient background subtle lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Scoped CSS Keyframes for hardware-accelerated infinite horizontal movement */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marquee-left-to-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-left-to-right 34s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Top Header Section */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 2xl:px-20 mb-7 sm:mb-10 lg:mb-12">
        {/* Eyebrow with horizontal line & mobile trust badge */}
        <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-12 h-[1px] bg-[#9E6941]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-600 select-none">
              WHAT OUR CLIENTS SAY
            </span>
          </div>

          {/* Mobile Trust Badge */}
          <div className="flex lg:hidden items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider text-neutral-700 bg-black/[0.03] border border-black/[0.05] px-2.5 py-1 rounded-full select-none">
            <span className="text-[#9E6941] text-xs">★</span>
            <span>5.0 CLIENT RATED</span>
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(14.5px,3.8vw,16px)] sm:text-3xl lg:text-[38px] xl:text-[42px] font-normal text-neutral-900 tracking-tight leading-[1.3] sm:leading-[1.25] max-w-5xl">
          Honest feedback from businesses that chose
          <br />
          <span className="font-bold text-[#9E6941]">StackStich</span> for their digital projects.
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE COMPOSITION (< lg) - DUAL AUTO-MOVING HORIZONTAL MARQUEE           */}
      {/* ========================================================================= */}
      <div className="block lg:hidden relative w-full overflow-hidden flex flex-col gap-4 py-1.5">
        {/* Soft edge fade masks for mobile (compact width to keep quotes legible) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent z-20" />

        {/* ROW 1: Auto moves Right to Left */}
        <div className="group overflow-hidden py-1">
          <div
            className="flex w-max animate-marquee gap-4 py-1 active:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: '34s', animationDelay: '-17s' }}
          >
            {ROW_ONE_TESTIMONIALS.map((t, idx) => (
              <MobileTestimonialCard key={`m-r1-a-${idx}`} item={t} />
            ))}
            {ROW_ONE_TESTIMONIALS.map((t, idx) => (
              <MobileTestimonialCard key={`m-r1-b-${idx}`} item={t} />
            ))}
          </div>
        </div>

        {/* ROW 2: Auto moves Left to Right */}
        <div className="group overflow-hidden py-1">
          <div
            className="flex w-max animate-marquee-reverse gap-4 py-1 active:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: '30s', animationDelay: '-10s' }}
          >
            {ROW_TWO_TESTIMONIALS.map((t, idx) => (
              <MobileTestimonialCard key={`m-r2-a-${idx}`} item={t} />
            ))}
            {ROW_TWO_TESTIMONIALS.map((t, idx) => (
              <MobileTestimonialCard key={`m-r2-b-${idx}`} item={t} />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP COMPOSITION (lg:block) - 100% PRESERVED EXACT ORIGINAL MARQUEE    */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        {/* 2-Line Infinite Auto Carousel Container (Matches ggmtechnologies.com motion) */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6 py-2">
          {/* Scoped CSS Keyframes to guarantee 100% reliable 60fps/120fps hardware-accelerated movement */}
          <style>{`
            @keyframes marquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            @keyframes marquee-left-to-right {
              0% {
                transform: translate3d(-50%, 0, 0);
              }
              100% {
                transform: translate3d(0, 0, 0);
              }
            }
            .animate-marquee {
              animation: marquee 38s linear infinite;
              will-change: transform;
            }
            .animate-marquee-reverse {
              animation: marquee-left-to-right 34s linear infinite;
              will-change: transform;
            }
          `}</style>

          {/* Vignette Gradient Edge Masks (Soft fade in/out at viewport boundaries) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />

          {/* LINE 1: Moves RIGHT TO LEFT continuously (auto carousel, low speed, offset delay) */}
          <div className="group overflow-hidden py-1">
            <div
              className="flex w-max animate-marquee gap-6 py-1.5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: '38s', animationDelay: '-19s' }}
            >
              {/* First sequence */}
              {ROW_ONE_TESTIMONIALS.map((t, idx) => (
                <TestimonialCard key={`r1-a-${idx}`} item={t} />
              ))}
              {/* Duplicated sequence for seamless infinite wrap */}
              {ROW_ONE_TESTIMONIALS.map((t, idx) => (
                <TestimonialCard key={`r1-b-${idx}`} item={t} />
              ))}
            </div>
          </div>

          {/* LINE 2: Moves LEFT TO RIGHT continuously (auto carousel, left-to-right direction, offset delay) */}
          <div className="group overflow-hidden py-1">
            <div
              className="flex w-max animate-marquee-reverse gap-6 py-1.5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: '34s', animationDelay: '-11s' }}
            >
              {/* First sequence */}
              {ROW_TWO_TESTIMONIALS.map((t, idx) => (
                <TestimonialCard key={`r2-a-${idx}`} item={t} />
              ))}
              {/* Duplicated sequence for seamless infinite wrap */}
              {ROW_TWO_TESTIMONIALS.map((t, idx) => (
                <TestimonialCard key={`r2-b-${idx}`} item={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-black bg-white p-6 shadow-sm flex flex-col justify-between select-none min-h-[200px] sm:min-h-[215px] hover:shadow-md transition-all duration-200">
      {/* Top Quote Content */}
      <div>
        <p className="text-sm text-neutral-800 leading-relaxed font-normal">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Bottom Section: Divider Line + Author Profile */}
      <div className="mt-6 flex items-center gap-3 border-t border-black/[0.08] pt-4">
        {/* Rounded Monogram Avatar Badge */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-xs select-none ${item.avatarColor} ${item.textColor}`}
        >
          {item.initial}
        </div>

        {/* Author Name and Position */}
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-bold text-neutral-950 tracking-tight truncate">
            {item.name}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 truncate mt-0.5">
            {item.role} &bull; {item.company}
          </p>
        </div>
      </div>
    </div>
  )
}

function MobileTestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl border border-black bg-white p-4 sm:p-5 shadow-sm flex flex-col justify-between select-none min-h-[195px] sm:min-h-[210px] active:scale-[0.99] transition-transform">
      {/* Top: 5 Stars + Quote */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-0.5 text-[#9E6941] text-[11px]">
            {'★'.repeat(5)}
          </div>
          <span className="text-[9.5px] font-mono font-semibold tracking-wider uppercase text-neutral-500 bg-black/[0.03] px-2 py-0.5 rounded-md">
            VERIFIED
          </span>
        </div>

        <p className="text-[13px] sm:text-[13.5px] text-neutral-800 leading-relaxed font-normal">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Bottom: Divider + Author Profile */}
      <div className="mt-3.5 flex items-center gap-2.5 border-t border-black/[0.06] pt-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs select-none shadow-2xs ${item.avatarColor} ${item.textColor}`}
        >
          {item.initial}
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-[13px] font-bold text-neutral-950 tracking-tight truncate">
            {item.name}
          </p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 truncate mt-0.5">
            {item.role} &bull; {item.company}
          </p>
        </div>
      </div>
    </div>
  )
}
