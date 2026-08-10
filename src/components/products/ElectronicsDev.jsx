// src/components/products/ElectronicsDev.jsx
// ─────────────────────────────────────────────────
// Section : Power Electronics & Product Engineering (Solar / EV / BLDC)
// Theme   : theme.js tokens (C.*, FONT, EASE, fadeUp)
// Requires: framer-motion, lucide-react
//
// MOBILE/TABLET FIX PASS
// 1) Top badge ("Power Electronics & Product Engineering" + chevron + "Smart
//    Power" pill) had no flex-wrap — on narrow phones this single unbroken
//    row overflows the viewport width and forces horizontal scroll. Now
//    wraps and re-centers below 600px.
// 2) `.ed2-header > div` was a positional selector matching every direct
//    div child of the gradient header (including the absolutely-positioned
//    decorative blob), not just the text+icon row. Replaced with an
//    explicit class on the actual content row.
// 3) Badge/heading block margins (60px, fixed at every breakpoint) tightened
//    below 900px/600px so mobile doesn't carry desktop-sized empty gaps.
// 4) Heading floor (2.4rem) stepped down further below 480px.
// All changes are scoped to existing/new media queries — desktop (>=900px)
// layout, spacing, and JSX structure are unchanged.

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../products/theme";
import {
  Zap, Wind, Sun, Cpu, Shield, Wifi,
  BarChart2, Activity, ChevronRight,
  Settings, Radio, TrendingUp, Eye, Power,
  Layers,
} from "lucide-react";
import SolarFullSpecs from "./SolarFullspecs";

/* ─────────────────────────────────────────────────
   PRODUCT DEFINITIONS
   Solar moved to index 0 — priority #1, launching first.
───────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "solar",
    tabLabel: "Solar Inverter",
    Icon: Sun,
    color: "#d97706",
    colorDark: "#78350f",
    colorSoft: "#fef3c7",
    colorBorder: "#fcd34d",
    gradA: "#f59e0b",
    gradB: "#d97706",
    title: "Solar Inverters – Off-Grid with Battery Charging",
    subtitle: "Harness Solar. Power the World.",
    description:
      "Standalone solar power systems that efficiently convert PV energy, manage battery charging, and provide uninterrupted power in off-grid applications.",
    features: [
      { Icon: Power,      title: "Grid-Tied & Off-Grid",        desc: "Seamless islanding detection and transfer switching" },
      { Icon: TrendingUp, title: "MPPT Based Control",          desc: "Perturb & observe, incremental conductance methods" },
      { Icon: Zap,        title: "High Efficiency Conversion",  desc: "Optimized power conversion topologies for maximum harvest" },
      { Icon: Eye,        title: "Real-time Monitoring",        desc: "Yield tracking, fault log, cloud sync dashboard" },
      { Icon: BarChart2,  title: "Smart Energy Management",     desc: "Load scheduling, battery arbitrage, grid export" },
      { Icon: Shield,     title: "Robust & Future Ready",       desc: "Safety-first design with surge protection built in" },
    ],
  },
  {
    id: "ev",
    tabLabel: "EV Charging",
    Icon: Zap,
    color: "#16a34a",
    colorDark: "#14532d",
    colorSoft: "#dcfce7",
    colorBorder: "#86efac",
    gradA: "#16a34a",
    gradB: "#059669",
    title: "EV Chargers",
    subtitle: "Powering the Future of Mobility",
    description:
      "Intelligent AC and DC electric vehicle charging solutions with advanced power conversion, safety protection, and smart connectivity for reliable charging.",
    features: [
      { Icon: Cpu,      title: "AC & DC Charger Development",  desc: "Full hardware design from controller to connector" },
      { Icon: Settings, title: "Smart Charging Control",       desc: "Dynamic load balancing and scheduling algorithms" },
      { Icon: Radio,    title: "OCPP / Communication",         desc: "Standards-based protocol support with cloud backend integration" },
      { Icon: Zap,      title: "High Efficiency Conversion",   desc: "PFC front-ends for high peak-to-peak efficiency" },
      { Icon: Shield,   title: "Safety & Diagnostics",         desc: "Ground fault and arc detection built in" },
      { Icon: Activity, title: "Embedded Monitoring",          desc: "Real-time telemetry, OTA firmware update support" },
    ],
  },
  {
    id: "bldc",
    tabLabel: "BLDC Fan",
    Icon: Wind,
    color: "#2563eb",
    colorDark: "#1e3a8a",
    colorSoft: "#dbeafe",
    colorBorder: "#93c5fd",
    gradA: "#2563eb",
    gradB: "#0891b2",
    title: "BLDC Fan Controller",
    subtitle: "Smart · Efficient · Reliable",
    description:
      "High-efficiency motor controller for BLDC ceiling and industrial fans, delivering precise speed control, silent operation, and significant energy savings.",
    features: [
      { Icon: Settings, title: "Sensorless FOC Control",       desc: "Field-oriented control with back-EMF observer-based estimation" },
      { Icon: Zap,      title: "High Efficiency BLDC Drive",   desc: "Space vector PWM, dead-time compensation" },
      { Icon: Cpu,      title: "Smart Control Algorithms",     desc: "PI/PID, field-oriented control, adaptive tuning" },
      { Icon: Wifi,     title: "IoT Enabled Monitoring",       desc: "Remote speed & fault dashboards" },
      { Icon: Power,    title: "Low Power Consumption",        desc: "Sleep modes, variable-frequency drive control" },
      { Icon: Shield,   title: "Compact Silent Design",        desc: "Low-vibration rotor balancing, EMI-filtered drive" },
    ],
  },
];

/* ─────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Grid-Tied & Off-Grid",
  "MPPT Based Control",
  "AC & DC Charger Development",
  "Smart Charging Control",
  "Sensorless FOC Control",
  "High Efficiency BLDC Drive",
  "Real-time Monitoring",
  "Smart Energy Management",
  "OCPP / Communication",
  "IoT Enabled Monitoring",
];

function MetricsTicker({ color }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      overflow: "hidden",
      borderTop: `1px solid ${C.borderLight}`,
      borderBottom: `1px solid ${C.borderLight}`,
      background: C.bgWhite,
      padding: "10px 0",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 28px" }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: color, display: "inline-block", flexShrink: 0,
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700, color: C.textSecondary,
                letterSpacing: "0.04em",
                fontFamily: FONT, whiteSpace: "nowrap",
              }}>
                {item}
              </span>
            </div>
            <div style={{ width: 1, height: 14, background: C.borderLight, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   3D CANVAS ANIMATION UTILITIES
───────────────────────────────────────────────── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* EV Charging 3D scene */
function drawEV(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 - 10;

  // Floating energy particles (wide spread)
  for (let i = 0; i < 14; i++) {
    const py = (H - (t * 45 + i * 36) % (H + 20));
    const px = 40 + ((i * 73) % (W - 80));
    const a = 0.15 + Math.sin(t * 2 + i) * 0.12;
    const r = 1.5 + Math.sin(t + i) * 1;
    ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
  }

  // Charger body
  const bw = 80, bh = 140, bx = cx - bw / 2, by = cy - bh / 2;

  // 3D right side face
  ctx.beginPath();
  ctx.moveTo(bx + bw, by);
  ctx.lineTo(bx + bw + 18, by - 13);
  ctx.lineTo(bx + bw + 18, by + bh - 13);
  ctx.lineTo(bx + bw, by + bh);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.stroke();

  // 3D top face
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx + bw, by);
  ctx.lineTo(bx + bw + 18, by - 13);
  ctx.lineTo(bx + 18, by - 13);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.stroke();

  // Front face
  ctx.beginPath(); roundRect(ctx, bx, by, bw, bh, 10);
  ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1.5; ctx.stroke();

  // Screen panel
  const sg = Math.sin(t * 2) * 0.08 + 0.92;
  ctx.beginPath(); roundRect(ctx, bx + 10, by + 14, bw - 20, 44, 5);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255,${sg * 0.35})`; ctx.lineWidth = 1; ctx.stroke();

  ctx.fillStyle = `rgba(255,255,255,${sg * 0.95})`;
  ctx.font = "bold 11px 'JetBrains Mono', monospace"; ctx.textAlign = "center";
  ctx.fillText("CHARGING", cx, by + 34);

  // Progress bar
  const prog = Math.sin(t * 0.5) * 0.35 + 0.65;
  ctx.beginPath(); roundRect(ctx, bx + 12, by + 52, bw - 24, 4, 2);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
  ctx.beginPath(); roundRect(ctx, bx + 12, by + 52, (bw - 24) * prog, 4, 2);
  ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fill();

  // Connector port
  ctx.beginPath(); roundRect(ctx, bx + 14, by + 66, bw - 28, 22, 4);
  ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "7px monospace"; ctx.textAlign = "center";
  ctx.fillText("CCS2", cx, by + 81);

  // Status LEDs
  for (let i = 0; i < 4; i++) {
    const lx = bx + 13 + i * 17;
    const pulse = Math.sin(t * 3 + i * 1.2) * 0.4 + 0.6;
    ctx.beginPath(); ctx.arc(lx, by + 104, 4, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? `rgba(255,255,255,${pulse})` : "rgba(255,255,255,0.15)";
    ctx.fill();
  }

  // Cable
  ctx.beginPath();
  ctx.moveTo(cx, by + bh);
  const sw = Math.sin(t) * 5;
  ctx.bezierCurveTo(cx + sw, cy + 88, cx - sw, cy + 108, cx + sw * 0.5, cy + 130);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.stroke();

  // Plug tip
  ctx.beginPath(); roundRect(ctx, cx + sw * 0.5 - 6, cy + 126, 12, 12, 2);
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fill();

  // Ground lines
  for (let i = -3; i <= 3; i++) {
    const lx = cx + i * 32;
    const pulse = Math.abs(Math.sin(t * 1.5 + i * 0.7));
    ctx.beginPath(); ctx.moveTo(lx, H); ctx.lineTo(lx, H - 22);
    ctx.strokeStyle = `rgba(255,255,255,${pulse * 0.12})`; ctx.lineWidth = 1; ctx.stroke();
  }

  // Corner label
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "8px monospace"; ctx.textAlign = "left";
  ctx.fillText("AC → DC", 14, H - 12);
  ctx.textAlign = "right";
  ctx.fillText("SMART CHARGING", W - 14, H - 12);
}

/* BLDC Fan 3D scene */
function drawBLDC(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 - 14;
  const speed = Math.sin(t * 0.3) * 0.4 + 0.6;
  const rpm = t * 3 * speed;

  // Stator halos
  for (let r = 0; r < 3; r++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 74 - r * 18, (74 - r * 18) * 0.36, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.06 + r * 0.04})`; ctx.lineWidth = 1.5; ctx.stroke();
  }

  // Motor cylinder
  const mw = 40, mh = 72;
  // Right 3D face
  ctx.beginPath();
  ctx.moveTo(cx + mw / 2, cy - mh / 2); ctx.lineTo(cx + mw / 2 + 13, cy - mh / 2 - 9);
  ctx.lineTo(cx + mw / 2 + 13, cy + mh / 2 - 9); ctx.lineTo(cx + mw / 2, cy + mh / 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.stroke();
  // Top 3D face
  ctx.beginPath();
  ctx.moveTo(cx - mw / 2, cy - mh / 2); ctx.lineTo(cx + mw / 2, cy - mh / 2);
  ctx.lineTo(cx + mw / 2 + 13, cy - mh / 2 - 9); ctx.lineTo(cx - mw / 2 + 13, cy - mh / 2 - 9);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.stroke();
  // Front face
  ctx.beginPath(); ctx.rect(cx - mw / 2, cy - mh / 2, mw, mh);
  ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 1.5; ctx.stroke();
  // Caps
  ctx.beginPath(); ctx.ellipse(cx, cy - mh / 2, mw / 2, mw / 2 * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.16)"; ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx, cy + mh / 2, mw / 2, mw / 2 * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();

  // Shaft
  ctx.beginPath(); ctx.rect(cx - 1.5, cy - mh / 2 - 13, 3, mh + 26);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fill();
  // Hub
  ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 2; ctx.stroke();

  // Fan blades
  for (let i = 0; i < 6; i++) {
    const angle = rpm + (i / 6) * Math.PI * 2;
    const blen = 68;
    const depth = Math.sin(angle) * 0.5 + 0.5;
    const alpha = 0.18 + depth * 0.45;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(9, 0);
    ctx.bezierCurveTo(20, -8, blen * 0.65, -12, blen, -5);
    ctx.bezierCurveTo(blen, 4, blen * 0.65, 9, 9, 0);
    ctx.closePath();
    ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.6})`; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }

  // Airflow streaks above
  for (let i = 0; i < 8; i++) {
    const ax = cx - 96 + i * 28;
    const wave = Math.sin(t * 4 + i * 0.9) * 7;
    ctx.beginPath();
    ctx.moveTo(ax + wave, 16);
    ctx.quadraticCurveTo(ax - wave, cy * 0.5, ax + wave, cy - mh / 2 - 16);
    ctx.strokeStyle = `rgba(255,255,255,${0.06 + Math.abs(Math.sin(t * 2.5 + i)) * 0.06})`;
    ctx.lineWidth = 1.2; ctx.stroke();
  }

  // Phase waveforms at bottom
  for (let p = 0; p < 3; p++) {
    const wy = H - 62 + p * 19;
    ctx.beginPath(); ctx.moveTo(14, wy);
    for (let x = 0; x < W - 28; x += 2) {
      ctx.lineTo(14 + x, wy + Math.sin((x / 54) * Math.PI * 2 + t * 4 + p * 2.09) * 7);
    }
    ctx.strokeStyle = `rgba(255,255,255,${0.3 + p * 0.08})`; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "7px monospace"; ctx.textAlign = "left";
    ctx.fillText(`Ph ${["A","B","C"][p]}`, 14, wy - 3);
  }

  // Drive status readout
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "bold 11px 'JetBrains Mono', monospace";
  ctx.fillText("RUNNING", cx, cy + mh / 2 + 24);
}

/* Solar Inverter 3D scene */
function drawSolar(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2;

  // Sun
  const sy = 44, sr = 18;
  const pulse = Math.sin(t) * 0.3 + 0.7;
  for (let r = 0; r < 3; r++) {
    ctx.beginPath(); ctx.arc(cx, sy, sr + 9 + r * 13, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${(0.08 - r * 0.022) * pulse})`; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(cx, sy, sr, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1.5; ctx.stroke();
  // Rays
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + t * 0.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (sr + 4), sy + Math.sin(a) * (sr + 4));
    ctx.lineTo(cx + Math.cos(a) * (sr + 14), sy + Math.sin(a) * (sr + 14));
    ctx.strokeStyle = `rgba(255,255,255,${pulse * 0.45})`; ctx.lineWidth = 1.8; ctx.stroke();
  }

  // Solar panels (2 panels)
  const panels = [{ x: cx - 158, y: 94 }, { x: cx + 30, y: 94 }];
  for (const panel of panels) {
    const pw = 124, ph = 56;
    // 3D top face
    ctx.beginPath();
    ctx.moveTo(panel.x, panel.y); ctx.lineTo(panel.x + pw, panel.y);
    ctx.lineTo(panel.x + pw + 15, panel.y - 10); ctx.lineTo(panel.x + 15, panel.y - 10);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
    // 3D right face
    ctx.beginPath();
    ctx.moveTo(panel.x + pw, panel.y); ctx.lineTo(panel.x + pw + 15, panel.y - 10);
    ctx.lineTo(panel.x + pw + 15, panel.y + ph - 10); ctx.lineTo(panel.x + pw, panel.y + ph);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.stroke();
    // Front face
    ctx.beginPath(); ctx.rect(panel.x, panel.y, pw, ph);
    ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1.5; ctx.stroke();
    // Cell grid shimmer
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const cx2 = panel.x + c * (pw / 4) + 4, cy2 = panel.y + r * (ph / 3) + 4;
      const shine = Math.sin(t * 1.5 + r * 0.8 + c * 1.1) * 0.08 + 0.08;
      ctx.beginPath(); ctx.rect(cx2, cy2, pw / 4 - 8, ph / 3 - 8);
      ctx.fillStyle = `rgba(255,255,255,${shine})`; ctx.fill();
    }
    // Photon particles
    for (let r = 0; r < 5; r++) {
      const prg = ((t * 0.8 + r * 0.3) % 1);
      const py = sy + sr + (panel.y - sy - sr) * prg;
      const px = panel.x + 10 + r * 23;
      const alpha = prg < 0.8 ? prg * 1.2 : (1 - prg) * 5;
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`; ctx.fill();
    }
  }

  // MPPT inverter box
  const invX = cx - 42, invY = 168, invW = 84, invH = 44;
  ctx.beginPath(); roundRect(ctx, invX, invY, invW, invH, 7);
  ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.75)"; ctx.font = "bold 8px monospace"; ctx.textAlign = "center";
  ctx.fillText("MPPT", cx, invY + 14);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "7px monospace";
  ctx.fillText("INVERTER", cx, invY + 26);
  const iLed = Math.sin(t * 3) * 0.3 + 0.7;
  ctx.beginPath(); ctx.arc(cx - 20, invY + 36, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${iLed * 0.8})`; ctx.fill();

  // Wire flows
  for (const panel of panels) {
    const wX = panel.x < cx ? panel.x + 124 : panel.x;
    const fp = ((t * 0.5 + panels.indexOf(panel) * 0.5) % 1);
    ctx.beginPath();
    ctx.moveTo(wX, panel.y + 28);
    ctx.bezierCurveTo(wX + (cx < wX ? -26 : 26), panel.y + 28, cx + (wX < cx ? -26 : 26), invY + 22, cx, invY + 22);
    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5; ctx.stroke();
    const gx = wX + (cx - wX) * fp, gy = panel.y + 28 + (invY + 22 - (panel.y + 28)) * fp;
    ctx.beginPath(); ctx.arc(gx, gy, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.65)"; ctx.fill();
  }

  // Output line
  const gridY = H - 42;
  ctx.beginPath(); ctx.moveTo(cx, invY + invH); ctx.lineTo(cx, gridY - 6);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5; ctx.stroke();

  // AC waveforms
  for (const side of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(cx + side * 4, gridY);
    for (let x = 0; x < 76; x += 2) {
      ctx.lineTo(cx + side * 4 + side * x, gridY + Math.sin((x / 21) * Math.PI * 2 + t * 4) * 8);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "7px monospace";
    ctx.textAlign = side < 0 ? "right" : "left";
    ctx.fillText(side < 0 ? "AC GRID" : "BATTERY", cx + side * 84, gridY + 3);
  }

  // Status text
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "bold 10px monospace";
  ctx.fillText("CONVERTING", cx, invY - 8);
}

/* ─────────────────────────────────────────────────
   PRODUCT ANIMATION COMPONENT
   Canvas sits as absolute bg inside gradient header
───────────────────────────────────────────────── */
function ProductAnimation({ productId }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    function loop() {
      animRef.current = requestAnimationFrame(loop);
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.width  / dpr;
      const H   = canvas.height / dpr;
      const drawMap = { ev: drawEV, bldc: drawBLDC, solar: drawSolar };
      drawMap[productId]?.(ctx, W, H, tRef.current);
      tRef.current += 0.016;
    }

    // Pause while this card's canvas is scrolled off-screen — otherwise it
    // keeps redrawing every frame in the background, competing with the
    // other product-page sections' own animation loops for the main thread.
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) { visible = true; if (animRef.current === null) loop(); }
      else if (!nowVisible && visible) { visible = false; if (animRef.current !== null) { cancelAnimationFrame(animRef.current); animRef.current = null; } }
    }, { threshold: 0 });
    io.observe(canvas);

    tRef.current = 0;
    loop();

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      io.disconnect();
      ro.disconnect();
    };
  }, [productId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        opacity: 0.55,          // subtle — text stays readable
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "overlay", // blends naturally with gradient
      }}
    />
  );
}

/* ─────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────── */
export default function ElectronicsDev() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0); // Solar (index 0) is default — priority #1
  const [specsOpen, setSpecsOpen] = useState(false); // mobile/tablet-only accordion for SolarFullSpecs

  const product = PRODUCTS[active];

  return (
    <section
      id="electronics-dev"
      ref={ref}
      style={{
        position: "relative", overflow: "hidden",
        background: C.bgLight, fontFamily: FONT,
        padding: "120px 0 0",
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: "-12%", right: "-8%",
        width: "42vw", height: "42vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%",
        width: "28vw", height: "28vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div className="ed2-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
      }}>

        {/* Badge */}
        <motion.div {...fadeUp} className="ed2-badge-wrap" style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
          <span className="ed2-top-badge" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 20px", borderRadius: 50,
            border: `1px solid ${C.border}`, background: C.bgWhite,
            color: C.primary, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: C.shadowSm, fontFamily: FONT,
          }}>
            <Layers style={{ width: 12, height: 12, flexShrink: 0 }} />
            <span className="ed2-badge-label">Power Electronics & Product Engineering</span>
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5, flexShrink: 0 }} />
            <span style={{
              padding: "2px 11px", borderRadius: 50,
              background: C.gradPrimary, color: "#fff",
              fontSize: 10, letterSpacing: "0.1em", flexShrink: 0,
            }}>
              Smart Power
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <div className="ed2-heading-block" style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: C.primary, marginBottom: 16,
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, fontFamily: FONT,
              flexWrap: "wrap",
            }}
          >
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
            Solar · EV · BLDC
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
          </motion.p>

          <motion.h2
            className="ed2-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: "0 auto 20px",
              color: C.textPrimary, maxWidth: 680, fontFamily: FONT,
            }}
          >
            Intelligent Power.{" "}
            <span style={{
              background: C.gradPrimary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Sustainable World.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
            style={{
              color: C.textSecondary,
              fontSize: "clamp(0.9rem, 1.4vw, 1.02rem)",
              lineHeight: 1.85, maxWidth: 520,
              margin: "0 auto", fontFamily: FONT,
            }}
          >
            End-to-end development of power electronic products—from concept,
            architecture, hardware, firmware, magnetics, validation,
            certification, and manufacturing support. Explore our three
            flagship product lines below.
          </motion.p>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          style={{
            display: "flex", justifyContent: "center",
            gap: 8, marginBottom: 32, flexWrap: "wrap",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 22px", borderRadius: 50,
                border: active === i ? `1.5px solid ${p.colorBorder}` : `1px solid ${C.border}`,
                background: active === i ? p.colorSoft : C.bgWhite,
                color: active === i ? p.colorDark : C.textSecondary,
                fontSize: 12.5, fontWeight: 700,
                letterSpacing: "0.04em", cursor: "pointer",
                fontFamily: FONT, transition: "all 0.22s ease",
                boxShadow: active === i ? C.shadowSm : "none",
              }}
            >
              <p.Icon
                style={{ width: 14, height: 14, color: active === i ? p.color : C.textMuted }}
                strokeWidth={2.2}
              />
              {p.tabLabel}
            </button>
          ))}
        </motion.div>

        {/* Main panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="ed2-panel"
            style={{
              borderRadius: 28,
              border: `1px solid ${product.colorBorder}`,
              background: C.bgWhite,
              boxShadow: C.shadowLg,
              overflow: "hidden",
            }}
          >
            {/* ── GRADIENT HEADER with 3D canvas bg — now full width ── */}
            <div className="ed2-header" style={{
              background: `linear-gradient(135deg, ${product.gradA} 0%, ${product.gradB} 100%)`,
              padding: "clamp(28px,4vw,44px) clamp(28px,5vw,52px)",
              position: "relative", overflow: "hidden",
            }}>
              {/* 3D animation canvas — absolute background layer */}
              <ProductAnimation productId={product.id} />

              {/* Original decorative blob — kept as is */}
              <div style={{
                position: "absolute", top: "-40%", right: "-5%",
                width: "40%", height: "180%", borderRadius: "50%",
                background: "rgba(255,255,255,0.09)", pointerEvents: "none",
                zIndex: 1,
              }} />

              {/* All text content — sits above canvas.
                  Explicit class instead of a positional `> div` selector,
                  so this row is the only thing the mobile CSS below targets. */}
              <div className="ed2-header-row" style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between", gap: 24,
                position: "relative", zIndex: 2,
              }}>
                <div style={{ flex: 1, maxWidth: 620 }}>
                  <p style={{
                    margin: "0 0 8px", fontSize: 10.5, fontWeight: 700,
                    color: "rgba(255,255,255,0.60)",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    fontFamily: FONT,
                  }}>
                    {product.title}
                  </p>
                  <h3 style={{
                    margin: "0 0 10px",
                    fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                    fontWeight: 900, lineHeight: 1.08,
                    letterSpacing: "-0.035em", color: "#fff",
                    fontFamily: FONT,
                  }}>
                    {product.subtitle}
                  </h3>
                  <p style={{
                    margin: 0, fontSize: 14.5,
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.75, maxWidth: 520,
                    fontFamily: FONT,
                  }}>
                    {product.description}
                  </p>
                </div>

                {/* Product icon */}
                <div className="ed2-header-icon" style={{
                  width: 76, height: 76, borderRadius: 20, flexShrink: 0,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <product.Icon style={{ width: 34, height: 34, color: "#fff" }} strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Feature grid — 3 columns now that the sidebar is gone */}
            <div className="ed2-features" style={{
              padding: "clamp(24px,3vw,32px) clamp(24px,4vw,36px) clamp(28px,4vw,36px)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}>
              {product.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="ed2-feature-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: EASE }}
                  style={{
                    padding: "16px",
                    borderRadius: 14,
                    background: product.colorSoft,
                    border: `1px solid ${product.colorBorder}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: product.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <f.Icon style={{ width: 14, height: 14, color: "#fff" }} strokeWidth={2.2} />
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: product.colorDark, opacity: 0.45 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p style={{
                    margin: "0 0 4px", fontSize: 13, fontWeight: 700,
                    color: C.textPrimary, lineHeight: 1.3, fontFamily: FONT,
                  }}>
                    {f.title}
                  </p>
                  <p style={{
                    margin: 0, fontSize: 11.5, color: C.textMuted,
                    lineHeight: 1.55, fontFamily: FONT,
                  }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── FULL SPEC BREAKDOWN — nested inside the Solar tab's own card.
                 On mobile/tablet this is the single biggest scroll contributor,
                 so it's collapsed by default behind a toggle there. Desktop
                 (>=900px) always shows it fully open, same as before. ── */}
            {product.id === "solar" && (
              <div style={{ padding: "0 clamp(24px,4vw,36px) clamp(28px,4vw,36px)" }}>
                <div className={`ed2-fullspecs-wrap${specsOpen ? " is-open" : ""}`}>
                  <div className="ed2-fullspecs-inner">
                    <SolarFullSpecs product={product} />
                  </div>
                </div>
                <button
                  className="ed2-fullspecs-toggle"
                  onClick={() => setSpecsOpen(v => !v)}
                  style={{
                    display: "none", // shown only <900px via CSS
                    width: "100%", alignItems: "center", justifyContent: "center", gap: 8,
                    marginTop: 14, padding: "12px 18px", borderRadius: 12,
                    border: `1px solid ${product.colorBorder}`,
                    background: product.colorSoft, color: product.colorDark,
                    fontSize: 12.5, fontWeight: 700, fontFamily: FONT,
                    letterSpacing: "0.04em", cursor: "pointer",
                  }}
                >
                  {specsOpen ? "Hide Full Specifications" : "View Full Specifications"}
                  <ChevronRight style={{
                    width: 14, height: 14,
                    transform: specsOpen ? "rotate(-90deg)" : "rotate(90deg)",
                    transition: "transform 0.25s ease",
                  }} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Metrics ticker */}
      <div style={{ marginTop: 40, position: "relative", zIndex: 2 }}>
        <MetricsTicker color={product.color} />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          #electronics-dev { padding-top: 72px !important; }
          .ed2-badge-wrap { margin-bottom: 36px !important; }
          .ed2-heading-block { margin-bottom: 36px !important; }

          /* Feature grid -> single vertical column on mobile/tablet. */
          .ed2-features {
            grid-template-columns: 1fr !important;
          }

          /* Solar full-spec breakdown collapsed by default — biggest single
             chunk of extra scroll on the Solar tab. Toggle reveals it. */
          .ed2-fullspecs-wrap {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
          }
          .ed2-fullspecs-wrap.is-open { max-height: 6000px; }
          .ed2-fullspecs-toggle { display: flex !important; }
        }
        @media (max-width: 600px) {
          .ed2-wrap { padding: 0 16px !important; }

          /* Icon no longer stacks below the description (which added a full
             extra row of height) — pinned as a small corner badge instead. */
          .ed2-header-row { flex-direction: column !important; align-items: flex-start !important; }
          .ed2-header-row > div:first-child { padding-right: 52px !important; }
          .ed2-header-icon {
            position: absolute !important;
            top: clamp(20px,4vw,28px) !important;
            right: clamp(20px,5vw,28px) !important;
            width: 40px !important; height: 40px !important;
            border-radius: 12px !important;
          }
          .ed2-header-icon svg { width: 18px !important; height: 18px !important; }

          /* Top badge: was a single unbroken row (label + chevron + pill) with
             no wrap — overflowed the viewport on narrow phones and forced
             horizontal scroll. Now wraps and re-centers. */
          .ed2-top-badge {
            flex-wrap: wrap !important;
            justify-content: center !important;
            text-align: center !important;
            row-gap: 6px !important;
            padding: 8px 16px !important;
            font-size: 9.5px !important;
            letter-spacing: 0.1em !important;
          }
          .ed2-badge-label { white-space: normal !important; }

          .ed2-badge-wrap { margin-bottom: 28px !important; }
          .ed2-heading-block { margin-bottom: 28px !important; }
        }
        @media (max-width: 480px) {
          .ed2-heading { font-size: clamp(1.9rem, 9vw, 2.3rem) !important; }
        }
        @media (min-width: 1400px) {
          .ed2-wrap { max-width: 1320px !important; }
        }
      `}</style>
    </section>
  );
}