# macOS-Style React Portfolio

A highly interactive, desktop-OS themed developer portfolio built with modern React. It features a window management system, dragging, z-index stacking, and a simulated filesystem for browsing projects and content.

## Tech Stack

- **Framework**: React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP (GreenSock) for window open/close behaviors, dock scaling, and draggable desktop icons
- **State Management**: Zustand (+ Immer) for managing window states and z-indexes globally
- **Build Tool**: Vite

## Core Architecture

This project is built around a robust, type-checked window management system rather than standard routing:

- **Window Wrapper (HOC)**: Generic wrapper component (`src/hoc/WindowWrapper.tsx`) that handles GSAP `Draggable` mounting, overlay behavior for mobile, and focus management.
- **File System Metaphor**: Content is structured using discriminated unions (`src/types/fs.ts`) imitating a file system. Content views map to these unions (e.g., clicking a `TxtFileNode` opens the `Text.tsx` viewer).
- **Zustand Store**: The core engine (`src/store/window.ts`) manages active apps, ensuring clicking an app raises it to the top z-index, while animations smoothly handle mounting and unmounting.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run TypeScript compilation check
npm run typecheck

# Build for production
npm run build
```

## Features

- **Finder**: Navigate through folders for Work, About, Resume, and Trash.
- **Terminal Display**: Shows off your tech stack dynamically.
- **Mobile Responsive**: On mobile devices (< 640px), draggable windows convert into native-feeling bottom sheets.
- **Type Safe**: The entire architecture (window keys, file nodes) relies on TypeScript unions to prevent runtime drift.
