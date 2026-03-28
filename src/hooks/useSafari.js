import { useMemo } from "react";
import { PROJECTS } from "@/data";
import useSafariStore from "@/store/safari";

export const useSafari = () => {
  const {
    query,
    setQuery,
    activeTag,
    setActiveTag,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedProject,
    setSelectedProject,
    handleBack,
    handleClearSearch,
  } = useSafariStore();

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesTag = activeTag === null || p.type === activeTag;

      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return {
    query,
    setQuery,
    activeTag,
    setActiveTag,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedProject,
    filteredProjects,
    handleSelectProject: setSelectedProject,
    handleBack,
    handleClearSearch,
  };
};
