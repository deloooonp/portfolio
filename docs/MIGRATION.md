# Migration Plan: `portfolio` (JavaScript) → `portfolio-ts` (TypeScript)

**Goal:** Convert the JavaScript portfolio to TypeScript with **zero feature changes** and **zero changes to core foundations** (same deps, same architecture, same markup/CSS, same content).

> **Progress tracking lives in [`PROGRESS.md`](../PROGRESS.md)** — the canonical per-file status ledger. Update it whenever a file or phase completes; this document only records the plan and design decisions.

**Current state:** The migration is complete through the shell. All source files under `src/` are TypeScript, the constants directory has been dissolved, and the same dependencies, architecture, markup, CSS, and content are retained. `tsc -b`, lint, and the production build are green. Manual browser QA remains separate from the automated migration checks.

**Strategy:** Convert leaf-to-root (types → data → stores → hooks → hoc → components → apps → shell), one commit per phase, running `tsc -b` + `npm run build` after each phase. No logic, markup, or data changes — types only.

---

## Design decisions (recorded so future-us doesn't relitigate)

### D1 — Types live in a central `src/types/` directory
All *shared* types (2+ consumers) go in `src/types/`. Single-consumer types (component props, etc.) stay inline in the file that owns them.

```
src/types/
  fs.ts       # FileType, FileNode, FolderNode, FsNode, Location, LocationKey, Description types
  window.ts   # WindowKey, WindowInstance, WindowState
  index.ts    # barrel
```

- `WindowKey` is a hand-written union in `types/window.ts`; the store's `WINDOW_CONFIG` is typed `Record<WindowKey, WindowInstance>`, so the compiler enforces registry ↔ union completeness **bidirectionally** (extra or missing key = build error). Same no-drift guarantee as deriving `keyof typeof`, but with central placement.
- `types/` files are **pure type modules** — zero runtime imports — so anything can import them without cycle risk.
- No `I` prefixes. All cross-module type imports use `import type` (also required by `verbatimModuleSyntax`).

### D2 — Single-consumer principle: a constant used by exactly one file lives in that file
Applied via a usage audit (verified with code search, not guessed). Result: **every constant in `src/constants/` has exactly one consumer**, so the `constants/` directory **dissolves entirely**:

| Constant | Sole consumer | Goes to |
|---|---|---|
| `NAV_LINKS` | `Navbar.jsx` | `components/layout/Navbar.tsx` |
| `NAV_ICONS` | `Navbar.jsx` | `components/layout/Navbar.tsx` |
| `DOCK_APPS` | `Dock.jsx` | `components/layout/Dock.tsx` |
| `INITIAL_Z_INDEX` | `store/window.js` | `store/window.ts` |

The same principle does **not** dissolve `data/` (see D3) and does not move long-form *content* into view files — the rule is for constants/types, not CMS-style copy.

### D3 — `data/` stays as TS modules; JSON rejected
`data/` keeps its current file structure (`finder.ts`, `projects.ts`, `profile.js`, `gallery.js` + barrel); we only add type annotations and drop dead exports.

**Why not JSON:** (1) JSON imports arrive as loose/inferred shapes — a misspelled `fileType` or missing `id` becomes a runtime bug instead of a build error, defeating the migration's purpose. (2) `data/finder.ts` **derives** its tree from `PROJECTS.map(...)` — computed structure JSON can't express without hand-duplicating generated entries. (3) The `description` field legitimately has two shapes (`string[]` and `{heading, meta, bullets}[]`); a TS union documents and enforces that, JSON can't. JSON would only earn its keep with non-developer editors or a runtime CMS/API — neither exists, and "no feature changes" rules out building one. Revisit if a CMS is ever introduced (that would be its own migration: fetch layer + runtime validation + loading states).

### D4 — Dead exports dropped
`PROJECT_TYPES` and `TYPE_COLORS` in `data/projects.ts` were exported but imported nowhere. Dead code isn't a feature; they are not carried forward.

---

## Phase 0 — Prep & guardrails ✅
- [x] Diff the trees to confirm no drift — clean, only delta is `main.jsx` → `main.tsx`.
- [x] **Enable `strict: true` in `tsconfig.app.json`** — done; typecheck + build green.
- [x] Temporary `allowJs: true` added so the mixed JS/TS tree typechecks (baseline surfaced `TS7016` on `./App.jsx`); **removed in Phase 7** once no `.jsx` remains.
- [x] `erasableSyntaxOnly` is on → **no enums/namespaces**; use string-literal unions + `as const` objects.
- [x] Add `"typecheck": "tsc -b"` script for fast verification.

> Note: TypeScript ~6.0 surfaced strict-null errors even without `strict` in the config; the flag is now pinned explicitly.

## Phase 1 — Type foundation (`src/types/`, no UI touched) ✅
- [x] `types/fs.ts` — the domain model the rest of the migration consumes:
  - `FileType = "txt" | "url" | "img" | "pdf"`
  - `FileNode` as a **discriminated union over `fileType`** (`TxtFileNode | UrlFileNode | ImgFileNode | PdfFileNode`), plus `FolderNode` discriminated on `kind`; `FsNode = FileNode | FolderNode`
  - `Description = Array<string | DescriptionEntry>` (the two-shape `description` field)
  - `Location extends FolderNode` with `type: LocationKey`; `LocationKey = "work" | "about" | "resume" | "trash"`; `LocationMap = Record<LocationKey, Location>`
  - `Project`, `Social`, `GalleryImage`, `TechStack` interfaces
- [x] `types/window.ts` — `WindowKey` union, `WindowInstance { isOpen, zIndex, data: FileNode | null }`, `WindowState` with store action signatures.
- [x] `types/index.ts` — barrel.
- [x] `tsc -b` green (types unused yet — self-consistency proven).

## Phase 2 — Data layer (content unchanged) ✅
- [x] `data/projects.ts` — `Project[]` annotation; **drop `PROJECT_TYPES` / `TYPE_COLORS`** (D4).
- [x] `data/finder.ts` — `WORK_LOCATION`, `ABOUT_LOCATION`, `RESUME_LOCATION`, `TRASH_LOCATION`, `locations` annotated as `Record<LocationKey, Location>`; the `PROJECTS`-derived children must typecheck against `FolderNode` — this is where the domain model earns its keep.
- [x] `data/profile.ts`, `data/gallery.ts` — annotate from `types/fs.ts`.
- [x] Barrel `data/index.ts` unchanged (minus dropped exports).
- [x] Strip the BOM in `finder.ts`/`projects.ts` while renaming.

## Phase 3 — Stores + constants dissolution ✅
- [x] `store/window.ts` — absorb `INITIAL_Z_INDEX` (D2). `WINDOW_CONFIG: Record<WindowKey, WindowInstance>` (D1). Typed zustand pattern: `create<WindowStore>()(immer(...))`. Delete `constants/` directory.
- [x] `store/location.ts` — typed zustand location store.

## Phase 4 — Hooks + HOC ✅
- [x] `hooks/useIsMobile.ts` — trivial (`MediaQueryListEvent` handler).
- [x] `hoc/WindowWrapper.tsx` — generic: `<P>(Component: ComponentType<P>, windowKey: WindowKey, windowClassName?: string)`. Type `useRef<HTMLElement | null>`, GSAP `Draggable` cleanup, `useGSAP` dep arrays.

## Phase 5 — Shared components (constants move in here per D2) ✅
- [x] `components/window/WindowControls.tsx`, `WindowHeader.tsx` — props interfaces inline (single consumer each).
- [x] `components/layout/Navbar.tsx` — **absorbs `NAV_LINKS` + `NAV_ICONS`** (`type: WindowKey`).
- [x] `components/layout/Dock.tsx` — **absorbs `DOCK_APPS`** (`id: WindowKey`; `windows[app.id]` lookup now typechecks).
- [x] `components/layout/Welcome.tsx`, `Home.tsx` — converted.
- [x] Barrel `components/index.ts` converted to `.ts`.

## Phase 6 — Apps (where the unions pay off) ✅
- [x] Converted `Text`, `Image`, `Safari`, `Resume`, `Contact`, `Photos`, `Terminal`, `Finder`, and the `apps/index.ts` barrel. Each uses the existing domain/data types without feature changes.
- [x] `Finder.tsx` uses explicit window-key mapping (`txt → "txtfile"`, `img → "imgfile"`; pdf/folder/url handled earlier).

## Phase 7 — Shell, cleanup, verification
- [x] `App.tsx`; verify `main.tsx` / `index.html` wiring.
- [x] Confirm no `.js(x)` twins remain anywhere under `src/`.
- [x] `tsc -b` clean → `npm run lint` clean → `npm run build` green.
- [ ] **Manual QA checklist** (no test suite exists):
  - [ ] All 8 apps open/close/focus
  - [ ] Z-order stacking (focus raises window)
  - [ ] GSAP open animation + desktop drag by header
  - [ ] Mobile sheet behavior (< 640px)
  - [ ] Finder: all 4 locations, folder navigation for every project, opening `.txt`/`.png`/url/README/pdf items
  - [ ] Terminal commands render tech stack
  - [ ] Resume PDF renders
  - [ ] Contact links open correct targets

---

## Gotchas found during code review
- `tsconfig.app.json` lacks `strict` — enabling it is the whole point of the migration.
- `noUnusedLocals` / `noUnusedParameters` will surface dead code — fix by removing, not by loosening.
- `verbatimModuleSyntax` is on → type-only imports must use `import type`.
- The original `data/finder.js` started with a BOM; it was stripped during the rename to `.ts`.
- `experience.txt`'s `description` is sometimes `string[]`, sometimes `{heading, meta, bullets}[]` — that's why `DescriptionEntry` is a union (D1/D3).
- Finder navigation uses explicit window-key mapping for typed file nodes.

## Final status
All planned TypeScript conversion phases are complete. Automated checks are green; the manual browser QA checklist below remains the only outstanding verification.
