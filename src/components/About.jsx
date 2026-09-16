import { siteConfig } from '../data/siteConfig';
import aboutImage from '../assets/projects/maitri/vidyasabha-at-primary-school-sagarpatti.jpg';
import Reveal from './Reveal';
import CountUp from './CountUp';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__image">
          <img
            src={aboutImage}
            alt="Vidyasabha meeting at a primary school with parents, teachers and community members"
            loading="lazy"
            width="1600"
            height="1200"
          />
        </Reveal>
        <Reveal className="about__text" delay={100}>
          <SectionHeading eyebrow="About Us" id="about-title" title="Who We Are" />
          <p>
            {siteConfig.name} ({siteConfig.fullName}) is a grassroots development organisation established in{' '}
            {siteConfig.foundedYear} by Gandhian thinker Late Shree Paras Bhai. We work with marginalised
            communities across Uttar Pradesh.
          </p>
          <p>
            Inspired by Gram Swaraj, our approach is Friendship – Dialogue – Participation. We focus on
            education, women’s empowerment, health and nutrition, livelihoods and strengthening civil society
            organisations.
          </p>
          <p className="muted small">{siteConfig.registration}.</p>
        </Reveal>
      </div>

      <div className="container stats">
        <Reveal className="stats__head">
          <h2>{siteConfig.stats.title}</h2>
          <span className="stats__divider" aria-hidden="true" />
          <p>{siteConfig.stats.text}</p>
        </Reveal>
        <div className="stats__grid">
          {siteConfig.stats.items.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 80}>
              <span className="stat__value">
                <CountUp value={s.value} />
              </span>
              <span className="stat__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
