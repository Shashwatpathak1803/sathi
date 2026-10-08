import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { projects } from '../data/projects';

const socialLabels = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'X (Twitter)', youtube: 'YouTube', linkedin: 'LinkedIn' };

export default function Footer() {
  const { name, fullName, tagline, contact, social } = siteConfig;
  const socialLinks = Object.entries(social).filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          {siteConfig.logoLight && (
            <img src={siteConfig.logoLight} alt="" className="footer__logo" width="72" height="78" loading="lazy" />
          )}
          <p className="footer__name">{name}</p>
          <p className="footer__full">{fullName}</p>
          <p>{tagline}</p>
          {socialLinks.length > 0 && (
            <ul className="footer__social" aria-label="Social media">
              {socialLinks.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {socialLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#our-work">Our Work</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/our-board">Board & Team</Link></li>
            <li><Link to="/legal-documents">Legal Documents</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Projects">
          <h3>Projects</h3>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>Contact</h3>
          <address>
            <p>{contact.registeredOffice}</p>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
            </p>
          </address>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
