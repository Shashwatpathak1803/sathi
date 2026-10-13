import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/** Home page "Support Our Work" section. No account details are shown: supporters are asked to get in touch. */
export default function DonateSection() {
  const { email, phone } = siteConfig.contact;

  return (
    <section id="support" className="section donate" aria-labelledby="donate-title">
      <div className="container">
        <SectionHeading
          eyebrow="Support Our Mission"
          id="donate-title"
          title="Support Our Work"
          text="Your support helps our work with women, children and communities across Uttar Pradesh."
          align="center"
        />
        <Reveal className="bank-card support-card">
          <p className="support-card__text">
            To support our work, please contact us. Our team will be happy to share the details and answer your questions.
          </p>
          <div className="support-card__actions">
            <Link to="/#contact" className="btn btn--accent btn--lg">
              Contact Us <Icon name="arrow" size={20} />
            </Link>
            <a className="btn btn--outline-dark" href={`mailto:${email}`}>
              <Icon name="mail" size={18} /> {email}
            </a>
            <a className="btn btn--outline-dark" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
              <Icon name="phone" size={18} /> {phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
