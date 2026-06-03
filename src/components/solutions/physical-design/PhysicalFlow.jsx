// PhysicalFlow.jsx — Physical Design Flow
// Horizontal timeline: Synthesis → PNR → Sign-Off
// Unique design: floating phase cards, animated connectors, image panels

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Layers, Cpu, Zap, CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const PHASES = [
  {
    id: 0,
    tag: "Phase 01",
    title: "Synthesis",
    subtitle: "RTL → Gate-Level Netlist",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Layers style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    desc: "Transform RTL descriptions into optimized gate-level netlists with full DFT insertion, targeting area, timing and power constraints.",
    points: [
      { label: "Flat Synthesis",        sub: "Single-block full-chip netlist" },
      { label: "Hierarchical Synthesis", sub: "Block-level with top integration" },
      { label: "Logical Synthesis",     sub: "Technology-independent optimization" },
      { label: "Physical Synthesis",    sub: "Placement-aware netlist optimization" },
      { label: "DFT Insertion",         sub: "Scan chain & ATPG hooks" },
    ],
    outputs: ["Generic Netlist", "Low Power Netlist"],
  },
  {
    id: 1,
    tag: "Phase 02",
    title: "Place & Route",
    subtitle: "Netlist → Routed Layout",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Cpu style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    desc: "Full physical implementation from floorplanning through detailed routing — optimized for timing closure, power and signal integrity.",
    points: [
      { label: "Floorplanning & Power Planning", sub: "PDN, macro placement, voltage domains" },
      { label: "Placement Optimization",         sub: "Timing-driven & congestion-aware" },
      { label: "Clock Tree Synthesis",           sub: "CTS with skew optimization" },
      { label: "Routing (Global & Detailed)",    sub: "DRC-clean, SI-aware routing" },
      { label: "Timing Optimization & ECO",      sub: "Hold/setup closure, engineering change orders" },
      { label: "SI/PI & DRC/LVS Clean",          sub: "Signal/power integrity sign-off" },
    ],
    outputs: ["Flat PNR", "Hierarchical PNR"],
  },
  {
    id: 2,
    tag: "Phase 03",
    title: "Sign-Off",
    subtitle: "Layout → Tape-Out",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Zap style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=600&q=80",
    desc: "Comprehensive sign-off analysis covering timing, power, reliability and physical verification — ensuring first-pass tape-out success.",
    points: [
      { label: "STA Sign-Off",         sub: "Multi-corner multi-mode timing closure" },
      { label: "IR Drop & EM/INRUSH",  sub: "Power integrity and electromigration" },
      { label: "LEC / FV",             sub: "Logic equivalence checking" },
      { label: "PAFV & CLP",           sub: "Power-aware formal verification" },
      { label: "DRC / LVS / PV",       sub: "Physical rule checks, layout vs schematic" },
      { label: "Extraction & GDSII",   sub: "RC extraction, tape-out package" },
    ],
    outputs: ["Flat Sign-Off", "Hierarchical Sign-Off"],
  },
];

/* ── Floating background particles ── */
function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map((p, i) => (
        <motion.div key={i}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "rgba(79,70,229,0.25)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Phase tab button ── */
function PhaseTab({ phase, active, onClick, i, inView }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
      onClick={onClick}
      style={{
        flex: 1, padding: "0", border: "none", cursor: "pointer",
        background: "transparent", fontFamily: FONT,
      }}
    >
      <motion.div
        animate={{
          background: active ? phase.color : "#fff",
          boxShadow: active ? `0 12px 40px ${phase.color}30` : C.shadowSm,
          y: active ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 16, padding: "18px 20px",
          border: `1.5px solid ${active ? phase.color : C.borderLight}`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Glow behind icon when active */}
        {active && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 2.5 }}
            style={{
              position: "absolute", width: 60, height: 60,
              borderRadius: "50%", background: "rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: active ? "rgba(255,255,255,0.18)" : phase.bg,
          color: active ? "#fff" : phase.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
        }}>
          {phase.icon}
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: active ? "rgba(255,255,255,0.7)" : C.textMuted }}>
            {phase.tag}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 900, color: active ? "#fff" : C.textPrimary, letterSpacing: "-0.03em", fontFamily: FONT }}>
            {phase.title}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: active ? "rgba(255,255,255,0.65)" : C.textMuted, fontWeight: 500 }}>
            {phase.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ── Connector arrow ── */
function Connector({ color, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        display: "flex", alignItems: "center",
        transformOrigin: "left", flexShrink: 0, marginTop: -8,
      }}
    >
      <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${color}, #7c3aed)` }} />
      <ChevronRight style={{ width: 18, height: 18, color: "#7c3aed", marginLeft: -4 }} />
    </motion.div>
  );
}

/* ── Detail panel ── */
function DetailPanel({ phase, inView }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          gap: 24, alignItems: "start",
        }}
      >
        {/* LEFT — Image + output chips */}
        <div>
          <div style={{
            borderRadius: 20, overflow: "hidden",
            position: "relative", height: 260,
            boxShadow: `0 16px 48px ${phase.color}20`,
          }}>
            <img src={phase.img} alt={phase.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${phase.color}40 0%, rgba(0,0,0,0.45) 100%)`,
            }} />
            {/* Phase label overlay */}
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <span style={{
                padding: "5px 14px", borderRadius: 50,
                background: phase.color, color: "#fff",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                {phase.tag}
              </span>
            </div>
            {/* Title overlay */}
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", fontFamily: FONT }}>
                {phase.title}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                {phase.subtitle}
              </p>
            </div>
          </div>

          {/* Output chips */}
          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            {phase.outputs.map((out, i) => (
              <motion.div
                key={out}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  flex: 1, padding: "12px 14px", borderRadius: 12,
                  background: phase.bg, border: `1.5px solid ${phase.color}30`,
                  textAlign: "center",
                }}
              >
                <ArrowRight style={{ width: 14, height: 14, color: phase.color, marginBottom: 4 }} />
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: phase.color, letterSpacing: "-0.01em" }}>{out}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — Description + points */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "24px 22px",
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        }}>
          {/* Accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${phase.color}, ${phase.color}40)`, borderRadius: 2, marginBottom: 18 }} />

          <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.85, margin: "0 0 20px" }}>
            {phase.desc}
          </p>

          {/* Points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {phase.points.map((pt, j) => (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + j * 0.07, ease: EASE }}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "9px 12px", borderRadius: 10,
                  background: j % 2 === 0 ? phase.bg : "#fff",
                  border: `1px solid ${phase.color}15`,
                }}
              >
                <CheckCircle2 style={{ width: 14, height: 14, color: phase.color, flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: C.textPrimary }}>{pt.label}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 11, color: C.textMuted }}>{pt.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PhysicalFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "64px 48px 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Bg particles */}
      <Particles />

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Our Flow</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Physical Design Expertise
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Three-phase flow from RTL to GDSII — click each phase to explore what we deliver.
          </p>
        </motion.div>

        {/* Phase tabs with connectors */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          {PHASES.map((phase, i) => (
            <div key={phase.id} style={{ display: "flex", alignItems: "center", flex: i < 2 ? "1 1 0" : "1 1 0", gap: 8 }}>
              <PhaseTab phase={phase} active={active === i} onClick={() => setActive(i)} i={i} inView={inView} />
              {i < PHASES.length - 1 && (
                <Connector color={phase.color} inView={inView} delay={0.4 + i * 0.15} />
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <DetailPanel phase={PHASES[active]} inView={inView} />

      </div>
    </section>
  );
}