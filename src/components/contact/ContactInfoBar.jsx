// src/components/contact/ContactInfoBar.jsx
// ─── REDESIGN v4: Light palette — Stat-style contact strip ──────────────────

import { motion } from "framer-motion";
import { EASE } from "././theme";

// ── Icons ────────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.93 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.84 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    Icon:    MailIcon,
    label:   "Email",
    value:   "contact@aurowinx.com",
    sub:     "General & service enquiries",
    href:    "mailto:contact@aurowinx.com",
    accent:  "#4f46e5",
    soft:    "#eef2ff",
  },
  {
    Icon:    PhoneIcon,
    label:   "Phone",
    value:   "+91 44 XXXX XXXX",
    sub:     "Mon – Fri · 9 AM – 6 PM IST",
    href:    "tel:+914400000000",
    accent:  "#7c3aed",
    soft:    "#f5f3ff",
  },
  {
    Icon:    PinIcon,
    label:   "Headquarters",
    value:   "Chennai, India",
    sub:     "Serving clients globally",
    href:    "https://maps.google.com/?q=Chennai,Tamil+Nadu,India",
    accent:  "#0891b2",
    soft:    "#ecfeff",
    external: true,
  },
  {
    Icon:    ClockIcon,
    label:   "Response Time",
    value:   "Within 1 Business Day",
    sub:     "We respond to every enquiry",
    accent:  "#059669",
    soft:    "#f0fdf4",
    isStatus: true,
  },
];

const SOCIALS = [
  { title: "LinkedIn",    Icon: LinkedinIcon, href: "https://linkedin.com/company/aurowinx" },
  { title: "X / Twitter", Icon: XIcon,        href: "https://twitter.com/aurowinx" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactInfoBar() {
  return (
    <>
      <style>{`
        .cib4-root {
          background: #ffffff;
          border-top: 1px solid #e0e7ff;
          border-bottom: 1px solid #e0e7ff;
          padding: 0;
          position: relative;
          overflow: hidden;
        }

        /* ambient gradient blobs */
        .cib4-root::before {
          content: '';
          position: absolute; top: -60px; right: -40px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, #eef2ff 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .cib4-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
        }

        /* ── Stat items ──────────────────────────────────── */
        .cib4-stats {
          display: flex;
          align-items: stretch;
          flex: 1;
        }

        .cib4-stat {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 28px 32px;
          flex: 1;
          border-right: 1px solid #f1f5f9;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.2s ease;
          cursor: pointer;
        }
        .cib4-stat:last-child { border-right: none; }
        .cib4-stat.no-link { cursor: default; }

        /* bottom fill sweep on hover */
        .cib4-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 0;
          background: var(--s-soft);
          transition: height 0.25s ease;
          z-index: 0;
        }
        .cib4-stat:not(.no-link):hover::after { height: 100%; }

        /* top accent line */
        .cib4-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2.5px;
          background: linear-gradient(90deg, var(--s-accent), transparent);
          opacity: 0;
          transition: opacity 0.22s ease;
          z-index: 1;
        }
        .cib4-stat:not(.no-link):hover::before { opacity: 1; }

        /* icon circle */
        .cib4-stat-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: var(--s-soft);
          border: 1px solid var(--s-accent-12);
          display: flex; align-items: center; justify-content: center;
          color: var(--s-accent);
          flex-shrink: 0;
          position: relative; z-index: 1;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .cib4-stat:not(.no-link):hover .cib4-stat-icon {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 18px var(--s-accent-20);
        }

        .cib4-stat-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          position: relative; z-index: 1;
        }

        .cib4-stat-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--s-accent);
          opacity: 0.65;
          transition: opacity 0.2s;
        }
        .cib4-stat:not(.no-link):hover .cib4-stat-label { opacity: 1; }

        .cib4-stat-value {
          font-family: 'Clash Display', 'Sora', system-ui, sans-serif;
          font-size: 14.5px;
          font-weight: 650;
          color: #0f172a;
          letter-spacing: -0.015em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .cib4-stat:not(.no-link):hover .cib4-stat-value { color: var(--s-accent); }

        .cib4-stat-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .cib4-stat:not(.no-link):hover .cib4-stat-sub { color: #64748b; }

        /* status dot for response time */
        .cib4-online-dot {
          display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          margin-right: 5px;
          vertical-align: middle;
          animation: cib4-ping 2.2s ease-in-out infinite;
        }
        @keyframes cib4-ping {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.20); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
        }

        /* ── Right: social column ────────────────────────── */
        .cib4-social-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 28px;
          border-left: 1px solid #f1f5f9;
          flex-shrink: 0;
        }

        .cib4-social-lbl {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #cbd5e1;
        }

        .cib4-social-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          transition: all 0.18s ease;
        }
        .cib4-social-btn:hover {
          color: #4f46e5;
          border-color: #c7d2fe;
          background: #eef2ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79,70,229,0.14);
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 1100px) {
          .cib4-wrap   { padding: 0 32px; }
          .cib4-stat   { padding: 22px 20px; gap: 12px; }
          .cib4-stat-sub { display: none; }
        }

        @media (max-width: 860px) {
          .cib4-wrap {
            padding: 0 24px;
            flex-direction: column;
          }
          .cib4-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .cib4-stat {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 20px 16px;
          }
          .cib4-stat:nth-child(odd)  { border-right: 1px solid #f1f5f9; }
          .cib4-stat:nth-child(3),
          .cib4-stat:nth-child(4)    { border-bottom: none; }
          .cib4-stat-sub             { display: block; }
          .cib4-social-col {
            flex-direction: row;
            border-left: none;
            border-top: 1px solid #f1f5f9;
            padding: 14px 16px;
            justify-content: flex-start;
            gap: 10px;
          }
        }

        @media (max-width: 520px) {
          .cib4-stats {
            grid-template-columns: 1fr;
          }
          .cib4-stat { border-right: none !important; }
          .cib4-stat:nth-child(3),
          .cib4-stat:nth-child(4) { border-bottom: 1px solid #f1f5f9; }
          .cib4-stat:last-child   { border-bottom: none; }
          .cib4-stat-sub { display: none; }
          .cib4-stat-value { font-size: 13.5px; }
          .cib4-wrap { padding: 0 16px; }
        }
      `}</style>

      <motion.div
        className="cib4-root"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="cib4-wrap">

          {/* ── Stat items ── */}
          <div className="cib4-stats">
            {STATS.map(({ Icon, label, value, sub, href, accent, soft, external, isStatus }, i) => {
              const Tag = href ? motion.a : motion.div;
              const linkProps = href
                ? { href, target: external ? "_blank" : undefined, rel: "noopener noreferrer" }
                : {};

              return (
                <Tag
                  key={label}
                  {...linkProps}
                  className={`cib4-stat${isStatus ? " no-link" : ""}`}
                  style={{
                    "--s-accent":    accent,
                    "--s-soft":      soft,
                    "--s-accent-12": `${accent}1e`,
                    "--s-accent-20": `${accent}33`,
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.08 + i * 0.07 }}
                >
                  <div className="cib4-stat-icon">
                    <Icon />
                  </div>
                  <div className="cib4-stat-body">
                    <span className="cib4-stat-label">{label}</span>
                    <span className="cib4-stat-value">
                      {isStatus && <span className="cib4-online-dot" />}
                      {value}
                    </span>
                    {sub && <span className="cib4-stat-sub">{sub}</span>}
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* ── Social column ── */}
          <motion.div
            className="cib4-social-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.38 }}
          >
            <span className="cib4-social-lbl">Follow</span>
            {SOCIALS.map(({ title, Icon, href }) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cib4-social-btn"
                aria-label={title}
                title={title}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}