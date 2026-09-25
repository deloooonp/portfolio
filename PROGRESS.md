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

**Current phase:** 6 (complete; Phase 7 deferred)
**Next action:** Stop here or commit Phase 6. Phase 7 (`App.tsx`, final cleanup and manual QA) is intentionally deferred.
**Last verified green:** Phase 6 (`npm run typecheck`, `npm run build`, `npm run lint`)
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
| 5     | Shared components                                     | done   |
| 6     | Apps                                                  | done   |
| 7     | Shell, cleanup, final verification                    | todo   |

## Files

| File | Phase | Status | Notes |
| --- | --- | --- | --- |
| `index.html` | — | done | Entry points to `/src/main.tsx`. |
| `src/main.tsx` | — | done | Pre-converted entry. |
| `src/index.css` | — | skipped | CSS, not migrated. |
| `src/types/fs.ts` | 1 | done | Filesystem discriminated unions. |
| `src/types/window.ts` | 1 | done | Window registry and store types. |
| `src/types/index.ts` | 1 | done | Type barrel. |
| `src/data/projects.ts` | 2 | done | Dropped dead exports. |
| `src/data/finder.ts` | 2 | done | Typed filesystem locations. |
| `src/data/profile.ts` | 2 | done | Typed socials and stack. |
| `src/data/gallery.ts` | 2 | done | Typed gallery data. |
| `src/data/index.ts` | 2 | done | Data barrel. |
| `src/store/window.ts` | 3 | done | Typed Zustand store; absorbed z-index constant. |
| `src/store/location.ts` | 3 | done | Typed Zustand location store. |
| `src/constants/index.js` | 5 | dissolved | Constants moved to consumers; directory deleted. |
| `src/hooks/useIsMobile.ts` | 4 | done | Typed media-query hook. |
| `src/hoc/WindowWrapper.tsx` | 4 | done | Generic GSAP/DOM HOC. |
| `src/components/window/WindowControls.tsx` | 5 | done | Typed props. |
| `src/components/window/WindowHeader.tsx` | 5 | done | Typed props and children. |
| `src/components/layout/Navbar.tsx` | 5 | done | Absorbed navigation constants. |
| `src/components/layout/Dock.tsx` | 5 | done | Absorbed dock constants. |
| `src/components/layout/Welcome.tsx` | 5 | done | Typed GSAP text interactions. |
| `src/components/layout/Home.tsx` | 5 | done | Typed project folders. |
| `src/components/index.ts` | 5 | done | Component barrel. |
| `src/apps/Text.tsx` | 6 | done | Typed text/file descriptions. |
| `src/apps/Image.tsx` | 6 | done | Typed image file payload. |
| `src/apps/Safari.tsx` | 6 | done | Converted without behavior changes. |
| `src/apps/Resume.tsx` | 6 | done | Typed local refs/state; react-pdf retained. |
| `src/apps/Contact.tsx` | 6 | done | Typed data inference. |
| `src/apps/Photos.tsx` | 6 | done | Typed gallery data inference. |
| `src/apps/Terminal.tsx` | 6 | done | Typed tech-stack rendering. |
| `src/apps/Finder.tsx` | 6 | done | Typed tree and explicit window mapping. |
| `src/apps/index.ts` | 6 | done | App barrel. |
| `src/App.jsx` | 7 | todo | Intentionally deferred. |

## Session log

| Date | Session | Did |
| --- | --- | --- |
| 2026-09-26 | planning | Refined plan and design decisions D1–D4. |
| 2026-09-26 | phase 0 | Enabled strict mode, temporary allowJs, and typecheck script. |
| 2026-09-26 | phase 1 | Created filesystem/window type foundation. |
| 2026-09-26 | phase 2 | Converted data layer to TypeScript and dropped dead exports. |
| 2026-09-26 | phase 3 | Converted Zustand stores and absorbed `INITIAL_Z_INDEX`. |
| 2026-09-26 | phase 4 | Converted mobile hook and WindowWrapper HOC. |
| 2026-09-26 | phase 5 | Converted shared components and dissolved constants directory. |
| 2026-09-26 | verification | Fixed Phase 5 typing/build issues in pushed commit `6dc4fad`. |
| 2026-09-26 | phase 6 | Converted all app files and barrel; typecheck, build, and lint green. |
