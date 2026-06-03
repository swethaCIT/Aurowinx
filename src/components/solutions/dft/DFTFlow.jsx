// DFTFlow.jsx — DFT Process Flow
// Unique timeline design — NO plain cards
// Alternating left/right image + content rows, animated connectors, floating particles

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ArrowDown } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const STEPS = [
  {
    num: "01",
    tag: "DFT Planning",
    title: "Architecture & Planning",
    color: "#4f46e5",
    bg: "#eef2ff",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    desc: "Define DFT architecture aligned with design complexity, test coverage goals, ATE constraints and silicon cost targets.",
    points: ["DFT architecture and SoC partitioning", "Test mode & control signal planning", "DFT rule definition & sign-off criteria", "Early-stage feasibility analysis"],
  },
  {
    num: "02",
    tag: "Scan Insertion",
    title: "DFT IP Insertion & Scan Stitching",
    color: "#7c3aed",
    bg: "#f5f3ff",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80",
    desc: "Automated scan chain insertion, stitching and compression targeting maximum structural coverage with minimal area overhead.",
    points: ["Scan chain insertion & optimization", "EDT / OPMISR compression", "BSCAN IEEE 1149.1 JTAG", "Scan chain verification & simulation"],
  },
  {
    num: "03",
    tag: "Memory BIST",
    title: "MBIST & Hard Repair",
    color: "#0891b2",
    bg: "#ecfeff",
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=700&q=80",
    desc: "Memory Built-In Self Test implementation with hard repair logic for embedded SRAM, ROM and custom memory macros.",
    points: ["MBIST controller insertion", "March algorithm implementation", "Hard repair logic synthesis", "Memory retention & ECC testing"],
  },
  {
    num: "04",
    tag: "ATPG",
    title: "Pattern Generation & Simulation",
    color: "#059669",
    bg: "#ecfdf5",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80",
    desc: "ATPG pattern generation for stuck-at and at-speed faults with full simulation validation and fault coverage optimization.",
    points: ["Stuck-At & At-Speed ATPG", "Pattern simulation & validation", "Fault coverage optimization", "LBIST — Logic Built-In Self Test"],
  },
  {
    num: "05",
    tag: "Post-Silicon",
    title: "ATE Handoff & Validation",
    color: "#d97706",
    bg: "#fffbeb",
    img: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=700&q=80",
    desc: "Complete ATE pattern translation, correlation and post-silicon validation ensuring production test accuracy and coverage sign-off.",
    points: ["ATE handoff & pattern translation", "Post-silicon validation", "Silicon debug & failure analysis", "Test coverage sign-off report"],
  },
];

/* ── Floating background orbs ── */
function BgOrbs() {
  return (
    <>
      {[
        { color: "rgba(79,70,229,0.08)",  size: 500, top: "5%",  left: "-8%" },
        { color: "rgba(124,58,237,0.07)", size: 400, top: "40%", right: "-6%" },
        { color: "rgba(8,145,178,0.07)",  size: 350, bottom: "10%", left: "20%" },
      ].map((o, i) => (
        <motion.div key={i}
          style={{
            position: "absolute", width: o.size, height: o.size * 0.6,
            borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(ellipse, ${o.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            top: o.top, left: o.left, right: o.right, bottom: o.bottom,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* ── Animated number badge ── */
function NumBadge({ num, color, inView, delay }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        position: "absolute",
        width: 56, height: 56, borderRadius: "50%",
        background: color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 18, fontFamily: FONT,
        boxShadow: `0 8px 28px ${color}50`,
        zIndex: 10, border: "3px solid #fff",
        left: "50%", transform: "translateX(-50%)",
      }}
    >
      {num}
    </motion.div>
  );
}

/* ── Vertical connector ── */
function VertConnector({ color, inView, delay }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: 0, position: "relative", zIndex: 2,
      margin: "-2px 0",
    }}>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: 60, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay, ease: EASE }}
        style={{ width: 2, background: `linear-gradient(180deg, ${color}, ${color}40)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        style={{ color: color }}
      >
        <ArrowDown style={{ width: 18, height: 18 }} />
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: 40, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.3, ease: EASE }}
        style={{ width: 2, background: `linear-gradient(180deg, ${color}40, transparent)` }}
      />
    </div>
  );
}

/* ── Single flow step — alternating layout ── */
function FlowStep({ step, i, inView }) {
  const isEven = i % 2 === 0;
  const stepRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stepRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);

  return (
    <div ref={stepRef} style={{ position: "relative" }}>
      {/* Step number — centered between rows */}
      <div style={{ position: "relative", height: 28, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <NumBadge num={step.num} color={step.color} inView={inView} delay={0.1 + i * 0.12} />
      </div>

      {/* Content row — alternating */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: `0 20px 60px ${step.color}12, 0 4px 20px rgba(0,0,0,0.06)`,
          border: `1px solid ${step.color}18`,
          direction: isEven ? "ltr" : "rtl",
        }}
      >
        {/* Image side */}
        <div style={{ overflow: "hidden", position: "relative", height: 320, direction: "ltr" }}>
          <motion.img
            src={step.img} alt={step.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", scale: imgScale }}
          />
          {/* Color overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(${isEven ? "135deg" : "225deg"}, ${step.color}55 0%, rgba(0,0,0,0.35) 100%)`,
          }} />
          {/* Tag on image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
            style={{
              position: "absolute",
              top: 20, ...(isEven ? { left: 20 } : { right: 20 }),
            }}
          >
            <span style={{
              padding: "5px 14px", borderRadius: 50,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              color: "#fff", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.25)",
            }}>
              {step.tag}
            </span>
          </motion.div>
          {/* Title on image bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "40px 24px 24px",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            direction: "ltr",
          }}>
            <p style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", fontFamily: FONT }}>
              {step.title}
            </p>
          </div>
        </div>

        {/* Content side */}
        <div style={{
          background: "#fff", padding: "28px 28px", direction: "ltr",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: EASE }}
            style={{
              height: 3, background: `linear-gradient(90deg, ${step.color}, ${step.color}40)`,
              borderRadius: 2, marginBottom: 16, transformOrigin: "left",
              width: "40%",
            }}
          />

          <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.85, margin: "0 0 20px" }}>
            {step.desc}
          </p>

          {/* Points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.points.map((pt, j) => (
              <motion.div
                key={pt}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 + j * 0.07, ease: EASE }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 10,
                  background: j % 2 === 0 ? step.bg : "#f8fafc",
                  border: `1px solid ${step.color}15`,
                }}
              >
                <CheckCircle2 style={{ width: 14, height: 14, color: step.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{pt}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DFTFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "64px 48px 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Background */}
      <BgOrbs />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>DFT Process</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Our DFT Flow
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            A structured 5-phase DFT implementation flow — from architecture planning to post-silicon sign-off.
          </p>
        </motion.div>

        {/* Steps with vertical connectors */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.num}>
              <FlowStep step={step} i={i} inView={inView} />
              {i < STEPS.length - 1 && (
                <VertConnector
                  color={STEPS[i + 1].color}
                  inView={inView}
                  delay={0.5 + i * 0.12}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom sign-off badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          style={{ textAlign: "center", marginTop: 48 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            padding: "18px 32px", borderRadius: 16,
            background: `linear-gradient(135deg, #4f46e5, #7c3aed)`,
            boxShadow: "0 12px 40px rgba(79,70,229,0.30)",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckCircle2 style={{ width: 22, height: 22, color: "#fff" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: "#fff", fontFamily: FONT }}>DFT Sign-Off Complete</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.72)" }}>95%+ fault coverage · ATE-ready · Production tested</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}