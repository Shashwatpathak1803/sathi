export default function SectionHeading({ eyebrow, title, text, align = 'left', id }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {text && <p className="section-heading__text">{text}</p>}
    </div>
  );
}
