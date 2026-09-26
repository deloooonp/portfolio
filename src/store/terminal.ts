import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TerminalState } from "@/types/terminal";

const useTerminalStore = create<TerminalState>()(
  immer((set) => ({
    history: [],
    filter: "",

    addEntry: (command, output, isError = false) =>
      set((state) => {
        state.history.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          command,
          output,
          isError,
          timestamp: Date.now(),
        });
      }),

    clearHistory: () =>
      set((state) => {
        state.history = [];
      }),

    setFilter: (filter) =>
      set((state) => {
        state.filter = filter;
      }),
  }))
);

export default useTerminalStore;
