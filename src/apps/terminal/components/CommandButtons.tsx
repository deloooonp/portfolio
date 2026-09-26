import type { TerminalCommand } from "@/types/terminal";

interface CommandButtonsProps {
  commands: TerminalCommand[];
  onExecute: (command: string) => void;
}

const CATEGORY_LABEL: Record<TerminalCommand["category"], string> = {
  system: "System",
  portfolio: "Portfolio",
  tools: "Tools",
};

const CommandButtons = ({ commands, onExecute }: CommandButtonsProps) => {
  const grouped = commands.reduce<Record<string, TerminalCommand[]>>(
    (acc, cmd) => {
      const key = cmd.category;
      (acc[key] ??= []).push(cmd);
      return acc;
    },
    {},
  );

  return (
    <div className="border-t border-gray-100 px-4 py-4 space-y-4">
      {(Object.keys(grouped) as TerminalCommand["category"][]).map((cat) => (
        <div key={cat}>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-mono">
            {CATEGORY_LABEL[cat]}
          </p>
          <div className="flex flex-wrap gap-2">
            {grouped[cat].map((cmd) => (
              <button
                key={cmd.name}
                type="button"
                onClick={() => onExecute(cmd.name)}
                aria-label={`Run ${cmd.name}: ${cmd.description}`}
                className="min-h-[44px] px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-left transition-colors"
              >
                <span className="block font-mono text-xs font-semibold text-[#00A154]">
                  {cmd.name}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5 leading-tight">
                  {cmd.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandButtons;
