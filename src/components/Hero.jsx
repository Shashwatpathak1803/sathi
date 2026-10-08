import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import CountUp from './CountUp';
import Icon from './Icon';
import Typewriter from './Typewriter';

import slide1 from '../assets/projects/erw/hamlet-level-dialogue-women-raising-concerns-and-planning-collective-a.jpg';
import slide2 from '../assets/projects/erw/collective-celebration-of-international-women-s-day.jpg';
import slide3 from '../assets/projects/scope/digital-school-innovative-learning-activity-by-a-partner-cso.jpg';
import slide4 from '../assets/projects/smhm/school-awareness-session.jpg';
import slide5 from '../assets/projects/mrc-banda/information-session-on-safe-migration.jpg';

// Add or remove slides here. Each needs a photo and alt text.
const slides = [
  { src: slide1, alt: 'Nari Sangh women sitting in a circle during a hamlet-level meeting, discussing a chart together' },
  { src: slide2, alt: 'Large gathering of women at an International Women’s Day celebration' },
  { src: slide3, alt: 'Children and community members outside a digital school run by a partner CSO' },
  { src: slide4, alt: 'Adolescent girls raising their hands during a school awareness session' },
  { src: slide5, alt: 'Community members at an information session on safe migration' },
];

// Phrases typed after "Building Stronger Communities Through".
const phrases = ['Awareness', 'Empowerment', 'Collective Action', 'Education & Learning', 'Health & Nutrition'];

const INTERVAL_MS = 5500;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || slides.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [index]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__slides" aria-hidden="true">
        {slides.map((s, i) => (
          <img
            key={s.src}
            className={`hero__image ${i === index ? 'is-active' : ''}`}
            src={s.src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchpriority={i === 0 ? 'high' : undefined}
            width="1600"
            height="900"
          />
        ))}
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__content">
        <p className="hero__eyebrow">
          <span className="hero__dot" /> Serving Uttar Pradesh since {siteConfig.foundedYear}
        </p>
        <h1 id="hero-title">
          Building Stronger Communities Through <span className="hero__typed"><Typewriter phrases={phrases} /></span>
        </h1>
        <p className="hero__lead">Working with communities, women, children and local partners across Uttar Pradesh.</p>
        <div className="hero__actions">
          <Link to="/#our-work" className="btn btn--accent btn--lg">
            Explore Our Work <Icon name="arrow" size={20} />
          </Link>
          <Link to="/#about" className="btn btn--outline-light btn--lg">
            Who We Are
          </Link>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Hero photo">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1}`}
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero__stats">
        <div className="container">
          <ul>
            {siteConfig.stats.items.map((s) => (
              <li key={s.label}>
                <strong>
                  <CountUp value={s.value} />
                </strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
