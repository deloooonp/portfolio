import { useState } from "react";
import type { TerminalCommand } from "@/types/terminal";

interface CommandPaletteProps {
  commands: TerminalCommand[];
  onExecute: (command: string) => void;
}

const CommandPalette = ({ commands, onExecute }: CommandPaletteProps) => {
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? commands.filter(
        (c) =>
          c.name.includes(filter.toLowerCase()) ||
          c.description.toLowerCase().includes(filter.toLowerCase()),
      )
    : commands;

  return (
    <div className="flex flex-col border-t border-gray-100">
      <div className="px-4 py-2 border-b border-gray-100">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered.length === 1) {
              onExecute(filtered[0].name);
              setFilter("");
            }
            if (e.key === "Escape") setFilter("");
          }}
          placeholder="Type a command or search…"
          aria-label="Search commands"
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-mono"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <ul role="list" className="divide-y divide-gray-50 max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <li className="px-4 py-3 text-sm text-gray-400 font-mono">
            No commands match &ldquo;{filter}&rdquo;
          </li>
        ) : (
          filtered.map((cmd) => (
            <li key={cmd.name}>
              <button
                type="button"
                onClick={() => {
                  onExecute(cmd.name);
                  setFilter("");
                }}
                className="w-full flex items-baseline gap-4 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors group"
              >
                <span className="font-mono text-sm font-semibold text-[#00A154] w-24 shrink-0 group-hover:text-green-700">
                  {cmd.name}
                </span>
                <span className="text-sm text-gray-500 truncate">
                  {cmd.description}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommandPalette;
