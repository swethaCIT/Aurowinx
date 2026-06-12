// src/components/home/WhyAurowinx.jsx
// Requires: framer-motion

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */
const STRENGTHS = [
  {
    num: "01",
    title: "End-to-End Ownership",
    desc: "From concept to silicon to smart product — we own every stage. No handoffs, no gaps, complete accountability.",
    color: "#2563eb", colorEnd: "#0891b2", bg: "#eff6ff", border: "#bfdbfe",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Silicon-Proven Expertise",
    desc: "Real tape-out experience. DFT, physical design, GDSII sign-off — not just simulations, but delivered silicon.",
    color: "#7c3aed", colorEnd: "#db2777", bg: "#f5f3ff", border: "#ddd6fe",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>
        <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Embedded + IoT Depth",
    desc: "Bare-metal to Linux. MCU drivers to industrial automation. Full firmware stack, not just peripheral code.",
    color: "#0891b2", colorEnd: "#059669", bg: "#ecfeff", border: "#a5f3fc",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Power Electronics Mastery",
    desc: "EV chargers, BLDC controllers, solar inverters — production-certified hardware with firmware integration.",
    color: "#ea580c", colorEnd: "#d97706", bg: "#fff7ed", border: "#fed7aa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Quality by Design",
    desc: "Built-in verification, DFT-first methodology, and coverage-driven development — quality at every stage, not as an afterthought.",
    color: "#059669", colorEnd: "#0891b2", bg: "#ecfdf5", border: "#a7f3d0",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Industry-Ready Tools",
    desc: "Synopsys, Cadence, Siemens, Ansys, Altium, MATLAB — same toolchain as the world's top semiconductor companies.",
    color: "#6d28d9", colorEnd: "#2563eb", bg: "#ede9fe", border: "#c4b5fd",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const INDUSTRIES = [
  { label: "Automotive",   color: "#2563eb", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
      <circle cx="9" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
    </svg>
  )},
  { label: "Networking",   color: "#0891b2", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/>
      <rect x="9" y="16" width="6" height="6" rx="1"/>
      <path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>
    </svg>
  )},
  { label: "Consumer",     color: "#7c3aed", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )},
  { label: "Industrial",   color: "#ea580c", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 20h20M6 20V10l6-6 6 6v10M10 20v-5h4v5"/>
    </svg>
  )},
  { label: "AI / ML",      color: "#059669", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2a9 9 0 1 0 9 9"/><path d="M12 8v4l3 3"/>
      <circle cx="19" cy="5" r="3" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  )},
  { label: "IoT",          color: "#db2777", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  )},
];

const TOOLS_ROW1 = ["Synopsys VCS","Cadence Xcelium","Siemens Questa","Ansys RedHawk","Mentor TetraMAX","Cadence Modus","Synopsys DC","Cadence Innovus","Synopsys PrimeTime","Cadence Pegasus","Synopsys Calibre","KLA IC Validator"];
const TOOLS_ROW2 = ["Altium Designer","KiCAD","MATLAB","Simulink","LTspice","FreeRTOS","Zephyr RTOS","ESP-IDF","STM32CubeIDE","Proteus","SolidWorks PCB","Allegro PCB"];

/* ══════════════════════════════════════════════════════════════════════════
   STRENGTH CARD
══════════════════════════════════════════════════════════════════════════ */
function StrengthCard({ s, index, triggered }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px] flex flex-col p-4 sm:p-5 lg:rounded-[24px] lg:p-6 cursor-default"
      style={{
        background: hov ? s.bg : "rgba(255,255,255,0.82)",
        border: `1px solid ${hov ? s.border : "rgba(148,163,184,0.13)"}`,
        backdropFilter: "blur(18px)",
        transition: "all 0.32s ease",
        boxShadow: hov ? `0 16px 50px ${s.color}15` : "0 2px 20px rgba(15,23,42,0.04)",
      }}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      {/* Accent top-line */}
      <motion.div className="absolute top-0 left-5 right-5 h-[2px] rounded-b-full"
        style={{ background: `linear-gradient(90deg,transparent,${s.color},${s.colorEnd},transparent)` }}
        animate={{ scaleX: hov ? 1 : 0.3, opacity: hov ? 1 : 0.25 }}
        transition={{ duration: 0.35 }} />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <motion.div className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
          whileHover={{ rotate: -8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 280 }}>
          {s.icon}
        </motion.div>
        <span className="font-black select-none"
          style={{ fontSize: "3rem", color: s.color, opacity: 0.09, letterSpacing: "-0.05em", lineHeight: 1 }}>
          {s.num}
        </span>
      </div>

      <p className="font-bold text-slate-900 mb-2" style={{ fontSize: "14.5px", letterSpacing: "-0.01em" }}>
        {s.title}
      </p>
      <p className="text-slate-400 flex-1" style={{ fontSize: "12.5px", lineHeight: 1.8 }}>
        {s.desc}
      </p>

      {/* Bottom draw line */}
      <motion.div className="mt-4 h-px rounded-full"
        style={{ background: `linear-gradient(90deg,${s.color},transparent)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={triggered ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INDUSTRY PILL
══════════════════════════════════════════════════════════════════════════ */
function IndustryPill({ item, index, triggered }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 sm:gap-3 sm:px-5 sm:py-3.5"
      style={{
        background: hov ? `linear-gradient(135deg, ${item.color}25, ${item.color}10)` : "rgba(30,41,59,0.65)",
        border: `1px solid ${hov ? item.color + "50" : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: hov ? `0 8px 30px ${item.color}25` : "inset 0 1px 1px rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={triggered ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.05 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: hov ? `${item.color}35` : "rgba(15,23,42,0.8)",
          color: hov ? item.color : "#94a3b8",
          boxShadow: hov ? `0 0 15px ${item.color}40` : "none"
        }}>
        {item.icon}
      </div>
      <span className="font-bold transition-all duration-300"
        style={{ fontSize: "13px", color: hov ? "#ffffff" : "#cbd5e1" }}>
        {item.label}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TOOLS MARQUEE
══════════════════════════════════════════════════════════════════════════ */
function ToolsMarquee({ items, reverse = false, triggered }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2.5">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right,#0f172a,transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left,#0f172a,transparent)" }} />
      <motion.div className="flex gap-3 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%","0%"] : ["0%","-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
        {doubled.map((tool, i) => (
          <div key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
            style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#38bdf8,#818cf8)" }} />
            <span className="font-medium text-slate-300" style={{ fontSize: "12px" }}>{tool}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FLOATING CHIPS
══════════════════════════════════════════════════════════════════════════ */
function ChipSVG({ width, height, color }) {
  const cw = width - 20;
  const ch = height - 20;

  const genPins = (side) => {
    return [0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
      if (side === "top") return <line key={`top-${i}`} x1={10 + cw * ratio} y1={0} x2={10 + cw * ratio} y2={10} stroke={color} strokeWidth={1.5} strokeOpacity={0.6} />;
      if (side === "bottom") return <line key={`bot-${i}`} x1={10 + cw * ratio} y1={height - 10} x2={10 + cw * ratio} y2={height} stroke={color} strokeWidth={1.5} strokeOpacity={0.6} />;
      if (side === "left") return <line key={`l-${i}`} x1={0} y1={10 + ch * ratio} x2={10} y2={10 + ch * ratio} stroke={color} strokeWidth={1.5} strokeOpacity={0.6} />;
      if (side === "right") return <line key={`r-${i}`} x1={width - 10} y1={10 + ch * ratio} x2={width} y2={10 + ch * ratio} stroke={color} strokeWidth={1.5} strokeOpacity={0.6} />;
    });
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {genPins("top")}
      {genPins("bottom")}
      {genPins("left")}
      {genPins("right")}
      <rect x="10" y="10" width={cw} height={ch} rx="4" fill={`${color}22`} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x={10 + cw * 0.25} y={10 + ch * 0.25} width={cw * 0.5} height={ch * 0.5} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="10" y1={height / 2 - 6} x2={width - 10} y2={height / 2 - 6} stroke={color} strokeWidth="1.5" opacity={0.25} />
      <line x1="10" y1={height / 2} x2={width - 10} y2={height / 2} stroke={color} strokeWidth="1.5" opacity={0.25} />
      <line x1="10" y1={height / 2 + 6} x2={width - 10} y2={height / 2 + 6} stroke={color} strokeWidth="1.5" opacity={0.25} />
      <circle cx={width / 2} cy={height / 2} r="5" fill="none" stroke={color} strokeOpacity="0.6" strokeWidth={1.5} />
    </svg>
  );
}

const CHIPS_DATA = [
  { id: 1, x: 15, y: 15, width: 80, height: 80, color: "#2563eb", rotation: 15, anim: "float0", dur: "7s", delay: "-2s" },
  { id: 2, x: 55, y: 35, width: 60, height: 60, color: "#7c3aed", rotation: -10, anim: "float1", dur: "11s", delay: "-5s" },
  { id: 3, x: 10, y: 60, width: 100, height: 100, color: "#0891b2", rotation: 25, anim: "float2", dur: "13s", delay: "-9s" },
  { id: 4, x: 70, y: 75, width: 70, height: 70, color: "#ea580c", rotation: -20, anim: "float3", dur: "9s", delay: "-1s" },
  { id: 5, x: 30, y: 85, width: 50, height: 50, color: "#059669", rotation: 5, anim: "float0", dur: "10s", delay: "-4s" },
];

function FloatingChipsRight() {
  const [mountedIds, setMountedIds] = useState([]);

  useEffect(() => {
    CHIPS_DATA.forEach((chip, i) => {
      setTimeout(() => {
        setMountedIds((prev) => [...prev, chip.id]);
      }, i * 300);
    });
  }, []);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[300px] pointer-events-none z-0 hidden lg:block overflow-hidden">
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(-3deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-22px) rotate(-2deg); } }
      `}</style>
      {CHIPS_DATA.map((c) => {
        const isActive = mountedIds.includes(c.id);
        return (
          <div
            key={c.id}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: `rotate(${c.rotation}deg)`,
              opacity: isActive ? 0.45 : 0,
              transition: "opacity 1.2s ease-in-out",
            }}
          >
            <div style={{ animation: `${c.anim} ${c.dur} ease-in-out ${c.delay} infinite` }}>
              <ChipSVG width={c.width} height={c.height} color={c.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function WhyAurowinx() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="why" className="relative overflow-hidden py-12 sm:py-16 lg:py-28"
      style={{ background: "linear-gradient(165deg,#f8fafc 0%,#ffffff 50%,#f0f4ff 100%)" }}>

      {/* Animated blobs & Background chips */}
      <motion.div className="absolute pointer-events-none w-full h-full" style={{ y: blobY, top: 0, left: 0 }}>
        {[
          { w:600, h:600, top:"-10%", left:"-8%",  color:"rgba(37,99,235,0.06)"  },
          { w:500, h:500, top:"40%",  right:"-8%", color:"rgba(124,58,237,0.05)" },
          { w:400, h:400, bottom:"-8%",left:"40%", color:"rgba(8,145,178,0.05)"  },
        ].map((o,i)=>(
          <motion.div key={i} className="absolute rounded-full"
            style={{ width:o.w, height:o.h, top:o.top, left:o.left, right:o.right, bottom:o.bottom,
              background:`radial-gradient(circle,${o.color},transparent 70%)`, filter:"blur(80px)" }}
            animate={{ scale:[1,1.12,1] }}
            transition={{ duration:16+i*5, repeat:Infinity, ease:"easeInOut", delay:i*4 }} />
        ))}
      </motion.div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(rgba(37,99,235,0.08) 1px,transparent 1px)", backgroundSize:"36px 36px",
          maskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 40%,transparent 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 40%,transparent 100%)" }} />

      {/* Floating Right Side Chips */}
      <FloatingChipsRight />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 2xl:max-w-[90rem]">

        {/* ── Section label ── */}
        <motion.div className="mb-6 flex min-w-0 flex-wrap items-center gap-3 sm:gap-4"
          initial={{ opacity:0, x:-20 }} animate={isInView?{opacity:1,x:0}:{}}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
          <div className="h-px w-10 rounded-full" style={{ background:"linear-gradient(90deg,#2563eb,#7c3aed)" }} />
          <span className="font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontSize:"10px" }}>
            Why Aurowinx
          </span>
          <div className="h-px flex-1 rounded-full" style={{ background:"linear-gradient(90deg,rgba(37,99,235,0.2),transparent)" }} />
        </motion.div>

        {/* ── Heading ── */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2 className="max-w-[min(560px,100%)] font-black text-slate-900"
            style={{ fontSize:"clamp(1.75rem, 5vw, 3.4rem)", letterSpacing:"-0.04em", lineHeight:1.05 }}
            initial={{ opacity:0, y:22 }} animate={isInView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7, delay:0.1, ease:[0.22,1,0.36,1] }}>
            Built Different.{" "}
            <span style={{ background:"linear-gradient(135deg,#2563eb,#7c3aed,#0891b2)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Engineered Better.
            </span>
          </motion.h2>
          <motion.p className="max-w-sm text-slate-400 lg:text-right"
            style={{ fontSize:"clamp(13px, 2.8vw, 14px)", lineHeight:1.8 }}
            initial={{ opacity:0, y:14 }} animate={isInView?{opacity:1,y:0}:{}}
            transition={{ duration:0.6, delay:0.2, ease:[0.22,1,0.36,1] }}>
            Six core reasons why industry leaders trust Aurowinx
            for their most critical engineering challenges.
          </motion.p>
        </div>

        {/* ── 6 strength cards ── */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-16 lg:grid-cols-3">
          {STRENGTHS.map((s,i) => (
            <StrengthCard key={s.num} s={s} index={i} triggered={isInView} />
          ))}
        </div>

        {/* ── Industry domains ── */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <motion.div className="flex items-center gap-4 mb-7"
            initial={{ opacity:0 }} animate={isInView?{opacity:1}:{}}
            transition={{ duration:0.6, delay:0.45 }}>
            <span className="font-bold uppercase tracking-[0.18em] text-slate-400" style={{ fontSize:"10px" }}>
              Industry Domains
            </span>
            <div className="h-px flex-1" style={{ background:"linear-gradient(90deg,rgba(37,99,235,0.15),transparent)" }} />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {INDUSTRIES.map((item,i) => (
              <IndustryPill key={item.label} item={item} index={i} triggered={isInView} />
            ))}
          </div>
        </div>

        {/* ── Tools & Technologies: desktop only ── */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity:0, y:20 }} animate={isInView?{opacity:1,y:0}:{}}
          transition={{ duration:0.65, delay:0.7, ease:[0.22,1,0.36,1] }}>

          <div className="flex items-center gap-4 mb-5">
            <span className="font-bold uppercase tracking-[0.18em] text-slate-400" style={{ fontSize:"10px" }}>
              Tools & Technologies
            </span>
            <div className="h-px flex-1" style={{ background:"linear-gradient(90deg,rgba(37,99,235,0.15),transparent)" }} />
          </div>

          {/* Card wrapper */}
          <div className="rounded-3xl overflow-hidden py-5 gap-3 flex flex-col"
            style={{ background:"rgba(15,23,42,0.9)", border:"1px solid rgba(255,255,255,0.08)",
              backdropFilter:"blur(20px)", boxShadow:"0 10px 40px rgba(0,0,0,0.15)" }}>
            <ToolsMarquee items={TOOLS_ROW1} triggered={isInView} />
            <ToolsMarquee items={TOOLS_ROW2} reverse triggered={isInView} />
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(to right,transparent,#e2e8f0,transparent)" }} />
    </section>
  );
}