import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, MapPin, Calendar, CheckCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "../ui/SocialIcons.jsx";
import "./Contact.css";

const SERVICE_OPTIONS = [
  "General Enquiry",
  "Physiotherapy",
  "High-Performance Training",
  "Personal Training",
  "Team Training",
  "Sport Specific S&C",
  "Martial Arts",
  "Mobility & Flexibility",
  "Registered Massage Therapy",
  "Courses & Workshops",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend / email service (e.g. EmailJS, Formspree, or custom API)
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left: Info */}
          <div className="contact__info">
            <span className="eyebrow">Get In Touch</span>
            <h2 id="contact-heading" className="contact__heading">Clinic Enquiries</h2>
            <p className="contact__intro">
              Not sure if Prehab is right for you? Contact us with your concerns and we'll help you determine the best plan for your needs.
            </p>

            <ul className="contact__details">
              <li className="contact__detail">
                <Phone size={20} className="contact__detail-icon" />
                <div>
                  <span className="contact__detail-label">Phone</span>
                  <a href="tel:+19058323333" className="contact__detail-value">
                    +1 (905) 832-3333
                  </a>
                </div>
              </li>
              <li className="contact__detail">
                <MapPin size={20} className="contact__detail-icon" />
                <div>
                  <span className="contact__detail-label">Address</span>
                  <span className="contact__detail-value">
                    10 Richmond Street, Unit 300<br />Maple, Ontario, L6A 3Y8
                  </span>
                </div>
              </li>
              <li className="contact__detail">
                <Calendar size={20} className="contact__detail-icon" />
                <div>
                  <span className="contact__detail-label">Book Online</span>
                  <a
                    href="https://prehabphysiotherapy.janeapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__detail-value"
                  >
                    Book via Jane App →
                  </a>
                </div>
              </li>
            </ul>

            <div className="contact__hours">
              <h3 className="contact__hours-title">Hours</h3>
              <dl className="contact__hours-list">
                <div><dt>Mon – Fri</dt><dd>7:00 am – 8:00 pm</dd></div>
                <div><dt>Saturday</dt><dd>8:00 am – 4:00 pm</dd></div>
                <div><dt>Sunday</dt><dd>Closed</dd></div>
              </dl>
            </div>

            <div className="contact__socials">
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

          {/* Right: Form */}
          <div className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success" role="alert">
                <CheckCircle size={40} className="contact__success-icon" />
                <h3>Thanks for reaching out!</h3>
                <p>We'll be in touch shortly to help you with your enquiry.</p>
                <button
                  className="contact__success-reset"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <h3 className="contact__form-title">Send Us a Message</h3>

                <div className="contact__field">
                  <label htmlFor="name" className="contact__label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="contact__input"
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="email" className="contact__label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="contact__input"
                      autoComplete="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="phone" className="contact__label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="contact__input"
                      autoComplete="tel"
                      placeholder="+1 (905) 000-0000"
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="service" className="contact__label">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="contact__input contact__select"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message" className="contact__label">Message / Query *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="contact__input contact__textarea"
                    rows={5}
                    placeholder="Tell us about your condition, goals, or any questions you have..."
                  />
                </div>

                <button type="submit" className="contact__submit">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Map */}
        <div className="contact__map-wrap">
          <iframe
            title="Prehab Physiotherapy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d719.2513053013315!2d-79.51163584613649!3d43.8557204538434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b29a9597b2c2f%3A0x45d3004ea300d0e3!2sPrehab%20Physiotherapy%20%26%20High%20Performance%20Training%20Center!5e0!3m2!1sen!2sin!4v1738544653936!5m2!1sen!2sin"
            className="contact__map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Maps location of Prehab Physiotherapy"
          />
        </div>
      </div>
    </section>
  );
}
