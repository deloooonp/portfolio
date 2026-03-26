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
      return window.open(item.href, "_blank");

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
      <div className="bg-white flex h-full">
        <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col p-5 space-y-3">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <ul className="flex-1 p-8 bg-white max-w-2xl relative">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={clsx("group absolute flex items-center flex-col gap-3 cursor-pointer", item.position)}
              onClick={() => openItem(item)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="object-contain object-center size-17 relative group-hover:scale-105 group-hover:bg-gray-950/10 p-1 rounded-md transition-all"
              />
              <p className="text-sm text-center font-medium px-2 max-w-40 group-hover:bg-gray-800/10 rounded-md">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
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
