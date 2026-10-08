export default function FilterBar({ categories, active, counts, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter by classification">
      {categories.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            type="button"
            className={`filter${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(c.id)}
          >
            <span className="filter__led" aria-hidden="true" />
            <span className="filter__label">{c.label}</span>
            <span className="filter__count">{counts[c.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
