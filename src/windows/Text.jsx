import { WindowHeader } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";
import useWindowStore from "@/store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <WindowHeader target="txtfile" title={name} />

      <div className="p-5 space-y-6 bg-white">
        {image ? (
          <div className="w-full max-h-[400px] overflow-hidden mb-4">
            <img src={image} alt={name} className="w-full h-auto rounded" />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(
  Text,
  "txtfile",
  "w-md top-36 right-32 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default TextWindow;
