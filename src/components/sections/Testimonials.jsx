import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ExternalLink } from "lucide-react";
import { testimonials } from "../../data/testimonials.js";
import "./Testimonials.css";

function StarRating({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="testimonials" id="reviews" aria-labelledby="testimonials-heading">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Client Stories</span>
          <h2 id="testimonials-heading" className="testimonials__heading">
            Real Results, Real People
          </h2>
          <p className="testimonials__subtitle">
            Hear from the athletes, patients, and community members we've helped.
          </p>
        </motion.div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        <div className="testimonials__footer">
          <p className="testimonials__cta-text">See all our reviews on Google</p>
          <a
            href="https://g.page/r/CePQAEPjANVFEBM"
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials__google-btn"
            aria-label="See all reviews on Google (opens in new tab)"
          >
            View Google Reviews <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      className="t-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <span className="t-card__quote-mark" aria-hidden="true">"</span>
      <blockquote className="t-card__text">
        {testimonial.quote}
      </blockquote>
      <footer className="t-card__footer">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="t-card__avatar"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="t-card__meta">
          <span className="t-card__name">{testimonial.name}</span>
          <span className="t-card__role">{testimonial.role}</span>
        </div>
        <StarRating count={testimonial.stars} />
      </footer>
    </motion.article>
  );
}
