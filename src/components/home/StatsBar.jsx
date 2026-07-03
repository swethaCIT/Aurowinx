// StatsBar.jsx — responsive layout overhaul
// Mobile: horizontal snap-scroll cards with dot indicators
// Tablet: 2-row asymmetric grid (2-col top, 3-col bottom)
// Desktop: unchanged 5-col grid + marquee

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ════════════════════════════════════════════════════════
   COUNT-UP HOOK
════════════════════════════════════════════════════════ */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const prefersReduced = useReducedMotion();

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    if (prefersReduced) { setCount(target); return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, prefersReduced]);

  return [count, start];
}

/* ════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════ */
const STATS = [
  { numeric: 10,  suffix: "+", label: "Projects Delivered",  sub: "Silicon to smart products",               color: "#2563eb", colorEnd: "#0891b2" },
  { numeric: 5,  suffix: "+", label: "Global Clients",       sub: "Across 4+ industry domains",             color: "#0891b2", colorEnd: "#7c3aed" },
  { numeric: 75, suffix: "%", label: "End-to-End Owned",     sub: "Concept → Silicon → Product",            color: "#7c3aed", colorEnd: "#db2777" },
  { numeric: 3,   suffix: "",  label: "Core Divisions",       sub: "Semiconductor · Embedded · Electronics", color: "#059669", colorEnd: "#2563eb" },
  { numeric: 4,   suffix: "+", label: "Industry Verticals",   sub: "Auto · IoT · Energy",            color: "#ea580c", colorEnd: "#db2777" },
];

const CAPS = [
  "ASIC Design","FPGA Development","SoC Architecture","RTL Design",
  "DFT & ATPG","UVM Verification","Physical Design","GDSII Sign-off",
  "Embedded Firmware","IoT Automation",
  "(UPCOMING)","EV Charging Systems","BLDC Motor Control","Solar Inverters",
  "Power Electronics","End-to-End Product Engineering",
];
const MARQUEE_ITEMS = [...CAPS, ...CAPS];

/* ════════════════════════════════════════════════════════
   STAT CARD — shared across all breakpoints
   variant: "full" | "compact" | "scroll"
════════════════════════════════════════════════════════ */
function StatCard({ stat, index, triggered, variant = "full" }) {
  const [count, startCount] = useCountUp(stat.numeric, 1600 + index * 100);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => { if (triggered) startCount(); }, [triggered, startCount]);

  const numSize =
    variant === "scroll"  ? "clamp(2.6rem, 12vw, 3.4rem)" :
    variant === "compact" ? "clamp(1.8rem, 5vw,  2.8rem)" :
                            "clamp(2rem,   8vw,  3.8rem)";

  const suffixSize =
    variant === "scroll"  ? "clamp(1.4rem, 6vw, 1.8rem)" :
    variant === "compact" ? "clamp(1rem,   3vw, 1.5rem)" :
                            "clamp(1.1rem, 4vw, 2rem)";

  return (
    <motion.div
      className="stat-card"
      data-variant={variant}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number + suffix */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, justifyContent: "center" }}>
        <span
          aria-label={`${triggered ? count : 0}${stat.suffix}`}
          style={{
            fontSize: numSize,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            fontFamily: "'Sora', sans-serif",
            background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.colorEnd} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {triggered ? count : 0}
        </span>
        {stat.suffix && (
          <span
            aria-hidden="true"
            style={{
              fontSize: suffixSize,
              fontWeight: 800,
              marginBottom: "0.15em",
              fontFamily: "'Sora', sans-serif",
              background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.colorEnd} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="stat-label">{stat.label}</p>

      {/* Sub — hidden on compact/scroll via CSS */}
      {stat.sub && (
        <p className="stat-sub">{stat.sub}</p>
      )}

      {/* Accent line */}
      <div style={{
        marginTop: variant === "compact" ? 8 : 12,
        height: 1,
        width: 28,
        borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)`,
        alignSelf: "center",
      }} />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   DOT INDICATORS
════════════════════════════════════════════════════════ */
function DotIndicators({ count, active }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 18 : 6,
            height: 6,
            borderRadius: 3,
            background: i === active ? "#2563eb" : "#cbd5e1",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MARQUEE
════════════════════════════════════════════════════════ */
function CapabilityMarquee() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{ borderTop: "1px solid #e2e8f0" }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }} />

      {shouldReduceMotion ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, padding: "0 16px" }}>
          {CAPS.map((cap, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: "0.04em", color: "#94a3b8", fontWeight: 500 }}>{cap}</span>
          ))}
        </div>
      ) : (
        <motion.div
          style={{ display: "flex", gap: 24, whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {MARQUEE_ITEMS.map((cap, i) => (
            <div key={i} style={{ display: "flex", flexShrink: 0, alignItems: "center", gap: 24 }}>
              <span style={{ fontSize: "clamp(11px, 2.8vw, 12px)", letterSpacing: "0.04em", color: "#94a3b8", fontWeight: 500 }}>
                {cap}
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#bfdbfe", flexShrink: 0, display: "inline-block" }} />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CSS
════════════════════════════════════════════════════════ */
const CSS = `
  .statsbar-wrap * { box-sizing: border-box; }

  /* ── Shared card base ── */
  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 14px 16px;
    border-radius: 14px;
    background: #fff;
    border: 1px solid #e8edf5;
    box-shadow: 0 2px 12px rgba(15,23,42,0.05);
  }

  .stat-label {
    margin: 6px 0 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #475569;
    font-size: 10px;
    font-family: 'Sora', sans-serif;
  }

  .stat-sub {
    margin: 4px 0 0;
    color: #94a3b8;
    font-size: 11px;
    line-height: 1.5;
    max-width: 150px;
    font-family: 'Sora', sans-serif;
  }

  /* ════ MOBILE (<640px): snap-scroll strip ════ */
  .stats-mobile {
    display: block;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 4px 20px 4px;
    margin: 0 -4px;
  }
  .stats-mobile::-webkit-scrollbar { display: none; }

  .stats-mobile-track {
    display: flex;
    gap: 12px;
    width: max-content;
  }

  .stats-mobile .stat-card {
    flex: 0 0 78vw;
    max-width: 300px;
    scroll-snap-align: center;
    padding: 22px 18px 18px;
  }

  /* Hide sub on mobile */
  .stats-mobile .stat-sub { display: none; }

  /* ════ TABLET (640px–1023px): asymmetric 2-row grid ════ */
  .stats-tablet { display: none; }

  /* Row 1: 2 cols — full cards with sub */
  .stats-tablet-row1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }
  .stats-tablet-row1 .stat-card { padding: 22px 16px 18px; }

  /* Row 2: 3 cols — compact, no sub */
  .stats-tablet-row2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }
  .stats-tablet-row2 .stat-card { padding: 16px 10px 12px; }
  .stats-tablet-row2 .stat-sub  { display: none; }
  .stats-tablet-row2 .stat-label { font-size: 9px; }

  /* ════ DESKTOP (≥1024px): 5-col grid, no cards (original style) ════ */
  .stats-desktop { display: none; }

  .stats-desktop-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
  }

  /* Desktop: plain (no card bg) — matches original */
  .stats-desktop .stat-card {
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 8px 8px 8px;
    border-right: 1px solid #e2e8f0;
  }
  .stats-desktop .stat-card:last-child { border-right: none; }
  .stats-desktop .stat-sub { font-size: 11px; max-width: 130px; }

  /* ════ BREAKPOINT SWITCHING ════ */
  @media (min-width: 640px) {
    .stats-mobile  { display: none; }
    .stats-dots    { display: none; }
    .stats-tablet  { display: block; }
  }

  @media (min-width: 1024px) {
    .stats-tablet  { display: none; }
    .stats-desktop { display: block; }
  }
`;

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  // Track active dot on scroll
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstChild?.firstChild?.offsetWidth ?? 0;
    const gap = 12;
    const idx = Math.round(el.scrollLeft / (cardW + gap));
    setActiveSlide(Math.min(Math.max(idx, 0), STATS.length - 1));
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section
        ref={ref}
        className="statsbar-wrap"
        style={{ background: "#f8fafc", position: "relative", overflow: "hidden" }}
      >
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), rgba(34,211,238,0.25), transparent)",
        }} />
        {/* Radial glow */}
        <div style={{
          pointerEvents: "none", position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.04), transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "clamp(1.5rem, 4vw, 3rem) 0 clamp(1rem, 3vw, 2rem)" }}>

          {/* ── MOBILE: snap-scroll ── */}
          <div
            className="stats-mobile"
            ref={scrollRef}
            onScroll={onScroll}
          >
            <div className="stats-mobile-track">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} triggered={isInView} variant="scroll" />
              ))}
            </div>
          </div>

          {/* Dot indicators (mobile only) */}
          <div className="stats-dots">
            <DotIndicators count={STATS.length} active={activeSlide} />
          </div>

          {/* ── TABLET: 2-row asymmetric grid ── */}
          <div className="stats-tablet" style={{ padding: "0 clamp(1rem, 4vw, 2rem)" }}>
            {/* Row 1: first 2 stats — full with sub */}
            <div className="stats-tablet-row1">
              {STATS.slice(0, 2).map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} triggered={isInView} variant="full" />
              ))}
            </div>
            {/* Row 2: remaining 3 stats — compact, no sub */}
            <div className="stats-tablet-row2">
              {STATS.slice(2).map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i + 2} triggered={isInView} variant="compact" />
              ))}
            </div>
          </div>

          {/* ── DESKTOP: original 5-col grid ── */}
          <div className="stats-desktop" style={{ padding: "0 clamp(1rem, 4vw, 3rem)" }}>
            <div className="stats-desktop-grid" aria-label="Company statistics">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} triggered={isInView} variant="full" />
              ))}
            </div>
          </div>

        </div>

        {/* Marquee: desktop only */}
        <div style={{ display: "none" }} className="marquee-desktop">
          <CapabilityMarquee />
        </div>
        <style>{`.marquee-desktop { display: none; } @media (min-width: 1024px) { .marquee-desktop { display: block; } }`}</style>

        {/* Bottom line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, #e2e8f0, transparent)",
        }} />
      </section>
    </>
  );
}