# Ballistics

**Advanced rifle ballistics calculator — right in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646c9c)](https://vitejs.dev/)

Ballistics is a free, browser-based ballistics solver for the modern rifle shooter. Point, click, and get a complete range chart — no software to install, no account to create, no waiting.

## Live Demo

Head over to **[paulgilchrist.github.io/ballistics](https://paulgilchrist.github.io/ballistics/)** and start calculating.

No download. No install. No account. Just open the page and go.

## Features

- **Works offline** — Install as a Progressive Web App (PWA) and use it at the range with minimal connectivity. Tap "Add to Home Screen" and it behaves like a native app.
- **Full firearm & ammunition management** — Create, edit, and delete firearms and rounds. Comes pre-loaded with 8 firearms (Ruger 10/22, AR10, AR15 in 3 barrel lengths, LTR/AICS, and "Other") and 20 rounds total.
- **Customizable scope settings** — Set sight height, zero range, reticle units (Mil, MoA, IPHY), and turret gradients to match your setup.
- **Weather conditions** — Factor in altitude, temperature, barometric pressure, relative humidity, wind velocity, and wind angle.
- **Target parameters** — Set target distance (yards or meters), target speed, and slant angle for uphill and downhill shots.
- **Range chart export** — Export your range chart as a CSV file (via PapaParse) or print it as a PDF (via jsPDF).
- **Data portability** — Import and export all your firearms, rounds, and settings as a single JSON file.
- **Dark and light themes** — Toggle between themes; your choice persists across sessions.
- **Persistent data** — Everything is saved to `localStorage`, so your data survives page reloads and browser restarts.
- **Responsive design** — Works on desktop, tablet, and phone, built on Bootstrap 5.

## How It Works

1. **Select a firearm** — Pick from your saved firearms or create a new one.
2. **Select a round** — Choose the ammunition loaded in the chamber.
3. **Adjust conditions** — Set your scope zero, weather, and target parameters.
4. **View the range chart** — Get a complete trajectory breakdown at each incremental distance, with transonic and subsonic zones color-coded for quick reference.

## What's Calculated

At each distance increment, the range chart displays:

- **Velocity** — Bullet speed in feet per second (FPS)
- **Energy** — Kinetic energy in foot-pounds (FT-LBS)
- **Time of flight** — Seconds from muzzle to target
- **Bullet drop** — Vertical displacement from the bore axis
- **Elevation correction** — How much to dial up or down, in inches, Mil, MoA, and IPHY
- **Cross-wind drift** — Lateral displacement, in inches, Mil, MoA, and IPHY
- **Lead for moving targets** — How far ahead to aim, in inches, Mil, MoA, and IPHY
- **Slant corrections** — Adjustments for uphill and downhill elevation changes

Transonic and subsonic flight zones are highlighted with color coding so you can see exactly where your bullet transitions.

## Getting Started

To run the calculator locally:

```bash
# Clone the repository
git clone https://github.com/PaulGilchrist/ballistics.git
cd ballistics

# Install dependencies
npm install

# Start the development server
npm start
```

The app will be available at `http://localhost:5173`.

## Technology

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Bootstrap 5** — Responsive layout and components
- **PapaParse** — CSV export
- **jsPDF** — PDF print export
- **Ingals standard atmosphere drag model** — Trajectory calculations with atmospheric density adjustments for altitude, temperature, pressure, and humidity

## License

[MIT](LICENSE) — Do what you want with it.
