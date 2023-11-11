import {Alert} from "@quarbon/plugins/Dialog/Alert";
import {Confirm} from "@quarbon/plugins/Dialog/Confirm";
import {Notify} from "@quarbon/plugins/Dialog/Notify";
import {Loading} from "@quarbon/plugins/Dialog/Loading";

export const Dialog = {
    alert: Alert,
    confirm: Confirm,
    loading: Loading,
    notifySuccess: Notify.success,
    notifyError: Notify.error,
    notifyInfo: Notify.info,
    notifyWarning: Notify.warning,
}
