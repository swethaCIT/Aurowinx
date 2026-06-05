import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Users, BookOpen, Zap } from "lucide-react";
import { C, FONT, EASE } from "././theme";

/* ─── Animation helpers ────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  },
});

/* ─── Decorative SVGs (semiconductor schematic art) ─────── */

/** Card 01 — circuit trace board */
const CircuitSVG = () => (
  <svg
    viewBox="0 0 340 220"
    fill="none"
    aria-hidden="true"
    style={{
      position: "absolute",
      right: -12,
      bottom: -12,
      width: 300,
      opacity: 0.09,
      pointerEvents: "none",
    }}
  >
    {/* IC packages */}
    <rect x="108" y="18" width="46" height="46" rx="5" stroke="white" strokeWidth="1.5" />
    <rect x="193" y="88" width="36" height="36" rx="4" stroke="white" strokeWidth="1.5" />
    <rect x="40" y="106" width="40" height="40" rx="4" stroke="white" strokeWidth="1.5" />
    <rect x="244" y="147" width="30" height="30" rx="3" stroke="white" strokeWidth="1.5" />
    <rect x="56" y="172" width="24" height="24" rx="2" stroke="white" strokeWidth="1" opacity="0.45" />
    {/* Traces */}
    <line x1="131" y1="64" x2="131" y2="95" stroke="white" strokeWidth="1.5" />
    <line x1="131" y1="95" x2="193" y2="95" stroke="white" strokeWidth="1.5" />
    <line x1="80"  y1="106" x2="80"  y2="95" stroke="white" strokeWidth="1.5" />
    <line x1="80"  y1="95"  x2="131" y2="95" stroke="white" strokeWidth="1.5" />
    <line x1="211" y1="124" x2="211" y2="147" stroke="white" strokeWidth="1.5" />
    <line x1="211" y1="147" x2="244" y2="147" stroke="white" strokeWidth="1.5" />
    <line x1="40"  y1="126" x2="10"  y2="126" stroke="white" strokeWidth="1.5" />
    <line x1="10"  y1="126" x2="10"  y2="184" stroke="white" strokeWidth="1.5" />
    <line x1="10"  y1="184" x2="56"  y2="184" stroke="white" strokeWidth="1.5" />
    <line x1="274" y1="177" x2="310" y2="177" stroke="white" strokeWidth="1.5" />
    <line x1="310" y1="177" x2="310" y2="208" stroke="white" strokeWidth="1.5" />
    {/* Vias */}
    <circle cx="131" cy="95"  r="3.5" fill="white" opacity="0.7" />
    <circle cx="80"  cy="95"  r="3.5" fill="white" opacity="0.7" />
    <circle cx="211" cy="147" r="3.5" fill="white" opacity="0.7" />
    <circle cx="10"  cy="126" r="2.5" fill="white" opacity="0.5" />
    <circle cx="10"  cy="184" r="2.5" fill="white" opacity="0.5" />
    {/* Pin stubs on IC */}
    <line x1="120" y1="18" x2="120" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="136" y1="18" x2="136" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="108" y1="30" x2="100" y2="30" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="108" y1="44" x2="100" y2="44" stroke="white" strokeWidth="1" opacity="0.5" />
  </svg>
);

/** Card 02 — org/hierarchy tree */
const NodesSVG = () => (
  <svg
    viewBox="0 0 220 185"
    fill="none"
    aria-hidden="true"
    style={{
      position: "absolute",
      right: -5,
      top: -5,
      width: 185,
      opacity: 0.1,
      pointerEvents: "none",
    }}
  >
    <circle cx="110" cy="36"  r="14" stroke="white" strokeWidth="1.5" />
    <circle cx="55"  cy="100" r="11" stroke="white" strokeWidth="1.5" />
    <circle cx="165" cy="100" r="11" stroke="white" strokeWidth="1.5" />
    <circle cx="30"  cy="158" r="9"  stroke="white" strokeWidth="1.5" />
    <circle cx="78"  cy="158" r="9"  stroke="white" strokeWidth="1.5" />
    <circle cx="138" cy="158" r="9"  stroke="white" strokeWidth="1.5" />
    <circle cx="186" cy="158" r="9"  stroke="white" strokeWidth="1.5" />
    <line x1="110" y1="50"  x2="60"  y2="89"  stroke="white" strokeWidth="1.2" />
    <line x1="110" y1="50"  x2="160" y2="89"  stroke="white" strokeWidth="1.2" />
    <line x1="55"  y1="111" x2="35"  y2="149" stroke="white" strokeWidth="1.2" />
    <line x1="55"  y1="111" x2="75"  y2="149" stroke="white" strokeWidth="1.2" />
    <line x1="165" y1="111" x2="141" y2="149" stroke="white" strokeWidth="1.2" />
    <line x1="165" y1="111" x2="183" y2="149" stroke="white" strokeWidth="1.2" />
  </svg>
);

/** Card 03 — oscilloscope / sine wave */
const WaveSVG = () => (
  <svg
    viewBox="0 0 230 135"
    fill="none"
    aria-hidden="true"
    style={{
      position: "absolute",
      right: -5,
      bottom: -5,
      width: 195,
      opacity: 0.1,
      pointerEvents: "none",
    }}
  >
    {/* Grid lines */}
    <line x1="0" y1="110" x2="230" y2="110" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <line x1="0" y1="22"  x2="0"   y2="110" stroke="white" strokeWidth="0.5" opacity="0.2" />
    {/* Waves */}
    <path d="M0,66 C28,44 58,88 86,66 C114,44 144,88 172,66 C200,44 220,74 230,66"
      stroke="white" strokeWidth="2" fill="none" />
    <path d="M0,88 C28,66 58,110 86,88 C114,66 144,110 172,88 C200,66 220,96 230,88"
      stroke="white" strokeWidth="1.5" fill="none" opacity="0.48" />
    <path d="M0,44 C28,22 58,66 86,44 C114,22 144,66 172,44 C200,22 220,52 230,44"
      stroke="white" strokeWidth="1" fill="none" opacity="0.32" />
    {/* Sample points */}
    <circle cx="86"  cy="66" r="3.5" fill="white" opacity="0.65" />
    <circle cx="172" cy="66" r="3.5" fill="white" opacity="0.65" />
    <circle cx="43"  cy="44" r="2.5" fill="white" opacity="0.45" />
    <circle cx="129" cy="88" r="2.5" fill="white" opacity="0.45" />
    {/* Y-axis ticks */}
    <line x1="0" y1="44" x2="6"  y2="44" stroke="white" strokeWidth="0.8" opacity="0.25" />
    <line x1="0" y1="66" x2="6"  y2="66" stroke="white" strokeWidth="0.8" opacity="0.25" />
    <line x1="0" y1="88" x2="6"  y2="88" stroke="white" strokeWidth="0.8" opacity="0.25" />
  </svg>
);

/** Card 04 — dot matrix + routed signal */
const ImpactSVG = () => {
  const dots = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 11; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * 28 + 14}
          cy={r * 28 + 14}
          r="1.8"
          fill="white"
        />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 322 212"
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -10,
        bottom: -10,
        width: 300,
        opacity: 0.075,
        pointerEvents: "none",
      }}
    >
      {dots}
      {/* Manhattan-routed signal overlay */}
      <path
        d="M14,84 L70,84 L70,140 L154,140 L154,84 L238,84 L238,168 L308,168"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
        opacity="0.88"
      />
      <circle cx="70"  cy="140" r="5" fill="white" opacity="0.88" />
      <circle cx="154" cy="84"  r="5" fill="white" opacity="0.88" />
      <circle cx="238" cy="168" r="5" fill="white" opacity="0.88" />
    </svg>
  );
};

/* ─── Card definitions ─────────────────────────────────── */
const CARDS = [
  {
    id: "01",
    gridCol: "1 / 8",
    icon: Cpu,
    title: "Advanced Silicon\nProjects",
    desc: "Work on cutting-edge DFT, RTL, and Physical Design challenges that push the limits of modern semiconductor engineering. Every tape-out is a milestone you own end-to-end.",
    tags: ["DFT Engineering", "RTL Synthesis", "Physical Design", "ASIC Tape-out"],
    Decor: CircuitSVG,
    border: "rgba(99,102,241,0.38)",
    borderHover: "rgba(99,102,241,0.68)",
  },
  {
    id: "02",
    gridCol: "8 / 13",
    icon: Users,
    title: "Experienced Engineering\nLeadership",
    desc: "Learn from principal engineers with decades of silicon experience who actively mentor, review, and guide every step of your career trajectory.",
    tags: ["Principals", "Mentors", "Code Reviews"],
    Decor: NodesSVG,
    border: "rgba(124,58,237,0.38)",
    borderHover: "rgba(124,58,237,0.65)",
  },
  {
    id: "03",
    gridCol: "1 / 6",
    icon: BookOpen,
    title: "Continuous Learning\n& Mentorship",
    desc: "Structured growth tracks, EDA certifications, internal tech talks, and a culture that celebrates curiosity at every level of the organisation.",
    tags: ["Certifications", "Tech Talks", "Growth Tracks"],
    Decor: WaveSVG,
    border: "rgba(99,102,241,0.32)",
    borderHover: "rgba(99,102,241,0.62)",
  },
  {
    id: "04",
    gridCol: "6 / 13",
    icon: Zap,
    title: "Meaningful\nEngineering Impact",
    desc: "The silicon you verify, place, and route ends up in real products — consumer SoCs, automotive ICs, and industrial control chips shipping worldwide.",
    tags: ["Real Products", "Full Cycle", "Global Reach"],
    Decor: ImpactSVG,
    border: "rgba(99,102,241,0.38)",
    borderHover: "rgba(99,102,241,0.68)",
  },
];

/* ─── BentoCard ────────────────────────────────────────── */
function BentoCard({ card, delay }) {
  const Icon = card.icon;
  const Decor = card.Decor;

  return (
    <motion.article
      className={`wj-card wj-card-${card.id}`}
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      style={{
        gridColumn: card.gridCol,
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        border: `1px solid ${card.border}`,
        background:
          "linear-gradient(140deg, rgba(30,27,75,0.92) 0%, rgba(12,8,35,0.96) 100%)",
        padding: "38px 40px",
        minHeight: 290,
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = card.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = card.border;
      }}
    >
      {/* Decorative background art */}
      <Decor />

      {/* Inner highlight rim (top edge glow) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(165,180,252,0.18), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Ghost number */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 18,
          right: 28,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 76,
          lineHeight: 1,
          color: "rgba(255,255,255,0.032)",
          letterSpacing: -2,
          userSelect: "none",
        }}
      >
        {card.id}
      </span>

      {/* Accent bar */}
      <div
        style={{
          width: 32,
          height: 3,
          borderRadius: 2,
          background: C.gradPrimary,
          marginBottom: 22,
          flexShrink: 0,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: "rgba(99,102,241,0.14)",
          border: "1px solid rgba(99,102,241,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a5b4fc",
          marginBottom: 22,
          flexShrink: 0,
        }}
      >
        <Icon size={22} strokeWidth={1.7} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "clamp(1.08rem, 1.45vw, 1.32rem)",
          color: "#f1f5f9",
          lineHeight: 1.24,
          marginBottom: 14,
          whiteSpace: "pre-line",
          letterSpacing: -0.3,
          flexShrink: 0,
        }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: "clamp(0.8rem, 0.92vw, 0.875rem)",
          color: "#94a3b8",
          lineHeight: 1.75,
          marginBottom: 28,
          flex: 1,
        }}
      >
        {card.desc}
      </p>

      {/* Pill tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 7,
          flexShrink: 0,
        }}
      >
        {card.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: FONT,
              fontSize: "0.685rem",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 100,
              background: "rgba(99,102,241,0.13)",
              border: "1px solid rgba(99,102,241,0.28)",
              color: "#a5b4fc",
              letterSpacing: 0.35,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─────────────────────────────────────── */
export default function WhyJoin() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="life-at-aurowinx"
      ref={ref}
      style={{
        background: "#07091a",
        padding: "104px 0 116px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scoped responsive styles */}
      <style>{`
        .wj-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }
        @media (max-width: 920px) {
          .wj-grid .wj-card {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 540px) {
          .wj-grid {
            gap: 12px;
          }
        }
      `}</style>

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(99,102,241,0.11) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient centre glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(79,70,229,0.1) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade-out edge (blends into next section) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to bottom, transparent, rgba(7,9,26,0.85))",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginBottom: 58, maxWidth: 640 }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 15px",
              borderRadius: 100,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.26)",
              marginBottom: 24,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.accent,
                boxShadow: `0 0 8px ${C.accent}`,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontSize: "0.69rem",
                fontWeight: 700,
                color: "#a5b4fc",
                letterSpacing: 1.7,
                textTransform: "uppercase",
              }}
            >
              Life at AurowinX
            </span>
          </div>

          <h2
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "clamp(1.85rem, 3.1vw, 2.65rem)",
              color: "#f1f5f9",
              lineHeight: 1.18,
              letterSpacing: -0.45,
              marginBottom: 16,
            }}
          >
            Why engineers choose{" "}
            <span
              style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AurowinX
            </span>
          </h2>

          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(0.86rem, 1vw, 0.96rem)",
              color: "#64748b",
              lineHeight: 1.78,
            }}
          >
            We build silicon from first principles. If you care about craft,
            depth, and shipping work that matters at scale — you'll find your
            people here.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="wj-grid">
          {CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} delay={0.08 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}