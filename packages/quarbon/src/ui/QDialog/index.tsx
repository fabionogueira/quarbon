/** @format */

import { createClassName } from "@quarbon/utils/css";
import { CbArrowLeft, CbClose } from "@quarbon/icons/cb";

import "./QDialog.scss";

type TDialogProps = {
  children: any;
  className?: string,
  display?: "center" | "fullscreen" | "fullheight" | "auto";
  close?: boolean; //show/hide close button
  back?: boolean | "auto"; //show/hide back button
  title?: any;
  persistent?: boolean;
  width?: number;
  height?: number | "auto";
  onClose?: Function;
  onCloseButton?: Function;
};

const cssMap: any = {
  display: {
    fullscreen: "q-dialog--fullscreen",
    fullheight: "q-dialog--fullheight",
    auto: "q-dialog--auto",
  },
  back: {
    auto: "q-dialog--showback",
  },
  close: {
    auto: "q-dialog--showclose",
  },
};
const defaults = {};

export function QDialog(props: TDialogProps) {
  const {
    children,
    title,
    back = props.display == "auto" ? "auto" : false,
    close = props.display == "auto" ? "auto" : false,
    // width = 300,
    // height = 200,
    onCloseButton
  } = props;
  const css = createClassName(cssMap, props, "q-dialog col", { ...defaults, back });

  function onClick_CloseButton() {
    onCloseButton && onCloseButton()
  }
  
  return (
    <div
      data-container
      className={css}
      style={{
        // width,
        // height,
      }}>
      {(title || close) &&
          <div className="q-dialog__title row align-center">
          {back && (
              <div data-action="close-modal" className="q-dialog__title-back" onClick={onClick_CloseButton}>
                <CbArrowLeft size={20}/>
              </div>
          )}

          <div className="q-dialog__title-label">{title}</div>

          {close && (
              <div data-action="close-modal" className="q-dialog__title-close" onClick={onClick_CloseButton}>
                <CbClose size={20}/>
              </div>
          )}
        </div>
      }

      {children}
    </div>
  );
}

type TQDialogHeadingProps = {
  children: any;
};

export function QDialogHeading(props: TQDialogHeadingProps) {
  let { children } = props;

  return <div className={"q-dialog__title-heading"}>{children}</div>;
}

type TQDialogBodyProps = {
  children: any;
};

export function QDialogBody(props: TQDialogBodyProps) {
  let { children } = props;

  return <div className="q-dialog__body">{children}</div>;
}

type TQDialogAcionsProps = {
  children: any;
};

export function QDialogActions(props: TQDialogAcionsProps) {
  const children = Array.isArray(props.children) ? props.children : [props.children];

  return (
    <div
      className="q-dialog__actions"
      style={{
        "gridTemplateColumns": children.map(() => "1fr").join(" "),
      }}
    >
      {children}
    </div>
  );
}
