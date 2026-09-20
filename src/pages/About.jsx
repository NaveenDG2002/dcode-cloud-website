import { motion } from "framer-motion";
import dilshanPhoto from "../assets/team/dilshan.jpg";
import naveenPhoto from "../assets/team/naveen.jpg";
import madushanPhoto from "../assets/team/madushan.jpg";

/* ------------------------------------------------------------------ */
/*  Design tokens — kept consistent with Home.jsx                      */
/* ------------------------------------------------------------------ */
const COLORS = {
  bg: "#FFFFFF",
  bgSoft: "#FAFAF9",
  text: "#0B0D12",
  textMuted: "#5B5F6B",
  border: "#EAEAE8",
  accent: "#3D5AFE",
  accentSoft: "rgba(61, 90, 254, 0.08)",
};

const team = [
  {
    name: "Dilshan",
    role: "Developer",
    photo: dilshanPhoto,
    bio: "Turns business requirements into clean, reliable code. Dilshan builds the systems our clients run their operations on \u2014 from custom ERP modules to Zoho customizations \u2014 with a focus on getting the details right the first time.",
    tags: ["Zoho", "Custom Systems", "Integrations"],
  },
  {
    name: "Naveen",
    role: "Developer & BA",
    photo: naveenPhoto,
    bio: "Sits at the intersection of business and technology. Naveen maps out how a client actually works before a single line of code is written, then builds the solution \u2014 making sure what we deliver fits the real workflow, not just the brief.",
    tags: ["Business Analysis", "Development", "Automation"],
  },
  {
    name: "Madushan",
    role: "Project Manager",
    photo: madushanPhoto,
    bio: "Keeps every project moving \u2014 on scope, on time, and in sync with the client. Madushan is the through-line from first conversation to final delivery, making sure nothing gets lost between what's promised and what's built.",
    tags: ["Delivery", "Client Relations", "Planning"],
  },
];

/* ------------------------------------------------------------------ */
/*  Team card                                                          */
/* ------------------------------------------------------------------ */
function TeamCard({ name, role, photo, bio, tags, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(11,13,18,0.02)",
        transition: "box-shadow 0.25s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 4.5",
          background: COLORS.bgSoft,
          overflow: "hidden",
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,13,18,0) 55%, rgba(11,13,18,0.55) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 20, bottom: 18, right: 20 }}>
          <h3
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 2px",
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </h3>
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.02em",
            }}
          >
            {role}
          </span>
        </div>
      </div>

      <div style={{ padding: "22px 22px 24px" }}>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: COLORS.textMuted,
            margin: "0 0 16px",
          }}
        >
          {bio}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: COLORS.accent,
                background: COLORS.accentSoft,
                padding: "5px 10px",
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  About page                                                         */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.text }}>
      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .about-heading { font-size: 38px !important; }
        }
      `}</style>

      {/* ---------------- INTRO ---------------- */}
      <section style={{ padding: "88px 24px 56px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: COLORS.textMuted,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 999,
            padding: "7px 16px",
            marginBottom: 24,
          }}
        >
          ABOUT DCODE CLOUD
        </motion.span>

        <motion.h1
          className="about-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
          }}
        >
          A small team, built for how
          <br />
          real businesses actually run.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 17,
            color: COLORS.textMuted,
            lineHeight: 1.65,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          We're a focused team of three, and we like it that way. No layers of
          handoffs, no lost context \u2014 every project gets our full attention
          from the first conversation to the system you use every day.
        </motion.p>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <section style={{ padding: "24px 24px 100px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            Meet the team.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: COLORS.textMuted }}
          >
            The people behind every system we build.
          </motion.p>
        </div>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {team.map((member, i) => (
            <TeamCard key={member.name} index={i} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}