import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Mail,
  MapPin,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'
import ContactForm from '@/components/contact/ContactForm'
import OfficeMapCard from '@/components/contact/OfficeMapCard'

export const metadata: Metadata = {
  title: 'Contact Us — Let’s Build Something Great Together | Stack',
  description:
    'Have a project in mind or want to explore working with Stack? Send us a message, email our team, or visit our Delhi studio. We reply within 24 hours.',
  alternates: {
    canonical: 'https://stack.studio/contact',
  },
  openGraph: {
    title: 'Contact Us — Let’s Build Something Great Together | Stack',
    description:
      'Have a project in mind or want to explore working with Stack? Get in touch with our team in Delhi. We engineer fast, high-converting digital products.',
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
  telephone: '+918860979255',
  email: 'contact@stackstich.online',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C 319 Street No 11 Ganga Vihar',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110094',
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

                {/* 3 Quick Contact Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 mt-4 sm:mt-5">
                  {/* Channel 1: Email */}
                  <a
                    href="mailto:contact@stackstich.online"
                    className="col-span-2 sm:col-span-1 group bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs hover:shadow-md hover:border-[#9E6941]/30 transition-all text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Email Us</h4>
                    <p className="text-[12px] sm:text-[11px] lg:text-[11.5px] xl:text-xs font-semibold text-neutral-700 group-hover:text-[#9E6941] transition-colors mt-0.5 whitespace-nowrap">
                      contact@stackstich.online
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">We reply within 24 hours</span>
                  </a>

                  {/* Channel 2: WhatsApp */}
                  <a
                    href="https://wa.me/918860979255?text=Hi%20StackStich%2C%20I'm%20interested%20in%20your%20services.%20I'd%20like%20to%20discuss%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 group bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs hover:shadow-md hover:border-[#25D366]/40 transition-all text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 shadow-xs">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
                      </svg>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">WhatsApp</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 group-hover:text-[#25D366] transition-colors mt-0.5 whitespace-nowrap">
                      Chat with us
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">Mon - Sat, 10AM - 6PM</span>
                  </a>

                  {/* Channel 3: Office */}
                  <a
                    href="https://maps.google.com/?q=C+319+Street+No+11+Ganga+Vihar+Delhi+110094"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 group bg-white rounded-2xl p-4 sm:p-4.5 border border-black/[0.06] shadow-xs hover:shadow-md hover:border-[#9E6941]/30 transition-all text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9E6941] text-white flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Our Office</h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-neutral-700 group-hover:text-[#9E6941] transition-colors mt-0.5 whitespace-nowrap">
                      Delhi, India
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1">Ganga Vihar, 110094</span>
                  </a>
                </div>

                {/* Office Location Map Preview Card */}
                <div className="mt-6">
                  <OfficeMapCard />
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
