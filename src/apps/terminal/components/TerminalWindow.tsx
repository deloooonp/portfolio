import { useState, useRef, useCallback, useEffect } from "react";
import { COMMANDS, executeCommand } from "../lib/commands";
import TerminalOutput from "./TerminalOutput";
import CommandPalette from "./CommandPalette";
import type { TerminalEntry } from "@/types/terminal";
import useIsMobile from "@/hooks/useIsMobile";

const TerminalWindow = () => {
  const isMobile = useIsMobile();
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Show welcome message once on mount
  useEffect(() => {
    if (!initialized.current) {
      const cmds = COMMANDS.map((c) =>
        isMobile
          ? `${c.name}\n  ${c.description}`
          : `  ${c.name.padEnd(12)} — ${c.description}`,
      ).join("\n");
      const welcome = `Welcome to the portfolio terminal.\n\nAvailable commands:\n${cmds}\n\nType a command or click one to get started.`;

      setHistory([
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          command: "",
          output: welcome,
          isError: false,
          timestamp: Date.now(),
        },
      ]);
      initialized.current = true;
    }
  }, [isMobile]);

  // Auto-scroll on new output
  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const handleExecute = useCallback(
    (command: string) => {
      if (!command.trim()) return;

      if (command === "/clear") {
        setHistory([]);
        initialized.current = false;
        return;
      }

      const { output, isError } = executeCommand(command, isMobile);
      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          command,
          output,
          isError,
          timestamp: Date.now(),
        },
      ]);
    },
    [isMobile],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setHistory([]);
        initialized.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto">
        <TerminalOutput history={history} />
      </div>

      {/* Command palette — all screen sizes */}
      <CommandPalette commands={COMMANDS} onExecute={handleExecute} />
    </div>
  );
};

export default TerminalWindow;
