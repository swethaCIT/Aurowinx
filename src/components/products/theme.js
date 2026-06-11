// src/theme.js — shared design tokens for AurowinX sections

export const C = {
  // Core palette — Indigo/Purple on light
  primary:    "#4f46e5",   // indigo-600
  primaryDark:"#3730a3",   // indigo-800
  secondary:  "#7c3aed",   // violet-600
  accent:     "#6366f1",   // indigo-500
  accentSoft: "#e0e7ff",   // indigo-100
  border:     "#c7d2fe",   // indigo-200
  borderLight:"#e0e7ff",

  // Text
  textPrimary:  "#0f172a", // slate-900
  textSecondary:"#475569", // slate-600
  textMuted:    "#94a3b8", // slate-400

  // Backgrounds
  bgWhite:  "#ffffff",
  bgLight:  "#f8fafc",   // slate-50
  bgSoft:   "#f1f5f9",   // slate-100
  bgAccent: "#eef2ff",   // indigo-50

  // Gradients
  gradPrimary:  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  gradLight:    "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
  gradHero:     "linear-gradient(160deg, #eef2ff 0%, #f5f3ff 40%, #faf5ff 100%)",

  // Shadows
  shadowSm:   "0 1px 3px rgba(79,70,229,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd:   "0 4px 16px rgba(79,70,229,0.10), 0 2px 6px rgba(0,0,0,0.05)",
  shadowLg:   "0 12px 40px rgba(79,70,229,0.14), 0 4px 12px rgba(0,0,0,0.06)",
  shadowXl:   "0 24px 64px rgba(79,70,229,0.18), 0 8px 24px rgba(0,0,0,0.08)",
  shadowGlow: "0 0 40px rgba(79,70,229,0.20)",
};

export const FONT = "'Clash Display', 'Sora', 'DM Sans', system-ui, sans-serif";

// Step colors for verification flow
export const STEP_COLORS = [
  "#4f46e5", // indigo
  "#7c3aed", // violet
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#0891b2", // sky
  "#0ea5e9", // light blue
];

// Framer-motion common transitions
export const EASE = [0.22, 1, 0.36, 1];
export const fadeUp   = { initial: { opacity: 0, y: 28  }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } };
export const fadeLeft = { initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-60px" } };
export const fadeRight= { initial: { opacity: 0, x: 28  }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-60px" } };