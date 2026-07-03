// src/components/products/SolarFullSpecs.jsx
// Full turnkey spec breakdown for Solar — renders below the tab panel in
// ElectronicsDev.jsx, only when the Solar tab is active.
// Uses theme.js tokens to stay visually consistent with the rest of the page.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { C, FONT, EASE } from "./theme";

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const TIERS = [
  {
    id: "rooftop",
    label: "House Rooftop",
    range: "1kW – 15kW",
    ratings: ["1kW", "2kW", "3kW", "5kW", "10kW", "15kW"],
    note: "Residential · subsidy eligible",
    img: "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=800&q=80",
  },
  {
    id: "industries",
    label: "Industries",
    range: "20kW – 500kW",
    ratings: ["20kW", "30kW", "50kW", "100kW", "250kW", "500kW"],
    note: "Commercial & industrial scale",
    img: "https://images.unsplash.com/photo-1745321633881-d2d2218911bd?w=800&q=80",
  },
  {
    id: "farm",
    label: "Solar Farm",
    range: "1MW – 2MW",
    ratings: ["1MW", "2MW"],
    note: "Utility-scale ground mount",
    img: "https://images.unsplash.com/photo-1756913454165-246d96a20b67?w=800&q=80",
  },
];

const INVERTER_BRANDS = ["SunGrow", "Vsole", "Luminous", "Tata", "Kirloskar"];
const PANEL_BRANDS = ["Rayson", "Luminous", "Goldi", "Tata", "Panasonic"];

const ACCESSORIES = [
  { label: "Earth Rod" },
  { label: "Lightning Arrestor" },
  { label: "ACDB" },
  { label: "DCDB" },
  { label: "Support Channel" },
  { label: "DC Cable" },
  { label: "AC Cable" },
  { label: "Net Meter", scope: "Client Scope" },
];

/* ─────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────── */
function TierCard({ tier, index, inView, product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: EASE }}
      style={{
        borderRadius: 18, overflow: "hidden",
        border: `1px solid ${C.borderLight}`,
        background: C.bgWhite, boxShadow: C.shadowSm,
      }}
    >
      <div style={{ height: 140, position: "relative", overflow: "hidden" }}>
        <img
          src={tier.img}
          alt={tier.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 14, right: 14 }}>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-.02em", fontFamily: FONT }}>
            {tier.label}
          </h4>
          <p style={{ margin: "2px 0 0", fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,.8)", fontFamily: FONT }}>
            {tier.range}
          </p>
        </div>
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
          {tier.ratings.map((r) => (
            <span
              key={r}
              style={{
                padding: "3px 9px", borderRadius: 50, fontSize: 10.5, fontWeight: 700,
                background: product.colorSoft, border: `1px solid ${product.colorBorder}`,
                color: product.colorDark, fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {r}
            </span>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 11, color: C.textMuted, fontFamily: FONT }}>{tier.note}</p>
      </div>
    </motion.div>
  );
}

function BrandRow({ title, brands }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
        color: C.textMuted, fontFamily: FONT, marginRight: 2, minWidth: 110,
      }}>
        {title}
      </span>
      {brands.map((b) => (
        <span
          key={b}
          style={{
            padding: "5px 13px", borderRadius: 50, fontSize: 12, fontWeight: 600,
            background: C.bgLight, border: `1px solid ${C.border}`, color: C.textSecondary,
            fontFamily: FONT,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────── */
export default function SolarFullSpecs({ product }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { color, gradA, gradB, colorSoft, colorBorder, colorDark } = product;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        maxWidth: 1160, margin: "40px auto 0", position: "relative", zIndex: 2,
      }}
    >
      {/* divider label */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <span style={{ flex: 1, height: 1, background: C.borderLight }} />
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase",
          color: colorDark, fontFamily: FONT, whiteSpace: "nowrap",
        }}>
          Full Turnkey Specification
        </span>
        <span style={{ flex: 1, height: 1, background: C.borderLight }} />
      </div>

      {/* tier cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16, marginBottom: 20 }}>
        {TIERS.map((t, i) => <TierCard key={t.id} tier={t} index={i} inView={inView} product={product} />)}
      </div>

      {/* brand rows */}
      <div style={{
        background: C.bgWhite, border: `1px solid ${C.borderLight}`, borderRadius: 16,
        padding: "16px 20px", marginBottom: 16,
      }}>
        <BrandRow title="Inverter Brands" brands={INVERTER_BRANDS} />
        <BrandRow title="Panel Brands" brands={PANEL_BRANDS} />
      </div>

      {/* subsidy + warranty row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
        <div style={{
          borderRadius: 16, padding: "18px 20px",
          background: `linear-gradient(135deg, ${gradA}, ${gradB})`,
          display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", fontFamily: FONT }}>
              Residential Subsidy
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, color: "#fff", letterSpacing: "-.02em", fontFamily: FONT }}>
              ₹30,000/kW
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", fontFamily: FONT }}>
              Max Cap (3kW+)
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, color: "#fff", letterSpacing: "-.02em", fontFamily: FONT }}>
              ₹78,000
            </div>
          </div>
        </div>

        <div style={{ borderRadius: 16, padding: "18px 20px", background: colorSoft, border: `1px solid ${colorBorder}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: colorDark, fontFamily: FONT, marginBottom: 4 }}>
            Warranty & Maintenance
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.textPrimary, fontFamily: FONT }}>
            Inverter: 10yr free · Panel: 25yr warranty / 5yr free maintenance
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, fontFamily: FONT }}>
            + 1 Year Free AMC · accessories replacement is client scope
          </div>
        </div>
      </div>

      {/* accessories */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.textMuted, fontFamily: FONT, marginBottom: 10 }}>
          Included Accessories
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
          {ACCESSORIES.map((a) => (
            <div
              key={a.label}
              style={{
                padding: "9px 12px", borderRadius: 10,
                background: a.scope ? colorSoft : C.bgLight,
                border: a.scope ? `1px solid ${colorBorder}` : `1px solid ${C.borderLight}`,
                fontSize: 12, fontWeight: 600, color: C.textSecondary, fontFamily: FONT,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
              }}
            >
              {a.label}
              {a.scope && (
                <span style={{ fontSize: 8.5, fontWeight: 700, color: colorDark, whiteSpace: "nowrap" }}>{a.scope}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* fine print */}
      <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", fontFamily: FONT, marginTop: 20 }}>
        Minimum space required: 100 sq.ft / kW
      </p>
    </motion.div>
  );
}