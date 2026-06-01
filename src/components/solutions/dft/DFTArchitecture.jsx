// DFTArchitecture.jsx
// AurowinX — DFT Services: Architecture, Pre-Silicon, Techniques, Post-Silicon
// Light & professional, indigo accent, tight spacing

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Cpu, Layers, Shield, Zap, Target, GitBranch, Activity } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const SERVICES = [
  {
    tag: "DFT Architecture",
    title: "Architecture & Planning",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Target style={{ width: 22, height: 22 }} />,
    desc: "Strategic DFT architecture definition aligned with design complexity, test coverage goals and ATE constraints.",
    points: [
      "DFT architecture and SoC DFT partitioning",
      "Early-stage planning and feasibility analysis",
      "Test mode definition and control signal planning",
      "DFT rule definition and sign-off criteria",
    ],
  },
  {
    tag: "Pre Silicon Services",
    title: "Pre-Silicon Services",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Layers style={{ width: 22, height: 22 }} />,
    desc: "Complete pre-silicon DFT implementation from scan insertion to pattern generation for maximum fault coverage.",
    points: [
      "DFT IP Insertion & Scan Stitching",
      "Pattern Generation (Stuck-At & At-Speed)",
      "ATPG pattern simulation and validation",
      "Scan chain compression and optimization",
    ],
  },
  {
    tag: "DFT Techniques Specialty",
    title: "DFT Techniques",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Cpu style={{ width: 22, height: 22 }} />,
    desc: "Specialized DFT techniques covering structural, memory and logic built-in self-test methodologies.",
    points: [
      "Boundary Scan (IEEE 1149.1 JTAG)",
      "MBIST — Memory Built-In Self Test",
      "Hard Repair for embedded memories",
      "LBIST — Logic Built-In Self Test",
      "Scan ATPG (Stuck-At & At-Speed)",
      "Compression techniques (EDT/OPMISR)",
    ],
  },
  {
    tag: "Post Silicon Services",
    title: "Post-Silicon Services",
    color: "#059669",
    bg: "#ecfdf5",
    icon: <Shield style={{ width: 22, height: 22 }} />,
    desc: "Post-silicon validation and ATE handoff ensuring test patterns translate accurately to production test.",
    points: [
      "ATE Handoff and pattern translation",
      "Post Silicon Validation",
      "Silicon debug and failure analysis",
      "Test coverage correlation and sign-off",
    ],
  },
];

function ServiceCard({ svc, i, inView, active, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
      onClick={onClick}
      whileHover={{ y: -5 }}
      style={{
        background: active ? svc.color : "#fff",
        borderRadius: 16, padding: "20px 18px",
        border: `1.5px solid ${active ? svc.color : C.borderLight}`,
        boxShadow: active ? `0 16px 40px ${svc.color}30` : C.shadowSm,
        cursor: "pointer", overflow: "hidden", position: "relative",
        transition: "all 0.25s",
      }}
    >
      {/* Top bar */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: active ? "rgba(255,255,255,0.4)" : `linear-gradient(90deg, ${svc.color}, ${svc.color}55)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 14,
        background: active ? "rgba(255,255,255,0.18)" : svc.bg,
        color: active ? "#fff" : svc.color,
        border: `1px solid ${active ? "rgba(255,255,255,0.25)" : svc.color + "25"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {svc.icon}
      </div>

      {/* Tag */}
      <span style={{
        display: "inline-block", marginBottom: 8,
        padding: "3px 10px", borderRadius: 50,
        background: active ? "rgba(255,255,255,0.18)" : svc.bg,
        color: active ? "#fff" : svc.color,
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        border: `1px solid ${active ? "rgba(255,255,255,0.25)" : svc.color + "20"}`,
      }}>
        {svc.tag}
      </span>

      <p style={{
        fontWeight: 800, fontSize: 14,
        color: active ? "#fff" : C.textPrimary,
        margin: "0 0 6px", fontFamily: FONT, letterSpacing: "-0.02em",
      }}>
        {svc.title}
      </p>
      <p style={{
        fontSize: 12, lineHeight: 1.65, margin: 0,
        color: active ? "rgba(255,255,255,0.78)" : C.textSecondary,
      }}>
        {svc.desc}
      </p>
    </motion.div>
  );
}

export default function DFTArchitecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const current = SERVICES[active];

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

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>DFT Services</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900,
            color: C.textPrimary, margin: "0 0 10px",
            letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            DFT Expertise & Services
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Full-spectrum DFT from early architecture to post-silicon sign-off — maximizing fault coverage at every stage.
          </p>
        </motion.div>

        {/* 2-col layout — cards left, detail right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 24, alignItems: "start" }}>

          {/* LEFT — 4 service cards (2x2 grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {SERVICES.map((svc, i) => (
              <ServiceCard
                key={svc.tag} svc={svc} i={i} inView={inView}
                active={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* RIGHT — Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              background: "#fff", borderRadius: 20, padding: "28px 24px",
              border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
              position: "sticky", top: 100,
            }}
          >
            {/* Tag + icon row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: current.bg, color: current.color,
                border: `1px solid ${current.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {current.icon}
              </div>
              <div>
                <span style={{
                  display: "inline-block", marginBottom: 4,
                  padding: "3px 10px", borderRadius: 50,
                  background: current.bg, color: current.color,
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  border: `1px solid ${current.color}20`,
                }}>
                  {current.tag}
                </span>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 17, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.03em" }}>
                  {current.title}
                </p>
              </div>
            </div>

            {/* Accent line */}
            <div style={{ height: 2, background: `linear-gradient(90deg, ${current.color}, ${current.color}30)`, borderRadius: 1, marginBottom: 18 }} />

            {/* Description */}
            <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.8, margin: "0 0 22px" }}>
              {current.desc}
            </p>

            {/* Points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {current.points.map((pt, j) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: j % 2 === 0 ? current.bg : "#fff",
                    border: `1px solid ${current.color}15`,
                  }}
                >
                  <CheckCircle2 style={{ width: 14, height: 14, color: current.color, flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Navigation dots */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
              {SERVICES.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  animate={{
                    width: active === i ? 24 : 8,
                    background: active === i ? s.color : C.border,
                  }}
                  style={{ height: 8, borderRadius: 4, border: "none", cursor: "pointer", padding: 0 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}