// KeyDifferentiators.jsx — Company Page
// AurowinX — What Sets Us Apart
//
// Mobile   : vertical tab rail (numbered pill selector) + single animated panel
//            Trust bar becomes 2×2 stat grid
// Tablet   : 2-col accordion cards — tap to expand description
//            Trust bar becomes scrolling ticker strip
// Desktop  : 3-col animated card grid (original layout, polished)
// TV       : wider max-width, larger text, taller cards

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { C, FONT, fadeUp, EASE } from "././theme";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const differentiators = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Deep Technical Expertise",
    description: "Engineers with 8–20 years of hands-on experience in complex SoC and ASIC projects, covering the full silicon lifecycle from RTL to GDSII.",
    highlight: "8–20 Yrs Experience",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.12)",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Domain-Focused Engineering",
    description: "Specialists in functional verification, physical design, and DFT with domain knowledge across AI, 5G, automotive, networking, and consumer electronics.",
    highlight: "AI · 5G · Automotive",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.12)",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Proven Silicon Success",
    description: "Delivered multiple successful tapeouts at 7nm, 5nm, and advanced FinFET nodes. Achieved target test coverage and faster timing closure for Tier 1 clients.",
    highlight: "7nm · 5nm · 3nm",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.12)",
  },
  {
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Scalable & Reliable Delivery",
    description: "Flexible team ramp-up and engagement models aligned with evolving project needs. Milestone-based tracking with clear deliverables and proactive reporting.",
    highlight: "Milestone-Based",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.12)",
  },
  {
    number: "05",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Accelerated Time-to-Tapeout",
    description: "IP reuse strategies, pre-built verification environments, and tool automation to reduce cycle times and accelerate your silicon roadmap.",
    highlight: "IP Reuse · Automation",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.12)",
  },
  {
    number: "06",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: "Structured Quality Governance",
    description: "Embedded verification governance with predefined quality gates, active surveillance, and early deviation detection — reducing rework and integration risk.",
    highlight: "Quality By Design",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.12)",
  },
];

const trustItems = [
  { label: "End-to-End Ownership", sub: "Architecture to GDSII" },
  { label: "Quality by Design",    sub: "Built-in at every stage" },
  { label: "Silicon Proven",       sub: "Designs across multiple nodes" },
  { label: "On-Time Delivery",     sub: "With risk mitigation" },
];

/* ─────────────────────────────────────────────
   VIEWPORT HOOK
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
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return {
    isMobile:  width < 640,
    isTablet:  width >= 640 && width < 1024,
    isCompact: width < 1024,
    isTV:      width >= 1600,
  };
}

/* ─────────────────────────────────────────────
   MOBILE — numbered tab rail + animated single panel
───────────────────────────────────────────── */
const panelVariants = {
  enter:  (dir) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
  center: { opacity: 1, y: 0 },
  exit:   (dir) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
};

function MobileTabPanel() {
  const [active, setActive]     = useState(0);
  const [direction, setDirection] = useState(1);
  const item = differentiators[active];

  const go = (i) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      {/* Numbered pill tab rail */}
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        scrollbarWidth: "none",
        paddingBottom: 16,
        msOverflowStyle: "none",
      }}>
        <style>{`.kd-tabs::-webkit-scrollbar{display:none}`}</style>
        {differentiators.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={d.number}
              onClick={() => go(i)}
              className="kd-tabs"
              style={{
                flexShrink: 0,
                width: isActive ? "auto" : 40,
                height: 40,
                borderRadius: 20,
                border: `1.5px solid ${isActive ? d.color : "rgba(0,0,0,0.1)"}`,
                background: isActive ? d.color : "#fff",
                color: isActive ? "#fff" : C.textMuted,
                fontSize: 12,
                fontWeight: 800,
                fontFamily: FONT,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: isActive ? "0 14px 0 10px" : "0",
                justifyContent: "center",
                transition: "all 0.28s ease",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: isActive ? "rgba(255,255,255,0.25)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800,
              }}>
                {d.number}
              </span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  style={{ fontSize: 11, fontWeight: 700, overflow: "hidden" }}
                >
                  {d.title.split(" ")[0]}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Animated content panel */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: EASE }}
          style={{
            background: "#fff",
            borderRadius: 20,
            border: `1.5px solid ${item.border}`,
            padding: "26px 22px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
          }}
        >
          {/* Left accent bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
            background: `linear-gradient(180deg, ${item.color}, transparent)`,
            borderRadius: "20px 0 0 20px", opacity: 0.6,
          }} />

          {/* Number watermark */}
          <div style={{
            position: "absolute", top: 14, right: 18,
            fontSize: 56, fontWeight: 900,
            color: item.color, opacity: 0.05,
            lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none",
          }}>
            {item.number}
          </div>

          {/* Icon + highlight */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: item.bg, border: `1px solid ${item.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: item.color,
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: item.color,
              background: item.bg, border: `1px solid ${item.border}`,
              borderRadius: 9999, padding: "4px 12px",
            }}>
              {item.highlight}
            </span>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            {item.title}
          </h3>
          <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.8, margin: "0 0 20px" }}>
            {item.description}
          </p>

          {/* Step progress dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {differentiators.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{ border: "none", background: "transparent", padding: 3, cursor: "pointer" }}>
                <motion.span
                  animate={{ width: i === active ? 22 : 6, background: i === active ? item.color : "rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ display: "block", height: 6, borderRadius: 3 }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TABLET — 2-col accordion cards
───────────────────────────────────────────── */
function TabletAccordionCard({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1.5px solid ${open ? item.color + "40" : item.border}`,
        overflow: "hidden",
        boxShadow: open
          ? `0 8px 28px ${item.color}14`
          : "0 2px 10px rgba(15,23,42,0.05)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, ${item.color}, transparent)`,
        opacity: open ? 0.7 : 0.3,
        transition: "opacity 0.25s",
        borderRadius: "16px 0 0 16px",
      }} />

      {/* Header button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%",
          background: open ? item.bg : "#fff",
          border: "none",
          padding: "18px 18px 18px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 14,
          textAlign: "left",
          fontFamily: FONT,
          transition: "background 0.25s ease",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          background: open ? "#fff" : item.bg,
          border: `1px solid ${item.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: item.color, flexShrink: 0,
          transition: "background 0.25s",
        }}>
          {item.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: item.color, marginBottom: 3,
          }}>
            {item.number} · {item.highlight}
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            {item.title}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          style={{ color: item.color, flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 17, height: 17 }} />
        </motion.div>
      </motion.button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px 20px" }}>
              <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, lineHeight: 1.8 }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP / TV — card grid (original + polished)
───────────────────────────────────────────── */
function DesktopCard({ item, i, isTV }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${item.color}14`, transition: { duration: 0.25 } }}
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: isTV ? "38px 34px" : "32px 30px",
        border: `1px solid ${item.border}`,
        boxShadow: "0 2px 12px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontSize: isTV ? 56 : 48, fontWeight: 900,
        color: item.color, opacity: 0.06, lineHeight: 1,
        letterSpacing: "-0.04em", userSelect: "none",
      }}>
        {item.number}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{
          width: isTV ? 52 : 48, height: isTV ? 52 : 48, borderRadius: 12,
          background: item.bg, border: `1px solid ${item.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: item.color,
        }}>
          {item.icon}
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: item.color,
          background: item.bg, border: `1px solid ${item.border}`,
          borderRadius: 9999, padding: "4px 12px", whiteSpace: "nowrap",
        }}>
          {item.highlight}
        </span>
      </div>

      <h3 style={{
        fontSize: isTV ? 18 : 17, fontWeight: 700, color: C.textPrimary,
        marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.3,
      }}>
        {item.title}
      </h3>
      <p style={{ fontSize: isTV ? 14.5 : 14, color: C.textSecondary, lineHeight: 1.78, margin: 0, flex: 1 }}>
        {item.description}
      </p>

      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, ${item.color}, transparent)`,
        borderRadius: "18px 0 0 18px", opacity: 0.5,
      }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TRUST BAR VARIANTS
───────────────────────────────────────────── */
function TrustBarDesktop({ isTV }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      style={{
        borderRadius: 18,
        background: "#f8fafc",
        border: "1px solid #e0e7ff",
        padding: isTV ? "36px 48px" : "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      {trustItems.map((item, i) => (
        <div key={i} style={{
          textAlign: "center",
          padding: "8px 16px",
          borderRight: i < trustItems.length - 1 ? "1px solid #e0e7ff" : "none",
          minWidth: 160, flex: 1,
        }}>
          <div style={{ fontSize: isTV ? 15 : 14, fontWeight: 700, color: C.textPrimary, marginBottom: 4, letterSpacing: "-0.01em" }}>
            {item.label}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.02em" }}>
            {item.sub}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function TrustBarMobile() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
    }}>
      {trustItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.07, ease: EASE }}
          style={{
            background: "#fff",
            border: "1px solid #e0e7ff",
            borderRadius: 14,
            padding: "16px 14px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {item.label}
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.02em", lineHeight: 1.4 }}>
            {item.sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TrustBarTablet() {
  return (
    <div style={{
      display: "flex",
      overflowX: "auto",
      gap: 12,
      scrollbarWidth: "none",
      paddingBottom: 4,
    }}>
      <style>{`.kd-trust::-webkit-scrollbar{display:none}`}</style>
      {trustItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, ease: EASE }}
          className="kd-trust"
          style={{
            flexShrink: 0,
            background: "#fff",
            border: "1px solid #e0e7ff",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 200,
          }}
        >
          <ChevronRight style={{ width: 14, height: 14, color: C.primary, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.01em" }}>
              {item.label}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
              {item.sub}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function KeyDifferentiators() {
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const horizPad = isMobile ? "20px" : isTablet ? "28px" : "24px";
  const maxW = isTV ? 1500 : 1200;

  return (
    <section style={{
      background: "#ffffff",
      fontFamily: FONT,
      position: "relative",
      overflow: "hidden",
      padding: isMobile
        ? "60px 0 68px"
        : isTablet
        ? "72px 0 80px"
        : isTV
        ? "130px 0 140px"
        : "100px 0 110px",
    }}>
      {/* Subtle grid bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.022,
        backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* ── LABEL ── */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.primary,
          }}>
            What Sets Us Apart
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isTV ? "clamp(2.4rem, 4vw, 3.6rem)" : "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700, color: C.textPrimary,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
          }}
        >
          Key{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Differentiators
          </span>
        </motion.h2>

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp} transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: isTV ? 17 : 15,
            color: C.textSecondary, maxWidth: 580,
            margin: isMobile ? "0 auto 36px" : "0 auto 72px",
            lineHeight: 1.75,
          }}
        >
          What makes Aurowinx the right engineering partner — from first engagement to final tapeout.
        </motion.p>

        {/* ── MOBILE: tab rail + single animated panel ── */}
        {isMobile && (
          <div style={{ marginBottom: 32 }}>
            <MobileTabPanel />
          </div>
        )}

        {/* ── TABLET: 2-col accordion grid ── */}
        {isTablet && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 32,
          }}>
            {differentiators.map((item, i) => (
              <TabletAccordionCard key={i} item={item} i={i} />
            ))}
          </div>
        )}

        {/* ── DESKTOP / TV: 3-col card grid ── */}
        {!isCompact && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "repeat(3, 1fr)" : "repeat(auto-fit, minmax(340px, 1fr))",
            gap: isTV ? 28 : 24,
            marginBottom: 64,
          }}>
            {differentiators.map((item, i) => (
              <DesktopCard key={i} item={item} i={i} isTV={isTV} />
            ))}
          </div>
        )}

        {/* ── TRUST BAR (variant per breakpoint) ── */}
        <div style={{ marginTop: isMobile || isTablet ? 0 : 0 }}>
          {isMobile  && <TrustBarMobile />}
          {isTablet  && <TrustBarTablet />}
          {!isCompact && <TrustBarDesktop isTV={isTV} />}
        </div>

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}