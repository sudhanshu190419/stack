import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Mail,
  Globe,
  ArrowRight,
  Clock,
  Calendar,
  Lock,
  Eye,
  FileText,
  AlertCircle,
} from 'lucide-react'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — StackStich',
  description:
    'Privacy Policy explaining what information StackStich collects when you visit https://www.stackstich.online/, why we collect it, how we use it, and your choices.',
  alternates: {
    canonical: 'https://www.stackstich.online/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — StackStich',
    description:
      'Privacy Policy explaining what information StackStich collects when you visit https://www.stackstich.online/, why we collect it, how we use it, and your choices.',
    url: 'https://www.stackstich.online/privacy-policy',
    siteName: 'StackStich',
    type: 'website',
    images: ['/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — StackStich',
    description:
      'Privacy Policy explaining what information StackStich collects when you visit https://www.stackstich.online/, why we collect it, how we use it, and your choices.',
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
      name: 'Privacy Policy',
      item: 'https://www.stackstich.online/privacy-policy',
    },
  ],
}

const PRIVACY_SECTIONS_NAV = [
  { id: 'section-1', num: '01', title: 'About StackStich' },
  { id: 'section-2', num: '02', title: 'Information We Collect' },
  { id: 'section-3', num: '03', title: 'How We Use Your Information' },
  { id: 'section-4', num: '04', title: 'Contact Forms and Enquiries' },
  { id: 'section-5', num: '05', title: 'WhatsApp & Communication Services' },
  { id: 'section-6', num: '06', title: 'Cookies & Similar Technologies' },
  { id: 'section-7', num: '07', title: 'Analytics and Advertising' },
  { id: 'section-8', num: '08', title: 'How We Share Information' },
  { id: 'section-9', num: '09', title: 'Third-Party Services and Links' },
  { id: 'section-10', num: '10', title: 'Data Security' },
  { id: 'section-11', num: '11', title: 'Data Retention' },
  { id: 'section-12', num: '12', title: 'Your Choices & Privacy Requests' },
  { id: 'section-13', num: '13', title: 'Grievances and Complaints' },
  { id: 'section-14', num: '14', title: "Children's Privacy" },
  { id: 'section-15', num: '15', title: 'International Data Processing' },
  { id: 'section-16', num: '16', title: 'Changes to This Privacy Policy' },
  { id: 'section-17', num: '17', title: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-6 sm:mb-8">
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                Home
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-[#9E6941] font-semibold">Privacy Policy</span>
            </nav>

            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 select-none">
                  PRIVACY &amp; DATA PROTECTION
                </span>
                <div className="w-12 sm:w-16 h-[1.5px] bg-[#9E6941]" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.1] mb-6">
                Privacy Policy
              </h1>

              {/* Effective Date and Last Updated Badges */}
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

              {/* Intro Banner */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2.5 text-[#9E6941]">
                  <ShieldCheck className="w-5 h-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Our Commitment to Your Privacy
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  At StackStich, we respect your privacy and are committed to handling personal information responsibly. This Privacy Policy explains what information we may collect when you visit or interact with{' '}
                  <a
                    href="https://www.stackstich.online/"
                    className="text-[#9E6941] underline underline-offset-2 font-medium hover:text-[#83522e]"
                  >
                    https://www.stackstich.online/
                  </a>
                  , why we collect it, how we use it, when it may be shared, and the choices available to you.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.06] text-xs sm:text-sm text-neutral-800">
                  <p className="font-medium">
                    By using our website or voluntarily providing information to us, you acknowledge this Privacy Policy.
                  </p>
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
                    17 Sections
                  </span>
                </div>
                <nav aria-label="Privacy Policy Sections Navigation">
                  <ul className="space-y-1 text-xs">
                    {PRIVACY_SECTIONS_NAV.map((sec) => (
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

            {/* Main Content Clauses (1 to 17) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Clause 1: About StackStich */}
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
                  StackStich is a web design and development agency providing services including website design, web development, e-commerce development, mobile application development, and website maintenance.
                </p>
                <div className="pt-4 border-t border-black/[0.05]">
                  <p className="text-xs sm:text-sm font-medium text-neutral-800 mb-3">
                    For privacy-related questions or requests, you can contact us at:
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-700">
                    <a
                      href="mailto:contact@stackstich.online"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#9E6941] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      contact@stackstich.online
                    </a>
                    <span className="text-neutral-300 hidden sm:inline">•</span>
                    <a
                      href="https://www.stackstich.online/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-neutral-800 hover:text-[#9E6941]"
                    >
                      <Globe className="w-4 h-4" />
                      https://www.stackstich.online/
                    </a>
                  </div>
                </div>
              </section>

              {/* Clause 2: Information We Collect */}
              <section id="section-2" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    02
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    2. Information We Collect
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                  We may collect personal information that you voluntarily provide to us when you contact StackStich, request information, request a quotation, or otherwise communicate with us.
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4 font-medium">
                  Depending on how you interact with our website, this may include:
                </p>
                <div className="space-y-3.5 mb-5">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs sm:text-sm font-bold text-neutral-950 block mb-1">
                      Contact information
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      Your name, email address, phone number, WhatsApp number, business name, and other contact details you choose to provide.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs sm:text-sm font-bold text-neutral-950 block mb-1">
                      Project information
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      Information about your business, website or application requirements, services you are interested in, project scope, budget, timeline, and other information you provide for an enquiry or quotation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs sm:text-sm font-bold text-neutral-950 block mb-1">
                      Communication information
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      Information contained in emails, WhatsApp conversations, enquiry forms, and other communications that you initiate with us.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs sm:text-sm font-bold text-neutral-950 block mb-1">
                      Technical information
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      Information that may be automatically collected when you use our website, such as browser type, device type, operating system, IP address, approximate location derived from IP address, referring page, pages visited, and information about how you interact with the website.
                    </p>
                  </div>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-black/[0.05]">
                  We only request information that is reasonably relevant to the purpose for which it is collected.
                </p>
              </section>

              {/* Clause 3: How We Use Your Information */}
              <section id="section-3" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    03
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    3. How We Use Your Information
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  We may use the information we collect to:
                </p>
                <ul className="space-y-2 mb-5 pl-1">
                  {[
                    'respond to your enquiries;',
                    'understand your business and project requirements;',
                    'prepare quotations and proposals;',
                    'communicate with you about our services;',
                    'provide and manage services you request;',
                    'improve our website, services, and user experience;',
                    'maintain website security and prevent misuse;',
                    'understand website traffic and usage;',
                    'measure the performance of marketing or advertising campaigns;',
                    'maintain business and communication records; and',
                    'comply with applicable legal obligations.',
                  ].map((purpose) => (
                    <li key={purpose} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 pt-3 border-t border-black/[0.05] text-neutral-700 text-sm sm:text-base leading-relaxed">
                  <p>
                    Where required by applicable law, we will process personal data on an appropriate legal basis, including consent or another permitted basis.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                    The DPDP Act requires consent, where consent is the basis for processing, to be free, specific, informed, unconditional, and unambiguous, and provides for withdrawal of consent.
                  </p>
                </div>
              </section>

              {/* Clause 4: Contact Forms and Enquiries */}
              <section id="section-4" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    04
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    4. Contact Forms and Enquiries
                  </h2>
                </div>
                <div className="space-y-3.5 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    When you submit an enquiry through our website, the information you provide may be used to contact you about your enquiry, understand your requirements, prepare a proposal or quotation, and provide requested services.
                  </p>
                  <p>
                    Submitting an enquiry does not automatically create a business relationship or service agreement.
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#9E6941]/20 text-neutral-800 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-[#9E6941] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm">
                      Please do not submit passwords, payment-card details, confidential credentials, or other highly sensitive information through a general website enquiry form unless we specifically request it through an appropriate secure process.
                    </p>
                  </div>
                </div>
              </section>

              {/* Clause 5: WhatsApp and Other Communication Services */}
              <section id="section-5" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    05
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    5. WhatsApp and Other Communication Services
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Our website may contain links that allow you to contact StackStich through WhatsApp.
                  </p>
                  <p>
                    When you use a WhatsApp link, the interaction takes place through WhatsApp and may be subject to WhatsApp/Meta&apos;s separate terms and privacy practices.
                  </p>
                  <p>
                    StackStich does not control how WhatsApp independently processes information within its platform.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    The same principle applies to other third-party communication platforms that may be linked from our website.
                  </p>
                </div>
              </section>

              {/* Clause 6: Cookies and Similar Technologies */}
              <section id="section-6" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    06
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    6. Cookies and Similar Technologies
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-3 font-normal">
                  Our website may use cookies, local storage, pixels, or similar technologies for purposes such as:
                </p>
                <ul className="space-y-2 mb-4 pl-1">
                  {[
                    'essential website functionality;',
                    'remembering preferences;',
                    'understanding website usage;',
                    'improving website performance;',
                    'measuring advertising effectiveness; and',
                    'preventing fraud or abuse.',
                  ].map((cookiePurpose) => (
                    <li key={cookiePurpose} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                      <span>{cookiePurpose}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 pt-3 border-t border-black/[0.05] text-neutral-700 text-sm sm:text-base leading-relaxed">
                  <p>
                    Cookies are small files or identifiers that can help a website recognize a browser or remember information about a visit. Third-party services such as Google Analytics and Google Ads may also use cookies or similar technologies when they are implemented on a website.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    You can manage or block cookies through your browser settings. Some website features may not function as intended if certain technologies are disabled.
                  </p>
                </div>
              </section>

              {/* Clause 7: Analytics and Advertising */}
              <section id="section-7" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    07
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    7. Analytics and Advertising
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    We may use third-party analytics or advertising services, including Google services, to understand website traffic, measure advertising performance, and improve our marketing.
                  </p>
                  <p>
                    When such services are used on our website, information such as page URLs, IP address, browser/device information, cookies, and interactions may be processed by the relevant third-party provider according to its policies and settings. Google describes its use of information from sites that use Google Analytics and Google Ads for measurement, service improvement, security, and advertising-related purposes.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Where legally required, appropriate consent or controls will be provided for non-essential tracking technologies.
                  </p>
                </div>
              </section>

              {/* Clause 8: How We Share Information */}
              <section id="section-8" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    08
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    8. How We Share Information
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p className="font-semibold text-neutral-900">
                    We do not sell your personal information.
                  </p>
                  <p>
                    We may share or provide access to personal information where reasonably necessary with:
                  </p>
                  <ul className="space-y-2 mb-4 pl-1">
                    {[
                      'hosting and infrastructure providers;',
                      'website, analytics, and advertising service providers;',
                      'email and communication providers;',
                      'payment or other service providers involved in delivering requested services;',
                      'professional advisers where necessary; and',
                      'government, regulatory, law-enforcement, or judicial authorities where required or permitted by law.',
                    ].map((entity) => (
                      <li key={entity} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E6941] shrink-0 mt-2" />
                        <span>{entity}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Third-party service providers may process information on our behalf or independently under their own terms and privacy policies.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                    We aim to share only information that is reasonably necessary for the relevant purpose.
                  </p>
                </div>
              </section>

              {/* Clause 9: Third-Party Services and Links */}
              <section id="section-9" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    09
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    9. Third-Party Services and Links
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Our website may link to or integrate with third-party services such as WhatsApp, Google services, payment providers, social-media platforms, maps, APIs, hosting providers, or other external services.
                  </p>
                  <p>
                    Those services operate under their own terms and privacy policies.
                  </p>
                  <p>
                    StackStich is not responsible for the privacy practices, security, availability, or content of independent third-party services.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    We encourage you to review the relevant third-party privacy policy before providing personal information through an external service.
                  </p>
                </div>
              </section>

              {/* Clause 10: Data Security */}
              <section id="section-10" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    10
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    10. Data Security
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, loss, misuse, or destruction.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    However, no method of transmission over the internet or method of electronic storage can be guaranteed to be completely secure.
                  </p>
                </div>
              </section>

              {/* Clause 11: Data Retention */}
              <section id="section-11" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    11
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    11. Data Retention
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including responding to enquiries, providing services, maintaining business records, resolving disputes, preventing misuse, and meeting legal or regulatory requirements.
                  </p>
                  <p>
                    The length of time information is retained may vary depending on its type, purpose, and applicable legal requirements.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Where information is no longer required, we may securely delete, anonymize, or otherwise dispose of it, subject to applicable retention obligations.
                  </p>
                </div>
              </section>

              {/* Clause 12: Your Choices and Privacy Requests */}
              <section id="section-12" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    12
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    12. Your Choices and Privacy Requests
                  </h2>
                </div>
                <div className="space-y-3.5 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Depending on applicable law and the circumstances of the processing, you may have rights concerning your personal information, which may include requesting access to information about its processing, correction of inaccurate information, or erasure of personal information.
                  </p>
                  <p>
                    Where processing is based on consent, you may also have the right to withdraw that consent, subject to applicable law and the consequences of withdrawal. The DPDP Act expressly provides for withdrawal of consent where consent is the basis for processing.
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 block mb-1">
                      To make a privacy request, contact:
                    </span>
                    <a
                      href="mailto:contact@stackstich.online"
                      className="text-sm font-bold text-[#9E6941] hover:underline"
                    >
                      contact@stackstich.online
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 italic">
                    We may need to verify your identity before acting on certain requests.
                  </p>
                </div>
              </section>

              {/* Clause 13: Grievances and Complaints */}
              <section id="section-13" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    13
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    13. Grievances and Complaints
                  </h2>
                </div>
                <div className="space-y-3.5 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    If you have a question, concern, or complaint regarding the handling of your personal information, please contact:
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.05]">
                    <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block">
                      StackStich Email
                    </span>
                    <a
                      href="mailto:contact@stackstich.online"
                      className="text-sm sm:text-[15px] font-bold text-[#9E6941] hover:underline mt-0.5 inline-block"
                    >
                      contact@stackstich.online
                    </a>
                  </div>
                  <p>
                    We will review and respond to legitimate privacy-related requests in accordance with applicable law.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    The DPDP Act provides a right to grievance redressal, and the 2025 Rules contemplate clear means for individuals to exercise rights and make complaints. The applicable provisions have a phased commencement.
                  </p>
                </div>
              </section>

              {/* Clause 14: Children's Privacy */}
              <section id="section-14" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    14
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    14. Children&apos;s Privacy
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Our website is intended for businesses and general audiences.
                  </p>
                  <p>
                    We do not knowingly request personal information from children for independent marketing or service purposes.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    If you believe a child has provided personal information to us, please contact us so that we can review and take appropriate action.
                  </p>
                </div>
              </section>

              {/* Clause 15: International Data Processing */}
              <section id="section-15" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    15
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    15. International Data Processing
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    Some third-party providers used by StackStich may process or store information outside India.
                  </p>
                  <p>
                    Where information is processed through such services, the relevant provider&apos;s systems, contractual terms, security measures, and applicable legal requirements may apply.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    Where required by applicable law, we will take appropriate steps concerning such transfers.
                  </p>
                </div>
              </section>

              {/* Clause 16: Changes to This Privacy Policy */}
              <section id="section-16" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941]/10 text-[#9E6941] text-xs font-bold font-mono flex items-center justify-center">
                    16
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    16. Changes to This Privacy Policy
                  </h2>
                </div>
                <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our website, services, technology, data practices, or applicable legal requirements.
                  </p>
                  <p className="pt-2 text-xs sm:text-sm text-neutral-600 border-t border-black/[0.05]">
                    The updated policy will be published on this page with a revised Last Updated date.
                  </p>
                </div>
              </section>

              {/* Clause 17: Contact Us */}
              <section id="section-17" className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#9E6941] text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs">
                    17
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    17. Contact Us
                  </h2>
                </div>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  For questions, privacy requests, or complaints relating to this Privacy Policy:
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
