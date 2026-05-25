import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Menu, X, ArrowRight,
  Cpu, Microscope, Activity, Microchip, Layers,
  Wrench, Fingerprint, Zap, Lightbulb, Network
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const solutions = [
  {
    icon: Cpu,
    name: 'Semiconductor Design',
    description: 'Advanced SoC and ASIC engineering capabilities with multi-process node support.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    accent: '#38bdf8',
    glowA: 'rgba(56,189,248,0.45)',
    glowB: 'rgba(14,165,233,0.25)',
    tag: 'SoC / ASIC',
    headline: 'Silicon at Scale.',
    sub: 'Delivering Precision.',
    body: 'From architecture exploration to tapeout, our design teams bring decades of silicon expertise across advanced nodes.',
  },
  {
    icon: Activity,
    name: 'Design Verification',
    description: 'Comprehensive pre-silicon validation using formal, simulation, and emulation.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    accent: '#818cf8',
    glowA: 'rgba(129,140,248,0.45)',
    glowB: 'rgba(99,102,241,0.25)',
    tag: 'Verification',
    headline: 'Zero Escape.',
    sub: 'Total Coverage.',
    body: 'Layered verification flows combining UVM, formal methods, and hardware emulation to eliminate functional risk.',
  },
  {
    icon: Microscope,
    name: 'DFT Engineering',
    description: 'Design for testability and structural yield improvement methodologies.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    accent: '#c084fc',
    glowA: 'rgba(192,132,252,0.45)',
    glowB: 'rgba(168,85,247,0.25)',
    tag: 'DFT / ATPG',
    headline: 'Test-Ready.',
    sub: 'Yield-Proven.',
    body: 'Structural scan, BIST, boundary scan, and ATPG solutions that maximise test coverage while minimising area overhead.',
  },
  {
    icon: Layers,
    name: 'Physical Design',
    description: 'RTL to GDSII execution from architecture to tapeout, any node.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    accent: '#22d3ee',
    glowA: 'rgba(34,211,238,0.45)',
    glowB: 'rgba(6,182,212,0.25)',
    tag: 'PD / PnR',
    headline: 'Layout. Verify.',
    sub: 'Ship.',
    body: 'Floorplanning, place & route, timing closure and sign-off for cutting-edge process nodes with world-class turnaround.',
  },
  {
    icon: Microchip,
    name: 'Analog & IP Solutions',
    description: 'Custom mixed-signal block design, characterisation, and IP hardening.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    accent: '#2dd4bf',
    glowA: 'rgba(45,212,191,0.45)',
    glowB: 'rgba(20,184,166,0.25)',
    tag: 'AMS / IP',
    headline: 'Mixed-Signal.',
    sub: 'Precision Built.',
    body: 'High-performance PLLs, SerDes, ADC/DAC and custom analog IP with silicon-proven reliability across voltage domains.',
  },
];

const products = [
  {
    icon: Wrench,
    name: 'Product Engineering',
    description: 'End-to-end hardware product lifecycle management from concept to production.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    accent: '#38bdf8',
    glowA: 'rgba(56,189,248,0.45)',
    glowB: 'rgba(14,165,233,0.25)',
    tag: 'Hardware / PLM',
    headline: 'Concept to.',
    sub: 'Production.',
    body: 'Integrated product development covering system architecture, EVT/DVT/PVT cycles and mass-production readiness.',
  },
  {
    icon: Zap,
    name: 'Embedded Systems',
    description: 'Firmware, RTOS, and micro-architecture solutions for resource-constrained targets.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    accent: '#facc15',
    glowA: 'rgba(250,204,21,0.45)',
    glowB: 'rgba(234,179,8,0.25)',
    tag: 'Firmware / RTOS',
    headline: 'Bare Metal.',
    sub: 'Real-Time.',
    body: 'BSP bring-up, driver stacks, power management and RTOS porting for ARM, RISC-V, and proprietary cores.',
  },
  {
    icon: Fingerprint,
    name: 'IoT & Automation',
    description: 'Intelligent edge computing and smart grid architectures at industrial scale.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    accent: '#22d3ee',
    glowA: 'rgba(34,211,238,0.45)',
    glowB: 'rgba(6,182,212,0.25)',
    tag: 'Edge / IoT',
    headline: 'Connected.',
    sub: 'Autonomous.',
    body: 'Edge AI inference pipelines, sensor fusion, OTA update infrastructure and zero-trust device security at scale.',
  },
  {
    icon: Lightbulb,
    name: 'Electronics Development',
    description: 'High-speed PCB design, signal integrity analysis, and system integration.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    accent: '#fb923c',
    glowA: 'rgba(251,146,60,0.45)',
    glowB: 'rgba(249,115,22,0.25)',
    tag: 'PCB / SI',
    headline: 'Signal Pure.',
    sub: 'Power Clean.',
    body: 'Multi-layer PCB design with impedance-controlled stackups, EMI compliance, and thermal management for high-power systems.',
  },
  {
    icon: Network,
    name: 'Custom R&D Solutions',
    description: 'Research-driven innovation, technology scouting, and rapid prototyping lab.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    accent: '#a78bfa',
    glowA: 'rgba(167,139,250,0.45)',
    glowB: 'rgba(139,92,246,0.25)',
    tag: 'R&D / Proto',
    headline: 'Explore First.',
    sub: 'Scale Fast.',
    body: 'Rapid concept validation, competitive tear-down, and novel architecture studies to turn ideas into IP.',
  },
];

// ─── CHIP VISUAL ─────────────────────────────────────────────────────────────

const ChipVisual = ({ item }) => {
  const accent = item?.accent ?? '#38bdf8';
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="relative" style={{ width: 110, height: 110 }}>
        <div
          className="absolute inset-0 rounded-xl blur-2xl opacity-70"
          style={{ background: item?.glowA }}
        />
        <div
          className="absolute inset-0 rounded-xl border flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,#0d1117 60%,#161b22)',
            borderColor: accent + '66',
            boxShadow: `0 0 28px ${accent}44`,
          }}
        >
          <div
            className="relative z-10 rounded-lg border flex items-center justify-center"
            style={{ width: 52, height: 52, background: '#020617', borderColor: accent + '55' }}
          >
            <div className="absolute inset-0 rounded-lg blur-md opacity-50" style={{ background: accent }} />
            <item.icon
              className="w-6 h-6 relative z-10"
              style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent})` }}
              strokeWidth={1.5}
            />
          </div>
        </div>
        {/* Pins */}
        <div className="absolute top-3 bottom-3 -left-2.5 w-2.5 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => <div key={i} className="h-px rounded-l" style={{ background: accent + 'cc' }} />)}
        </div>
        <div className="absolute top-3 bottom-3 -right-2.5 w-2.5 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => <div key={i} className="h-px rounded-r" style={{ background: accent + 'cc' }} />)}
        </div>
        <div className="absolute left-3 right-3 -top-2.5 h-2.5 flex flex-row justify-between">
          {[...Array(5)].map((_, i) => <div key={i} className="w-px rounded-t" style={{ background: accent + 'cc' }} />)}
        </div>
        <div className="absolute left-3 right-3 -bottom-2.5 h-2.5 flex flex-row justify-between">
          {[...Array(5)].map((_, i) => <div key={i} className="w-px rounded-b" style={{ background: accent + 'cc' }} />)}
        </div>
      </div>
    </div>
  );
};

// ─── NODE VISUAL ─────────────────────────────────────────────────────────────

const NodeVisual = ({ item }) => {
  const accent = item?.accent ?? '#38bdf8';
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="relative" style={{ width: 110, height: 110 }}>
        <div className="absolute inset-0 rounded-full border animate-[spin_12s_linear_infinite]" style={{ borderColor: accent + '25' }} />
        <div className="absolute inset-4 rounded-full border animate-[spin_8s_linear_infinite_reverse]" style={{ borderColor: accent + '35' }} />
        <div className="absolute inset-6 rounded-full blur-xl opacity-50" style={{ background: item?.glowA }} />
        <div
          className="absolute inset-8 rounded-full border flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#0d1117,#161b22)', borderColor: accent + '66', boxShadow: `0 0 20px ${accent}44` }}
        >
          <item.icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.5} />
        </div>
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const r = 42;
          const cx = 55 + r * Math.cos(rad) - 6;
          const cy = 55 + r * Math.sin(rad) - 6;
          return (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full border"
              style={{ left: cx, top: cy, background: '#0d1117', borderColor: accent, boxShadow: `0 0 7px ${accent}` }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── RIGHT PANEL ─────────────────────────────────────────────────────────────

const RightPanel = ({ item, type }) => {
  const accent = item?.accent ?? '#38bdf8';
  const Visual = type === 'solutions' ? ChipVisual : NodeVisual;

  return (
    <div className="w-72 shrink-0 bg-[#f0f8ff]/80 border-l border-blue-900/10 relative overflow-hidden flex flex-col p-7">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage: `linear-gradient(rgba(15,23,42,1) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,1) 1px,transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700" style={{ background: item?.glowA, opacity: 0.4 }} />
      <div className="absolute top-6 -left-6 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-700" style={{ background: item?.glowB, opacity: 0.5 }} />

      <div className="relative z-10 flex flex-col h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={item?.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full"
          >
            {/* Tag */}
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: accent }}>
              {item?.tag}
            </span>
            {/* Headlines */}
            <h3 className="text-xl font-light leading-tight tracking-tight mb-0.5" style={{ color: 'rgba(15,23,42,0.7)' }}>
              {item?.headline}
            </h3>
            <h3 className="text-xl font-bold leading-tight tracking-tight mb-3 text-slate-900">
              {item?.sub}
            </h3>
            {/* Body */}
            <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>
              {item?.body}
            </p>
            <Visual item={item} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── MEGA MENU ────────────────────────────────────────────────────────────────

const MegaMenu = ({ isOpen, items, type }) => {
  const [hoveredItem, setHoveredItem] = useState(items[0]);

  useEffect(() => {
    if (isOpen) setHoveredItem(items[0]);
  }, [isOpen, items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-full w-full z-40 overflow-hidden"
          style={{
            background: 'rgba(244, 248, 252, 0.95)', // White mixed with blue shade
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 32px 80px -16px rgba(0,0,0,0.1)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, rgba(6,182,212,0.4) 70%, transparent)',
            }}
          />

          <div className="max-w-6xl mx-auto flex">
            {/* LEFT */}
            <div className="flex-1 py-7 px-8">
              {/* Section label */}
              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-2"
                style={{ color: 'rgba(96,165,250,0.6)' }}
              >
                <span className="w-5 h-px" style={{ background: 'rgba(96,165,250,0.35)' }} />
                {type === 'solutions' ? 'Core Engineering Solutions' : 'Product Lines'}
              </p>
              <div className="grid gap-1">
                {items.map((item, idx) => {
                  const active = hoveredItem?.name === item.name;
                  return (
                    <motion.a
                      key={item.name}
                      href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: idx * 0.045 }}
                      onMouseEnter={() => setHoveredItem(item)}
                      className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl relative overflow-hidden cursor-pointer transition-all duration-200"
                      style={{
                        border: active ? `1px solid ${item.accent}30` : '1px solid transparent',
                        background: active
                          ? `linear-gradient(135deg, ${item.accent}10 0%, transparent 60%)`
                          : 'transparent',
                      }}
                    >
                      {/* Left accent bar */}
                      <motion.div
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                        style={{ background: item.accent, originY: 0.5 }}
                        animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
                        transition={{ duration: 0.18 }}
                      />

                      {/* Icon */}
                      <div
                        className="p-2.5 rounded-lg shrink-0 transition-all duration-200"
                        style={{
                          background: active ? `${item.accent}18` : 'rgba(0,0,0,0.04)',
                          boxShadow: active ? `0 0 18px ${item.accent}35` : 'none',
                        }}
                      >
                        <item.icon
                          className="w-4 h-4"
                          strokeWidth={2}
                          style={{
                            color: item.accent,
                            filter: active ? `drop-shadow(0 0 5px ${item.accent})` : 'none',
                          }}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[13.5px] font-bold tracking-tight transition-colors duration-200"
                            style={{ color: active ? item.accent : 'rgba(15,23,42,0.85)' }}
                          >
                            {item.name}
                          </span>
                          <ArrowRight
                            className="w-3 h-3 shrink-0 transition-all duration-200"
                            style={{
                              color: item.accent,
                              opacity: active ? 1 : 0,
                              transform: active ? 'translateX(0)' : 'translateX(-5px)',
                            }}
                          />
                        </div>
                        <p
                          className="text-[11.5px] mt-0.5 leading-snug truncate pr-2"
                          style={{ color: 'rgba(15,23,42,0.5)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <RightPanel item={hoveredItem} type={type} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── DESKTOP NAV LINK ─────────────────────────────────────────────────────────

const DesktopNavLink = ({ title, hasDropdown, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="relative h-full px-4 flex items-center gap-1 text-[13.5px] font-semibold tracking-wide transition-colors duration-200 focus:outline-none cursor-pointer"
    style={{ color: isActive ? '#3b82f6' : 'rgba(255,255,255,0.65)' }}
    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; }}
    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
  >
    {title}
    {hasDropdown && (
      <ChevronDown
        className="w-3.5 h-3.5 transition-transform duration-300"
        style={{
          color: isActive ? '#3b82f6' : 'rgba(255,255,255,0.35)',
          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      />
    )}
    {/* Bottom underline */}
    <motion.div
      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-t"
      style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', originX: 0.5 }}
      initial={false}
      animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    />
  </button>
);

// ─── MOBILE ACCORDION ITEM ────────────────────────────────────────────────────

const MobileAccordionItem = ({ sec, onClose, delay }) => {
  const [open, setOpen] = useState(false);
  const hasItems = sec.items.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="border-b border-slate-100 last:border-0"
    >
      {/* Row */}
      <button
        className="w-full flex items-center justify-between py-4 cursor-pointer focus:outline-none"
        onClick={() => {
          if (hasItems) setOpen(!open);
          else { onClose(); window.location.href = `#${sec.name.toLowerCase()}`; }
        }}
      >
        <span className={`text-[15px] font-bold tracking-tight transition-colors duration-150 ${open ? 'text-slate-900' : 'text-slate-600'}`}>
          {sec.name}
        </span>
        {hasItems && (
          <div className={`p-1 rounded-md transition-colors duration-150 ${open ? 'bg-slate-100' : ''}`}>
            <ChevronDown
              className="w-4 h-4 text-slate-400 transition-transform duration-300"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </div>
        )}
      </button>

      {/* Expanded sub-items */}
      <AnimatePresence>
        {hasItems && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-3 grid gap-1.5 pl-1 mt-1">
              {sec.items.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-3 py-3.5 rounded-xl border border-slate-100 bg-white active:bg-slate-50 transition-colors relative overflow-hidden group"
                  style={{ minHeight: 60 }}
                >
                  {/* Subtle left accent on press */}
                  <div
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r opacity-0 group-active:opacity-100 transition-opacity duration-100"
                    style={{ background: item.accent }}
                  />
                  <div className={`p-2.5 rounded-lg shrink-0 ${item.bg} ${item.color}`}>
                    <item.icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-bold text-slate-900 leading-snug">{item.name}</div>
                    <div className="text-[11.5px] text-slate-400 mt-0.5 leading-snug line-clamp-2 pr-2">{item.description}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 mr-1" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── MOBILE MENU PANEL ────────────────────────────────────────────────────────

const MobileMenu = ({ isOpen, onClose }) => {
  const sections = [
    { name: 'Home', items: [] },
    { name: 'Solutions', items: solutions },
    { name: 'Products', items: products },
    { name: 'Company', items: [] },
    { name: 'Careers', items: [] },
    { name: 'Contact', items: [] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-[17px] font-black tracking-[0.12em] text-slate-900">AUROWINX</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto px-5 py-3 pb-28">
              {sections.map((sec, i) => (
                <MobileAccordionItem key={sec.name} sec={sec} onClose={onClose} delay={0.04 + i * 0.035} />
              ))}
            </div>

            {/* Sticky CTA */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-5 bg-white/95 backdrop-blur-sm border-t border-slate-100">
              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white text-[13px] font-semibold tracking-wide transition-all group"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                  boxShadow: '0 0 24px rgba(37,99,235,0.35)',
                }}
              >
                Talk to Experts
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClickOutside = useCallback((e) => {
    if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null);
  }, []);

  useEffect(() => {
    if (activeMenu) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu, handleClickOutside]);

  const toggleMenu = (menu) => setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: scrolled ? 56 : 64,
          background: scrolled
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(255, 265, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Top accent line on scroll */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5) 40%, rgba(6,182,212,0.35) 60%, transparent)',
            }}
          />
        )}

        <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="shrink-0 group">
            <span
              className="text-[19px] font-black tracking-[0.12em] transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              AUROWINX
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center h-full gap-1">
            {[
              { title: 'Home' },
              { title: 'Solutions', menu: 'solutions' },
              { title: 'Products', menu: 'products' },
              { title: 'Company' },
              { title: 'Careers' },
              { title: 'Contact' },
            ].map(({ title, menu }) => (
              <DesktopNavLink
                key={title}
                title={title}
                hasDropdown={!!menu}
                isActive={!!menu && activeMenu === menu}
                onClick={menu ? () => toggleMenu(menu) : undefined}
              />
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 text-white text-[13px] font-semibold tracking-wide transition-all duration-200 group"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                boxShadow: ctaHovered ? '0 0 36px rgba(37,99,235,0.55)' : '0 0 24px rgba(37,99,235,0.35)',
                borderRadius: 8,
                transform: ctaHovered ? 'scale(1.03)' : 'scale(1)',
              }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              Talk to Experts
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Hamburger — animated morph to X */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors relative"
              style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.07)' }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mega menus */}
        <MegaMenu isOpen={activeMenu === 'solutions'} items={solutions} type="solutions" />
        <MegaMenu isOpen={activeMenu === 'products'} items={products} type="products" />
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
