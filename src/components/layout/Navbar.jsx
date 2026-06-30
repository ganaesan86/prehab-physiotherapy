import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown, Menu, X, ExternalLink } from "lucide-react";
import "./Navbar.css";

const SERVICES = [
  { label: "Physiotherapy",              href: "/services/physiotherapy" },
  { label: "High-Performance Training",  href: "/services/high-performance-training" },
  { label: "Personal Training",          href: "/services/personal-training" },
  { label: "Team Training",              href: "/services/team-training" },
  { label: "Sport Specific S&C",         href: "/services/sport-specific-conditioning" },
  { label: "Mobility & Flexibility",     href: "/services/mobility-flexibility" },
  { label: "Registered Massage Therapy", href: "/services/massage-therapy" },
  { label: "Courses & Workshops",        href: "/services/courses-workshops" },
];

export default function Navbar({ onAnchorClick }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location    = useLocation();
  const dropdownRef = useRef(null);
  const closeTimer  = useRef(null);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setMobileOpen(false); setDropdownOpen(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleAnchor = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") { window.location.href = `/#${id}`; }
    else { onAnchorClick?.(id); }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}${mobileOpen ? " navbar--mobile-open" : ""}`}>
        <div className="container navbar__inner">

          {/* Logo — winged athlete mark */}
          <Link to="/" className="navbar__logo" aria-label="Prehab Physiotherapy Home">
            <img
              src="/prehab-logo.jpeg"
              alt="Prehab Physiotherapy — Winged Athlete Logo"
              height="58"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span className="navbar__brand-text">
              <span className="navbar__brand-name">PREHAB</span>
              <span className="navbar__brand-sub">Physiotherapy &amp; High Performance</span>
            </span>
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            <ul className="navbar__links">
              <li>
                <Link to="/" className={`navbar__link${location.pathname === "/" ? " navbar__link--active" : ""}`}>
                  Home
                </Link>
              </li>
              <li
                className="navbar__dropdown-wrap"
                ref={dropdownRef}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className="navbar__link navbar__dropdown-trigger"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen(v => !v)}
                >
                  Services <ChevronDown size={15} className={`navbar__chevron${dropdownOpen ? " navbar__chevron--open" : ""}`} />
                </button>
                <ul
                  className={`navbar__dropdown${dropdownOpen ? " navbar__dropdown--open" : ""}`}
                  role="menu"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  {SERVICES.map(s => (
                    <li key={s.href} role="none">
                      <Link to={s.href} className="navbar__dropdown-item" role="menuitem">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li><button className="navbar__link" onClick={() => handleAnchor("reviews")}>Reviews</button></li>
              <li><button className="navbar__link" onClick={() => handleAnchor("contact")}>Contact Us</button></li>
            </ul>
          </nav>

          <div className="navbar__actions">
            <a href="tel:+19058323333" className="navbar__phone" aria-label="Call +1 905 832 3333">
              <Phone size={15} />
              <span>+1 (905) 832-3333</span>
            </a>
            <a
              href="https://prehabphysiotherapy.janeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold"
              aria-label="Book an appointment (opens in new tab)"
            >
              Book Appointment
            </a>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile${mobileOpen ? " navbar__mobile--open" : ""}`} aria-hidden={!mobileOpen}>
          <nav aria-label="Mobile navigation">
            <ul className="navbar__mobile-links">
              <li><Link to="/" className="navbar__mobile-link">Home</Link></li>
              <li>
                <button
                  className="navbar__mobile-link navbar__mobile-section"
                  onClick={() => setDropdownOpen(v => !v)}
                >
                  Services <ChevronDown size={16} className={dropdownOpen ? "rotated" : ""} />
                </button>
                {dropdownOpen && (
                  <ul className="navbar__mobile-sub">
                    {SERVICES.map(s => (
                      <li key={s.href}>
                        <Link to={s.href} className="navbar__mobile-sublink">{s.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><button className="navbar__mobile-link" onClick={() => handleAnchor("reviews")}>Reviews</button></li>
              <li><button className="navbar__mobile-link" onClick={() => handleAnchor("contact")}>Contact Us</button></li>
            </ul>
            <div className="navbar__mobile-footer">
              <a href="tel:+19058323333" className="navbar__mobile-phone">
                <Phone size={18} /> +1 (905) 832-3333
              </a>
              <a
                href="https://prehabphysiotherapy.janeapp.com"
                target="_blank" rel="noopener noreferrer"
                className="btn btn--gold"
              >
                Book Appointment <ExternalLink size={14} />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
