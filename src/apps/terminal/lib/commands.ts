import { TECH_STACK } from "@/data";
import type { TerminalCommand } from "@/types/terminal";

/** All available terminal commands. */
export const COMMANDS: TerminalCommand[] = [
  {
    name: "/skills",
    description: "Show technical skills and technologies",
    category: "portfolio",
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
  // {
  //   name: "/theme",
  //   description: "Toggle dark/light theme",
  //   category: "system",
  //   usage: "/theme",
  // },
  {
    name: "/credits",
    description: "Show portfolio credits",
    category: "portfolio",
    usage: "/credits",
  },
];

const formatCommands = (isMobile: boolean) =>
  COMMANDS.map((command) =>
    isMobile
      ? `${command.name}\n  ${command.description}`
      : `${command.name.padEnd(12)} — ${command.description}`,
  ).join("\n");

const formatTechStack = (isMobile: boolean) => {
  const stacks = TECH_STACK.map(({ category, items }) =>
    isMobile
      ? `✓ ${category}\n  ${items.join(", ")}`
      : `✓ ${category.padEnd(12)} ${items.join(", ")}`,
  ).join("\n");

  return [
    "Tech Stack",
    "",
    isMobile ? "Category\n  Technologies" : "Category      Technologies",
    "────────────────────────────────────────",
    stacks,
    "",
    `✓ ${TECH_STACK.length} of ${TECH_STACK.length} stacks loaded successfully (100%)`,
  ].join("\n");
};

/** Execute a command and return its output string. */
export function executeCommand(
  input: string,
  isMobile: boolean,
): {
  output: string;
  isError: boolean;
} {
  const cmd = input.trim();

  switch (cmd) {
    case "/skills":
      return { output: formatTechStack(isMobile), isError: false };

    case "/help":
    case "/h":
      return { output: formatCommands(isMobile), isError: false };

    case "/clear":
      // Handled in component — signals store.clearHistory()
      return { output: "", isError: false };

    // case "/theme":
    //   return { output: "Theme toggled.", isError: false };

    case "/credits":
      return {
        output: [
          "Portfolio Credits",
          "─────────────────",
          "Powered by:",
          "  • React",
          "  • TypeScript",
          "  • GSAP",
          "  • Zustand",
        ].join("\n"),
        isError: false,
      };

    default:
      return {
        output: `Unknown command: ${cmd}. Run /commands to see all commands.`,
        isError: true,
      };
  }
}
