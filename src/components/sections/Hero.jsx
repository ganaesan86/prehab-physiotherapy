import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import "./Hero.css";

const IMAGES = [
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Training-space-1.jpeg",
    alt: "Training space at Prehab Physiotherapy",
  },
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Weight-training.jpeg",
    alt: "Weight training session",
  },
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Massage-2.jpeg",
    alt: "Registered massage therapy",
  },
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Barbell-2.jpeg",
    alt: "Barbell strength training",
  },
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Equipment-2.jpeg",
    alt: "Professional training equipment",
  },
  {
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Waiting-Room.jpeg",
    alt: "Welcoming clinic waiting area",
  },
];

export default function Hero({ onAnchorClick }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Welcome to Prehab Physiotherapy"
    >
      {/* Background Images */}
      <div className="hero__bg" aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={current}
            className="hero__slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img
              src={IMAGES[current].src}
              alt={IMAGES[current].alt}
              className="hero__img"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* Decorative corner bracket */}
      <div className="hero__bracket" aria-hidden="true" />

      {/* Content */}
      <div className="container hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="hero__eyebrow">Maple, Ontario — High Performance Care</span>
          <h1 className="hero__heading">
            Recover Stronger.<br />
            <em>Perform Better.</em>
          </h1>
          <p className="hero__sub">
            Physiotherapy, strength &amp; conditioning, and massage therapy — all in one community-driven clinic.
          </p>
          <div className="hero__ctas">
            <a
              href="https://prehabphysiotherapy.janeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--primary"
            >
              Book Appointment <ExternalLink size={16} />
            </a>
            <button
              className="hero__btn hero__btn--secondary"
              onClick={() => onAnchorClick?.("services")}
            >
              Our Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Controls */}
      <div className="hero__controls" aria-label="Slider controls">
        <button
          className="hero__arrow hero__arrow--prev"
          onClick={prev}
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="hero__dots">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === current ? " hero__dot--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
        <button
          className="hero__arrow hero__arrow--next"
          onClick={next}
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
