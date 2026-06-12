// StatsBar.jsx — UX-improved
// Changes vs original:
//  • prefers-reduced-motion: marquee pauses; count-up completes instantly
//  • aria-hidden="true" on marquee (decorative, screen readers don't need to read 32 items)
//  • aria-label added to count-up numbers
//  • Marquee adds pointer-events-none focus trap fix
//  • 2-col → 3-col → 5-col responsive grid preserved

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ── COUNT-UP ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const prefersReduced = useReducedMotion();

  const start = () => {
    if (started.current) return;
    started.current = true;
    // FIX: if reduced-motion preferred, jump straight to final value
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  return [count, start];
}

/* ── DATA ── */
const STATS = [
  { numeric: 50,  suffix: "+", label: "Projects Delivered",  sub: "Silicon to smart products",              color: "#2563eb", colorEnd: "#0891b2" },
  { numeric: 20,  suffix: "+", label: "Global Clients",       sub: "Across 4+ industry domains",            color: "#0891b2", colorEnd: "#7c3aed" },
  { numeric: 100, suffix: "%", label: "End-to-End Owned",     sub: "Concept → Silicon → Product",           color: "#7c3aed", colorEnd: "#db2777" },
  { numeric: 3,   suffix: "",  label: "Core Divisions",       sub: "Semiconductor · Embedded · Electronics", color: "#059669", colorEnd: "#2563eb" },
  { numeric: 6,   suffix: "+", label: "Industry Verticals",   sub: "Auto · IoT · Energy · AI/ML",           color: "#ea580c", colorEnd: "#db2777" },
];

/* ── STAT ITEM ── */
function StatItem({ stat, index, triggered }) {
  const [count, startCount] = useCountUp(stat.numeric, 1600 + index * 100);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => { if (triggered) startCount(); }, [triggered]);

  return (
    <motion.div
      className="flex min-w-0 flex-col items-center px-2 text-center"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-2 flex items-end gap-1">
        {/* FIX: aria-label so screen readers announce "50 plus Projects Delivered" */}
        <span
          className="font-bold tabular-nums"
          aria-label={`${triggered ? count : 0}${stat.suffix}`}
          style={{
            fontSize: "clamp(2rem, 8vw, 3.8rem)",
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
            aria-hidden="true"
            className="mb-1 font-bold"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 2rem)",
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

      <p
        className="font-semibold uppercase tracking-wide text-slate-700"
        style={{ fontSize: "clamp(10px, 2.8vw, 11px)", letterSpacing: "0.1em" }}
      >
        {stat.label}
      </p>

      {stat.sub && (
        <p
          className="mt-1 max-w-[160px] text-balance text-slate-400 sm:max-w-[130px]"
          style={{ fontSize: "clamp(10px, 2.6vw, 11px)", lineHeight: 1.5 }}
        >
          {stat.sub}
        </p>
      )}

      <div
        className="mt-3 h-px w-8 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }}
      />
    </motion.div>
  );
}

/* ── MARQUEE ── */
const CAPS = [
  "ASIC Design","FPGA Development","SoC Architecture","RTL Design",
  "DFT & ATPG","UVM Verification","Physical Design","GDSII Sign-off",
  "Embedded Firmware","IoT Automation","Industrial Control",
  "EV Charging Systems","BLDC Motor Control","Solar Inverters",
  "Power Electronics","End-to-End Product Engineering",
];
const MARQUEE_ITEMS = [...CAPS, ...CAPS];

function CapabilityMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    /* FIX: aria-hidden — this is decorative; assistive tech doesn't need to traverse 32 items */
    <div
      className="relative overflow-hidden py-4"
      style={{ borderTop: "1px solid #e2e8f0" }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 sm:w-24"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 sm:w-24"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }} />

      {/* FIX: if reduced-motion, render as a static flex-wrap list instead of animating */}
      {shouldReduceMotion ? (
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {CAPS.map((cap, i) => (
            <span key={i} className="font-medium text-slate-400" style={{ fontSize: 11, letterSpacing: "0.04em" }}>
              {cap}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-4 whitespace-nowrap sm:gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {MARQUEE_ITEMS.map((cap, i) => (
            <div key={i} className="flex flex-shrink-0 items-center gap-4 sm:gap-6">
              <span className="font-medium text-slate-400" style={{ fontSize: "clamp(11px, 2.8vw, 12px)", letterSpacing: "0.04em" }}>
                {cap}
              </span>
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-blue-300" />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ── MAIN EXPORT ── */
export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="stats" className="relative overflow-hidden" style={{ background: "#f8fafc" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), rgba(34,211,238,0.25), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.04), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-12 lg:pb-10 lg:pt-14 2xl:max-w-[90rem]">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} triggered={isInView} />
          ))}
        </div>
      </div>

      {/* Marquee: desktop only */}
      <div className="hidden lg:block">
        <CapabilityMarquee />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #e2e8f0, transparent)" }}
      />
    </section>
  );
}