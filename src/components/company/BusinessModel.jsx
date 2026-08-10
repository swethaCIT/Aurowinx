// BusinessModel.jsx
// AurowinX — Engagement Models
// Mobile/Tablet: billing pills carousel + model cards carousel + accordion comparison table
// Laptop/TV: original grid layout with premium enhancements

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FONT, EASE } from "././theme";

/* ── useBreakpoint ── */
function useBreakpoint() {
  const [bp, setBp] = useState("laptop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 640)       setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else if (w >= 1600) setBp("tv");
      else                setBp("laptop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ── DATA ── */
const billingModels = [
  {
    name: "T&M", full: "Time & Material",
    desc: "Flexible engagement where you pay for actual engineering time and resources used. Ideal for exploratory or evolving projects.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "#4f46e5", bg: "rgba(79,70,229,0.06)", border: "rgba(79,70,229,0.14)", best: "Exploratory Projects",
  },
  {
    name: "Turnkey", full: "Turnkey Delivery",
    desc: "Fixed-scope, fixed-cost engagement. Aurowinx owns end-to-end execution and delivers a fully validated output.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    color: "#0891b2", bg: "rgba(8,145,178,0.06)", border: "rgba(8,145,178,0.14)", best: "Fixed-Scope Deliverables",
  },
  {
    name: "Milestone", full: "Milestone-Based",
    desc: "Structured payment tied to clearly defined project milestones — ensuring alignment, transparency, and shared accountability at every phase.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    color: "#2563eb", bg: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.14)", best: "Long-Term Programs",
  },
];

/* ══════════════════════════════════════════
   GENERIC DRAG CAROUSEL
══════════════════════════════════════════ */
function Carousel({ items, renderItem, perView = 1, gap = 14, inView }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const controls = useAnimation();
  const trackRef = useRef(null);
  const maxIndex = Math.max(0, items.length - perView);

  const [cardW, setCardW] = useState(300);
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const tw = trackRef.current.offsetWidth;
        setCardW((tw - gap * (perView - 1)) / perView);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView, gap]);

  const goTo = useCallback((idx) => {
    const c = Math.max(0, Math.min(idx, maxIndex));
    setActive(c);
    controls.start({
      x: -(c * (cardW + gap)),
      transition: { type: "spring", stiffness: 320, damping: 36 },
    });
  }, [cardW, maxIndex, controls, gap]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, goTo]);

  function onDragEnd(_, info) {
    const t = cardW * 0.22;
    if (info.offset.x < -t)     goTo(active + 1);
    else if (info.offset.x > t) goTo(active - 1);
    else                        goTo(active);
    setDragging(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div ref={trackRef} style={{ overflow: "hidden", padding: "4px 2px 8px" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(maxIndex * (cardW + gap)), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          animate={controls}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          style={{
            display: "flex", gap,
            width: "max-content",
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                width: cardW, flexShrink: 0,
                transition: "opacity 0.3s, transform 0.3s",
                opacity: (i >= active && i < active + perView) ? 1 : 0.38,
                transform: (i >= active && i < active + perView) ? "scale(1)" : "scale(0.95)",
              }}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 12 }}>
        <motion.button
          onClick={() => goTo(active - 1)} disabled={active === 0}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid #e2e8f0",
            background: active === 0 ? "#f8fafc" : "#fff",
            color: active === 0 ? "#94a3b8" : "#4f46e5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            opacity: active === 0 ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft style={{ width: 15, height: 15 }} />
        </motion.button>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <motion.button
              key={i} onClick={() => goTo(i)}
              animate={{
                width: active === i ? 22 : 7,
                background: active === i ? "#4f46e5" : "#cbd5e1",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{ height: 7, borderRadius: 50, border: "none", padding: 0, cursor: "pointer", flexShrink: 0 }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => goTo(active + 1)} disabled={active === maxIndex}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid #e2e8f0",
            background: active === maxIndex ? "#f8fafc" : "#fff",
            color: active === maxIndex ? "#94a3b8" : "#4f46e5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === maxIndex ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            opacity: active === maxIndex ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight style={{ width: 15, height: 15 }} />
        </motion.button>
      </div>

      <p style={{ textAlign: "center", margin: "8px 0 0", fontSize: 11, color: "#94a3b8", letterSpacing: "0.1em" }}>
        {active + 1} — {Math.min(active + perView, items.length)} of {items.length}
      </p>
    </motion.div>
  );
}

/* ── BILLING PILL CARD ── */
function BillingCard({ b }) {
  return (
    <div style={{
      background: "white", borderRadius: 16, padding: "22px 20px",
      border: `1px solid ${b.border}`,
      boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
      cursor: "default", position: "relative", overflow: "hidden",
      height: "100%", boxSizing: "border-box",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${b.color}, transparent)`,
        borderRadius: "16px 16px 0 0", opacity: 0.7,
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: b.bg, border: `1px solid ${b.border}`,
          display: "flex", alignItems: "center", justifyContent: "center", color: b.color,
        }}>
          {b.icon}
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          color: b.color, background: b.bg, border: `1px solid ${b.border}`,
          borderRadius: 9999, padding: "3px 10px",
        }}>
          {b.best}
        </span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: b.color, letterSpacing: "-0.02em", marginBottom: 4 }}>{b.name}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>
        {b.full}
      </div>
      <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function BusinessModel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const bp = useBreakpoint();

  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isTV      = bp === "tv";
  const isCarousel = isMobile || isTablet;
  const perView    = isMobile ? 1 : 2;

  const sectionPad = isMobile
    ? "72px 0 64px"
    : isTablet
    ? "80px 0 72px"
    : isTV
    ? "120px 0 110px"
    : "100px 0 110px";

  const innerPad = isMobile ? "0 20px" : isTablet ? "0 32px" : isTV ? "0 80px" : "0 24px";

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff", fontFamily: FONT,
        position: "relative", overflow: "hidden",
        padding: sectionPad,
      }}
    >
      {/* Grid backdrop */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.018,
        backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
        backgroundSize: "52px 52px", pointerEvents: "none",
      }} />
      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: -80, left: -60, width: 420, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -60, width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: isTV ? 1400 : 1200, margin: "0 auto", padding: innerPad, position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#4f46e5",
          }}>
            Engagement Models
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isMobile ? "clamp(1.8rem, 7vw, 2.2rem)" : "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, color: "#0f172a",
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
          }}
        >
          How We{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Work With You
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: isMobile ? 14 : 16, color: "#64748b",
            maxWidth: 580, margin: "0 auto",
            marginBottom: isMobile ? 36 : isTablet ? 44 : 72,
            lineHeight: 1.75,
          }}
        >
          Flexible engagement models designed to match your project needs —
          from resource augmentation to full end-to-end delivery ownership.
        </motion.p>

        {/* ══════════════════════
            MOBILE / TABLET
        ══════════════════════ */}
        {isCarousel && (
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#4f46e5",
              marginBottom: 14, textAlign: "center",
            }}>
              Billing Models
            </p>
            <Carousel
              items={billingModels}
              renderItem={(b) => <BillingCard b={b} />}
              perView={perView}
              gap={14}
              inView={inView}
            />
          </div>
        )}

        {/* ══════════════════════
            LAPTOP / TV
        ══════════════════════ */}
        {!isCarousel && (
          <>
            {/* Billing pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
            >
              {billingModels.map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, transition: { duration: 0.22 } }}
                  style={{
                    background: "white", borderRadius: 16, padding: "22px 24px",
                    minWidth: 240, flex: 1, maxWidth: 320,
                    border: `1px solid ${b.border}`,
                    boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
                    cursor: "default", position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${b.color}, transparent)`,
                    borderRadius: "16px 16px 0 0", opacity: 0.7,
                  }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: b.bg, border: `1px solid ${b.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", color: b.color,
                    }}>
                      {b.icon}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: b.color, background: b.bg, border: `1px solid ${b.border}`,
                      borderRadius: 9999, padding: "3px 10px",
                    }}>
                      {b.best}
                    </span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: b.color, letterSpacing: "-0.02em", marginBottom: 4 }}>{b.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>
                    {b.full}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

      </div>
    </section>
  );
}