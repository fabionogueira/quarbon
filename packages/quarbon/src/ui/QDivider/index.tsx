import { createClassName } from "../../utils/css"

import "./QDivider.scss"

type TQDividerProps = {
    inset?: boolean,
    orientation?: "horizontal" | "vertical",
    color?: string
}

const cssMap: any = {
    inset: { true : "c-divider--inset"},
    orientation: {
        "horizontal": "c-divider--horizontal",
        "vertical": "c-divider--vertical"
    },
}

export function QDivider(props: TQDividerProps) {
    const css = createClassName(cssMap, props, "c-divider")
    return <div className={css} />
}
