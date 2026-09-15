import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
<<<<<<< HEAD:src/apps/Resume.jsx
    <>
      <WindowHeader target="resume" title="Resume.pdf">
        <a
          target="_blank"
          href="files/resume.pdf"
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </WindowHeader>
      <div ref={containerRef} className="w-full overflow-auto">
        <Document file="files/resume.pdf">
          <Page
            className="mx-auto"
            pageNumber={1}
            width={pageWidth ?? undefined}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </>
=======
    <Document file="files/resume.pdf">
      <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
    </Document>
>>>>>>> origin/main:src/windows/Resume.jsx
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
