import { X } from "lucide-react";
import ModalWrapper from "@/hoc/ModalWrapper";

const ImageOverlay = ({ data, onClose }) => {
  if (!data) return null;
  const { name, imageUrl } = data;

  return (
    <div className="relative flex items-center justify-center p-8 md:p-16 max-w-full max-h-full">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer z-50 group border border-white/20"
      >
        <X size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl drop-shadow-2xl ring-1 ring-white/10"
        />
      )}
    </div>
  );
};

export default ModalWrapper(ImageOverlay, "imgfile");
