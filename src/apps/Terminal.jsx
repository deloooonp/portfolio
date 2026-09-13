import { Check, Flag } from "lucide-react";

import { WindowHeader } from "@/components";
import { TECH_STACK } from "@/data";
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
        <div className="hidden sm:flex items-center ms-10 mt-7">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="py-5 my-5 border-y border-dashed space-y-3 sm:space-y-1">
          {TECH_STACK.map(({ category, items }) => (
            <li
              key={category}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <div className="flex items-center">
                <Check className="text-[#00A154] w-5 shrink-0" size={20} />
                <h3 className="font-semibold text-[#00A154] w-32 ms-2 sm:ms-5 shrink-0">
                  {category}
                </h3>
              </div>
              <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1 ms-7 sm:ms-0 mt-1 sm:mt-0 text-gray-700 sm:text-black">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="text-[#00A154] space-y-1">
          <p className="flex items-center">
            <Check size={20} className="w-5 me-5 shrink-0" />{" "}
            {TECH_STACK.length} of {TECH_STACK.length} stacks loaded
            successfully (100%)
          </p>
          <p className="flex items-center text-black">
            <Flag size={15} fill="black" className="w-5 me-5 shrink-0" />
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
