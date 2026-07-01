'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ServiceVisualProps {
  serviceId: number
  isActive: boolean
}

function WebVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent 60%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Image - standalone, no card frame */}
      <motion.div
        className="relative"
        style={{
          width: 680,
          height: 470,
          borderRadius: '16px',
          overflow: 'hidden',
          marginLeft: '-120px',
        }}
        initial={{ scale: 0.6, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={
          isActive
            ? {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
              }
            : { scale: 0.85, opacity: 0.4, rotateY: 0, rotateX: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1, filter: 'blur(8px) brightness(1.2)' }}
          animate={
            isActive
              ? { scale: 1, filter: 'blur(0px) brightness(1)' }
              : { scale: 0.95, filter: 'blur(2px) brightness(0.7)' }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/web.png"
            alt="Web Development"
            width={680}
            height={470}
            className="object-cover w-full h-full rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

      </motion.div>

      {/* Floating ambient particles around the image */}
      {isActive &&
        [
          { x: -53, y: -40, size: 3, delay: 0 },
          { x: 66, y: -26, size: 2, delay: 0.8 },
          { x: -41, y: 53, size: 2.5, delay: 1.6 },
          { x: 60, y: 47, size: 2, delay: 2.4 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `calc(50% + ${orb.x}px)`,
              top: `calc(50% + ${orb.y}px)`,
              background: `radial-gradient(circle, rgba(249,115,22,0.6), transparent)`,
              boxShadow: '0 0 8px rgba(249,115,22,0.3)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}


    </div>
  )
}

function MobileVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: 'radial-gradient(circle, rgba(244,63,94,0.12), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          background: 'radial-gradient(circle, rgba(244,63,94,0.06), transparent 60%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Image - standalone, no card frame */}
      <motion.div
        className="relative"
        style={{
          width: 680,
          height: 470,
          borderRadius: '16px',
          overflow: 'hidden',
          marginLeft: '-120px',
        }}
        initial={{ scale: 0.6, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={
          isActive
            ? {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
              }
            : { scale: 0.85, opacity: 0.4, rotateY: 0, rotateX: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1, filter: 'blur(8px) brightness(1.2)' }}
          animate={
            isActive
              ? { scale: 1, filter: 'blur(0px) brightness(1)' }
              : { scale: 0.95, filter: 'blur(2px) brightness(0.7)' }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/app.png"
            alt="Mobile App Development"
            width={680}
            height={470}
            className="object-cover w-full h-full rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

      </motion.div>

      {/* Floating ambient particles around the image */}
      {isActive &&
        [
          { x: -53, y: -40, size: 3, delay: 0 },
          { x: 66, y: -26, size: 2, delay: 0.8 },
          { x: -41, y: 53, size: 2.5, delay: 1.6 },
          { x: 60, y: 47, size: 2, delay: 2.4 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `calc(50% + ${orb.x}px)`,
              top: `calc(50% + ${orb.y}px)`,
              background: `radial-gradient(circle, rgba(244,63,94,0.6), transparent)`,
              boxShadow: '0 0 8px rgba(244,63,94,0.3)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}


    </div>
  )
}

function DesignVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          background: 'radial-gradient(circle, rgba(168,85,247,0.06), transparent 60%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Image - standalone, no card frame */}
      <motion.div
        className="relative"
        style={{
          width: 680,
          height: 470,
          borderRadius: '16px',
          overflow: 'hidden',
          marginLeft: '-120px',
        }}
        initial={{ scale: 0.6, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={
          isActive
            ? {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
              }
            : { scale: 0.85, opacity: 0.4, rotateY: 0, rotateX: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1, filter: 'blur(8px) brightness(1.2)' }}
          animate={
            isActive
              ? { scale: 1, filter: 'blur(0px) brightness(1)' }
              : { scale: 0.95, filter: 'blur(2px) brightness(0.7)' }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/ux.png"
            alt="UI / UX Design"
            width={680}
            height={470}
            className="object-cover w-full h-full rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

      </motion.div>

      {/* Floating ambient particles around the image */}
      {isActive &&
        [
          { x: -53, y: -40, size: 3, delay: 0 },
          { x: 66, y: -26, size: 2, delay: 0.8 },
          { x: -41, y: 53, size: 2.5, delay: 1.6 },
          { x: 60, y: 47, size: 2, delay: 2.4 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `calc(50% + ${orb.x}px)`,
              top: `calc(50% + ${orb.y}px)`,
              background: `radial-gradient(circle, rgba(168,85,247,0.6), transparent)`,
              boxShadow: '0 0 8px rgba(168,85,247,0.3)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}


    </div>
  )
}

function AIVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 60%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Image - standalone, no card frame */}
      <motion.div
        className="relative"
        style={{
          width: 680,
          height: 470,
          borderRadius: '16px',
          overflow: 'hidden',
          marginLeft: '-120px',
        }}
        initial={{ scale: 0.6, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={
          isActive
            ? {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
              }
            : { scale: 0.85, opacity: 0.4, rotateY: 0, rotateX: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1, filter: 'blur(8px) brightness(1.2)' }}
          animate={
            isActive
              ? { scale: 1, filter: 'blur(0px) brightness(1)' }
              : { scale: 0.95, filter: 'blur(2px) brightness(0.7)' }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/ai.png"
            alt="AI Solutions"
            width={680}
            height={470}
            className="object-cover w-full h-full rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

      </motion.div>

      {/* Floating ambient particles around the image */}
      {isActive &&
        [
          { x: -53, y: -40, size: 3, delay: 0 },
          { x: 66, y: -26, size: 2, delay: 0.8 },
          { x: -41, y: 53, size: 2.5, delay: 1.6 },
          { x: 60, y: 47, size: 2, delay: 2.4 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `calc(50% + ${orb.x}px)`,
              top: `calc(50% + ${orb.y}px)`,
              background: `radial-gradient(circle, rgba(59,130,246,0.6), transparent)`,
              boxShadow: '0 0 8px rgba(59,130,246,0.3)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}


    </div>
  )
}

function CloudVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: 'radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          background: 'radial-gradient(circle, rgba(20,184,166,0.06), transparent 60%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Image - standalone, no card frame */}
      <motion.div
        className="relative"
        style={{
          width: 680,
          height: 470,
          borderRadius: '16px',
          overflow: 'hidden',
          marginLeft: '-120px',
        }}
        initial={{ scale: 0.6, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={
          isActive
            ? {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
              }
            : { scale: 0.85, opacity: 0.4, rotateY: 0, rotateX: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1, filter: 'blur(8px) brightness(1.2)' }}
          animate={
            isActive
              ? { scale: 1, filter: 'blur(0px) brightness(1)' }
              : { scale: 0.95, filter: 'blur(2px) brightness(0.7)' }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/cloud.png"
            alt="Cloud & DevOps"
            width={680}
            height={470}
            className="object-cover w-full h-full rounded-2xl"
            priority
            unoptimized
          />
        </motion.div>

      </motion.div>

      {/* Floating ambient particles around the image */}
      {isActive &&
        [
          { x: -53, y: -40, size: 3, delay: 0 },
          { x: 66, y: -26, size: 2, delay: 0.8 },
          { x: -41, y: 53, size: 2.5, delay: 1.6 },
          { x: 60, y: 47, size: 2, delay: 2.4 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `calc(50% + ${orb.x}px)`,
              top: `calc(50% + ${orb.y}px)`,
              background: `radial-gradient(circle, rgba(20,184,166,0.6), transparent)`,
              boxShadow: '0 0 8px rgba(20,184,166,0.3)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}


    </div>
  )
}

export default function ServiceVisual({ serviceId, isActive }: ServiceVisualProps) {
  const visuals = [WebVisual, MobileVisual, DesignVisual, AIVisual, CloudVisual]
  const VisualComponent = visuals[serviceId - 1] || WebVisual
  return (
    <div className="relative w-full h-full">
      <VisualComponent isActive={isActive} />
    </div>
  )
}
