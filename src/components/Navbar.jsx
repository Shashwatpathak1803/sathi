import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import Icon from './Icon';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about' },
  { label: 'Our Work', to: '/#our-work' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu whenever the route/hash changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash;
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname.startsWith(to);
  };

  const hasHeroImage = location.pathname === '/' || location.pathname.startsWith('/projects/');
  const transparent = hasHeroImage && !scrolled && !open;

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${transparent ? 'navbar--transparent' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label={`${siteConfig.name} home`}>
          {siteConfig.logo ? (
            <img
              src={transparent && siteConfig.logoLight ? siteConfig.logoLight : siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              className="brand__logo"
              width="56"
              height="60"
            />
          ) : (
            <span className="brand__mark" aria-hidden="true">
              {siteConfig.name.charAt(0)}
            </span>
          )}
          <span className="brand__text">
            <span className="brand__name">{siteConfig.name}</span>
            <span className="brand__sub">{siteConfig.fullName}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>

        <nav id="primary-nav" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={[isActive(l.to) ? 'active' : '', l.highlight ? 'nav__cta' : ''].join(' ').trim() || undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
