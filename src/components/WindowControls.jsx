import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls">
      <div
        className="close"
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(target);
        }}
      />
      <div className="minimize"></div>
      <div className="maximize"></div>
    </div>
  );
};

export default WindowControls;
