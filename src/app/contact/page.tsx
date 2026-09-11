import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import ContactForm from '@/components/contact/ContactForm'
import OfficeMapCard from '@/components/contact/OfficeMapCard'

export const metadata: Metadata = {
  title: 'Contact Us — Let’s Build Something Great Together | Stack',
  description:
    'Have a project in mind or want to explore working with Stack? Send us a message, email our team, or visit our Bengaluru studio. We reply within 24 hours.',
  alternates: {
    canonical: 'https://stack.studio/contact',
  },
  openGraph: {
    title: 'Contact Us — Let’s Build Something Great Together | Stack',
    description:
      'Have a project in mind or want to explore working with Stack? Get in touch with our team in Bengaluru. We engineer fast, high-converting digital products.',
    url: 'https://stack.studio/contact',
    siteName: 'Stack Studio',
    type: 'website',
  },
}

// Structured Data Schemas
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://stack.studio',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact Us',
      item: 'https://stack.studio/contact',
    },
  ],
}

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stack Studio',
  image: 'https://stack.studio/contact.png',
  url: 'https://stack.studio/contact',
  telephone: '+919876543210',
  email: 'hello@stack.studio',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 10:00-18:00',
  priceRange: '$$$$',
}

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />

      <main className="w-full bg-[#FAF7F2] text-neutral-900 pt-[72px] lg:pt-[80px] min-h-screen">
        {/* ─── HERO & CONTACT SECTION ─── */}
        <section className="relative w-full overflow-hidden pt-3 sm:pt-4 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-black/[0.06]">
          {/* Ambient Right Image: contact.png */}
          <div className="absolute top-0 right-0 w-full lg:w-[46%] xl:w-[43%] h-full pointer-events-none select-none hidden lg:block overflow-hidden -z-0">
            <Image
              src="/contact.png"
              alt="Stack Studio Creative Workspace"
              fill
              priority
              quality={95}
              className="object-cover object-top opacity-95"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Smooth Edge Fade Gradients into #FAF7F2 */}
            <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF7F2] to-transparent opacity-80" />
          </div>

          <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-start">
              {/* Left Column: Heading, Copy, Channels, Map, Metrics */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                    CONTACT US
                  </span>
                  <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold text-neutral-950 tracking-tight leading-[1.08]">
                  Let&apos;s build<br />
                  <span className="text-[#9E6941]">something great</span><br />
                  together.
                </h1>

                {/* Supporting Copy */}
                <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg lg:text-[18px] leading-relaxed max-w-xl font-normal">
                  Have a project in mind or just want to say hello? We&apos;d love to
                  hear from you. Share your ideas, and we&apos;ll get back to you as
                  soon as possible.
                </p>

                {/* 4 Quick Contact Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 mt-4 sm:mt-5">
                  {/* Channel 1: Email */}
                  <a
                    href="mailto:hello@stack.studio"
                    className="group bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs hover:shadow-md hover:border-[#9E6941]/30 transition-all text-center flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Email Us</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 group-hover:text-[#9E6941] transition-colors mt-0.5 break-all">
                      hello@stack.studio
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">We reply within 24 hours</span>
                  </a>

                  {/* Channel 2: Phone */}
                  <a
                    href="tel:+919876543210"
                    className="group bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs hover:shadow-md hover:border-[#9E6941]/30 transition-all text-center flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 shadow-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Call Us</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 group-hover:text-[#9E6941] transition-colors mt-0.5">
                      +91 98765 43210
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">Mon - Sat, 10AM - 6PM</span>
                  </a>

                  {/* Channel 3: Office */}
                  <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Our Office</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 mt-0.5">
                      Bengaluru, India
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">Visit by appointment</span>
                  </div>

                  {/* Channel 4: Live Chat */}
                  <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Live Chat</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 mt-0.5">
                      Chat with our team
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">Usually replies instantly</span>
                  </div>
                </div>

                {/* Office Location Map Preview Card */}
                <div className="mt-6">
                  <OfficeMapCard />
                </div>

                {/* Metrics Bar */}
                <div className="mt-10 pt-6 border-t border-black/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 select-none">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">250+</div>
                    <div className="text-xs text-neutral-500 font-medium mt-0.5">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">100+</div>
                    <div className="text-xs text-neutral-500 font-medium mt-0.5">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">4+</div>
                    <div className="text-xs text-neutral-500 font-medium mt-0.5">Years of Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">98%</div>
                    <div className="text-xs text-neutral-500 font-medium mt-0.5">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Floating Contact Form Card */}
              <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start xl:justify-center">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </main>
    </>
  )
}
