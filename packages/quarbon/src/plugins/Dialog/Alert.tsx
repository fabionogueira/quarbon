import { BaseDialog } from "@quarbon/plugins/Dialog/BaseDialog";
import { TColor } from "@quarbon/types";
import { Lang } from "@quarbon/plugins/Lang";
import { langGroupName, TLang } from "@quarbon/langdef";
import { openModal } from "@quarbon/plugins/Modal";

type TArlertButton = {
  label: string,
  color?: TColor
}
export type TAlertCloseRef = {current:() => void}
export type TAlertOptions = {
  title?: null | string;
  close?: boolean;
  closeRef?: TAlertCloseRef;
  content?: any;
  button?: null | false | TArlertButton;
  buttons?: Array<TArlertButton | null>;
  persistent?: boolean;
  props?: Record<string, any>;
}

const lang = Lang.get<TLang>(langGroupName);

export function Alert(alertOptions: string | TAlertOptions, callback?: Function) {
  const closeRef: TAlertCloseRef = {current:() => {}}
  const modalOptions = alertOptionsNormalize(alertOptions, closeRef);
  
  function close() {
    closeRef.current();
  }
  
  openModal(BaseDialog, {
    params: modalOptions,
    autoPosition: false,
    backdrop: true,
    persistent: Boolean((alertOptions as TAlertOptions).persistent),
    transition: "q-alert-transition",
    className: "row justify-center align-start q-alert"
  })
  .onClose((button: number) => {
    //button is defined in BaseDialog.tsx when calling the close function
    callback && callback(button)
  })

  return close;
}

export function alertOptionsNormalize(alertOptions: string | TAlertOptions, closeRef:TAlertCloseRef) {
  let modalOptions: TAlertOptions;

  if (typeof alertOptions == "string") {
    modalOptions = {
      title: lang.alert,
      content: alertOptions,
      close: true,
      closeRef,
      buttons: [
        null,
        {
          label: lang.ok,
          color: "primary"
        },
      ]
    };
  } else {
    modalOptions = {
      title: alertOptions.title === null ? null : (alertOptions.title || lang.alert),
      content: alertOptions.content,
      close: alertOptions.close === undefined ? true : alertOptions.close,
      closeRef,
      props: alertOptions.props,
      buttons: alertOptions.buttons || (
        alertOptions.button === false ? [] : [
          null,
          {
            label: alertOptions.button?.label || lang.ok,
            color: alertOptions.button?.color || "primary"
          },
        ]
      )
    }
  }

  return modalOptions;
}