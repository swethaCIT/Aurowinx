import { motion } from "framer-motion";
import { C, FONT, fadeUp, fadeLeft, fadeRight, EASE } from "././theme";

const teams = [
  {
    id: "design",
    name: "Design Team",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    pyramid: [
      { role: "Project Lead", count: 1 },
      { role: "Module Lead", count: 2 },
      { role: "Engineers", count: 4 },
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
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    pyramid: [
      { role: "Project Lead", count: 2 },
      { role: "Module Lead", count: 2 },
      { role: "Engineers", count: 5 },
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
      { role: "Module Lead", count: 3 },
      { role: "Engineers", count: 6 },
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
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    pyramid: [
      { role: "Sr. Manager", count: 3 },
      { role: "Manager", count: 3 },
      { role: "Project Lead", count: 3 },
      { role: "Module Lead", count: 5 },
      { role: "Engineers", count: 14 },
    ],
    tags: ["Floorplan", "CTS", "Routing", "STA", "IR Drop"],
  },
];

const leadership = [
  {
    title: "CEO",
    name: "Dr. R. Suresh Kumar",
    exp: "Visionary Leadership",
    color: "#4f46e5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "COO",
    name: "Dr. R. Menaka",
    exp: "Operations Excellence",
    color: "#0891b2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const expLevels = [
  { role: "Sr. Manager", years: "15+ Years", color: "#4f46e5" },
  { role: "Manager", years: "9+ Years", color: "#0891b2" },
  { role: "Project Lead", years: "6+ Years", color: "#2563eb" },
  { role: "Module Lead", years: "4+ Years", color: "#0284c7" },
  { role: "Engineer", years: "< 4 Years", color: "#06b6d4" },
];

function PyramidBar({ role, count, color, index, total }) {
  const widthPct = 40 + ((total - index - 1) / (total - 1)) * 58;
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: EASE }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          width: `${widthPct}%`,
          background: `linear-gradient(90deg, ${color}22, ${color}44)`,
          border: `1px solid ${color}44`,
          borderRadius: 6,
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>{role}</span>
        <span style={{
          fontSize: 11, fontWeight: 800, color,
          background: `${color}18`,
          borderRadius: 9999, padding: "1px 8px", minWidth: 22, textAlign: "center",
        }}>{count}</span>
      </div>
    </motion.div>
  );
}

export default function TeamStructure() {
  return (
    <section
      style={{
        background: "#f8fafc",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 110px",
      }}
    >
      {/* ── BG GLOWS ── */}
      <div style={{
        position: "absolute", top: -100, right: -80, width: 460, height: 460,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -60, width: 380, height: 380,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── FLOATING DOTS ── */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? 5 : 3,
            height: i % 2 === 0 ? 5 : 3,
            borderRadius: "50%",
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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* ── LABEL ── */}
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

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center", fontSize: "clamp(2rem, 4vw, 3rem)",
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

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp} transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: 16, color: C.textSecondary,
            maxWidth: 580, margin: "0 auto 64px", lineHeight: 1.75,
          }}
        >
          A structured, experienced team — from senior leadership to hands-on
          engineers — built to deliver at every stage of silicon development.
        </motion.p>

        {/* ── LEADERSHIP CARDS ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            display: "flex", justifyContent: "center",
            gap: 20, marginBottom: 56, flexWrap: "wrap",
          }}
        >
          {leadership.map((leader, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: "white", borderRadius: 18, padding: "28px 36px",
                border: `1px solid ${leader.color}22`,
                boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
                display: "flex", alignItems: "center", gap: 20,
                minWidth: 260, cursor: "default", position: "relative", overflow: "hidden",
              }}
            >
              {/* bg watermark */}
              <div style={{
                position: "absolute", right: -20, bottom: -20,
                width: 100, height: 100, borderRadius: "50%",
                background: `radial-gradient(circle, ${leader.color}0a 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* avatar */}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
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
                  textTransform: "uppercase", color: leader.color, marginBottom: 4,
                }}>
                  {leader.title}
                </div>
                <div style={{
                  fontSize: 16, fontWeight: 700, color: C.textPrimary,
                  letterSpacing: "-0.02em", marginBottom: 3,
                }}>
                  {leader.name}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>
                  {leader.exp}
                </div>
              </div>

              {/* left accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                background: `linear-gradient(180deg, ${leader.color}, transparent)`,
                borderRadius: "18px 0 0 18px", opacity: 0.6,
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── TEAM PYRAMID CARDS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 22,
          marginBottom: 56,
        }}>
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: "white", borderRadius: 20,
                padding: "28px 24px 24px",
                border: `1px solid ${team.border}`,
                boxShadow: "0 2px 14px rgba(15,23,42,0.06)",
                position: "relative", overflow: "hidden", cursor: "default",
              }}
            >
              {/* top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${team.color}, transparent)`,
                borderRadius: "20px 20px 0 0", opacity: 0.7,
              }} />

              {/* header */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 22,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: team.bg, border: `1px solid ${team.border}`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", color: team.color,
                  }}>
                    {team.icon}
                  </div>
                  <span style={{
                    fontSize: 15, fontWeight: 700, color: C.textPrimary,
                    letterSpacing: "-0.02em",
                  }}>
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

              {/* pyramid bars */}
              <div style={{ marginBottom: 18 }}>
                {team.pyramid.map((row, ri) => (
                  <PyramidBar
                    key={ri}
                    role={row.role}
                    count={row.count}
                    color={team.color}
                    index={ri}
                    total={team.pyramid.length}
                  />
                ))}
              </div>

              {/* divider */}
              <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />

              {/* tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {team.tags.map((tag, ti) => (
                  <span key={ti} style={{
                    fontSize: 10, fontWeight: 600,
                    color: C.textSecondary, background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6, padding: "3px 9px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── EXPERIENCE LEVEL LEGEND ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          style={{
            background: "white", borderRadius: 20,
            border: "1px solid #e0e7ff", padding: "32px 36px",
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

          <div style={{
            display: "flex", justifyContent: "center",
            gap: 0, flexWrap: "wrap",
          }}>
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
                  background: level.color,
                  margin: "0 auto 10px",
                  boxShadow: `0 0 0 3px ${level.color}22`,
                }} />
                <div style={{
                  fontSize: 13, fontWeight: 700, color: C.textPrimary,
                  marginBottom: 4, letterSpacing: "-0.01em",
                }}>
                  {level.role}
                </div>
                <div style={{
                  fontSize: 11, color: level.color,
                  fontWeight: 700, letterSpacing: "0.06em",
                }}>
                  {level.years}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CAPABILITY STRIP ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
          style={{
            marginTop: 28,
            borderRadius: 18,
            background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 55%, #0891b2 100%)",
            padding: "28px 40px",
            display: "flex", alignItems: "center",
            justifyContent: "space-around",
            gap: 16, flexWrap: "wrap",
            boxShadow: "0 10px 36px rgba(79,70,229,0.18)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          {[
            { label: "Tech Nodes", value: "Till 3nm" },
            { label: "Tool Coverage", value: "Cadence · Synopsys · Siemens" },
            { label: "DV Methodology", value: "SV-UVM · CPU DV" },
            { label: "DFT Coverage", value: "All Techniques + ATE" },
            { label: "Low Power", value: "UPF · Multi-Vt · Gating" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "4px 8px" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
                marginBottom: 5,
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "white",
                letterSpacing: "-0.01em",
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}