import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { legalGroups, legalHighlights } from '../data/legalDocuments';
import { siteConfig } from '../data/siteConfig';

const href = (file) => `/legal-documents/${file}`;
const docCount = legalGroups.reduce((n, g) => n + g.docs.length, 0);

function DocCard({ doc }) {
  const type = doc.type || 'PDF';
  return (
    <article className={`doc-card ${doc.file ? '' : 'doc-card--static'}`}>
      <div className="doc-card__top">
        <span className="doc-card__type">{doc.file ? type : doc.pending ? 'Pending' : 'Record'}</span>
        {doc.year && <span className="doc-card__year">{doc.year}</span>}
      </div>
      <h3>{doc.title}</h3>
      <p>{doc.text}</p>

      {doc.details && (
        <dl className="doc-card__details">
          {doc.details.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {doc.file && (
        <div className="doc-card__actions">
          <a className="btn btn--primary btn--sm" href={href(doc.file)} target="_blank" rel="noopener noreferrer">
            View <Icon name="external" size={16} />
          </a>
          <a className="btn btn--ghost btn--sm" href={href(doc.file)} download>
            Download{doc.size ? ` · ${doc.size}` : ''}
          </a>
        </div>
      )}
      {doc.pending && (
        <p className="doc-card__note">
          A scanned copy is being updated. Please <Link to="/#contact">contact us</Link> to request it.
        </p>
      )}
    </article>
  );
}

export default function LegalPage() {
  useEffect(() => {
    document.title = `Legal Documents | ${siteConfig.name}`;
    return () => {
      document.title = `${siteConfig.name} | ${siteConfig.fullName}`;
    };
  }, []);

  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Transparency</p>
          <h1>Legal Documents</h1>
          <p>
            Official registrations, compliance certificates, audit reports and filings of {siteConfig.name}. {docCount} records
            are published here for donors, partners and the public.
          </p>
        </div>
      </section>

      <section className="section legal">
        <div className="container">
          <ul className="legal-highlights">
            {legalHighlights.map((h) => (
              <li key={h.label}>
                <span>{h.label}</span>
                <strong>{h.value}</strong>
                <small>{h.note}</small>
              </li>
            ))}
          </ul>

          <nav className="legal-jump" aria-label="Jump to a document group">
            {legalGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="chip">
                {g.title}
                <span className="chip__count">{g.docs.length}</span>
              </a>
            ))}
          </nav>

          {legalGroups.map((g) => (
            <Reveal as="section" key={g.id} id={g.id} className="legal-group" aria-labelledby={`${g.id}-title`}>
              <header className="legal-group__head">
                <span className="legal-group__icon">
                  <Icon name={g.icon} size={22} />
                </span>
                <div>
                  <h2 id={`${g.id}-title`}>{g.title}</h2>
                  <p>{g.intro}</p>
                </div>
              </header>
              <div className="doc-grid">
                {g.docs.map((d) => (
                  <DocCard key={d.title} doc={d} />
                ))}
              </div>
            </Reveal>
          ))}

          <div className="legal-help">
            <h2>Need additional information?</h2>
            <p>For compliance queries, document verification or other organisational information, please get in touch.</p>
            <div className="legal-help__actions">
              <a className="btn btn--accent" href={`mailto:${siteConfig.contact.email}`}>
                <Icon name="mail" size={18} /> {siteConfig.contact.email}
              </a>
              <a className="btn btn--ghost" href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`}>
                <Icon name="phone" size={18} /> {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
