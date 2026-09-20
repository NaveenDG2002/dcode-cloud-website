import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const COLORS = {
  bg: "#0F1424",
  text: "#F5F5F2",
  textMuted: "rgba(245, 245, 242, 0.72)",
  accent: "#4FD1C5",
  accentHover: "#6EE0D6",
  border: "rgba(245, 245, 242, 0.08)",
};

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: COLORS.bg,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  inner: {
    maxWidth: 1140,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: COLORS.text,
  },
  logo: {
    height: 28,
    width: "auto",
    display: "block",
  },
  wordmark: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: "-0.01em",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: 28,
  },
  link: (isActive, isHovered) => ({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 15,
    color: isActive || isHovered ? COLORS.text : COLORS.textMuted,
    textDecoration: "none",
    padding: "6px 2px",
    borderBottom: `1px solid ${isActive ? COLORS.accent : "transparent"}`,
    transition: "color 0.15s ease, border-color 0.15s ease",
  }),
  cta: (isHovered) => ({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.bg,
    background: isHovered ? COLORS.accentHover : COLORS.accent,
    padding: "9px 18px",
    borderRadius: 6,
    textDecoration: "none",
    transition: "background 0.15s ease",
  }),
  toggle: {
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
    width: 32,
    height: 32,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  bar: (rotate, hide) => ({
    height: 2,
    width: "100%",
    background: COLORS.text,
    transition: "transform 0.2s ease, opacity 0.2s ease",
    transform: rotate || "none",
    opacity: hide ? 0 : 1,
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <header style={styles.header}>
      {/* A small embedded stylesheet handles the mobile breakpoint and menu
          toggle, since plain inline styles can't express media queries. */}
      <style>{`
        @media (max-width: 720px) {
          .navbar-toggle { display: flex !important; }
          .navbar-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            background: ${COLORS.bg};
            border-bottom: 1px solid ${COLORS.border};
            padding: 8px 24px 20px;
            display: none;
          }
          .navbar-links.is-open { display: flex !important; }
          .navbar-links a { width: 100%; padding: 10px 0; }
        }
      `}</style>

      <div style={styles.inner}>
        <NavLink to="/" style={styles.brand} onClick={() => setOpen(false)}>
        <img src={logo} alt="Dcode Cloud" style={styles.logo} />
          <span style={styles.wordmark}>Dcode Cloud</span>
        </NavLink>

        <nav className={`navbar-links ${open ? "is-open" : ""}`} style={styles.links}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              style={({ isActive }) => styles.link(isActive, hoveredLink === link.to)}
              onMouseEnter={() => setHoveredLink(link.to)}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            style={styles.cta(ctaHovered)}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            onClick={() => setOpen(false)}
          >
            Talk to us
          </NavLink>
        </nav>

        <button
          className="navbar-toggle"
          style={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span style={styles.bar(open ? "translateY(7px) rotate(45deg)" : "none", false)} />
          <span style={styles.bar("none", open)} />
          <span style={styles.bar(open ? "translateY(-7px) rotate(-45deg)" : "none", false)} />
        </button>
      </div>
    </header>
  );
}