import type { TerminalCommand } from "@/types/terminal";

/** All available terminal commands. */
export const COMMANDS: TerminalCommand[] = [
  {
    name: "/skills",
    description: "List all available commands",
    category: "tools",
    usage: "/skills",
  },
  {
    name: "/help",
    description: "Show usage for a specific command",
    category: "system",
    aliases: ["/h"],
    usage: "/help [command]",
  },
  {
    name: "/clear",
    description: "Clear the terminal history",
    category: "system",
    usage: "/clear",
  },
  {
    name: "/theme",
    description: "Toggle dark/light theme",
    category: "system",
    usage: "/theme",
  },
  {
    name: "/credits",
    description: "Show portfolio credits",
    category: "portfolio",
    usage: "/credits",
  },
];

const commandMap = new Map(COMMANDS.map((c) => [c.name, c]));

/** Execute a command and return its output string. */
export function executeCommand(input: string): { output: string; isError: boolean } {
  const [cmd, ...args] = input.trim().split(/\s+/);

  switch (cmd) {
    case "/skills":
      return {
        output: COMMANDS.map(
          (c) => `${c.name.padEnd(12)} — ${c.description}`
        ).join("\n"),
        isError: false,
      };

    case "/help":
    case "/h": {
      if (!args.length) {
        return {
          output: "Usage: /help [command]\nExample: /help /skills",
          isError: false,
        };
      }
      const target = commandMap.get(args[0]);
      if (!target) {
        return {
          output: `Command not found: ${args[0]}. Run /skills to see all commands.`,
          isError: true,
        };
      }
      return {
        output: [
          `${target.name}`,
          `  ${target.description}`,
          target.usage ? `  Usage: ${target.usage}` : "",
          target.aliases ? `  Aliases: ${target.aliases.join(", ")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        isError: false,
      };
    }

    case "/clear":
      // Handled in component — signals store.clearHistory()
      return { output: "", isError: false };

    case "/theme":
      // Handled in component — toggles theme
      return { output: "Theme toggled.", isError: false };

    case "/credits":
      return {
        output: "Built by deloooonp\nPowered by React, TypeScript, GSAP, Zustand",
        isError: false,
      };

    default:
      return {
        output: `Unknown command: ${cmd}. Run /skills to see all commands.`,
        isError: true,
      };
  }
}
