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

      <div className="p-5 space-y-6 bg-white overflow-y-auto h-full md:max-h-[600px]">
        {image ? (
          <div className="w-full max-h-[400px] overflow-hidden mb-4 rounded-xl">
            <img src={image} alt={name} className="w-full h-auto" />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}

        {Array.isArray(description) &&
          description.map((item, idx) => {
            if (typeof item === "string") {
              return (
                <p
                  key={idx}
                  className="leading-relaxed text-base text-gray-800"
                >
                  {item}
                </p>
              );
            }

            return (
              <div key={idx}>
                <h4 className="font-medium text-gray-900">{item.heading}</h4>
                {item.meta ? (
                  <p className="text-sm text-gray-500 mb-2">{item.meta}</p>
                ) : null}
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            );
          })}
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
