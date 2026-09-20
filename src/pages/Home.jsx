import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Design tokens — white-first premium theme                          */
/* ------------------------------------------------------------------ */
const COLORS = {
  bg: "#FFFFFF",
  bgSoft: "#FAFAF9",
  text: "#0B0D12",
  textMuted: "#5B5F6B",
  border: "#EAEAE8",
  accent: "#3D5AFE", // single sophisticated accent, used sparingly
  accentSoft: "rgba(61, 90, 254, 0.08)",
};

const services = [
  {
    n: "01",
    title: "Zoho Solutions",
    desc: "Turn Zoho into a system built around your business.",
    tags: ["CRM", "Books", "Creator", "Automation"],
  },
  {
    n: "02",
    title: "Custom ERP",
    desc: "A complete digital operating system for your company.",
    tags: ["Inventory", "Finance", "HR", "Sales"],
  },
  {
    n: "03",
    title: "Business Automation",
    desc: "Remove repetitive work and connect your processes.",
    tags: ["Workflows", "Approvals", "Sync", "APIs"],
  },
  {
    n: "04",
    title: "Custom Software",
    desc: "Applications designed specifically for your requirements.",
    tags: ["Web Apps", "Dashboards", "Portals", "SaaS"],
  },
  {
    n: "05",
    title: "IT & Digital Solutions",
    desc: "Improve your company's technology ecosystem.",
    tags: ["Infrastructure", "Cloud", "Strategy"],
  },
  {
    n: "06",
    title: "Integrations",
    desc: "Connect the tools your business already uses.",
    tags: ["REST APIs", "Webhooks", "Third-party"],
  },
];

const nodes = [
  { key: "crm", label: "CRM", x: 400, y: 90 },
  { key: "sales", label: "SALES", x: 190, y: 220 },
  { key: "finance", label: "FINANCE", x: 610, y: 220 },
  { key: "inventory", label: "INVENTORY", x: 400, y: 330 },
  { key: "automation", label: "AUTOMATION", x: 400, y: 440 },
];
const CENTER = { x: 400, y: 220 };

/* ------------------------------------------------------------------ */
/*  Hero network visualization                                         */
/* ------------------------------------------------------------------ */
function HeroNetwork() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(400);
  const my = useMotionValue(220);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20 });

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 800);
    my.set(((e.clientY - rect.top) / rect.height) * 480);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      style={{ position: "relative", width: "100%", maxWidth: 640, margin: "0 auto" }}
    >
      <svg viewBox="0 0 800 480" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {!reduceMotion && (
          <motion.circle cx={glowX} cy={glowY} r="120" fill="url(#glow)" />
        )}

        {/* connection lines */}
        {nodes.map((node) => (
          <motion.line
            key={`line-${node.key}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={node.x}
            y2={node.y}
            stroke={COLORS.border}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        ))}

        {/* traveling data pulses along each line */}
        {!reduceMotion &&
          nodes.map((node, i) => (
            <motion.circle
              key={`pulse-${node.key}`}
              r="3.5"
              fill={COLORS.accent}
              initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
              animate={{
                cx: [CENTER.x, node.x],
                cy: [CENTER.y, node.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 1 + i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* center node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r="46" fill={COLORS.bg} stroke={COLORS.accent} strokeWidth="1.5" />
          <text
            x={CENTER.x}
            y={CENTER.y + 5}
            textAnchor="middle"
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 700, fill: COLORS.text }}
          >
            BUSINESS
          </text>
        </motion.g>

        {/* outer nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.key}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            <circle cx={node.x} cy={node.y} r="34" fill={COLORS.bgSoft} stroke={COLORS.border} strokeWidth="1" />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10.5, fontWeight: 600, fill: COLORS.textMuted, letterSpacing: "0.02em" }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Service card                                                       */
/* ------------------------------------------------------------------ */
function ServiceCard({ n, title, desc, tags }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "relative",
        border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`,
        borderRadius: 14,
        padding: "28px 26px",
        background: COLORS.bg,
        cursor: "pointer",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 12px 32px rgba(11,13,18,0.08)" : "0 1px 2px rgba(11,13,18,0.02)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.textMuted }}>
          {n}
        </span>
        <motion.span
          animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 18, color: COLORS.accent }}
        >
          &#8599;
        </motion.span>
      </div>

      <h3
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 21,
          fontWeight: 700,
          color: COLORS.text,
          margin: "0 0 10px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14.5, color: COLORS.textMuted, lineHeight: 1.55, margin: "0 0 18px" }}>
        {desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: hovered ? COLORS.accent : COLORS.textMuted,
              background: hovered ? COLORS.accentSoft : COLORS.bgSoft,
              padding: "5px 10px",
              borderRadius: 999,
              transition: "color 0.2s ease, background 0.2s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic button (subtle, elegant)                                  */
/* ------------------------------------------------------------------ */
function MagneticButton({ children, variant = "primary", href = "#contact" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const reduceMotion = useReducedMotion();

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: sx,
        y: sy,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 15,
        fontWeight: 600,
        padding: "13px 26px",
        borderRadius: 999,
        textDecoration: "none",
        color: isPrimary ? "#FFFFFF" : COLORS.text,
        background: isPrimary ? COLORS.text : "transparent",
        border: `1px solid ${isPrimary ? COLORS.text : COLORS.border}`,
      }}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.text }}>
      <style>{`
        @media (max-width: 860px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .hero-badge { font-size: 11px !important; }
          .hero-heading { font-size: 40px !important; }
        }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section style={{ padding: "96px 24px 60px", textAlign: "center", maxWidth: 1120, margin: "0 auto" }}>
        <motion.span
          className="hero-badge"
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
            marginBottom: 26,
          }}
        >
          BUSINESS TECHNOLOGY &nbsp;•&nbsp; AUTOMATION &nbsp;•&nbsp; SOFTWARE
        </motion.span>

        <motion.h1
          className="hero-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 22px",
          }}
        >
          Transform your business
          <br />
          with smarter technology.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 18,
            color: COLORS.textMuted,
            maxWidth: 620,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          We design, automate and build digital systems that help businesses
          work smarter, faster and better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}
        >
          <MagneticButton variant="primary" href="#contact">
            Start a Project
          </MagneticButton>
          <MagneticButton variant="secondary" href="#services">
            Explore Our Solutions
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <HeroNetwork />
        </motion.div>
      </section>

      {/* ---------------- WHAT WE DO ---------------- */}
      <section id="services" style={{ padding: "80px 24px 100px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 56px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
            }}
          >
            Technology built around your business.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16.5, color: COLORS.textMuted, lineHeight: 1.6 }}
          >
            Every business works differently. We design technology around the
            way your business actually operates.
          </motion.p>
        </div>

        <div
          className="services-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}