const DIAGNOSTICS = [
  ['Archive index', 'OK'],
  ['Frame registry', 'OK'],
  ['Artwork link', 'LOCAL'],
  ['Field data', 'PARTIAL'],
];

export default function Hero({ total }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__main">
        <p className="hero__kicker label">Mobile Suit Gundam // Iron-Blooded Orphans</p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">Mobile Suit</span>
          <span className="hero__line hero__line--outline">Database</span>
        </h1>
        <p className="hero__lede">
          Browse {total} catalogued units. Search by name, designation or pilot, then open any
          entry for its full dossier.
        </p>
      </div>

      <aside className="hero__aside" aria-hidden="true">
        <div className="hazard" />
        <ul className="diag">
          {DIAGNOSTICS.map(([name, state]) => (
            <li key={name}>
              <span>{name}</span>
              <span className="diag__dots" />
              <span className={`diag__state diag__state--${state.toLowerCase()}`}>{state}</span>
            </li>
          ))}
        </ul>
        <p className="label">Sector 07 // Terminal read-only</p>
      </aside>
    </section>
  );
}
