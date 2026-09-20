import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  ShieldCheck,
  Mail,
  Globe,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions — StackStich',
  description:
    'Terms & Conditions governing your use of the StackStich website and the provision of digital design and development services by StackStich.',
  alternates: {
    canonical: 'https://www.stackstich.online/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions — StackStich',
    description:
      'Terms & Conditions governing your use of the StackStich website and the provision of digital design and development services by StackStich.',
    url: 'https://www.stackstich.online/terms-and-conditions',
    siteName: 'StackStich',
    type: 'website',
    images: ['/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions — StackStich',
    description:
      'Terms & Conditions governing your use of the StackStich website and the provision of digital design and development services by StackStich.',
    images: ['/hero.png'],
  },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.stackstich.online',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Terms & Conditions',
      item: 'https://www.stackstich.online/terms-and-conditions',
    },
  ],
}

const SECTIONS_NAV = [
  { id: 'section-1', num: '01', title: 'About StackStich' },
  { id: 'section-2', num: '02', title: 'Website Use' },
  { id: 'section-3', num: '03', title: 'Enquiries and Quotations' },
  { id: 'section-4', num: '04', title: 'Pricing' },
  { id: 'section-5', num: '05', title: 'Payment Terms' },
  { id: 'section-6', num: '06', title: 'Domain and Hosting' },
  { id: 'section-7', num: '07', title: 'Free Maintenance' },
  { id: 'section-8', num: '08', title: 'Project Scope and Changes' },
  { id: 'section-9', num: '09', title: 'Client Responsibilities' },
  { id: 'section-10', num: '10', title: 'Intellectual Property' },
  { id: 'section-11', num: '11', title: 'Portfolio Use' },
  { id: 'section-12', num: '12', title: 'Third-Party Services' },
  { id: 'section-13', num: '13', title: 'Website Performance and Results' },
  { id: 'section-14', num: '14', title: 'Delivery Timelines' },
  { id: 'section-15', num: '15', title: 'Cancellation or Termination' },
  { id: 'section-16', num: '16', title: 'Refunds' },
  { id: 'section-17', num: '17', title: 'Disclaimer' },
  { id: 'section-18', num: '18', title: 'Limitation of Liability' },
  { id: 'section-19', num: '19', title: 'Governing Law' },
  { id: 'section-20', num: '20', title: 'Changes to These Terms' },
  { id: 'section-21', num: '21', title: 'Contact' },
]

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <main className="w-full bg-[#FAF7F2] text-neutral-900 pt-[72px] lg:pt-[80px]">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden border-b border-black/[0.06] bg-[#FAF7F2]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-6 sm:mb-8">
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                Home
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-[#9E6941] font-semibold">Terms &amp; Conditions</span>
            </nav>

            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                  LEGAL &amp; COMPLIANCE
                </span>
                <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.1] mb-6">
                Terms &amp; Conditions
              </h1>

              {/* Effective and Updated Meta Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-medium text-neutral-700 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-[#9E6941]" />
                  <span>Effective Date: <strong>20 September 2026</strong></span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-medium text-neutral-700 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#9E6941]" />
                  <span>Last Updated: <strong>20 September 2026</strong></span>
                </div>
              </div>

              {/* Welcome Introduction Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2.5 text-[#9E6941]">
                  <ShieldCheck className="w-5 h-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">Welcome to StackStich.</h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  These Terms &amp; Conditions govern your use of the StackStich website and the provision of services by StackStich. By using our website, contacting us, requesting a quotation, or engaging us for services, you agree to these Terms.
                </p>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.06] text-xs sm:text-sm text-neutral-800">
                  <AlertCircle className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                  <span>
                    If you do not agree with these Terms, please do not use the website or engage our services.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout with Sticky Sidebar Table of Contents */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <div className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.02)] max-h-[calc(100vh-140px)] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/[0.06]">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-900">
                    Table of Contents
                  </h3>
                  <span className="text-[11px] font-semibold text-[#9E6941] bg-[#9E6941]/10 px-2 py-0.5 rounded-full">
                    21 Clauses
                  </span>
                </div>
                <nav aria-label="Legal Sections Navigation">
                  <ul className="space-y-1 text-xs">
                    {SECTIONS_NAV.map((sec) => (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          className="group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-[#FAF7F2] transition-all"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="font-mono text-[10px] text-[#9E6941] font-semibold">
                              {sec.num}
                            </span>
                            <span className="truncate group-hover:translate-x-0.5 transition-transform font-medium">
                              {sec.title}
                            </span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-[#9E6941] shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content Clauses (1 to 21) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Clause 1 */}
              <section id="section-1" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    01
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    1. About StackStich
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                  StackStich provides digital design and development services, including:
                </p>
                <ul className="space-y-2 mb-5 pl-1">
                  {[
                    'Website Design',
                    'Web Development',
                    'E-commerce Development',
                    'Mobile Application Development',
                    'Website Maintenance',
                    'Related digital development services',
                  ].map((service) => (
                    <li key={service} className="flex items-center gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-black/[0.05]">
                  The exact services provided for a client will be defined in the applicable quotation, proposal, statement of work, or other written agreement.
                </p>
              </section>

              {/* Clause 2 */}
              <section id="section-2" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    02
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    2. Website Use
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  You may use this website for lawful purposes only.
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-medium">
                  You must not:
                </p>
                <ul className="space-y-2.5 pl-1">
                  {[
                    'use the website for unlawful activities;',
                    'attempt to gain unauthorized access to our systems;',
                    'interfere with website security or functionality;',
                    'copy, reproduce, or redistribute our website content without permission; or',
                    'use our content in a misleading or unauthorized manner.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Clause 3 */}
              <section id="section-3" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    03
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    3. Enquiries and Quotations
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  Submitting an enquiry does not automatically create a contract between you and StackStich.
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  Before starting a project, we may discuss:
                </p>
                <ul className="space-y-2 mb-5 pl-1">
                  {[
                    'requirements;',
                    'project scope;',
                    'number of pages/screens;',
                    'features;',
                    'integrations;',
                    'estimated timeline;',
                    'pricing;',
                    'payment schedule; and',
                    'other applicable project terms.',
                  ].map((disc) => (
                    <li key={disc} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{disc}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-black/[0.05]">
                  A project will begin after the relevant scope and commercial terms have been mutually agreed in writing.
                </p>
              </section>

              {/* Clause 4 */}
              <section id="section-4" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    04
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    4. Pricing
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Website pricing may start from the price communicated by StackStich at the time of enquiry, but the final price depends on the project&apos;s actual scope and requirements.
                  </p>
                  <p>
                    Additional features, revisions, integrations, third-party services, content production, or significant scope changes may result in additional charges.
                  </p>
                  <p className="pt-2 font-medium text-neutral-900 border-t border-black/[0.05]">
                    Any final pricing will be based on the agreed project scope.
                  </p>
                </div>
              </section>

              {/* Clause 5 */}
              <section id="section-5" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    05
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    5. Payment Terms
                  </h2>
                </div>
                <div className="space-y-3.5 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Unless otherwise agreed in writing, StackStich may use a milestone-based payment structure.
                  </p>
                  <p className="font-medium text-neutral-900">
                    For projects using our standard offer:
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#9E6941]/20 text-neutral-800">
                    <p className="font-medium">
                      No upfront payment is required at the beginning of the project. Payment becomes due after the agreed 50% development milestone has been completed.
                    </p>
                  </div>
                  <p>
                    The remaining payment schedule will be based on the terms agreed for the specific project.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 italic pt-1">
                    The exact payment schedule contained in the accepted proposal, quotation, or agreement will take precedence over general wording on this website.
                  </p>
                </div>
              </section>

              {/* Clause 6 */}
              <section id="section-6" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    06
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    6. Domain and Hosting
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Where included in the agreed package, StackStich may provide or arrange domain registration and hosting.
                  </p>
                  <p>
                    A domain is the website&apos;s internet address, such as:
                  </p>
                  <div className="px-4 py-2 rounded-lg bg-[#FAF7F2] font-mono text-xs sm:text-sm text-neutral-800 border border-black/[0.05] inline-block">
                    yourbusiness.com
                  </div>
                  <p>
                    Hosting is the service that stores the website so that it can be accessed online.
                  </p>
                  <p>
                    Domain registration and hosting remain subject to the applicable terms, renewal policies, availability, and policies of the relevant third-party providers.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Unless specifically stated otherwise in writing, StackStich does not guarantee that a particular domain name will always be available.
                  </p>
                </div>
              </section>

              {/* Clause 7 */}
              <section id="section-7" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    07
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    7. Free Maintenance
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Where the agreed package includes it, StackStich provides six months of free website maintenance after launch.
                  </p>
                  <p>
                    The precise scope of free maintenance will be based on the agreed project package.
                  </p>
                  <p>
                    Basic maintenance may include reasonable content updates, minor corrections, and basic website support.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Major redesigns, new features, substantial development work, new integrations, or changes outside the agreed maintenance scope may be charged separately.
                  </p>
                </div>
              </section>

              {/* Clause 8 */}
              <section id="section-8" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    08
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    8. Project Scope and Changes
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    The project will be developed according to the agreed scope.
                  </p>
                  <p>
                    If you request additional functionality, pages, integrations, designs, or other work outside that scope, StackStich may provide an additional quotation or change request.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Changes to project requirements may also affect the estimated delivery timeline.
                  </p>
                </div>
              </section>

              {/* Clause 9 */}
              <section id="section-9" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    09
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    9. Client Responsibilities
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  The client is responsible for providing accurate and lawful materials required for the project, including where applicable:
                </p>
                <ul className="space-y-2 mb-4 pl-1">
                  {[
                    'business information;',
                    'text and copy;',
                    'logos;',
                    'images;',
                    'product information;',
                    'account credentials where necessary;',
                    'legal documents;',
                    'approvals and feedback; and',
                    'other required content.',
                  ].map((resp) => (
                    <li key={resp} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 pt-3 border-t border-black/[0.05] text-neutral-700 text-sm sm:text-base leading-relaxed">
                  <p>
                    The client confirms that materials supplied to StackStich may legally be used for the project.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    StackStich is not responsible for delays caused by missing information, delayed approvals, unavailable assets, or other client-side dependencies.
                  </p>
                </div>
              </section>

              {/* Clause 10 */}
              <section id="section-10" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    10
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    10. Intellectual Property
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Unless otherwise agreed in writing, the client receives rights to the final custom work created specifically for the client after all applicable project payments have been made.
                  </p>
                  <p>
                    Third-party software, libraries, fonts, stock assets, plugins, APIs, hosting systems, and other third-party components remain subject to their respective licenses and terms.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    StackStich retains ownership of its pre-existing tools, reusable components, frameworks, development methods, templates, know-how, and internal systems that were not created exclusively for the client.
                  </p>
                </div>
              </section>

              {/* Clause 11 */}
              <section id="section-11" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    11
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    11. Portfolio Use
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Unless the client specifically requests otherwise in writing, StackStich may display completed work as part of its portfolio, website, case studies, presentations, or marketing materials.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    We will avoid publicly disclosing confidential client information that was agreed to be confidential.
                  </p>
                </div>
              </section>

              {/* Clause 12 */}
              <section id="section-12" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    12
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    12. Third-Party Services
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  Projects may depend on third-party services such as:
                </p>
                <ul className="space-y-2 mb-4 pl-1">
                  {[
                    'domain registrars;',
                    'hosting providers;',
                    'payment gateways;',
                    'Google services;',
                    'social-media platforms;',
                    'email providers;',
                    'APIs;',
                    'maps;',
                    'analytics platforms; or',
                    'other external services.',
                  ].map((service) => (
                    <li key={service} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-3 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05] leading-relaxed">
                  StackStich is not responsible for outages, pricing changes, policy changes, account restrictions, discontinued services, or other problems caused by third-party providers.
                </p>
              </section>

              {/* Clause 13 */}
              <section id="section-13" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    13
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    13. Website Performance and Results
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  StackStich aims to create professional, functional, and technically sound digital products.
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  However, we do not guarantee specific business outcomes such as:
                </p>
                <ul className="space-y-2 mb-4 pl-1">
                  {[
                    'a specific number of visitors;',
                    'sales;',
                    'leads;',
                    'conversions;',
                    'search-engine rankings;',
                    'advertising performance; or',
                    'revenue.',
                  ].map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-3 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05] leading-relaxed font-medium">
                  Business results depend on many factors outside the control of StackStich.
                </p>
              </section>

              {/* Clause 14 */}
              <section id="section-14" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    14
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    14. Delivery Timelines
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  We will provide an estimated timeline based on the agreed scope.
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  Timelines may change because of:
                </p>
                <ul className="space-y-2 mb-4 pl-1">
                  {[
                    'scope changes;',
                    'delayed client feedback;',
                    'missing content;',
                    'third-party dependencies;',
                    'technical issues; or',
                    'circumstances outside our reasonable control.',
                  ].map((reason) => (
                    <li key={reason} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-3 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05] leading-relaxed">
                  Any revised timeline will be communicated where reasonably possible.
                </p>
              </section>

              {/* Clause 15 */}
              <section id="section-15" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    15
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    15. Cancellation or Termination
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Either party may request cancellation of a project subject to the terms agreed in the applicable proposal or agreement.
                  </p>
                  <p>
                    Work already completed, approved, delivered, or committed to third-party providers may remain payable according to the agreed terms.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    The consequences of cancellation will depend on the project&apos;s current stage and the written agreement between the parties.
                  </p>
                </div>
              </section>

              {/* Clause 16 */}
              <section id="section-16" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    16
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    16. Refunds
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Any refund will be handled according to the applicable project agreement and the stage of work completed.
                  </p>
                  <p>
                    Because custom website and development work involves time, design, development, and other project-specific resources, refunds are not automatically available for work already completed or delivered.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Specific refund arrangements, where applicable, will be stated in the quotation or project agreement.
                  </p>
                </div>
              </section>

              {/* Clause 17 */}
              <section id="section-17" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    17
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    17. Disclaimer
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    The StackStich website and its content are provided on an &ldquo;as available&rdquo; basis.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    While we make reasonable efforts to keep information accurate and current, we do not guarantee that every website page, feature, link, or piece of information will always be completely error-free, uninterrupted, or up to date.
                  </p>
                </div>
              </section>

              {/* Clause 18 */}
              <section id="section-18" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    18
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    18. Limitation of Liability
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    To the maximum extent permitted by applicable law, StackStich will not be responsible for indirect, incidental, special, consequential, or unforeseeable losses arising from use of the website or services.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Any liability relating to a specific client project will be subject to the applicable written project agreement and applicable law.
                  </p>
                </div>
              </section>

              {/* Clause 19 */}
              <section id="section-19" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    19
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    19. Governing Law
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    These Terms will be governed by the applicable laws of India.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Any dispute will be subject to the jurisdiction of the courts having appropriate jurisdiction over StackStich&apos;s applicable place of business, unless otherwise agreed in writing or required by law.
                  </p>
                </div>
              </section>

              {/* Clause 20 */}
              <section id="section-20" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    20
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    20. Changes to These Terms
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    StackStich may update these Terms from time to time.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    The updated version will be published on this page with a revised Last Updated date.
                  </p>
                </div>
              </section>

              {/* Clause 21: Contact */}
              <section id="section-21" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941] text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs">
                    21
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    21. Contact
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  For questions regarding these Terms:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Card */}
                  <a
                    href="mailto:contact@stackstich.online"
                    className="group flex items-start gap-4 p-5 rounded-xl bg-[#FAF7F2] border border-black/[0.06] hover:border-[#9E6941]/40 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] text-[#9E6941] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        StackStich Email
                      </div>
                      <div className="text-sm sm:text-[15px] font-bold text-neutral-900 group-hover:text-[#9E6941] transition-colors mt-0.5 break-all">
                        contact@stackstich.online
                      </div>
                    </div>
                  </a>

                  {/* Website Card */}
                  <a
                    href="https://www.stackstich.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-xl bg-[#FAF7F2] border border-black/[0.06] hover:border-[#9E6941]/40 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] text-[#9E6941] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Website
                      </div>
                      <div className="text-sm sm:text-[15px] font-bold text-neutral-900 group-hover:text-[#9E6941] transition-colors mt-0.5 break-all">
                        https://www.stackstich.online/
                      </div>
                    </div>
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
