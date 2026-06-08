// TestimonialsSection.jsx — AurowinX Analog IP
// Redesign: Editorial stacked carousel — one full-bleed testimonial at a time,
// domain-indexed navigation strip, staggered word reveal on quote text,
// monochromatic palette using theme tokens throughout.
// No rainbow per-testimonial colors. No sidebar card grid.

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { C, FONT, EASE } from "../../company/theme";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 0,
    quote:
      "AurowinX delivered a 12-bit 500 MSPS ADC that hit every spec on first silicon. Their team's attention to layout parasitics and corner analysis was exceptional — we had zero re-spins.",
    name: "Dr. Arjun Mehta",
    title: "VP of Silicon Engineering",
    company: "NexaSoC Technologies",
    domain: "High-Speed Data Acquisition",
    domainShort: "ADC / DAC",
    initials: "AM",
    result: "Zero re-spins",
    resultDetail: "First-silicon success",
  },
  {
    id: 1,
    quote:
      "The Sub-GHz transceiver IP we licensed from AurowinX passed FCC pre-compliance on the first attempt. Their RF expertise and thorough simulation methodology saved us at least two months of schedule.",
    name: "Priya Sundaram",
    title: "Chief Hardware Architect",
    company: "Orbis IoT Systems",
    domain: "IoT & Wireless",
    domainShort: "RF / Wireless",
    initials: "PS",
    result: "2 months saved",
    resultDetail: "First-pass FCC compliance",
  },
  {
    id: 2,
    quote:
      "We integrated their PLL and LDO IP into our automotive SoC. The PVT characterisation data was incredibly thorough, which gave our system validation team full confidence during AEC-Q100 qualification.",
    name: "Ravi Krishnamurthy",
    title: "Director, Mixed-Signal Design",
    company: "Pinnacle Automotive Chips",
    domain: "Automotive Grade",
    domainShort: "Auto / AEC-Q100",
    initials: "RK",
    result: "AEC-Q100 qualified",
    resultDetail: "Full PVT characterisation",
  },
  {
    id: 3,
    quote:
      "Their SERDES IP at 28 Gbps integrated cleanly into our SerDes-based switch fabric. The IBIS-AMI models were accurate enough that our channel simulation matched silicon within 2%.",
    name: "Ananya Iyer",
    title: "Principal Analog Engineer",
    company: "Stratosphere Semiconductors",
    domain: "High-Speed Interconnect",
    domainShort: "SerDes / 28G",
    initials: "AI",
    result: "2% simulation accuracy",
    resultDetail: "IBIS-AMI model fidelity",
  },
];

// ─────────────────────────────────────────────
// Animated word-by-word quote reveal
// ─────────────────────────────────────────────
function AnimatedQuote({ text, id }) {
  const words = text.split(" ");
  return (
    <AnimatePresence mode="wait">
      <motion.blockquote
        key={id}
        aria-label={text}
        style={{
          margin: "0 0 40px",
          fontFamily: FONT,
          fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
          fontWeight: 700,
          lineHeight: 1.6,
          color: C.textPrimary,
          letterSpacing: "-0.025em",
          maxWidth: 720,
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${id}-${i}`}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.35,
              delay: i * 0.022,
              ease: EASE,
            }}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.blockquote>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Domain nav strip — replaces compact card list
// ─────────────────────────────────────────────
function DomainStrip({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Select testimonial"
      style={{
        display: "flex",
        gap: 0,
        borderRadius: 14,
        background: C.bgSoft,
        border: `1.5px solid ${C.borderLight}`,
        padding: 4,
        overflow: "hidden",
      }}
    >
      {TESTIMONIALS.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            style={{
              all: "unset",
              flex: 1,
              padding: "9px 12px",
              borderRadius: 10,
              cursor: "pointer",
              background: isActive ? "#fff" : "transparent",
              boxShadow: isActive ? C.shadowSm : "none",
              border: isActive ? `1px solid ${C.borderLight}` : "1px solid transparent",
              transition: "all 0.25s",
              textAlign: "center",
            }}
          >
            <span style={{
              display: "block",
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: isActive ? C.primary : C.textMuted,
              transition: "color 0.25s",
              whiteSpace: "nowrap",
            }}>
              {String(t.id + 1).padStart(2, "0")}
            </span>
            <span style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: isActive ? C.textPrimary : C.textMuted,
              transition: "color 0.25s",
              marginTop: 2,
              whiteSpace: "nowrap",
            }}>
              {t.domainShort}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Progress bar — auto-advance indicator
// ─────────────────────────────────────────────
function ProgressBar({ active, duration, running }) {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      alignItems: "center",
    }}>
      {TESTIMONIALS.map((t) => {
        const isActive = active === t.id;
        return (
          <div
            key={t.id}
            style={{
              height: 2,
              flex: isActive ? 3 : 1,
              borderRadius: 2,
              background: C.bgSoft,
              overflow: "hidden",
              transition: "flex 0.4s ease",
            }}
          >
            <motion.div
              key={`${t.id}-${active}`}
              initial={{ scaleX: 0 }}
              animate={isActive && running ? { scaleX: 1 } : { scaleX: isActive ? 0 : 0 }}
              transition={isActive ? { duration: duration / 1000, ease: "linear" } : { duration: 0 }}
              style={{
                height: "100%",
                background: C.primary,
                transformOrigin: "left",
                borderRadius: 2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Result badge
// ─────────────────────────────────────────────
function ResultBadge({ result, detail }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          background: C.bgAccent,
          border: `1.5px solid ${C.border}`,
          borderRadius: 50,
          padding: "8px 18px 8px 10px",
        }}
      >
        {/* Dot */}
        <span style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: C.primary,
          flexShrink: 0,
          boxShadow: `0 0 0 3px ${C.accentSoft}`,
        }} />
        <span style={{
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 800,
          color: C.primary,
          letterSpacing: "-0.02em",
        }}>
          {result}
        </span>
        <span style={{
          fontSize: 11,
          color: C.textMuted,
          fontWeight: 600,
          borderLeft: `1px solid ${C.borderLight}`,
          paddingLeft: 12,
        }}>
          {detail}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
const AUTO_ADVANCE_MS = 6500;

export default function SDTestimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(true);
  const timerRef = useRef(null);

  const advance = useCallback(() => {
    setActive((v) => (v + 1) % TESTIMONIALS.length);
  }, []);

  const prev = () => {
    setRunning(false);
    setActive((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setRunning(false);
    setActive((v) => (v + 1) % TESTIMONIALS.length);
  };

  const pick = (id) => {
    setRunning(false);
    setActive(id);
  };

  // Auto-advance
  useEffect(() => {
    if (!running) return;
    timerRef.current = setTimeout(advance, AUTO_ADVANCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [active, running, advance]);

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={ref}
      aria-label="Client testimonials"
      className="sd-testimonials-section"
      style={{
        position: "relative",
        background: C.bgWhite,
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${C.bgSoft} 1px, transparent 1px),
          linear-gradient(90deg, ${C.bgSoft} 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.65,
      }} />

      {/* Indigo glow — bottom left */}
      <div style={{
        position: "absolute",
        width: 600, height: 400,
        bottom: "-10%", left: "-6%",
        background: `radial-gradient(ellipse, ${C.accentSoft} 0%, transparent 65%)`,
        filter: "blur(80px)",
        pointerEvents: "none",
        opacity: 0.55,
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── HEADER ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "flex-end",
          marginBottom: "clamp(40px, 5vw, 64px)",
        }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                style={{
                  display: "block", width: 28, height: 2,
                  background: C.primary, transformOrigin: "left",
                }}
              />
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: C.primary,
              }}>
                Client Voices
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              color: C.textPrimary,
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              margin: 0,
            }}>
              Trusted by<br />
              <span style={{ color: C.primary }}>silicon teams.</span>
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <p style={{
              fontSize: 14, color: C.textSecondary,
              lineHeight: 1.8, margin: "0 0 20px", maxWidth: 360,
            }}>
              Engineers and architects at leading semiconductor companies share
              their experience working with AurowinX on analog IP.
            </p>
            {/* Domain strip nav */}
            <DomainStrip active={active} onChange={pick} />
          </motion.div>
        </div>

        {/* ── MAIN STAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{
            background: C.bgAccent,
            border: `1.5px solid ${C.borderLight}`,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: C.shadowLg,
          }}
        >
          {/* Top accent line — progress bar */}
          <div style={{
            background: "#fff",
            borderBottom: `1px solid ${C.borderLight}`,
            padding: "14px 36px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}>
            {/* Domain label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={t.domain}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: C.primary, whiteSpace: "nowrap",
                }}
              >
                {t.domain}
              </motion.span>
            </AnimatePresence>

            {/* Progress bars */}
            <div style={{ flex: 1 }}>
              <ProgressBar active={active} duration={AUTO_ADVANCE_MS} running={running} />
            </div>

            {/* Counter */}
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: C.textMuted, whiteSpace: "nowrap",
            }}>
              {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Quote body */}
          <div className="sd-testimonial-body-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 0,
            alignItems: "stretch",
          }}>
            {/* Left: quote + author */}
            <div style={{
              padding: "clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)",
            }}>
              <ResultBadge result={t.result} detail={t.resultDetail} />

              <div style={{ marginTop: 28 }}>
                <AnimatedQuote text={t.quote} id={t.id} />
              </div>

              {/* Author row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${t.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.15, ease: EASE }}
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  {/* Initials avatar */}
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: C.gradPrimary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: "#fff",
                    fontFamily: FONT, flexShrink: 0,
                    boxShadow: C.shadowMd,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{
                      margin: 0,
                      fontFamily: FONT,
                      fontSize: 14, fontWeight: 800,
                      color: C.textPrimary, letterSpacing: "-0.02em",
                    }}>
                      {t.name}
                    </p>
                    <p style={{
                      margin: "3px 0 0",
                      fontSize: 12, color: C.textSecondary,
                    }}>
                      {t.title} · {t.company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: control column */}
            <div className="sd-testimonial-control-col" style={{
              width: 72,
              borderLeft: `1px solid ${C.borderLight}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "24px 0",
              background: "#fff",
            }}>
              {/* Prev */}
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.08, backgroundColor: C.bgAccent }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
                style={{
                  all: "unset",
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1.5px solid ${C.borderLight}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: C.textSecondary,
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <ArrowLeft size={15} />
              </motion.button>

              {/* Index dots */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                {TESTIMONIALS.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => pick(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    animate={{
                      height: active === i ? 20 : 6,
                      backgroundColor: active === i ? C.primary : C.borderLight,
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{
                      all: "unset",
                      width: 4,
                      borderRadius: 2,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              {/* Next */}
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.08, backgroundColor: C.bgAccent }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
                style={{
                  all: "unset",
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1.5px solid ${C.borderLight}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: C.textSecondary,
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM STRIP: all four authors ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          className="sd-testimonial-bottom-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            background: C.borderLight,
            borderRadius: 16,
            overflow: "hidden",
            marginTop: 20,
            border: `1.5px solid ${C.borderLight}`,
          }}
        >
          {TESTIMONIALS.map((t, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={t.id}
                onClick={() => pick(t.id)}
                animate={{ backgroundColor: isActive ? C.bgAccent : "#fff" }}
                transition={{ duration: 0.25 }}
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  cursor: "pointer",
                }}
              >
                {/* Mini avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isActive ? C.gradPrimary : C.bgSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800,
                  color: isActive ? "#fff" : C.textMuted,
                  flexShrink: 0,
                  transition: "all 0.25s",
                }}>
                  {t.initials}
                </div>
                <div style={{ textAlign: "left", overflow: "hidden" }}>
                  <p style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontSize: 12, fontWeight: 700,
                    color: isActive ? C.textPrimary : C.textSecondary,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 0.25s",
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    margin: "1px 0 0",
                    fontSize: 10, color: C.textMuted,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {t.company}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

      </div>

      {/* Responsive styles */}
      <style>{`
        .sd-testimonials-section {
          padding: clamp(64px, 8vw, 112px) clamp(20px, 5vw, 60px);
        }
        @media (max-width: 860px) {
          section[aria-label="Client testimonials"] > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          section[aria-label="Client testimonials"] > div > div:first-child > div:last-child p {
            max-width: 100% !important;
          }
        }
        @media (max-width: 680px) {
          .sd-testimonials-section {
            padding: 44px 16px 52px !important;
          }
          .sd-testimonial-body-grid {
            grid-template-columns: 1fr !important;
          }
          .sd-testimonial-control-col {
            display: none !important;
          }
          .sd-testimonial-bottom-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 400px) {
          .sd-testimonial-bottom-strip {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}