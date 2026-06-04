import { useState } from "react";

const SOLUTIONS = [
  {
    id: "asic",
    num: "01",
    label: "ASIC Design",
    tagline: "Silicon-Proven · Performance-First",
    desc: "End-to-end ASIC, FPGA, and SoC design — from architecture and RTL through to physical design and GDSII sign-off. High-performance, low-power solutions with full verification coverage.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Semiconductor circuit",
    href: "/asic",
    capabilities: [
      { title: "ASIC / SoC Design",  sub: "Architecture · RTL · Low Power" },
      { title: "FPGA Development",   sub: "Xilinx · Intel · Lattice" },
      { title: "DFT & ATPG",         sub: "Scan · MBIST · JTAG" },
      { title: "UVM Verification",   sub: "Testbench · Assertions · Coverage" },
      { title: "GDSII Sign-off",     sub: "STA · IR-Drop · DRC · LVS" },
    ],
    tools: ["Synopsys", "Cadence", "Siemens", "Ansys", "KLA"],
  },
  {
    id: "embedded",
    num: "02",
    label: "Embedded & IoT",
    tagline: "Connected · Intelligent · Real-Time",
    desc: "From bare-metal firmware to full Linux-based industrial systems — embedded solutions and IoT platforms bridging hardware and software for intelligent, connected ecosystems.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Embedded circuit board",
    href: "/embedded",
    capabilities: [
      { title: "Embedded Firmware",     sub: "C/C++ · RTOS · Bare Metal · HAL" },
      { title: "Industrial Automation", sub: "PLC · SCADA · Edge Control" },
      { title: "IoT Connectivity",      sub: "MQTT · BLE · WiFi · LoRa · Zigbee" },
      { title: "Device Drivers",        sub: "SPI · I2C · UART · CAN · USB" },
      { title: "Edge AI",               sub: "TinyML · TF Lite · ONNX Runtime" },
      { title: "OTA & Security",        sub: "Secure Boot · Firmware Updates" },
    ],
    tools: ["FreeRTOS", "Zephyr", "Linux", "ESP-IDF", "STM32"],
  },
  {
    id: "products",
    num: "03",
    label: "Electronics Products",
    tagline: "Concept to Certified Product",
    desc: "Custom power electronics and embedded product development — EV charging systems, BLDC motor controllers, solar inverters. Full lifecycle from PCB design to certification and market launch.",
    imageUrl: "https://images.unsplash.com/photo-1568209865332-a15790aed756?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Power electronics PCB",
    href: "/products",
    capabilities: [
      { title: "EV Charging Systems",    sub: "AC/DC · OCPP · Smart Charging" },
      { title: "BLDC Motor Controllers", sub: "Sensorless · FOC · IoT" },
      { title: "Solar Inverters",        sub: "Grid-Tied · Off-Grid · MPPT" },
      { title: "PCB Design",             sub: "Schematic · Multilayer · Signal Integrity" },
      { title: "Power Electronics",      sub: "SMPS · DC-DC · Gate Drivers" },
      { title: "Certification",          sub: "CE · BIS · EMI/EMC · Safety" },
    ],
    tools: ["Altium", "KiCAD", "MATLAB", "Simulink", "LTspice"],
  },
];

/* ── Tokens ── */
const C = {
  sand:      "#F5F2ED",
  sandLight: "#FDFAF6",
  sandMid:   "#EAE4DC",
  sandBorder:"#DDD6CB",
  sandDeep:  "#C4B8A8",
  muted:     "#A89880",
  body:      "#7A6E64",
  ink:       "#1A1612",
  inkSoft:   "#4A3F35",
  terra:     "#D4521A",
};

/* ── Arrow SVG ── */
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
      stroke={C.terra} strokeWidth="1.8" strokeLinecap="round">
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="7,2 12,7 7,12" />
    </svg>
  );
}

/* ── Plus/Close icon ── */
function PlusIcon({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
      stroke={open ? "#fff" : C.muted} strokeWidth="1.8" strokeLinecap="round"
      style={{ transition: "transform 0.35s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
    </svg>
  );
}

/* ── Single accordion row ── */
function AccItem({ sol, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: `1.5px solid ${C.sandBorder}` }}>

      {/* Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "80px 1fr 48px",
          alignItems: "stretch", padding: 0, textAlign: "left",
        }}
      >
        {/* Number */}
        <div style={{
          background: isOpen ? C.terra : C.sandMid,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.25s",
        }}>
          <span style={{
            fontSize: "2rem", fontWeight: 900, lineHeight: 1,
            color: isOpen ? "#fff" : C.sandDeep,
            transition: "color 0.25s",
          }}>
            {sol.num}
          </span>
        </div>

        {/* Label */}
        <div style={{ padding: "22px 28px", background: C.sand }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 900, color: C.ink, lineHeight: 1.1 }}>
            {sol.label}
          </div>
          <div style={{
            fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em",
          }}>
            {sol.tagline}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ background: C.sand, display: "flex", alignItems: "center", justifyContent: "center", padding: "22px 14px" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: `1.5px solid ${isOpen ? C.terra : C.sandBorder}`,
            background: isOpen ? C.terra : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s, border-color 0.2s",
          }}>
            <PlusIcon open={isOpen} />
          </div>
        </div>
      </button>

      {/* Body */}
      <div style={{
        overflow: "hidden",
        maxHeight: isOpen ? 700 : 0,
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: C.sandLight }}>

          {/* Image */}
          <div style={{ overflow: "hidden", minHeight: 280 }}>
            <img
              src={sol.imageUrl}
              alt={sol.imageAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 280 }}
            />
          </div>

          {/* Content */}
          <div style={{
            padding: "32px 32px 28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            borderLeft: `1.5px solid ${C.sandBorder}`,
          }}>
            <div>
              <p style={{ fontSize: "12.5px", color: C.inkSoft, lineHeight: 1.85, marginBottom: 22 }}>
                {sol.desc}
              </p>

              {/* Capabilities spec-sheet rows */}
              {sol.capabilities.map((cap, i) => (
                <div key={cap.title} style={{
                  display: "flex", alignItems: "baseline", gap: 12, padding: "9px 0",
                  borderBottom: i < sol.capabilities.length - 1 ? `1px solid ${C.sandMid}` : "none",
                }}>
                  <span style={{
                    fontSize: "12px", fontWeight: 600,
                    color: C.ink, minWidth: 150, flexShrink: 0,
                  }}>
                    {cap.title}
                  </span>
                  <span style={{ fontSize: "9.5px", color: C.muted, letterSpacing: "0.03em" }}>
                    {cap.sub}
                  </span>
                </div>
              ))}
            </div>

            <div>
              {/* Tool pills */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 5,
                paddingTop: 16, borderTop: `1px solid ${C.sandMid}`, marginTop: 14,
              }}>
                {sol.tools.map(t => (
                  <span key={t} style={{
                    background: C.sandMid, borderRadius: 100,
                    padding: "4px 12px", fontSize: "10px", color: C.inkSoft, fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a href={sol.href} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: "11.5px", fontWeight: 600, color: C.terra,
                textDecoration: "none", marginTop: 16, letterSpacing: "0.02em",
              }}>
                Explore division <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function SolutionsSection() {
  const [open, setOpen] = useState("asic");

  const toggle = (id) => setOpen(prev => (prev === id ? null : id));

  return (
    <section id="solutions" style={{ background: C.sand }}>

      {/* Hero header */}
      <div style={{
        background: C.sand,
        padding: "52px 40px 44px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        gap: 24,
        borderBottom: `1.5px solid ${C.sandBorder}`,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.terra }} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: C.muted, textTransform: "uppercase" }}>
              Capabilities — what we do
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
            fontWeight: 900, lineHeight: 1.02,
            color: C.ink, letterSpacing: "-0.04em", margin: 0,
            maxWidth: "560px",
          }}>
            Engineering<br />at every<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: C.terra }}>layer.</em>
          </h2>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "3.5rem", fontWeight: 900, color: C.terra, lineHeight: 1 }}>3</div>
          <div style={{ fontSize: "9px", color: C.inkSoft, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>
            Divisions
          </div>
          <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.75, maxWidth: 220, marginLeft: "auto", marginTop: 14 }}>
            From silicon design to certified finished products — one engineering standard across all disciplines.
          </p>
        </div>
      </div>

      {/* Accordion rows */}
      <div>
        {SOLUTIONS.map(sol => (
          <AccItem
            key={sol.id}
            sol={sol}
            isOpen={open === sol.id}
            onToggle={() => toggle(sol.id)}
          />
        ))}
      </div>

      {/* Footer bar */}
      <div style={{
        background: C.ink,
        padding: "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "1rem", fontWeight: 700, color: C.sand, fontStyle: "italic" }}>
          Three divisions. One engineering standard.
        </span>
        <span style={{ fontSize: "9px", color: C.inkSoft, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Est. Silicon to System
        </span>
      </div>

    </section>
  );
}