
import { useEffect, useState } from "react";
import { createClassName } from "../../utils/css";
import { SvgIcon } from "../../utils/svgicon";
import { Icon } from "../Icon";

import "./Stepper.scss"

type TStep = {
    name: string,
    title?: any,
    icon?: any,
    done?: boolean,
    disabled?: boolean
}

type TStepperProps = {
    className?: string,
    steps: Array<TStep>, // list of steps
    active: number,
    icon?: any,
    iconActive?: any,
    iconDone?: any,
    onClick?: Function
}

const cssMap:any = {
}
const defaults = {
}

SvgIcon.set("stepper-default", {
    content: '<svg><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>',
    viewBox: "0 0 24 24"
})
SvgIcon.set("stepper-active", {
    content: '<svg><path fill="currentColor" d="M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2" /></svg>',
    viewBox: "0 0 24 24"
})
SvgIcon.set("stepper-done", {
    content: '<svg><path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>',
    viewBox: "0 0 24 24"
})

export function Stepper(props: TStepperProps) {
    const [max, setMax] = useState(props.active)
    const css = createClassName(cssMap, props, "c-stepper row", defaults)
    const {
        active,
        steps,
        icon: baseIcon = "stepper-default",
        iconActive = "stepper-active",
        iconDone = "stepper-done",
        onClick
    } = props

    useEffect(() => {
        setMax(Math.max(max, active))
    }, [active, max])

    function onClick_Item(index:number) {
        if (index <= max) {
            setMax(Math.max(max, index))
            onClick && onClick(index)
        }
    }

    return (
        <div className={css}>
            {steps.map(({done, name, title, icon, disabled}, index) => {
                const isActive = (index == active)

                icon = (isActive 
                    ? (iconActive || icon)
                    : (done ? (iconDone || icon) : icon )
                ) || baseIcon
                
                return (
                    <div 
                        key={name} 
                        className={
                            "c-stepper-item row" + 
                            (done ? " c-stepper-item--done" : "") +
                            (index == active ? " c-stepper-item--active" : "") +
                            (disabled ? " c-stepper-item--disabled" : "")
                        }
                        onClick={() => (!disabled && onClick_Item(index))}
                    >
                        {icon && <Icon name={icon} size="24px" />}
                        {title && <div className="c-stepper-item__title">{title}</div>}
                    </div>
                )})
            }
        </div>
    )
}
