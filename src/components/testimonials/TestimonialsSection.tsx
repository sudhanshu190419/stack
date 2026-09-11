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
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-neutral-900 pt-20 sm:pt-24 lg:pt-28 pb-24 sm:pb-28 lg:pb-32 border-t border-black/[0.04]"
    >
      {/* Ambient background subtle lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(250, 247, 242, 0) 70%)',
        }}
      />

      {/* Top Header Section */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 mb-8 sm:mb-10 lg:mb-12">
        {/* Eyebrow with horizontal line */}
        <div className="flex items-center gap-3.5 mb-4 sm:mb-5">
          <div className="w-8 sm:w-12 h-[1px] bg-[#9E6941]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-600 select-none">
            WHAT CLIENTS SAY
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-neutral-950 tracking-tight leading-[1.12] max-w-3xl">
          Founders and teams that{' '}
          <span className="text-[#9E6941]">stopped guessing</span>.
        </h2>
      </div>

      {/* 2-Line Infinite Auto Carousel Container (Matches ggmtechnologies.com motion) */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6">
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
        <div className="group overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
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
        <div className="group overflow-hidden">
          <div
            className="flex w-max animate-marquee-reverse gap-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
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
