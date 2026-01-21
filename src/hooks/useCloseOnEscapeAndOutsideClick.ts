import { useEffect, useRef } from "react";

export function useCloseOnEscapeAndOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null);

  useEffect(
    function () {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") handler();
      }

      function handleClickOutside(e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) handler();
      }

      document.addEventListener("keydown", handleKeyDown, listenCapturing);
      document.addEventListener(
        "mousedown",
        handleClickOutside,
        listenCapturing
      );

      return () => {
        document.removeEventListener("keydown", handleKeyDown, listenCapturing);
        document.removeEventListener(
          "mousedown",
          handleClickOutside,
          listenCapturing
        );
      };
    },
    [handler]
  );

  return ref;
}
