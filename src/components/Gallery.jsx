import { useMemo, useState } from 'react';
import { images } from '../data/images';
import { projects } from '../data/projects';
import GalleryFilter from './GalleryFilter';
import Lightbox from './Lightbox';

const projectName = Object.fromEntries(projects.map((p) => [p.slug, p.shortName]));
const PAGE_SIZE = 24;

/** Image that fades in once loaded and shows a neutral placeholder if it fails. */
function FadeImg({ src, alt, eager }) {
  const [state, setState] = useState('loading');
  return (
    <img
      src={src}
      alt={alt}
      className={`fade-img fade-img--${state}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setState('ready')}
      onError={() => setState('error')}
    />
  );
}

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

  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const list = active === 'all' ? images : images.filter((img) => img.project === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  // Render photos in pages so 100+ large images are not requested at once.
  const visible = useMemo(() => filtered.slice(0, shown), [filtered, shown]);

  return (
    <div className="gallery">
      <GalleryFilter
        categories={categories}
        active={active}
        onChange={(v) => {
          setActive(v);
          setShown(PAGE_SIZE);
        }}
      />

      <p className="muted small gallery__status" aria-live="polite">
        Showing {visible.length} of {filtered.length} photo{filtered.length === 1 ? '' : 's'}
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
              <FadeImg src={img.src} alt={img.caption} eager={i < 8} />
            </button>
            <figcaption className="photo-tile__caption">
              <span className="photo-tile__project">{projectName[img.project]}</span>
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {shown < filtered.length && (
        <div className="gallery__more">
          <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + PAGE_SIZE)}>
            Show more photos ({filtered.length - shown} remaining)
          </button>
        </div>
      )}

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
