// components/career/Domains.jsx
// FULLY RESPONSIVE — Mobile / Tablet / Laptop / TV
// Mobile: Tap-to-expand accordion + swipeable carousel
// Tablet: Horizontal scroll rail + detail drawer
// Laptop+: Original index rail + panel layout
// TV (≥1600px): Wide luxurious layout with larger type

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";``
import { Cpu, MemoryStick, ShieldCheck, Layers3, Timer, Wifi, ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";
import { C, EASE } from "././theme";

/* ─────────────────────────────────────────
   TYPOGRAPHY TOKENS
───────────────────────────────────────── */
const DISPLAY = "'Clash Display', 'Sora', 'DM Sans', system-ui, sans-serif";
const BODY    = "'Sora', 'DM Sans', system-ui, sans-serif";
const UI      = "'DM Sans', system-ui, sans-serif";

/* ─────────────────────────────────────────
   BREAKPOINTS (used via JS)
───────────────────────────────────────── */
const BP = { sm: 480, md: 768, lg: 1024, xl: 1280, tv: 1600 };

function useBreakpoint() {
  const [w, setW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    const handle = () => setW(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return {
    isMobile:  w < BP.md,
    isTablet:  w >= BP.md && w < BP.lg,
    isLaptop:  w >= BP.lg && w < BP.tv,
    isTV:      w >= BP.tv,
    isDesktop: w >= BP.lg,
    width: w,
  };
}

/* ─────────────────────────────────────────
   DOMAIN DATA
───────────────────────────────────────── */
const DOMAINS = [
  {
    num: "01", icon: Cpu, color: "#4f46e5", bg: "#eef2ff",
    title: "DFT Engineer", sub: "Scan & ATPG",
    shortDesc: "Design the test architecture that ensures silicon works first time out of the fab.",
    longDesc: "Own the full scan insertion flow — from DFT architecture planning and compression logic to ATPG pattern generation, fault coverage analysis, and GLS sign-off. You'll work with EDT compression, X-masking, and tapeout-ready pattern sets across nodes from 28nm to 5nm.",
    skills: [
      { label: "Scan Architecture", level: 95 },
      { label: "ATPG / EDT",        level: 90 },
      { label: "Fault Coverage",    level: 88 },
      { label: "GLS Validation",    level: 82 },
    ],
    tools: ["Tessent Shell", "TetraMAX", "Synopsys DFT Compiler", "Cadence Modus"],
    what: ["Implement full-chip scan compression", "Generate stuck-at & transition patterns", "Achieve 99%+ fault coverage targets", "Debug and sign off GLS flows"],
  },
  {
    num: "02", icon: MemoryStick, color: "#7c3aed", bg: "#f5f3ff",
    title: "DFT Engineer", sub: "MBIST & Memory Test",
    shortDesc: "Validate every embedded memory from SRAM to register files with silicon-proven BIST.",
    longDesc: "Design and integrate hierarchical MBIST controllers across 100+ memory instances. Configure March algorithm libraries, implement redundancy repair logic, and validate memory test flows from RTL through ATE. Automotive-grade experience with LBIST integration is a strong plus.",
    skills: [
      { label: "MBIST Architecture", level: 93 },
      { label: "Repair Logic",       level: 87 },
      { label: "March Algorithms",   level: 91 },
      { label: "LBIST Integration",  level: 78 },
    ],
    tools: ["Tessent MemoryBIST", "Synopsys MemoryBIST", "Cadence MBIST Architect", "MBIST Shell"],
    what: ["Integrate MBIST across 100+ memory instances", "Configure March algorithm suites", "Implement redundancy repair controllers", "Validate ATE memory patterns"],
  },
  {
    num: "03", icon: ShieldCheck, color: "#6366f1", bg: "#eef2ff",
    title: "IP Verification Engineer", sub: "UVM & Functional Coverage",
    shortDesc: "Build robust UVM environments that find the bugs physical tests can't.",
    longDesc: "Develop modular UVM testbenches for complex IPs — PCIe, DDR, AXI, AMBA. Write SVA assertions, implement functional and code coverage plans, and debug RTL issues down to the signal level. We value engineers who treat verification as a first-class engineering discipline, not an afterthought.",
    skills: [
      { label: "UVM Testbench",       level: 96 },
      { label: "SVA Assertions",      level: 88 },
      { label: "Functional Coverage", level: 90 },
      { label: "RTL Debug",           level: 85 },
    ],
    tools: ["Synopsys VCS", "Cadence Xcelium", "Questa Sim", "Verdi / DVE"],
    what: ["Build UVM envs for protocol IPs", "Write SVA assertion libraries", "Close functional & toggle coverage", "Root-cause RTL bugs from waveforms"],
  },
  {
    num: "04", icon: Layers3, color: "#4f46e5", bg: "#eef2ff",
    title: "SoC Verification Engineer", sub: "Integration & Connectivity",
    shortDesc: "Verify the big picture — interconnects, power domains, and multi-IP integration.",
    longDesc: "Own full-chip verification for SoC integration — AXI/AHB interconnect validation, low-power flow verification (UPF/CPF), boot and bring-up sequences, and multi-IP regression management. Experience with hardware-software co-verification and FPGA prototyping is valued.",
    skills: [
      { label: "SoC Integration",  level: 92 },
      { label: "Low Power / UPF",  level: 85 },
      { label: "AXI / Interconnect", level: 89 },
      { label: "HW-SW Co-Verify", level: 76 },
    ],
    tools: ["Cadence Xcelium", "Synopsys ZeBu", "Mentor Questa", "ARM Fast Models"],
    what: ["Verify interconnect & bus fabric", "Validate UPF power intent", "Run boot & OS bring-up sequences", "Manage regression & triage failures"],
  },
  {
    num: "05", icon: Timer, color: "#7c3aed", bg: "#f5f3ff",
    title: "Physical Design Engineer", sub: "STA & Timing Closure",
    shortDesc: "Close timing on the hardest corners so every flip-flop meets its deadline.",
    longDesc: "Perform MCMM static timing analysis, debug setup and hold violations across process corners, and drive timing closure from synthesis to GDSII. Work with SDC constraints, OCV/AOCV derating, and SI-aware timing to deliver tapeout-ready sign-off across 7nm to 28nm nodes.",
    skills: [
      { label: "MCMM STA",        level: 94 },
      { label: "SDC Constraints", level: 90 },
      { label: "SI / Crosstalk",  level: 83 },
      { label: "OCV / AOCV",      level: 87 },
    ],
    tools: ["Synopsys PrimeTime", "Cadence Tempus", "Ansys PathFinder", "Synopsys StarRC"],
    what: ["Set up MCMM corner analysis", "Debug setup / hold violations", "Apply AOCV / POCV derating", "Deliver full timing sign-off"],
  },
  {
    num: "06", icon: Wifi, color: "#6366f1", bg: "#eef2ff",
    title: "DDR / PCIe Verification Engineer", sub: "High-Speed Interface Protocols",
    shortDesc: "Verify the fastest, most complex interfaces on the chip with protocol-level precision.",
    longDesc: "Develop protocol-level UVM environments and VIP configurations for DDR4/5 and PCIe Gen4/5 controllers. Validate PHY integration, memory subsystem behavior, and high-speed link training. Strong grasp of JEDEC and PCIe specifications is essential. AMS co-simulation experience is a plus.",
    skills: [
      { label: "DDR4 / DDR5",      level: 91 },
      { label: "PCIe Gen4 / Gen5", level: 89 },
      { label: "Protocol VIP",     level: 93 },
      { label: "PHY Integration",  level: 80 },
    ],
    tools: ["Synopsys VC VIP", "Cadence VIP Catalog", "Mentor Questa VIP", "Aldec ALQV"],
    what: ["Configure DDR & PCIe protocol VIPs", "Validate link training & equalization", "Verify memory subsystem throughput", "Run compliance test suites"],
  },
];

/* ─────────────────────────────────────────
   SKILL BAR — shared
───────────────────────────────────────── */
function SkillBar({ label, level, color, delay, animate: doAnim }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontFamily: UI, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.05em", color: C.textSecondary }}>{label}</span>
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{level}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: C.bgSoft, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={doAnim ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", borderRadius: 2, background: color }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DETAIL CONTENT — shared across layouts
───────────────────────────────────────── */
function DomainDetail({ domain, compact = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 20 : 28 }}>
      {/* Long description */}
      <p style={{
        fontFamily: BODY,
        fontSize: compact ? 12.5 : 13.5,
        fontWeight: 300, color: C.textSecondary,
        lineHeight: 1.8, margin: 0,
      }}>
        {domain.longDesc}
      </p>

      {/* Skills + What grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
        gap: compact ? 20 : 28,
      }}>
        {/* Skill bars */}
        <div>
          <p style={{ fontFamily: UI, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 12px" }}>
            Skill Focus
          </p>
          {domain.skills.map((s, si) => (
            <SkillBar key={s.label} label={s.label} level={s.level} color={domain.color} delay={si * 0.08} animate={true} />
          ))}
        </div>

        {/* What you'll do */}
        <div>
          <p style={{ fontFamily: UI, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 12px" }}>
            What You'll Do
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {domain.what.map((w, wi) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: wi * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <span style={{ display: "block", width: 14, height: 1.5, marginTop: 8, background: domain.color, borderRadius: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 400, color: C.textSecondary, lineHeight: 1.65 }}>{w}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools + CTA */}
      <div style={{
        display: "flex", alignItems: compact ? "flex-start" : "center",
        flexDirection: compact ? "column" : "row",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: 14,
        paddingTop: 16,
        borderTop: `1px solid ${C.borderLight}`,
      }}>
        <div>
          <p style={{ fontFamily: UI, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 6px" }}>Tools</p>
          <div style={{ display: "flex", gap: "8px 20px", flexWrap: "wrap" }}>
            {domain.tools.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ti * 0.05 }}
                style={{
                  fontFamily: BODY, fontSize: 11.5, fontWeight: 500,
                  color: C.textSecondary,
                  borderBottom: `1px solid ${domain.color}44`,
                  paddingBottom: 1,
                }}
              >{t}</motion.span>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${domain.color}33` }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "10px 20px", borderRadius: 10,
            background: domain.color, color: "#fff", border: "none",
            fontFamily: UI, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.06em", cursor: "pointer",
            boxShadow: `0 4px 16px ${domain.color}33`,
            alignSelf: compact ? "flex-start" : "auto",
          }}
        >
          Apply for This Role
          <ArrowUpRight size={13} />
        </motion.button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MOBILE LAYOUT — Swipe Carousel + Accordion
───────────────────────────────────────── */
function MobileLayout({ domains, inView }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dragX = useMotionValue(0);
  const constraintsRef = useRef(null);

  const goTo = useCallback((idx) => {
    setActive(idx);
    setExpanded(false);
  }, []);

  const handleDragEnd = useCallback((_e, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold && active < domains.length - 1) goTo(active + 1);
    else if (info.offset.x > threshold && active > 0) goTo(active - 1);
  }, [active, domains.length, goTo]);

  const domain = domains[active];
  const Icon = domain.icon;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Swipeable card carousel ── */}
      <div ref={constraintsRef} style={{ overflow: "hidden", borderRadius: 16 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: C.bgWhite,
              border: `1px solid ${C.borderLight}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: C.shadowLg,
              borderLeft: `4px solid ${domain.color}`,
              cursor: "grab",
              userSelect: "none",
            }}
          >
            {/* Card header */}
            <div
              onClick={() => setExpanded((e) => !e)}
              style={{
                padding: "20px 20px 16px",
                display: "flex", alignItems: "flex-start", gap: 14,
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: domain.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={20} style={{ color: domain.color }} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontFamily: UI, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: domain.color }}>
                    Domain {domain.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, letterSpacing: "-0.03em", color: C.textPrimary, margin: "0 0 2px", lineHeight: 1.2 }}>
                  {domain.title}
                </h3>
                <p style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 500, color: domain.color, margin: 0 }}>{domain.sub}</p>
                <p style={{ fontFamily: BODY, fontSize: 12, fontWeight: 300, color: C.textSecondary, lineHeight: 1.7, margin: "8px 0 0" }}>
                  {domain.shortDesc}
                </p>
              </div>

              {/* Expand chevron */}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ flexShrink: 0, marginTop: 4 }}
              >
                <ChevronDown size={18} style={{ color: C.textMuted }} />
              </motion.div>
            </div>

            {/* Expandable detail — smooth accordion */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{ paddingTop: 16 }}>
                      <DomainDetail domain={domain} compact={true} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Swipe hint (shows once) ── */}
      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          fontFamily: UI, fontSize: 10, color: C.textMuted,
          textAlign: "center", margin: "-8px 0 0", letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        ← swipe to explore →
      </motion.p>

      {/* ── Dot navigation ── */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 4 }}>
        {domains.map((d, i) => (
          <button
            key={d.num}
            onClick={() => goTo(i)}
            style={{
              width: active === i ? 22 : 6, height: 6, borderRadius: 50, border: "none",
              background: active === i ? d.color : C.borderLight,
              cursor: "pointer", padding: 0,
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        ))}
      </div>

      {/* ── Thumbnail strip — horizontal scroll with snap ── */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4,
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        {domains.map((d, i) => {
          const DIcon = d.icon;
          const isOn = active === i;
          return (
            <motion.button
              key={d.num}
              onClick={() => goTo(i)}
              whileTap={{ scale: 0.95 }}
              style={{
                flexShrink: 0, scrollSnapAlign: "start",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "10px 12px", borderRadius: 12,
                background: isOn ? d.bg : C.bgLight,
                border: `1px solid ${isOn ? d.color + "44" : C.borderLight}`,
                cursor: "pointer",
                transition: "all 0.22s",
                minWidth: 70,
              }}
            >
              <DIcon size={16} style={{ color: isOn ? d.color : C.textMuted, transition: "color 0.22s" }} />
              <span style={{
                fontFamily: UI, fontSize: 9, fontWeight: 600, letterSpacing: "0.05em",
                color: isOn ? d.color : C.textMuted,
                whiteSpace: "nowrap", textAlign: "center",
                transition: "color 0.22s",
              }}>
                {d.num}
              </span>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────
   TABLET LAYOUT — Horizontal chip rail + bottom drawer
───────────────────────────────────────── */
function TabletLayout({ domains, inView }) {
  const [active, setActive] = useState(0);
  const domain = domains[active];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: `1px solid ${C.borderLight}`, borderRadius: 20, overflow: "hidden", boxShadow: C.shadowLg }}>

      {/* ── Horizontal selector rail ── */}
      <div style={{
        display: "flex", overflowX: "auto", scrollSnapType: "x mandatory",
        scrollbarWidth: "none", msOverflowStyle: "none",
        background: C.bgLight,
        borderBottom: `1px solid ${C.borderLight}`,
      }}>
        {domains.map((d, i) => {
          const Icon = d.icon;
          const isOn = active === i;
          return (
            <motion.button
              key={d.num}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flexShrink: 0, scrollSnapAlign: "start",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                padding: "16px 20px",
                background: isOn ? C.bgWhite : "transparent",
                border: "none",
                borderBottom: isOn ? `2px solid ${d.color}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.22s",
                position: "relative", zIndex: 1,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: isOn ? d.bg : C.bgSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.22s",
              }}>
                <Icon size={18} style={{ color: isOn ? d.color : C.textMuted, transition: "color 0.22s" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{
                  fontFamily: DISPLAY, fontSize: 11, fontWeight: 600,
                  color: isOn ? d.color : C.textPrimary,
                  margin: "0 0 2px", whiteSpace: "nowrap",
                  transition: "color 0.22s",
                }}>
                  {d.title}
                </p>
                <p style={{
                  fontFamily: UI, fontSize: 9.5, fontWeight: 500,
                  color: isOn ? d.color + "aa" : C.textMuted,
                  margin: 0, whiteSpace: "nowrap",
                  transition: "color 0.22s",
                }}>
                  {d.sub}
                </p>
              </div>
              {isOn && (
                <motion.div layoutId="tabletActiveLine" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: d.color, borderRadius: "2px 2px 0 0" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Detail panel — animated swap ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: C.bgWhite, position: "relative", overflow: "hidden" }}
        >
          {/* Ghost number */}
          <div style={{
            position: "absolute", right: -10, top: -12,
            fontFamily: DISPLAY, fontSize: "7rem", fontWeight: 700,
            color: domain.bg, lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0,
          }}>
            {domain.num}
          </div>

          <div style={{ position: "relative", zIndex: 1, padding: "28px 28px 28px" }}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: domain.color, display: "inline-block" }} />
                <span style={{ fontFamily: UI, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: domain.color }}>Domain {domain.num}</span>
              </div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.04em", color: C.textPrimary, margin: "0 0 3px" }}>
                {domain.title}
              </h3>
              <p style={{ fontFamily: DISPLAY, fontSize: "clamp(0.85rem, 1.5vw, 1rem)", fontWeight: 500, color: domain.color, margin: "0 0 10px" }}>{domain.sub}</p>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ height: 2, width: 40, borderRadius: 2, background: `linear-gradient(90deg, ${domain.color}, ${domain.color}44)`, transformOrigin: "left" }}
              />
            </div>

            <DomainDetail domain={domain} compact={false} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   DESKTOP / LAPTOP LAYOUT — Original index rail
───────────────────────────────────────── */
function DesktopLayout({ domains, inView, isTV }) {
  const [active, setActive] = useState(0);
  const domain = domains[active];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isTV ? "320px 1fr" : "280px 1fr",
      border: `1px solid ${C.borderLight}`,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: C.shadowLg,
      minHeight: isTV ? 660 : 560,
    }}>

      {/* ── Index rail ── */}
      <div style={{ background: C.bgLight, borderRight: `1px solid ${C.borderLight}`, display: "flex", flexDirection: "column" }}>
        {domains.map((d, i) => {
          const Icon = d.icon;
          const isOn = active === i;
          return (
            <motion.button
              key={d.num}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: isOn ? undefined : "rgba(0,0,0,0.02)" }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: isTV ? "22px 26px" : "18px 22px",
                background: isOn ? C.bgWhite : "transparent",
                border: "none", borderBottom: `1px solid ${C.borderLight}`,
                borderLeft: isOn ? `3px solid ${d.color}` : "3px solid transparent",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.22s", position: "relative",
              }}
            >
              <div style={{
                width: isTV ? 42 : 36, height: isTV ? 42 : 36,
                borderRadius: 10, flexShrink: 0,
                background: isOn ? d.bg : C.bgSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.22s",
              }}>
                <Icon size={isTV ? 19 : 16} style={{ color: isOn ? d.color : C.textMuted, transition: "color 0.22s" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontFamily: DISPLAY, fontSize: isTV ? 13.5 : 12.5, fontWeight: 600,
                  letterSpacing: "-0.02em", color: isOn ? d.color : C.textPrimary,
                  margin: "0 0 2px", lineHeight: 1.2,
                  transition: "color 0.22s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {d.title}
                </p>
                <p style={{
                  fontFamily: UI, fontSize: isTV ? 11 : 10, fontWeight: 500,
                  color: isOn ? d.color + "aa" : C.textMuted,
                  margin: 0, letterSpacing: "0.04em",
                  transition: "color 0.22s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {d.sub}
                </p>
              </div>
              {isOn && (
                <motion.div
                  layoutId="desktopActiveDot"
                  style={{ position: "absolute", right: 16, width: 6, height: 6, borderRadius: "50%", background: d.color }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: C.bgWhite, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}
        >
          {/* Ghost number */}
          <div style={{
            position: "absolute", right: -16, top: -20,
            fontFamily: DISPLAY, fontSize: isTV ? "13rem" : "clamp(6rem,12vw,10rem)",
            fontWeight: 700, letterSpacing: "-0.06em",
            color: domain.bg, lineHeight: 1,
            userSelect: "none", pointerEvents: "none", zIndex: 0,
          }}>
            {domain.num}
          </div>

          <div style={{
            position: "relative", zIndex: 1,
            padding: isTV ? "44px 52px" : "36px 40px",
            flex: 1, display: "flex", flexDirection: "column", gap: isTV ? 36 : 28,
          }}>
            {/* Top strip */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: domain.color, display: "inline-block" }} />
                <span style={{ fontFamily: UI, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: domain.color }}>Domain {domain.num}</span>
              </div>
              <h3 style={{
                fontFamily: DISPLAY, fontSize: isTV ? "2.8rem" : "clamp(1.6rem,3vw,2.2rem)",
                fontWeight: 700, letterSpacing: "-0.04em", color: C.textPrimary, margin: "0 0 4px", lineHeight: 1.1,
              }}>
                {domain.title}
              </h3>
              <p style={{
                fontFamily: DISPLAY, fontSize: isTV ? "1.4rem" : "clamp(1rem,2vw,1.2rem)",
                fontWeight: 500, letterSpacing: "-0.02em", color: domain.color, margin: "0 0 14px",
              }}>
                {domain.sub}
              </p>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, width: 48, borderRadius: 2, background: `linear-gradient(90deg, ${domain.color}, ${domain.color}44)`, transformOrigin: "left", marginBottom: 16 }}
              />
              <p style={{ fontFamily: BODY, fontSize: isTV ? 15 : 13.5, fontWeight: 300, color: C.textSecondary, lineHeight: 1.8, margin: 0, maxWidth: 520 }}>
                {domain.longDesc}
              </p>
            </div>

            {/* Skills + What */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isTV ? 40 : 32 }}>
              <div>
                <p style={{ fontFamily: UI, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 16px" }}>Skill Focus</p>
                {domain.skills.map((s, si) => (
                  <SkillBar key={s.label} label={s.label} level={s.level} color={domain.color} delay={si * 0.08} animate={true} />
                ))}
              </div>
              <div>
                <p style={{ fontFamily: UI, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 16px" }}>What You'll Do</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {domain.what.map((w, wi) => (
                    <motion.div key={w} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: wi * 0.07, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ display: "block", width: 18, height: 1.5, marginTop: 8, background: domain.color, borderRadius: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: BODY, fontSize: isTV ? 13.5 : 12.5, fontWeight: 400, color: C.textSecondary, lineHeight: 1.65 }}>{w}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools + CTA */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingTop: 20, borderTop: `1px solid ${C.borderLight}` }}>
              <div>
                <p style={{ fontFamily: UI, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 8px" }}>Tools</p>
                <div style={{ display: "flex", gap: "10px 24px", flexWrap: "wrap" }}>
                  {domain.tools.map((t, ti) => (
                    <motion.span key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: ti * 0.06 }} style={{ fontFamily: BODY, fontSize: isTV ? 13 : 12, fontWeight: 500, color: C.textSecondary, borderBottom: `1px solid ${domain.color}44`, paddingBottom: 1 }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${domain.color}33` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: isTV ? "13px 26px" : "11px 22px",
                  borderRadius: 10, background: domain.color, color: "#fff", border: "none",
                  fontFamily: UI, fontSize: isTV ? 13 : 11.5, fontWeight: 700,
                  letterSpacing: "0.06em", cursor: "pointer",
                  boxShadow: `0 4px 16px ${domain.color}33`,
                }}
              >
                Apply for This Role
                <ArrowUpRight size={isTV ? 16 : 14} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Domains() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isMobile, isTablet, isDesktop, isTV } = useBreakpoint();

  const padding = isMobile ? "48px 16px 56px" : isTablet ? "56px 24px 64px" : isTV ? "96px 80px 100px" : "72px 44px 80px";
  const headingSize = isMobile ? "1.8rem" : isTablet ? "2.2rem" : isTV ? "4rem" : "clamp(2rem,5vw,3.4rem)";

  return (
    <section
      ref={ref}
      style={{ background: C.bgWhite, position: "relative", overflow: "hidden", fontFamily: BODY }}
    >
      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: [
          `linear-gradient(${C.borderLight} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${C.borderLight} 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: isMobile ? "28px 28px" : "40px 40px",
        opacity: 0.45,
      }} />

      {/* Orbs */}
      <div style={{ position: "absolute", width: isMobile ? 300 : 600, height: isMobile ? 200 : 400, top: "-80px", right: "-100px", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", width: isMobile ? 200 : 400, height: isMobile ? 150 : 300, bottom: 0, left: "-80px", background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1, padding }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: isMobile ? 32 : 52 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 26, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ fontFamily: UI, fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary }}>Engineering Domains</span>
          </div>
          <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: headingSize, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.04, color: C.textPrimary, margin: 0 }}>
              What We{" "}
              <span style={{ background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hire For</span>
            </h2>
            <p style={{ fontFamily: BODY, fontSize: isMobile ? 13 : 14, fontWeight: 400, color: C.textSecondary, lineHeight: 1.75, margin: 0, maxWidth: 380 }}>
              Six distinct engineering disciplines across silicon design, verification, and test. Select any to explore the full scope.
            </p>
          </div>
        </motion.div>

        {/* ── Responsive layout switch ── */}
        {isMobile  && <MobileLayout  domains={DOMAINS} inView={inView} />}
        {isTablet  && <TabletLayout  domains={DOMAINS} inView={inView} />}
        {isDesktop && <DesktopLayout domains={DOMAINS} inView={inView} isTV={isTV} />}

        {/* ── Bottom counter — desktop only ── */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 20 }}
          >
            <span style={{ fontFamily: UI, fontSize: 11, fontWeight: 500, color: C.textMuted, letterSpacing: "0.06em" }}>
              {DOMAINS.length} engineering domains
            </span>
          </motion.div>
        )}

      </div>
    </section>
  );
}