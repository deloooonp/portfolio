import { WindowControls } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";
import useWindowStore from "@/store/window";

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header" className={HEADER_CLS}>
        <WindowControls target="txtfile" />
        <h2 className="font-bold text-sm text-center w-full">{name}</h2>
      </div>

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
