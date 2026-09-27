import WindowWrapper from "@/hoc/WindowWrapper";
import { WindowHeader } from "@/components";
import TerminalWindow from "./components/TerminalWindow";

const Terminal = () => {
  return (
    <>
      <WindowHeader target="terminal" title="Terminal" />
      <TerminalWindow />
    </>
  );
};

const TerminalWindowComponent = WindowWrapper(
  Terminal,
  "terminal",
  "w-2xl h-[480px] top-32 left-1/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden flex flex-col",
);

export default TerminalWindowComponent;
