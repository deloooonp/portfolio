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

**Current phase:** 7 (complete)
**Next action:** Commit Phase 7, then perform manual browser QA when convenient.
**Last verified green:** `npm run typecheck`, `npm run lint`, `npm run build`
**Blockers:** none

---

## Phases

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Prep & guardrails | done |
| 1 | `src/types/` foundation | done |
| 2 | Data layer | done |
| 3 | Stores + constants dissolution | done |
| 4 | Hooks + HOC | done |
| 5 | Shared components | done |
| 6 | Apps | done |
| 7 | Shell, cleanup, final verification | done |

## Files

| File | Phase | Status | Notes |
| --- | --- | --- | --- |
| `index.html` | — | done | Entry points to `/src/main.tsx`. |
| `src/main.tsx` | — | done | Imports `./App`; renders StrictMode root. |
| `src/index.css` | — | skipped | CSS, not migrated. |
| `src/types/*` | 1 | done | Filesystem and window domain types. |
| `src/data/*` | 2 | done | Typed content modules. |
| `src/store/*` | 3 | done | Typed Zustand stores. |
| `src/constants/` | 5 | dissolved | Constants moved to consumers; directory deleted. |
| `src/hooks/useIsMobile.ts` | 4 | done | Typed media-query hook. |
| `src/hoc/WindowWrapper.tsx` | 4 | done | Generic GSAP/DOM HOC. |
| `src/components/*` | 5 | done | All shared components and barrel converted. |
| `src/apps/*` | 6 | done | All apps and barrel converted. |
| `src/App.tsx` | 7 | done | Shell converted; `App.jsx` removed. |

## Verification

- `npm run typecheck` ✅
- `npm run lint` ✅
- `npm run build` ✅
- No `.js` or `.jsx` files remain under `src/`.
- Vite reports only the existing large-chunk warning for the bundled PDF worker/application output.

## Session log

| Date | Session | Did |
| --- | --- | --- |
| 2026-09-26 | planning | Refined migration plan and design decisions D1–D4. |
| 2026-09-26 | phases 0–6 | Completed staged TypeScript migration through apps. |
| 2026-09-26 | phase 7 | Converted `App.jsx` to `App.tsx`, fixed `main.tsx`, removed `allowJs`, deleted remaining JS files, and passed final checks. |
