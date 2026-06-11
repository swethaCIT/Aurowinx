import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Briefcase,
  CheckCircle2, Wrench, Star, ChevronRight
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { C, FONT, EASE } from "../components/career/theme";
import ApplicationModal from "../components/career/ApplicationModal";

const EASE_OUT = [0.22, 1, 0.36, 1];

/* ── Section block ── */
function Section({ title, items, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        padding: "28px 32px",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: color + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon style={{ width: 17, height: 17, color }} />
        </div>
        <h3 style={{
          fontFamily: FONT, fontSize: 16, fontWeight: 700,
          color: C.textPrimary, margin: 0,
        }}>
          {title}
        </h3>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items?.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <ChevronRight style={{
              width: 15, height: 15, color,
              flexShrink: 0, marginTop: 2,
            }} />
            <span style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Main ── */
export default function JobDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error) setJob(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: FONT, color: C.textMuted,
    }}>
      Loading...
    </div>
  );

  if (!job) return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: FONT, gap: 16,
    }}>
      <p style={{ fontSize: 18, color: C.textPrimary, fontWeight: 600 }}>Job not found.</p>
      <button
        onClick={() => navigate("/careers")}
        style={{
          padding: "10px 24px", borderRadius: 10,
          background: C.gradPrimary, color: "#fff",
          border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 600, fontFamily: FONT,
        }}
      >
        Back to Careers
      </button>
    </div>
  );

  return (
    <>
      <div style={{
        minHeight: "100vh",
        background: C.bgLight,
        fontFamily: FONT,
        paddingBottom: 80,
      }}>
        {/* ── Hero band ── */}
        <div style={{
          background: "#fff",
          borderBottom: `1px solid ${C.border}`,
          padding: "32px 24px 40px",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>

            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate("/careers")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none",
                color: C.textMuted, fontSize: 13,
                fontWeight: 600, cursor: "pointer",
                fontFamily: FONT, marginBottom: 28,
                padding: 0,
              }}
            >
              <ArrowLeft style={{ width: 15, height: 15 }} />
              Back to Careers
            </motion.button>

            {/* Domain badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <span style={{
                display: "inline-block",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: C.accentSoft, color: C.primary,
                padding: "4px 14px", borderRadius: 100,
                marginBottom: 16,
              }}>
                {job.domain}
              </span>

              <h1 style={{
                fontFamily: FONT,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 800, color: C.textPrimary,
                margin: "0 0 20px", letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}>
                {job.job_title}
              </h1>

              {/* Meta pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[
                  { Icon: MapPin,    text: job.location },
                  { Icon: Clock,     text: `${job.experience_min}–${job.experience_max} yrs` },
                  { Icon: Briefcase, text: job.employment_type },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    background: C.bgLight,
                    border: `1px solid ${C.border}`,
                    borderRadius: 100, padding: "6px 14px",
                  }}>
                    <Icon style={{ width: 13, height: 13, color: C.primary }} />
                    <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0" }}>

          {/* Description */}
          {job.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: "28px 32px",
                marginBottom: 20,
              }}
            >
              <h3 style={{
                fontFamily: FONT, fontSize: 16, fontWeight: 700,
                color: C.textPrimary, margin: "0 0 12px",
              }}>
                About the Role
              </h3>
              <p style={{
                fontSize: 14, color: C.textSecondary,
                lineHeight: 1.75, margin: 0,
              }}>
                {job.description}
              </p>
            </motion.div>
          )}

          {/* Sections grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: 20,
            marginBottom: 20,
          }}>
            {job.responsibilities?.length > 0 && (
              <Section
                title="Responsibilities"
                items={job.responsibilities}
                icon={CheckCircle2}
                color={C.primary}
              />
            )}
            {job.skills?.length > 0 && (
              <Section
                title="Required Skills"
                items={job.skills}
                icon={Star}
                color="#7c3aed"
              />
            )}
            {job.preferred?.length > 0 && (
              <Section
                title="Preferred Qualifications"
                items={job.preferred}
                icon={CheckCircle2}
                color="#0891b2"
              />
            )}
            {job.tools?.length > 0 && (
              <Section
                title="Tools & Technologies"
                items={job.tools}
                icon={Wrench}
                color="#059669"
              />
            )}
          </div>

          {/* Apply CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            style={{
              background: C.gradPrimary,
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <h3 style={{
              fontFamily: FONT, fontSize: 22, fontWeight: 800,
              color: "#fff", margin: "0 0 10px",
            }}>
              Ready to Apply?
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 14, marginBottom: 28,
            }}>
              Submit your application and our team will get back to you shortly.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              style={{
                padding: "14px 40px",
                borderRadius: 12,
                background: "#fff",
                color: C.primary,
                border: "none",
                fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: FONT,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              Apply Now
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Application Modal */}
      {modalOpen && (
        <ApplicationModal
          job={job}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}