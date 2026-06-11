// src/components/products/CustomRD.jsx
// ─────────────────────────────────────────────────
// Section : Custom R&D Solutions
// Theme   : theme.js light palette (C.bgWhite / C.bgAccent)
// Requires: framer-motion, lucide-react

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C, FONT, EASE, fadeUp, STEP_COLORS } from "../products/theme";
import {
  FlaskConical, Telescope, Cpu, Layers, GitBranch,
  Microscope, Lightbulb, ShieldCheck, BarChart2,
  ChevronRight, ArrowRight, Zap, Search,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   CAPABILITIES
───────────────────────────────────────────────── */
const CAPS = [
  {
    Icon: Telescope,
    title: "Technology Scouting",
    desc: "Systematic evaluation of emerging process nodes, EDA toolchains, and IP ecosystems — mapped directly to your product roadmap and risk tolerance.",
  },
  {
    Icon: Microscope,
    title: "Competitive Teardown",
    desc: "Structured reverse-architecture analysis of competitor silicon — die shots, functional decomposition, and performance benchmarking with actionable IP delta reports.",
  },
  {
    Icon: Lightbulb,
    title: "Architecture Exploration",
    desc: "Pre-RTL micro-architecture studies across multiple design points — power, performance, area trade-off modelling before a single line of HDL is committed.",
  },
  {
    Icon: Cpu,
    title: "Rapid Silicon Prototyping",
    desc: "FPGA-based proof-of-concept builds and shuttle-run test chips to de-risk novel architectures ahead of full tapeout investment.",
  },
  {
    Icon: GitBranch,
    title: "Novel IP Conception",
    desc: "Greenfield block-level IP development — from specification through design, verification closure, and silicon-ready handoff with full documentation.",
  },
  {
    Icon: BarChart2,
    title: "Feasibility & Due Diligence",
    desc: "Independent technical feasibility studies and M&A-grade silicon due diligence reports for investors, acquirers, and executive design reviews.",
  },
];

/* ─────────────────────────────────────────────────
   ENGAGEMENT PROCESS
───────────────────────────────────────────────── */
const PROCESS = [
  {
    num: "01",
    label: "Brief & Scope",
    detail: "Define research objective, success criteria, and boundaries in a structured discovery session.",
  },
  {
    num: "02",
    label: "State-of-Art Survey",
    detail: "Patent landscape, academic literature, and competitive silicon reviewed and synthesised.",
  },
  {
    num: "03",
    label: "Prototype & Validate",
    detail: "Rapid model or FPGA prototype built to test the core hypothesis before full commitment.",
  },
  {
    num: "04",
    label: "IP Transfer & Report",
    detail: "Fully documented findings, design artefacts, and recommendations handed off to your team.",
  },
];

/* ─────────────────────────────────────────────────
   DOMAIN TAGS
───────────────────────────────────────────────── */
const DOMAINS = [
  "RISC-V Cores", "SerDes PHY", "PLL / Clock", "AI Accelerators",
  "SRAM Compilers", "NoC Fabric", "ADC / DAC", "Security Engines",
  "PCIe Gen5", "HBM Interface", "Chiplet Integration", "Low-Power IoT",
];

/* ─────────────────────────────────────────────────
   STAT BAR
───────────────────────────────────────────────── */
const STATS = [
  { value: "40+",   label: "Research Engagements" },
  { value: "6",     label: "Process Nodes Covered" },
  { value: "< 3wk", label: "Feasibility Turnaround" },
  { value: "100%",  label: "NDA-Protected Delivery" },
];

/* ─────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────── */
export default function CustomRD() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="custom-rd"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: C.bgWhite,
        fontFamily: FONT,
        padding: "120px 0 110px",
      }}
    >
      {/* ── BACKGROUND BLOBS ── */}
      <div style={{
        position: "absolute", top: "-10%", left: "-6%",
        width: "38vw", height: "38vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-8%", right: "-4%",
        width: "30vw", height: "30vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div className="crd-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
      }}>

        {/* ── BADGE ── */}
        <motion.div {...fadeUp}
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
            boxShadow: C.shadowSm, fontFamily: FONT,
          }}>
            <FlaskConical style={{ width: 12, height: 12 }} />
            Custom R&amp;D Solutions
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5 }} />
            <span style={{
              padding: "2px 11px", borderRadius: 50,
              background: C.gradPrimary,
              color: "#fff", fontSize: 10, letterSpacing: "0.1em",
            }}>
              Research Lab
            </span>
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: C.primary, marginBottom: 16,
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, fontFamily: FONT,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
            Explore First · Validate Fast · Scale with Confidence
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: "0 auto 20px",
              color: C.textPrimary, maxWidth: 700, fontFamily: FONT,
            }}
          >
            Ideas Worth{" "}
            <span style={{
              background: C.gradPrimary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Proving in Silicon.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
            style={{
              color: C.textSecondary,
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              lineHeight: 1.85, maxWidth: 580,
              margin: "0 auto", fontFamily: FONT,
            }}
          >
            When your product roadmap requires answers that don't exist yet —
            AUROWINX deploys structured research engagements to de-risk novel
            architectures, validate emerging technologies, and convert
            speculation into silicon-ready IP.
          </motion.p>
        </div>

        {/* ── STAT ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="crd-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderRadius: 20,
            border: `1px solid ${C.border}`,
            background: C.bgAccent,
            overflow: "hidden",
            marginBottom: 40,
            boxShadow: C.shadowSm,
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: "28px 20px",
              textAlign: "center",
              borderRight: i < STATS.length - 1 ? `1px solid ${C.border}` : "none",
              position: "relative",
            }}>
              {/* top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%",
                height: 2, borderRadius: "0 0 4px 4px",
                background: C.gradPrimary,
              }} />
              <p style={{
                margin: "0 0 6px",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 900, letterSpacing: "-0.04em",
                color: C.primary, lineHeight: 1,
                fontFamily: FONT,
              }}>
                {s.value}
              </p>
              <p style={{
                margin: 0, fontSize: 11, fontWeight: 600,
                color: C.textMuted,
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: FONT,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── MAIN BENTO GRID ── */}
        <div className="crd-bento" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 16,
          marginBottom: 16,
        }}>

          {/* CELL A — large hero statement (spans 2 cols, row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
            style={{
              gridColumn: "span 2",
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              background: C.bgAccent,
              boxShadow: C.shadowMd,
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* subtle corner decoration */}
            <div style={{
              position: "absolute", bottom: -40, right: -40,
              width: 200, height: 200, borderRadius: "50%",
              border: `1px solid ${C.border}`,
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: -20, right: -20,
              width: 120, height: 120, borderRadius: "50%",
              border: `1px solid ${C.borderLight}`,
              pointerEvents: "none",
            }} />

            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 50,
                background: C.bgWhite,
                border: `1px solid ${C.border}`,
                marginBottom: 18,
              }}>
                <Search style={{ width: 10, height: 10, color: C.primary }} />
                <span style={{
                  fontSize: 10, fontWeight: 700, color: C.primary,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  fontFamily: FONT,
                }}>
                  Research-Driven Innovation
                </span>
              </div>

              <h3 style={{
                margin: "0 0 14px",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 900, lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: C.textPrimary, fontFamily: FONT,
              }}>
                Your internal R&D bench,{" "}
                <span style={{
                  background: C.gradPrimary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  on demand.
                </span>
              </h3>

              <p style={{
                margin: 0, fontSize: 14,
                color: C.textSecondary, lineHeight: 1.8,
                maxWidth: 480, fontFamily: FONT,
              }}>
                Most engineering teams can execute. Few have the bandwidth to
                simultaneously explore what comes next. AUROWINX Custom R&D
                bridges that gap — providing semiconductor-grade research
                rigour with startup-level agility.
              </p>
            </div>

            {/* Domain tag cloud */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {DOMAINS.map((d, i) => (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.04, ease: EASE }}
                  style={{
                    padding: "4px 12px", borderRadius: 50,
                    fontSize: 11, fontWeight: 700,
                    background: C.bgWhite,
                    border: `1px solid ${C.border}`,
                    color: i % 3 === 0 ? C.primary : i % 3 === 1 ? C.secondary : C.accent,
                    fontFamily: FONT, letterSpacing: "0.04em",
                  }}
                >
                  {d}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CELL B — Engagement process (col 3, rows 1–2) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.26, ease: EASE }}
            style={{
              gridColumn: "3",
              gridRow: "1 / 3",
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              background: C.bgWhite,
              boxShadow: C.shadowMd,
              padding: "28px 26px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 50,
              background: C.bgAccent,
              border: `1px solid ${C.border}`,
              marginBottom: 22, alignSelf: "flex-start",
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: C.primary,
                letterSpacing: "0.16em", textTransform: "uppercase",
                fontFamily: FONT,
              }}>
                Engagement Process
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.1, ease: EASE }}
                  style={{
                    display: "flex", gap: 16,
                    paddingBottom: i < PROCESS.length - 1 ? 24 : 0,
                    position: "relative",
                  }}
                >
                  {/* Vertical connector line */}
                  {i < PROCESS.length - 1 && (
                    <div style={{
                      position: "absolute",
                      left: 18, top: 36,
                      width: 1,
                      bottom: 0,
                      background: `linear-gradient(180deg, ${STEP_COLORS[i]}, ${STEP_COLORS[i + 1]})`,
                      opacity: 0.3,
                    }} />
                  )}

                  {/* Number bubble */}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    flexShrink: 0,
                    background: `${STEP_COLORS[i]}15`,
                    border: `1.5px solid ${STEP_COLORS[i]}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1,
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 800,
                      color: STEP_COLORS[i],
                      fontFamily: FONT,
                    }}>
                      {step.num}
                    </span>
                  </div>

                  <div style={{ paddingTop: 4 }}>
                    <p style={{
                      margin: "0 0 4px",
                      fontSize: 13.5, fontWeight: 800,
                      color: C.textPrimary,
                      letterSpacing: "-0.01em",
                      fontFamily: FONT,
                    }}>
                      {step.label}
                    </p>
                    <p style={{
                      margin: 0, fontSize: 12,
                      color: C.textMuted, lineHeight: 1.6,
                      fontFamily: FONT,
                    }}>
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, ease: EASE }}
              style={{
                marginTop: 24,
                padding: "14px 18px",
                borderRadius: 14,
                background: C.gradPrimary,
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontSize: 12.5, fontWeight: 700,
                color: "#fff", fontFamily: FONT,
              }}>
                Start a Research Brief
              </span>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowRight style={{ width: 13, height: 13, color: "#fff" }} />
              </div>
            </motion.div>
          </motion.div>

          {/* CELL C — Capabilities grid (spans 2 cols, row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.34, ease: EASE }}
            style={{
              gridColumn: "span 2",
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              background: C.bgWhite,
              boxShadow: C.shadowMd,
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div style={{
              padding: "18px 24px 14px",
              borderBottom: `1px solid ${C.borderLight}`,
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: C.textMuted,
                letterSpacing: "0.14em", textTransform: "uppercase",
                fontFamily: FONT,
              }}>
                Research Capabilities
              </span>
              <span style={{
                padding: "3px 10px", borderRadius: 50,
                background: C.accentSoft,
                border: `1px solid ${C.border}`,
                fontSize: 10, fontWeight: 700,
                color: C.primary, fontFamily: FONT,
                letterSpacing: "0.06em",
              }}>
                6 Specialisations
              </span>
            </div>

            {/* 2-col capability rows */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
            }}>
              {CAPS.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.07, ease: EASE }}
                  style={{
                    padding: "18px 22px",
                    borderRight: i % 2 === 0 ? `1px solid ${C.borderLight}` : "none",
                    borderBottom: i < CAPS.length - 2 ? `1px solid ${C.borderLight}` : "none",
                    display: "flex", gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    flexShrink: 0,
                    background: C.accentSoft,
                    border: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1,
                  }}>
                    <cap.Icon
                      style={{ width: 16, height: 16, color: C.primary }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <p style={{
                      margin: "0 0 5px",
                      fontSize: 13, fontWeight: 800,
                      color: C.textPrimary,
                      letterSpacing: "-0.01em",
                      fontFamily: FONT,
                    }}>
                      {cap.title}
                    </p>
                    <p style={{
                      margin: 0, fontSize: 11.5,
                      color: C.textMuted, lineHeight: 1.65,
                      fontFamily: FONT,
                    }}>
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── BOTTOM BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          style={{
            borderRadius: 20,
            border: `1px solid ${C.border}`,
            background: C.bgAccent,
            boxShadow: C.shadowSm,
            padding: "28px 36px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: C.gradPrimary,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: C.shadowMd,
            }}>
              <Zap style={{ width: 20, height: 20, color: "#fff" }} strokeWidth={2} />
            </div>
            <div>
              <p style={{
                margin: "0 0 3px",
                fontSize: 15, fontWeight: 900,
                color: C.textPrimary,
                letterSpacing: "-0.02em",
                fontFamily: FONT,
              }}>
                Have a research challenge with no clear path forward?
              </p>
              <p style={{
                margin: 0, fontSize: 13,
                color: C.textMuted, fontFamily: FONT,
              }}>
                Share your brief — our architects respond within 48 hours with a scoped engagement proposal.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: 50,
              background: C.bgWhite,
              border: `1px solid ${C.border}`,
            }}>
              <ShieldCheck style={{ width: 12, height: 12, color: C.primary }} />
              <span style={{
                fontSize: 11, fontWeight: 700, color: C.textSecondary,
                fontFamily: FONT, letterSpacing: "0.04em",
              }}>
                Full NDA on day one
              </span>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "11px 20px", borderRadius: 50,
              background: C.gradPrimary,
              boxShadow: C.shadowMd,
              cursor: "pointer",
            }}>
              <span style={{
                fontSize: 12.5, fontWeight: 700,
                color: "#fff", fontFamily: FONT,
                letterSpacing: "0.04em",
              }}>
                Submit a Research Brief
              </span>
              <ArrowRight style={{ width: 13, height: 13, color: "#fff" }} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 1024px) {
          .crd-bento {
            grid-template-columns: 1fr 1fr !important;
          }
          .crd-bento > div:nth-child(1) { grid-column: span 2 !important; }
          .crd-bento > div:nth-child(2) {
            grid-column: span 2 !important;
            grid-row: auto !important;
          }
          .crd-bento > div:nth-child(3) { grid-column: span 2 !important; }
          .crd-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .crd-stats > div:nth-child(2) { border-right: none !important; }
          .crd-stats > div:nth-child(1),
          .crd-stats > div:nth-child(2) {
            border-bottom: 1px solid #c7d2fe !important;
          }
        }
        @media (max-width: 640px) {
          #custom-rd { padding: 72px 0 64px !important; }
          .crd-wrap  { padding: 0 16px !important; }
          .crd-bento { grid-template-columns: 1fr !important; }
          .crd-bento > div { grid-column: 1 !important; grid-row: auto !important; }
          .crd-bento > div:nth-child(3) > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          .crd-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1400px) {
          .crd-wrap { max-width: 1320px !important; }
        }
      `}</style>
    </section>
  );
}