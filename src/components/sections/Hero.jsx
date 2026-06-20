import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import "./Hero.css";

const IMAGES = [
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Training-space-1.jpeg", alt: "Training space at Prehab Physiotherapy" },
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Weight-training.jpeg", alt: "Weight training session" },
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Massage-2.jpeg", alt: "Registered massage therapy" },
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Barbell-2.jpeg", alt: "Barbell strength training" },
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Equipment-2.jpeg", alt: "Professional training equipment" },
  { src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Waiting-Room.jpeg", alt: "Welcoming clinic waiting area" },
];

const STATS = [
  { num: "3+", label: "Years in Maple" },
  { num: "9", label: "Specialist Services" },
  { num: "500+", label: "Clients Helped" },
  { num: "5★", label: "Google Rating" },
];

export default function Hero({ onAnchorClick }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % IMAGES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + IMAGES.length) % IMAGES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5200);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Welcome to Prehab Physiotherapy"
    >
      {/* Background slider */}
      <div className="hero__bg" aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={current}
            className="hero__slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <img
              src={IMAGES[current].src}
              alt={IMAGES[current].alt}
              className="hero__img"
              onError={e => { e.target.style.display = "none"; }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="container hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Maple, Ontario — High Performance Care
          </span>

          <h1 className="hero__heading">
            Recover Stronger.<br />
            <em>Perform Better.</em>
          </h1>

          <p className="hero__sub">
            Physiotherapy, strength &amp; conditioning, and massage therapy —
            all in one community-driven clinic.
          </p>

          <div className="hero__ctas">
            <a
              href="https://prehabphysiotherapy.janeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
              aria-label="Book an appointment (opens in new tab)"
            >
              Book Appointment <ExternalLink size={14} />
            </a>
            <button
              className="btn-outline-light"
              onClick={() => onAnchorClick?.("services")}
            >
              Our Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="hero__stats" aria-label="Quick stats">
        {STATS.map(s => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-num">{s.num}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Slide dots */}
      <div className="hero__dots">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot${i === current ? " hero__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <div className="hero__controls">
        <button className="hero__arrow" onClick={prev} aria-label="Previous"><ChevronLeft size={18} /></button>
        <button className="hero__arrow" onClick={next} aria-label="Next"><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
