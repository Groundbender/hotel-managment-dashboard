import { useEffect, useRef } from "react";

export const useClickOutside = (closeCallback, listenCapturing = true) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeCallback();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [closeCallback]);

  return modalRef;
};
