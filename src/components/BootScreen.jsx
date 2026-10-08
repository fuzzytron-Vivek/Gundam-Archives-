import { useEffect, useState } from 'react';

const LINES = [
  'GUNDAM ARCHIVE // TERMINAL 07',
  'MOUNTING ROSTER INDEX ............ OK',
  'READING FRAME REGISTRY ........... OK',
  'LINKING LOCAL ARTWORK ............ OK',
  'FIELD DATA ....................... PARTIAL',
  'ARCHIVE READY',
];

const STEP_MS = 230;
const LEAVE_MS = 320;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Short database-initialisation sequence. Any key or click skips it. */
export default function BootScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return undefined;
    }
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [onDone]);

  useEffect(() => {
    if (step > LINES.length) setLeaving(true);
  }, [step]);

  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, []);

  useEffect(() => {
    if (!leaving) return undefined;
    const id = window.setTimeout(onDone, LEAVE_MS);
    return () => window.clearTimeout(id);
  }, [leaving, onDone]);

  const shown = Math.min(step, LINES.length);
  const progress = Math.min(step / LINES.length, 1);

  return (
    <div
      className={`boot${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label="Initialising database"
      onClick={() => setLeaving(true)}
    >
      <div className="boot__panel brackets">
        <ol className="boot__lines">
          {LINES.slice(0, shown).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
        <div className="boot__bar" aria-hidden="true">
          <span className="boot__fill" style={{ '--p': progress }} />
        </div>
        <p className="boot__hint label">Press any key to skip</p>
      </div>
    </div>
  );
}
