// ToolsSection.jsx
// AurowinX — Tools & Capabilities
// Premium staggered spring animation on both columns

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const TOOL_CATEGORIES = [
  {
    label: "Simulators",
    color: "#4f46e5", bg: "#eef2ff",
    glow: { base: "#4f46e5", ambient: "#4f46e5" },
    tools: ["Synopsys VCS", "Cadence Xcelium", "Siemens Questa", "Riviera-PRO", "Mentor VSim"],
  },
  {
    label: "Debug & Waveform",
    color: "#7c3aed", bg: "#f5f3ff",
    glow: { base: "#7c3aed", ambient: "#7c3aed" },
    tools: ["Verdi", "SimVision", "DVE", "GTKWave"],
  },
  {
    label: "Formal Verification",
    color: "#0891b2", bg: "#ecfeff",
    glow: { base: "#0891b2", ambient: "#0891b2" },
    tools: ["JasperGold", "SymbiYosys", "VC Formal", "Z01X", "ProofCore", "Conformal"],
  },
  {
    label: "Coverage & Closure",
    color: "#059669", bg: "#ecfdf5",
    glow: { base: "#059669", ambient: "#059669" },
    tools: ["Cadence vManager", "SpyGlass", "Synopsys Verdi Coverage"],
  },
  {
    label: "CDC / RDC",
    color: "#d97706", bg: "#fffbeb",
    glow: { base: "#d97706", ambient: "#d97706" },
    tools: ["SpyGlass CDC", "Questa CDC", "JasperGold CDC"],
  },
  {
    label: "Methodology",
    color: "#dc2626", bg: "#fef2f2",
    glow: { base: "#dc2626", ambient: "#dc2626" },
    tools: ["UVM 1.2", "OVM", "VMM", "SystemVerilog", "SVA"],
  },
];

const CAPABILITIES = [
  "UVM Testbench Development",
  "Constrained Random Verification",
  "Assertion Based Verification (SVA)",
  "Functional & Code Coverage",
  "Clock Domain Crossing (CDC)",
  "Formal Property Verification",
  "Gate-Level Simulation (GLS)",
  "Hardware Emulation & Prototyping",
  "Regression Management",
  "Co-Verification (HW/SW)",
];

/* ─── Spring config — feels snappy but not janky ── */
const SPRING = { type: "spring", stiffness: 260, damping: 22 };

/* ─── TOOL CHIP ──────────────────────────────── */
function ToolChip({ tool, i, inView, color, bg }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: 0.08 + i * 0.035 }}
      whileHover={{ scale: 1.07, y: -2, transition: { duration: 0.15 } }}
      style={{
        display: "inline-block",
        padding: "5px 12px",
        borderRadius: 50,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${color}28`,
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      {tool}
    </motion.span>
  );
}

/* ─── CATEGORY CARD ──────────────────────────── */
function CategoryCard({ cat, ci, inView }) {
  const { color, bg, glow, label, tools } = cat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: ci * 0.08 }}
      whileHover="glowing"
      style={{ position: "relative" }}
    >
      {/* Glow ring on hover */}
      <motion.div
        variants={{ glowing: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 14,
          pointerEvents: "none",
          boxShadow: `0 0 0 1.5px ${glow.base}, 0 0 28px 4px ${glow.ambient}44, 0 0 56px 10px ${glow.ambient}1a`,
          zIndex: 0,
        }}
      />

      {/* Ambient blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 90, height: 90, borderRadius: "50%",
        background: `${color}12`, filter: "blur(22px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Card */}
      <motion.div
        variants={{ glowing: { y: -4, transition: { ...SPRING } } }}
        style={{
          background: "#fff", borderRadius: 14, padding: "16px 18px",
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowSm,
          position: "relative", zIndex: 1, overflow: "hidden",
        }}
      >
        {/* Accent bar */}
        <motion.div
          variants={{ glowing: { scaleY: 1, opacity: 1 } }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute", left: 0, top: "20%", bottom: "20%",
            width: 3, borderRadius: "0 3px 3px 0",
            background: `linear-gradient(180deg, ${color}, ${color}66)`,
            transformOrigin: "top",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <motion.div
            variants={{ glowing: { scale: 1.3, boxShadow: `0 0 8px 2px ${color}55` } }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>

        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {tools.map((tool, ti) => (
            <ToolChip key={tool} tool={tool} i={ci * 6 + ti} inView={inView} color={color} bg={bg} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CAPABILITY ROW ─────────────────────────── */
function CapabilityRow({ cap, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
      whileHover={{ x: 5, transition: { duration: 0.15 } }}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "9px 12px", borderRadius: 10,
        background: i % 2 === 0 ? C.bgAccent : "#fff",
        border: `1px solid ${C.borderLight}`,
        cursor: "default",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ ...SPRING, delay: 0.18 + i * 0.07 }}
      >
        <CheckCircle2 style={{ width: 14, height: 14, color: C.primary, flexShrink: 0, display: "block" }} />
      </motion.div>
      <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{cap}</span>
    </motion.div>
  );
}

/* ─── MAIN ───────────────────────────────────── */
export default function ToolsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "64px 48px 56px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...SPRING, delay: 0 }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Tool Ecosystem</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Tools & Capabilities
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Industry-standard EDA tools combined with deep methodology expertise across every verification domain.
          </p>
        </motion.div>

        {/* 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "stretch" }}>

          {/* LEFT — fills full grid row height, cards pushed to top */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignSelf: "stretch" }}>
            {TOOL_CATEGORIES.map((cat, ci) => (
              <CategoryCard key={cat.label} cat={cat} ci={ci} inView={inView} />
            ))}
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.05 }}
            style={{
              background: "#fff", borderRadius: 20, padding: "24px 20px",
              border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
              display: "flex", flexDirection: "column",
              alignSelf: "stretch",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 20, height: 2, background: C.primary, borderRadius: 1 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: "0.16em", textTransform: "uppercase" }}>What We Do</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 900, color: C.textPrimary, margin: 0, letterSpacing: "-0.03em", fontFamily: FONT }}>
                Verification Capabilities
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
              {CAPABILITIES.map((cap, i) => (
                <CapabilityRow key={cap} cap={cap} i={i} inView={inView} />
              ))}
            </div>

            {/* Stat pills — bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...SPRING, delay: 0.1 + CAPABILITIES.length * 0.07 }}
              style={{ display: "flex", gap: 8, marginTop: 14 }}
            >
              <span style={{
                flex: 1, textAlign: "center",
                padding: "8px 0", borderRadius: 10,
                background: C.gradPrimary,
                fontSize: 12, fontWeight: 700, color: "#fff",
                letterSpacing: "0.02em",
              }}>16+ Tools</span>
              <span style={{
                flex: 1, textAlign: "center",
                padding: "8px 0", borderRadius: 10,
                background: C.gradPrimary,
                fontSize: 12, fontWeight: 700, color: "#fff",
                letterSpacing: "0.02em",
              }}>10+ Capabilities</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}