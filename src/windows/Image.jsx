import WindowWrapper from "@/hoc/WindowWrapper";
import { WindowControls } from "@/components";
import useWindowStore from "@/store/window";

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header" className={HEADER_CLS}>
        <WindowControls target="imgfile" />
        <h2 className="font-bold text-sm text-center w-full">{name}</h2>
      </div>

      <div className="p-2 bg-gray-200 max-h-[70vh]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-fit object-contain object-center"
          />
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(
  Image,
  "imgfile",
  "w-xl top-40 left-2/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default ImageWindow;
