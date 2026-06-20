import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  Activity, Zap, User, Users, Target, Shield,
  RefreshCw, Heart, BookOpen, ArrowRight,
} from "lucide-react";
import { services } from "../../data/services.js";
import "./Services.css";

const ICON_MAP = {
  Activity, Zap, User, Users, Target, Shield, RefreshCw, Heart, BookOpen,
};

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = ICON_MAP[service.icon] || Activity;

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="service-card__badge" aria-hidden="true">
        {String(service.id).padStart(2, "0")}
      </span>
      <Icon size={32} className="service-card__icon" aria-hidden="true" />
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <Link to={service.href} className="service-card__link" aria-label={`Learn more about ${service.title}`}>
        Learn more <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="services__header"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">What We Offer</span>
          <h2 id="services-heading" className="services__heading">
            Orthopedic for Today's Lifestyle
          </h2>
          <p className="services__subtitle">
            We have all your sports physio needs covered — from injury recovery to elite performance.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="services__cta">
          <a
            href="https://prehabphysiotherapy.janeapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            aria-label="Book an appointment (opens in new tab)"
          >
            Book Your Appointment
          </a>
          <span className="services__phone-note">
            Or call us at{" "}
            <a href="tel:+19058323333" className="services__phone-link">
              +1 (905) 832-3333
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
