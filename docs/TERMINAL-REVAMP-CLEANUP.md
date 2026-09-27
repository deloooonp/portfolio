# Terminal Revamp Cleanup Plan

## Goal
Simplify the terminal implementation by removing unnecessary complexity while keeping core functionality working.

## Changes

### 1. Remove Terminal Store
- **Delete**: `src/store/terminal.ts`
- **Reason**: History management not needed for initial MVP
- **Impact**: Move history to local component state instead
- **Files affected**: 
  - `src/types/terminal.ts` (remove TerminalState interface)
  - `src/apps/terminal/components/TerminalWindow.tsx` (use useState for history)

### 2. Remove Mobile Button Component
- **Delete**: `src/apps/terminal/components/CommandButtons.tsx`
- **Reason**: Mobile UX should follow desktop pattern for now
- **Impact**: Both platforms use CommandPalette
- **Files affected**:
  - `src/apps/terminal/components/TerminalWindow.tsx` (remove platform check)

### 3. Update CommandPalette
- **Remove**: Command grouping display (categories not shown)
- **Keep**: Search/filter functionality
- **Simplify**: Show all commands in single searchable list

### 4. Update `/help` Command
- **Change**: Show all available commands (like welcome message)
- **Format**: List all commands with descriptions (no arguments needed)
- **Remove**: Command-specific help (just list everything)

### 5. Update `/skills` Command
- **Keep**: Display tech stack from TECH_STACK data
- **No changes needed**: Already correct

### 6. Remove CommandButtons Export
- **Delete**: From component barrel if exists
- **Update**: `src/apps/terminal/components/` index

## Files to Delete
```
src/store/terminal.ts
src/apps/terminal/components/CommandButtons.tsx
```

## Files to Modify
```
src/types/terminal.ts - Remove TerminalState
src/types/index.ts - Update exports
src/apps/terminal/components/TerminalWindow.tsx - Use useState, remove mobile check
src/apps/terminal/components/CommandPalette.tsx - Simplify UI
src/apps/terminal/lib/commands.ts - Update /help command
```

## Acceptance Criteria
1. Terminal still shows welcome message on open
2. `/help` shows all commands (no args needed)
3. `/skills` shows tech stack correctly
4. CommandPalette works on all screen sizes
5. Search/filter still works
6. No console errors, typecheck passes

## After Cleanup
- Simpler codebase
- Easier to modify later
- No store overhead
- Component state only
