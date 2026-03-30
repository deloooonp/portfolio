import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  X,
} from "lucide-react";

import { Sidebar } from "@/components";
import DetailView from "@/components/safari/DetailView";
import ProjectCard from "@/components/safari/ProjectCard";
import { SAFARI_SECTIONS } from "@/data";
import WindowWrapper from "@/hoc/WindowWrapper";
import { useSafari } from "@/hooks/useSafari";

const Safari = () => {
  const {
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
  } = useSafari();

  const handleSelectTag = (tag) => {
    setActiveTag(tag);
    handleBack();
  };

  const activeId = selectedProject
    ? `fav-${selectedProject.id}`
    : activeTag || "all-projects";

  const handleSidebarSelect = (item) => {
    if (item.project) handleSelectProject(item.project);
    else handleSelectTag(item.tag);
  };

  return (
    <div className="flex flex-row flex-1 overflow-hidden bg-[#FAFAFA]">
      <Sidebar
        sections={SAFARI_SECTIONS}
        isOpen={isSidebarOpen}
        activeId={activeId}
        onSelect={handleSidebarSelect}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedProject ? (
          <DetailView project={selectedProject} onBack={handleBack} />
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10 overflow-y-auto flex-1 thin-scrollbar">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 text-sm">
            <Search size={32} className="text-gray-300 mb-3" />
            <p className="mb-3">
              No projects match <strong>"{query || activeTag}"</strong>
            </p>
            <button
              className="text-xs flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer px-4 py-2 bg-gray-100 rounded-full"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Safari.Header = () => {
  const {
    query,
    setQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedProject,
    handleBack,
  } = useSafari();

  return (
    <>
      <PanelLeft
        className={`ml-10 icon cursor-pointer transition-colors ${
          isSidebarOpen ? "text-blue-500" : ""
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex items-center gap-1 ml-5">
        {selectedProject ? (
          <ChevronLeft className="icon cursor-pointer" onClick={handleBack} />
        ) : (
          <ChevronLeft className="icon opacity-30" />
        )}
        <ChevronRight className="icon opacity-30" />
      </div>

      <div className="flex-1 flex-center gap-3">
        <ShieldHalf className="icon" />
        <div
          className="flex items-center gap-3 w-2/3 bg-gray-100 rounded-lg px-3 py-2"
          onPointerDownCapture={(e) => e.stopPropagation()}
        >
          <Search className="icon" />
          <input
            type="text"
            placeholder={
              selectedProject ? selectedProject.name : "Search projects…"
            }
            className="placeholder:text-gray-400 bg-transparent outline-none flex-1 min-w-0"
            value={selectedProject ? "" : query}
            onChange={(e) => {
              if (!selectedProject) setQuery(e.target.value);
            }}
            readOnly={!!selectedProject}
          />
          {query && !selectedProject && (
            <X
              size={14}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setQuery("")}
            />
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari", {
  className:
    "w-4xl h-[640px] top-40 left-2/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden flex flex-col",
});

export default SafariWindow;
