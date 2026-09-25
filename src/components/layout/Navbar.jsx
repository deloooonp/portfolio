import dayjs from "dayjs";

import { NAV_ICONS as navIcons, NAV_LINKS as navLinks } from "@/constants";
import useWindowStore from "@/store/window";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav className="flex justify-between items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none">
      <div className="flex items-center gap-5">
        <img src="/logo.svg" alt="Logo" />
        <p className="font-bold">deloooonp</p>

        <ul className="flex items-center gap-5 max-sm:hidden">
          {navLinks.map(({ id, name, type }) => (
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
          {navIcons.map(({ id, img }) => (
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
