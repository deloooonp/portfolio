# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript React portfolio application currently undergoing migration from JavaScript. It simulates a desktop environment with draggable windows, a dock, and various "apps" that showcase portfolio content. The project uses modern React patterns with GSAP animations, Zustand state management, and a filesystem-inspired content model.

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Type checking (fast verification during migration)
npm run typecheck

# Full build pipeline (TypeScript compilation + Vite bundling)
npm run build

# Linting
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Migration Status

**Critical:** This codebase is mid-migration from JavaScript to TypeScript. Always check `PROGRESS.md` before working on files - it tracks the canonical per-file conversion status and current migration phase. The migration follows a leaf-to-root strategy: types → data → stores → hooks → HOC → components → apps → shell.

### Core Architecture Patterns

**Window Management System**: The app simulates a desktop OS with multiple window types. Each "app" (Contact, Finder, Photos, etc.) is wrapped by `WindowWrapper` HOC which provides:

- GSAP-based open/close animations
- Desktop drag behavior via GSAP Draggable
- Mobile sheet-style overlays
- Z-index management for focus/stacking

**State Management**: Uses Zustand with Immer middleware:

- `useWindowStore`: Manages window open/closed state, z-indices, and file data payloads
- `useLocationStore`: Tracks active Finder location (work/about/resume/trash)

**Content Model**: File system metaphor with discriminated unions:

- `FileNode` types: `TxtFileNode | UrlFileNode | ImgFileNode | PdfFileNode`
- All discriminated on `fileType` field for exhaustive type checking
- `FolderNode` for directories, `Location` extends `FolderNode` for top-level areas
- Portfolio projects are mapped to folder structures in `data/finder.ts`

### Directory Structure

```
src/
├── types/          # Pure type modules (no runtime imports)
│   ├── fs.ts       # File system domain model
│   ├── window.ts   # Window management types
│   └── index.ts    # Barrel exports
├── data/           # Content and configuration (all TypeScript)
├── store/          # Zustand stores (TypeScript with proper typing)
├── hoc/            # Higher-order components
├── hooks/          # Custom hooks
├── components/     # Reusable UI components
└── apps/           # Window content applications
```

## Type System Design

**Central Types**: Shared types live in `src/types/` to avoid import cycles. Single-consumer types stay inline.

**Discriminated Unions**: The `FileNode` system uses discriminated unions on `fileType` field, enabling exhaustive pattern matching in switch statements.

**Window Registry**: `WindowKey` union is hand-written and kept in sync with store's `WINDOW_CONFIG` via `Record<WindowKey, WindowInstance>` typing - the compiler enforces completeness bidirectionally.

## Key Technical Details

**GSAP Integration**: WindowWrapper uses `useGSAP` hook for animations. Draggable instances require proper cleanup via `.kill()` method in useEffect cleanup functions.

**Mobile Responsive**: App detects mobile via `useIsMobile` hook and renders different UI - desktop windows vs mobile sheet overlays.

**Path Aliases**: `@/` resolves to `src/` directory via Vite configuration.

**Strict TypeScript**: Project uses `strict: true` with `verbatimModuleSyntax` requiring explicit `import type` for type-only imports.

## Migration Context

**Constants Dissolution**: The migration eliminates `src/constants/` by moving each constant to its single consumer (verified via usage audit). For example:

- `NAV_LINKS`/`NAV_ICONS` → `Navbar.tsx`
- `DOCK_APPS` → `Dock.tsx`
- `INITIAL_Z_INDEX` → absorbed into `store/window.ts`

**Conversion Strategy**: Each phase must pass `npm run typecheck` and `npm run build` before being considered complete. The migration preserves all behavior - no feature changes or logic modifications.

**File Naming**: TypeScript files use `.ts` for pure logic, `.tsx` for React components. The HOC uses generic typing pattern: `<P extends object>(Component: ComponentType<P>, ...) => ComponentType<P>`.
