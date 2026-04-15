import { X } from "lucide-react";
import ModalWrapper from "@/hoc/ModalWrapper";

const TextOverlay = ({ data, onClose }) => {
  if (!data) return null;
  const { name, image, subtitle, description } = data;

  return (
    <div className="relative w-full max-w-2xl bg-white shadow-2xl drop-shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] mx-4">
      <div className="flex items-center p-4 border-b border-gray-100 bg-gray-50/80 backdrop-blur-md sticky top-0 z-10">
        <h2 className="font-semibold text-gray-800 tracking-tight text-sm text-center flex-1 ml-5">
          {name}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close text overlay"
          className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="p-8 overflow-y-auto thin-scrollbar flex-1">
        {image && (
          <div className="w-full max-h-[400px] overflow-hidden mb-6 rounded-xl shadow-sm">
            <img
              src={image}
              alt={name}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {subtitle && (
          <h3 className="text-xl font-bold text-gray-900 mb-4">{subtitle}</h3>
        )}

        {Array.isArray(description) && description.length > 0 && (
          <div className="space-y-4 leading-relaxed text-[15px] text-gray-600">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalWrapper(TextOverlay, "txtfile");
