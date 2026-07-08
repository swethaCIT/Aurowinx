// src/components/contact/ContactModal.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { C, FONT, EASE } from "././theme";
import ContactForm from "./ContactForm";

// ─── Context label map for modal header ──────────────────────────────────────
const CONTEXT_META = {
  general:  { label: "Get in Touch",              sub: "We'll respond within 1–2 business days." },
  services: { label: "Request Engineering Services", sub: "Describe your requirement and we'll follow up." },
  career:   { label: "Apply to AurowinX",          sub: "Our talent team reviews every application." },
  company:  { label: "Partnership Enquiry",         sub: "Let's explore what we can build together." },
  product:  { label: "Product Enquiry",             sub: "Tell us what you need — we'll get back to you." },
};

// ─── Main Component ───────────────────────────────────────────────────────────
// Usage:
//   <ContactModal
//     isOpen={open}
//     onClose={() => setOpen(false)}
//     context="services"          // general | services | career | company | product
//     sourcePage="dv"             // used for Supabase source_page field
//   />

export default function ContactModal({ isOpen, onClose, context = "general", sourcePage = "" }) {
  const overlayRef = useRef(null);
  const meta = CONTEXT_META[context] || CONTEXT_META.general;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Click outside overlay to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <>
      <style>{`
        .cm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: flex-end; justify-content: flex-end;
          padding: 0;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Backdrop */
        .cm-backdrop {
          position: absolute; inset: 0;
          background: rgba(15, 14, 26, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Drawer panel */
        .cm-drawer {
          position: relative; z-index: 1;
          width: 100%; max-width: 560px;
          height: 100dvh;
          background: #fff;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: -8px 0 48px rgba(15,14,26,0.18);
        }

        /* Header */
        .cm-head {
          padding: 24px 28px 20px;
          border-bottom: 1px solid ${C.borderLight};
          background: linear-gradient(160deg, ${C.bgAccent} 0%, #f5f3ff 100%);
          flex-shrink: 0;
        }
        .cm-head-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
          margin-bottom: 14px;
        }
        .cm-head-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: ${C.primary};
          background: rgba(79,70,229,0.1); border-radius: 4px;
          padding: 3px 8px; display: inline-block; margin-bottom: 6px;
        }
        .cm-head-title {
          font-family: ${FONT};
          font-size: 18px; font-weight: 700;
          color: ${C.textPrimary}; letter-spacing: -0.02em;
          margin: 0 0 4px;
        }
        .cm-head-sub {
          font-size: 13px; color: ${C.textSecondary};
          margin: 0; line-height: 1.5;
        }

        /* Close button */
        .cm-close {
          width: 34px; height: 34px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: #fff; border: 1.5px solid ${C.borderLight};
          cursor: pointer; flex-shrink: 0;
          color: ${C.textMuted};
          transition: all 0.16s ease;
          box-shadow: ${C.shadowSm};
        }
        .cm-close:hover {
          background: #fef2f2; border-color: #fca5a5;
          color: #dc2626;
          transform: rotate(90deg);
        }

        /* Progress strip */
        .cm-strip {
          display: flex; gap: 4px;
        }
        .cm-strip-seg {
          flex: 1; height: 3px; border-radius: 2px;
          background: ${C.borderLight};
        }
        .cm-strip-seg-active {
          background: linear-gradient(90deg, ${C.primary}, ${C.secondary});
        }

        /* Scrollable form body */
        .cm-body {
          flex: 1; overflow-y: auto;
          padding: 28px 28px 32px;
          overscroll-behavior: contain;
        }
        .cm-body::-webkit-scrollbar { width: 4px; }
        .cm-body::-webkit-scrollbar-track { background: transparent; }
        .cm-body::-webkit-scrollbar-thumb {
          background: ${C.borderLight}; border-radius: 4px;
        }

        /* Override ContactForm inside drawer — remove two-col layout */
        .cm-body .cf3-card {
          display: flex !important;
          flex-direction: column !important;
          min-height: unset !important;
          box-shadow: none !important;
        }
        .cm-body .cf3-left { display: none !important; }
        .cm-body .cf3-right {
          padding: 0 !important;
          overflow: visible !important;
        }
        .cm-body .cf3-rh { margin-bottom: 20px !important; }
        .cm-body .cf3-rtitle { font-size: 16px !important; }
        .cm-body .cf3-rsub { font-size: 13px !important; }

        /* Footer */
        .cm-foot {
          padding: 14px 28px 20px;
          border-top: 1px solid ${C.borderLight};
          background: ${C.bgLight};
          flex-shrink: 0;
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
        }
        .cm-foot-note {
          font-size: 11.5px; color: ${C.textMuted};
          line-height: 1.5;
        }
        .cm-foot-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 500; color: ${C.primary};
          text-decoration: none;
          transition: gap 0.15s;
        }
        .cm-foot-link:hover { gap: 7px; }

        /* ── Mobile: full-screen bottom sheet ───────────── */
        @media (max-width: 600px) {
          .cm-overlay { align-items: flex-end; justify-content: center; }
          .cm-drawer {
            max-width: 100%; width: 100%;
            height: 92dvh;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -8px 40px rgba(15,14,26,0.18);
          }
          .cm-head { padding: 18px 20px 16px; }
          .cm-body { padding: 20px 20px 28px; }
          .cm-foot { padding: 12px 20px 18px; }

          /* Drag handle */
          .cm-drawer::before {
            content: '';
            display: block;
            width: 36px; height: 4px; border-radius: 2px;
            background: ${C.borderLight};
            margin: 10px auto 0;
            flex-shrink: 0;
          }
        }

        @media (max-width: 380px) {
          .cm-head-title { font-size: 16px; }
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div className="cm-overlay" ref={overlayRef} onClick={handleOverlayClick}>

            {/* Backdrop */}
            <motion.div
              className="cm-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />

            {/* Drawer */}
            <motion.div
              className="cm-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              {/* Header */}
              <div className="cm-head">
                <div className="cm-head-top">
                  <div>
                    <span className="cm-head-label">AurowinX Technologies</span>
                    <h2 className="cm-head-title">{meta.label}</h2>
                    <p className="cm-head-sub">{meta.sub}</p>
                  </div>
                  <button className="cm-close" onClick={onClose} aria-label="Close">
                    <X size={16} />
                  </button>
                </div>
                <div className="cm-strip">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={`cm-strip-seg cm-strip-seg-active`} />
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="cm-body">
                <ContactForm
                  context={context}
                  sourcePage={sourcePage}
                />
              </div>

              {/* Footer */}
              <div className="cm-foot">
                <p className="cm-foot-note">
                  Prefer a full page?
                </p>
                <a href="/contact" className="cm-foot-link" onClick={onClose}>
                  Open Contact Page <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}