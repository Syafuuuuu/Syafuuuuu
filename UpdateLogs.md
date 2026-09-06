# Update Logs

A chronological record of repository changes derived from code and configuration diffs.

## v1.0.0 - 2026-09-06

**Comparison:** `3539c31..HEAD`
**Release type:** Feature

### Added

- Added the interactive studio-archive frontend built around React and Vite, including the main archive experience and channel navigation in [src/App.jsx](src/App.jsx) and [src/archive.js](src/archive.js).
- Added reusable archive and console components for the featured piece, modal view, lower deck, and site layout in [src/components/archive/ArchivePreview.jsx](src/components/archive/ArchivePreview.jsx), [src/components/archive/ArchiveModal.jsx](src/components/archive/ArchiveModal.jsx), [src/components/archive/LowerDeck.jsx](src/components/archive/LowerDeck.jsx), [src/components/console/ChannelNav.jsx](src/components/console/ChannelNav.jsx), [src/components/console/FeaturedPiece.jsx](src/components/console/FeaturedPiece.jsx), [src/components/layout/SiteHeader.jsx](src/components/layout/SiteHeader.jsx), and [src/components/layout/SiteFooter.jsx](src/components/layout/SiteFooter.jsx).
- Added the production static-site entry point and branding assets in [index.html](index.html), [src/main.jsx](src/main.jsx), [public/favicon.svg](public/favicon.svg), and [continuation.md](continuation.md).

### Changed

- Changed the project from a server-rendered/incremental prototype to a React/Vite static archive experience, aligning the app shell, styling, and content flow with the studio-console design direction described in [WEBSITE_DIRECTION.md](WEBSITE_DIRECTION.md) and [README.md](README.md).
- Changed the visual system to a tactile, warm-material interface with layered surfaces, control labels, and responsive console styling in [app/static/css/styles.css](app/static/css/styles.css).
- Updated the app metadata and package setup for the frontend build, including the Vite config and dependencies in [package.json](package.json) and [vite.config.js](vite.config.js).

### Fixed

- Fixed the archive interaction flow by wiring URL-driven entry selection and modal controls so selected entries can be opened, navigated, and closed through both UI actions and browser history in [src/App.jsx](src/App.jsx).
- Fixed the site presentation for a static deployment by configuring the Vite base path and packaging the frontend for pages hosting in [vite.config.js](vite.config.js).

### Deployment

- Added GitHub Pages deployment through the Pages artifact workflow in [.github/workflows/pages.yml](.github/workflows/pages.yml), including Node 24 setup, dependency install, Vite build, and artifact upload.

### Validation

- Verified from the repository state that the release includes the Vite + React app shell, GitHub Pages workflow, and archive components expected for the shipped frontend.
- Verified the current package version is 1.0.0 in [package.json](package.json), which supports the initial public release versioning choice.
- Not verified locally: the production GitHub Pages deployment result itself, because no live GitHub deployment status was available in this environment.
- Local build validation was attempted with `npm run build`, but the command failed in this PowerShell environment due an execution policy/security restriction (`UnauthorizedAccess`).

### Notes

- This entry covers the shipped React archive work from the Vite migration through the current state on `main` and treats the repository code as the source of truth rather than commit messages alone.
- No automated test suite or lint configuration was present in the repository, so verification is limited to code inspection, build configuration review, and the attempted local build command.
