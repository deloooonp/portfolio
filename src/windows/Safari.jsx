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

import { WindowControls } from "@/components";
import { PROJECTS, PROJECT_TYPES, TYPE_COLORS } from "@/data";
import WindowWrapper from "@/hoc/WindowWrapper";

const ProjectCard = ({ project, onClick }) => (
  <div className="safari-card group" onClick={() => onClick(project)}>
    <div className="safari-card-thumb">
      <img src={project.thumbnail} alt={project.name} />
    </div>
    <div className="safari-card-body">
      <div className="flex items-center gap-2 mb-1">
        <span className="safari-card-year">{project.year}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="safari-card-tech">{project.tags[0]}</span>
      </div>
      <h3 className="safari-card-name group-hover:text-blue-600 transition-colors">
        {project.name}
      </h3>
    </div>
  </div>
);

const DetailView = ({ project, onBack }) => (
  <div className="safari-detail">
    <div className="safari-detail-hero">
      <img
        src={project.thumbnail}
        alt={project.name}
        className="safari-detail-img"
      />
      <button className="safari-back-overlay" onClick={onBack}>
        <ChevronLeft size={16} /> Return
      </button>
    </div>

    <div className="safari-detail-content">
      <div className="safari-detail-header">
        <p className="safari-detail-meta">
          {project.year} • {project.tags.join(", ")}
        </p>
        <h2 className="safari-detail-title">{project.name}</h2>
      </div>

      <div className="safari-detail-desc text-gray-600 text-lg leading-relaxed max-w-2xl">
        {project.description.map((para, i) => (
          <p key={i} className="mb-4">
            {para}
          </p>
        ))}
      </div>

      <div className="safari-detail-actions mt-10 flex gap-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="safari-action-primary"
        >
          View Live Site <ExternalLink size={16} />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="safari-action-secondary"
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
      <div id="window-header">
        <WindowControls target="safari" />
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
            className="search"
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <Search className="icon" />
            <input
              type="text"
              placeholder={
                selectedProject ? selectedProject.name : "Search projects…"
              }
              className="flex-1"
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
      </div>

      <div className="safari-catalogue">
        <div className={`safari-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h4 className="safari-sidebar-title">Favorites</h4>
          <div className="safari-sidebar-list">
            {PROJECTS.slice(0, 2).map((project) => (
              <button
                key={`fav-${project.id}`}
                className="safari-sidebar-item"
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

          <h4 className="safari-sidebar-title">Locations</h4>
          <div className="safari-sidebar-list">
            <button
              className={`safari-sidebar-item ${
                activeTag === null ? "active" : ""
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

          <h4 className="safari-sidebar-title">Type</h4>
          <div className="safari-sidebar-list">
            {PROJECT_TYPES.map((tag) => {
              const dotColor = TYPE_COLORS[tag] || "bg-gray-400";

              return (
                <button
                  key={tag}
                  className={`safari-sidebar-item ${
                    activeTag === tag ? "active" : ""
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

        <div className="safari-catalogue-content">
          {selectedProject ? (
            <DetailView project={selectedProject} onBack={handleBack} />
          ) : filtered.length > 0 ? (
            <div className="safari-grid">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleSelectProject}
                />
              ))}
            </div>
          ) : (
            <div className="safari-empty">
              <Search size={32} className="text-gray-300 mb-3" />
              <p>
                No projects match <strong>"{query || activeTag}"</strong>
              </p>
              <button
                className="safari-clear-btn"
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

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
