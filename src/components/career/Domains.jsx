// components/career/Domains.jsx
// REDESIGN — Editorial "Domain Selector" layout
// No cards, no pill tags, no standard grid.
// Design: Vertical index rail (left) + animated full-width reveal panel (right)
// Each domain selected shows an asymmetric split detail view with
// a large typographic number, skill matrix, and animated underline entry.
// Typography: Clash Display / Sora / DM Sans
// Tokens: exact C.* from theme.js

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Cpu, MemoryStick, ShieldCheck, Layers3, Timer, Wifi, ArrowUpRight } from "lucide-react";
import { C, EASE } from "././theme";

/* ─────────────────────────────────────────
   TYPOGRAPHY TOKENS
───────────────────────────────────────── */
const DISPLAY = "'Clash Display', 'Sora', 'DM Sans', system-ui, sans-serif";
const BODY    = "'Sora', 'DM Sans', system-ui, sans-serif";
const UI      = "'DM Sans', system-ui, sans-serif";

/* ─────────────────────────────────────────
   DOMAIN DATA
───────────────────────────────────────── */
const DOMAINS = [
  {
    num: "01",
    icon: Cpu,
    color: "#4f46e5",
    bg: "#eef2ff",
    title: "DFT Engineer",
    sub: "Scan & ATPG",
    shortDesc: "Design the test architecture that ensures silicon works first time out of the fab.",
    longDesc:
      "Own the full scan insertion flow — from DFT architecture planning and compression logic to ATPG pattern generation, fault coverage analysis, and GLS sign-off. You'll work with EDT compression, X-masking, and tapeout-ready pattern sets across nodes from 28nm to 5nm.",
    skills: [
      { label: "Scan Architecture",  level: 95 },
      { label: "ATPG / EDT",         level: 90 },
      { label: "Fault Coverage",     level: 88 },
      { label: "GLS Validation",     level: 82 },
    ],
    tools: ["Tessent Shell", "TetraMAX", "Synopsys DFT Compiler", "Cadence Modus"],
    what: ["Implement full-chip scan compression", "Generate stuck-at & transition patterns", "Achieve 99%+ fault coverage targets", "Debug and sign off GLS flows"],
  },
  {
    num: "02",
    icon: MemoryStick,
    color: "#7c3aed",
    bg: "#f5f3ff",
    title: "DFT Engineer",
    sub: "MBIST & Memory Test",
    shortDesc: "Validate every embedded memory from SRAM to register files with silicon-proven BIST.",
    longDesc:
      "Design and integrate hierarchical MBIST controllers across 100+ memory instances. Configure March algorithm libraries, implement redundancy repair logic, and validate memory test flows from RTL through ATE. Automotive-grade experience with LBIST integration is a strong plus.",
    skills: [
      { label: "MBIST Architecture",  level: 93 },
      { label: "Repair Logic",        level: 87 },
      { label: "March Algorithms",    level: 91 },
      { label: "LBIST Integration",   level: 78 },
    ],
    tools: ["Tessent MemoryBIST", "Synopsys MemoryBIST", "Cadence MBIST Architect", "MBIST Shell"],
    what: ["Integrate MBIST across 100+ memory instances", "Configure March algorithm suites", "Implement redundancy repair controllers", "Validate ATE memory patterns"],
  },
  {
    num: "03",
    icon: ShieldCheck,
    color: "#6366f1",
    bg: "#eef2ff",
    title: "IP Verification Engineer",
    sub: "UVM & Functional Coverage",
    shortDesc: "Build robust UVM environments that find the bugs physical tests can't.",
    longDesc:
      "Develop modular UVM testbenches for complex IPs — PCIe, DDR, AXI, AMBA. Write SVA assertions, implement functional and code coverage plans, and debug RTL issues down to the signal level. We value engineers who treat verification as a first-class engineering discipline, not an afterthought.",
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
    num: "04",
    icon: Layers3,
    color: "#4f46e5",
    bg: "#eef2ff",
    title: "SoC Verification Engineer",
    sub: "Integration & Connectivity",
    shortDesc: "Verify the big picture — interconnects, power domains, and multi-IP integration.",
    longDesc:
      "Own full-chip verification for SoC integration — AXI/AHB interconnect validation, low-power flow verification (UPF/CPF), boot and bring-up sequences, and multi-IP regression management. Experience with hardware-software co-verification and FPGA prototyping is valued.",
    skills: [
      { label: "SoC Integration",     level: 92 },
      { label: "Low Power / UPF",     level: 85 },
      { label: "AXI / Interconnect",  level: 89 },
      { label: "HW-SW Co-Verify",     level: 76 },
    ],
    tools: ["Cadence Xcelium", "Synopsys ZeBu", "Mentor Questa", "ARM Fast Models"],
    what: ["Verify interconnect & bus fabric", "Validate UPF power intent", "Run boot & OS bring-up sequences", "Manage regression & triage failures"],
  },
  {
    num: "05",
    icon: Timer,
    color: "#7c3aed",
    bg: "#f5f3ff",
    title: "Physical Design Engineer",
    sub: "STA & Timing Closure",
    shortDesc: "Close timing on the hardest corners so every flip-flop meets its deadline.",
    longDesc:
      "Perform MCMM static timing analysis, debug setup and hold violations across process corners, and drive timing closure from synthesis to GDSII. Work with SDC constraints, OCV/AOCV derating, and SI-aware timing to deliver tapeout-ready sign-off across 7nm to 28nm nodes.",
    skills: [
      { label: "MCMM STA",           level: 94 },
      { label: "SDC Constraints",    level: 90 },
      { label: "SI / Crosstalk",     level: 83 },
      { label: "OCV / AOCV",        level: 87 },
    ],
    tools: ["Synopsys PrimeTime", "Cadence Tempus", "Ansys PathFinder", "Synopsys StarRC"],
    what: ["Set up MCMM corner analysis", "Debug setup / hold violations", "Apply AOCV / POCV derating", "Deliver full timing sign-off"],
  },
  {
    num: "06",
    icon: Wifi,
    color: "#6366f1",
    bg: "#eef2ff",
    title: "DDR / PCIe Verification Engineer",
    sub: "High-Speed Interface Protocols",
    shortDesc: "Verify the fastest, most complex interfaces on the chip with protocol-level precision.",
    longDesc:
      "Develop protocol-level UVM environments and VIP configurations for DDR4/5 and PCIe Gen4/5 controllers. Validate PHY integration, memory subsystem behavior, and high-speed link training. Strong grasp of JEDEC and PCIe specifications is essential. AMS co-simulation experience is a plus.",
    skills: [
      { label: "DDR4 / DDR5",        level: 91 },
      { label: "PCIe Gen4 / Gen5",   level: 89 },
      { label: "Protocol VIP",       level: 93 },
      { label: "PHY Integration",    level: 80 },
    ],
    tools: ["Synopsys VC VIP", "Cadence VIP Catalog", "Mentor Questa VIP", "Aldec ALQV"],
    what: ["Configure DDR & PCIe protocol VIPs", "Validate link training & equalization", "Verify memory subsystem throughput", "Run compliance test suites"],
  },
];

/* ─────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────── */
function SkillBar({ label, level, color, delay, inDetail }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: 6,
      }}>
        <span style={{
          fontFamily: UI, fontSize: 11, fontWeight: 600,
          letterSpacing: "0.06em", color: C.textSecondary,
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: DISPLAY, fontSize: 11, fontWeight: 700,
          color: color, letterSpacing: "-0.02em",
        }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: 3, borderRadius: 2,
        background: C.bgSoft, overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inDetail ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: EASE }}
          style={{ height: "100%", borderRadius: 2, background: color }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Domains() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];

  return (
    <section
      ref={ref}
      style={{
        background: C.bgWhite,
        position: "relative",
        overflow: "hidden",
        fontFamily: BODY,
      }}
    >
      {/* ── Grid texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: [
          `linear-gradient(${C.borderLight} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${C.borderLight} 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "40px 40px",
        opacity: 0.45,
      }} />

      {/* ── Orbs ── */}
      <div style={{
        position: "absolute", width: 600, height: 400,
        top: "-80px", right: "-100px",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", width: 400, height: 300,
        bottom: "0", left: "-80px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        position: "relative", zIndex: 1,
        padding: "72px 44px 80px",
      }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 26, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{
              fontFamily: UI, fontSize: 10, fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary,
            }}>
              Engineering Domains
            </span>
          </div>

          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          }}>
            <h2 style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              lineHeight: 1.04, color: C.textPrimary, margin: 0,
            }}>
              What We{" "}
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Hire For
              </span>
            </h2>
            <p style={{
              fontFamily: BODY, fontSize: 14, fontWeight: 400,
              color: C.textSecondary, lineHeight: 1.75,
              margin: 0, maxWidth: 380,
            }}>
              Six distinct engineering disciplines across silicon design,
              verification, and test. Select any to explore the full scope.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            MAIN LAYOUT — Index rail + Detail panel
        ══════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 0,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: C.shadowLg,
          minHeight: 560,
        }}>

          {/* ── LEFT: Index rail ── */}
          <div style={{
            background: C.bgLight,
            borderRight: `1px solid ${C.borderLight}`,
            display: "flex", flexDirection: "column",
          }}>
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              const isOn = active === i;
              return (
                <motion.button
                  key={d.num}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "18px 22px",
                    background: isOn ? C.bgWhite : "transparent",
                    border: "none",
                    borderBottom: `1px solid ${C.borderLight}`,
                    borderLeft: isOn ? `3px solid ${d.color}` : "3px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.22s",
                    position: "relative",
                  }}
                >
                  {/* Icon bubble */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: isOn ? d.bg : C.bgSoft,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.22s",
                  }}>
                    <Icon
                      size={16}
                      style={{
                        color: isOn ? d.color : C.textMuted,
                        transition: "color 0.22s",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      fontFamily: DISPLAY, fontSize: 12.5, fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: isOn ? d.color : C.textPrimary,
                      margin: "0 0 2px", lineHeight: 1.2,
                      transition: "color 0.22s",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {d.title}
                    </p>
                    <p style={{
                      fontFamily: UI, fontSize: 10, fontWeight: 500,
                      color: isOn ? d.color + "aa" : C.textMuted,
                      margin: 0, letterSpacing: "0.04em",
                      transition: "color 0.22s",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {d.sub}
                    </p>
                  </div>

                  {/* Active dot */}
                  {isOn && (
                    <motion.div
                      layoutId="activeDot"
                      style={{
                        position: "absolute", right: 16,
                        width: 6, height: 6, borderRadius: "50%",
                        background: d.color,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ── RIGHT: Detail panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32, ease: EASE }}
              style={{
                background: C.bgWhite,
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Ghost number — decorative */}
              <div style={{
                position: "absolute", right: -16, top: -20,
                fontFamily: DISPLAY, fontSize: "clamp(6rem, 12vw, 10rem)",
                fontWeight: 700, letterSpacing: "-0.06em",
                color: domain.bg, lineHeight: 1,
                userSelect: "none", pointerEvents: "none", zIndex: 0,
              }}>
                {domain.num}
              </div>

              {/* Content */}
              <div style={{
                position: "relative", zIndex: 1,
                padding: "36px 40px",
                flex: 1, display: "flex", flexDirection: "column", gap: 32,
              }}>

                {/* ── Top strip — cat + title ── */}
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: UI, fontSize: 9.5, fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: domain.color, marginBottom: 12,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: domain.color, display: "inline-block",
                    }} />
                    Domain {domain.num}
                  </div>

                  <h3 style={{
                    fontFamily: DISPLAY,
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 700, letterSpacing: "-0.04em",
                    color: C.textPrimary, margin: "0 0 4px", lineHeight: 1.1,
                  }}>
                    {domain.title}
                  </h3>
                  <p style={{
                    fontFamily: DISPLAY, fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 500, letterSpacing: "-0.02em",
                    color: domain.color, margin: "0 0 14px",
                  }}>
                    {domain.sub}
                  </p>

                  {/* Underline accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      height: 2, width: 48, borderRadius: 2,
                      background: `linear-gradient(90deg, ${domain.color}, ${domain.color}44)`,
                      transformOrigin: "left",
                      marginBottom: 16,
                    }}
                  />

                  <p style={{
                    fontFamily: BODY, fontSize: 13.5, fontWeight: 300,
                    color: C.textSecondary, lineHeight: 1.8, margin: 0, maxWidth: 520,
                  }}>
                    {domain.longDesc}
                  </p>
                </div>

                {/* ── 2-col: Skills + What you'll do ── */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 32,
                }}>
                  {/* Skill bars */}
                  <div>
                    <p style={{
                      fontFamily: UI, fontSize: 9.5, fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: C.textMuted, margin: "0 0 16px",
                    }}>
                      Skill Focus
                    </p>
                    {domain.skills.map((s, si) => (
                      <SkillBar
                        key={s.label}
                        label={s.label}
                        level={s.level}
                        color={domain.color}
                        delay={si * 0.08}
                        inDetail={true}
                      />
                    ))}
                  </div>

                  {/* What you'll do */}
                  <div>
                    <p style={{
                      fontFamily: UI, fontSize: 9.5, fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: C.textMuted, margin: "0 0 16px",
                    }}>
                      What You'll Do
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {domain.what.map((w, wi) => (
                        <motion.div
                          key={w}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: wi * 0.07, ease: EASE }}
                          style={{
                            display: "flex", alignItems: "flex-start", gap: 10,
                          }}
                        >
                          <span style={{
                            display: "block", width: 18, height: 1.5, marginTop: 8,
                            background: domain.color,
                            borderRadius: 2, flexShrink: 0,
                          }} />
                          <span style={{
                            fontFamily: BODY, fontSize: 12.5, fontWeight: 400,
                            color: C.textSecondary, lineHeight: 1.65,
                          }}>
                            {w}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Tools + CTA row ── */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", flexWrap: "wrap", gap: 16,
                  paddingTop: 20,
                  borderTop: `1px solid ${C.borderLight}`,
                }}>
                  {/* Tool names — plain text list, no pills */}
                  <div>
                    <p style={{
                      fontFamily: UI, fontSize: 9.5, fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: C.textMuted, margin: "0 0 8px",
                    }}>
                      Tools
                    </p>
                    <div style={{ display: "flex", gap: "10px 24px", flexWrap: "wrap" }}>
                      {domain.tools.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: ti * 0.06 }}
                          style={{
                            fontFamily: BODY, fontSize: 12, fontWeight: 500,
                            color: C.textSecondary,
                            borderBottom: `1px solid ${domain.color}44`,
                            paddingBottom: 1,
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${domain.color}33` }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 10,
                      background: domain.color, color: "#fff", border: "none",
                      fontFamily: UI, fontSize: 11.5, fontWeight: 700,
                      letterSpacing: "0.06em", cursor: "pointer",
                      boxShadow: `0 4px 16px ${domain.color}33`,
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    Apply for This Role
                    <ArrowUpRight size={14} />
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom counter row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: 16, marginTop: 28,
          }}
        >
          {/* Domain mini-dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {DOMAINS.map((d, i) => (
              <button
                key={d.num}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 24 : 6,
                  height: 6, borderRadius: 50, border: "none",
                  background: active === i ? d.color : C.borderLight,
                  cursor: "pointer", padding: 0,
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ))}
          </div>

          <span style={{
            fontFamily: UI, fontSize: 11, fontWeight: 500,
            color: C.textMuted, letterSpacing: "0.06em",
          }}>
            {active + 1} / {DOMAINS.length} domains
          </span>
        </motion.div>

      </div>
    </section>
  );
}