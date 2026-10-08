import { DATABASE_VERSION } from '../data/gundams';

export default function Header({ clock, total }) {
  return (
    <header className="topbar">
      <a className="topbar__brand" href="#main" aria-label="Gundam Archive">
        <span className="topbar__mark" aria-hidden="true" />
        <span className="topbar__title">Gundam Archive</span>
        <span className="topbar__sub label">Iron-Blooded Orphans field database</span>
      </a>

      <dl className="topbar__readouts">
        <div className="readout readout--wide">
          <dt className="label">Database</dt>
          <dd>{DATABASE_VERSION}</dd>
        </div>
        <div className="readout readout--wide">
          <dt className="label">Entries</dt>
          <dd>{String(total).padStart(3, '0')}</dd>
        </div>
        <div className="readout">
          <dt className="label">System</dt>
          <dd className="readout__online">
            <span className="led led--blink" aria-hidden="true" />
            Online
          </dd>
        </div>
        <div className="readout">
          <dt className="label">Local time</dt>
          <dd className="readout__clock">{clock}</dd>
        </div>
      </dl>
    </header>
  );
}
