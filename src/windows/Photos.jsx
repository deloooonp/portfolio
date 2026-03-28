import { Mail, Search } from "lucide-react";

import WindowWrapper from "@/hoc/WindowWrapper";
import { WindowHeader } from "@/components";
import { GALLERY_IMAGES } from "@/data";
import useWindowStore from "@/store/window";

const Photos = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <WindowHeader target="photos">
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </WindowHeader>

      <div className="flex w-full">
        <div className="p-5">
          <ul className="grid grid-cols-5 gap-2.5 photos-gallery-grid">
            {GALLERY_IMAGES.map(({ id, img }) => (
              <li
                key={id}
                className="cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-102"
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery Image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img
                  src={img}
                  alt={`Gallery image ${id}`}
                  className="size-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(
  Photos,
  "photos",
  "max-w-3xl top-96 left-1/2 -translate-y-1/2 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default PhotosWindow;
