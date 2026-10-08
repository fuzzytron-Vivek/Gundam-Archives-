import GundamImage from './GundamImage';
import { coordsFor } from '../utils/roster';

const GUNDAM_PREFIX = 'Gundam ';

export default function GundamCard({ gundam, index, onSelect }) {
  const g = gundam;
  const prefix = g.name.startsWith(GUNDAM_PREFIX) ? 'Gundam' : null;

  return (
    <li className="card-slot" style={{ '--i': index }}>
      <article className="card">
        <div className="card__stage brackets">
          <span className="card__number" aria-hidden="true">
            {g.number}
          </span>
          <GundamImage src={g.imageUrl} alt={g.name} />
          <span className="card__coords label" aria-hidden="true">
            {coordsFor(g.number)}
          </span>
        </div>

        <div className="card__body">
          <p className="card__status label">
            <span className={`led led--${g.status.toLowerCase()}`} aria-hidden="true" />
            {g.status}
          </p>
          <p className="card__class">{g.classification}</p>
          <h3 className="card__name">
            <button
              type="button"
              className="card__open"
              aria-haspopup="dialog"
              aria-label={`Open dossier: ${g.name}`}
              onClick={() => onSelect(g.id)}
            >
              {prefix && <span className="card__prefix">{prefix}</span>}
              <span className="card__short">{g.short}</span>
            </button>
          </h3>
          <p className="card__designation">{g.designation ?? 'Uncatalogued'}</p>
          <p className="card__pilot">
            <span className="label">Pilot</span>
            <span className={g.pilot ? '' : 'is-empty'}>{g.pilot ?? 'Unrecorded'}</span>
          </p>
        </div>
      </article>
    </li>
  );
}
