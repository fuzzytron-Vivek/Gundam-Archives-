import { useEffect, useState } from 'react';

/**
 * Renders the unit artwork as an undistorted "sticker" cut-out.
 * If the file has not been supplied yet, shows an in-universe placeholder that
 * names the path it is waiting for.
 */
export default function GundamImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div className="feed-offline" role="img" aria-label={`${alt}: artwork not installed`}>
        <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <circle cx="100" cy="100" r="64" />
          <circle cx="100" cy="100" r="30" />
          <path d="M100 8v52M100 140v52M8 100h52M140 100h52" />
          <path d="M72 72l56 56" />
        </svg>
        <span className="feed-offline__title">Visual feed offline</span>
        <code className="feed-offline__path">{src}</code>
      </div>
    );
  }

  return (
    <img
      className={`sticker ${className}`.trim()}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
