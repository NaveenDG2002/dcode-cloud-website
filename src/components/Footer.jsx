import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const COLORS = {
  bg: "#FAFAF9",
  text: "#0B0D12",
  textMuted: "#5B5F6B",
  border: "#EAEAE8",
  accent: "#3D5AFE",
};

const WHATSAPP_NUMBER = "94702004343";
const EMAIL_ADDRESS = "naveengunasekara62@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/dcode-cloud"; // TODO: replace with your real LinkedIn URL

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Zoho Implementation", to: "/#services" },
      { label: "Custom ERP", to: "/#services" },
      { label: "Business Automation", to: "/#services" },
      { label: "Custom Software", to: "/#services" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "Email", href: `mailto:${EMAIL_ADDRESS}` },
];

const linkStyle = {
  display: "block",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: 14.5,
  color: COLORS.textMuted,
  textDecoration: "none",
  marginBottom: 10,
  transition: "color 0.15s ease",
};

export default function Footer() {
  return (
    <footer style={{ background: COLORS.bg, borderTop: `1px solid ${COLORS.border}` }}>
      <style>{`
        .footer-link:hover { color: #0B0D12 !important; }
        .footer-social:hover { color: #3D5AFE !important; border-color: #3D5AFE !important; }
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-brand-col { grid-column: 1 / -1; }
        }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="footer-grid"
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.1fr", gap: 40, marginBottom: 48 }}
        >
          {/* brand */}
          <div className="footer-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={logo} alt="Dcode Cloud" style={{ height: 26, width: "auto" }} />
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text }}>
                Dcode Cloud
              </span>
            </div>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
              IT solutions for modern businesses \u2014 Zoho implementation, custom
              ERP systems, business automation and software built around how
              you actually work.
            </p>
          </div>

          {/* nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: COLORS.text,
                  margin: "0 0 16px",
                }}
              >
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <NavLink key={link.label} to={link.to} className="footer-link" style={linkStyle}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}

          {/* get in touch */}
          <div>
            <h4
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: COLORS.text,
                margin: "0 0 16px",
              }}
            >
              Get in Touch
            </h4>
            <a href={`mailto:${EMAIL_ADDRESS}`} className="footer-link" style={linkStyle}>
              {EMAIL_ADDRESS}
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="footer-link" style={linkStyle} target="_blank" rel="noopener noreferrer">
              +94 70 200 4343
            </a>
          </div>
        </motion.div>

        {/* bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: COLORS.textMuted, margin: 0 }}>
            \u00A9 {new Date().getFullYear()} Dcode Cloud. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: COLORS.textMuted,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  padding: "6px 14px",
                  textDecoration: "none",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}