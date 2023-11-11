/** @format */

import { TStack } from "./types";
import { allModalsArr, allModalsObj } from "./globals";

function onClick(event: any) {
  let id: string;
  let qElement: HTMLElement;
  let meta: HTMLElement;
  let stack: TStack | null = allModalsArr[allModalsArr.length - 1] ?? null;
  let target = event.target as any;

  if (!target.querySelector) return;
  if (stack && !document.querySelector(`[data-modal-id='${stack.id}']`)) {
    allModalsArr.pop();
    stack = null;
  }

  if (stack) {
    if (target.closest("[data-close-modal]")) {
      return stack?.on({ name: "close" });
    }

    if (!target.closest(".modal")) {
      return stack?.on({ name: "clickout" });
    }
  }

  qElement = target.closest("[data-open-modal]");

  if (qElement) {
    id = qElement.getAttribute("data-open-modal")!;
    stack = allModalsObj[id];

    if (!stack) {
      meta = qElement.querySelector("meta")!;
      id = meta?.getAttribute("itemprop")!;
      stack = allModalsObj[id];
    }

    stack?.on({ name: event.button == 2 ? "context" : "open", data: { $el: qElement, nativeEvent: event } });
  }
}
window.addEventListener("contextmenu", (event) => {
  let target: any = event.target;

  if (target?.closest("[data-open-modal]")) {
    event.preventDefault();
  }
});
document.addEventListener("mousedown", (event) => {
  if (event.button == 2) {
    event.preventDefault();
    setTimeout(() => {
      onClick(event);
    }, 100);
  }
});
document.addEventListener("keydown", (event) => {
  let element: HTMLElement | null | undefined;
  let stack: TStack;

  if (event.key == "Escape") {
    stack = allModalsArr[allModalsArr.length - 1];
    element = document.activeElement?.closest(".modal");
    stack?.on({ name: "escape", data: !!element });
  }
});
document.addEventListener("click", onClick);

export * from "./openModal";
export * from "./UIModal";
export * from "./UIDynamicModal";
export * from "./types";

