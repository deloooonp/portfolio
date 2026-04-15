import useWindowStore from "@/store/window";

/**
 * macOS traffic-light control icons (shown on group hover).
 * Rendered as inline SVG so no external dependency is needed.
 */
const CloseIcon = () => (
  <svg
    viewBox="0 0 10 10"
    className="size-2 opacity-0 group-hover/controls:opacity-70 transition-opacity"
  >
    <path
      d="M3 3l4 4M7 3l-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MinimizeIcon = () => (
  <svg
    viewBox="0 0 10 10"
    className="size-2 opacity-0 group-hover/controls:opacity-70 transition-opacity"
  >
    <path
      d="M2 5h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MaximizeIcon = ({ isMaximized }) => (
  <svg
    viewBox="0 0 10 10"
    className="size-2 opacity-0 group-hover/controls:opacity-70 transition-opacity"
  >
    {isMaximized ? (
      // Restore: two overlapping squares
      <path
        d="M3 2h5v5M2 4v4h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ) : (
      // Maximise: diagonal arrows
      <path
        d="M2 8l6-6M5 2h3v3M5 8H2V5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )}
  </svg>
);

const WindowControls = ({ target, onClose }) => {
  const { closeWindow, minimizeWindow, toggleMaximize, windows } =
    useWindowStore();
  const isMaximized = windows[target]?.isMaximized ?? false;

  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="group/controls flex gap-2 items-center">
      {/* Red — Close */}
      <button
        type="button"
        aria-label="Close window"
        className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer flex items-center justify-center hover:brightness-90 transition-all"
        onClick={stop(() => {
          if (onClose) return onClose();
          closeWindow(target);
        })}
      >
        <CloseIcon />
      </button>

      {/* Yellow — Minimize */}
      <button
        type="button"
        aria-label="Minimize window"
        className="size-3.5 rounded-full bg-[#ffc030] cursor-pointer flex items-center justify-center hover:brightness-90 transition-all"
        onClick={stop(() => minimizeWindow(target))}
      >
        <MinimizeIcon />
      </button>

      {/* Green — Maximize / Restore */}
      <button
        type="button"
        aria-label={isMaximized ? "Restore window" : "Maximize window"}
        className="size-3.5 rounded-full bg-[#2acb42] cursor-pointer flex items-center justify-center hover:brightness-90 transition-all"
        onClick={stop(() => toggleMaximize(target))}
      >
        <MaximizeIcon isMaximized={isMaximized} />
      </button>
    </div>
  );
};

export default WindowControls;
