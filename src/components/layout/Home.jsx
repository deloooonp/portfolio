import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";

import { locations } from "@/data";
import useLocationStore from "@/store/location";
import useWindowStore from "@/store/window";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <section id="home" className="relative z-0 max-sm:hidden">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx(
              "group folder absolute z-0 select-none flex items-center flex-col",
              project.windowPosition,
            )}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img
              src="/images/folder.png"
              alt={project.name}
              className="group-hover:bg-gray-950/10 p-1 rounded-md"
            />
            <p className="text-sm text-white text-center px-1 rounded-md group-hover:bg-blue-500 transition-colors max-w-40">
              {project.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
