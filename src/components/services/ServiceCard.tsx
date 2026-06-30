'use client'

import { motion } from 'framer-motion'
import { ServiceItem } from './servicesData'

interface ServiceCardProps {
  service: ServiceItem
  isActive: boolean
  index: number
}

export default function ServiceCard({ service, isActive, index }: ServiceCardProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : -30,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="w-full max-w-xl mx-auto px-6 lg:px-0">
        {/* Service number */}
        <motion.div
          className="text-[120px] font-bold leading-none tracking-tighter"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {String(service.id).padStart(2, '0')}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-white/60 mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {service.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          className="flex flex-wrap gap-2 mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {service.technologies.map((tech, i) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium rounded-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#"
          className="relative inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-semibold text-white overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${service.glowColor.replace('0.15', '0.08')}, transparent)`,
            }}
          />
          <span className="relative z-10">Learn More</span>
          <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}
