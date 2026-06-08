// SDCapabilities.jsx — AurowinX ASIC Capabilities
// Redesign: editorial process-strip + expandable spotlight panel
// No stock images. Typography + geometry do the visual work.
// Theme: C, FONT, EASE from ./theme — indigo palette, light bg

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2, Layers, Shield, Cpu, Target, Zap,
  ArrowRight, CheckCircle2, ChevronDown,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const CAPS = [
  {
    id: 0,
    index: "01",
    title: "RTL Design & Verification",
    short: "UVM · Formal · Coverage",
    desc: "End-to-end RTL design in SystemVerilog with UVM-based verification, formal property checking and 99%+ coverage closure across all verification dimensions.",
    tags: ["SystemVerilog", "UVM", "Formal", "SVA", "Coverage"],
    points: [
      "UVM testbench architecture & env build-out",
      "Constrained random + directed testing strategies",
      "Formal property verification (JasperGold / VC Formal)",
      "CDC, RDC & lint sign-off",
      "Functional, code & toggle coverage closure",
    ],
    icon: Code2,
    // Geometric accent: circuit-trace motif
    accentPath: "M0 40 L24 40 L24 20 L48 20 L48 40 L72 40",
    accentPath2: "M0 56 L16 56 L16 36 L40 36",
    stat: "99%+", statLabel: "Coverage achieved",
  },
  {
    id: 1,
    index: "02",
    title: "Logic Synthesis",
    short: "Synopsys DC · Cadence Genus · LEC",
    desc: "Flat & hierarchical synthesis with multi-corner timing constraints, DFT hook insertion and power optimization across all major foundry PDKs.",
    tags: ["Synopsys DC", "Cadence Genus", "LEC", "SDC", "Multi-corner"],
    points: [
      "Flat & hierarchical synthesis flows",
      "MCMM timing constraint development",
      "DFT hook & scan insertion",
      "Power-aware synthesis & clock gating",
      "Logical equivalence checking (LEC)",
    ],
    icon: Layers,
    accentPath: "M0 32 L20 32 L20 16 L60 16 L60 32 L80 32",
    accentPath2: "M10 48 L10 32",
    stat: "5nm–180nm", statLabel: "Node coverage",
  },
  {
    id: 2,
    index: "03",
    title: "Design for Testability",
    short: "ATPG · MBIST · BSCAN · LBIST",
    desc: "Full DFT implementation — scan insertion, MBIST, ATPG pattern generation and complete ATE handoff targeting 95%+ fault coverage at every node.",
    tags: ["ATPG", "MBIST", "BSCAN", "LBIST", "EDT"],
    points: [
      "Full-chip scan stitching & EDT compression",
      "MBIST architecture & hard repair flows",
      "ATPG pattern generation & simulation",
      "IEEE 1149.1 JTAG & boundary scan",
      "ATE interface & pattern handoff",
    ],
    icon: Shield,
    accentPath: "M8 20 L8 60 M24 20 L24 60 M40 20 L40 60 M56 20 L56 60",
    accentPath2: "M0 40 L64 40",
    stat: "95%+", statLabel: "Fault coverage",
  },
  {
    id: 3,
    index: "04",
    title: "Physical Design",
    short: "Innovus · ICC2 · PrimeTime · Calibre",
    desc: "Full RTL-to-GDSII — floorplanning, placement, CTS, routing, SI/PI analysis and DRC-clean tape-out sign-off from 5nm to 180nm process nodes.",
    tags: ["Innovus", "ICC2", "PrimeTime", "Calibre", "RedHawk"],
    points: [
      "Floorplanning, power planning & PDN design",
      "Multi-patterning aware place & route",
      "Clock tree synthesis & skew optimization",
      "Signal integrity & power integrity analysis",
      "DRC/LVS clean GDSII tape-out",
    ],
    icon: Cpu,
    accentPath: "M4 4 L76 4 L76 76 L4 76 Z M16 16 L64 16 L64 64 L16 64 Z",
    accentPath2: "M16 40 L64 40 M40 16 L40 64",
    stat: "180+", statLabel: "Tape-outs delivered",
  },
  {
    id: 4,
    index: "05",
    title: "Sign-Off & Validation",
    short: "STA · DRC/LVS · EM/IR · Post-silicon",
    desc: "MCMM STA, DRC/LVS, LEC, IR-drop and EM analysis through to post-silicon bring-up — complete sign-off from netlist to production qualification.",
    tags: ["STA", "DRC/LVS", "LEC", "EM/IR", "MCMM"],
    points: [
      "MCMM timing closure (setup, hold, DCD/OCV)",
      "Full physical verification (DRC, LVS, ERC)",
      "IR-drop & electromigration sign-off",
      "Post-layout parasitic extraction & back-annotation",
      "Silicon bring-up & characterisation support",
    ],
    icon: Target,
    accentPath: "M40 8 A32 32 0 1 1 39.9 8",
    accentPath2: "M40 20 A20 20 0 1 1 39.9 20 M40 32 A8 8 0 1 1 39.9 32",
    stat: "Zero", statLabel: "Escape policy",
  },
  {
    id: 5,
    index: "06",
    title: "Low Power Design",
    short: "UPF · CPF · Multi-VDD · DVFS",
    desc: "Multi-voltage domain design, power gating, retention flop insertion and UPF-based power intent verification for mobile, wearable and data-centre ASICs.",
    tags: ["UPF", "CPF", "Multi-VDD", "DVFS", "Retention"],
    points: [
      "UPF/CPF power intent specification & verification",
      "Multi-voltage domain partitioning",
      "Power gating, isolation & level-shifting",
      "Retention flop strategy & always-on logic",
      "Dynamic voltage & frequency scaling (DVFS)",
    ],
    icon: Zap,
    accentPath: "M44 8 L28 40 L40 40 L28 72 L56 32 L44 32 Z",
    accentPath2: "",
    stat: "Multi-VDD", statLabel: "Domain expertise",
  },
];

// ─────────────────────────────────────────────
// Geometric SVG accent — replaces stock images
// ─────────────────────────────────────────────
function CapAccent({ cap, active }) {
  const color = active ? C.primary : C.borderLight;
  const size = 80;
  return (
    <svg
      width={size} height={size} viewBox="0 0 80 80"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0, opacity: active ? 1 : 0.5, transition: "opacity 0.4s" }}
    >
      {cap.accentPath && (
        <motion.path
          d={cap.accentPath}
          stroke={color}
          strokeWidth={active ? 2 : 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0.4 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      )}
      {cap.accentPath2 && (
        <motion.path
          d={cap.accentPath2}
          stroke={active ? C.secondary : `${C.borderLight}`}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0.3 }}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
        />
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Left strip — capability selector rows
// ─────────────────────────────────────────────
function CapRow({ cap, active, onClick, inView }) {
  const isActive = active === cap.id;
  const Icon = cap.icon;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: cap.id * 0.07, ease: EASE }}
      onClick={onClick}
      style={{
        all: "unset",
        display: "flex",
        alignItems: "center",
        gap: 0,
        width: "100%",
        cursor: "pointer",
        position: "relative",
        borderBottom: `1px solid ${C.borderLight}`,
      }}
    >
      {/* Active left bar */}
      <motion.div
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: C.gradPrimary,
          borderRadius: "0 2px 2px 0",
          transformOrigin: "top",
          flexShrink: 0,
        }}
      />

      {/* Row body */}
      <motion.div
        animate={{
          backgroundColor: isActive ? C.bgAccent : "#fff",
          paddingLeft: isActive ? 24 : 16,
        }}
        transition={{ duration: 0.25 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          width: "100%",
          padding: "18px 20px 18px 16px",
        }}
      >
        {/* Index */}
        <span style={{
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 700,
          color: isActive ? C.primary : C.textMuted,
          letterSpacing: "0.1em",
          width: 24,
          flexShrink: 0,
          transition: "color 0.25s",
        }}>
          {cap.index}
        </span>

        {/* Icon bubble */}
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: isActive ? C.accentSoft : C.bgSoft,
          color: isActive ? C.primary : C.textMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.25s, color 0.25s",
          border: isActive ? `1px solid ${C.border}` : "1px solid transparent",
        }}>
          <Icon size={16} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <p style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 800,
            color: isActive ? C.textPrimary : C.textSecondary,
            letterSpacing: "-0.02em",
            transition: "color 0.25s",
          }}>
            {cap.title}
          </p>
          <p style={{
            margin: "2px 0 0",
            fontSize: 11,
            color: C.textMuted,
            fontWeight: 500,
          }}>
            {cap.short}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: C.primary, flexShrink: 0 }}
        >
          <ArrowRight size={14} />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// Right spotlight — detail view
// ─────────────────────────────────────────────
function Spotlight({ cap, inView }) {
  const Icon = cap.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cap.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.38, ease: EASE }}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          alignSelf: "stretch",
          background: "#fff",
          borderRadius: 24,
          border: `1.5px solid ${C.borderLight}`,
          boxShadow: C.shadowLg,
          overflow: "hidden",
          position: "sticky",
          top: 100,
        }}
      >
        {/* ── Top band: accent + large index ── */}
        <div style={{
          position: "relative",
          background: C.gradHero,
          padding: "36px 36px 28px",
          borderBottom: `1px solid ${C.borderLight}`,
          overflow: "hidden",
        }}>
          {/* Watermark index */}
          <span style={{
            position: "absolute",
            right: 24, top: 8,
            fontFamily: FONT,
            fontSize: "7rem",
            fontWeight: 900,
            color: C.primary,
            opacity: 0.07,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}>
            {cap.index}
          </span>

          {/* Geometric accent SVG */}
          <div style={{ position: "absolute", right: 36, bottom: 16, opacity: 0.35 }}>
            <CapAccent cap={cap} active={true} />
          </div>

          {/* Icon + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#fff",
              boxShadow: C.shadowMd,
              color: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${C.borderLight}`,
            }}>
              <Icon size={22} />
            </div>
            <div>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.primary,
                display: "block",
                marginBottom: 3,
              }}>
                Core Capability
              </span>
              <h3 style={{
                fontFamily: FONT,
                fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                fontWeight: 900,
                color: C.textPrimary,
                letterSpacing: "-0.03em",
                margin: 0,
              }}>
                {cap.title}
              </h3>
            </div>
          </div>

          {/* Stat pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            borderRadius: 50,
            padding: "6px 14px 6px 10px",
            boxShadow: C.shadowSm,
            border: `1px solid ${C.borderLight}`,
          }}>
            <span style={{
              fontFamily: FONT,
              fontSize: "1.1rem",
              fontWeight: 900,
              color: C.primary,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}>
              {cap.stat}
            </span>
            <span style={{
              fontSize: 11,
              color: C.textMuted,
              fontWeight: 600,
              borderLeft: `1px solid ${C.borderLight}`,
              paddingLeft: 10,
            }}>
              {cap.statLabel}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "34px 42px 40px" }}>

          {/* Description */}
          <p style={{
            fontSize: 15,
            color: C.textSecondary,
            lineHeight: 1.95,
            margin: "0 0 28px",
          }}>
            {cap.desc}
          </p>

          {/* Deliverable points */}
          <p style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.textMuted,
            margin: "0 0 14px",
          }}>
            What we deliver
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}>
            {cap.points.map((pt, j) => (
              <motion.div
                key={pt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: j * 0.06, ease: EASE }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: j % 2 === 0 ? C.bgAccent : C.bgLight,
                  border: `1px solid ${j % 2 === 0 ? C.borderLight : "transparent"}`,
                }}
              >
                <CheckCircle2
                  size={14}
                  style={{ color: C.primary, flexShrink: 0, marginTop: 1 }}
                />
                <span style={{
                  fontSize: 14,
                  color: C.textPrimary,
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}>
                  {pt}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tool tags */}
          <p style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.textMuted,
            margin: "0 0 12px",
          }}>
            Tools & methods
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {cap.tags.map(t => (
              <span
                key={t}
                style={{
                  padding: "6px 15px",
                  borderRadius: 50,
                  background: C.bgAccent,
                  color: C.primary,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `1px solid ${C.border}`,
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            whileHover={{ x: 4, boxShadow: C.shadowXl }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 50,
              background: C.gradPrimary,
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              boxShadow: C.shadowMd,
              letterSpacing: "0.01em",
              transition: "box-shadow 0.25s",
            }}
          >
            Discuss this service
            <ArrowRight size={14} />
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Mobile accordion — for < 768px
// ─────────────────────────────────────────────
function MobileAccordion({ cap, inView }) {
  const [open, setOpen] = useState(false);
  const Icon = cap.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: cap.id * 0.06, ease: EASE }}
      style={{
        borderRadius: 16,
        border: `1.5px solid ${open ? C.border : C.borderLight}`,
        overflow: "hidden",
        marginBottom: 10,
        background: "#fff",
        boxShadow: open ? C.shadowMd : C.shadowSm,
        transition: "box-shadow 0.25s, border 0.25s",
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          all: "unset",
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          padding: "16px 18px",
          cursor: "pointer",
          background: open ? C.bgAccent : "#fff",
          transition: "background 0.25s",
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: open ? C.accentSoft : C.bgSoft,
          color: open ? C.primary : C.textMuted,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, border: open ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all 0.25s",
        }}>
          <Icon size={15} />
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <p style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 14, fontWeight: 800,
            color: open ? C.textPrimary : C.textSecondary,
            letterSpacing: "-0.02em",
          }}>
            {cap.title}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 11, color: C.textMuted }}>{cap.short}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: C.textMuted, flexShrink: 0 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.borderLight}` }}>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.75, margin: "14px 0 14px" }}>
                {cap.desc}
              </p>
              {cap.points.map((pt, j) => (
                <div
                  key={pt}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 9,
                    padding: "8px 12px", borderRadius: 10, marginBottom: 6,
                    background: j % 2 === 0 ? C.bgAccent : C.bgLight,
                    border: `1px solid ${j % 2 === 0 ? C.borderLight : "transparent"}`,
                  }}
                >
                  <CheckCircle2 size={13} style={{ color: C.primary, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 12, color: C.textPrimary, fontWeight: 600 }}>{pt}</span>
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {cap.tags.map(t => (
                  <span key={t} style={{
                    padding: "4px 11px", borderRadius: 50,
                    background: C.bgAccent, color: C.primary,
                    fontSize: 10, fontWeight: 700, border: `1px solid ${C.border}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function SDCapabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={ref}
      aria-label="AurowinX ASIC capabilities"
      className="sd-caps-section"
      style={{
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${C.bgSoft} 1px, transparent 1px),
          linear-gradient(90deg, ${C.bgSoft} 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.7,
      }} />

      {/* Indigo glow — soft, top right */}
      <div style={{
        position: "absolute",
        width: 600, height: 400,
        top: "-5%", right: "-5%",
        background: `radial-gradient(ellipse, ${C.accentSoft} 0%, transparent 65%)`,
        filter: "blur(80px)",
        pointerEvents: "none",
        opacity: 0.6,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HEADER: left-aligned, editorial ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "flex-end",
          marginBottom: 56,
        }}>
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  style={{
                    display: "block", width: 28, height: 2,
                    background: C.primary, transformOrigin: "left",
                  }}
                />
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: C.primary,
                }}>
                  What We Do
                </span>
              </div>
              <h2 style={{
                fontFamily: FONT,
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 900,
                color: C.textPrimary,
                letterSpacing: "-0.04em",
                lineHeight: 1.04,
                margin: 0,
              }}>
                ASIC<br />
                <span style={{ color: C.primary }}>Capabilities</span>
              </h2>
            </motion.div>
          </div>

          {/* Right — subline + capability count badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
            style={{ paddingBottom: 4 }}
          >
            <p style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.8,
              margin: "0 0 16px",
              maxWidth: 380,
            }}>
              Full-spectrum ASIC expertise under one roof — from RTL to GDSII, verification to tape-out.
            </p>
            {/* Capability count strip */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CAPS.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    style={{
                      all: "unset",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 11px",
                      borderRadius: 50,
                      background: active === c.id ? C.accentSoft : C.bgSoft,
                      border: `1px solid ${active === c.id ? C.border : "transparent"}`,
                      color: active === c.id ? C.primary : C.textMuted,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon size={11} />
                    {c.index}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── BODY: desktop 2-col / mobile accordion ── */}
        {isMobile ? (
          // Mobile: stacked accordions
          <div>
            {CAPS.map(cap => (
              <MobileAccordion key={cap.id} cap={cap} inView={inView} />
            ))}
          </div>
        ) : (
          // Desktop: process strip left + spotlight right
          <div className="sd-caps-desktop-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 28,
            alignItems: "stretch",
          }}>
            {/* LEFT — vertical selector strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                background: "#fff",
                borderRadius: 20,
                border: `1.5px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                overflow: "hidden",
              }}
            >
              {/* Strip header */}
              <div style={{
                padding: "18px 20px 14px",
                borderBottom: `1px solid ${C.borderLight}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: C.textMuted,
                }}>
                  Select a capability
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: C.primary, background: C.bgAccent,
                  padding: "3px 10px", borderRadius: 50,
                  border: `1px solid ${C.border}`,
                }}>
                  {CAPS.length} services
                </span>
              </div>

              {/* Rows */}
              {CAPS.map(cap => (
                <CapRow
                  key={cap.id}
                  cap={cap}
                  active={active}
                  onClick={() => setActive(cap.id)}
                  inView={inView}
                />
              ))}
            </motion.div>

            {/* RIGHT — spotlight */}
            <Spotlight cap={CAPS[active]} inView={inView} />
          </div>
        )}

      </div>

      {/* Responsive CSS */}
      <style>{`
        .sd-caps-section {
          padding: 80px 48px 88px;
        }
        @media (max-width: 960px) {
          .sd-caps-section {
            padding: 56px 28px 64px !important;
          }
          .sd-caps-desktop-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .sd-caps-section {
            padding: 44px 16px 52px !important;
          }
          section[aria-label="AurowinX ASIC capabilities"] > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}