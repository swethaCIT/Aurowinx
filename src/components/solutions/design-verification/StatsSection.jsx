// StatsSection.jsx
// AurowinX Design Verification — Stats with animated counters
// Light & professional, indigo accent

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Award, Clock, Users, CheckCircle2 } from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ── Animated counter ── */
function Counter({ to, suffix = "", inView, duration = 1800 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(to);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <>{val}{suffix}</>;
}

const STATS = [
  {
    num: 99, suffix: "%+",
    label: "Functional Coverage",
    sub: "Achieved consistently across all engagements",
    icon: <BarChart3 style={{ width: 22, height: 22 }} />,
    color: "#4f46e5",
  },
  {
    num: 180, suffix: "+",
    label: "Projects Delivered",
    sub: "Across ASIC, FPGA & SoC domains",
    icon: <Award style={{ width: 22, height: 22 }} />,
    color: "#7c3aed",
  },
  {
    num: 15, suffix: "+",
    label: "Years of Expertise",
    sub: "Deep verification domain knowledge",
    icon: <Clock style={{ width: 22, height: 22 }} />,
    color: "#0891b2",
  },
  {
    num: 50, suffix: "+",
    label: "Senior DV Engineers",
    sub: "UVM, Formal & Co-verification specialists",
    icon: <Users style={{ width: 22, height: 22 }} />,
    color: "#059669",
  },
];

const HIGHLIGHTS = [
  "First-time-right silicon runs",
  "Zero-escape verification policy",
  "TSMC · Samsung · GF — down to 5nm",
  "Formal + simulation layered approach",
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "96px 48px 80px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: 3,
          background: "linear-gradient(90deg, transparent, #4f46e5, #7c3aed, transparent)",
          transformOrigin: "left", borderRadius: "0 0 4px 4px",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12, marginBottom: 14,
          }}>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{
              color: C.primary, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              By The Numbers
            </span>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900,
            color: C.textPrimary, margin: "0 0 14px",
            letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            Proven at Scale
          </h2>
          <p style={{
            color: C.textSecondary, fontSize: 15,
            maxWidth: 480, margin: "0 auto", lineHeight: 1.75,
          }}>
            Numbers that reflect a decade-plus of silicon-proven verification excellence.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 52,
        }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -6, boxShadow: `0 20px 48px ${s.color}18` }}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "32px 24px 28px",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowMd,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "box-shadow 0.3s",
              }}
            >
              {/* Colored top bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${s.color}, ${s.color}70)`,
                  transformOrigin: "left",
                }}
              />

              {/* Watermark number */}
              <span style={{
                position: "absolute", top: 8, right: 16,
                fontSize: "5rem", fontWeight: 900,
                color: s.color, opacity: 0.05,
                letterSpacing: "-0.06em", lineHeight: 1,
                fontFamily: FONT, pointerEvents: "none",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div style={{
                width: 46, height: 46, borderRadius: 13,
                background: `${s.color}12`,
                color: s.color,
                border: `1px solid ${s.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                {s.icon}
              </div>

              {/* Counter */}
              <p style={{
                margin: "0 0 4px",
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                fontWeight: 900, color: s.color,
                letterSpacing: "-0.05em", lineHeight: 1,
                fontFamily: FONT,
              }}>
                <Counter to={s.num} suffix={s.suffix} inView={inView} />
              </p>

              {/* Label */}
              <p style={{
                margin: "0 0 8px", fontWeight: 700,
                fontSize: 14, color: C.textPrimary,
              }}>
                {s.label}
              </p>

              {/* Sub */}
              <p style={{
                margin: 0, fontSize: 12,
                color: C.textMuted, lineHeight: 1.65,
              }}>
                {s.sub}
              </p>

              {/* Progress bar */}
              <div style={{
                marginTop: 18, height: 3, borderRadius: 2,
                background: `${s.color}12`, overflow: "hidden",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${Math.min(s.num, 100)}%` } : {}}
                  transition={{ duration: 1.4, delay: 0.5 + i * 0.1, ease: EASE }}
                  style={{
                    height: "100%", borderRadius: 2,
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight pills row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          style={{
            display: "flex", justifyContent: "center",
            flexWrap: "wrap", gap: 12,
          }}
        >
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.08, ease: EASE }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 20px", borderRadius: 50,
                background: C.bgAccent,
                border: `1px solid ${C.border}`,
                boxShadow: C.shadowSm,
              }}
            >
              <CheckCircle2 style={{ width: 14, height: 14, color: "#22c55e", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 600 }}>{h}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}