import {Lang} from "@quarbon/plugins/Lang";

export const langGroupName = "quarbon";
export type TLang = {
    alert: string;
    confirm: string;
    cancel: string;
    no: string;
    yes: string;
    ok: string;
    required: string;
    notNull: string;
    notIsFalse: string;
    toggle: string;
    min: string;
    max: string;
    size: string;
    exists: string;
    date: string;
    time: string;
    email: string;
    url: string;
    cnpj: string;
    password: string;
}

const langDef:TLang = {
    alert: "Alert",
    confirm: "Confirm",
    cancel: "Cancel",
    no: "No",
    yes: "Yes",
    ok: "Ok",
    required: "This field is required",
    notNull: "This field cannot be null",
    notIsFalse: "This field needs to be enabled",
    toggle: "Not implemented",
    min: "Minimum of {{value}} characters",
    max: "Maximum of {{value}} characters",
    size: "Must contain {{value}} characters",
    exists: "{{val}} is not a valid item",
    date: "Invalid date",
    time: "Invalid time",
    email: "Invalid email",
    url: "Invalid url",
    cnpj: "Invalid CNPJ",
    password: "Invalid password"
}

Lang.create("en", "quarbon", langDef);
