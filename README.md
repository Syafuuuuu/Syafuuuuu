# Syafuuuuu

A personal interactive archive for Muhd Syafiq: a tactile studio console for photographs, field notes, references, and fragments of daily life.

## Tech Stack

- React
- Vite
- JavaScript / JSX
- HTML5
- CSS3
- Python, FastAPI, and Uvicorn are retained as a backend foundation for future APIs or content services.
- Google Fonts: DM Serif Display, Manrope, and DM Mono

The public site is a static React/Vite build deployed to GitHub Pages. The interface uses traditional CSS for its tactile surfaces, material cues, responsive layout, and physical control feedback.

## Project Structure

```text
src/
├── App.jsx                 # React archive composition and state
├── archive.js              # Archive data and channel definitions
└── main.jsx                # React entry point
app/
├── main.py                 # FastAPI foundation for future backend work
└── static/css/styles.css   # Shared tactile visual system
public/
└── favicon.svg             # Studio-console favicon
.github/workflows/pages.yml # GitHub Pages deployment
```

## How It Works

`src/App.jsx` owns the interactive archive experience. React state controls the active channel, featured archive item, tuning dial, and live local-time readout.

The visual language remains intentionally CSS-led: raised and recessed surfaces, warm materials, analogue labels, indicators, and responsive proportions create the tactile studio-console feel.

## Setup

Install the frontend dependencies:

```powershell
npm install
```

Start the React development server:

```powershell
npm run dev
```

Build the production site:

```powershell
npm run build
```

The generated static site is written to `dist/`. GitHub Actions builds and deploys it automatically on pushes to `main`.

## Project Status

- Interactive React archive homepage
- Dependencies are locked in `package-lock.json`
- No automated tests or linting configuration is currently included
- No database or content API is currently configured

## LLM Context

This is a React/Vite interactive creative archive. The public frontend is in `src/`, with the main composition and state in `src/App.jsx` and archive data in `src/archive.js`.

The tactile visual system is in `app/static/css/styles.css` and is imported into the React entry point. The interface uses React state for archive navigation, featured-piece cycling, dial feedback, active channels, and the clock.

When modifying this project, preserve the CSS-led studio-console direction. Add new content as data-driven archive entries where possible, and keep interactions meaningful, tactile, keyboard-accessible, and usable on touch devices. GitHub Pages deploys the Vite output from `dist/`; FastAPI is reserved for future dynamic backend capabilities.
