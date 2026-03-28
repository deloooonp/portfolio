import { Check, Flag } from "lucide-react";

import { WindowHeader } from "@/components";
import { TECH_STACK } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";

const Terminal = () => {
  return (
    <>
      <WindowHeader target="terminal" title="Tech Stack" />

      <div className="text-sm font-roboto p-5">
        <p>
          <span className="font-bold">@delon % </span>
          show tech stack
        </p>
        <div className="flex items-center ms-10 mt-7">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="py-5 my-5 border-y border-dashed space-y-1">
          {TECH_STACK.map(({ category, items }) => (
            <li key={category} className="flex">
              <Check className="text-[#00A154] w-5" size={20} />
              <h3 className="font-semibold text-[#00A154] w-32 ms-5">
                {category}
              </h3>
              <ul className="flex items-center gap-3">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}{" "}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="text-[#00A154] space-y-1">
          <p className="flex items-center">
            <Check size={20} className="w-5 me-5" /> {TECH_STACK.length} of{" "}
            {TECH_STACK.length} stacks loaded successfully (100%)
          </p>
          <p className="flex items-center text-black">
            <Flag size={15} fill="black" className="w-5 me-5" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(
  Terminal,
  "terminal",
  "w-xl top-32 left-1/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default TerminalWindow;
