import { X } from "lucide-react";
import { SOCIALS } from "@/constants";
import ModalWrapper from "@/hoc/ModalWrapper";

const Contact = ({ onClose }) => {
  return (
    <div className="absolute top-0 right-0 h-screen w-80 bg-white shadow-2xl border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 mt-2">
        <h2 className="font-semibold text-gray-800 tracking-tight">
          Notification Center
        </h2>
        <button
          onClick={onClose}
          aria-label="Close contact"
          className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="p-5 overflow-y-auto flex-1 thin-scrollbar">
        <div className="flex flex-col items-center gap-3 mb-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <img
            src="/images/delon.jpg"
            alt="Delon"
            className="w-24 h-24 object-cover rounded-full shadow-md ring-4 ring-white"
          />
          <div className="text-center mt-2">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Let's Connect
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              delonpratama1009@gmail.com
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6 px-1 text-center leading-relaxed">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>

        <h4 className="font-semibold text-gray-800 tracking-tight mb-3 px-1">
          Socials
        </h4>
        <ul className="flex flex-col gap-3">
          {SOCIALS.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-4 p-4"
              >
                <img
                  src={icon}
                  alt={text}
                  className="size-6 drop-shadow-md brightness-0 invert"
                />
                <p className="font-semibold text-white tracking-wide">{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalWrapper(Contact, "contact", {
  animationType: "slide-right",
  hasBlur: false,
});
