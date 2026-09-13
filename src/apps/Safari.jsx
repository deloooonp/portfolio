import {
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Folder,
  Github,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { WindowHeader } from "@/components";
import { PROJECTS, PROJECT_TYPES, TYPE_COLORS } from "@/data";
import WindowWrapper from "@/hoc/WindowWrapper";

const SIDEBAR_ITEM_CLS =
  "flex items-center gap-2 text-[13px] font-medium text-gray-700 px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer w-full hover:bg-gray-50 hover:text-gray-900";

const ProjectCard = ({ project, onClick }) => (
  <div
    className="cursor-pointer flex flex-col gap-4 group"
    onClick={() => onClick(project)}
  >
    <div className="h-56 rounded-xl overflow-hidden bg-gray-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:shadow-gray-200/50 group-hover:-translate-y-1">
      <img
        src={project.thumbnail}
        alt={project.name}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
    <div className="px-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
          {project.year}
        </span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
          {project.tags[0]}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 leading-snug tracking-tight group-hover:text-blue-600 transition-colors">
        {project.name}
      </h3>
    </div>
  </div>
);

const DetailView = ({ project, onBack }) => (
  <div className="flex flex-col h-[560px] overflow-y-auto bg-white thin-scrollbar">
    <div className="relative h-80 w-full overflow-hidden flex-none bg-gray-100">
      <img
        src={project.thumbnail}
        alt={project.name}
        className="w-full h-full object-cover object-top"
      />
      <button
        className="absolute top-5 left-5 flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-white/70 backdrop-blur-md text-gray-800 hover:bg-white hover:scale-105 transition-all cursor-pointer shadow-sm"
        onClick={onBack}
      >
        <ChevronLeft size={16} /> Return
      </button>
    </div>

    <div className="p-12 max-w-4xl mx-auto w-full pb-20">
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
          {project.year} • {project.tags.join(", ")}
        </p>
        <h2 className="text-5xl font-bold text-gray-900 leading-tight tracking-tighter">
          {project.name}
        </h2>
      </div>

      <div className="text-gray-600 text-lg leading-relaxed max-w-2xl">
        {project.description.map((para, i) => (
          <p key={i} className="mb-4">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-10 flex gap-4 pt-4 border-t border-gray-100">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 hover:scale-105 transition-all shadow-md"
        >
          View Live Site <ExternalLink size={16} />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:scale-105 transition-all"
        >
          Source Code <Github size={16} />
        </a>
      </div>
    </div>
  </div>
);

const Safari = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => {
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

  return (
    <>
      <WindowHeader target="safari">
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

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </WindowHeader>

      <div className="flex flex-row h-full max-h-[560px] overflow-hidden bg-[#FAFAFA]">
        {/* Sidebar */}
        <div
          className={`overflow-hidden bg-white border-r flex-none transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-56 border-gray-100" : "w-0 border-transparent"
          }`}
        >
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">
            Favorites
          </h4>
          <div className="flex flex-col gap-1 px-3 pb-6">
            {PROJECTS.slice(0, 2).map((project) => (
              <button
                key={`fav-${project.id}`}
                className={SIDEBAR_ITEM_CLS}
                onClick={() => handleSelectProject(project)}
              >
                <Star
                  size={14}
                  className="flex-none text-yellow-400 fill-yellow-400"
                />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>

          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">
            Locations
          </h4>
          <div className="flex flex-col gap-1 px-3 pb-6">
            <button
              className={`${SIDEBAR_ITEM_CLS} ${
                activeTag === null
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : ""
              }`}
              onClick={() => {
                setActiveTag(null);
                setSelectedProject(null);
              }}
            >
              <Folder
                size={14}
                className="flex-none text-blue-400 fill-blue-400"
              />
              All Projects
            </button>
          </div>

          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">
            Type
          </h4>
          <div className="flex flex-col gap-1 px-3 pb-6">
            {PROJECT_TYPES.map((tag) => {
              const dotColor = TYPE_COLORS[tag] || "bg-gray-400";
              return (
                <button
                  key={tag}
                  className={`${SIDEBAR_ITEM_CLS} ${
                    activeTag === tag
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveTag(tag);
                    setSelectedProject(null);
                  }}
                >
                  <span
                    className={`flex-none w-2.5 h-2.5 rounded-full ${dotColor}`}
                  />
                  <span className="truncate">{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {selectedProject ? (
            <DetailView project={selectedProject} onBack={handleBack} />
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 p-10 overflow-y-auto flex-1 thin-scrollbar">
              {filtered.map((project) => (
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
                onClick={() => {
                  setQuery("");
                  setActiveTag(null);
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(
  Safari,
  "safari",
  "w-4xl top-40 left-2/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default SafariWindow;
