// src/components/products/CapabilityShowcase.jsx
// Desktop/TV capability display — an auto-advancing rail (left) + spotlight
// panel (right), reading as a designed product feature showcase rather than
// a plain card grid. The panel carries a large watermark icon so its height
// (matched to the rail) never reads as empty. Mobile/tablet keep the
// swipeable CapabilityCarousel instead (this component is hidden below 1024px).

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FONT, EASE } from "./theme";

export default function CapabilityShowcase({ items, accent, accentSoft, accentBorder }) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % items.length);
    }, 4200);
    return () => clearInterval(id);
  }, [items.length]);

  const item = items[active];
  const Icon = item.icon;

  return (
    <div
      className="cap-showcase"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="cap-showcase-rail" style={{ border: `1px solid ${accentBorder}` }}>
        {items.map((it, i) => {
          const RowIcon = it.icon;
          const isActive = i === active;
          return (
            <button
              key={it.title}
              className="cap-showcase-row"
              onClick={() => setActive(i)}
              style={{
                background: isActive ? accentSoft : "transparent",
                borderLeft: `3px solid ${isActive ? accent : "transparent"}`,
              }}
            >
              <span className="cap-showcase-row-icon" style={{ background: isActive ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.04)", color: isActive ? accent : "#94a3b8" }}>
                <RowIcon style={{ width: 16, height: 16 }} strokeWidth={1.8} />
              </span>
              <span className="cap-showcase-row-title" style={{ color: isActive ? "#0f172a" : "#64748b", fontWeight: isActive ? 800 : 600, fontFamily: FONT }}>
                {it.title}
              </span>
              <span className="cap-showcase-row-index" style={{ color: accent, opacity: isActive ? 0.65 : 0.22 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {isActive && (
                <motion.div
                  key={active}
                  className="cap-showcase-row-track"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4.2, ease: "linear" }}
                  style={{ background: accent, transformOrigin: "left" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="cap-showcase-panel" style={{ border: `1px solid ${accentBorder}` }}>
        <div className="cap-showcase-panel-glow" style={{ background: `radial-gradient(circle,${accentSoft} 0%,transparent 70%)` }} />
        <AnimatePresence>
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="cap-showcase-watermark"
          >
            <Icon style={{ width: "100%", height: "100%", color: accent }} strokeWidth={1} />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="cap-showcase-panel-inner"
          >
            <div className="cap-showcase-panel-icon" style={{ background: accentSoft }}>
              <Icon style={{ width: 30, height: 30, color: accent }} strokeWidth={1.6} />
            </div>
            <span className="cap-showcase-panel-index" style={{ color: accent }}>
              Discipline {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <h4 className="cap-showcase-panel-title">{item.title}</h4>
            <p className="cap-showcase-panel-body">{item.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .cap-showcase { display: none; }
        @media (min-width: 1024px) {
          .cap-showcase {
            display: grid;
            grid-template-columns: clamp(260px, 26vw, 340px) 1fr;
            gap: 24px;
            align-items: stretch;
          }
        }
        .cap-showcase-rail {
          display: flex; flex-direction: column;
          border-radius: 20px; overflow: hidden;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        }
        .cap-showcase-row {
          position: relative;
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border: none; text-align: left;
          font-family: inherit; cursor: pointer;
          transition: background 0.25s ease;
        }
        .cap-showcase-row-icon {
          width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .cap-showcase-row-title { flex: 1; font-size: 13.5px; }
        .cap-showcase-row-index { font-size: 10px; font-weight: 700; letter-spacing: 0.04em; }
        .cap-showcase-row-track { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; }

        .cap-showcase-panel {
          position: relative; overflow: hidden;
          border-radius: 24px; padding: clamp(28px,3vw,44px);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center;
        }
        .cap-showcase-panel-glow { position: absolute; top: -20%; right: -10%; width: 60%; height: 140%; pointer-events: none; }
        .cap-showcase-watermark {
          position: absolute; right: clamp(-40px,-4vw,-10px); bottom: clamp(-40px,-4vw,-10px);
          width: clamp(160px,16vw,220px); height: clamp(160px,16vw,220px);
          opacity: 0.07; pointer-events: none;
        }
        .cap-showcase-panel-inner { position: relative; max-width: 480px; }
        .cap-showcase-panel-icon {
          width: 60px; height: 60px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .cap-showcase-panel-index {
          display: block; margin-bottom: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .cap-showcase-panel-title {
          margin: 0 0 12px; font-size: clamp(22px,2.2vw,28px); font-weight: 900;
          color: #0f172a; letter-spacing: -0.02em; font-family: ${FONT};
        }
        .cap-showcase-panel-body {
          margin: 0; font-size: 14.5px; line-height: 1.75; color: #475569; font-family: ${FONT};
        }
      `}</style>
    </div>
  );
}
