import WindowWrapper from "@/hoc/WindowWrapper";
import { WindowHeader } from "@/components";
import useWindowStore from "@/store/window";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <WindowHeader target="imgfile" title={name} />

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
