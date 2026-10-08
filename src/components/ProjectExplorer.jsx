import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalog } from '../data/catalog';
import { getCategory, categories } from '../data/categories';
import { imageByFile } from '../data/images';
import { getProject, projects } from '../data/projects';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const nf = new Intl.NumberFormat('en-IN');

const statLabels = {
  pop: 'People reached',
  fam: 'Families',
  cso: 'CSOs',
  fel: 'Fellows / CRPs',
  dist: 'Districts',
  blk: 'Blocks',
  vil: 'Villages / GPs',
  sch: 'Schools',
};
const singular = { dist: 'District', blk: 'Block', sch: 'School', fam: 'Family', cso: 'CSO' };
const labelFor = (k, v) => (v === 1 && singular[k]) || statLabels[k];
const statOrder = ['pop', 'fam', 'cso', 'fel', 'dist', 'blk', 'vil', 'sch'];

/** Photos chosen from the field-photo library to match what the project does (see catalog.js `photos`). */
function photosFor(p) {
  const list = (p.photos || []).map(imageByFile).filter(Boolean);
  if (list.length < 2 || p.slug) return list;
  // projects sharing a photo set start at different photos, so neighbouring cards look different
  const h = [...p.id].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) >>> 0, 7) % list.length;
  return [...list.slice(h), ...list.slice(0, h)];
}

/** Cover photo: the project's best-matching photo, or none (a plain icon is shown instead). */
function coverFor(p) {
  const first = photosFor(p)[0];
  if (first) return first.src;
  // programme cover from the photo-story page, if the project has one
  return (p.slug && getProject(p.slug)?.coverImage?.src) || null;
}

function Media({ p, className }) {
  const cat = getCategory(p.category);
  const src = coverFor(p);
  return (
    <div className={`${className} ${src ? '' : 'media--plain'}`} style={{ '--hue': cat.hue }}>
      {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <Icon name={cat.icon} size={56} />}
    </div>
  );
}

const statusLabel = (s) => (s === 'ongoing' ? 'Ongoing' : 'Completed');

function ProjectCard({ p, onOpen }) {
  const cat = getCategory(p.category);
  const multi = p.phases.length > 1;
  // single-phase projects show their key numbers on the card; phased ones show them inside the details
  const stats = multi ? {} : p.phases[0].stats;
  const keyStats = statOrder.filter((k) => stats[k]).slice(0, 3);
  return (
    <article className="pcard" style={{ '--hue': cat.hue }}>
      <button type="button" className="pcard__open" onClick={() => onOpen(p)} aria-label={`View details: ${p.title}`}>
        <Media p={p} className="pcard__media" />
        <span className={`badge badge--${p.status}`}>{statusLabel(p.status)}</span>
      </button>
      <div className="pcard__body">
        {p.period && (
          <p className="pcard__period">
            <Icon name="calendar" size={15} /> {p.period}
          </p>
        )}
        <h3>{p.title}</h3>
        <p className="pcard__summary">{p.summary}</p>
        {(multi || keyStats.length > 0) && (
          <ul className="pcard__stats">
            {multi && (
              <li className="pcard__phases">
                <strong>{p.phases.length}</strong> {p.phases[0].label?.startsWith('Phase') ? 'phases' : 'parts'}
              </li>
            )}
            {keyStats.map((k) => (
              <li key={k}>
                <strong>{nf.format(stats[k])}</strong> {labelFor(k, stats[k])}
              </li>
            ))}
          </ul>
        )}
        <div className="pcard__foot">
          <span className="pcard__donor" title={p.donor}>
            {p.donor ? `Supported by ${p.donor}` : 'SATHI-UP field programme'}
          </span>
          <button type="button" className="link-btn" onClick={() => onOpen(p)}>
            Details <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ p, onClose }) {
  const cat = getCategory(p.category);
  const photos = useMemo(() => photosFor(p).slice(0, 6), [p]);
  const multi = p.phases.length > 1;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="pmodal" role="dialog" aria-modal="true" aria-label={p.title} onClick={onClose}>
      <div className="pmodal__panel" style={{ '--hue': cat.hue }} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pmodal__close" onClick={onClose} aria-label="Close details">
          <Icon name="close" />
        </button>
        <Media p={p} className="pmodal__hero" />
        <div className="pmodal__body">
          <div className="pmodal__tags">
            <span className="tag">{cat.title}</span>
            <span className={`badge badge--inline badge--${p.status}`}>{statusLabel(p.status)}</span>
          </div>
          <h3 className="pmodal__title">{p.title}</h3>
          <p className="lead">{p.summary}</p>

          {multi && (
            <p className="pmodal__phasenav muted small">
              {p.period} · {p.phases.length} {p.phases[0].label?.startsWith('Phase') ? 'phases' : 'parts'}:{' '}
              {p.phases.map((ph) => ph.label).join(' → ')}
            </p>
          )}

          {p.phases.map((ph, i) => {
            const stats = statOrder.filter((k) => ph.stats[k]);
            return (
              <section className={multi ? 'phase' : 'phase phase--single'} key={ph.label || i}>
                {multi && (
                  <header className="phase__head">
                    <h4>{ph.label}</h4>
                    <span className={`badge badge--inline badge--${ph.status}`}>{statusLabel(ph.status)}</span>
                  </header>
                )}
                {multi && ph.summary && <p className="phase__summary">{ph.summary}</p>}
                {!multi && ph.summary && ph.activities && <p className="phase__summary">{ph.summary}</p>}

                {(ph.period || ph.donor || ph.beneficiaries) && (
                  <dl className="pmodal__facts">
                    {ph.period && (
                      <div>
                        <dt>Period</dt>
                        <dd>{ph.period}</dd>
                      </div>
                    )}
                    {ph.donor && (
                      <div>
                        <dt>Supported by</dt>
                        <dd>{ph.donor}</dd>
                      </div>
                    )}
                    {ph.beneficiaries && (
                      <div>
                        <dt>Beneficiaries</dt>
                        <dd>{ph.beneficiaries}</dd>
                      </div>
                    )}
                  </dl>
                )}

                {stats.length > 0 && (
                  <div className="pmodal__stats">
                    {stats.map((k) => (
                      <div key={k}>
                        <strong>{nf.format(ph.stats[k])}</strong>
                        <span>{labelFor(k, ph.stats[k])}</span>
                      </div>
                    ))}
                  </div>
                )}

                {ph.outcomes.length > 0 && (
                  <>
                    <h5>Major results &amp; outcomes</h5>
                    <ul className="check-list">
                      {ph.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </>
                )}
                {ph.activities?.length > 0 && (
                  <>
                    <h5>Key activities</h5>
                    <ul className="check-list">
                      {ph.activities.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            );
          })}

          {photos?.length > 0 && (
            <>
              <h4>From the field</h4>
              <div className="pmodal__photos">
                {photos.map((ph) => (
                  <figure key={ph.src}>
                    <img src={ph.src} alt={ph.caption} loading="lazy" decoding="async" />
                    <figcaption>{ph.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {p.slug && (
                <Link to={`/projects/${p.slug}`} className="btn btn--primary" onClick={onClose}>
                  View full photo story <Icon name="arrow" size={18} />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectExplorer() {
  const [active, setActive] = useState(null);
  const [status, setStatus] = useState('all');
  const [open, setOpen] = useState(null);

  const cat = active ? getCategory(active) : null;
  const list = useMemo(() => {
    const items = catalog.filter((p) => p.category === active && (status === 'all' || p.status === status));
    // ongoing first, then newest first
    return [...items].sort((a, b) => (a.status === b.status ? b.year - a.year : a.status === 'ongoing' ? -1 : 1));
  }, [active, status]);

  const choose = (key) => {
    setActive(key);
    setStatus('all');
    requestAnimationFrame(() =>
      document.getElementById('project-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const ongoingTotal = catalog.filter((p) => p.status === 'ongoing').length;

  return (
    <section id="our-work" className="section section--tint" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          eyebrow="Our Work"
          id="work-title"
          title="Where We Focus Our Work"
          text={`${catalog.length} projects since 2007, ${ongoingTotal} of them ongoing. Choose an area of work to see its projects, partners and results.`}
          align="center"
        />

        <div className="cat-grid">
          {categories.map((c, i) => (
            <Reveal key={c.key} delay={(i % 4) * 60}>
              <button
                type="button"
                aria-pressed={active === c.key}
                className={`cat-card ${active === c.key ? 'cat-card--active' : ''}`}
                style={{ '--hue': c.hue }}
                onClick={() => choose(c.key)}
              >
                <img src={c.coverSrc} alt="" loading="lazy" decoding="async" />
                <span className="cat-card__shade" aria-hidden="true" />
                <span className="cat-card__icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="cat-card__text">
                  <strong>{c.title}</strong>
                  <small>
                    {c.total} project{c.total === 1 ? '' : 's'}
                    {c.ongoing > 0 && ` · ${c.ongoing} ongoing`}
                  </small>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div id="project-results" className="results" aria-live="polite">
          {!cat && <p className="results__hint">Select a category above to explore its projects.</p>}
          {cat && (
            <>
              <div className="results__head" style={{ '--hue': cat.hue }}>
                <div>
                  <h3>{cat.title}</h3>
                  <p>{cat.blurb}</p>
                </div>
                <div className="seg" role="group" aria-label="Filter by status">
                  {[
                    ['all', 'All'],
                    ['ongoing', 'Ongoing'],
                    ['completed', 'Completed'],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      className={status === v ? 'seg--on' : ''}
                      aria-pressed={status === v}
                      onClick={() => setStatus(v)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              {list.length === 0 ? (
                <p className="results__hint">No {status} projects in this category.</p>
              ) : (
                <div className="grid grid--3" key={`${active}-${status}`}>
                  {list.map((p, i) => (
                    <div className="rise" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }} key={p.id}>
                      <ProjectCard p={p} onOpen={setOpen} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="photo-stories">
          <h3>Field programmes &amp; photo stories</h3>
          <ul className="pill-list">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`} className="pill">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {open && <ProjectModal p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
