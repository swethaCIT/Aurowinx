// SDTicker.jsx — ASIC Page
// Premium scrolling ticker — two rows opposite directions
// Glassmorphism strip, indigo palette, no plain cards

import { motion } from "framer-motion";
import { FONT, C } from "././theme";

const ROW1 = [
  { text: "RTL to GDSII",         dot: "#4f46e5" },
  { text: "UVM Verification",      dot: "#7c3aed" },
  { text: "Formal Property Check", dot: "#0891b2" },
  { text: "ATPG & DFT",            dot: "#059669" },
  { text: "Physical Design",       dot: "#4f46e5" },
  { text: "STA Sign-Off",          dot: "#7c3aed" },
  { text: "DRC / LVS Clean",       dot: "#0891b2" },
  { text: "FinFET 5nm",            dot: "#059669" },
  { text: "CDC Analysis",          dot: "#4f46e5" },
  { text: "Emulation & Prototyping", dot: "#7c3aed" },
  { text: "Coverage Closure",      dot: "#0891b2" },
  { text: "Tape-Out Ready",        dot: "#059669" },
];

const ROW2 = [
  { text: "Power Integrity",       dot: "#d97706" },
  { text: "IR Drop Analysis",      dot: "#dc2626" },
  { text: "Scan Insertion",        dot: "#7c3aed" },
  { text: "Hierarchical PNR",      dot: "#4f46e5" },
  { text: "SystemVerilog Assertions", dot: "#0891b2" },
  { text: "Multi-Voltage Design",  dot: "#059669" },
  { text: "MBIST & Hard Repair",   dot: "#d97706" },
  { text: "LEC / Equivalence",     dot: "#dc2626" },
  { text: "GDSII Generation",      dot: "#4f46e5" },
  { text: "Silicon Bring-Up",      dot: "#7c3aed" },
  { text: "ATE Handoff",           dot: "#0891b2" },
  { text: "MCMM Closure",          dot: "#059669" },
];

/* ── Single ticker item ── */
function TickerItem({ item }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "8px 22px", marginRight: 10,
      borderRadius: 50,
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(8px)",
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {/* Pulsing dot */}
      <motion.span
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 7, height: 7, borderRadius: "50%",
          background: item.dot, display: "inline-block", flexShrink: 0,
          boxShadow: `0 0 8px ${item.dot}90`,
        }}
      />
      <span style={{
        fontSize: "clamp(12px, 1.5vw, 14px)",
        fontWeight: 600, color: "rgba(255,255,255,0.88)",
        fontFamily: FONT, letterSpacing: "0.02em",
      }}>
        {item.text}
      </span>
    </div>
  );
}

/* ── Scrolling row ── */
function TickerRow({ items, direction = "left", speed = 35 }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];
  const totalItems = items.length;
  // Approx px per item ~180px
  const distance = totalItems * 185;

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: "linear-gradient(90deg, rgba(10,5,30,0.95), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: "linear-gradient(270deg, rgba(10,5,30,0.95), transparent)",
        pointerEvents: "none",
      }} />

      <motion.div
        animate={{ x: direction === "left" ? [-distance, 0] : [0, -distance] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SDTicker() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #07041a 0%, #0d0a2e 50%, #07041a 100%)",
      padding: "40px 0",
      fontFamily: FONT,
    }}>

      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", width: 600, height: 200,
        top: "50%", left: "20%", transform: "translateY(-50%)",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 150,
        top: "50%", right: "10%", transform: "translateY(-50%)",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      {/* Top divider line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(124,58,237,0.5), transparent)",
      }} />
      {/* Bottom divider line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(124,58,237,0.5), transparent)",
      }} />

      {/* Center label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10, pointerEvents: "none",
        }}
      >
        <div style={{
          padding: "8px 20px", borderRadius: 50,
          background: "rgba(79,70,229,0.25)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(99,102,241,0.45)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", display: "inline-block" }}
          />
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: "#a5b4fc", letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            ASIC Services
          </span>
        </div>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div style={{ marginBottom: 12 }}>
        <TickerRow items={ROW1} direction="left" speed={40} />
      </div>

      {/* Row 2 — scrolls right */}
      <TickerRow items={ROW2} direction="right" speed={38} />

    </section>
  );
}