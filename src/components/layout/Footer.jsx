import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "../ui/SocialIcons.jsx";
import "./Footer.css";

const SERVICE_LINKS = [
  { label: "Physiotherapy", href: "/services/physiotherapy" },
  { label: "High-Performance Training", href: "/services/high-performance-training" },
  { label: "Personal Training", href: "/services/personal-training" },
  { label: "Team Training", href: "/services/team-training" },
  { label: "Sport Specific S&C", href: "/services/sport-specific-conditioning" },
  { label: "Mobility & Flexibility", href: "/services/mobility-flexibility" },
  { label: "Registered Massage Therapy", href: "/services/massage-therapy" },
  { label: "Courses & Workshops", href: "/services/courses-workshops" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" aria-label="Prehab Physiotherapy">
            <img
              src="https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/06/Prehab-Physio-Logo-80x84.jpg"
              alt="Prehab Physiotherapy Logo"
              height="60"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Link>
          <p className="footer__tagline">
            Your community hub for physiotherapy, high performance training, and massage therapy in Maple, Ontario.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com/agilestudio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="https://instagram.com/agilestudio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <XIcon size={20} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h3 className="footer__heading">Services</h3>
          <ul className="footer__links">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="footer__link">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            <li><Link to="/" className="footer__link">Home</Link></li>
            <li><a href="/#services" className="footer__link">Services</a></li>
            <li><a href="/#reviews" className="footer__link">Reviews</a></li>
            <li><a href="/#contact" className="footer__link">Contact Us</a></li>
            <li>
              <a
                href="https://prehabphysiotherapy.janeapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__contact">
            <li>
              <Phone size={16} className="footer__icon" />
              <a href="tel:+19058323333" className="footer__link">+1 (905) 832-3333</a>
            </li>
            <li>
              <MapPin size={16} className="footer__icon" />
              <span>10 Richmond Street, Unit 300, Maple, ON L6A 3Y8</span>
            </li>
            <li>
              <Clock size={16} className="footer__icon" />
              <span>Mon–Fri 7am–8pm<br />Sat 8am–4pm · Sun Closed</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Prehab Physiotherapy & High Performance Training Center. All rights reserved.</p>
          <p>10 Richmond Street, Unit 300, Maple, Ontario</p>
        </div>
      </div>
    </footer>
  );
}
