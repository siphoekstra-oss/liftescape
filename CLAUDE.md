# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Liftescape is a **dispatch coördinatieplatform** demo: a single-page React app that simulates a control room for coordinating certified lift-rescue responders (*bevrijders*) to people trapped in elevators (*liftopsluitingen*). It is a **pitch/validation prototype**, not a production system — there is no backend, no auth, and no persistence. All data is static seed data; incident state lives only in memory and is lost on refresh.

The business context, domain rationale, stakeholders, and revenue model live in a separate, much longer knowledge base: **`CLAUDE.md LIFTESCAPE.md`** (note the literal space in the filename — it is *not* auto-loaded by Claude Code). Read it when a task touches domain logic, terminology, or scenario semantics. Treat its terminology table as authoritative.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server (default http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

There is **no test suite, no linter, and no formatter configured**. Do not invent `npm test`/`npm run lint` — they will fail. Verify changes by running `npm run dev` and exercising the UI.

## Stack

- **React 19** + **react-router-dom 7** (client-side routing, `BrowserRouter`)
- **Vite 8** with `@vitejs/plugin-react` (ESM, `"type": "module"`)
- **Recharts 3** for the reporting charts (the only non-React runtime dep)
- Plain CSS with custom properties — no CSS framework, no CSS-in-JS, no preprocessor

## Architecture

Entry: `src/main.jsx` → `BrowserRouter` → `App.jsx`. `App.jsx` renders a fixed `Topbar` + `Sidebar` shell and a `<Routes>` outlet for four views:

| Route | View | Purpose |
|---|---|---|
| `/` | `views/Dashboard.jsx` | Live incident list + detail panel + metric cards |
| `/bevrijders` | `views/Bevrijders.jsx` | Responder network table + filters + modal |
| `/liften` | `views/Liften.jsx` | Elevator register table + filters |
| `/rapportage` | `views/Rapportage.jsx` | Recharts dashboards (uses its own demo data) |

### State model (the one thing to understand first)

Incidents are the **only** mutable state. They live in a single `useReducer` in `App.jsx` (`incidentReducer`) and are passed down by props — there is no context, Redux, or store. Three actions:

- `ADD` → builds a new incident via `createIncident(scenario)` and prepends it
- `RESOLVE` → sets `status: 'opgelost'`, stamps `opgelostOm`, appends a timeline entry
- `ESCALATE` → sets `status: 'geescaleerd'`, appends a critical timeline entry

Incident **lifecycle**: `actief` → `opgelost` or `geescaleerd` (terminal). Action buttons only render while `actief` (`DetailPanel`).

New incidents are created by the **scenario buttons** in the `Sidebar` (`onAddScenario`), which call `ADD` with a scenario key. `src/data/incidents.js` is the factory: `scenarioTemplates` defines scenarios **A–D**, each with urgency, passenger context, and a seeded `initialLog`. `createIncident` generates an `INC-YYYYMMDD-NNN` id, picks a matching lift by type and an available responder, and back-dates the initial timeline entries. (Domain scenarios E and F exist in the knowledge base but are **not** implemented in code.)

### Static data

`src/data/{bevrijders,liften}.js` export plain arrays consumed directly by views and the incident factory. Field names and string values are **Dutch** (`naam`, `bedrijf`, `regio`, `urgentie`, `monitoringstatus`, etc.). When adding records, match the existing shape exactly — the UI reads these keys directly with no schema layer.

### Elapsed-time pattern

`hooks/useElapsedTime.js` returns a live `HH:MM:SS` string ticking every second from a start timestamp; pass `null` to freeze it (done for resolved incidents). `IncidentCard` and `DetailPanel` both rely on this. `Topbar` has its own independent clock interval.

## Conventions (follow these — they are load-bearing)

- **Language is Dutch, everywhere.** UI copy, domain terms, *and code identifiers* (variables, data fields, action types like `opgelost`/`geescaleerd`) are Dutch. Keep new code consistent. Use the terminology table in `CLAUDE.md LIFTESCAPE.md` for correct terms (bevrijder, BRL K10006, urgentiebepaling, proceslog, …).
- **Dates/times use `nl-NL` locale** via `toLocaleTimeString`/`toLocaleDateString`. Match this for any new formatting.
- **`StatusBadge` derives its CSS class by slugifying the status string** (lowercase, spaces→`-`, `ë`→`e`). So a status value of `"opgelost"` needs a `.status-badge.opgelost` rule. If you add a status, add the matching CSS class in `components.css` or it will be unstyled.
- **Styling is via global CSS + custom properties, not inline-first.** Design tokens (`--gold`, `--bg-primary`, `--status-critical`, `--font-mono`, …) are defined in `src/styles/globals.css`; component classes live in `src/styles/components.css`. Reach for an existing token/class before adding a one-off. Inline styles are used sparingly for true one-offs — don't expand that habit.
- **The aesthetic is intentional**: near-black `#0A0A0A` background, antique-gold `#C9A84C` accent, "Bloomberg terminal meets SaaS". The global reset forces `border-radius: 0` — **sharp corners are a deliberate design choice**, do not round things. Fonts: Playfair Display (display), DM Mono (data/mono), DM Sans (body), loaded from Google Fonts in `index.html`.
- **Desktop-only by design**: `globals.css` sets `min-width: 1280px`. There is no responsive/mobile layout; don't add media queries expecting one.

## Gotchas

- `Rapportage.jsx` is **decorative** — it renders its own hardcoded/random demo data (`dagData`, `scenarioData`, `recenteIncidenten`) and is **not** wired to live incident state. Don't expect resolving an incident to change the charts.
- In `Sidebar`, the "Afgerond" and "Geëscaleerd" nav items and the Bevrijders/Liften badge counts (`12`/`20`) are **static/non-functional** (their `onClick` calls `preventDefault`); only the "Actieve meldingen" count is live.
- Incident state is **ephemeral** — a page reload clears all incidents back to empty. This is expected for a demo.
