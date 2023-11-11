import { BrowserRouter } from "react-router-dom";
import { createRoot as createRootReactDom } from "react-dom/client";

import { TOpenModalOptions } from "./types";
import { UIDynamicModal } from "./UIDynamicModal";

export function openModal(Component: any, options?: TOpenModalOptions, ComponentProps?: Record<string, any>) {
  let onData: Function | null;
  let onClose: Function;
  let cancel: Function;
  let mounter = createRoot();
  let {
    position,
    autoPosition,
    backdrop,
    params,
    className = "",
    transitionShow,
    transitionHide,
    transition,
    persistent,
    onCloseButton
  } = options || {};

  transitionShow = transition || transitionShow;
  transitionHide = transition || transitionHide;

  // function onExternalAction(event: any) {
  //   console.log(event);
  //   if ("back backdrop escape".includes(event.name) && persistent)
  //     return false;
  // }

  function onCloseAction(data: any) {
    onClose && onClose(data);

    setTimeout(() => {
      mounter.root.unmount();
      mounter.el.parentNode?.removeChild(mounter.el);
    }, 100);
  }

  mounter.root.render(
    <BrowserRouter>
      <UIDynamicModal
        Component={Component}
        ComponentProps={ComponentProps}
        autoPosition={autoPosition}
        persistent={persistent}
        backdrop
        className={className}
        onClose={onCloseAction}
        // onExternalAction={onExternalAction}
        params={params}
        transitionShow={transitionShow}
        transitionHide={transitionHide}
      />
    </BrowserRouter>
  );

  return {
    onData(fn: Function) {
      onData = fn;
      return this;
    },
    onClose(fn: Function) {
      onClose = fn;
      return this;
    },
  };
}

function createRoot() {
  let rootEl = document.body.appendChild(document.createElement("div"));
  rootEl.setAttribute("data-modal-container", "");

  return {
    root: createRootReactDom(rootEl),
    el: rootEl,
  };
}
