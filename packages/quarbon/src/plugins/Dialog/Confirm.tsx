import { Lang } from "@quarbon/plugins/Lang";
import { langGroupName, TLang } from "@quarbon/langdef";
import { Alert, alertOptionsNormalize, TAlertCloseRef, TAlertOptions } from "./Alert";

type TConfirmOptions = TAlertOptions

const lang = Lang.get<TLang>(langGroupName);

export function Confirm(confirmOptions: string | TConfirmOptions, callback?: Function) {
  let closeRef: TAlertCloseRef = {current:() => {}}
  let modalOptions = alertOptionsNormalize(confirmOptions, closeRef);
  
  modalOptions.buttons = (confirmOptions as TConfirmOptions).buttons || [
    {
      label: lang.no,
      color: "secondary"
    },
    {
      label: lang.yes,
      color: "primary"
    }
  ]

  return Alert(modalOptions, callback);  
}

Confirm.NO = 0;
Confirm.YES = 1;
