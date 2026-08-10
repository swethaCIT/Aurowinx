import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found",
    path: typeof window !== "undefined" ? window.location.pathname : "/404",
    noindex: true,
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#07111f 0%,#0f172a 45%,#111827 100%)",
        color: "#eff6ff",
        padding: "48px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd", fontSize: 12, marginBottom: 16 }}>
          Error 404
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 1, margin: "0 0 18px", fontWeight: 800 }}>
          Page not found
        </h1>
        <p style={{ color: "#dbeafe", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              textDecoration: "none", color: "#fff",
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 0 24px rgba(37,99,235,0.35)",
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              textDecoration: "none", color: "#e2e8f0",
              border: "1px solid rgba(148,163,184,0.35)",
              background: "rgba(15,23,42,0.4)",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
