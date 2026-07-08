// src/components/products/ElectronicsDev.jsx
// ─────────────────────────────────────────────────
// Section : Electronics Development — Smart Power Solutions
// Change  : Solar reordered to priority #1 (default tab), real turnkey
//           metrics swapped in for Solar, SolarFullSpecs mounted below
//           the tab panel when Solar is active.
//           3D canvas animation embedded as background inside gradient header
//           Right dark PowerFlowPanel remains UNCHANGED
// Theme   : theme.js tokens (C.*, FONT, EASE, fadeUp)
// Requires: framer-motion, lucide-react

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../products/theme";
import {
  Zap, Wind, Sun, Cpu, Shield, Wifi,
  BarChart2, Activity, ChevronRight,
  Settings, Radio, Leaf, TrendingUp, Eye, Power,
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
    title: "Solar Inverter Solutions",
    subtitle: "Harness Solar. Power the World.",
    description:
      "Turnkey solar power systems from residential rooftops to utility-scale farms — inverter, panels, and full electrical accessories, engineered for maximum harvest and long-term field reliability.",
    // Real headline numbers from the turnkey spec sheet — replaces earlier
    // generic tech-spec placeholders (99.5% uptime, MPPT, Grid Tied/Off).
    metrics: [
      { value: "1kW–2MW", label: "Capacity Range" },
      { value: "5",        label: "Inverter Brands" },
      { value: "10Yr",     label: "Free Warranty" },
      { value: "₹78K",     label: "Max Subsidy" },
    ],
    features: [
      { Icon: Power,      title: "Grid-Tied & Off-Grid",        desc: "Seamless islanding detection and transfer switching" },
      { Icon: TrendingUp, title: "MPPT Based Control",          desc: "Perturb & observe, incremental conductance methods" },
      { Icon: Zap,        title: "High Efficiency Conversion",  desc: "SiC/GaN topologies, <2% THD at full load" },
      { Icon: Eye,        title: "Real-time Monitoring",        desc: "Yield tracking, fault log, cloud sync dashboard" },
      { Icon: BarChart2,  title: "Smart Energy Management",     desc: "Load scheduling, battery arbitrage, grid export" },
      { Icon: Shield,     title: "Robust & Future Ready",       desc: "IEC 62109 safety, surge protection, IP65 ready" },
    ],
    visual: {
      primary: { label: "Max Capacity", value: "2MW" },
      secondary: [
        { label: "House Rooftop", pct: 20 },
        { label: "Industries",    pct: 60 },
        { label: "Solar Farm",    pct: 100 },
      ],
    },
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
    title: "EV Charging Solutions",
    subtitle: "Powering the Future of Mobility",
    description:
      "End-to-end development of AC and DC charging infrastructure — from embedded firmware to OCPP cloud integration — built for real-world durability and smart-grid readiness.",
    metrics: [
      { value: "22kW",     label: "Max Output" },
      { value: "OCPP 2.0", label: "Protocol" },
      { value: "99.2%",    label: "Uptime" },
      { value: "CCS2",     label: "Connector" },
    ],
    features: [
      { Icon: Cpu,      title: "AC & DC Charger Development",  desc: "Full hardware design from controller to connector" },
      { Icon: Settings, title: "Smart Charging Control",       desc: "Dynamic load balancing and scheduling algorithms" },
      { Icon: Radio,    title: "OCPP / Communication",         desc: "OCPP 1.6 / 2.0, MQTT, cloud backend integration" },
      { Icon: Zap,      title: "High Efficiency Conversion",   desc: "PFC front-ends, >95% peak-to-peak efficiency" },
      { Icon: Shield,   title: "Safety & Diagnostics",         desc: "IEC 61851 compliant, ground fault & arc detection" },
      { Icon: Activity, title: "Embedded Monitoring",          desc: "Real-time telemetry, OTA firmware update support" },
    ],
    visual: {
      primary: { label: "Power Rail", value: "22kW DC" },
      secondary: [
        { label: "AC Input",  pct: 78 },
        { label: "PFC Stage", pct: 95 },
        { label: "DC Output", pct: 92 },
      ],
    },
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
    title: "BLDC Fan Solutions",
    subtitle: "Smart · Efficient · Reliable",
    description:
      "High-efficiency BLDC motor control for fan applications — from sensorless startup algorithms to IoT dashboards — delivering silent, long-life operation across industrial and consumer use.",
    metrics: [
      { value: "98%",   label: "Efficiency" },
      { value: "±0.1%", label: "RPM Accuracy" },
      { value: "0 dB",  label: "Cogging" },
      { value: "IoT",   label: "Ready" },
    ],
    features: [
      { Icon: Settings, title: "Sensor & Sensorless Control",  desc: "Back-EMF zero-cross, Hall-effect, observer-based" },
      { Icon: Zap,      title: "High Efficiency BLDC Drive",   desc: "Space vector PWM, dead-time compensation" },
      { Icon: Cpu,      title: "Smart Control Algorithms",     desc: "PI/PID, field-oriented control, adaptive tuning" },
      { Icon: Wifi,     title: "IoT Enabled Monitoring",       desc: "MQTT telemetry, remote speed & fault dashboards" },
      { Icon: Power,    title: "Low Power Consumption",        desc: "Sleep modes, variable-frequency drive control" },
      { Icon: Shield,   title: "Compact Silent Design",        desc: "Low-vibration rotor balancing, EMI-filtered drive" },
    ],
    visual: {
      primary: { label: "Drive Efficiency", value: "98.2%" },
      secondary: [
        { label: "Phase A", pct: 88 },
        { label: "Phase B", pct: 91 },
        { label: "Phase C", pct: 89 },
      ],
    },
  },
];

/* ─────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { label: "Solar Config",    val: "Grid-Tied/Off" },
  { label: "EV Connector",    val: "CCS2" },
  { label: "BLDC Drive",      val: "SVPWM" },
  { label: "Solar Safety",    val: "IEC 62109" },
  { label: "OCPP Protocol",   val: "2.0" },
  { label: "Power Factor",    val: ">0.99" },
  { label: "BLDC Monitoring", val: "IoT/MQTT" },
  { label: "EV Efficiency",   val: ">95%" },
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
                fontSize: 10.5, fontWeight: 600, color: C.textMuted,
                letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: FONT, whiteSpace: "nowrap",
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 800, color,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                whiteSpace: "nowrap",
              }}>
                {item.val}
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
  ctx.fillText("22.0 kW", cx, by + 34);
  ctx.font = "7px monospace"; ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("CHARGING", cx, by + 47);

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
  ctx.fillText("OCPP 2.0", W - 14, H - 12);
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

  // RPM readout
  const dispRpm = Math.round(800 + speed * 3200);
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "bold 11px 'JetBrains Mono', monospace";
  ctx.fillText(dispRpm + " RPM", cx, cy + mh / 2 + 24);
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

  // Efficiency text
  const eff = (97 + Math.sin(t * 0.5) * 1.1).toFixed(1);
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "bold 10px monospace";
  ctx.fillText(eff + "% η", cx, invY - 8);
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

    function loop() {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.width  / dpr;
      const H   = canvas.height / dpr;
      const drawMap = { ev: drawEV, bldc: drawBLDC, solar: drawSolar };
      drawMap[productId]?.(ctx, W, H, tRef.current);
      tRef.current += 0.016;
      animRef.current = requestAnimationFrame(loop);
    }

    tRef.current = 0;
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
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
   POWER FLOW PANEL (dark right column) — UNCHANGED
───────────────────────────────────────────────── */
function PowerFlowPanel({ product, inView }) {
  const { color, gradA, gradB, visual, metrics } = product;
  return (
    <div style={{
      height: "100%", background: "#0d1117", borderRadius: 24,
      padding: 24, display: "flex", flexDirection: "column", gap: 16,
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.16em", textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          Power Flow
        </span>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "3px 10px", borderRadius: 50,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
          <span style={{
            fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Live Sim
          </span>
        </motion.div>
      </div>

      {/* Big number */}
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p style={{
            margin: 0,
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 900, letterSpacing: "-0.05em",
            color: color,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: 1,
          }}>
            {visual.primary.value}
          </p>
          <p style={{
            margin: "6px 0 0", fontSize: 10, fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: FONT,
          }}>
            {visual.primary.label}
          </p>
        </motion.div>
      </div>

      {/* Stage bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visual.secondary.map((stage, i) => (
          <div key={stage.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{
                fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.45)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {stage.label}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.65)",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {stage.pct}%
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${stage.pct}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${gradA}, ${gradB})`,
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Metrics grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: "auto" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            padding: "10px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <p style={{
              margin: 0, fontSize: 15, fontWeight: 800, color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "-0.02em", lineHeight: 1,
            }}>
              {m.value}
            </p>
            <p style={{
              margin: "4px 0 0", fontSize: 9, fontWeight: 600,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: FONT,
            }}>
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────── */
export default function ElectronicsDev() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0); // Solar (index 0) is default — priority #1

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
        <motion.div {...fadeUp} style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 20px", borderRadius: 50,
            border: `1px solid ${C.border}`, background: C.bgWhite,
            color: C.primary, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: C.shadowSm, fontFamily: FONT,
          }}>
            <Layers style={{ width: 12, height: 12 }} />
            Electronics Development
            <ChevronRight style={{ width: 11, height: 11, opacity: 0.5 }} />
            <span style={{
              padding: "2px 11px", borderRadius: 50,
              background: C.gradPrimary, color: "#fff",
              fontSize: 10, letterSpacing: "0.1em",
            }}>
              Smart Power
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
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
            }}
          >
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
            Solar · EV · BLDC
            <span style={{ width: 28, height: 1, background: C.gradPrimary, display: "inline-block" }} />
          </motion.p>

          <motion.h2
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
            Explore our three flagship product lines below — each engineered
            in-house from firmware to enclosure, with real turnkey specs and
            live performance data.
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
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 20, alignItems: "start",
            }}
          >
            {/* ── LEFT CARD ── */}
            <div style={{
              borderRadius: 24,
              border: `1px solid ${product.colorBorder}`,
              background: C.bgWhite,
              boxShadow: C.shadowMd,
              overflow: "hidden",
            }}>
              {/* ── GRADIENT HEADER with 3D canvas bg ── */}
              <div style={{
                background: `linear-gradient(135deg, ${product.gradA} 0%, ${product.gradB} 100%)`,
                padding: "28px 32px 24px",
                position: "relative", overflow: "hidden",
              }}>
                {/* 3D animation canvas — absolute background layer */}
                <ProductAnimation productId={product.id} />

                {/* Original decorative blob — kept as is */}
                <div style={{
                  position: "absolute", top: "-40%", right: "-5%",
                  width: "50%", height: "180%", borderRadius: "50%",
                  background: "rgba(255,255,255,0.09)", pointerEvents: "none",
                  zIndex: 1,
                }} />

                {/* All text content — sits above canvas */}
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between",
                  position: "relative", zIndex: 2,
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: "0 0 6px", fontSize: 10, fontWeight: 700,
                      color: "rgba(255,255,255,0.60)",
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      fontFamily: FONT,
                    }}>
                      {product.title}
                    </p>
                    <h3 style={{
                      margin: "0 0 8px",
                      fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                      fontWeight: 900, lineHeight: 1.1,
                      letterSpacing: "-0.035em", color: "#fff",
                      fontFamily: FONT,
                    }}>
                      {product.subtitle}
                    </h3>
                    <p style={{
                      margin: 0, fontSize: 13.5,
                      color: "rgba(255,255,255,0.70)",
                      lineHeight: 1.7, maxWidth: 420,
                      fontFamily: FONT,
                    }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Product icon */}
                  <div style={{
                    width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginLeft: 16,
                  }}>
                    <product.Icon style={{ width: 28, height: 28, color: "#fff" }} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Coming soon pill */}
                <div style={{ marginTop: 16, position: "relative", zIndex: 2 }}>
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 14px", borderRadius: 50,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      fontSize: 10, fontWeight: 700, color: "#fff",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      fontFamily: FONT,
                    }}
                  >
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "#fff", display: "inline-block",
                    }} />
                    Coming Soon
                  </motion.span>
                </div>
              </div>

              {/* Feature grid — unchanged */}
              <div style={{
                padding: "24px 28px 28px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}>
                {product.features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, ease: EASE }}
                    style={{
                      padding: "14px",
                      borderRadius: 12,
                      background: product.colorSoft,
                      border: `1px solid ${product.colorBorder}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: product.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <f.Icon style={{ width: 13, height: 13, color: "#fff" }} strokeWidth={2.2} />
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        color: C.textPrimary, lineHeight: 1.25, fontFamily: FONT,
                      }}>
                        {f.title}
                      </span>
                    </div>
                    <p style={{
                      margin: 0, fontSize: 11, color: C.textMuted,
                      lineHeight: 1.5, fontFamily: FONT,
                    }}>
                      {f.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — dark PowerFlowPanel (UNCHANGED) ── */}
            <PowerFlowPanel product={product} inView={inView} />
          </motion.div>
        </AnimatePresence>

        {/* ── FULL SPEC BREAKDOWN — Solar only, since it's the only real/launching product ── */}
        {product.id === "solar" && <SolarFullSpecs product={product} />}
      </div>

      {/* Metrics ticker */}
      <div style={{ marginTop: 40, position: "relative", zIndex: 2 }}>
        <MetricsTicker color={product.color} />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .ed2-panel { grid-template-columns: 1fr !important; }
          #electronics-dev { padding-top: 72px !important; }
        }
        @media (max-width: 600px) {
          .ed2-wrap { padding: 0 16px !important; }
          .ed2-panel > div:first-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 1400px) {
          .ed2-wrap { max-width: 1320px !important; }
        }
      `}</style>
    </section>
  );
}