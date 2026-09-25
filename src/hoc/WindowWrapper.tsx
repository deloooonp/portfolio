import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";
import type { ComponentType, MouseEvent } from "react";

import useWindowStore from "../store/window";
import useIsMobile from "../hooks/useIsMobile";
import type { WindowKey } from "../types";

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowKey,
  windowClassName = "",
): ComponentType<P> => {
  const Wrapped = (props: P) => {
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);
    const setRef = (node: HTMLElement | null) => {
      ref.current = node;
    };
    const isMobile = useIsMobile();

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMobile) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen, isMobile]);

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

      const instances = Draggable.create(el, {
        trigger: headerEl,
        onPress: () => focusWindow(windowKey),
      });

      return () => instances[0]?.kill();
    }, [isOpen, isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

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
          ref={setRef}
          style={{ zIndex }}
          className="fixed inset-0 flex flex-col justify-end"
          onClick={(e: MouseEvent<HTMLElement>) => {
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

    return (
      <section
        id={windowKey}
        ref={setRef}
        style={{ zIndex }}
        className={`absolute ${windowClassName}`}
        onMouseDownCapture={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper${
    Component.displayName || Component.name || "Component"
  }`;

  return Wrapped;
};

export default WindowWrapper;
