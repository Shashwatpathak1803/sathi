import { Link } from 'react-router-dom';
import { boardGroups } from '../data/board';
import Icon from './Icon';
import PersonCard from './PersonCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const officeBearers = boardGroups[0].people;
const total = boardGroups.reduce((n, g) => n + g.people.length, 0);

/** Home page teaser: the four office bearers plus a link to the full board page. */
export default function Leadership() {
  return (
    <section id="leadership" className="section" aria-labelledby="leadership-title">
      <div className="container">
        <SectionHeading
          eyebrow="Leadership"
          id="leadership-title"
          title="Guided by Experienced Grassroots Leaders"
          text={`Our office bearers, advisors and board members — ${total} people with decades of experience in community development.`}
          align="center"
        />
        <div className="people-grid people-grid--featured">
          {officeBearers.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <PersonCard person={p} featured />
            </Reveal>
          ))}
        </div>
        <p className="leadership__cta">
          <Link to="/our-board" className="btn btn--primary">
            Meet the full Board &amp; Advisory <Icon name="arrow" size={18} />
          </Link>
        </p>
      </div>
    </section>
  );
}
