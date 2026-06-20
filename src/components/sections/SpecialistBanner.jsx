import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import "./SpecialistBanner.css";

export default function SpecialistBanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="specialist" aria-labelledby="specialist-heading">
      <div className="specialist__image-half" aria-hidden="true">
        <img
          src="https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/1_Physiotherapy-scaled.jpg"
          alt="Physiotherapy session at Prehab"
          className="specialist__img"
          loading="lazy"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="specialist__img-overlay" />
      </div>

      <motion.div
        ref={ref}
        className="specialist__content-half"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="eyebrow eyebrow--light">Meet Our Specialist</span>
        <h2 id="specialist-heading" className="specialist__heading">
          Elevating Your Recovery &amp; Enhancing Your Performance
        </h2>
        <p className="specialist__body">
          Whether you're overcoming an injury, managing a chronic condition, or looking to achieve peak performance — our expert team will work with you every step of the way.
        </p>

        <div className="specialist__card">
          <div className="specialist__card-info">
            <span className="specialist__name">Dr. Vasanth Rajan</span>
            <span className="specialist__role">Specialist in Sports Physiotherapy</span>
          </div>
        </div>

        <a
          href="https://prehabphysiotherapy.janeapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="specialist__btn"
          aria-label="Book with Dr. Rajan (opens in new tab)"
        >
          Book With Dr. Rajan <ExternalLink size={16} />
        </a>
      </motion.div>
    </section>
  );
}
