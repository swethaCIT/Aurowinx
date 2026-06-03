// TechNodes.jsx — Physical Design Page
// AurowinX — Process Nodes & Foundry Support
// Light theme, indigo/purple palette, tight spacing, rich animations

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Cpu, Zap, Shield, Layers } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const FOUNDRIES = [
  {
    name: "TSMC",
    color: "#4f46e5",
    bg: "#eef2ff",
    nodes: ["5nm", "7nm", "12nm", "16nm", "28nm", "40nm", "65nm"],
    desc: "Industry-leading foundry with advanced FinFET and 2.5D/3D integration support.",
    icon: <Cpu style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    highlight: "5nm FinFET",
  },
  {
    name: "Samsung",
    color: "#7c3aed",
    bg: "#f5f3ff",
    nodes: ["5nm", "8nm", "14nm", "28nm", "65nm"],
    desc: "Advanced GAA and FinFET processes with robust multi-patterning support.",
    icon: <Layers style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    highlight: "GAA 3nm",
  },
  {
    name: "GlobalFoundries",
    color: "#0891b2",
    bg: "#ecfeff",
    nodes: ["12nm", "14nm", "22nm", "28nm", "55nm", "130nm", "180nm"],
    desc: "Specialised in RF, embedded memory and automotive-grade processes.",
    icon: <Shield style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=600&q=80",
    highlight: "22FDX FD-SOI",
  },
  {
    name: "UMC",
    color: "#059669",
    bg: "#ecfdf5",
    nodes: ["28nm", "40nm", "55nm", "65nm", "90nm", "130nm", "180nm"],
    desc: "Cost-effective mature nodes for IoT, consumer and industrial applications.",
    icon: <Zap style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    highlight: "28nm HPC+",
  },
];

const CAPABILITIES = [
  { label: "Flat PNR Flow",          color: "#4f46e5" },
  { label: "Hierarchical PNR Flow",  color: "#7c3aed" },
  { label: "Multi-Patterning",       color: "#0891b2" },
  { label: "Flip Chip",              color: "#059669" },
  { label: "Wire Bond",              color: "#d97706" },
  { label: "Low Power Design",       color: "#dc2626" },
  { label: "FinFET / GAA Support",   color: "#4f46e5" },
  { label: "2.5D / 3D Integration",  color: "#7c3aed" },
];

/* ── Foundry card ── */
function FoundryCard({ f, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -6, boxShadow: `0 20px 52px ${f.color}18` }}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        cursor: "default", transition: "box-shadow 0.3s",
      }}
    >
      {/* Image header */}
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <motion.img
          src={f.img} alt={f.name}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${f.color}60 0%, rgba(0,0,0,0.40) 100%)`,
        }} />
        {/* Foundry name on image */}
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.04em" }}>
            {f.name}
          </p>
          <span style={{
            padding: "4px 12px", borderRadius: 50,
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            color: "#fff", fontSize: 10, fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.25)",
            letterSpacing: "0.08em",
          }}>
            {f.highlight}
          </span>
        </div>
        {/* Top color bar */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${f.color}, ${f.color}60)`,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "18px 18px 20px" }}>
        <p style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.75, margin: "0 0 16px" }}>
          {f.desc}
        </p>

        {/* Node chips */}
        <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 10px" }}>
          Supported Nodes
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {f.nodes.map((node, j) => (
            <motion.span
              key={node}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.08 + j * 0.04, ease: EASE }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: "4px 11px", borderRadius: 50,
                background: f.bg, color: f.color,
                fontSize: 11, fontWeight: 700,
                border: `1px solid ${f.color}25`,
                cursor: "default",
              }}
            >
              {node}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function TechNodes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "64px 48px 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 300, top: "-5%", right: "5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 250, bottom: "0%", left: "0%", background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Foundry Support</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Process Nodes & Foundries
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Silicon-proven physical design across leading foundries — from advanced 5nm FinFET down to mature 180nm nodes.
          </p>
        </motion.div>

        {/* Foundry cards — 4 col */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 36 }}>
          {FOUNDRIES.map((f, i) => (
            <FoundryCard key={f.name} f={f} i={i} inView={inView} />
          ))}
        </div>

        {/* Capabilities strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          style={{
            background: "#fff", borderRadius: 18, padding: "22px 28px",
            border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flexShrink: 0 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: C.textPrimary, fontFamily: FONT }}>
                PNR Capabilities
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: C.textMuted }}>
                Supported flows & techniques
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1, justifyContent: "flex-end" }}>
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 + i * 0.05, ease: EASE }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 50,
                    background: C.bgAccent, border: `1px solid ${C.border}`,
                    cursor: "default",
                  }}
                >
                  <CheckCircle2 style={{ width: 12, height: 12, color: cap.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600 }}>{cap.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}