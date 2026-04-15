import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import WindowWrapper from "@/hoc/WindowWrapper";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <Document file="files/resume.pdf">
      <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
    </Document>
  );
};

Resume.Header = () => (
  <a
    href="files/resume.pdf"
    download
    className="cursor-pointer"
    title="Download Resume"
  >
    <Download className="icon" />
  </a>
);

const ResumeWindow = WindowWrapper(Resume, "resume", {
  title: "Resume.pdf",
  className:
    "w-fit h-fit top-16 left-7/12 bg-white shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden flex flex-col",
});

export default ResumeWindow;
