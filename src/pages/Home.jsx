import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Services from "../components/sections/Services.jsx";
import SpecialistBanner from "../components/sections/SpecialistBanner.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function Home({ onAnchorClick }) {
  return (
    <main id="main-content">
      <Hero onAnchorClick={onAnchorClick} />
      <About />
      <Services />
      <SpecialistBanner />
      <Testimonials />
      <Contact />
    </main>
  );
}
