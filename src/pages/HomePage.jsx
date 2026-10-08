import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsSection from '../components/ProjectExplorer';
import Leadership from '../components/Leadership';
import Partners from '../components/Partners';
import DonateSection from '../components/DonateSection';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Leadership />
      <Partners />
      <DonateSection />
      <Contact />
    </>
  );
}
