import { siteConfig } from '../data/siteConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * The ONLY place on the website where donation is mentioned (home page section).
 * Bank details and the optional online link are in src/data/siteConfig.js -> donation
 */
export default function DonateSection() {
  const { url, bank } = siteConfig.donation;

  return (
    <section id="support" className="section donate" aria-labelledby="donate-title">
      <div className="container">
        <SectionHeading
          eyebrow="Support Our Mission"
          id="donate-title"
          title="Support Our Work"
          text="Your contribution supports our work with women, children and communities across Uttar Pradesh."
          align="center"
        />
        <Reveal className="bank-card">
          <dl className="bank-card__list">
            <div className="bank-row">
              <dt>Account name</dt>
              <dd>{bank.accountName}</dd>
            </div>
            <div className="bank-row">
              <dt>Account number</dt>
              <dd>{bank.accountNumber}</dd>
            </div>
            <div className="bank-row">
              <dt>IFSC</dt>
              <dd>{bank.ifsc}</dd>
            </div>
            <div className="bank-row">
              <dt>Bank</dt>
              <dd>
                {bank.bankName}, {bank.branch}
              </dd>
            </div>
          </dl>
          <p className="bank-card__note">{bank.note}</p>
          {url && (
            <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">
              Donate Online
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
