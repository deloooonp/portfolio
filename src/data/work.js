import { PROJECTS } from "./projects";

export const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: PROJECTS.map((project, index) => {
    const slug =
      project.name
        .split(" ")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") || `project${project.id}`;

    return {
      id: project.id + 4,
      name: project.name,
      icon: "/images/folder.png",
      kind: "folder",
      position:
        project.desktopPosition || `top-${index * 12} left-${index * 12}`,
      windowPosition: project.windowPosition || "top-[20vh] left-20",
      children: [
        {
          id: 1,
          name: `${slug}.txt`,
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-12 left-12",
          description: project.description,
        },
        {
          id: 2,
          name: `${slug}.com`,
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: project.liveUrl,
          position: "top-32 left-8",
        },
        {
          id: 4,
          name: `${slug}.png`,
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-56 right-48",
          imageUrl: project.thumbnail,
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "url",
          href: project.githubUrl,
          position: "top-24 left-64",
        },
      ],
    };
  }),
};
