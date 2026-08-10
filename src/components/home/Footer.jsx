// src/components/home/Footer.jsx
// AurowinX — site footer. Dense, structured B2B/enterprise footer
// (Myntra/Tessolve-style): flat utility background, sectioned columns
// with underline headers, arrow-hover link lists, a registered-office
// card, and a dedicated "Get In Touch" CTA column driving to /contact.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, Phone, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const MotionLink = motion(Link);

/* ════════════════════════════════════════════════════════
   DATA — links preserved exactly as-is
════════════════════════════════════════════════════════ */
const FOOTER_SERVICES = [
  { label: "Semiconductor Design", href: "/solutions/semiconductor-design" },
  { label: "Design Verification", href: "/solutions/design-verification" },
  { label: "DFT Engineering", href: "/solutions/dft-engineering" },
  { label: "Physical Design", href: "/solutions/physical-design" },
  { label: "Analog & IP Solutions", href: "/solutions/analog-ip" },
  { label: "Engineering Services", href: "/products#engineering-services" },
  { label: "Power Electronics & Product Engineering", href: "/products#electronics-dev" },
  { label: "R&D", href: "/products#rnd" },
];

const FOOTER_COMPANY = [
  { label: "About Us", href: "/company" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
];

const INLINE_CONTACT = [
  { Icon: MapPin, text: "No.63, Mahalakshmi Nagar, 2nd Main Road, Mudichur, Tambaram, Kanchipuram, Tamil Nadu 600048", href: null },
  { Icon: Mail,   text: "info@aurowinx.com", href: "mailto:info@aurowinx.com" },
  { Icon: Globe,  text: "www.aurowinx.com", href: "https://aurowinx.com" },
  { Icon: Phone,  text: "+91 98408 13010", href: "tel:+919840813010" },
];

const SOCIALS = [
  {
    title: "LinkedIn", href: "https://linkedin.com/company/aurowinx-private-limited",
    brand: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    title: "X", href: "#",
    brand: "#ffffff",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    title: "Instagram", href: "#",
    brand: "#E1306C",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    title: "YouTube", href: "#",
    brand: "#FF0000",
    path: "M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.495 20.5 12 20.5 12 20.5s7.505 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12z",
  },
];

/* ════════════════════════════════════════════════════════
   Small pieces
════════════════════════════════════════════════════════ */
function ColHeader({ children }) {
  return (
    <div className="mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/75">{children}</p>
      <div className="mt-1.5 h-[2px] w-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
    </div>
  );
}

function FooterLink({ label, href }) {
  return (
    <Link
      to={href}
      className="group flex items-center gap-1 py-0.5 text-[12px] text-white/50 transition-colors duration-150 ease-out hover:text-white"
    >
      <span className="-translate-x-1 text-[10px] text-cyan-400 opacity-0 transition-all duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100">
        ›
      </span>
      <span>{label}</span>
    </Link>
  );
}

function InlineContactRow({ Icon, text, href }) {
  const Comp = href ? "a" : "span";
  return (
    <Comp
      href={href || undefined}
      className="flex items-start gap-2 text-[12px] leading-snug text-white/55 transition-colors duration-150 hover:text-white"
    >
      <Icon size={12} className="mt-0.5 flex-shrink-0 text-cyan-400/80" />
      {text}
    </Comp>
  );
}

function SocialIcon({ s }) {
  return (
    <motion.a
      href={s.href}
      title={s.title}
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/50"
      whileHover={{
        scale: 1.08,
        y: -2,
        color: s.brand,
        borderColor: `${s.brand}80`,
        backgroundColor: `${s.brand}1a`,
        boxShadow: `0 0 18px ${s.brand}55`,
      }}
      transition={{ duration: 0.18, ease: EASE }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d={s.path} />
      </svg>
    </motion.a>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative bg-[#12141d]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Solid top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600" />

      {/* ════ Main grid ════ */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8 lg:py-10">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/images/Aurowinx-logo.png"
              alt="AurowinX Private Limited"
              className="mb-3.5 h-14 w-auto"
            />

            <p className="mb-3.5 max-w-[300px] text-[12px] leading-[1.6] text-white/50">
              From concept to silicon — ASIC, embedded systems &amp; IoT engineering delivered under one roof, out of Chennai, India.
            </p>

            <div className="flex flex-col gap-2">
              {INLINE_CONTACT.map(row => <InlineContactRow key={row.text} {...row} />)}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <ColHeader>Services</ColHeader>
            <div className="flex flex-col">
              {FOOTER_SERVICES.map(s => <FooterLink key={s.label} {...s} />)}
            </div>
          </div>

          {/* ── Company ── */}
          <div>
            <ColHeader>Company</ColHeader>
            <div className="flex flex-col">
              {FOOTER_COMPANY.map(s => <FooterLink key={s.label} {...s} />)}
            </div>
          </div>

          {/* ── Get in touch ── */}
          <div>
            <ColHeader>Get In Touch</ColHeader>
            <p className="mb-3 max-w-[220px] text-[12px] leading-relaxed text-white/50">
              Got a chip, board or product idea? Tell us what you&apos;re building — we&apos;ll take it from there.
            </p>
            <MotionLink
              to="/contact"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-[12px] font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
            >
              Start a Project <ArrowRight size={13} />
            </MotionLink>

            <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Follow Us</p>
            <div className="flex gap-2">
              {SOCIALS.map(s => <SocialIcon key={s.title} s={s} />)}
            </div>
          </div>

        </div>
      </div>

      {/* ════ Bottom bar ════ */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="h-px bg-white/10" />
        <div className="flex items-center justify-center py-4 text-center">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Aurowinx Private Limited · All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
