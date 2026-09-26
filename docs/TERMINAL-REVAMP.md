# Terminal Revamp Plan

## Goal

Revamp the portfolio terminal to support slash commands (/skills, /help, etc.) with platform-specific UX:

- **Desktop**: Loads prompts on launch + allows typing to filter/search commands
- **Mobile**: Loads prompts on launch + allows clicking commands directly
- **Both**: Simple output display, no animations prioritized

## Core Features

### 1. Command System

- `/skills` - Display available skills/commands
- `/help [command]` - Show command usage
- `/clear` - Clear terminal history
- `/theme` - Toggle dark/light
- `/credits` - Portfolio credits
- Additional commands as needed

### 2. Platform-Specific UX

**Desktop (≥768px)**

- Commands listed on launch as searchable palette
- Type to filter/search commands by name or description
- Hover states for interactivity
- Click to execute command
- Output displayed below

**Mobile (<768px)**

- Commands displayed as clickable buttons on launch
- Tap any button to execute command
- Output displayed above buttons
- Touch-optimized button sizes (min 44px tap targets)

### 3. Output Display

- Plain text rendering (no streaming animations)
- Auto-scroll to bottom on new output
- Clear formatting with code blocks where needed
- Simple and fast

### 4. UI Components (in `src/apps/terminal/`)

- `src/apps/terminal/index.tsx` - Entry point
- `src/apps/terminal/components/TerminalWindow.tsx` - Main container with platform detection
- `src/apps/terminal/components/CommandPalette.tsx` - Desktop command search/list
- `src/apps/terminal/components/CommandButtons.tsx` - Mobile tap targets
- `src/apps/terminal/components/TerminalOutput.tsx` - Output display
- `src/apps/terminal/lib/commands.ts` - Command registry and execution

### 5. Shared Components (in `src/components/`)

- Any reusable UI components (buttons, inputs, etc.) follow atomic design

## Directory Structure

```
src/apps/terminal/
├── index.tsx                 # Entry point
├── components/
│   ├── TerminalWindow.tsx    # Main container
│   ├── CommandPalette.tsx    # Desktop
│   ├── CommandButtons.tsx    # Mobile
│   └── TerminalOutput.tsx    # Output display
└── lib/
    └── commands.ts           # Command registry
```

## Implementation Phases

### Phase 1: Core Infrastructure

1. Create terminal types (`src/types/terminal.ts`)
2. Create terminal store (`src/store/terminal.ts`)
3. Create command registry (`src/apps/terminal/lib/commands.ts`)
4. Add window config for Terminal app

### Phase 2: Terminal UI Shell

1. Create `src/apps/terminal/index.tsx` entry point
2. Create `TerminalWindow.tsx` with platform detection
3. Build responsive layout
4. Wire store to components

### Phase 3: Desktop Implementation

1. Create `CommandPalette.tsx` (searchable command list)
2. Add type-to-filter functionality
3. Implement command execution

### Phase 4: Mobile Implementation

1. Create `CommandButtons.tsx` (tap targets)
2. Add mobile-optimized button grid
3. Implement tap-to-execute

### Phase 5: Command Implementation

1. Implement /skills command
2. Implement /help command
3. Implement /clear and /theme
4. Add /credits command

### Phase 6: Polish & Testing

- Keyboard shortcuts (desktop Enter/Escape)
- Error handling and edge cases
- localStorage for history (optional)
- Type safety verification

## Files to Create/Modify

### New Files

```
src/types/terminal.ts
src/store/terminal.ts
src/apps/terminal/index.tsx
src/apps/terminal/components/TerminalWindow.tsx
src/apps/terminal/components/CommandPalette.tsx
src/apps/terminal/components/CommandButtons.tsx
src/apps/terminal/components/TerminalOutput.tsx
src/apps/terminal/lib/commands.ts
```

### Modify Existing

```
src/apps/index.ts - Add Terminal export
src/store/window.ts - Add Terminal window config
```

## Acceptance Criteria

1. Desktop loads with searchable command list on launch
2. Desktop allows typing to filter commands
3. Mobile loads with clickable command buttons on launch
4. Commands execute when clicked (desktop) or tapped (mobile)
5. Output displays correctly on both platforms
6. /skills lists all available commands
7. /help shows command details
8. /theme toggles dark/light properly
9. No console errors or type issues
10. Responsive and working on all screen sizes

## Timeline

- Phase 1: 30 min (types + store + registry)
- Phase 2: 45 min (UI shell + platform detection)
- Phase 3: 45 min (desktop search/filter)
- Phase 4: 30 min (mobile buttons)
- Phase 5: 1 hour (commands)
- Phase 6: 30 min (polish + testing)

Total: ~3.5-4 hours
