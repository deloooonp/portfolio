import { ABOUT_LOCATION } from "./about";
import { RESUME_LOCATION } from "./resume";
import { TRASH_LOCATION } from "./trash";
import { WORK_LOCATION } from "./work";

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

export const FINDER_SECTIONS = [
  {
    title: "Favorites",
    items: Object.values(locations),
  },
  {
    title: "My Projects",
    items: locations.work.children,
  },
];
