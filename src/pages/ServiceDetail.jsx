import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Phone } from "lucide-react";
import { services } from "../data/services.js";
import {
  Activity, Zap, User, Users, Target, Shield,
  RefreshCw, Heart, BookOpen,
} from "lucide-react";
import "./ServiceDetail.css";

const ICON_MAP = {
  Activity, Zap, User, Users, Target, Shield, RefreshCw, Heart, BookOpen,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.href === `/services/${slug}`);

  if (!service) {
    return (
      <div className="service-detail service-detail--not-found">
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/" className="service-detail__back">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[service.icon] || Activity;

  return (
    <div className="service-detail">
      <div className="service-detail__hero">
        <div className="container">
          <Link to="/#services" className="service-detail__back">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="service-detail__header">
            <div className="service-detail__icon-wrap">
              <Icon size={36} />
            </div>
            <span className="service-detail__num">{String(service.id).padStart(2, "0")}</span>
          </div>
          <h1 className="service-detail__title">{service.title}</h1>
          <p className="service-detail__desc">{service.description}</p>
        </div>
      </div>

      <div className="container service-detail__body">
        <div className="service-detail__content">
          <h2>What to Expect</h2>
          <p>
            At Prehab Physiotherapy, our {service.title} program is designed around your individual goals and needs. Our experienced practitioners will conduct a thorough assessment, develop a personalized treatment plan, and guide you through every stage of your journey.
          </p>
          <p>
            Whether you're recovering from an injury, building strength, or working to prevent future issues, we are committed to delivering the highest standard of care in a welcoming, community-oriented environment.
          </p>

          <h2>Why Choose Prehab</h2>
          <ul>
            <li>Experienced, certified practitioners</li>
            <li>Evidence-based, results-driven approach</li>
            <li>Personalized treatment plans</li>
            <li>State-of-the-art facilities in Maple, Ontario</li>
            <li>Supportive community atmosphere</li>
          </ul>
        </div>

        <aside className="service-detail__cta-panel">
          <h3>Ready to Get Started?</h3>
          <p>Book your appointment online or give us a call. Our team is ready to help.</p>
          <a
            href="https://prehabphysiotherapy.janeapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="service-detail__btn-primary"
            aria-label="Book an appointment (opens in new tab)"
          >
            Book Appointment <ExternalLink size={15} />
          </a>
          <a href="tel:+19058323333" className="service-detail__btn-secondary">
            <Phone size={15} /> +1 (905) 832-3333
          </a>
          <div className="service-detail__address">
            <strong>Location</strong>
            <span>10 Richmond Street, Unit 300<br />Maple, Ontario L6A 3Y8</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
