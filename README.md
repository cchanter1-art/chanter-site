# CHANTER — Site

Cinematic, fullscreen, single-viewport experience.

## Quick Start

```bash
npm install
npm run dev
```

## Folder Guide

```
src/
├─ data/siteContent.js   ← ALL content lives here. Edit freely.
├─ components/           ← One file per scene + shared components
├─ styles/               ← One CSS file per component
├─ hooks/useSceneScroll  ← Wheel / touch / keyboard navigation
└─ assets/               ← Drop your media here
```

## Replacing Placeholder Assets

### Videos (optional — hero background)
Drop your files into `src/assets/videos/`:
- `hero-bg.mp4`   — ambient background loop
- `hero-loop.mp4` — alternate loop

Then in `Hero.jsx`, uncomment the video element and import the file.

### Work images
Drop into `src/assets/images/experiments/`:
- `exp-01.jpg` through `exp-04.jpg`

Then in `siteContent.js`, replace `imageSrc: null` with:
```js
import exp01 from '../assets/images/experiments/exp-01.jpg'
// ...
imageSrc: exp01,
```

Or import them in `siteContent.js` directly and reference them in the works array.

### Textures
Drop `grain.png` and `noise.png` into `src/assets/images/textures/`
if you want a higher-quality grain than the canvas-generated one.

## Scene Navigation

| Action           | Result          |
|------------------|-----------------|
| Scroll / Swipe   | Next/prev scene |
| ↑ ↓ ← → keys    | Next/prev scene |
| Nav links        | Jump to scene   |
| Dot indicators   | Jump to scene   |
| Logo click       | Back to Hero    |

## Content Editing

Everything is in `src/data/siteContent.js`:
- `brand` — name, tagline, supporting copy
- `nav` — navigation labels
- `capabilities` — discipline list
- `works` — selected work items (title, category, year, description, image)
- `contact` — headline, email, social links

## Build

```bash
npm run build    # outputs to /dist
npm run preview  # preview production build locally
```
