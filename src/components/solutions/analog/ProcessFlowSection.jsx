// ProcessFlowSection.jsx — Analog IP
// Redesign: Interactive stepper with split-panel layout.
// Left: one step at a time with Framer AnimatePresence transition.
// Right: persistent overview map with live state (pending / active / done).
// Tab rail across top for quick navigation.
// Footer: progress bar + persistent CTA.
// Single blue accent. Mobile-first. Zero scroll-jank.

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, PenTool, FlaskConical,
  Layers, ScanLine, ShieldCheck, PackageCheck,
  ChevronLeft, ChevronRight, Check,
} from "lucide-react";
import { C, FONT, EASE } from "../../company/theme";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    Icon: FileText,
    title: "Specification & Architecture",
    summary: "Define the IP's target performance envelope",
    body: "Every engagement begins with a rigorous specification phase — translating system-level requirements into a precise analog IP spec. We define supply rails, signal ranges, noise budgets, bandwidth targets, and process node constraints before a single schematic element is placed.",
    tags: ["Target specs", "Noise budget", "Node selection", "Power envelope"],
  },
  {
    n: "02",
    Icon: PenTool,
    title: "Schematic Design",
    summary: "Transistor-level circuit design from first principles",
    body: "Our analog engineers hand-craft each circuit at transistor level — biasing networks, signal paths, and feedback loops — iterating against the spec. Topology choices are documented with design rationale to support any future silicon re-spins.",
    tags: ["Transistor sizing", "Biasing", "Topology selection", "Design docs"],
  },
  {
    n: "03",
    Icon: FlaskConical,
    title: "Simulation & Verification",
    summary: "Exhaustive corner, Monte Carlo and post-layout simulation",
    body: "The schematic is verified across all PVT corners (SS/TT/FF at min/max voltage and −40 °C to 125 °C). Monte Carlo runs quantify yield. AC, DC, transient, noise, and stability analyses validate every performance parameter against the original spec.",
    tags: ["PVT corners", "Monte Carlo", "Noise analysis", "Stability"],
  },
  {
    n: "04",
    Icon: Layers,
    title: "Physical Layout",
    summary: "Precision layout engineered for silicon performance",
    body: "Layout is crafted with matching, shielding, and guard-ring strategies specific to each IP type. ADC layouts prioritise symmetry and substrate isolation; RF layouts enforce controlled impedance and EM shielding. Every polygon is placed with parasitic intent.",
    tags: ["Device matching", "Guard rings", "Shielding", "Floor planning"],
  },
  {
    n: "05",
    Icon: ScanLine,
    title: "Extraction & Post-Layout Sim",
    summary: "Parasitics extracted and performance re-verified",
    body: "Full RC extraction feeds a post-layout netlist that is re-simulated across all corners. Any performance regression against the pre-layout spec triggers a targeted layout fix loop — ensuring the silicon behaves exactly as simulated.",
    tags: ["RC extraction", "Netlist back-annotation", "Regression check"],
  },
  {
    n: "06",
    Icon: ShieldCheck,
    title: "DRC / LVS Sign-Off",
    summary: "Clean rule checks before tapeout submission",
    body: "Design Rule Check and Layout-vs-Schematic runs are performed against the foundry's official PDK rule deck. Zero violations are required for sign-off. ERC and antenna rule checks are also cleared, with full run logs provided as part of the deliverable package.",
    tags: ["DRC clean", "LVS clean", "ERC", "Antenna check"],
  },
  {
    n: "07",
    Icon: PackageCheck,
    title: "Delivery & Integration Support",
    summary: "GDSII + full collateral handed off, integration guided",
    body: "Final delivery includes GDSII, CDL netlist, LEF/DEF abstract, characterisation report, SPICE models (TT/SS/FF), and a datasheet. Our engineers remain available through your SoC integration phase — from LVS signoff to first silicon bring-up.",
    tags: ["GDSII", "SPICE models", "Datasheet", "Integration support"],
  },
];

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (override if your theme differs)
───────────────────────────────────────────── */
const T = {
  accent:      C.primary          ?? "#1a56db",
  accentSoft:  C.accentSoft       ?? "#e8f0ff",
  accentBorder:`rgba(26,86,219,0.15)`,
  textPrimary: C.textPrimary      ?? "#0a0f1e",
  textSecondary:C.textSecondary   ?? "#6b7280",
  textMuted:   C.textMuted        ?? "#9ca3af",
  bg:          C.bgLight          ?? "#ffffff",
  bgSoft:      C.bgSoft           ?? "#f8f9fc",
  border:      C.border           ?? "rgba(0,0,0,0.08)",
  font:        FONT               ?? "Inter, system-ui, sans-serif",
  ease:        EASE               ?? [0.25, 0.1, 0.25, 1],
};

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const stepVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -20 : 20 }),
};

const transition = { duration: 0.28, ease: T.ease };

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/* Tab rail — scrollable on mobile */
function TabRail({ active, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        scrollbarWidth: "none",
        borderBottom: `0.5px solid ${T.border}`,
        msOverflowStyle: "none",
      }}
    >
      {STEPS.map((s, i) => {
        const isDone   = i < active;
        const isActive = i === active;
        return (
          <button
            key={s.n}
            onClick={() => onSelect(i)}
            aria-label={`Go to step ${s.n}: ${s.title}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "12px 16px",
              background: "none",
              border: "none",
              borderBottom: isActive
                ? `2px solid ${T.accent}`
                : "2px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              fontFamily: T.font,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: isActive ? T.accent : isDone ? T.textMuted : T.textSecondary,
              transition: "color 0.18s, border-color 0.18s",
              opacity: isDone ? 0.6 : 1,
            }}
          >
            {/* Step bubble */}
            <span
              style={{
                width: 16, height: 16,
                borderRadius: "50%",
                background: isActive || isDone ? T.accent : T.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.18s",
              }}
            >
              {isDone ? (
                <Check style={{ width: 9, height: 9, color: "#fff" }} />
              ) : (
                <span style={{
                  fontSize: 8, fontWeight: 700,
                  color: isActive ? "#fff" : T.accent,
                  lineHeight: 1,
                }}>
                  {s.n}
                </span>
              )}
            </span>
            {/* Show first word of title only — keeps rail compact */}
            {s.title.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}

/* Step content panel (left) */
function StepPanel({ step, direction }) {
  const { Icon } = step;

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step.n}
        custom={direction}
        variants={stepVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "28px 32px",
        }}
      >
        {/* Top row: step label + icon */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: T.textMuted,
          }}>
            Step {step.n} of 07
          </span>
          <div style={{
            width: 40, height: 40,
            background: T.accentSoft,
            border: `0.5px solid ${T.accentBorder}`,
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon style={{ width: 18, height: 18, color: T.accent }} />
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          margin: 0,
          fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)",
          fontWeight: 600,
          color: T.textPrimary,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          fontFamily: T.font,
        }}>
          {step.title}
        </h3>

        {/* Summary */}
        <p style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 600,
          color: T.accent,
          letterSpacing: "0.01em",
          fontFamily: T.font,
        }}>
          {step.summary}
        </p>

        {/* Body */}
        <p style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.85,
          color: T.textSecondary,
          fontFamily: T.font,
          flex: 1,
        }}>
          {step.body}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {step.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: T.accent,
                background: T.accentSoft,
                border: `0.5px solid ${T.accentBorder}`,
                borderRadius: 4,
                padding: "3px 8px",
                fontFamily: T.font,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* Overview map (right) */
function OverviewPanel({ active, onSelect }) {
  return (
    <div
      role="navigation"
      aria-label="Step overview"
      style={{
        overflowY: "auto",
        borderLeft: `0.5px solid ${T.border}`,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        scrollbarWidth: "thin",
        scrollbarColor: `${T.border} transparent`,
      }}
    >
      {STEPS.map((s, i) => {
        const isDone   = i < active;
        const isActive = i === active;
        return (
          <button
            key={s.n}
            onClick={() => onSelect(i)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "8px 8px",
              background: isActive ? T.accentSoft : "transparent",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "background 0.18s",
              marginBottom: 1,
            }}
          >
            {/* Step number */}
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: T.textMuted,
              minWidth: 20,
              paddingTop: 2,
              letterSpacing: "0.05em",
              fontFamily: T.font,
            }}>
              {s.n}
            </span>

            {/* State dot */}
            <span style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: isActive || isDone ? T.accent : T.border,
              flexShrink: 0,
              marginTop: 5,
              transition: "background 0.2s",
            }} />

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: isActive ? T.textPrimary : T.textSecondary,
                lineHeight: 1.35,
                marginBottom: 3,
                fontFamily: T.font,
              }}>
                {s.title}
              </div>
              <div style={{
                fontSize: 11,
                color: T.textMuted,
                lineHeight: 1.5,
                fontFamily: T.font,
              }}>
                {s.summary}
              </div>
            </div>

            {/* Check indicator */}
            {(isActive || isDone) && (
              <Check style={{
                width: 12, height: 12,
                color: T.accent,
                opacity: isDone ? 0.4 : 1,
                flexShrink: 0,
                marginTop: 3,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* Nav controls + progress bar */
function Footer({ active, total, onPrev, onNext }) {
  const pct = Math.round(((active + 1) / total) * 100);
  const nextStep = STEPS[active + 1];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "12px 32px",
      borderTop: `0.5px solid ${T.border}`,
      flexWrap: "wrap",
    }}>
      {/* Left: prev/next + progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={active === 0}
          aria-label="Previous step"
          style={{
            width: 32, height: 32,
            border: `0.5px solid ${T.border}`,
            borderRadius: 8,
            background: "transparent",
            cursor: active === 0 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: active === 0 ? 0.3 : 1,
            transition: "background 0.18s, border-color 0.18s",
          }}
          onMouseEnter={(e) => { if (active > 0) { e.currentTarget.style.background = T.accent; e.currentTarget.style.borderColor = T.accent; e.currentTarget.querySelector("svg").style.color = "#fff"; }}}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.border; e.currentTarget.querySelector("svg").style.color = T.textSecondary; }}
        >
          <ChevronLeft style={{ width: 14, height: 14, color: T.textSecondary }} />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={active === total - 1}
          aria-label="Next step"
          style={{
            width: 32, height: 32,
            border: `0.5px solid ${T.border}`,
            borderRadius: 8,
            background: "transparent",
            cursor: active === total - 1 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: active === total - 1 ? 0.3 : 1,
            transition: "background 0.18s, border-color 0.18s",
          }}
          onMouseEnter={(e) => { if (active < total - 1) { e.currentTarget.style.background = T.accent; e.currentTarget.style.borderColor = T.accent; e.currentTarget.querySelector("svg").style.color = "#fff"; }}}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.border; e.currentTarget.querySelector("svg").style.color = T.textSecondary; }}
        >
          <ChevronRight style={{ width: 14, height: 14, color: T.textSecondary }} />
        </button>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 100, height: 3,
            background: T.border,
            borderRadius: 2,
            overflow: "hidden",
          }}>
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: T.ease }}
              style={{
                height: "100%",
                background: T.accent,
                borderRadius: 2,
              }}
            />
          </div>
          <span style={{
            fontSize: 11,
            color: T.textMuted,
            fontFamily: T.font,
            minWidth: 56,
          }}>
            {pct}% complete
          </span>
        </div>

        {/* Next step hint */}
        {nextStep && (
          <span style={{
            fontSize: 11,
            color: T.textMuted,
            fontFamily: T.font,
            display: "none",  // shown via @media below
          }} className="pf-next-hint">
            Next: {nextStep.title.split(" ")[0]}…
          </span>
        )}
      </div>

      {/* Right: CTA */}
      <a
        href="#contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: T.accent,
          background: T.accentSoft,
          border: `0.5px solid ${T.accentBorder}`,
          borderRadius: 6,
          padding: "7px 16px",
          textDecoration: "none",
          fontFamily: T.font,
          letterSpacing: "0.01em",
          transition: "background 0.18s, color 0.18s, border-color 0.18s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = T.accent;
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = T.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = T.accentSoft;
          e.currentTarget.style.color = T.accent;
          e.currentTarget.style.borderColor = T.accentBorder;
        }}
      >
        Start your engagement
        <ChevronRight style={{ width: 12, height: 12 }} />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function ProcessFlowSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((i) => {
    if (i < 0 || i >= STEPS.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  const goPrev = () => go(active - 1);
  const goNext = () => go(active + 1);

  return (
    <section
      aria-labelledby="pf-heading"
      style={{
        position: "relative",
        background: T.bgSoft,
        fontFamily: T.font,
        padding: "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 60px)",
        overflow: "hidden",
      }}
    >
      {/* ── Section header ── */}
      <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 16,
            fontSize: 11, fontWeight: 600,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: T.accent,
          }}>
            <span style={{ width: 20, height: 1, background: T.accent, display: "inline-block" }} />
            Design Process
            <span style={{ width: 20, height: 1, background: T.accent, display: "inline-block" }} />
          </div>
        </motion.div>

        <motion.h2
          id="pf-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08, duration: 0.6, ease: T.ease }}
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700,
            color: T.textPrimary,
            letterSpacing: "-0.05em",
            lineHeight: 1.08,
            fontFamily: T.font,
          }}
        >
          From Spec to{" "}
          <span style={{
            background: `linear-gradient(135deg, ${T.accent}, #3b82f6)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Silicon
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.18, duration: 0.6 }}
          style={{
            margin: "0 auto",
            maxWidth: 480,
            fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
            lineHeight: 1.8,
            color: T.textSecondary,
            fontFamily: T.font,
          }}
        >
          A rigorous, repeatable flow that takes every analog IP from first specification
          to tape-out-ready GDSII — with zero surprises at sign-off.
        </motion.p>
      </div>

      {/* ── Stepper component ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.22, duration: 0.65, ease: T.ease }}
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          background: T.bg,
          border: `0.5px solid ${T.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.04)",
        }}
      >
        {/* ── Header row: title + big step number ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          padding: "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 40px) clamp(20px, 3vw, 28px)",
          borderBottom: `0.5px solid ${T.border}`,
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: T.accent, marginBottom: 10,
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: "50%",
                background: T.accent, display: "inline-block",
              }} />
              Analog IP — Design Process
            </div>
            <h3 style={{
              margin: "0 0 8px",
              fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
              fontWeight: 700,
              color: T.textPrimary,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              fontFamily: T.font,
            }}>
              From Spec to{" "}
              <span style={{
                background: `linear-gradient(135deg, ${T.accent}, #3b82f6)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Silicon
              </span>
            </h3>
            <p style={{
              margin: 0,
              fontSize: 12.5,
              color: T.textSecondary,
              lineHeight: 1.7,
              maxWidth: 420,
              fontFamily: T.font,
            }}>
              A rigorous, repeatable flow — zero surprises at sign-off.
            </p>
          </div>

          {/* Big ghost step counter */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                color: T.textPrimary,
                letterSpacing: "-0.08em",
                lineHeight: 1,
                opacity: 0.07,
                fontFamily: T.font,
                userSelect: "none",
              }}
            >
              {STEPS[active].n}
            </motion.div>
            <div style={{
              fontSize: 10, fontWeight: 600,
              letterSpacing: "0.1em",
              color: T.textMuted,
              textTransform: "uppercase",
              marginTop: 2,
            }}>
              of 07 stages
            </div>
          </div>
        </div>

        {/* ── Tab rail ── */}
        <TabRail active={active} onSelect={go} />

        {/* ── Body: step panel + overview ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr clamp(200px, 32%, 300px)",
        }}
          className="pf-body-grid"
        >
          {/* Step content */}
          <StepPanel step={STEPS[active]} direction={direction} />

          {/* Overview map — hidden on mobile via responsive style below */}
          <div className="pf-overview-col" style={{ overflow: "hidden" }}>
            <OverviewPanel active={active} onSelect={go} />
          </div>
        </div>

        {/* ── Footer: nav + progress + CTA ── */}
        <Footer
          active={active}
          total={STEPS.length}
          onPrev={goPrev}
          onNext={goNext}
        />
      </motion.div>

      {/* ── Responsive styles ── */}
      <style>{`
        /* Tablet: narrow overview */
        @media (max-width: 900px) {
          .pf-body-grid {
            grid-template-columns: 1fr 180px !important;
          }
        }

        /* Mobile: hide overview, single column */
        @media (max-width: 640px) {
          .pf-body-grid {
            grid-template-columns: 1fr !important;
          }
          .pf-overview-col {
            display: none !important;
          }
          .pf-next-hint {
            display: inline !important;
          }
        }

        /* Large desktop: slightly wider overview */
        @media (min-width: 1280px) {
          .pf-body-grid {
            grid-template-columns: 1fr 320px !important;
          }
        }

        /* Scrollbar styling for overview */
        .pf-overview-col::-webkit-scrollbar {
          width: 4px;
        }
        .pf-overview-col::-webkit-scrollbar-track {
          background: transparent;
        }
        .pf-overview-col::-webkit-scrollbar-thumb {
          background: ${T.border};
          border-radius: 2px;
        }

        /* Tab rail hide scrollbar */
        .pf-tab-rail::-webkit-scrollbar {
          display: none;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}