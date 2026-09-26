import dayjs from "dayjs";
import type { WindowKey } from "../../types";
import useWindowStore from "../../store/window";

interface NavLink {
  id: number;
  name: string;
  type: WindowKey;
}

interface NavIcon {
  id: number;
  img: string;
}

const NAV_LINKS: NavLink[] = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const NAV_ICONS: NavIcon[] = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav className="flex justify-between items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none">
      <div className="flex items-center gap-5">
        <img src="/logo.svg" alt="Logo" />
        <p className="font-bold">deloooonp</p>

        <ul className="flex items-center gap-5 max-sm:hidden">
          {NAV_LINKS.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p className="text-sm cursor-pointer hover:underline transition-all">
                {name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-5 max-sm:hidden">
          {NAV_ICONS.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time className="text-sm font-medium text-black">
          <span className="max-sm:hidden">
            {dayjs().format("ddd MMM D h:mm A")}
          </span>
          <span className="sm:hidden">{dayjs().format("ddd h:mm A")}</span>
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
