export default function PersonCard({ person, featured = false }) {
  const { name, role, photo, bio } = person;
  return (
    <article className={`person ${featured ? 'person--featured' : ''}`}>
      <div className="person__photo">
        <img src={photo} alt={`${name}, ${role}`} loading="lazy" decoding="async" />
      </div>
      <div className="person__body">
        <p className="person__role">{role}</p>
        <h3>{name}</h3>
        <p className="person__bio">{bio}</p>
      </div>
    </article>
  );
}
