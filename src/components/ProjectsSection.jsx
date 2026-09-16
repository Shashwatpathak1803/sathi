import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          id="projects-title"
          title="Our Projects"
          align="center"
        />
        <div className="grid grid--3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
