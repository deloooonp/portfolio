import { useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import useTerminalStore from "@/store/terminal";
import { COMMANDS, executeCommand } from "../lib/commands";
import TerminalOutput from "./TerminalOutput";
import CommandPalette from "./CommandPalette";
import CommandButtons from "./CommandButtons";

const WELCOME = `Welcome to the portfolio terminal.
Type a command below or click one to get started.`;

const TerminalWindow = () => {
  const isMobile = useIsMobile();
  const { history, addEntry, clearHistory } = useTerminalStore();
  const outputRef = useRef<HTMLDivElement>(null);

  // Show welcome message once on mount
  useEffect(() => {
    if (history.length === 0) {
      addEntry("", WELCOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll on new output
  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const handleExecute = (command: string) => {
    if (command === "/clear") {
      clearHistory();
      return;
    }
    const { output, isError } = executeCommand(command);
    addEntry(command, output, isError);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto">
        <TerminalOutput history={history} />
      </div>

      {/* Command controls — platform-specific */}
      {isMobile ? (
        <CommandButtons commands={COMMANDS} onExecute={handleExecute} />
      ) : (
        <CommandPalette commands={COMMANDS} onExecute={handleExecute} />
      )}
    </div>
  );
};

export default TerminalWindow;
