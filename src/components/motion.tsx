"use client"

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  type ElementType,
} from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Reveal — fade + translate on scroll
   ═══════════════════════════════════════════════════════════════════════════ */
export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 50,
}: {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const d = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...d }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TextReveal — word-by-word clip reveal
   ═══════════════════════════════════════════════════════════════════════════ */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  tag: Tag = "h1",
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  tag?: ElementType
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const words = text.split(" ")

  return (
    <Tag ref={ref} className={`${className}`}>
      {words.map((word: string, i: number) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", rotateX: -40 }}
            animate={isInView ? { y: "0%", rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Counter — animated number
   ═══════════════════════════════════════════════════════════════════════════ */
export function Counter({
  target,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
  decimals = 0,
}: {
  target: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      // ease-out-expo
      const eased = 1 - Math.pow(2, -10 * progress)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Marquee — infinite horizontal scroll
   ═══════════════════════════════════════════════════════════════════════════ */
export function Marquee({
  children,
  speed = 30,
  className = "",
  reverse = false,
}: {
  children: ReactNode
  speed?: number
  className?: string
  reverse?: boolean
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TiltCard — 3D perspective tilt on hover
   ═══════════════════════════════════════════════════════════════════════════ */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateXVal = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateYVal = useTransform(x, [-0.5, 0.5], [-intensity, intensity])
  const rotateX = useSpring(rotateXVal, { stiffness: 250, damping: 20 })
  const rotateY = useSpring(rotateYVal, { stiffness: 250, damping: 20 })

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [x, y]
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Magnetic — element subtly follows cursor
   ═══════════════════════════════════════════════════════════════════════════ */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 12 })
  const springY = useSpring(y, { stiffness: 180, damping: 12 })

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - rect.left - rect.width / 2) * strength)
      y.set((e.clientY - rect.top - rect.height / 2) * strength)
    },
    [x, y, strength]
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HorizontalScroll — vertical scroll → horizontal motion
   ═══════════════════════════════════════════════════════════════════════════ */
export function HorizontalScroll({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-65%"])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-6 pl-6 lg:pl-12" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   StaggerContainer + StaggerItem — staggered group reveal
   ═══════════════════════════════════════════════════════════════════════════ */
export function StaggerContainer({
  children,
  stagger = 0.08,
  className = "",
}: {
  children: ReactNode
  stagger?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger } }, hidden: {} }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GlowTracker — radial gradient follows cursor on a section
   ═══════════════════════════════════════════════════════════════════════════ */
export function GlowTracker({
  children,
  className = "",
  color = "rgba(188,1,0,0.12)",
  size = 700,
}: {
  children: ReactNode
  className?: string
  color?: string
  size?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 })

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <div ref={ref} className={`relative ${className}`} onMouseMove={handleMouse}>
      <motion.div
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: size,
          height: size,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Parallax — scroll-linked Y offset
   ═══════════════════════════════════════════════════════════════════════════ */
export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   LineReveal — SVG line that draws itself on scroll
   ═══════════════════════════════════════════════════════════════════════════ */
export function LineReveal({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <svg
      ref={ref}
      className={`absolute left-0 top-0 h-full w-px ${className}`}
      viewBox="0 0 1 100"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
