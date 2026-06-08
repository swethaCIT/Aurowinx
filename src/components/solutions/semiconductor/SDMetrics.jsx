// SDMetrics.jsx — AurowinX ASIC Metrics Section
// Redesigned: editorial asymmetric layout, monochromatic premium feel
// Uses theme.js tokens exactly — C, FONT, EASE, fadeUp, fadeLeft, fadeRight

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield, Zap, TrendingUp, BarChart3,
  Award, Users, Clock, Target,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

// ─────────────────────────────────────────────
// Animated counter — easeOutExpo curve
// ─────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1800, inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const raf = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(raf);
      else setVal(to);
    };
    requestAnimationFrame(raf);
  }, [inView, to, duration]);
  return <>{val}{suffix}</>;
}

// ─────────────────────────────────────────────
// SVG arc ring — CSS-transition driven
// ─────────────────────────────────────────────
function ArcRing({ percent, color, size = 68, stroke = 5, inView, delay = 0 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ flexShrink: 0, transform: "rotate(-90deg)" }}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={C.bgSoft}
        strokeWidth={stroke}
      />
      {/* Progress */}
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Mini sparkline
// ─────────────────────────────────────────────
function Sparkline({ data, color, width = 120, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const id = `spark-${color.replace("#", "")}`;
  return (
    <svg width={width} height={height} aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${pts} ${width},${height}`}
        fill={`url(#${id})`}
        stroke="none"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Terminal dot */}
      {(() => {
        const lastPt = pts.split(" ").pop().split(",");
        return (
          <circle
            cx={parseFloat(lastPt[0])}
            cy={parseFloat(lastPt[1])}
            r={3}
            fill={color}
          />
        );
      })()}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const BIG_STATS = [
  {
    num: 180, suffix: "+",
    label: "Projects Delivered",
    sub: "ASIC, SoC & IP across all domains",
    tag: "Total delivered",
    trend: "+24% YoY",
    trendColor: "#16a34a",
    trendBg: "#f0fdf4",
    trendBorder: "#bbf7d0",
    sparkData: [60, 80, 70, 110, 95, 130, 150, 180],
    featured: true,
  },
  {
    num: 50, suffix: "+",
    label: "Expert Engineers",
    sub: "DV, DFT, PD & Synthesis",
    tag: "Team strength",
    trend: "+18% growth",
    trendColor: "#16a34a",
    trendBg: "#f0fdf4",
    trendBorder: "#bbf7d0",
    sparkData: [20, 25, 28, 32, 38, 42, 48, 50],
    featured: false,
  },
  {
    num: 12, suffix: "+",
    label: "Years of Expertise",
    sub: "Silicon-proven since 2012",
    tag: "Deep expertise",
    trend: "★ Est. 2012",
    trendColor: "#854d0e",
    trendBg: "#fef9c3",
    trendBorder: "#fde68a",
    sparkData: [1, 2, 3, 4, 5, 7, 9, 12],
    featured: false,
  },
  {
    num: 6, suffix: "",
    label: "Global Foundries",
    sub: "5 nm → 180 nm",
    tag: "Global reach",
    trend: "TSMC · Samsung · GF",
    trendColor: "#1d4ed8",
    trendBg: "#eff6ff",
    trendBorder: "#bfdbfe",
    sparkData: [1, 2, 2, 3, 4, 5, 5, 6],
    featured: false,
  },
];

const COVERAGE = [
  { label: "Functional Coverage", pct: 99, delay: 0.20 },
  { label: "Fault Coverage",      pct: 97, delay: 0.35 },
  { label: "Code Coverage",       pct: 98, delay: 0.50 },
  { label: "Toggle Coverage",     pct: 96, delay: 0.65 },
];

// Monochromatic shades for coverage rings
const RING_SHADES = ["#0f172a", "#334155", "#475569", "#94a3b8"];

const HIGHLIGHTS = [
  { n: "01", icon: <Shield size={14} />, text: "Zero-escape verification policy across every engagement" },
  { n: "02", icon: <Zap size={14} />, text: "First-time-right silicon — every single tape-out" },
  { n: "03", icon: <TrendingUp size={14} />, text: "TSMC / Samsung / GF certified, down to 5 nm" },
  { n: "04", icon: <BarChart3 size={14} />, text: "Full RTL-to-GDSII end-to-end capability" },
];

// ─────────────────────────────────────────────
// Stat cell
// ─────────────────────────────────────────────
function StatCell({ s, i, inView }) {
  const featured = s.featured;

  const cellStyle = {
    padding: featured ? "40px 36px" : "32px 28px",
    background: featured ? C.primary : C.bgWhite,
    position: "relative",
    overflow: "hidden",
    cursor: "default",
    transition: "background 0.25s",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  };

  const tagStyle = {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: featured ? "rgba(255,255,255,0.4)" : C.textMuted,
    marginBottom: 18,
    display: "block",
  };

  const numStyle = {
    fontFamily: FONT,
    fontSize: "clamp(3.2rem, 5.5vw, 5rem)",
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: "-0.05em",
    color: featured ? "#fff" : C.textPrimary,
    display: "flex",
    alignItems: "baseline",
    gap: 2,
  };

  const suffixStyle = {
    fontSize: "0.42em",
    fontWeight: 700,
    color: featured ? "rgba(255,255,255,0.45)" : C.textMuted,
  };

  const labelStyle = {
    marginTop: 10,
    fontSize: 13,
    fontWeight: 700,
    color: featured ? "#fff" : C.textPrimary,
    letterSpacing: "-0.01em",
    fontFamily: FONT,
  };

  const subStyle = {
    marginTop: 3,
    fontSize: 11,
    color: featured ? "rgba(255,255,255,0.4)" : C.textMuted,
    lineHeight: 1.5,
  };

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    marginTop: 14,
    padding: "4px 10px",
    borderRadius: 50,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.04em",
    background: featured ? "rgba(255,255,255,0.12)" : s.trendBg,
    color: featured ? "rgba(255,255,255,0.7)" : s.trendColor,
    border: `1px solid ${featured ? "rgba(255,255,255,0.18)" : s.trendBorder}`,
    alignSelf: "flex-start",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
      whileHover={!featured ? { backgroundColor: C.bgLight, y: -3 } : {}}
      style={cellStyle}
    >
      {/* Subtle watermark index */}
      <span style={{
        position: "absolute", bottom: -10, right: 14,
        fontSize: "5.5rem", fontWeight: 900, lineHeight: 1,
        color: featured ? "rgba(255,255,255,0.06)" : `${C.primary}06`,
        fontFamily: FONT, pointerEvents: "none", userSelect: "none",
        letterSpacing: "-0.06em",
      }}>
        {String(i + 1).padStart(2, "0")}
      </span>

      <span style={tagStyle}>{s.tag}</span>

      <div style={numStyle}>
        <Counter to={s.num} suffix="" inView={inView} duration={1700} />
        <span style={suffixStyle}>{s.suffix}</span>
      </div>

      <p style={labelStyle}>{s.label}</p>
      <p style={subStyle}>{s.sub}</p>

      <span style={pillStyle}>↑ {s.trend}</span>

      {/* Sparkline — featured cell only */}
      {featured && (
        <div style={{ marginTop: 20 }}>
          <Sparkline
            data={s.sparkData}
            color="rgba(255,255,255,0.45)"
            width={160}
            height={36}
          />
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Coverage ring row
// ─────────────────────────────────────────────
function CoverageRow({ c, shade, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: c.delay, ease: EASE }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 0",
        borderBottom: `1px solid ${C.borderLight}`,
      }}
    >
      <ArcRing percent={c.pct} color={shade} inView={inView} delay={c.delay} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: C.textSecondary,
          marginBottom: 6, fontFamily: FONT,
        }}>
          {c.label}
        </div>
        {/* Bar */}
        <div style={{
          height: 3, borderRadius: 2,
          background: C.bgSoft, overflow: "hidden",
        }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: c.delay + 0.1, ease: EASE }}
            style={{
              height: "100%", borderRadius: 2,
              width: `${c.pct}%`,
              background: shade,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
      <span style={{
        fontFamily: FONT, fontSize: "1.4rem", fontWeight: 900,
        color: C.textPrimary, letterSpacing: "-0.04em", minWidth: 52,
        textAlign: "right",
      }}>
        {c.pct}%
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function SDMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // ── Grid seam technique: 2px gaps on a bg-colored wrapper = hairline dividers
  const gridSeamStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 2,
    background: C.borderLight,
    borderRadius: 20,
    overflow: "hidden",
    border: `1.5px solid ${C.borderLight}`,
    marginBottom: 20,
  };

  return (
    <section
      ref={ref}
      aria-label="AurowinX performance metrics"
      style={{
        background: C.bgLight,
        padding: "72px 48px 80px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${C.borderLight} 1px, transparent 1px),
          linear-gradient(90deg, ${C.borderLight} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        opacity: 0.6,
      }} />

      {/* Indigo glow — top left only, subtle */}
      <div style={{
        position: "absolute", width: 700, height: 500,
        top: "-15%", left: "-8%",
        background: `radial-gradient(ellipse, ${C.accentSoft} 0%, transparent 65%)`,
        filter: "blur(80px)", pointerEvents: "none", opacity: 0.7,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HEADER: asymmetric two-column ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            marginBottom: 52,
            gap: 32,
          }}
        >
          {/* Left: eyebrow + headline */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginBottom: 14,
            }}>
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
                Performance Metrics
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: FONT,
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 900,
                color: C.textPrimary,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              Numbers that<br />
              <span style={{ color: C.primary }}>define us.</span>
            </motion.h2>
          </div>

          {/* Right: live badge + subline */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{ textAlign: "right" }}
          >
            {/* Live badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: C.textPrimary, color: "#fff",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
              padding: "7px 14px", borderRadius: 50, marginBottom: 12,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#4ade80",
                animation: "sdm-blink 2s infinite",
              }} />
              Silicon-proven since 2012
            </div>
            <p style={{
              fontSize: 13, color: C.textSecondary,
              lineHeight: 1.7, maxWidth: 280, marginLeft: "auto",
            }}>
              A decade-plus of ASIC delivery — measured in outcomes, not promises.
            </p>
          </motion.div>
        </motion.div>

        {/* ── ROW 1: Big stat cells (grid-seam layout) ── */}
        <div style={gridSeamStyle}>
          {BIG_STATS.map((s, i) => (
            <StatCell key={s.label} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* ── ROW 2: Coverage + Right panel ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 20,
        }}>

          {/* Coverage panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            style={{
              background: C.bgWhite,
              borderRadius: 20,
              padding: "32px 36px",
              border: `1.5px solid ${C.borderLight}`,
              boxShadow: C.shadowSm,
            }}
          >
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: C.textMuted,
              display: "block", marginBottom: 4,
            }}>
              Verification sign-off
            </span>
            <p style={{
              fontFamily: FONT, fontSize: 16, fontWeight: 900,
              color: C.textPrimary, letterSpacing: "-0.02em",
              marginBottom: 8,
            }}>
              Coverage metrics — achieved consistently
            </p>

            <div>
              {COVERAGE.map((c, i) => (
                <CoverageRow
                  key={c.label}
                  c={c}
                  shade={RING_SHADES[i]}
                  inView={inView}
                />
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Highlights — dark panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              style={{
                background: C.textPrimary,
                borderRadius: 20,
                padding: "32px 28px",
                flex: 1,
              }}
            >
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                display: "block", marginBottom: 4,
              }}>
                Differentiators
              </span>
              <p style={{
                fontFamily: FONT, fontSize: 16, fontWeight: 900,
                color: "#fff", letterSpacing: "-0.02em",
                marginBottom: 20,
              }}>
                What sets us apart
              </p>

              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.n}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease: EASE }}
                  whileHover={{ paddingLeft: 8 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "13px 0",
                    borderBottom: i < HIGHLIGHTS.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                    transition: "padding-left 0.2s",
                    cursor: "default",
                  }}
                >
                  <span style={{
                    fontFamily: FONT, fontSize: 11, fontWeight: 700,
                    color: "rgba(255,255,255,0.2)", width: 20, flexShrink: 0,
                    paddingTop: 2,
                  }}>
                    {h.n}
                  </span>
                  <span style={{
                    fontSize: 13, color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.55, fontWeight: 500,
                  }}>
                    {h.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Tape-out success rates — two-stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              style={{
                background: C.bgWhite,
                borderRadius: 20,
                padding: "26px 32px",
                border: `1.5px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              {/* Silicon success */}
              <div>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: C.textMuted,
                  display: "block", marginBottom: 4,
                }}>
                  Silicon success rate
                </span>
                <span style={{
                  fontFamily: FONT,
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  color: C.textPrimary,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}>
                  <Counter to={99} suffix="%+" inView={inView} duration={1400} />
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 52, background: C.borderLight, flexShrink: 0 }} />

              {/* First-pass */}
              <div>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: C.textMuted,
                  display: "block", marginBottom: 4,
                }}>
                  First-pass tape-out
                </span>
                <span style={{
                  fontFamily: FONT,
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  color: C.textPrimary,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}>
                  <Counter to={95} suffix="%+" inView={inView} duration={1400} />
                </span>
              </div>
            </motion.div>

          </div>{/* /right column */}
        </div>{/* /row 2 */}

      </div>

      {/* Blink keyframe */}
      <style>{`
        @keyframes sdm-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ── Responsive breakpoints ── */

        /* Tablet: stack big row 2+2, keep bottom 2-col */
        @media (max-width: 960px) {
          section[aria-label="AurowinX performance metrics"] {
            padding: 52px 28px 64px;
          }
        }

        /* Narrow tablet: full-stack */
        @media (max-width: 820px) {
          section[aria-label="AurowinX performance metrics"] > div > div:nth-child(2) {
            /* header */
            grid-template-columns: 1fr !important;
          }
          section[aria-label="AurowinX performance metrics"] > div > div:nth-child(2) > div:last-child {
            text-align: left;
          }
          section[aria-label="AurowinX performance metrics"] > div > div:nth-child(2) > div:last-child p {
            margin-left: 0;
          }
        }

        /* Mobile: single column everywhere */
        @media (max-width: 680px) {
          section[aria-label="AurowinX performance metrics"] {
            padding: 40px 16px 52px;
          }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// RESPONSIVE NOTES (for parent layout):
//
// The big stat grid uses CSS inline styles driven by JS.
// For true responsive behavior add these classes/media
// queries in your global CSS or Tailwind config:
//
//   @media (max-width: 900px)  → grid-template-columns: 1fr 1fr
//   @media (max-width: 560px)  → grid-template-columns: 1fr
//   Bottom row → grid-template-columns: 1fr at < 760px
//
// Or wrap the section in a ResizeObserver and pass a
// `cols` prop to StatCell to drive inline grid columns.
// ─────────────────────────────────────────────