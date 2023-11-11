import { vars } from "../css/vars";

let zIndexValue = vars.z_modal;

type TCssMapItemCallback = (value:any, props?:any) => string;
type TCssMapItemObject = Record<string, any>;

export type TCssMap = Record<string, TCssMapItemCallback | TCssMapItemObject>;

export const cssMapBase:any = {
    color: {
        "primary": "bg-primary text-primary-invert",
        "secondary": "bg-secondary text-secondary-invert",
        "accent": "bg-accent text-accent-invert",
        "positive": "bg-positive text-positive-invert",
        "negative": "bg-negative text-negative-invert",
        "info": "bg-info text-info-invert",
        "warning": "bg-warning text-warning-invert"
    },
    colorText: {
        "primary": "text-primary",
        "secondary": "text-secondary",
        "accent": "text-accent",
        "positive": "text-positive",
        "negative": "text-negative",
        "info": "text-info",
        "warning": "text-warning",
    },
    names: [
        "primary",
        "secondary",
        "accent",
        "positive",
        "negative",
        "info",
        "warning",
    ]
}

export function createClassName(map: any, props: any, start = "", defaults: any = {})
{
    if (!props) {
        return (start ? (start + " ") : "")
    }

    const end:string = props.className || ""
    let s:string =  "q-element " + (start ? (start + " ") : "")

    if (end == "shadow") {
        // debugger
    }

    Object
        .keys(map)
        .forEach((prop) => {
            const v = props[prop] === undefined ? defaults[prop] : props[prop]

            if (v === undefined)
                return;

            if (prop == "clickable" && v && props.disabled)
                return;

            const mapDef = map[prop];
            const mapValue = mapDef[v] || "";

            if (typeof(mapDef)=="function")
                s += String(mapDef(v, props)) + " ";
            else if (mapValue) {
                s += String(mapValue) + " ";
            }
        })

    return s + end
}

export function buzz(el:HTMLElement) {
    el.classList.add("buzz")
    setTimeout(() => {
        el.classList.remove("buzz")
    }, 400)
}

export function zIndex() {
    return zIndexValue++;
}