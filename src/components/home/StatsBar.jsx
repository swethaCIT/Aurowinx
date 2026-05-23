// src/components/home/StatsBar.jsx
// ─────────────────────────────────────────────────────────────────────────────
//  Premium animated stats bar — no extra packages needed beyond framer-motion
//  Scroll-triggered count-up · marquee capability strip · dark navy finish
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════
   1.  COUNT-UP HOOK  (triggers once when element enters viewport)
══════════════════════════════════════════════════════════════════════════ */
function useCountUp(target, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return [count, start];
}

/* ══════════════════════════════════════════════════════════════════════════
   2.  SINGLE STAT ITEM
══════════════════════════════════════════════════════════════════════════ */
function StatItem({ stat, index, triggered }) {
  const [count, startCount] = useCountUp(
    stat.numeric,
    1600 + index * 100,
    stat.decimals ?? 0
  );

  useEffect(() => {
    if (triggered) startCount();
  }, [triggered]);

  return (
    <motion.div
      className="flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: 24 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Value row */}
      <div className="flex items-end gap-1 mb-2">
        {stat.prefix && (
          <span
            className="font-bold mb-1"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: stat.color,
            }}
          >
            {stat.prefix}
          </span>
        )}
        <span
          className="font-bold tabular-nums"
          style={{
            fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
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
            className="font-bold mb-1"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              color: stat.color,
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
      <p
        className="font-semibold tracking-wide uppercase"
        style={{ fontSize: "11px", color: "#e2e8f0", letterSpacing: "0.1em" }}
      >
        {stat.label}
      </p>

      {/* Sub-label */}
      {stat.sub && (
        <p
          className="mt-1 max-w-[130px]"
          style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}
        >
          {stat.sub}
        </p>
      )}

      {/* Glow dot under number */}
      <div
        className="mt-3 w-8 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)` }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3.  DATA
══════════════════════════════════════════════════════════════════════════ */
const STATS = [
  {
    numeric: 50,
    suffix: "+",
    label: "Projects Delivered",
    sub: "Silicon to smart products",
    color: "#60a5fa",
    colorEnd: "#22d3ee",
  },
  {
    numeric: 20,
    suffix: "+",
    label: "Global Clients",
    sub: "Across 4+ industry domains",
    color: "#22d3ee",
    colorEnd: "#a78bfa",
  },
  {
    numeric: 100,
    suffix: "%",
    label: "End-to-End Owned",
    sub: "Concept → Silicon → Product",
    color: "#a78bfa",
    colorEnd: "#ec4899",
  },
  {
    numeric: 3,
    suffix: "",
    label: "Core Divisions",
    sub: "Semiconductor · Embedded · Electronics",
    color: "#34d399",
    colorEnd: "#60a5fa",
  },
  {
    numeric: 6,
    suffix: "+",
    label: "Industry Verticals",
    sub: "Auto · IoT · Energy · AI/ML",
    color: "#fb923c",
    colorEnd: "#f472b6",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   4.  CAPABILITY MARQUEE  (infinite scroll strip)
══════════════════════════════════════════════════════════════════════════ */
const CAPS = [
  "ASIC Design",
  "FPGA Development",
  "SoC Architecture",
  "RTL Design",
  "DFT & ATPG",
  "UVM Verification",
  "Physical Design",
  "GDSII Sign-off",
  "Embedded Firmware",
  "IoT Automation",
  "Industrial Control",
  "EV Charging Systems",
  "BLDC Motor Control",
  "Solar Inverters",
  "Power Electronics",
  "End-to-End Product Engineering",
];

// Duplicate for seamless loop
const MARQUEE_ITEMS = [...CAPS, ...CAPS];

function CapabilityMarquee() {
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080f1e, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080f1e, transparent)" }}
      />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {MARQUEE_ITEMS.map((cap, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span
              className="font-medium"
              style={{ fontSize: "12px", color: "#475569", letterSpacing: "0.04em" }}
            >
              {cap}
            </span>
            {/* Separator dot */}
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(96,165,250,0.3)" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5.  VERTICAL DIVIDER (desktop only)
══════════════════════════════════════════════════════════════════════════ */
function VDivider() {
  return (
    <div
      className="hidden lg:block w-px self-stretch my-4"
      style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)" }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   6.  STATS BAR  — main export
══════════════════════════════════════════════════════════════════════════ */
export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="stats"
      style={{ background: "#080f1e" }}
      className="relative overflow-hidden"
    >
      {/* ── Subtle noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Top hairline ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(96,165,250,0.25), rgba(34,211,238,0.2), transparent)" }}
      />

      {/* ── Ambient glow behind stats ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      {/* ── STATS GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 lg:gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 lg:gap-0 w-full sm:w-auto justify-center sm:justify-start">
              <StatItem stat={stat} index={i} triggered={isInView} />
              {i < STATS.length - 1 && <VDivider />}
            </div>
          ))}
        </div>
      </div>

      {/* ── CAPABILITY MARQUEE ── */}
      <CapabilityMarquee />

      {/* ── Bottom hairline ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)" }}
      />
    </section>
  );
}