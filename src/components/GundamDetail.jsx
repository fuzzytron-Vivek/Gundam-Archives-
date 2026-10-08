import { useCallback, useEffect, useRef, useState } from 'react';
import GundamImage from './GundamImage';
import TelemetryBar from './TelemetryBar';
import { TELEMETRY_FIELDS } from '../data/gundams';
import { coordsFor, displayValue } from '../utils/roster';

const CLOSE_MS = 220;
const FOCUSABLE = 'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])';

function Field({ label, value }) {
  const v = displayValue(value);
  return (
    <div className="field">
      <dt className="label">{label}</dt>
      <dd className={`field__value${v ? '' : ' is-empty'}`}>{v ?? 'Unrecorded'}</dd>
    </div>
  );
}

function ListField({ label, items }) {
  return (
    <div className="field field--list">
      <dt className="label">{label}</dt>
      <dd>
        {items.length > 0 ? (
          <ul className="chips">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <span className="field__value is-empty">Unrecorded</span>
        )}
      </dd>
    </div>
  );
}

export default function GundamDetail({ gundam, total, prevId, nextId, onNavigate, onClose }) {
  const g = gundam;
  const s = g.specifications;
  const [open, setOpen] = useState(false);
  const closing = useRef(false);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);

  // Slide in, lock page scroll, and hand focus back to the card on exit.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    document.documentElement.classList.add('has-dossier');
    const raf = window.requestAnimationFrame(() => {
      setOpen(true);
      closeRef.current?.focus();
    });
    return () => {
      window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-dossier');
      previouslyFocused?.focus?.();
    };
  }, []);

  // Start each entry at the top when stepping through the roster.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [g.id]);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setOpen(false);
    window.setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestClose();
      } else if (e.key === 'ArrowLeft' && prevId) {
        onNavigate(prevId);
      } else if (e.key === 'ArrowRight' && nextId) {
        onNavigate(nextId);
      } else if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (!panelRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose, onNavigate, prevId, nextId]);

  return (
    <div className={`dossier-root${open ? ' is-open' : ''}`}>
      <div className="dossier__backdrop" onClick={requestClose} aria-hidden="true" />

      <section
        ref={panelRef}
        className="dossier"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
      >
        <header className="dossier__bar">
          <p className="dossier__file label">
            Dossier // Entry {g.number} of {String(total).padStart(2, '0')}
          </p>
          <div className="dossier__nav">
            <button
              type="button"
              className="icon-btn"
              onClick={() => prevId && onNavigate(prevId)}
              disabled={!prevId}
              aria-label="Previous entry"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => nextId && onNavigate(nextId)}
              disabled={!nextId}
              aria-label="Next entry"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn icon-btn--close"
              onClick={requestClose}
              aria-label="Close dossier"
            >
              <span aria-hidden="true">&times;</span>
              <span className="icon-btn__text">Esc</span>
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="dossier__scroll">
          <div className="dossier__grid" key={g.id}>
            <div className="dossier__visual brackets">
              <span className="dossier__watermark" aria-hidden="true">
                {g.number}
              </span>
              <GundamImage src={g.imageUrl} alt={g.name} />

              <span className="tag tag--tl label">{g.designation ?? 'Uncatalogued'}</span>
              <span className="tag tag--mr label">{g.classification}</span>
              <span className="tag tag--bl label">
                <span className={`led led--${g.status.toLowerCase()}`} aria-hidden="true" />
                {g.status}
              </span>
              <span className="tag tag--br label" aria-hidden="true">
                {coordsFor(g.number)}
              </span>
            </div>

            <div className="dossier__data">
              <div className="dossier__heading">
                <p className="label">{g.name.startsWith('Gundam ') ? 'Gundam' : g.classification}</p>
                <h2 id="dossier-title" className="dossier__title">
                  {g.short}
                </h2>
                <p className="dossier__desc">{g.description}</p>
              </div>

              <section className="block" aria-labelledby="blk-identity">
                <h3 id="blk-identity" className="block__title">
                  Identity
                </h3>
                <dl className="fields">
                  <Field label="Name" value={g.name} />
                  <Field label="Designation" value={g.designation} />
                  <Field label="Classification" value={g.classification} />
                  <Field label="Frame" value={g.frame} />
                  <Field label="Pilot" value={g.pilot} />
                  <Field label="Affiliation" value={g.affiliation} />
                </dl>
              </section>

              <section className="block" aria-labelledby="blk-specs">
                <h3 id="blk-specs" className="block__title">
                  Specifications
                </h3>
                <dl className="fields">
                  <Field label="Height" value={s.height} />
                  <Field label="Weight" value={s.weight} />
                  <Field label="Power source" value={s.powerSource} />
                  <Field label="Armor" value={s.armor} />
                  <ListField label="Equipment" items={s.equipment} />
                  <ListField label="Weapons" items={s.weapons} />
                </dl>
              </section>

              <section className="block" aria-labelledby="blk-tech">
                <h3 id="blk-tech" className="block__title">
                  Technical data
                </h3>
                <div className="telemetry-list">
                  {TELEMETRY_FIELDS.map((f) => (
                    <TelemetryBar key={f.key} label={f.label} value={g.telemetry[f.key]} />
                  ))}
                </div>
                <p className="block__note label">
                  Readout values are interface presentation, not canon measurements.
                </p>
              </section>

              <p className="dossier__foot label">
                Fan-compiled record. Fields marked unrecorded are unconfirmed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
