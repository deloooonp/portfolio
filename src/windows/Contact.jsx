import { WindowControls } from "@/components";
import { SOCIALS } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

const Contact = () => {
  return (
    <>
      <div id="window-header" className={HEADER_CLS}>
        <WindowControls target="contact" />
        <h2 className="font-bold text-sm text-center w-full">Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/delon.jpg"
          alt="Delon"
          className="w-20 h-20 object-cover rounded-full"
        />
        <h3 className="text-xl font-semibold">Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>delonpratama1009@gmail.com</p>

        <ul className="flex items-center gap-3">
          {SOCIALS.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="space-y-5"
              >
                <img src={icon} alt={text} className="size-5" />
                <p className="font-semibold text-sm text-white">{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(
  Contact,
  "contact",
  "max-w-2xl top-60 left-5/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default ContactWindow;
