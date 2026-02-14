import { useEffect, useRef } from "react";

// export function useCloseOnEscapeAndOutsideClick(
//   handler: () => void,
//   listenCapturing: boolean = true
// ) {
//   const ref = useRef<HTMLDivElement | HTMLUListElement>(null);

//   useEffect(
//     function () {
//       console.log("Hook setup for handler");

//       function handleKeyDown(e: KeyboardEvent) {
//         console.log("KeyDown:", e.key);
//         if (e.key === "Escape") {
//           console.log("KeyDown:", e.key);
//           handler();
//         }
//       }

//       function handleClickOutside(e: Event) {
//         console.log("Click outside check:", {
//           target: e.target,
//           currentRef: ref.current,
//           contains: ref.current?.contains(e.target as Node),
//         });

//         if (ref.current && !ref.current.contains(e.target as Node)) handler();
//       }

//       document.addEventListener("keydown", handleKeyDown, listenCapturing);
//       document.addEventListener(
//         "mousedown",
//         handleClickOutside,
//         listenCapturing
//       );

//       return () => {
//         console.log("Hook cleanup");
//         document.removeEventListener("keydown", handleKeyDown, listenCapturing);
//         document.removeEventListener(
//           "mousedown",
//           handleClickOutside,
//           listenCapturing
//         );
//       };
//     },
//     [handler]
//   );

//   return ref;
// }

export function useCloseOnEscapeAndOutsideClick(
  handler: () => void,
  isOpen: boolean // добавили параметр
) {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return; // не добавляем обработчики, если меню закрыто

    console.log("Adding event listeners");

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        console.log("Escape - closing");
        handler();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      // Проверяем, не является ли цель кнопкой-переключателем
      const isToggleButton = (target as HTMLElement).closest?.("button");

      console.log("Click outside check:", {
        isToggleButton: !!isToggleButton,
        contains: ref.current?.contains(target),
      });

      // Если клик на кнопке - игнорируем
      if (isToggleButton) {
        console.log("Click on button - ignoring");
        return;
      }

      // Если клик вне списка - закрываем
      if (ref.current && !ref.current.contains(target)) {
        console.log("Click outside list - closing");
        handler();
      }
    }

    // Используем capturing phase для outside click
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      console.log("Removing event listeners");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handler, isOpen]); // добавляем isOpen в зависимости

  return ref;
}
