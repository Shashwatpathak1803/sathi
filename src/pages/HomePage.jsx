import Hero from '../components/Hero';
import About from '../components/About';
import FocusAreas from '../components/FocusAreas';
import ProjectsSection from '../components/ProjectsSection';
import Partners from '../components/Partners';
import DonateSection from '../components/DonateSection';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FocusAreas />
      <ProjectsSection />
      <Partners />
      <DonateSection />
      <Contact />
    </>
  );
}
