/**
 * Terminal app types.
 *
 * Pure type module — zero runtime imports.
 */

export interface TerminalCommand {
  name: string;
  description: string;
  category: "system" | "portfolio" | "tools";
  aliases?: string[];
  usage?: string;
}

export interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  isError: boolean;
  timestamp: number;
}

export interface TerminalState {
  history: TerminalEntry[];
  filter: string;
  addEntry: (command: string, output: string, isError?: boolean) => void;
  clearHistory: () => void;
  setFilter: (filter: string) => void;
}
