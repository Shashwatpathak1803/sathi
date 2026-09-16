import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function ProjectCard({ project }) {
  const { slug, name, summary, coverImage, theme } = project;
  return (
    <article className="project-card">
      <Link to={`/projects/${slug}`} className="project-card__media" tabIndex={-1} aria-hidden="true">
        <img src={coverImage?.src} alt="" loading="lazy" width={coverImage?.width} height={coverImage?.height} />
      </Link>
      <div className="project-card__body">
        <p className="project-card__theme">{theme}</p>
        <h3>{name}</h3>
        <p>{summary}</p>
        <Link to={`/projects/${slug}`} className="btn btn--ghost">
          View Project <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}
