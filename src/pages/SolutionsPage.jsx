import { Link } from "react-router-dom";

const solutions = [
  { name: "Semiconductor Design", path: "/solutions/semiconductor-design", blurb: "SoC, ASIC, and silicon engineering across advanced nodes." },
  { name: "Design Verification", path: "/solutions/design-verification", blurb: "Simulation, formal, and emulation-led verification flows." },
  { name: "DFT Engineering", path: "/solutions/dft-engineering", blurb: "Scan, ATPG, and testability solutions for silicon quality." },
  { name: "Physical Design", path: "/solutions/physical-design", blurb: "RTL-to-GDSII execution, timing, and sign-off readiness." },
  { name: "Analog & IP Solutions", path: "/solutions/analog-ip", blurb: "Mixed-signal design, IP hardening, and analog development." },
];

export default function SolutionsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(180deg,#07111f 0%,#0f172a 45%,#111827 100%)", color: "#eff6ff", padding: "48px 20px 72px" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd", fontSize: 12, marginBottom: 12 }}>Solutions</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)", lineHeight: 1.05, margin: "0 0 14px", fontWeight: 800 }}>Explore AurowinX engineering capabilities.</h1>
        <p style={{ maxWidth: 760, color: "#dbeafe", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
          Five engineering disciplines, one accountable team — from architecture and RTL through verification, test, physical design, and analog IP.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {solutions.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(148,163,184,0.18)",
                borderRadius: 18,
                padding: 18,
                background: "rgba(15,23,42,0.88)",
                boxShadow: "0 18px 40px rgba(15,23,42,0.35)",
                transition: "transform 0.18s ease, border-color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(148,163,184,0.18)";
              }}
            >
              <p style={{ color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 11, marginBottom: 8 }}>Capability</p>
              <h2 style={{ fontSize: 18, margin: "0 0 10px", color: "#fff" }}>{item.name}</h2>
              <p style={{ color: "#dbeafe", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
