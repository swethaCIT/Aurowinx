// src/components/products/IoTAutomation.jsx
// ─────────────────────────────────────────────────
// Section : IoT & Automation — Coming Soon teaser
// Theme   : theme.js light — white / indigo / violet
// Visual  : Animated SVG network graph — nodes + pulse lines
// Requires: framer-motion, lucide-react

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import {
  Wifi, Cpu, Radio, Shield, BarChart2,
  Zap, ChevronRight, GitBranch, Globe, Activity,
} from "lucide-react";

/* ── THEME (theme.js) ── */
const C = {
  primary:      "#4f46e5",
  secondary:    "#7c3aed",
  accent:       "#6366f1",
  accentSoft:   "#e0e7ff",
  border:       "#c7d2fe",
  borderLight:  "#e0e7ff",
  textPrimary:  "#0f172a",
  textSecondary:"#475569",
  textMuted:    "#94a3b8",
  bgWhite:      "#ffffff",
  bgLight:      "#f8fafc",
  bgSoft:       "#f1f5f9",
  bgAccent:     "#eef2ff",
  gradPrimary:  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  shadowSm:     "0 1px 3px rgba(79,70,229,0.08)",
  shadowMd:     "0 4px 16px rgba(79,70,229,0.10), 0 2px 6px rgba(0,0,0,0.05)",
  shadowLg:     "0 12px 40px rgba(79,70,229,0.14), 0 4px 12px rgba(0,0,0,0.06)",
};
const FONT = "'Inter', 'DM Sans', system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1];

/* ── NETWORK NODES (positions as % of SVG viewport) ── */
const NODES = [
  { id: 0, x: 50,  y: 50,  r: 22, icon: "hub",    label: "Edge Hub",    primary: true  },
  { id: 1, x: 20,  y: 18,  r: 14, icon: "sensor",  label: "Sensor A"                   },
  { id: 2, x: 78,  y: 20,  r: 14, icon: "sensor",  label: "Sensor B"                   },
  { id: 3, x: 14,  y: 55,  r: 14, icon: "device",  label: "Device"                     },
  { id: 4, x: 82,  y: 58,  r: 14, icon: "cloud",   label: "Cloud"                      },
  { id: 5, x: 30,  y: 82,  r: 14, icon: "gateway", label: "Gateway"                    },
  { id: 6, x: 68,  y: 84,  r: 14, icon: "ai",      label: "AI Edge"                    },
  { id: 7, x: 52,  y: 16,  r: 11, icon: "micro",   label: "µNode"                      },
  { id: 8, x: 10,  y: 32,  r: 10, icon: "micro",   label: "µNode"                      },
  { id: 9, x: 88,  y: 38,  r: 10, icon: "micro",   label: "µNode"                      },
];

/* ── EDGES (which nodes connect) ── */
const EDGES = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
  { from: 0, to: 4 }, { from: 0, to: 5 }, { from: 0, to: 6 },
  { from: 0, to: 7 }, { from: 1, to: 8 }, { from: 2, to: 9 },
  { from: 1, to: 7 }, { from: 4, to: 6 }, { from: 5, to: 3 },
];

/* ── FEATURES ── */
const FEATURES = [
  { icon: Globe,     label: "Edge AI Inference",     desc: "On-device ML pipelines"       },
  { icon: Shield,    label: "Zero-Trust Security",   desc: "Device-level auth & encrypt"  },
  { icon: Activity,  label: "Sensor Fusion",         desc: "Multi-sensor data aggregation" },
  { icon: Zap,       label: "OTA Updates",           desc: "Secure over-the-air firmware" },
  { icon: BarChart2, label: "Real-time Analytics",   desc: "Edge & cloud dashboards"      },
  { icon: GitBranch, label: "Industrial Scale",      desc: "10K+ device fleet support"    },
];

/* ── STATS ── */
const STATS = [
  { value: "10K+",  label: "Devices / Fleet"   },
  { value: "< 2ms", label: "Edge Latency"       },
  { value: "99.9%", label: "Uptime Target"      },
  { value: "E2E",   label: "Security Layer"     },
];

/* ═══════════════════════════════════════════════
   NETWORK GRAPH (SVG canvas — fully animated)
═══════════════════════════════════════════════ */
function NetworkGraph({ inView }) {
  const [pulses, setPulses] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const pulseId = useRef(0);
  const VW = 500, VH = 500;

  /* Convert % → px */
  const px = (node) => ({
    x: (node.x / 100) * VW,
    y: (node.y / 100) * VH,
  });

  /* Spawn a pulse along a random edge every 600ms */
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      const edge = EDGES[Math.floor(Math.random() * EDGES.length)];
      const id = pulseId.current++;
      setPulses(p => [...p, { id, edge, progress: 0, reverse: Math.random() > 0.5 }]);
    }, 600);
    return () => clearInterval(interval);
  }, [inView]);

  /* Advance pulses */
  useAnimationFrame((_, delta) => {
    if (!inView) return;
    setPulses(p =>
      p
        .map(pulse => ({ ...pulse, progress: pulse.progress + delta * 0.0008 }))
        .filter(pulse => pulse.progress < 1)
    );
  });

  const nodeIcons = {
    hub:     <Cpu     size={14} strokeWidth={2} />,
    sensor:  <Radio   size={11} strokeWidth={2} />,
    device:  <Wifi    size={11} strokeWidth={2} />,
    cloud:   <Globe   size={11} strokeWidth={2} />,
    gateway: <GitBranch size={11} strokeWidth={2} />,
    ai:      <Zap     size={11} strokeWidth={2} />,
    micro:   <Activity size={10} strokeWidth={2} />,
  };

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Glow filter for hub */}
          <filter id="iot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Pulse dot gradient */}
          <radialGradient id="pulse-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#4f46e5" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── EDGES ── */}
        {EDGES.map((edge, i) => {
          const a = px(NODES[edge.from]);
          const b = px(NODES[edge.to]);
          const isActive =
            activeNode === edge.from || activeNode === edge.to;
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={isActive ? "#4f46e5" : "#c7d2fe"}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray={isActive ? "none" : "4 4"}
              opacity={isActive ? 0.9 : 0.6}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}

        {/* ── PULSE DOTS ── */}
        {pulses.map(({ id, edge, progress, reverse }) => {
          const a = px(NODES[edge.from]);
          const b = px(NODES[edge.to]);
          const t = reverse ? 1 - progress : progress;
          const cx = a.x + (b.x - a.x) * t;
          const cy = a.y + (b.y - a.y) * t;
          return (
            <g key={id}>
              {/* Trailing glow */}
              <circle
                cx={cx} cy={cy} r={6}
                fill="url(#pulse-grad)"
                opacity={0.4 * (1 - progress)}
              />
              {/* Solid dot */}
              <circle
                cx={cx} cy={cy} r={3}
                fill="#4f46e5"
                opacity={1 - progress * 0.5}
              />
            </g>
          );
        })}

        {/* ── NODES ── */}
        {NODES.map((node) => {
          const { x, y } = px(node);
          const isHub     = node.primary;
          const isHovered = activeNode === node.id;
          const fillColor = isHub
            ? "#4f46e5"
            : isHovered ? "#eef2ff" : "#ffffff";
          const strokeCol = isHub
            ? "#3730a3"
            : isHovered ? "#4f46e5" : "#c7d2fe";
          const iconColor = isHub ? "#fff" : isHovered ? "#4f46e5" : "#94a3b8";

          return (
            <g
              key={node.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Outer ring ping for hub */}
              {isHub && (
                <>
                  <circle
                    cx={x} cy={y} r={node.r + 10}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth={1}
                    opacity={0.18}
                  />
                  <circle
                    cx={x} cy={y} r={node.r + 18}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth={0.5}
                    opacity={0.10}
                  />
                </>
              )}

              {/* Hover ring */}
              {isHovered && !isHub && (
                <circle
                  cx={x} cy={y} r={node.r + 7}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth={1}
                  opacity={0.25}
                  strokeDasharray="3 3"
                />
              )}

              {/* Node circle */}
              <circle
                cx={x} cy={y} r={node.r}
                fill={fillColor}
                stroke={strokeCol}
                strokeWidth={isHub ? 2 : 1.5}
                filter={isHub ? "url(#iot-glow)" : "none"}
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Icon (rendered via foreignObject for React icons) */}
              <foreignObject
                x={x - node.r * 0.55}
                y={y - node.r * 0.55}
                width={node.r * 1.1}
                height={node.r * 1.1}
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    color: iconColor,
                  }}
                >
                  {nodeIcons[node.icon]}
                </div>
              </foreignObject>

              {/* Label — only show for hub + hovered */}
              {(isHub || isHovered) && (
                <text
                  x={x}
                  y={y + node.r + 13}
                  textAnchor="middle"
                  fontSize={isHub ? 11 : 10}
                  fontWeight={isHub ? 700 : 600}
                  fill={isHub ? "#4f46e5" : "#475569"}
                  fontFamily="'Inter', sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Coming Soon overlay badge */}
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 12, left: "50%", transform: "translateX(-50%)",
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 16px", borderRadius: 50,
          background: C.bgWhite,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadowMd,
          whiteSpace: "nowrap",
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: C.primary, display: "inline-block",
          }}
        />
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: C.primary, letterSpacing: "0.14em",
          textTransform: "uppercase", fontFamily: FONT,
        }}>
          Coming Soon
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function IoTAutomation() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="iot-automation"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: C.bgWhite,
        fontFamily: FONT,
        padding: "120px 0 110px",
      }}
    >
      {/* ── SOFT RADIAL BG ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 70% 55% at 70% 50%," +
          " rgba(99,102,241,0.06) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 50% 40% at 20% 60%," +
          " rgba(124,58,237,0.05) 0%, transparent 70%)",
      }} />

      <div className="iot-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
      }}>

        {/* ── SECTION BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 72 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 20px", borderRadius: 50,
            border: `1px solid ${C.border}`,
            background: C.bgAccent,
            color: C.primary,
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: C.shadowSm,
          }}>
            <Wifi style={{ width: 12, height: 12 }} />
            IoT & Automation
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5 }} />
            <span style={{
              padding: "2px 11px", borderRadius: 50,
              background: C.gradPrimary,
              color: "#fff", fontSize: 10, letterSpacing: "0.1em",
            }}>
              Coming Soon
            </span>
          </span>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="iot-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}>

          {/* ── LEFT: TEXT ── */}
          <div>
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.10, ease: EASE }}
              style={{
                display: "flex", alignItems: "center",
                gap: 10, marginBottom: 18,
              }}
            >
              <div style={{
                width: 3, height: 22, borderRadius: 2,
                background: C.gradPrimary,
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: C.primary,
              }}>
                Edge · Connected · Autonomous
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.78, delay: 0.18, ease: EASE }}
              style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: "0 0 22px",
                color: C.textPrimary,
              }}
            >
              Connected.
              <br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Autonomous.
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
              style={{
                color: C.textSecondary,
                fontSize: "clamp(0.93rem, 1.3vw, 1.02rem)",
                lineHeight: 1.85,
                marginBottom: 44,
                maxWidth: 460,
              }}
            >
              Edge AI inference pipelines, sensor fusion, OTA update
              infrastructure and zero-trust device security — built for
              intelligent industrial-scale IoT ecosystems by AUROWINX.
            </motion.p>

            {/* Features grid */}
            <motion.div
              className="iot-features"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.32 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 44,
              }}
            >
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.34 + i * 0.06, ease: EASE }}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1px solid ${C.borderLight}`,
                    background: C.bgLight,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: 8, marginBottom: 5,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: C.accentSoft,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}>
                      <f.icon style={{
                        width: 13, height: 13, color: C.primary,
                      }} strokeWidth={2} />
                    </div>
                    <span style={{
                      fontSize: 12.5, fontWeight: 700,
                      color: C.textPrimary,
                    }}>
                      {f.label}
                    </span>
                  </div>
                  <p style={{
                    margin: 0, fontSize: 11.5,
                    color: C.textMuted, lineHeight: 1.5,
                    paddingLeft: 36,
                  }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat strip */}
            <motion.div
              className="iot-stats"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.58, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  padding: "16px 12px",
                  textAlign: "center",
                  background: C.bgWhite,
                  borderRight: i < STATS.length - 1
                    ? `1px solid ${C.borderLight}` : "none",
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                    fontWeight: 900,
                    color: C.primary,
                    letterSpacing: "-0.03em",
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    margin: "4px 0 0", fontSize: 10,
                    color: C.textMuted, fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: NETWORK GRAPH ── */}
          <motion.div
            className="iot-graph-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.20, ease: EASE }}
            style={{
              position: "relative",
              borderRadius: 28,
              border: `1px solid ${C.borderLight}`,
              background: C.bgLight,
              boxShadow: C.shadowLg,
              padding: "28px",
              overflow: "hidden",
            }}
          >
            {/* Faint radial inside card */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
              background:
                "radial-gradient(circle at 50% 50%," +
                " rgba(99,102,241,0.06) 0%, transparent 70%)",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Card header */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: C.textMuted, letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}>
                  Network Topology
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#16a34a", display: "inline-block",
                    }}
                  />
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: "#16a34a", letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Simulated Live
                  </span>
                </div>
              </div>

              <NetworkGraph inView={inView} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 960px) {
          .iot-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .iot-graph-wrap {
            max-width: 480px;
            margin: 0 auto;
          }
          .iot-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .iot-stats > div:nth-child(2) {
            border-right: none !important;
          }
          .iot-stats > div:nth-child(1),
          .iot-stats > div:nth-child(2) {
            border-bottom: 1px solid ${C.borderLight} !important;
          }
          #iot-automation { padding: 72px 0 64px !important; }
        }
        @media (max-width: 600px) {
          .iot-wrap       { padding: 0 16px !important; }
          .iot-features   { grid-template-columns: 1fr !important; gap: 8px !important; }
          .iot-stats      { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (min-width: 1400px) {
          .iot-grid { gap: 100px !important; }
          .iot-wrap { max-width: 1320px !important; }
        }
        @media (min-width: 1800px) {
          .iot-wrap { max-width: 1520px !important; }
        }
      `}</style>
    </section>
  );
}