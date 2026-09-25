import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { FolderNode } from "../types";
import { locations } from "../data";

const DEFAULT_LOCATION = locations.work;

interface LocationState {
  activeLocation: FolderNode;
  setActiveLocation: (location: FolderNode) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;
