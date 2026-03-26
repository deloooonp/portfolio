import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import { WindowControls } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const HEADER_CLS =
  "flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400";

const Resume = () => {
  return (
    <>
      <div id="window-header" className={HEADER_CLS}>
        <WindowControls target="resume" />
        <h2 className="font-bold text-sm text-center flex-1">Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <Document file="files/resume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(
  Resume,
  "resume",
  "w-fit h-fit top-16 left-7/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden",
);

export default ResumeWindow;
