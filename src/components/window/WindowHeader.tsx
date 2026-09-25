import type { ReactNode } from "react";
import type { WindowKey } from "../../types";
import WindowControls from "./WindowControls";

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

interface WindowHeaderProps {
  target: WindowKey;
  title?: string;
  className?: string;
  children?: ReactNode;
}

const WindowHeader = ({ target, title, className = "", children }: WindowHeaderProps) => {
  return (
    <div id="window-header" className={`${HEADER_CLS} ${className}`.trim()}>
      <WindowControls target={target} />
      {title && !children && (
        <h2 className="font-bold text-sm text-center flex-1">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default WindowHeader;