# Ballistics Calculator — Architecture

## What It Is
A single-page ballistics calculator SPA built with **React 19** on a **Vite 8** pipeline, deployed as a **PWA** to GitHub Pages. Given a firearm, round, weather, and target, it computes a range chart showing velocity, energy, drop, wind drift, lead, and slant corrections.

## Tech Stack
- **Framework:** React 19, functional components
- **Build:** Vite 8 with `vite-plugin-pwa` (injectManifest strategy)
- **Forms:** `react-hook-form` with `onBlur` validation
- **Testing:** Vitest + Testing Library (`jsdom`)
- **Export:** PapaParse (CSV), jsPDF (PDF)
- **Deployment:** GitHub Pages at `https://paulgilchrist.github.io/ballistics/`

## Directory Structure
```
src/
├── index.jsx              # React root entry (createRoot)
├── index.css              # Global CSS variables + theme system
├── app.module.css         # App-level module CSS
├── App.jsx                # Root component — owns ALL state
├── service-worker.js      # Workbox PWA service worker
├── components/            # Presentational components (dumb, prop-driven)
│   ├── Chart.jsx          # Range chart table display
│   ├── Firearm.jsx        # Firearm CRUD form
│   ├── Firearms.jsx       # Firearm selection list
│   ├── Round.jsx          # Round CRUD form
│   ├── Rounds.jsx         # Round selection list
│   ├── Target.jsx         # Target parameters form
│   ├── Weather.jsx        # Weather conditions form
│   └── form.css           # Shared form styles
├── data/
│   └── firearms.js        # Seed data (8 firearms, 20 rounds)
└── utils/                 # Pure-function utility modules
    ├── ballistics.js      # Core computation engine (getRangeData)
    ├── drag.js            # Ingals drag model functions
    ├── atmospherics.js    # Atmospheric density adjustments
    ├── conversions.js     # Unit conversion helpers
    ├── ingals.data.js     # Ingals BC lookup tables (v, s, t arrays)
    ├── utilities.js       # GUID, sort, parse, filter helpers
    ├── general.js         # DUPLICATE of utilities.js (orphaned)
    └── jwt.js             # Legacy CommonJS module (orphaned)
```

## State Architecture
All application state lives in **`App.jsx`** and is passed down via props:
- `theme` — dark/light toggle (localStorage)
- `graphType` — line vs. bar chart toggle
- `firearms` — array of firearm objects (localStorage)
- `target` — target parameters object (localStorage)
- `weather` — weather conditions object (localStorage)
- `firearmId` — currently selected firearm ID (localStorage)
- `roundId` — currently selected round ID (localStorage)

**UI Flow:** `Firearms list → Select Firearm → Firearm form → Rounds list → Select Round → Round form → Chart`

## Ballistics Engine
`ballistics.getRangeData(weather, target, firearm, round)` is the core computation. It depends on:
- `drag.js` — Ingals drag model (velocity, time, drop, drift, lead, energy, muzzle angle)
- `atmospherics.js` — Altitude, temperature, pressure, humidity adjustment factors
- `conversions.js` — Mil, MoA, IPHY, yards/meters, degrees/radians
- `ingals.data.js` — Standard atmosphere drag tables (v[], s[], t[])

## Constraints
1. **Imperial-first** — Internal calculations use FPS, yards, inches, °F; metric is a conversion layer
2. **Single BC per round** — No multi-range BC taper (e.g., G7 vs. G1)
3. **Standard atmosphere** — Ingals table assumes ISA; non-standard uses adjustment factors
4. **No spin drift** — Gyroscopic rightward drift is unmodeled
5. **No Coriolis** — Earth's rotation ignored (relevant beyond ~800 yards)
6. **Constant wind** — Uniform velocity and angle across the trajectory
7. **Max range: 5000** — Target distance capped at 5000 yards/meters
8. **No backend** — All data lives in localStorage or JSON import/export

## Known Issues
- `App.jsx` is 500+ lines; state extraction to Context/Redux is a high-priority improvement
- `utils/general.js` is an exact duplicate of `utilities.js` and is orphaned
- `utils/jwt.js` is a legacy CommonJS module, orphaned
- Only 1 test exists (`App.test.jsx`); `ballistics.js`, `drag.js`, `conversions.js` are under-tested
- Delete confirmation dialogs for `handleFirearmOnDelete` and `handleRoundOnDelete` are TODO

## Build Commands
| Script | Command | Description |
|--------|---------|-------------|
| `start` | `vite` | Dev server on `localhost:5173/ballistics/` |
| `build` | `vite build` | Production build to `dist/` |
| `test` | `vitest run` | Run tests in `jsdom` |
| `deploy` | `gh-pages -d dist` | Push `dist/` to `gh-pages` branch |

## When Writing Code
- Components must be **presentational** — receive data and callbacks via props
- Forms use `react-hook-form` with `onBlur` validation
- State changes go through `App.jsx` via callback props
- CSS uses module files (`.module.css`) and shared `form.css`/`chart.css`
- Utility functions in `utils/` should be **pure functions** with no side effects
- All new code should use **ES modules** (not CommonJS)
