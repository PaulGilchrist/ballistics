# Ballistics Calculator — Architecture Document

> **Generated:** 2026-05-12 (Tue)  
> **Version:** 0.1.0  
> **Author:** Paul Gilchrist

---

## 1. High-Level Overview

**Ballistics** is a single-page web application (SPA) that calculates and visualizes rifle ballistics data. Given a firearm, round, weather conditions, and target parameters, it computes a range chart showing bullet velocity, energy, drop, wind drift, lead, and slant corrections at incremental distances.

The application is built with **React 19** on a **Vite 8** build pipeline, deployed as a **Progressive Web App (PWA)** via GitHub Pages. All state is persisted to `localStorage`, making the app effectively stateless on the server.

---

## 2. Directory Structure

```
ballistics/
├── index.html              # Vite entry HTML shell
├── package.json            # Dependencies, scripts, metadata
├── vite.config.js          # Vite + React + PWA + Vitest config
├── public/                 # Static assets (manifest.json, icons)
├── dist/                   # Vite build output (GitHub Pages target)
├── docs/                   # This architecture document
├── src/
│   ├── index.jsx           # React root entry point
│   ├── index.css           # Global CSS variables + theme system
│   ├── app.module.css      # App-level module CSS
│   ├── App.jsx             # Root component + top-level state
│   ├── App.test.jsx        # Vitest + Testing Library test
│   ├── setupTests.js       # Vitest test setup
│   ├── service-worker.js   # Workbox PWA service worker
│   ├── components/         # Presentational React components
│   │   ├── Chart.jsx       # Range chart table display
│   │   ├── chart.css       # Chart-specific styles
│   │   ├── Firearm.jsx     # Firearm CRUD form
│   │   ├── Firearms.jsx    # Firearm selection list
│   │   ├── Round.jsx       # Round CRUD form
│   │   ├── Rounds.jsx      # Round selection list
│   │   ├── Target.jsx      # Target parameters form
│   │   ├── Weather.jsx     # Weather parameters form
│   │   └── form.css        # Shared form styles
│   ├── data/               # Seed data
│   │   └── firearms.js     # Pre-loaded firearm configurations
│   └── utils/              # Pure-function utility modules
│       ├── atmospherics.js # Atmospheric density calculations
│       ├── ballistics.js   # Range chart computation engine
│       ├── conversions.js  # Unit conversion helpers
│       ├── drag.js         # Drag model (Ingals table-based)
│       ├── general.js      # General-purpose helpers (duplicate of utilities.js)
│       ├── ingals.data.js  # Ingals ballistic coefficient lookup tables
│       ├── jwt.js          # JWT decoding (legacy, CommonJS)
│       └── utilities.js    # General-purpose helpers (GUID, sort, parse)
```

---

## 3. Module-by-Module Breakdown

### 3.1 Entry Point — `src/index.jsx`

Standard React 19 `createRoot` pattern. Mounts `<App />` inside `<React.StrictMode>` onto `#root`.

### 3.2 Root Component — `src/App.jsx`

The monolithic root component that owns **all application state** and orchestrates the UI flow:

- **State managed in App:**
  - `theme` — dark/light theme toggle (persisted to `localStorage`)
  - `graphType` — line vs. bar chart toggle
  - `firearms` — array of firearm objects (persisted to `localStorage`)
  - `target` — target parameters object (persisted to `localStorage`)
  - `weather` — weather conditions object (persisted to `localStorage`)
  - `firearmId` — currently selected firearm ID (persisted to `localStorage`)
  - `roundId` — currently selected round ID (persisted to `localStorage`)

- **Responsibilities:**
  - CRUD operations for firearms and rounds (insert, update, delete)
  - Selection state management (firearm → round hierarchy)
  - Data import/export (JSON file via `FileReader` / `Blob`)
  - Chart export (CSV via PapaParse) and print (PDF via jsPDF)
  - Calls `ballistics.getRangeData()` to compute the range chart
  - Conditionally renders sub-components based on selection state

- **UI Flow:**
  ```
  Firearms list → Select Firearm → Firearm form → Rounds list → Select Round → Round form → Chart
  ```

### 3.3 Components — `src/components/`

All components are **presentational** (dumb) components that receive data and callbacks via props:

| Component    | Purpose                                          |
|-------------|---------------------------------------------------|
| `Chart`     | Renders the computed range chart as an HTML table |
| `Firearm`   | Form for creating/editing a firearm               |
| `Firearms`  | List of firearms for selection                    |
| `Round`     | Form for creating/editing a round                 |
| `Rounds`    | List of rounds for selection                      |
| `Target`    | Form for target parameters                        |
| `Weather`   | Form for weather conditions                       |

All form components use `react-hook-form` with `onBlur` validation mode.

### 3.4 Ballistics Engine — `src/utils/ballistics.js`

The core computation module. Exposes a single function:

- **`getRangeData(weather, target, firearm, round)`** — Iterates from `chartStepping` to `target.distance`, computing at each step:
  - Modified ballistic coefficient (atmospheric adjustment)
  - Muzzle angle for zero range
  - Velocity, energy, time of flight
  - Bullet drop and vertical position
  - Cross-wind drift
  - Lead for moving targets
  - Slant corrections for elevation changes
  - All values converted to Mil, MoA, and IPHY

### 3.5 Drag Model — `src/utils/drag.js`

Implements the **Ingals drag model** for bullet trajectory calculations:

- `velocityFromRange()` — Velocity at a given range
- `velocityFromTime()` — Velocity at a given time
- `time()` — Time of flight between two velocities
- `range()` — Range between two velocities
- `drop()` — Gravitational drop
- `crossWindDrift()` — Wind-induced lateral drift
- `verticalPosition()` — Net vertical position accounting for muzzle angle
- `muzzleAngleDegreesForZeroRange()` — Iterative solver for zero angle
- `modifiedBallisticCoefficient()` — Atmospheric BC adjustment
- `energy()` — Kinetic energy in foot-pounds
- `lead()` — Horizontal lead for moving targets

### 3.6 Atmospherics — `src/utils/atmospherics.js`

Provides atmospheric density adjustment factors:

- Altitude adjustment factor (lookup table interpolation)
- Temperature adjustment factor
- Barometric pressure adjustment factor
- Relative humidity adjustment factor
- Speed of sound at altitude
- Weight/density of air at altitude

All use linear interpolation against pre-computed lookup tables.

### 3.7 Conversions — `src/utils/conversions.js`

Pure conversion functions:

- `yardsToMeters()` / `metersToYards()`
- `degreesToRadians()` / `radiansToDegrees()`
- `inchesToMil()` / `inchesToMinutesOfAngle()` / `inchesToIPHY()`
- `milesPerHourToInchesPerSecond()`
- `sizeToDistance()` — Rangefinding via mil-dot estimation

### 3.8 Ingals Data — `src/utils/ingals.data.js`

Three parallel arrays (`v`, `s`, `t`) forming the Ingals standard atmosphere drag table:

- `v[]` — Velocity (FPS), descending from 5000 to ~1276
- `s[]` — Space (feet), cumulative distance
- `t[]` — Time (seconds), cumulative time of flight

### 3.9 Utilities — `src/utils/utilities.js`

General-purpose helpers used by `App.jsx`:

- `guid()` — UUID v4 generator
- `sort()` — In-place array sort by property
- `jsonParseNumbers()` — Reviver that converts stringified numbers
- `filter()` — Multi-property string search filter

### 3.10 Seed Data — `src/data/firearms.js`

Pre-loaded firearm configurations with nested round data. Contains 8 firearms (10/22, AR10, AR15 variants, LTR/AICS, and "Other") with 20 total rounds.

### 3.11 PWA Service Worker — `src/service-worker.js`

Workbox-based service worker with:
- Precaching of build assets
- App Shell routing (all navigations → `index.html`)
- Runtime caching for `.png` images (StaleWhileRevalidate)
- `SKIP_WAITING` message handler

### 3.12 Legacy Module — `src/utils/jwt.js`

A JWT decoding/verification module using CommonJS (`require`/`module.exports`). Depends on `axios`, `jsonwebtoken`, and `https`. Currently **not imported** by any active module — likely a remnant from a planned Azure AD authentication feature.

### 3.13 Duplicate Module — `src/utils/general.js`

An exact duplicate of `utilities.js` (same content, same `utilities` namespace). Not currently imported by `App.jsx`.

---

## 4. Data Flow

```
User Input (Weather/Target/Firearm/Round forms)
    ↓
App.jsx (state management via useState + localStorage)
    ↓
ballistics.getRangeData(weather, target, firearm, round)
    ├── drag.modifiedBallisticCoefficient()
    │   └── atmospherics.{altitude,temperature,pressure,humidity}AdjustmentFactor()
    ├── drag.muzzleAngleDegreesForZeroRange()
    │   └── drag.{velocityFromRange, time, drop, verticalPosition}()
    │       └── drag.ingals{Space,Time,Velocity}From{Velocity,Space,Time}()
    │           └── INGALS data tables
    ├── drag.{velocityFromRange, energy, time, drop, crossWindDrift, lead}()
    └── conversions.{inchesToMil, inchesToMinutesOfAngle, inchesToIPHY}()
    ↓
rangeData[] (array of range objects)
    ↓
Chart component (renders as HTML table)
```

---

## 5. Dependency Graph

```
App.jsx
├── ballistics.js
│   ├── drag.js
│   │   ├── atmospherics.js
│   │   ├── conversions.js
│   │   └── ingals.data.js
│   └── conversions.js
├── utilities.js
├── data/firearms.js
├── components/Chart.jsx
│   └── atmospherics.js
├── components/Firearm.jsx
├── components/Firearms.jsx
├── components/Round.jsx
├── components/Rounds.jsx
├── components/Target.jsx
│   └── conversions.js
└── components/Weather.jsx

[Orphaned modules — not imported by App.jsx]
├── utils/general.js  (duplicate of utilities.js)
└── utils/jwt.js      (legacy, CommonJS)
```

---

## 6. Key Architectural Decisions

### ADR-001: Monolithic State in App.jsx
**Decision:** All application state lives in `App.jsx` and is passed down via props.  
**Rationale:** Simplicity for a single-page calculator; avoids the overhead of Context/Redux for ~6 state variables.  
**Consequence:** `App.jsx` is 500+ lines; every state change triggers re-renders of all children.

### ADR-002: localStorage as Primary Persistence
**Decision:** All data (firearms, target, weather, selections) is persisted to `localStorage`.  
**Rationale:** Enables a stateless PWA with instant recovery after page reload.  
**Consequence:** Maximum practical data size is ~5MB; no native sync across devices without import/export.

### ADR-003: Ingals Drag Model
**Decision:** Use the Ingals standard atmosphere drag table rather than G1/G7 empirical models.  
**Rationale:** Simpler implementation with good accuracy for intermediate-range rifle ballistics.  
**Consequence:** Less accurate at extreme ranges (>1000 yards) and supersonic/transonic transitions.

### ADR-004: Presentational Components Pattern
**Decision:** All UI components are "dumb" presentational components; `App.jsx` is the sole "container."  
**Rationale:** Clear separation of concerns; easy to test components in isolation.  
**Consequence:** Prop drilling is extensive; no component-level state except form state (via `react-hook-form`).

### ADR-005: CSS Custom Properties for Theming
**Decision:** Use CSS variables on `:root` and `[data-theme="light"]` for a two-theme system.  
**Rationale:** Minimal JavaScript overhead; smooth transitions between dark and light themes.  
**Consequence:** Theme toggle requires `document.documentElement.setAttribute()` call.

### ADR-006: Vite + PWA for Deployment
**Decision:** Use Vite with `vite-plugin-pwa` and `injectManifest` strategy for GitHub Pages deployment.  
**Rationale:** Fast dev server, optimized production build, and offline capability.  
**Consequence:** Service worker uses Workbox with a custom `service-worker.js` file.

---

## 7. Known Constraints and Assumptions

1. **Imperial-first units** — All internal calculations use FPS, yards, inches, and °F. Metric is a conversion layer, not a first-class citizen.
2. **Single bullet per round** — Each round has one BC value; no multi-range BC taper (e.g., G7 vs. G1).
3. **Standard atmosphere only** — The Ingals table assumes ISA conditions; non-standard atmospheres use adjustment factors.
3. **No spin drift** — The rightward drift caused by bullet gyroscopic spin is not modeled.
4. **No Coriolis effect** — Earth's rotation is ignored (relevant beyond ~800 yards).
5. **Wind is constant** — Wind velocity and angle are uniform across the entire trajectory.
6. **Max range is 5000 units** — Target distance is capped at 5000 yards/meters.
7. **Chart stepping is uniform** — Range chart rows advance by a fixed increment (default: 50 yards).
8. **Firearm data is user-managed** — No backend API; data lives in `localStorage` or a JSON import/export file.

---

## 8. Recommended Future Improvements

| Priority | Improvement | Description |
|----------|-------------|-------------|
| **High** | Extract state to Context/Redux | Reduce `App.jsx` from 500+ lines; enable memoization of child components |
| **High** | Remove orphaned modules | Delete `general.js` (duplicate) and `jwt.js` (legacy CommonJS) |
| **High** | Add confirmation dialogs | `handleFirearmOnDelete` and `handleRoundOnDelete` have TODO comments for confirmation |
| **Medium** | Add TypeScript | The codebase is pure `.jsx`; TS would catch the string/number inconsistency in seed data |
| **Medium** | Expand test coverage | Currently only 1 test (`App.test.jsx`); add tests for `ballistics.js`, `drag.js`, `conversions.js` |
| **Medium** | Support G1/G7 drag models | Allow users to select a drag function for more accurate long-range calculations |
| **Low** | Add spin drift and Coriolis | Improve accuracy for extreme long-range shooting (>800 yards) |
| **Low** | Backend sync | Optional cloud sync (e.g., IndexedDB + service worker or Firebase) for cross-device persistence |
| **Low** | Chart visualization | Add a canvas/SVG line chart alongside the table view |

---

## 9. Build and Deployment

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `vite` | Dev server on `http://localhost:5173/ballistics/` |
| `build` | `vite build` | Production build to `dist/` |
| `test` | `vitest run` | Run tests in `jsdom` environment |
| `deploy` | `gh-pages -d dist` | Push `dist/` to `gh-pages` branch |
| `predeploy` | `npm run build` | Auto-build before deploy |

The app is deployed to **GitHub Pages** at `https://paulgilchrist.github.io/ballistics/` with `base: '/ballistics/'` in Vite config.

---

*End of Architecture Document*
