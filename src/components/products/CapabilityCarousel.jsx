// src/components/products/CapabilityCarousel.jsx
// Mobile/tablet: swipeable one-screen carousel (native scroll-snap + arrows + progress bar).
// Hidden at 1024px+ — desktop/TV use CapabilityShowcase.jsx instead.

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FONT } from "./theme";

function TiltCard({ item, index, accent, accentSoft, accentBorder }) {
  const Icon = item.icon;
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 300, damping: 22 });
  const ry = useSpring(mx, { stiffness: 300, damping: 22 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left - r.width / 2) / r.width) * 10);
    my.set(((e.clientY - r.top - r.height / 2) / r.height) * -10);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      className="cap-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.36) }}
      style={{
        rotateX: rx, rotateY: ry, perspective: 800, transformStyle: "preserve-3d",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${accentBorder}`,
        borderRadius: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", transform: "translateZ(28px)" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: accentSoft, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon style={{ width: 20, height: 20, color: accent }} strokeWidth={1.8} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent, opacity: 0.4, letterSpacing: "0.04em" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h4 style={{
        margin: "14px 0 8px", fontSize: "clamp(14px,1.6vw,16px)", fontWeight: 800,
        color: "#0f172a", fontFamily: FONT, transform: "translateZ(18px)",
        overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2,
      }}>
        {item.title}
      </h4>
      <p style={{
        margin: 0, fontSize: "clamp(11.5px,1.2vw,13px)", lineHeight: 1.6,
        color: "#64748b", fontFamily: FONT, transform: "translateZ(10px)",
        overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 4,
      }}>
        {item.body}
      </p>
    </motion.div>
  );
}

export default function CapabilityCarousel({ items, accent, accentSoft, accentBorder }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 0 : el.scrollLeft / max);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".cap-carousel-slide");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="cap-root">
      {/* Mobile/tablet — swipeable, keeps the section to one screen */}
      <div className="cap-carousel">
        <div className="cap-carousel-track" ref={trackRef}>
          {items.map((item, i) => (
            <div className="cap-carousel-slide" key={item.title}>
              <TiltCard item={item} index={i} accent={accent} accentSoft={accentSoft} accentBorder={accentBorder} />
            </div>
          ))}
        </div>

        <div className="cap-carousel-controls">
          <button aria-label="Previous" onClick={() => scrollByCard(-1)} className="cap-carousel-btn" style={{ color: accent, borderColor: accentBorder }}>
            <ChevronLeft style={{ width: 16, height: 16 }} />
          </button>
          <div className="cap-carousel-progress-track">
            <div className="cap-carousel-progress-fill" style={{ width: `${Math.max(8, progress * 100)}%`, background: accent }} />
          </div>
          <button aria-label="Next" onClick={() => scrollByCard(1)} className="cap-carousel-btn" style={{ color: accent, borderColor: accentBorder }}>
            <ChevronRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>

      <style>{`
        .cap-carousel { display: flex; flex-direction: column; gap: 16px; }
        .cap-carousel-track {
          display: flex; gap: 16px;
          overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; scrollbar-width: none;
          padding: 4px 2px;
        }
        .cap-carousel-track::-webkit-scrollbar { display: none; }
        .cap-carousel-slide {
          scroll-snap-align: center;
          flex: 0 0 86%;
          min-width: 0;
        }
        .cap-card {
          height: auto; min-height: 175px;
          padding: clamp(16px, 2.2vw, 22px);
          display: flex; flex-direction: column;
          box-shadow: 0 4px 20px rgba(15,23,42,0.06);
          overflow: hidden;
        }
        .cap-carousel-controls { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .cap-carousel-btn {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid; background: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .cap-carousel-progress-track { flex: 1; height: 3px; border-radius: 2px; background: rgba(15,23,42,0.08); overflow: hidden; }
        .cap-carousel-progress-fill { height: 100%; border-radius: 2px; transition: width 0.15s ease; }

        @media (min-width: 640px) {
          .cap-carousel-slide { flex-basis: 47%; }
        }

        @media (min-width: 1024px) {
          .cap-carousel { display: none; }
        }
      `}</style>
    </div>
  );
}
