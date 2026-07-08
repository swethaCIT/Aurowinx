// ProcessFlowSection.jsx — Analog IP
// Fully responsive: mobile / tablet / laptop / TV
// Desktop/TV: split-panel stepper (step panel + overview map)
// Mobile/Tablet: swipeable carousel for steps + accordion overview (no long scroll)
// Single blue accent. Zero scroll-jank. Smooth Framer Motion transitions throughout.

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, PenTool, FlaskConical,
  Layers, ScanLine, ShieldCheck, PackageCheck,
  ChevronLeft, ChevronRight, ChevronDown, Check,
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
   DESIGN TOKENS
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

const transition = { duration: 0.32, ease: T.ease };

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return {
    width,
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isCompact: width < 1024,
    isDesktop: width >= 1024 && width < 1600,
    isTV: width >= 1600,
  };
}

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const stepVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

/* ─────────────────────────────────────────────
   SHARED: STEP CONTENT (used by panel + carousel slide)
───────────────────────────────────────────── */
function StepContent({ step, compact }) {
  const { Icon } = step;
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: compact ? 12 : 14,
      padding: compact ? "24px 22px" : "28px 32px",
      height: "100%",
    }}>
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
          width: compact ? 36 : 40, height: compact ? 36 : 40,
          background: T.accentSoft,
          border: `0.5px solid ${T.accentBorder}`,
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon style={{ width: compact ? 16 : 18, height: compact ? 16 : 18, color: T.accent }} />
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        margin: 0,
        fontSize: compact ? "clamp(1.05rem, 5vw, 1.3rem)" : "clamp(1.15rem, 2.2vw, 1.45rem)",
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
        fontSize: compact ? 12.5 : 12,
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
        fontSize: compact ? 13 : 13.5,
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
              fontSize: compact ? 9.5 : 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: T.accent,
              background: T.accentSoft,
              border: `0.5px solid ${T.accentBorder}`,
              borderRadius: 4,
              padding: compact ? "3px 7px" : "3px 8px",
              fontFamily: T.font,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAB RAIL (desktop/TV — top navigation)
───────────────────────────────────────────── */
function TabRail({ active, onSelect, isTV }) {
  return (
    <div
      className="pf-tab-rail"
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
              padding: isTV ? "16px 22px" : "12px 16px",
              background: "none",
              border: "none",
              borderBottom: isActive
                ? `2px solid ${T.accent}`
                : "2px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              fontFamily: T.font,
              fontSize: isTV ? 13 : 11,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: isActive ? T.accent : isDone ? T.textMuted : T.textSecondary,
              transition: "color 0.18s, border-color 0.18s",
              opacity: isDone ? 0.6 : 1,
            }}
          >
            <span
              style={{
                width: isTV ? 18 : 16, height: isTV ? 18 : 16,
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
            {s.title.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP PANEL (desktop/TV — split layout left side)
───────────────────────────────────────────── */
function StepPanel({ step, direction }) {
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
      >
        <StepContent step={step} compact={false} />
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   OVERVIEW PANEL (desktop/TV — right side map)
───────────────────────────────────────────── */
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

            <span style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: isActive || isDone ? T.accent : T.border,
              flexShrink: 0,
              marginTop: 5,
              transition: "background 0.2s",
            }} />

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

/* ─────────────────────────────────────────────
   MOBILE / TABLET — SWIPEABLE CAROUSEL
───────────────────────────────────────────── */
function StepCarousel({ active, direction, onSwipe, isMobile }) {
  const step = STEPS[active];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.n}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(e, info) => {
            const threshold = 60;
            if (info.offset.x < -threshold) onSwipe(1);
            else if (info.offset.x > threshold) onSwipe(-1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <StepContent step={step} compact />
        </motion.div>
      </AnimatePresence>

      {/* Swipe hint dots */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 6,
        padding: "0 0 16px",
      }}>
        {STEPS.map((s, i) => (
          <button
            key={s.n}
            onClick={() => onSwipe(i > active ? 1 : -1, i)}
            aria-label={`Go to step ${i + 1}`}
            style={{
              border: "none",
              background: "transparent",
              padding: 4,
              cursor: "pointer",
            }}
          >
            <motion.span
              animate={{
                width: i === active ? (isMobile ? 18 : 22) : 6,
                background: i === active ? T.accent : T.border,
                opacity: i < active ? 0.5 : 1,
              }}
              transition={{ duration: 0.3, ease: T.ease }}
              style={{
                display: "block",
                height: 6,
                borderRadius: 3,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE / TABLET — ACCORDION OVERVIEW (no long scroll)
───────────────────────────────────────────── */
function OverviewAccordion({ active, onSelect }) {
  const [openIndex, setOpenIndex] = useState(active);

  // Keep accordion in sync with active carousel step
  useEffect(() => { setOpenIndex(active); }, [active]);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {STEPS.map((s, i) => {
        const isDone   = i < active;
        const isActive = i === active;
        const isOpen   = openIndex === i;
        return (
          <div
            key={s.n}
            style={{
              border: `0.5px solid ${T.border}`,
              borderRadius: 10,
              overflow: "hidden",
              background: isActive ? T.accentSoft : T.bg,
              transition: "background 0.25s ease",
            }}
          >
            <motion.button
              onClick={() => { toggle(i); onSelect(i); }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: T.font,
              }}
            >
              {/* State dot / number */}
              <span style={{
                width: 22, height: 22,
                borderRadius: "50%",
                background: isActive || isDone ? T.accent : T.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {isDone ? (
                  <Check style={{ width: 11, height: 11, color: "#fff" }} />
                ) : (
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    color: isActive ? "#fff" : T.accent,
                  }}>
                    {s.n}
                  </span>
                )}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? T.textPrimary : T.textSecondary,
                  lineHeight: 1.3,
                }}>
                  {s.title}
                </div>
                {!isOpen && (
                  <div style={{
                    fontSize: 11,
                    color: T.textMuted,
                    marginTop: 2,
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {s.summary}
                  </div>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: T.ease }}
                style={{ color: T.accent, display: "flex", flexShrink: 0 }}
              >
                <ChevronDown style={{ width: 16, height: 16 }} />
              </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: T.ease }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 14px 14px 46px" }}>
                    <p style={{
                      margin: "0 0 8px",
                      fontSize: 12.5,
                      lineHeight: 1.8,
                      color: T.textSecondary,
                    }}>
                      {s.body}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: T.accent,
                            background: T.bg,
                            border: `0.5px solid ${T.accentBorder}`,
                            borderRadius: 4,
                            padding: "3px 7px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER — nav controls + progress bar + CTA
───────────────────────────────────────────── */
function Footer({ active, total, onPrev, onNext, isMobile }) {
  const pct = Math.round(((active + 1) / total) * 100);
  const nextStep = STEPS[active + 1];

  return (
    <div style={{
      display: "flex",
      alignItems: isMobile ? "stretch" : "center",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      gap: isMobile ? 12 : 16,
      padding: isMobile ? "14px 18px" : "12px 32px",
      borderTop: `0.5px solid ${T.border}`,
      flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: isMobile ? "space-between" : "flex-start" }}>
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
        >
          <ChevronLeft style={{ width: 14, height: 14, color: T.textSecondary }} />
        </button>

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
        >
          <ChevronRight style={{ width: 14, height: 14, color: T.textSecondary }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: isMobile ? 70 : 100, height: 3,
            background: T.border,
            borderRadius: 2,
            overflow: "hidden",
          }}>
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: T.ease }}
              style={{ height: "100%", background: T.accent, borderRadius: 2 }}
            />
          </div>
          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, minWidth: 56 }}>
            {pct}% complete
          </span>
        </div>

        {nextStep && !isMobile && (
          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font }} className="pf-next-hint">
            Next: {nextStep.title.split(" ")[0]}…
          </span>
        )}
      </div>

      <a
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: T.accent,
          background: T.accentSoft,
          border: `0.5px solid ${T.accentBorder}`,
          borderRadius: 6,
          padding: "9px 16px",
          textDecoration: "none",
          fontFamily: T.font,
          letterSpacing: "0.01em",
          transition: "background 0.18s, color 0.18s, border-color 0.18s",
          whiteSpace: "nowrap",
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
  const { isMobile, isTablet, isCompact, isTV } = useViewport();

  const go = useCallback((i) => {
    if (i < 0 || i >= STEPS.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  // Swipe handler — supports direct-index jump (from dots/accordion)
  const handleSwipe = useCallback((dir, jumpIndex) => {
    if (typeof jumpIndex === "number") {
      setDirection(jumpIndex > active ? 1 : -1);
      setActive(jumpIndex);
      return;
    }
    go(active + dir);
  }, [active, go]);

  const goPrev = () => go(active - 1);
  const goNext = () => go(active + 1);

  const maxW = isTV ? 1400 : 1060;

  return (
    <section
      aria-labelledby="pf-heading"
      style={{
        position: "relative",
        background: T.bgSoft,
        fontFamily: T.font,
        padding: isMobile
          ? "48px 14px"
          : isTablet
          ? "60px 24px"
          : "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 60px)",
        overflow: "hidden",
      }}
    >
      {/* ── Section header ── */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : "clamp(40px, 6vw, 72px)" }}>
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
            fontSize: isTV ? "clamp(2.4rem, 4vw, 3.6rem)" : "clamp(1.9rem, 4vw, 3rem)",
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
            fontSize: isTV ? "1.1rem" : "clamp(0.9rem, 1.4vw, 1rem)",
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
          maxWidth: maxW,
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
          alignItems: isMobile ? "flex-start" : "flex-end",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: isMobile ? 12 : 24,
          padding: isMobile
            ? "20px 18px 16px"
            : "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 40px) clamp(20px, 3vw, 28px)",
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
              fontSize: isTV ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.2rem, 2.5vw, 1.65rem)",
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
            {!isMobile && (
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
            )}
          </div>

          {/* Big ghost step counter — hidden on mobile to save space */}
          {!isMobile && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontSize: isTV ? "clamp(3.2rem, 5vw, 5.5rem)" : "clamp(2.5rem, 6vw, 4.5rem)",
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
          )}
        </div>

        {/* ── DESKTOP / TV: tab rail + split panel ── */}
        {!isCompact && (
          <>
            <TabRail active={active} onSelect={go} isTV={isTV} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isTV ? "1fr 320px" : "1fr clamp(200px, 32%, 300px)",
              }}
              className="pf-body-grid"
            >
              <StepPanel step={STEPS[active]} direction={direction} />
              <div className="pf-overview-col" style={{ overflow: "hidden" }}>
                <OverviewPanel active={active} onSelect={go} />
              </div>
            </div>
          </>
        )}

        {/* ── MOBILE / TABLET: carousel + accordion ── */}
        {isCompact && (
          <div style={{ padding: isMobile ? "8px 0 0" : "12px 0 0" }}>
            <StepCarousel
              active={active}
              direction={direction}
              onSwipe={handleSwipe}
              isMobile={isMobile}
            />
            <div style={{ padding: isMobile ? "0 14px 16px" : "0 24px 20px" }}>
              <p style={{
                margin: "0 0 10px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: T.textMuted,
              }}>
                All Stages
              </p>
              <OverviewAccordion active={active} onSelect={go} />
            </div>
          </div>
        )}

        {/* ── Footer: nav + progress + CTA ── */}
        <Footer
          active={active}
          total={STEPS.length}
          onPrev={goPrev}
          onNext={goNext}
          isMobile={isMobile}
        />
      </motion.div>

      {/* ── Responsive styles ── */}
      <style>{`
        .pf-tab-rail::-webkit-scrollbar {
          display: none;
        }
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