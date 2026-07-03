// SDProcessFlow.jsx — ASIC Page
// Interactive tabbed flow — NO long scroll
// Left sidebar stage selector + animated right detail panel
// Premium UX, light palette

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const STAGES = [
  {
    num: "01", tag: "Concept",
    title: "Specification & Architecture",
    color: "#4f46e5", bg: "#eef2ff",
    img: "https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?w=800&q=80",
    desc: "Define system architecture, micro-architecture specs, PPA targets and design partitioning strategy before a single line of RTL is written.",
    points: ["System architecture definition", "Micro-architecture spec", "PPA target setting", "Design partitioning & planning"],
    stat: { label: "Planning Accuracy", value: "98%" },
  },
  {
    num: "02", tag: "RTL Design",
    title: "RTL Coding & Review",
    color: "#7c3aed", bg: "#f5f3ff",
    img: "https://images.unsplash.com/photo-1754039984985-ef607d80113a?w=800&q=80",
    desc: "SystemVerilog RTL design with lint, CDC analysis and rigorous peer reviews ensuring synthesizability and zero functional ambiguity.",
    points: ["SystemVerilog RTL coding", "Lint & CDC analysis", "Design review & sign-off", "IP integration"],
    stat: { label: "Code Quality", value: "Zero Lint" },
  },
  {
    num: "03", tag: "Verification",
    title: "Functional Verification",
    color: "#0891b2", bg: "#ecfeff",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    desc: "UVM testbench, constrained-random simulation, formal property checking and 99%+ functional coverage closure — no escapes.",
    points: ["UVM testbench development", "Constrained random simulation", "Formal verification (FPV)", "99%+ coverage closure"],
    stat: { label: "Functional Coverage", value: "99%+" },
  },
  {
    num: "04", tag: "Synthesis",
    title: "Logic Synthesis",
    color: "#059669", bg: "#ecfdf5",
    img: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=800&q=80",
    desc: "RTL-to-netlist synthesis with technology mapping, timing constraints, DFT hooks and area/power optimization for target nodes.",
    points: ["Technology mapping", "Timing constraint definition", "DFT scan insertion", "Netlist optimization"],
    stat: { label: "Timing Closure", value: "100%" },
  },
  {
    num: "05", tag: "DFT",
    title: "Design for Testability",
    color: "#d97706", bg: "#fffbeb",
    img: "https://images.unsplash.com/photo-1748000970909-845f4aa144d2?w=800&q=80",
    desc: "Full DFT — scan stitching, MBIST, ATPG pattern generation and ATE-ready delivery targeting 95%+ fault coverage.",
    points: ["Scan insertion & stitching", "MBIST & hard repair", "ATPG pattern generation", "ATE handoff ready"],
    stat: { label: "Fault Coverage", value: "95%+" },
  },
  {
    num: "06", tag: "Physical Design",
    title: "Place & Route",
    color: "#dc2626", bg: "#fef2f2",
    img: "https://images.unsplash.com/photo-1587845323226-bad89242c735?w=800&q=80",
    desc: "Full PNR from floorplanning through detailed routing — timing closure, SI/PI and DRC-clean layout across 5nm to 180nm nodes.",
    points: ["Floorplan & power planning", "Placement & CTS", "Routing & ECO closure", "SI/PI analysis"],
    stat: { label: "DRC Clean", value: "100%" },
  },
  {
    num: "07", tag: "Sign-Off",
    title: "Physical Verification",
    color: "#0284c7", bg: "#f0f9ff",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    desc: "STA, IR-drop, EM, DRC/LVS and LEC — comprehensive sign-off ensuring first-pass GDSII tape-out with zero surprises.",
    points: ["MCMM STA sign-off", "DRC / LVS / LEC", "IR-drop & EM analysis", "GDSII tape-out"],
    stat: { label: "First-Pass Rate", value: "95%+" },
  },
  {
    num: "08", tag: "Silicon",
    title: "Bring-Up & Validation",
    color: "#7c3aed", bg: "#f5f3ff",
    img: "https://images.unsplash.com/photo-1650530415027-dc9199f473ec?w=800&q=80",
    desc: "Post-silicon bring-up, debug, characterization and ATE correlation — from first power-on to volume production ramp.",
    points: ["Silicon bring-up & debug", "ATE correlation", "Characterization & margins", "Production ramp support"],
    stat: { label: "Silicon Success", value: "99%+" },
  },
];

/* ── Progress pipeline strip ── */
function Pipeline({ active, stages, onSelect, inView }) {
  return (
    <div className="sd-flow-pipeline" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28, overflowX: "auto", paddingBottom: 4, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
      {stages.map((s, i) => (
        <div key={s.num} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <motion.button
            onClick={() => onSelect(i)}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06, ease: EASE }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 5, padding: "8px 10px", border: "none",
              background: "transparent", cursor: "pointer", fontFamily: FONT,
            }}
          >
            <motion.div
              animate={{
                background: active === i ? s.color : active > i ? `${s.color}60` : "rgba(148,163,184,0.15)",
                scale: active === i ? 1.15 : 1,
                boxShadow: active === i ? `0 4px 16px ${s.color}50` : "none",
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: active >= i ? "#fff" : C.textMuted,
                fontSize: 11, fontWeight: 800,
                border: active === i ? `2px solid ${s.color}` : "2px solid transparent",
              }}
            >
              {active > i
                ? <CheckCircle2 style={{ width: 16, height: 16 }} />
                : s.num
              }
            </motion.div>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: active === i ? s.color : C.textMuted,
              whiteSpace: "nowrap",
            }}>
              {s.tag}
            </span>
          </motion.button>

          {/* Connector line */}
          {i < stages.length - 1 && (
            <motion.div
              animate={{ background: active > i ? `linear-gradient(90deg, ${s.color}, ${stages[i+1].color})` : C.borderLight }}
              transition={{ duration: 0.4 }}
              style={{ width: 20, height: 2, borderRadius: 1, flexShrink: 0, marginTop: -14 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SDProcessFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section
      ref={ref}
      className="sd-flow-section"
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px),linear-gradient(90deg,rgba(79,70,229,0.03) 1px,transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", width: 500, height: 350, top: "-10%", right: "-5%", background: "radial-gradient(ellipse,rgba(79,70,229,0.07) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>ASIC Journey</span>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Concept to Silicon
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 15, maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
            8-stage full ASIC flow — click any stage to explore what we deliver.
          </p>
        </motion.div>

        {/* Pipeline strip */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pipeline active={active} stages={STAGES} onSelect={setActive} inView={inView} />
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="sd-flow-detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 0, borderRadius: 24, overflow: "hidden",
              boxShadow: `0 24px 64px ${stage.color}16, 0 4px 24px rgba(0,0,0,0.07)`,
              border: `1px solid ${stage.color}22`,
            }}
          >
            {/* LEFT — Image */}
            <div className="sd-flow-img-container" style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
              <motion.img
                src={stage.img} alt={stage.title}
                initial={{ scale: 1.06 }} animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
              />
              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${stage.color}65 0%, rgba(0,0,0,0.55) 100%)`,
              }} />
              {/* Stage badge */}
              <div style={{ position: "absolute", top: 24, left: 24 }}>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    width: 54, height: 54, borderRadius: "50%",
                    background: stage.color, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 17, fontFamily: FONT,
                    boxShadow: `0 8px 24px ${stage.color}70`,
                    border: "3px solid rgba(255,255,255,0.35)",
                  }}
                >
                  {stage.num}
                </motion.div>
              </div>
              {/* Tag */}
              <div style={{ position: "absolute", top: 32, left: 94 }}>
                <span style={{
                  padding: "5px 16px", borderRadius: 50,
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}>{stage.tag}</span>
              </div>
              {/* Bottom content */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "60px 28px 28px",
                background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
              }}>
                <p style={{ margin: "0 0 10px", fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", fontFamily: FONT, lineHeight: 1.2 }}>
                  {stage.title}
                </p>
                {/* Stat pill */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "8px 16px", borderRadius: 50,
                  background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{stage.stat.label}</span>
                  <span style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: FONT }}>{stage.stat.value}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div style={{
              background: "#fff", padding: "36px 32px",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              {/* Accent */}
              <div style={{ height: 3, width: "30%", background: `linear-gradient(90deg, ${stage.color}, ${stage.color}40)`, borderRadius: 2, marginBottom: 20 }} />

              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.9, margin: "0 0 24px" }}>
                {stage.desc}
              </p>

              {/* Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {stage.points.map((pt, j) => (
                  <motion.div
                    key={pt}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.08, ease: EASE }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px", borderRadius: 11,
                      background: j % 2 === 0 ? stage.bg : "#f8fafc",
                      border: `1px solid ${stage.color}18`,
                    }}
                  >
                    <CheckCircle2 style={{ width: 15, height: 15, color: stage.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{pt}</span>
                  </motion.div>
                ))}
              </div>

              {/* Prev / Next navigation */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <motion.button
                  onClick={() => setActive(a => Math.max(0, a - 1))}
                  disabled={active === 0}
                  whileHover={active > 0 ? { x: -3 } : {}}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 50, border: `1px solid ${C.border}`,
                    background: "#fff", color: active === 0 ? C.textMuted : C.primary,
                    fontWeight: 700, fontSize: 12, cursor: active === 0 ? "not-allowed" : "pointer",
                    fontFamily: FONT, opacity: active === 0 ? 0.4 : 1,
                  }}
                >
                  <ChevronRight style={{ width: 14, height: 14, transform: "rotate(180deg)" }} /> Previous
                </motion.button>

                {/* Stage dots */}
                <div style={{ display: "flex", gap: 5 }}>
                  {STAGES.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActive(i)}
                      animate={{ width: active === i ? 20 : 7, background: active === i ? stage.color : C.border }}
                      style={{ height: 7, borderRadius: 4, border: "none", cursor: "pointer", padding: 0 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => setActive(a => Math.min(STAGES.length - 1, a + 1))}
                  disabled={active === STAGES.length - 1}
                  whileHover={active < STAGES.length - 1 ? { x: 3 } : {}}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 50,
                    background: active === STAGES.length - 1 ? "#fff" : stage.color,
                    border: `1px solid ${active === STAGES.length - 1 ? C.border : stage.color}`,
                    color: active === STAGES.length - 1 ? C.textMuted : "#fff",
                    fontWeight: 700, fontSize: 12,
                    cursor: active === STAGES.length - 1 ? "not-allowed" : "pointer",
                    fontFamily: FONT, opacity: active === STAGES.length - 1 ? 0.4 : 1,
                    boxShadow: active < STAGES.length - 1 ? `0 4px 16px ${stage.color}40` : "none",
                  }}
                >
                  Next <ArrowRight style={{ width: 14, height: 14 }} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        .sd-flow-section {
          padding: 72px 48px 64px;
        }
        .sd-flow-pipeline {
          scrollbar-width: none;
          mask-image: linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 16px), transparent);
        }
        .sd-flow-pipeline::-webkit-scrollbar { display: none; }
        .sd-flow-pipeline > div { scroll-snap-align: center; }
        @media (max-width: 960px) {
          .sd-flow-section {
            padding: 48px 24px 52px !important;
          }
        }
        @media (max-width: 900px) {
          .sd-flow-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .sd-flow-img-container {
            min-height: 200px !important;
          }
        }
        @media (max-width: 768px) {
          .sd-flow-section {
            padding: 40px 16px 44px !important;
          }
          .sd-flow-img-container {
            min-height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
}