import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

import { WindowHeader } from "@/components";
import useWindowStore from "@/store/window";
import useIsMobile from "@/hooks/useIsMobile";

const WindowWrapper = (Component, windowKey, options = {}) => {
  const { title, className: windowClassName = "" } =
    typeof options === "string" ? { className: options } : options;

  const Wrapped = (props) => {
<<<<<<< HEAD
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const isMobile = useIsMobile();
=======
    const { focusWindow, windows, closeWindow } = useWindowStore();
    const {
      isOpen,
      isMinimized,
      isMaximized,
      isClosing: isStoreClosing,
      zIndex,
    } = windows[windowKey];
    const ref = useRef(null);
    const naturalRect = useRef(null);

    const isClosing = useRef(false);

    useLayoutEffect(() => {
      if (isStoreClosing && !isClosing.current) {
        handleClose();
      }
    }, [isStoreClosing]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen && !isMinimized && !isClosing.current) {
        el.style.display = "flex";
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      } else if (!isOpen && isClosing.current) {
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
            isClosing.current = false;
          },
        });
      }
    }, [isOpen]);
>>>>>>> origin/main

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMobile) return;

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.1,
          opacity: 0,
          y: window.innerHeight,
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else {
        el.style.display = "flex";
        gsap.fromTo(
          el,
          { scale: 0.1, opacity: 0, y: window.innerHeight },
          {
            scale: 1,
            opacity: 1,
            y: isMaximized ? -el.offsetTop : 0,
            duration: 0.4,
            ease: "power3.out",
          },
        );
      }
    }, [isMinimized]);

<<<<<<< HEAD
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen, isMobile]);
=======
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMaximized) {
        const rect = el.getBoundingClientRect();
        naturalRect.current = {
          width: rect.width,
          height: rect.height,
          x: el.offsetLeft,
          y: el.offsetTop,
        };

        gsap.to(el, {
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          x: 0,
          y: 0,
          borderRadius: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else if (naturalRect.current) {
        const { width, height, x, y } = naturalRect.current;
        gsap.to(el, {
          width,
          height,
          x: 0,
          y: 0,
          left: x,
          top: y,
          borderRadius: "",
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            el.style.transform = "";
          },
        });
      }
    }, [isMaximized]);
>>>>>>> origin/main

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || !isMobile) return;

      el.style.display = "flex";

      gsap.fromTo(
        el.querySelector(".mobile-sheet"),
        { y: "100%" },
        { y: "0%", duration: 0.38, ease: "power3.out" },
      );
    }, [isOpen, isMobile]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMobile) return;

      const headerEl = el.querySelector("#window-header");
      if (!headerEl) return;

      let instance = Draggable.get(el);
      if (!instance) {
        [instance] = Draggable.create(el, {
          trigger: headerEl,
          onPress: () => focusWindow(windowKey),
          bounds: "body",
        });
      }

<<<<<<< HEAD
      return () => instance.kill();
    }, [isOpen, isMobile]);
=======
      if (isMaximized) {
        instance.disable();
      } else {
        instance.enable();
      }
    }, [isOpen, isMaximized]);

    const handleClose = () => {
      isClosing.current = true;
      const el = ref.current;
      if (!el) return;

      gsap.to(el, {
        scale: 0.8,
        opacity: 0,
        y: 40,
        duration: 0.25,
        ease: "power3.in",
        onComplete: () => {
          el.style.display = "none";
          isClosing.current = false;
          if (isMaximized && naturalRect.current) {
            gsap.set(el, {
              width: naturalRect.current.width,
              height: naturalRect.current.height,
              x: 0,
              y: 0,
              left: naturalRect.current.x,
              top: naturalRect.current.y,
              borderRadius: "",
            });
            el.style.transform = "";
          }
          closeWindow(windowKey);
        },
      });
    };
>>>>>>> origin/main

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
<<<<<<< HEAD

      if (isMobile) {
        el.style.display = isOpen ? "flex" : "none";
      } else {
        el.style.display = isOpen ? "block" : "none";
      }
    }, [isOpen, isMobile]);

    if (isMobile) {
      return (
        <div
          id={windowKey}
          ref={ref}
          style={{ zIndex }}
          className="fixed inset-0 flex flex-col justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeWindow(windowKey);
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="mobile-sheet relative w-full bg-white  shadow-2xl overflow-hidden h-dvh rounded-none flex flex-col">
            <div className="flex justify-center shrink-0"></div>
            <div className="overflow-y-auto flex-1">
              <Component {...props} />
            </div>
          </div>
        </div>
      );
    }
=======
      if (!isMinimized && !isClosing.current) {
        el.style.display = isOpen ? "flex" : "none";
      }
    }, [isOpen, isMinimized]);
>>>>>>> origin/main

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute flex-col ${windowClassName}`}
        onMouseDownCapture={() => focusWindow(windowKey)}
      >
        <WindowHeader target={windowKey} title={title} onClose={handleClose}>
          {Component.Header && <Component.Header {...props} />}
        </WindowHeader>
        <Component {...props} onClose={handleClose} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper${
    Component.displayName || Component.name || "Component"
  }`;

  return Wrapped;
};

export default WindowWrapper;
