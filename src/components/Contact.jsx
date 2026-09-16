import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const { contact } = siteConfig;
  const [status, setStatus] = useState('idle');

  // NOTE: This form is UI only. Connect it to a form service (Formspree,
  // Netlify Forms, Google Forms, your own backend) by handling this submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
    e.target.reset();
  };

  return (
    <section id="contact" className="section section--tint" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          id="contact-title"
          title="Get in Touch"
          align="center"
        />
        <div className="contact">
          <Reveal className="contact__info">
            <ul className="contact-list">
              <li>
                <Icon name="pin" size={22} />
                <div>
                  <strong>Registered Office</strong>
                  <p>{contact.registeredOffice}</p>
                  <strong>Coordination Office</strong>
                  <p>{contact.coordinationOffice}</p>
                </div>
              </li>
              <li>
                <Icon name="mail" size={22} />
                <div>
                  <strong>Email</strong>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                </div>
              </li>
              <li>
                <Icon name="phone" size={22} />
                <div>
                  <strong>Phone</strong>
                  <p>
                    <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
                  </p>
                </div>
              </li>
            </ul>

            <div className="map">
              {contact.mapEmbedUrl ? (
                <>
                  <iframe
                    src={contact.mapEmbedUrl}
                    title={`${siteConfig.name} location on Google Maps`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {contact.mapLink && (
                    <a
                      className="map__link"
                      href={contact.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open in Google Maps"
                      title="Open in Google Maps"
                    >
                      <Icon name="external" size={18} />
                    </a>
                  )}
                </>
              ) : (
                <div className="map__placeholder">
                  <Icon name="pin" size={30} />
                  <p>
                    [Google Maps placeholder — paste an embed URL in <code>siteConfig.contact.mapEmbedUrl</code>]
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal className="contact__form" delay={100}>
            <form onSubmit={handleSubmit} className="form" noValidate={false}>
              <div className="form__row">
                <label>
                  Name
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
              <label>
                Subject
                <input type="text" name="subject" />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" required />
              </label>
              <button type="submit" className="btn btn--primary">
                Send Message
              </button>
              {status === 'sent' && (
                <p className="form__note" role="status">
                  Thank you. This form is not yet connected to an email service — please also write to us at{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
