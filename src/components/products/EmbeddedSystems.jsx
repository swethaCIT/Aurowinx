// src/components/products/EmbeddedSystems.jsx
// ─────────────────────────────────────────────────
// Section : Embedded Systems — Coming Soon teaser
// Theme   : theme.js light palette — indigo/violet
// Layout  : Light bg + animated terminal/code visual
// Feel    : Technical · Monospace · Grid lines · Data
// Requires: framer-motion, lucide-react

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Zap, Code2, Activity, Radio, ChevronRight } from "lucide-react";

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
const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";
const FONT = "'Inter', 'DM Sans', system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1];

/* ── TERMINAL LINES ── */
const TERMINAL_LINES = [
  { type: "cmd",     text: "$ aurowinx init --target stm32h7" },
  { type: "info",    text: "> Detecting target architecture..." },
  { type: "ok",      text: "✓ ARM Cortex-M7 @ 480MHz detected" },
  { type: "info",    text: "> Loading BSP layer..." },
  { type: "ok",      text: "✓ Board support package initialized" },
  { type: "info",    text: "> Configuring FreeRTOS kernel..." },
  { type: "ok",      text: "✓ RTOS tick: 1000Hz | heap: 512KB" },
  { type: "cmd",     text: "$ aurowinx power --mode ultra-low" },
  { type: "info",    text: "> Applying power state machine..." },
  { type: "ok",      text: "✓ Sleep: 18µA | Active: 4.2mA" },
  { type: "info",    text: "> Running driver stack validation..." },
  { type: "ok",      text: "✓ SPI · I²C · UART · CAN — PASS" },
  { type: "warn",    text: "⚡ Firmware build: AUROWINX-ES v0.9" },
  { type: "muted",   text: "  Launching 2025 — Stay tuned." },
];

const LINE_COLORS = {
  cmd:   "#4f46e5",
  info:  "#64748b",
  ok:    "#16a34a",
  warn:  "#d97706",
  muted: "#94a3b8",
};

/* ── STAT TILES ── */
const STATS = [
  { label: "Targets",      value: "ARM · RISC-V",   icon: Cpu      },
  { label: "OS Support",   value: "FreeRTOS · Bare", icon: Activity },
  { label: "Power Mode",   value: "18 µA sleep",    icon: Zap      },
  { label: "Interfaces",   value: "SPI · I²C · CAN", icon: Radio    },
];

/* ── CAPABILITIES ── */
const CAPS = [
  { icon: Code2,    label: "BSP Bring-up",         tag: "01" },
  { icon: Activity, label: "RTOS Porting",          tag: "02" },
  { icon: Zap,      label: "Power Management",      tag: "03" },
  { icon: Cpu,      label: "Driver Stack Dev",      tag: "04" },
  { icon: Radio,    label: "Bare Metal Firmware",   tag: "05" },
  { icon: Terminal, label: "Debug & Profiling",     tag: "06" },
];

/* ═══════════════════════════════════════════════
   ANIMATED TERMINAL
═══════════════════════════════════════════════ */
function TerminalWindow({ inView }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[visibleCount]?.type === "cmd" ? 420 : 160;
    const t = setTimeout(() => setVisibleCount(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [inView, visibleCount]);

  /* Cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursor(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* Auto-scroll terminal */
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [visibleCount]);

  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${C.border}`,
      overflow: "hidden",
      background: C.bgWhite,
      boxShadow: C.shadowLg,
      fontFamily: MONO,
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "11px 16px",
        borderBottom: `1px solid ${C.borderLight}`,
        background: C.bgSoft,
      }}>
        {["#f87171","#fbbf24","#4ade80"].map((col, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%", background: col,
          }} />
        ))}
        <span style={{
          flex: 1, textAlign: "center",
          fontSize: 11, fontWeight: 600,
          color: C.textMuted, letterSpacing: "0.06em",
          fontFamily: MONO,
        }}>
          aurowinx-embedded — zsh
        </span>
        <div style={{
          padding: "2px 8px", borderRadius: 4,
          background: C.accentSoft,
          fontSize: 9, fontWeight: 700,
          color: C.primary, letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          LIVE
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{
          padding: "16px 18px",
          minHeight: 280,
          maxHeight: 320,
          overflowY: "auto",
          scrollbarWidth: "none",
          background: "#fafbff",
        }}
      >
        {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              display: "flex", alignItems: "baseline", gap: 0,
              marginBottom: 5,
              fontSize: 12.5,
              color: LINE_COLORS[line.type],
              lineHeight: 1.6,
              whiteSpace: "pre",
            }}
          >
            {line.text}
            {/* Cursor only on last visible line */}
            {i === visibleCount - 1 && (
              <span style={{
                display: "inline-block",
                width: 7, height: 13,
                background: C.primary,
                marginLeft: 2,
                opacity: cursor ? 1 : 0,
                verticalAlign: "middle",
                transition: "opacity 0.1s",
              }} />
            )}
          </motion.div>
        ))}

        {/* If not started yet */}
        {visibleCount === 0 && (
          <div style={{ color: C.textMuted, fontSize: 12 }}>
            <span>$ </span>
            <span style={{
              display: "inline-block", width: 7, height: 13,
              background: C.textMuted,
              opacity: cursor ? 1 : 0,
              verticalAlign: "middle",
            }} />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "8px 18px",
        borderTop: `1px solid ${C.borderLight}`,
        background: C.bgSoft,
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {[
          { dot: "#16a34a", label: "BSP: OK"    },
          { dot: "#4f46e5", label: "RTOS: READY" },
          { dot: "#d97706", label: "BUILD: v0.9" },
        ].map((s) => (
          <div key={s.label} style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, fontWeight: 600,
            color: C.textMuted, letterSpacing: "0.08em",
            whiteSpace: "nowrap", fontFamily: MONO,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: s.dot, display: "inline-block",
            }} />
            {s.label}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 10, color: C.textMuted, fontFamily: MONO, whiteSpace: "nowrap" }}>
          AUROWINX-ES
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function EmbeddedSystems() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="embedded-systems"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: C.bgLight,
        fontFamily: FONT,
        padding: "110px 0 100px",
      }}
    >
      {/* ── GRID LINES BG ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage:
          `linear-gradient(${C.border}55 1px, transparent 1px),` +
          `linear-gradient(90deg, ${C.border}55 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* ── FADE EDGES ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background:
          `radial-gradient(ellipse 80% 60% at 50% 50%,` +
          ` transparent 40%, ${C.bgLight} 100%)`,
      }} />

      <div className="es-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
      }}>

        {/* ── SECTION BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 20px", borderRadius: 50,
            border: `1px solid ${C.border}`,
            background: C.bgAccent,
            color: C.primary,
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: C.shadowSm, fontFamily: MONO,
          }}>
            <Terminal style={{ width: 12, height: 12 }} />
            embedded_systems.init()
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5 }} />
            <span style={{
              padding: "2px 11px", borderRadius: 50,
              background: C.gradPrimary,
              color: "#fff", fontSize: 10, letterSpacing: "0.1em",
            }}>
              COMING_SOON
            </span>
          </span>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="es-main-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}>

          {/* ── LEFT: CONTENT ── */}
          <div>

            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 18,
              }}
            >
              <div style={{
                width: 3, height: 22, borderRadius: 2,
                background: C.gradPrimary,
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.20em", textTransform: "uppercase",
                color: C.primary, fontFamily: MONO,
              }}>
                firmware · rtos · micro-architecture
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
              style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: "0 0 22px",
                color: C.textPrimary,
              }}
            >
              Bare Metal.
              <br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Real-Time.
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
              style={{
                color: C.textSecondary,
                fontSize: "clamp(0.93rem, 1.3vw, 1.02rem)",
                lineHeight: 1.85,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              BSP bring-up, driver stacks, power management and RTOS porting
              for ARM, RISC-V, and proprietary cores — engineered for
              resource-constrained, performance-critical targets.
            </motion.p>

            {/* Capabilities grid */}
            <motion.div
              className="es-caps"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.30 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 36,
              }}
            >
              {CAPS.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.06, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: `1px solid ${C.borderLight}`,
                    background: C.bgWhite,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: C.textMuted, fontFamily: MONO,
                    minWidth: 18,
                  }}>
                    {cap.tag}
                  </span>
                  <div style={{
                    width: 1, height: 20,
                    background: C.borderLight,
                  }} />
                  <cap.icon style={{
                    width: 14, height: 14, color: C.primary, flexShrink: 0,
                  }} strokeWidth={2} />
                  <span style={{
                    fontSize: 12.5, fontWeight: 600,
                    color: C.textPrimary,
                  }}>
                    {cap.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat strip */}
            <motion.div
              className="es-stats"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.54, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  padding: "16px 18px",
                  background: i % 2 === 0 ? C.bgWhite : C.bgAccent,
                  borderRight: i % 2 === 0 ? `1px solid ${C.borderLight}` : "none",
                  borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    marginBottom: 5,
                  }}>
                    <s.icon style={{ width: 12, height: 12, color: C.primary }} strokeWidth={2} />
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: C.textMuted, fontFamily: MONO,
                      letterSpacing: "0.10em", textTransform: "uppercase",
                    }}>
                      {s.label}
                    </span>
                  </div>
                  <p style={{
                    margin: 0, fontSize: 12.5, fontWeight: 700,
                    color: C.textPrimary, fontFamily: MONO,
                  }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: TERMINAL ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
          >
            {/* Coming soon badge above terminal */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 12,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: C.textMuted, letterSpacing: "0.14em",
                textTransform: "uppercase", fontFamily: MONO,
              }}>
                // live preview
              </span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 12px", borderRadius: 50,
                  background: C.accentSoft,
                  border: `1px solid ${C.border}`,
                  fontSize: 10, fontWeight: 700,
                  color: C.primary, letterSpacing: "0.12em",
                  textTransform: "uppercase", fontFamily: MONO,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: C.primary, display: "inline-block",
                  }}
                />
                Coming Soon
              </motion.span>
            </div>

            <TerminalWindow inView={inView} />

            {/* Decorative data card below terminal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.70, ease: EASE }}
              style={{
                marginTop: 14,
                padding: "14px 18px",
                borderRadius: 12,
                border: `1px solid ${C.borderLight}`,
                background: C.bgWhite,
                boxShadow: C.shadowSm,
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap", gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: C.accentSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Terminal style={{ width: 16, height: 16, color: C.primary }} strokeWidth={2} />
                </div>
                <div>
                  <p style={{
                    margin: 0, fontSize: 12.5, fontWeight: 700,
                    color: C.textPrimary, fontFamily: MONO,
                  }}>
                    AUROWINX Embedded SDK
                  </p>
                  <p style={{
                    margin: 0, fontSize: 11, color: C.textMuted,
                    fontFamily: MONO,
                  }}>
                    v0.9-beta — release TBD 2025
                  </p>
                </div>
              </div>
              <span style={{
                padding: "5px 14px", borderRadius: 50,
                background: C.bgAccent,
                border: `1px solid ${C.border}`,
                fontSize: 11, fontWeight: 700,
                color: C.primary, letterSpacing: "0.10em",
                textTransform: "uppercase", fontFamily: MONO,
              }}>
                Upcoming
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        /* Tablet */
        @media (max-width: 960px) {
          .es-main-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .es-wrap {
            padding: 0 20px !important;
          }
          #embedded-systems {
            padding: 72px 0 64px !important;
          }
        }
        /* Mobile */
        @media (max-width: 600px) {
          .es-wrap { padding: 0 16px !important; }
          .es-caps {
            grid-template-columns: 1fr !important;
            gap: 7px !important;
          }
          .es-stats {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        /* Large screens / TV */
        @media (min-width: 1400px) {
          .es-main-grid { gap: 96px !important; }
          .es-wrap { max-width: 1320px !important; }
        }
        @media (min-width: 1800px) {
          .es-wrap { max-width: 1520px !important; }
        }
        /* Hide scrollbar */
        #embedded-systems *::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}