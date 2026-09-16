import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

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

const INTERVAL_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || slides.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

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

      <div className="container hero__content">
        <h1 id="hero-title">Building Stronger Communities Through Awareness, Empowerment and Collective Action</h1>
        <p>Working with communities, women, children and local partners across Uttar Pradesh.</p>
        <Link to="/#our-work" className="btn btn--primary btn--lg">
          Explore Our Work <Icon name="arrow" size={20} />
        </Link>
      </div>

    </section>
  );
}
