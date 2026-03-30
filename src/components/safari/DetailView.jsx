import { ChevronLeft, ExternalLink, Github } from "lucide-react";

const DetailView = ({ project, onBack }) => (
  <div className="flex flex-col flex-1 overflow-y-auto bg-white thin-scrollbar">
    <div className="relative aspect-video md:aspect-21/9 max-h-[60vh] w-full overflow-hidden flex-none bg-gray-100">
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

export default DetailView;
