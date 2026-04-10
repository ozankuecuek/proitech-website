"use client"

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type ElementType,
} from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
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
  const prefersReducedMotion = useReducedMotion()

  const d = prefersReducedMotion
    ? { x: 0, y: 0 }
    : {
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
        duration: prefersReducedMotion ? 0.01 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
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
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(" ")

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

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
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setCount(target)
      return
    }
    let frame: number
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration, decimals, prefersReducedMotion])

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
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex whitespace-nowrap">
          <div className="flex shrink-0 items-center">{children}</div>
        </div>
      </div>
    )
  }

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
   TiltCard — DEPRECATED decorative hover tilt.
   Kept as a passthrough for backwards compatibility; reduced motion always.
   Do not use in new code — the brand is "motion as physics, not decoration".
   ═══════════════════════════════════════════════════════════════════════════ */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  return <div className={className}>{children}</div>
}

/* ═══════════════════════════════════════════════════════════════════════════
   Magnetic — DEPRECATED cursor-follow.
   Passthrough wrapper, no effect. Kept for backwards compatibility.
   ═══════════════════════════════════════════════════════════════════════════ */
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  return <span className={`inline-flex ${className}`}>{children}</span>
}

/* ═══════════════════════════════════════════════════════════════════════════
   HorizontalScroll — vertical scroll → horizontal motion
   Falls back to native horizontal overflow when reduced motion is preferred.
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
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex gap-6 px-6 lg:px-12 py-20 snap-x snap-mandatory">
          {children}
        </div>
      </div>
    )
  }

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
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : stagger } },
        hidden: {},
      }}
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 35, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: prefersReducedMotion ? 0.01 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GlowTracker — DEPRECATED cursor-follow radial glow.
   Passthrough container, no effect. Kept for backwards compatibility.
   ═══════════════════════════════════════════════════════════════════════════ */
export function GlowTracker({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
  color?: string
  size?: number
}) {
  return <div className={`relative ${className}`}>{children}</div>
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
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={`relative ${className}`}>{children}</div>
  }

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
  const prefersReducedMotion = useReducedMotion()

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
        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
