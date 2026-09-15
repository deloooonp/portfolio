import { PROJECTS, PROJECT_TYPES } from "./projects";

export const SAFARI_SECTIONS = [
  {
    title: "Favorites",
    items: PROJECTS.slice(0, 2).map((project) => ({
      id: `fav-${project.id}`,
      name: project.name,
      icon: "/images/star.png",
      tag: null,
      project,
    })),
  },
  {
    title: "Locations",
    items: [
      {
        id: "all-projects",
        name: "All Projects",
        icon: "/images/folder.png",
        tag: null,
      },
    ],
  },
  {
    title: "Type",
    items: PROJECT_TYPES.map((tag) => ({
      id: tag,
      name: tag,
      icon: `/icons/tag-${tag.toLowerCase()}.svg`,
      tag: tag,
    })),
  },
];
