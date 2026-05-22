// src/components/home/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Install before using:  npm install framer-motion
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════
   1.  TYPEWRITER HOOK
══════════════════════════════════════════════════════════ */
const WORDS = [
  'ASIC Design',
  'FPGA Solutions',
  'SoC Development',
  'IoT Automation',
  'Embedded Systems',
  'EV Charging Tech',
]

function useTypewriter(words, typeSpeed = 75, deleteSpeed = 38, pauseMs = 2200) {
  const [display, setDisplay] = useState('')
  const meta = useRef({ wIdx: 0, deleting: false })

  useEffect(() => {
    const { wIdx, deleting } = meta.current
    const word = words[wIdx]

    // Finished typing — pause then delete
    if (!deleting && display === word) {
      const t = setTimeout(() => {
        meta.current.deleting = true
        setDisplay(d => d.slice(0, -1))
      }, pauseMs)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      if (deleting) {
        if (display.length <= 1) {
          meta.current.deleting = false
          meta.current.wIdx = (wIdx + 1) % words.length
          setDisplay('')
        } else {
          setDisplay(d => d.slice(0, -1))
        }
      } else {
        setDisplay(word.slice(0, display.length + 1))
      }
    }, deleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(t)
  }, [display, words, typeSpeed, deleteSpeed, pauseMs])

  return display
}

/* ══════════════════════════════════════════════════════════
   2.  CIRCUIT / PARTICLE CANVAS
══════════════════════════════════════════════════════════ */
function CircuitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn nodes based on screen size
    const count = Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 12500))
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.5,
    }))

    const MAX_DIST = 148

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height)  n.vy *= -1
      })

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.22 * (1 - d / MAX_DIST)})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(96,165,250,0.58)'
        ctx.fill()
      })

      raf = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

/* ══════════════════════════════════════════════════════════
   3.  FLOATING TECH BADGE
══════════════════════════════════════════════════════════ */
const BADGES = [
  { label: 'ASIC Design',      color: '#60a5fa', pos: 'top-[22%] left-[6%]',     delay: 0   },
  { label: 'SoC Architecture', color: '#34d399', pos: 'top-[17%] right-[7%]',    delay: 1   },
  { label: 'DFT Verification', color: '#a78bfa', pos: 'top-[46%] left-[2.5%]',   delay: 1.6 },
  { label: 'FPGA / RTL',       color: '#22d3ee', pos: 'top-[44%] right-[3.5%]',  delay: 0.7 },
  { label: 'IoT Automation',   color: '#fb923c', pos: 'bottom-[25%] left-[6%]',  delay: 2.1 },
  { label: 'EV · BLDC · Solar',color: '#f472b6', pos: 'bottom-[27%] right-[5%]', delay: 1.3 },
]

function FloatingBadge({ label, color, pos, delay }) {
  return (
    // Outer: handles fade-in entrance
    <motion.div
      className={`absolute hidden xl:inline-flex items-center select-none ${pos}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.9, duration: 0.6 }}
    >
      {/* Inner: handles perpetual float */}
      <motion.span
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300"
        style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.8 + delay * 0.35, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.5 }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
        {label}
      </motion.span>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   4.  DATA
══════════════════════════════════════════════════════════ */
const STATS = [
  { value: '50+',  label: 'Projects Delivered'  },
  { value: '20+',  label: 'Global Clients'       },
  { value: '3',    label: 'Core Domains'         },
  { value: '100%', label: 'End-to-End Owned'     },
]

/* ══════════════════════════════════════════════════════════
   5.  ANIMATION PRESET
══════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1], delay },
})

/* ══════════════════════════════════════════════════════════
   6.  HERO SECTION  ← main export
══════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const typed = useTypewriter(WORDS)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050c1a' }}
    >
      {/* ── Particle / Circuit canvas ── */}
      <CircuitCanvas />

      {/* ── Subtle dot-grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(59,130,246,0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.35,
        }}
      />

      {/* ── Atmospheric glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Centre top glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] h-[480px] rounded-full"
          style={{ background: 'rgba(59,130,246,0.11)', filter: 'blur(130px)' }}
        />
        {/* Left accent */}
        <div
          className="absolute top-[55%] left-[15%] w-[380px] h-[380px] rounded-full"
          style={{ background: 'rgba(6,182,212,0.07)', filter: 'blur(110px)' }}
        />
        {/* Right accent */}
        <div
          className="absolute top-[55%] right-[15%] w-[380px] h-[380px] rounded-full"
          style={{ background: 'rgba(139,92,246,0.07)', filter: 'blur(110px)' }}
        />
      </div>

      {/* ── Floating tech badges (xl screens only) ── */}
      {BADGES.map(b => <FloatingBadge key={b.label} {...b} />)}

      {/* ════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6 pt-24 pb-12">

        {/* Live pill badge */}
        <motion.div {...fadeUp(0.1)}>
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{ border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.08)', backdropFilter: 'blur(8px)' }}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span
              className="text-cyan-300 font-semibold uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.16em' }}
            >
              Semiconductor · Embedded · IoT · Electronics
            </span>
          </div>
        </motion.div>

        {/* ── Headline line 1 ── */}
        <motion.div {...fadeUp(0.22)}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              fontWeight: 800,
              marginBottom: '0.12em',
            }}
          >
            Engineering Silicon.
          </h1>
        </motion.div>

        {/* ── Headline line 2 — gradient ── */}
        <motion.div {...fadeUp(0.34)} style={{ marginBottom: '1.8rem' }}>
          <h1
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 45%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Powering Tomorrow.
          </h1>
        </motion.div>

        {/* ── Typewriter line ── */}
        <motion.div {...fadeUp(0.46)} className="mb-6">
          <div className="flex items-center justify-center gap-2" style={{ height: '2rem' }}>
            <span className="text-slate-400 font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
              We specialize in
            </span>
            <span
              className="font-semibold"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                minWidth: '170px',
                textAlign: 'left',
                display: 'inline-block',
              }}
            >
              {typed}
            </span>
            {/* Blinking cursor */}
            <span
              className="text-cyan-400 font-thin animate-pulse"
              style={{ fontSize: '1.4rem', lineHeight: 1 }}
            >
              |
            </span>
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          {...fadeUp(0.56)}
          style={{
            color: '#94a3b8',
            lineHeight: 1.82,
            maxWidth: '620px',
            marginBottom: '2.5rem',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
          }}
        >
          From concept to silicon — AurowinX delivers end-to-end engineering excellence
          in semiconductor design, embedded systems, and intelligent electronics products
          that create real-world impact across global industries.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div {...fadeUp(0.66)} className="flex flex-wrap items-center justify-center gap-4 mb-16">

          {/* Primary CTA — uses your existing .btn-primary class */}
          <a href="/contact" className="btn-primary group">
            Start a Project
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Ghost CTA — dark-friendly secondary */}
          <a
            href="/about"
            className="inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.11)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            Explore Aurowinx
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div {...fadeUp(0.76)} className="flex flex-wrap justify-center items-stretch">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center px-8 py-4"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                  background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.value}
              </span>
              <span className="text-slate-500 mt-1 tracking-wide" style={{ fontSize: '11px' }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Scroll-down indicator ── */}
      <motion.button
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <span className="text-slate-600 tracking-[0.15em] uppercase" style={{ fontSize: '10px' }}>
          Scroll
        </span>
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050c1a 70%, rgba(5,12,26,0.4))' }}
      />
    </section>
  )
}