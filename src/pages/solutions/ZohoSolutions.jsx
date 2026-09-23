import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

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

/* ------------------------------------------------------------------ */
/*  Product data                                                       */
/*  Add each logo file under src/assets/zoho/ — see setup steps.       */
/* ------------------------------------------------------------------ */
const products = [
  {
    key: "crm",
    name: "Zoho CRM",
    logo: "crm.png",
    summary: "Centralizes leads, deals and customer communication.",
    impact:
      "Gives your sales team one place to track every deal, so nothing falls through the cracks and follow-ups happen on time.",
  },
  {
    key: "books",
    name: "Zoho Books",
    logo: "books.png",
    summary: "Handles invoicing, accounting and financial reporting.",
    impact:
      "Keeps your finances accurate and audit-ready, with invoices, expenses and reports generated automatically instead of manually.",
  },
  {
    key: "creator",
    name: "Zoho Creator",
    logo: "creator.png",
    summary: "Builds custom apps for the processes Zoho doesn't cover out of the box.",
    impact:
      "Lets us build the exact internal tool your business needs — approval systems, trackers, portals — without expensive custom development.",
  },
  {
    key: "bigin",
    name: "Zoho Bigin",
    logo: "bigin.png",
    summary: "A lightweight pipeline CRM for small sales teams.",
    impact:
      "A simpler starting point than full CRM when your team just needs to track deals without a steep learning curve.",
  },
  {
    key: "flow",
    name: "Zoho Flow",
    logo: "flow.png",
    summary: "Connects Zoho apps and third-party tools with automated workflows.",
    impact:
      "Removes the manual copy-pasting between systems — when something happens in one app, the next step happens automatically.",
  },
  {
    key: "forms",
    name: "Zoho Forms",
    logo: "forms.png",
    summary: "Collects data through custom online forms.",
    impact:
      "Turns customer or staff form submissions directly into records in your CRM, Books, or Creator app — no manual entry.",
  },
  {
    key: "analytics",
    name: "Zoho Analytics",
    logo: "analytics.png",
    summary: "Turns data across your Zoho apps into dashboards and reports.",
    impact:
      "Gives you a real-time view of how the business is actually performing, pulled from every connected system.",
  },
  {
    key: "one",
    name: "Zoho One",
    logo: "one.png",
    summary: "The bundle that brings every Zoho app together under one license.",
    impact:
      "The foundation for a full business ecosystem — every app talking to every other app, instead of isolated tools.",
  },
];

const flowSteps = [
  { n: "01", title: "Discover", desc: "We learn how your business actually operates today — the manual steps, the workarounds, the bottlenecks." },
  { n: "02", title: "Map the Process", desc: "We map your real workflow against what Zoho can do, and identify where each app fits." },
  { n: "03", title: "Configure", desc: "We set up the chosen Zoho apps — modules, fields, pipelines — matched to your process." },
  { n: "04", title: "Customize", desc: "Where standard Zoho isn't enough, we customize with Deluge scripts, custom functions and Creator apps." },
  { n: "05", title: "Connect", desc: "We link the apps together with Zoho Flow and automation, so data moves on its own." },
  { n: "06", title: "Train & Launch", desc: "We train your team, migrate your existing data, and go live with support on hand." },
  { n: "07", title: "Support & Improve", desc: "We keep refining the system as your business grows and your processes change." },
];

const ecosystemNodes = [
  { key: "crm", label: "CRM", x: 400, y: 80 },
  { key: "books", label: "BOOKS", x: 190, y: 190 },
  { key: "creator", label: "CREATOR", x: 610, y: 190 },
  { key: "bigin", label: "BIGIN", x: 610, y: 340 },
  { key: "forms", label: "FORMS", x: 190, y: 340 },
  { key: "analytics", label: "ANALYTICS", x: 400, y: 450 },
];
const ECO_CENTER = { x: 400, y: 265 };

/* ------------------------------------------------------------------ */
/*  Ecosystem diagram — how Zoho One connects everything               */
/* ------------------------------------------------------------------ */
function EcosystemDiagram() {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 800 530" style={{ width: "100%", maxWidth: 640, height: "auto", margin: "0 auto", display: "block" }}>
      {ecosystemNodes.map((node) => (
        <motion.line
          key={`line-${node.key}`}
          x1={ECO_CENTER.x}
          y1={ECO_CENTER.y}
          x2={node.x}
          y2={node.y}
          stroke={COLORS.border}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
      ))}

      {!reduceMotion &&
        ecosystemNodes.map((node, i) => (
          <motion.circle
            key={`pulse-${node.key}`}
            r="3.5"
            fill={COLORS.accent}
            initial={{ cx: ECO_CENTER.x, cy: ECO_CENTER.y, opacity: 0 }}
            animate={{
              cx: [ECO_CENTER.x, node.x],
              cy: [ECO_CENTER.y, node.y],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.8 + i * 0.35, ease: "easeInOut" }}
          />
        ))}

      <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <circle cx={ECO_CENTER.x} cy={ECO_CENTER.y} r="52" fill={COLORS.bg} stroke={COLORS.accent} strokeWidth="1.5" />
        <text x={ECO_CENTER.x} y={ECO_CENTER.y - 4} textAnchor="middle" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 700, fill: COLORS.text }}>
          ZOHO ONE
        </text>
        <text x={ECO_CENTER.x} y={ECO_CENTER.y + 13} textAnchor="middle" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 9.5, fontWeight: 500, fill: COLORS.textMuted }}>
          your business
        </text>
      </motion.g>

      {ecosystemNodes.map((node, i) => (
        <motion.g key={node.key} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}>
          <circle cx={node.x} cy={node.y} r="34" fill={COLORS.bgSoft} stroke={COLORS.border} strokeWidth="1" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 600, fill: COLORS.textMuted, letterSpacing: "0.02em" }}>
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card — logo, summary, business impact                      */
/* ------------------------------------------------------------------ */
function ProductCard({ name, logo, summary, impact, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`,
        borderRadius: 14,
        padding: "22px 22px 24px",
        background: COLORS.bg,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 12px 28px rgba(11,13,18,0.07)" : "0 1px 2px rgba(11,13,18,0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: COLORS.bgSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={new URL(`../../assets/zoho/${logo}`, import.meta.url).href}
            alt={`${name} logo`}
            style={{ width: 26, height: 26, objectFit: "contain" }}
          />
        </div>
        <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 17.5, fontWeight: 700, color: COLORS.text, margin: 0 }}>
          {name}
        </h3>
      </div>

      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: COLORS.text, lineHeight: 1.55, margin: "0 0 10px", fontWeight: 500 }}>
        {summary}
      </p>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.6, margin: 0 }}>
        {impact}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function ZohoSolutions() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.text }}>
      <style>{`
        .zoho-products-grid { grid-template-columns: repeat(4, 1fr); }
        .zoho-flow-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1000px) {
          .zoho-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .zoho-flow-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .zoho-products-grid { grid-template-columns: 1fr !important; }
          .zoho-flow-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <section style={{ padding: "80px 24px 20px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 13,
            color: COLORS.textMuted,
            textDecoration: "none",
            marginBottom: 22,
          }}
        >
          &larr; Back to Home
        </Link>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: COLORS.accent,
            marginBottom: 16,
          }}
        >
          SOLUTION 01 — ZOHO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 18px",
          }}
        >
          Zoho Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16.5, color: COLORS.textMuted, lineHeight: 1.65, maxWidth: 620, margin: "0 auto" }}
        >
          We don't simply configure software. We understand your business
          process, design the solution, and build a Zoho ecosystem around it.
        </motion.p>
      </section>

      {/* ---------------- PRODUCTS ---------------- */}
      <section style={{ padding: "56px 24px 20px", maxWidth: 1120, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
          Zoho products we implement
        </h2>
        <div className="zoho-products-grid" style={{ display: "grid", gap: 16 }}>
          {products.map((product, i) => (
            <ProductCard key={product.key} index={i} {...product} />
          ))}
        </div>
      </section>

      {/* ---------------- IMPLEMENTATION FLOW ---------------- */}
      <section style={{ padding: "72px 24px", background: COLORS.bgSoft }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 30, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
              How implementation works
            </h2>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15.5, color: COLORS.textMuted, margin: 0 }}>
              From first conversation to a running system.
            </p>
          </div>

          <div className="zoho-flow-grid" style={{ display: "grid", gap: 18 }}>
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 18px" }}
              >
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12.5, fontWeight: 700, color: COLORS.accent }}>{step.n}</span>
                <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, fontWeight: 700, margin: "8px 0 8px" }}>{step.title}</h3>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: COLORS.textMuted, lineHeight: 1.55, margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ZOHO ONE ECOSYSTEM ---------------- */}
      <section style={{ padding: "88px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="zoho-eco-grid">
          <style>{`
            @media (max-width: 900px) {
              .zoho-eco-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", color: COLORS.accent }}>
              THE ECOSYSTEM
            </span>
            <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 30, fontWeight: 700, margin: "12px 0 16px", letterSpacing: "-0.01em" }}>
              One license. One connected business.
            </h2>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15.5, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 16 }}>
              Zoho One bundles the individual apps \u2014 CRM, Books, Creator,
              Forms, Analytics and more \u2014 under a single license. On their
              own, each app solves one problem. Connected together, they
              become one operating system for your business.
            </p>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15.5, color: COLORS.textMuted, lineHeight: 1.65, margin: 0 }}>
              We design which apps your business actually needs, how data
              should flow between them, and where custom logic (via Creator
              or Flow) fills the gaps \u2014 so a lead in CRM can automatically
              become an invoice in Books, a task in a Creator app, and a line
              in your Analytics dashboard, without anyone re-typing anything.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <EcosystemDiagram />
          </motion.div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section style={{ padding: "20px 24px 100px", textAlign: "center" }}>
        <Link
          to="/contact"
          style={{
            display: "inline-block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: "14px 30px",
            borderRadius: 999,
            background: COLORS.text,
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          Talk to us about your Zoho setup
        </Link>
      </section>
    </div>
  );
}