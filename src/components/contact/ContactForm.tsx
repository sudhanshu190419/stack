'use client'

import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  PenSquare,
  ChevronDown,
  ArrowRight,
  Lock,
  CheckCircle2,
} from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="relative w-full max-w-[540px] bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-black/[0.08] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)]">
      {/* Eyebrow Badge */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#FAF2EB] text-[#9E6941] text-[11px] font-bold tracking-widest uppercase select-none">
          GET IN TOUCH
        </span>
      </div>

      {/* Heading & Subtitle */}
      <h3 className="text-2xl sm:text-[26px] font-bold text-neutral-950 tracking-tight leading-tight">
        Send us a message
      </h3>
      <p className="text-xs sm:text-sm text-neutral-500 mt-1 mb-6 leading-relaxed">
        Fill out the form below and our team will get back to you shortly.
      </p>

      {submitted ? (
        <div className="py-10 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#9E6941]/10 text-[#9E6941] flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-neutral-950">Thank you!</h4>
          <p className="text-neutral-600 text-sm mt-2 max-w-sm">
            Your message has been received. A senior Stack team member will reach out within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', phone: '', service: '', message: '' })
            }}
            className="mt-6 text-xs font-semibold text-[#9E6941] hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#9E6941] focus:ring-1 focus:ring-[#9E6941] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#9E6941] focus:ring-1 focus:ring-[#9E6941] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#9E6941] focus:ring-1 focus:ring-[#9E6941] transition-all"
              />
            </div>
          </div>

          {/* Row 3: Service Interested In */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Service Interested In
            </label>
            <div className="relative">
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-black/[0.12] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#9E6941] focus:ring-1 focus:ring-[#9E6941] transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a service</option>
                <option value="web-development">Web Development</option>
                <option value="app-development">Mobile App Development</option>
                <option value="website-design">Website Design &amp; UI/UX</option>
                <option value="ecommerce-development">E-Commerce Development</option>
                <option value="full-service">Full-Stack Digital Transformation</option>
                <option value="other">Other Inquiry</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Row 4: Your Message */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Your Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <PenSquare className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <textarea
                required
                rows={3}
                placeholder="Tell us about your project, ideas or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#9E6941] focus:ring-1 focus:ring-[#9E6941] transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-[#111111] hover:bg-black text-white text-sm sm:text-[15px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] shadow-sm disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-1.5 pt-1 text-[11.5px] text-neutral-500 select-none">
            <Lock className="w-3.5 h-3.5 text-[#9E6941]/80" />
            <span>We respect your privacy. Your information is safe with us.</span>
          </div>
        </form>
      )}
    </div>
  )
}
