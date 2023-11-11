import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

import { History } from "@quarbon/utils/history";
import { DOM } from "@quarbon/utils/dom";

import { TAnchor, TBeforeShowEvent, TOnEvent, TStack } from "./types";
import { allModalsArr, allModalsObj } from "./globals";

import "./UIModal.scss";

type TModalProps = {
  anchor?: TAnchor; //Anchor origin
  anchorEl?: HTMLElement;
  autoPosition?: boolean;
  backdrop?: boolean;
  fitToHeight?: boolean;
  persistent?: boolean;
  self?: TAnchor; //Self origin
  offsetLeft?: number;
  offsetRight?: number;
  offsetTop?: number;
  offsetBottom?: number;
  children: any;
  className?: string;
  open?: boolean;
  onExternalAction?: TOnEvent;
  onBeforeShow?: (event?: TBeforeShowEvent) => void;
  onShow?: () => void;
  onBeforeClose?: () => void;
  onClose?: () => void;
  transition?: string;
  transitionShow?: string;
  transitionHide?: string;
  x?: number;
  y?: number;
};

let zIndex = 1000;
let ID = 0;

export function UIModal({
  anchor,
  anchorEl,
  autoPosition = true,
  children,
  className = "",
  onBeforeShow,
  onShow,
  onExternalAction,
  onBeforeClose,
  onClose,
  open,
  self,
  backdrop,
  fitToHeight,
  transition,
  persistent,
  transitionShow = "fade",
  transitionHide = "fade",
  offsetLeft = 0,
  offsetRight = 0,
  offsetTop = 0,
  offsetBottom = 0,
  x = 0,
  y = 0,
}: TModalProps) {
  const [id] = useState(`modal-${ID++}`);
  const [stack] = useState<TStack>({
    id,
    opened: false,
    on: (_) => void 0,
  });
  const backRef = useRef<any>();
  const nodeRef = useRef<any>();
  const metaRef = useRef<any>();
  const style: any = {
    zIndex: zIndex,
    position: "fixed",
  };

  if (!anchorEl && !x && !y) {
    anchorEl = metaRef.current?.parentNode;
  }

  transitionShow = transition || transitionShow;
  transitionHide = transition || transitionHide;
  anchor = anchor || "bottom left";
  self = self || "top left";

  stack.on = (event) => {
    if (persistent && "clickout context escape".includes(event.name)) return;
    if (onExternalAction) return onExternalAction(event);
  };

  useEffect(() => {
    const qElement = metaRef.current?.closest(".q-element");

    if (qElement) {
      qElement.setAttribute("data-open-modal", id);
    }
    allModalsObj[id] = stack;

    return () => {
      delete allModalsObj[id];
    };
  }, [id]);

  useEffect(() => {
    if (open) {
      const cancel = History.onBack(() => {
        return onBackButton();
      });

      zIndex++;
      allModalsArr.push(stack);

      return () => {
        cancel();
      };
    } else {
      const index = allModalsArr.findIndex((item) => item.id == id);
      if (index >= 0) allModalsArr.splice(index, 1);
    }
  }, [open]);

  function onBackButton() {
    if (persistent) return false;
    if (onExternalAction) return onExternalAction({ name: "back" });
  }

  function onBackdropClick(event: any) {
    if (backdrop) {
      if (event.target.closest(".q-element")) return;
      event.preventDefault();
      if (onExternalAction) return onExternalAction({ name: "backdrop" });
    }
  }

  function onTransitionEnter() {
    let position: string;

    onBeforeShow && onBeforeShow({ id });
    if (autoPosition) {
      position = positionTransform(anchor!, self!);
      DOM.positionByRect(nodeRef.current, position, anchorEl, fitToHeight, {
        left: offsetLeft,
        right: offsetRight,
        top: offsetTop,
        bottom: offsetBottom,
        x,
        y,
      });
    }
  }

  function onTransitionEntered() {
    onShow && onShow();
  }

  function onTransitionExit() {
    onBeforeClose && onBeforeClose();
  }

  function onTransitionExited() {
    onClose && onClose();
  }

  return (
    <>
      {!open && <meta ref={metaRef} itemProp={`${id}`} />}
      {createPortal(
        <>
          <CSSTransition
            in={open && backdrop}
            unmountOnExit
            classNames="fade"
            timeout={400}
            nodeRef={backRef}
          >
            <div
              ref={backRef}
              className="modal__backdrop"
              style={style}
              onClick={onBackdropClick}
            />
          </CSSTransition>

          <CSSTransition
            in={open}
            unmountOnExit
            nodeRef={nodeRef}
            classNames={{
              enter: `${transitionShow}-enter`,
              enterActive: `${transitionShow}-enter-active`,
              exit: `${transitionHide}-exit`,
              exitActive: `${transitionHide}-exit-active`,
            }}
            timeout={400}
            onEnter={onTransitionEnter}
            onEntered={onTransitionEntered}
            onExit={onTransitionExit}
            onExited={onTransitionExited}
          >
            <div
              data-modal-id={id}
              data-container=""
              ref={nodeRef}
              className={`modal ${className}`}
              style={style}
              onClick={onBackdropClick}
            >
              {children}
            </div>
          </CSSTransition>
        </>,
        document.body
      )}
    </>
  );
}

function positionTransform(anchor: string, self: string) {
  const str = "A2S2-A1S1";
  const a = anchor.split(" ").map((s) => s[0]);
  const s = self.split(" ").map((s) => s[0]);

  return str
    .replace("A1", a[0])
    .replace("A2", a[1])
    .replace("S1", s[0])
    .replace("S2", s[1]);
}
