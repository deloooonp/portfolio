import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import useWindowStore from "@/store/window";

const ModalWrapper = (Component, windowKey, options = {}) => {
  const { animationType = "fade-scale", hasBlur = true } = options;

  const Wrapped = (props) => {
    const { windows, closeWindow } = useWindowStore();
    const {
      isOpen,
      data,
      isClosing: isStoreClosing,
    } = windows[windowKey] || {};
    const ref = useRef(null);
    const isClosing = useRef(false);

    const handleClose = () => {
      if (isClosing.current || !isOpen) return;

      const el = ref.current;
      if (!el) {
        closeWindow(windowKey);
        return;
      }

      isClosing.current = true;
      const animation =
        animationType === "slide-right"
          ? { x: "100%", opacity: 0 }
          : { scale: 0.95, opacity: 0 };

      gsap.to(el, {
        ...animation,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          isClosing.current = false;
          closeWindow(windowKey);
        },
      });
    };

    useLayoutEffect(() => {
      if (isStoreClosing && !isClosing.current) {
        handleClose();
      }
    }, [isStoreClosing, handleClose]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen && !isClosing.current) {
        // Reset and animate in
        gsap.fromTo(
          el,
          {
            scale: animationType === "fade-scale" ? 0.95 : 1,
            x: animationType === "slide-right" ? "100%" : 0,
            opacity: 0,
          },
          {
            scale: 1,
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
        );
      } else if (!isOpen && !isClosing.current && el.style.opacity !== "0") {
        handleClose();
      }
    }, [isOpen]);

    useLayoutEffect(() => {
      if (ref.current && !isClosing.current) {
        ref.current.style.display = isOpen ? "flex" : "none";
      }
    }, [isOpen]);

    if (!isOpen && !isClosing.current) return null;

    return (
      <div
        ref={ref}
        style={{ display: "none" }}
        className={clsx(
          "fixed inset-0 z-9999 flex items-center justify-center",
          hasBlur ? "backdrop-blur-xl bg-black/40" : "bg-transparent",
        )}
        onClick={(e) => {
          if (e.target === ref.current) handleClose();
        }}
      >
        <Component {...props} data={data} onClose={handleClose} />
      </div>
    );
  };

  Wrapped.displayName = `ModalWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default ModalWrapper;
