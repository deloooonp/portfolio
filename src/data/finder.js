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

export const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/delon.jpg",
    },
    {
      id: 2,
      name: "christmas-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/delon5.jpeg",
    },
    {
      id: 3,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-45 right-24",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/delon4.jpg",
      description: [
        "Hi, I’m Delon — a web developer focused on building interfaces that are clean, responsive, and actually usable.",
        "I work mainly with JavaScript, React, and Next.js, turning designs into fast, functional experiences without unnecessary fluff.",
        "I care about solid UI, thoughtful UX, and code that’s readable enough to survive future me.",
        "When I’m not coding, I’m usually refining layouts, overthinking small details, or convincing myself that one more tech purchase is justified.",
      ],
    },
  ],
};

export const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

export const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};
