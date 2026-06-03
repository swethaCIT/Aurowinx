// DFTArchitecture.jsx
// AurowinX — DFT Services: Pill nav + full-width carousel, arrows outside card

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Layers, Cpu, Shield, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const SERVICES = [
  {
    num: "01",
    tag: "DFT Architecture",
    title: "Architecture & Planning",
    color: "#4f46e5",
    bg: "#eef2ff",
    Icon: Target,
    desc: "Strategic DFT architecture definition aligned with design complexity, test coverage goals and ATE constraints.",
    points: [
      "DFT architecture and SoC DFT partitioning",
      "Early-stage planning and feasibility analysis",
      "Test mode definition and control signal planning",
      "DFT rule definition and sign-off criteria",
    ],
  },
  {
    num: "02",
    tag: "Pre-Silicon",
    title: "Pre-Silicon Services",
    color: "#7c3aed",
    bg: "#f5f3ff",
    Icon: Layers,
    desc: "Complete pre-silicon DFT implementation from scan insertion to pattern generation for maximum fault coverage.",
    points: [
      "DFT IP Insertion & Scan Stitching",
      "Pattern Generation (Stuck-At & At-Speed)",
      "ATPG pattern simulation and validation",
      "Scan chain compression and optimization",
    ],
  },
  {
    num: "03",
    tag: "Techniques",
    title: "DFT Techniques",
    color: "#0891b2",
    bg: "#ecfeff",
    Icon: Cpu,
    desc: "Specialized DFT techniques covering structural, memory and logic built-in self-test methodologies.",
    points: [
      "Boundary Scan (IEEE 1149.1 JTAG)",
      "MBIST — Memory Built-In Self Test",
      "Hard Repair for embedded memories",
      "LBIST — Logic Built-In Self Test",
      "Scan ATPG (Stuck-At & At-Speed)",
      "Compression (EDT / OPMISR)",
    ],
  },
  {
    num: "04",
    tag: "Post-Silicon",
    title: "Post-Silicon Services",
    color: "#059669",
    bg: "#ecfdf5",
    Icon: Shield,
    desc: "Post-silicon validation and ATE handoff ensuring test patterns translate accurately to production test.",
    points: [
      "ATE Handoff and pattern translation",
      "Post Silicon Validation",
      "Silicon debug and failure analysis",
      "Test coverage correlation and sign-off",
    ],
  },
];

const arrowBtn = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  border: `1px solid`,
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "background 0.15s, opacity 0.15s",
};

export default function DFTArchitecture() {
  const [active, setActive] = useState(0);
  const N = SERVICES.length;

  const go = useCallback((i) => {
    if (i < 0 || i >= N) return;
    setActive(i);
  }, [N]);

  const svc = SERVICES[active];

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "64px 48px 72px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>
              DFT Services
            </span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em" }}>
            DFT Expertise &amp; Services
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Full-spectrum DFT from early architecture to post-silicon sign-off — maximising fault coverage at every stage.
          </p>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {SERVICES.map((s, i) => (
            <button
              key={s.num}
              onClick={() => go(i)}
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "7px 18px",
                borderRadius: 100,
                border: `1.5px solid ${active === i ? s.color : "#e2e8f0"}`,
                background: active === i ? s.color : "#fff",
                color: active === i ? "#fff" : C.textSecondary,
                cursor: "pointer",
                transition: "all 0.22s",
                whiteSpace: "nowrap",
              }}
            >
              {s.num} — {s.tag}
            </button>
          ))}
        </div>

        {/* Carousel row: left arrow | card | right arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

          {/* Left arrow */}
          <button
            onClick={() => go(active - 1)}
            disabled={active === 0}
            style={{
              ...arrowBtn,
              borderColor: active === 0 ? "#e2e8f0" : svc.color + "60",
              color: active === 0 ? "#cbd5e1" : svc.color,
              opacity: active === 0 ? 0.35 : 1,
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Card */}
          <div style={{ flex: 1, overflow: "hidden", borderRadius: 20 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  border: `1.5px solid ${svc.color}30`,
                  padding: "28px 28px 26px",
                  boxShadow: `0 12px 40px ${svc.color}15, 0 2px 8px rgba(0,0,0,0.04)`,
                  fontFamily: FONT,
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  height: 3, borderRadius: 2,
                  background: `linear-gradient(90deg, ${svc.color}, ${svc.color}40)`,
                  marginBottom: 22,
                }} />

                {/* Icon + tag + title */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: svc.bg, color: svc.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${svc.color}20`, flexShrink: 0,
                  }}>
                    <svc.Icon size={22} />
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "monospace", fontSize: 9,
                      textTransform: "uppercase", letterSpacing: "0.15em",
                      padding: "2px 10px", borderRadius: 3,
                      background: svc.bg, color: svc.color,
                      display: "inline-block", marginBottom: 6,
                    }}>
                      {svc.tag}
                    </span>
                    <p style={{ fontSize: 20, fontWeight: 900, color: C.textPrimary, margin: 0, letterSpacing: "-0.03em" }}>
                      {svc.title}
                    </p>
                  </div>

                  {/* Counter top-right */}
                  <span style={{
                    marginLeft: "auto", fontFamily: "monospace",
                    fontSize: 11, color: C.textSecondary, letterSpacing: "0.1em",
                  }}>
                    {svc.num} / 0{N}
                  </span>
                </div>

                {/* Desc */}
                <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.8, marginBottom: 22, maxWidth: 680 }}>
                  {svc.desc}
                </p>

                {/* Points grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 10,
                }}>
                  {svc.points.map((pt, j) => (
                    <motion.div
                      key={pt}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.06, ease: EASE }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        padding: "10px 14px", borderRadius: 10,
                        background: j % 2 === 0 ? svc.bg : "#fff",
                        border: `1px solid ${svc.color}15`,
                      }}
                    >
                      <CheckCircle2 size={14} style={{ color: svc.color, flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>
                        {pt}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(active + 1)}
            disabled={active === N - 1}
            style={{
              ...arrowBtn,
              borderColor: active === N - 1 ? "#e2e8f0" : svc.color + "60",
              color: active === N - 1 ? "#cbd5e1" : svc.color,
              opacity: active === N - 1 ? 0.35 : 1,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}