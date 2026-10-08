<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,nodejs,npm,docker,nginx" alt="React, Vite, JavaScript, HTML, CSS, Node.js, npm, Docker, Nginx" />
</p>

<h1 align="center">GUNDAM ARCHIVE</h1>

<p align="center">
  <b>Mobile Suit Gundam: Iron-Blooded Orphans // field database</b><br />
  <sub>An in-universe intelligence terminal for browsing Mobile Suits. Fan-made, frontend-only, and built with mixed feelings about the frontend.</sub>
</p>

---

## Why this exists

I love Gundam. If you know, you know, and if you don't, this probably isn't for you.

I wanted a place to look the machines up that felt like it belonged in the universe: amber text, grid lines, scanlines, a system that says `ONLINE` and means it. So I built a database terminal. Pokédex energy, military-computer attitude, zero patience for rounded SaaS cards.

## A confession

I hate web development.

I like *Gundam*. I like mechanical design, a clean silhouette, and a spec sheet with too many numbers on it. The web has none of that. The web is a pile of half-finished standards held together by polyfills and spite, where centring a box is a rite of passage, a "simple" layout needs three wrappers and a prayer, and the fix for any bug is a CSS property you have to guess the name of. A whole generation of tooling exists to hide the fact that the underlying thing is a mess, and the tooling is also a mess.

Somehow `node_modules` is bigger than the actual app, and I pulled in exactly two dependencies. Every tutorial assumes I want to build a to-do list, and I do not. This project exists because I wanted the database more than I hated CSS, and that margin was thin. So I vibe coded it with an AI and steered, which is the only way I was going to finish it. It was built for a college DevOps skill lab, where the interesting part was meant to be the Docker and Nginx side, not the UI.

It builds. It runs. The scanlines are load-bearing. If something looks off at 3 a.m. on a phone in portrait mode, that is the browser's fault, and I am not taking questions. Pull requests from people who enjoy this stuff are welcome, and you are all clearly sick in the head.

## What it does

- **Roster:** 15 catalogued units across Gundam Frames, Mobile Suits and Other, all driven by one data file. No hand-written cards.
- **Instant search:** matches name, designation, pilot, frame, classification, affiliation and weapons as you type. Searching `asw-g-08` finds exactly one machine, and you know which.
- **Filters:** control-panel style toggles with live counts that follow your query.
- **Dossiers:** click any unit to slide in a full file with identity, specifications and segmented telemetry readouts. Step through the current results with the arrow keys.
- **HUD details:** live clock, entry count, database version, a blinking status LED, coordinate tags and a ticker that never says anything important.
- **Boot sequence:** a short database start-up. Any key skips it, because nobody wants to wait for a fake loading bar twice.
- **Responsive:** full terminal on desktop, two-column roster on phones, with the artwork kept as the main thing.
- **Reduced motion:** respected throughout. The terminal can sit still when you ask it to.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/, ready for the Docker/Nginx image
npm run preview  # serve the production build locally
```

Plain Vite + React. No router, no state library, no backend, no accounts. React, React DOM and a lot of CSS that I refused to write by hand. I kept the dependency list short because every package is another thing that can break for no reason on a Tuesday.

## Add the artwork

The artwork is free cut-out PNGs collected from the internet. I could not find every unit, so any card without an image shows a **VISUAL FEED OFFLINE** placeholder with the path it is waiting for.

1. Drop cut-out images (transparent PNG or WebP) into `public/assets/gundams/`.
2. Name them as in the `image` field of each entry in `src/data/gundams.js`, for example `barbatos.png`.
3. Reload. That is it. No code changes.

The sticker outline, shadow and hover scale are done in CSS, so tight crops with transparent backgrounds look best.

## Add or edit a unit

Everything lives in `RAW_ROSTER` in `src/data/gundams.js`. Entry numbers, image URLs and empty-field defaults are filled in for you. Fields left as `null` (or an empty array) display as **UNRECORDED**.

Gundam Frame entries spread `FRAME_COMMON` for the shared frame name, power source and approximate height. Override anything per unit.

## Honest data warning

The roster was put together with AI assistance and I have not verified every field. Where the data was solid, it is filled in. Where it was not, it says `UNRECORDED` instead of a guess. Many pilots, weapons and designations are still blank, and that is deliberate.

The telemetry bars (mobility, armament, armor and so on) are **interface decoration, not canon measurements**. The dossier says so too. If you want accurate specs, check a proper source and fix the entry.

## Keyboard

| Key | Does |
| --- | --- |
| `/` | Focus the search field |
| `Esc` | Clear the search, or close an open dossier |
| `Enter` | Open the focused card's dossier |
| `←` `→` | Previous or next unit inside a dossier |
| `Tab` | Move through controls. Focus stays inside an open dossier |

## Structure

```text
src/
  components/   Header, Hero, SearchBar, FilterBar, GundamCard, GundamGrid,
                GundamImage, GundamDetail, TelemetryBar, StatusBar, BootScreen
  data/         gundams.js        roster, categories, status values
  hooks/        useClock.js
  utils/        roster.js         search, filtering, counts
  styles/       theme, base, shell, roster, detail
public/
  assets/gundams/               drop your artwork here
```

Theme colours, fonts, spacing and timing are CSS variables in `src/styles/theme.css`. Change the amber there and the whole terminal follows.

## Fonts

Bebas Neue, Barlow Condensed and IBM Plex Mono load from Google Fonts in `index.html`. Offline, the CSS falls back to local condensed and monospace fonts. It still works; it just looks slightly less expensive. Yes, it pulls in three fonts to make text look a bit different. This is what the industry does to people.

## Disclaimer

Unofficial, non-commercial fan project, made with love and made for fun. *Mobile Suit Gundam: Iron-Blooded Orphans*, its characters, mobile suits, artwork and all related names belong to their respective owners (Sunrise / Bandai Namco and affiliates). The images in `public/assets/gundams/` were collected from free-PNG sites, I do not own them, and I am not claiming them or this franchise as mine. Nothing here is sold or monetised. If you are a rights holder and want something removed, open an issue and it will go.

<p align="center"><sub>This README is done, and so is my interest in flexbox. Never again, until the next suit gets added.</sub></p>
