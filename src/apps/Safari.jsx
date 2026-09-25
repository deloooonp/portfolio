import { WindowHeader } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";

const Safari = () => {
  return (
    <>
      <WindowHeader target="safari">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-2/3 max-w-md bg-gray-100/80 border border-gray-200/50 rounded-lg px-3 py-1.5 text-xs text-gray-400 text-center select-none shadow-inner">
            Search or enter website name
          </div>
        </div>
      </WindowHeader>

      <div className="flex flex-1 items-center justify-center bg-white text-gray-400 select-none min-h-[480px]">
        <div className="text-center">
          <p className="text-base font-medium text-gray-600 mb-1">Safari</p>
          <p className="text-xs text-gray-400">Empty Window</p>
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(
  Safari,
  "safari",
  "w-4xl max-w-[90vw] h-[560px] top-28 left-2/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden flex flex-col",
);

export default SafariWindow;
