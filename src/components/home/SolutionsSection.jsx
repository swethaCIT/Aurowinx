// SolutionsSection.jsx — UX-improved
// Changes vs original:
//  • Accordion height uses ResizeObserver on actual panel content → smooth animation
//    regardless of content length (was hardcoded max-height: 1200px → choppy on short content)
//  • Proper ARIA: aria-expanded, aria-controls, aria-labelledby on all accordion items
//  • First item label changed from plain "Explore division" to descriptive text (accessibility)
//  • prefers-reduced-motion: skip max-height transition, use visibility instead
//  • Added id attributes to accordion panels for aria-controls linkage
//  • Keyboard: Enter/Space already handled natively by <button>; no changes needed

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const SOLUTIONS = [
  {
    id: "asic",
    num: "01",
    label: "ASIC & SoC Design",
    tagline: "Spec2GDSII · Silicon Proven",
    desc: "End-to-end ASIC and SoC design from architecture and RTL through physical design and GDSII tape-out. Tool-agnostic across Cadence, Synopsys, and Siemens — delivering high-quality, low-power, high-performance silicon.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Semiconductor circuit",
    href: "/asic",
    capabilities: [
      { title: "RTL Design",          sub: "Verilog · SystemVerilog · Low Power" },
      { title: "Design Verification", sub: "UVM · Assertions · Coverage Closure" },
      { title: "DFT & ATPG",          sub: "Scan · MBIST · JTAG · Boundary Scan" },
      { title: "Physical Design",     sub: "Floorplan · CTS · Routing · ECO" },
      { title: "GDSII Sign-off",      sub: "STA · IR-Drop · DRC · LVS" },
    ],
    tools: ["Synopsys", "Cadence", "Siemens"],
  },
  {
    id: "embedded",
    num: "02",
    label: "Embedded & IoT",
    tagline: "Connected · Intelligent · Real-Time",
    desc: "Firmware development and IoT connectivity solutions bridging hardware and software — from bare-metal embedded systems to industrial automation across automotive, IoT, and consumer domains.",
    imageUrl: "https://images.unsplash.com/photo-1677092419414-e974582c492c?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Embedded circuit board",
    href: "/embedded",
    capabilities: [
      { title: "Embedded Firmware",     sub: "C/C++ · RTOS · Bare Metal" },
      { title: "Industrial Automation", sub: "PLC · SCADA" },
      { title: "IoT Connectivity",      sub: "BLE · WiFi · MQTT" },
      { title: "Device Drivers",        sub: "SPI · I2C · UART · CAN · USB" },
      { title: "Power Management",      sub: "Low Power · Battery Systems" },
    ],
    tools: [],
  },
  {
    id: "products",
    num: "03",
    label: "Electronics Products",
    tagline: "Power, Engineered Smart.",
    desc: "Smart power electronics products for sustainable mobility and energy efficiency — EV charging systems, BLDC motor controllers, and solar inverters engineered for real-world deployment.",
    imageUrl: "https://images.pexels.com/photos/33813265/pexels-photo-33813265.jpeg?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Power electronics PCB",
    href: "/products",
    capabilities: [
      { title: "EV Charging Systems",    sub: "AC/DC · OCPP · Smart Charging" },
      { title: "BLDC Motor Controllers", sub: "Sensorless · IoT Enabled" },
      { title: "Solar Inverters",        sub: "Grid-Tied · Off-Grid · MPPT" },
      { title: "Embedded Control",       sub: "Firmware · Monitoring · Diagnostics" },
      { title: "Power Electronics",      sub: "SMPS · DC-DC · Gate Drivers" },
    ],
    tools: [],
  },
];

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

const CSS = `
  .solutions-wrap { overflow-x: clip; width: 100%; }

  .solutions-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: end;
    padding: clamp(2rem, 5vw, 3.25rem) clamp(1rem, 4vw, 2.5rem) clamp(1.75rem, 4vw, 2.75rem);
    border-bottom: 1.5px solid ${C.sandBorder};
  }
  .solutions-header-meta { text-align: left; }

  .solutions-acc-trigger {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    display: grid;
    grid-template-columns: 3.5rem 1fr 2.75rem;
    align-items: stretch;
    padding: 0;
    text-align: left;
  }
  .solutions-acc-trigger:focus-visible {
    outline: 2px solid ${C.terra};
    outline-offset: -2px;
  }

  .solutions-acc-num {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.25s;
  }

  .solutions-acc-label { padding: 1rem 0.85rem; min-width: 0; }

  .solutions-acc-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.65rem;
  }

  /* FIX: accordion body now transitions on max-height driven by JS-measured content height
     instead of a hardcoded 1200px guess. Also uses visibility to keep content accessible. */
  .solutions-acc-body {
    overflow: hidden;
    transition: max-height 0.46s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: visible;
  }
  .solutions-acc-body[data-closed="true"] {
    visibility: hidden;
  }

  /* prefers-reduced-motion: instant toggle, no transition */
  @media (prefers-reduced-motion: reduce) {
    .solutions-acc-body { transition: none !important; }
  }

  .solutions-acc-panel {
    display: grid;
    grid-template-columns: 1fr;
    background: ${C.sandLight};
  }
  .solutions-acc-image { overflow: hidden; min-height: 200px; aspect-ratio: 16 / 11; }
  .solutions-acc-image img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .solutions-acc-content {
    padding: clamp(1.25rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1.5px solid ${C.sandBorder};
    min-width: 0;
  }
  .solutions-cap-row {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.2rem; padding: 0.55rem 0;
  }
  .solutions-footer {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem;
    padding: 1rem clamp(1rem, 4vw, 2.5rem);
  }

  @media (min-width: 480px) {
    .solutions-acc-trigger { grid-template-columns: 4.25rem 1fr 3rem; }
    .solutions-acc-label { padding: 1.25rem 1.25rem; }
    .solutions-cap-row { flex-direction: row; align-items: baseline; gap: 0.75rem; }
  }
  @media (min-width: 768px) {
    .solutions-header { grid-template-columns: 1fr auto; gap: 1.5rem; }
    .solutions-header-meta { text-align: right; }
    .solutions-acc-image { min-height: 280px; aspect-ratio: auto; }
    .solutions-acc-panel { grid-template-columns: 1fr 1fr; }
    .solutions-acc-content { border-top: none; border-left: 1.5px solid ${C.sandBorder}; }
    .solutions-footer { flex-direction: row; align-items: center; justify-content: space-between; }
  }
  @media (min-width: 1280px) {
    .solutions-header, .solutions-footer {
      padding-left: clamp(2rem, 5vw, 3rem);
      padding-right: clamp(2rem, 5vw, 3rem);
    }
  }
  @media (min-width: 1920px) {
    .solutions-inner { max-width: 90rem; margin: 0 auto; }
  }
`;

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke={C.terra} strokeWidth="1.8" strokeLinecap="round">
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="7,2 12,7 7,12" />
    </svg>
  );
}

function PlusIcon({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
      stroke={open ? "#fff" : C.muted} strokeWidth="1.8" strokeLinecap="round"
      style={{ transition: "transform 0.35s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
      aria-hidden="true">
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
    </svg>
  );
}

/* ── AccItem with ResizeObserver for smooth accordion height ── */
function AccItem({ sol, isOpen, onToggle }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);
  const triggerId = `acc-trigger-${sol.id}`;
  const panelId = `acc-panel-${sol.id}`;

  // FIX: measure real content height via ResizeObserver
  // Previously hardcoded max-height: 1200px caused sluggish animation on short content
  useEffect(() => {
    if (!panelRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ borderBottom: `1.5px solid ${C.sandBorder}` }}>
      <button
        type="button"
        id={triggerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="solutions-acc-trigger"
      >
        <div className="solutions-acc-num" style={{ background: isOpen ? C.terra : C.sandMid }}>
          <span style={{
            fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 900, lineHeight: 1,
            color: isOpen ? "#fff" : C.sandDeep, transition: "color 0.25s",
          }}>
            {sol.num}
          </span>
        </div>

        <div className="solutions-acc-label" style={{ background: C.sand }}>
          <div style={{ fontSize: "clamp(1rem, 3.5vw, 1.25rem)", fontWeight: 900, color: C.ink, lineHeight: 1.15, wordBreak: "break-word" }}>
            {sol.label}
          </div>
          <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", color: C.muted, marginTop: 4 }}>
            {sol.tagline}
          </div>
        </div>

        <div className="solutions-acc-toggle" style={{ background: C.sand }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: `1.5px solid ${isOpen ? C.terra : C.sandBorder}`,
            background: isOpen ? C.terra : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s, border-color 0.2s", flexShrink: 0,
          }}>
            <PlusIcon open={isOpen} />
          </div>
        </div>
      </button>

      {/* FIX: max-height driven by measured content, not a magic number */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="solutions-acc-body"
        data-closed={!isOpen ? "true" : undefined}
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <div ref={panelRef}>
          <div className="solutions-acc-panel">
            <div className="solutions-acc-image">
              <img src={sol.imageUrl} alt={sol.imageAlt} loading="lazy" />
            </div>

            <div className="solutions-acc-content">
              <div>
                <p style={{ fontSize: "clamp(12px, 2.8vw, 12.5px)", color: C.inkSoft, lineHeight: 1.85, marginBottom: 22 }}>
                  {sol.desc}
                </p>

                {sol.capabilities.map((cap, i) => (
                  <div key={cap.title} className="solutions-cap-row"
                    style={{ borderBottom: i < sol.capabilities.length - 1 ? `1px solid ${C.sandMid}` : "none" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: C.ink, minWidth: 0, flexShrink: 0 }}>
                      {cap.title}
                    </span>
                    <span style={{ fontSize: "9.5px", color: C.muted, letterSpacing: "0.03em", wordBreak: "break-word" }}>
                      {cap.sub}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, paddingTop: 16, borderTop: `1px solid ${C.sandMid}`, marginTop: 14 }}>
                  {sol.tools.map(t => (
                    <span key={t} style={{ background: C.sandMid, borderRadius: 100, padding: "4px 12px", fontSize: "10px", color: C.inkSoft, fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* FIX: descriptive link text (was generic "Explore division") */}
                <a href={sol.href} aria-label={`Explore the ${sol.label} division`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "11.5px", fontWeight: 600, color: C.terra, textDecoration: "none", marginTop: 16, letterSpacing: "0.02em" }}>
                  Explore {sol.label} <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile/Tablet Drag Carousel ── */
function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const total = SOLUTIONS.length;

  const goTo = (i) => {
    setIndex(i);
    animate(x, 0, { duration: 0 });
  };

  return (
    <div style={{ background: C.sand, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "clamp(1.5rem,5vw,2.5rem) clamp(1rem,4vw,2rem) 1.25rem", borderBottom: `1.5px solid ${C.sandBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.terra, flexShrink: 0 }} />
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>
            Capabilities — what we do
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(1.7rem, 7vw, 2.5rem)", fontWeight: 900, lineHeight: 1.05, color: C.ink, letterSpacing: "-0.04em", margin: 0 }}>
          Engineering at every{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: C.terra }}>layer.</em>
        </h2>
      </div>

      {/* Drag track */}
      <div style={{ overflow: "hidden", touchAction: "pan-y" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(total - 1) * 100 + "%", right: "0%" }}
          style={{ display: "flex", width: `${total * 100}%`, cursor: "grab" }}
          animate={{ x: `-${index * (100 / total)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && index < total - 1) setIndex(index + 1);
            else if (info.offset.x > 50 && index > 0) setIndex(index - 1);
          }}
        >
          {SOLUTIONS.map((sol, i) => (
            <div key={sol.id} style={{ width: `${100 / total}%`, flexShrink: 0 }}>
              {/* Image */}
              <div style={{ height: "clamp(180px, 45vw, 240px)", overflow: "hidden" }}>
                <img
                  src={sol.imageUrl}
                  alt={sol.imageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                  draggable={false}
                  loading="lazy"
                />
              </div>
              {/* Content */}
              <div style={{ padding: "1.25rem clamp(1rem,4vw,1.75rem) 1.5rem", background: C.sandLight }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: "clamp(1rem, 5vw, 1.35rem)", fontWeight: 900, color: C.ink }}>{sol.label}</span>
                  <span style={{ fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", marginLeft: 4 }}>{sol.tagline}</span>
                </div>
                <p style={{ fontSize: "clamp(12px,3.5vw,13px)", color: C.inkSoft, lineHeight: 1.8, marginBottom: 14 }}>{sol.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {sol.capabilities.slice(0, 4).map((cap, ci) => (
                    <div key={cap.title} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "6px 0",
                      borderBottom: ci < 3 ? `1px solid ${C.sandMid}` : "none" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.ink, flexShrink: 0 }}>{cap.title}</span>
                      <span style={{ fontSize: "9.5px", color: C.muted }}>{cap.sub}</span>
                    </div>
                  ))}
                </div>
                <a href={sol.href}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "11.5px", fontWeight: 600,
                    color: C.terra, textDecoration: "none", marginTop: 14, letterSpacing: "0.02em" }}>
                  Explore {sol.label} <ArrowRight />
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "14px 0", background: C.sandLight, borderTop: `1px solid ${C.sandBorder}` }}>
        {SOLUTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${SOLUTIONS[i].label}`}
            style={{ width: i === index ? 22 : 7, height: 7, borderRadius: 100, border: "none",
              background: i === index ? C.terra : C.sandBorder, cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease", padding: 0 }}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{ background: C.ink, padding: "0.9rem clamp(1rem,4vw,2rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: "clamp(0.85rem,3.5vw,1rem)", fontWeight: 700, color: C.sand, fontStyle: "italic" }}>
          Three divisions. One engineering standard.
        </span>
        <span style={{ fontSize: "9px", color: C.inkSoft, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Est. Silicon to System
        </span>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function SolutionsSection() {
  const [open, setOpen] = useState("asic");
  const toggle = (id) => setOpen(prev => prev === id ? null : id);

  return (
    <section id="solutions" className="solutions-wrap" style={{ background: C.sand }}>
      <style>{CSS}</style>

      {/* Mobile / tablet: drag carousel */}
      <div className="block lg:hidden">
        <MobileCarousel />
      </div>

      {/* Desktop: accordion */}
      <div className="hidden lg:block">
        <div className="solutions-inner">
          <div className="solutions-header" style={{ background: C.sand }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.terra, flexShrink: 0 }} />
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>
                  Capabilities — what we do
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.85rem, 5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.05, color: C.ink, letterSpacing: "-0.04em", margin: 0, maxWidth: "560px" }}>
                Engineering<br />at every<br />
                <em style={{ fontStyle: "italic", fontWeight: 300, color: C.terra }}>layer.</em>
              </h2>
            </div>

            <div className="solutions-header-meta">
              <div style={{ fontSize: "clamp(2.5rem, 8vw, 3.5rem)", fontWeight: 900, color: C.terra, lineHeight: 1 }}>3</div>
              <div style={{ fontSize: "9px", color: C.inkSoft, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>Divisions</div>
              <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.75, maxWidth: 220, marginTop: 14, marginBottom: 0 }}>
                From silicon design to certified finished products — one engineering standard across all disciplines.
              </p>
            </div>
          </div>

          <div>
            {SOLUTIONS.map(sol => (
              <AccItem key={sol.id} sol={sol} isOpen={open === sol.id} onToggle={() => toggle(sol.id)} />
            ))}
          </div>

          <div className="solutions-footer" style={{ background: C.ink }}>
            <span style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)", fontWeight: 700, color: C.sand, fontStyle: "italic", lineHeight: 1.4 }}>
              Three divisions. One engineering standard.
            </span>
            <span style={{ fontSize: "9px", color: C.inkSoft, letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Est. Silicon to System
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}