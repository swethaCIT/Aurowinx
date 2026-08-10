// SDTools.jsx — ASIC Page
// Toolchain index — 3 flow stages, each pointing to its specialty page
// Light palette, premium UX

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Layers, FlaskConical, ArrowRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const STAGE_GROUPS = [
  {
    key: "verification",
    stageLabel: "Stage 1 · Verification",
    title: "Functional & Formal Verification",
    desc: "Simulation, formal proofs and coverage closure before a design moves downstream.",
    color: "#4f46e5",
    bg: "#eef2ff",
    Icon: CheckCircle2,
    tools: ["Synopsys VCS", "Cadence Xcelium", "JasperGold"],
    linkLabel: "Explore the Verification toolchain",
    href: "/solutions/design-verification",
  },
  {
    key: "synthesis-pd",
    stageLabel: "Stage 2 · Synthesis & Physical Design",
    title: "Synthesis, Place & Route, Sign-Off",
    desc: "RTL-to-GDSII: technology mapping, PNR, static timing and physical verification.",
    color: "#059669",
    bg: "#ecfdf5",
    Icon: Layers,
    tools: ["Synopsys DC", "Cadence Innovus", "Mentor Calibre"],
    linkLabel: "Explore the Physical Design toolchain",
    href: "/solutions/physical-design",
  },
  {
    key: "dft-test",
    stageLabel: "Stage 3 · DFT & Test",
    title: "Design for Test & Silicon Bring-Up",
    desc: "Scan/ATPG pattern generation, MBIST and ATE sign-off for production test.",
    color: "#dc2626",
    bg: "#fef2f2",
    Icon: FlaskConical,
    tools: ["Synopsys TetraMAX", "Mentor Tessent ATPG", "Advantest SmarTest"],
    linkLabel: "Explore the DFT toolchain",
    href: "/solutions/dft-engineering",
  },
];

/* ── Stage card ── */
function StageCard({ stage, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
      style={{
        flex: 1, minWidth: 0,
        display: "flex", flexDirection: "column", gap: 12,
        padding: "22px 20px",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: stage.bg, color: stage.color,
        border: `1px solid ${stage.color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <stage.Icon style={{ width: 19, height: 19 }} />
      </div>

      <div>
        <span style={{
          display: "block", fontSize: 10.5, fontWeight: 700,
          color: stage.color, letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 6,
        }}>
          {stage.stageLabel}
        </span>
        <p style={{ margin: "0 0 6px", fontSize: 15.5, fontWeight: 800, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.01em" }}>
          {stage.title}
        </p>
        <p style={{ margin: 0, fontSize: 12.5, color: C.textSecondary, lineHeight: 1.6 }}>
          {stage.desc}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
        {stage.tools.map((tool, ti) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.12 + ti * 0.05, ease: EASE }}
            style={{
              padding: "5px 12px", borderRadius: 50,
              background: stage.bg, border: `1px solid ${stage.color}28`,
              color: stage.color, fontSize: 11.5, fontWeight: 700,
            }}
          >
            {tool}
          </motion.span>
        ))}
      </div>

      <motion.a
        href={stage.href}
        whileHover="hover"
        style={{
          marginTop: "auto", paddingTop: 14,
          display: "inline-flex", alignItems: "center", gap: 6,
          color: stage.color, fontWeight: 700, fontSize: 12.5,
          textDecoration: "none",
        }}
      >
        {stage.linkLabel}
        <motion.span variants={{ hover: { x: 3 } }} style={{ display: "flex" }}>
          <ArrowRight style={{ width: 14, height: 14 }} />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

export default function SDTools() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="sd-tools-section"
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", width: 500, height: 350, top: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)", willChange: "transform", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Tool Ecosystem</span>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            One Flow, Three Specialist Toolchains
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            A few flagship tools per stage of the flow — see the full toolchain on each specialty page.
          </p>
        </motion.div>

        {/* Stage flow */}
        <div style={{
          background: "#fff", borderRadius: 24,
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(79,70,229,0.03) 0%, transparent 70%)",
          }} />
          <div className="sd-tools-stage-flow" style={{ position: "relative", zIndex: 1 }}>
            {STAGE_GROUPS.map((stage, i) => (
              <div key={stage.key} style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 0 }}>
                <StageCard stage={stage} i={i} inView={inView} />
                {i < STAGE_GROUPS.length - 1 && (
                  <div className="sd-tools-connector">
                    <ArrowRight style={{ width: 16, height: 16, color: C.textMuted, flexShrink: 0 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom methodology strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, ease: EASE }}
          className="sd-tools-method-strip"
          style={{
            marginTop: 20, display: "flex", flexWrap: "wrap",
            gap: 8, justifyContent: "center",
          }}
        >
          {["UVM 1.2", "SystemVerilog", "VHDL", "UPF / CPF", "SDC Constraints", "SPEF / SPICE", "GDS-II", "OA Database", "Tcl Scripting"].map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.62 + i * 0.04, ease: EASE }}
              whileHover={{ scale: 1.07, y: -2 }}
              style={{
                padding: "6px 15px", borderRadius: 50,
                background: "#fff", border: `1px solid ${C.border}`,
                fontSize: 12, color: C.textSecondary, fontWeight: 600,
                boxShadow: C.shadowSm, cursor: "default",
              }}
            >
              {m}
            </motion.span>
          ))}
        </motion.div>

      </div>

      <style>{`
        .sd-tools-section {
          padding: 72px 48px 64px;
        }
        .sd-tools-stage-flow {
          display: flex;
          align-items: stretch;
        }
        .sd-tools-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 0 4px;
        }
        @media (max-width: 900px) {
          .sd-tools-section {
            padding: 48px 24px 52px !important;
          }
          .sd-tools-stage-flow {
            flex-direction: column;
          }
          .sd-tools-stage-flow > div {
            flex-direction: column;
          }
          .sd-tools-connector {
            padding: 4px 0;
            transform: rotate(90deg);
          }
        }
        @media (max-width: 768px) {
          .sd-tools-section {
            padding: 40px 16px 44px !important;
          }
          .sd-tools-method-strip {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            justify-content: flex-start !important;
            scrollbar-width: none;
            margin-left: -16px;
            margin-right: -16px;
            padding: 0 16px;
          }
          .sd-tools-method-strip::-webkit-scrollbar { display: none; }
          .sd-tools-method-strip > span {
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
