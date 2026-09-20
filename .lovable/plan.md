# CSV Viewer — a faster, friendlier online CSV tool

A single-page, fully in-browser CSV viewer. Files never leave the visitor's computer. Goal: beat csv-viewer-online.github.io on speed, polish, and features.

## Core experience

- Big drop zone on the home page: drag a file, click to browse, or paste CSV text directly.
- Also accepts a file URL and sample data ("Try an example") so the page is never empty-feeling.
- Instant table view with sticky header, row numbers, zebra rows, and resizable columns.
- Handles large files smoothly by only rendering visible rows (virtualised scrolling), so 100k+ rows stay responsive.

## Features that beat the reference site

- Search across all cells with match highlighting and a match count.
- Per-column filters and click-to-sort (text and numeric aware).
- Column show/hide, plus column reordering by drag.
- Auto-detected delimiter (comma, semicolon, tab, pipe) with a manual override; header-row toggle; encoding choice.
- Cell editing with undo, then export back to CSV, TSV, JSON, or Markdown table; copy selection to clipboard.
- Quick stats panel per column: type guess, empty count, unique count, min/max/mean for numbers.
- Multiple files open as tabs.
- Keyboard shortcuts (search, next match, jump to row) and a shortcuts help dialog.
- Light/dark theme, remembers the last settings.

## Design direction

Clean, data-dense "developer tool" look: neutral slate surfaces, one confident accent colour, monospaced numerals in the grid, tight spacing, subtle borders instead of heavy shadows. Deliberately not a purple-gradient landing page. Home page = the tool itself, with a short value line and feature strip below the fold.

## Pages

- `/` — the viewer (drop zone becomes the grid once a file loads).
- `/about` — what it does, privacy promise (all parsing is local), keyboard shortcuts.

## Technical notes

- TanStack Start route at `src/routes/index.tsx` replaces the placeholder; `/about` as a second route.
- Parsing with PapaParse in a Web Worker (streaming) so the UI never blocks; row virtualisation via `@tanstack/react-virtual`.
- All state client-side; no backend, no database, no uploads.
- Settings persisted in localStorage, read after hydration to avoid mismatch.
- Design tokens added to `src/styles.css`; shadcn components for dialogs, tabs, dropdowns, tooltips.
- Per-route `head()` metadata with CSV-viewer-specific titles/descriptions for search and social previews.

## Out of scope for this first build

Accounts, saving files to a server, XLSX/Excel parsing, charts. Easy to add later if wanted.
