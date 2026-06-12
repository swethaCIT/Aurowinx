// LevelOfVerif.jsx
// AurowinX — Level of Verification + We Can Achieve + We Are Capable To
// Responsive: stacked on mobile | 2-col on tablet | 3-col on laptop | 3-col wider on TV

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2, Zap, Target, BarChart3,
  TrendingUp, Cpu, Shield, Layers, Code2,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ─── useBreakpoint ─────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState("laptop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 640)       setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else if (w >= 1600) setBp("tv");
      else                setBp("laptop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ─── GLOW TOKENS ───────────────────────────── */
const GLOW = {
  purple: { base: "#7F77DD", light: "#EEEDFE", border: "#AFA9EC", gradient: "linear-gradient(135deg,#7F77DD,#534AB7)" },
  teal:   { base: "#1D9E75", light: "#E1F5EE", border: "#5DCAA5", gradient: "linear-gradient(135deg,#1D9E75,#0F6E56)" },
  coral:  { base: "#D85A30", light: "#FAECE7", border: "#F0997B", gradient: "linear-gradient(135deg,#D85A30,#993C1D)" },
};

/* ─── DATA ───────────────────────────────────── */
const LEVEL_ITEMS = [
  "Test Bench Development",
  "SOC/IP Functional Verification",
  "SV-UVM Based Constrained Random Verification",
  "Assertion Based Verification",
  "Stimulus Generation",
  "Coverage Analysis",
  "Checkers & Monitors",
  "Gate-level Simulations (GLS)",
];

const ACHIEVE_ITEMS = [
  { icon: <Zap size={16} />,       title: "Faster Debugging",                desc: "Automated triage and waveform analysis cuts debug cycles by 60%." },
  { icon: <Target size={16} />,    title: "All Possible Scenarios",          desc: "Constrained random + directed tests cover every corner case." },
  { icon: <BarChart3 size={16} />, title: "100% Code & Functional Coverage", desc: "Disciplined closure across code, toggle, FSM and functional metrics." },
];

const CAPABLE_ITEMS = [
  { icon: <TrendingUp size={16} />, title: "Faster Verification Closure", desc: "Parallel simulation farms and automated regression shorten schedules." },
  { icon: <Cpu size={16} />,        title: "Debug Complex Errors",        desc: "Deep expertise in Verdi/SimVision to root-cause the hardest failures fast." },
  { icon: <Shield size={16} />,     title: "Increase Productivity",       desc: "Reusable UVM components and proven methodologies across every project." },
  { icon: <Layers size={16} />,     title: "Best-in-class Bug Detection", desc: "Early-stage detection through layered simulation, formal and emulation flows." },
];

/* ─── GLOW CARD WRAPPER ─────────────────────── */
function GlowCard({ glow, delay = 0, children, style = {} }) {
  const { base } = GLOW[glow];
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      whileHover="glow"
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "24px 20px",
        border: `1px solid ${C.borderLight}`,
        boxShadow: C.shadowMd,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      variants={{
        glow: {
          y: -6,
          boxShadow: `0 0 0 1.5px ${base}, 0 0 32px 4px ${base}44, 0 0 60px 12px ${base}22`,
          transition: { duration: 0.25 },
        },
      }}
    >
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120, borderRadius: "50%",
        background: `${base}10`, pointerEvents: "none",
        filter: "blur(28px)",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

/* ─── SECTION LABEL ─────────────────────────── */
function SectionLabel({ text, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
      <div style={{ width: 20, height: 2, background: color, borderRadius: 1 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: "0.17em", textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

/* ─── CARD TITLE ─────────────────────────────── */
function CardTitle({ children }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 900, color: C.textPrimary, margin: "0 0 16px", letterSpacing: "-0.03em", fontFamily: FONT }}>
      {children}
    </h3>
  );
}

/* ─── LEVEL ITEM ─────────────────────────────── */
function LevelItem({ text, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.38, delay: 0.18 + i * 0.055, ease: EASE }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 9,
        padding: "9px 12px", borderRadius: 9,
        background: i % 2 === 0 ? "#F8F9FC" : "#fff",
        border: `1px solid ${C.borderLight}`,
      }}
    >
      <CheckCircle2 size={14} style={{ color: GLOW.purple.base, flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, lineHeight: 1.5 }}>{text}</span>
    </motion.div>
  );
}

/* ─── FEATURE CARD ───────────────────────────── */
function FeatureCard({ item, i, inView, glow }) {
  const { base, light } = GLOW[glow];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: 0.15 + i * 0.09, ease: EASE }}
      style={{
        display: "flex", gap: 12, padding: "13px 14px",
        borderRadius: 12, background: "#F8F9FC",
        border: `1px solid ${C.borderLight}`,
        alignItems: "flex-start",
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: light, color: base,
        border: `1px solid ${base}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {item.icon}
      </div>
      <div>
        <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: 12, color: C.textPrimary, fontFamily: FONT }}>{item.title}</p>
        <p style={{ margin: 0, fontSize: 11, color: C.textSecondary, lineHeight: 1.65 }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────── */
export default function LevelOfVerif() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp = useBreakpoint();

  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isTV      = bp === "tv";

  /* grid layout per breakpoint */
  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "1fr 1fr"
    : "1fr 1fr 1fr";

  const sectionPad = isMobile
    ? "64px 20px 52px"
    : isTablet
    ? "72px 32px 60px"
    : isTV
    ? "100px 80px 80px"
    : "64px 48px 56px";

  /* On tablet: purple card spans full width (2 cols),
     teal + coral sit side by side below              */
  const purpleStyle = isTablet
    ? { gridColumn: "1 / -1" }
    : {};

  /* On tablet: level items show in 2 columns to use the extra width */
  const levelGridStyle = isTablet
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }
    : { display: "flex", flexDirection: "column", gap: 7 };

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: sectionPad,
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid backdrop */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 28, background: `linear-gradient(90deg, transparent, ${GLOW.purple.base})` }} />
            <span style={{ color: GLOW.purple.base, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Capabilities</span>
            <div style={{ height: 1, width: 28, background: `linear-gradient(90deg, ${GLOW.purple.base}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.6rem, 7vw, 2rem)" : "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            What We Offer & Deliver
          </h2>
          <p style={{ color: C.textSecondary, fontSize: isMobile ? 13 : 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Full-spectrum verification from testbench to sign-off — with measurable outcomes at every stage.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 20 }}>

          {/* COL 1 — Level of Verification (purple) */}
          <GlowCard glow="purple" delay={0.05} style={purpleStyle}>
            <SectionLabel text="Level of Verification" color={GLOW.purple.base} />
            <CardTitle>Services We Provide</CardTitle>
            <div style={levelGridStyle}>
              {LEVEL_ITEMS.map((text, i) => (
                <LevelItem key={text} text={text} i={i} inView={inView} />
              ))}
            </div>
          </GlowCard>

          {/* COL 2 — We Can Achieve (teal) */}
          <GlowCard glow="teal" delay={0.15}>
            <SectionLabel text="We Can Achieve" color={GLOW.teal.base} />
            <CardTitle>Project Outcomes</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ACHIEVE_ITEMS.map((item, i) => (
                <FeatureCard key={item.title} item={item} i={i} inView={inView} glow="teal" />
              ))}
            </div>

            {/* Coverage badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.52, ease: EASE }}
              style={{
                marginTop: 16, padding: "13px 15px", borderRadius: 12,
                background: GLOW.teal.gradient,
                display: "flex", alignItems: "center", gap: 11,
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Code2 size={17} style={{ color: "#fff" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#fff" }}>100% Coverage Target</p>
                <p style={{ margin: "2px 0 0", fontSize: 10, color: "rgba(255,255,255,0.72)" }}>Code · Functional · Toggle · FSM</p>
              </div>
            </motion.div>
          </GlowCard>

          {/* COL 3 — We Are Capable To (coral) */}
          <GlowCard glow="coral" delay={0.25}>
            <SectionLabel text="We Are Capable To" color={GLOW.coral.base} />
            <CardTitle>Why Teams Choose Us</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CAPABLE_ITEMS.map((item, i) => (
                <FeatureCard key={item.title} item={item} i={i} inView={inView} glow="coral" />
              ))}
            </div>
          </GlowCard>

        </div>
      </div>
    </section>
  );
}