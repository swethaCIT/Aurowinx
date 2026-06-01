
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, GitBranch, Layers, Zap, Radio, Shield, ArrowRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const CATEGORIES = ["All", "AMBA", "Protocol", "IP Core", "Processor", "Memory"];

const PROJECTS = [
  { title: "AMBA-AXI Verification",        cat: "AMBA",     icon: <Layers style={{ width: 18, height: 18 }} />,    color: "#4f46e5", desc: "Full UVM testbench for AXI4 master/slave with outstanding transaction tracking and protocol compliance." },
  { title: "AMBA-Bridge Verification",     cat: "AMBA",     icon: <GitBranch style={{ width: 18, height: 18 }} />, color: "#7c3aed", desc: "AHB-to-APB bridge verification with constrained-random stimulus and functional coverage closure." },
  { title: "DDR Protocol Verification",    cat: "Protocol", icon: <Zap style={{ width: 18, height: 18 }} />,       color: "#0891b2", desc: "DDR4/LPDDR4 memory controller verification — timing, refresh, and command sequencing checks." },
  { title: "Ethernet Protocol Verification",cat: "Protocol", icon: <Radio style={{ width: 18, height: 18 }} />,    color: "#0284c7", desc: "10G/25G Ethernet MAC verification with frame integrity, flow control and error injection tests." },
  { title: "RTC IP Verification",          cat: "IP Core",  icon: <Shield style={{ width: 18, height: 18 }} />,   color: "#059669", desc: "Real-time clock IP functional verification including alarm, calendar and power-on reset scenarios." },
  { title: "RAM 4096 Verification",        cat: "Memory",   icon: <Cpu style={{ width: 18, height: 18 }} />,      color: "#d97706", desc: "4096-entry SRAM verification with March algorithms, retention tests and ECC error injection." },
  { title: "ARM Cortex-M0 Verification",   cat: "Processor",icon: <Cpu style={{ width: 18, height: 18 }} />,      color: "#dc2626", desc: "Cortex-M0 processor subsystem verification — instruction set, interrupt, bus matrix and debug." },
  { title: "I2C, GPIO, UART, SPI",         cat: "Protocol", icon: <Radio style={{ width: 18, height: 18 }} />,    color: "#7c3aed", desc: "Peripheral IP verification bundle — full protocol compliance, edge cases and back-to-back transfers." },
];

function ProjectCard({ project, i, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        background: "#fff", borderRadius: 16,
        padding: "20px 20px 18px",
        border: `1px solid ${hovered ? project.color + "40" : C.borderLight}`,
        boxShadow: hovered ? `0 12px 36px ${project.color}14` : C.shadowSm,
        cursor: "default", overflow: "hidden",
        position: "relative", transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ height: hovered ? "100%" : "40%" }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", left: 0, top: 0,
          width: 3, background: project.color,
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Icon + category */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${project.color}12`,
          color: project.color,
          border: `1px solid ${project.color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {project.icon}
        </div>
        <span style={{
          padding: "3px 10px", borderRadius: 50,
          background: `${project.color}10`,
          color: project.color,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          border: `1px solid ${project.color}20`,
        }}>
          {project.cat}
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontWeight: 800, fontSize: 14, color: C.textPrimary,
        margin: "0 0 7px", fontFamily: FONT, letterSpacing: "-0.02em",
      }}>
        {project.title}
      </p>

      {/* Desc */}
      <p style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 14px" }}>
        {project.desc}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <motion.div
          animate={{ width: hovered ? 16 : 8 }}
          style={{ height: 2, background: project.color, borderRadius: 1 }}
        />
        <span style={{ fontSize: 11, color: project.color, fontWeight: 700, letterSpacing: "0.06em" }}>
          VIEW DETAILS
        </span>
        <ChevronRight style={{ width: 12, height: 12, color: project.color }} />
      </div>
    </motion.div>
  );
}

export default function ProjectsList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "64px 48px 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
                <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Our Projects
                </span>
              </div>
              <h2 style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900,
                color: C.textPrimary, margin: "0 0 8px",
                letterSpacing: "-0.04em", fontFamily: FONT,
              }}>
                What We've Verified
              </h2>
              <p style={{ color: C.textSecondary, fontSize: 14, margin: 0, lineHeight: 1.7, maxWidth: 460 }}>
                A cross-section of protocols, IPs and processors our team has taken to sign-off.
              </p>
            </div>

            {/* View all link */}
            <motion.a
              href="/projects" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13,
                textDecoration: "none", flexShrink: 0,
              }}
            >
              View All Projects <ArrowRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "7px 18px", borderRadius: 50,
                border: active === cat ? `1.5px solid ${C.primary}` : `1px solid ${C.borderLight}`,
                background: active === cat ? C.primary : "#fff",
                color: active === cat ? "#fff" : C.textSecondary,
                fontWeight: 700, fontSize: 12,
                cursor: "pointer", fontFamily: FONT,
                boxShadow: active === cat ? `0 4px 14px rgba(79,70,229,0.25)` : C.shadowSm,
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom count */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 28, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10,
          }}
        >
          <div style={{ height: 1, flex: 1, maxWidth: 120, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
          <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>
            Showing {filtered.length} of {PROJECTS.length} projects
          </span>
          <div style={{ height: 1, flex: 1, maxWidth: 120, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
        </motion.div>

      </div>
    </section>
  );
}
