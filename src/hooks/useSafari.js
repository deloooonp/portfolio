import { useMemo, useState } from "react";
import { PROJECTS } from "@/data";

export const useSafari = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleSelectProject = (project) => setSelectedProject(project);
  const handleBack = () => setSelectedProject(null);
  const handleClearSearch = () => {
    setQuery("");
    setActiveTag(null);
  };

  return {
    query,
    setQuery,
    activeTag,
    setActiveTag,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedProject,
    filteredProjects,
    handleSelectProject,
    handleBack,
    handleClearSearch,
  };
};
