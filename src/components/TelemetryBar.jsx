const SEGMENTS = 10;
const LOW_THRESHOLD = 25; // below this the bar switches to the warning colour

/** Segmented readout bar. `value` is 0-100 and is UI presentation data only. */
export default function TelemetryBar({ label, value }) {
  const filled = Math.round((value / 100) * SEGMENTS);

  return (
    <div
      className={`telemetry${value < LOW_THRESHOLD ? ' is-low' : ''}`}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span className="telemetry__label label">{label}</span>
      <span className="telemetry__bar" aria-hidden="true">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span
            key={i}
            className={`telemetry__seg${i < filled ? ' is-on' : ''}`}
            style={{ '--s': i }}
          />
        ))}
      </span>
      <span className="telemetry__value">{value}%</span>
    </div>
  );
}
