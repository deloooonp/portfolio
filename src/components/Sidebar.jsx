import clsx from "clsx";

const Sidebar = ({
  sections,
  className,
  isOpen = true,
  activeId,
  onSelect,
}) => {
  return (
    <div
      className={clsx(
        "bg-white/50 backdrop-blur-xl border-r border-white/20 flex flex-col overflow-hidden flex-none transition-all duration-300 ease-in-out",
        isOpen
          ? "w-48 opacity-100"
          : "w-0 opacity-0 border-transparent pointer-events-none",
        className,
      )}
      style={{
        WebkitBackdropFilter: "blur(24px)",
        willChange: "width, opacity",
      }}
    >
      <div className="w-48 p-5 flex flex-col space-y-3">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-medium text-gray-400 mb-1 px-1">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelect && onSelect(item)}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors active:bg-blue-200",
                    item.id === activeId
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-200",
                  )}
                >
                  <img
                    src={item.icon}
                    className="w-4 h-4 flex-none object-contain"
                    alt={item.name || item.label}
                  />
                  <p className="text-sm font-medium truncate flex-1">
                    {item.name || item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
