import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import "./Hero.css";

const SLIDES = [
  {
    category: "Physiotherapy",
    heading: "Recover\nStronger.",
    sub: "With Experienced Professionals",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Training-space-1.jpeg",
    alt: "Training space at Prehab Physiotherapy",
    href: "/services/physiotherapy",
  },
  {
    category: "High Performance Training",
    heading: "Perform\nBetter.",
    sub: "Train Safely With Professionals",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Weight-training.jpeg",
    alt: "Weight training session",
    href: "/services/high-performance-training",
  },
  {
    category: "Registered Massage Therapy",
    heading: "Recover\nFaster.",
    sub: "Take Care Of Your Body With Experts",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Massage-2.jpeg",
    alt: "Registered massage therapy",
    href: "/services/massage-therapy",
  },
  {
    category: "Sport Specific S&C",
    heading: "Build\nElite Strength.",
    sub: "Sport-Specific Conditioning Programs",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Barbell-2.jpeg",
    alt: "Barbell strength training",
    href: "/services/sport-specific-conditioning",
  },
  {
    category: "Team Training",
    heading: "Train\nAs One.",
    sub: "Get Your Players Ready For The Season",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Equipment-2.jpeg",
    alt: "Professional training equipment",
    href: "/services/team-training",
  },
  {
    category: "Mobility & Flexibility",
    heading: "Move\nWithout Limits.",
    sub: "Personalised Rehab & Movement Programs",
    src: "https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/04/Waiting-Room.jpeg",
    alt: "Welcoming clinic waiting area",
    href: "/services/mobility-flexibility",
  },
];

export default function Hero({ onAnchorClick }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Prehab Physiotherapy hero"
    >
      {/* Full-bleed background slider */}
      <div className="hero__bg" aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={current}
            className="hero__slide"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="hero__img"
              onError={e => { e.target.style.display = "none"; }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* Top-left: slide counter + category */}
      <div className="hero__meta" aria-hidden="true">
        <span className="hero__counter">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <span className="hero__divider" />
        <motion.span
          key={slide.category}
          className="hero__category"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {slide.category}
        </motion.span>
      </div>

      {/* Centre-left: main heading block */}
      <div className="container hero__content">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="hero__text"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="hero__heading">
              {slide.heading.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "hero__heading-line hero__heading-line--silver" : "hero__heading-line"}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="hero__sub">{slide.sub}</p>

            <div className="hero__ctas">
              <a
                href="https://prehabphysiotherapy.janeapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn-primary"
              >
                Book Appointment
              </a>
              <a href={slide.href} className="hero__btn-ghost">
                Learn More <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom: progress bar + prev/next */}
      <div className="hero__footer">
        {/* Animated progress line */}
        <div className="hero__progress">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__progress-item${i === current ? " hero__progress-item--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="hero__progress-line">
                {i === current && (
                  <motion.span
                    className="hero__progress-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    key={current}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="hero__arrows">
          <button className="hero__arrow" onClick={prev} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button className="hero__arrow" onClick={next} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Right side social / scroll indicator */}
      <div className="hero__aside" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
