import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSafariStore = create(
  immer((set) => ({
    query: "",
    activeTag: null,
    isSidebarOpen: true,
    selectedProject: null,

    setQuery: (query) =>
      set((state) => {
        state.query = query;
      }),

    setActiveTag: (tag) =>
      set((state) => {
        state.activeTag = tag;
        state.selectedProject = null;
      }),

    setIsSidebarOpen: (isOpen) =>
      set((state) => {
        state.isSidebarOpen = isOpen;
      }),

    toggleSidebar: () =>
      set((state) => {
        state.isSidebarOpen = !state.isSidebarOpen;
      }),

    setSelectedProject: (project) =>
      set((state) => {
        state.selectedProject = project;
      }),

    handleBack: () =>
      set((state) => {
        state.selectedProject = null;
      }),

    handleClearSearch: () =>
      set((state) => {
        state.query = "";
        state.activeTag = null;
      }),
  })),
);

export default useSafariStore;
