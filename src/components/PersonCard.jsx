import { useState } from 'react';

const LONG_BIO = 230;

export default function PersonCard({ person, featured = false }) {
  const { name, role, photo, bio, programme } = person;
  const long = bio.length > LONG_BIO;
  const [open, setOpen] = useState(false);

  return (
    <article className={`person ${featured ? 'person--featured' : ''}`}>
      <div className="person__photo">
        <img src={photo} alt={`${name}, ${role}`} loading="lazy" decoding="async" />
      </div>
      <div className="person__body">
        <p className="person__role">{role}</p>
        <h3>{name}</h3>
        {programme && <p className="person__programme">{programme}</p>}
        <p className={`person__bio ${long && !open ? 'person__bio--clamped' : ''}`}>{bio}</p>
        {long && (
          <button type="button" className="person__more" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </article>
  );
}
