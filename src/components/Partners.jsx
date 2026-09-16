import { partners } from '../data/partners';
import SectionHeading from './SectionHeading';

/** Continuously scrolling logo strip. Pauses on hover; static under reduced motion. */
export default function Partners() {
  const track = [...partners, ...partners]; // duplicated for a seamless loop
  return (
    <section id="partners" className="section section--tint partners" aria-labelledby="partners-title">
      <div className="container">
        <SectionHeading
          eyebrow="Partners"
          id="partners-title"
          title="Our Partners"
          text="Collaborating with organisations and institutions to create sustainable community impact."
          align="center"
        />
      </div>
      <div className="marquee" aria-label="Partner logos">
        <ul className="marquee__track">
          {track.map((p, i) => (
            <li key={`${p.name}-${i}`} aria-hidden={i >= partners.length ? 'true' : undefined}>
              <img src={p.logo} alt={i < partners.length ? p.name : ''} loading="lazy" height="64" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
