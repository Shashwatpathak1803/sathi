import { useEffect } from 'react';
import PersonCard from '../components/PersonCard';
import Reveal from '../components/Reveal';
import { boardGroups, boardIntro, teamGroup } from '../data/board';
import { siteConfig } from '../data/siteConfig';

const groups = [...boardGroups, teamGroup];

export default function BoardPage() {
  useEffect(() => {
    document.title = `Our Board, Advisory & Team | ${siteConfig.name}`;
    return () => {
      document.title = `${siteConfig.name} | ${siteConfig.fullName}`;
    };
  }, []);

  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Guiding SATHI-UP</p>
          <h1>Our Board, Advisory &amp; Team</h1>
          <p>{boardIntro}</p>
          <nav className="board-jump" aria-label="Jump to a group">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.title} <span>{g.people.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section board">
        <div className="container">
          {groups.map((g) => (
            <Reveal as="section" key={g.id} id={g.id} className="board-group" aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`} className="board-group__title">
                {g.title}
                <span>{g.people.length}</span>
              </h2>
              {g.intro && <p className="board-group__intro">{g.intro}</p>}
              <div className={`people-grid ${g.id === 'office-bearers' ? 'people-grid--featured' : ''}`}>
                {g.people.map((p) => (
                  <PersonCard key={p.name} person={p} featured={g.id === 'office-bearers'} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
