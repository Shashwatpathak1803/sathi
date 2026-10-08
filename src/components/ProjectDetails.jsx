import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

/** Reusable project detail layout. */
export default function ProjectDetails({ project, otherProjects = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { name, subtitle, theme, overview, activities, photos, coverImage, location, duration } = project;

  return (
    <article className="project-detail">
      <div className="project-detail__banner">
        <img src={coverImage?.src} alt="" loading="eager" width={coverImage?.width} height={coverImage?.height} />
        <div className="project-detail__banner-overlay" aria-hidden="true" />
        <div className="container project-detail__banner-content">
          <Link to="/#our-work" className="back-link">
            <Icon name="chevronLeft" size={18} /> Our Work
          </Link>
          <p className="project-detail__theme">{theme}</p>
          <h1>{name}</h1>
          {subtitle && <p className="project-detail__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="container project-detail__layout section">
        <div className="project-detail__main">
          <Reveal>
            <h2>Overview</h2>
            <p className="lead">{overview}</p>
          </Reveal>
          <Reveal>
            <h2>Key Activities</h2>
            <ul className="check-list">
              {activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="project-detail__aside" aria-label="Project information">
          <div className="info-card">
            <h3>Project Information</h3>
            <dl>
              <div>
                <dt>
                  <Icon name="pin" size={18} /> Location
                </dt>
                <dd>{location}</dd>
              </div>
              <div>
                <dt>
                  <Icon name="calendar" size={18} /> Duration
                </dt>
                <dd>{duration}</dd>
              </div>
              <div>
                <dt>
                  <Icon name="people" size={18} /> Photographs
                </dt>
                <dd>{photos.length} from the field</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <section className="container section section--flush-top" aria-labelledby="project-gallery-title">
        <h2 id="project-gallery-title">Photo Gallery</h2>
        <div className="photo-grid">
          {photos.map((img, i) => (
            <Reveal key={img.src} className="photo-tile" delay={(i % 4) * 50}>
              <button
                type="button"
                className="photo-tile__button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open photo: ${img.caption}`}
              >
                <img src={img.src} alt={img.caption} loading="lazy" width={img.width} height={img.height} />
              </button>
              <p className="photo-tile__caption">{img.caption}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="container section section--flush-top" aria-labelledby="other-projects-title">
          <h2 id="other-projects-title">Other Projects</h2>
          <ul className="pill-list">
            {otherProjects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`} className="pill">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          labelFor={() => name}
        />
      )}
    </article>
  );
}
