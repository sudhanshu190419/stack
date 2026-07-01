"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Check, Loader2 } from "lucide-react";

/* ───────────────────────────────────────────────
   Ambient background layers (reused pattern)
   ─────────────────────────────────────────────── */

function ContactBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: "#050816" }} />

      {/* Subtle animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Faint vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(5,8,22,0.4) 100%)",
        }}
      />

      {/* Gradient orbs */}
      {/* Top-left: indigo glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), transparent 70%)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center: purple glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(168,85,247,0.10), transparent 70%)",
        }}
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-right: pink glow */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 60%, rgba(236,72,153,0.12), transparent 70%)",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -40, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal light sweep */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 30%, rgba(236,72,153,0.05) 70%, rgba(168,85,247,0.08) 100%)",
        }}
      />

      {/* Subtle light rays */}
      {[25, 45, 60, 75].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[1px] h-full"
          style={{
            left: `${left}%`,
            background: `linear-gradient(to bottom, ${["rgba(99,102,241,0.04)", "rgba(168,85,247,0.03)", "rgba(236,72,153,0.03)", "rgba(99,102,241,0.04)"][i]}, transparent)`,
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Floating particles
   ─────────────────────────────────────────────── */

function Particles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 2.5,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 5,
    color: [
      "rgba(99,102,241,0.5)",
      "rgba(168,85,247,0.5)",
      "rgba(236,72,153,0.4)",
      "rgba(255,255,255,0.3)",
    ][i % 4],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
            boxShadow: `0 0 6px ${p.color.replace("0.4", "0.2").replace("0.5", "0.25")}`,
          }}
          initial={{ opacity: 0.2, scale: 0.5 }}
          animate={{
            y: [0, -(15 + Math.random() * 20), 0],
            x: [0, (Math.random() - 0.5) * 25, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Form Input Component
   ─────────────────────────────────────────────── */

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
}

function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  isTextarea = false,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const sharedClasses = `
    w-full bg-transparent text-white placeholder:text-white/20
    outline-none transition-colors duration-200
    ${isTextarea ? "min-h-[140px] resize-y py-3" : "h-12 py-2"}
  `;

  return (
    <div className="relative group">
      {/* Label */}
      <label
        htmlFor={name}
        className={`block text-xs font-medium tracking-wider uppercase mb-2 transition-colors duration-200 ${
          focused ? "text-indigo-400" : "text-white/30"
        }`}
      >
        {label}
        {required && <span className="text-indigo-400 ml-1">*</span>}
      </label>

      {/* Input wrapper with glass border */}
      <div
        className={`relative rounded-xl border transition-all duration-300 ${
          focused
            ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.08)]"
            : hasValue
              ? "border-white/15"
              : "border-white/[0.06]"
        } ${
          !focused ? "group-hover:border-white/20" : ""
        }`}
        style={{
          background: focused
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.02)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Focus glow ring */}
        {focused && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: "0 0 30px rgba(99,102,241,0.06)",
            }}
          />
        )}

        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${sharedClasses} px-4 relative z-10`}
            rows={5}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${sharedClasses} px-4 relative z-10`}
          />
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Contact Info Card
   ─────────────────────────────────────────────── */

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@stack.agency",
    href: "mailto:hello@stack.agency",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Details */}
      {CONTACT_DETAILS.map((detail, i) => (
        <motion.div
          key={detail.label}
          className="group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
        >
          <a
            href={detail.href}
            className="flex items-start gap-4"
            {...(detail.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <detail.icon className="w-5 h-5 text-indigo-400/80 transition-colors duration-300 group-hover:text-indigo-300" />
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wider uppercase text-white/30 mb-1">
                {detail.label}
              </span>
              <span className="block text-base text-white/80 font-medium transition-colors duration-300 group-hover:text-white">
                {detail.value}
              </span>
            </div>
          </a>
        </motion.div>
      ))}

      {/* Divider */}
      <motion.div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02), transparent)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span className="block text-xs font-medium tracking-wider uppercase text-white/30 mb-4">
          Follow Us
        </span>
        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {link.label}
              </span>
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))",
                }}
              />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Main Section
   ─────────────────────────────────────────────── */

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateField = (field: keyof typeof formState) => (value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <ContactBackground />
      {mounted && <Particles />}

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* ─── Section Header ─── */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] text-white/20 uppercase mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-400 text-lg">
            Have a project in mind? We&apos;d love to hear from you. Send us a
            message and we&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        {/* ─── Grid: Form + Info ─── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* ── Form Column ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormInput
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formState.name}
                  onChange={updateField("name")}
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formState.email}
                  onChange={updateField("email")}
                />
              </div>

              <FormInput
                label="Subject"
                name="subject"
                placeholder="Project Inquiry"
                value={formState.subject}
                onChange={updateField("subject")}
              />

              <FormInput
                label="Message"
                name="message"
                placeholder="Tell us about your project, goals, and timeline..."
                required
                value={formState.message}
                onChange={updateField("message")}
                isTextarea
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={submitting || submitted}
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.10))",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={
                  !submitting && !submitted ? { scale: 1.02 } : undefined
                }
                whileTap={
                  !submitting && !submitted ? { scale: 0.98 } : undefined
                }
              >
                {/* Hover fill */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))",
                  }}
                />

                {/* Shimmer on hover */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={
                    !submitting && !submitted
                      ? { backgroundPosition: ["200% 50%", "-200% 50%"] }
                      : undefined
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* ── Info Column ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ContactInfo />
          </motion.div>
        </div>

        {/* ─── Bottom decorative line ─── */}
        <motion.div
          className="mt-20 md:mt-28 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.15), rgba(168,85,247,0.10), rgba(236,72,153,0.15), transparent)",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Footer text */}
        <motion.p
          className="mt-6 text-center text-xs text-white/15 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          © {new Date().getFullYear()} Stack Agency. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
