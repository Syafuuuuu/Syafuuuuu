# Syafuuuuu

A personal portfolio website for Muhd Syafiq, focused on data science, artificial intelligence, automation, and visual thinking.

## Tech Stack

- Python
- FastAPI
- Uvicorn
- Jinja2 server-side templates
- HTML5
- CSS3
- Vanilla JavaScript
- GSAP 3.12.2 and ScrollTrigger for animations
- HTML Canvas for the interactive neural-network background
- Google Fonts: Orbitron and Inter

The project uses a lightweight server-rendered architecture. It does not currently use a database, frontend framework, ORM, Node.js, TypeScript, or a frontend build system.

## Project Structure

```text
app/
├── main.py                 # FastAPI application setup
├── routes/
│   └── pages.py            # Page routes
├── static/
│   ├── css/
│   │   └── styles.css      # Site styles
│   └── js/
│       └── main.js         # Canvas and GSAP interactions
└── templates/
    ├── base.html           # Shared HTML layout
    └── index.html          # Portfolio page
```

## How It Works

`app/main.py` creates the FastAPI application, serves static files from `app/static`, configures Jinja2 templates, and registers the page router.

`app/routes/pages.py` exposes the `GET /` route and renders `index.html`. The templates provide the server-rendered HTML structure, while CSS and vanilla JavaScript provide the visual design, responsive layout, canvas animation, mouse interaction, and scroll-based GSAP animations.

## Setup

Create and activate a virtual environment, then install the dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start the development server from the repository root:

```powershell
uvicorn app.main:app --reload
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in a browser.

## Project Status

- Single server-rendered portfolio page
- Dependencies are currently unpinned in `requirements.txt`
- No automated tests or linting configuration is currently included
- No database or external application API is currently configured

## LLM Context

This is a small Python FastAPI portfolio website. The backend uses FastAPI and Uvicorn, with Jinja2 for server-side HTML rendering. Routes are in `app/routes/pages.py`; the main application setup is in `app/main.py`.

The frontend uses Jinja2 HTML templates, plain CSS, and vanilla JavaScript. GSAP and ScrollTrigger are loaded from cdnjs. Orbitron and Inter are loaded from Google Fonts. The interactive neural-network background is rendered with HTML Canvas.

When modifying this project, preserve the existing FastAPI plus Jinja2 architecture unless a requirement explicitly calls for a different framework. There is currently no React, Vue, TypeScript, Node.js, ORM, database, test suite, or frontend build tooling.
