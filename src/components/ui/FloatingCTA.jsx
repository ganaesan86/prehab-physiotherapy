import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import "./FloatingCTA.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`floating-cta${visible ? " floating-cta--visible" : ""}`} aria-hidden={!visible}>
      <a
        href="https://prehabphysiotherapy.janeapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta__btn"
        tabIndex={visible ? 0 : -1}
        aria-label="Book an appointment (opens in new tab)"
      >
        Book Now <ExternalLink size={15} />
      </a>
    </div>
  );
}
