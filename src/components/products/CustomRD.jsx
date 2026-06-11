// src/components/products/CustomRD.jsx
// ─────────────────────────────────────────────────
// Section : Custom R&D Solutions
// Layout  : 3-row full-width desktop stack
//           Row 1 — Hero card (headline + body + domain tags)
//           Row 2 — Process steps (4-col horizontal)
//           Row 3 — Capabilities (3-col grid, 2 rows of 3)
// Mobile  : Carousel-based UX (caps + process)

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { C, FONT, EASE, fadeUp, STEP_COLORS } from "../products/theme";
import {
  FlaskConical, Telescope, Cpu, GitBranch,
  Microscope, Lightbulb, BarChart2,
  ChevronRight, ChevronLeft, Search,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const CAPS = [
  {
    Icon: Telescope,
    title: "Technology Scouting",
    desc: "Systematic evaluation of emerging process nodes, EDA toolchains, and IP ecosystems — mapped directly to your product roadmap and risk tolerance.",
  },
  {
    Icon: Microscope,
    title: "Competitive Teardown",
    desc: "Structured reverse-architecture analysis of competitor silicon — die shots, functional decomposition, and performance benchmarking with actionable IP delta reports.",
  },
  {
    Icon: Lightbulb,
    title: "Architecture Exploration",
    desc: "Pre-RTL micro-architecture studies across multiple design points — power, performance, area trade-off modelling before a single line of HDL is committed.",
  },
  {
    Icon: Cpu,
    title: "Rapid Silicon Prototyping",
    desc: "FPGA-based proof-of-concept builds and shuttle-run test chips to de-risk novel architectures ahead of full tapeout investment.",
  },
  {
    Icon: GitBranch,
    title: "Novel IP Conception",
    desc: "Greenfield block-level IP development — from specification through design, verification closure, and silicon-ready handoff with full documentation.",
  },
  {
    Icon: BarChart2,
    title: "Feasibility & Due Diligence",
    desc: "Independent technical feasibility studies and M&A-grade silicon due diligence for investors, acquirers, and executive design reviews.",
  },
];

const PROCESS = [
  {
    num: "01",
    label: "Brief & Scope",
    detail: "Define research objective, success criteria, and boundaries in a structured discovery session.",
  },
  {
    num: "02",
    label: "State-of-Art Survey",
    detail: "Patent landscape, academic literature, and competitive silicon reviewed and synthesised.",
  },
  {
    num: "03",
    label: "Prototype & Validate",
    detail: "Rapid model or FPGA prototype built to test the core hypothesis before full commitment.",
  },
  {
    num: "04",
    label: "IP Transfer & Report",
    detail: "Fully documented findings, design artefacts, and recommendations handed off to your team.",
  },
];

const DOMAINS = [
  "RISC-V Cores", "SerDes PHY", "PLL / Clock", "AI Accelerators",
  "SRAM Compilers", "NoC Fabric", "ADC / DAC", "Security Engines",
  "PCIe Gen5", "HBM Interface", "Chiplet Integration", "Low-Power IoT",
];

const STATS = [
  { value: "40+",   label: "Research Engagements" },
  { value: "6",     label: "Process Nodes Covered" },
  { value: "< 3wk", label: "Feasibility Turnaround" },
  { value: "100%",  label: "NDA-Protected Delivery" },
];

/* ─────────────────────────────────────────────────
   CAPABILITY CAROUSEL  (mobile / tablet)
───────────────────────────────────────────────── */
function CapCarousel({ inView }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }, [active]);

  const cap = CAPS[active];
  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div style={{
      borderRadius: 20, border: `1px solid ${C.border}`,
      background: C.bgWhite, boxShadow: C.shadowMd, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: `1px solid ${C.borderLight}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: FONT }}>
          Research Capabilities
        </span>
        <span style={{ padding: "3px 10px", borderRadius: 50, background: C.accentSoft, border: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: FONT }}>
          {active + 1} / {CAPS.length}
        </span>
      </div>

      <div style={{ position: "relative", minHeight: 160, padding: "22px 20px 20px" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: EASE }}
            style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: C.accentSoft, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <cap.Icon style={{ width: 17, height: 17, color: C.primary }} strokeWidth={1.8} />
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800, color: C.textPrimary, fontFamily: FONT }}>{cap.title}</p>
              <p style={{ margin: 0, fontSize: 12.5, color: C.textMuted, lineHeight: 1.7, fontFamily: FONT }}>{cap.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ padding: "12px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {CAPS.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Capability ${i + 1}`}
              style={{ width: i === active ? 20 : 7, height: 7, borderRadius: 50, background: i === active ? C.primary : C.border, border: "none", cursor: "pointer", padding: 0, transition: "width 0.25s ease, background 0.2s ease" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ icon: ChevronLeft, fn: () => go(active === 0 ? CAPS.length - 1 : active - 1), label: "Prev" },
            { icon: ChevronRight, fn: () => go(active === CAPS.length - 1 ? 0 : active + 1), label: "Next" }]
            .map(({ icon: Icon, fn, label }) => (
            <button key={label} onClick={fn} aria-label={label}
              style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.border}`, background: C.bgAccent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon style={{ width: 15, height: 15, color: C.primary }} strokeWidth={2.2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PROCESS CAROUSEL  (mobile / tablet)
───────────────────────────────────────────────── */
function ProcessCarousel({ inView }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }, [active]);

  const step = PROCESS[active];
  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: C.bgWhite, boxShadow: C.shadowMd, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: FONT }}>
          Engagement Process
        </span>
        <span style={{ padding: "3px 10px", borderRadius: 50, background: C.accentSoft, border: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: FONT }}>
          Step {active + 1} of {PROCESS.length}
        </span>
      </div>

      <div style={{ position: "relative", minHeight: 110, padding: "22px 20px 16px" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: EASE }}
            style={{ display: "flex", gap: 14 }}
          >
            <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: `${STEP_COLORS[active]}15`, border: `1.5px solid ${STEP_COLORS[active]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: STEP_COLORS[active], fontFamily: FONT }}>{step.num}</span>
            </div>
            <div style={{ paddingTop: 2 }}>
              <p style={{ margin: "0 0 5px", fontSize: 14, fontWeight: 800, color: C.textPrimary, fontFamily: FONT }}>{step.label}</p>
              <p style={{ margin: 0, fontSize: 12.5, color: C.textMuted, lineHeight: 1.65, fontFamily: FONT }}>{step.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ padding: "10px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {PROCESS.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Step ${i + 1}`}
              style={{ width: i === active ? 20 : 7, height: 7, borderRadius: 50, background: i === active ? STEP_COLORS[i] : C.border, border: "none", cursor: "pointer", padding: 0, transition: "width 0.25s ease, background 0.2s ease" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ icon: ChevronLeft,  fn: () => go(active === 0 ? PROCESS.length - 1 : active - 1), label: "Prev" },
            { icon: ChevronRight, fn: () => go(active === PROCESS.length - 1 ? 0 : active + 1), label: "Next" }]
            .map(({ icon: Icon, fn, label }) => (
            <button key={label} onClick={fn} aria-label={label}
              style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.border}`, background: C.bgAccent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon style={{ width: 15, height: 15, color: C.primary }} strokeWidth={2.2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────── */
export default function CustomRD() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="custom-rd"
      ref={ref}
      style={{ position: "relative", overflow: "hidden", background: C.bgWhite, fontFamily: FONT, padding: "120px 0 110px" }}
    >
      {/* ── BLOBS ── */}
      <div style={{ position: "absolute", top: "-10%", left: "-6%", width: "38vw", height: "38vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-8%", right: "-4%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div className="crd-wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>

        {/* ── BADGE ── */}
        <motion.div {...fadeUp} style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 20px", borderRadius: 50, border: `1px solid ${C.border}`, background: C.bgAccent, color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", boxShadow: C.shadowSm, fontFamily: FONT }}>
            <FlaskConical style={{ width: 12, height: 12 }} />
            Custom R&amp;D Solutions
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5 }} />
            <span style={{ padding: "2px 11px", borderRadius: 50, background: C.gradPrimary, color: "#fff", fontSize: 10, letterSpacing: "0.1em" }}>Research Lab</span>
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FONT }}
          >
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
            Explore First · Validate Fast · Scale with Confidence
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 auto 20px", color: C.textPrimary, maxWidth: 700, fontFamily: FONT }}
          >
            Ideas Worth{" "}
            <span style={{ background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Proving in Silicon.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
            style={{ color: C.textSecondary, fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.85, maxWidth: 580, margin: "0 auto", fontFamily: FONT }}
          >
            When your product roadmap requires answers that don't exist yet —
            AUROWINX deploys structured research engagements to de-risk novel
            architectures, validate emerging technologies, and convert
            speculation into silicon-ready IP.
          </motion.p>
        </div>

        {/* ── STAT ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="crd-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderRadius: 20, border: `1px solid ${C.border}`, background: C.bgAccent, overflow: "hidden", marginBottom: 20, boxShadow: C.shadowSm }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: "26px 20px", textAlign: "center", borderRight: i < STATS.length - 1 ? `1px solid ${C.border}` : "none", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, borderRadius: "0 0 4px 4px", background: C.gradPrimary }} />
              <p style={{ margin: "0 0 6px", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, lineHeight: 1, fontFamily: FONT }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: FONT }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            DESKTOP 3-ROW LAYOUT
        ══════════════════════════════════════════ */}
        <div className="crd-desktop">

          {/* ── ROW 1: HERO CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
            style={{
              borderRadius: 20, border: `1px solid ${C.border}`,
              background: C.bgAccent, boxShadow: C.shadowMd,
              padding: "36px 44px", marginBottom: 16,
              display: "flex", gap: 56, alignItems: "flex-start",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* decorative circles */}
            <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", border: `1px solid ${C.border}`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", border: `1px solid ${C.borderLight}`, pointerEvents: "none" }} />

            {/* Left: headline + body */}
            <div style={{ flex: "0 0 42%", minWidth: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 50, background: C.bgWhite, border: `1px solid ${C.border}`, marginBottom: 18 }}>
                <Search style={{ width: 10, height: 10, color: C.primary }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FONT }}>
                  Research-Driven Innovation
                </span>
              </div>
              <h3 style={{ margin: "0 0 16px", fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.03em", color: C.textPrimary, fontFamily: FONT }}>
                Your internal R&D bench,{" "}
                <span style={{ background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  on demand.
                </span>
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: C.textSecondary, lineHeight: 1.85, fontFamily: FONT }}>
                Most engineering teams can execute. Few have the bandwidth to
                simultaneously explore what comes next. AUROWINX Custom R&D
                bridges that gap — providing semiconductor-grade research
                rigour with startup-level agility.
              </p>
            </div>

            {/* Right: domain tags */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: FONT }}>
                Domain Coverage
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {DOMAINS.map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, scale: 0.88 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.32 + i * 0.04, ease: EASE }}
                    style={{
                      padding: "5px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700,
                      background: C.bgWhite, border: `1px solid ${C.border}`,
                      color: i % 3 === 0 ? C.primary : i % 3 === 1 ? C.secondary : C.accent,
                      fontFamily: FONT, letterSpacing: "0.03em",
                    }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── ROW 2: PROCESS STEPS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            style={{
              borderRadius: 20, border: `1px solid ${C.border}`,
              background: C.bgWhite, boxShadow: C.shadowMd,
              overflow: "hidden", marginBottom: 16,
            }}
          >
            {/* header */}
            <div style={{ padding: "16px 28px 14px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FONT }}>
                Engagement Process
              </span>
              <span style={{ padding: "3px 10px", borderRadius: 50, background: C.accentSoft, border: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: FONT }}>
                4 Stages
              </span>
            </div>

            {/* 4 steps in a row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.09, ease: EASE }}
                  style={{
                    padding: "24px 26px",
                    borderRight: i < PROCESS.length - 1 ? `1px solid ${C.borderLight}` : "none",
                    position: "relative",
                  }}
                >
                  {/* connector arrow between steps */}
                  {i < PROCESS.length - 1 && (
                    <div style={{
                      position: "absolute", right: -1, top: "50%",
                      transform: "translateY(-50%)",
                      width: 20, height: 20,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 2,
                    }}>
                      <ChevronRight style={{ width: 13, height: 13, color: C.border }} strokeWidth={2.5} />
                    </div>
                  )}

                  {/* number bubble */}
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", marginBottom: 14,
                    background: `${STEP_COLORS[i]}12`,
                    border: `1.5px solid ${STEP_COLORS[i]}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: STEP_COLORS[i], fontFamily: FONT }}>
                      {step.num}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 6px", fontSize: 13.5, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em", fontFamily: FONT }}>
                    {step.label}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: C.textMuted, lineHeight: 1.65, fontFamily: FONT }}>
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── ROW 3: CAPABILITIES 3-COL GRID ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
            style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: C.bgWhite, boxShadow: C.shadowMd, overflow: "hidden" }}
          >
            {/* header */}
            <div style={{ padding: "16px 28px 14px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FONT }}>
                Research Capabilities
              </span>
              <span style={{ padding: "3px 10px", borderRadius: 50, background: C.accentSoft, border: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: FONT }}>
                6 Specialisations
              </span>
            </div>

            {/* 3-col × 2-row grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
              {CAPS.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.42 + i * 0.07, ease: EASE }}
                  style={{
                    padding: "22px 24px",
                    borderRight: i % 3 !== 2 ? `1px solid ${C.borderLight}` : "none",
                    borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none",
                    display: "flex", gap: 14, alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: C.accentSoft, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <cap.Icon style={{ width: 16, height: 16, color: C.primary }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 5px", fontSize: 13, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em", fontFamily: FONT }}>
                      {cap.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 11.5, color: C.textMuted, lineHeight: 1.65, fontFamily: FONT }}>
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>{/* end crd-desktop */}

        {/* ══════════════════════════════════════════
            MOBILE / TABLET CAROUSEL STACK
        ══════════════════════════════════════════ */}
        <div className="crd-mobile-stack" style={{ display: "none", flexDirection: "column", gap: 16 }}>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: C.bgAccent, boxShadow: C.shadowMd, padding: "28px 24px", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", bottom: -30, right: -30, width: 140, height: 140, borderRadius: "50%", border: `1px solid ${C.border}`, pointerEvents: "none" }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 50, background: C.bgWhite, border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <Search style={{ width: 10, height: 10, color: C.primary }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: FONT }}>
                Research-Driven Innovation
              </span>
            </div>
            <h3 style={{ margin: "0 0 12px", fontSize: "clamp(1.3rem, 5vw, 1.7rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.03em", color: C.textPrimary, fontFamily: FONT }}>
              Your internal R&D bench,{" "}
              <span style={{ background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                on demand.
              </span>
            </h3>
            <p style={{ margin: "0 0 18px", fontSize: 13.5, color: C.textSecondary, lineHeight: 1.8, fontFamily: FONT }}>
              AUROWINX Custom R&D provides semiconductor-grade research rigour with startup-level agility.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {DOMAINS.map((d, i) => (
                <span key={d} style={{ padding: "4px 11px", borderRadius: 50, fontSize: 11, fontWeight: 700, background: C.bgWhite, border: `1px solid ${C.border}`, color: i % 3 === 0 ? C.primary : i % 3 === 1 ? C.secondary : C.accent, fontFamily: FONT }}>
                  {d}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Capabilities carousel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease: EASE }}>
            <CapCarousel inView={inView} />
          </motion.div>

          {/* Process carousel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.26, ease: EASE }}>
            <ProcessCarousel inView={inView} />
          </motion.div>

        </div>

      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        .crd-desktop      { display: block; }
        .crd-mobile-stack { display: none !important; }

        @media (max-width: 1024px) {
          .crd-desktop      { display: none !important; }
          .crd-mobile-stack { display: flex !important; }
          .crd-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .crd-stats > div:nth-child(2) { border-right: none !important; }
          .crd-stats > div:nth-child(1),
          .crd-stats > div:nth-child(2) { border-bottom: 1px solid rgba(99,102,241,0.15) !important; }
        }

        @media (max-width: 640px) {
          #custom-rd { padding: 72px 0 64px !important; }
          .crd-wrap  { padding: 0 16px !important; }
          .crd-stats { grid-template-columns: 1fr 1fr !important; }
        }

        @media (min-width: 1400px) {
          .crd-wrap { max-width: 1320px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}