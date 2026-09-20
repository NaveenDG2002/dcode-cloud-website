import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ------------------------------------------------------------------ */
/*  Design tokens — kept consistent with Home.jsx / About.jsx          */
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

/* ---- Your contact details ---- */
const WHATSAPP_NUMBER = "94702004343"; // no +, no leading 0
const EMAIL_ADDRESS = "naveengunasekara62@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/dcode-cloud"; // TODO: replace with your real LinkedIn URL

/* ---- EmailJS config — see setup steps in chat ---- */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+94 70 200 4343",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: "\u{1F4AC}",
  },
  {
    label: "Email",
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
    icon: "\u2709\uFE0F",
  },
  {
    label: "LinkedIn",
    value: "Dcode Cloud",
    href: LINKEDIN_URL,
    icon: "\u{1F517}",
  },
];

function ContactCard({ label, value, href, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 20px",
        border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`,
        borderRadius: 14,
        textDecoration: "none",
        color: COLORS.text,
        background: COLORS.bg,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 10px 24px rgba(11,13,18,0.06)" : "none",
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          background: hovered ? COLORS.accentSoft : COLORS.bgSoft,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span>
        <span
          style={{
            display: "block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            color: COLORS.textMuted,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 15.5,
            fontWeight: 600,
            color: COLORS.text,
          }}
        >
          {value}
        </span>
      </span>
    </motion.a>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: 15,
  padding: "13px 14px",
  borderRadius: 10,
  border: `1px solid ${COLORS.border}`,
  outline: "none",
  color: COLORS.text,
  background: COLORS.bgSoft,
  boxSizing: "border-box",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      console.error(
        "EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file."
      );
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: EMAIL_ADDRESS,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text }}>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <section style={{ padding: "88px 24px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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
          GET IN TOUCH
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: "0 0 18px",
          }}
        >
          Let's build your next
          <br />
          digital system.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 16.5,
            color: COLORS.textMuted,
            lineHeight: 1.6,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Tell us how your business works. We'll help you find where
          technology can make it simpler, faster and smarter.
        </motion.p>
      </section>

      {/* ---------------- CONTACT GRID ---------------- */}
      <section style={{ padding: "20px 24px 110px", maxWidth: 1000, margin: "0 auto" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 32 }}>
          {/* left: direct contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {contactMethods.map((method) => (
              <ContactCard key={method.label} {...method} />
            ))}
          </motion.div>

          {/* right: working form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 26,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div>
              <label
                htmlFor="name"
                style={{ display: "block", fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.textMuted }}
              >
                Name
              </label>
              <input id="name" name="name" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="Your name" />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{ display: "block", fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.textMuted }}
              >
                Email
              </label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="you@company.com" />
            </div>

            <div>
              <label
                htmlFor="message"
                style={{ display: "block", fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.textMuted }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Tell us about your business and what you need."
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: 6,
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: "13px 22px",
                borderRadius: 10,
                border: "none",
                color: "#FFFFFF",
                background: status === "sending" ? COLORS.textMuted : COLORS.text,
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
            >
              {status === "sending" ? "Sending\u2026" : "Send Message"}
            </motion.button>

            {status === "success" && (
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: "#1A7F37", margin: 0 }}>
                Thanks \u2014 your message has been sent. We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: "#C0362C", margin: 0 }}>
                Something went wrong sending your message. Please try WhatsApp or email directly.
              </p>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}