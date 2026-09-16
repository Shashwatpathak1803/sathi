import { useMemo, useState } from 'react';
import { images } from '../data/images';
import { projects } from '../data/projects';
import GalleryFilter from './GalleryFilter';
import Lightbox from './Lightbox';

const projectName = Object.fromEntries(projects.map((p) => [p.slug, p.shortName]));

/**
 * Filterable photo gallery with lightbox.
 * `limit` (optional) shows only the first N photos of the active filter.
 */
export default function Gallery({ limit }) {
  const [active, setActive] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = useMemo(
    () => [
      { value: 'all', label: 'All', count: images.length },
      ...projects.map((p) => ({ value: p.slug, label: p.shortName, count: p.photos.length })),
    ],
    []
  );

  const visible = useMemo(() => {
    const list = active === 'all' ? images : images.filter((img) => img.project === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <div className="gallery">
      <GalleryFilter categories={categories} active={active} onChange={(v) => setActive(v)} />

      <p className="muted small gallery__status" aria-live="polite">
        Showing {visible.length} photo{visible.length === 1 ? '' : 's'}
        {active !== 'all' && ` from ${projectName[active]}`}
      </p>

      <div className="photo-grid" key={active}>
        {visible.map((img, i) => (
          <figure className="photo-tile photo-tile--animate" key={img.src} style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}>
            <button
              type="button"
              className="photo-tile__button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open photo: ${img.caption} (${projectName[img.project]})`}
            >
              <img src={img.src} alt={img.caption} loading="lazy" decoding="async" width={img.width} height={img.height} />
            </button>
            <figcaption className="photo-tile__caption">
              <span className="photo-tile__project">{projectName[img.project]}</span>
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          labelFor={(img) => projectName[img.project]}
        />
      )}
    </div>
  );
}
