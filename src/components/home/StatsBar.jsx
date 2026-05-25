// src/components/home/StatsBar.jsx  ── Same design, light colours
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── COUNT-UP ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const start = () => {
    if (started.current) return;
    started.current = true;
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
  { numeric: 50,  suffix: "+", label: "Projects Delivered",  sub: "Silicon to smart products",            color: "#2563eb", colorEnd: "#0891b2" },
  { numeric: 20,  suffix: "+", label: "Global Clients",       sub: "Across 4+ industry domains",          color: "#0891b2", colorEnd: "#7c3aed" },
  { numeric: 100, suffix: "%", label: "End-to-End Owned",     sub: "Concept → Silicon → Product",         color: "#7c3aed", colorEnd: "#db2777" },
  { numeric: 3,   suffix: "",  label: "Core Divisions",       sub: "Semiconductor · Embedded · Electronics",color: "#059669", colorEnd: "#2563eb" },
  { numeric: 6,   suffix: "+", label: "Industry Verticals",   sub: "Auto · IoT · Energy · AI/ML",         color: "#ea580c", colorEnd: "#db2777" },
];

/* ── STAT ITEM — same layout, light bg ── */
function StatItem({ stat, index, triggered }) {
  const [count, startCount] = useCountUp(stat.numeric, 1600 + index * 100);
  useEffect(() => { if (triggered) startCount(); }, [triggered]);

  return (
    <motion.div
      className="flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: 24 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Value */}
      <div className="flex items-end gap-1 mb-2">
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
      <p className="font-semibold uppercase tracking-wide text-slate-700"
        style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
        {stat.label}
      </p>

      {/* Sub-label */}
      {stat.sub && (
        <p className="mt-1 max-w-[130px] text-slate-400"
          style={{ fontSize: "11px", lineHeight: 1.5 }}>
          {stat.sub}
        </p>
      )}

      {/* Accent line */}
      <div className="mt-3 w-8 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }}
      />
    </motion.div>
  );
}

/* ── VERTICAL DIVIDER ── */
function VDivider() {
  return (
    <div className="hidden lg:block w-px self-stretch my-4"
      style={{ background: "linear-gradient(to bottom, transparent, #cbd5e1, transparent)" }}
    />
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
  return (
    <div className="relative overflow-hidden py-4"
      style={{ borderTop: "1px solid #e2e8f0" }}>
      {/* Fades — match section bg */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }} />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {MARQUEE_ITEMS.map((cap, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span className="font-medium text-slate-400"
              style={{ fontSize: "12px", letterSpacing: "0.04em" }}>
              {cap}
            </span>
            <span className="w-1 h-1 rounded-full flex-shrink-0 bg-blue-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── MAIN EXPORT ── */
export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="stats"
      className="relative overflow-hidden"
      style={{ background: "#f8fafc" }}   // ← only thing changed from dark version
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), rgba(34,211,238,0.25), transparent)" }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.04), transparent 70%)" }}
      />

      {/* Stats grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 lg:gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label}
              className="flex items-center gap-8 lg:gap-0 w-full sm:w-auto justify-center sm:justify-start">
              <StatItem stat={stat} index={i} triggered={isInView} />
              {i < STATS.length - 1 && <VDivider />}
            </div>
          ))}
        </div>
      </div>

      {/* Capability marquee */}
      <CapabilityMarquee />

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #e2e8f0, transparent)" }}
      />
    </section>
  );
}