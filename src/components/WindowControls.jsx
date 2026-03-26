import useWindowStore from "@/store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div className="flex gap-2">
      <div
        className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(target);
        }}
      />
      <div className="size-3.5 rounded-full bg-[#ffc030]" />
      <div className="size-3.5 rounded-full bg-[#2acb42]" />
    </div>
  );
};

export default WindowControls;
