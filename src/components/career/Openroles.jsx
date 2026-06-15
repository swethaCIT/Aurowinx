// components/career/OpenRoles.jsx
// Fully responsive: Mobile / Tablet / Laptop / TV
// Mobile: Horizontal snap carousel cards + slide-out filter drawer
// Tablet: 2-col grid + collapsible filter accordion
// Desktop: Original 3-col grid + filter panel
// TV: Wide 4-col layout

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { MapPin, Clock, Briefcase, SlidersHorizontal, X, ArrowRight, ChevronDown, Filter, Search } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { C, FONT, EASE } from "././theme";

/* ─── Breakpoint hook ─── */
function useBreakpoint() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return {
    isMobile:  w < 768,
    isTablet:  w >= 768 && w < 1024,
    isDesktop: w >= 1024,
    isTV:      w >= 1600,
    width: w,
  };
}

/* ─── Filter config ─── */
const FILTER_CONFIG = [
  {
    key: "location", label: "Location",
    options: [
      { v: "", l: "All Locations" },
      { v: "India",  l: "India"  },
      { v: "Remote", l: "Remote" },
    ],
  },
  {
    key: "domain", label: "Domain",
    options: [
      { v: "",                l: "All Domains"     },
      { v: "DFT",             l: "DFT"             },
      { v: "Verification",    l: "Verification"    },
      { v: "Physical Design", l: "Physical Design" },
    ],
  },
  {
    key: "employment_type", label: "Type",
    options: [
      { v: "",          l: "All Types" },
      { v: "Full Time", l: "Full Time" },
    ],
  },
];

/* ─── Domain badge colours ─── */
const domainStyle = (domain) => {
  const map = {
    "DFT":             { bg: "#eef2ff", text: "#4338ca", dot: C.primary   },
    "Verification":    { bg: "#f5f3ff", text: "#6d28d9", dot: C.secondary },
    "Physical Design": { bg: "#ede9fe", text: "#5b21b6", dot: C.accent    },
  };
  return map[domain] || { bg: C.bgAccent, text: C.primary, dot: C.accent };
};

/* ─── Skeleton card ─── */
function SkeletonCard({ compact }) {
  return (
    <div style={{
      background: C.bgWhite, borderRadius: 20,
      border: `1px solid ${C.border}`,
      padding: compact ? 20 : 28,
      flexShrink: 0,
    }}>
      {[["60%","12px"],["40%","8px"],["55%","8px"],["45%","8px"]].map(([w,h],i) => (
        <div key={i} style={{
          height: h, width: w,
          background: i === 0 ? C.accentSoft : C.bgSoft,
          borderRadius: 6, marginBottom: i < 3 ? 12 : 24,
          animation: "skPulse 1.5s ease-in-out infinite",
          animationDelay: `${i*0.1}s`,
        }} />
      ))}
      <div style={{ height: 40, background: C.accentSoft, borderRadius: 10, animation: "skPulse 1.5s ease-in-out infinite" }} />
    </div>
  );
}

/* ─── Job Card ─── */
function JobCard({ job, index, compact }) {
  const navigate = useNavigate();
  const dc = domainStyle(job.domain);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: C.bgWhite, borderRadius: 20,
        border: `1.5px solid ${hovered ? dc.dot : C.border}`,
        padding: compact ? "18px 20px" : 28,
        display: "flex", flexDirection: "column", gap: compact ? 12 : 16,
        boxShadow: hovered ? `0 12px 40px rgba(79,70,229,0.12)` : "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* Top row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing:"0.05em",
          background: dc.bg, color: dc.text,
          padding: "4px 10px", borderRadius: 100,
          display:"flex", alignItems:"center", gap:5,
        }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:dc.dot, display:"inline-block" }} />
          {job.domain}
        </span>
        <span style={{ fontSize:11, color:C.textMuted, fontWeight:500 }}>{job.employment_type}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:FONT, fontSize: compact ? 14 : 15,
        fontWeight:700, color:C.textPrimary,
        lineHeight:1.35, margin:0,
      }}>{job.job_title}</h3>

      {/* Meta */}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {[
          { Icon: MapPin,    text: job.location },
          { Icon: Clock,     text: `${job.experience_min}–${job.experience_max} yrs exp` },
          { Icon: Briefcase, text: job.employment_type },
        ].map(({ Icon, text }) => (
          <div key={text} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <Icon size={12} style={{ color:C.textMuted, flexShrink:0 }} />
            <span style={{ fontSize:12, color:C.textSecondary, fontWeight:500 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => navigate(`/careers/${job.slug}`)}
        whileHover={{ scale:1.02 }}
        whileTap={{ scale:0.97 }}
        onHoverStart={e => {
          e.target.style.background = C.gradPrimary;
          e.target.style.color = "#fff";
          e.target.style.borderColor = "transparent";
          e.target.style.boxShadow = "0 6px 20px rgba(79,70,229,0.28)";
        }}
        onHoverEnd={e => {
          e.target.style.background = "transparent";
          e.target.style.color = C.primary;
          e.target.style.borderColor = C.border;
          e.target.style.boxShadow = "none";
        }}
        style={{
          marginTop:"auto",
          width:"100%", padding: compact ? "10px 16px" : "12px 20px",
          borderRadius:12,
          border:`1.5px solid ${C.border}`,
          background:"transparent",
          color:C.primary, fontSize:13,
          fontWeight:600, cursor:"pointer",
          fontFamily:FONT,
          display:"flex", alignItems:"center",
          justifyContent:"center", gap:7,
          transition:"all 0.22s",
        }}
      >
        View Details
        <ArrowRight size={14} />
      </motion.button>
    </motion.div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      style={{
        textAlign:"center", padding:"60px 24px",
        background:C.bgLight, borderRadius:20,
        border:`1px solid ${C.border}`,
      }}
    >
      <div style={{ fontSize:44, marginBottom:14 }}>🔍</div>
      <h3 style={{ fontFamily:FONT, fontSize:18, fontWeight:700, color:C.textPrimary, marginBottom:8 }}>
        No positions found
      </h3>
      <p style={{ color:C.textMuted, fontSize:14, marginBottom:20 }}>
        Try adjusting your filters or check back soon.
      </p>
      <motion.button
        onClick={onReset}
        whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        style={{
          padding:"10px 24px", borderRadius:10,
          border:"none", background:C.gradPrimary,
          color:"#fff", fontSize:13,
          fontWeight:600, cursor:"pointer", fontFamily:FONT,
        }}
      >Clear All Filters</motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MOBILE FILTER — Slide-up drawer
══════════════════════════════════════ */
function MobileFilterDrawer({ filters, setFilter, resetFilters, isFiltered, open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={onClose}
            style={{
              position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
              zIndex:100, backdropFilter:"blur(4px)",
            }}
          />
          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y:"100%" }}
            animate={{ y:0 }}
            exit={{ y:"100%" }}
            transition={{ type:"spring", stiffness:320, damping:34 }}
            style={{
              position:"fixed", bottom:0, left:0, right:0,
              background:"#fff", borderRadius:"24px 24px 0 0",
              zIndex:101, padding:"0 20px 32px",
              boxShadow:"0 -12px 48px rgba(0,0,0,0.15)",
              maxHeight:"80vh", overflowY:"auto",
            }}
          >
            {/* Handle bar */}
            <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 16px" }}>
              <div style={{ width:36, height:4, borderRadius:2, background:"#e2e8f0" }} />
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <span style={{ fontFamily:FONT, fontWeight:700, fontSize:16, color:C.textPrimary }}>Filter Roles</span>
              <button onClick={onClose} style={{ border:"none", background:"none", cursor:"pointer", padding:4 }}>
                <X size={20} color={C.textMuted} />
              </button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {FILTER_CONFIG.map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily:FONT, fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:8 }}>
                    {f.label}
                  </label>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {f.options.map(o => {
                      const isOn = filters[f.key] === o.v;
                      return (
                        <motion.button
                          key={o.v}
                          onClick={() => setFilter(f.key, o.v)}
                          whileTap={{ scale:0.95 }}
                          style={{
                            padding:"8px 16px", borderRadius:100,
                            border:`1.5px solid ${isOn ? C.primary : C.border}`,
                            background: isOn ? "#eef2ff" : "#fff",
                            color: isOn ? C.primary : C.textSecondary,
                            fontFamily:FONT, fontSize:13, fontWeight: isOn ? 700 : 500,
                            cursor:"pointer", transition:"all 0.2s",
                          }}
                        >{o.l}</motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Exp range */}
              <div>
                <label style={{ fontFamily:FONT, fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:8 }}>
                  Experience (years)
                </label>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <input type="number" min={0} max={30} placeholder="Min" value={filters.minExp}
                    onChange={e => setFilter("minExp", e.target.value)}
                    style={{ flex:1, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${filters.minExp ? C.accent : C.border}`, fontFamily:FONT, fontSize:14, outline:"none" }}
                  />
                  <span style={{ color:C.textMuted, fontSize:13 }}>to</span>
                  <input type="number" min={0} max={30} placeholder="Max" value={filters.maxExp}
                    onChange={e => setFilter("maxExp", e.target.value)}
                    style={{ flex:1, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${filters.maxExp ? C.accent : C.border}`, fontFamily:FONT, fontSize:14, outline:"none" }}
                  />
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div style={{ display:"flex", gap:10, marginTop:24 }}>
              {isFiltered && (
                <button onClick={resetFilters}
                  style={{ flex:1, padding:"12px", borderRadius:12, border:`1.5px solid ${C.border}`, background:"#fff", color:C.primary, fontFamily:FONT, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Reset
                </button>
              )}
              <motion.button
                onClick={onClose}
                whileTap={{ scale:0.97 }}
                style={{ flex:2, padding:"12px", borderRadius:12, border:"none", background:C.gradPrimary, color:"#fff", fontFamily:FONT, fontSize:13, fontWeight:700, cursor:"pointer" }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════
   MOBILE LAYOUT
   Snap carousel + FAB filter button
══════════════════════════════════════ */
function MobileLayout({ jobs, loading, filters, setFilter, resetFilters, isFiltered }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef(null);

  // Sync dots on scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardW = el.offsetWidth - 32; // card width ~90% of container
    const idx = Math.round(el.scrollLeft / (cardW + 16));
    setActiveIdx(Math.max(0, Math.min(idx, jobs.length - 1)));
  }, [jobs.length]);

  return (
    <div>
      {/* ── Sticky filter bar ── */}
      <div style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(255,255,255,0.92)", backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,
        padding:"12px 16px",
        display:"flex", alignItems:"center", gap:10,
      }}>
        <motion.button
          onClick={() => setDrawerOpen(true)}
          whileTap={{ scale:0.96 }}
          style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"9px 16px", borderRadius:100,
            border:`1.5px solid ${isFiltered ? C.primary : C.border}`,
            background: isFiltered ? "#eef2ff" : "#fff",
            color: isFiltered ? C.primary : C.textSecondary,
            fontFamily:FONT, fontSize:13, fontWeight:600, cursor:"pointer",
          }}
        >
          <Filter size={14} />
          Filters
          {isFiltered && (
            <span style={{
              background:C.primary, color:"#fff",
              fontSize:10, fontWeight:700,
              width:18, height:18, borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {Object.values(filters).filter(v => v !== "").length}
            </span>
          )}
        </motion.button>

        {/* Active filter chips */}
        <div style={{ display:"flex", gap:6, overflowX:"auto", scrollbarWidth:"none", flex:1 }}>
          {FILTER_CONFIG.map(f => filters[f.key] ? (
            <motion.span
              key={f.key}
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.8, opacity:0 }}
              style={{
                flexShrink:0,
                display:"flex", alignItems:"center", gap:5,
                padding:"5px 10px", borderRadius:100,
                background:"#eef2ff", border:`1px solid #c7d2fe`,
                color:C.primary, fontSize:11, fontWeight:600, fontFamily:FONT,
                cursor:"pointer", whiteSpace:"nowrap",
              }}
              onClick={() => setFilter(f.key, "")}
            >
              {filters[f.key]}
              <X size={11} />
            </motion.span>
          ) : null)}
        </div>

        {/* Result count */}
        <span style={{ flexShrink:0, fontFamily:FONT, fontSize:12, color:C.textMuted }}>
          {loading ? "..." : `${jobs.length} open`}
        </span>
      </div>

      {/* ── Snap carousel ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display:"flex",
          overflowX:"auto", scrollSnapType:"x mandatory",
          scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
          gap:16, padding:"24px 16px 8px",
          msOverflowStyle:"none",
        }}
      >
        {loading
          ? [1,2].map(i => (
              <div key={i} style={{ flexShrink:0, width:"calc(100vw - 56px)", scrollSnapAlign:"start" }}>
                <SkeletonCard compact />
              </div>
            ))
          : jobs.length === 0
          ? <div style={{ width:"100%", paddingRight:16 }}><EmptyState onReset={resetFilters} /></div>
          : jobs.map((job, i) => (
              <div key={job.id} style={{ flexShrink:0, width:"calc(100vw - 56px)", scrollSnapAlign:"start" }}>
                <JobCard job={job} index={i} compact />
              </div>
            ))
        }
      </div>

      {/* ── Dots ── */}
      {!loading && jobs.length > 1 && (
        <div style={{ display:"flex", justifyContent:"center", gap:8, paddingBottom:24 }}>
          {jobs.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (el) {
                  const cardW = el.offsetWidth - 32;
                  el.scrollTo({ left: i * (cardW + 16), behavior:"smooth" });
                }
                setActiveIdx(i);
              }}
              animate={{ width: i === activeIdx ? 22 : 6, opacity: i === activeIdx ? 1 : 0.4 }}
              transition={{ duration:0.3 }}
              style={{
                height:6, borderRadius:50, border:"none", padding:0,
                background: C.primary, cursor:"pointer",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Slide-up filter drawer ── */}
      <MobileFilterDrawer
        filters={filters}
        setFilter={setFilter}
        resetFilters={resetFilters}
        isFiltered={isFiltered}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

/* ══════════════════════════════════════
   TABLET FILTER — Collapsible accordion
══════════════════════════════════════ */
function TabletFilterAccordion({ filters, setFilter, resetFilters, isFiltered }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background:C.bgLight, borderRadius:16,
      border:`1px solid ${C.border}`,
      marginBottom:28, overflow:"hidden",
    }}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:"100%", display:"flex", alignItems:"center",
          justifyContent:"space-between", padding:"16px 20px",
          background:"none", border:"none", cursor:"pointer",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:34, height:34, borderRadius:10,
            background:C.gradPrimary,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <SlidersHorizontal size={15} color="#fff" />
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:FONT, fontWeight:700, fontSize:14, color:C.textPrimary }}>
              Find Your Role
            </div>
            <div style={{ fontSize:11, color:C.textMuted }}>
              {isFiltered ? `${Object.values(filters).filter(v=>v!=="").length} filter(s) active` : "No filters applied"}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {isFiltered && (
            <AnimatePresence>
              <motion.button
                initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.85 }}
                onClick={e => { e.stopPropagation(); resetFilters(); }}
                style={{
                  display:"flex", alignItems:"center", gap:5,
                  padding:"6px 12px", borderRadius:8,
                  border:`1px solid ${C.border}`, background:C.bgWhite,
                  color:C.primary, fontSize:12, fontWeight:600,
                  cursor:"pointer", fontFamily:FONT,
                }}
              >
                <X size={11} /> Reset
              </motion.button>
            </AnimatePresence>
          )}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }}>
            <ChevronDown size={20} color={C.textMuted} />
          </motion.div>
        </div>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
            style={{ overflow:"hidden" }}
          >
            <div style={{
              padding:"0 20px 20px", borderTop:`1px solid ${C.border}`,
              display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
              gap:14, paddingTop:16,
            }}>
              {FILTER_CONFIG.map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily:FONT, fontSize:10, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:6 }}>
                    {f.label}
                  </label>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {f.options.map(o => {
                      const isOn = filters[f.key] === o.v;
                      return (
                        <motion.button
                          key={o.v}
                          onClick={() => setFilter(f.key, o.v)}
                          whileTap={{ scale:0.96 }}
                          style={{
                            textAlign:"left",
                            padding:"7px 12px", borderRadius:8,
                            border:`1.5px solid ${isOn ? C.primary : C.border}`,
                            background: isOn ? "#eef2ff" : "#fff",
                            color: isOn ? C.primary : C.textSecondary,
                            fontFamily:FONT, fontSize:12.5, fontWeight: isOn ? 700 : 400,
                            cursor:"pointer", transition:"all 0.18s",
                          }}
                        >
                          {isOn && <span style={{ marginRight:6, color:C.primary }}>✓</span>}
                          {o.l}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Exp range */}
              <div>
                <label style={{ fontFamily:FONT, fontSize:10, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:6 }}>
                  Experience
                </label>
                <div style={{ display:"flex", gap:8 }}>
                  {[["minExp","Min"],["maxExp","Max"]].map(([key,ph]) => (
                    <input key={key} type="number" min={0} max={30} placeholder={ph}
                      value={filters[key]}
                      onChange={e => setFilter(key, e.target.value)}
                      style={{
                        flex:1, padding:"8px 10px", borderRadius:8,
                        border:`1.5px solid ${filters[key] ? C.accent : C.border}`,
                        fontFamily:FONT, fontSize:13, outline:"none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════
   TABLET LAYOUT — 2-col grid + accordion
══════════════════════════════════════ */
function TabletLayout({ jobs, loading, filters, setFilter, resetFilters, isFiltered }) {
  return (
    <div>
      <TabletFilterAccordion filters={filters} setFilter={setFilter} resetFilters={resetFilters} isFiltered={isFiltered} />

      {/* Result count */}
      {!loading && (
        <div style={{ marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:13, color:C.textMuted, fontFamily:FONT }}>
            Showing <strong style={{ color:C.primary }}>{jobs.length}</strong> open position{jobs.length!==1?"s":""}
          </span>
          {isFiltered && <span style={{ fontSize:11, background:C.accentSoft, color:C.primary, padding:"3px 10px", borderRadius:100, fontWeight:600 }}>Filtered</span>}
        </div>
      )}

      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <AnimatePresence>
            {jobs.map((job,i) => <JobCard key={job.id} job={job} index={i} />)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   DESKTOP FILTER PANEL
══════════════════════════════════════ */
function DesktopFilterPanel({ filters, setFilter, resetFilters, isFiltered, isTV }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ delay:0.15, duration:0.6, ease:[0.22,1,0.36,1] }}
      style={{
        background:C.bgLight, borderRadius:20,
        border:`1px solid ${C.border}`,
        padding: isTV ? "28px 36px" : "24px 28px",
        marginBottom:36,
      }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:11, background:C.gradPrimary, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <SlidersHorizontal size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily:FONT, fontWeight:700, fontSize:15, color:C.textPrimary }}>Find Your Role</div>
            <div style={{ fontSize:12, color:C.textMuted }}>Filter positions by your preferences</div>
          </div>
        </div>
        <AnimatePresence>
          {isFiltered && (
            <motion.button
              initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.85 }}
              onClick={resetFilters}
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"8px 16px", borderRadius:10,
                border:`1px solid ${C.border}`, background:C.bgWhite,
                color:C.primary, fontSize:13, fontWeight:600,
                cursor:"pointer", fontFamily:FONT,
              }}
            >
              <X size={13} /> Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:12 }}>
        {FILTER_CONFIG.map(f => (
          <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{f.label}</label>
            <select value={filters[f.key]} onChange={e => setFilter(f.key, e.target.value)}
              style={{
                padding:"10px 36px 10px 14px", borderRadius:10,
                border:`1.5px solid ${filters[f.key] ? C.accent : C.border}`,
                background:C.bgWhite,
                color: filters[f.key] ? C.primary : C.textSecondary,
                fontSize:14, fontFamily:FONT,
                fontWeight: filters[f.key] ? 600 : 400,
                outline:"none", cursor:"pointer", appearance:"none",
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236366f1' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat:"no-repeat", backgroundPosition:"calc(100% - 12px) center",
                transition:"border-color 0.2s",
              }}
            >
              {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
        {[["minExp","Min Exp (yrs)","e.g. 2"],["maxExp","Max Exp (yrs)","e.g. 10"]].map(([key,label,ph]) => (
          <div key={key} style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>
            <input type="number" min={0} max={30} placeholder={ph} value={filters[key]}
              onChange={e => setFilter(key, e.target.value)}
              style={{
                padding:"10px 14px", borderRadius:10,
                border:`1.5px solid ${filters[key] ? C.accent : C.border}`,
                background:C.bgWhite, color:C.textPrimary,
                fontSize:14, fontFamily:FONT, outline:"none", transition:"border-color 0.2s",
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   DESKTOP LAYOUT
══════════════════════════════════════ */
function DesktopLayout({ jobs, loading, filters, setFilter, resetFilters, isFiltered, isTV }) {
  const cols = isTV ? "repeat(auto-fill, minmax(360px, 1fr))" : "repeat(auto-fill, minmax(320px, 1fr))";

  return (
    <div>
      <DesktopFilterPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} isFiltered={isFiltered} isTV={isTV} />

      {/* Result count */}
      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ marginBottom:24, display:"flex", alignItems:"center", gap:8 }}
          >
            <span style={{ fontSize:14, color:C.textMuted, fontFamily:FONT }}>
              Showing <strong style={{ color:C.primary }}>{jobs.length}</strong> open position{jobs.length!==1?"s":""}
            </span>
            {isFiltered && <span style={{ fontSize:11, background:C.accentSoft, color:C.primary, padding:"3px 10px", borderRadius:100, fontWeight:600 }}>Filtered</span>}
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:24 }}>
          {[1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:24 }}>
          <AnimatePresence>
            {jobs.map((job,i) => <JobCard key={job.id} job={job} index={i} />)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function OpenRoles() {
  const [filters, setFilters] = useState({ location:"", domain:"", employment_type:"", minExp:"", maxExp:"" });
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet, isDesktop, isTV } = useBreakpoint();

  const setFilter = (key, val) => setFilters(p => ({ ...p, [key]: val }));
  const resetFilters = () => setFilters({ location:"", domain:"", employment_type:"", minExp:"", maxExp:"" });
  const isFiltered = Object.values(filters).some(v => v !== "");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      let q = supabase.from("jobs").select("*").eq("status","open");
      if (filters.location)        q = q.eq("location",        filters.location);
      if (filters.domain)          q = q.eq("domain",          filters.domain);
      if (filters.employment_type) q = q.eq("employment_type", filters.employment_type);
      if (filters.minExp)          q = q.lte("experience_min", Number(filters.minExp));
      if (filters.maxExp)          q = q.gte("experience_max", Number(filters.maxExp));
      const { data, error } = await q;
      if (!error) setJobs(data || []);
      setLoading(false);
    };
    run();
  }, [filters]);

  const sectionPad = isMobile
    ? "72px 0 48px"
    : isTablet
    ? "80px 24px 56px"
    : isTV
    ? "120px 80px 100px"
    : "100px 24px";

  const maxW = isTV ? 1520 : 1100;

  return (
    <section id="open-roles" style={{ background:C.bgWhite, padding:sectionPad, fontFamily:FONT }}>
      <div style={{ maxWidth:maxW, margin:"0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
          style={{
            textAlign:"center",
            marginBottom: isMobile ? 28 : 52,
            padding: isMobile ? "0 16px" : 0,
          }}
        >
          <span style={{
            display:"inline-block", fontSize:11, fontWeight:700,
            letterSpacing:"0.14em", textTransform:"uppercase",
            color:C.primary, marginBottom:12,
          }}>Open Positions</span>
          <h2 style={{
            fontFamily:FONT,
            fontSize: isMobile ? "1.9rem" : isTablet ? "2.3rem" : isTV ? "3.6rem" : "clamp(2rem,4vw,2.8rem)",
            fontWeight:800, color:C.textPrimary,
            margin:"0 0 14px", letterSpacing:"-0.03em", lineHeight:1.1,
          }}>Explore Opportunities</h2>
          <p style={{
            color:C.textSecondary,
            fontSize: isMobile ? 14 : isTV ? 19 : 17,
            maxWidth:400, margin:"0 auto",
          }}>
            Join our engineering teams working on cutting-edge silicon technologies.
          </p>
        </motion.div>

        {/* ── Responsive layout switch ── */}
        {isMobile && (
          <MobileLayout
            jobs={jobs} loading={loading}
            filters={filters} setFilter={setFilter}
            resetFilters={resetFilters} isFiltered={isFiltered}
          />
        )}
        {isTablet && (
          <TabletLayout
            jobs={jobs} loading={loading}
            filters={filters} setFilter={setFilter}
            resetFilters={resetFilters} isFiltered={isFiltered}
          />
        )}
        {isDesktop && (
          <DesktopLayout
            jobs={jobs} loading={loading}
            filters={filters} setFilter={setFilter}
            resetFilters={resetFilters} isFiltered={isFiltered}
            isTV={isTV}
          />
        )}
      </div>

      <style>{`
        @keyframes skPulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}