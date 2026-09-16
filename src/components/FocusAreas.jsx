import { focusAreas } from '../data/focusAreas';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FocusAreas() {
  return (
    <section id="our-work" className="section section--tint" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          eyebrow="Our Work"
          id="work-title"
          title="Where We Focus Our Work"
          align="center"
        />
        <div className="grid grid--focus">
          {focusAreas.map((area, i) => (
            <Reveal key={area.title} className="focus-card" delay={i * 60}>
              <div className="focus-card__media">
                <img src={area.image} alt={area.imageAlt} loading="lazy" width="1600" height="1000" />
                <span className="focus-card__icon">
                  <Icon name={area.icon} size={22} />
                </span>
              </div>
              <div className="focus-card__body">
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
