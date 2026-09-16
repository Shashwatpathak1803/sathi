export default function GalleryFilter({ categories, active, onChange }) {
  return (
    <div className="gallery-filter" role="group" aria-label="Filter gallery by project">
      {categories.map((c) => (
        <button
          key={c.value}
          type="button"
          className={`chip ${active === c.value ? 'chip--active' : ''}`}
          aria-pressed={active === c.value}
          onClick={() => onChange(c.value)}
        >
          {c.label}
          <span className="chip__count">{c.count}</span>
        </button>
      ))}
    </div>
  );
}
