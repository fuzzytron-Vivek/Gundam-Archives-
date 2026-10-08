# Mobile Suit artwork

Drop your own cut-out images here (transparent PNG or WebP works best).
Files are served at `/assets/gundams/<file>`.

Expected file names are defined in `src/data/gundams.js` (the `image` field of
each entry), for example:

    barbatos.png
    gusion.png
    flauros.png
    kimaris.png
    vidar.png
    vual.png
    bael.png
    dantalion.png
    graze.png
    graze-ein.png
    hyakuren.png
    geirail.png
    hashmal.png
    isaribi.png
    mobile-worker.png

Until a file exists, the card shows a "VISUAL FEED OFFLINE" placeholder with the
path it is waiting for. No code changes are needed: add the file and reload.

Tips for the sticker look: crop tightly, keep a transparent background, and
export at roughly 800-1200px tall. The UI adds the outline and shadow in CSS.
