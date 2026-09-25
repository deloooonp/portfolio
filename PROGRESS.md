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

**Current phase:** 2 (data layer)
**Next action:** convert `src/data/*` to TypeScript (`projects.ts`, `finder.ts`, `profile.ts`, `gallery.ts`, barrel)
**Last verified green:** after Phase 1 + commit (`tsc -b`, `vite build`, `eslint` all clean)
**Blockers:** none

---

## Phases

| Phase | Scope                                                 | Status |
| ----- | ----------------------------------------------------- | ------ |
| 0     | Prep & guardrails (strict, allowJs, typecheck script) | done   |
| 1     | `src/types/` foundation                               | done   |
| 2     | Data layer (`data/*` → `.ts`)                         | todo   |
| 3     | Stores + constants dissolution                        | todo   |
| 4     | Hooks + HOC                                           | todo   |
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
| `src/data/projects.js`                     | 2     | todo      | drop `PROJECT_TYPES`/`TYPE_COLORS` (D4)                             |
| `src/data/finder.ts`                       | 2     | todo      | strip BOM                                                           |
| `src/data/profile.js`                      | 2     | todo      |                                                                     |
| `src/data/gallery.js`                      | 2     | todo      |                                                                     |
| `src/data/index.js`                        | 2     | todo      | barrel; unchanged apart from dropped exports                        |
| `src/store/window.js`                      | 3     | todo      | absorbs `INITIAL_Z_INDEX` (D2); `Record<WindowKey, WindowInstance>` |
| `src/store/location.js`                    | 3     | todo      |                                                                     |
| `src/constants/index.js`                   | 3     | dissolved | delete; members move per D2                                         |
| `src/hooks/useIsMobile.js`                 | 4     | todo      |                                                                     |
| `src/hoc/WindowWrapper.jsx`                | 4     | todo      | riskiest file — GSAP + DOM; verify against JS original              |
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
