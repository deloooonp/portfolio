import WindowControls from "./WindowControls";

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

const WindowHeader = ({ target, title, onClose, className = "", children }) => {
  return (
    <div id="window-header" className={`${HEADER_CLS} ${className}`.trim()}>
      <WindowControls target={target} onClose={onClose} />
      {title && !children && (
        <h2 className="font-bold text-sm text-center flex-1">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default WindowHeader;
