import type { TerminalEntry } from "@/types/terminal";

interface TerminalOutputProps {
  history: TerminalEntry[];
}

const TerminalOutput = ({ history }: TerminalOutputProps) => {
  if (history.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 font-mono text-sm space-y-3">
      {history.map((entry) => (
        <div key={entry.id}>
          {entry.command && (
            <p className="text-gray-400">
              <span className="text-[#00A154] font-semibold">@delon % </span>
              {entry.command}
            </p>
          )}
          {entry.output && (
            <pre
              className={`mt-1 whitespace-pre-wrap leading-relaxed ${
                entry.isError ? "text-red-500" : "text-gray-700"
              }`}
            >
              {entry.output}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;
