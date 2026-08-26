# Project Testing Steps

Interactive, manual QA checklists for production-grade **websites** and **web applications**. Each checklist is a simple, clickable UI: tap an item to mark it done and track your progress with a live progress bar.

## Pages

| Page | Description |
| --- | --- |
| `index.html` | Homepage with links to both checklists and a short project overview. |
| `website-testing.html` | Interactive checklist for testing a production-grade website. |
| `web-application-testing.html` | Interactive checklist for testing a production-grade web application (superset of the website list). |

## Structure

| Path | Responsibility |
| --- | --- |
| `assets/constants.js` | **Single source of truth** for the checklists — an array of objects (`window.CHECKLISTS`) with each checklist's `id`, `title`, `description`, and `items`. Edit this file to change checklist content. |
| `assets/checklist.js` | Renders a checklist from `constants.js`: builds the interactive checkbox rows, handles toggling, the progress bar, and the reset button. |
| `assets/theme.js` | Tailwind config (`darkMode: 'class'`) and the light/dark theme toggle. |
| `index.html`, `*-testing.html` | Static pages that load the assets and bootstrap the checklist for a given `key`. |

Styling is provided by the [Tailwind Play CDN](https://tailwindcss.com/docs/installation/play-cdn) (`https://cdn.tailwindcss.com`) — no build step or dependencies required.

## How to run

Open `index.html` directly in a browser, or serve the folder with any static file server and visit it:

```bash
python -m http.server
# then open http://localhost:8000
```

To publish, push the repository to GitHub and enable **GitHub Pages** on the root of the default branch. The pages use relative paths, so they work from any subpath.

## Behavior notes

- **Checklist data lives in `assets/constants.js`**, not in markdown docs.
- **Checkbox state is intentionally ephemeral** — it resets when the page is reloaded.
- **Theme preference is remembered** in `localStorage`; the default follows the OS `prefers-color-scheme`.

## Adding or editing a checklist

1. Open `assets/constants.js`.
2. Add or edit an object in the `window.CHECKLISTS` array (`id`, `title`, `description`, `items`).
3. If it is a new checklist, create an HTML page that calls `ProjectChecklist.init({ key: "<id>", ... })` and link to it from `index.html`.
