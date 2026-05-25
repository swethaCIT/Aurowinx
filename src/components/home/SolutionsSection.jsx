// src/components/home/SolutionsSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
//  PREMIUM LIGHT MODE — original palette & typography restored
//  + kinetic canvas background + immersive HD imagery + magnetic interactions
//  Requires: framer-motion
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion, useInView, AnimatePresence,
  useMotionValue, useSpring,
} from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════
   DATA — original structure, upgraded imagery
══════════════════════════════════════════════════════════════════════════ */
const SOLUTIONS = [
  {
    id: "semiconductor",
    num: "01",
    label: "Semiconductor Design",
    tagline: "Silicon-Proven. Performance-First.",
    desc: "End-to-end ASIC, FPGA, and SoC design services — from architecture and RTL to physical design and GDSII sign-off. We deliver high-performance, low-power semiconductor solutions with full verification coverage.",
    color: "#2563eb",
    colorEnd: "#0891b2",
    colorSoft: "#eff6ff",
    colorBorder: "#bfdbfe",
    colorGlow: "rgba(37,99,235,0.12)",
    // Nanoscale circuit board electron microscope shot
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=90&auto=format&fit=crop",
    imageAlt: "Semiconductor circuit macro",
    // Canvas orb colors
    orb1: [37, 99, 235],
    orb2: [8, 145, 178],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>
        <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
      </svg>
    ),
    capabilities: [
      { title: "ASIC / SoC Design",      sub: "Architecture · RTL · Low Power" },
      { title: "FPGA Development",        sub: "Xilinx · Intel · Lattice" },
      { title: "DFT & ATPG",             sub: "Scan · MBIST · JTAG · Boundary Scan" },
      { title: "UVM Verification",        sub: "Testbench · Assertions · Coverage" },
      { title: "Physical Design (PNR)",   sub: "Floorplan · CTS · Routing · ECO" },
      { title: "GDSII Sign-off",          sub: "STA · IR-Drop · DRC · LVS" },
    ],
    tools: ["Synopsys", "Cadence", "Siemens", "Ansys", "Mentor", "KLA"],
    visual: "chip",
  },
  {
    id: "embedded",
    num: "02",
    label: "Embedded & IoT",
    tagline: "Connected. Intelligent. Real-Time.",
    desc: "From bare-metal firmware to full Linux-based industrial systems — we design embedded solutions and IoT automation platforms that bridge hardware and software for smart, connected ecosystems.",
    color: "#0891b2",
    colorEnd: "#7c3aed",
    colorSoft: "#ecfeff",
    colorBorder: "#a5f3fc",
    colorGlow: "rgba(8,145,178,0.12)",
    // Dense circuit board traces aerial shot
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=90&auto=format&fit=crop",
    imageAlt: "Embedded circuit board traces",
    orb1: [8, 145, 178],
    orb2: [124, 58, 237],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <circle cx="12" cy="20" r="1" fill="currentColor"/>
      </svg>
    ),
    capabilities: [
      { title: "Embedded Firmware",       sub: "C/C++ · RTOS · Bare Metal · HAL" },
      { title: "Industrial Automation",   sub: "PLC · SCADA · Edge Control" },
      { title: "IoT Connectivity",        sub: "MQTT · BLE · WiFi · LoRa · Zigbee" },
      { title: "Device Drivers",          sub: "SPI · I2C · UART · CAN · USB" },
      { title: "Edge AI Integration",     sub: "TinyML · TF Lite · ONNX Runtime" },
      { title: "OTA & Security",          sub: "Secure Boot · Firmware Updates" },
    ],
    tools: ["FreeRTOS", "Zephyr", "Linux", "ESP-IDF", "STM32", "Arduino"],
    visual: "iot",
  },
  {
    id: "products",
    num: "03",
    label: "Electronics Products",
    tagline: "From Concept. To Certified Product.",
    desc: "Custom power electronics and embedded product development — including EV charging systems, BLDC motor controllers, and solar inverters. We handle full product lifecycle from PCB design to certification.",
    color: "#ea580c",
    colorEnd: "#db2777",
    colorSoft: "#fff7ed",
    colorBorder: "#fed7aa",
    colorGlow: "rgba(234,88,12,0.12)",
    // Glowing soldering / power electronics close-up
    imageUrl: "https://images.unsplash.com/photo-1568209865332-a15790aed756?w=1000&q=90&auto=format&fit=crop",
    imageAlt: "Power electronics PCB close-up",
    orb1: [234, 88, 12],
    orb2: [219, 39, 119],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    capabilities: [
      { title: "EV Charging Systems",     sub: "AC/DC · OCPP · Smart Charging" },
      { title: "BLDC Motor Controllers",  sub: "Sensor/Sensorless · FOC · IoT" },
      { title: "Solar Inverters",         sub: "Grid-Tied · Off-Grid · MPPT" },
      { title: "PCB Design & Layout",     sub: "Schematic · Multilayer · Signal Integrity" },
      { title: "Power Electronics",       sub: "SMPS · DC-DC · Gate Drivers" },
      { title: "Product Certification",   sub: "CE · BIS · EMI/EMC · Safety" },
    ],
    tools: ["Altium", "KiCAD", "MATLAB", "Simulink", "LTspice", "Proteus"],
    visual: "power",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   MAGNETIC HOOK
══════════════════════════════════════════════════════════════════════════ */
function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }, [strength, x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { ref, sx, sy, onMove, onLeave };
}

/* ══════════════════════════════════════════════════════════════════════════
   KINETIC BACKGROUND
   Layer 1 — ambient canvas: drifting orbs + dot grid + diagonal traces
   Layer 2 — burst canvas: dramatic radial shockwave on every tab switch
══════════════════════════════════════════════════════════════════════════ */

/* ── Layer 1: always-running ambient animation ── */
function AmbientCanvas({ sol }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const solRef    = useRef(sol);

  useEffect(() => { solRef.current = sol; }, [sol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let c1 = [...solRef.current.orb1];
    let c2 = [...solRef.current.orb2];
    const lerp = (a, b, t) => a + (b - a) * t;

    function draw(ts) {
      const T = ts * 0.00038;
      const s = solRef.current;

      // Fast lerp so color change is visible within ~30 frames (~0.5s)
      c1 = c1.map((v, i) => lerp(v, s.orb1[i], 0.06));
      c2 = c2.map((v, i) => lerp(v, s.orb2[i], 0.06));

      ctx.clearRect(0, 0, W, H);

      // Three drifting radial orbs
      [
        { nx: 0.18 + Math.sin(T * 0.55) * 0.13, ny: 0.22 + Math.cos(T * 0.42) * 0.17, r: 0.55, rgb: c1, a: 0.11 },
        { nx: 0.80 + Math.cos(T * 0.48) * 0.11, ny: 0.74 + Math.sin(T * 0.61) * 0.13, r: 0.46, rgb: c2, a: 0.09 },
        { nx: 0.50 + Math.sin(T * 0.33) * 0.09, ny: 0.48 + Math.cos(T * 0.27) * 0.09, r: 0.34, rgb: c1.map((v,i)=>lerp(v,c2[i],0.5)), a: 0.06 },
      ].forEach(({ nx, ny, r, rgb, a }) => {
        const gx = nx * W, gy = ny * H, gr = r * Math.max(W, H);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, `rgba(${rgb.map(Math.round).join(",")},${a})`);
        g.addColorStop(1, `rgba(${rgb.map(Math.round).join(",")},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Drifting dot grid
      const step = 40;
      const dx = (T * 6) % step, dy = (T * 4) % step;
      const [dr, dg, db] = c1.map(Math.round);
      ctx.fillStyle = `rgba(${dr},${dg},${db},0.08)`;
      for (let cx = -dx; cx < W + step; cx += step)
        for (let cy = -dy; cy < H + step; cy += step) {
          ctx.beginPath(); ctx.arc(cx, cy, 1.3, 0, Math.PI * 2); ctx.fill();
        }

      // Diagonal circuit traces
      ctx.strokeStyle = `rgba(${dr},${dg},${db},0.04)`;
      ctx.lineWidth = 0.8;
      const ls = 88, lo = (T * 10) % ls;
      for (let i = -lo; i < W + H; i += ls) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - H, H); ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none" />
  );
}

/* ── Layer 2: shockwave burst on tab change ── */
function BurstCanvas({ sol }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const prevId    = useRef(sol.id);

  useEffect(() => {
    if (sol.id === prevId.current) return; // no burst on mount
    prevId.current = sol.id;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Origin: bottom-left corner (where tabs sit)
    const ox = W * 0.18, oy = H * 0.55;
    const [r1, g1, b1] = sol.orb1;
    const [r2, g2, b2] = sol.orb2;

    let start = null;
    const DURATION = 820; // ms

    // Easing
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const easeIn  = t => t * t * t;

    function frame(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / DURATION, 1);
      const ep = easeOut(p);

      ctx.clearRect(0, 0, W, H);

      const maxR = Math.sqrt(W * W + H * H) * 1.1;

      // ── Ring 1: main expanding shockwave ──
      const r = maxR * ep;
      const ringWidth = maxR * 0.07 * (1 - easeIn(p));
      const alpha = (1 - p) * 0.22;
      if (alpha > 0.005) {
        const g = ctx.createRadialGradient(ox, oy, Math.max(0, r - ringWidth), ox, oy, r);
        g.addColorStop(0, `rgba(${r1},${g1},${b1},0)`);
        g.addColorStop(0.5, `rgba(${r1},${g1},${b1},${alpha})`);
        g.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.fill();
      }

      // ── Ring 2: secondary trailing ring ──
      const r2r = maxR * Math.max(0, ep - 0.18);
      const alpha2 = Math.max(0, (0.85 - p)) * 0.15;
      if (alpha2 > 0.005 && r2r > 0) {
        const g2g = ctx.createRadialGradient(ox, oy, Math.max(0, r2r - maxR * 0.04), ox, oy, r2r);
        g2g.addColorStop(0, `rgba(${r2},${g2},${b2},0)`);
        g2g.addColorStop(0.5, `rgba(${r2},${g2},${b2},${alpha2})`);
        g2g.addColorStop(1, `rgba(${r2},${g2},${b2},0)`);
        ctx.fillStyle = g2g;
        ctx.beginPath(); ctx.arc(ox, oy, r2r, 0, Math.PI * 2); ctx.fill();
      }

      // ── Origin flash: small radial bloom at source ──
      const flashR = maxR * 0.18 * easeOut(Math.min(p * 5, 1));
      const flashA = Math.max(0, (0.4 - p * 2)) * 0.35;
      if (flashA > 0.005) {
        const fg = ctx.createRadialGradient(ox, oy, 0, ox, oy, flashR);
        fg.addColorStop(0, `rgba(${r1},${g1},${b1},${flashA})`);
        fg.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, W, H);
      }

      if (p < 1) rafRef.current = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, W, H);
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafRef.current);
  }, [sol.id]);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "multiply" }} />
  );
}

function KineticBackground({ sol }) {
  return null;
}

/* ══════════════════════════════════════════════════════════════════════════
   HD IMAGE FRAME — cinematic overlay treatment
══════════════════════════════════════════════════════════════════════════ */
function ImageFrame({ sol }) {
  return (
    <div className="relative overflow-hidden flex-shrink-0"
      style={{ height: 220, borderRadius: "20px", border: `1px solid ${sol.colorBorder}` }}>

      {/* Photo — scale-in on tab change */}
      <AnimatePresence mode="wait">
        <motion.img
          key={sol.id}
          src={sol.imageUrl}
          alt={sol.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Gradient veil — preserves white text */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.12) 30%,
            rgba(255,255,255,0.55) 70%,
            ${sol.colorSoft} 100%)`,
        }} />

      {/* Accent colour wash */}
      <motion.div
        key={`wash-${sol.id}`}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          background: `radial-gradient(ellipse at 20% 80%, ${sol.colorGlow.replace("0.12","0.25")}, transparent 60%)`,
        }}
      />

      {/* Dot-grid texture overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${sol.color}18 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Corner accent brackets */}
      {[
        "top-3 left-3 border-t border-l",
        "top-3 right-3 border-t border-r",
        "bottom-3 left-3 border-b border-l",
        "bottom-3 right-3 border-b border-r",
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls} w-4 h-4`}
          style={{ borderColor: `${sol.color}50`, borderWidth: "1.5px" }} />
      ))}

      {/* Label strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
        <div>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: sol.color, marginBottom: "2px" }}>
            Division {sol.num}
          </p>
          <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a",
            letterSpacing: "-0.03em", lineHeight: 1 }}>
            {sol.label}
          </p>
        </div>
        {/* Pulse badge */}
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{
            background: `${sol.color}18`,
            border: `1px solid ${sol.colorBorder}`,
            backdropFilter: "blur(8px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: sol.color }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: sol.color }}>
            Active
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION HEADER — original typography preserved
══════════════════════════════════════════════════════════════════════════ */
function Header({ triggered }) {
  return (
    <div className="mb-14 relative z-10">
      <motion.div className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={triggered ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <div className="h-px w-10 rounded-full"
          style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)" }} />
        <span className="font-bold uppercase tracking-[0.2em] text-slate-400"
          style={{ fontSize: "10px" }}>
          What We Do
        </span>
        <div className="h-px flex-1 rounded-full"
          style={{ background: "linear-gradient(90deg,rgba(37,99,235,0.2),transparent)" }} />
      </motion.div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <motion.h2
          className="text-slate-900 font-black leading-[1.02]"
          style={{ fontSize: "clamp(2.2rem,4.5vw,3.4rem)", letterSpacing: "-0.04em", maxWidth: "600px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={triggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          Three Divisions.{" "}
          <span style={{
            background: "linear-gradient(135deg,#2563eb,#0891b2,#7c3aed)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            One Vision.
          </span>
        </motion.h2>

        <motion.p
          className="text-slate-400 max-w-sm lg:text-right"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
          initial={{ opacity: 0, y: 16 }}
          animate={triggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
          From silicon design to intelligent connected products —
          complete engineering excellence across every layer.
        </motion.p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TAB NAV — magnetic + original palette
══════════════════════════════════════════════════════════════════════════ */
function TabNav({ active, setActive, triggered }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: -24 }}
      animate={triggered ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
      {SOLUTIONS.map((s, i) => {
        const isActive = active === s.id;
        const mag = useMagnetic(0.22);
        return (
          <motion.div
            key={s.id}
            ref={mag.ref}
            onMouseMove={mag.onMove}
            onMouseLeave={mag.onLeave}
            style={{ x: mag.sx, y: mag.sy }}
            initial={{ opacity: 0, x: -20 }}
            animate={triggered ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.32 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setActive(s.id)}
              className="relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left w-full cursor-pointer"
              style={{
                background: isActive
                  ? `linear-gradient(135deg,${s.color}10,${s.colorEnd}07)`
                  : "transparent",
                border: `1px solid ${isActive ? s.colorBorder : "transparent"}`,
                boxShadow: isActive ? `0 4px 24px ${s.colorGlow}` : "none",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                outline: "none",
              }}
            >
              {/* Active side bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-3 bottom-3 rounded-r-full"
                  style={{
                    width: 2,
                    background: `linear-gradient(to bottom, ${s.color}, ${s.colorEnd})`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive ? `${s.color}15` : "#f1f5f9",
                  color: isActive ? s.color : "#94a3b8",
                  border: `1px solid ${isActive ? s.colorBorder : "transparent"}`,
                  boxShadow: isActive ? `0 0 14px ${s.colorGlow}` : "none",
                  transition: "all 0.35s ease",
                }}>
                {s.icon}
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <p className="font-bold"
                  style={{ fontSize: "13px", color: isActive ? "#0f172a" : "#64748b", transition: "color 0.3s" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "11px", color: isActive ? s.color : "#94a3b8", marginTop: "2px", transition: "color 0.3s" }}>
                  {s.tagline}
                </p>
              </div>

              {/* Number */}
              <span
                className="font-black"
                style={{
                  fontSize: "1.7rem", letterSpacing: "-0.06em",
                  color: isActive ? s.color : "#e2e8f0",
                  opacity: isActive ? 0.22 : 1,
                  transition: "all 0.3s ease",
                }}>
                {s.num}
              </span>
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTENT PANEL
══════════════════════════════════════════════════════════════════════════ */
function ContentPanel({ sol, triggered }) {
  const ctaMag = useMagnetic(0.18);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={triggered ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sol.id}
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(5px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col h-full"
        >
          {/* HD image */}
          <div className="mb-4">
            <ImageFrame sol={sol} />
          </div>

          {/* Description */}
          <p className="text-slate-500 mb-5" style={{ fontSize: "13.5px", lineHeight: 1.85 }}>
            {sol.desc}
          </p>

          {/* Capabilities grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {sol.capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl group cursor-default"
                style={{ background: sol.colorSoft, border: `1px solid ${sol.colorBorder}` }}
                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.32, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  scale: 1.025,
                  boxShadow: `0 4px 18px ${sol.colorGlow}`,
                  borderColor: sol.colorBorder,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: sol.color }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                />
                <div>
                  <p className="font-semibold text-slate-800" style={{ fontSize: "12px" }}>{cap.title}</p>
                  <p className="text-slate-400" style={{ fontSize: "10.5px", marginTop: "1px" }}>{cap.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-slate-400 font-medium"
              style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Tools:
            </span>
            {sol.tools.map((t, i) => (
              <motion.span
                key={t}
                className="px-2.5 py-1 rounded-lg font-semibold"
                style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", border: "1px solid #e2e8f0" }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: 0.38 + i * 0.045 }}
                whileHover={{
                  background: sol.colorSoft,
                  color: sol.color,
                  borderColor: sol.colorBorder,
                  scale: 1.05,
                  transition: { duration: 0.15 },
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* CTA row */}
          <div
            className="mt-5 pt-5 flex items-center justify-between"
            style={{ borderTop: `1px solid ${sol.colorBorder}` }}>

            <motion.div
              ref={ctaMag.ref}
              onMouseMove={ctaMag.onMove}
              onMouseLeave={ctaMag.onLeave}
              style={{ x: ctaMag.sx, y: ctaMag.sy }}>
              <a
                href={`/${sol.id}`}
                className="inline-flex items-center gap-2 rounded-full font-bold text-white"
                style={{
                  padding: "10px 22px",
                  fontSize: "12px",
                  background: `linear-gradient(135deg,${sol.color},${sol.colorEnd})`,
                  boxShadow: `0 4px 20px ${sol.colorGlow.replace("0.12","0.35")}`,
                  textDecoration: "none",
                  transition: "box-shadow 0.25s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Explore {sol.label}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </motion.div>

            <span className="text-slate-300 font-medium" style={{ fontSize: "11px" }}>
              {sol.capabilities.length} capabilities
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("semiconductor");
  const sol = SOLUTIONS.find(s => s.id === active);

  return (
    <section
      ref={ref}
      id="solutions"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "linear-gradient(160deg,#ffffff 0%,#f8fafc 60%,#f0f4ff 100%)" }}
    >
      {/* ── Kinetic animated background ── */}
      <KineticBackground sol={sol} />

      {/* ── Edge vignette so canvas fades into page bg ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(248,250,252,0.7) 100%)",
        }} />

      {/* ── Static dot grid (original) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <Header triggered={isInView} />

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Left: tab nav */}
          <TabNav active={active} setActive={setActive} triggered={isInView} />

          {/* Right: content glass card */}
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(148,163,184,0.15)",
              boxShadow: `0 8px 48px rgba(15,23,42,0.08), 0 0 0 1px rgba(255,255,255,0.6) inset`,
              padding: "28px",
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Per-tab accent glow inside panel */}
            <AnimatePresence>
              <motion.div
                key={`panel-glow-${sol.id}`}
                className="absolute inset-0 pointer-events-none rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `radial-gradient(ellipse at 80% 0%, ${sol.colorGlow.replace("0.12","0.18")}, transparent 55%)`,
                }}
              />
            </AnimatePresence>

            <div className="relative z-10">
              <ContentPanel sol={sol} triggered={isInView} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, #e2e8f0, transparent)" }}
      />
    </section>
  );
}