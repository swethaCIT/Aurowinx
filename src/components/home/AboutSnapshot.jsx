// AboutSnapshot.jsx — UX-improved
// Changes vs original:
//  • SplitReveal stagger reduced from 0.02-0.03s → 0.012s per char, base delays cut ~40%
//    (original heading finished ~1.8s after trigger; now ~0.9s — users actually see it)
//  • All animation delays capped so the full section completes within ~1.2s of entering view
//  • Card minHeight changed to fluid (min-height: auto with padding) for better mobile
//  • prefers-reduced-motion: disable SplitReveal and all motion, render statically
//  • Shimmer sweep on Card now skips entirely if prefers-reduced-motion

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND
══════════════════════════════════════════════════════════════════════════ */
function AnimatedBackground({ shouldReduceMotion }) {
  return (
    <>
      {[
        { w: 700, h: 700, top: "-200px", left: "-150px",  color: "rgba(37,99,235,0.07)",  dur: 18 },
        { w: 500, h: 500, top: "30%",    right: "-100px", color: "rgba(124,58,237,0.06)", dur: 22 },
        { w: 400, h: 400, bottom:"-100px",left:"35%",     color: "rgba(8,145,178,0.06)",  dur: 26 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w, height: orb.h,
            top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 4 }}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CHIP VISUAL
══════════════════════════════════════════════════════════════════════════ */
function ChipVisual({ shouldReduceMotion }) {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 opacity-[0.07] sm:h-56 sm:w-56 md:h-64 md:w-64">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.rect x="50" y="50" width="100" height="100" rx="8" stroke="white" strokeWidth="2"
          animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }} />
        {[65,80,95,110,125].map(x => (
          <motion.line key={`t${x}`} x1={x} y1="30" x2={x} y2="50" stroke="white" strokeWidth="1.5"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: x * 0.02 }} />
        ))}
        {[65,80,95,110,125].map(x => (
          <motion.line key={`b${x}`} x1={x} y1="150" x2={x} y2="170" stroke="white" strokeWidth="1.5"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: x * 0.02 }} />
        ))}
        {[65,80,95,110,125].map(y => (
          <motion.line key={`l${y}`} x1="30" y1={y} x2="50" y2={y} stroke="white" strokeWidth="1.5"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: y * 0.02 }} />
        ))}
        {[65,80,95,110,125].map(y => (
          <motion.line key={`r${y}`} x1="150" y1={y} x2="170" y2={y} stroke="white" strokeWidth="1.5"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: y * 0.02 }} />
        ))}
        {[65,80,95,110,125,140].map(x => (
          <line key={`ig${x}`} x1={x} y1="50" x2={x} y2="150" stroke="white" strokeWidth="0.5" opacity="0.3" />
        ))}
        {[65,80,95,110,125,140].map(y => (
          <line key={`ih${y}`} x1="50" y1={y} x2="150" y2={y} stroke="white" strokeWidth="0.5" opacity="0.3" />
        ))}
        <motion.circle r="3" fill="#22d3ee"
          animate={shouldReduceMotion ? { cx: 50, cy: 50 } : { cx: [50,150,150,50,50], cy: [50,50,150,150,50] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SHIMMER CARD WRAPPER
══════════════════════════════════════════════════════════════════════════ */
function Card({ children, className = "", style = {}, delay = 0, triggered, dark = false }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[28px] ${className}`}
      style={{
        border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(148,163,184,0.13)",
        ...style,
      }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36, scale: shouldReduceMotion ? 1 : 0.97 }}
      animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* FIX: skip shimmer animation entirely when reduced-motion is preferred */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: dark
              ? "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)"
              : "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={hovered ? { backgroundPosition: ["200% 0", "-200% 0"] } : { backgroundPosition: "200% 0" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CHAR-BY-CHAR REVEAL — FIX: cut timing so full heading completes in <1s
══════════════════════════════════════════════════════════════════════════ */
function SplitReveal({ text, style, delay = 0, triggered, stagger = 0.012 }) {
  const shouldReduceMotion = useReducedMotion();

  // FIX: if reduced-motion, render as a simple fade-in with no per-character stagger
  if (shouldReduceMotion) {
    return (
      <motion.span style={style} aria-label={text}
        initial={{ opacity: 0 }} animate={triggered ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}>
        {text}
      </motion.span>
    );
  }

  return (
    <span style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={triggered ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          // FIX: stagger 0.012s (was 0.02-0.03s), base delay passed from parent
          transition={{ duration: 0.45, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INTRO CARD
══════════════════════════════════════════════════════════════════════════ */
function IntroCard({ triggered }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card
      triggered={triggered}
      delay={0.05}
      dark
      className="lg:col-span-2"
      style={{
        background: "linear-gradient(135deg,#020617 0%,#0f172a 50%,#111827 100%)",
        // FIX: was `minHeight: "min(440px, auto)"` — on mobile this locks height, wastes scroll space
        // Now uses padding-driven height; grows naturally with content
        boxShadow: "0 32px 80px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <motion.div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)", filter: "blur(60px)" }}
        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)", filter: "blur(70px)" }}
        animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <div className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      <ChipVisual shouldReduceMotion={shouldReduceMotion} />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
        <div>
          <motion.div className="flex items-center gap-2.5 mb-6"
            initial={{ opacity: 0 }} animate={triggered ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:text-[11px] sm:tracking-[0.28em]">
              Aurowinx Technologies Pvt Ltd
            </p>
          </motion.div>

          <h2 className="text-white font-black leading-[0.93] tracking-[-0.045em] mb-6"
            style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", perspective: "600px" }}>
            {/* FIX: stagger cut from 0.02s → 0.012s, base delays cut by ~40% */}
            <SplitReveal text="Engineering" triggered={triggered} delay={0.15} stagger={0.012} />
            <br />
            <SplitReveal text="Intelligent " triggered={triggered} delay={0.32} stagger={0.012} />
            <SplitReveal text="Technology" triggered={triggered} delay={0.46} stagger={0.012}
              style={{
                background: "linear-gradient(135deg,#22d3ee,#60a5fa,#a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            />
            <br />
            <SplitReveal text="Solutions" triggered={triggered} delay={0.62} stagger={0.015} />
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Semiconductor", "Embedded Systems", "Industrial IoT", "Power Electronics"].map((item, i) => (
              <motion.div key={item}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-medium text-slate-300"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={triggered ? { opacity: 1, scale: 1 } : {}}
                // FIX: was 1.15 + i*0.07 (max 1.36s delay) → now 0.72 + i*0.06 (max 0.9s)
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.72 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, background: "rgba(255,255,255,0.1)", transition: { duration: 0.2 } }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          <motion.p className="text-slate-400 leading-[1.85] max-w-2xl"
            style={{ fontSize: "13.5px" }}
            initial={{ opacity: 0, y: 12 }} animate={triggered ? { opacity: 1, y: 0 } : {}}
            // FIX: was 1.3s → now 0.85s
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}>
            Aurowinx Technologies delivers advanced engineering solutions across
            Semiconductor Design, Embedded Systems, Industrial IoT, and Power Electronics —
            transforming concepts into intelligent, production-ready technologies for modern industries.
          </motion.p>
        </div>

        <motion.div className="mt-6 flex flex-wrap gap-5 pt-6 sm:gap-8 sm:pt-7 sm:mt-7"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0 }} animate={triggered ? { opacity: 1 } : {}}
          // FIX: was 1.45s → now 1.0s
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 1.0 }}>
          {[
            ["ASIC / FPGA", "Silicon Design"],
            ["Industrial IoT", "Automation"],
            ["EV & Solar", "Power Systems"],
            ["End-to-End", "Engineering"],
          ].map(([title, sub], i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 10 }} animate={triggered ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 1.05 + i * 0.07 }}>
              <p className="text-white font-bold" style={{ fontSize: "1rem" }}>{title}</p>
              <p className="text-slate-500 mt-0.5" style={{ fontSize: "11px" }}>{sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SMALL CARD (Vision / Mission)
══════════════════════════════════════════════════════════════════════════ */
function SmallCard({ title, text, icon, triggered, delay, accent }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <Card triggered={triggered} delay={shouldReduceMotion ? 0 : delay}
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 4px 30px rgba(15,23,42,0.06)",
        flex: 1,
      }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)`, filter: "blur(30px)" }} />
      <div className="relative z-10 p-6 h-full flex flex-col">
        <motion.div
          className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }}
          whileHover={shouldReduceMotion ? {} : { rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <p className="text-slate-900 font-bold mb-2" style={{ fontSize: "14px" }}>{title}</p>
        <p className="text-slate-400 leading-[1.8]" style={{ fontSize: "12.5px" }}>{text}</p>
        <motion.div className="mt-auto pt-4 h-0.5 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={triggered ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : delay + 0.4, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DIVISION CARD
══════════════════════════════════════════════════════════════════════════ */
function DivisionCard({ title, desc, tags, color, colorEnd, triggered, delay, number }) {
  const [hov, setHov] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card triggered={triggered} delay={shouldReduceMotion ? 0 : delay}
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 30px rgba(15,23,42,0.05)",
        minHeight: "280px",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}08, ${colorEnd}06)` }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, ${colorEnd}, transparent)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={triggered ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: shouldReduceMotion ? 0 : delay + 0.3, ease: [0.22, 1, 0.36, 1] }} />

      <div className="relative z-10 p-7 h-full flex flex-col"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
            style={{ background: `linear-gradient(135deg, ${color}, ${colorEnd})` }}
            whileHover={shouldReduceMotion ? {} : { rotate: -6, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 260 }}
          >
            {number}
          </motion.div>
          <span className="select-none font-black leading-none text-[clamp(2.5rem,12vw,4.5rem)]"
            style={{ color, opacity: 0.07, letterSpacing: "-0.05em" }}>
            0{number}
          </span>
        </div>

        <p className="text-slate-900 font-bold mb-2.5" style={{ fontSize: "16px" }}>{title}</p>
        <p className="text-slate-500 leading-[1.85] flex-1" style={{ fontSize: "12.5px" }}>{desc}</p>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {tags.map((tag, i) => (
            <motion.span key={tag}
              className="px-3 py-1.5 rounded-full font-semibold"
              style={{ background: `${color}10`, color, border: `1px solid ${color}20`, fontSize: "10px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={triggered ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : delay + 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, background: `${color}20` }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.div className="flex items-center gap-1.5 mt-5 cursor-pointer group w-fit"
          style={{ color }}
          whileHover="hov">
          <span className="font-bold" style={{ fontSize: "11px" }}>Explore</span>
          <motion.svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            variants={{ hov: { x: 4 } }} transition={{ type: "spring", stiffness: 300 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </motion.svg>
        </motion.div>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════════════════════════════ */
function SectionLabel({ triggered }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div className="mb-6 flex min-w-0 flex-wrap items-center gap-3 sm:mb-8 sm:gap-4"
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
      animate={triggered ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="h-px w-10 rounded-full" style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)" }} />
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:tracking-[0.2em]">
        About Aurowinx Technologies
      </span>
      <div className="h-px flex-1 rounded-full" style={{ background: "linear-gradient(90deg,rgba(37,99,235,0.2),transparent)" }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function AboutSnapshot() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shouldReduceMotion = useReducedMotion();
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%","0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-12 sm:py-16 lg:py-28"
      style={{ background: "linear-gradient(165deg,#f0f4ff 0%,#ffffff 40%,#faf5ff 100%)" }}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <AnimatedBackground shouldReduceMotion={shouldReduceMotion} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(37,99,235,0.012) 50%)", backgroundSize: "100% 4px" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 2xl:max-w-[90rem]">
        <SectionLabel triggered={isInView} />

        {/* Mobile / tablet: IntroCard only (full width) */}
        <div className="block lg:hidden">
          <IntroCard triggered={isInView} />
        </div>

        {/* Desktop: 3-col grid with IntroCard + small cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          <IntroCard triggered={isInView} />
          <div className="flex flex-col gap-4">
            <SmallCard triggered={isInView} delay={0.15} title="Our Vision"
              text="Building intelligent engineering solutions for semiconductor, automation, mobility, and sustainable energy ecosystems."
              accent="#2563eb"
              icon={<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/></svg>} />
            <SmallCard triggered={isInView} delay={0.25} title="Our Mission"
              text="Delivering end-to-end technology solutions with precision engineering, advanced innovation, and long-term customer value."
              accent="#7c3aed"
              icon={<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" strokeLinejoin="round"/></svg>} />
          </div>
        </div>

        {/* Desktop only: Division cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 mt-4">
          <DivisionCard triggered={isInView} delay={0.3} number="1" color="#2563eb" colorEnd="#0891b2"
            title="Semiconductor Design"
            desc="ASIC · FPGA · SoC · RTL Design · Verification · DFT · Physical Design · Low-Power Architecture"
            tags={["High Performance", "Silicon Ready", "Verification", "Scalable"]} />
          <DivisionCard triggered={isInView} delay={0.42} number="2" color="#0891b2" colorEnd="#7c3aed"
            title="Embedded & Industrial IoT"
            desc="Embedded Firmware · RTOS · Industrial IoT · Automation Systems · Edge Connectivity · Smart Control"
            tags={["Real-Time", "Automation", "Connected", "Industrial"]} />
          <DivisionCard triggered={isInView} delay={0.54} number="3" color="#ea580c" colorEnd="#db2777"
            title="Power Electronics & Products"
            desc="EV Chargers · BLDC Controllers · Solar Inverters · Power Electronics · Embedded Products · Custom R&D"
            tags={["Energy Efficient", "Smart Power", "Sustainable", "Future Ready"]} />
        </div>
      </div>
    </section>
  );
}