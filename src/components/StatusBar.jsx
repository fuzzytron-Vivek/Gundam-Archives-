const TICKER = [
  'Archive link stable',
  'Field data partial',
  'Artwork served from local assets',
  'No external uplink',
  'Index checksum ok',
  'Terminal read-only',
];

export default function StatusBar({ shown, total, categoryLabel }) {
  return (
    <footer className="statusbar">
      <p className="statusbar__cell label">
        Showing <strong>{shown}</strong> / {total}
      </p>
      <p className="statusbar__cell statusbar__cell--filter label">Filter: {categoryLabel}</p>
      <div className="statusbar__ticker" aria-hidden="true">
        <div className="statusbar__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="statusbar__list">
              {TICKER.map((t) => (
                <li key={t} className="label">
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
}
