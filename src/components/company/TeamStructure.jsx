// TeamStructure.jsx — Physical Design Page
// AurowinX — The Team Behind Every Tapeout
//
// Mobile   : Leadership as stacked minimal cards
//            Team = segmented pill switcher → single animated team panel
//            Exp legend = horizontal scroll chips
//            Capability strip = 2-col stat grid (dark)
//
// Tablet   : Leadership side-by-side
//            Team = 2-col accordion cards (tap to reveal pyramid + tags)
//            Exp legend = scrollable chip row
//            Capability strip = 2×3 dark grid
//
// Desktop  : Full original grid layout, polished
// TV       : Wider max-width, larger type, more padding

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT, fadeUp, EASE } from "././theme";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const teams = [
  {
    id: "design",
    name: "Design Team",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    pyramid: [
      { role: "Project Lead", count: 1 },
      { role: "Module Lead",  count: 2 },
      { role: "Engineers",    count: 4 },
    ],
    tags: ["RTL Design", "SystemVerilog", "Verilog", "Lint & CDC"],
  },
  {
    id: "dv",
    name: "DV Team",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    pyramid: [
      { role: "Project Lead", count: 2 },
      { role: "Module Lead",  count: 2 },
      { role: "Engineers",    count: 5 },
    ],
    tags: ["SV-UVM", "CPU DV", "Assertions", "Coverage"],
  },
  {
    id: "dft",
    name: "DFT Team",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
    pyramid: [
      { role: "Project Lead", count: 1 },
      { role: "Module Lead",  count: 3 },
      { role: "Engineers",    count: 6 },
    ],
    tags: ["MBIST", "SCAN", "ATPG", "ATE Support"],
  },
  {
    id: "pr",
    name: "P&R Team",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    pyramid: [
      { role: "Sr. Manager",  count: 3 },
      { role: "Manager",      count: 3 },
      { role: "Project Lead", count: 3 },
      { role: "Module Lead",  count: 5 },
      { role: "Engineers",    count: 14 },
    ],
    tags: ["Floorplan", "CTS", "Routing", "STA", "IR Drop"],
  },
];

const leadership = [
  {
    title: "CEO", name: "Dr. R. Suresh Kumar", exp: "Visionary Leadership",
    color: "#4f46e5",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  },
  {
    title: "COO", name: "Dr. R. Menaka", exp: "Operations Excellence",
    color: "#0891b2",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  },
];

const expLevels = [
  { role: "Sr. Manager",  years: "15+ Years", color: "#4f46e5" },
  { role: "Manager",      years: "9+ Years",  color: "#0891b2" },
  { role: "Project Lead", years: "6+ Years",  color: "#2563eb" },
  { role: "Module Lead",  years: "4+ Years",  color: "#0284c7" },
  { role: "Engineer",     years: "< 4 Years", color: "#06b6d4" },
];

const capabilityItems = [
  { label: "Tech Nodes",      value: "Till 3nm" },
  { label: "Tool Coverage",   value: "Cadence · Synopsys · Siemens" },
  { label: "DV Methodology",  value: "SV-UVM · CPU DV" },
  { label: "DFT Coverage",    value: "All Techniques + ATE" },
  { label: "Low Power",       value: "UPF · Multi-Vt · Gating" },
];

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    let raf;
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setWidth(window.innerWidth)); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return {
    isMobile:  width < 640,
    isTablet:  width >= 640 && width < 1024,
    isCompact: width < 1024,
    isTV:      width >= 1600,
  };
}

/* ─────────────────────────────────────────────
   SHARED: PYRAMID BARS
───────────────────────────────────────────── */
function PyramidBar({ role, count, color, index, total }) {
  const widthPct = 40 + ((total - index - 1) / (total - 1)) * 58;
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, transformOrigin: "center" }}
    >
      <div style={{
        width: `${widthPct}%`,
        background: `linear-gradient(90deg, ${color}22, ${color}44)`,
        border: `1px solid ${color}44`,
        borderRadius: 6,
        padding: "5px 10px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>{role}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color, background: `${color}18`, borderRadius: 9999, padding: "1px 8px", minWidth: 22, textAlign: "center" }}>
          {count}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE — segmented switcher + animated panel
───────────────────────────────────────────── */
const panelVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

function MobileTeamSwitcher() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const team = teams[active];

  const go = (i) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      {/* Segmented pill rail */}
      <div style={{
        display: "flex", gap: 6,
        background: "#f1f5f9",
        borderRadius: 14, padding: 4,
        marginBottom: 18,
        overflowX: "auto", scrollbarWidth: "none",
      }}>
        <style>{`.ts-seg::-webkit-scrollbar{display:none}`}</style>
        {teams.map((t, i) => {
          const isA = i === active;
          return (
            <button
              key={t.id}
              onClick={() => go(i)}
              className="ts-seg"
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                borderRadius: 10,
                border: "none",
                background: isA ? "#fff" : "transparent",
                boxShadow: isA ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                color: isA ? t.color : C.textMuted,
                fontSize: 12, fontWeight: 700,
                fontFamily: FONT, cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: isA ? t.color : C.textMuted, display: "flex" }}>{t.icon}</span>
              {t.name.replace(" Team", "")}
            </button>
          );
        })}
      </div>

      {/* Animated team panel */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              background: "#fff",
              borderRadius: 18,
              border: `1.5px solid ${team.border}`,
              padding: "22px 18px",
              position: "relative", overflow: "hidden",
              boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${team.color}, transparent)`,
              borderRadius: "18px 18px 0 0", opacity: 0.7,
            }} />

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: team.bg, border: `1px solid ${team.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: team.color,
                }}>
                  {team.icon}
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em" }}>
                  {team.name}
                </span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: team.color,
                background: team.bg, border: `1px solid ${team.border}`,
                borderRadius: 9999, padding: "3px 10px",
              }}>
                {team.pyramid.reduce((a, b) => a + b.count, 0)}+
              </span>
            </div>

            {/* Pyramid */}
            <div style={{ marginBottom: 16 }}>
              {team.pyramid.map((row, ri) => (
                <PyramidBar key={ri} role={row.role} count={row.count} color={team.color} index={ri} total={team.pyramid.length} />
              ))}
            </div>

            <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {team.tags.map((tag, ti) => (
                <span key={ti} style={{
                  fontSize: 10, fontWeight: 600, color: C.textSecondary,
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                  borderRadius: 6, padding: "3px 9px",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Nav arrows */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
              <button
                onClick={() => go(Math.max(0, active - 1))}
                disabled={active === 0}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.borderLight}`,
                  background: active === 0 ? "transparent" : "#fff",
                  cursor: active === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: active === 0 ? 0.3 : 1,
                }}
              >
                <ChevronLeft style={{ width: 14, height: 14, color: C.textSecondary }} />
              </button>

              <div style={{ display: "flex", gap: 6 }}>
                {teams.map((_, i) => (
                  <button key={i} onClick={() => go(i)} style={{ border: "none", background: "transparent", padding: 3, cursor: "pointer" }}>
                    <motion.span
                      animate={{ width: i === active ? 20 : 6, background: i === active ? team.color : "#e2e8f0" }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ display: "block", height: 6, borderRadius: 3 }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => go(Math.min(teams.length - 1, active + 1))}
                disabled={active === teams.length - 1}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.borderLight}`,
                  background: active === teams.length - 1 ? "transparent" : "#fff",
                  cursor: active === teams.length - 1 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: active === teams.length - 1 ? 0.3 : 1,
                }}
              >
                <ChevronRight style={{ width: 14, height: 14, color: C.textSecondary }} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TABLET — 2-col accordion team cards
───────────────────────────────────────────── */
function TabletAccordionTeamCard({ team, i }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
      style={{
        background: "#fff", borderRadius: 18,
        border: `1.5px solid ${open ? team.color + "40" : team.border}`,
        overflow: "hidden",
        boxShadow: open ? `0 8px 28px ${team.color}12` : "0 2px 10px rgba(15,23,42,0.05)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${team.color}, transparent)`,
        opacity: open ? 0.8 : 0.3, transition: "opacity 0.25s",
        borderRadius: "18px 18px 0 0",
      }} />

      {/* Accordion toggle */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%", background: open ? team.bg : "#fff",
          border: "none", padding: "16px 18px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
          textAlign: "left", fontFamily: FONT, transition: "background 0.25s",
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: open ? "#fff" : team.bg,
          border: `1px solid ${team.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: team.color, flexShrink: 0, transition: "background 0.25s",
        }}>
          {team.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em" }}>
            {team.name}
          </div>
          <div style={{ fontSize: 11, color: team.color, fontWeight: 700, marginTop: 2 }}>
            {team.pyramid.reduce((a, b) => a + b.count, 0)}+ members
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          style={{ color: team.color, flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 17, height: 17 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px" }}>
              <div style={{ marginBottom: 14 }}>
                {team.pyramid.map((row, ri) => (
                  <PyramidBar key={ri} role={row.role} count={row.count} color={team.color} index={ri} total={team.pyramid.length} />
                ))}
              </div>
              <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {team.tags.map((tag, ti) => (
                  <span key={ti} style={{
                    fontSize: 10, fontWeight: 600, color: C.textSecondary,
                    background: "#f8fafc", border: "1px solid #e2e8f0",
                    borderRadius: 6, padding: "3px 9px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP/TV — original full card (polished)
───────────────────────────────────────────── */
function DesktopTeamCard({ team, i, isTV }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${team.color}14`, transition: { duration: 0.25 } }}
      style={{
        background: "white", borderRadius: 20,
        padding: isTV ? "32px 28px 28px" : "28px 24px 24px",
        border: `1px solid ${team.border}`,
        boxShadow: "0 2px 14px rgba(15,23,42,0.06)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${team.color}, transparent)`,
        borderRadius: "20px 20px 0 0", opacity: 0.7,
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: team.bg, border: `1px solid ${team.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", color: team.color,
          }}>
            {team.icon}
          </div>
          <span style={{ fontSize: isTV ? 16 : 15, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em" }}>
            {team.name}
          </span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, color: team.color,
          background: team.bg, border: `1px solid ${team.border}`,
          borderRadius: 9999, padding: "3px 10px",
        }}>
          {team.pyramid.reduce((a, b) => a + b.count, 0)}+
        </span>
      </div>
      <div style={{ marginBottom: 18 }}>
        {team.pyramid.map((row, ri) => (
          <PyramidBar key={ri} role={row.role} count={row.count} color={team.color} index={ri} total={team.pyramid.length} />
        ))}
      </div>
      <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {team.tags.map((tag, ti) => (
          <span key={ti} style={{
            fontSize: 10, fontWeight: 600, color: C.textSecondary,
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 6, padding: "3px 9px",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   LEADERSHIP CARD (shared, scales via props)
───────────────────────────────────────────── */
function LeaderCard({ leader, isMobile, isTV }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        background: "white", borderRadius: 18,
        padding: isMobile ? "18px 18px" : isTV ? "32px 40px" : "28px 36px",
        border: `1px solid ${leader.color}22`,
        boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
        display: "flex", alignItems: "center",
        gap: isMobile ? 14 : 20,
        flex: 1,
        cursor: "default", position: "relative", overflow: "hidden",
        minWidth: isMobile ? 0 : 260,
      }}
    >
      <div style={{
        position: "absolute", right: -20, bottom: -20,
        width: 100, height: 100, borderRadius: "50%",
        background: `radial-gradient(circle, ${leader.color}0a 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: "50%",
        background: `linear-gradient(135deg, ${leader.color}, #0891b2)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", flexShrink: 0,
        boxShadow: `0 6px 20px ${leader.color}30`,
      }}>
        {leader.icon}
      </div>
      <div>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: leader.color, marginBottom: 3,
        }}>
          {leader.title}
        </div>
        <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em", marginBottom: 2 }}>
          {leader.name}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{leader.exp}</div>
      </div>
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, ${leader.color}, transparent)`,
        borderRadius: "18px 0 0 18px", opacity: 0.6,
      }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   EXP LEGEND
───────────────────────────────────────────── */
function ExpLegend({ isMobile, isTablet, isTV }) {
  if (isMobile) {
    return (
      <div style={{ display: "flex", overflowX: "auto", gap: 8, scrollbarWidth: "none", paddingBottom: 4 }}>
        <style>{`.ts-exp::-webkit-scrollbar{display:none}`}</style>
        {expLevels.map((level, i) => (
          <div key={i} className="ts-exp" style={{
            flexShrink: 0,
            display: "flex", alignItems: "center", gap: 8,
            background: "#fff", border: "1px solid #e0e7ff",
            borderRadius: 10, padding: "8px 14px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: level.color, flexShrink: 0, boxShadow: `0 0 0 3px ${level.color}22` }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textPrimary, whiteSpace: "nowrap" }}>{level.role}</div>
              <div style={{ fontSize: 10, color: level.color, fontWeight: 700 }}>{level.years}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      {...fadeUp} transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
      style={{
        background: "white", borderRadius: 20,
        border: "1px solid #e0e7ff", padding: isTV ? "36px 44px" : "32px 36px",
        boxShadow: "0 2px 14px rgba(79,70,229,0.06)",
      }}
    >
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: C.primary,
        marginBottom: 24, textAlign: "center",
      }}>
        Experience Level Framework
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
        {expLevels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
            style={{
              textAlign: "center", padding: "12px 28px",
              borderRight: i < expLevels.length - 1 ? "1px solid #e0e7ff" : "none",
              flex: 1, minWidth: 120,
            }}
          >
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: level.color, margin: "0 auto 10px",
              boxShadow: `0 0 0 3px ${level.color}22`,
            }} />
            <div style={{ fontSize: isTV ? 14 : 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4, letterSpacing: "-0.01em" }}>
              {level.role}
            </div>
            <div style={{ fontSize: 11, color: level.color, fontWeight: 700, letterSpacing: "0.06em" }}>
              {level.years}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CAPABILITY STRIP
───────────────────────────────────────────── */
function CapabilityStrip({ isMobile, isTablet, isTV }) {
  if (isMobile) {
    return (
      <div style={{
        borderRadius: 18,
        background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 55%, #0891b2 100%)",
        padding: "22px 18px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 16,
        boxShadow: "0 10px 36px rgba(79,70,229,0.18)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none",
        }} />
        {capabilityItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, ease: EASE }}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "12px 12px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "white", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (isTablet) {
    return (
      <div style={{
        borderRadius: 18,
        background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 55%, #0891b2 100%)",
        padding: "24px 28px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        boxShadow: "0 10px 36px rgba(79,70,229,0.18)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none",
        }} />
        {capabilityItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, ease: EASE }}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "white", letterSpacing: "-0.01em" }}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Desktop / TV: original horizontal strip
  return (
    <motion.div
      {...fadeUp} transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
      style={{
        borderRadius: 18,
        background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 55%, #0891b2 100%)",
        padding: isTV ? "32px 48px" : "28px 40px",
        display: "flex", alignItems: "center",
        justifyContent: "space-around",
        gap: 16, flexWrap: "wrap",
        boxShadow: "0 10px 36px rgba(79,70,229,0.18)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none",
      }} />
      {capabilityItems.map((item, i) => (
        <div key={i} style={{ textAlign: "center", padding: "4px 8px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 5 }}>
            {item.label}
          </div>
          <div style={{ fontSize: isTV ? 14 : 13, fontWeight: 700, color: "white", letterSpacing: "-0.01em" }}>
            {item.value}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function TeamStructure() {
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const horizPad = isMobile ? "18px" : isTablet ? "28px" : "24px";
  const maxW = isTV ? 1500 : 1200;

  return (
    <section style={{
      background: "#f8fafc",
      fontFamily: FONT,
      position: "relative", overflow: "hidden",
      padding: isMobile ? "60px 0 68px" : isTablet ? "72px 0 80px" : isTV ? "130px 0 140px" : "100px 0 110px",
    }}>
      {/* BG glows */}
      <div style={{ position: "absolute", top: -100, right: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -60, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Floating dots — desktop only */}
      {!isCompact && [...Array(5)].map((_, i) => (
        <motion.div key={i} style={{
          position: "absolute",
          width: i % 2 === 0 ? 5 : 3, height: i % 2 === 0 ? 5 : 3, borderRadius: "50%",
          background: i % 2 === 0 ? "rgba(79,70,229,0.25)" : "rgba(8,145,178,0.25)",
          top: `${12 + i * 16}%`,
          left: i % 2 === 0 ? `${3 + i * 1.5}%` : undefined,
          right: i % 2 !== 0 ? `${3 + i * 1.2}%` : undefined,
          pointerEvents: "none",
        }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* Label */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.primary,
          }}>
            Our People
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isTV ? "clamp(2.4rem, 4vw, 3.6rem)" : "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700, color: C.textPrimary,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
          }}
        >
          The Team Behind{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Every Tapeout
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: isTV ? 17 : 15, color: C.textSecondary,
            maxWidth: 580, margin: isMobile ? "0 auto 32px" : "0 auto 56px", lineHeight: 1.75,
          }}
        >
          A structured, experienced team — from senior leadership to hands-on engineers — built to deliver at every stage of silicon development.
        </motion.p>

        {/* ── LEADERSHIP ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          gap: isMobile ? 12 : 20,
          marginBottom: isMobile ? 28 : 48,
          flexWrap: "wrap",
        }}>
          {leadership.map((leader, i) => (
            <LeaderCard key={i} leader={leader} isMobile={isMobile} isTV={isTV} />
          ))}
        </div>

        {/* ── TEAMS: mobile switcher / tablet accordion / desktop grid ── */}
        {isMobile && (
          <div style={{ marginBottom: 28 }}>
            <MobileTeamSwitcher />
          </div>
        )}

        {isTablet && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {teams.map((team, i) => (
              <TabletAccordionTeamCard key={team.id} team={team} i={i} />
            ))}
          </div>
        )}

        {!isCompact && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "repeat(4, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isTV ? 24 : 22,
            marginBottom: 48,
          }}>
            {teams.map((team, i) => (
              <DesktopTeamCard key={team.id} team={team} i={i} isTV={isTV} />
            ))}
          </div>
        )}

        {/* ── EXP LEGEND ── */}
        <div style={{ marginBottom: isMobile ? 20 : isTablet ? 24 : 24 }}>
          <ExpLegend isMobile={isMobile} isTablet={isTablet} isTV={isTV} />
        </div>

        {/* ── CAPABILITY STRIP ── */}
        <CapabilityStrip isMobile={isMobile} isTablet={isTablet} isTV={isTV} />

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}