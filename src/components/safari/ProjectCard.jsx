const ProjectCard = ({ project, onClick }) => (
  <div
    className="cursor-pointer flex flex-col gap-4 group"
    onClick={() => onClick(project)}
  >
    <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:shadow-gray-200/50 group-hover:-translate-y-1">
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

export default ProjectCard;
