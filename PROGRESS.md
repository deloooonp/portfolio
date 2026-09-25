# Migration Progress Ledger

> **Canonical progress file for the `portfolio` (JS) → `portfolio-ts` (TS) migration.**
> Any session or agent resuming work: read this file first, then `docs/MIGRATION.md` for design decisions.
>
> **Update rules:**
>
> - Rewrite this whole file when updating (don't string-patch tables).
> - Per-file status changes → update the Files table below.
> - Phase completion → flip the phase row here, check the phase checkbox in `docs/MIGRATION.md`.
> - Never mark `done` without a green `npm run typecheck` + `npm run build` since the last change.
>
> **Status tokens (exact strings):** `todo` · `wip` · `done` · `skipped` · `dissolved` · `dropped`

---

**Current phase:** 5 (Shared components)
**Next action:** Convert `src/components/*` to TypeScript and absorb constants per D2
**Last verified green:** after Phase 4 (`tsc -b`, `vite build` both clean)
**Blockers:** none

---

## Phases

| Phase | Scope                                                 | Status |
| ----- | ----------------------------------------------------- | ------ |
| 0     | Prep & guardrails (strict, allowJs, typecheck script) | done   |
| 1     | `src/types/` foundation                               | done   |
| 2     | Data layer (`data/*` → `.ts`)                         | done   |
| 3     | Stores + constants dissolution                        | done   |
| 4     | Hooks + HOC                                           | done   |
| 5     | Shared components                                     | todo   |
| 6     | Apps                                                  | todo   |
| 7     | Shell, cleanup, final verification                    | todo   |

## Files

| File                                       | Phase | Status    | Notes                                                               |
| ------------------------------------------ | ----- | --------- | ------------------------------------------------------------------- |
| `index.html`                               | —     | done      | copied entry fixed to `/src/main.tsx` (was `main.jsx` — silent no-JS build) |
| `src/main.tsx`                             | —     | done      | pre-converted; added `!` assertion on root element                  |
| `src/index.css`                            | —     | skipped   | CSS, not migrated                                                   |
| `src/types/fs.ts`                          | 1     | done      | new file                                                            |
| `src/types/window.ts`                      | 1     | done      | new file                                                            |
| `src/types/index.ts`                       | 1     | done      | new file                                                            |
| `src/data/projects.ts`                     | 2     | done      | dropped `PROJECT_TYPES`/`TYPE_COLORS` (D4), renamed to `.ts`        |
| `src/data/finder.ts`                       | 2     | done      | stripped BOM, renamed to `.ts`                                      |
| `src/data/profile.ts`                      | 2     | done      | renamed to `.ts`                                                    |
| `src/data/gallery.ts`                      | 2     | done      | renamed to `.ts`                                                    |
| `src/data/index.ts`                        | 2     | done      | barrel; unchanged apart from dropped exports, renamed to `.ts`      |
| `src/store/window.ts`                      | 3     | done      | absorbed `INITIAL_Z_INDEX` (D2); `Record<WindowKey, WindowInstance>`, typed zustand |
| `src/store/location.ts`                    | 3     | done      | typed zustand with `Location` interface                             |
| `src/constants/index.js`                   | 5     | todo      | dissolution deferred to Phase 5 (components still import)          |
| `src/hooks/useIsMobile.ts`                 | 4     | done      | `boolean` return type, `MediaQueryListEvent` handler               |
| `src/hoc/WindowWrapper.tsx`                | 4     | done      | generic HOC with proper GSAP + DOM typing; fixed Draggable array   |
| `src/components/window/WindowControls.jsx` | 5     | todo      |                                                                     |
| `src/components/window/WindowHeader.jsx`   | 5     | todo      |                                                                     |
| `src/components/layout/Navbar.jsx`         | 5     | todo      | absorbs `NAV_LINKS` + `NAV_ICONS` (D2)                              |
| `src/components/layout/Dock.jsx`           | 5     | todo      | absorbs `DOCK_APPS` (D2)                                            |
| `src/components/layout/Welcome.jsx`        | 5     | todo      |                                                                     |
| `src/components/layout/Home.jsx`           | 5     | todo      |                                                                     |
| `src/components/index.js`                  | 5     | todo      | barrel                                                              |
| `src/apps/Text.jsx`                        | 6     | todo      | consumes `DescriptionItem` union                                    |
| `src/apps/Image.jsx`                       | 6     | todo      |                                                                     |
| `src/apps/Safari.jsx`                      | 6     | todo      |                                                                     |
| `src/apps/Resume.jsx`                      | 6     | todo      | react-pdf v11 has own types                                         |
| `src/apps/Contact.jsx`                     | 6     | todo      |                                                                     |
| `src/apps/Photos.jsx`                      | 6     | todo      |                                                                     |
| `src/apps/Terminal.jsx`                    | 6     | todo      | command parsing                                                     |
| `src/apps/Finder.jsx`                      | 6     | todo      | explicit windowKey mapping in `openItem`                            |
| `src/apps/index.js`                        | 6     | todo      | barrel                                                              |
| `src/App.jsx`                              | 7     | todo      |                                                                     |

## Session log

| Date       | Session  | Did                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------- |
| 2026-09-26 | planning | plan refined (D1–D4), MIGRATION.md written                                                   |
| 2026-09-26 | phase 0  | strict on, allowJs (temp), typecheck script, root `!`, all green                             |
| 2026-09-26 | phase 1  | `types/` foundation created (`fs.ts`, `window.ts`, barrel); typecheck + build green           |
| 2026-09-26 | reorg    | MIGRATION.md → `docs/`; fixed copied `index.html` entry (`main.jsx` → `main.tsx`, silent no-JS build); ledger corruption from string-patched tables repaired (rule added: rewrite this file whole) |
| 2026-09-26 | commits  | `114f03b` import + Phase 0 tooling, `c72724b` types foundation; docs commit follows           |
| 2026-09-26 | phase 2  | migrated `src/data/*` files to `.ts`, dropped unused exports and stripped BOM from files     |
| 2026-09-26 | phase 3  | typed zustand stores (`window.ts`, `location.ts`), absorbed `INITIAL_Z_INDEX`; constants dissolution deferred to Phase 5 |
| 2026-09-26 | phase 4  | parallel agents converted `useIsMobile.ts` + `WindowWrapper.tsx`; fixed GSAP Draggable array typing |