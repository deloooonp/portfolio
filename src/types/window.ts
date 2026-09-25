/**
 * Window manager types.
 *
 * Pure type module — zero runtime imports. The store's WINDOW_CONFIG is
 * typed `Record<WindowKey, WindowInstance>` so a missing or extra key is a
 * build error (registry ↔ union can never drift).
 */

import type { FileNode } from "./fs";

export type WindowKey =
  | "finder"
  | "contact"
  | "resume"
  | "safari"
  | "photos"
  | "terminal"
  | "txtfile"
  | "imgfile";

export interface WindowInstance {
  isOpen: boolean;
  zIndex: number;
  /** Payload for content windows (txtfile/imgfile); null otherwise. */
  data: FileNode | null;
}

export interface WindowState {
  windows: Record<WindowKey, WindowInstance>;
  nextZIndex: number;
  openWindow: (windowKey: WindowKey, data?: FileNode) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey, data?: FileNode) => void;
}
