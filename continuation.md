# Continuation Handoff

## Project Direction

Syafuuuuu is now an interactive personal creative archive rather than a data-science portfolio.

The visual direction is a tactile, skeuomorphic retro-modern studio console: warm materials, raised controls, analogue labels, archive readouts, photography, field notes, and subtle machine feedback.

## Completed Work

### Initial Website

- Replaced the original futuristic data-science homepage.
- Created the Studio Console homepage direction.
- Added a warm paper, metal, graphite, amber, and rust palette.
- Added editorial typography using DM Serif Display, Manrope, and DM Mono.
- Added tactile raised and recessed surfaces with CSS shadows.
- Added responsive desktop and mobile layouts.
- Restored intentional desktop whitespace and a stable 16:9 console proportion.
- Fixed the desktop first-viewport issue so the featured image and PREV/TUNE/NEXT controls remain visible.

### React Migration

- Added Vite and React.
- Added `package.json`, `package-lock.json`, `vite.config.js`, and the React entry point.
- GitHub Pages now builds the React/Vite output from `dist/`.
- FastAPI remains available as a future backend/API foundation.
- Updated the README to describe the current React architecture.

### React Architecture

Current structure:

```text
src/
├── App.jsx
├── archive.js
├── main.jsx
└── components/
    ├── archive/
    │   ├── ArchiveModal.jsx
    │   ├── ArchivePreview.jsx
    │   └── LowerDeck.jsx
    ├── console/
    │   ├── ChannelNav.jsx
    │   ├── DialControl.jsx
    │   └── FeaturedPiece.jsx
    └── layout/
        ├── SiteFooter.jsx
        └── SiteHeader.jsx
```

### Content Model

`src/archive.js` now defines three layers:

- `archiveEntries`: individual works such as photographs or notes.
- `archiveCollections`: curated groups of entries, currently `Borrowed Light`.
- `archiveViews`: presentation contexts such as Featured, Photographs, Field notes, Things I like, and About.

Entries currently include:

- Stable ID
- Type
- Title
- Description
- Date
- Tags
- Media metadata and CSS placeholder background

### Interactive Archive

Implemented:

- Clickable archive preview entries.
- Tactile archive detail modal.
- URL-addressable entry state, for example `?entry=blue-hour-held-still`.
- Previous and next entry navigation.
- Keyboard navigation with `ArrowLeft` and `ArrowRight`.
- `Escape` closes the modal.
- Browser back/forward URL state synchronization.
- Hover, pressed, and focus states for archive entries.

### Ambient Machine Behavior

Implemented:

- Blinking indicator beside the name.
- Blinking indicator beside local time.
- Local time now displays seconds as `HH:MM:SS`.
- Cycling volume state: LOW, MEDIUM, HIGH.
- Volume dashes change thickness and opacity according to the current level.
- Restrained animated static/noise texture.
- Existing signal-meter flicker.
- `prefers-reduced-motion` disables non-essential animations.

### Deployment

- Added GitHub Pages workflow at `.github/workflows/pages.yml`.
- Workflow uses Node 24-compatible action versions.
- Workflow builds with `npm ci` and `npm run build`.
- GitHub Pages must be enabled in repository settings with Source set to GitHub Actions.
- Expected site URL:

```text
https://syafuuuuu.github.io/Syafuuuuu/
```

### Favicon

- Added the studio-console dial favicon.
- Source: `public/favicon.svg`.
- Included automatically in the Vite build.

## Validation Completed

The following checks have passed repeatedly:

```powershell
npm run build
```

The production build renders correctly in the browser. Verified behaviors include:

- React archive entry selection.
- URL state updates.
- Modal previous/next behavior.
- Escape-to-close behavior.
- Featured item cycling.
- Dial inner rotation.
- No horizontal overflow on mobile.
- Live seconds clock.
- Volume state cycling.
- Header indicator animations.
- Static drift animation.

## Known Caveats

### Dial Layering

The dial has been iteratively adjusted so the outer bezel and shadow remain fixed while the lighter inner face and orange marker rotate. The user previously noted that the orange marker still did not look perfect visually, although computed transforms were correct. This remains a small visual polish item and can be revisited with a dedicated SVG or nested DOM dial structure.

### Placeholder Media

The photographs are currently CSS gradient placeholders. Real photography should eventually replace the `media.background` values with actual image assets and `src` paths.

### Placeholder Links

Instagram, email, and note links currently use placeholder `#` targets.

### Duplicate Legacy Backend

The original FastAPI/Jinja files remain under `app/`. The public deployment uses the React/Vite frontend. Decide later whether FastAPI should remain as a backend service, be removed from the public path, or become an API/content layer.

### Static Export Script

`scripts/build_pages.py` was created before the React migration and is no longer the deployment path. GitHub Pages correctly uses Vite through `npm run build`. The old Python script can be removed or retained only for historical reference.

## Recommended Next Work

### 1. Improve the Archive Content Model

Add richer content fields as needed:

```js
{
  id: "...",
  type: "photograph",
  title: "...",
  date: "...",
  location: "...",
  summary: "...",
  content: "...",
  media: [
    {
      type: "image",
      src: "/images/example.jpg",
      alt: "..."
    }
  ],
  tags: ["..."],
  status: "published"
}
```

Keep content separate from presentation. Collections should group IDs, and views should decide how collections are displayed.

### 2. Add Real Media Assets

Create a proper archive folder, for example:

```text
public/
└── archive/
    ├── photographs/
    ├── notes/
    └── references/
```

Then replace CSS placeholders with optimized local images and meaningful alt text.

### 3. Add Archive Filtering

Add filters by:

- Entry type
- Tag
- Collection
- Date

Use URL query parameters so filtered views are shareable.

### 4. Expand the Archive Browser

Potential next interaction features:

- Grid/list view toggle.
- Search field styled as a console control.
- Collection selector.
- Related entries in the detail modal.
- Image sequences and multi-image entries.
- Loading and empty states.

### 5. Create Additional Pages Carefully

Only after the archive browser is stable, add dedicated routes or views for:

- Photographs
- Field notes
- Things I like
- About

Reuse the existing tactile components rather than creating independent page-specific styles.

### 6. Extract More Design Components

Good future candidates:

- `TactileButton`
- `ConsolePanel`
- `StatusIndicator`
- `ImageFrame`
- `SectionHeader`
- `ArchiveCard`
- `FilterControl`
- `CollectionBrowser`

React should own behavior and state. CSS should remain the source of truth for material, depth, proportion, and tactile feel.

### 7. Improve Accessibility and Motion Controls

Continue checking:

- Keyboard focus order.
- Modal focus management.
- Screen-reader announcements when entries change.
- Touch target sizes.
- `prefers-reduced-motion` behavior.
- Contrast when the palette becomes more vibrant.

## Local Development

Because the terminal may not have Node.js on PATH, use the command wrapper if needed:

```powershell
npm.cmd install
npm.cmd run dev
```

Or:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Build the production site with:

```powershell
npm.cmd run build
```

## Recommended Immediate Continuation

The strongest next feature is archive filtering and collection browsing. The content model and modal interaction already exist, so filtering can be added without changing the core visual language:

1. Add `type` and `tag` filter controls.
2. Store filter state in the URL.
3. Render filtered collection results.
4. Keep the modal and keyboard navigation working for filtered entries.
5. Add real media after the browsing model feels right.
