// VerifFlow.jsx
// AurowinX Design Verification — 6-Step Verification Flow
// Light & professional, indigo accent, rich scroll animations

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Layers, Code2, Activity, BarChart3, Shield, ArrowRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const STEPS = [
  {
    num: "01",
    title: "Verification Planning",
    sub: "Spec analysis, verification plan, coverage goals, risk assessment and DV closure criteria definition.",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Target style={{ width: 22, height: 22 }} />,
  },
  {
    num: "02",
    title: "Testbench Architecture",
    sub: "UVM environment setup, UVCs, BFMs, scoreboards, reference models and coverage collectors.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Layers style={{ width: 22, height: 22 }} />,
  },
  {
    num: "03",
    title: "Test Development",
    sub: "Directed tests, constrained random stimulus, SystemVerilog assertions (SVA) and corner case coverage.",
    color: "#a855f7",
    bg: "#faf5ff",
    icon: <Code2 style={{ width: 22, height: 22 }} />,
  },
  {
    num: "04",
    title: "Simulation & Debug",
    sub: "VCS, Xcelium, Questa — regression runs, debug with Verdi/SimVision, triage automation pipelines.",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Activity style={{ width: 22, height: 22 }} />,
  },
  {
    num: "05",
    title: "Coverage Closure",
    sub: "Functional, code, toggle, FSM coverage — merge and analysis, exclusion review, sign-off metrics.",
    color: "#0284c7",
    bg: "#f0f9ff",
    icon: <BarChart3 style={{ width: 22, height: 22 }} />,
  },
  {
    num: "06",
    title: "Formal Verification",
    sub: "Property checking, equivalence, JasperGold, SymbiYosys, CDC/RDC analysis and final sign-off.",
    color: "#059669",
    bg: "#ecfdf5",
    icon: <Shield style={{ width: 22, height: 22 }} />,
  },
];

/* ── Single step card ── */
function StepCard({ step, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -8, boxShadow: `0 24px 56px ${step.color}18` }}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 20,
        padding: "28px 24px 24px",
        border: `1px solid ${C.borderLight}`,
        boxShadow: C.shadowMd,
        cursor: "default",
        overflow: "hidden",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Top color bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${step.color}, ${step.color}60)`,
          transformOrigin: "left",
        }}
      />

      {/* Step number watermark */}
      <span style={{
        position: "absolute", bottom: -8, right: 12,
        fontSize: "5.5rem", fontWeight: 900,
        color: step.color, opacity: 0.06,
        letterSpacing: "-0.06em", lineHeight: 1,
        fontFamily: FONT, pointerEvents: "none",
        userSelect: "none",
      }}>
        {step.num}
      </span>

      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 18,
      }}>
        {/* Icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: step.bg,
          color: step.color,
          border: `1px solid ${step.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {step.icon}
        </div>

        {/* Step badge */}
        <span style={{
          padding: "4px 10px", borderRadius: 50,
          background: step.bg,
          color: step.color,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          border: `1px solid ${step.color}20`,
        }}>
          Step {step.num}
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontWeight: 800, fontSize: 15,
        color: C.textPrimary, margin: "0 0 10px",
        fontFamily: FONT, letterSpacing: "-0.02em",
      }}>
        {step.title}
      </p>

      {/* Description */}
      <p style={{
        fontSize: 13, color: C.textSecondary,
        lineHeight: 1.75, margin: 0,
      }}>
        {step.sub}
      </p>
    </motion.div>
  );
}

/* ── Connector arrow between steps ── */
function StepConnector({ i, inView }) {
  if (i === 2) return null; // no connector after row 1 end
  if (i === 5) return null; // no connector after last
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5 + i * 0.1 }}
      style={{
        position: "absolute",
        top: "50%", right: -16,
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 32, height: 32,
        borderRadius: "50%",
        background: "#fff",
        border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: C.shadowSm,
        color: C.primary,
      }}
    >
      <ArrowRight style={{ width: 14, height: 14 }} />
    </motion.div>
  );
}

export default function VerifFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "100px 48px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(79,70,229,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,70,229,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute", width: 600, height: 400,
        top: "-10%", left: "30%",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12, marginBottom: 16,
          }}>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{
              color: C.primary, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              Our Process
            </span>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>

          <h2 style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 16px", letterSpacing: "-0.04em",
            fontFamily: FONT,
          }}>
            The Verification Flow
          </h2>
          <p style={{
            color: C.textSecondary, fontSize: 16,
            maxWidth: 520, margin: "0 auto", lineHeight: 1.75,
          }}>
            A structured, repeatable 6-phase flow that takes you from specification
            to silicon sign-off with zero gaps.
          </p>
        </motion.div>

        {/* Progress bar connector */}
        <div style={{
          position: "relative",
          marginBottom: 40,
          display: "flex",
          justifyContent: "center",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            background: "#fff",
            border: `1px solid ${C.borderLight}`,
            borderRadius: 50,
            padding: "6px 8px",
            boxShadow: C.shadowSm,
          }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, ease: EASE }}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: step.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 10, fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.num}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                    style={{
                      width: 32, height: 2,
                      background: `linear-gradient(90deg, ${step.color}, ${STEPS[i + 1].color})`,
                      transformOrigin: "left",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid — 3 x 2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ position: "relative" }}>
              <StepCard step={step} i={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
          style={{ textAlign: "center", marginTop: 52 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            padding: "20px 36px",
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.borderLight}`,
            boxShadow: C.shadowMd,
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: C.textPrimary }}>
                Ready to start your verification project?
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: C.textMuted }}>
                Our engineers follow this exact flow — every engagement, every time.
              </p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                textDecoration: "none", flexShrink: 0,
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 50,
                background: C.gradPrimary, color: "#fff",
                fontWeight: 700, fontSize: 13,
                boxShadow: "0 6px 20px rgba(79,70,229,0.30)",
              }}
            >
              Get Started <ArrowRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}