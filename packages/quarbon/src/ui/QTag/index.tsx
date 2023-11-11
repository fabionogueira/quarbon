/** @format */

import { CSSProperties } from "react";

import { SvgIcon } from "../../utils/svgicon";
import { createClassName } from "../../utils/css";

import "./QTag.scss";

SvgIcon.set("q-tag-icon", {
  content:
    '<svg><path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>',
  viewBox: "0 0 24 24",
});

const cssMap: any = {
  disabled: { true: "q-tag--disabled" },
  clickable: { true: "q-clickable"}
};

type TRadioProps = {
  children?: any;
  clickable?: boolean;
  className?: string;
  color?: string;
  disable?: boolean;
  icon?: any;
  iconRemove?: boolean;
  iconRight?: boolean;
  iconSelected?: boolean;
  labelText?: any;
  removable?: boolean;
  style?: CSSProperties | undefined;
};

export function QTag(props: TRadioProps) {
  let {
    icon,
    iconRight,
    iconRemove,
    iconSelected,
    labelText,
    clickable=false,
    removable=true,
    disable=false,
    style,
    children
  } = props;

  const css = createClassName(cssMap, props, "q-tag");

  return (
    <div className={css} style={style}>
      {children || labelText}
    </div>
  );
}
