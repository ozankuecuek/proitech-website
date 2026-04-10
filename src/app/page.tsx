"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  Thermometer,
  Zap,
  MapPin,
  Phone,
  Mail,
  FlaskConical,
  Cpu,
  MessageSquare,
  ArrowUpRight,
  Menu,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Reveal,
  TextReveal,
  Marquee,
  TiltCard,
  Magnetic,
  HorizontalScroll,
  StaggerContainer,
  StaggerItem,
  GlowTracker,
  LineReveal,
} from "@/components/motion"

/* ─────────────────────────────────────────────────────────────────────────────
   HERO VISUALIZATION — NOVATECH Product Signature Overlay
   ───────────────────────────────────────────────────────────────────────────── */
function HeroDashboard() {
  const arcRadius = 190
  const arcCircumference = 2 * Math.PI * arcRadius

  /* Marker positions along the radial structure — placed at clock-like positions */
  const markers = [
    { angle: -55, label: "Kälteleistung", value: "2,3–629 kW", delay: 1.6 },
    { angle: 15, label: "Baureihen", value: "MINI / MIDI / MAXI / MASTER", delay: 1.9 },
    { angle: 85, label: "Verdichter", value: "Scroll-Verdichter", delay: 2.2 },
    { angle: -130, label: "Systemaufbau", value: "Hydronikmodul + Pufferspeicher", delay: 2.5 },
  ]

  return (
    <div className="relative w-full aspect-square max-w-[520px]">

      {/* ── Outermost slow-rotating technical ring ── */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
          {/* Faint baseline circle */}
          <circle cx="250" cy="250" r="245" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          {/* Precision tick marks around the outer rim */}
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * 5 * Math.PI) / 180
            const isMajor = i % 9 === 0
            const r1 = isMajor ? 230 : 236
            const r2 = 245
            const cos = Math.cos(a)
            const sin = Math.sin(a)
            return (
              <line
                key={i}
                x1={Math.round((250 + r1 * cos) * 1000) / 1000}
                y1={Math.round((250 + r1 * sin) * 1000) / 1000}
                x2={Math.round((250 + r2 * cos) * 1000) / 1000}
                y2={Math.round((250 + r2 * sin) * 1000) / 1000}
                stroke={isMajor ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}
                strokeWidth={isMajor ? 1 : 0.5}
              />
            )
          })}
        </svg>
      </div>

      {/* ── Mid-ring — counter-rotating dashed arcs ── */}
      <div className="absolute inset-[30px] animate-spin-slow-reverse">
        <svg viewBox="0 0 440 440" className="w-full h-full" fill="none">
          <circle cx="220" cy="220" r="210" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <circle
            cx="220" cy="220" r="210"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.75"
            strokeDasharray="3 18"
          />
          {/* Red accent arc — ~120 degrees */}
          <path
            d="M 220 10 A 210 210 0 0 1 430 220"
            style={{ stroke: "var(--secondary)" }}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* ── Static radial engineering grid ── */}
      <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full" fill="none" opacity="0.05">
        {/* Cross-hairs */}
        <line x1="250" y1="60" x2="250" y2="440" stroke="white" strokeWidth="0.5" />
        <line x1="60" y1="250" x2="440" y2="250" stroke="white" strokeWidth="0.5" />
        {/* Diagonal guides */}
        <line x1="110" y1="110" x2="390" y2="390" stroke="white" strokeWidth="0.3" strokeDasharray="2 10" />
        <line x1="390" y1="110" x2="110" y2="390" stroke="white" strokeWidth="0.3" strokeDasharray="2 10" />
        {/* Inner concentric rings */}
        <circle cx="250" cy="250" r="80" stroke="white" strokeWidth="0.3" strokeDasharray="1 8" />
        <circle cx="250" cy="250" r="140" stroke="white" strokeWidth="0.3" strokeDasharray="1 8" />
      </svg>

      {/* ── Primary animated arc — the signature sweep ── */}
      <div className="absolute inset-[55px] flex items-center justify-center">
        <svg viewBox="0 0 390 390" className="w-full h-full" fill="none">
          {/* Track */}
          <circle cx="195" cy="195" r={arcRadius} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          {/* Animated red arc — sweeps ~270 degrees */}
          <motion.circle
            cx="195" cy="195" r={arcRadius}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${arcCircumference * 0.75} ${arcCircumference}`}
            initial={{ strokeDashoffset: arcCircumference }}
            animate={{ strokeDashoffset: arcCircumference * 0.25 }}
            transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            transform="rotate(-135 195 195)"
            style={{ stroke: "var(--secondary)", filter: "drop-shadow(0 0 6px color-mix(in oklch, var(--secondary) 40%, transparent))" }}
          />
          {/* Secondary thin arc — white, offset */}
          <motion.circle
            cx="195" cy="195" r={170}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 170 * 0.4} ${2 * Math.PI * 170}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 170 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 170 * 0.6 }}
            transition={{ duration: 2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            transform="rotate(45 195 195)"
          />
          {/* Inner precision ring */}
          <circle cx="195" cy="195" r="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <circle cx="195" cy="195" r="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* ── Central product branding ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* PRO ITECH wordmark */}
          <span
            className="text-white font-bold tracking-[0.18em]"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 4vw, 1.75rem)", lineHeight: 1 }}
          >
            PRO ITECH
          </span>
          {/* Thin separator line */}
          <motion.span
            className="block h-[1px] mt-2 mb-1.5 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.3 }}
          />
          {/* Subline */}
          <span
            className="text-white/40 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(0.5rem, 1.5vw, 0.625rem)", lineHeight: 1 }}
          >
            Industrielle Prozesskühlung
          </span>
        </motion.div>
      </div>

      {/* ── Technical callout markers ── */}
      {markers.map((marker, i) => {
        const rad = (marker.angle * Math.PI) / 180
        const cos = Math.cos(rad)
        const sin = Math.sin(rad)
        /* Anchor point sits on the main arc radius */
        const ax = Math.round((250 + arcRadius * cos) * 1000) / 1000
        const ay = Math.round((250 + arcRadius * sin) * 1000) / 1000
        /* Label offset — push outward */
        const lx = Math.round((250 + (arcRadius + 52) * cos) * 1000) / 1000
        const ly = Math.round((250 + (arcRadius + 52) * sin) * 1000) / 1000
        const isLeft = marker.angle > 90 || marker.angle < -90

        return (
          <motion.div
            key={i}
            className="absolute hidden lg:block"
            style={{ left: 0, top: 0, width: "100%", height: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: marker.delay, duration: 0.8 }}
          >
            {/* Connector line + dot on arc */}
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full" fill="none">
              {/* Glow dot at anchor */}
              <circle cx={ax} cy={ay} r="3" opacity="0.9" style={{ fill: "var(--secondary)" }}>
                <animate attributeName="r" values="3;4.5;3" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={ax} cy={ay} r="7" fill="none" strokeWidth="0.5" opacity="0.3" style={{ stroke: "var(--secondary)" }}>
                <animate attributeName="r" values="7;11;7" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Thin connector line from arc to label area */}
              <line x1={ax} y1={ay} x2={lx} y2={ly} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            </svg>

            {/* Label card */}
            <div
              className="absolute flex flex-col"
              style={{
                left: `${(lx / 500) * 100}%`,
                top: `${(ly / 500) * 100}%`,
                transform: `translate(${isLeft ? "-100%" : "0"}, -50%)`,
                maxWidth: "140px",
              }}
            >
              <span
                className="text-white/35 uppercase tracking-[0.08em]"
                style={{ fontSize: "clamp(0.45rem, 1.2vw, 0.575rem)", lineHeight: 1.3 }}
              >
                {marker.label}
              </span>
              <span
                className="text-white/80 font-medium mt-0.5"
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(0.5rem, 1.4vw, 0.7rem)", lineHeight: 1.3 }}
              >
                {marker.value}
              </span>
            </div>
          </motion.div>
        )
      })}

      {/* ── Subtle scattered anchor points ── */}
      {[
        { x: "15%", y: "22%", delay: 2.0 },
        { x: "80%", y: "18%", delay: 2.3 },
        { x: "88%", y: "65%", delay: 2.6 },
        { x: "10%", y: "72%", delay: 2.1 },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            background: "color-mix(in oklch, var(--secondary) 25%, transparent)",
            boxShadow: "0 0 6px color-mix(in oklch, var(--secondary) 15%, transparent)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: dot.delay, type: "spring" }}
        />
      ))}

      {/* ── Outermost faint glow ring ── */}
      <div
        className="absolute inset-[-10px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, transparent 60%, color-mix(in oklch, var(--secondary) 3%, transparent) 80%, transparent 100%)",
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION LABEL
   ───────────────────────────────────────────────────────────────────────────── */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`label-sm inline-flex items-center gap-2.5 mb-3 ${light ? "text-white/45" : "text-secondary"}`}>
      <span className="inline-block w-6 h-[2px] bg-secondary" />
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADING (reusable) — quiet fade-in, no word-by-word reveal.
   The hero H1 is the one orchestrated moment; section headings stay composed.
   ───────────────────────────────────────────────────────────────────────────── */
function SectionHeading({
  text,
  className = "",
}: {
  text: string
  light?: boolean
  className?: string
}) {
  return (
    <Reveal>
      <h2 className={className}>{text}</h2>
    </Reveal>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────────────────────────────────────── */
function Navigation() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60))

  const bg = useTransform(scrollY, [0, 100], ["rgba(250,248,255,0)", "rgba(250,248,255,0.7)"])
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])
  const logoFilter = useTransform(
    scrollY,
    [0, 100],
    ["brightness(0) invert(1)", "brightness(1) invert(0)"]
  )
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.92])

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(0,25,68,${v})`),
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="/">
          <motion.div style={{ filter: logoFilter, scale: logoScale, transformOrigin: "left center" }}>
            <Image src="/logo.webp" alt="itech cooling solutions" width={360} height={120} className="h-32 w-auto" priority />
          </motion.div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {["Lösungen", "Anwendungen", "Unternehmen", "Service"].map((item) => (
            <Magnetic key={item} strength={0.15}>
              <a href="#" className={`label-md transition-colors duration-500 ${scrolled ? "text-on-surface/60 hover:text-primary" : "text-white/80 hover:text-white"}`}>
                {item}
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic>
            <Button
              variant="default"
              size="sm"
              className={`hidden lg:inline-flex gap-1.5 transition-all duration-500 ${!scrolled ? "!bg-transparent !text-white border !border-white/40 hover:!bg-white/10" : ""}`}
            >
              Beratung anfragen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Button>
          </Magnetic>
          <button
            className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? "text-on-surface/70 hover:text-primary" : "text-white/80 hover:text-white"}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.nav
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-t border-on-surface/5"
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {["Lösungen", "Anwendungen", "Unternehmen", "Service"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMobileOpen(false)}
              className="label-md py-3 px-2 text-on-surface/70 hover:text-primary transition-colors border-b border-on-surface/5 last:border-0"
            >
              {item}
            </a>
          ))}
          <Button variant="default" size="sm" className="mt-2 w-full gap-1.5">
            Beratung anfragen
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Button>
        </div>
      </motion.nav>
    </motion.header>
  )
}

/* ═════════════════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    const handleEnded = () => {
      video.currentTime = 0
      video.play()
    }
    video.addEventListener("ended", handleEnded)
    return () => video.removeEventListener("ended", handleEnded)
  }, [])

  return (
    <>
      <Navigation />

      <main>
        {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
        <section className="relative lg:min-h-screen overflow-hidden noise">
          {/* Background video */}
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 0 }}
          >
            <source src="/Video_Loop_for_Landing_Page.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay — matches original hero colors */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(0,16,48,0.88) 0%, rgba(0,27,70,0.82) 35%, rgba(22,48,97,0.78) 70%, rgba(13,40,80,0.85) 100%)", zIndex: 1 }} />
          {/* Radial glow */}
          <div
            className="absolute top-0 right-0 w-[60vw] h-[60vw] opacity-30"
            style={{ background: "radial-gradient(circle at 70% 30%, rgba(22,48,97,0.8) 0%, transparent 60%)", zIndex: 2 }}
          />
          <div
            className="absolute bottom-0 left-0 w-[40vw] h-[40vw] opacity-20"
            style={{ background: "radial-gradient(circle, rgba(188,1,0,0.15) 0%, transparent 60%)", zIndex: 2 }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:min-h-[calc(100svh-10rem)]">
              {/* Content */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 sm:gap-8">
                <Reveal delay={0.1}>
                  <SectionLabel light>Industrielle Prozesskühlung</SectionLabel>
                </Reveal>

                <TextReveal
                  text="Kältemaschinen und Temperiergeräte für stabile Prozesskühlung"
                  tag="h1"
                  delay={0.2}
                  stagger={0.05}
                  className="text-white leading-[1.05]"
                />

                <Reveal delay={0.6}>
                  <p className="body-lg text-white/55 max-w-lg" style={{ lineHeight: 1.7 }}>
                    Lösungen für Kühlen, Temperieren und Regeln in anspruchsvollen
                    Industrieanwendungen — von Standardanlagen bis zur individuellen
                    Sonderlösung. Entwickelt und geprüft in Berlin.
                  </p>
                </Reveal>

                <Reveal delay={0.75}>
                  <div className="flex flex-wrap items-center gap-4">
                    <Magnetic>
                      <Button variant="secondary" size="lg" className="gap-2 text-sm">
                        Beratung anfragen
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    </Magnetic>
                    <Magnetic>
                      <button className="group relative inline-flex items-center gap-2 text-white/70 hover:text-white label-md transition-colors duration-300">
                        Lösungen entdecken
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2} />
                        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-white/50 group-hover:w-full transition-[width] duration-300" />
                      </button>
                    </Magnetic>
                  </div>
                </Reveal>

                {/* Quick paths */}
                <Reveal delay={0.9}>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {[
                      "Kältemaschinen",
                      "Temperiergeräte",
                      "Anwendungen",
                      "Service",
                    ].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="group inline-flex items-center gap-1.5 px-3.5 py-2 label-md text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-sm transition-all duration-300 hover:bg-white/[0.04]"
                      >
                        {label}
                        <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2} />
                      </a>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Dashboard visualization — brand medallion on all sizes,
                  full instrument with callouts on lg+ */}
              <div className="flex lg:col-span-6 xl:col-span-5 justify-center lg:justify-end">
                <motion.div
                  className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[520px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <HeroDashboard />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-32" style={{ background: "linear-gradient(to bottom, transparent, var(--surface-container-high))" }} />
        </section>

        {/* ── MARQUEE STRIP ─────────────────────────────────────────────────── */}
        <section className="bg-surface-container-high py-4 overflow-hidden">
          <Marquee speed={35}>
            {[
              "ISO 9001 zertifiziert",
              "Entwickelt in Berlin",
              "Geprüfte Anlagen mit Prüfzeugnis",
              "Niedrigster TCO",
              "Service aus Deutschland",
              "Energieeffiziente Systeme",
              "Natürliche Kältemittel",
              "Kundenspezifische Auslegung",
            ].map((item) => (
              <span key={item} className="flex items-center gap-8 px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0" />
                <span className="label-md text-on-surface/40 whitespace-nowrap">{item}</span>
              </span>
            ))}
          </Marquee>
        </section>

        {/* ── 2. TRUST / PROOF POINTS ───────────────────────────────────────── */}
        <section className="bg-surface-container-low section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
                <Reveal>
                  <SectionLabel>Warum pro itech</SectionLabel>
                </Reveal>
                <SectionHeading
                  text="Präzision aus Berlin. Für die Industrie weltweit."
                  className="text-on-surface"
                />
                <Reveal delay={0.2}>
                  <p className="body-md text-muted-foreground leading-relaxed max-w-sm">
                    Seit Jahren entwickeln und liefern wir Kälte- und Temperierlösungen
                    für anspruchsvolle Prozessanwendungen — mit technischer Tiefe,
                    Serviceorganisation und dem Anspruch auf niedrigsten TCO.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-7 xl:col-span-7 xl:col-start-6">
                <StaggerContainer stagger={0.08} className="flex flex-col">
                  {[
                    { number: "01", title: "ISO 9001 zertifiziert", desc: "Qualitätsmanagementsystem nach internationalem Standard für verlässliche Prozesse." },
                    { number: "02", title: "Geprüfte Anlagen", desc: "Jede Anlage wird auf modernen Prüfständen getestet und mit Prüfzeugnis ausgeliefert." },
                    { number: "03", title: "Service aus Deutschland", desc: "Serviceorganisation mit regionalem Netzwerk — schnelle Reaktionszeiten inklusive." },
                    { number: "04", title: "Individuelle Auslegung", desc: "Systemauslegung nach Ihrer Prozesslast, nicht nach Katalog. Technische Beratung inklusive." },
                    { number: "05", title: "Niedriger TCO", desc: "Energieeffiziente Systeme und Investitionssicherheit durch wirtschaftliche Betriebskosten." },
                    { number: "06", title: "Breites Portfolio", desc: "Von Standardchillern bis zu Sonderlösungen für natürliche Kältemittel und Hochtemperatur." },
                  ].map(({ number, title, desc }, i) => (
                    <StaggerItem key={number}>
                      <div
                        className="group grid grid-cols-[auto_1fr] gap-6 lg:gap-10 items-baseline"
                        style={{
                          paddingBlock: i === 0 ? "0 clamp(2.25rem, 4vw, 3rem)" : "clamp(2.25rem, 4vw, 3rem)",
                        }}
                      >
                        <span
                          className="tabular text-on-surface/30 group-hover:text-secondary transition-colors duration-500 shrink-0"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(1.75rem, 3.2vw, 2.625rem)",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            lineHeight: 0.9,
                            fontVariationSettings: "'wdth' 95",
                          }}
                        >
                          {number}
                        </span>
                        <div className="flex flex-col gap-2.5 max-w-xl">
                          <h3 className="title-md text-on-surface">{title}</h3>
                          <p className="body-md text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. LÖSUNGSWELTEN (Bento Grid) ─────────────────────────────────── */}
        <section className="bg-surface section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="flex flex-col gap-2 max-w-xl">
                <Reveal><SectionLabel>Lösungswelten</SectionLabel></Reveal>
                <SectionHeading text="Das passende System für jeden Prozess" className="text-on-surface" />
              </div>
              <Reveal direction="left">
                <Magnetic>
                  <a href="#" className="shrink-0 label-md text-primary hover:text-secondary transition-colors flex items-center gap-2 group">
                    Alle Lösungen
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                  </a>
                </Magnetic>
              </Reveal>
            </div>

            {/* Bento layout */}
            <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(220px,auto)]">
              {/* Large card */}
              <StaggerItem className="md:col-span-7 md:row-span-2">
                <TiltCard className="h-full" intensity={5}>
                  <a href="#" className="group relative flex flex-col justify-end h-full p-8 lg:p-10 rounded-sm shadow-ambient overflow-hidden">
                    <Image src="/kaeltemaschine.png" alt="" fill className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]" sizes="(max-width: 768px) 100vw, 58vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-deep)] via-[color-mix(in_oklch,var(--primary-deep)_60%,transparent)] to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_30%,transparent)] to-transparent" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col gap-5">
                      <div className="flex items-center justify-center w-12 h-12 bg-white/[0.08] rounded-sm backdrop-blur-sm group-hover:bg-white/[0.14] transition-colors duration-300">
                        <Thermometer className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="title-lg text-white mb-3 drop-shadow-sm">Kältemaschinen / Chiller</h3>
                        <p className="body-md text-white/55 max-w-md leading-relaxed group-hover:text-white/75 transition-colors duration-300">
                          Industrielle Prozesskühlung und zentrale Kühlsysteme — luftgekühlt,
                          wassergekühlt, mit Invertertechnik oder Freikühlung. Von 2 kW bis
                          zu mehreren Megawatt Kälteleistung.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 label-md text-white/50 group-hover:text-white transition-all duration-300">
                        Kältemaschinen entdecken
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </StaggerItem>

              {/* Top right */}
              <StaggerItem className="md:col-span-5">
                <TiltCard className="h-full" intensity={6}>
                  <a href="#" className="group relative flex flex-col justify-end h-full p-7 rounded-sm shadow-ambient overflow-hidden">
                    <Image src="/temperiergeraete.png" alt="" fill className="object-cover object-[center_20%] transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]" sizes="(max-width: 768px) 100vw, 42vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-deep)] via-[color-mix(in_oklch,var(--primary-deep)_60%,transparent)] to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_30%,transparent)] to-transparent" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-white/[0.08] rounded-sm backdrop-blur-sm group-hover:bg-white/[0.14] transition-colors duration-300">
                          <Zap className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" strokeWidth={1.5} />
                      </div>
                      <h3 className="title-md text-white mb-2 drop-shadow-sm">Temperiergeräte</h3>
                      <p className="body-sm text-white/55 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
                        Präzise Temperaturführung für Werkzeuge und Prozesse — Wasser, Öl oder Hochtemperatur bis 350 °C.
                      </p>
                    </div>
                  </a>
                </TiltCard>
              </StaggerItem>

              {/* Bottom right — split into two */}
              <StaggerItem className="md:col-span-5">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[
                    { img: "/anwendungsspezifisch.png", icon: FlaskConical, title: "Anwendungen", desc: "Laser, Extrusion, CNC und mehr" },
                    { img: "/sonderloesungen.png", icon: Cpu, title: "Sonderlösungen", desc: "Engineering & Retrofit" },
                  ].map(({ img, icon: Icon, title, desc }) => (
                    <TiltCard key={title} className="h-full" intensity={7}>
                      <a href="#" className="group relative flex flex-col justify-end h-full p-6 rounded-sm shadow-ambient overflow-hidden">
                        <Image src={img} alt="" fill className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]" sizes="(max-width: 768px) 50vw, 21vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-deep)] via-[color-mix(in_oklch,var(--primary-deep)_60%,transparent)] to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_30%,transparent)] to-transparent" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-center w-9 h-9 bg-white/[0.08] rounded-sm backdrop-blur-sm group-hover:bg-white/[0.14] transition-colors duration-300 mb-3">
                            <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                          </div>
                          <h3 className="title-sm font-semibold text-white mb-1 drop-shadow-sm">{title}</h3>
                          <p className="text-white/55 leading-relaxed text-xs group-hover:text-white/75 transition-colors duration-300">{desc}</p>
                        </div>
                      </a>
                    </TiltCard>
                  ))}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ── 4. ANWENDUNGEN (Horizontal Scroll) ────────────────────────────── */}
        <section className="bg-surface-container-low">
          <HorizontalScroll>
            {/* Sticky label */}
            <div className="shrink-0 w-[340px] lg:w-[420px] flex flex-col justify-center gap-5 pr-8">
              <SectionLabel>Anwendungen</SectionLabel>
              <SectionHeading text="Ihr Anwendungsfall — unser Einstieg" className="text-on-surface" />
              <p className="body-md text-muted-foreground leading-relaxed">
                Wählen Sie Ihre Anwendung und erfahren Sie, wie pro itech Ihre Prozesskühlung löst.
              </p>
              <Magnetic>
                <a href="#" className="inline-flex items-center gap-2 label-md text-primary hover:text-secondary transition-colors group">
                  Alle Anwendungen
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </a>
              </Magnetic>
            </div>

            {/* Application cards */}
            {[
              { title: "Laserkühlung", tag: "Laser", desc: "Präzise Kühlung für Laserquellen und Bearbeitungsköpfe — konstante Temperaturen für stabile Strahlqualität.", img: "/anwendungen_homepage/laser.webp" },
              { title: "Extruderkühlung", tag: "Extrusion", desc: "Temperaturgenaue Kühlung von Extrudern und Werkzeugen — für gleichbleibende Produktqualität.", img: "/anwendungen_homepage/extruder.webp" },
              { title: "Schweißkühlung", tag: "Schweißtechnik", desc: "Kühlung von Transformatoren, Brennern und Elektroden — für hohe Einschaltdauer und Sicherheit.", img: "/anwendungen_homepage/schweißkuehlung.webp" },
              { title: "CNC-Kühlung", tag: "Zerspanung", desc: "Prozesskühlung für Bearbeitungszentren und Spindeln — Wärmeabfuhr für Maßhaltigkeit.", img: "/anwendungen_homepage/CNC.webp" },
              { title: "Blasformen", tag: "Kunststoff", desc: "Kühlung in der Blasformtechnik — für kurze Zykluszeiten und reproduzierbare Teilequalität.", img: "/anwendungen_homepage/blasformen.webp" },
              { title: "Werkzeug\u00ADtemperierung", tag: "Werkzeugbau", desc: "Präzise Temperierung von Spritzguss- und Druckgusswerkzeugen — für Dimensionsstabilität.", img: "/anwendungen_homepage/werkzeug.webp" },
            ].map(({ title, tag, desc, img }) => (
              <a
                key={title}
                href="#"
                className="group shrink-0 w-[320px] lg:w-[380px] relative flex flex-col justify-end rounded-sm overflow-hidden shadow-ambient"
                style={{ height: "420px" }}
              >
                {/* Background image */}
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 320px, 380px"
                />

                {/* Layered overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-deep)] via-[color-mix(in_oklch,var(--primary-deep)_60%,transparent)] to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_30%,transparent)] to-transparent" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                {/* Tag */}
                <span className="absolute top-5 left-5 z-10 label-sm px-2.5 py-1 bg-white/[0.08] text-white/70 rounded-full backdrop-blur-md border border-white/[0.06]">
                  {tag}
                </span>

                {/* Content */}
                <div className="relative z-10 p-6 pt-20 flex flex-col">
                  <h3
                    className="text-white mb-2 group-hover:text-white transition-colors drop-shadow-sm"
                    style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.015em" }}
                  >
                    {title}
                  </h3>
                  <p className="body-sm text-white/55 leading-relaxed line-clamp-2 group-hover:text-white/75 transition-colors duration-300">
                    {desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 label-md text-white/50 group-hover:text-white transition-all duration-300">
                    Mehr erfahren
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
                  </span>
                </div>
              </a>
            ))}
          </HorizontalScroll>
        </section>

        {/* ── STATS + ENERGIEEFFIZIENZ — merged editorial numbers moment ───── */}
        <section
          className="relative overflow-hidden noise"
          style={{ background: "linear-gradient(135deg, var(--primary-deep) 0%, var(--primary) 50%, var(--primary-container) 100%)" }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
            {/* Section header — left-aligned editorial */}
            <div className="flex flex-col gap-5 max-w-2xl mb-20 lg:mb-28">
              <Reveal>
                <SectionLabel light>Belegbare Ergebnisse</SectionLabel>
              </Reveal>
              <SectionHeading text="Zahlen, die eine Produktionslinie tragen." className="text-white" />
              <Reveal delay={0.3}>
                <p className="body-lg text-white/55 leading-relaxed max-w-xl">
                  Energieeinsparung und Präzision sind keine Marketingversprechen — sie sind das
                  Ergebnis systematischer Auslegung und moderner Invertertechnologie.
                </p>
              </Reveal>
            </div>

            {/* Hero metric + supporting stats */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-start">
              {/* Hero metric — dominates */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <Reveal delay={0.2}>
                  <div className="flex items-start gap-4">
                    <span
                      className="tabular text-white leading-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(5rem, 14vw, 11rem)",
                        fontWeight: 600,
                        letterSpacing: "-0.04em",
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      −40
                    </span>
                    <span
                      className="tabular text-white/60"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2rem, 5vw, 3.75rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        marginTop: "0.3em",
                      }}
                    >
                      %
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="flex flex-col gap-4 max-w-md">
                    <span className="label-sm text-secondary">Energieeinsparung</span>
                    <p className="body-md text-white/65 leading-relaxed">
                      gegenüber konventionellen Festdrehzahl-Systemen durch Invertertechnik,
                      adaptive Regelung und Freikühlung. Dokumentiert in der Auslegungsphase,
                      verifiziert im Betrieb.
                    </p>
                  </div>
                </Reveal>

                {/* Natural refrigerants editorial note */}
                <Reveal delay={0.5}>
                  <div className="flex flex-col gap-2 pt-6 max-w-md">
                    <span className="label-sm text-white/40">Natürliche Kältemittel</span>
                    <p className="body-md text-white/55 leading-relaxed">
                      R290 und R744 — für zukunftssichere Betriebsgenehmigungen und echte CO₂-Reduktion.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Supporting stats column */}
              <div className="lg:col-span-5">
                <StaggerContainer stagger={0.09} className="flex flex-col">
                  {[
                    { number: "±0,3", unit: "°C", label: "Regelgenauigkeit", product: "ACCURA-System" },
                    { number: "300", unit: "°C", label: "Maximaltemperatur", product: "300 °C Temperiergerät" },
                    { number: "2–629", unit: "kW", label: "Kälteleistung", product: "MINI bis MASTER" },
                    { number: "<18", unit: "Monate", label: "Amortisation", product: "FREE Nass-Trocken-Kühler" },
                    { number: "−55", unit: "°C", label: "Taupunkt / trockene Luft", product: "BLASTAIR-System" },
                  ].map(({ number, unit, label, product }, i, arr) => (
                    <StaggerItem key={label}>
                      <div
                        className="flex flex-col gap-2"
                        style={{
                          paddingBlock: i === 0 ? "0 clamp(1.75rem, 3vw, 2.5rem)" : i === arr.length - 1 ? "clamp(1.75rem, 3vw, 2.5rem) 0" : "clamp(1.75rem, 3vw, 2.5rem)",
                        }}
                      >
                        <div className="flex items-baseline gap-2">
                          <span
                            className="tabular text-white leading-none"
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)",
                              fontWeight: 600,
                              letterSpacing: "-0.025em",
                            }}
                          >
                            {number}
                          </span>
                          <span
                            className="text-white/50"
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "clamp(1rem, 1.8vw, 1.375rem)",
                              fontWeight: 400,
                            }}
                          >
                            {unit}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="label-md text-white/75">{label}</span>
                          <span className="label-sm text-white/30">{product}</span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. PORTFOLIO-BREITE — spec-table typography ───────────────────── */}
        <section className="bg-surface section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col gap-16 lg:gap-24">
              {/* Header — asymmetric, top-left */}
              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <Reveal><SectionLabel>Technisches Portfolio</SectionLabel></Reveal>
                  <SectionHeading text="Breit aufgestellt — für jeden Lösungsraum." className="text-on-surface" />
                </div>
                <div className="lg:col-span-5 flex flex-col gap-4 lg:pb-2">
                  <Reveal delay={0.2}>
                    <p className="body-md text-muted-foreground leading-relaxed max-w-sm">
                      Das Portfolio deckt das gesamte Spektrum industrieller Kälte- und
                      Temperiertechnik ab — schnelle Orientierung für technische Entscheider.
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 label-md text-primary hover:text-secondary transition-colors group w-fit"
                    >
                      Technische Übersicht
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    </a>
                  </Reveal>
                </div>
              </div>

              {/* Two spec columns */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                {[
                  {
                    code: "A",
                    category: "Kältemaschinen",
                    range: "2 – 629 kW",
                    items: [
                      { name: "Luftgekühlte Systeme", meta: "scroll · screw" },
                      { name: "Wassergekühlte Systeme", meta: "scroll · screw" },
                      { name: "Inverter- und Hybrid-Architektur", meta: "variable drehzahl" },
                      { name: "Freikühlung und adiabate Kühlung", meta: "TCO-optimiert" },
                      { name: "Natürliche Kältemittel", meta: "R290 · R744" },
                    ],
                  },
                  {
                    code: "B",
                    category: "Temperiergeräte",
                    range: "bis 350 °C",
                    items: [
                      { name: "Wasser-Temperiergeräte", meta: "bis 160 °C" },
                      { name: "Öl-Temperiergeräte", meta: "bis 350 °C" },
                      { name: "Hochtemperatur-Systeme", meta: "druckbasiert" },
                      { name: "Druckwasser-Systeme", meta: "bis 6 bar" },
                      { name: "Kühl- und Heiz-Kombisysteme", meta: "reversibel" },
                    ],
                  },
                ].map(({ code, category, range, items }) => (
                  <Reveal key={category}>
                    <div className="flex flex-col">
                      {/* Header row */}
                      <div className="flex items-baseline justify-between gap-6 pb-5">
                        <div className="flex items-baseline gap-4">
                          <span
                            className="tabular text-on-surface/25"
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "1.25rem",
                              fontWeight: 500,
                              letterSpacing: "0.08em",
                            }}
                          >
                            {code}
                          </span>
                          <h3
                            className="text-on-surface"
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                              fontWeight: 600,
                              letterSpacing: "-0.01em",
                              lineHeight: 1.15,
                            }}
                          >
                            {category}
                          </h3>
                        </div>
                        <span
                          className="tabular label-md text-secondary shrink-0"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {range}
                        </span>
                      </div>

                      {/* Spec list */}
                      <ul className="flex flex-col">
                        {items.map((item, idx) => (
                          <li
                            key={item.name}
                            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-4"
                            style={{
                              paddingTop: idx === 0 ? "1.25rem" : "1rem",
                              paddingBottom: "1rem",
                            }}
                          >
                            <span
                              className="tabular text-on-surface/30 group-hover:text-secondary transition-colors duration-500"
                              style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="body-md text-on-surface">{item.name}</span>
                            <span className="tabular label-sm text-on-surface-subtle">{item.meta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. ENGINEERING / BERATUNG ─────────────────────────────────────── */}
        <section className="bg-surface-container-low section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left: pull quote */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <Reveal><SectionLabel>Engineering & Beratung</SectionLabel></Reveal>
                <SectionHeading
                  text="Nicht nur das passende Gerät — sondern die richtige Lösung."
                  className="text-on-surface"
                />
                <Reveal delay={0.3}>
                  <p className="body-md text-muted-foreground leading-relaxed">
                    Wir verstehen unsere Aufgabe nicht als Produktkatalog, sondern als
                    technische Partnerschaft. Gemeinsam ermitteln wir Systemlasten,
                    Prozessanforderungen und Betriebsprioritäten.
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <Magnetic>
                    <Button variant="default" className="w-fit gap-2">
                      Projekt anfragen
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </Button>
                  </Magnetic>
                </Reveal>
              </div>

              {/* Right: animated steps */}
              <div className="lg:col-span-7 relative">
                {/* Connecting line */}
                <div className="absolute left-[15px] top-8 bottom-8 w-px text-[color-mix(in_srgb,var(--on-surface)_12%,transparent)]">
                  <LineReveal />
                </div>

                <StaggerContainer stagger={0.12} className="flex flex-col gap-0">
                  {[
                    { step: "01", title: "Gemeinsame Lastanalyse", desc: "Wir erfassen Kühllasten, Prozessparameter und Randbedingungen — bevor wir ein Produkt empfehlen." },
                    { step: "02", title: "Systemauswahl & Auslegung", desc: "Auf Basis Ihrer Anforderungen wählen wir das passende System und legen es nach Ihrem Nennpunkt aus." },
                    { step: "03", title: "Umsetzung & Integration", desc: "Von der Planung bis zur Inbetriebnahme — wir begleiten die Integration in Ihre Infrastruktur." },
                    { step: "04", title: "Service & Optimierung", desc: "Langfristige Betriebssicherheit durch präventive Wartung und schnellen Service aus Deutschland." },
                  ].map(({ step, title, desc }) => (
                    <StaggerItem key={step}>
                      <div className="flex gap-6 py-7 group">
                        <div className="shrink-0 relative z-10 flex items-center justify-center w-[30px] h-[30px] bg-surface-container-low group-hover:bg-surface-container-high transition-colors">
                          <span
                            className="text-secondary"
                            style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em" }}
                          >
                            {step}
                          </span>
                        </div>
                        <div className="pt-1">
                          <h3 className="title-sm font-semibold text-on-surface mb-1.5">{title}</h3>
                          <p className="body-sm text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. SERVICE ────────────────────────────────────────────────────── */}
        <section className="bg-surface section-pad">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Header label spanning the top */}
            <div className="mb-16 lg:mb-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <Reveal><SectionLabel>Service & After Sales</SectionLabel></Reveal>
                <div className="mt-5">
                  <SectionHeading text="Betriebssicherheit über den Liefertag hinaus" className="text-on-surface" />
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={0.15}>
                  <p className="body-md text-muted-foreground leading-relaxed max-w-md">
                    Industrielle Kühltechnik ist kritische Infrastruktur. Unser
                    Servicemodell ist so konzipiert, dass Ausfallzeiten messbar
                    klein bleiben — über die gesamte Anlagenlebensdauer.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Editorial spec rows — metric on the right, label left, content middle */}
            <StaggerContainer stagger={0.09} className="flex flex-col">
              {[
                {
                  label: "Instandhaltung",
                  title: "Wartung & Inspektion",
                  desc: "Planmäßige Wartung nach Herstellervorgaben und VDMA 24186. Dokumentiert, mit Servicebericht und Messprotokoll — die Grundlage für jede Betriebsgenehmigung.",
                  metric: "VDMA",
                  metricSub: "24186",
                },
                {
                  label: "Störungsservice",
                  title: "Reaktion innerhalb 24 Stunden",
                  desc: "Bundesweit regional organisierter Außendienst aus Deutschland. Ferndiagnose über die eingebaute Telemetrie, Eskalationsstufen vertraglich definiert.",
                  metric: "< 24",
                  metricSub: "Std. DE-weit",
                },
                {
                  label: "Ersatzteile",
                  title: "Originalteile & Retrofit",
                  desc: "Originalersatzteile für aktuelle und ältere Baureihen. Technische Upgrades zur Laufzeitverlängerung — auch Komponenten, die im Markt nicht mehr gelistet sind.",
                  metric: "10+",
                  metricSub: "Jahre Nachkauf",
                },
                {
                  label: "Serviceverträge",
                  title: "SLA-basierte Wartungsverträge",
                  desc: "Planbare Budgets durch individuell kalkulierte Verträge. Reaktionszeiten, Ersatzteilverfügbarkeit und Wartungsintervalle werden anlagen­spezifisch fixiert.",
                  metric: "SLA",
                  metricSub: "individuell",
                },
              ].map(({ label, title, desc, metric, metricSub }, i) => (
                <StaggerItem key={title}>
                  <div
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start"
                    style={{
                      paddingBlock: i === 0 ? "0 clamp(2.5rem, 4.5vw, 3.75rem)" : "clamp(2.5rem, 4.5vw, 3.75rem)",
                    }}
                  >
                    {/* Left — category label */}
                    <div className="lg:col-span-3">
                      <span className="label-sm text-on-surface/45 group-hover:text-secondary transition-colors duration-500">
                        — {label}
                      </span>
                    </div>

                    {/* Middle — title + body */}
                    <div className="lg:col-span-6 flex flex-col gap-3">
                      <h3
                        className="text-on-surface"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.15,
                        }}
                      >
                        {title}
                      </h3>
                      <p className="body-md text-muted-foreground leading-relaxed max-w-[56ch]">
                        {desc}
                      </p>
                    </div>

                    {/* Right — metric */}
                    <div className="lg:col-span-3 flex lg:justify-end">
                      <div className="flex flex-col lg:items-end gap-1">
                        <span
                          className="tabular text-on-surface group-hover:text-secondary transition-colors duration-500"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 3.6vw, 3rem)",
                            fontWeight: 500,
                            letterSpacing: "-0.025em",
                            lineHeight: 0.95,
                            fontVariationSettings: "'wdth' 95",
                          }}
                        >
                          {metric}
                        </span>
                        <span className="label-sm text-on-surface/50">
                          {metricSub}
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Contact row */}
            <div className="mt-12 lg:mt-16 pt-10 flex flex-col sm:flex-row gap-6 sm:gap-10">
              <Magnetic>
                <a href="#" className="inline-flex items-center gap-2.5 label-md text-primary hover:text-secondary transition-colors">
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Service-Hotline kontaktieren
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="inline-flex items-center gap-2.5 label-md text-primary hover:text-secondary transition-colors">
                  <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Wartungsvertrag anfragen
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* ── 9. KONTAKT / CTA ──────────────────────────────────────────────── */}
        <GlowTracker
          className="overflow-hidden"
          color="rgba(188,1,0,0.08)"
          size={800}
        >
          <section className="section-pad noise" style={{ background: "var(--primary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Project inquiry */}
                <Reveal>
                  <div className="flex flex-col gap-6 p-8 lg:p-10 h-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex flex-col gap-3">
                      <span className="label-sm" style={{ color: "var(--secondary)" }}>— Projekt anfragen</span>
                      <h2
                        style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, color: "white" }}
                      >
                        Sie haben ein Projekt oder eine Anforderung?
                      </h2>
                      <p className="body-sm text-white/45 leading-relaxed">
                        Teilen Sie uns die wichtigsten Parameter mit — wir melden uns für eine erste technische Einschätzung.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <span className="label-sm text-white/30">Hilfreich für die Anfrage:</span>
                      <ul className="flex flex-col gap-1.5">
                        {["Anwendung und Prozess", "Temperaturbereich (Vor-/Rücklauf)", "Erforderliche Kühlleistung", "Aufstellort und Kühlung", "Kältemedium und Durchfluss"].map((item) => (
                          <li key={item} className="flex items-center gap-2.5 body-sm text-white/45">
                            <span className="w-1 h-1 rounded-full shrink-0 bg-secondary/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Magnetic>
                      <Button variant="secondary" className="w-fit gap-2 mt-4">
                        Projekt anfragen
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    </Magnetic>
                  </div>
                </Reveal>

                {/* Service contact */}
                <Reveal delay={0.15}>
                  <div className="flex flex-col gap-6 p-8 lg:p-10 h-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex flex-col gap-3">
                      <span className="label-sm" style={{ color: "var(--secondary)" }}>— Service kontaktieren</span>
                      <h2
                        style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, color: "white" }}
                      >
                        Störung, Wartung oder Ersatzteilbedarf?
                      </h2>
                      <p className="body-sm text-white/45 leading-relaxed">
                        Unser Serviceteam ist für Bestandskunden direkt erreichbar — für Notfälle, geplante Wartungen und Ersatzteilanfragen.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      {[
                        { icon: Phone, label: "+49 (0) 30 · XXX XX XX", sub: "Service-Hotline" },
                        { icon: Mail, label: "service@pro-itech.de", sub: "Service-E-Mail" },
                        { icon: MapPin, label: "Berlin, Deutschland", sub: "Hauptstandort" },
                      ].map(({ icon: Icon, label, sub }) => (
                        <div key={sub} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-sm shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                            <Icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="body-sm text-white">{label}</div>
                            <div className="label-sm text-white/30">{sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Magnetic>
                      <Button
                        variant="outline"
                        className="w-fit gap-2 mt-4"
                        style={{ borderColor: "rgba(255,255,255,0.15)", color: "white", background: "transparent" }}
                      >
                        <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                        Service kontaktieren
                      </Button>
                    </Magnetic>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </GlowTracker>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--primary-deep)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/">
            <Image src="/logo.webp" alt="itech cooling solutions" width={360} height={120} className="h-32 w-auto brightness-0 invert" />
          </a>
          <p className="label-sm text-white/25">
            © {new Date().getFullYear()} pro itech GmbH · Industrielle Kälte- und Temperiertechnik · Berlin
          </p>
          <div className="flex items-center gap-6">
            {["Impressum", "Datenschutz", "Kontakt"].map((item) => (
              <a key={item} href="#" className="label-sm text-white/25 hover:text-white/60 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
