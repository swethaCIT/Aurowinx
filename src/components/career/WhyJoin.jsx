import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { C, FONT, EASE } from "././theme";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";

/* ─── Breakpoint hook ─── */
function useBreakpoint() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024, isTV: w >= 1600, width: w };
}

/* ─── Data ─── */
const TICKER = [
  "Scan Chain Insertion","RTL Synthesis","Custom Layout Design","ASIC Tape-out",
  "STA & Timing Closure","Formal Verification","ATPG & Fault Coverage",
  "Power Analysis","Floor Planning","Clock Tree Synthesis",
];

const FEATURES = [
  {
    num:"01", label:"Silicon Mastery",
    heading:"End-to-end ownership\nof cutting-edge DFT & RTL",
    detail:"From spec to tape-out — every decision is yours. Sub-5nm physical design challenges that most engineers only read about.",
    stat:"12+", statLabel:"tape-outs / year",
    accent:"#4f46e5",
  },
  {
    num:"02", label:"Deep Mentorship",
    heading:"Principal engineers who\nactively invest in you",
    detail:"Weekly 1:1s with engineers who shipped silicon to billions of devices. Your growth is a KPI, not an afterthought.",
    stat:"94%", statLabel:"internal promotions",
    accent:"#7c3aed",
  },
  {
    num:"03", label:"Structured Growth",
    heading:"Certifications, talks\n& clear career ladders",
    detail:"EDA mastery programs, conference budgets, and published growth tracks so you always know what's next.",
    stat:"3×", statLabel:"faster progression",
    accent:"#6366f1",
  },
  {
    num:"04", label:"Real-World Impact",
    heading:"Your silicon ships in\nconsumer & industrial products",
    detail:"ICs you verify and route end up in automotive controllers, flagship SoCs, and smart infrastructure worldwide.",
    stat:"4B+", statLabel:"devices powered",
    accent:"#4f46e5",
  },
];

/* ─── Ticker ─── */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow:"hidden", borderBottom:"1px solid #c7d2fe", borderTop:"1px solid #c7d2fe", padding:"9px 0", background:"#eef2ff" }}>
      <style>{`
        @keyframes tk{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .tt{display:flex;width:max-content;animation:tk 28s linear infinite}
        .tt:hover{animation-play-state:paused}
      `}</style>
      <div className="tt" aria-hidden="true">
        {items.map((t, i) => (
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:14, paddingRight:28,
            fontFamily:FONT, fontWeight:600, fontSize:".68rem", letterSpacing:"1.5px",
            textTransform:"uppercase", color:"#4f46e5", whiteSpace:"nowrap",
          }}>
            {t}
            <svg width="3" height="3" viewBox="0 0 3 3"><circle cx="1.5" cy="1.5" r="1.5" fill="#818cf8"/></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── MOBILE: Swipe Carousel + Accordion detail ─── */
function MobileFeatures({ features, inView }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const startX = useRef(null);

  const go = useCallback((idx) => {
    setActive(idx);
    setExpanded(false);
  }, []);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && active < features.length - 1) go(active + 1);
      else if (diff < 0 && active > 0) go(active - 1);
    }
    startX.current = null;
  };

  const item = features[active];

  return (
    <div style={{ padding:"0 16px 40px", display:"flex", flexDirection:"column", gap:20 }}>

      {/* Progress bar */}
      <div style={{ display:"flex", gap:6 }}>
        {features.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scaleX: i === active ? 1 : 0.3, opacity: i === active ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            onClick={() => go(i)}
            style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i === active ? item.accent : "#c7d2fe",
              cursor: "pointer", transformOrigin: "left",
            }}
          />
        ))}
      </div>

      {/* Swipeable card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            background: "#fff",
            border: `1px solid #e2e8f0`,
            borderTop: `3px solid ${item.accent}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
          }}
        >
          {/* Card top — always visible */}
          <div
            onClick={() => setExpanded(e => !e)}
            style={{ padding:"20px 20px 16px", cursor:"pointer", userSelect:"none" }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{
                  fontFamily:FONT, fontWeight:800, fontSize:".58rem", letterSpacing:"2.8px",
                  textTransform:"uppercase", color: item.accent,
                }}>{item.num}</span>
                <div style={{ width:24, height:1, background:"#c7d2fe" }} />
                <span style={{
                  fontFamily:FONT, fontWeight:600, fontSize:".6rem", letterSpacing:"1.4px",
                  textTransform:"uppercase", color:"#94a3b8",
                }}>{item.label}</span>
              </div>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration:0.25 }}>
                <ChevronDown size={18} color="#94a3b8" />
              </motion.div>
            </div>

            <h3 style={{
              fontFamily:FONT, fontWeight:700, fontSize:"1.15rem", color:"#0f172a",
              lineHeight:1.25, letterSpacing:"-.3px", whiteSpace:"pre-line", margin:"0 0 10px",
            }}>{item.heading}</h3>

            {/* Stat — always visible */}
            <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{
                fontFamily:FONT, fontWeight:800, fontSize:"2rem", lineHeight:1,
                letterSpacing:"-1.5px",
                background:`linear-gradient(135deg,${item.accent},#7c3aed)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>{item.stat}</span>
              <span style={{
                fontFamily:FONT, fontSize:".62rem", fontWeight:600, letterSpacing:"1.3px",
                textTransform:"uppercase", color:"#94a3b8",
              }}>{item.statLabel}</span>
            </div>
          </div>

          {/* Accordion detail */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="exp"
                initial={{ height:0, opacity:0 }}
                animate={{ height:"auto", opacity:1 }}
                exit={{ height:0, opacity:0 }}
                transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
                style={{ overflow:"hidden" }}
              >
                <div style={{
                  padding:"14px 20px 20px",
                  borderTop:"1px solid #e2e8f0",
                }}>
                  <p style={{
                    fontFamily:FONT, fontSize:".82rem", color:"#475569",
                    lineHeight:1.72, margin:"0 0 16px",
                  }}>{item.detail}</p>
                  <motion.button
                    whileTap={{ scale:0.97 }}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:6,
                      padding:"9px 18px", borderRadius:100,
                      background:`linear-gradient(135deg,${item.accent},#7c3aed)`,
                      color:"#fff", border:"none",
                      fontFamily:FONT, fontSize:".72rem", fontWeight:700,
                      letterSpacing:".4px", cursor:"pointer",
                    }}
                  >
                    Learn more <ArrowUpRight size={13} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Dot nav + counter */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:8 }}>
          {features.map((d, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: active===i ? 22 : 6, height:6, borderRadius:50, border:"none", padding:0,
                background: active===i ? item.accent : "#c7d2fe",
                cursor:"pointer",
                transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>
        <span style={{ fontFamily:FONT, fontSize:".62rem", fontWeight:500, color:"#94a3b8", letterSpacing:".06em" }}>
          {active+1} / {features.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display:"flex", gap:8,
        overflowX:"auto", scrollSnapType:"x mandatory",
        scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
        paddingBottom:4,
      }}>
        {features.map((f, i) => (
          <motion.button
            key={i}
            onClick={() => go(i)}
            whileTap={{ scale:0.95 }}
            style={{
              flexShrink:0, scrollSnapAlign:"start",
              display:"flex", flexDirection:"column", alignItems:"center", gap:4,
              padding:"10px 14px", borderRadius:12,
              background: active===i ? "#eef2ff" : "#f8fafc",
              border:`1px solid ${active===i ? f.accent+"44" : "#e2e8f0"}`,
              cursor:"pointer", transition:"all 0.22s",
            }}
          >
            <span style={{
              fontFamily:FONT, fontWeight:800, fontSize:"1rem", lineHeight:1,
              background:`linear-gradient(135deg,${f.accent},#7c3aed)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>{f.stat}</span>
            <span style={{
              fontFamily:FONT, fontSize:".55rem", fontWeight:600, letterSpacing:"1px",
              textTransform:"uppercase",
              color: active===i ? f.accent : "#94a3b8",
              whiteSpace:"nowrap",
            }}>{f.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── TABLET: Horizontal tab rail + stacked detail panel ─── */
function TabletFeatures({ features, inView }) {
  const [active, setActive] = useState(0);
  const item = features[active];

  return (
    <div>
      {/* Tab rail */}
      <div style={{
        display:"flex", overflowX:"auto",
        scrollSnapType:"x mandatory", scrollbarWidth:"none",
        background:"#f8fafc", borderBottom:"1px solid #c7d2fe",
      }}>
        {features.map((f, i) => {
          const isOn = active===i;
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity:0, y:-8 }}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.4, delay:i*0.07, ease:[0.22,1,0.36,1] }}
              style={{
                flexShrink:0, scrollSnapAlign:"start",
                display:"flex", flexDirection:"column", alignItems:"flex-start", gap:6,
                padding:"16px 24px",
                background: isOn ? "#fff" : "transparent",
                border:"none",
                borderBottom: `2px solid ${isOn ? f.accent : "transparent"}`,
                cursor:"pointer", transition:"all 0.22s", position:"relative",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{
                  fontFamily:FONT, fontWeight:800, fontSize:".58rem", letterSpacing:"2px",
                  textTransform:"uppercase", color: isOn ? f.accent : "#94a3b8",
                  transition:"color 0.22s",
                }}>{f.num}</span>
                <span style={{
                  fontFamily:FONT, fontWeight:600, fontSize:".6rem", letterSpacing:"1.2px",
                  textTransform:"uppercase", color: isOn ? f.accent : "#94a3b8",
                  transition:"color 0.22s",
                }}>{f.label}</span>
              </div>
              <div style={{
                fontFamily:FONT, fontWeight:800,
                fontSize:"clamp(1.3rem,2vw,1.6rem)", lineHeight:1,
                letterSpacing:"-1px",
                background: isOn ? `linear-gradient(135deg,${f.accent},#7c3aed)` : "none",
                WebkitBackgroundClip: isOn ? "text" : "unset",
                WebkitTextFillColor: isOn ? "transparent" : "#0f172a",
                backgroundClip: isOn ? "text" : "unset",
                color: isOn ? undefined : "#cbd5e1",
                transition:"all 0.22s",
              }}>{f.stat}</div>
              {isOn && (
                <motion.div
                  layoutId="tabletLine"
                  style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:f.accent, borderRadius:"2px 2px 0 0" }}
                  transition={{ type:"spring", stiffness:400, damping:30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity:0, y:14 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-10 }}
          transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
          style={{
            background:"#fff", padding:"28px 28px",
            display:"grid", gridTemplateColumns:"1fr auto",
            gap:24, alignItems:"center",
            borderBottom:"1px solid #c7d2fe",
            position:"relative", overflow:"hidden",
          }}
        >
          {/* Ghost num */}
          <span style={{
            position:"absolute", right:-8, bottom:-12,
            fontFamily:FONT, fontWeight:900, fontSize:"8rem", lineHeight:1,
            letterSpacing:-4, color:"#f1f5f9",
            userSelect:"none", pointerEvents:"none",
          }}>{item.num}</span>

          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:item.accent, display:"inline-block" }} />
              <span style={{ fontFamily:FONT, fontWeight:700, fontSize:".6rem", letterSpacing:"2px", textTransform:"uppercase", color:item.accent }}>{item.label}</span>
            </div>
            <h3 style={{
              fontFamily:FONT, fontWeight:700, fontSize:"clamp(1.1rem,2vw,1.4rem)",
              color:"#0f172a", lineHeight:1.25, letterSpacing:"-.3px",
              whiteSpace:"pre-line", margin:"0 0 12px",
            }}>{item.heading}</h3>
            <p style={{ fontFamily:FONT, fontSize:".83rem", color:"#475569", lineHeight:1.72, margin:"0 0 16px", maxWidth:480 }}>{item.detail}</p>
            <motion.button
              whileTap={{ scale:0.97 }} whileHover={{ opacity:0.88 }}
              style={{
                display:"inline-flex", alignItems:"center", gap:6,
                padding:"9px 20px", borderRadius:100,
                background:`linear-gradient(135deg,${item.accent},#7c3aed)`,
                color:"#fff", border:"none",
                fontFamily:FONT, fontSize:".72rem", fontWeight:700,
                letterSpacing:".4px", cursor:"pointer",
              }}
            >
              Explore this benefit <ArrowRight size={13} />
            </motion.button>
          </div>

          <div style={{ position:"relative", zIndex:1, textAlign:"right", flexShrink:0 }}>
            <div style={{
              fontFamily:FONT, fontWeight:800, fontSize:"clamp(2.2rem,4vw,3rem)",
              lineHeight:1, letterSpacing:"-1.5px",
              background:`linear-gradient(135deg,${item.accent},#7c3aed)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              marginBottom:4,
            }}>{item.stat}</div>
            <div style={{ fontFamily:FONT, fontSize:".62rem", fontWeight:600, letterSpacing:"1.2px", textTransform:"uppercase", color:"#94a3b8", maxWidth:110, marginLeft:"auto" }}>
              {item.statLabel}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── DESKTOP: Original row layout, enhanced for TV ─── */
function DesktopFeatureRow({ item, index, inView, isTV }) {
  const ref = useRef(null);
  const rowInView = useInView(ref, { once:true, margin:"-30px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:16 }}
      animate={rowInView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay:index*0.07, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"grid",
        gridTemplateColumns: isTV ? "1fr 340px" : "1fr 1fr",
        borderBottom:"1px solid #c7d2fe",
        position:"relative",
        background: hovered ? "#eef2ff" : index%2===0 ? "#ffffff" : "#f8fafc",
        transition:"background 0.2s",
      }}
    >
      {/* Hover bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
        style={{
          position:"absolute", top:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg,${item.accent},#7c3aed)`,
          transformOrigin:"left", pointerEvents:"none",
        }}
      />

      {/* Left */}
      <div style={{
        padding:`${isTV?"32px":"20px"} clamp(16px,${isTV?"5vw":"3vw"},${isTV?"64px":"44px"})`,
        borderRight:"1px solid #c7d2fe",
        display:"flex", flexDirection:"column", gap:10, justifyContent:"center",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:FONT, fontWeight:800, fontSize:".6rem", letterSpacing:"2.8px", textTransform:"uppercase", color:item.accent }}>{item.num}</span>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#c7d2fe,transparent)" }} />
          <span style={{ fontFamily:FONT, fontWeight:600, fontSize:".62rem", letterSpacing:"1.6px", textTransform:"uppercase", color:"#94a3b8" }}>{item.label}</span>
        </div>
        <h3 style={{
          fontFamily:FONT, fontWeight:700,
          fontSize: isTV ? "1.6rem" : "clamp(1rem,1.9vw,1.3rem)",
          color:"#0f172a", lineHeight:1.25, letterSpacing:"-.35px", whiteSpace:"pre-line",
        }}>{item.heading}</h3>
        <p style={{
          fontFamily:FONT, fontSize: isTV ? ".95rem" : "clamp(.78rem,.92vw,.86rem)",
          color:"#475569", lineHeight:1.72, maxWidth:480, margin:0,
        }}>{item.detail}</p>
      </div>

      {/* Right */}
      <div style={{
        padding:`${isTV?"32px":"20px"} clamp(16px,3vw,44px)`,
        display:"flex", alignItems:"center", justifyContent:"flex-end",
        position:"relative", overflow:"hidden",
      }}>
        <span style={{
          position:"absolute", right:-8, bottom:-10,
          fontFamily:FONT, fontWeight:900,
          fontSize: isTV ? "11rem" : "clamp(5rem,10vw,8rem)",
          lineHeight:1, letterSpacing:-4,
          color:index%2===0?"#f1f5f9":"#e8edf2",
          userSelect:"none", pointerEvents:"none",
        }}>{item.num}</span>
        <div style={{ position:"relative", zIndex:1, textAlign:"right" }}>
          <div style={{
            fontFamily:FONT, fontWeight:800,
            fontSize: isTV ? "3.8rem" : "clamp(2rem,4vw,3rem)",
            lineHeight:1, letterSpacing:"-1.5px",
            background:`linear-gradient(135deg,${item.accent},#7c3aed)`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            marginBottom:4,
          }}>{item.stat}</div>
          <div style={{
            fontFamily:FONT, fontSize: isTV ? ".75rem" : ".63rem", fontWeight:600,
            letterSpacing:"1.3px", textTransform:"uppercase", color:"#94a3b8",
            maxWidth:130, marginLeft:"auto", lineHeight:1.4,
          }}>{item.statLabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function WhyJoin() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-40px" });
  const { isMobile, isTablet, isDesktop, isTV } = useBreakpoint();

  const hPad = isMobile ? "36px 16px 24px" : isTablet ? "40px 24px 28px" : isTV ? "56px 80px 36px" : "36px clamp(18px,4vw,56px) 28px";

  return (
    <section id="life-at-aurowinx" style={{ background:"#ffffff", overflow:"hidden" }}>

      {/* ── Header ── */}
      <div ref={ref} style={{
        background:"#eef2ff", borderBottom:"1px solid #c7d2fe",
        padding: hPad, position:"relative", overflow:"hidden",
      }}>
        <div aria-hidden="true" style={{
          position:"absolute", right:-60, top:-80, width:340, height:340,
          borderRadius:"50%", background:"radial-gradient(circle,#c7d2fe 0%,transparent 65%)",
          opacity:.5, pointerEvents:"none",
        }} />

        <div style={{
          maxWidth: isTV ? 1520 : 1100, margin:"0 auto",
          display:"flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 20 : "clamp(20px,4vw,56px)",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent:"space-between",
          position:"relative", zIndex:1,
        }}>
          <div style={{ flex:1 }}>
            <motion.div initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, ease:[0.22,1,0.36,1] }}
              style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <motion.span initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{}}
                transition={{ duration:.6, delay:.15 }}
                style={{ display:"block", width:28, height:2, background:"linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius:2, transformOrigin:"left", flexShrink:0 }}
              />
              <span style={{ fontFamily:FONT, fontWeight:700, fontSize:".64rem", letterSpacing:"2.4px", textTransform:"uppercase", color:"#4f46e5" }}>Life at AurowinX</span>
            </motion.div>

            <motion.h2 initial={{ opacity:0, y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:.1 }}
              style={{
                fontFamily:FONT, fontWeight:800,
                fontSize: isMobile ? "1.85rem" : isTablet ? "2.2rem" : isTV ? "3.6rem" : "clamp(1.75rem,4vw,2.9rem)",
                color:"#0f172a", lineHeight:1.1, letterSpacing:-1, marginBottom:10,
              }}>
              Why engineers{" "}
              <span style={{ background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>choose AurowinX</span>
            </motion.h2>

            <motion.p initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:.18 }}
              style={{ fontFamily:FONT, fontSize: isMobile ? ".85rem" : ".92rem", color:"#475569", lineHeight:1.7, maxWidth:460 }}>
              Silicon from first principles. Craft, depth, and work that ships at scale.
            </motion.p>
          </div>

          <motion.div initial={{ opacity:0, x:16 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.5, delay:.22 }}
            style={{ display:"flex", gap: isMobile ? 20 : 32, alignItems:"center", flexShrink:0 }}>
            {[["150+","engineers"],["20+ yr","team expertise"]].map(([v,l],i) => (
              <div key={l} style={{ textAlign:"right", ...(i===0?{paddingRight: isMobile?16:32, borderRight:"1px solid #c7d2fe"}:{}) }}>
                <div style={{
                  fontFamily:FONT, fontWeight:800,
                  fontSize: isMobile ? "1.6rem" : isTV ? "2.6rem" : "clamp(1.6rem,2.5vw,2.1rem)",
                  letterSpacing:-1, lineHeight:1,
                  background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>{v}</div>
                <div style={{ fontFamily:FONT, fontSize:".65rem", fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", color:"#94a3b8", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <Ticker />

      {/* ── Feature section ── */}
      <div style={{ borderTop:"1px solid #c7d2fe", maxWidth: isTV ? 1600 : "none", margin:"0 auto" }}>
        {isMobile && <MobileFeatures features={FEATURES} inView={inView} />}
        {isTablet && <TabletFeatures features={FEATURES} inView={inView} />}
        {isDesktop && FEATURES.map((item, i) => (
          <DesktopFeatureRow key={item.num} item={item} index={i} inView={inView} isTV={isTV} />
        ))}
      </div>

      {/* ── CTA strip ── */}
      <div style={{
        background:"#0f172a",
        padding: isMobile ? "24px 16px" : isTV ? "32px 80px" : "24px clamp(18px,4vw,56px)",
        display:"flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent:"space-between",
        gap: isMobile ? 16 : 20,
        flexWrap:"wrap",
      }}>
        <div>
          <div style={{
            fontFamily:FONT, fontWeight:800,
            fontSize: isMobile ? "1rem" : isTV ? "1.7rem" : "clamp(1rem,2.2vw,1.45rem)",
            color:"#fff", letterSpacing:"-.4px", lineHeight:1.2,
          }}>
            Ready to build something{" "}
            <span style={{ background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>that matters?</span>
          </div>
          <p style={{ fontFamily:FONT, fontSize:".78rem", color:"#64748b", marginTop:4 }}>
            Open roles in DFT, RTL, Physical Design and more.
          </p>
        </div>
        <div style={{ display:"flex", gap:8, flexShrink:0, flexWrap:"wrap" }}>
          <motion.button whileHover={{ opacity:.88 }} whileTap={{ scale:.97 }}
            style={{
              fontFamily:FONT, fontWeight:700, fontSize:".78rem", letterSpacing:".4px",
              padding:"10px 22px", borderRadius:100,
              background:C.gradPrimary, color:"#fff", border:"none", cursor:"pointer",
            }}>
            View open roles →
          </motion.button>
          <motion.button whileHover={{ borderColor:"rgba(255,255,255,.5)" }} whileTap={{ scale:.97 }}
            style={{
              fontFamily:FONT, fontWeight:600, fontSize:".78rem", padding:"10px 20px",
              borderRadius:100, background:"transparent", color:"#fff",
              border:"1px solid rgba(255,255,255,.2)", cursor:"pointer",
            }}>
            Life at AurowinX
          </motion.button>
        </div>
      </div>
    </section>
  );
}