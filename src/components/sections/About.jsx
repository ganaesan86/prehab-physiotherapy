import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Users, Heart, Shield } from "lucide-react";
import "./About.css";

const SPECIALIZATIONS = [
  "Physiotherapy",
  "High-Performance Training",
  "Personal Training",
  "Team Training",
  "Sport-Specific S&C",
  "Martial Arts",
  "Registered Massage Therapy",
  "Mobility & Flexibility",
];

const FEATURES = [
  {
    icon: Users,
    title: "Team of Experts",
    desc: "Highly skilled practitioners delivering exceptional, individualized service.",
  },
  {
    icon: Heart,
    title: "Welcoming Atmosphere",
    desc: "A supportive community that inspires confidence and belonging.",
  },
  {
    icon: Shield,
    title: "Preventative Care",
    desc: "Focused on preventing injuries and improving overall well-being.",
  },
];

export default function About() {
  const [leftRef, leftInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [rightRef, rightInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="container about__inner">
        {/* Left Column */}
        <motion.div
          ref={leftRef}
          className="about__text"
          initial={{ opacity: 0, x: -40 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow">Who We Are</span>
          <h2 id="about-heading" className="about__heading">
            More Than a Clinic —<br />A Community
          </h2>
          <p className="about__body">
            We are a community hub where clients and practitioners build strong connections. Whether you're here for treatment, training, or recovery, you'll find a welcoming atmosphere and a team that takes the time to understand your unique needs and goals.
          </p>
          <p className="about__body">
            Our goal is to work with you to ensure your condition, strength, and abilities are continuously improving. Our experienced practitioners assess your condition, collaborate with you on a treatment plan, and support you throughout your journey.
          </p>

          <div className="about__specs">
            {SPECIALIZATIONS.map((s) => (
              <div key={s} className="about__spec-item">
                <CheckCircle size={16} className="about__check" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          <div className="about__features">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="about__feature-card">
                <Icon size={22} className="about__feature-icon" />
                <div>
                  <h3 className="about__feature-title">{title}</h3>
                  <p className="about__feature-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          ref={rightRef}
          className="about__visual"
          initial={{ opacity: 0, x: 40 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div className="about__img-wrap">
            <div className="about__img-deco" aria-hidden="true" />
            <img
              src="https://dodgerblue-emu-473896.hostingersite.com/wp-content/uploads/2025/05/Screenshot-2025-05-31-at-22.27.14.png"
              alt="Prehab Physiotherapy clinic overview"
              className="about__img"
              loading="lazy"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <div className="about__stat-row">
            <div className="about__stat">
              <span className="about__stat-num">3+</span>
              <span className="about__stat-label">Years Serving Maple</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">9</span>
              <span className="about__stat-label">Specialist Services</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">500+</span>
              <span className="about__stat-label">Clients Helped</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
