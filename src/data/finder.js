import { PROJECTS } from "./projects";

export const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: PROJECTS.map((project) => {
    const slug =
      project.name
        .split(" ")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") || `project${project.id}`;

    return {
      id: project.id + 4,
      name: project.name,
      icon: "/system/folder.png",
      kind: "folder",
      desktopPosition: project.desktopPosition,
      children: [
        {
          id: 1,
          name: `${slug}.txt`,
          icon: "/system/txt.png",
          kind: "file",
          fileType: "txt",
          description: project.description,
        },
        {
          id: 2,
          name: `${slug}.com`,
          icon: "/apps/safari.png",
          kind: "file",
          fileType: "url",
          href: project.liveUrl,
        },
        {
          id: 4,
          name: `${slug}.png`,
          icon: "/system/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: project.thumbnail,
        },
        {
          id: 5,
          name: "README.md",
          icon: "/system/plain.png",
          kind: "file",
          fileType: "url",
          href: project.githubUrl,
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
      icon: "/system/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: "/content/delon.jpg",
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: "/system/txt.png",
      kind: "file",
      fileType: "txt",
      subtitle: "Meet the Developer Behind the Code",
      image: "/content/delon4.jpg",
      description: [
        "Hi, I’m Delon — a web developer focused on building interfaces that are clean, responsive, and actually usable.",
        "I work mainly with JavaScript, React, and Next.js, turning designs into fast, functional experiences without unnecessary fluff.",
        "I care about solid UI, thoughtful UX, and code that’s readable enough to survive future me.",
        "When I’m not coding, I’m usually refining layouts, overthinking small details, or convincing myself that one more tech purchase is justified.",
      ],
    },
    {
      id: 3,
      name: "experience.txt",
      icon: "/system/txt.png",
      kind: "file",
      fileType: "txt",
      subtitle: "Work Experience",
      description: [
        {
          heading:
            "Social Economic Accelerator Lab — Frontend Developer Intern",
          meta: "Malang, East Java, Indonesia (Remote) | Mar 2026 – Jul 2026",
          bullets: [
            "Worked on the Knowledge Hub feature, translating UI/UX designs into responsive interfaces and integrating REST APIs with the backend team.",
            "Built CRUD functionality for posts and comments, image and PDF upload features, and like/unlike interactions.",
            "Handled bug fixes and UI improvements to keep the codebase clean and consistent.",
          ],
        },
        {
          heading: "iPhone 15 Pro — Website Clone (Personal Project)",
          meta: "Frontend Developer | May 2025",
          bullets: [
            "Built a fully responsive iPhone 15 Pro webpage replica with a 3D model, real-time lighting, and scroll-based animations powered by Three.js and GSAP.",
            "Reached 500+ demo views in the first month and ran smoothly across 90%+ of modern browsers.",
          ],
        },
        {
          heading: "Ecovest — Waste Bank Website (2nd Place Winner)",
          meta: "Sole Frontend Developer | Nov 2025 – Dec 2025",
          bullets: [
            "Delivered 100% of the UI across 10+ responsive pages, from company profile to admin dashboard, using Next.js and React.",
            "Built 20+ reusable components with a mobile-first approach, working alongside a UI/UX designer and content researcher.",
            "Deployed and maintained on Vercel for live demo and competition judging.",
          ],
        },
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
      icon: "/system/pdf.png",
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
    // {
    //   id: 1,
    //   name: "trash1.png",
    //   icon: "/system/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   imageUrl: "/content/trash-1.png",
    // },
    // {
    //   id: 2,
    //   name: "trash2.png",
    //   icon: "/system/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   imageUrl: "/content/trash-2.png",
    // },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};
