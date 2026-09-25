import clsx from "clsx";
import { Search } from "lucide-react";

import { WindowHeader } from "@/components";
import { locations } from "@/data";
import WindowWrapper from "@/hoc/WindowWrapper";
import useLocationStore from "@/store/location";
import useWindowStore from "@/store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank", "noopener");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3 className="text-xs font-medium text-gray-400 mb-1">{name}</h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
              item.id === activeLocation.id
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-200",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <WindowHeader target="finder">
        <Search className="icon" />
      </WindowHeader>

      <div className="sm:hidden flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto select-none no-scrollbar">
        {Object.values(locations).map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => setActiveLocation(loc)}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors",
              loc.id === activeLocation.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200/80 text-gray-700 hover:bg-gray-300",
            )}
          >
            <img src={loc.icon} className="w-3.5 h-3.5" alt={loc.name} />
            <span className="truncate max-w-[120px]">{loc.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-white flex flex-1 h-full min-h-[350px]">
        <div className="hidden sm:flex w-48 bg-gray-50 border-r border-gray-200 flex-col p-5 space-y-3 shrink-0 select-none">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <div className="flex-1 p-6 bg-white overflow-y-auto">
          {activeLocation?.children?.length > 0 ? (
            <ul className="grid grid-cols-3 sm:grid-cols-4 gap-6 content-start">
              {activeLocation.children.map((item) => (
                <li
                  key={item.id}
                  className="group flex flex-col items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-all select-none"
                  onClick={() => openItem(item)}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="size-14 sm:size-16 object-contain group-hover:scale-105 transition-transform"
                  />
                  <p className="text-xs sm:text-sm text-center font-medium text-gray-800 line-clamp-2 max-w-full px-1">
                    {item.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              This folder is empty
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(
  Finder,
  "finder",
  "w-3xl left-40 top-20 shadow-2xl drop-shadow-2xl overflow-hidden rounded-xl",
);

export default FinderWindow;
