import { Search } from "lucide-react";

import { WindowHeader, Sidebar } from "@/components";
import { FINDER_SECTIONS } from "@/data";
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

  return (
    <>
      <WindowHeader target="finder">
        <Search className="icon" />
      </WindowHeader>
      <div className="bg-white flex h-full overflow-hidden">
        <Sidebar
          sections={FINDER_SECTIONS}
          activeId={activeLocation?.id}
          onSelect={(item) => setActiveLocation(item)}
        />

        <ul className="flex-1 p-8 bg-white max-w-2xl relative">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={`group absolute flex items-center flex-col gap-3 cursor-pointer ${item.position}`}
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
