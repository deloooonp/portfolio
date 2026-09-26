# Terminal Mobile Layout Fix

## Problem

Text wraps awkwardly on mobile - descriptions shift to the left instead of staying properly formatted.

## Goal

- **Desktop**: Keep side-by-side format (`/skills      — Show technical skills`)
- **Mobile**: Stack vertically with indentation:
  ```
  /skills
    Show technical skills
  ```

## Solution

Instead of changing the command output format, detect screen size in the component and format output accordingly.

## Implementation

1. Pass `isMobile` prop to TerminalOutput component
2. In TerminalWindow, detect mobile with `useIsMobile` hook
3. Format commands differently based on screen size:
   - Desktop: Use `padEnd(12)` with `—` separator (current format)
   - Mobile: Use line breaks with 2-space indentation

## Files to Modify

- `src/apps/terminal/components/TerminalWindow.tsx` - pass isMobile to TerminalOutput
- `src/apps/terminal/components/TerminalOutput.tsx` - accept isMobile prop, format conditionally
- `src/apps/terminal/lib/commands.ts` - add formatCommands(isMobile) and formatTechStack(isMobile) params

## Alternative (Simpler)

Create two separate format functions in commands.ts and call the right one based on mobile detection in TerminalWindow before adding to history.
